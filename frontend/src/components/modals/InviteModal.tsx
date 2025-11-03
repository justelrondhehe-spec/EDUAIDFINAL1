import { X, Mail, Copy, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';

interface InviteModalProps {
  onClose: () => void;
}

export function InviteModal({ onClose }: InviteModalProps) {
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const inviteLink = 'https://eduaid.com/invite/daniel-mendoza-12345';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = () => {
    // Handle sending invite
    alert(`Invite sent to ${email}!`);
    setEmail('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-slate-800 dark:text-slate-100 mb-1">Invite Friends</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Share EduAid with your classmates</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Email Invite */}
        <div className="mb-6">
          <Label htmlFor="email" className="mb-2 block">Send via Email</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              placeholder="friend@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 dark:bg-slate-900 dark:border-slate-700"
            />
            <Button 
              onClick={handleSendInvite}
              disabled={!email}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">Or share link</span>
          </div>
        </div>

        {/* Copy Link */}
        <div>
          <Label className="mb-2 block">Invite Link</Label>
          <div className="flex gap-2">
            <Input
              value={inviteLink}
              readOnly
              className="flex-1 dark:bg-slate-900 dark:border-slate-700"
            />
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="dark:border-slate-700"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-emerald-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Recent Invites */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">Recent Invites</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-700 dark:text-slate-300">sarah@example.com</span>
              <span className="text-slate-500 dark:text-slate-400">Pending</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-700 dark:text-slate-300">mike@example.com</span>
              <span className="text-emerald-500">Accepted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
