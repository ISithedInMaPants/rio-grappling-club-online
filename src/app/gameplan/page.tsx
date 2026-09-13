import React from 'react';
import { getGameplanNodes } from '@/lib/sanity/client';
import { GameplanTree } from '@/components/gameplan/GameplanTree';
import { GitBranch, Sparkles } from 'lucide-react';

export default function GameplanPage() {
  const nodes = getGameplanNodes();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161619] border border-[#00923f]/40 text-xs text-[#00b54e] font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#e0b252]" />
          <span>Tactical Flowchart & Transition Mapping</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#ededf4] tracking-tight">
          Positional Gameplan
        </h1>
        <p className="text-xs sm:text-sm text-[#9a9aa6] mt-2 max-w-2xl leading-relaxed">
          Brazilian Jiu-Jitsu is a high-speed game of human chess. Use the Rio Grappling Club Gameplan tree to visualize every guard entry, sweep trajectory, defensive counter, and submission finish before stepping onto the mats.
        </p>
      </div>

      {/* The Interactive Gameplan Component */}
      <GameplanTree nodes={nodes} />
    </div>
  );
}
