'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { RgcLogo } from '@/components/ui/RgcLogo';
import { QuickSearchModal } from '@/components/navigation/QuickSearchModal';
import {
  Compass,
  BookOpen,
  GitBranch,
  Users,
  Search,
  Menu,
  X,
  User,
  ShieldCheck,
  Award,
  Clock,
  ChevronDown,
  Bookmark,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Global shortcut for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { href: '/', label: 'Explore', icon: Compass },
    { href: '/courses', label: 'Courses', icon: BookOpen },
    { href: '/gameplan', label: 'Gameplan', icon: GitBranch },
    { href: '/instructors', label: 'Instructors', icon: Users },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0d0d0e]/95 backdrop-blur-xl border-b border-[#2b2b32]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <RgcLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs lg:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#161619] text-[#00b54e] border border-[#00923f]/30 shadow-sm'
                      : 'text-[#9a9aa6] hover:text-[#ededf4] hover:bg-[#161619]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#00923f]' : ''}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Section: ⌘K Search Trigger + Student Persona Dropdown */}
          <div className="hidden sm:flex items-center gap-3">
            {/* ⌘K Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161619] hover:bg-[#212126] border border-[#2b2b32] text-xs text-[#9a9aa6] hover:text-[#ededf4] transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#00923f]" />
              <span>Search techniques...</span>
              <kbd className="hidden lg:inline font-mono text-[10px] bg-[#212126] text-[#6b6b78] px-1.5 py-0.5 rounded border border-[#2b2b32]">
                ⌘K
              </kbd>
            </button>

            {/* Student Profile Popover Toggle */}
            <div className="relative pl-2 border-l border-[#2b2b32]">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-[#161619] transition-colors cursor-pointer text-left focus:outline-none"
              >
                <div className="flex flex-col items-end">
                  <span className="text-[11px] font-bold text-[#ededf4]">
                    Alex Silva
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-0.5">
                    <ShieldCheck className="w-2.5 h-2.5" /> Blue Belt • 2 Stripes
                  </span>
                </div>
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-500 bg-[#0d0d0e]">
                  <Image
                    src="/images/instructors/student-alex.png"
                    alt="Alex Silva"
                    fill
                    className="object-cover"
                  />
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#6b6b78]" />
              </button>

              {/* Student Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#161619] border border-[#2b2b32] rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="flex items-center gap-3 pb-3 border-b border-[#2b2b32]">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-blue-500 bg-[#0d0d0e]">
                      <Image
                        src="/images/instructors/student-alex.png"
                        alt="Alex Silva"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Alex Silva</div>
                      <div className="text-[10px] text-blue-400 font-semibold">
                        Blue Belt • 2 Stripes
                      </div>
                      <div className="text-[9px] text-[#9a9aa6]">
                        RGC Wroclaw Affiliate
                      </div>
                    </div>
                  </div>

                  {/* Mat Time Stats */}
                  <div className="py-3 border-b border-[#2b2b32] grid grid-cols-2 gap-2 text-center">
                    <div className="bg-[#212126] p-2 rounded-xl border border-[#2b2b32]/60">
                      <div className="text-xs font-mono font-bold text-[#00b54e]">14.5 hrs</div>
                      <div className="text-[9px] uppercase tracking-wider text-[#9a9aa6] mt-0.5 flex items-center justify-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> Mat Time
                      </div>
                    </div>
                    <div className="bg-[#212126] p-2 rounded-xl border border-[#2b2b32]/60">
                      <div className="text-xs font-mono font-bold text-[#e0b252]">2 Courses</div>
                      <div className="text-[9px] uppercase tracking-wider text-[#9a9aa6] mt-0.5 flex items-center justify-center gap-1">
                        <Award className="w-2.5 h-2.5" /> In Progress
                      </div>
                    </div>
                  </div>

                  {/* Active In-Progress Courses */}
                  <div className="py-2.5 space-y-2">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#6b6b78]">
                      Active Study Courses
                    </div>
                    <Link
                      href="/courses/closed-guard-mastery"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block p-2 rounded-lg bg-[#212126]/60 hover:bg-[#212126] transition-colors"
                    >
                      <div className="text-[11px] font-semibold text-[#ededf4] truncate">
                        Foundations of Closed Guard
                      </div>
                      <div className="w-full bg-[#0d0d0e] h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div className="bg-[#00923f] h-full w-3/5" />
                      </div>
                      <div className="text-[9px] text-[#9a9aa6] text-right mt-1 font-mono">
                        60% completed
                      </div>
                    </Link>

                    <Link
                      href="/courses/pressure-passing-blueprint"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block p-2 rounded-lg bg-[#212126]/60 hover:bg-[#212126] transition-colors"
                    >
                      <div className="text-[11px] font-semibold text-[#ededf4] truncate">
                        Pressure Passing Blueprint
                      </div>
                      <div className="w-full bg-[#0d0d0e] h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div className="bg-[#00923f] h-full w-1/4" />
                      </div>
                      <div className="text-[9px] text-[#9a9aa6] text-right mt-1 font-mono">
                        25% completed
                      </div>
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-[#2b2b32]">
                    <Link
                      href="/courses"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-[#00b54e] font-semibold hover:underline"
                    >
                      <Bookmark className="w-3 h-3" /> View All Enrolled Courses
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu & Search triggers */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg bg-[#161619] text-[#ededf4] border border-[#2b2b32]"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#00923f]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#161619] text-[#ededf4] border border-[#2b2b32]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#2b2b32] bg-[#161619] px-4 pt-3 pb-5 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-[#00923f]/15 text-[#00b54e] border border-[#00923f]/30'
                      : 'text-[#9a9aa6] hover:bg-[#212126] hover:text-[#ededf4]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="pt-3 border-t border-[#2b2b32] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-500 bg-[#0d0d0e]">
                  <Image
                    src="/images/instructors/student-alex.png"
                    alt="Alex Silva"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Alex Silva</div>
                  <div className="text-[10px] text-blue-400 font-semibold">
                    Blue Belt • 2 Stripes (RGC Member)
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="text-xs text-[#00b54e] font-semibold"
              >
                Search
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global ⌘K Quick Search Modal */}
      <QuickSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
};
