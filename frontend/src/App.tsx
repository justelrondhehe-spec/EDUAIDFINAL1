import { useState } from 'react';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { AppProvider } from './contexts/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Lessons } from './components/Lessons';
import { Activities } from './components/Activities';
import { Progress } from './components/Progress';
import { SettingsGrid } from './components/SettingsGrid';
import { ProfileSettings } from './components/settings/ProfileSettings';
import { AccessibilitySettings } from './components/settings/AccessibilitySettings';
import { NotificationSettings } from './components/settings/NotificationSettings';
import { GuardianSettings } from './components/settings/GuardianSettings';
import { LanguageRegion } from './components/settings/LanguageRegion';
import { PrivacySecurity } from './components/settings/PrivacySecurity';
import { HelpPage } from './components/HelpPage';

export type Page = 
  | 'dashboard' 
  | 'lessons' 
  | 'activities' 
  | 'progress' 
  | 'settings' 
  | 'help'
  | 'profile-settings'
  | 'accessibility-settings'
  | 'notification-settings'
  | 'guardian-settings'
  | 'language-region'
  | 'privacy-security'
  | 'help-getting-started'
  | 'help-video-tutorials'
  | 'help-user-guide'
  | 'help-faqs';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'lessons':
        return <Lessons />;
      case 'activities':
        return <Activities />;
      case 'progress':
        return <Progress />;
      case 'settings':
        return <SettingsGrid onNavigate={setCurrentPage} />;
      case 'profile-settings':
        return <ProfileSettings onBack={() => setCurrentPage('settings')} />;
      case 'accessibility-settings':
        return <AccessibilitySettings onBack={() => setCurrentPage('settings')} />;
      case 'notification-settings':
        return <NotificationSettings onBack={() => setCurrentPage('settings')} />;
      case 'guardian-settings':
        return <GuardianSettings onBack={() => setCurrentPage('settings')} />;
      case 'language-region':
        return <LanguageRegion onBack={() => setCurrentPage('settings')} />;
      case 'privacy-security':
        return <PrivacySecurity onBack={() => setCurrentPage('settings')} />;
      case 'help':
      case 'help-getting-started':
      case 'help-video-tutorials':
      case 'help-user-guide':
      case 'help-faqs':
        return <HelpPage currentSection={currentPage} onNavigate={setCurrentPage} />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-slate-400 dark:text-slate-500 mb-2">Coming Soon</div>
              <div className="text-slate-600 dark:text-slate-400">This page is under development</div>
            </div>
          </div>
        );
    }
  };

  return (
    <AccessibilityProvider>
      <AppProvider>
        <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header onNavigate={setCurrentPage} />
            <main className="flex-1 overflow-y-auto p-8">
              {renderContent()}
            </main>
          </div>
        </div>
      </AppProvider>
    </AccessibilityProvider>
  );
}
