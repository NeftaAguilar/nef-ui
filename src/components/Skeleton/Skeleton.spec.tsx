import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('is hidden from assistive tech by default', () => {
    render(<Skeleton data-testid="skeleton" />);

    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'true');
  });

  it('merges a consumer className, leaving sizing to the consumer', () => {
    render(<Skeleton className="avatar" data-testid="skeleton" />);

    expect(screen.getByTestId('skeleton')).toHaveClass('avatar');
  });

  it('lets a consumer override aria-hidden', () => {
    render(<Skeleton aria-hidden="false" data-testid="skeleton" />);

    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'false');
  });
});
