# Contributing

Thank you for your interest in AICL.

## Before You Contribute
Please read:
- `README.md`
- `WHY_AICL.md`
- `MANIFESTO.md`
- `spec/programming-reference-manual.md`
- `spec/unified-spec-v1.0-draft.md`
- `AGENTS.md`
- `SKILLS.md`

## Contribution Types
We welcome:
- formal critique
- language design proposals
- kernel grammar refinements
- proof system proposals
- WKG ontology design
- example programs
- reference implementation scaffolding
- tooling and validators

## How to Contribute
1. Open an issue describing the problem or proposal.
2. Explain whether it affects:
   - kernel
   - SHG
   - WKG
   - runtime
   - workflow
   - documentation
3. If proposing syntax or semantics, include:
   - rationale
   - example
   - compatibility impact
   - proof / policy implications

## Style
- be precise
- preserve attribution
- avoid hype-only edits
- prefer mechanical clarity over slogans

## Pull Request Scope

Keep pull requests narrow. Do not mix unrelated changes such as examples, kernel semantics, public positioning, schemas, and issue templates in one PR unless the relationship is explicit.

## Public-Readiness Rules

Before opening public-facing changes, check:

- no production compiler claim
- no certified safety claim
- no official external integration claim
- no private product/game references
- examples and schemas remain consistent
- JSON files validate

## Validation

Run JSON validation before submitting schema/example changes:

```bash
find . -name "*.json" -print0 | xargs -0 -n1 jq empty
```
