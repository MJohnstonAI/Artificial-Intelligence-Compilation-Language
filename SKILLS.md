# SKILLS.md

This file describes the **AICL skill system** for AI agents, contributors, and future tooling.

AICL distinguishes between:
- **Capabilities** — what a system may do
- **Skills** — how an agent consistently performs a specialized workflow

## Skill Principles

A skill should be:
- reusable
- bounded
- inspectable
- attributable
- optionally provable

Each skill should ideally declare:
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
- deployment prep
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

## Skill Packs

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

## Guidance for AI Contributors

When contributing to AICL:
1. Identify whether your contribution is a capability, a skill, a workflow, or a policy.
2. Prefer reusable skill descriptions over one-off instructions.
3. Declare assumptions.
4. Keep skill semantics separate from project-specific prompts.
5. If proposing a new skill, explain:
   - why it exists
   - where it fits in the pipeline
   - what guarantees it can and cannot offer

## Long-Term Goal

AICL should eventually support a formal Skill Registry with:
- versioning
- trust metadata
- dependency semantics
- portability across agent ecosystems
