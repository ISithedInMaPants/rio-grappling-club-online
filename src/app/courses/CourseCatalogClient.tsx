'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Course, BeltLevel, GiFormat, PositionCategory } from '@/types';
import { CourseCard } from '@/components/cards/CourseCard';
import { CourseFilterBar } from '@/components/navigation/CourseFilterBar';
import { BookOpen } from 'lucide-react';

interface CourseCatalogClientProps {
  initialCourses: Course[];
}

export const CourseCatalogClient: React.FC<CourseCatalogClientProps> = ({
  initialCourses,
}) => {
  const searchParams = useSearchParams();
  const initialBelt = (searchParams.get('belt') as BeltLevel) || 'all';
  const initialFormat = (searchParams.get('format') as GiFormat) || 'all';

  const [selectedFormat, setSelectedFormat] = useState<GiFormat | 'all'>(initialFormat);
  const [selectedBelt, setSelectedBelt] = useState<BeltLevel | 'all'>(initialBelt);
  const [selectedCategory, setSelectedCategory] = useState<PositionCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCourses = useMemo(() => {
    return initialCourses.filter((course) => {
      // Format match
      if (selectedFormat !== 'all') {
        if (course.giFormat !== 'both' && course.giFormat !== selectedFormat) {
          return false;
        }
      }

      // Belt match
      if (selectedBelt !== 'all') {
        if (course.beltLevel !== 'all' && course.beltLevel !== selectedBelt) {
          return false;
        }
      }

      // Category match
      if (selectedCategory !== 'all') {
        if (course.positionCategory !== selectedCategory) {
          return false;
        }
      }

      // Search match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesSubtitle = course.subtitle.toLowerCase().includes(query);
        const matchesInstructor = course.instructor.name.toLowerCase().includes(query);
        const matchesTags = course.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesSubtitle && !matchesInstructor && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [initialCourses, selectedFormat, selectedBelt, selectedCategory, searchQuery]);

  const handleReset = () => {
    setSelectedFormat('all');
    setSelectedBelt('all');
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-[#00b54e] mb-1">
          Complete Skill Sharing Library
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#ededf4] tracking-tight">
          Rio Grappling Club Courses
        </h1>
        <p className="text-xs sm:text-sm text-[#9a9aa6] mt-2 max-w-xl">
          Browse structured courses, curriculum pathways, and competition blueprints. Filter by belt rank, gi/no-gi format, or positional focus.
        </p>
      </div>

      {/* Filter Engine */}
      <CourseFilterBar
        selectedFormat={selectedFormat}
        selectedBelt={selectedBelt}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onFormatChange={setSelectedFormat}
        onBeltChange={setSelectedBelt}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchQuery}
        onResetFilters={handleReset}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#9a9aa6] pt-2">
        <div className="flex items-center gap-1.5 font-medium">
          <BookOpen className="w-3.5 h-3.5 text-[#00923f]" />
          <span>
            Showing <strong className="text-[#ededf4]">{filteredCourses.length}</strong> instructionals
          </span>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#161619] rounded-2xl border border-[#2b2b32] p-8">
          <p className="text-sm font-semibold text-[#ededf4]">
            No courses found matching your criteria.
          </p>
          <p className="text-xs text-[#9a9aa6] mt-1">
            Try resetting your filters or adjusting your search term.
          </p>
          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 bg-[#212126] hover:bg-[#2b2b32] text-xs text-[#00b54e] font-semibold rounded-lg border border-[#2b2b32]"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
