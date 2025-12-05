import { Bell, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SearchBar } from './SearchBar';
import { useState, useEffect } from 'react';
import { AdminNotificationsPanel } from './modals/AdminNotificationsPanel';
import { AdminProfileMenu } from './modals/AdminProfileMenu';
import { Page } from './../App';
import { useAuth } from './../contexts/AuthContext'; // To get the token

interface AdminHeaderProps {
  onNavigate?: (page: Page) => void;
}

export function AdminHeader({ onNavigate }: AdminHeaderProps) {
  const { token } = useAuth(); // Needed for authenticated requests
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // State for real notification data
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // 1. Fetch Notifications from API
  const fetchNotifications = async () => {
    if (!token) return;
    try {
      const res = await fetch('http://localhost:5000/api/admin/notifications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
        // Calculate unread count
        setUnreadCount(data.filter((n: any) => !n.read).length);
      }
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    }
  };

  // 2. Poll every 30 seconds to keep it updated
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [token]);

  // 3. Handle "Mark All as Read" action
  const handleMarkAllRead = async () => {
    try {
      await fetch('http://localhost:5000/api/admin/notifications/read-all', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // Optimistically update UI
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6">
        {/* Search Bar */}
        <SearchBar onNavigate={onNavigate || (() => {})} />

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-6">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications Button */}
          <button 
            onClick={() => setShowNotifications(true)}
            className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
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
      {showNotifications && (
        <AdminNotificationsPanel 
          onClose={() => setShowNotifications(false)} 
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
        />
      )}
      
      {showProfileMenu && (
        <AdminProfileMenu 
          onClose={() => setShowProfileMenu(false)} 
          onNavigate={onNavigate} 
        />
      )}
    </>
  );
}