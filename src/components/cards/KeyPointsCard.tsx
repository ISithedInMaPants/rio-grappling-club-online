import React from 'react';
import { Target } from 'lucide-react';

interface KeyPointsCardProps {
  keyPoints: string[];
  className?: string;
}

export const KeyPointsCard: React.FC<KeyPointsCardProps> = ({
  keyPoints,
  className = '',
}) => {
  return (
    <div className={`bg-[#161619] border border-[#2b2b32] rounded-xl p-5 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-4 h-4 text-[#00923f]" />
        <h3 className="font-bold text-sm text-[#ededf4] tracking-wide uppercase">
          Key Mechanics & Mat Cues
        </h3>
      </div>
      <ul className="space-y-2.5">
        {keyPoints.map((point, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs text-[#ededf4] leading-relaxed">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#212126] border border-[#2b2b32] text-[#00b54e] font-mono font-semibold flex items-center justify-center text-[10px] mt-0.5">
              {idx + 1}
            </span>
            <span className="flex-1 text-[#ededf4]">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
