import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCourses, getInstructors } from '@/lib/sanity/client';
import { CourseCard } from '@/components/cards/CourseCard';
import { InstructorCard } from '@/components/cards/InstructorCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Compass,
  Repeat,
  FlipHorizontal,
  GitBranch,
  ShieldCheck,
  Flame,
  ArrowRight,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export default async function HomePage() {
  const courses = await getCourses();
  const instructors = await getInstructors();
  const featuredCourses = courses.filter((c) => c.featured);

  const beltTracks = [
    { level: 'white' as const, label: 'White Belt', desc: 'Foundational Escapes & Guards' },
    { level: 'blue' as const, label: 'Blue Belt', desc: 'Passes, Sweeps & Half Guard' },
    { level: 'purple' as const, label: 'Purple Belt', desc: 'Transitions & Dynamic Sequences' },
    { level: 'brown' as const, label: 'Brown Belt', desc: 'Leg Entanglements & Finishes' },
    { level: 'black' as const, label: 'Black Belt', desc: 'Micro-leverage & High-Level Strategy' },
  ];

  const faqs = [
    {
      q: 'What is Rio Grappling Club Online?',
      a: 'Rio Grappling Club Online is the official digital skills and curriculum platform for Rio Grappling Club academies worldwide. Founded under the leadership of Roberto Atalla and Mauro Chueng, it provides structured BJJ technique instructionals, mat-side video drill tools, and progressive belt pathways.',
    },
    {
      q: 'Does Rio Grappling Club Online have content for all belt levels?',
      a: 'Yes. From day-one beginners learning foundational hip escapes, posture breakdown, and survival frames, through to advanced practitioners refining high-percentage pressure passing, deep half guard, and ADCC-style leg locks.',
    },
    {
      q: 'What makes the video player unique for mat drilling?',
      a: 'Our player is custom-engineered for grapplers on the mat. You can set any chapter or technique to infinite loop so it continuously plays while you drill with your partner, mirror the video horizontally for left-handed/southpaw execution, and adjust playback speed from 0.5x to 1.5x.',
    },
    {
      q: 'Can affiliated Rio Grappling Club schools use this for their syllabus?',
      a: 'Absolutely. Affiliated dojos across Europe, South Africa, and Latin America can use RGC Online to standardize class curricula, assign homework drills, and track belt graduation progression.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-[#2b2b32] bg-gradient-to-b from-[#161619]/40 via-[#0d0d0e] to-[#0d0d0e]">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00923f]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[250px] bg-[#123984]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161619] border border-[#00923f]/40 text-xs text-[#00b54e] font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e0b252]" />
            <span>Structured Brazilian Jiu-Jitsu Curriculum</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#ededf4] max-w-4xl leading-[1.1]">
            Grappling, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00923f] via-[#00b54e] to-[#3b82f6]">Structured.</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-[#9a9aa6] max-w-2xl leading-relaxed">
            The official skill-sharing portal for <span className="text-[#ededf4] font-semibold">Rio Grappling Club</span>. High-definition technique instructionals, mat-side continuous looping, and positional gameplans taught by World Champion <span className="text-[#ededf4] font-semibold">Roberto Atalla</span>.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link href="/courses">
              <Button variant="primary" size="lg">
                <Compass className="w-4 h-4 mr-2" /> Explore Courses
              </Button>
            </Link>
            <Link href="/gameplan">
              <Button variant="secondary" size="lg">
                <GitBranch className="w-4 h-4 mr-2 text-[#00923f]" /> Interactive Gameplans
              </Button>
            </Link>
          </div>

          {/* Belt Track Quick Selector */}
          <div className="mt-14 w-full max-w-4xl pt-8 border-t border-[#2b2b32]/60">
            <div className="text-xs uppercase font-bold tracking-widest text-[#6b6b78] mb-4">
              Explore by Belt Progression
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {beltTracks.map((belt) => (
                <Link
                  key={belt.level}
                  href={`/courses?belt=${belt.level}`}
                  className="group bg-[#161619] hover:bg-[#212126] border border-[#2b2b32] hover:border-[#00923f]/50 p-3 rounded-xl flex flex-col items-center text-center transition-all hover:-translate-y-0.5"
                >
                  <Badge beltLevel={belt.level} size="sm" />
                  <span className="text-[11px] text-[#9a9aa6] group-hover:text-[#ededf4] mt-2 line-clamp-1 transition-colors">
                    {belt.desc}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#00b54e] mb-1">
              Battle-Tested Curricula
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#ededf4] tracking-tight">
              Featured Instructionals
            </h2>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00b54e] hover:text-[#00923f] transition-colors"
          >
            <span>View all courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Mat-Side Video Player Advantages */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#161619]/60 border-y border-[#2b2b32]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00b54e]">
              Engineered for the Dojo
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#ededf4] tracking-tight mt-1">
              Built Specifically for Mat-Side Drilling
            </h2>
            <p className="text-xs sm:text-sm text-[#9a9aa6] mt-2">
              Unlike generic video sites, Rio Grappling Club Online is designed to be placed at the edge of the mat while you train.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0d0d0e] border border-[#2b2b32] p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#00923f]/15 border border-[#00923f]/40 flex items-center justify-center text-[#00b54e] mb-4">
                  <Repeat className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#ededf4] mb-2">
                  Infinite Chapter Looping
                </h3>
                <p className="text-xs text-[#9a9aa6] leading-relaxed">
                  Select a critical technique micro-movement and set it to loop continuously. Drill repetitions with your partner without ever having to touch your phone or laptop screen with sweaty hands.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#2b2b32] text-[11px] font-mono text-[#00b54e]">
                ✓ Active Hands-Free Drilling
              </div>
            </div>

            <div className="bg-[#0d0d0e] border border-[#2b2b32] p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#123984]/20 border border-[#123984]/50 flex items-center justify-center text-blue-400 mb-4">
                  <FlipHorizontal className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#ededf4] mb-2">
                  Lefty & Southpaw Mirror Mode
                </h3>
                <p className="text-xs text-[#9a9aa6] leading-relaxed">
                  Instantly invert the camera perspective horizontally. Left-handed grapplers can visualize grips, angles, and hip directions without performing mental acrobatics.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#2b2b32] text-[11px] font-mono text-blue-400">
                ✓ True Southpaw Perspective
              </div>
            </div>

            <div className="bg-[#0d0d0e] border border-[#2b2b32] p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#e0b252]/15 border border-[#e0b252]/40 flex items-center justify-center text-[#e0b252] mb-4">
                  <GitBranch className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#ededf4] mb-2">
                  Interactive Gameplans
                </h3>
                <p className="text-xs text-[#9a9aa6] leading-relaxed">
                  Understand how positions interconnect. Navigate dynamic flowcharts showing sweeps, passes, counters, and finishes so you always know your next tactical move.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#2b2b32] text-[11px] font-mono text-[#e0b252]">
                ✓ Connected Technique Trees
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00b54e]">
            World-Renowned Coaches
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#ededf4] tracking-tight mt-1">
            Rio Grappling Club Leadership
          </h2>
          <p className="text-xs sm:text-sm text-[#9a9aa6] mt-2">
            Learn directly from veteran black belt champions with Carlson Gracie and Brazilian Top Team pedigree.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {instructors.map((inst) => (
            <InstructorCard key={inst.id} instructor={inst} />
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#161619]/40 border-t border-[#2b2b32]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00b54e]">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#ededf4] tracking-tight mt-1">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#0d0d0e] border border-[#2b2b32] rounded-xl p-5"
              >
                <h3 className="font-bold text-sm sm:text-base text-[#ededf4] flex items-center gap-2 mb-2">
                  <HelpCircle className="w-4 h-4 text-[#00923f] flex-shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-[#9a9aa6] leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
