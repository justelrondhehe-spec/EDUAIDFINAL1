// src/App.tsx
import { useEffect, useState } from "react";

// --- Activity Imports ---
import { NumberCountingActivity } from "./components/NumberCountingActivity";
import { ReadingComprehensionActivity } from "./components/ReadingComprehensionActivity";
import { ScienceExperimentActivity } from "./components/ScienceExperimentActivity";
import { MusicRhythmActivity } from "./components/MusicRhythmActivity";
import { OurEmotionsActivity } from "./components/OurEmotionsActivity";
import { ShapeColorSorter } from "./components/ShapeColorSorter";

// --- Lesson Imports ---
import { ShapesColorsLesson } from "./components/ShapesColorsLesson";
import { NumbersLesson } from "./components/NumbersLesson";
import { ReadingBasicsLesson } from "./components/ReadingBasicsLesson";
import { ScienceExplorationLesson } from "./components/ScienceExplorationLesson";
import { OurEmotionsLesson } from "./components/OurEmotionsLesson";
import { MusicRhythmLesson } from "./components/MusicRhythmLesson";

// --- Contexts ---
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import { AppProvider } from "./contexts/AppContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { GlobalDataProvider } from "./contexts/GlobalDataContext";

// --- Pages & Layouts ---
import { HomePage, InfoPage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { InfoPagesWrapper } from "./components/InfoPagesWrapper";
import { MaintenanceGate } from './components/MaintenanceGate'; // ⬅️ Restored

// --- Components ---
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { Lessons } from "./components/Lessons";
import { Activities } from "./components/Activities";
import { Progress } from "./components/Progress";

// --- Admin Components ---
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminSidebar } from "./components/AdminSidebar";
import { AdminHeader } from "./components/AdminHeader";
import { AdminStudents } from "./components/AdminStudents";
import { AdminContent } from "./components/AdminContent";
import { AdminAnalytics } from "./components/AdminAnalytics";

// --- Settings ---
import { SettingsGrid } from "./components/SettingsGrid";
import { ProfileSettings } from "./components/settings/ProfileSettings";
import { AccessibilitySettings } from "./components/settings/AccessibilitySettings";
import { NotificationSettings } from "./components/settings/NotificationSettings";
import { GuardianSettings } from "./components/settings/GuardianSettings";
import { LanguageRegion } from "./components/settings/LanguageRegion";
import { PrivacySecurity } from "./components/settings/PrivacySecurity";

// --- Helpers ---
import { HelpPage } from "./components/HelpPage";
import { StudentDataSync } from "./components/StudentDataSync";
import { AuthDataSync } from "./components/AuthDataSync";

export type Page =
  | "dashboard"
  | "lessons"
  | "activities"
  | "progress"
  | "settings"
  | "help"
  | "profile-settings"
  | "accessibility-settings"
  | "notification-settings"
  | "guardian-settings"
  | "language-region"
  | "privacy-security"
  | "help-getting-started"
  | "help-video-tutorials"
  | "help-user-guide"
  | "help-faqs"
  | "lesson-shapes-colors"
  | "lesson-music-rhythm"
  | "lesson-numbers"
  | "lesson-reading-basics"
  | "lesson-science-exploration"
  | "lesson-our-emotions"
  | "activity-shape-color-sorter"
  | "activity-number-counting"
  | "activity-science-experiment"
  | "activity-science-adventure"
  | "activity-music-rhythm"
  | "activity-reading-comprehension"
  | "activity-our-emotions"
  | "students"
  | "content"
  | "analytics";

function MainApp() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const isAdmin = user?.role === "admin";

  const renderContent = () => {
    // ---------- ADMIN PAGES ----------
    if (isAdmin) {
      switch (currentPage) {
        case "dashboard":
          return <AdminDashboard />;
        case "students":
          return <AdminStudents />;
        case "content":
          return <AdminContent />;
        case "analytics":
          return <AdminAnalytics />;
        case "settings":
          return <SettingsGrid onNavigate={setCurrentPage} />;
        case "help":
        case "help-getting-started":
        case "help-video-tutorials":
        case "help-user-guide":
        case "help-faqs":
          return (
            <HelpPage currentSection={currentPage} onNavigate={setCurrentPage} />
          );
        case "profile-settings":
          return (
            <ProfileSettings onBack={() => setCurrentPage("settings")} />
          );
        case "accessibility-settings":
          return (
            <AccessibilitySettings
              onBack={() => setCurrentPage("settings")}
            />
          );
        case "notification-settings":
          return (
            <NotificationSettings
              onBack={() => setCurrentPage("settings")}
            />
          );
        case "guardian-settings":
          return (
            <GuardianSettings onBack={() => setCurrentPage("settings")} />
          );
        case "language-region":
          return (
            <LanguageRegion onBack={() => setCurrentPage("settings")} />
          );
        case "privacy-security":
          return (
            <PrivacySecurity onBack={() => setCurrentPage("settings")} />
          );
        default:
          return (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-slate-400 dark:text-slate-500 mb-2">
                  Coming Soon
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  This page is under development
                </div>
              </div>
            </div>
          );
      }
    }

    // ---------- STUDENT PAGES ----------
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentPage} />;

      case "lessons":
        return <Lessons onNavigate={setCurrentPage} />;

      case "activities":
        return <Activities onNavigate={setCurrentPage} />;

      case "progress":
        return <Progress />;

      case "settings":
        return <SettingsGrid onNavigate={setCurrentPage} />;

      case "profile-settings":
        return (
          <ProfileSettings onBack={() => setCurrentPage("settings")} />
        );

      case "accessibility-settings":
        return (
          <AccessibilitySettings
            onBack={() => setCurrentPage("settings")}
          />
        );

      case "notification-settings":
        return (
          <NotificationSettings
            onBack={() => setCurrentPage("settings")}
          />
        );

      case "guardian-settings":
        return (
          <GuardianSettings onBack={() => setCurrentPage("settings")} />
        );

      case "language-region":
        return (
          <LanguageRegion onBack={() => setCurrentPage("settings")} />
        );

      case "privacy-security":
        return (
          <PrivacySecurity onBack={() => setCurrentPage("settings")} />
        );

      case "help":
      case "help-getting-started":
      case "help-video-tutorials":
      case "help-user-guide":
      case "help-faqs":
        return (
          <HelpPage currentSection={currentPage} onNavigate={setCurrentPage} />
        );

      // LESSONS
      case "lesson-shapes-colors":
        return <ShapesColorsLesson onBack={() => setCurrentPage("lessons")} />;

      case "lesson-music-rhythm":
        return <MusicRhythmLesson onBack={() => setCurrentPage("lessons")} />;

      case "lesson-numbers":
        return <NumbersLesson onBack={() => setCurrentPage("lessons")} />;

      case "lesson-reading-basics":
        return (
          <ReadingBasicsLesson onBack={() => setCurrentPage("lessons")} />
        );

      case "lesson-science-exploration":
        return (
          <ScienceExplorationLesson
            onBack={() => setCurrentPage("lessons")}
          />
        );

      case "lesson-our-emotions":
  return (
    <OurEmotionsLesson
      onBack={() => setCurrentPage("lessons")}
      onNavigate={setCurrentPage} // optional, but handy if you use it later
    />
  );

      // ACTIVITIES
      case "activity-shape-color-sorter":
        return (
          <ShapeColorSorter onBack={() => setCurrentPage("activities")} />
        );

      case "activity-number-counting":
        return (
          <NumberCountingActivity
            onBack={() => setCurrentPage("activities")}
          />
        );

      case "activity-reading-comprehension":
        return (
          <ReadingComprehensionActivity
            onBack={() => setCurrentPage("activities")}
          />
        );
      case "activity-science-experiment":
        return (
          <ScienceExperimentActivity
            onBack={() => setCurrentPage("activities")}
          />
        );

      case "activity-music-rhythm":
        return (
          <MusicRhythmActivity onBack={() => setCurrentPage("activities")} />
        );

      case "activity-our-emotions":
        return (
          <OurEmotionsActivity onBack={() => setCurrentPage("activities")} />
        );

      // FALLBACK
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-slate-400 dark:text-slate-500 mb-2">
                Coming Soon
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                This page is under development
              </div>
            </div>
          </div>
        );
    }
  };

  // ---------- LAYOUTS ----------
  if (isAdmin) {
    return (
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
        <AdminSidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader onNavigate={setCurrentPage} />
          <main className="flex-1 overflow-y-auto">{renderContent()}</main>
        </div>
      </div>
    );
  }

  // Student interface
  return (
    <>
      <StudentDataSync />
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />
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

type AppView = "home" | "login" | "signup" | InfoPage;

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>("home");
  const [, setAuthVersion] = useState(0);

  // Re-added auth listener from Old App.tsx
  useEffect(() => {
    const handler = (ev: any) => {
      const u = ev?.detail?.user;
      // bump local "authVersion" so AppContent re-evaluates; MainApp reads new user from context
      setAuthVersion(v => v + 1);

      // If an admin just logged in and we are currently showing a non-auth view,
      // ensure view is 'home' so the main app renders
      if (u?.role === 'admin') {
        setCurrentView('home');
      }
    };
    window.addEventListener('auth:changed', handler as EventListener);
    return () => window.removeEventListener('auth:changed', handler as EventListener);
  }, []);

  if (isAuthenticated) {
    // Re-added MaintenanceGate
    return (
      <MaintenanceGate>
        <MainApp />
      </MaintenanceGate>
    );
  }

  if (currentView === "login") {
    return (
      <LoginPage
        onNavigateToHome={() => setCurrentView("home")}
        onNavigateToSignup={() => setCurrentView("signup")}
      />
    );
  }

  if (currentView === "signup") {
    return (
      <SignupPage
        onNavigateToHome={() => setCurrentView("home")}
        onNavigateToLogin={() => setCurrentView("login")}
      />
    );
  }

  if (currentView !== "home") {
    return (
      <InfoPagesWrapper
        page={currentView as InfoPage}
        onNavigateToHome={() => setCurrentView("home")}
        onNavigateToLogin={() => setCurrentView("login")}
        onNavigateToSignup={() => setCurrentView("signup")}
      />
    );
  }

  return (
    <HomePage
      onNavigateToLogin={() => setCurrentView("login")}
      onNavigateToSignup={() => setCurrentView("signup")}
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