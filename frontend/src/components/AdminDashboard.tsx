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
    students, // <- list of all students from GlobalDataContext
    loading,
  } = useGlobalData();

  const stats = [
    {
      title: "Total Students",
      value: String(getTotalStudents()),
      icon: Users,
      iconBg: "bg-blue-500",
    },
    {
      title: "Active Lessons",
      value: String(getActiveLessons()),
      icon: BookOpen,
      iconBg: "bg-emerald-500",
    },
    {
      title: "Completion Rate",
      value: `${getCompletionRate()}%`,
      icon: Activity,
      iconBg: "bg-purple-500",
    },
    {
      title: "Avg. Progress",
      value: `${getAverageProgress()}%`,
      icon: TrendingUp,
      iconBg: "bg-orange-500",
    },
  ];

  const top = getTopPerformers(4);

  // --- New Students panel data (safe even if students is missing) ---
  const newStudents =
    Array.isArray(students)
      ? [...students]
          .sort((a: any, b: any) => {
            const ta = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
            const tb = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
            return tb - ta; // newest first
          })
          .slice(0, 5)
      : [];

  // --- Export report still works as CSV download ---
  const handleExportReport = () => {
    const rows: (string | number)[][] = [];

    rows.push(["Metric", "Value"]);
    rows.push(["Total Students", getTotalStudents()]);
    rows.push(["Active Lessons", getActiveLessons()]);
    rows.push(["Completion Rate (%)", getCompletionRate()]);
    rows.push(["Average Progress (%)", getAverageProgress()]);
    rows.push([]);
    rows.push(["Top Performers"]);
    rows.push(["Name", "Overall Progress (%)"]);

    getTopPerformers(100).forEach((tp) => {
      rows.push([tp.student.name, tp.overallProgress]);
    });

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "eduaid-admin-report.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-slate-800 dark:text-slate-100 mb-1">
              Admin Dashboard 🎓
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Monitor and manage the EduAid platform
            </p>
          </div>

          <Button variant="outline" size="sm" onClick={handleExportReport}>
            Export Report
          </Button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 border shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 ${s.iconBg} rounded-xl flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl mb-1">{s.value}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {s.title}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* New Students + Top Performers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* New Students (replaces Recent Activity) */}
              <div className="bg-white p-6 rounded-xl">
                <h2 className="text-xl mb-4">New Students</h2>
                {newStudents.length === 0 ? (
                  <div className="text-slate-400">
                    No students found yet.
                  </div>
                ) : (
                  newStudents.map((s: any) => (
                    <div
                      key={s?._id ?? s?.id ?? s?.email}
                      className="mb-3 border-b last:border-b-0 pb-2"
                    >
                      <div className="text-sm text-slate-800">
                        {s?.name || s?.fullName || "Unnamed Student"}
                      </div>
                      {s?.email && (
                        <div className="text-xs text-slate-500">
                          {s.email}
                        </div>
                      )}
                      {s?.createdAt && (
                        <div className="text-xs text-slate-400">
                          Joined{" "}
                          {new Date(s.createdAt).toLocaleString()}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Top Performers */}
              <div className="bg-white p-6 rounded-xl">
                <h2 className="text-xl mb-4">Top Performers</h2>
                {top.length === 0 ? (
                  <div className="text-slate-400">No performers yet</div>
                ) : (
                  top.map((tp) => (
                    <div
                      key={tp.student._id ?? tp.student.id}
                      className="mb-3"
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          {tp.student.name || tp.student.email}
                        </div>
                        <div className="text-lg text-emerald-600">
                          {tp.overallProgress}%
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
