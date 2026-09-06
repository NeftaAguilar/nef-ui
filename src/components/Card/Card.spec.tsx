import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders its children', () => {
    render(<Card>Body</Card>);

    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('merges a consumer className with its own', () => {
    render(<Card className="widget">Body</Card>);

    expect(screen.getByText('Body')).toHaveClass('widget');
  });

  it('forwards arbitrary div props, such as a ref target', () => {
    render(<Card data-testid="card">Body</Card>);

    expect(screen.getByTestId('card')).toBeInTheDocument();
  });
});
