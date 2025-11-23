// frontend/src/components/SettingsGrid.tsx
import { ChevronRight, UserCircle2, Accessibility, Bell, Users, Globe2, Shield } from 'lucide-react';
import { Page } from '../App';

interface SettingsGridProps {
  onNavigate?: (page: Page) => void;
}

export function SettingsGrid({ onNavigate }: SettingsGridProps) {
  const go = (page: Page) => {
    if (onNavigate) onNavigate(page);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-slate-800 dark:text-slate-100 mb-2">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Grid of setting cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <button
          onClick={() => go('profile-settings')}
          className="relative bg-gradient-to-br from-blue-500 to-indigo-600 text-left rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-blue-300/60"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <UserCircle2 className="w-6 h-6 text-white" />
            </div>
            <ChevronRight className="w-5 h-5 text-white/80" />
          </div>
          <h2 className="text-white text-lg mb-2">Profile Settings</h2>
          <p className="text-white/80 text-sm">
            Manage your personal information
          </p>
        </button>

        {/* Accessibility Settings */}
        <button
          onClick={() => go('accessibility-settings')}
          className="relative bg-gradient-to-br from-purple-500 to-pink-500 text-left rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-purple-300/60"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Accessibility className="w-6 h-6 text-white" />
            </div>
            <ChevronRight className="w-5 h-5 text-white/80" />
          </div>
          <h2 className="text-white text-lg mb-2">Accessibility Settings</h2>
          <p className="text-white/80 text-sm">
            Customize your experience
          </p>
        </button>

        {/* Notification Settings */}
        <button
          onClick={() => go('notification-settings')}
          className="relative bg-gradient-to-br from-cyan-500 to-sky-500 text-left rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-cyan-300/60"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <ChevronRight className="w-5 h-5 text-white/80" />
          </div>
          <h2 className="text-white text-lg mb-2">Notification Settings</h2>
          <p className="text-white/80 text-sm">
            Control your notifications
          </p>
        </button>

        {/* Guardian Settings */}
        <button
          onClick={() => go('guardian-settings')}
          className="relative bg-gradient-to-br from-indigo-500 to-violet-500 text-left rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-indigo-300/60"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <ChevronRight className="w-5 h-5 text-white/80" />
          </div>
          <h2 className="text-white text-lg mb-2">Guardian Settings</h2>
          <p className="text-white/80 text-sm">
            Manage guardian access
          </p>
        </button>

        {/* Language & Region */}
        <button
          onClick={() => go('language-region')}
          className="relative bg-gradient-to-br from-emerald-500 to-teal-500 text-left rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300/60"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Globe2 className="w-6 h-6 text-white" />
            </div>
            <ChevronRight className="w-5 h-5 text-white/80" />
          </div>
          <h2 className="text-white text-lg mb-2">Language &amp; Region</h2>
          <p className="text-white/80 text-sm">
            Set your preferences
          </p>
        </button>

        {/* Privacy & Security */}
        <button
          onClick={() => go('privacy-security')}
          className="relative bg-gradient-to-br from-rose-500 to-red-500 text-left rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-rose-300/60"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <ChevronRight className="w-5 h-5 text-white/80" />
          </div>
          <h2 className="text-white text-lg mb-2">Privacy &amp; Security</h2>
          <p className="text-white/80 text-sm">
            Protect your account
          </p>
        </button>
      </div>
    </div>
  );
}

export default SettingsGrid;
