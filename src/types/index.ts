export type BeltLevel = 'white' | 'blue' | 'purple' | 'brown' | 'black' | 'all';

export type PositionCategory = 
  | 'Guard Passing'
  | 'Closed Guard'
  | 'Open Guard'
  | 'Half Guard'
  | 'Back Attacks'
  | 'Submissions'
  | 'Escapes & Pin Defense'
  | 'Takedowns & Wrestling';

export type GiFormat = 'gi' | 'nogi' | 'both';

export interface Instructor {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  title: string;
  lineage: string[];
  bio: string;
  courseCount: number;
  featured?: boolean;
}

export interface VideoChapter {
  id: string;
  title: string;
  timestamp: number; // in seconds
  duration: number; // in seconds
  keyConcept?: string;
}

export interface DrillItem {
  id: string;
  title: string;
  instructions: string;
  recommendedReps: string; // e.g. "10 reps each side" or "3 min round"
  completed?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  courseId: string;
  courseSlug: string;
  muxPlaybackId: string;
  duration: number; // total seconds
  order: number;
  previewImageUrl?: string;
  description: string;
  chapters: VideoChapter[];
  keyPoints: string[];
  drills: DrillItem[];
  prerequisites?: string[]; // IDs of prerequisite lessons
  nextLessonId?: string;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  instructor: Instructor;
  coverImage: string;
  giFormat: GiFormat;
  beltLevel: BeltLevel;
  positionCategory: PositionCategory;
  totalDuration: number; // in seconds
  lessonCount: number;
  rating?: number;
  featured?: boolean;
  summary: string;
  modules: Module[];
  tags: string[];
}

export interface GameplanNode {
  id: string;
  position: string;
  category: 'Entry' | 'Control' | 'Sweep' | 'Pass' | 'Submission' | 'Counter';
  title: string;
  description: string;
  relatedLessonSlug?: string;
  courseSlug?: string;
  connectedTo: string[]; // Node IDs
}
