import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: { label: 'Auto-schedule new posts' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Checked: Story = { args: { defaultChecked: true } };

export const Disabled: Story = { args: { disabled: true } };

export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true } };

/** Without a label, supply `aria-label` — a bare switch has no accessible name. */
export const Unlabelled: Story = {
  args: { label: undefined, 'aria-label': 'Auto-schedule new posts' },
};
