import { useEffect, useState } from "react";
import client from "../api/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

interface AdminSettingsState {
  appName: string;

  enableEmailNotifications: boolean;
  enablePushNotifications: boolean;
  weeklySummaryEmail: boolean;

  allowStudentRegistration: boolean;
  maintenanceMode: boolean;
  maintenanceMessage: string;
}

const defaultState: AdminSettingsState = {
  appName: "EduAid",

  enableEmailNotifications: true,
  enablePushNotifications: true,
  weeklySummaryEmail: true,

  allowStudentRegistration: true,
  maintenanceMode: false,
  maintenanceMessage:
    "EduAid is currently under maintenance. Please check back soon.",
};

export function AdminSettings() {
  const [settings, setSettings] = useState<AdminSettingsState>(defaultState);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // load settings from backend singleton: GET /api/settings
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await client.get("/settings");
        if (cancelled) return;

        const data = res.data || {};
        setSettings((prev) => ({
          ...prev,
          ...data,
        }));
      } catch (err: any) {
        console.warn("AdminSettings: GET /settings failed", err);
        if (!cancelled) {
          setError("Unable to load settings. Please try again later.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const updateField = <K extends keyof AdminSettingsState>(
    key: K,
    value: AdminSettingsState[K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await client.put("/settings", settings);
      setSaved(true);

      // optional: broadcast so other tabs/contexts can react
      window.dispatchEvent(
        new CustomEvent("settings:changed", { detail: { settings } })
      );
    } catch (err: any) {
      console.warn("AdminSettings: PUT /settings failed", err);
      setError("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-slate-800 dark:text-slate-100 mb-2">
          Platform Settings
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Configure EduAid for all students and teachers.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {/* General */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <h2 className="text-lg text-slate-800 dark:text-slate-100 mb-1">
          General
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Overall platform configuration.
        </p>

        <div className="space-y-2 max-w-md">
          <Label htmlFor="appName">App name</Label>
          <Input
            id="appName"
            value={settings.appName}
            onChange={(e) => updateField("appName", e.target.value)}
            disabled={loading}
            className="dark:bg-slate-800 dark:border-slate-700"
          />
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div>
          <h2 className="text-lg text-slate-800 dark:text-slate-100 mb-1">
            Notifications
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Control how students and teachers receive updates.
          </p>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-slate-800 dark:text-slate-100">
              Email notifications
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Send lesson updates and announcements via email.
            </div>
          </div>
          <Switch
            checked={settings.enableEmailNotifications}
            onCheckedChange={(v) =>
              updateField("enableEmailNotifications", Boolean(v))
            }
            disabled={loading}
          />
        </div>

        <div className="flex items-center justify-between py-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-slate-800 dark:text-slate-100">
              In-app notifications
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Show alerts in the dashboard notifications panel.
            </div>
          </div>
          <Switch
            checked={settings.enablePushNotifications}
            onCheckedChange={(v) =>
              updateField("enablePushNotifications", Boolean(v))
            }
            disabled={loading}
          />
        </div>

        <div className="flex items-center justify-between py-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-slate-800 dark:text-slate-100">
              Weekly summary email
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Send a weekly progress overview to parents/teachers.
            </div>
          </div>
          <Switch
            checked={settings.weeklySummaryEmail}
            onCheckedChange={(v) =>
              updateField("weeklySummaryEmail", Boolean(v))
            }
            disabled={loading}
          />
        </div>
      </section>

      {/* Access & Maintenance */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div>
          <h2 className="text-lg text-slate-800 dark:text-slate-100 mb-1">
            Access &amp; Maintenance
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Control who can sign up and when the platform is online.
          </p>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-slate-800 dark:text-slate-100">
              Allow new student registration
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              If disabled, only admins can create new accounts.
            </div>
          </div>
          <Switch
            checked={settings.allowStudentRegistration}
            onCheckedChange={(v) =>
              updateField("allowStudentRegistration", Boolean(v))
            }
            disabled={loading}
          />
        </div>

        <div className="flex items-center justify-between py-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex-1 mr-4">
            <div className="text-slate-800 dark:text-slate-100">
              Maintenance mode
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
              Temporarily disable student access while you update content.
            </div>
            {settings.maintenanceMode && (
              <Input
                value={settings.maintenanceMessage}
                onChange={(e) =>
                  updateField("maintenanceMessage", e.target.value)
                }
                disabled={loading}
                className="dark:bg-slate-800 dark:border-slate-700"
              />
            )}
          </div>
          <Switch
            checked={settings.maintenanceMode}
            onCheckedChange={(v) =>
              updateField("maintenanceMode", Boolean(v))
            }
            disabled={loading}
          />
        </div>
      </section>

      <div className="flex items-center justify-end gap-3 pb-8">
        {saved && !saving && (
          <span className="text-sm text-emerald-600 dark:text-emerald-400">
            Changes saved
          </span>
        )}
        <Button
          onClick={handleSave}
          disabled={saving || loading}
          className="bg-gradient-to-r from-blue-500 to-indigo-600"
        >
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}

export default AdminSettings;
