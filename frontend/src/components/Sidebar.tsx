// frontend/src/components/Sidebar.tsx
import { LayoutGrid, Lightbulb, CheckSquare, TrendingUp, Settings, HelpCircle, LogOut, Users, BookOpen, Activity } from 'lucide-react';
import { Page } from '../App';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { user, logout } = useAuth();

  // derive user info + initials (fallbacks if not present)
  const displayName = user?.name ?? 'Guest User';
  const displayEmail = user?.email ?? '';
  const initials = (() => {
    if (!user?.name) return 'GU';
    const parts = user.name.split(' ').filter(Boolean);
    const slice = parts.slice(0, 2);
    return slice.map(p => p[0]?.toUpperCase() ?? '').join('');
  })();

  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', page: 'dashboard' as Page },
    { icon: Lightbulb, label: 'Lessons', page: 'lessons' as Page },
    { icon: CheckSquare, label: 'Activities', page: 'activities' as Page },
    { icon: TrendingUp, label: 'Progress', page: 'progress' as Page },
    { icon: Settings, label: 'Settings', page: 'settings' as Page },
    { icon: HelpCircle, label: 'Help', page: 'help' as Page },
  ];

  // admin-only items (visible only to admin users)
  const adminItems = [
    { icon: Users, label: 'Students', page: 'students' as Page },
    { icon: BookOpen, label: 'Content', page: 'content' as Page },
    { icon: Activity, label: 'Analytics', page: 'analytics' as Page },
  ];

  const isPageActive = (page: Page) => {
    if (page === 'settings') {
      return currentPage === 'settings' ||
             currentPage === 'profile-settings' ||
             currentPage === 'accessibility-settings' ||
             currentPage === 'notification-settings' ||
             currentPage === 'guardian-settings' ||
             currentPage === 'language-region' ||
             currentPage === 'privacy-security';
    }
    if (page === 'help') {
      return currentPage === 'help' ||
             currentPage === 'help-getting-started' ||
             currentPage === 'help-video-tutorials' ||
             currentPage === 'help-user-guide' ||
             currentPage === 'help-faqs';
    }
    return currentPage === page;
  };

  const isAdmin = user?.role === 'admin';

  return (
    <aside className="w-72 bg-gradient-to-b from-slate-800 to-slate-900 dark:from-slate-950 dark:to-black text-white flex flex-col shadow-2xl">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10"></div>
          <div className="relative">
            <div className="w-6 h-6 border-2 border-white rounded transform rotate-45"></div>
            <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
        <span className="text-white text-xl">EduAid</span>
      </div>

      {/* User Profile (clickable to open Profile Settings) */}
      <div className="px-6 pb-6">
        <button
          onClick={() => onNavigate('profile-settings')}
          className="w-full text-left"
          aria-label="Open profile settings"
        >
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/30 dark:from-slate-800/50 dark:to-slate-900/30 backdrop-blur-sm rounded-xl p-5 border border-slate-600/30 dark:border-slate-700/30 shadow-lg hover:scale-[1.01] transition-transform">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg text-white font-semibold">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="truncate font-medium text-white/95">{displayName}</div>
                <div className="text-slate-300 dark:text-slate-400 text-sm truncate">{displayEmail}</div>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = isPageActive(item.page);
          return (
            <button
              key={index}
              onClick={() => onNavigate(item.page)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-300 hover:bg-slate-700/50 dark:hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Admin Section */}
        {isAdmin && (
          <>
            <div className="mt-4 mb-2 px-2 text-xs text-slate-400">Admin</div>
            {adminItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = isPageActive(item.page);
              return (
                <button
                  key={`admin-${idx}`}
                  onClick={() => onNavigate(item.page)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-700/50 dark:hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </>
        )}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700/50 dark:border-slate-800/50">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
