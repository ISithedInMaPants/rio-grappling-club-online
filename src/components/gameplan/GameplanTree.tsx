'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GameplanNode } from '@/types';
import { GitBranch, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

interface GameplanTreeProps {
  nodes: GameplanNode[];
  initialActiveNodeId?: string;
  className?: string;
}

export const GameplanTree: React.FC<GameplanTreeProps> = ({
  nodes,
  initialActiveNodeId,
  className = '',
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    initialActiveNodeId || (nodes[0]?.id ?? '')
  );

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const connectedNodes = selectedNode
    ? nodes.filter((n) => selectedNode.connectedTo.includes(n.id))
    : [];

  const categoryColors: Record<string, string> = {
    Entry: 'bg-blue-950/60 text-blue-400 border-blue-600/40',
    Control: 'bg-zinc-800 text-zinc-300 border-zinc-600/40',
    Sweep: 'bg-emerald-950/60 text-[#00b54e] border-[#00923f]/50',
    Pass: 'bg-amber-950/60 text-amber-400 border-amber-600/40',
    Submission: 'bg-red-950/60 text-red-400 border-red-600/50',
    Counter: 'bg-purple-950/60 text-purple-400 border-purple-600/40',
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#161619] border border-[#2b2b32] rounded-2xl p-4 md:p-6 ${className}`}>
      {/* Visual Flow Tree / Node Selector (Left side) */}
      <div className="lg:col-span-7 flex flex-col space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#2b2b32]">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-[#00923f]" />
            <h3 className="font-bold text-sm text-[#ededf4]">
              Positional Gameplan Graph
            </h3>
          </div>
          <span className="text-xs text-[#9a9aa6]">
            Click node to view branches
          </span>
        </div>

        {/* Nodes Grid / Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {nodes.map((node) => {
            const isSelected = node.id === selectedNodeId;
            const isConnected = selectedNode?.connectedTo.includes(node.id);

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#00923f]/15 border-[#00923f] shadow-md shadow-[#00923f]/10 translate-x-1'
                    : isConnected
                    ? 'bg-[#212126] border-[#123984]/60 hover:border-[#123984]'
                    : 'bg-[#0d0d0e]/60 border-[#2b2b32] hover:border-[#454552]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      categoryColors[node.category] || 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {node.category}
                  </span>
                  <span className="text-[11px] font-mono text-[#6b6b78]">
                    {node.position}
                  </span>
                </div>
                <h4 className="font-semibold text-sm text-[#ededf4] flex items-center justify-between">
                  <span>{node.title}</span>
                  {isConnected && (
                    <ChevronRight className="w-4 h-4 text-[#00b54e]" />
                  )}
                </h4>
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Detail & Next Transitions (Right side) */}
      {selectedNode && (
        <div className="lg:col-span-5 bg-[#0d0d0e] border border-[#2b2b32] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${
                  categoryColors[selectedNode.category]
                }`}
              >
                {selectedNode.category}
              </span>
              <span className="text-xs text-[#9a9aa6]">
                from {selectedNode.position}
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#ededf4] mb-2">
              {selectedNode.title}
            </h3>
            <p className="text-xs text-[#9a9aa6] leading-relaxed mb-6">
              {selectedNode.description}
            </p>

            {/* Next Branching Options */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#6b6b78]">
                Branching Moves & Follow-ups ({connectedNodes.length})
              </h5>
              <div className="space-y-2">
                {connectedNodes.map((target) => (
                  <button
                    key={target.id}
                    onClick={() => setSelectedNodeId(target.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#161619] hover:bg-[#212126] border border-[#2b2b32] text-xs text-left transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-[#00923f] group-hover:translate-x-0.5 transition-transform" />
                      <span className="font-medium text-[#ededf4]">
                        {target.title}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-mono text-[#6b6b78]">
                      {target.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedNode.courseSlug && (
            <div className="mt-6 pt-4 border-t border-[#2b2b32]">
              <Link
                href={`/courses/${selectedNode.courseSlug}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#00923f] hover:bg-[#007a34] text-white text-xs font-semibold shadow-md transition-all"
              >
                <span>Study Instructional in Course</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
