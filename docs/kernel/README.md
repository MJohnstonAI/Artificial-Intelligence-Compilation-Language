# AICL Kernel v0.1.1

This directory defines the **contract layer** of the AICL kernel.

The contract layer is the minimum build-facing specification required for AI-model evaluation, compiler planning, and early implementation work.

It defines the interfaces between:

- ICC
- WKG grounding
- SHG
- proof obligations
- HAIG escalation
- PACT coordination
- materializers
- residual runtime obligations

## Kernel Contract Files

- [`SHG_SCHEMA.md`](SHG_SCHEMA.md) - canonical SHG node and hyperedge schema
- [`HAIG_SPEC.md`](HAIG_SPEC.md) - Human-AI Integration Gate arbitration protocol
- [`PACT_COORDINATION_SPEC.md`](PACT_COORDINATION_SPEC.md) - policy-aware multi-agent coordination protocol
- [`MATERIALIZER_INTERFACE.md`](MATERIALIZER_INTERFACE.md) - contract between SHG and target artifacts
- [`KERNEL_v0.1.1_PATCH_NOTES.md`](KERNEL_v0.1.1_PATCH_NOTES.md) - consolidation notes and integration instructions

## Supporting Semantic Layer

Detailed formalization and analysis documents live in:

- [`semantic/`](semantic/)

These include the first-pass kernel formalization, state model, proof tier semantics, compile/runtime boundary, operational semantics, extraction report, consistency report, and minimal example.

## Status

AICL Kernel v0.1.1 is a **draft formal kernel specification** suitable for:

- AI-model evaluation
- contradiction testing
- early compiler architecture planning
- materializer interface design

It is not yet:

- a production compiler
- a complete executable language
- proof-complete
- materializer-complete
- academically finalized

## Design Boundary

AICL is not a human-first programming language and should not be evaluated as "a nicer Python," "a better Rust," or "just another DSL."

AICL is an AI-native semantic compilation layer. Conventional languages may be materialization targets, but they are not the semantic source of truth.
