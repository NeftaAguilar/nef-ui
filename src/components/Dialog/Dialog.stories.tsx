import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { TextField } from '../TextField/TextField';
import { Dialog } from './Dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog.Content,
  // Each story renders its own tree; this only satisfies the required prop.
  args: { title: 'Dialog title' },
} satisfies Meta<typeof Dialog.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content
        title="Edit item"
        description="Changes apply to this item only."
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
        <TextField label="Title" defaultValue="Untitled" />
      </Dialog.Content>
    </Dialog>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="danger">Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content
        title="Delete this item?"
        description="This cannot be undone."
        footer={
          <>
            <Dialog.Close asChild>
              <Button variant="outline">Cancel</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button variant="danger">Delete</Button>
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
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content title="Connect">
        <p style={{ margin: 0 }}>Pick an option to connect.</p>
      </Dialog.Content>
    </Dialog>
  ),
};
