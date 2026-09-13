import React from 'react';
import Image from 'next/image';
import { Instructor } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Award, BookOpen } from 'lucide-react';

interface InstructorCardProps {
  instructor: Instructor;
  className?: string;
}

export const InstructorCard: React.FC<InstructorCardProps> = ({
  instructor,
  className = '',
}) => {
  return (
    <div
      className={`bg-[#161619] border border-[#2b2b32] hover:border-[#123984]/60 rounded-xl p-5 flex flex-col justify-between transition-all hover:shadow-lg ${className}`}
    >
      <div>
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#00923f] flex-shrink-0 bg-[#0d0d0e]">
            <Image
              src={instructor.avatar}
              alt={instructor.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-[#ededf4] flex items-center gap-1.5">
              {instructor.name}
              {instructor.featured && (
                <Award className="w-4 h-4 text-[#e0b252]" />
              )}
            </h3>
            <p className="text-xs font-semibold text-[#00b54e] mt-0.5">
              {instructor.title}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {instructor.lineage.map((lineageItem, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-[#212126] text-[#9a9aa6] px-2 py-0.5 rounded border border-[#2b2b32]"
                >
                  {lineageItem}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-[#9a9aa6] mt-4 line-clamp-3 leading-relaxed">
          {instructor.bio}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-[#2b2b32] flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-[#9a9aa6]">
          <BookOpen className="w-3.5 h-3.5 text-[#00923f]" />
          <span>{instructor.courseCount} Courses on RGC Online</span>
        </div>
        <Badge variant="blue" size="sm">
          Rio Grappling Club
        </Badge>
      </div>
    </div>
  );
};
