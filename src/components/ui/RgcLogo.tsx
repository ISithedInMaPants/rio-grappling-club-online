import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RgcLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showOnlineBadge?: boolean;
  className?: string;
}

export const RgcLogo: React.FC<RgcLogoProps> = ({
  size = 'md',
  showOnlineBadge = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { height: 28, textRgc: 'text-base', badgeText: 'text-[9px] px-1.5 py-0.2' },
    md: { height: 36, textRgc: 'text-xl', badgeText: 'text-[10px] px-2 py-0.5' },
    lg: { height: 48, textRgc: 'text-2xl', badgeText: 'text-xs px-2.5 py-1' },
  };

  const { textRgc, badgeText } = sizeMap[size];

  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 select-none transition-opacity hover:opacity-90 ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {/* Crest mark */}
        <div className="w-9 h-9 rounded-lg bg-[#161619] border border-[#2b2b32] flex items-center justify-center p-1 shadow-inner group-hover:border-[#00923f]/50 transition-colors">
          <Image
            src="/images/rgc/site_icon.png"
            alt="Rio Grappling Club Crest"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black italic tracking-tighter text-[#00923f] ${textRgc}`}>
            RIO
          </span>
          <span className={`font-extrabold tracking-tight text-[#ededf4] ${textRgc}`}>
            GRAPPLING
          </span>
          <span className={`font-black tracking-tight text-[#3b82f6] ${textRgc}`}>
            CLUB
          </span>
          {showOnlineBadge && (
            <span
              className={`ml-1 bg-[#00923f]/15 border border-[#00923f]/50 text-[#00b54e] font-bold rounded uppercase tracking-wider ${badgeText}`}
            >
              ONLINE
            </span>
          )}
        </div>
        <span className="text-[10px] uppercase font-semibold tracking-widest text-[#9a9aa6] mt-0.5">
          Curriculum & Skills Platform
        </span>
      </div>
    </Link>
  );
};
