import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { TextField } from './TextField';

describe('TextField', () => {
  it('associates the label with the control', async () => {
    render(<TextField label="Channel name" />);

    await userEvent.type(screen.getByLabelText('Channel name'), 'Buffer');

    expect(screen.getByLabelText('Channel name')).toHaveValue('Buffer');
  });

  it('describes the control with its hint', () => {
    render(<TextField label="Channel name" hint="Shown on your public profile." />);

    expect(screen.getByLabelText('Channel name')).toHaveAccessibleDescription(
      'Shown on your public profile.',
    );
  });

  it('marks the control invalid and announces the error', () => {
    render(<TextField label="Channel name" error="Name is already taken." />);

    const input = screen.getByLabelText('Channel name');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Name is already taken.');
    expect(screen.getByRole('alert')).toHaveTextContent('Name is already taken.');
  });

  it('shows the error instead of the hint when both are given', () => {
    render(<TextField label="Channel name" hint="Public." error="Taken." />);

    expect(screen.queryByText('Public.')).not.toBeInTheDocument();
    expect(screen.getByText('Taken.')).toBeInTheDocument();
  });

  it('has no axe violations in its error state', async () => {
    const { container } = render(<TextField label="Channel name" error="Taken." />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
