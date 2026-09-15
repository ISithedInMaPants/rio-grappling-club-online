'use client';

import React, { useState, useEffect } from 'react';
import { DrillItem } from '@/types';
import { CheckCircle2, Circle, Flame } from 'lucide-react';

interface DrillCardProps {
  drill: DrillItem;
  className?: string;
  onToggleComplete?: (id: string, completed: boolean) => void;
}

export const DrillCard: React.FC<DrillCardProps> = ({
  drill,
  className = '',
  onToggleComplete,
}) => {
  const [completed, setCompleted] = useState(drill.completed || false);

  // Read saved completion state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`rgc_drill_${drill.id}`);
      if (saved !== null) {
        setCompleted(saved === 'true');
      }
    } catch {
      // Ignore in SSR/incognito
    }
  }, [drill.id]);

  const handleToggle = () => {
    const next = !completed;
    setCompleted(next);
    try {
      localStorage.setItem(`rgc_drill_${drill.id}`, String(next));
    } catch {
      // Ignore
    }
    onToggleComplete?.(drill.id, next);
  };

  return (
    <div
      onClick={handleToggle}
      className={`group cursor-pointer p-4 rounded-xl border transition-all duration-200 select-none ${
        completed
          ? 'bg-[#00923f]/10 border-[#00923f]/50'
          : 'bg-[#161619] hover:bg-[#212126] border-[#2b2b32] hover:border-[#454552]'
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          aria-label={completed ? 'Mark drill incomplete' : 'Mark drill complete'}
          className="mt-0.5 text-zinc-400 focus:outline-none"
        >
          {completed ? (
            <CheckCircle2 className="w-5 h-5 text-[#00b54e] transition-transform group-hover:scale-110" />
          ) : (
            <Circle className="w-5 h-5 text-[#6b6b78] group-hover:text-[#9a9aa6] transition-colors" />
          )}
        </button>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4
              className={`font-semibold text-sm transition-colors ${
                completed ? 'text-[#00b54e] line-through' : 'text-[#ededf4]'
              }`}
            >
              {drill.title}
            </h4>
            <div className="flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-[#212126] border border-[#2b2b32] text-[#e0b252] font-mono flex-shrink-0">
              <Flame className="w-3 h-3" />
              <span>{drill.recommendedReps}</span>
            </div>
          </div>
          <p
            className={`text-xs mt-1.5 leading-relaxed transition-colors ${
              completed ? 'text-[#6b6b78]' : 'text-[#9a9aa6]'
            }`}
          >
            {drill.instructions}
          </p>
        </div>
      </div>
    </div>
  );
};
