import { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useGlobalData } from '../contexts/GlobalDataContext';

/**
 * This component syncs auth events (like signups) to the global admin data
 */
export function AuthDataSync() {
  const { user, isAuthenticated } = useAuth();
  const { addStudent, students } = useGlobalData();
  const hasAddedUser = useRef(false);

  useEffect(() => {
    if (isAuthenticated && user && user.role === 'student' && !hasAddedUser.current) {
      // Check if this student already exists in global data
      const existingStudent = students.find(s => s.email === user.email);
      
      if (!existingStudent && user.grade) {
        // New student signup - add to global data
        addStudent(user.name, user.email, user.grade);
        hasAddedUser.current = true;
      }
    }
  }, [isAuthenticated, user, students, addStudent]);

  return null; // This component doesn't render anything
}
