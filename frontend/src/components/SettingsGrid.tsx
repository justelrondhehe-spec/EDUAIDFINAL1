import { User, Accessibility, Bell, Users, Globe, Shield, ChevronRight } from 'lucide-react';
import { Page } from '../App';

interface SettingsGridProps {
  onNavigate: (page: Page) => void;
}

export function SettingsGrid({ onNavigate }: SettingsGridProps) {
  const settings = [
    { 
      icon: User, 
      label: 'Profile Settings', 
      description: 'Manage your personal information',
      color: 'from-blue-500 to-blue-600',
      page: 'profile-settings' as Page
    },
    { 
      icon: Accessibility, 
      label: 'Accessibility Settings', 
      description: 'Customize your experience',
      color: 'from-purple-500 to-purple-600',
      page: 'accessibility-settings' as Page
    },
    { 
      icon: Bell, 
      label: 'Notification Settings', 
      description: 'Control your notifications',
      color: 'from-cyan-500 to-cyan-600',
      page: 'notification-settings' as Page
    },
    { 
      icon: Users, 
      label: 'Guardian Settings', 
      description: 'Manage guardian access',
      color: 'from-indigo-500 to-indigo-600',
      page: 'guardian-settings' as Page
    },
    { 
      icon: Globe, 
      label: 'Language & Region', 
      description: 'Set your preferences',
      color: 'from-emerald-500 to-emerald-600',
      page: 'language-region' as Page
    },
    { 
      icon: Shield, 
      label: 'Privacy & Security', 
      description: 'Protect your account',
      color: 'from-rose-500 to-rose-600',
      page: 'privacy-security' as Page
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-slate-800 mb-2">Settings</h1>
        <p className="text-slate-600">Manage your account settings and preferences</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settings.map((setting, index) => {
          const Icon = setting.icon;
          return (
            <button
              key={index}
              onClick={() => onNavigate(setting.page)}
              className={`bg-gradient-to-br ${setting.color} text-white rounded-2xl p-6 flex flex-col hover:shadow-2xl hover:scale-105 transition-all duration-300 group relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                    <Icon className="w-7 h-7" />
                  </div>
                  <ChevronRight className="w-6 h-6 opacity-70 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-left">
                  <div className="mb-1">{setting.label}</div>
                  <div className="text-white/80 text-sm">{setting.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
