// frontend/src/components/Header.tsx
import React, { useState } from "react";
import { Bell, Calendar } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { InviteModal } from "./modals/InviteModal";
import { NotificationsPanel } from "./modals/NotificationsPanel";
import { CalendarPanel } from "./modals/CalendarPanel";
import { ProfileMenu } from "./modals/ProfileMenu";
import { DatePanel } from "./modals/DatePanel";
import { SearchBar } from "./SearchBar";
import { Page } from "../App";
import { useAuth } from "../contexts/AuthContext";

interface HeaderProps {
  onNavigate: (page: Page) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const {
    notifications,
    showInviteModal,
    setShowInviteModal,
    showNotifications,
    setShowNotifications,
    showCalendar,
    setShowCalendar,
    showProfileMenu,
    setShowProfileMenu,
  } = useApp();

  const { user } = useAuth();

  const [showDatePanel, setShowDatePanel] = useState(false);

  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const date = today.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const displayName = user?.name ?? "Guest User";
  const displayEmail = user?.email ?? "";
  const initials = (() => {
    if (!user?.name) return "GU";
    const parts = user.name.split(" ").filter(Boolean);
    return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
  })();

  return (
    <>
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60 px-8 py-4 flex items-center justify-between shadow-sm">
        {/* Search Bar */}
        <SearchBar onNavigate={onNavigate} />

        {/* Right Section */}
        <div className="flex items-center gap-3 ml-8">
          <button
            onClick={() => setShowNotifications(true)}
            className="relative w-11 h-11 bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 text-white rounded-xl flex items-center justify-center hover:shadow-lg transition-all group"
            aria-label="Show notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setShowCalendar(true)}
            className="w-11 h-11 bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 text-white rounded-xl flex items-center justify-center hover:shadow-lg transition-all"
            aria-label="Open calendar"
          >
            <Calendar className="w-5 h-5" />
          </button>

          <button
            onClick={() => setShowDatePanel(true)}
            className="text-right ml-3 px-4 py-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-blue-100 dark:border-slate-600 hover:shadow-lg transition-all cursor-pointer"
            aria-label="Open date panel"
          >
            <div className="text-slate-700 dark:text-slate-200">{dayName}</div>
            <div className="text-slate-500 dark:text-slate-400 text-sm">{date}</div>
          </button>

          {/* Profile block — shows initials + name/email; opens ProfileMenu */}
          <button
            onClick={() => {
              console.log("DEBUG: profile button clicked — setShowProfileMenu(true) called");
              setShowProfileMenu(true);
            }}
            className="flex items-center gap-3 ml-4 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            aria-label="Open profile menu"
            type="button"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold">
              {initials}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <div className="text-sm font-medium text-slate-800 dark:text-slate-100">{displayName}</div>
              <div
                className="text-xs text-slate-500 dark:text-slate-400 truncate"
                style={{ maxWidth: 160 }}
              >
                {displayEmail}
              </div>
            </div>
          </button>
        </div>
      </header>

      {/* Modals / Panels (rendered outside header) */}
      {showInviteModal && <InviteModal onClose={() => setShowInviteModal(false)} />}
      {showNotifications && (
        <NotificationsPanel onClose={() => setShowNotifications(false)} />
      )}
      {showCalendar && <CalendarPanel onClose={() => setShowCalendar(false)} />}
      {showProfileMenu && (
        <ProfileMenu onClose={() => setShowProfileMenu(false)} onNavigate={onNavigate} />
      )}
      {showDatePanel && <DatePanel onClose={() => setShowDatePanel(false)} />}
    </>
  );
}

export default Header;
