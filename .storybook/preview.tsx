import type { Decorator, Preview } from '@storybook/react-vite';
import '../src/styles/index.css';

/** Lets every story be checked against both Themes from the toolbar. */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as 'light' | 'dark';
  return (
    <div
      data-theme={theme}
      style={{
        background: 'var(--nef-bg)',
        color: 'var(--nef-fg)',
        fontFamily: 'var(--nef-font-sans)',
        padding: 'var(--nef-space-6)',
        minHeight: '100vh',
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  initialGlobals: { theme: 'light' },
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: { matchers: { color: /(background|color)$/i } },
    a11y: { test: 'error' },
    // Every component here animates in with CSS. Without this, Chromatic pauses
    // at the animation's first frame, snapshotting popovers/dialogs mid-fade.
    chromatic: { pauseAnimationAtEnd: true },
  },
};

export default preview;
