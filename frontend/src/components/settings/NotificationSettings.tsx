import { ArrowLeft, Bell, Mail, MessageSquare, Calendar, TrendingUp, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface NotificationSettingsProps {
  onBack: () => void;
}

export function NotificationSettings({ onBack }: NotificationSettingsProps) {
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
          <p className="text-slate-600">Control how you receive notifications</p>
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
                <p className="text-slate-500 text-sm">Receive all push notifications</p>
              </div>
              <Switch id="push-all" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="push-lessons">Lesson Reminders</Label>
                <p className="text-slate-500 text-sm">Get reminded about upcoming lessons</p>
              </div>
              <Switch id="push-lessons" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="push-activities">Activity Due Dates</Label>
                <p className="text-slate-500 text-sm">Notifications for assignment deadlines</p>
              </div>
              <Switch id="push-activities" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="push-achievements">Achievements</Label>
                <p className="text-slate-500 text-sm">Celebrate your milestones</p>
              </div>
              <Switch id="push-achievements" defaultChecked />
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
              <p className="text-slate-600 text-sm">Configure email preferences</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="email-weekly">Weekly Progress Report</Label>
                <p className="text-slate-500 text-sm">Summary of your weekly activities</p>
              </div>
              <Switch id="email-weekly" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="email-announcements">Announcements</Label>
                <p className="text-slate-500 text-sm">Important updates and news</p>
              </div>
              <Switch id="email-announcements" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="email-tips">Learning Tips</Label>
                <p className="text-slate-500 text-sm">Helpful study suggestions</p>
              </div>
              <Switch id="email-tips" />
            </div>

            <div className="space-y-3">
              <Label>Email Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
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
              <p className="text-slate-600 text-sm">Communication notifications</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="msg-teachers">Messages from Teachers</Label>
                <p className="text-slate-500 text-sm">Direct messages from educators</p>
              </div>
              <Switch id="msg-teachers" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="msg-guardians">Guardian Messages</Label>
                <p className="text-slate-500 text-sm">Messages from your guardians</p>
              </div>
              <Switch id="msg-guardians" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="msg-comments">Comments & Feedback</Label>
                <p className="text-slate-500 text-sm">Activity comments and feedback</p>
              </div>
              <Switch id="msg-comments" defaultChecked />
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
              <p className="text-slate-600 text-sm">Set quiet hours</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="quiet-hours">Enable Quiet Hours</Label>
                <p className="text-slate-500 text-sm">Pause notifications during specific times</p>
              </div>
              <Switch id="quiet-hours" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Select defaultValue="22:00">
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
                <Select defaultValue="07:00">
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
          <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
