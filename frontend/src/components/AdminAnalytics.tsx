// frontend/src/components/AdminAnalytics.tsx
import React, { useMemo, useState } from "react";
import { useGlobalData } from "../contexts/GlobalDataContext";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export function AdminAnalytics() {
  const {
    getTotalStudents,
    getActiveLessons,
    getAverageProgress,
    getCompletionRate,
    getTopPerformers,
    getRecentActivities,
  } = useGlobalData();

  const totalStudents = getTotalStudents();
  const activeLessons = getActiveLessons();
  const avgProgress = getAverageProgress(); // 0–100
  const completionRate = getCompletionRate(); // 0–100

  // always fall back to an array
  const top = (getTopPerformers && getTopPerformers(4)) || [];
  const recent = (getRecentActivities && getRecentActivities(500)) || [];

  // "7" or "30" days chart range
  const [range, setRange] = useState<"7" | "30">("7");

  // --- Build daily usage for the selected range using REAL activity timestamps ---
  const dailyUsage = useMemo(() => {
    const daysBack = range === "7" ? 6 : 29;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    type Bucket = { date: Date; label: string; events: number };

    const buckets: Bucket[] = [];

    for (let i = daysBack; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const month = d.getMonth() + 1;
      const day = d.getDate();
      buckets.push({
        date: d,
        label: `${month}/${day}`, // e.g. 12/4
        events: 0,
      });
    }

    recent.forEach((event: any) => {
      if (!event?.timestamp) return;
      const t = new Date(event.timestamp);
      t.setHours(0, 0, 0, 0);

      const timeValue = t.getTime();
      const bucket = buckets.find((b) => b.date.getTime() === timeValue);
      if (bucket) {
        bucket.events += 1;
      }
    });

    return buckets.map((b) => ({
      day: b.label,
      events: b.events,
    }));
  }, [recent, range]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl">Analytics</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-sm text-slate-500">Total Engagement</div>
          <div className="text-2xl">{avgProgress}%</div>
          <div className="text-xs text-green-600">
            +{Math.max(0, Math.round(avgProgress / 10))}%
          </div>
        </div>

        <div className="card">
          <div className="text-sm text-slate-500">Avg. Session Time</div>
          <div className="text-2xl">—</div>
          <div className="text-xs text-green-600">+3 min</div>
        </div>

        <div className="card">
          <div className="text-sm text-slate-500">Daily Active Users</div>
          <div className="text-2xl">
            {Math.min(totalStudents, Math.round(totalStudents * 0.4))}
          </div>
          <div className="text-xs text-green-600">+1</div>
        </div>

        <div className="card">
          <div className="text-sm text-slate-500">Completion Rate</div>
          <div className="text-2xl">{completionRate}%</div>
          <div className="text-xs text-green-600">
            +{Math.max(0, completionRate ? 1 : 8)}%
          </div>
        </div>
      </div>

      {/* Usage Overview – REAL daily usage chart with 7/30 toggle */}
      <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg">
            Usage Overview (Last {range === "7" ? "7" : "30"} Days)
          </h3>

          {/* Range toggle */}
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 text-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setRange("7")}
              className={`px-3 py-1.5 transition-colors ${
                range === "7"
                  ? "bg-white text-slate-900"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              7 days
            </button>
            <button
              type="button"
              onClick={() => setRange("30")}
              className={`px-3 py-1.5 border-l border-slate-200 transition-colors ${
                range === "30"
                  ? "bg-white text-slate-900"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              30 days
            </button>
          </div>
        </div>

        {dailyUsage.length === 0 ? (
          <div className="h-64 border rounded-md flex items-center justify-center text-slate-400">
            Not enough activity yet to display a chart.
          </div>
        ) : (
          <div className="h-64 border rounded-md px-2 py-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyUsage}
                margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-slate-200"
                />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} height={30} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value: any) => [value, "Activity events"]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Bar
                  dataKey="events"
                  name="Activity events"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Bottom cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TOP PERFORMERS – made safer & deployment-ready */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h4 className="mb-4">Top Performers</h4>
          {top.length === 0 ? (
            <div className="text-slate-400">No performers yet</div>
          ) : (
            top.map((p: any, i: number) => {
              if (!p || !p.student) return null;

              const student = p.student;
              const name =
                student.name ||
                `${student.firstName ?? ""} ${student.lastName ?? ""}`.trim() ||
                student.email ||
                "Unknown student";

              const email = student.email || "—";
              const progress =
                typeof p.overallProgress === "number"
                  ? `${p.overallProgress}%`
                  : "—";

              const key =
                student._id ??
                student.id ??
                student.email ??
                `top-performer-${i}`;

              return (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-xs text-slate-500">{email}</div>
                  </div>
                  <div className="text-sm text-emerald-600 font-semibold">
                    {progress}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h4 className="mb-4">Recent Activity</h4>

          {recent.length === 0 ? (
            <div className="text-slate-400">No recent activity yet</div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recent.slice(0, 10).map((r: any) => (
                <div
                  key={r.id ?? r._id}
                  className="flex items-start justify-between border-b last:border-b-0 pb-2"
                >
                  <div className="pr-4">
                    <div className="text-sm text-slate-800">
                      {r.message || "Activity event"}
                    </div>
                    {r.details && (
                      <div className="text-xs text-slate-500">{r.details}</div>
                    )}
                  </div>
                  {r.timestamp && (
                    <div className="text-xs text-slate-400 whitespace-nowrap">
                      {new Date(r.timestamp).toLocaleString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
