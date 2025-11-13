import { Home, Users, FileText, BarChart3, Settings, HelpCircle } from 'lucide-react';

interface AdminSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function AdminSidebar({ currentPage, onNavigate }: AdminSidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white">
            <span className="text-lg">E</span>
          </div>
          <div>
            <h1 className="text-slate-800 dark:text-slate-100">EduAid Admin</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Management Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Admin Access Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <div>
            <div className="text-xs">Admin Access</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Full system privileges</div>
          </div>
        </div>
      </div>
    </div>
  );
}
