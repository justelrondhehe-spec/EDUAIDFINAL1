import { X, Calendar, Clock } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface CalendarPanelProps {
  onClose: () => void;
}

export function CalendarPanel({ onClose }: CalendarPanelProps) {
  const { calendarEvents } = useApp();

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0);
    
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
    if (diffDays < -1) return 'Overdue';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  // Sort events by date
  const sortedEvents = [...calendarEvents].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-end p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-700 mt-16 mr-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-slate-800 dark:text-slate-100">Calendar</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">{formattedDate}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Events List */}
        <div className="max-h-[500px] overflow-y-auto p-4">
          {sortedEvents.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400">No upcoming deadlines</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
                Complete lessons to unlock new activities
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedEvents.map((event) => (
                <div
                  key={event.id}
                  className={`bg-gradient-to-br ${event.color} text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white mb-2">{event.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-white/90">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(event.date)}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs capitalize">
                          {event.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
