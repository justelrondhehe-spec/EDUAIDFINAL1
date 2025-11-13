import { User, Settings, HelpCircle, LogOut, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Page } from '../../App';
import { useAuth } from '../../contexts/AuthContext';

interface AdminProfileMenuProps {
  onClose: () => void;
  onNavigate?: (page: Page) => void;
}

export function AdminProfileMenu({ onClose, onNavigate }: AdminProfileMenuProps) {
  const { logout, user } = useAuth();
  
  const handleNavigation = (page: Page) => {
    if (onNavigate) {
      onNavigate(page);
    }
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
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg">
              <Shield className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-800 dark:text-slate-100">{user?.name || 'Admin User'}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Administrator</p>
            </div>
          </div>
        </div>

        {/* Admin Badge */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <Shield className="w-4 h-4" />
            <div>
              <div className="text-sm">Admin Access</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Full system privileges</div>
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
