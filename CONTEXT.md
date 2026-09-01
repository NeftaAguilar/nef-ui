# nef-design-system

A small React component library, published to npm, built as portfolio evidence of
front-end craft. Its vocabulary distinguishes the layers a component is assembled
from, because keeping those layers apart is what lets the primitive library be
swapped later.

## Language

**Primitive**:
An unstyled, behavioural building block from Radix — the accessibility, keyboard
handling and state machine, with no appearance. The layer we intend to replace
with Base UI later.
_Avoid_: headless component, base component

**Component**:
The exported, styled unit a consumer imports (`Button`, `Dialog`). Wraps a
Primitive, or is written from scratch when no Primitive is needed.
_Avoid_: widget, element, control

**Primitive Token**:
A raw, meaningless value in a scale — `--nef-gray-9`, `--nef-space-3`. Never
referenced by a Component.
_Avoid_: base token, core token, global token

**Semantic Token**:
A named role that resolves to a Primitive Token — `--nef-bg`, `--nef-accent`.
The only tier a Component is allowed to reference, and the only tier a consumer
overrides to theme.
_Avoid_: alias token, decision token, applied token

**Theme**:
A complete set of Semantic Token values, selected by the `data-theme` attribute.
_Avoid_: mode, skin, palette

**Recipe**:
The CSS Module owned by a single Component, holding its variants and states.
_Avoid_: styles, variants, stylesheet

**Consumer**:
An application installing the published package — a Next.js app, an Nx workspace
library, or a plain React project.
_Avoid_: client, user, host

## Non-goals

Recorded because each was considered and deliberately excluded, and a reader will
otherwise assume they were forgotten:

- **No color-scale generator.** The palette is hand-authored.
- **No migration abstraction layer** over Radix. See ADR-0001.
- **No runtime animation dependency.** See ADR-0003.
- **No monorepo.** One package, one build.
