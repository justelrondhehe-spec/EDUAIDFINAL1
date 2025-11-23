// frontend/src/components/AdminContent.tsx
import React, { useEffect, useState } from 'react';
import { lessonsApi, activitiesApi } from '../api/api';
import { Button } from './ui/button';
import { CreateActivityModal } from './modals/CreateActivityModal';
import { CreateLessonModal } from './modals/CreateLessonModal';

export function AdminContent() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateLesson, setShowCreateLesson] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [lr, ar] = await Promise.all([lessonsApi.list(), activitiesApi.list()]);
      setLessons(lr.data ?? []);
      setActivities(ar.data ?? []);
    } catch (e) {
      console.error('AdminContent.load error', e);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  // show create activity modal
  const [showCreateActivity, setShowCreateActivity] = useState(false);

  // delete handlers should notify global app to re-fetch
  const deleteLesson = async (id: string) => {
    if (!confirm('Delete lesson?')) return;
    try {
      await lessonsApi.delete(id);
      // notify rest of app to refresh (GlobalDataProvider listens)
      window.dispatchEvent(new CustomEvent('data:changed'));
      await load();
    } catch (err) {
      console.error('deleteLesson failed', err);
      alert('Failed to delete lesson');
    }
  };

  const deleteActivity = async (id: string) => {
    if (!confirm('Delete activity?')) return;
    try {
      await activitiesApi.delete(id);
      window.dispatchEvent(new CustomEvent('data:changed'));
      await load();
    } catch (err) {
      console.error('deleteActivity failed', err);
      alert('Failed to delete activity');
    }
  };

  // handle create callbacks — refresh and notify global data
  const onActivityCreated = async () => {
    setShowCreateActivity(false);
    window.dispatchEvent(new CustomEvent('data:changed'));
    await load();
  };

  const onLessonCreated = async () => {
    // if you implement a CreateLessonModal, call this when it succeeds
    window.dispatchEvent(new CustomEvent('data:changed'));
    await load();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Content Management</h2>
      {loading ? <div>Loading content...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">Lessons</h3>
              <Button onClick={() => setShowCreateLesson(true)}>Create Lesson</Button>
              {showCreateLesson && (
                <CreateLessonModal onClose={() => setShowCreateLesson(false)} onCreated={onLessonCreated} />
              )}
            </div>
            {lessons.length === 0 ? <div>No lessons</div> : lessons.map(l => (
              <div key={l._id ?? l.id} className="p-3 border-b flex justify-between items-center">
                <div>
                  <div className="font-semibold">{l.title}</div>
                  <div className="text-xs text-slate-500">{l.description}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => alert('Edit lesson UI not implemented')}>Edit</Button>
                  <Button size="sm" className="bg-red-500 text-white" onClick={() => deleteLesson(l._id ?? l.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">Activities</h3>
              <button onClick={() => setShowCreateActivity(true)}>Create Activity</button>
              {showCreateActivity && (
                <CreateActivityModal onClose={() => setShowCreateActivity(false)} onCreated={onActivityCreated} />
              )}
            </div>
            {activities.length === 0 ? <div>No activities</div> : activities.map(a => (
              <div key={a._id ?? a.id} className="p-3 border-b flex justify-between items-center">
                <div>
                  <div className="font-semibold">{a.title}</div>
                  <div className="text-xs text-slate-500">{a.description}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => alert('Edit activity UI not implemented')}>Edit</Button>
                  <Button size="sm" className="bg-red-500 text-white" onClick={() => deleteActivity(a._id ?? a.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

