import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { screen, userEvent, within } from 'storybook/test';
import { Button } from '../Button/Button';
import { Toast } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  args: { title: 'Post scheduled' },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo({ tone, ...toast }: Partial<React.ComponentProps<typeof Toast>>) {
  const [open, setOpen] = useState(false);
  return (
    <Toast.Provider swipeDirection="right">
      <Button onClick={() => setOpen(true)}>Show toast</Button>
      <Toast
        {...toast}
        tone={tone}
        title={toast.title ?? 'Post scheduled'}
        open={open}
        onOpenChange={setOpen}
      />
      <Toast.Viewport />
    </Toast.Provider>
  );
}

// The toast is closed until the demo button is clicked, so every story opens
// it itself and waits for its title to confirm the toast actually rendered.
async function openToast({ canvasElement }: { canvasElement: HTMLElement }, title: string) {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('button', { name: 'Show toast' }));
  await screen.findByText(title);
}

export const Playground: Story = {
  render: () => <Demo description="It will publish at 09:00 tomorrow." tone="success" />,
  play: (context) => openToast(context, 'Post scheduled'),
};

export const WithAction: Story = {
  render: () => (
    <Demo
      description="It will publish at 09:00 tomorrow."
      tone="success"
      action={{ label: 'Undo', altText: 'Undo scheduling this post' }}
    />
  ),
  play: (context) => openToast(context, 'Post scheduled'),
};

export const Failure: Story = {
  render: () => (
    <Demo
      title="Could not publish"
      description="X rejected the post. Reconnect the channel and try again."
      tone="danger"
      action={{ label: 'Retry', altText: 'Retry publishing this post' }}
    />
  ),
  play: (context) => openToast(context, 'Could not publish'),
};

export const TitleOnly: Story = {
  render: () => <Demo title="Draft saved" />,
  play: (context) => openToast(context, 'Draft saved'),
};
