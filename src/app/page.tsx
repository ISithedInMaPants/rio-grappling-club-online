import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortalAuthCard } from '@/components/auth/PortalAuthCard';
import { RGC_ACADEMIES } from '@/data/academies';
import {
  ShieldCheck,
  Building2,
  CheckCircle2,
  Lock,
  Compass,
  Award,
  Users,
  ChevronDown,
} from 'lucide-react';

export default function HomePage() {
  const principles = [
    { title: 'Cooperation', desc: 'Active vertical & horizontal integration across academies.' },
    { title: 'Respect', desc: 'Honoring partners, lineage, and the martial tradition.' },
    { title: 'Loyalty', desc: 'Unwavering commitment to teammates and club colors.' },
    { title: 'Humility', desc: 'Always a student on the mat, regardless of belt rank.' },
    { title: 'Honesty', desc: 'Authentic martial arts growth through transparent training.' },
    { title: 'Bravery', desc: 'Embracing pressure and stepping onto the mats with courage.' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Portal Gateway Section */}
      <section className="relative overflow-hidden py-12 md:py-20 border-b border-[#2b2b32] bg-gradient-to-b from-[#161619]/60 via-[#0d0d0e] to-[#0d0d0e]">
        {/* Subtle Ambient Brand Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00923f]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-[#123984]/15 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Official Portal Header Badge */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161619] border border-[#00923f]/40 text-xs text-[#00b54e] font-semibold mb-4 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#00b54e]" />
              <span>Official Member & Affiliate Training Portal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00b54e]" />
              <span className="text-[#e0b252]">Free Access for Active Students</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#ededf4]">
              Rio Grappling Club <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00923f] via-[#00b54e] to-[#3b82f6]">Online</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-[#9a9aa6] max-w-2xl">
              The internal digital curriculum, technique library, and mat-side drilling portal for verified students of Rio Grappling Club academies worldwide.
            </p>
          </div>

          {/* Dual-Column Gateway: Heritage & Rules (Left) | Interactive Auth Card (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Club Identity & Student Access Rules */}
            <div className="lg:col-span-6 space-y-6">
              {/* Emblem Card */}
              <div className="bg-[#161619]/90 border border-[#2b2b32] rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                <div className="flex items-center gap-4 pb-6 border-b border-[#2b2b32]">
                  <div className="relative w-16 h-16 rounded-2xl bg-[#0d0d0e] border border-[#2b2b32] p-2 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/images/rgc/header_logo.png"
                      alt="Rio Grappling Club Crest"
                      width={52}
                      height={52}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#ededf4]">
                      Rio Grappling Club
                    </h2>
                    <p className="text-xs text-[#9a9aa6]">
                      Founded by <span className="text-[#ededf4] font-semibold">Roberto Atalla</span> & <span className="text-[#ededf4] font-semibold">Mauro Chueng</span>
                    </p>
                    <p className="text-[11px] text-[#00b54e] font-mono mt-0.5">
                      Carlson Gracie Lineage • Established 2003
                    </p>
                  </div>
                </div>

                {/* Student Access Policy */}
                <div className="py-5 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#e0b252] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Portal Access Requirements</span>
                  </div>

                  <p className="text-xs text-[#9a9aa6] leading-relaxed">
                    This digital platform is rolled out <strong className="text-[#ededf4]">free of charge</strong> exclusively to registered club affiliates and active students. No subscriptions, paywalls, or commercial fees.
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-start gap-2.5 text-xs text-[#ededf4]">
                      <div className="w-5 h-5 rounded-full bg-[#00923f]/20 border border-[#00923f]/40 text-[#00b54e] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <p>
                        <strong className="text-[#00b54e]">Select Your Academy:</strong> Choose your registered dojo during student registration.
                      </p>
                    </div>

                    <div className="flex items-start gap-2.5 text-xs text-[#ededf4]">
                      <div className="w-5 h-5 rounded-full bg-[#00923f]/20 border border-[#00923f]/40 text-[#00b54e] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <p>
                        <strong className="text-[#00b54e]">Verify Email:</strong> Confirm your student email address via the one-time activation link.
                      </p>
                    </div>

                    <div className="flex items-start gap-2.5 text-xs text-[#ededf4]">
                      <div className="w-5 h-5 rounded-full bg-[#00923f]/20 border border-[#00923f]/40 text-[#00b54e] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <p>
                        <strong className="text-[#00b54e]">Academy Owner Approval:</strong> Your Academy Owner / Head Coach receives an authorization dispatch to confirm active club standing before your access is unlocked.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team Principles */}
                <div className="pt-5 border-t border-[#2b2b32]">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#6b6b78] mb-3">
                    Rio Grappling Club Core Values
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {principles.map((p) => (
                      <div
                        key={p.title}
                        className="bg-[#212126] border border-[#2b2b32]/60 rounded-xl p-2.5 text-left"
                      >
                        <div className="text-xs font-bold text-[#ededf4]">{p.title}</div>
                        <div className="text-[10px] text-[#9a9aa6] mt-0.5 line-clamp-2">
                          {p.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Jump link to academies */}
                <div className="pt-4 mt-4 border-t border-[#2b2b32]/60 flex items-center justify-between">
                  <a
                    href="#academies"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00b54e] hover:text-[#007a34] transition-colors"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>View Registered Academies List ({RGC_ACADEMIES.length})</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </a>
                  <Link
                    href="/instructors"
                    className="inline-flex items-center gap-1 text-xs text-[#9a9aa6] hover:text-[#ededf4]"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Leadership</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Interactive Portal Authentication & Registration Card */}
            <div className="lg:col-span-6 w-full flex justify-center">
              <PortalAuthCard />
            </div>
          </div>
        </div>
      </section>

      {/* Registered Affiliate Academies Directory */}
      <section id="academies" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161619] border border-[#2b2b32] text-xs font-semibold text-[#00b54e] mb-2">
            <Building2 className="w-3.5 h-3.5 text-[#00b54e]" />
            <span>Affiliate Network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#ededf4] tracking-tight">
            Registered Rio Grappling Club Academies
          </h2>
          <p className="text-xs sm:text-sm text-[#9a9aa6] mt-2">
            Every listed academy is an authorized branch under the guidance of a team Black Belt. Active practitioners belonging to these schools are eligible for complimentary portal registration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {RGC_ACADEMIES.map((academy) => (
            <div
              key={academy.id}
              className="bg-[#161619] border border-[#2b2b32] hover:border-[#00923f]/40 rounded-2xl p-5 flex flex-col justify-between transition-all hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" role="img" aria-label={academy.country}>
                      {academy.flag}
                    </span>
                    <div>
                      <h3 className="font-bold text-sm text-[#ededf4] leading-snug">
                        {academy.name}
                      </h3>
                      <p className="text-[11px] text-[#9a9aa6]">
                        {academy.city}, {academy.country}
                      </p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#00b54e] bg-[#00923f]/15 border border-[#00923f]/30 px-2 py-0.5 rounded flex-shrink-0">
                    Active Dojo
                  </span>
                </div>

                {academy.description && (
                  <p className="text-xs text-[#9a9aa6] leading-relaxed mb-4">
                    {academy.description}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-[#2b2b32] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] text-[#6b6b78] uppercase font-bold">
                    Head Coach
                  </span>
                  <span className="font-semibold text-[#ededf4]">
                    {academy.headCoach}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#9a9aa6]">
                  <span className="text-[10px] text-[#6b6b78] uppercase font-bold">
                    Rank
                  </span>
                  <span className="font-mono text-[#00b54e]">
                    {academy.headCoachRank}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
