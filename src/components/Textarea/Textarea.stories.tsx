import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  args: { label: "What's happening?", placeholder: 'Share an update…' },
  decorators: [(Story) => <div style={{ maxWidth: '28rem' }}>{Story()}</div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

function LiveCount(args: React.ComponentProps<typeof Textarea>) {
  const [value, setValue] = useState('Shipping the new design system today.');
  return (
    <Textarea {...args} maxLength={80} value={value} onChange={(e) => setValue(e.target.value)} />
  );
}

/** The count is live. Typing past the limit flags the field but never eats input. */
export const WithCharacterCount: Story = {
  render: (args) => <LiveCount {...args} />,
};

export const OverTheLimit: Story = {
  args: {
    maxLength: 20,
    value: 'This update is comfortably longer than the limit allows.',
    onChange: () => {},
  },
};

export const WithError: Story = {
  args: { error: 'Add some text before scheduling.' },
};
