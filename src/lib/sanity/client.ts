import { createClient } from 'next-sanity';
import { mockCourses, mockInstructors, mockGameplanNodes } from '@/data/mockData';
import { Course, Instructor, Lesson } from '@/types';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

// Safe Data Retrieval Services with automatic fallback to high-fidelity mock data
export async function getCourses(): Promise<Course[]> {
  if (client) {
    try {
      const data = await client.fetch(`*[_type == "course"]{
        "id": _id,
        title,
        "slug": slug.current,
        subtitle,
        instructor->,
        "coverImage": coverImage.asset->url,
        giFormat,
        level,
        beltLevel,
        positionCategory,
        totalDuration,
        lessonCount,
        summary,
        tags
      }`);
      if (data && data.length > 0) return data;
    } catch (err) {
      console.warn('Sanity fetch failed, falling back to local curriculum dataset:', err);
    }
  }
  return mockCourses;
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  if (client) {
    try {
      const data = await client.fetch(
        `*[_type == "course" && slug.current == $slug][0]{
          "id": _id,
          title,
          "slug": slug.current,
          subtitle,
          instructor->,
          "coverImage": coverImage.asset->url,
          giFormat,
          level,
          beltLevel,
          positionCategory,
          totalDuration,
          lessonCount,
          summary,
          tags,
          modules[]{
            "id": _key,
            title,
            lessons[]->{
              "id": _id,
              title,
              "slug": slug.current,
              muxPlaybackId,
              duration,
              description,
              chapters,
              keyPoints,
              drills
            }
          }
        }`,
        { slug }
      );
      if (data) return data;
    } catch (err) {
      console.warn('Sanity fetch failed, falling back to local curriculum dataset:', err);
    }
  }
  return mockCourses.find((c) => c.slug === slug) || null;
}

export async function getInstructors(): Promise<Instructor[]> {
  if (client) {
    try {
      const data = await client.fetch(`*[_type == "instructor"]{
        "id": _id,
        name,
        "slug": slug.current,
        title,
        "avatar": avatar.asset->url,
        lineage,
        bio,
        featured
      }`);
      if (data && data.length > 0) return data;
    } catch (err) {
      console.warn('Sanity fetch failed, falling back to local instructor dataset:', err);
    }
  }
  return mockInstructors;
}

export async function getLesson(courseSlug: string, lessonSlug: string): Promise<{ course: Course; lesson: Lesson } | null> {
  const course = await getCourseBySlug(courseSlug);
  if (!course) return null;

  for (const mod of course.modules) {
    const found = mod.lessons.find((l) => l.slug === lessonSlug || l.id === lessonSlug);
    if (found) {
      return { course, lesson: found };
    }
  }

  // Fallback to first lesson if none matched
  if (course.modules[0]?.lessons[0]) {
    return { course, lesson: course.modules[0].lessons[0] };
  }

  return null;
}

export function getGameplanNodes() {
  return mockGameplanNodes;
}
