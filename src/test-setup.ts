import '@testing-library/jest-dom/vitest';
import { expect } from 'vitest';
import * as axeMatchers from 'vitest-axe/matchers';

// `toHaveNoViolations` — used on the Components whose accessibility contract is
// non-trivial, not as a blanket assertion on every render.
expect.extend(axeMatchers);

/*
 * jsdom implements neither the Pointer Events capture API nor scrollIntoView,
 * both of which Radix's overlay Primitives call. Stubbing them here keeps the
 * stubs out of the individual specs.
 */
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
  Element.prototype.setPointerCapture = () => {};
  Element.prototype.releasePointerCapture = () => {};
}
Element.prototype.scrollIntoView = () => {};

// jsdom has no ResizeObserver; Radix's positioning and the Tabs indicator both
// construct one. A no-op is enough — nothing in jsdom ever resizes.
if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
