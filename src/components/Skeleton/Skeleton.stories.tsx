import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (props) => <Skeleton {...props} style={{ width: '12rem' }} />,
};

/** Width, height and radius are all just `style` — the same as sizing any other `div`. */
export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--nef-space-md)' }}>
      <Skeleton style={{ width: '12rem' }} />
      <Skeleton style={{ width: '8rem' }} />
      <Skeleton style={{ width: '3rem', height: '3rem', borderRadius: 'var(--nef-radius-full)' }} />
    </div>
  ),
};

/** A composed placeholder for a card that hasn't loaded yet. */
export const CardPlaceholder: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--nef-space-sm)',
        width: '16rem',
      }}
    >
      <Skeleton style={{ width: '3rem', height: '3rem', borderRadius: 'var(--nef-radius-full)' }} />
      <Skeleton style={{ width: '80%' }} />
      <Skeleton style={{ width: '60%' }} />
    </div>
  ),
};
