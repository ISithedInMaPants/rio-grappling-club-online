'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { RGC_ACADEMIES, RgcAcademy } from '@/data/academies';

export type BeltLevel = 'white' | 'blue' | 'purple' | 'brown' | 'black';
export type UserRole = 'student' | 'owner';

export type AuthStatus =
  | 'unauthenticated'
  | 'pending_email'
  | 'pending_approval'
  | 'verified';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  beltLevel: BeltLevel;
  stripes: number;
  rankLabel: string;
  academyId: string;
  academyName: string;
  city?: string;
  country?: string;
  headCoach?: string;
  headCoachEmail?: string;
  status: AuthStatus;
  matHours: number;
  avatarUrl: string;
}

export interface PendingStudent {
  id: string;
  studentName: string;
  email: string;
  beltLevel: BeltLevel;
  stripes: number;
  academyId: string;
  academyName: string;
  requestedDate: string;
}

export const DEMO_STUDENT: UserProfile = {
  id: 'student-alex-silva',
  name: 'Alex Silva',
  email: 'alex.silva@student.riograpplingclub.com',
  role: 'student',
  beltLevel: 'blue',
  stripes: 2,
  rankLabel: 'Blue Belt • 2 Stripes',
  academyId: 'rgc-wroclaw',
  academyName: 'Rio Grappling Club Wrocław',
  headCoach: 'Mateusz Flaga',
  headCoachEmail: 'flaga@riograpplingclub.com',
  status: 'verified',
  matHours: 14.5,
  avatarUrl: '/images/instructors/student-alex.png',
};

export const DEMO_OWNER: UserProfile = {
  id: 'owner-mateusz-flaga',
  name: 'Mateusz Flaga',
  email: 'flaga@riograpplingclub.com',
  role: 'owner',
  beltLevel: 'black',
  stripes: 2,
  rankLabel: 'Black Belt 2nd Degree',
  academyId: 'rgc-wroclaw',
  academyName: 'Rio Grappling Club Wrocław',
  city: 'Wrocław',
  country: 'Poland',
  headCoach: 'Mateusz Flaga',
  headCoachEmail: 'flaga@riograpplingclub.com',
  status: 'verified',
  matHours: 1200,
  avatarUrl: '/images/instructors/flaga.png',
};

export const INITIAL_PENDING_STUDENTS: PendingStudent[] = [
  {
    id: 'pending-1',
    studentName: 'Marcus Vance',
    email: 'marcus.vance@gmail.com',
    beltLevel: 'purple',
    stripes: 1,
    academyId: 'rgc-wroclaw',
    academyName: 'Rio Grappling Club Wrocław',
    requestedDate: 'Today, 14:15',
  },
  {
    id: 'pending-2',
    studentName: 'Elena Kowalska',
    email: 'elena.k@outlook.com',
    beltLevel: 'white',
    stripes: 3,
    academyId: 'rgc-wroclaw',
    academyName: 'Rio Grappling Club Wrocław',
    requestedDate: 'Yesterday',
  },
];

interface AuthContextType {
  user: UserProfile | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  pendingStudents: PendingStudent[];
  signIn: (email: string, password?: string) => { success: boolean; role: UserRole };
  signUpStudent: (data: {
    name: string;
    email: string;
    beltLevel: BeltLevel;
    stripes: number;
    academyId: string;
  }) => void;
  signUpOwner: (data: {
    name: string;
    email: string;
    rankLabel: string;
    academyName: string;
    city: string;
    country: string;
  }) => void;
  verifyEmail: () => void;
  approveRegistration: () => void;
  loginAsStudent: () => void;
  loginAsOwner: () => void;
  approveStudentPending: (id: string) => void;
  rejectStudentPending: (id: string) => void;
  signOut: () => void;
  resetRegistration: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'rgc_user_session';
const STORAGE_KEY_PENDING = 'rgc_pending_students';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [pendingStudents, setPendingStudents] = useState<PendingStudent[]>(INITIAL_PENDING_STUDENTS);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Default to demo student Alex Silva
        setUser(DEMO_STUDENT);
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(DEMO_STUDENT));
      }

      const savedPending = localStorage.getItem(STORAGE_KEY_PENDING);
      if (savedPending) {
        setPendingStudents(JSON.parse(savedPending));
      }
    } catch {
      setUser(DEMO_STUDENT);
    }
  }, []);

  const persistUser = (newUser: UserProfile | null) => {
    setUser(newUser);
    try {
      if (newUser) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch (e) {
      console.error('Failed to save user session', e);
    }
  };

  const persistPending = (newList: PendingStudent[]) => {
    setPendingStudents(newList);
    try {
      localStorage.setItem(STORAGE_KEY_PENDING, JSON.stringify(newList));
    } catch (e) {
      console.error('Failed to save pending students', e);
    }
  };

  const signIn = (email: string, _password?: string): { success: boolean; role: UserRole } => {
    if (!email) return { success: false, role: 'student' };

    const lower = email.toLowerCase();
    // Check if logging in as coach / owner
    if (lower.includes('owner') || lower.includes('coach') || lower.includes('flaga') || lower.includes('atalla')) {
      persistUser(DEMO_OWNER);
      return { success: true, role: 'owner' };
    }

    // If current session matches email
    if (user && user.email.toLowerCase() === lower) {
      const updated = { ...user, status: 'verified' as AuthStatus };
      persistUser(updated);
      return { success: true, role: user.role };
    }

    // Default to student persona
    persistUser(DEMO_STUDENT);
    return { success: true, role: 'student' };
  };

  const signUpStudent = (data: {
    name: string;
    email: string;
    beltLevel: BeltLevel;
    stripes: number;
    academyId: string;
  }) => {
    const academy = RGC_ACADEMIES.find((a) => a.id === data.academyId) || RGC_ACADEMIES[0];

    const newStudent: UserProfile = {
      id: `student-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: 'student',
      beltLevel: data.beltLevel,
      stripes: data.stripes,
      rankLabel: `${data.beltLevel.toUpperCase()} Belt • ${data.stripes} Stripes`,
      academyId: academy.id,
      academyName: academy.name,
      headCoach: academy.headCoach,
      headCoachEmail: academy.contactEmail,
      status: 'pending_email',
      matHours: 0,
      avatarUrl: '/images/instructors/student-alex.png',
    };

    // Add to pending approvals list
    const newPending: PendingStudent = {
      id: `pending-${Date.now()}`,
      studentName: data.name,
      email: data.email,
      beltLevel: data.beltLevel,
      stripes: data.stripes,
      academyId: academy.id,
      academyName: academy.name,
      requestedDate: 'Just now',
    };
    persistPending([newPending, ...pendingStudents]);
    persistUser(newStudent);
  };

  const signUpOwner = (data: {
    name: string;
    email: string;
    rankLabel: string;
    academyName: string;
    city: string;
    country: string;
  }) => {
    const newOwner: UserProfile = {
      id: `owner-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: 'owner',
      beltLevel: 'black',
      stripes: 2,
      rankLabel: data.rankLabel,
      academyId: `rgc-${data.city.toLowerCase().replace(/\s+/g, '-')}`,
      academyName: data.academyName,
      city: data.city,
      country: data.country,
      status: 'pending_email',
      matHours: 1000,
      avatarUrl: '/images/instructors/flaga.png',
    };

    persistUser(newOwner);
  };

  const verifyEmail = () => {
    if (!user) return;
    persistUser({ ...user, status: 'pending_approval' });
  };

  const approveRegistration = () => {
    if (!user) return;
    persistUser({ ...user, status: 'verified' });
  };

  const loginAsStudent = () => {
    persistUser(DEMO_STUDENT);
  };

  const loginAsOwner = () => {
    persistUser(DEMO_OWNER);
  };

  const approveStudentPending = (id: string) => {
    const updated = pendingStudents.filter((p) => p.id !== id);
    persistPending(updated);
  };

  const rejectStudentPending = (id: string) => {
    const updated = pendingStudents.filter((p) => p.id !== id);
    persistPending(updated);
  };

  const signOut = () => {
    persistUser(null);
  };

  const resetRegistration = () => {
    persistUser(null);
  };

  const isAuthenticated = !!(user && user.status === 'verified');
  const status: AuthStatus = user ? user.status : 'unauthenticated';

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        isAuthenticated,
        pendingStudents,
        signIn,
        signUpStudent,
        signUpOwner,
        verifyEmail,
        approveRegistration,
        loginAsStudent,
        loginAsOwner,
        approveStudentPending,
        rejectStudentPending,
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
