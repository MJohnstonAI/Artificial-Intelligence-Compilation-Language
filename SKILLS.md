# SKILLS.md

This file describes the AICL skill layer for AI agents, contributors, and future tooling.

AICL distinguishes between three related concepts:

- **Capabilities** - what a system is permitted or able to do
- **Skills** - how an agent reliably performs a specialized workflow
- **Workflows / Routes** - how multiple skills and agents are composed

## Why This Distinction Matters

Do not collapse capabilities, skills, and workflows into one scalar concept.

- Capabilities affect authority and trust boundaries.
- Skills affect reusable execution patterns.
- Workflows affect orchestration, delegation, proof gates, and routing.

That separation matters for proof obligations, policy soundness, and future registry design.

## Where Skill-Related Material Lives

- `SKILLS.md` - conceptual overview of the skill layer
- `spec/programming-reference-manual.md` - programming-facing skill semantics
- `spec/schemas/skill-contract.schema.json` - draft machine-readable schema companion
- `AGENTS.md` and `AI_CONTRIBUTOR_GUIDE.md` - contributor behavior and repository orientation
- `commentary/` - review and synthesis commentary on skill semantics

## Skill Principles

A skill should be:

- reusable
- bounded
- inspectable
- attributable
- optionally provable

Each serious skill should declare:

- purpose
- inputs
- outputs
- dependencies
- sandbox assumptions
- budgets
- guarantees
- trust assumptions

## Core Skill Types

### 1. Planning skills

Examples:

- architecture planning
- decomposition
- roadmap generation
- contradiction surfacing

### 2. Design skills

Examples:

- screen design
- layout generation
- component mapping
- visual hierarchy refinement

### 3. Coding skills

Examples:

- code generation
- test updates
- refactor proposals
- migration helpers

### 4. Verification skills

Examples:

- static review
- proof obligation generation
- policy checks
- contradiction detection

### 5. Release skills

Examples:

- packaging
- deployment preparation
- changelog generation
- artifact verification

## Suggested AICL Skill Syntax

```aicl
skill Claude.SpecReview {
  class: formal_review_skill
  inputs: [spec_doc, schema_set]
  outputs: [inconsistencies, proof_obligations, revision_suggestions]
  constraints: [no_unapproved_rewrites]
}
```

```aicl
skill Stitch.ScreenDesign {
  class: design_skill
  inputs: [prompt, screenshot, style_reference]
  outputs: [screen_graph, style_tokens, component_map]
  constraints: [responsive, a11y_aa]
}
```

## Skill Contracts

Every serious skill should have a contract.

A good skill contract defines:

- allowed files / scope
- allowed network access
- secret policy
- runtime/cost budget
- required guarantees

Example:

```aicl
skillcontract Codex.Implement {
  sandbox: {
    filesystem: repo_subset("/app", "/tests")
    network: allow(["registry.npmjs.org"])
    secrets: deny_all
  }
  budgets: {
    max_runtime_min: 20
    max_cost_usd: 0.50
  }
  guarantees: [
    tests_updated,
    reproducible_diff
  ]
}
```

Draft machine-readable companion schema:

- `spec/schemas/skill-contract.schema.json`

## Skill Packs and Routes

Skill packs group multiple skills into one workflow bundle.

```aicl
skillpack AgentApp.Build {
  includes: [
    Claude.Plan,
    Gemini.Design,
    Codex.Implement,
    Claude.Verify,
    Deployer.Release
  ]
}
```

Skill routes define when particular skills should be selected within larger orchestration flows.

## Guidance for Contributors

When contributing to the AICL skill layer:

1. Identify whether the proposal is about a capability, a skill, a workflow, or a policy boundary.
2. Prefer reusable skill descriptions over project-specific prompts.
3. Declare assumptions explicitly.
4. Keep skill semantics separate from marketing language.
5. Explain where the proposal belongs:
   - `SKILLS.md`
   - `spec/programming-reference-manual.md`
   - `spec/schemas/`
   - commentary
6. If proposing a new skill, explain:
   - why it exists
   - where it fits in the pipeline
   - what guarantees it can and cannot offer

## Long-Term Goal

AICL should eventually support a formal Skill Registry with:

- versioning
- trust metadata
- dependency semantics
- portability across agent ecosystems

This remains an open problem and should be treated as one of the language's serious unresolved areas.
