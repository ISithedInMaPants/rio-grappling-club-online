import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Clock, BookOpen } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  userProgress?: number; // 0 to 100
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  userProgress,
  className = '',
}) => {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <Link
      href={`/courses/${course.slug}`}
      className={`group flex flex-col bg-[#161619] hover:bg-[#212126] border border-[#2b2b32] hover:border-[#00923f]/50 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00923f]/5 ${className}`}
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0d0d0e]">
        <Image
          src={course.coverImage}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161619] via-transparent to-transparent opacity-80" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge beltLevel={course.beltLevel} size="sm" />
          <Badge giFormat={course.giFormat} size="sm" />
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2.5 right-3 flex items-center gap-1 bg-[#0d0d0e]/85 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono text-[#ededf4] border border-white/10 z-10">
          <Clock className="w-3 h-3 text-[#00923f]" />
          <span>{formatDuration(course.totalDuration)}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-semibold tracking-wider uppercase text-[#00b54e] mb-1">
            {course.positionCategory}
          </div>
          <h3 className="font-bold text-base text-[#ededf4] group-hover:text-white line-clamp-1 transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-[#9a9aa6] line-clamp-2 mt-1 leading-relaxed">
            {course.subtitle}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#2b2b32] flex items-center justify-between">
          {/* Instructor info */}
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#2b2b32] bg-[#0d0d0e]">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs font-medium text-[#ededf4]">
              {course.instructor.name}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-[#9a9aa6]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{course.lessonCount} lessons</span>
          </div>
        </div>

        {/* Optional progress indicator */}
        {typeof userProgress === 'number' && (
          <div className="mt-3">
            <div className="w-full bg-[#212126] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#00923f] h-full transition-all duration-300"
                style={{ width: `${userProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
