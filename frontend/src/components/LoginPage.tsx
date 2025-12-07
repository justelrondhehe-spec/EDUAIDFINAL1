import { useState } from "react";
import {
  BookOpen,
  Mail,
  Lock,
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import useAuth from "../hooks/useAuth";
import { ThemeToggle } from "./ThemeToggle";

interface LoginPageProps {
  onNavigateToHome: () => void;
  onNavigateToSignup: () => void;
}

export function LoginPage({
  onNavigateToHome,
  onNavigateToSignup,
}: LoginPageProps) {
  const { login, verifyTwoFactorLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  // 2FA state
  const [isTwoFactorStep, setIsTwoFactorStep] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [twoFactorTempToken, setTwoFactorTempToken] =
    useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!isTwoFactorStep) {
        // Step 1 – email + password
        const result = await login(email, password);

        if (result?.require2fa) {
          setIsTwoFactorStep(true);
          setTwoFactorTempToken(result.tempToken);
          setError("");
          return;
        }

        // if no 2FA required, AuthContext already set user + token
      } else {
        // Step 2 – 2FA verification
        if (!twoFactorTempToken) {
          setError("Missing temporary token. Please log in again.");
          setIsTwoFactorStep(false);
          return;
        }

        if (!twoFactorCode.trim()) {
          setError("Please enter the 6-digit code.");
          return;
        }

        await verifyTwoFactorLogin(twoFactorCode.trim(), twoFactorTempToken);
        // on success, AuthContext sets user+token
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        (isTwoFactorStep
          ? "Invalid 2FA code. Please try again."
          : "Invalid email or password");
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Theme Toggle */}
        <div className="fixed top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl">EduAid</span>
              </div>
              <h2 className="text-3xl mb-3">Welcome Back!</h2>
              <p className="text-base text-white/90 mb-8">
                Continue your learning journey and unlock new achievements
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📚</span>
                  </div>
                  <div>
                    <h3 className="text-base mb-0.5">Interactive Lessons</h3>
                    <p className="text-white/80 text-xs">
                      Access hundreds of engaging educational activities
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📊</span>
                  </div>
                  <div>
                    <h3 className="text-base mb-0.5">Track Progress</h3>
                    <p className="text-white/80 text-xs">
                      Monitor your achievements and learning milestones
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="text-base mb-0.5">Earn Rewards</h3>
                    <p className="text-white/80 text-xs">
                      Collect badges and celebrate your success
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login / 2FA Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8">
            <button
              onClick={onNavigateToHome}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </button>

            <div className="text-center mb-6">
              <h1 className="text-2xl text-slate-800 dark:text-slate-100 mb-1.5">
                {isTwoFactorStep
                  ? "Two-Factor Authentication"
                  : isAdminLogin
                  ? "Admin Login"
                  : "Log In"}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {isTwoFactorStep
                  ? "Enter the 6-digit code from your authenticator app."
                  : "Welcome back! Please enter your details."}
              </p>

              {!isTwoFactorStep && (
                <div className="flex gap-2 mt-4 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setIsAdminLogin(false)}
                    className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                      !isAdminLogin
                        ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAdminLogin(true)}
                    className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                      isAdminLogin
                        ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Admin
                  </button>
                </div>
              )}

              {isTwoFactorStep && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-xs text-blue-700 dark:text-blue-300">
                  <ShieldCheck className="w-4 h-4" />
                  2-step verification is enabled on your account.
                </div>
              )}
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl">
                <p className="text-red-600 dark:text-red-400 text-sm">
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Email + Password */}
              {!isTwoFactorStep && (
                <>
                  <div>
                    <Label htmlFor="email" className="mb-2 block">
                      Email
                    </Label>
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

                  <div>
                    <Label htmlFor="password" className="mb-2 block">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 pr-10 dark:bg-slate-900 dark:border-slate-700"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 dark:border-slate-600"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Remember me
                      </span>
                    </label>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Forgot password?
                    </a>
                  </div>
                </>
              )}

              {/* Step 2: 2FA code */}
              {isTwoFactorStep && (
                <div>
                  <Label htmlFor="twoFactor" className="mb-2 block">
                    6-digit code
                  </Label>
                  <Input
                    id="twoFactor"
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={6}
                    placeholder="123456"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    className="tracking-[0.3em] text-center text-lg dark:bg-slate-900 dark:border-slate-700"
                    required
                  />
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Open your Google Authenticator (or compatible app) and enter
                    the code shown for <strong>EduAid</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsTwoFactorStep(false);
                      setTwoFactorCode("");
                      setTwoFactorTempToken(null);
                      setError("");
                    }}
                    className="mt-3 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    ← Back to email &amp; password
                  </button>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 py-6"
              >
                {isLoading
                  ? isTwoFactorStep
                    ? "Verifying..."
                    : "Logging in..."
                  : isTwoFactorStep
                  ? "Verify Code"
                  : "Log In"}
              </Button>
            </form>

            {!isTwoFactorStep && (
              <div className="mt-6 text-center">
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={onNavigateToSignup}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
