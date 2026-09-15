'use client';

import React, { useState, useRef, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { VideoChapter } from '@/types';
import {
  Play,
  Pause,
  RotateCcw,
  Repeat,
  FlipHorizontal,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  FastForward,
  Rewind,
  List,
  CheckCircle2,
} from 'lucide-react';

interface MuxSkillsPlayerProps {
  playbackId?: string;
  streamUrl?: string;
  title: string;
  chapters?: VideoChapter[];
  onChapterChange?: (chapter: VideoChapter) => void;
  onLessonComplete?: () => void;
  className?: string;
}

export const MuxSkillsPlayer: React.FC<MuxSkillsPlayerProps> = ({
  playbackId = 'DS00Spx1CV902DyL02gy0102L02E02r2bW78jU02K5qA02pE3g', // High quality demo stream
  streamUrl,
  title,
  chapters = [],
  onChapterChange,
  onLessonComplete,
  className = '',
}) => {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isLoopingChapter, setIsLoopingChapter] = useState<boolean>(false);
  const [isMirrored, setIsMirrored] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [showChaptersDrawer, setShowChaptersDrawer] = useState<boolean>(false);

  // Speed options
  const speeds = [0.5, 0.75, 1, 1.25, 1.5];

  // Sync active chapter based on currentTime
  useEffect(() => {
    if (!chapters || chapters.length === 0) return;

    for (let i = chapters.length - 1; i >= 0; i--) {
      if (currentTime >= chapters[i].timestamp) {
        if (activeChapterIndex !== i) {
          setActiveChapterIndex(i);
          onChapterChange?.(chapters[i]);
        }
        break;
      }
    }

    // Check Chapter Looping Logic
    if (isLoopingChapter && chapters[activeChapterIndex]) {
      const activeChap = chapters[activeChapterIndex];
      const chapterEnd = activeChap.timestamp + activeChap.duration;

      if (currentTime >= chapterEnd - 0.2) {
        seekTo(activeChap.timestamp);
      }
    }
  }, [currentTime, chapters, isLoopingChapter, activeChapterIndex, onChapterChange]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pause();
    } else {
      playerRef.current.play();
    }
  };

  const seekTo = (seconds: number) => {
    if (!playerRef.current) return;
    playerRef.current.currentTime = Math.max(0, Math.min(seconds, duration || 9999));
  };

  const skipTime = (offset: number) => {
    seekTo(currentTime + offset);
  };

  const toggleLoopChapter = () => {
    setIsLoopingChapter(!isLoopingChapter);
  };

  const toggleMirror = () => {
    setIsMirrored(!isMirrored);
  };

  const cyclePlaybackRate = () => {
    const nextIndex = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextRate = speeds[nextIndex];
    setPlaybackRate(nextRate);
    if (playerRef.current) {
      playerRef.current.playbackRate = nextRate;
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    const nextMute = !isMuted;
    playerRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  const toggleFullscreen = () => {
    const container = document.getElementById('mux-skills-container');
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const activeChap = chapters[activeChapterIndex];

  return (
    <div
      id="mux-skills-container"
      className={`relative flex flex-col bg-[#0d0d0e] rounded-2xl overflow-hidden border border-[#2b2b32] shadow-2xl select-none ${className}`}
    >
      {/* Video Viewport Area */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
        <div
          className={`w-full h-full transition-transform duration-300 ${
            isMirrored ? 'scale-x-[-1]' : 'scale-x-100'
          }`}
        >
          <MuxPlayer
            ref={playerRef}
            playbackId={playbackId}
            src={streamUrl}
            metadata={{ video_title: title }}
            streamType="on-demand"
            autoPlay={false}
            muted={isMuted}
            playbackRate={playbackRate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={(e: any) => setCurrentTime(e.target.currentTime || 0)}
            onDurationChange={(e: any) => setDuration(e.target.duration || 0)}
            onEnded={() => onLessonComplete?.()}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Mirror Overlay Indicator */}
        {isMirrored && (
          <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded flex items-center gap-1.5 shadow-md pointer-events-none z-20">
            <FlipHorizontal className="w-3.5 h-3.5" />
            <span>MIRRORED (SOUTHPAW/LEFTY VIEW)</span>
          </div>
        )}

        {/* Looping Overlay Indicator */}
        {isLoopingChapter && (
          <div className="absolute top-4 right-4 bg-[#00923f]/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded flex items-center gap-1.5 shadow-md pointer-events-none z-20 animate-pulse">
            <Repeat className="w-3.5 h-3.5" />
            <span>LOOPING CHAPTER: {activeChap?.title || 'Segment'}</span>
          </div>
        )}

        {/* Demo Asset Status Indicator */}
        <div className="absolute bottom-3 left-3 bg-[#0d0d0e]/80 backdrop-blur-md border border-white/10 text-[#9a9aa6] text-[10px] font-mono px-2.5 py-1 rounded-md pointer-events-none z-20 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00923f] animate-pulse" />
          <span>DEMO STREAM • Mux Test Asset</span>
        </div>

        {/* Side Chapter Drawer for Quick Jumping */}
        {showChaptersDrawer && chapters.length > 0 && (
          <div className="absolute inset-y-0 right-0 w-80 bg-[#161619]/95 backdrop-blur-xl border-l border-[#2b2b32] p-4 flex flex-col z-30 shadow-2xl transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-[#2b2b32]">
              <span className="font-bold text-sm text-[#ededf4] flex items-center gap-2">
                <List className="w-4 h-4 text-[#00923f]" />
                Technique Segments
              </span>
              <button
                onClick={() => setShowChaptersDrawer(false)}
                className="text-xs text-[#9a9aa6] hover:text-white px-2 py-1"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1 mt-3">
              {chapters.map((chap, i) => {
                const isActive = activeChapterIndex === i;
                return (
                  <button
                    key={chap.id || i}
                    onClick={() => {
                      seekTo(chap.timestamp);
                      setShowChaptersDrawer(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-[#00923f]/20 text-[#00b54e] font-semibold border border-[#00923f]/40'
                        : 'text-[#9a9aa6] hover:bg-[#212126] hover:text-[#ededf4]'
                    }`}
                  >
                    <span className="line-clamp-1">{chap.title}</span>
                    <span className="font-mono text-[10px] ml-2 text-zinc-500">
                      {formatTime(chap.timestamp)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar & Chapter Markers */}
      <div className="relative w-full bg-[#212126] h-2 cursor-pointer group">
        {/* Timeline Fill */}
        <div
          className="h-full bg-[#00923f] relative z-10 transition-all duration-100"
          style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
        />

        {/* Chapter break lines */}
        {chapters.map((chap, idx) => {
          if (idx === 0) return null;
          const posPercent = (chap.timestamp / (duration || 1)) * 100;
          return (
            <div
              key={chap.id || idx}
              className="absolute top-0 bottom-0 w-0.5 bg-black z-20"
              style={{ left: `${posPercent}%` }}
              title={`${chap.title} (${formatTime(chap.timestamp)})`}
            />
          );
        })}
      </div>

      {/* Primary Mat-Side Learning Controls (Submeta-style) */}
      <div className="bg-[#161619] p-3 md:p-4 flex flex-col gap-3">
        {/* Active Chapter Info & Timestamp Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-[#00923f]/15 border border-[#00923f]/40 text-[#00b54e] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              Section {activeChapterIndex + 1}/{chapters.length || 1}
            </span>
            <span className="font-semibold text-[#ededf4]">
              {activeChap?.title || title}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#9a9aa6] font-mono text-xs">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons Grid */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#2b2b32]">
          {/* Left: Playback controls */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-xl bg-[#00923f] hover:bg-[#007a34] text-white flex items-center justify-center transition-all shadow-md active:scale-95"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <button
              onClick={() => skipTime(-5)}
              className="p-2 rounded-lg bg-[#212126] hover:bg-[#2b2b32] text-[#ededf4] transition-colors"
              title="Rewind 5s"
            >
              <Rewind className="w-4 h-4" />
            </button>

            <button
              onClick={() => skipTime(5)}
              className="p-2 rounded-lg bg-[#212126] hover:bg-[#2b2b32] text-[#ededf4] transition-colors"
              title="Forward 5s"
            >
              <FastForward className="w-4 h-4" />
            </button>

            <button
              onClick={toggleMute}
              className="p-2 rounded-lg bg-[#212126] hover:bg-[#2b2b32] text-[#ededf4] transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Center / Right: Submeta Mat-Drilling Specialized Controls */}
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Infinite Chapter Looper */}
            <button
              onClick={toggleLoopChapter}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isLoopingChapter
                  ? 'bg-[#00923f] text-white shadow-lg shadow-[#00923f]/30'
                  : 'bg-[#212126] hover:bg-[#2b2b32] text-[#ededf4] border border-[#2b2b32]'
              }`}
              title="Loop current chapter continuously for mat drilling"
            >
              <Repeat className={`w-3.5 h-3.5 ${isLoopingChapter ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Loop Chapter</span>
            </button>

            {/* Lefty / Southpaw Mirror Mode */}
            <button
              onClick={toggleMirror}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isMirrored
                  ? 'bg-[#123984] text-blue-200 border border-blue-400/50 shadow-lg'
                  : 'bg-[#212126] hover:bg-[#2b2b32] text-[#ededf4] border border-[#2b2b32]'
              }`}
              title="Mirror video horizontally for left-handed grapplers"
            >
              <FlipHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mirror Video</span>
            </button>

            {/* Variable Speed Selector */}
            <button
              onClick={cyclePlaybackRate}
              className="px-2.5 py-1.5 rounded-lg bg-[#212126] hover:bg-[#2b2b32] text-[#ededf4] border border-[#2b2b32] text-xs font-mono font-bold"
              title="Change playback speed"
            >
              {playbackRate}x
            </button>

            {/* Chapters Drawer Button */}
            {chapters.length > 0 && (
              <button
                onClick={() => setShowChaptersDrawer(!showChaptersDrawer)}
                className={`p-2 rounded-lg transition-colors ${
                  showChaptersDrawer
                    ? 'bg-[#00923f]/20 text-[#00b54e] border border-[#00923f]/50'
                    : 'bg-[#212126] hover:bg-[#2b2b32] text-[#ededf4] border border-[#2b2b32]'
                }`}
                title="View technique segments"
              >
                <List className="w-4 h-4" />
              </button>
            )}

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-[#212126] hover:bg-[#2b2b32] text-[#ededf4] border border-[#2b2b32] transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
