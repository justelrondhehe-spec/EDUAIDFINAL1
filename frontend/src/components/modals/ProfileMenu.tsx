// frontend/src/components/modals/ProfileMenu.tsx
import React, { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LogOut, User, Settings, ChevronRight } from "lucide-react";

type Props = {
  onClose: () => void;
  onNavigate?: (page: string) => void;
};

export function ProfileMenu({ onClose, onNavigate }: Props) {
  const { user, logout } = useAuth();

  // create container synchronously so it exists on first render
  const container = useMemo(() => document.createElement("div"), []);
  const openedAtRef = useRef<number | null>(null);

  useEffect(() => {
    // attach to body
    document.body.appendChild(container);

    // record the open time so the opening click doesn't immediately close it
    openedAtRef.current = Date.now();

    return () => {
      // remove container when unmounting
      if (container.parentNode) container.parentNode.removeChild(container);
      openedAtRef.current = null;
    };
  }, [container]);

  useEffect(() => {
    // ignore clicks that occur within a small time window after opening
    const toleranceMs = 80;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      // if it's still very soon after opening, ignore (prevents immediate close)
      if (openedAtRef.current && Date.now() - openedAtRef.current < toleranceMs) {
        return;
      }

      // if click is inside the container, ignore
      if (container.contains(target)) return;

      // otherwise, close
      onClose();
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onDocClick, true); // use capture to be reliable

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick, true);
    };
  }, [container, onClose]);

  const name = user?.name ?? "Guest User";
  const email = user?.email ?? "";
  const initials = (() => {
    if (!user?.name) return "GU";
    const parts = user.name.split(" ").filter(Boolean);
    return parts.slice(0, 2).map((p) => p[0].toUpperCase()).join("");
  })();

  const goToProfile = () => {
    onClose();
    onNavigate?.("profile-settings");
  };

  const goToSettings = () => {
    onClose();
    onNavigate?.("settings");
  };

  const handleLogout = () => {
    onClose();
    logout();
  };

  // small dropdown fixed to top-right of viewport
  const menu = (
    <div style={{ position: "fixed", top: 16, right: 16, zIndex: 9999 }} role="dialog" aria-modal="true">
      <div className="w-72 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 flex items-center gap-3 border-b border-slate-100 dark:border-slate-700">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white flex items-center justify-center font-semibold">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{email}</div>
          </div>
        </div>

        <div className="flex flex-col p-2">
          <button
            onClick={goToProfile}
            className="flex items-center justify-between gap-3 w-full px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 transition text-left"
            type="button"
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              <div>
                <div className="text-sm text-slate-800 dark:text-slate-100">Profile settings</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Manage your profile</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={goToSettings}
            className="flex items-center justify-between gap-3 w-full px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 transition text-left mt-1"
            type="button"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              <div>
                <div className="text-sm text-slate-800 dark:text-slate-100">Settings</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">App preferences</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <div className="border-t border-slate-100 dark:border-slate-700 my-2" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition text-left text-red-600 dark:text-red-400"
            type="button"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(menu, container);
}

export default ProfileMenu;
