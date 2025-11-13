import { BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';
import { InfoPage } from './HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { CurriculumPage } from './pages/CurriculumPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { CareersPage } from './pages/CareersPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

interface InfoPagesWrapperProps {
  page: InfoPage;
  onNavigateToHome: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export function InfoPagesWrapper({ page, onNavigateToHome, onNavigateToLogin, onNavigateToSignup }: InfoPagesWrapperProps) {
  const renderContent = () => {
    const props = { onNavigateToHome, onNavigateToLogin, onNavigateToSignup };
    
    switch (page) {
      case 'features':
        return <FeaturesPage {...props} />;
      case 'pricing':
        return <PricingPage {...props} />;
      case 'curriculum':
        return <CurriculumPage {...props} />;
      case 'about':
        return <AboutPage {...props} />;
      case 'blog':
        return <BlogPage {...props} />;
      case 'careers':
        return <CareersPage {...props} />;
      case 'help-center':
        return <HelpCenterPage {...props} />;
      case 'contact':
        return <ContactPage {...props} />;
      case 'privacy-policy':
        return <PrivacyPolicyPage {...props} />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div>
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <button onClick={onNavigateToHome} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg text-slate-800 dark:text-slate-100">EduAid</span>
          </button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={onNavigateToLogin}>
              Log In
            </Button>
            <Button 
              size="sm"
              onClick={onNavigateToSignup}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      {renderContent()}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-slate-400 text-xs">
            © 2025 EduAid. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
