import React from 'react';
import Link from 'next/link';
import { RgcLogo } from '@/components/ui/RgcLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0d0d0e] border-t border-[#2b2b32] text-[#9a9aa6] py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4 md:col-span-2">
          <RgcLogo size="md" />
          <p className="text-xs text-[#9a9aa6] max-w-md leading-relaxed mt-2">
            Rio Grappling Club Online brings structured Brazilian Jiu-Jitsu and submission grappling instructionals directly to your mat sessions. Founded on the principles of cooperation, respect, humility, and bravery.
          </p>
          <div className="flex flex-wrap gap-2 text-[11px] text-[#6b6b78] font-medium pt-2">
            <span>Cooperation</span> • 
            <span>Respect</span> • 
            <span>Loyalty</span> • 
            <span>Humility</span> • 
            <span>Honesty</span> • 
            <span>Bravery</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#ededf4] mb-3">
            Curriculum
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/courses" className="hover:text-[#00b54e] transition-colors">
                All Courses
              </Link>
            </li>
            <li>
              <Link href="/courses?belt=white" className="hover:text-[#00b54e] transition-colors">
                White Belt Fundamentals
              </Link>
            </li>
            <li>
              <Link href="/courses?belt=blue" className="hover:text-[#00b54e] transition-colors">
                Blue Belt Intermediate
              </Link>
            </li>
            <li>
              <Link href="/courses?format=nogi" className="hover:text-[#00b54e] transition-colors">
                No-Gi Submissions
              </Link>
            </li>
            <li>
              <Link href="/gameplan" className="hover:text-[#00b54e] transition-colors">
                Positional Gameplans
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#ededf4] mb-3">
            Rio Grappling Club
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/instructors" className="hover:text-[#00b54e] transition-colors">
                Leadership & Instructors
              </Link>
            </li>
            <li>
              <a
                href="https://riograpplingclub.pl"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#00b54e] transition-colors"
              >
                Global Academies
              </a>
            </li>
            <li>
              <span className="text-[#6b6b78]">Training Camps & Seminars</span>
            </li>
            <li>
              <span className="text-[#6b6b78]">Guidelines & Hierarchy</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-[#2b2b32] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6b6b78] gap-4">
        <div>
          © {new Date().getFullYear()} Rio Grappling Club Online. All rights reserved. Roberto Atalla & Mauro Chueng.
        </div>
        <div className="flex items-center gap-4">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Affiliate Gyms</span>
        </div>
      </div>
    </footer>
  );
};
