# @neftaliaguilar/ui

A small, accessible React component library built on [Radix Primitives](https://www.radix-ui.com/primitives),
styled with CSS Modules and themed with CSS custom properties.

Ten components, two runtime dependencies, one stylesheet. No Tailwind config, no
build setup, and no runtime animation library required of the app that installs it.

## Install

```sh
pnpm add @neftaliaguilar/ui react react-dom
```

Import the stylesheet **once**, at the root of your app:

```tsx
import '@neftaliaguilar/ui/styles.css';
```

Then use the components:

```tsx
import { Button, Dialog, TextField } from '@neftaliaguilar/ui';
```

### Next.js (App Router)

Put the stylesheet import in `app/layout.tsx`. The components are client
components, so use them from a `'use client'` file or a client boundary.

### Nx

Nothing special — it is a plain npm package. Install it in the workspace root and
import the stylesheet in the app's entry point, not in a library.

## Theming

Components only ever reference **Semantic Tokens**, so a theme is a set of CSS
custom property overrides. No JavaScript, no build step:

```css
:root {
  --nef-accent: #6d28d9;
  --nef-accent-hover: #5b21b6;
  --nef-radius-2: 0.5rem;
}
```

Dark mode ships built in — set `data-theme="dark"` on any ancestor:

```html
<html data-theme="dark"></html>
```

The full token list is in [`src/styles/tokens.css`](./src/styles/tokens.css).

## Components

| Component      | Primitive            | Notes                                           |
| -------------- | -------------------- | ----------------------------------------------- |
| `Card`         | —                    | Static surface; own padding, no margin          |
| `HStack`       | —                    | Flex row only; no gap/margin/padding props      |
| `VStack`       | —                    | Flex column only; no gap/margin/padding props   |
| `Skeleton`     | —                    | Loading placeholder; sized via `style`          |
| `Button`       | Slot (for `asChild`) | 5 variants, 3 sizes, width-stable loading       |
| `TextField`    | Label                | Label required; hint + error wiring             |
| `Textarea`     | Label                | Live character count that never truncates       |
| `Select`       | Select               | Trigger-width matching, grouping                |
| `Switch`       | Switch               | Composited thumb transition                     |
| `Dialog`       | Dialog               | Title required; focus trap and return           |
| `DropdownMenu` | DropdownMenu         | Decorative shortcuts, destructive items         |
| `Tooltip`      | Tooltip              | Describes, never names                          |
| `Tabs`         | Tabs                 | Sliding indicator, measured in JS, moved in CSS |
| `Toast`        | Toast                | Swipe to dismiss, action `altText` required     |

## Development

```sh
pnpm install
pnpm storybook        # Storybook on :6006
pnpm test             # Vitest
pnpm lint             # ESLint
pnpm types:check      # tsc --noEmit
pnpm build            # ESM + CJS + .d.ts + styles.css into dist/
```

To try the package in another app before publishing:

```sh
pnpm build && pnpm link --global
# in the consuming app
pnpm link --global @neftaliaguilar/ui
```

### CI

Every push to `main` and every pull request against it runs a
[Visual Regression Test](./.github/workflows/chromatic.yml) via
[Chromatic](https://www.chromatic.com/), diffing Storybook snapshots
(`onlyChanged: true`) against the baseline. It only triggers on `.tsx`
changes, so config or doc-only commits don't burn a Chromatic build. The step
is skipped, not failed, on pull requests from forks, since those don't have
access to the `CHROMATIC_PROJECT_TOKEN` secret. Run it locally with:

```sh
pnpm chromatic
```

## Design decisions

The reasoning behind the shape of this package lives in
[`docs/adr/`](./docs/adr), and the vocabulary it is built on is in
[`CONTEXT.md`](./CONTEXT.md). The short version:

- **Radix now, Base UI later, on purpose** — and with no abstraction layer in
  between ([ADR-0001](./docs/adr/0001-radix-now-base-ui-later.md)).
- **CSS Modules, not Tailwind**, because a published package should not require
  configuration from the app that installs it
  ([ADR-0002](./docs/adr/0002-css-modules-over-tailwind.md)).
- **No runtime animation dependency** — Radix's `data-state` attributes are
  enough for CSS to do the work
  ([ADR-0003](./docs/adr/0003-css-animation-no-runtime-dependency.md)).

## License

MIT
