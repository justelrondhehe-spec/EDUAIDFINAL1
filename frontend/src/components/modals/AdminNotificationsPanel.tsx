import { X, CheckCheck, UserPlus, AlertCircle, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';

interface AdminNotificationsPanelProps {
  onClose: () => void;
}

export function AdminNotificationsPanel({ onClose }: AdminNotificationsPanelProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'new_enrollment',
      title: 'New Student Enrollment',
      message: 'Emily Johnson has enrolled in the platform',
      time: '2 minutes ago',
      read: false,
      icon: UserPlus,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      id: 2,
      type: 'content_review',
      title: 'Content Review Required',
      message: 'Math Lesson 45 needs your review',
      time: '15 minutes ago',
      read: false,
      icon: AlertCircle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Student Achievement',
      message: 'Sarah Martinez completed Advanced Reading module',
      time: '1 hour ago',
      read: false,
      icon: TrendingUp,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    {
      id: 4,
      type: 'system',
      title: 'System Update',
      message: 'Platform update completed successfully',
      time: '2 hours ago',
      read: true,
      icon: CheckCheck,
      color: 'text-slate-500',
      bgColor: 'bg-slate-50 dark:bg-slate-800',
    },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-end p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-96 border border-slate-200 dark:border-slate-700 mt-16 mr-4 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl text-slate-800 dark:text-slate-100">Notifications</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
            </p>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700"
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`p-4 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer ${
                  !notification.read ? 'bg-purple-50/50 dark:bg-purple-900/10' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-lg ${notification.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${notification.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm text-slate-800 dark:text-slate-100">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-purple-500 mt-1 flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <Button 
            variant="ghost" 
            className="w-full text-purple-600 dark:text-purple-400 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
          >
            View All Notifications
          </Button>
        </div>
      </div>
    </div>
  );
}
