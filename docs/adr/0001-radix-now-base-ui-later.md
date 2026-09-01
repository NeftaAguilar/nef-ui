---
status: accepted
---

# Build on Radix now, migrate to Base UI deliberately later

Base UI reached stable v1.0 in December 2025 and became shadcn/ui's default
primitive layer in July 2026, so starting on Radix is the non-obvious choice. We
chose it anyway: performing the migration is itself the goal, as first-hand
experience of a primitive-layer swap and as visible evidence of it.

## Consequences

We are explicitly **not** building an abstraction layer over Radix to make that
migration cheap. A speculative indirection layer would cost real complexity now,
hide the migration when it happens, and defeat the point — a migration you are
merely _prepared for_ is invisible to a reader. Components import Radix directly.
Containing the blast radius is the job of the Component boundary, which exists
anyway.
