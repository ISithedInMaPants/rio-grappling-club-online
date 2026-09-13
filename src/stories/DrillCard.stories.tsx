import type { Meta, StoryObj } from '@storybook/react';
import { DrillCard } from '@/components/cards/DrillCard';

const meta: Meta<typeof DrillCard> = {
  title: 'Cards/DrillCard',
  component: DrillCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof DrillCard>;

export const Default: Story = {
  args: {
    drill: {
      id: 'd1',
      title: 'Posture Breakdown & Knee Pull Timing',
      instructions: 'Partner sits in guard. Collar grip, knee pull, angle hip 45 degrees without letting opponent recover posture.',
      recommendedReps: '10 reps each side',
      completed: false,
    },
  },
  render: (args) => (
    <div className="max-w-md">
      <DrillCard {...args} />
    </div>
  ),
};

export const Completed: Story = {
  args: {
    drill: {
      id: 'd2',
      title: 'Over-Under Tripod Mat Round',
      instructions: 'Drive head into floating ribs, stay on toes, pummel feet to clear butterfly hooks.',
      recommendedReps: '3 rounds x 60s',
      completed: true,
    },
  },
  render: (args) => (
    <div className="max-w-md">
      <DrillCard {...args} />
    </div>
  ),
};
