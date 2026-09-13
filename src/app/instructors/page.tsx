import React from 'react';
import { getInstructors } from '@/lib/sanity/client';
import { InstructorCard } from '@/components/cards/InstructorCard';
import { Users, Award, Shield } from 'lucide-react';

export default async function InstructorsPage() {
  const instructors = await getInstructors();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-[#00b54e] mb-1">
          Coaching Staff & Lineage
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#ededf4] tracking-tight">
          Rio Grappling Club Leadership
        </h1>
        <p className="text-xs sm:text-sm text-[#9a9aa6] mt-2 max-w-2xl leading-relaxed">
          Founded in 2003 by Roberto Atalla, Rio Grappling Club has grown into an international association spanning dozens of academies across Europe, Africa, and the Americas. Every instructional is produced directly by our master coaches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructors.map((inst) => (
          <InstructorCard key={inst.id} instructor={inst} />
        ))}
      </div>

      {/* Academy Values Banner */}
      <div className="bg-[#161619] border border-[#2b2b32] rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-3 text-[#00b54e]">
          <Shield className="w-5 h-5" />
          <h3 className="font-bold text-base text-[#ededf4] uppercase tracking-wider">
            Rio Grappling Club Core Values
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#9a9aa6] leading-relaxed max-w-3xl">
          As defined in our international charter: <strong className="text-[#ededf4]">Cooperation, Respect, Loyalty, Humility, Honesty, and Bravery</strong>. Cooperation is the key to lasting success, which is why Rio Grappling Club Online promotes horizontal and vertical integration across all our affiliated academies worldwide.
        </p>
      </div>
    </div>
  );
}
