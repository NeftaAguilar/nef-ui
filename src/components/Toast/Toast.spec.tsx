import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../Button/Button';
import { Toast } from './Toast';

function Example({ onUndo = () => {} }: { onUndo?: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Toast.Provider swipeDirection="right">
      <Button onClick={() => setOpen(true)}>Schedule</Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        duration={Infinity}
        title="Post scheduled"
        description="It will publish at 09:00."
        tone="success"
        action={{ label: 'Undo', altText: 'Undo scheduling this post', onClick: onUndo }}
      />
      <Toast.Viewport />
    </Toast.Provider>
  );
}

describe('Toast', () => {
  it('announces itself with its title and description', async () => {
    render(<Example />);

    await userEvent.click(screen.getByRole('button', { name: 'Schedule' }));

    // Radix renders a separate, initially-empty live region alongside the
    // toast, so the toast is found by its content rather than by role.
    const toast = (await screen.findByText('Post scheduled')).closest('li');
    expect(toast).toHaveTextContent('Post scheduled');
    expect(toast).toHaveTextContent('It will publish at 09:00.');
  });

  it('runs its action', async () => {
    const onUndo = vi.fn();
    render(<Example onUndo={onUndo} />);
    await userEvent.click(screen.getByRole('button', { name: 'Schedule' }));

    await userEvent.click(await screen.findByRole('button', { name: 'Undo' }));

    expect(onUndo).toHaveBeenCalledOnce();
  });

  it('gives the action an alt text for assistive technology', async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole('button', { name: 'Schedule' }));

    const action = await screen.findByRole('button', { name: 'Undo' });
    expect(action.closest('[data-radix-toast-announce-alt]')).toBeTruthy();
  });
});
