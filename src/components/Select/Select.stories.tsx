import type { Meta, StoryObj } from '@storybook/react-vite';
import { screen, userEvent, within } from 'storybook/test';
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

async function openSelect({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('combobox', { name: 'Channel' }));
  await screen.findByRole('listbox');
}

export const Playground: Story = { args: { children: channels }, play: openSelect };

export const WithValue: Story = {
  args: { children: channels, defaultValue: 'linkedin' },
  play: openSelect,
};

export const WithError: Story = {
  args: { children: channels, error: 'Pick a channel to continue.' },
  play: openSelect,
};

export const Grouped: Story = {
  play: openSelect,
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
