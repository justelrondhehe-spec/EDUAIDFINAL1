// frontend/src/contexts/AppContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  lessonsData as lessonsFixture,
  Lesson,
} from "../data/lessonsData";
import {
  activitiesData as activitiesFixture,
  Activity,
} from "../data/activitiesData";

import client from "../api/client";
import { useAuth } from "./AuthContext";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning" | "assignment";
}
interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: "lesson" | "activity";
  color: string;
  lessonId?: number;
  activityId?: number;
}
interface LessonProgress {
  lessonId: number;
  startedDate: Date;
  expirationDate: Date;
  progressPercent: number;
  completed: boolean;
  completedDate?: Date;
}
interface ActivityScore {
  activityId: number;
  score: number;
  maxScore: number;
  dueDate: Date | null;
  completed: boolean;
  completedDate?: Date;
}
interface RecentActivity {
  id: number;
  title: string;
  time: string;
  icon: string;
  color: string;
  timestamp: Date;
}

interface AppContextType {
  notifications: Notification[];
  markNotificationAsRead: (id: number) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (n: Omit<Notification, "id">) => void;

  calendarEvents: CalendarEvent[];
  showInviteModal: boolean;
  setShowInviteModal: (b: boolean) => void;
  showNotifications: boolean;
  setShowNotifications: (b: boolean) => void;
  showNotificationsPanel: boolean;
  setShowNotificationsPanel: (b: boolean) => void;
  showCalendar: boolean;
  setShowCalendar: (b: boolean) => void;
  showProfileMenu: boolean;
  setShowProfileMenu: (b: boolean) => void;

  lessonProgress: Record<number | string, LessonProgress>;
  startLesson: (lessonId: number) => void;
  updateLessonProgress: (lessonId: number, percent: number) => void;
  completeLesson: (lessonId: number) => Promise<void>;
  saveAndExitLesson: (lessonId: number, percent: number) => void;

  activityScores: Record<number | string, ActivityScore>;
  completeActivity: (
    activityId: number,
    score: number,
    maxScore: number
  ) => Promise<void>;

  overallProgressPercent: number;
  achievementsEarned: number;
  recentActivities: RecentActivity[];

  lessons: Lesson[];
  activities: Activity[];


  // simple auth stubs (kept for backwards compatibility)
  isAuthenticated: boolean;
  login: (email: string, pw: string) => void;
  logout: () => void;
  currentUser: { name: string; email: string } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Safely extract the user id from whatever shape the auth user has.
 * We ALWAYS normalize to a string.
 */
function getUserId(authUser: any | null | undefined): string | null {
  if (!authUser) return null;
  const uid =
    authUser._id ??
    authUser.id ??
    authUser.userId ??
    (typeof authUser === "object" && authUser.user && (authUser.user._id || authUser.user.id));
  if (!uid) return null;
  return String(uid);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const { user: authUser } = useAuth();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [lessonProgress, setLessonProgress] = useState<
    Record<number | string, LessonProgress>
  >({});
  const [activityScores, setActivityScores] = useState<
    Record<number | string, ActivityScore>
  >({});

  const [overallProgressPercent, setOverallProgressPercent] = useState(0);
  const [achievementsEarned, setAchievementsEarned] = useState(3);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
  } | null>(null);

  // Content loaded from server (admin-created) - fallback to fixtures
  const [lessons, setLessons] = useState<Lesson[]>(() => lessonsFixture ?? []);
  const [activities, setActivities] = useState<Activity[]>(() => activitiesFixture ?? []);


  const [userId, setUserId] = useState<string | null>(null);

    // Keep a clean MongoDB user id from authUser
  useEffect(() => {
    if (!authUser) {
      setUserId(null);
      return;
    }

    // Only trust _id / userId, ignore any "id" placeholder
    const raw =
      (authUser as any)._id ||
      (authUser as any).userId ||
      null;

    const idStr = raw ? String(raw) : null;

    // simple ObjectId format check (24 hex chars)
    if (idStr && /^[0-9a-fA-F]{24}$/.test(idStr)) {
      setUserId(idStr);
    } else {
      console.warn("Auth user has invalid _id, ignoring:", raw);
      setUserId(null);
    }
  }, [authUser]);


  // ---------- fetch content (lessons & activities) ----------
  const fetchContentFromServer = async () => {
    try {
      const [lessonsRes, activitiesRes] = await Promise.allSettled([
        client.get("/lessons"),
        client.get("/activities"),
      ]);

      if (
        lessonsRes.status === "fulfilled" &&
        Array.isArray((lessonsRes as any).value?.data) &&
        (lessonsRes as any).value.data.length > 0
      ) {
        setLessons((lessonsRes as any).value.data);
      } else {
        setLessons(lessonsFixture ?? []);
      }

      if (
        activitiesRes.status === "fulfilled" &&
        Array.isArray((activitiesRes as any).value?.data) &&
        (activitiesRes as any).value.data.length > 0
      ) {
        setActivities((activitiesRes as any).value.data);
      } else {
        setActivities(activitiesFixture ?? []);
      }
    } catch (err) {
      console.warn("fetchContentFromServer error", err);
      setLessons(lessonsFixture ?? []);
      setActivities(activitiesFixture ?? []);
    }
  };

  useEffect(() => {
    fetchContentFromServer();
    const onDataChanged = () => fetchContentFromServer();
    window.addEventListener("data:changed", onDataChanged as EventListener);
    return () =>
      window.removeEventListener("data:changed", onDataChanged as EventListener);
  }, []);

    // ---------- push progress helper ----------
  const pushProgressToServer = async (patch: any) => {
    try {
      if (!userId) {
        console.debug("pushProgressToServer: no valid userId, skipping server update");
        return null;
      }

      console.debug("pushProgressToServer -> PUT /users/%s/progress", userId, patch);
      const res = await client.put(`/users/${userId}/progress`, patch);

      // tells GlobalDataContext to refetch for admin dashboards
      window.dispatchEvent(new CustomEvent("data:changed"));

      return res?.data ?? null;
    } catch (err) {
      console.warn("pushProgressToServer failed", err);
      return null;
    }
  };


  // ---------- notifications helpers ----------
  const markNotificationAsRead = (id: number) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  const markAllNotificationsAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const addNotification = (notification: Omit<Notification, "id">) => {
    setNotifications((prev) => [
      { id: Date.now() + Math.floor(Math.random() * 1000), ...notification },
      ...prev,
    ]);
  };
  const addRecentActivity = (activity: Omit<RecentActivity, "id">) => {
    setRecentActivities((prev) =>
      [
        {
          id: Date.now() + Math.floor(Math.random() * 1000),
          ...activity,
        },
        ...prev,
      ].slice(0, 10)
    );
  };

  // ---------- load progress when authUser changes ----------
  useEffect(() => {
    const uid = getUserId(authUser);

    if (!uid) {
      // logged out or no user => clear all per-user progress
      console.log("[AppContext] No auth user; clearing local progress.");
      setLessonProgress({});
      setActivityScores({});
      return;
    }

    const loadProgress = async () => {
      try {
        console.log("[AppContext] Loading progress for user", uid);
        const res = await client.get(`/users/${uid}`);
        const data = res.data || {};

        const serverLessonProgress =
          data.lessonProgress ??
          data.lesson_progress ??
          data.lessonsProgress ??
          {};
        const serverActivityScores =
          data.activityScores ??
          data.activity_scores ??
          data.activitiesProgress ??
          {};

        const normalizedLessons: Record<number | string, any> = {};
        Object.entries(serverLessonProgress).forEach(([k, v]) => {
          const copy = { ...(v as any) };
          if (copy.startedDate && typeof copy.startedDate === "string")
            copy.startedDate = new Date(copy.startedDate);
          if (copy.expirationDate && typeof copy.expirationDate === "string")
            copy.expirationDate = new Date(copy.expirationDate);
          if (copy.completedDate && typeof copy.completedDate === "string")
            copy.completedDate = new Date(copy.completedDate);
          normalizedLessons[k] = copy;
        });

        const normalizedActivities: Record<number | string, any> = {};
        Object.entries(serverActivityScores).forEach(([k, v]) => {
          const copy = { ...(v as any) };
          if (copy.dueDate && typeof copy.dueDate === "string")
            copy.dueDate = new Date(copy.dueDate);
          if (copy.completedDate && typeof copy.completedDate === "string")
            copy.completedDate = new Date(copy.completedDate);
          normalizedActivities[k] = copy;
        });

        console.log(
          "[AppContext] Loaded lessonProgress keys:",
          Object.keys(normalizedLessons),
          "activityScores keys:",
          Object.keys(normalizedActivities)
        );

        // Replace existing state with what we got from server
        setLessonProgress(normalizedLessons as any);
        setActivityScores(normalizedActivities as any);
      } catch (err) {
        console.warn("[AppContext] Failed to load user progress", err);
        // IMPORTANT: do NOT wipe out existing local progress on error
        // (we already clear when user logs out).
      }
    };

    loadProgress();
  }, [authUser]);

  // ---------- expire lessons locally ----------
  useEffect(() => {
    const checkExpiredLessons = () => {
      const now = new Date();
      setLessonProgress((prev) => {
        const updated: Record<number | string, LessonProgress> = { ...prev };
        let changed = false;
        for (const key of Object.keys(updated)) {
          const lp = updated[key];
          if (!lp.completed && lp.expirationDate && now > lp.expirationDate) {
            delete updated[key];
            changed = true;
            addNotification({
              title: "Lesson Expired ⏰",
              message: `Your progress on lesson ${lp.lessonId} has been reset.`,
              time: "Just now",
              read: false,
              type: "warning",
            });
          }
        }
        return changed ? updated : prev;
      });
    };

    checkExpiredLessons();
    const i = setInterval(checkExpiredLessons, 60000);
    return () => clearInterval(i);
  }, []);

  // ---------- calendar events ----------
  useEffect(() => {
    const events: CalendarEvent[] = [];

    Object.values(lessonProgress).forEach((lp) => {
      if (!lp.completed && lp.expirationDate) {
        const lessonId = lp.lessonId;
        const lessonObj = lessons.find(
          (l) =>
            (l.id !== undefined && Number(l.id) === Number(lessonId)) ||
            String(l._id) === String(lessonId)
        );
        const lessonTitle = lessonObj?.title ?? `Lesson ${lessonId}`;
        events.push({
          id: `lesson-${lessonId}`,
          title: `${lessonTitle} - Expires`,
          date: lp.expirationDate,
          type: "lesson",
          color: "from-purple-500 to-purple-600",
          lessonId,
        });
      }
    });

    (activities || []).forEach((act) => {
      const relatedId = act.relatedLessonId;
      const isUnlocked =
        relatedId === undefined || lessonProgress[relatedId]?.completed || false;
      const score = activityScores[act.id] ?? activityScores[String(act.id)];
      const isCompleted = score?.completed || false;

      if (isUnlocked && !isCompleted) {
        let dueDate: Date | null = null;
        if (score?.dueDate) dueDate = score.dueDate;
        else if (act.dueTimestamp) dueDate = new Date(act.dueTimestamp);
        if (dueDate) {
          events.push({
            id: `activity-${act.id}`,
            title: `Due: ${act.title}`,
            date: dueDate,
            type: "activity",
            color: act.color || "from-blue-500 to-indigo-600",
            activityId: act.id,
          });
        }
      }
    });

    setCalendarEvents(events);
  }, [lessonProgress, activityScores, lessons, activities]);

  // ---------- overall progress ----------
  useEffect(() => {
    const completedActivities = Object.values(activityScores).filter(
      (a) => a.completed
    );
    if (completedActivities.length === 0) {
      setOverallProgressPercent(0);
      return;
    }
    const totalPerc = completedActivities.reduce(
      (s, a) => s + (a.score / a.maxScore) * 100,
      0
    );
    setOverallProgressPercent(Math.round(totalPerc / completedActivities.length));
  }, [activityScores]);

  // ---------- lesson helpers ----------
  const startLesson = (lessonId: number) => {
    setLessonProgress((prev) => {
      if (prev[lessonId] || prev[String(lessonId)]) return prev;
      const startedDate = new Date();
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      const updated: Record<number | string, LessonProgress> = {
        ...prev,
        [lessonId]: {
          lessonId,
          startedDate,
          expirationDate,
          progressPercent: 0,
          completed: false,
        },
      };

      pushProgressToServer({
        lessonProgress: {
          [lessonId]: {
            lessonId,
            startedDate: startedDate.toISOString(),
            expirationDate: expirationDate.toISOString(),
            progressPercent: 0,
            completed: false,
          },
        },
      }).catch(() => {});

      addNotification({
        title: "Lesson Started! 📚",
        message: "You have 7 days to complete this lesson.",
        time: "Just now",
        read: false,
        type: "info",
      });

      return updated;
    });
  };

  const updateLessonProgress = (lessonId: number, percent: number) => {
    setLessonProgress((prev) => {
      const existing = prev[lessonId] ?? prev[String(lessonId)];
      if (!existing) return prev;
      const clamped = Math.min(percent, 100);
      const updated = {
        ...prev,
        [lessonId]: { ...existing, progressPercent: clamped },
      };

      const lp = updated[lessonId];
      pushProgressToServer({
        lessonProgress: {
          [lessonId]: {
            lessonId,
            startedDate: lp.startedDate?.toISOString?.() ?? lp.startedDate,
            expirationDate:
              lp.expirationDate?.toISOString?.() ?? lp.expirationDate,
            progressPercent: clamped,
            completed: lp.completed ?? false,
          },
        },
      }).catch(() => {});

      return updated;
    });
  };

  const saveAndExitLesson = (lessonId: number, percent: number) => {
    updateLessonProgress(lessonId, percent);
    addNotification({
      title: "Progress Saved! 💾",
      message: "Your lesson progress has been saved.",
      time: "Just now",
      read: false,
      type: "success",
    });
  };

  const completeLesson = async (lessonId: number) => {
    setLessonProgress((prev) => {
      const existing = prev[lessonId] ?? prev[String(lessonId)];
      if (existing && existing.completed) return prev;

      const completedDate = new Date();
      const started = existing?.startedDate ?? new Date();
      const exp =
        existing?.expirationDate ??
        (() => {
          const d = new Date();
          d.setDate(d.getDate() + 7);
          return d;
        })();

      const updated: Record<number | string, LessonProgress> = {
        ...prev,
        [lessonId]: {
          lessonId,
          startedDate: started,
          expirationDate: exp,
          progressPercent: 100,
          completed: true,
          completedDate,
        },
      };

      const lessonObj = lessons.find(
        (l) =>
          Number(l.id) === Number(lessonId) ||
          String(l._id) === String(lessonId)
      );
      const title = lessonObj?.title ?? `Lesson ${lessonId}`;

      addRecentActivity({
        title: `Completed "${title}"`,
        time: "Just now",
        icon: "✅",
        color: "text-emerald-500",
        timestamp: completedDate,
      });
      addNotification({
        title: "Lesson Completed! 🎉",
        message: "Great job!",
        time: "Just now",
        read: false,
        type: "success",
      });

      const related = activities.filter(
        (a) => Number(a.relatedLessonId) === Number(lessonId)
      );
      setActivityScores((prevS) => {
        const copy: Record<number | string, ActivityScore> = { ...prevS };
        related.forEach((a) => {
          if (!copy[a.id] && !copy[String(a.id)]) {
            const dueDate = new Date(completedDate);
            dueDate.setDate(dueDate.getDate() + 1);
            copy[a.id] = {
              activityId: a.id,
              score: 0,
              maxScore: a.totalQuestions || 100,
              dueDate,
              completed: false,
            };
          }
        });
        return copy;
      });

      if (Object.values(prev).filter((l) => l.completed).length === 0) {
        setAchievementsEarned((c) => c + 1);
        setTimeout(
          () =>
            addNotification({
              title: "Achievement Unlocked! 🏆",
              message: "Eager Learner",
              time: "Just now",
              read: false,
              type: "success",
            }),
          3000
        );
      }

      return updated;
    });

    const nowIso = new Date().toISOString();
    const lessonPayload: any = {
      lessonProgress: {
        [lessonId]: {
          lessonId,
          completed: true,
          completedDate: nowIso,
          progressPercent: 100,
        },
      },
    };

    const related = activities.filter(
      (a) => Number(a.relatedLessonId) === Number(lessonId)
    );
    if (related.length) {
      lessonPayload.activityScores = {};
      related.forEach((a) => {
        const due = new Date();
        due.setDate(due.getDate() + 1);
        lessonPayload.activityScores[a.id] = {
          activityId: a.id,
          completed: false,
          dueDate: due.toISOString(),
          score: 0,
          maxScore: a.totalQuestions ?? 100,
        };
      });
    }

    await pushProgressToServer(lessonPayload);
  };

  const completeActivity = async (
    activityId: number,
    score: number,
    maxScore: number
  ) => {
    setActivityScores((prev) => {
      const existing = prev[activityId] ?? prev[String(activityId)];
      if (existing && existing.completed) return prev;

      const percentScore = Math.round((score / maxScore) * 100);
      const compDate = new Date();

      const title =
        activities.find((a) => a.id === activityId)?.title ??
        activities.find((a) => String(a._id) === String(activityId))?.title ??
        `Activity ${activityId}`;

      addRecentActivity({
        title: `Completed "${title}"`,
        time: "Just now",
        icon: "✅",
        color: "text-emerald-500",
        timestamp: compDate,
      });
      addNotification({
        title: "Activity Completed! ✅",
        message:
          percentScore === 100
            ? `Perfect score! ${score}/${maxScore}`
            : `You got ${score}/${maxScore}`,
        time: "Just now",
        read: false,
        type: percentScore === 100 ? "success" : "info",
      });

      const updated: Record<number | string, ActivityScore> = {
        ...prev,
        [activityId]: {
          activityId,
          score,
          maxScore,
          dueDate: existing?.dueDate ?? null,
          completed: true,
          completedDate: compDate,
        },
      };
      return updated;
    });

    const payload = {
      activityScores: {
        [activityId]: {
          activityId,
          completed: true,
          score,
          maxScore,
          completedDate: new Date().toISOString(),
        },
      },
    };
    await pushProgressToServer(payload);
  };

  // simple auth stubs for older components (not the real auth)
  const login = (email: string, pw: string) => {
    setIsAuthenticated(true);
    setCurrentUser({ name: "Demo", email });
    setTimeout(
      () =>
        addNotification({
          title: "Welcome Back! 👋",
          message: "",
          time: "Just now",
          read: false,
          type: "info",
        }),
      400
    );
  };
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
        calendarEvents,
        showInviteModal,
        setShowInviteModal,
        showNotifications,
        setShowNotifications,
        showNotificationsPanel,
        setShowNotificationsPanel,
        showCalendar,
        setShowCalendar,
        showProfileMenu,
        setShowProfileMenu,
        lessonProgress,
        startLesson,
        updateLessonProgress,
        completeLesson,
        saveAndExitLesson,
        lessons,
        activities,
        activityScores,
        completeActivity,
        overallProgressPercent,
        achievementsEarned,
        recentActivities,
        isAuthenticated,
        login,
        logout,
        currentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
