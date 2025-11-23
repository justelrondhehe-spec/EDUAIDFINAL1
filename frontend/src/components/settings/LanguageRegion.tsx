// frontend/src/components/settings/LanguageRegion.tsx
import { useEffect, useState } from 'react';
import { ArrowLeft, Globe2, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import client from '../../api/client';
import { useAuth } from '../../contexts/AuthContext';

interface LanguageRegionProps {
  onBack: () => void;
}

interface LanguageRegionState {
  language: string;
  locale: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  showTranslatedInstructions: boolean;
}

const DEFAULT_STATE: LanguageRegionState = {
  language: 'en',
  locale: 'en-US',
  timezone: 'Asia/Manila',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  showTranslatedInstructions: true,
};

export function LanguageRegion({ onBack }: LanguageRegionProps) {
  const { user } = useAuth();
  const userId = user?._id || user?.id || user?.userId;
  const [form, setForm] = useState<LanguageRegionState>(DEFAULT_STATE);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await client.get(`/users/${userId}/language-region-settings`);
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

  const update = (patch: Partial<LanguageRegionState>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    try {
      await client.put(`/users/${userId}/language-region-settings`, form);
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
          <h1 className="text-slate-50">Language & Region</h1>
          <p className="text-slate-400">Set your preferences</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Language */}
        <div className="bg-slate-900/60 rounded-2xl border border-slate-700 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Globe2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-50">Language</h3>
              <p className="text-slate-400 text-sm">
                Choose the main language for EduAid.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-200">App language</Label>
              <Select value={form.language} onValueChange={(v) => update({ language: v })}>
                <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fil">Filipino</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Locale</Label>
              <Select value={form.locale} onValueChange={(v) => update({ locale: v })}>
                <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (United States)</SelectItem>
                  <SelectItem value="en-GB">English (United Kingdom)</SelectItem>
                  <SelectItem value="en-PH">English (Philippines)</SelectItem>
                  <SelectItem value="fil-PH">Filipino (Philippines)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex-1">
              <Label>Translated instructions</Label>
              <p className="text-slate-400 text-sm">
                Show short translations of instructions in your chosen language.
              </p>
            </div>
            <Switch
              checked={form.showTranslatedInstructions}
              onCheckedChange={(v) => update({ showTranslatedInstructions: v })}
            />
          </div>
        </div>

        {/* Region / time */}
        <div className="bg-slate-900/60 rounded-2xl border border-slate-700 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-50">Region & Time</h3>
              <p className="text-slate-400 text-sm">
                Used for schedules and due dates.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-200">Time zone</Label>
              <Select value={form.timezone} onValueChange={(v) => update({ timezone: v })}>
                <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Manila">Philippines (GMT+8)</SelectItem>
                  <SelectItem value="Asia/Singapore">Singapore (GMT+8)</SelectItem>
                  <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                  <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Time format</Label>
              <Select
                value={form.timeFormat}
                onValueChange={(v: LanguageRegionState['timeFormat']) => update({ timeFormat: v })}
              >
                <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12-hour (3:30 PM)</SelectItem>
                  <SelectItem value="24h">24-hour (15:30)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Date format</Label>
              <Select value={form.dateFormat} onValueChange={(v) => update({ dateFormat: v })}>
                <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM / DD / YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD / MM / YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
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
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
