import { defineType, defineField } from 'sanity';

export const instructorType = defineType({
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Rank & Degree Title',
      type: 'string',
      description: 'e.g. Founder & Head Coach, 6th Degree Black Belt',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'lineage',
      title: 'Lineage',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Carlson Gracie -> Brazilian Top Team -> Roberto Atalla',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Instructor',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
