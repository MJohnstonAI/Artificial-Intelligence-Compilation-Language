# AI Model Evaluation Guide

## Purpose

This guide helps external reviewers evaluate AICL with an AI model in a repeatable way.

The review should test the model's ability to reason about AICL as an AI-native semantic programming language, not as a prompt library, generic framework, or conventional human-first DSL.

## Recommended Inputs

Provide the model these files first:

1. [`../../README.md`](../../README.md)
2. [`../../WHY_AICL.md`](../../WHY_AICL.md)
3. [`../../MANIFESTO.md`](../../MANIFESTO.md)
4. [`../../AI_CONTRIBUTOR_GUIDE.md`](../../AI_CONTRIBUTOR_GUIDE.md)
5. [`../kernel/README.md`](../kernel/README.md)
6. [`../kernel/SHG_SCHEMA.md`](../kernel/SHG_SCHEMA.md)
7. [`../kernel/HAIG_SPEC.md`](../kernel/HAIG_SPEC.md)
8. [`../kernel/PACT_COORDINATION_SPEC.md`](../kernel/PACT_COORDINATION_SPEC.md)
9. [`../kernel/MATERIALIZER_INTERFACE.md`](../kernel/MATERIALIZER_INTERFACE.md)
10. [`../kernel/KERNEL_v0.1.1_PATCH_NOTES.md`](../kernel/KERNEL_v0.1.1_PATCH_NOTES.md)
11. [`../kernel/semantic/`](../kernel/semantic/)
12. [`../research/README.md`](../research/README.md)

If the context window is limited, start with the root README, kernel README, SHG schema, HAIG spec, PACT spec, materializer interface, and research README.

## Evaluation Questions

Ask the model to answer:

1. What is AICL's semantic source of truth?
2. Does the model distinguish Kernel v0.1.1 from research-track proposals?
3. Are SHG, HAIG, PACT, materializers, WKG grounding, and proof obligations internally coherent?
4. Are any claims stronger than the documents support?
5. Are there contradictions between canonical files?
6. What blocks early implementation?
7. What should remain research-only?

## Finding Quality Bar

Useful findings are specific and mechanically actionable.

Avoid findings that only say:

- "needs more detail",
- "could be clearer",
- "sounds interesting",
- "should use blockchain/quantum/agents",
- "make it production-ready."

Prefer findings that identify:

- an undefined term,
- a mismatched schema field,
- a broken invariant,
- an unresolved authority boundary,
- a proof-tier conflict,
- an implementation blocker,
- a document that claims more than the kernel supports.

## Output Format

Use [`STRUCTURED_FINDINGS_TEMPLATE.md`](STRUCTURED_FINDINGS_TEMPLATE.md).

Each finding should include severity:

- `Critical`: blocks coherent kernel interpretation or creates unsafe/false guarantees.
- `Major`: blocks implementation, validation, or reviewer understanding.
- `Minor`: local inconsistency, missing cross-link, wording ambiguity, or teachability issue.
- `Question`: requires project-owner decision before change.

## Review Boundary

Do not ask the model to rewrite AICL into another language, a generic agent framework, or a prompt format.

The correct review posture is:

> Treat AICL as an AI-native semantic compilation language. Evaluate whether the current repository makes that language more exact, implementable, reviewable, and credible.
