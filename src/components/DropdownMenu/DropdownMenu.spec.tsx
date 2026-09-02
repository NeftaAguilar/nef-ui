import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../Button/Button';
import { DropdownMenu } from './DropdownMenu';

function Example({ onDelete = () => {} }: { onDelete?: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button>Open menu</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Channel</DropdownMenu.Label>
        <DropdownMenu.Item shortcut="⌘E" aria-keyshortcuts="Meta+E">
          Edit
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item destructive onSelect={onDelete}>
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}

describe('DropdownMenu', () => {
  it('opens from its trigger', async () => {
    render(<Example />);

    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Edit/ })).toBeInTheDocument();
  });

  it('selects an item with the keyboard', async () => {
    const onDelete = vi.fn();
    render(<Example onDelete={onDelete} />);

    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}');

    expect(onDelete).toHaveBeenCalledOnce();
  });

  it('keeps the shortcut glyph out of the accessible name', async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    // Announced as "Edit", not "Edit\u2318E".
    const item = screen.getByRole('menuitem', { name: 'Edit' });
    expect(item).toHaveAttribute('aria-keyshortcuts', 'Meta+E');
    expect(screen.getByText('\u2318E')).toHaveAttribute('aria-hidden', 'true');
  });
});
