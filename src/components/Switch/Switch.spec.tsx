import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  it('toggles when its label is clicked', async () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="Auto-schedule" onCheckedChange={onCheckedChange} />);

    await userEvent.click(screen.getByText('Auto-schedule'));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('exposes its state to assistive technology', () => {
    render(<Switch label="Auto-schedule" checked onCheckedChange={() => {}} />);

    expect(screen.getByRole('switch', { name: 'Auto-schedule' })).toBeChecked();
  });

  it('is operable with the keyboard', async () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="Auto-schedule" onCheckedChange={onCheckedChange} />);

    await userEvent.tab();
    await userEvent.keyboard(' ');

    expect(screen.getByRole('switch')).toHaveFocus();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('renders without a wrapper when unlabelled', () => {
    render(<Switch aria-label="Auto-schedule" />);

    expect(screen.getByRole('switch', { name: 'Auto-schedule' })).toBeInTheDocument();
  });
});
