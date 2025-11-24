import { useState } from 'react';
import { BookOpen, Mail, Lock, User, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import useAuth from '../hooks/useAuth';
import { ThemeToggle } from './ThemeToggle';
import { useGlobalData } from '../contexts/GlobalDataContext';

interface SignupPageProps {
  onNavigateToHome: () => void;
  onNavigateToLogin: () => void;
}

export function SignupPage({ onNavigateToHome, onNavigateToLogin }: SignupPageProps) {
  const { register } = useAuth();
  const { settings } = useGlobalData();
  const allowRegistration = settings?.allowStudentRegistration ?? true;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!allowRegistration) {
      setError('New student registration is currently disabled.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await register({ name, email, password }); // 👈 Grade removed
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to create account. Please try again.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        <div className="fixed top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        {/* LEFT SIDE */}
        <div className="hidden lg:block">
          <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl">EduAid</span>
              </div>
              <h2 className="text-3xl mb-3">Start Your Learning Adventure!</h2>
              <p className="text-base text-white/90 mb-8">
                Join thousands of students already transforming their education
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8">

            <button
              onClick={onNavigateToHome}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to home
            </button>

            <div className="text-center mb-6">
              <h1 className="text-2xl text-slate-800 dark:text-slate-100 mb-1.5">
                Create Account
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Start your learning journey today
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* NAME */}
              <div>
                <Label htmlFor="name" className="mb-2 block">Full Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="pl-10 dark:bg-slate-900 dark:border-slate-700"
                    disabled={!allowRegistration}
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <Label htmlFor="email" className="mb-2 block">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 dark:bg-slate-900 dark:border-slate-700"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 dark:bg-slate-900 dark:border-slate-700"
                  />
                  <Lock className="left-3 absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <Label>Confirm Password</Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 dark:bg-slate-900 dark:border-slate-700"
                  />
                  <Lock className="left-3 absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* TERMS CHECKBOX */}
              <div className="flex items-start gap-2">
                <input type="checkbox" required className="mt-1" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  I agree to the <a className="text-blue-600">Terms</a> and <a className="text-blue-600">Privacy Policy</a>
                </span>
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                disabled={isLoading || !allowRegistration}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 py-6"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>

            </form>

            <div className="mt-6 text-center">
              <p className="text-sm">
                Already have an account?{' '}
                <button onClick={onNavigateToLogin} className="text-blue-600">Log in</button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
