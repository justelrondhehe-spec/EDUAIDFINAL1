import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import client from "../api/client";
import { lessonsApi, activitiesApi, adminApi } from "../api/api";
import { activitiesData as activitiesFixture } from "../data/activitiesData";
import { lessonsData as lessonsFixture } from "../data/lessonsData";

type User = any; // tighten later
type Lesson = any;
type Activity = any;

interface GlobalDataContextValue {
  loading: boolean;
  users: User[];
  lessons: Lesson[];
  activities: Activity[];
  settings: any | null;
  refresh: () => Promise<void>;
  reloadSettings: () => Promise<void>;
  getTotalStudents: () => number;
  getActiveLessons: () => number;
  getAverageProgress: () => number; // 0-100
  getCompletionRate: () => number; // 0-100
  getTopPerformers: (n?: number) => Array<{ student: User; overallProgress: number }>;
  getRecentActivities: (limit?: number) => Array<{ id: string; message: string; timestamp: Date; color?: string }>;
}

const safeNumber = (v: any) => (typeof v === "number" && isFinite(v) ? v : 0);

// Try to fetch aggregated metrics from backend admin endpoint first (if available)
export async function fetchAdminDashboardIfAvailable() {
  try {
    if (typeof adminApi?.dashboard === "function") {
      const res = await adminApi.dashboard();
      if (res && res.data) {
        console.debug("fetchAdminDashboardIfAvailable -> got dashboard from server", res.data);
        return res.data;
      }
    }
  } catch (err) {
    console.debug("fetchAdminDashboardIfAvailable -> no server dashboard or error", err);
  }
  return null;
}

// Compute single-user progress from many possible shapes
export function computeUserProgress(u: any) {
  if (!u) return { total: 0, completed: 0, percent: 0 };

  if (typeof u.overallProgress === "number") {
    return { total: 100, completed: u.overallProgress, percent: safeNumber(u.overallProgress) };
  }

  if (u.stats && (typeof u.stats.lessonsCompleted === "number" || typeof u.stats.activitiesCompleted === "number")) {
    const completed = safeNumber(u.stats.lessonsCompleted) + safeNumber(u.stats.activitiesCompleted);
    const total = (safeNumber(u.stats.totalLessons) + safeNumber(u.stats.totalActivities)) || completed || 0;
    const percent = total ? Math.round((completed / total) * 100) : 0;
    console.debug("computeUserProgress -> used u.stats for", u._id || u.email, { total, completed, percent });
    return { total, completed, percent };
  }

  const lessonProgress = u.lessonProgress ?? u.lesson_progress ?? u.lessonsProgress ?? {};
  const activityScores = u.activityScores ?? u.activity_scores ?? u.activitiesProgress ?? {};

  const lessonKeys = Object.keys(lessonProgress || {});
  const activityKeys = Object.keys(activityScores || {});

  const lessonCompleted = lessonKeys.filter((k) => {
    const it = lessonProgress[k];
    return it && (it.completed === true || it.completed === 1 || it.status === "completed");
  }).length;

  const activityCompleted = activityKeys.filter((k) => {
    const it = activityScores[k];
    return it && (it.completed === true || it.completed === 1 || it.status === "completed");
  }).length;

  const total = lessonKeys.length + activityKeys.length;
  const completed = lessonCompleted + activityCompleted;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  console.debug("computeUserProgress -> used lesson/activity shape for", u._id || u.email, {
    lessonKeys: lessonKeys.length,
    activityKeys: activityKeys.length,
    lessonCompleted,
    activityCompleted,
    total,
    completed,
    percent,
  });

  return { total, completed, percent };
}

// High-level helpers used by admin screens
export async function getDashboardMetrics({
  users = [],
  lessons = [],
  activities = [],
}: {
  users?: any[];
  lessons?: any[];
  activities?: any[];
} = {}) {
  const server = await fetchAdminDashboardIfAvailable();
  if (server) {
    return server;
  }

  const totalStudents = users.length;
  const activeLessons = (lessons || []).filter((l: any) => l.published !== false).length;

  const percents = (users || []).map((u) => computeUserProgress(u).percent);
  const avgProgress = percents.length ? Math.round(percents.reduce((a, b) => a + b, 0) / percents.length) : 0;

  let totalItems = 0,
    completedItems = 0;
  (users || []).forEach((u) => {
    const { total, completed } = computeUserProgress(u);
    totalItems += safeNumber(total);
    completedItems += safeNumber(completed);
  });
  const completionRate = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const topPerformers = (users || [])
    .map((u) => ({ student: u, overallProgress: computeUserProgress(u).percent }))
    .sort((a, b) => b.overallProgress - a.overallProgress)
    .slice(0, 8);

  const recentActivities = (users || [])
    .slice()
    .reverse()
    .map((u) => {
      const ts = u.lastLogin || u.updatedAt || u.createdAt;
      return {
        id: u._id || u.id || Math.random().toString(36).slice(2),
        message: `${u.name || u.email} active`,
        timestamp: ts ? new Date(ts) : new Date(),
        color: "bg-indigo-400",
      };
    })
    .slice(0, 10);

  const dayMs = 24 * 60 * 60 * 1000;
  const now = Date.now();
  const dailyActiveUsers = (users || []).filter((u) => {
    const ts = u.lastLogin || u.updatedAt || u.createdAt;
    if (!ts) return false;
    return now - new Date(ts).getTime() <= dayMs;
  }).length;

  console.debug("getDashboardMetrics -> computed", {
    totalStudents,
    activeLessons,
    avgProgress,
    completionRate,
    topPerformers: topPerformers.length,
    recentActivities: recentActivities.length,
    dailyActiveUsers,
  });

  return { totalStudents, activeLessons, avgProgress, completionRate, topPerformers, recentActivities, dailyActiveUsers };
}

const GlobalDataContext = createContext<GlobalDataContextValue | undefined>(undefined);

export const GlobalDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>(lessonsFixture || []);
  const [activities, setActivities] = useState<Activity[]>(activitiesFixture || []);
  const [settings, setSettings] = useState<any | null>(null);

  const reloadSettings = useCallback(async () => {
    try {
      const res = await client.get("/settings");
      setSettings(res.data ?? null);
    } catch (err) {
      console.warn("GlobalData: GET /settings failed", err);
      setSettings(null);
    }
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      // -------- USERS --------
      let fetchedUsers: User[] = [];
      try {
        const res = await client.get("/users");
        fetchedUsers = res.data ?? [];
      } catch (err) {
        console.warn("GlobalData: GET /users failed, using empty user list", err);
        fetchedUsers = [];
      }
      setUsers(Array.isArray(fetchedUsers) ? fetchedUsers : []);

      // -------- LESSONS --------
      try {
        const res = await lessonsApi.list();
        setLessons(Array.isArray(res.data) && res.data.length > 0 ? res.data : lessonsFixture);
      } catch {
        setLessons(lessonsFixture);
      }

      // -------- ACTIVITIES --------
      try {
        const res = await activitiesApi.list();
        setActivities(Array.isArray(res.data) && res.data.length > 0 ? res.data : activitiesFixture);
      } catch {
        setActivities(activitiesFixture);
      }

      // -------- SETTINGS --------
      await reloadSettings();
    } finally {
      setLoading(false);
    }
  }, [reloadSettings]);

  useEffect(() => {
    // initial fetch
    fetchAll();

    const onLogout = () => {
      setUsers([]);
      setLessons(lessonsFixture);
      setActivities(activitiesFixture);
      setSettings(null);
    };
    window.addEventListener("auth:logout", onLogout as EventListener);

    const onDataChanged = () => {
      console.debug("GlobalDataContext -> data:changed received, re-fetching global data");
      fetchAll().catch((err) => console.warn("fetchAll after data:changed failed", err));
    };
    window.addEventListener("data:changed", onDataChanged as EventListener);

    return () => {
      window.removeEventListener("auth:logout", onLogout as EventListener);
      window.removeEventListener("data:changed", onDataChanged as EventListener);
    };
  }, [fetchAll]);

  // Helper functions (best-effort from available data)
  const getTotalStudents = () => users.length;

  const getActiveLessons = () => {
    if (!Array.isArray(lessons) || lessons.length === 0) {
      return lessonsFixture?.length ?? 0;
    }
    return lessons.filter((l: any) => {
      if (typeof l.published === "boolean") return l.published === true;
      return true;
    }).length;
  };

  const getAverageProgress = () => {
    if (!users.length) return 0;
    let totals: number[] = [];

    users.forEach((u: any) => {
      if (typeof u.overallProgress === "number") {
        totals.push(u.overallProgress);
        return;
      }

      const lessonProgress = u.lessonProgress ?? {};
      const activityScores = u.activityScores ?? {};

      const lessonCount = Object.keys(lessonProgress).length;
      const lessonCompleted = Object.values(lessonProgress).filter((l: any) => l.completed).length;

      const activityCount = Object.keys(activityScores).length;
      const activityCompleted = Object.values(activityScores).filter((a: any) => a.completed).length;

      const total = (lessonCount || 0) + (activityCount || 0);
      const completed = (lessonCompleted || 0) + (activityCompleted || 0);

      totals.push(total > 0 ? (completed / total) * 100 : 0);
    });

    if (!totals.length) return 0;
    return Math.round(totals.reduce((s, n) => s + n, 0) / totals.length);
  };

  const getCompletionRate = () => {
    const totalItemsPerUser = users.map((u: any) => {
      const l = u.lessonProgress ?? {};
      const a = u.activityScores ?? {};
      const total = Object.keys(l).length + Object.keys(a).length;
      const completed =
        Object.values(l).filter((x: any) => x.completed).length +
        Object.values(a).filter((x: any) => x.completed).length;
      return { total, completed };
    });

    const totals = totalItemsPerUser.reduce(
      (acc, cur) => {
        acc.total += cur.total;
        acc.completed += cur.completed;
        return acc;
      },
      { total: 0, completed: 0 }
    );

    if (totals.total === 0) return 0;
    return Math.round((totals.completed / totals.total) * 100);
  };

  const getTopPerformers = (n = 5) => {
    const computed = users.map((u: any) => {
      const lessonProgress = u.lessonProgress ?? {};
      const activityScores = u.activityScores ?? {};
      const lessonCount = Object.keys(lessonProgress).length;
      const lessonCompleted = Object.values(lessonProgress).filter((l: any) => l.completed).length;
      const activityCount = Object.keys(activityScores).length;
      const activityCompleted = Object.values(activityScores).filter((a: any) => a.completed).length;
      const total = (lessonCount || 0) + (activityCount || 0);
      const completed = (lessonCompleted || 0) + (activityCompleted || 0);
      const overallProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
      return { student: u, overallProgress };
    });

    const sorted = computed.sort((a, b) => b.overallProgress - a.overallProgress);
    return sorted.slice(0, n);
  };

  const getRecentActivities = (limit = 10) => {
    const arr = users
      .slice()
      .reverse()
      .filter((u) => u)
      .map((u: any) => ({
        id: u._id || u.id || Math.random() + "",
        message: `${u.name || u.email} joined`,
        timestamp: new Date(u.createdAt || Date.now()),
        color: "bg-indigo-400",
      }));
    return arr.slice(0, limit);
  };

  const value: GlobalDataContextValue = {
    loading,
    users,
    lessons,
    activities,
    settings,
    refresh: fetchAll,
    reloadSettings,
    getTotalStudents,
    getActiveLessons,
    getAverageProgress,
    getCompletionRate,
    getTopPerformers,
    getRecentActivities,
  };

  return <GlobalDataContext.Provider value={value}>{children}</GlobalDataContext.Provider>;
};

export const useGlobalData = (): GlobalDataContextValue => {
  const ctx = useContext(GlobalDataContext);
  if (!ctx) throw new Error("useGlobalData must be used inside GlobalDataProvider");
  return ctx;
};
