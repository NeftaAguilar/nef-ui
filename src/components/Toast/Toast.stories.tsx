import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
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

export const Playground: Story = {
  render: () => <Demo description="It will publish at 09:00 tomorrow." tone="success" />,
};

export const WithAction: Story = {
  render: () => (
    <Demo
      description="It will publish at 09:00 tomorrow."
      tone="success"
      action={{ label: 'Undo', altText: 'Undo scheduling this post' }}
    />
  ),
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
};

export const TitleOnly: Story = { render: () => <Demo title="Draft saved" /> };
