# Reviewer Quickstart

## If you have 10 minutes

1. `README.md`
2. `WHY_AICL.md`
3. `PUBLIC_STATUS.md`
4. `examples/enterprise-service-resolution/README.md`

## If you have 30 minutes

1. Read the 10-minute path.
2. Read `GLOSSARY.md`.
3. Read `ROADMAP.md`.
4. Skim `spec/architecture/AICL_Architecture_Snapshot_v1.md`.
5. Skim `wkg/core/aicl-core-ontology-spec.md`.

## If you want to critique the language

Focus on:

- type authority and WKG grounding
- proof-boundary clarity
- operational semantics
- compile-time/runtime boundary handling
- schema/example consistency
- OpaqueIntent trust boundaries
- materializer assumptions

## If you are an AI agent reviewing the repository

Start with `AI_CONTRIBUTOR_GUIDE.md` and `AGENTS.md`, then follow the canonical read order. Produce findings as contradictions, missing obligations, unclear semantics, or minimal improvement proposals rather than broad rewrites.

## What useful feedback looks like

- contradiction reports
- proof-boundary problems
- unclear type authority
- weak operational semantics
- schema/example mismatch
- compile-time/runtime boundary confusion
- precise related-work suggestions
- minimal wording fixes for overclaims

## What less useful feedback looks like

- "Python can do this" without identifying the semantic layer being compared
- hype-only praise
- rewriting AICL into a generic app framework
- claiming AICL is impossible without identifying a specific contradiction
- asking the project to remove its AI-native premise
