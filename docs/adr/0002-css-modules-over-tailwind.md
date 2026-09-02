---
status: accepted
---

# CSS Modules, not Tailwind, for the published package

Tailwind is my default in most projects, which makes CSS Modules the surprising
choice here. But Tailwind classes shipped in `dist` only work if the Consumer's
own Tailwind build scans this package, so every Consumer needs configuration —
and Next.js and Nx setups each break that differently. CSS Modules compile to
one plain stylesheet that works everywhere with zero Consumer setup.

## Consequences

Consumers import `@neftaliaguilar/ui/styles.css` once. Theming happens by
overriding Semantic Tokens (CSS custom properties), which needs no build step and
no JavaScript. I still reach for Tailwind in the applications I control; this
decision is scoped to the published library.
