import { useState } from "react";
import { ShieldCheck, Smartphone, QrCode, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { auth } from "../api/api";

export function TwoFactorSetup() {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startSetup = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await auth.start2faSetup();
      setQrDataUrl(res.data.qrCodeDataUrl);
      setSecret(res.data.secret);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to start 2FA"
      );
    } finally {
      setLoading(false);
    }
  };

  const verifySetup = async () => {
    if (!code.trim()) {
      setError("Enter the 6-digit code");
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await auth.verify2faSetup(code.trim());
      setEnabled(true);
      setMessage(res.data.message || "Two-factor authentication enabled");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || "Invalid 2FA code"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-slate-800 dark:text-slate-100">
            Two-Factor Authentication
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Add an extra layer of security using a code from your phone.
          </p>
        </div>
      </div>

      {!qrDataUrl && !enabled && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <Smartphone className="w-5 h-5" />
            <span>
              Use Google Authenticator or any TOTP app to protect your account.
            </span>
          </div>
          <Button onClick={startSetup} disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Enable 2FA
          </Button>
        </div>
      )}

      {qrDataUrl && !enabled && (
        <div className="mt-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col items-center justify-center">
              <div className="w-40 h-40 bg-slate-100 dark:bg-slate-900 rounded-xl flex items-center justify-center overflow-hidden">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="2FA QR code"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <QrCode className="w-16 h-16 text-slate-400" />
                )}
              </div>
              {secret && (
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-center break-all">
                  Backup key: <span className="font-mono">{secret}</span>
                </p>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                1. Open Google Authenticator (or a compatible app). <br />
                2. Scan the QR code or enter the backup key. <br />
                3. Enter the 6-digit code you see in the app.
              </p>
              <Input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={6}
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="max-w-xs tracking-[0.3em] text-center"
              />
              <Button onClick={verifySetup} disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Verify & Turn On
              </Button>
            </div>
          </div>
        </div>
      )}

      {enabled && (
        <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
          2FA is enabled for your account. You’ll be asked for a code at login.
        </p>
      )}

      {message && !enabled && (
        <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
          {message}
        </p>
      )}
      {error && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
