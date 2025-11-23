// frontend/src/components/settings/PrivacySecuritySettings.tsx
import { useEffect, useState } from 'react';
import { ArrowLeft, Shield, Lock, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import client from '../../api/client';
import { useAuth } from '../../contexts/AuthContext';

interface PrivacySecuritySettingsProps {
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
  const userId = user?._id || user?.id || user?.userId;
  const [form, setForm] = useState<PrivacyState>(DEFAULT_STATE);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await client.get(`/users/${userId}/privacy-settings`);
        if (cancelled) return;
        setForm({ ...DEFAULT_STATE, ...(res.data || {}) });
      } catch {
        setForm(DEFAULT_STATE);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const update = (patch: Partial<PrivacyState>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    try {
      await client.put(`/users/${userId}/privacy-settings`, form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-white/5 border border-slate-700 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-100" />
        </button>
        <div>
          <h1 className="text-slate-50">Privacy & Security</h1>
          <p className="text-slate-400">Protect your account</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Privacy */}
        <div className="bg-slate-900/60 rounded-2xl border border-slate-700 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-50">Privacy</h3>
              <p className="text-slate-400 text-sm">
                Control how your information is used inside EduAid.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label>Profile suggestions</Label>
                <p className="text-slate-400 text-sm">
                  Allow EduAid to suggest your profile to teachers you&apos;re connected with.
                </p>
              </div>
              <Switch
                checked={form.allowProfileSuggestions}
                onCheckedChange={(v) => update({ allowProfileSuggestions: v })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label>Show achievements on profile</Label>
                <p className="text-slate-400 text-sm">
                  Let teachers and guardians see your badges and milestones.
                </p>
              </div>
              <Switch
                checked={form.showAchievementsOnProfile}
                onCheckedChange={(v) => update({ showAchievementsOnProfile: v })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label>Share anonymous usage data</Label>
                <p className="text-slate-400 text-sm">
                  Help improve EduAid by sharing anonymous usage statistics.
                </p>
              </div>
              <Switch
                checked={form.shareAnonymousUsageData}
                onCheckedChange={(v) => update({ shareAnonymousUsageData: v })}
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-slate-900/60 rounded-2xl border border-slate-700 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-50">Security</h3>
              <p className="text-slate-400 text-sm">Keep your account safe.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label>Login alerts</Label>
                <p className="text-slate-400 text-sm">
                  Get an email when someone logs in from a new device.
                </p>
              </div>
              <Switch
                checked={form.loginAlerts}
                onCheckedChange={(v) => update({ loginAlerts: v })}
              />
            </div>

            <div className="flex items-center justify-between opacity-70">
              <div className="flex-1">
                <Label>Two-factor authentication</Label>
                <p className="text-slate-400 text-sm">
                  Additional code when logging in. (Prototype – not fully enabled yet.)
                </p>
              </div>
              <Switch
                checked={form.twoFactorEnabled}
                onCheckedChange={(v) => update({ twoFactorEnabled: v })}
              />
            </div>

            <div className="mt-2 flex items-start gap-2 text-xs text-amber-400">
              <AlertTriangle className="w-4 h-4 mt-[2px]" />
              <p>
                For deployment, you can later connect these options to real security features
                like email alerts or an authenticator app.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button
            disabled={saving || loading}
            onClick={handleSave}
            className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
