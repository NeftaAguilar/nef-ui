import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  args: { label: 'Channel', placeholder: 'Pick a channel' },
  decorators: [(Story) => <div style={{ maxWidth: '18rem' }}>{Story()}</div>],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const channels = (
  <>
    <Select.Item value="x">X</Select.Item>
    <Select.Item value="linkedin">LinkedIn</Select.Item>
    <Select.Item value="mastodon">Mastodon</Select.Item>
  </>
);

export const Playground: Story = { args: { children: channels } };

export const WithValue: Story = { args: { children: channels, defaultValue: 'linkedin' } };

export const WithError: Story = {
  args: { children: channels, error: 'Pick a channel to continue.' },
};

export const Grouped: Story = {
  args: {
    children: (
      <>
        <Select.Group>
          <Select.GroupLabel>Connected</Select.GroupLabel>
          {channels}
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.GroupLabel>Needs reconnecting</Select.GroupLabel>
          <Select.Item value="threads" disabled>
            Threads
          </Select.Item>
        </Select.Group>
      </>
    ),
  },
};
