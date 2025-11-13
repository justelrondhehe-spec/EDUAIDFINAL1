import { Bell, Calendar } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { InviteModal } from './modals/InviteModal';
import { NotificationsPanel } from './modals/NotificationsPanel';
import { CalendarPanel } from './modals/CalendarPanel';
import { ProfileMenu } from './modals/ProfileMenu';
import { DatePanel } from './modals/DatePanel';
import { SearchBar } from './SearchBar';
import { Page } from '../App';
import { useState } from 'react';

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
    setShowProfileMenu
  } = useApp();

  const [showDatePanel, setShowDatePanel] = useState(false);

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const date = today.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  
  const unreadCount = notifications.filter(n => !n.read).length;

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
          >
            <Calendar className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowDatePanel(true)}
            className="text-right ml-3 px-4 py-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-blue-100 dark:border-slate-600 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="text-slate-700 dark:text-slate-200">{dayName}</div>
            <div className="text-slate-500 dark:text-slate-400 text-sm">{date}</div>
          </button>
        </div>
      </header>

      {/* Modals */}
      {showInviteModal && <InviteModal onClose={() => setShowInviteModal(false)} />}
      {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
      {showCalendar && <CalendarPanel onClose={() => setShowCalendar(false)} />}
      {showProfileMenu && <ProfileMenu onClose={() => setShowProfileMenu(false)} onNavigate={onNavigate} />}
      {showDatePanel && <DatePanel onClose={() => setShowDatePanel(false)} />}
    </>
  );
}
