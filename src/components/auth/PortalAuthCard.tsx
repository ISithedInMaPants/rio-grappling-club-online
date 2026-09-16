'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, BeltLevel, UserRole } from '@/context/AuthContext';
import { RGC_ACADEMIES } from '@/data/academies';
import { Button } from '@/components/ui/Button';
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
} from 'lucide-react';

export const PortalAuthCard: React.FC = () => {
  const router = useRouter();
  const {
    user,
    status,
    isAuthenticated,
    signIn,
    signUpStudent,
    signUpOwner,
    verifyEmail,
    approveRegistration,
    loginAsStudent,
    loginAsOwner,
    signOut,
    resetRegistration,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  // Log In Form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Sign Up Form
  const [signupRole, setSignupRole] = useState<UserRole>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Student specific
  const [beltLevel, setBeltLevel] = useState<BeltLevel>('white');
  const [stripes, setStripes] = useState<number>(0);
  const [academyId, setAcademyId] = useState<string>(RGC_ACADEMIES[0].id);

  // Academy Owner specific
  const [blackBeltDegree, setBlackBeltDegree] = useState<string>('Black Belt 1st Degree');
  const [academyName, setAcademyName] = useState('');
  const [academyCity, setAcademyCity] = useState('');
  const [academyCountry, setAcademyCountry] = useState('');

  const [signupError, setSignupError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setLoginError('Please enter your email address.');
      return;
    }
    setLoginError('');
    const res = signIn(loginEmail.trim(), loginPassword);
    if (res.success) {
      if (res.role === 'owner') {
        router.push('/academy');
      } else {
        router.push('/courses');
      }
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setSignupError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setSignupError('Please enter a valid email address.');
      return;
    }

    setSignupError('');

    if (signupRole === 'student') {
      signUpStudent({
        name: name.trim(),
        email: email.trim(),
        beltLevel,
        stripes,
        academyId,
      });
    } else {
      if (!academyName.trim()) {
        setSignupError('Please enter your academy name.');
        return;
      }
      signUpOwner({
        name: name.trim(),
        email: email.trim(),
        rankLabel: blackBeltDegree,
        academyName: academyName.trim(),
        city: academyCity.trim() || 'Headquarters',
        country: academyCountry.trim() || 'Affiliate',
      });
    }
  };

  const isPendingFlow = status === 'pending_email' || status === 'pending_approval';

  return (
    <div className="w-full max-w-md bg-[#161619] border border-[#2b2b32] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
      {/* If already authenticated, show simple direct entry */}
      {isAuthenticated && user && !isPendingFlow ? (
        <div className="space-y-5 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00923f]/15 border border-[#00923f]/40 text-xs text-[#00b54e] font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Logged in as {user.role === 'owner' ? 'Academy Owner' : 'Student'}</span>
          </div>

          <div className="bg-[#212126] border border-[#2b2b32] rounded-2xl p-4 text-left space-y-1.5">
            <div className="font-bold text-[#ededf4] text-base">{user.name}</div>
            <div className="text-xs text-[#00b54e] font-semibold">{user.rankLabel}</div>
            <div className="text-xs text-[#9a9aa6]">{user.academyName}</div>
          </div>

          <div className="flex flex-col gap-2.5 pt-1">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => router.push(user.role === 'owner' ? '/academy' : '/courses')}
            >
              <span>{user.role === 'owner' ? 'Go to Academy Page' : 'Go to Student Page'}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <button
              onClick={signOut}
              className="w-full py-2 text-xs font-semibold text-[#9a9aa6] hover:text-red-400 transition-colors flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      ) : isPendingFlow && user ? (
        /* Simple Multi-step Verification */
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-[#2b2b32] pb-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#00b54e]">
              {status === 'pending_email' ? 'Email Verification' : 'Approval Pending'}
            </div>
            <button
              onClick={resetRegistration}
              className="text-xs text-[#9a9aa6] hover:text-red-400 transition-colors"
            >
              Cancel
            </button>
          </div>

          {status === 'pending_email' && (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#00923f]/15 border border-[#00923f]/40 text-[#00b54e] flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#ededf4]">Verify Your Email</h3>
                <p className="text-xs text-[#9a9aa6] mt-1">
                  We sent a verification link to <strong className="text-[#ededf4]">{user.email}</strong>.
                </p>
              </div>

              <button
                onClick={verifyEmail}
                className="w-full py-2.5 px-4 rounded-xl bg-[#00923f] hover:bg-[#007a34] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulate Email Verification</span>
              </button>
            </div>
          )}

          {status === 'pending_approval' && (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#123984]/20 border border-[#123984]/50 text-blue-400 flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#ededf4]">
                  {user.role === 'owner'
                    ? 'Headquarters Verification Pending'
                    : 'Academy Owner Approval Pending'}
                </h3>
                <p className="text-xs text-[#9a9aa6] mt-1 leading-relaxed">
                  {user.role === 'owner'
                    ? 'Your academy registration has been submitted to Roberto Atalla & Mauro Chueng for team authorization.'
                    : `An approval request has been sent to your Head Coach at ${user.academyName} to verify active club membership.`}
                </p>
              </div>

              <button
                onClick={() => {
                  approveRegistration();
                  router.push(user.role === 'owner' ? '/academy' : '/courses');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00923f] to-[#00b54e] hover:from-[#007a34] hover:to-[#00923f] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {user.role === 'owner'
                    ? 'Simulate HQ Approval & Enter Academy Page'
                    : 'Simulate Coach Approval & Enter Student Page'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Clean Form: Log In or Sign Up */
        <div className="space-y-5">
          {/* Simple Tab Toggle: Log In or Sign Up */}
          <div className="grid grid-cols-2 p-1 bg-[#0d0d0e] border border-[#2b2b32] rounded-2xl">
            <button
              onClick={() => {
                setActiveTab('login');
                setLoginError('');
                setSignupError('');
              }}
              className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeTab === 'login'
                  ? 'bg-[#161619] text-[#00b54e] border border-[#00923f]/40 shadow-sm'
                  : 'text-[#9a9aa6] hover:text-[#ededf4]'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => {
                setActiveTab('signup');
                setLoginError('');
                setSignupError('');
              }}
              className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeTab === 'signup'
                  ? 'bg-[#161619] text-[#00b54e] border border-[#00923f]/40 shadow-sm'
                  : 'text-[#9a9aa6] hover:text-[#ededf4]'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* LOG IN TAB */}
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#ededf4] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="student@riograpplingclub.com"
                  className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#ededf4] placeholder-[#6b6b78] focus:outline-none focus:border-[#00923f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#ededf4] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#ededf4] placeholder-[#6b6b78] focus:outline-none focus:border-[#00923f]"
                />
              </div>

              {loginError && (
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400">
                  {loginError}
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" className="w-full">
                <span>Log In</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

              {/* Instant Demo Logins */}
              <div className="pt-3 border-t border-[#2b2b32]/60 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    loginAsStudent();
                    router.push('/courses');
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-[#212126] hover:bg-[#2b2b32] border border-[#2b2b32] text-xs font-medium text-[#ededf4] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#00b54e]" />
                    <span>Demo Log In: Student (Alex Silva)</span>
                  </span>
                  <span className="text-[10px] text-blue-400 font-bold">Student Page &rarr;</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    loginAsOwner();
                    router.push('/academy');
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-[#212126] hover:bg-[#2b2b32] border border-[#2b2b32] text-xs font-medium text-[#ededf4] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#e0b252]" />
                    <span>Demo Log In: Academy Owner (M. Flaga)</span>
                  </span>
                  <span className="text-[10px] text-[#e0b252] font-bold">Academy Page &rarr;</span>
                </button>
              </div>
            </form>
          ) : (
            /* SIGN UP TAB */
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              {/* First dropdown: Academy Owner or Student */}
              <div>
                <label className="block text-xs font-bold text-[#00b54e] mb-1 uppercase tracking-wider">
                  I am registering as:
                </label>
                <select
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value as UserRole)}
                  className="w-full bg-[#0d0d0e] border border-[#00923f]/50 rounded-xl px-3 py-2 text-xs sm:text-sm text-[#ededf4] font-semibold focus:outline-none focus:border-[#00923f]"
                >
                  <option value="student" className="bg-[#161619]">
                    Student (Club Member)
                  </option>
                  <option value="owner" className="bg-[#161619]">
                    Academy Owner (Head Coach)
                  </option>
                </select>
              </div>

              {/* Common Fields */}
              <div>
                <label className="block text-xs font-semibold text-[#ededf4] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-3 py-2 text-xs text-[#ededf4] placeholder-[#6b6b78] focus:outline-none focus:border-[#00923f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#ededf4] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-3 py-2 text-xs text-[#ededf4] placeholder-[#6b6b78] focus:outline-none focus:border-[#00923f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#ededf4] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-3 py-2 text-xs text-[#ededf4] placeholder-[#6b6b78] focus:outline-none focus:border-[#00923f]"
                />
              </div>

              {/* STUDENT SPECIFIC FIELDS */}
              {signupRole === 'student' ? (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#ededf4] mb-1">
                        Belt Rank
                      </label>
                      <select
                        value={beltLevel}
                        onChange={(e) => setBeltLevel(e.target.value as BeltLevel)}
                        className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-2.5 py-1.5 text-xs text-[#ededf4] focus:outline-none focus:border-[#00923f]"
                      >
                        <option value="white" className="bg-[#161619]">White Belt</option>
                        <option value="blue" className="bg-[#161619]">Blue Belt</option>
                        <option value="purple" className="bg-[#161619]">Purple Belt</option>
                        <option value="brown" className="bg-[#161619]">Brown Belt</option>
                        <option value="black" className="bg-[#161619]">Black Belt</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#ededf4] mb-1">
                        Stripes
                      </label>
                      <select
                        value={stripes}
                        onChange={(e) => setStripes(Number(e.target.value))}
                        className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-2.5 py-1.5 text-xs text-[#ededf4] focus:outline-none focus:border-[#00923f]"
                      >
                        <option value={0}>0 Stripes</option>
                        <option value={1}>1 Stripe</option>
                        <option value={2}>2 Stripes</option>
                        <option value={3}>3 Stripes</option>
                        <option value={4}>4 Stripes</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#ededf4] mb-1">
                      Select Your Academy
                    </label>
                    <select
                      value={academyId}
                      onChange={(e) => setAcademyId(e.target.value)}
                      className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-3 py-1.5 text-xs text-[#ededf4] focus:outline-none focus:border-[#00923f]"
                    >
                      {RGC_ACADEMIES.map((a) => (
                        <option key={a.id} value={a.id} className="bg-[#161619]">
                          {a.name} ({a.city})
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                /* ACADEMY OWNER SPECIFIC FIELDS */
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#ededf4] mb-1">
                      Black Belt Degree / Rank
                    </label>
                    <select
                      value={blackBeltDegree}
                      onChange={(e) => setBlackBeltDegree(e.target.value)}
                      className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-3 py-1.5 text-xs text-[#ededf4] focus:outline-none focus:border-[#00923f]"
                    >
                      <option value="Black Belt 1st Degree" className="bg-[#161619]">Black Belt 1st Degree</option>
                      <option value="Black Belt 2nd Degree" className="bg-[#161619]">Black Belt 2nd Degree</option>
                      <option value="Black Belt 3rd Degree" className="bg-[#161619]">Black Belt 3rd Degree</option>
                      <option value="Coral Belt 6th Degree" className="bg-[#161619]">Coral Belt 6th Degree</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#ededf4] mb-1">
                      Academy Name
                    </label>
                    <input
                      type="text"
                      value={academyName}
                      onChange={(e) => setAcademyName(e.target.value)}
                      placeholder="e.g. Rio Grappling Club London"
                      className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-3 py-1.5 text-xs text-[#ededf4] placeholder-[#6b6b78] focus:outline-none focus:border-[#00923f]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#ededf4] mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={academyCity}
                        onChange={(e) => setAcademyCity(e.target.value)}
                        placeholder="London"
                        className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-3 py-1.5 text-xs text-[#ededf4] placeholder-[#6b6b78] focus:outline-none focus:border-[#00923f]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#ededf4] mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={academyCountry}
                        onChange={(e) => setAcademyCountry(e.target.value)}
                        placeholder="United Kingdom"
                        className="w-full bg-[#0d0d0e] border border-[#2b2b32] rounded-xl px-3 py-1.5 text-xs text-[#ededf4] placeholder-[#6b6b78] focus:outline-none focus:border-[#00923f]"
                      />
                    </div>
                  </div>
                </>
              )}

              {signupError && (
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400">
                  {signupError}
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
                <span>{signupRole === 'student' ? 'Sign Up as Student' : 'Sign Up as Academy Owner'}</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
