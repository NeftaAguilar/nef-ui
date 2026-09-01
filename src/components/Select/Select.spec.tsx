import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Select } from './Select';

function Example(props: { onValueChange?: (v: string) => void; error?: string }) {
  return (
    <Select label="Channel" placeholder="Pick a channel" {...props}>
      <Select.Item value="x">X</Select.Item>
      <Select.Item value="linkedin">LinkedIn</Select.Item>
      <Select.Item value="mastodon" disabled>
        Mastodon
      </Select.Item>
    </Select>
  );
}

describe('Select', () => {
  it('labels the trigger and shows the placeholder when empty', () => {
    render(<Example />);

    expect(screen.getByLabelText('Channel')).toHaveTextContent('Pick a channel');
  });

  it('selects a value with the keyboard', async () => {
    const onValueChange = vi.fn();
    render(<Example onValueChange={onValueChange} />);

    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard('{ArrowDown}{Enter}');

    expect(onValueChange).toHaveBeenCalledWith('linkedin');
  });

  it('skips disabled options', async () => {
    render(<Example />);
    await userEvent.click(screen.getByLabelText('Channel'));

    expect(screen.getByRole('option', { name: 'Mastodon' })).toHaveAttribute('data-disabled', '');
  });

  it('marks the trigger invalid and announces the error', () => {
    render(<Example error="Pick a channel to continue." />);

    expect(screen.getByLabelText('Channel')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Pick a channel to continue.');
  });
});
