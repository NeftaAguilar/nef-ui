---
status: accepted
---

# Build on Radix now, migrate to Base UI deliberately later

Base UI reached stable v1.0 in December 2025 and is quickly becoming the new
default primitive layer across the ecosystem, so starting on Radix is the
non-obvious choice. I'm doing it anyway: I want the migration itself. Moving a
whole primitive layer under a design system, live, is a skill I don't have yet,
and this project is a low-stakes place to build it before I need it somewhere
that matters more.

## Consequences

I'm explicitly **not** building an abstraction layer over Radix to make that
future migration cheap. A speculative indirection layer would cost real
complexity now, hide the migration when it happens, and defeat the point —
a migration I'm merely _prepared for_ teaches me nothing. Components import
Radix directly. Containing the blast radius is the job of the Component
boundary, which exists anyway.
