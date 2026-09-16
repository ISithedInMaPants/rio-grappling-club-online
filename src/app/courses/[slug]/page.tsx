import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCourseBySlug, getCourses } from '@/lib/sanity/client';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CourseCard } from '@/components/cards/CourseCard';
import {
  Play,
  Clock,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Award,
  Flame,
  List,
} from 'lucide-react';

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const allCourses = await getCourses();
  const relatedCourses = allCourses.filter((c) => c.id !== course.id).slice(0, 2);

  const firstLesson = course.modules[0]?.lessons[0];
  const firstLessonHref = firstLesson
    ? `/courses/${course.slug}/${firstLesson.slug}`
    : `/courses/${course.slug}`;

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Course Header Banner */}
      <section className="relative border-b border-[#2b2b32] bg-gradient-to-b from-[#161619] to-[#0d0d0e] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Title & Meta */}
            <div className="lg:col-span-7 space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge level={course.level} size="md" />
                <Badge giFormat={course.giFormat} size="md" />
                <Badge variant="blue" size="md">
                  {course.positionCategory}
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#ededf4] tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-[#9a9aa6] leading-relaxed max-w-2xl">
                {course.subtitle}
              </p>

              {/* Instructor & Mat Stats */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#9a9aa6]">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#00923f] bg-[#0d0d0e]">
                    <Image
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="block font-bold text-[#ededf4]">
                      {course.instructor.name}
                    </span>
                    <span className="text-[10px] text-[#00b54e] font-semibold">
                      {course.instructor.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 border-l border-[#2b2b32] pl-4">
                  <Clock className="w-4 h-4 text-[#00923f]" />
                  <span>{formatDuration(course.totalDuration)} of mat instruction</span>
                </div>

                <div className="flex items-center gap-1.5 border-l border-[#2b2b32] pl-4">
                  <BookOpen className="w-4 h-4 text-[#3b82f6]" />
                  <span>{course.lessonCount} Structured Lessons</span>
                </div>
              </div>

              {/* Start Course CTA */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                {firstLesson ? (
                  <Link href={firstLessonHref}>
                    <Button variant="primary" size="lg">
                      <Play className="w-4 h-4 mr-2 fill-current" /> Start Instructional
                    </Button>
                  </Link>
                ) : (
                  <Button variant="primary" size="lg" disabled>
                    Coming Soon
                  </Button>
                )}
                <Link href="/gameplan">
                  <Button variant="secondary" size="lg">
                    Positional Gameplan
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Cover Card */}
            <div className="lg:col-span-5">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#2b2b32] shadow-2xl bg-black">
                <Image
                  src={course.coverImage}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {firstLesson && (
                  <Link
                    href={firstLessonHref}
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#00923f]/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 ml-1 fill-current" />
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Syllabus & Curriculum Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left / Center: Syllabus Modules */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#2b2b32]">
                <h2 className="text-xl font-bold text-[#ededf4] flex items-center gap-2">
                  <List className="w-5 h-5 text-[#00923f]" />
                  Course Syllabus & Technique Chapters
                </h2>
                <span className="text-xs text-[#9a9aa6]">
                  {course.modules.length} Modules • {course.lessonCount} Lessons
                </span>
              </div>

              {/* Module Accordions */}
              <div className="mt-6 space-y-6">
                {course.modules.length > 0 ? (
                  course.modules.map((module, mIdx) => (
                    <div
                      key={module.id || mIdx}
                      className="bg-[#161619] border border-[#2b2b32] rounded-2xl overflow-hidden"
                    >
                      {/* Module Title */}
                      <div className="p-4 md:p-5 bg-[#212126]/50 border-b border-[#2b2b32] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#00b54e]">
                            Part {mIdx + 1}
                          </span>
                          <h3 className="text-base font-bold text-[#ededf4]">
                            {module.title}
                          </h3>
                        </div>
                        <span className="text-xs text-[#9a9aa6]">
                          {module.lessons.length} lessons
                        </span>
                      </div>

                      {/* Lessons List */}
                      <div className="divide-y divide-[#2b2b32]">
                        {module.lessons.map((lesson, lIdx) => (
                          <Link
                            key={lesson.id}
                            href={`/courses/${course.slug}/${lesson.slug}`}
                            className="group p-4 flex items-center justify-between hover:bg-[#212126] transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-md bg-[#0d0d0e] border border-[#2b2b32] text-xs font-mono font-semibold text-[#9a9aa6] flex items-center justify-center group-hover:border-[#00923f] group-hover:text-[#00b54e] transition-colors">
                                {lIdx + 1}
                              </span>
                              <div>
                                <h4 className="text-sm font-semibold text-[#ededf4] group-hover:text-[#00b54e] transition-colors">
                                  {lesson.title}
                                </h4>
                                <div className="flex items-center gap-3 mt-1 text-[11px] text-[#9a9aa6]">
                                  <span>{Math.floor(lesson.duration / 60)} min</span>
                                  <span>•</span>
                                  <span>{lesson.chapters.length} chapters</span>
                                  {lesson.drills.length > 0 && (
                                    <>
                                      <span>•</span>
                                      <span className="text-[#e0b252] flex items-center gap-1">
                                        <Flame className="w-3 h-3" />
                                        {lesson.drills.length} drills
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#00923f] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                Watch
                              </span>
                              <ChevronRight className="w-4 h-4 text-[#9a9aa6] group-hover:text-[#00923f] group-hover:translate-x-0.5 transition-all" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 bg-[#161619] rounded-2xl border border-[#2b2b32] text-center text-xs text-[#9a9aa6]">
                    Curriculum modules are being uploaded for this instructional.
                  </div>
                )}
              </div>
            </div>

            {/* Course Summary & Methodology */}
            <div className="bg-[#161619] border border-[#2b2b32] rounded-2xl p-6 space-y-3">
              <h3 className="text-base font-bold text-[#ededf4]">
                About This Instructional
              </h3>
              <p className="text-xs sm:text-sm text-[#9a9aa6] leading-relaxed">
                {course.summary}
              </p>
            </div>
          </div>

          {/* Right Column: Instructor Profile & Related Instructionals */}
          <div className="lg:col-span-4 space-y-6">
            {/* Instructor Details Card */}
            <div className="bg-[#161619] border border-[#2b2b32] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#00923f] bg-[#0d0d0e]">
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#ededf4] flex items-center gap-1.5">
                    {course.instructor.name}
                    <Award className="w-4 h-4 text-[#e0b252]" />
                  </h4>
                  <p className="text-xs text-[#00b54e] font-semibold">
                    {course.instructor.title}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#6b6b78] block mb-1">
                  Lineage:
                </span>
                <div className="flex flex-wrap gap-1">
                  {course.instructor.lineage.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-[#212126] text-[#9a9aa6] px-2 py-0.5 rounded border border-[#2b2b32]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#9a9aa6] leading-relaxed">
                {course.instructor.bio}
              </p>
            </div>

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6b6b78]">
                  Related Instructionals
                </h4>
                <div className="space-y-3">
                  {relatedCourses.map((rel) => (
                    <CourseCard key={rel.id} course={rel} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
