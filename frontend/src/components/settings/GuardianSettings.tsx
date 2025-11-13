import { ArrowLeft, UserPlus, Mail, Phone, Trash2, Save } from 'lucide-react';
import { Button } from '../ui/button';
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
          className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
        <div className="flex-1">
          <h1 className="text-slate-800 dark:text-slate-100">Guardian Details</h1>
          <p className="text-slate-600 dark:text-slate-400">View and manage guardian information</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Guardian
        </Button>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Guardian Cards */}
        {guardians.map((guardian) => (
          <Card key={guardian.id} className="p-6 border-2 dark:bg-slate-800 dark:border-slate-700">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <span className="text-xl">{guardian.name.charAt(0)}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-slate-800 dark:text-slate-100">{guardian.name}</h3>
                      {guardian.primary && (
                        <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded text-xs">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{guardian.relationship}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() => setGuardianToDelete(guardian)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{guardian.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{guardian.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

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
