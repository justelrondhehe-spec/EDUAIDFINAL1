import { useState } from 'react';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GlobalDataProvider } from './contexts/GlobalDataContext';
import { HomePage, InfoPage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { InfoPagesWrapper } from './components/InfoPagesWrapper';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { AdminStudents } from './components/AdminStudents';
import { AdminContent } from './components/AdminContent';
import { AdminAnalytics } from './components/AdminAnalytics';
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
import { ShapesColorsLesson } from './components/ShapesColorsLesson';
import { ShapeColorSorter } from './components/ShapeColorSorter';
import { StudentDataSync } from './components/StudentDataSync';
import { AuthDataSync } from './components/AuthDataSync';

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
  | 'help-faqs'
  | 'lesson-shapes-colors'
  | 'activity-shape-color-sorter'
  | 'students'
  | 'content'
  | 'analytics';

function MainApp() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const isAdmin = user?.role === 'admin';

  const renderContent = () => {
    // Admin-specific pages
    if (isAdmin) {
      switch (currentPage) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'students':
          return <AdminStudents />;
        case 'content':
          return <AdminContent />;
        case 'analytics':
          return <AdminAnalytics />;
        case 'settings':
          return <SettingsGrid onNavigate={setCurrentPage} />;
        case 'help':
        case 'help-getting-started':
        case 'help-video-tutorials':
        case 'help-user-guide':
        case 'help-faqs':
          return <HelpPage currentSection={currentPage} onNavigate={setCurrentPage} />;
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
    }

    // Student pages
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'lessons':
        return <Lessons onNavigate={setCurrentPage} />;
      case 'activities':
        return <Activities onNavigate={setCurrentPage} />;
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
      case 'lesson-shapes-colors':
        return <ShapesColorsLesson onBack={() => setCurrentPage('lessons')} />;
      case 'activity-shape-color-sorter':
        return <ShapeColorSorter onBack={() => setCurrentPage('activities')} />;
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

  // Render admin interface differently from student interface
  if (isAdmin) {
    return (
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
        <AdminSidebar currentPage={currentPage} onNavigate={setCurrentPage} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader onNavigate={setCurrentPage} />
          <main className="flex-1 overflow-y-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    );
  }

  // Student interface
  return (
    <>
      <StudentDataSync />
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onNavigate={setCurrentPage} />
          <main className="flex-1 overflow-y-auto p-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </>
  );
}

type AppView = 'home' | 'login' | 'signup' | InfoPage;

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('home');

  // If authenticated, show the main app
  if (isAuthenticated) {
    return <MainApp />;
  }

  // If not authenticated, handle navigation between home, login, signup, and info pages
  if (currentView === 'login') {
    return (
      <LoginPage
        onNavigateToHome={() => setCurrentView('home')}
        onNavigateToSignup={() => setCurrentView('signup')}
      />
    );
  }

  if (currentView === 'signup') {
    return (
      <SignupPage
        onNavigateToHome={() => setCurrentView('home')}
        onNavigateToLogin={() => setCurrentView('login')}
      />
    );
  }

  if (currentView !== 'home') {
    // It's an info page
    return (
      <InfoPagesWrapper
        page={currentView as InfoPage}
        onNavigateToHome={() => setCurrentView('home')}
        onNavigateToLogin={() => setCurrentView('login')}
        onNavigateToSignup={() => setCurrentView('signup')}
      />
    );
  }

  // Default: show home page
  return (
    <HomePage
      onNavigateToLogin={() => setCurrentView('login')}
      onNavigateToSignup={() => setCurrentView('signup')}
      onNavigateToInfo={(page) => setCurrentView(page)}
    />
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <GlobalDataProvider>
          <AppProvider>
            <AuthDataSync />
            <AppContent />
          </AppProvider>
        </GlobalDataProvider>
      </AuthProvider>
    </AccessibilityProvider>
  );
}
