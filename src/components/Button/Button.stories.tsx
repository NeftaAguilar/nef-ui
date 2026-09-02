import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select', options: ['solid', 'soft', 'outline', 'ghost', 'danger'] },
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] },
  },
  args: { children: 'Open', variant: 'solid', size: 'md' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button {...args} variant="solid">
        Solid
      </Button>
      <Button {...args} variant="soft">
        Soft
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="danger">
        Danger
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Button {...args} size="xs">
        Xs
      </Button>
      <Button {...args} size="sm">
        Sm
      </Button>
      <Button {...args} size="md">
        Md
      </Button>
      <Button {...args} size="lg">
        Lg
      </Button>
      <Button {...args} size="xl">
        Xl
      </Button>
      <Button {...args} size="xxl">
        Xxl
      </Button>
    </div>
  ),
};

/** The label is dimmed, not removed — the button keeps its width and its accessible name. */
export const Loading: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Button {...args}>Open</Button>
      <Button {...args} loading>
        Open
      </Button>
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

/** `asChild` hands the styling to another element — here, a link. */
export const AsLink: Story = {
  render: (args) => (
    <Button {...args} asChild>
      <a href="#">Open link</a>
    </Button>
  ),
};
