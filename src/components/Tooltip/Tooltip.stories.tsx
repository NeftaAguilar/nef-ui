import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Tooltip, TooltipProvider } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    content: 'Adds this post to your queue',
    children: <Button variant="outline">Add to queue</Button>,
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div style={{ padding: '3rem' }}>{Story()}</div>
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** The icon button carries its own `aria-label`; the tooltip only supplements it. */
export const OnAnIconButton: Story = {
  args: {
    children: (
      <Button variant="ghost" aria-label="Add to queue">
        +
      </Button>
    ),
  },
};

export const Sides: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side} {...args} side={side} content={`Placed ${side}`}>
          <Button variant="outline">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
