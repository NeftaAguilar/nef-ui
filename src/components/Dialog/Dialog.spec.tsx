import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Button } from '../Button/Button';
import { Dialog } from './Dialog';

function Example({ description }: { description?: string } = {}) {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content
        title="Open dialog"
        description={description}
        footer={
          <Dialog.Close asChild>
            <Button>Save</Button>
          </Dialog.Close>
        }
      >
        <p>Body</p>
      </Dialog.Content>
    </Dialog>
  );
}

describe('Dialog', () => {
  it('opens from its trigger and is named by its title', async () => {
    render(<Example />);

    await userEvent.click(screen.getByRole('button', { name: 'Open dialog' }));

    expect(screen.getByRole('dialog', { name: 'Open dialog' })).toBeInTheDocument();
  });

  it('is described by its description when one is given', async () => {
    render(<Example description="Changes apply to the queued post." />);

    await userEvent.click(screen.getByRole('button', { name: 'Open dialog' }));

    expect(screen.getByRole('dialog')).toHaveAccessibleDescription(
      'Changes apply to the queued post.',
    );
  });

  it('closes on Escape', async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole('button', { name: 'Open dialog' }));

    await userEvent.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes from the footer action and from the close button', async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole('button', { name: 'Open dialog' }));
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Open dialog' }));
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
