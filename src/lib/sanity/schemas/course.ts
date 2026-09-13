import { defineType, defineField } from 'sanity';

export const courseType = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'instructor',
      title: 'Lead Instructor',
      type: 'reference',
      to: [{ type: 'instructor' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'giFormat',
      title: 'Uniform Format',
      type: 'string',
      options: {
        list: [
          { title: 'Gi', value: 'gi' },
          { title: 'No-Gi', value: 'nogi' },
          { title: 'Both', value: 'both' },
        ],
      },
    }),
    defineField({
      name: 'beltLevel',
      title: 'Belt Progression Level',
      type: 'string',
      options: {
        list: [
          { title: 'White Belt (Fundamentals)', value: 'white' },
          { title: 'Blue Belt', value: 'blue' },
          { title: 'Purple Belt', value: 'purple' },
          { title: 'Brown Belt', value: 'brown' },
          { title: 'Black Belt', value: 'black' },
          { title: 'All Levels', value: 'all' },
        ],
      },
    }),
    defineField({
      name: 'positionCategory',
      title: 'Positional Category',
      type: 'string',
      options: {
        list: [
          { title: 'Closed Guard', value: 'Closed Guard' },
          { title: 'Open Guard', value: 'Open Guard' },
          { title: 'Half Guard', value: 'Half Guard' },
          { title: 'Guard Passing', value: 'Guard Passing' },
          { title: 'Back Attacks', value: 'Back Attacks' },
          { title: 'Submissions', value: 'Submissions' },
          { title: 'Escapes & Pin Defense', value: 'Escapes & Pin Defense' },
          { title: 'Takedowns & Wrestling', value: 'Takedowns & Wrestling' },
        ],
      },
    }),
    defineField({
      name: 'summary',
      title: 'Curriculum Summary',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'tags',
      title: 'Technique Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
