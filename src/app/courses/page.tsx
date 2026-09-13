import React, { Suspense } from 'react';
import { getCourses } from '@/lib/sanity/client';
import { CourseCatalogClient } from './CourseCatalogClient';

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-[#9a9aa6]">
          Loading course catalog...
        </div>
      }
    >
      <CourseCatalogClient initialCourses={courses} />
    </Suspense>
  );
}
