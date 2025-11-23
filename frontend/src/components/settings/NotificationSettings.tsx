// frontend/src/components/settings/NotificationSettings.tsx
import {
  ArrowLeft,
  Bell,
  Mail,
  MessageSquare,
  Calendar,
  Save,
} from "lucide-react";
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
import { useEffect, useState } from "react";
import client from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";

interface NotificationSettingsProps {
  onBack: () => void;
}

interface NotificationSettingsState {
  push: {
    enableAll: boolean;
    lessonReminders: boolean;
    activityDueDates: boolean;
    achievements: boolean;
  };
  email: {
    weeklyProgressReport: boolean;
    announcements: boolean;
    learningTips: boolean;
    frequency: "instant" | "daily" | "weekly" | "never";
  };
  messages: {
    fromTeachers: boolean;
    guardianMessages: boolean;
    commentsFeedback: boolean;
  };
  quietHours: {
    enabled: boolean;
    startTime: string; // "HH:MM"
    endTime: string; // "HH:MM"
  };
}

const defaultSettings: NotificationSettingsState = {
  push: {
    enableAll: true,
    lessonReminders: true,
    activityDueDates: true,
    achievements: true,
  },
  email: {
    weeklyProgressReport: false,
    announcements: true,
    learningTips: false,
    frequency: "daily",
  },
  messages: {
    fromTeachers: true,
    guardianMessages: true,
    commentsFeedback: true,
  },
  quietHours: {
    enabled: false,
    startTime: "22:00",
    endTime: "07:00",
  },
};

export function NotificationSettings({ onBack }: NotificationSettingsProps) {
  const { user } = useAuth();
  const [settings, setSettings] =
    useState<NotificationSettingsState>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const userId = user?._id || user?.id || user?.userId;

  // Load settings from backend
  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const res = await client.get(`/users/${userId}/notification-settings`);
        if (cancelled) return;
        const data = res.data || {};
        setSettings({
          ...defaultSettings,
          ...data,
          push: { ...defaultSettings.push, ...(data.push || {}) },
          email: { ...defaultSettings.email, ...(data.email || {}) },
          messages: { ...defaultSettings.messages, ...(data.messages || {}) },
          quietHours: { ...defaultSettings.quietHours, ...(data.quietHours || {}) },
        });
      } catch (err) {
        console.warn("Failed to load notification settings, using defaults", err);
        if (!cancelled) setSettings(defaultSettings);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const update = (patch: Partial<NotificationSettingsState>) => {
    setSettings((prev) => ({
      ...prev,
      ...patch,
      push: { ...prev.push, ...(patch.push || {}) },
      email: { ...prev.email, ...(patch.email || {}) },
      messages: { ...prev.messages, ...(patch.messages || {}) },
      quietHours: { ...prev.quietHours, ...(patch.quietHours || {}) },
    }));
  };

  const handleSave = async () => {
    if (!userId) {
      alert("You must be logged in to save settings.");
      return;
    }
    setSaving(true);
    try {
      await client.put(`/users/${userId}/notification-settings`, settings);
      alert("Notification settings saved.");
    } catch (err) {
      console.error("Failed to save notification settings", err);
      alert("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-slate-800">Notification Settings</h1>
            <p className="text-slate-600 text-sm">Loading your preferences…</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <p className="text-slate-600">Please wait…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-slate-800">Notification Settings</h1>
          <p className="text-slate-600">
            Control how you receive notifications and emails
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Push Notifications */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800">Push Notifications</h3>
              <p className="text-slate-600 text-sm">Manage in-app notifications</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="push-all">Enable All Notifications</Label>
                <p className="text-slate-500 text-sm">
                  Turn on or off all push notifications at once
                </p>
              </div>
              <Switch
                id="push-all"
                checked={settings.push.enableAll}
                onCheckedChange={(v) =>
                  update({ push: { enableAll: v } as any })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="push-lessons">Lesson Reminders</Label>
                <p className="text-slate-500 text-sm">
                  Get reminded about upcoming lesson expirations
                </p>
              </div>
              <Switch
                id="push-lessons"
                checked={settings.push.lessonReminders}
                onCheckedChange={(v) =>
                  update({ push: { lessonReminders: v } as any })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="push-activities">Activity Due Dates</Label>
                <p className="text-slate-500 text-sm">
                  Notifications when activities are due soon
                </p>
              </div>
              <Switch
                id="push-activities"
                checked={settings.push.activityDueDates}
                onCheckedChange={(v) =>
                  update({ push: { activityDueDates: v } as any })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="push-achievements">Achievements</Label>
                <p className="text-slate-500 text-sm">
                  Celebrate your milestones and badges
                </p>
              </div>
              <Switch
                id="push-achievements"
                checked={settings.push.achievements}
                onCheckedChange={(v) =>
                  update({ push: { achievements: v } as any })
                }
              />
            </div>
          </div>
        </div>

        {/* Email Notifications */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800">Email Notifications</h3>
              <p className="text-slate-600 text-sm">
                Configure which emails you want to receive
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="email-weekly">Weekly Progress Report</Label>
                <p className="text-slate-500 text-sm">
                  Summary of your weekly lessons and activities
                </p>
              </div>
              <Switch
                id="email-weekly"
                checked={settings.email.weeklyProgressReport}
                onCheckedChange={(v) =>
                  update({ email: { weeklyProgressReport: v } as any })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="email-announcements">Announcements</Label>
                <p className="text-slate-500 text-sm">
                  Important updates when new lessons or activities are added
                </p>
              </div>
              <Switch
                id="email-announcements"
                checked={settings.email.announcements}
                onCheckedChange={(v) =>
                  update({ email: { announcements: v } as any })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="email-tips">Learning Tips</Label>
                <p className="text-slate-500 text-sm">
                  Helpful, gentle tips to support your learning
                </p>
              </div>
              <Switch
                id="email-tips"
                checked={settings.email.learningTips}
                onCheckedChange={(v) =>
                  update({ email: { learningTips: v } as any })
                }
              />
            </div>

            <div className="space-y-3">
              <Label>Email Frequency</Label>
              <Select
                value={settings.email.frequency}
                onValueChange={(value: any) =>
                  update({ email: { frequency: value } as any })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Real-time</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Digest</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800">Messages & Comments</h3>
              <p className="text-slate-600 text-sm">
                Which communication emails you would like
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="msg-teachers">Messages from Teachers</Label>
                <p className="text-slate-500 text-sm">
                  Direct messages from educators (future feature)
                </p>
              </div>
              <Switch
                id="msg-teachers"
                checked={settings.messages.fromTeachers}
                onCheckedChange={(v) =>
                  update({ messages: { fromTeachers: v } as any })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="msg-guardians">Guardian Messages</Label>
                <p className="text-slate-500 text-sm">
                  Messages and updates from your guardians
                </p>
              </div>
              <Switch
                id="msg-guardians"
                checked={settings.messages.guardianMessages}
                onCheckedChange={(v) =>
                  update({ messages: { guardianMessages: v } as any })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="msg-comments">Comments & Feedback</Label>
                <p className="text-slate-500 text-sm">
                  Feedback on your activities and work
                </p>
              </div>
              <Switch
                id="msg-comments"
                checked={settings.messages.commentsFeedback}
                onCheckedChange={(v) =>
                  update({ messages: { commentsFeedback: v } as any })
                }
              />
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800">Notification Schedule</h3>
              <p className="text-slate-600 text-sm">
                Set quiet hours to reduce notifications at night
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="quiet-hours">Enable Quiet Hours</Label>
                <p className="text-slate-500 text-sm">
                  Pause notifications during specific times
                </p>
              </div>
              <Switch
                id="quiet-hours"
                checked={settings.quietHours.enabled}
                onCheckedChange={(v) =>
                  update({ quietHours: { enabled: v } as any })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Select
                  value={settings.quietHours.startTime}
                  onValueChange={(value) =>
                    update({ quietHours: { startTime: value } as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                    <SelectItem value="22:00">10:00 PM</SelectItem>
                    <SelectItem value="23:00">11:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>End Time</Label>
                <Select
                  value={settings.quietHours.endTime}
                  onValueChange={(value) =>
                    update({ quietHours: { endTime: value } as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
