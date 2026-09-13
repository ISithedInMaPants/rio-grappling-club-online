import { defineType, defineField } from 'sanity';

export const lessonType = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Technique / Lesson Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{ type: 'course' }],
    }),
    defineField({
      name: 'muxPlaybackId',
      title: 'Mux Video Playback ID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (in seconds)',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Lesson Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'chapters',
      title: 'Video Chapters / Key Positions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Chapter Title', type: 'string' },
            { name: 'timestamp', title: 'Timestamp (seconds)', type: 'number' },
            { name: 'duration', title: 'Duration (seconds)', type: 'number' },
          ],
        },
      ],
    }),
    defineField({
      name: 'keyPoints',
      title: 'Key Mechanics & Actionable Cues',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'drills',
      title: 'Partner Mat Drills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Drill Title', type: 'string' },
            { name: 'instructions', title: 'Instructions', type: 'text' },
            { name: 'recommendedReps', title: 'Recommended Reps/Timer', type: 'string' },
          ],
        },
      ],
    }),
  ],
});
