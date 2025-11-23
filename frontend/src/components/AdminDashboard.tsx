// frontend/src/components/AdminDashboard.tsx
import React from "react";
import { Users, BookOpen, Activity, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { useGlobalData } from "../contexts/GlobalDataContext";

export function AdminDashboard() {
  const {
    getTotalStudents,
    getActiveLessons,
    getAverageProgress,
    getCompletionRate,
    getTopPerformers,
    getRecentActivities,
    loading,
  } = useGlobalData();

  const stats = [
    { title: "Total Students", value: String(getTotalStudents()), icon: Users, iconBg: "bg-blue-500" },
    { title: "Active Lessons", value: String(getActiveLessons()), icon: BookOpen, iconBg: "bg-emerald-500" },
    { title: "Completion Rate", value: `${getCompletionRate()}%`, icon: Activity, iconBg: "bg-purple-500" },
    { title: "Avg. Progress", value: `${getAverageProgress()}%`, icon: TrendingUp, iconBg: "bg-orange-500" },
  ];

  const top = getTopPerformers(4);
  const recent = getRecentActivities(5);

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-slate-800 dark:text-slate-100 mb-1">Admin Dashboard 🎓</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">Monitor and manage the EduAid platform</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">Export Report</Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">View All Students</Button>
          </div>
        </div>

        {loading ? <div>Loading...</div> : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 border shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${s.iconBg} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl mb-1">{s.value}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{s.title}</div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl">
                <h2 className="text-xl mb-4">Recent Activity</h2>
                {recent.length === 0 ? <div className="text-slate-400">No recent activity</div> : recent.map(r => (
                  <div key={r.id} className="mb-3">
                    <div className="text-sm text-slate-700">{r.message}</div>
                    <div className="text-xs text-slate-500">{r.timestamp.toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-xl">
                <h2 className="text-xl mb-4">Top Performers</h2>
                {top.length === 0 ? <div className="text-slate-400">No performers yet</div> : top.map(tp => (
                  <div key={tp.student._id ?? tp.student.id} className="mb-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm">{tp.student.name}</div>
                      <div className="text-lg text-emerald-600">{tp.overallProgress}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
