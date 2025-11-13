import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { lessonsData } from '../data/lessonsData';
import { activitiesData } from '../data/activitiesData';

interface StudentData {
  id: string;
  name: string;
  email: string;
  grade: string;
  enrollmentDate: Date;
  lessonProgress: Record<number, {
    lessonId: number;
    completed: boolean;
    progressPercent: number;
    completedDate?: Date;
  }>;
  activityScores: Record<number, {
    activityId: number;
    score: number;
    maxScore: number;
    completed: boolean;
    completedDate?: Date;
  }>;
  overallProgressPercent: number;
}

interface GlobalActivity {
  id: string;
  studentId: string;
  studentName: string;
  type: 'enrollment' | 'lesson_complete' | 'activity_complete';
  message: string;
  timestamp: Date;
  color: string;
}

interface GlobalDataContextType {
  students: StudentData[];
  globalActivities: GlobalActivity[];
  addStudent: (name: string, email: string, grade: string) => void;
  updateStudentLessonProgress: (studentId: string, lessonId: number, completed: boolean, progressPercent: number) => void;
  updateStudentActivityProgress: (studentId: string, activityId: number, score: number, maxScore: number, completed: boolean) => void;
  getTotalStudents: () => number;
  getActiveLessons: () => number;
  getAverageProgress: () => number;
  getCompletionRate: () => number;
  getTopPerformers: (limit: number) => Array<{ student: StudentData; overallProgress: number }>;
  getRecentActivities: (limit: number) => GlobalActivity[];
}

const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

export function GlobalDataProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [globalActivities, setGlobalActivities] = useState<GlobalActivity[]>([]);

  // Initialize with some demo students
  useEffect(() => {
    const demoStudents: StudentData[] = [
      {
        id: '1',
        name: 'Daniel Mendoza',
        email: 'danielmendoza0830@gmail.com',
        grade: 'Grade 5',
        enrollmentDate: new Date('2024-01-15'),
        lessonProgress: {},
        activityScores: {},
        overallProgressPercent: 0,
      },
      {
        id: '2',
        name: 'Sarah Martinez',
        email: 'sarah.martinez@example.com',
        grade: 'Grade 8',
        enrollmentDate: new Date('2024-01-10'),
        lessonProgress: {
          1: { lessonId: 1, completed: true, progressPercent: 100, completedDate: new Date('2024-01-20') },
          2: { lessonId: 2, completed: true, progressPercent: 100, completedDate: new Date('2024-01-25') },
          3: { lessonId: 3, completed: true, progressPercent: 100, completedDate: new Date('2024-02-01') },
          4: { lessonId: 4, completed: true, progressPercent: 100, completedDate: new Date('2024-02-05') },
          5: { lessonId: 5, completed: true, progressPercent: 100, completedDate: new Date('2024-02-10') },
        },
        activityScores: {
          1: { activityId: 1, score: 10, maxScore: 10, completed: true, completedDate: new Date('2024-01-21') },
          2: { activityId: 2, score: 9, maxScore: 10, completed: true, completedDate: new Date('2024-01-26') },
          3: { activityId: 3, score: 10, maxScore: 10, completed: true, completedDate: new Date('2024-02-02') },
          4: { activityId: 4, score: 10, maxScore: 10, completed: true, completedDate: new Date('2024-02-06') },
          5: { activityId: 5, score: 9, maxScore: 10, completed: true, completedDate: new Date('2024-02-11') },
        },
        overallProgressPercent: 96,
      },
      {
        id: '3',
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        grade: 'Grade 7',
        enrollmentDate: new Date('2024-01-12'),
        lessonProgress: {
          1: { lessonId: 1, completed: true, progressPercent: 100, completedDate: new Date('2024-01-18') },
          2: { lessonId: 2, completed: true, progressPercent: 100, completedDate: new Date('2024-01-24') },
          3: { lessonId: 3, completed: true, progressPercent: 100, completedDate: new Date('2024-02-03') },
          4: { lessonId: 4, completed: true, progressPercent: 100, completedDate: new Date('2024-02-08') },
        },
        activityScores: {
          1: { activityId: 1, score: 9, maxScore: 10, completed: true, completedDate: new Date('2024-01-19') },
          2: { activityId: 2, score: 9, maxScore: 10, completed: true, completedDate: new Date('2024-01-25') },
          3: { activityId: 3, score: 10, maxScore: 10, completed: true, completedDate: new Date('2024-02-04') },
          4: { activityId: 4, score: 9, maxScore: 10, completed: true, completedDate: new Date('2024-02-09') },
        },
        overallProgressPercent: 92,
      },
      {
        id: '4',
        name: 'Emma Thompson',
        email: 'emma.thompson@example.com',
        grade: 'Grade 6',
        enrollmentDate: new Date('2024-01-14'),
        lessonProgress: {
          1: { lessonId: 1, completed: true, progressPercent: 100, completedDate: new Date('2024-01-22') },
          2: { lessonId: 2, completed: true, progressPercent: 100, completedDate: new Date('2024-01-28') },
          3: { lessonId: 3, completed: true, progressPercent: 100, completedDate: new Date('2024-02-05') },
          4: { lessonId: 4, completed: false, progressPercent: 60 },
        },
        activityScores: {
          1: { activityId: 1, score: 9, maxScore: 10, completed: true, completedDate: new Date('2024-01-23') },
          2: { activityId: 2, score: 9, maxScore: 10, completed: true, completedDate: new Date('2024-01-29') },
          3: { activityId: 3, score: 9, maxScore: 10, completed: true, completedDate: new Date('2024-02-06') },
        },
        overallProgressPercent: 90,
      },
      {
        id: '5',
        name: 'James Wilson',
        email: 'james.wilson@example.com',
        grade: 'Grade 8',
        enrollmentDate: new Date('2024-01-16'),
        lessonProgress: {
          1: { lessonId: 1, completed: true, progressPercent: 100, completedDate: new Date('2024-01-24') },
          2: { lessonId: 2, completed: true, progressPercent: 100, completedDate: new Date('2024-01-30') },
          3: { lessonId: 3, completed: true, progressPercent: 100, completedDate: new Date('2024-02-07') },
        },
        activityScores: {
          1: { activityId: 1, score: 9, maxScore: 10, completed: true, completedDate: new Date('2024-01-25') },
          2: { activityId: 2, score: 8, maxScore: 10, completed: true, completedDate: new Date('2024-01-31') },
          3: { activityId: 3, score: 9, maxScore: 10, completed: true, completedDate: new Date('2024-02-08') },
        },
        overallProgressPercent: 87,
      },
      {
        id: '6',
        name: 'Olivia Brown',
        email: 'olivia.brown@example.com',
        grade: 'Grade 5',
        enrollmentDate: new Date('2024-01-20'),
        lessonProgress: {
          1: { lessonId: 1, completed: true, progressPercent: 100, completedDate: new Date('2024-01-27') },
          2: { lessonId: 2, completed: true, progressPercent: 100, completedDate: new Date('2024-02-02') },
        },
        activityScores: {
          1: { activityId: 1, score: 8, maxScore: 10, completed: true, completedDate: new Date('2024-01-28') },
          2: { activityId: 2, score: 8, maxScore: 10, completed: true, completedDate: new Date('2024-02-03') },
        },
        overallProgressPercent: 80,
      },
      {
        id: '7',
        name: 'Liam Garcia',
        email: 'liam.garcia@example.com',
        grade: 'Grade 7',
        enrollmentDate: new Date('2024-01-22'),
        lessonProgress: {
          1: { lessonId: 1, completed: true, progressPercent: 100, completedDate: new Date('2024-02-01') },
          2: { lessonId: 2, completed: false, progressPercent: 45 },
        },
        activityScores: {
          1: { activityId: 1, score: 7, maxScore: 10, completed: true, completedDate: new Date('2024-02-02') },
        },
        overallProgressPercent: 70,
      },
      {
        id: '8',
        name: 'Sophia Lee',
        email: 'sophia.lee@example.com',
        grade: 'Grade 6',
        enrollmentDate: new Date('2024-01-25'),
        lessonProgress: {
          1: { lessonId: 1, completed: true, progressPercent: 100, completedDate: new Date('2024-02-05') },
        },
        activityScores: {
          1: { activityId: 1, score: 6, maxScore: 10, completed: true, completedDate: new Date('2024-02-06') },
        },
        overallProgressPercent: 60,
      },
    ];

    setStudents(demoStudents);

    // Add some initial global activities
    const initialActivities: GlobalActivity[] = [
      {
        id: 'act-1',
        studentId: '2',
        studentName: 'Sarah Martinez',
        type: 'activity_complete',
        message: 'Sarah Martinez completed "Shape & Color Sorter"',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        color: 'bg-emerald-500',
      },
      {
        id: 'act-2',
        studentId: '3',
        studentName: 'Michael Chen',
        type: 'lesson_complete',
        message: 'Michael Chen completed "Shapes & Colors"',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        color: 'bg-blue-500',
      },
      {
        id: 'act-3',
        studentId: '4',
        studentName: 'Emma Thompson',
        type: 'activity_complete',
        message: 'Emma Thompson completed "Science Exploration Quiz"',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        color: 'bg-emerald-500',
      },
      {
        id: 'act-4',
        studentId: '5',
        studentName: 'James Wilson',
        type: 'lesson_complete',
        message: 'James Wilson completed "Science Exploration"',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        color: 'bg-blue-500',
      },
    ];

    setGlobalActivities(initialActivities);
  }, []);

  const addStudent = (name: string, email: string, grade: string) => {
    const newStudent: StudentData = {
      id: Date.now().toString(),
      name,
      email,
      grade,
      enrollmentDate: new Date(),
      lessonProgress: {},
      activityScores: {},
      overallProgressPercent: 0,
    };

    setStudents(prev => [...prev, newStudent]);

    // Add to global activities
    const activity: GlobalActivity = {
      id: `act-${Date.now()}`,
      studentId: newStudent.id,
      studentName: name,
      type: 'enrollment',
      message: `New student enrollment: ${name}`,
      timestamp: new Date(),
      color: 'bg-blue-500',
    };

    setGlobalActivities(prev => [activity, ...prev]);
  };

  const updateStudentLessonProgress = (
    studentId: string,
    lessonId: number,
    completed: boolean,
    progressPercent: number
  ) => {
    setStudents(prev =>
      prev.map(student => {
        if (student.id === studentId) {
          const updatedLessonProgress = {
            ...student.lessonProgress,
            [lessonId]: {
              lessonId,
              completed,
              progressPercent,
              completedDate: completed ? new Date() : undefined,
            },
          };

          // Recalculate overall progress
          const completedLessons = Object.values(updatedLessonProgress).filter(l => l.completed).length;
          const completedActivities = Object.values(student.activityScores).filter(a => a.completed).length;
          const totalCompleted = completedLessons + completedActivities;
          const totalAvailable = lessonsData.length + activitiesData.length;
          const newOverallProgress = totalAvailable > 0 
            ? Math.round((totalCompleted / totalAvailable) * 100) 
            : 0;

          // Add to global activities if completed
          if (completed) {
            const lesson = lessonsData.find(l => l.id === lessonId);
            const activity: GlobalActivity = {
              id: `act-${Date.now()}`,
              studentId,
              studentName: student.name,
              type: 'lesson_complete',
              message: `${student.name} completed "${lesson?.title || `Lesson ${lessonId}`}"`,
              timestamp: new Date(),
              color: 'bg-blue-500',
            };
            setGlobalActivities(prev => [activity, ...prev]);
          }

          return {
            ...student,
            lessonProgress: updatedLessonProgress,
            overallProgressPercent: newOverallProgress,
          };
        }
        return student;
      })
    );
  };

  const updateStudentActivityProgress = (
    studentId: string,
    activityId: number,
    score: number,
    maxScore: number,
    completed: boolean
  ) => {
    setStudents(prev =>
      prev.map(student => {
        if (student.id === studentId) {
          const updatedActivityScores = {
            ...student.activityScores,
            [activityId]: {
              activityId,
              score,
              maxScore,
              completed,
              completedDate: completed ? new Date() : undefined,
            },
          };

          // Recalculate overall progress
          const completedLessons = Object.values(student.lessonProgress).filter(l => l.completed).length;
          const completedActivities = Object.values(updatedActivityScores).filter(a => a.completed).length;
          const totalCompleted = completedLessons + completedActivities;
          const totalAvailable = lessonsData.length + activitiesData.length;
          const newOverallProgress = totalAvailable > 0 
            ? Math.round((totalCompleted / totalAvailable) * 100) 
            : 0;

          // Add to global activities if completed
          if (completed) {
            const activity = activitiesData.find(a => a.id === activityId);
            const globalActivity: GlobalActivity = {
              id: `act-${Date.now()}`,
              studentId,
              studentName: student.name,
              type: 'activity_complete',
              message: `${student.name} completed "${activity?.title || `Activity ${activityId}`}"`,
              timestamp: new Date(),
              color: 'bg-emerald-500',
            };
            setGlobalActivities(prev => [globalActivity, ...prev]);
          }

          return {
            ...student,
            activityScores: updatedActivityScores,
            overallProgressPercent: newOverallProgress,
          };
        }
        return student;
      })
    );
  };

  const getTotalStudents = () => students.length;

  const getActiveLessons = () => lessonsData.length;

  const getAverageProgress = () => {
    if (students.length === 0) return 0;
    const totalProgress = students.reduce((sum, student) => sum + student.overallProgressPercent, 0);
    return Math.round(totalProgress / students.length);
  };

  const getCompletionRate = () => {
    if (students.length === 0) return 0;
    
    // Calculate the average completion rate across all students
    let totalCompletionRate = 0;
    
    students.forEach(student => {
      const completedActivities = Object.values(student.activityScores).filter(a => a.completed);
      const totalActivities = activitiesData.length;
      
      if (totalActivities > 0) {
        const studentCompletionRate = (completedActivities.length / totalActivities) * 100;
        totalCompletionRate += studentCompletionRate;
      }
    });
    
    return Math.round(totalCompletionRate / students.length);
  };

  const getTopPerformers = (limit: number) => {
    return students
      .map(student => ({
        student,
        overallProgress: student.overallProgressPercent,
      }))
      .sort((a, b) => b.overallProgress - a.overallProgress)
      .slice(0, limit);
  };

  const getRecentActivities = (limit: number) => {
    return globalActivities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  };

  return (
    <GlobalDataContext.Provider
      value={{
        students,
        globalActivities,
        addStudent,
        updateStudentLessonProgress,
        updateStudentActivityProgress,
        getTotalStudents,
        getActiveLessons,
        getAverageProgress,
        getCompletionRate,
        getTopPerformers,
        getRecentActivities,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
}

export function useGlobalData() {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error('useGlobalData must be used within GlobalDataProvider');
  }
  return context;
}
