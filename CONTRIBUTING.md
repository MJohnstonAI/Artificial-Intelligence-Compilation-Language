# Contributing

Contributions are welcome when they preserve AICL's AI-native premise.

AICL is not a conventional human-first programming language, a prompt-template framework, or a wrapper around Python. It is a research specification for AI-native semantic compilation: semantic contracts, WKG-grounded meaning, ICC, SHG, proof obligations, capability containment, policy-bounded autonomy, provenance, and materialization targets.

Do not submit proposals whose main purpose is to make AICL resemble a conventional human-first programming language.

## Before You Contribute

Please read:

- `README.md`
- `docs/foundations/FOUNDATIONAL_THESIS.md`
- `docs/foundations/WHAT_AICL_IS_NOT.md`
- `docs/foundations/HUMAN_REVIEW_BOUNDARY.md`
- `docs/foundations/LEGACY_LANGUAGE_MISREADINGS.md`
- `docs/kernel/KERNEL_WEAK_POINTS_REGISTER.md`
- `docs/evaluation/AI_MODEL_EVALUATION_PROTOCOL.md`
- `WHY_AICL.md`
- `MANIFESTO.md`
- `spec/programming-reference-manual.md`
- `spec/unified-spec-v1.0-draft.md`
- `AGENTS.md`
- `SKILLS.md`

## Contribution Categories

1. AI model evaluation reports
2. Contradiction reports
3. Challenge briefs
4. Related work suggestions
5. Kernel semantics proposals
6. Example ICC/SHG artifacts

## Contribution Boundary

Useful contributions should improve AICL's semantic precision, implementability, reviewability, and AI-native coherence.

In scope:

- identifying contradictions across documents
- finding underspecified type authority, proof tiers, grammar/IR separation, operational semantics, or compile/runtime boundaries
- submitting AI model evaluations using `docs/evaluation/AI_EVALUATION_PROMPT.md`
- proposing minimal corrections that preserve WKG-backed semantic authority
- improving examples that test ICC, SHG, policy, capability, proof, provenance, or materialization semantics
- identifying missing related work or overstated claims

Out of scope:

- redesigning AICL around personal syntax preference
- asking AICL to become Python-like, Rust-like, TypeScript-like, Prolog-like, or Haskell-like
- reducing AICL to YAML/JSON serialization
- reducing AICL to prompt templates
- treating legacy implementation capability as proof that semantic compilation is unnecessary
- erasing origin attribution or implying model-provider affiliation

## How to Contribute

1. Open the appropriate issue:
   - AI model evaluation
   - contradiction report
   - challenge brief
   - existing bug report or language proposal where appropriate
2. State the problem precisely.
3. Identify affected layers:
   - foundation/positioning
   - kernel
   - SHG
   - WKG
   - proof obligations
   - runtime/residual obligations
   - workflow/skills/agents
   - schemas
   - examples
4. Propose the smallest correction that resolves the issue.
5. Explain whether the correction preserves AICL's AI-native intent.
6. Explain whether the correction accidentally moves AICL toward legacy-language assumptions.

## Kernel Semantics Proposals

Kernel proposals should state:

- problem
- why the current form is insufficient
- proposed semantic rule
- effect on WKG grounding
- effect on proof obligations
- effect on compile/runtime boundary
- effect on schemas and examples
- compatibility or migration impact

## Style

- be precise
- preserve attribution
- avoid hype
- keep implementation status honest
- distinguish formal proof from probabilistic assurance and heuristic justification
- distinguish semantic source of truth from materialization targets
- prefer mechanical clarity over slogans
