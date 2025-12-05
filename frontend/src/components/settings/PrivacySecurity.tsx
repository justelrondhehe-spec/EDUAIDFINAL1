// frontend/src/components/settings/PrivacySecurity.tsx
import { useEffect, useState } from "react";
import { ArrowLeft, Shield, Lock, AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import client from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";

export interface PrivacySecurityProps {
  onBack: () => void;
}

interface PrivacyState {
  allowProfileSuggestions: boolean;
  showAchievementsOnProfile: boolean;
  shareAnonymousUsageData: boolean;
  loginAlerts: boolean;
  twoFactorEnabled: boolean;
}

const DEFAULT_STATE: PrivacyState = {
  allowProfileSuggestions: false,
  showAchievementsOnProfile: true,
  shareAnonymousUsageData: true,
  loginAlerts: true,
  twoFactorEnabled: false,
};

export function PrivacySecurity({ onBack }: PrivacySecurityProps) {
  const { user } = useAuth();
  const userId = user?._id || user?.id || (user as any)?.userId;

  const [form, setForm] = useState<PrivacyState>(DEFAULT_STATE);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load current settings from backend
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const res = await client.get(`/users/${userId}/privacy-settings`);
        if (cancelled) return;
        setForm({ ...DEFAULT_STATE, ...(res.data || {}) });
      } catch {
        if (!cancelled) setForm(DEFAULT_STATE);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const update = (patch: Partial<PrivacyState>) => {
    setError(null);
    setSuccess(null);
    setForm((prev) => ({ ...prev, ...patch }));
  };

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await client.put(`/users/${userId}/privacy-settings`, form);
      setSuccess("Preferences saved successfully.");
    } catch (err: any) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to save settings.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Settings
        </Button>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 text-center">
          <p className="text-slate-600 dark:text-slate-300">
            You need to be logged in to manage your privacy and security
            settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      {/* Back link */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white mb-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Settings
      </button>

      {/* Title */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Privacy &amp; Security
        </h1>
        <p className="text-slate-600 dark:text-slate-400">Protect your account</p>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 text-sm text-emerald-700 dark:text-emerald-300">
          {success}
        </div>
      )}

      {loading ? (
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Loading settings…
        </p>
      ) : (
        <>
          {/* Privacy card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Privacy
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Control how your information is used inside EduAid.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label className="font-medium text-slate-900 dark:text-white">
                    Profile suggestions
                  </Label>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Allow EduAid to suggest your profile to teachers you&apos;re
                    connected with.
                  </p>
                </div>
                <Switch
                  checked={form.allowProfileSuggestions}
                  onCheckedChange={(v) => update({ allowProfileSuggestions: v })}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label className="font-medium text-slate-900 dark:text-white">
                    Show achievements on profile
                  </Label>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Let teachers and guardians see your badges and milestones.
                  </p>
                </div>
                <Switch
                  checked={form.showAchievementsOnProfile}
                  onCheckedChange={(v) =>
                    update({ showAchievementsOnProfile: v })
                  }
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label className="font-medium text-slate-900 dark:text-white">
                    Share anonymous usage data
                  </Label>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Help improve EduAid by sharing anonymous usage statistics.
                  </p>
                </div>
                <Switch
                  checked={form.shareAnonymousUsageData}
                  onCheckedChange={(v) =>
                    update({ shareAnonymousUsageData: v })
                  }
                />
              </div>
            </div>
          </div>

          {/* Security card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Security
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Keep your account safe.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label className="font-medium text-slate-900 dark:text-white">
                    Login alerts
                  </Label>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Get an email when someone logs in from a new device.
                  </p>
                </div>
                <Switch
                  checked={form.loginAlerts}
                  onCheckedChange={(v) => update({ loginAlerts: v })}
                />
              </div>

              <div className="flex items-center justify-between gap-4 opacity-80">
                <div className="flex-1">
                  <Label className="font-medium text-slate-900 dark:text-white">
                    Two-factor authentication
                  </Label>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Additional code when logging in. (Prototype – not fully
                    enabled yet.)
                  </p>
                </div>
                <Switch
                  checked={form.twoFactorEnabled}
                  onCheckedChange={(v) => update({ twoFactorEnabled: v })}
                />
              </div>

              <div className="mt-2 flex items-start gap-2 text-xs text-amber-500 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4 mt-[2px]" />
                <p>
                  For deployment, you can later connect these options to real
                  security features like email alerts or an authenticator app.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onBack} disabled={saving}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving || loading}
              className="
                bg-pink-600 
                hover:bg-pink-700 
                text-white 
                px-6 
                disabled:bg-pink-400 
                disabled:text-white 
                disabled:hover:bg-pink-400 
                disabled:opacity-100 
                disabled:cursor-not-allowed
              "
            >
              {saving ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

// default export too, in case somewhere you do `export default PrivacySecurity`
export default PrivacySecurity;
