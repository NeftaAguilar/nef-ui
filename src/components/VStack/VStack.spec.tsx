import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VStack } from './VStack';

describe('VStack', () => {
  it('lays its children out on the vertical axis', () => {
    render(<VStack data-testid="stack">Item</VStack>);

    expect(screen.getByTestId('stack')).toHaveStyle({ display: 'flex', flexDirection: 'column' });
  });

  it('merges a consumer className, leaving gap/margin/padding to the consumer', () => {
    render(
      <VStack className="gap-3" data-testid="stack">
        Item
      </VStack>,
    );

    expect(screen.getByTestId('stack')).toHaveClass('gap-3');
  });
});
