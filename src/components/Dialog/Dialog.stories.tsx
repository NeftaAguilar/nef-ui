import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { TextField } from '../TextField/TextField';
import { Dialog } from './Dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog.Content,
  // Each story renders its own tree; this only satisfies the required prop.
  args: { title: 'Edit post' },
} satisfies Meta<typeof Dialog.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Edit post</Button>
      </Dialog.Trigger>
      <Dialog.Content
        title="Edit post"
        description="Changes apply to the queued post only."
        footer={
          <>
            <Dialog.Close asChild>
              <Button variant="outline">Cancel</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button>Save changes</Button>
            </Dialog.Close>
          </>
        }
      >
        <TextField label="Post title" defaultValue="Shipping the design system" />
      </Dialog.Content>
    </Dialog>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="danger">Delete channel</Button>
      </Dialog.Trigger>
      <Dialog.Content
        title="Delete this channel?"
        description="Queued posts for this channel will not be published. This cannot be undone."
        footer={
          <>
            <Dialog.Close asChild>
              <Button variant="outline">Keep channel</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button variant="danger">Delete channel</Button>
            </Dialog.Close>
          </>
        }
      />
    </Dialog>
  ),
};

/** Without a description, Radix's warning is opted out of explicitly. */
export const TitleOnly: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Connect a channel</Button>
      </Dialog.Trigger>
      <Dialog.Content title="Connect a channel">
        <p style={{ margin: 0 }}>Pick a network to connect.</p>
      </Dialog.Content>
    </Dialog>
  ),
};
