import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HStack } from './HStack';

describe('HStack', () => {
  it('lays its children out on the horizontal axis', () => {
    render(<HStack data-testid="stack">Item</HStack>);

    expect(screen.getByTestId('stack')).toHaveStyle({ display: 'flex', flexDirection: 'row' });
  });

  it('merges a consumer className, leaving gap/margin/padding to the consumer', () => {
    render(
      <HStack className="gap-3" data-testid="stack">
        Item
      </HStack>,
    );

    expect(screen.getByTestId('stack')).toHaveClass('gap-3');
  });
});
