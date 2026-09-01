import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  args: { label: 'Channel name', placeholder: 'Buffer' },
  decorators: [(Story) => <div style={{ maxWidth: '20rem' }}>{Story()}</div>],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithHint: Story = {
  args: { hint: 'Shown on your public profile.' },
};

export const WithError: Story = {
  args: { error: 'That name is already taken.', defaultValue: 'buffer' },
};

/** When both are supplied the error wins — two messages under one field is noise. */
export const ErrorReplacesHint: Story = {
  args: { hint: 'Shown on your public profile.', error: 'That name is already taken.' },
};

export const Disabled: Story = { args: { disabled: true, defaultValue: 'buffer' } };
