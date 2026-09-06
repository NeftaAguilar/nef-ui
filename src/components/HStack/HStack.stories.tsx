import type { Meta, StoryObj } from '@storybook/react-vite';
import { HStack } from './HStack';

const meta = {
  title: 'Layout/HStack',
  component: HStack,
} satisfies Meta<typeof HStack>;

export default meta;
type Story = StoryObj<typeof meta>;

const swatch = (label: string) => (
  <div
    key={label}
    style={{
      display: 'grid',
      placeItems: 'center',
      width: '3rem',
      height: '3rem',
      borderRadius: 'var(--nef-radius-2)',
      backgroundColor: 'var(--nef-accent-surface)',
      color: 'var(--nef-accent-text)',
    }}
  >
    {label}
  </div>
);

/** HStack itself sets no gap — this one adds it via `style`, exactly as a consumer would. */
export const Playground: Story = {
  render: (props) => (
    <HStack {...props} style={{ gap: 'var(--nef-space-md)' }}>
      {['1', '2', '3'].map(swatch)}
    </HStack>
  ),
};

export const WithoutGap: Story = {
  render: (props) => <HStack {...props}>{['1', '2', '3'].map(swatch)}</HStack>,
};
