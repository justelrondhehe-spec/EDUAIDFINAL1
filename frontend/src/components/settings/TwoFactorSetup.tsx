// frontend/src/components/TwoFactorSetup.tsx
import { useState } from "react";
import { ShieldCheck, QrCode, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { auth } from "../api/api";
import { useAuth } from "../contexts/AuthContext";

export function TwoFactorSetup() {
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState<"idle" | "showing" | "verifying" | "done">(
    user?.twoFactorEnabled ? "done" : "idle"
  );
  const [qrUrl, setQrUrl] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const startSetup = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await auth.start2faSetup();
      setQrUrl(res.data.qrCodeDataUrl);
      setSecret(res.data.secret);
      setStep("showing");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "Failed to start 2FA";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const verifySetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setError("");
    setLoading(true);
    try {
      await auth.verify2faSetup(code.trim());
      setStep("done");
      updateUser({ twoFactorEnabled: true });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "Invalid 2FA code";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (step === "done") {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-emerald-600">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-sm font-medium">
            Two-factor authentication is enabled for your account.
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Every time you log in, you’ll be asked for a 6-digit code from your
          authenticator app after entering your password.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="inline-flex items-center gap-2"
          onClick={startSetup}
        >
          <RefreshCw className="w-4 h-4" />
          Regenerate QR / Move to new device
        </Button>
      </div>
    );
  }

  if (step === "showing") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <QrCode className="w-5 h-5 text-purple-500" />
          <span className="text-sm font-medium">
            Scan this QR code with Google Authenticator
          </span>
        </div>

        {qrUrl && (
          <div className="flex justify-center">
            <img
              src={qrUrl}
              alt="2FA QR code"
              className="w-40 h-40 border border-slate-200 rounded-xl bg-white"
            />
          </div>
        )}

        <p className="text-xs text-slate-500 dark:text-slate-400">
          If you can’t scan the QR, add a new account in your authenticator app
          and paste this key:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2 text-xs font-mono break-all">
          {secret}
        </div>

        <form onSubmit={verifySetup} className="space-y-2">
          <Label htmlFor="twofa-code" className="text-xs">
            Enter the 6-digit code from your app
          </Label>
          <Input
            id="twofa-code"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-40 text-center tracking-[0.3em] mx-0"
          />
          {error && (
            <p className="text-xs text-red-500 mt-1">
              {error}
            </p>
          )}
          <Button
            type="submit"
            size="sm"
            disabled={loading}
            className="mt-2"
          >
            {loading ? "Verifying..." : "Verify & Enable"}
          </Button>
        </form>
      </div>
    );
  }

  // idle
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Add an extra layer of protection by requiring a 6-digit code from an
        authenticator app each time you log in.
      </p>
      {error && (
        <p className="text-xs text-red-500">
          {error}
        </p>
      )}
      <Button
        size="sm"
        disabled={loading}
        onClick={startSetup}
        className="inline-flex items-center gap-2"
      >
        <ShieldCheck className="w-4 h-4" />
        {loading ? "Starting..." : "Enable Two-Factor Authentication"}
      </Button>
    </div>
  );
}
