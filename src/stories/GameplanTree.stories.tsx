import type { Meta, StoryObj } from '@storybook/react';
import { GameplanTree } from '@/components/gameplan/GameplanTree';
import { mockGameplanNodes } from '@/data/mockData';

const meta: Meta<typeof GameplanTree> = {
  title: 'Gameplan/GameplanTree',
  component: GameplanTree,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof GameplanTree>;

export const Default: Story = {
  args: {
    nodes: mockGameplanNodes,
  },
  render: (args) => (
    <div className="max-w-6xl mx-auto">
      <GameplanTree {...args} />
    </div>
  ),
};
