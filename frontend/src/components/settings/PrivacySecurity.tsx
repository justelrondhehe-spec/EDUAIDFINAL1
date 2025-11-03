import { ArrowLeft, Shield, Lock, Eye, Key, Smartphone, AlertTriangle, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface PrivacySecurityProps {
  onBack: () => void;
}

export function PrivacySecurity({ onBack }: PrivacySecurityProps) {
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
          <h1 className="text-slate-800">Privacy & Security</h1>
          <p className="text-slate-600">Protect your account and data</p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Password & Authentication */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800">Password & Authentication</h3>
              <p className="text-slate-600 text-sm">Manage your login credentials</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" placeholder="Enter current password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" />
            </div>
            <Button variant="outline" className="w-full">
              <Key className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800">Two-Factor Authentication</h3>
              <p className="text-slate-600 text-sm">Add an extra layer of security</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex-1">
                <Label htmlFor="2fa-enable">Enable Two-Factor Authentication</Label>
                <p className="text-slate-600 text-sm">Require a verification code when logging in</p>
              </div>
              <Switch id="2fa-enable" />
            </div>

            <div className="space-y-3">
              <Label>Authentication Method</Label>
              <Select defaultValue="app">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="app">Authenticator App</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="w-full">
              <Shield className="w-4 h-4 mr-2" />
              Configure 2FA
            </Button>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800">Privacy Settings</h3>
              <p className="text-slate-600 text-sm">Control who can see your information</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Profile Visibility</Label>
              <Select defaultValue="guardians">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="students">Students & Teachers</SelectItem>
                  <SelectItem value="guardians">Teachers & Guardians Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="show-email">Show Email Address</Label>
                <p className="text-slate-500 text-sm">Display your email on your profile</p>
              </div>
              <Switch id="show-email" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="show-progress">Show Progress to Others</Label>
                <p className="text-slate-500 text-sm">Let other students see your progress</p>
              </div>
              <Switch id="show-progress" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="show-achievements">Public Achievements</Label>
                <p className="text-slate-500 text-sm">Display your achievements and badges</p>
              </div>
              <Switch id="show-achievements" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="show-activity">Activity Status</Label>
                <p className="text-slate-500 text-sm">Show when you're online</p>
              </div>
              <Switch id="show-activity" defaultChecked />
            </div>
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800">Data Management</h3>
              <p className="text-slate-600 text-sm">Control your data and privacy</p>
            </div>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Download Your Data
              <span className="ml-auto text-slate-500 text-sm">Export all your information</span>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              View Activity Log
              <span className="ml-auto text-slate-500 text-sm">See your account activity</span>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Connected Apps
              <span className="ml-auto text-slate-500 text-sm">Manage third-party access</span>
            </Button>
          </div>
        </div>

        {/* Session Management */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-slate-800 mb-4">Active Sessions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
              <div>
                <div className="text-slate-800 mb-1">Current Session</div>
                <div className="text-slate-500 text-sm">Windows • Chrome • New York, NY</div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
              <div>
                <div className="text-slate-800 mb-1">Mobile Device</div>
                <div className="text-slate-500 text-sm">iPhone • Safari • Last active 2 hours ago</div>
              </div>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                Revoke
              </Button>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            Sign Out All Other Sessions
          </Button>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-red-900">Danger Zone</h3>
              <p className="text-red-700 text-sm">Irreversible actions</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start border-red-300 text-red-700 hover:bg-red-100">
              Deactivate Account
              <span className="ml-auto text-sm">Temporarily disable your account</span>
            </Button>
            <Button variant="outline" className="w-full justify-start border-red-300 text-red-700 hover:bg-red-100">
              Delete Account
              <span className="ml-auto text-sm">Permanently delete all your data</span>
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
