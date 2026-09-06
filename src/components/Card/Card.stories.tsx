import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta = {
  title: 'Layout/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (props) => (
    <Card {...props} style={{ maxWidth: '20rem' }}>
      <p style={{ margin: 0 }}>
        A Card is a static surface — no Radix primitive behind it, just the same
        panel used by Dialog, DropdownMenu and Select.
      </p>
    </Card>
  ),
};

/** Margin is a layout decision, so Card leaves it to the consumer's own className. */
export const InAFlow: Story = {
  render: (props) => (
    <div style={{ display: 'flex', gap: 'var(--nef-space-lg)' }}>
      <Card {...props} style={{ width: '10rem' }}>
        First
      </Card>
      <Card {...props} style={{ width: '10rem' }}>
        Second
      </Card>
    </div>
  ),
};
