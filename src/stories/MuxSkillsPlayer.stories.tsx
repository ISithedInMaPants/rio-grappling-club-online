import type { Meta, StoryObj } from '@storybook/react';
import { MuxSkillsPlayer } from '@/components/player/MuxSkillsPlayer';
import { mockCourses } from '@/data/mockData';

const meta: Meta<typeof MuxSkillsPlayer> = {
  title: 'Player/MuxSkillsPlayer',
  component: MuxSkillsPlayer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof MuxSkillsPlayer>;

const sampleLesson = mockCourses[0].modules[0].lessons[0];

export const Default: Story = {
  args: {
    title: sampleLesson.title,
    playbackId: sampleLesson.muxPlaybackId,
    chapters: sampleLesson.chapters,
  },
  render: (args) => (
    <div className="max-w-4xl mx-auto">
      <MuxSkillsPlayer {...args} />
    </div>
  ),
};
