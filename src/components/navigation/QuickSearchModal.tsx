'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { mockCourses } from '@/data/mockData';
import { Search, X, BookOpen, Play, ChevronRight, CornerDownLeft } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  // Search through all courses and lessons
  const courseResults = cleanQuery
    ? mockCourses.filter(
        (c) =>
          c.title.toLowerCase().includes(cleanQuery) ||
          c.subtitle.toLowerCase().includes(cleanQuery) ||
          c.level.toLowerCase().includes(cleanQuery) ||
          (cleanQuery === 'gi' && (c.giFormat === 'gi' || c.giFormat === 'both')) ||
          ((cleanQuery === 'nogi' || cleanQuery === 'no-gi' || cleanQuery === 'no gi') && (c.giFormat === 'nogi' || c.giFormat === 'both')) ||
          c.tags.some((t) => t.toLowerCase().includes(cleanQuery))
      )
    : mockCourses.slice(0, 3);

  const lessonResults = cleanQuery
    ? mockCourses
        .flatMap((c) =>
          c.modules.flatMap((m) =>
            m.lessons.map((l) => ({
              ...l,
              courseTitle: c.title,
              courseSlug: c.slug,
              level: c.level,
              beltLevel: c.beltLevel,
              giFormat: c.giFormat,
            }))
          )
        )
        .filter(
          (l) =>
            l.title.toLowerCase().includes(cleanQuery) ||
            l.description.toLowerCase().includes(cleanQuery) ||
            l.keyPoints.some((kp) => kp.toLowerCase().includes(cleanQuery))
        )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-[#161619] border border-[#2b2b32] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#2b2b32] gap-3">
          <Search className="w-5 h-5 text-[#00923f] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 28 techniques, positions, drills..."
            className="w-full bg-transparent text-sm text-[#ededf4] placeholder-[#6b6b78] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#9a9aa6] hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[11px] font-mono bg-[#212126] text-[#9a9aa6] hover:text-white px-2 py-1 rounded border border-[#2b2b32]"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-4 divide-y divide-[#2b2b32]/50">
          {/* Techniques / Lessons */}
          {lessonResults.length > 0 && (
            <div className="space-y-1.5 pt-2 first:pt-0">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#00b54e] px-2">
                Technique Lessons ({lessonResults.length})
              </div>
              {lessonResults.slice(0, 6).map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/courses/${lesson.courseSlug}/${lesson.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#212126] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0d0d0e] border border-[#2b2b32] flex items-center justify-center text-[#00923f] group-hover:border-[#00923f]/60 transition-colors">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#ededf4] group-hover:text-[#00b54e] transition-colors">
                        {lesson.title}
                      </div>
                      <div className="text-[10px] text-[#9a9aa6] flex items-center gap-2 mt-0.5">
                        <span className="line-clamp-1">{lesson.courseTitle}</span>
                        <span>•</span>
                        <span>{Math.floor(lesson.duration / 60)} min</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#6b6b78] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          )}

          {/* Courses */}
          {courseResults.length > 0 && (
            <div className="space-y-1.5 pt-3 first:pt-0">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#6b6b78] px-2">
                {cleanQuery ? `Courses (${courseResults.length})` : 'Popular Curricula'}
              </div>
              {courseResults.slice(0, 4).map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#212126] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0d0d0e] border border-[#2b2b32] flex items-center justify-center text-blue-400 group-hover:border-blue-500/60 transition-colors">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#ededf4] group-hover:text-white transition-colors line-clamp-1">
                        {course.title}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge level={course.level} size="sm" />
                        <Badge giFormat={course.giFormat} size="sm" />
                        <span className="text-[10px] text-[#9a9aa6]">
                          {course.lessonCount} lessons
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#6b6b78] group-hover:text-white transition-colors" />
                </Link>
              ))}
            </div>
          )}

          {cleanQuery && lessonResults.length === 0 && courseResults.length === 0 && (
            <div className="py-8 text-center text-xs text-[#9a9aa6]">
              No techniques or courses found matching &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-[#0d0d0e] border-t border-[#2b2b32] flex items-center justify-between text-[11px] text-[#6b6b78]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#161619] rounded border border-[#2b2b32] font-mono">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#161619] rounded border border-[#2b2b32] font-mono">↵</kbd> Select
            </span>
          </div>
          <span>Rio Grappling Club Online Search</span>
        </div>
      </div>
    </div>
  );
};
