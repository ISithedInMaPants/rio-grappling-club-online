import React from 'react';
import Image from 'next/image';
import { PortalAuthCard } from '@/components/auth/PortalAuthCard';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-[#0d0d0e]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#00923f]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-[#123984]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center space-y-6">
        {/* Big Official Circular Crest Logo */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#161619] border border-[#2b2b32] p-3 flex items-center justify-center shadow-2xl">
          <Image
            src="/images/rgc/header_logo.png"
            alt="Rio Grappling Club Logo"
            width={76}
            height={76}
            className="object-contain"
            priority
          />
        </div>

        {/* Big Official Logo Title: 3 official colors + Online gradient */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight flex flex-wrap items-center justify-center gap-x-2.5">
            <span className="text-[#00923f]">Rio</span>
            <span className="text-[#ffffff]">Grappling</span>
            <span className="text-[#3b82f6]">Club</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00923f] via-[#00b54e] to-[#3b82f6]">
              Online
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#9a9aa6] font-medium">
            Internal Training & Academy Management Portal
          </p>
        </div>

        {/* Central Authentication & Simplistic Onboarding Card */}
        <PortalAuthCard />
      </div>
    </main>
  );
}
