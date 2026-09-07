import type { Meta, StoryObj } from '@storybook/react-vite';
import { screen, userEvent, within } from 'storybook/test';
import { Button } from '../Button/Button';
import { DropdownMenu } from './DropdownMenu';

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu.Content,
} satisfies Meta<typeof DropdownMenu.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

async function openMenu({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('button', { name: 'Open menu' }));
  await screen.findByRole('menu');
}

export const Playground: Story = {
  play: openMenu,
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Options</DropdownMenu.Label>
        <DropdownMenu.Item shortcut="⌘E" aria-keyshortcuts="Meta+E">
          Edit details
        </DropdownMenu.Item>
        <DropdownMenu.Item shortcut="⌘R" aria-keyshortcuts="Meta+R">
          Reconnect
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item destructive>Remove</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};

export const WithoutShortcuts: Story = {
  play: openMenu,
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Newest first</DropdownMenu.Item>
        <DropdownMenu.Item>Oldest first</DropdownMenu.Item>
        <DropdownMenu.Item disabled>Most engagement</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};
