'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { RGC_ACADEMIES } from '@/data/academies';

export type BeltLevel = 'white' | 'blue' | 'purple' | 'brown' | 'black';

export type AuthStatus =
  | 'unauthenticated'
  | 'pending_email'
  | 'pending_coach_approval'
  | 'verified_student';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  beltLevel: BeltLevel;
  stripes: number;
  academyId: string;
  academyName: string;
  headCoach: string;
  headCoachEmail: string;
  status: AuthStatus;
  matHours: number;
  avatarUrl: string;
}

export const DEMO_STUDENT: StudentProfile = {
  id: 'student-alex-silva',
  name: 'Alex Silva',
  email: 'alex.silva@student.riograpplingclub.com',
  beltLevel: 'blue',
  stripes: 2,
  academyId: 'rgc-wroclaw',
  academyName: 'Rio Grappling Club Wrocław',
  headCoach: 'Mateusz Flaga',
  headCoachEmail: 'flaga@riograpplingclub.com',
  status: 'verified_student',
  matHours: 14.5,
  avatarUrl: '/images/instructors/student-alex.png',
};

interface AuthContextType {
  user: StudentProfile | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  signIn: (email: string, password?: string) => boolean;
  signUp: (data: {
    name: string;
    email: string;
    beltLevel: BeltLevel;
    stripes: number;
    academyId: string;
  }) => void;
  verifyEmail: () => void;
  approveByCoach: () => void;
  quickDemoLogin: () => void;
  signOut: () => void;
  resetRegistration: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'rgc_student_auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StudentProfile | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        // Default to demo student Alex Silva so all courses and features are instantly active
        setUser(DEMO_STUDENT);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_STUDENT));
      }
    } catch {
      setUser(DEMO_STUDENT);
    }
  }, []);

  const persistUser = (newUser: StudentProfile | null) => {
    setUser(newUser);
    try {
      if (newUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save auth state to localStorage', e);
    }
  };

  const signIn = (email: string, _password?: string): boolean => {
    if (!email) return false;
    if (email.toLowerCase().includes('alex') || !user) {
      persistUser(DEMO_STUDENT);
      return true;
    }
    if (user && user.email.toLowerCase() === email.toLowerCase()) {
      persistUser({ ...user, status: 'verified_student' });
      return true;
    }
    const defaultAcademy = RGC_ACADEMIES[0];
    const newStudent: StudentProfile = {
      id: `student-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      email,
      beltLevel: 'white',
      stripes: 0,
      academyId: defaultAcademy.id,
      academyName: defaultAcademy.name,
      headCoach: defaultAcademy.headCoach,
      headCoachEmail: defaultAcademy.contactEmail,
      status: 'verified_student',
      matHours: 0,
      avatarUrl: '/images/instructors/student-alex.png',
    };
    persistUser(newStudent);
    return true;
  };

  const signUp = (data: {
    name: string;
    email: string;
    beltLevel: BeltLevel;
    stripes: number;
    academyId: string;
  }) => {
    const academy = RGC_ACADEMIES.find((a) => a.id === data.academyId) || RGC_ACADEMIES[0];

    const newStudent: StudentProfile = {
      id: `student-${Date.now()}`,
      name: data.name,
      email: data.email,
      beltLevel: data.beltLevel,
      stripes: data.stripes,
      academyId: academy.id,
      academyName: academy.name,
      headCoach: academy.headCoach,
      headCoachEmail: academy.contactEmail,
      status: 'pending_email', // Step 2: email verification next
      matHours: 0,
      avatarUrl: '/images/instructors/student-alex.png',
    };

    persistUser(newStudent);
  };

  const verifyEmail = () => {
    if (!user) return;
    const updated: StudentProfile = {
      ...user,
      status: 'pending_coach_approval', // Step 3: coach approval next
    };
    persistUser(updated);
  };

  const approveByCoach = () => {
    if (!user) return;
    const updated: StudentProfile = {
      ...user,
      status: 'verified_student', // Step 4: fully unlocked!
    };
    persistUser(updated);
  };

  const quickDemoLogin = () => {
    persistUser(DEMO_STUDENT);
  };

  const signOut = () => {
    persistUser(null);
  };

  const resetRegistration = () => {
    persistUser(null);
  };

  const isAuthenticated = !!(user && user.status === 'verified_student');
  const status: AuthStatus = user ? user.status : 'unauthenticated';

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        isAuthenticated,
        signIn,
        signUp,
        verifyEmail,
        approveByCoach,
        quickDemoLogin,
        signOut,
        resetRegistration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
