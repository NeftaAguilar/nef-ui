import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  decorators: [(Story) => <div style={{ maxWidth: '32rem' }}>{Story()}</div>],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Tabs defaultValue="queue">
      <Tabs.List aria-label="Publishing">
        <Tabs.Trigger value="queue">Queue</Tabs.Trigger>
        <Tabs.Trigger value="drafts">Drafts</Tabs.Trigger>
        <Tabs.Trigger value="sent">Sent</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="queue">12 posts queued for this week.</Tabs.Content>
      <Tabs.Content value="drafts">3 drafts waiting on you.</Tabs.Content>
      <Tabs.Content value="sent">148 posts published.</Tabs.Content>
    </Tabs>
  ),
};

/** Labels of very different widths make the indicator's width transition visible. */
export const UnevenLabels: Story = {
  render: () => (
    <Tabs defaultValue="all">
      <Tabs.List aria-label="Filter">
        <Tabs.Trigger value="all">All</Tabs.Trigger>
        <Tabs.Trigger value="needs-approval">Needs approval from a teammate</Tabs.Trigger>
        <Tabs.Trigger value="errors">Errors</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="all">Everything.</Tabs.Content>
      <Tabs.Content value="needs-approval">Waiting on a reviewer.</Tabs.Content>
      <Tabs.Content value="errors">Two posts failed to publish.</Tabs.Content>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="queue">
      <Tabs.List aria-label="Publishing">
        <Tabs.Trigger value="queue">Queue</Tabs.Trigger>
        <Tabs.Trigger value="analytics" disabled>
          Analytics
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="queue">12 posts queued.</Tabs.Content>
      <Tabs.Content value="analytics">Upgrade to see analytics.</Tabs.Content>
    </Tabs>
  ),
};
