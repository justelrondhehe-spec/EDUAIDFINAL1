import { LayoutGrid, Lightbulb, CheckSquare, TrendingUp, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Page } from '../App';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', page: 'dashboard' as Page },
    { icon: Lightbulb, label: 'Lessons', page: 'lessons' as Page },
    { icon: CheckSquare, label: 'Activities', page: 'activities' as Page },
    { icon: TrendingUp, label: 'Progress', page: 'progress' as Page },
    { icon: Settings, label: 'Settings', page: 'settings' as Page },
    { icon: HelpCircle, label: 'Help', page: 'help' as Page },
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

      {/* User Profile */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/30 dark:from-slate-800/50 dark:to-slate-900/30 backdrop-blur-sm rounded-xl p-5 border border-slate-600/30 dark:border-slate-700/30 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white">DM</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate">Daniel Mendoza</div>
              <div className="text-slate-300 dark:text-slate-400 text-sm truncate">danielmendoza0830@gmail.com</div>
            </div>
          </div>
        </div>
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
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700/50 dark:border-slate-800/50">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-all">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
