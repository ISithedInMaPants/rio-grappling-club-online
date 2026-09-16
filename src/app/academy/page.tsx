'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Building2,
  Users,
  UserCheck,
  Clock,
  BookOpen,
  CheckCircle,
  XCircle,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Award,
  Sparkles,
} from 'lucide-react';

export default function AcademyPage() {
  const { user, pendingStudents, approveStudentPending, rejectStudentPending } = useAuth();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fallback demo academy values if accessed directly
  const academyName = user?.academyName || 'Rio Grappling Club Wrocław';
  const headCoach = user?.name || 'Mateusz Flaga';
  const coachRank = user?.rankLabel || 'Black Belt 2nd Degree';
  const city = user?.city || 'Wrocław';
  const country = user?.country || 'Poland';

  const verifiedStudents = [
    {
      id: 'student-1',
      name: 'Alex Silva',
      email: 'alex.silva@student.riograpplingclub.com',
      beltLevel: 'blue' as const,
      stripes: 2,
      matHours: 14.5,
      joinedDate: 'Jan 2026',
    },
    {
      id: 'student-2',
      name: 'Piotr Zieliński',
      email: 'p.zielinski@gmail.com',
      beltLevel: 'purple' as const,
      stripes: 1,
      matHours: 68.0,
      joinedDate: 'Nov 2025',
    },
    {
      id: 'student-3',
      name: 'Karolina Wójcik',
      email: 'k.wojcik@wp.pl',
      beltLevel: 'blue' as const,
      stripes: 4,
      matHours: 42.5,
      joinedDate: 'Aug 2025',
    },
    {
      id: 'student-4',
      name: 'Michał Dąbrowski',
      email: 'michal.d@onet.pl',
      beltLevel: 'white' as const,
      stripes: 2,
      matHours: 8.0,
      joinedDate: 'Feb 2026',
    },
  ];

  const handleApprove = (studentId: string, studentName: string) => {
    approveStudentPending(studentId);
    setToastMessage(`Approved membership for ${studentName}! Access unlocked.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleReject = (studentId: string, studentName: string) => {
    rejectStudentPending(studentId);
    setToastMessage(`Registration request from ${studentName} declined.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-[#ededf4] pb-16">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00923f] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Academy Header Banner */}
      <section className="border-b border-[#2b2b32] bg-gradient-to-b from-[#161619] to-[#0d0d0e] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl bg-[#0d0d0e] border border-[#2b2b32] p-2 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Image
                src="/images/rgc/header_logo.png"
                alt="Rio Grappling Club Logo"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00b54e] bg-[#00923f]/15 border border-[#00923f]/30 px-2 py-0.5 rounded">
                  Affiliated Academy Dashboard
                </span>
                <span className="text-[10px] text-[#9a9aa6] font-mono">
                  {city}, {country}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#ededf4] tracking-tight mt-1">
                {academyName}
              </h1>
              <p className="text-xs text-[#9a9aa6] mt-0.5">
                Head Coach: <span className="text-[#ededf4] font-semibold">{headCoach}</span> • <span className="text-[#e0b252] font-semibold">{coachRank}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link href="/courses" className="flex-1 sm:flex-none">
              <Button variant="primary" size="md" className="w-full">
                <BookOpen className="w-4 h-4 mr-1.5" />
                <span>Technique Library & Player</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Academy Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* KPI Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#161619] border border-[#2b2b32] p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9a9aa6] uppercase font-bold">Active Students</span>
              <Users className="w-4 h-4 text-[#00b54e]" />
            </div>
            <div className="text-2xl font-black text-[#ededf4] mt-2">
              {verifiedStudents.length + 42}
            </div>
            <div className="text-[11px] text-[#00b54e] mt-0.5">✓ Verified Club Members</div>
          </div>

          <div className="bg-[#161619] border border-[#2b2b32] p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9a9aa6] uppercase font-bold">Pending Approval</span>
              <UserCheck className="w-4 h-4 text-[#e0b252]" />
            </div>
            <div className="text-2xl font-black text-[#ededf4] mt-2">
              {pendingStudents.length}
            </div>
            <div className="text-[11px] text-[#e0b252] mt-0.5">Awaiting Coach Review</div>
          </div>

          <div className="bg-[#161619] border border-[#2b2b32] p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9a9aa6] uppercase font-bold">Syllabus Courses</span>
              <BookOpen className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-[#ededf4] mt-2">8</div>
            <div className="text-[11px] text-blue-400 mt-0.5">28 Complete Lessons</div>
          </div>

          <div className="bg-[#161619] border border-[#2b2b32] p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9a9aa6] uppercase font-bold">Total Mat Time</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-[#ededf4] mt-2">184 hrs</div>
            <div className="text-[11px] text-purple-400 mt-0.5">Logged This Month</div>
          </div>
        </div>

        {/* PENDING STUDENT APPROVALS */}
        <section className="bg-[#161619] border border-[#2b2b32] rounded-3xl p-6 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2b2b32] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#e0b252] mb-1">
                <ShieldCheck className="w-4 h-4 text-[#e0b252]" />
                <span>Verification Queue</span>
              </div>
              <h2 className="text-xl font-bold text-[#ededf4]">
                Pending Student Registrations ({pendingStudents.length})
              </h2>
              <p className="text-xs text-[#9a9aa6]">
                Review student requests claiming membership at {academyName}. Approving grants immediate access to the internal technique library.
              </p>
            </div>
          </div>

          {pendingStudents.length === 0 ? (
            <div className="py-10 text-center space-y-2">
              <CheckCircle className="w-8 h-8 text-[#00b54e] mx-auto opacity-70" />
              <div className="text-sm font-bold text-[#ededf4]">All caught up!</div>
              <p className="text-xs text-[#9a9aa6]">
                There are no pending student registrations awaiting verification.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-[#212126] border border-[#2b2b32] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-[#00923f]/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0d0d0e] border border-[#2b2b32] flex items-center justify-center font-bold text-[#00b54e] text-sm">
                      {student.studentName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#ededf4]">
                          {student.studentName}
                        </span>
                        <Badge beltLevel={student.beltLevel} size="sm">
                          {student.beltLevel.toUpperCase()} • {student.stripes} {student.stripes === 1 ? 'Stripe' : 'Stripes'}
                        </Badge>
                      </div>
                      <div className="text-xs text-[#9a9aa6] mt-0.5 flex items-center gap-2">
                        <span>{student.email}</span>
                        <span>•</span>
                        <span className="text-[11px] text-[#6b6b78]">{student.requestedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center">
                    <button
                      onClick={() => handleApprove(student.id, student.studentName)}
                      className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl bg-[#00923f] hover:bg-[#007a34] text-white text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve Student</span>
                    </button>
                    <button
                      onClick={() => handleReject(student.id, student.studentName)}
                      className="px-3 py-1.5 rounded-xl bg-[#161619] hover:bg-red-500/20 text-[#9a9aa6] hover:text-red-400 border border-[#2b2b32] text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Decline</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ACTIVE ACADEMY STUDENT ROSTER */}
        <section className="bg-[#161619] border border-[#2b2b32] rounded-3xl p-6 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2b2b32] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00b54e] mb-1">
                <Users className="w-4 h-4 text-[#00b54e]" />
                <span>Club Roster</span>
              </div>
              <h2 className="text-xl font-bold text-[#ededf4]">
                Verified Active Students
              </h2>
            </div>
            <Link
              href="/courses"
              className="text-xs text-[#00b54e] hover:underline font-semibold flex items-center gap-1"
            >
              <span>View Curriculum Assigned to Students</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#2b2b32] text-[#6b6b78] uppercase text-[10px] tracking-wider">
                  <th className="pb-3 font-bold">Student</th>
                  <th className="pb-3 font-bold">Current Belt Rank</th>
                  <th className="pb-3 font-bold">Mat Hours Logged</th>
                  <th className="pb-3 font-bold">Member Since</th>
                  <th className="pb-3 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2b2b32]/60">
                {verifiedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-[#212126]/40 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="font-bold text-[#ededf4]">{student.name}</div>
                      <div className="text-[11px] text-[#9a9aa6]">{student.email}</div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <Badge beltLevel={student.beltLevel} size="sm">
                        {student.beltLevel.toUpperCase()} • {student.stripes} {student.stripes === 1 ? 'Stripe' : 'Stripes'}
                      </Badge>
                    </td>
                    <td className="py-3.5 pr-4 font-mono text-[#ededf4]">
                      {student.matHours} hrs
                    </td>
                    <td className="py-3.5 pr-4 text-[#9a9aa6]">
                      {student.joinedDate}
                    </td>
                    <td className="py-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#00b54e] bg-[#00923f]/10 border border-[#00923f]/30 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-2.5 h-2.5" /> Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
