import { X, User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Page } from '../../App';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileMenuProps {
  onClose: () => void;
  onNavigate: (page: Page) => void;
}

export function ProfileMenu({ onClose, onNavigate }: ProfileMenuProps) {
  const { totalPoints, completedActivities, completedLessons, achievementsEarned } = useApp();
  const { logout } = useAuth();
  
  const handleNavigation = (page: Page) => {
    onNavigate(page);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-end p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-80 border border-slate-200 dark:border-slate-700 mt-16 mr-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg">
              <span className="text-xl">DM</span>
            </div>
            <div className="flex-1">
              <h3 className="text-slate-800 dark:text-slate-100">Daniel Mendoza</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Grade 8 Student</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl text-slate-800 dark:text-slate-100 mb-1">{totalPoints}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Points</div>
            </div>
            <div>
              <div className="text-2xl text-slate-800 dark:text-slate-100 mb-1">{completedActivities.length + completedLessons.length}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Completed</div>
            </div>
            <div>
              <div className="text-2xl text-slate-800 dark:text-slate-100 mb-1">{achievementsEarned}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Badges</div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2">
          <button
            onClick={() => handleNavigation('profile-settings')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
          >
            <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <span className="text-slate-700 dark:text-slate-300">Profile Settings</span>
          </button>
          <button
            onClick={() => handleNavigation('settings')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
          >
            <Settings className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <span className="text-slate-700 dark:text-slate-300">Settings</span>
          </button>
          <button
            onClick={() => handleNavigation('help')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
          >
            <HelpCircle className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <span className="text-slate-700 dark:text-slate-300">Help & Support</span>
          </button>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
