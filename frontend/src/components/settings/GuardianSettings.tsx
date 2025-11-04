import { ArrowLeft, UserPlus, Mail, Phone, Shield, Trash2, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Card } from '../ui/card';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface Guardian {
  id: number;
  name: string;
  email: string;
  phone: string;
  relationship: string;
  primary: boolean;
}

interface GuardianSettingsProps {
  onBack: () => void;
}

export function GuardianSettings({ onBack }: GuardianSettingsProps) {
  const [guardians, setGuardians] = useState<Guardian[]>([
    {
      id: 1,
      name: 'Maria Mendoza',
      email: 'maria.mendoza@email.com',
      phone: '+1 (555) 123-4567',
      relationship: 'Mother',
      primary: true,
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@email.com',
      phone: '+1 (555) 123-4568',
      relationship: 'Father',
      primary: false,
    },
  ]);

  const [guardianToDelete, setGuardianToDelete] = useState<Guardian | null>(null);

  const handleDeleteGuardian = () => {
    if (guardianToDelete) {
      setGuardians(prev => prev.filter(g => g.id !== guardianToDelete.id));
      setGuardianToDelete(null);
    }
  };

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
        <div className="flex-1">
          <h1 className="text-slate-800">Guardian Settings</h1>
          <p className="text-slate-600">Manage guardian access and permissions</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 to-indigo-600">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Guardian
        </Button>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Guardian Cards */}
        {guardians.map((guardian, index) => (
          <Card key={index} className="p-6 border-2">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <span className="text-xl">{guardian.name.charAt(0)}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-slate-800">{guardian.name}</h3>
                      {guardian.primary && (
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm">{guardian.relationship}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{guardian.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{guardian.phone}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`view-progress-${index}`} className="text-sm">View Progress</Label>
                    <Switch id={`view-progress-${index}`} defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`view-activities-${index}`} className="text-sm">View Activities</Label>
                    <Switch id={`view-activities-${index}`} defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`receive-reports-${index}`} className="text-sm">Receive Reports</Label>
                    <Switch id={`receive-reports-${index}`} defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`contact-teachers-${index}`} className="text-sm">Contact Teachers</Label>
                    <Switch id={`contact-teachers-${index}`} defaultChecked={guardian.primary} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {/* Guardian Permissions */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800">Default Guardian Permissions</h3>
              <p className="text-slate-600 text-sm">Set default permissions for new guardians</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="default-progress">View Progress Reports</Label>
                <p className="text-slate-500 text-sm">Allow guardians to see student progress</p>
              </div>
              <Switch id="default-progress" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="default-grades">View Grades</Label>
                <p className="text-slate-500 text-sm">Allow guardians to see grades and scores</p>
              </div>
              <Switch id="default-grades" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="default-attendance">View Attendance</Label>
                <p className="text-slate-500 text-sm">Allow guardians to see attendance records</p>
              </div>
              <Switch id="default-attendance" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="default-messages">Send Messages</Label>
                <p className="text-slate-500 text-sm">Allow guardians to message teachers</p>
              </div>
              <Switch id="default-messages" />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-slate-800 mb-4">Guardian Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="notify-low-grade">Low Grade Alerts</Label>
                <p className="text-slate-500 text-sm">Notify guardians about low grades</p>
              </div>
              <Switch id="notify-low-grade" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="notify-absence">Absence Alerts</Label>
                <p className="text-slate-500 text-sm">Notify guardians about absences</p>
              </div>
              <Switch id="notify-absence" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="notify-achievements">Achievement Notifications</Label>
                <p className="text-slate-500 text-sm">Notify guardians about achievements</p>
              </div>
              <Switch id="notify-achievements" defaultChecked />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={guardianToDelete !== null} onOpenChange={(open) => !open && setGuardianToDelete(null)}>
        <AlertDialogContent className="dark:bg-slate-800 dark:border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-slate-100">Delete Guardian</AlertDialogTitle>
            <AlertDialogDescription className="dark:text-slate-400">
              Are you sure you want to remove {guardianToDelete?.name} as a guardian? This action cannot be undone.
              {guardianToDelete?.primary && (
                <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg">
                  <p className="text-yellow-800 dark:text-yellow-400 text-sm">
                    ⚠️ This is the primary guardian. Make sure to assign another guardian as primary before removing.
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteGuardian}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
