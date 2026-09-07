import type { Meta, StoryObj } from '@storybook/react-vite';
import { screen, userEvent, within } from 'storybook/test';
import { Button } from '../Button/Button';
import { Tooltip, TooltipProvider } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    content: 'Adds this item',
    children: <Button variant="outline">Add</Button>,
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

async function openTooltip({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);
  await userEvent.hover(canvas.getByRole('button'));
  await screen.findByRole('tooltip');
}

export const Playground: Story = { play: openTooltip };

/** The icon button carries its own `aria-label`; the tooltip only supplements it. */
export const OnAnIconButton: Story = {
  args: {
    children: (
      <Button variant="ghost" aria-label="Add">
        +
      </Button>
    ),
  },
  play: openTooltip,
};

export const Sides: Story = {
  // Four tooltips need to be visible at once, which no single hover can do, so
  // they're forced open with `defaultOpen` instead of a play function.
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side} {...args} side={side} content={`Placed ${side}`} defaultOpen>
          <Button variant="outline">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
