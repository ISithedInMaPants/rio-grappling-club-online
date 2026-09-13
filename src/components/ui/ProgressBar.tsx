import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: 'green' | 'blue' | 'gold';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  size = 'md',
  showLabel = false,
  color = 'green',
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const fillColors = {
    green: 'bg-[#00923f]',
    blue: 'bg-[#123984]',
    gold: 'bg-[#e0b252]',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-[#9a9aa6] mb-1 font-mono">
          <span>Progress</span>
          <span>{Math.round(clamped)}%</span>
        </div>
      )}
      <div className={`w-full bg-[#212126] rounded-full overflow-hidden border border-[#2b2b32]/50 ${heightClasses[size]}`}>
        <div
          className={`h-full transition-all duration-300 rounded-full ${fillColors[color]}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
