// frontend/src/components/SettingsGrid.tsx
import {
  ChevronRight,
  UserCircle2,
  Accessibility,
} from "lucide-react";
import { Page } from "../App";
import { useAuth } from "../contexts/AuthContext";

interface SettingsGridProps {
  onNavigate?: (page: Page) => void;
}

export function SettingsGrid({ onNavigate }: SettingsGridProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const go = (page: Page) => {
    if (onNavigate) onNavigate(page);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
          Settings
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Profile Settings – hidden for admins */}
        {!isAdmin && (
          <button
            onClick={() => go("profile-settings")}
            style={{ backgroundColor: "#2563EB" }}
            className="group relative w-full text-left rounded-3xl px-6 py-6 md:py-7 shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <UserCircle2 className="w-6 h-6 text-white" />
              </div>
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                <ChevronRight className="w-5 h-5 text-white/80" />
              </div>
            </div>
            <h2 className="text-white text-lg font-semibold mb-1">
              Profile Settings
            </h2>
            <p className="text-white/80 text-sm">Manage your personal information</p>
          </button>
        )}

        {/* Accessibility Settings */}
        <button
          onClick={() => go("accessibility-settings")}
          style={{ backgroundColor: "#DB2777" }}
          className="group relative w-full text-left rounded-3xl px-6 py-6 md:py-7 shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-start justify-between mb-5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Accessibility className="w-6 h-6 text-white" />
            </div>
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-white/80" />
            </div>
          </div>
          <h2 className="text-white text-lg font-semibold mb-1">
            Accessibility Settings
          </h2>
          <p className="text-white/80 text-sm">Customize your experience</p>
        </button>

      </div>
    </div>
  );
}

export default SettingsGrid;
