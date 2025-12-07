import { useState } from "react";
import { auth } from "../api/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ShieldCheck, QrCode, Loader2 } from "lucide-react";

export function TwoFactorSetup() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"idle" | "got-secret" | "verified">("idle");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const startSetup = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await auth.start2faSetup();
      const data = res.data;
      setQrCodeDataUrl(data.qrCodeDataUrl);
      setSecret(data.secret);
      setStep("got-secret");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to start 2FA setup";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const verifySetup = async () => {
    setError(null);
    if (!code.trim()) {
      setError("Please enter the 6-digit code from your app.");
      return;
    }
    setLoading(true);
    try {
      await auth.verify2faSetup(code.trim());
      setStep("verified");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Invalid code, please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-slate-800 dark:text-slate-100 text-lg">
            Two-Factor Authentication
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Add an extra layer of security to your EduAid account using
            Google Authenticator or any TOTP app.
          </p>
        </div>
      </div>

      {step === "idle" && (
        <div className="space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Click the button below to generate a QR code. Scan it with your
            authenticator app, then enter the 6-digit code to finish setup.
          </p>
          <Button
            onClick={startSetup}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <QrCode className="w-4 h-4" />
            Generate QR Code
          </Button>
        </div>
      )}

      {step === "got-secret" && (
        <div className="space-y-4">
          {qrCodeDataUrl && (
            <div className="flex flex-col items-center gap-2">
              <img
                src={qrCodeDataUrl}
                alt="2FA QR Code"
                className="w-40 h-40 border border-slate-200 dark:border-slate-700 rounded-lg"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                Scan this QR code with Google Authenticator (or any TOTP app),
                then enter the 6-digit code below.
              </p>
            </div>
          )}

          {secret && (
            <div className="bg-slate-50 dark:bg-slate-900/40 rounded-lg px-3 py-2 text-xs text-slate-600 dark:text-slate-300 break-all">
              Backup key: <span className="font-mono">{secret}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium mb-1">
              6-digit code
            </label>
            <Input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              className="max-w-xs tracking-[0.3em] text-center"
            />
          </div>

          <Button
            onClick={verifySetup}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Confirm &amp; Enable 2FA
          </Button>
        </div>
      )}

      {step === "verified" && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-sm font-medium">
              Two-factor authentication is now enabled.
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Next time you log in, you&apos;ll be asked for a 6-digit code from
            your authenticator app after entering your password.
          </p>
        </div>
      )}

      {error && (
        <div className="text-xs text-red-600 dark:text-red-400">{error}</div>
      )}
    </div>
  );
}
