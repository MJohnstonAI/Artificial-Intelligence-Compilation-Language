# AGENTS.md

This repository is designed to be usable by both human contributors and AI agents.

Treat this file as the lightweight operating memory for contributing to AICL.

## Project Identity

- Project: **AICL - Artificial Intelligence Compilation Language**
- Originator: **Marc Johnston**
- Organization: **NeuroSync AI Dynamics Pty Ltd**
- Project type: open research and development
- Priority: conceptual rigor over hype

## Core Rule

Do not rewrite AICL into a generic framework, prompt library, or vague manifesto.

The purpose of the project is to define a serious **AI-native semantic programming language**.

## Canonical Files

These are the core documents you should treat as authoritative:

- `README.md`
- `WHY_AICL.md`
- `MANIFESTO.md`
- `ABOUT_THE_ORIGINATOR.md`
- `AI_CONTRIBUTOR_GUIDE.md`
- `AGENTS.md`
- `SKILLS.md`
- `spec/programming-reference-manual.md`
- `spec/unified-spec-v1.0-draft.md`
- `spec/working-draft.md`
- `commentary/claude/latest-review.md`

## Repository Map for Agents

- `spec/` contains the formal and semi-formal language docs.
- `spec/schemas/` contains draft machine-readable schemas.
- `commentary/` contains review and synthesis commentary by model/source.
- `examples/` contains public examples, with `enterprise-service-resolution/` as the flagship serious example.
- `kernel/` is reserved for the future formal core.
- `wkg/core/` and `wkg/domains/` are reserved for ontology and type-grounding work.
- `tools/` is reserved for validators, parsers, and supporting utilities.

## Read Order

Before proposing changes, read:

1. `README.md`
2. `WHY_AICL.md`
3. `MANIFESTO.md`
4. `ABOUT_THE_ORIGINATOR.md`
5. `AI_CONTRIBUTOR_GUIDE.md`
6. `AGENTS.md`
7. `SKILLS.md`
8. `spec/programming-reference-manual.md`
9. `spec/unified-spec-v1.0-draft.md`
10. `commentary/claude/latest-review.md`

## Working Priorities

When making contributions, prioritize:

1. **Kernel precision**
   - type system
   - identifier resolution
   - constraints
   - budgets
   - proof annotations
2. **SHG semantics**
   - branching
   - parallelism
   - contradiction detection
   - adaptation boundaries
3. **Policy and capability soundness**
   - OpaqueIntent trust boundaries
   - IFC / information flow control
   - explicit policy attestation
4. **Agent / skill / workflow semantics**
   - skills as first-class concepts
   - workflow layer
   - delegation
   - multimodal semantics
5. **Teachability**
   - examples
   - schemas
   - readable manuals
   - human-reviewable canonical text

## Safe Editing Boundaries

- Preserve origin attribution.
- Prefer append-only conceptual refinement when editing drafts.
- Avoid overwriting major philosophical framing unless explicitly instructed.
- If identifying a flaw, propose a mechanically stronger replacement.
- Keep vision, formal semantics, runtime behavior, governance, and repo-support material distinct.

High-caution files:

- `README.md`
- `WHY_AICL.md`
- `MANIFESTO.md`
- `ABOUT_THE_ORIGINATOR.md`
- `spec/programming-reference-manual.md`
- `spec/unified-spec-v1.0-draft.md`
- `commentary/claude/latest-review.md`

## Things AI Agents Should Avoid

- Do not add hand-wavy slogans in technical sections.
- Do not invent security guarantees the spec does not support.
- Do not assume external tools are trusted by default.
- Do not collapse multiple semantics into single scalars when they affect proof obligations.
- Do not treat AICL as "just another DSL."
- Do not replace the serious enterprise example emphasis with toy or game-first positioning.

## Current Known Open Problems

- kernel grammar
- WKG-backed type resolution
- contradiction policy
- proof mechanism annotations
- formal ICC schema
- richer flow algebra
- autonomy dimensions
- skill registry semantics
- runtime adaptation envelope

## Good Contribution Pattern

When proposing a change:

1. State the problem.
2. State why the current form is insufficient.
3. Propose a precise alternative.
4. Explain downstream impact on proofs, runtime, tooling, schemas, and examples.
5. Update examples if the change affects syntax or semantics.

## First-Step Checklist for AI Agents

When newly attached to this repository:

1. Read the canonical files in the order above.
2. State one open problem explicitly before changing files.
3. Identify whether the target file is canonical, supporting, commentary, schema, or example material.
4. Tighten one part of the language or repository structure instead of widening scope casually.

## Mission

Help make AICL:

- more exact
- more implementable
- more reviewable
- more credible
- more useful to future AI and human contributors
