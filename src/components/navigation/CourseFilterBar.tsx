'use client';

import React from 'react';
import { BeltLevel, GiFormat, PositionCategory } from '@/types';
import { Search, X, Filter } from 'lucide-react';

interface CourseFilterBarProps {
  selectedFormat: GiFormat | 'all';
  selectedBelt: BeltLevel | 'all';
  selectedCategory: PositionCategory | 'all';
  searchQuery: string;
  onFormatChange: (format: GiFormat | 'all') => void;
  onBeltChange: (belt: BeltLevel | 'all') => void;
  onCategoryChange: (category: PositionCategory | 'all') => void;
  onSearchChange: (query: string) => void;
  onResetFilters: () => void;
  className?: string;
}

export const CourseFilterBar: React.FC<CourseFilterBarProps> = ({
  selectedFormat,
  selectedBelt,
  selectedCategory,
  searchQuery,
  onFormatChange,
  onBeltChange,
  onCategoryChange,
  onSearchChange,
  onResetFilters,
  className = '',
}) => {
  const formats: { id: GiFormat | 'all'; label: string }[] = [
    { id: 'all', label: 'All Formats' },
    { id: 'gi', label: 'Gi' },
    { id: 'nogi', label: 'No-Gi' },
  ];

  const belts: { id: BeltLevel | 'all'; label: string; colorDot?: string }[] = [
    { id: 'all', label: 'All Belts' },
    { id: 'white', label: 'White', colorDot: 'bg-zinc-200' },
    { id: 'blue', label: 'Blue', colorDot: 'bg-blue-500' },
    { id: 'purple', label: 'Purple', colorDot: 'bg-purple-500' },
    { id: 'brown', label: 'Brown', colorDot: 'bg-amber-700' },
    { id: 'black', label: 'Black', colorDot: 'bg-zinc-950 border border-red-600' },
  ];

  const categories: (PositionCategory | 'all')[] = [
    'all',
    'Guard Passing',
    'Closed Guard',
    'Open Guard',
    'Half Guard',
    'Back Attacks',
    'Submissions',
    'Escapes & Pin Defense',
    'Takedowns & Wrestling',
  ];

  const hasActiveFilters =
    selectedFormat !== 'all' ||
    selectedBelt !== 'all' ||
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '';

  return (
    <div className={`flex flex-col gap-4 bg-[#161619] border border-[#2b2b32] rounded-2xl p-4 md:p-5 ${className}`}>
      {/* Top row: Search input & Format toggles */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9aa6]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search techniques, positions, instructors..."
            className="w-full bg-[#212126] border border-[#2b2b32] focus:border-[#00923f] rounded-xl pl-10 pr-9 py-2 text-xs md:text-sm text-[#ededf4] placeholder-[#6b6b78] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a9aa6] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Format toggle tabs */}
        <div className="flex items-center bg-[#212126] p-1 rounded-xl border border-[#2b2b32] w-full md:w-auto">
          {formats.map((fmt) => {
            const isActive = selectedFormat === fmt.id;
            return (
              <button
                key={fmt.id}
                onClick={() => onFormatChange(fmt.id)}
                className={`flex-1 md:flex-initial px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#00923f] text-white shadow-sm'
                    : 'text-[#9a9aa6] hover:text-[#ededf4]'
                }`}
              >
                {fmt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Second row: Belt filter pills */}
      <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#2b2b32]">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b6b78] mr-1">
          Belt:
        </span>
        {belts.map((belt) => {
          const isActive = selectedBelt === belt.id;
          return (
            <button
              key={belt.id}
              onClick={() => onBeltChange(belt.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#2b2b32] text-white border border-[#00923f]/80 shadow-sm'
                  : 'bg-[#212126] text-[#9a9aa6] hover:bg-[#2b2b32] hover:text-[#ededf4] border border-transparent'
              }`}
            >
              {belt.colorDot && (
                <span className={`w-2 h-2 rounded-full ${belt.colorDot}`} />
              )}
              <span>{belt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Third row: Position Category badges */}
      <div className="flex flex-wrap items-center gap-1.5 pt-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b6b78] mr-1">
          Category:
        </span>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                isActive
                  ? 'bg-[#00923f]/20 text-[#00b54e] border border-[#00923f]/50 font-semibold'
                  : 'bg-[#212126] text-[#9a9aa6] hover:text-[#ededf4] border border-[#2b2b32]'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          );
        })}

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="ml-auto flex items-center gap-1 text-xs text-[#e0b252] hover:underline px-2 py-1"
          >
            <X className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
