import React from 'react';
import { BeltLevel, GiFormat } from '@/types';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'default' | 'outline' | 'green' | 'blue' | 'gold' | 'belt' | 'format';
  beltLevel?: BeltLevel;
  giFormat?: GiFormat;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  beltLevel,
  giFormat,
  size = 'sm',
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs md:text-sm px-2.5 py-1';

  if (variant === 'belt' || beltLevel) {
    const level = beltLevel || 'all';
    const beltStyles: Record<BeltLevel, string> = {
      white: 'bg-zinc-800 text-zinc-100 border border-zinc-500/40',
      blue: 'bg-blue-950/80 text-blue-300 border border-blue-600/50',
      purple: 'bg-purple-950/80 text-purple-300 border border-purple-600/50',
      brown: 'bg-amber-950/80 text-amber-300 border border-amber-700/50',
      black: 'bg-zinc-950 text-white border-l-4 border-l-red-600 border-zinc-800',
      all: 'bg-zinc-900 text-zinc-300 border border-zinc-700',
    };

    const labelMap: Record<BeltLevel, string> = {
      white: 'White Belt',
      blue: 'Blue Belt',
      purple: 'Purple Belt',
      brown: 'Brown Belt',
      black: 'Black Belt',
      all: 'All Levels',
    };

    return (
      <span
        className={`inline-flex items-center font-medium rounded tracking-wide uppercase ${sizeClasses} ${beltStyles[level]} ${className}`}
      >
        {children || labelMap[level]}
      </span>
    );
  }

  if (variant === 'format' || giFormat) {
    const fmt = giFormat || 'both';
    const formatStyles: Record<GiFormat, string> = {
      gi: 'bg-emerald-950/50 text-[#00b54e] border border-[#00923f]/40',
      nogi: 'bg-blue-950/50 text-blue-300 border border-[#123984]/50',
      both: 'bg-zinc-800/80 text-zinc-300 border border-zinc-700',
    };
    const formatLabels: Record<GiFormat, string> = {
      gi: 'GI',
      nogi: 'NO-GI',
      both: 'GI & NO-GI',
    };

    return (
      <span
        className={`inline-flex items-center font-semibold rounded tracking-wider ${sizeClasses} ${formatStyles[fmt]} ${className}`}
      >
        {children || formatLabels[fmt]}
      </span>
    );
  }

  const baseStyles: Record<string, string> = {
    default: 'bg-[#161619] text-[#ededf4] border border-[#2b2b32]',
    outline: 'bg-transparent text-[#9a9aa6] border border-[#2b2b32]',
    green: 'bg-[#00923f]/15 text-[#00b54e] border border-[#00923f]/40',
    blue: 'bg-[#123984]/20 text-[#60a5fa] border border-[#123984]/60',
    gold: 'bg-[#e0b252]/15 text-[#e0b252] border border-[#e0b252]/40',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded ${sizeClasses} ${baseStyles[variant] || baseStyles.default} ${className}`}
    >
      {children}
    </span>
  );
};
