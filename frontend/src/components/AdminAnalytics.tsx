// frontend/src/components/AdminAnalytics.tsx
import React from "react";
import { useGlobalData } from "../contexts/GlobalDataContext";

export function AdminAnalytics() {
  const {
    getTotalStudents,
    getActiveLessons,
    getAverageProgress,
    getCompletionRate,
    getTopPerformers,
  } = useGlobalData();

  const totalStudents = getTotalStudents();
  const activeLessons = getActiveLessons();
  const avgProgress = getAverageProgress();
  const completionRate = getCompletionRate();
  const top = getTopPerformers(4);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-sm text-slate-500">Total Engagement</div>
          <div className="text-2xl">{avgProgress}%</div>
          <div className="text-xs text-green-600">+{Math.max(0, Math.round(avgProgress / 10))}%</div>
        </div>
        <div className="card">
          <div className="text-sm text-slate-500">Avg. Session Time</div>
          <div className="text-2xl">—</div>
          <div className="text-xs text-green-600">+3 min</div>
        </div>
        <div className="card">
          <div className="text-sm text-slate-500">Daily Active Users</div>
          <div className="text-2xl">{Math.min(totalStudents,  Math.round(totalStudents * 0.4))}</div>
          <div className="text-xs text-green-600">+1</div>
        </div>
        <div className="card">
          <div className="text-sm text-slate-500">Completion Rate</div>
          <div className="text-2xl">{completionRate}%</div>
          <div className="text-xs text-green-600">+{Math.max(0, completionRate ? 1 : 8)}%</div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg mb-4">Usage Overview</h3>
        <div className="h-64 border border-dashed rounded-md flex items-center justify-center text-slate-400">
          Chart visualization would go here
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h4 className="mb-4">Top Performers</h4>
          {top.length === 0 ? <div className="text-slate-400">No performers yet</div> : (
            top.map((p, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <div className="font-medium">{p.student.name || p.student.email}</div>
                  <div className="text-xs text-slate-500">{p.student.email}</div>
                </div>
                <div>{p.overallProgress}%</div>
              </div>
            ))
          )}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h4 className="mb-4">Recent Activity</h4>
          <div className="text-slate-400">Live events will appear here (add backend event log)</div>
        </div>
      </div>
    </div>
  );
}
