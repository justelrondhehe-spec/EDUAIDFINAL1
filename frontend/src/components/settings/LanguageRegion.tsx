// frontend/src/components/settings/LanguageRegion.tsx
import { useEffect, useState } from "react";
import { ArrowLeft, Globe2, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import client from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";

interface LanguageRegionProps {
  onBack: () => void;
}

interface LanguageRegionState {
  language: string;
  locale: string;
  timezone: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  showTranslatedInstructions: boolean;
}

const DEFAULT_STATE: LanguageRegionState = {
  language: "en",
  locale: "en-US",
  timezone: "Asia/Manila",
  dateFormat: "MM/DD/YYYY",
  timeFormat: "12h",
  showTranslatedInstructions: true,
};

export function LanguageRegion({ onBack }: LanguageRegionProps) {
  const { user } = useAuth();
  const userId = (user as any)?._id || (user as any)?.id || (user as any)?.userId;

  const [form, setForm] = useState<LanguageRegionState>(DEFAULT_STATE);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load saved settings from backend
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const res = await client.get(
          `/users/${userId}/language-region-settings`
        );
        if (cancelled) return;
        setForm({ ...DEFAULT_STATE, ...(res.data || {}) });
      } catch {
        if (!cancelled) {
          setForm(DEFAULT_STATE);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const update = (patch: Partial<LanguageRegionState>) => {
    setError(null);
    setSuccess(null);
    setForm((prev) => ({ ...prev, ...patch }));
  };

  const handleSave = async () => {
    if (!userId) {
      setError("You must be logged in to update these settings.");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await client.put(`/users/${userId}/language-region-settings`, form);
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
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
          <p className="text-slate-600">
            You need to be logged in to change your language and region
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
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Settings
      </button>

      {/* Page title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-1">
          Language &amp; Region
        </h1>
        <p className="text-slate-500">Set your preferences</p>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700">
          {success}
        </div>
      )}

      {/* Content */}
      <div className="space-y-6">
        {/* Language card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Globe2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-900 font-semibold">Language</h3>
              <p className="text-slate-500 text-sm">
                Choose the main language for EduAid.
              </p>
            </div>
          </div>

          {loading ? (
            <p className="text-slate-400 text-sm">Loading preferences…</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700">App language</Label>
                  <Select
                    value={form.language}
                    onValueChange={(v) => update({ language: v })}
                  >
                    <SelectTrigger className="bg-slate-50 border-slate-300 text-slate-900">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fil">Filipino</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700">Locale</Label>
                  <Select
                    value={form.locale}
                    onValueChange={(v) => update({ locale: v })}
                  >
                    <SelectTrigger className="bg-slate-50 border-slate-300 text-slate-900">
                      <SelectValue placeholder="Select locale" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">
                        English (United States)
                      </SelectItem>
                      <SelectItem value="en-GB">
                        English (United Kingdom)
                      </SelectItem>
                      <SelectItem value="en-PH">
                        English (Philippines)
                      </SelectItem>
                      <SelectItem value="fil-PH">
                        Filipino (Philippines)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label className="text-slate-700">
                    Translated instructions
                  </Label>
                  <p className="text-slate-500 text-sm">
                    Show short translations of instructions in your chosen
                    language.
                  </p>
                </div>
                <Switch
                  checked={form.showTranslatedInstructions}
                  onCheckedChange={(v) =>
                    update({ showTranslatedInstructions: v })
                  }
                />
              </div>
            </>
          )}
        </div>

        {/* Region & time card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-900 font-semibold">Region &amp; Time</h3>
              <p className="text-slate-500 text-sm">
                Used for schedules and due dates.
              </p>
            </div>
          </div>

          {loading ? (
            <p className="text-slate-400 text-sm">Loading preferences…</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-700">Time zone</Label>
                <Select
                  value={form.timezone}
                  onValueChange={(v) => update({ timezone: v })}
                >
                  <SelectTrigger className="bg-slate-50 border-slate-300 text-slate-900">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Manila">
                      Philippines (GMT+8)
                    </SelectItem>
                    <SelectItem value="Asia/Singapore">
                      Singapore (GMT+8)
                    </SelectItem>
                    <SelectItem value="Europe/London">
                      London (GMT+0)
                    </SelectItem>
                    <SelectItem value="America/New_York">
                      New York (GMT-5)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700">Time format</Label>
                <Select
                  value={form.timeFormat}
                  onValueChange={(v: any) =>
                    update({ timeFormat: v as LanguageRegionState["timeFormat"] })
                  }
                >
                  <SelectTrigger className="bg-slate-50 border-slate-300 text-slate-900">
                    <SelectValue placeholder="Select time format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12-hour (3:30 PM)</SelectItem>
                    <SelectItem value="24h">24-hour (15:30)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700">Date format</Label>
                <Select
                  value={form.dateFormat}
                  onValueChange={(v) => update({ dateFormat: v })}
                >
                  <SelectTrigger className="bg-slate-50 border-slate-300 text-slate-900">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM / DD / YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD / MM / YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onBack} disabled={saving}>
            Cancel
          </Button>
          <Button
  onClick={handleSave}
  disabled={saving || loading}
  className="
    !bg-blue-600
    !hover:bg-blue-700
    !text-white
    px-6 py-2 rounded-lg font-medium

    /* Force disable colors */
    disabled:!bg-blue-400 
    disabled:!text-white

    /* PREVENT fading or opacity change */
    disabled:!opacity-100 
    disabled:!cursor-not-allowed

    /* Prevent hover fade when disabled */
    disabled:hover:!bg-blue-400
  "
>
  {saving ? "Saving…" : "Save Changes"}
</Button>

        </div>
      </div>
    </div>
  );
}
