import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/Button';
import { Play, Repeat, FlipHorizontal, Bookmark } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryGreen: Story = {
  args: {
    children: 'Start Course',
    variant: 'primary',
    size: 'md',
  },
};

export const SecondaryDark: Story = {
  args: {
    children: 'View Syllabus',
    variant: 'secondary',
    size: 'md',
  },
};

export const GoldMastery: Story = {
  args: {
    children: 'Upgrade to All-Access',
    variant: 'gold',
    size: 'md',
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">
        <Play className="w-4 h-4 mr-1 fill-current" /> Watch Lesson
      </Button>
      <Button variant="secondary">
        <Repeat className="w-4 h-4 mr-1 text-[#00b54e]" /> Loop Segment
      </Button>
      <Button variant="secondary">
        <FlipHorizontal className="w-4 h-4 mr-1 text-blue-400" /> Mirror Video
      </Button>
      <Button variant="ghost">
        <Bookmark className="w-4 h-4 mr-1" /> Bookmark
      </Button>
    </div>
  ),
};
