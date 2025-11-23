// frontend/src/components/MaintenanceGate.tsx
import React from "react";
import { Wrench, ShieldAlert, Clock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useGlobalData } from "../contexts/GlobalDataContext";
import { Button } from "./ui/button";

interface MaintenanceGateProps {
  children: React.ReactNode;
}

/**
 * Wraps authenticated app content.
 * - If maintenanceMode is OFF  → just renders children.
 * - If maintenanceMode is ON   → blocks non-admin users with a maintenance screen.
 * - Admins are always allowed through so they can manage content/settings.
 */
export function MaintenanceGate({ children }: MaintenanceGateProps) {
  const { user } = useAuth();
  const { settings } = useGlobalData();

  const maintenanceOn = settings?.maintenanceMode ?? false;
  const maintenanceMessage =
    settings?.maintenanceMessage ||
    "EduAid is currently under maintenance. Please check back soon.";

  const isAdmin = user?.role === "admin";

  // If maintenance is off, or this is an admin, show the normal app
  if (!maintenanceOn || isAdmin) {
    return <>{children}</>;
  }

  // Maintenance ON for a non-admin user (students)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4">
      <div className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8 md:p-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg">
            <Wrench className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          <p className="text-sm font-medium uppercase tracking-wide text-amber-600 dark:text-amber-300">
            Maintenance mode
          </p>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
          We&apos;re getting things ready for you
        </h1>

        <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm md:text-base">
          {maintenanceMessage}
        </p>

        <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 text-xs md:text-sm mb-6">
          <Clock className="w-4 h-4" />
          <span>Your progress is safe and will be available once we&apos;re back online.</span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-left text-sm text-slate-600 dark:text-slate-300 mb-4">
          <ul className="list-disc list-inside space-y-1">
            <li>You can&apos;t start new lessons or activities right now.</li>
            <li>Your completed work and progress will not be lost.</li>
            <li>If you need help, please talk to your teacher or parent/guardian.</li>
          </ul>
        </div>

        <Button
          type="button"
          className="w-full md:w-auto px-6 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700"
          disabled
        >
          Please check back soon
        </Button>
      </div>
    </div>
  );
}
