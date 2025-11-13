import { useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { useGlobalData } from '../contexts/GlobalDataContext';
import { useAuth } from '../contexts/AuthContext';

/**
 * This component syncs the current student's progress to the global admin data
 */
export function StudentDataSync() {
  const { user } = useAuth();
  const { lessonProgress, activityScores } = useApp();
  const { updateStudentLessonProgress, updateStudentActivityProgress, students } = useGlobalData();

  // Sync lesson progress whenever it changes
  useEffect(() => {
    if (!user || user.role !== 'student') return;

    // Find the current student in global data
    const currentStudent = students.find(s => s.email === user.email);
    if (!currentStudent) return;

    // Sync each lesson's progress
    Object.values(lessonProgress).forEach(lesson => {
      updateStudentLessonProgress(
        currentStudent.id,
        lesson.lessonId,
        lesson.completed,
        lesson.progressPercent
      );
    });
  }, [lessonProgress, user, students, updateStudentLessonProgress]);

  // Sync activity scores whenever they change
  useEffect(() => {
    if (!user || user.role !== 'student') return;

    // Find the current student in global data
    const currentStudent = students.find(s => s.email === user.email);
    if (!currentStudent) return;

    // Sync each activity's score
    Object.values(activityScores).forEach(activity => {
      updateStudentActivityProgress(
        currentStudent.id,
        activity.activityId,
        activity.score,
        activity.maxScore,
        activity.completed
      );
    });
  }, [activityScores, user, students, updateStudentActivityProgress]);

  return null; // This component doesn't render anything
}
