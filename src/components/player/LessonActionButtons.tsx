'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Bookmark, Check, ChevronRight, Share2 } from 'lucide-react';

interface LessonActionButtonsProps {
  lessonId: string;
  lessonTitle: string;
  nextLessonHref?: string;
}

export const LessonActionButtons: React.FC<LessonActionButtonsProps> = ({
  lessonId,
  lessonTitle,
  nextLessonHref,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`rgc_saved_${lessonId}`);
      if (saved === 'true') {
        setIsSaved(true);
      }
    } catch {
      // Ignore
    }
  }, [lessonId]);

  const toggleSave = () => {
    const next = !isSaved;
    setIsSaved(next);
    try {
      localStorage.setItem(`rgc_saved_${lessonId}`, String(next));
    } catch {
      // Ignore
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute -top-12 right-0 bg-[#00923f] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-150 z-50">
          <Check className="w-3.5 h-3.5" />
          <span>{isSaved ? 'Saved to your Study List!' : 'Removed from Study List'}</span>
        </div>
      )}

      <Button
        onClick={toggleSave}
        variant={isSaved ? 'primary' : 'secondary'}
        size="sm"
        className="cursor-pointer"
        title={isSaved ? 'Remove from study list' : 'Bookmark technique'}
      >
        <Bookmark className={`w-3.5 h-3.5 mr-1 ${isSaved ? 'fill-current' : ''}`} />
        <span>{isSaved ? 'Saved' : 'Bookmark'}</span>
      </Button>

      {nextLessonHref && (
        <Link href={nextLessonHref}>
          <Button variant="primary" size="sm">
            <span>Next Technique</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      )}
    </div>
  );
};
