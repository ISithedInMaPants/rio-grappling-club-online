import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/ui/Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Fundamental',
    variant: 'default',
  },
};

export const GreenAccent: Story = {
  args: {
    children: 'Active Lesson',
    variant: 'green',
  },
};

export const BlueAccent: Story = {
  args: {
    children: 'Rio Grappling Club',
    variant: 'blue',
  },
};

export const GoldAccent: Story = {
  args: {
    children: 'Championship Track',
    variant: 'gold',
  },
};

export const Belts: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge beltLevel="white" />
      <Badge beltLevel="blue" />
      <Badge beltLevel="purple" />
      <Badge beltLevel="brown" />
      <Badge beltLevel="black" />
    </div>
  ),
};

export const SkillLevels: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge level="beginner" />
      <Badge level="intermediate" />
      <Badge level="advanced" />
    </div>
  ),
};

export const Formats: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge giFormat="gi" />
      <Badge giFormat="nogi" />
      <Badge giFormat="both" />
    </div>
  ),
};
