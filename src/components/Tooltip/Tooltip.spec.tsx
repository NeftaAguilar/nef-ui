import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Button } from '../Button/Button';
import { Tooltip, TooltipProvider } from './Tooltip';

function Example({ content }: { content?: string }) {
  return (
    <TooltipProvider>
      <Tooltip content={content ?? 'Adds this item'} delayDuration={0}>
        <Button aria-label="Add">+</Button>
      </Tooltip>
    </TooltipProvider>
  );
}

describe('Tooltip', () => {
  it('shows on keyboard focus, not only on hover', async () => {
    render(<Example />);

    await userEvent.tab();

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Adds this item');
  });

  it('leaves the trigger to supply its own accessible name', async () => {
    render(<Example />);
    await userEvent.tab();
    await screen.findByRole('tooltip');

    // The tooltip describes the button; it must not become the button's name.
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('renders the trigger untouched when there is no content', () => {
    render(
      <TooltipProvider>
        <Tooltip content={null}>
          <Button aria-label="Add">+</Button>
        </Tooltip>
      </TooltipProvider>,
    );

    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
