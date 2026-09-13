import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLesson } from '@/lib/sanity/client';
import { MuxSkillsPlayer } from '@/components/player/MuxSkillsPlayer';
import { KeyPointsCard } from '@/components/cards/KeyPointsCard';
import { DrillCard } from '@/components/cards/DrillCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Flame,
  CheckCircle,
  Share2,
  Bookmark,
} from 'lucide-react';

interface LessonPlayerPageProps {
  params: Promise<{ slug: string; lessonId: string }>;
}

export default async function LessonPlayerPage({ params }: LessonPlayerPageProps) {
  const { slug, lessonId } = await params;
  const data = await getLesson(slug, lessonId);

  if (!data) {
    notFound();
  }

  const { course, lesson } = data;

  // Find next lesson
  let nextLesson = null;
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.slug === lesson.slug || l.id === lesson.id);
  if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
    nextLesson = allLessons[currentIndex + 1];
  }

  return (
    <div className="min-h-screen bg-[#0d0d0e] pb-24">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-[#2b2b32] bg-[#161619]/60 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#9a9aa6]">
          <div className="flex items-center gap-2">
            <Link
              href={`/courses/${course.slug}`}
              className="flex items-center gap-1 hover:text-[#ededf4] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Course Syllabus</span>
            </Link>
            <span className="text-[#454552]">/</span>
            <span className="text-[#ededf4] font-medium line-clamp-1">
              {lesson.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Badge beltLevel={course.beltLevel} size="sm" />
            <Badge giFormat={course.giFormat} size="sm" />
          </div>
        </div>
      </div>

      {/* Main Mat Player Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video & Content Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* The Submeta-Style Skills Video Player */}
            <MuxSkillsPlayer
              title={lesson.title}
              playbackId={lesson.muxPlaybackId}
              chapters={lesson.chapters}
            />

            {/* Lesson Title & Overview */}
            <div className="bg-[#161619] border border-[#2b2b32] rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2b2b32]">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#00b54e] mb-1">
                    Lesson {lesson.order} • {course.title}
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#ededf4] tracking-tight">
                    {lesson.title}
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm">
                    <Bookmark className="w-3.5 h-3.5 mr-1" /> Save
                  </Button>
                  {nextLesson && (
                    <Link href={`/courses/${course.slug}/${nextLesson.slug}`}>
                      <Button variant="primary" size="sm">
                        <span>Next Technique</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#9a9aa6] leading-relaxed">
                {lesson.description}
              </p>
            </div>

            {/* Key Mechanics & Actionable Cues */}
            {lesson.keyPoints && lesson.keyPoints.length > 0 && (
              <KeyPointsCard keyPoints={lesson.keyPoints} />
            )}

            {/* Partner Mat Drills Checklist */}
            {lesson.drills && lesson.drills.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#ededf4] flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#e0b252]" />
                    Partner Mat Drills & Reps
                  </h3>
                  <span className="text-xs text-[#9a9aa6]">
                    Click checkbox once completed on the mat
                  </span>
                </div>
                <div className="space-y-2.5">
                  {lesson.drills.map((drill) => (
                    <DrillCard key={drill.id} drill={drill} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Course Syllabus & Navigation (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Curriculum Playlist Sidebar */}
            <div className="bg-[#161619] border border-[#2b2b32] rounded-2xl overflow-hidden sticky top-20">
              <div className="p-4 bg-[#212126]/60 border-b border-[#2b2b32]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00b54e] block">
                  Course Playlist
                </span>
                <h3 className="text-sm font-bold text-[#ededf4] line-clamp-1 mt-0.5">
                  {course.title}
                </h3>
              </div>

              <div className="max-h-[calc(100vh-250px)] overflow-y-auto divide-y divide-[#2b2b32]/60">
                {course.modules.map((module) => (
                  <div key={module.id} className="p-2">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6b6b78]">
                      {module.title}
                    </div>
                    <div className="space-y-1 mt-1">
                      {module.lessons.map((l) => {
                        const isCurrent = l.slug === lesson.slug || l.id === lesson.id;
                        return (
                          <Link
                            key={l.id}
                            href={`/courses/${course.slug}/${l.slug}`}
                            className={`flex items-start gap-2.5 p-2.5 rounded-xl text-xs transition-colors ${
                              isCurrent
                                ? 'bg-[#00923f]/15 text-[#00b54e] font-semibold border border-[#00923f]/40'
                                : 'text-[#9a9aa6] hover:bg-[#212126] hover:text-[#ededf4]'
                            }`}
                          >
                            <span className="font-mono text-[10px] w-4 mt-0.5 text-zinc-500">
                              {l.order}.
                            </span>
                            <div className="flex-1">
                              <div className="line-clamp-1">{l.title}</div>
                              <div className="text-[10px] text-zinc-500 mt-0.5 flex items-center gap-2">
                                <span>{Math.floor(l.duration / 60)} min</span>
                                <span>•</span>
                                <span>{l.chapters.length} chapters</span>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Lesson Floating Banner */}
              {nextLesson && (
                <div className="p-3 bg-[#212126] border-t border-[#2b2b32]">
                  <Link
                    href={`/courses/${course.slug}/${nextLesson.slug}`}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#00923f] hover:bg-[#007a34] text-white text-xs font-semibold shadow-md transition-all"
                  >
                    <span>Up Next: {nextLesson.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
