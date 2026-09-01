import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Tabs } from './Tabs';

function Example() {
  return (
    <Tabs defaultValue="queue">
      <Tabs.List aria-label="Publishing">
        <Tabs.Trigger value="queue">Queue</Tabs.Trigger>
        <Tabs.Trigger value="drafts">Drafts</Tabs.Trigger>
        <Tabs.Trigger value="sent">Sent</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="queue">Queued posts</Tabs.Content>
      <Tabs.Content value="drafts">Draft posts</Tabs.Content>
      <Tabs.Content value="sent">Sent posts</Tabs.Content>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('shows only the selected panel', () => {
    render(<Example />);

    expect(screen.getByText('Queued posts')).toBeInTheDocument();
    expect(screen.queryByText('Draft posts')).not.toBeInTheDocument();
  });

  it('moves between tabs with the arrow keys', async () => {
    render(<Example />);

    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'Drafts' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Draft posts')).toBeInTheDocument();
  });

  it('keeps the indicator out of the accessibility tree', () => {
    const { container } = render(<Example />);

    // Three tabs, and the indicator must not read as a fourth.
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('drives the indicator from the selected tab', async () => {
    render(<Example />);
    const list = screen.getByRole('tablist');

    // jsdom reports zero layout, so this asserts the wiring, not the geometry:
    // the hook must publish both custom properties once it has measured.
    expect(list.style.getPropertyValue('--nef-tab-indicator-width')).not.toBe('');
    expect(list.style.getPropertyValue('--nef-tab-indicator-left')).not.toBe('');
  });
});
