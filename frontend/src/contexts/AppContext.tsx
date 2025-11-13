import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { lessonsData } from '../data/lessonsData';
import { activitiesData } from '../data/activitiesData';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'assignment';
}

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'lesson' | 'activity';
  color: string;
  lessonId?: number;
  activityId?: number;
}

interface LessonProgress {
  lessonId: number;
  startedDate: Date;
  expirationDate: Date;
  progressPercent: number;
  completed: boolean;
  completedDate?: Date;
}

interface ActivityScore {
  activityId: number;
  score: number;
  maxScore: number;
  dueDate: Date | null;
  completed: boolean;
  completedDate?: Date;
}

interface RecentActivity {
  id: number;
  title: string;
  time: string;
  icon: string;
  color: string;
  timestamp: Date;
}

interface AppContextType {
  notifications: Notification[];
  markNotificationAsRead: (id: number) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  calendarEvents: CalendarEvent[];
  showInviteModal: boolean;
  setShowInviteModal: (show: boolean) => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  showNotificationsPanel: boolean;
  setShowNotificationsPanel: (show: boolean) => void;
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
  showProfileMenu: boolean;
  setShowProfileMenu: (show: boolean) => void;
  
  // Lesson tracking
  lessonProgress: Record<number, LessonProgress>;
  startLesson: (lessonId: number) => void;
  updateLessonProgress: (lessonId: number, percent: number) => void;
  completeLesson: (lessonId: number) => void;
  saveAndExitLesson: (lessonId: number, percent: number) => void;
  
  // Activity tracking
  activityScores: Record<number, ActivityScore>;
  completeActivity: (activityId: number, score: number, maxScore: number) => void;
  
  // Stats
  overallProgressPercent: number;
  achievementsEarned: number;
  recentActivities: RecentActivity[];
  
  // Auth
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  currentUser: { name: string; email: string } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Lesson and activity tracking
  const [lessonProgress, setLessonProgress] = useState<Record<number, LessonProgress>>({});
  const [activityScores, setActivityScores] = useState<Record<number, ActivityScore>>({});
  
  const [overallProgressPercent, setOverallProgressPercent] = useState(0);
  const [achievementsEarned, setAchievementsEarned] = useState(3);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  // Check for expired lessons on mount and periodically
  useEffect(() => {
    const checkExpiredLessons = () => {
      const now = new Date();
      setLessonProgress(prev => {
        const updated = { ...prev };
        let hasChanges = false;
        
        Object.values(updated).forEach(lesson => {
          if (!lesson.completed && now > lesson.expirationDate) {
            // Reset the lesson progress
            delete updated[lesson.lessonId];
            hasChanges = true;
            
            addNotification({
              title: 'Lesson Expired ⏰',
              message: `Your progress on lesson ${lesson.lessonId} has been reset. You can start it again anytime!`,
              time: 'Just now',
              read: false,
              type: 'warning',
            });
          }
        });
        
        return hasChanges ? updated : prev;
      });
    };
    
    checkExpiredLessons();
    const interval = setInterval(checkExpiredLessons, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  // Update calendar events when lessons or activities change
  useEffect(() => {
    const events: CalendarEvent[] = [];
    
    // Add lesson expiration dates
    Object.values(lessonProgress).forEach(lesson => {
      if (!lesson.completed) {
        const lessonData = lessonsData.find(l => l.id === lesson.lessonId);
        const lessonTitle = lessonData?.title || `Lesson ${lesson.lessonId}`;
        events.push({
          id: `lesson-${lesson.lessonId}`,
          title: `${lessonTitle} - Expires`,
          date: lesson.expirationDate,
          type: 'lesson',
          color: 'from-purple-500 to-purple-600',
          lessonId: lesson.lessonId,
        });
      }
    });
    
    // Add activity due dates from activities data
    activitiesData.forEach(activity => {
      // Check if activity is unlocked (related lesson is completed or no related lesson)
      const isUnlocked = activity.relatedLessonId === undefined || 
        lessonProgress[activity.relatedLessonId]?.completed || false;
      
      // Check if activity is not completed
      const activityScore = activityScores[activity.id];
      const isCompleted = activityScore?.completed || false;
      
      // Only add if unlocked and not completed
      if (isUnlocked && !isCompleted) {
        // Use due date from activityScores if available, otherwise use dueTimestamp from activity data
        let dueDate: Date | null = null;
        
        if (activityScore?.dueDate) {
          dueDate = activityScore.dueDate;
        } else if (activity.dueTimestamp) {
          dueDate = new Date(activity.dueTimestamp);
        }
        
        // Only add event if there's a due date
        if (dueDate) {
          events.push({
            id: `activity-${activity.id}`,
            title: `Due: ${activity.title}`,
            date: dueDate,
            type: 'activity',
            color: activity.color || 'from-blue-500 to-indigo-600',
            activityId: activity.id,
          });
        }
      }
    });
    
    setCalendarEvents(events);
  }, [lessonProgress, activityScores]);

  // Calculate overall progress percentage based on activity scores
  useEffect(() => {
    const completedActivities = Object.values(activityScores).filter(a => a.completed);
    
    if (completedActivities.length === 0) {
      setOverallProgressPercent(0);
      return;
    }
    
    // Calculate average percentage across all completed activities
    const totalPercentage = completedActivities.reduce((sum, activity) => {
      return sum + (activity.score / activity.maxScore) * 100;
    }, 0);
    
    const averagePercent = Math.round(totalPercentage / completedActivities.length);
    setOverallProgressPercent(averagePercent);
  }, [activityScores]);

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

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    setNotifications(prev => {
      const newId = Date.now() + Math.floor(Math.random() * 1000);
      return [{
        id: newId,
        ...notification,
      }, ...prev];
    });
  };

  const addRecentActivity = (activity: Omit<RecentActivity, 'id'>) => {
    setRecentActivities(prev => {
      const newId = Date.now() + Math.floor(Math.random() * 1000);
      return [{
        id: newId,
        ...activity,
      }, ...prev].slice(0, 10); // Keep only the 10 most recent
    });
  };

  const startLesson = (lessonId: number) => {
    setLessonProgress(prev => {
      if (prev[lessonId]) return prev; // Already started
      
      const startedDate = new Date();
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7); // 7 days to complete
      
      addNotification({
        title: 'Lesson Started! 📚',
        message: `You have 7 days to complete this lesson. Your progress will be saved automatically.`,
        time: 'Just now',
        read: false,
        type: 'info',
      });
      
      return {
        ...prev,
        [lessonId]: {
          lessonId,
          startedDate,
          expirationDate,
          progressPercent: 0,
          completed: false,
        },
      };
    });
  };

  const updateLessonProgress = (lessonId: number, percent: number) => {
    setLessonProgress(prev => {
      if (!prev[lessonId]) return prev;
      
      return {
        ...prev,
        [lessonId]: {
          ...prev[lessonId],
          progressPercent: Math.min(percent, 100),
        },
      };
    });
  };

  const saveAndExitLesson = (lessonId: number, percent: number) => {
    updateLessonProgress(lessonId, percent);
    addNotification({
      title: 'Progress Saved! 💾',
      message: 'Your lesson progress has been saved. You can continue anytime!',
      time: 'Just now',
      read: false,
      type: 'success',
    });
  };

  const completeLesson = (lessonId: number) => {
    setLessonProgress(prev => {
      const lesson = prev[lessonId];
      if (!lesson || lesson.completed) return prev;
      
      const completedLessons = Object.values(prev).filter(l => l.completed).length;
      const newCompletedCount = completedLessons + 1;
      const completedDate = new Date();
      
      // Add to recent activities
      const lessonData = lessonsData.find(l => l.id === lessonId);
      const lessonTitle = lessonData?.title || `Lesson ${lessonId}`;
      addRecentActivity({
        title: `Completed "${lessonTitle}"`,
        time: 'Just now',
        icon: '✅',
        color: 'text-emerald-500',
        timestamp: completedDate,
      });
      
      // Add notification for lesson completion
      addNotification({
        title: 'Lesson Completed! 🎉',
        message: 'Great job! You successfully completed the lesson',
        time: 'Just now',
        read: false,
        type: 'success',
      });
      
      // Initialize activity scores for related activities with due dates
      setActivityScores(prevScores => {
        const updatedScores = { ...prevScores };
        const relatedActivities = activitiesData.filter(a => a.relatedLessonId === lessonId);
        
        relatedActivities.forEach(activity => {
          if (!updatedScores[activity.id]) {
            const dueDate = new Date(completedDate);
            dueDate.setDate(dueDate.getDate() + 1); // Due in 1 day
            
            updatedScores[activity.id] = {
              activityId: activity.id,
              score: 0,
              maxScore: activity.totalQuestions || 100,
              dueDate,
              completed: false,
            };
          }
        });
        
        return updatedScores;
      });
      
      // Notify about unlocked activities
      setTimeout(() => {
        addNotification({
          title: 'New Activities Unlocked! 🎮',
          message: 'Complete the lesson activities within 1 day to earn badges!',
          time: 'Just now',
          read: false,
          type: 'info',
        });
      }, 2000);
      
      // Achievement for completing first lesson
      if (newCompletedCount === 1) {
        setAchievementsEarned(count => count + 1);
        setTimeout(() => {
          addNotification({
            title: 'Achievement Unlocked! 🏆',
            message: 'You earned the "Eager Learner" badge for completing your first lesson!',
            time: 'Just now',
            read: false,
            type: 'success',
          });
        }, 3000);
      }
      
      // Achievement for completing 5 lessons
      if (newCompletedCount === 5) {
        setAchievementsEarned(count => count + 1);
        addNotification({
          title: 'Achievement Unlocked! 🏆',
          message: 'You earned the "Knowledge Seeker" badge for completing 5 lessons!',
          time: 'Just now',
          read: false,
          type: 'success',
        });
      }
      
      // Achievement for completing 10 lessons
      if (newCompletedCount === 10) {
        setAchievementsEarned(count => count + 1);
        addNotification({
          title: 'Achievement Unlocked! 🏆',
          message: 'You earned the "Master Student" badge for completing 10 lessons!',
          time: 'Just now',
          read: false,
          type: 'success',
        });
      }
      
      return {
        ...prev,
        [lessonId]: {
          ...lesson,
          progressPercent: 100,
          completed: true,
          completedDate,
        },
      };
    });
  };

  const completeActivity = (activityId: number, score: number, maxScore: number) => {
    setActivityScores(prev => {
      const activity = prev[activityId];
      if (activity && activity.completed) return prev; // Already completed
      
      const percentScore = Math.round((score / maxScore) * 100);
      const completedDate = new Date();
      
      // Add to recent activities
      const activityData = activitiesData.find(a => a.id === activityId);
      const activityTitle = activityData?.title || `Activity ${activityId}`;
      addRecentActivity({
        title: `Completed "${activityTitle}"`,
        time: 'Just now',
        icon: '✅',
        color: 'text-emerald-500',
        timestamp: completedDate,
      });
      
      // Add notification for activity completion
      const message = percentScore === 100 
        ? `Perfect score! You got ${score}/${maxScore} correct! 🌟`
        : `You got ${score}/${maxScore} correct (${percentScore}%). Try again to improve!`;
      
      addNotification({
        title: 'Activity Completed! ✅',
        message,
        time: 'Just now',
        read: false,
        type: percentScore === 100 ? 'success' : 'info',
      });
      
      // Check for achievement milestones
      const completedActivities = Object.values(prev).filter(a => a.completed).length;
      const newCompletedCount = completedActivities + 1;
      
      // First activity achievement
      if (newCompletedCount === 1) {
        setAchievementsEarned(count => count + 1);
        setTimeout(() => {
          addNotification({
            title: 'Achievement Unlocked! 🏆',
            message: 'You earned the "First Steps" badge for completing your first activity!',
            time: 'Just now',
            read: false,
            type: 'success',
          });
        }, 1500);
      }
      
      // 5 activities achievement
      if (newCompletedCount === 5) {
        setAchievementsEarned(count => count + 1);
        addNotification({
          title: 'Achievement Unlocked! 🏆',
          message: 'You earned the "Practice Makes Perfect" badge!',
          time: 'Just now',
          read: false,
          type: 'success',
        });
      }
      
      // 10 activities achievement
      if (newCompletedCount === 10) {
        setAchievementsEarned(count => count + 1);
        addNotification({
          title: 'Achievement Unlocked! 🏆',
          message: 'You earned the "Activity Champion" badge!',
          time: 'Just now',
          read: false,
          type: 'success',
        });
      }
      
      // Perfect score achievement
      if (percentScore === 100 && !Object.values(prev).some(a => a.score === a.maxScore && a.completed)) {
        setAchievementsEarned(count => count + 1);
        setTimeout(() => {
          addNotification({
            title: 'Achievement Unlocked! 🏆',
            message: 'You earned the "Perfectionist" badge for getting a perfect score!',
            time: 'Just now',
            read: false,
            type: 'success',
          });
        }, 2000);
      }
      
      return {
        ...prev,
        [activityId]: {
          activityId,
          score,
          maxScore,
          dueDate: activity?.dueDate || null,
          completed: true,
          completedDate: new Date(),
        },
      };
    });
  };

  const login = (email: string, password: string) => {
    setIsAuthenticated(true);
    setCurrentUser({
      name: 'Daniel',
      email: email,
    });
    
    setTimeout(() => {
      addNotification({
        title: 'Welcome Back! 👋',
        message: 'Ready to continue your learning journey?',
        time: 'Just now',
        read: false,
        type: 'info',
      });
    }, 500);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
        calendarEvents,
        showInviteModal,
        setShowInviteModal,
        showNotifications,
        setShowNotifications,
        showNotificationsPanel,
        setShowNotificationsPanel,
        showCalendar,
        setShowCalendar,
        showProfileMenu,
        setShowProfileMenu,
        lessonProgress,
        startLesson,
        updateLessonProgress,
        completeLesson,
        saveAndExitLesson,
        activityScores,
        completeActivity,
        overallProgressPercent,
        achievementsEarned,
        recentActivities,
        isAuthenticated,
        login,
        logout,
        currentUser,
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
