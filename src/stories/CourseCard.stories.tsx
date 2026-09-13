import type { Meta, StoryObj } from '@storybook/react';
import { CourseCard } from '@/components/cards/CourseCard';
import { mockCourses } from '@/data/mockData';

const meta: Meta<typeof CourseCard> = {
  title: 'Cards/CourseCard',
  component: CourseCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof CourseCard>;

export const Default: Story = {
  args: {
    course: mockCourses[0],
  },
  render: (args) => (
    <div className="max-w-sm">
      <CourseCard {...args} />
    </div>
  ),
};

export const InProgress: Story = {
  args: {
    course: mockCourses[1],
    userProgress: 45,
  },
  render: (args) => (
    <div className="max-w-sm">
      <CourseCard {...args} />
    </div>
  ),
};

export const GridDisplay: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      {mockCourses.slice(0, 3).map((course, idx) => (
        <CourseCard key={course.id} course={course} userProgress={idx === 0 ? 60 : undefined} />
      ))}
    </div>
  ),
};
