import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('associates the label with the control', () => {
    render(<Textarea label="What's happening?" defaultValue="Shipping today" />);

    expect(screen.getByLabelText("What's happening?")).toHaveValue('Shipping today');
  });

  it('counts characters against the limit', () => {
    render(<Textarea label="Post" maxLength={280} value="Hello" onChange={() => {}} />);

    expect(screen.getByText('5 / 280')).toBeInTheDocument();
  });

  it('flags the control invalid once the limit is exceeded, without truncating', () => {
    render(<Textarea label="Post" maxLength={3} value="Hello" onChange={() => {}} />);

    const textarea = screen.getByLabelText('Post');
    expect(textarea).toHaveValue('Hello');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('5 / 3')).toBeInTheDocument();
  });

  it('stays valid at exactly the limit', () => {
    render(<Textarea label="Post" maxLength={5} value="Hello" onChange={() => {}} />);

    expect(screen.getByLabelText('Post')).not.toHaveAttribute('aria-invalid');
  });
});
