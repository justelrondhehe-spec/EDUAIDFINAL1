import { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'assignment';
}

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'lesson' | 'activity' | 'event';
  color: string;
}

interface AppContextType {
  notifications: Notification[];
  markNotificationAsRead: (id: number) => void;
  markAllNotificationsAsRead: () => void;
  calendarEvents: CalendarEvent[];
  showInviteModal: boolean;
  setShowInviteModal: (show: boolean) => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
  showProfileMenu: boolean;
  setShowProfileMenu: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'New Assignment',
      message: 'Math Problem Set #5 has been assigned',
      time: '10 minutes ago',
      read: false,
      type: 'assignment',
    },
    {
      id: 2,
      title: 'Deadline Reminder',
      message: 'Spelling Bee Practice is due today at 5:00 PM',
      time: '1 hour ago',
      read: false,
      type: 'warning',
    },
    {
      id: 3,
      title: 'Achievement Unlocked',
      message: 'You earned the "Speed Reader" badge!',
      time: '2 hours ago',
      read: false,
      type: 'success',
    },
    {
      id: 4,
      title: 'Lesson Available',
      message: 'New lesson: Story Time is now available',
      time: '1 day ago',
      read: true,
      type: 'info',
    },
  ]);

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: 'Spelling Bee Practice',
      date: 'Today',
      time: '5:00 PM',
      type: 'activity',
      color: 'from-red-500 to-pink-600',
    },
    {
      id: 2,
      title: 'Math Problem Set #5',
      date: 'Tomorrow',
      time: '3:00 PM',
      type: 'activity',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 3,
      title: 'Story Time: The Brave Little Bear',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'lesson',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 4,
      title: 'Story Writing: My Pet',
      date: 'Friday',
      time: '11:59 PM',
      type: 'activity',
      color: 'from-emerald-500 to-emerald-600',
    },
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  return (
    <AppContext.Provider
      value={{
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        calendarEvents,
        showInviteModal,
        setShowInviteModal,
        showNotifications,
        setShowNotifications,
        showCalendar,
        setShowCalendar,
        showProfileMenu,
        setShowProfileMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
