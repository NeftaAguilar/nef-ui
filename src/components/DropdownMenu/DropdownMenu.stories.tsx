import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { DropdownMenu } from './DropdownMenu';

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu.Content,
} satisfies Meta<typeof DropdownMenu.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Channel actions</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Channel</DropdownMenu.Label>
        <DropdownMenu.Item shortcut="⌘E" aria-keyshortcuts="Meta+E">
          Edit details
        </DropdownMenu.Item>
        <DropdownMenu.Item shortcut="⌘R" aria-keyshortcuts="Meta+R">
          Reconnect
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item destructive>Remove channel</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};

export const WithoutShortcuts: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Sort</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Newest first</DropdownMenu.Item>
        <DropdownMenu.Item>Oldest first</DropdownMenu.Item>
        <DropdownMenu.Item disabled>Most engagement</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};
