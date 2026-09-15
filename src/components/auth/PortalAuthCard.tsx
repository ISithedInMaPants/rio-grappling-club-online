'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, BeltLevel } from '@/context/AuthContext';
import { RGC_ACADEMIES } from '@/data/academies';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ShieldCheck,
  Mail,
  CheckCircle2,
  Lock,
  ArrowRight,
  User,
  Building2,
  Sparkles,
  LogOut,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const PortalAuthCard: React.FC = () => {
  const router = useRouter();
  const {
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
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');

  // Sign In form fields
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInError, setSignInError] = useState('');

  // Register form fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regBelt, setRegBelt] = useState<BeltLevel>('white');
  const [regStripes, setRegStripes] = useState(0);
  const [regAcademyId, setRegAcademyId] = useState(RGC_ACADEMIES[0].id);
  const [regError, setRegError] = useState('');

  const belts: { level: BeltLevel; label: string }[] = [
    { level: 'white', label: 'White' },
    { level: 'blue', label: 'Blue' },
    { level: 'purple', label: 'Purple' },
    { level: 'brown', label: 'Brown' },
    { level: 'black', label: 'Black' },
  ];

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail) {
      setSignInError('Please provide your student email address.');
      return;
    }
    const success = signIn(signInEmail, signInPassword);
    if (success) {
      router.push('/courses');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) {
      setRegError('Please enter your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setRegError('Please enter a valid email address.');
      return;
    }
    setRegError('');
    signUp({
      name: regName.trim(),
      email: regEmail.trim(),
      beltLevel: regBelt,
      stripes: regStripes,
      academyId: regAcademyId,
    });
  };

  // If user is currently in a pending registration state, ensure active tab is 'register'
  const isPendingRegistration =
    status === 'pending_email' || status === 'pending_coach_approval';

  return (
    <div className="w-full max-w-xl bg-[#161619] border border-[#2b2b32] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Top ambient brand glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#00923f]/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#123984]/15 blur-[80px] pointer-events-none" />

      {/* Authenticated View: Active Student Session */}
      {isAuthenticated && user && !isPendingRegistration ? (
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00923f]/15 border border-[#00923f]/40 text-xs text-[#00b54e] font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#00b54e]" />
            <span>Verified Student Access Active</span>
          </div>

          <div className="bg-[#212126] border border-[#2b2b32] rounded-2xl p-5 text-left space-y-3">
            <div className="flex items-center justify-between border-b border-[#2b2b32] pb-3">
              <div>
                <h3 className="font-bold text-lg text-[#ededf4]">{user.name}</h3>
                <p className="text-xs text-[#9a9aa6]">{user.email}</p>
              </div>
              <Badge beltLevel={user.beltLevel} size="md">
                {user.beltLevel.toUpperCase()} • {user.stripes} {user.stripes === 1 ? 'Stripe' : 'Stripes'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-[#9a9aa6]">
              <div>
                <span className="block text-[10px] uppercase font-bold text-[#6b6b78]">
                  Affiliated Academy
                </span>
                <span className="font-semibold text-[#ededf4]">{user.academyName}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-[#6b6b78]">
                  Head Coach
                </span>
                <span className="font-semibold text-[#ededf4]">{user.headCoach}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link href="/courses" className="w-full sm:flex-1">
              <Button variant="primary" size="lg" className="w-full">
                <span>Enter Training Portal</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <button
              onClick={signOut}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#212126] hover:bg-[#2b2b32] text-xs font-semibold text-[#9a9aa6] hover:text-red-400 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      ) : isPendingRegistration && user ? (
        /* Multi-step Student Registration Progress */
        <div className="space-y-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-between border-b border-[#2b2b32] pb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#00923f] text-white text-xs font-bold flex items-center justify-center">
                {status === 'pending_email' ? '2' : '3'}
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#00b54e]">
                  {status === 'pending_email'
                    ? 'Step 2: Email Verification'
                    : 'Step 3: Head Coach Approval'}
                </div>
                <div className="text-xs text-[#9a9aa6]">Student Onboarding Pathway</div>
              </div>
            </div>
            <button
              onClick={resetRegistration}
              className="text-xs text-[#9a9aa6] hover:text-red-400 transition-colors underline"
            >
              Cancel
            </button>
          </div>

          {/* STEP 2: EMAIL VERIFICATION */}
          {status === 'pending_email' && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#00923f]/15 border border-[#00923f]/40 text-[#00b54e] flex items-center justify-center mx-auto shadow-lg shadow-[#00923f]/10">
                <Mail className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-[#ededf4]">
                  Verify Your Email Address
                </h3>
                <p className="text-xs sm:text-sm text-[#9a9aa6] max-w-md mx-auto leading-relaxed">
                  We have dispatched a verification email to:
                  <br />
                  <span className="font-semibold font-mono text-[#ededf4] bg-[#212126] px-2 py-0.5 rounded border border-[#2b2b32]">
                    {user.email}
                  </span>
                </p>
                <p className="text-xs text-[#6b6b78] pt-1">
                  Please open the confirmation link in your inbox to proceed to coach verification.
                </p>
              </div>

              <div className="bg-[#212126]/80 border border-[#2b2b32] rounded-2xl p-4 text-left space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#00b54e] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Next Step After Verification
                </div>
                <p className="text-xs text-[#9a9aa6] leading-relaxed">
                  Once your email is verified, an automatic notification will be sent to your Academy Owner & Head Coach (
                  <span className="text-[#ededf4] font-medium">{user.headCoach}</span>) to verify your club membership.
                </p>
              </div>

              {/* Simulation Action for Demo */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={verifyEmail}
                  className="w-full py-3 px-4 rounded-xl bg-[#00923f] hover:bg-[#007a34] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#00923f]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Verification (Simulate Email Link Click)</span>
                </button>
                <div className="text-[10px] text-[#6b6b78] text-center">
                  💡 Click above to advance the demo to Academy Owner verification
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ACADEMY OWNER VERIFICATION */}
          {status === 'pending_coach_approval' && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#123984]/20 border border-[#123984]/50 text-blue-400 flex items-center justify-center mx-auto shadow-lg shadow-[#123984]/20">
                <Building2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-[#ededf4]">
                  Pending Academy Owner Approval
                </h3>
                <p className="text-xs sm:text-sm text-[#9a9aa6] max-w-md mx-auto leading-relaxed">
                  Your student email is confirmed! To ensure this portal remains an{' '}
                  <span className="text-[#00b54e] font-semibold">exclusive free benefit</span> for active Rio Grappling Club practitioners, your academy head coach must approve your registration.
                </p>
              </div>

              {/* Coach Notification Summary Card */}
              <div className="bg-[#212126] border border-[#2b2b32] rounded-2xl p-4 text-left space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Authorization Request Dispatched
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-[#6b6b78] block">Affiliated Academy</span>
                    <span className="font-semibold text-[#ededf4]">{user.academyName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6b6b78] block">Responsible Head Coach</span>
                    <span className="font-semibold text-[#ededf4]">
                      {user.headCoach} ({user.headCoachEmail})
                    </span>
                  </div>
                </div>
              </div>

              {/* Simulation Action for Demo */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    approveByCoach();
                    router.push('/courses');
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00923f] to-[#00b54e] hover:from-[#007a34] hover:to-[#00923f] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#00923f]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Simulate Head Coach Approval & Enter Portal</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <div className="text-[10px] text-[#6b6b78] text-center">
                  💡 Simulates head coach confirming your active mat membership
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Normal Unauthenticated Tabbed Form: Sign In vs Register */
        <div className="space-y-6">
          {/* Tabs */}
          <div className="grid grid-cols-2 p-1 bg-[#0d0d0e] border border-[#2b2b32] rounded-2xl">
            <button
              onClick={() => {
                setActiveTab('signin');
                setSignInError('');
                setRegError('');
              }}
              className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeTab === 'signin'
                  ? 'bg-[#161619] text-[#00b54e] border border-[#00923f]/40 shadow-sm'
                  : 'text-[#9a9aa6] hover:text-[#ededf4]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setActiveTab('register');
                setSignInError('');
                setRegError('');
              }}
              className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeTab === 'register'
                  ? 'bg-[#161619] text-[#00b54e] border border-[#00923f]/40 shadow-sm'
                  : 'text-[#9a9aa6] hover:text-[#ededf4]'
              }`}
            >
              Register (New Student)
            </button>
          </div>

          {/* SIGN IN TAB */}
          {activeTab === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#ededf4] mb-1.5">
                  Student Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="student@riograpplingclub.com"
                    className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#ededf4] placeholder-[#6b6b78] focus:outline-none focus:border-[#00923f] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#ededf4] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#ededf4] placeholder-[#6b6b78] focus:outline-none focus:border-[#00923f] transition-colors"
                  />
                </div>
              </div>

              {signInError && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{signInError}</span>
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" className="w-full">
                <span>Sign In to Portal</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              {/* Demo One-Click Persona Button */}
              <div className="pt-3 border-t border-[#2b2b32]/60">
                <button
                  type="button"
                  onClick={() => {
                    quickDemoLogin();
                    router.push('/courses');
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#212126] hover:bg-[#2b2b32] border border-[#2b2b32] text-xs font-semibold text-[#ededf4] transition-all flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#e0b252]" />
                    <span>Quick Demo Sign In: Alex Silva</span>
                  </div>
                  <span className="text-[10px] text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30">
                    Blue Belt • 2 Stripes
                  </span>
                </button>
              </div>
            </form>
          ) : (
            /* REGISTER TAB (STEP 1) */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#00b54e] font-semibold mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Step 1 of 3: Student Details & Academy Selection</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#ededf4] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#ededf4] placeholder-[#6b6b78] focus:outline-none focus:border-[#00923f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#ededf4] mb-1">
                  Student Email
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="marcus.vance@gmail.com"
                  className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#ededf4] placeholder-[#6b6b78] focus:outline-none focus:border-[#00923f]"
                />
              </div>

              {/* Belt Rank & Stripes Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#ededf4] mb-1">
                    Current Belt Rank
                  </label>
                  <select
                    value={regBelt}
                    onChange={(e) => setRegBelt(e.target.value as BeltLevel)}
                    className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#ededf4] focus:outline-none focus:border-[#00923f]"
                  >
                    {belts.map((b) => (
                      <option key={b.level} value={b.level} className="bg-[#161619]">
                        {b.label} Belt
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#ededf4] mb-1">
                    Stripes (Graus)
                  </label>
                  <select
                    value={regStripes}
                    onChange={(e) => setRegStripes(Number(e.target.value))}
                    className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#ededf4] focus:outline-none focus:border-[#00923f]"
                  >
                    <option value={0}>0 Stripes</option>
                    <option value={1}>1 Stripe</option>
                    <option value={2}>2 Stripes</option>
                    <option value={3}>3 Stripes</option>
                    <option value={4}>4 Stripes</option>
                  </select>
                </div>
              </div>

              {/* Registered Academy Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-[#ededf4] mb-1">
                  Select Your Affiliated Rio Grappling Club Academy
                </label>
                <select
                  value={regAcademyId}
                  onChange={(e) => setRegAcademyId(e.target.value)}
                  className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-3 py-2 text-xs text-[#ededf4] focus:outline-none focus:border-[#00923f]"
                >
                  {RGC_ACADEMIES.map((academy) => (
                    <option key={academy.id} value={academy.id} className="bg-[#161619] py-1">
                      {academy.flag} {academy.name} ({academy.country}) — Coach {academy.headCoach}
                    </option>
                  ))}
                </select>
                <span className="block text-[10px] text-[#6b6b78] mt-1">
                  * Your Academy Owner / Head Coach will receive a verification request to approve your student access.
                </span>
              </div>

              {regError && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{regError}</span>
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" className="w-full">
                <span>Continue to Email Verification</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
