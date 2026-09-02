import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders its children and fires onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Open</Button>);

    await userEvent.click(screen.getByRole('button', { name: 'Open' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is disabled and announced as busy while loading', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Open
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Open' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');

    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('keeps its accessible name while loading', () => {
    render(<Button loading>Open</Button>);

    // The spinner is decorative; the label must survive for screen readers.
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
  });

  it('renders as the child element when asChild is set', () => {
    render(
      <Button asChild>
        <a href="/queue">Open link</a>
      </Button>,
    );

    expect(screen.getByRole('link', { name: 'Open link' })).toHaveAttribute('href', '/queue');
  });
});
