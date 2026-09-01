---
status: accepted
---

# CSS Modules, not Tailwind, for the published package

Tailwind is the default in most projects here, which makes CSS Modules the
surprising choice. But Tailwind classes shipped in `dist` only work if the
Consumer's own Tailwind build scans this package, so every Consumer needs
configuration — and Next.js and Nx setups each break that differently. CSS
Modules compile to one plain stylesheet that works everywhere with zero Consumer
setup.

## Consequences

Consumers import `@neftaliaguilar/ui/styles.css` once. Theming happens by
overriding Semantic Tokens (CSS custom properties), which needs no build step and
no JavaScript. Tailwind remains the right choice for applications we control; this
decision is scoped to the published library.
