import { X, Calendar } from 'lucide-react';

interface DatePanelProps {
  onClose: () => void;
}

export function DatePanel({ onClose }: DatePanelProps) {
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const fullDate = today.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  const monthName = today.toLocaleDateString('en-US', { month: 'long' });
  const dayNumber = today.getDate();
  const year = today.getFullYear();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-end p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-80 border border-slate-200 dark:border-slate-700 mt-16 mr-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-slate-800 dark:text-slate-100">Today's Date</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Date Display */}
        <div className="p-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-8 text-center border border-blue-100 dark:border-slate-600">
            <div className="text-slate-700 dark:text-slate-200 mb-2">{dayName}</div>
            <div className="text-slate-500 dark:text-slate-400 text-sm">{fullDate}</div>
          </div>

          {/* Calendar View */}
          <div className="mt-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl p-6 border border-slate-200 dark:border-slate-600">
            <div className="text-center">
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">{monthName} {year}</div>
              <div className="text-5xl text-slate-800 dark:text-slate-100 mb-2">{dayNumber}</div>
              <div className="text-slate-600 dark:text-slate-400">{dayName}</div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <span className="text-slate-600 dark:text-slate-400">Week of Year</span>
              <span className="text-slate-800 dark:text-slate-100">
                {Math.ceil((today.getTime() - new Date(today.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000))}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <span className="text-slate-600 dark:text-slate-400">Day of Year</span>
              <span className="text-slate-800 dark:text-slate-100">
                {Math.ceil((today.getTime() - new Date(today.getFullYear(), 0, 1).getTime()) / (24 * 60 * 60 * 1000)) + 1}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
