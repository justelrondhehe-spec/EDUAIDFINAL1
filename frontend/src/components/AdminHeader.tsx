import { Bell, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SearchBar } from './SearchBar';
import { useState } from 'react';
import { AdminNotificationsPanel } from './modals/AdminNotificationsPanel';
import { AdminProfileMenu } from './modals/AdminProfileMenu';
import { Page } from '../App';

interface AdminHeaderProps {
  onNavigate?: (page: Page) => void;
}

export function AdminHeader({ onNavigate }: AdminHeaderProps) {
  const [notificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <>
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6">
        {/* Search Bar */}
        <SearchBar onNavigate={onNavigate || (() => {})} />

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-6">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <button 
            onClick={() => setShowNotifications(true)}
            className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {/* User Menu */}
          <button 
            onClick={() => setShowProfileMenu(true)}
            className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Modals */}
      {showNotifications && <AdminNotificationsPanel onClose={() => setShowNotifications(false)} />}
      {showProfileMenu && <AdminProfileMenu onClose={() => setShowProfileMenu(false)} onNavigate={onNavigate} />}
    </>
  );
}
