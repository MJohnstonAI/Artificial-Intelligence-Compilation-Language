# AICL Unified Spec Draft v1.0

**Status:** Synthesis target for convergence across the current AICL document set.

This file is not yet the most detailed specification artifact. That role currently belongs to [`spec/programming-reference-manual.md`](programming-reference-manual.md). The role of this draft is to become the first coherent synthesis target for the language once the current inputs are reconciled.

## Companion Inputs

This draft should converge material from:

- [`spec/programming-reference-manual.md`](programming-reference-manual.md)
- [`spec/working-draft.md`](working-draft.md)
- [`spec/schemas/`](schemas/)
- [`commentary/claude/latest-review.md`](../commentary/claude/latest-review.md)
- [`commentary/gemini/README.md`](../commentary/gemini/README.md)
- [`commentary/grok/README.md`](../commentary/grok/README.md)
- [`commentary/chatgpt/README.md`](../commentary/chatgpt/README.md)
- [`examples/enterprise-service-resolution/README.md`](../examples/enterprise-service-resolution/README.md)

## Current Editorial Principle

AICL should become smaller at the kernel, sharper in semantics, and broader only through well-defined layers.

This draft should not invent new semantics casually. It should absorb, reconcile, and organize the strongest current material already present in the repository.

## Immediate Integration Targets

1. WKG-backed nominal type system
2. Proof mechanism annotations
3. IFC semantics for OpaqueIntent
4. Contradiction detection policy
5. ICC formal schema
6. Flow algebra with branching / parallel / proof gates
7. Multi-dimensional autonomy
8. Skill layer formalization
9. Multimodal evidence semantics
10. Runtime adaptation envelope

## Convergence Discipline

When promoting content into this draft:

- use the programming reference manual as the strongest current technical baseline
- use Claude commentary as authoritative review input
- use Gemini, Grok, and ChatGPT commentary as specialist commentary inputs
- use schemas as machine-readable companions, not as replacements for textual semantics
- keep the flagship example aligned with the formal docs

## Near-Term Merge Notes

The first mature version of this draft should explicitly synthesize:

- kernel declarations and typing rules
- proof and policy semantics
- OpaqueIntent trust boundaries
- schema alignment points
- commentary findings that affect normative wording
- flagship example references and consistency notes

## Practical Use Right Now

Until this draft is more complete:

- use [`spec/programming-reference-manual.md`](programming-reference-manual.md) for the most detailed language semantics
- use [`spec/working-draft.md`](working-draft.md) for collaboration-layer notes
- use [`commentary/claude/latest-review.md`](../commentary/claude/latest-review.md) to understand the highest-priority precision upgrades
