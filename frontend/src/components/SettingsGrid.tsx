// frontend/src/components/SettingsGrid.tsx
import {
  ChevronRight,
  UserCircle2,
  Accessibility,
  Bell,
  Globe2,
  Shield,
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

      {/* Grid of setting cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings – hidden for admins */}
        {!isAdmin && (
          <button
            onClick={() => go("profile-settings")}
            style={{ backgroundColor: "#2563EB" }} // blue-600
            className="group relative w-full text-left rounded-3xl px-6 py-6 md:py-7
                       shadow-lg hover:shadow-2xl hover:-translate-y-0.5
                       transition-all focus:outline-none focus-visible:ring-4
                       focus-visible:ring-blue-300"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <UserCircle2 className="w-6 h-6 text-white" />
              </div>
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
            <h2 className="text-white text-lg font-semibold mb-1">
              Profile Settings
            </h2>
            <p className="text-white/80 text-sm">
              Manage your personal information
            </p>
          </button>
        )}

        {/* Accessibility Settings */}
        <button
          onClick={() => go("accessibility-settings")}
          style={{ backgroundColor: "#DB2777" }} // pink-600
          className="group relative w-full text-left rounded-3xl px-6 py-6 md:py-7
                     shadow-lg hover:shadow-2xl hover:-translate-y-0.5
                     transition-all focus:outline-none focus-visible:ring-4
                     focus-visible:ring-pink-300"
        >
          <div className="flex items-start justify-between mb-5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Accessibility className="w-6 h-6 text-white" />
            </div>
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
              <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
          <h2 className="text-white text-lg font-semibold mb-1">
            Accessibility Settings
          </h2>
          <p className="text-white/80 text-sm">Customize your experience</p>
        </button>

        {/* Notification Settings */}
        <button
          onClick={() => go("notification-settings")}
          style={{ backgroundColor: "#0EA5E9" }} // sky-500
          className="group relative w-full text-left rounded-3xl px-6 py-6 md:py-7
                     shadow-lg hover:shadow-2xl hover:-translate-y-0.5
                     transition-all focus:outline-none focus-visible:ring-4
                     focus-visible:ring-sky-300"
        >
          <div className="flex items-start justify-between mb-5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
              <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
          <h2 className="text-white text-lg font-semibold mb-1">
            Notification Settings
          </h2>
          <p className="text-white/80 text-sm">Control your notifications</p>
        </button>

        {/* Language & Region */}
        <button
          onClick={() => go("language-region")}
          style={{ backgroundColor: "#10B981" }} // emerald-500
          className="group relative w-full text-left rounded-3xl px-6 py-6 md:py-7
                     shadow-lg hover:shadow-2xl hover:-translate-y-0.5
                     transition-all focus:outline-none focus-visible:ring-4
                     focus-visible:ring-emerald-300"
        >
          <div className="flex items-start justify-between mb-5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Globe2 className="w-6 h-6 text-white" />
            </div>
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
              <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
          <h2 className="text-white text-lg font-semibold mb-1">
            Language &amp; Region
          </h2>
          <p className="text-white/80 text-sm">Set your preferences</p>
        </button>

        {/* Privacy & Security */}
        <button
          onClick={() => go("privacy-security")}
          style={{ backgroundColor: "#F43F5E" }} // rose-500
          className="group relative w-full text-left rounded-3xl px-6 py-6 md:py-7
                     shadow-lg hover:shadow-2xl hover:-translate-y-0.5
                     transition-all focus:outline-none focus-visible:ring-4
                     focus-visible:ring-rose-300"
        >
          <div className="flex items-start justify-between mb-5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
              <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
          <h2 className="text-white text-lg font-semibold mb-1">
            Privacy &amp; Security
          </h2>
          <p className="text-white/80 text-sm">Protect your account</p>
        </button>
      </div>
    </div>
  );
}

export default SettingsGrid;
