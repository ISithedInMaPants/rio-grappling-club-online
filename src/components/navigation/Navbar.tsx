'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RgcLogo } from '@/components/ui/RgcLogo';
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
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Explore', icon: Compass },
    { href: '/courses', label: 'Courses', icon: BookOpen },
    { href: '/gameplan', label: 'Gameplan', icon: GitBranch },
    { href: '/instructors', label: 'Instructors', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0d0d0e]/90 backdrop-blur-xl border-b border-[#2b2b32]">
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

        {/* Right Section: Search + Belt Tag + Profile */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/courses"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161619] hover:bg-[#212126] border border-[#2b2b32] text-xs text-[#9a9aa6] hover:text-[#ededf4] transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search techniques...</span>
            <kbd className="hidden lg:inline font-mono text-[10px] bg-[#212126] text-[#6b6b78] px-1.5 py-0.5 rounded border border-[#2b2b32]">
              ⌘K
            </kbd>
          </Link>

          {/* Student Belt Indicator (Submeta Style) */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#2b2b32]">
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-bold text-[#ededf4]">
                Roberto A.
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#00b54e] flex items-center gap-0.5">
                <ShieldCheck className="w-2.5 h-2.5" /> Black Belt 6°
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#161619] border border-[#00923f] flex items-center justify-center text-[#ededf4]">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#212126] border border-[#00923f] flex items-center justify-center text-white">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Roberto Atalla</div>
                <div className="text-[10px] text-[#00b54e] font-semibold">
                  Black Belt 6°
                </div>
              </div>
            </div>
            <Link
              href="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-[#9a9aa6] hover:text-white"
            >
              Search
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
