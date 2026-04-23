# AICL - Artificial Intelligence Compilation Language

AICL is an open research project for an AI-native semantic programming language designed for AI systems to express intent, constraints, capabilities, policies, proofs, workflows, and deployable artifacts.

This repository is the public research workspace for AICL. It is intended to read as a serious programming-language project rather than a generic framework, prompt library, or manifesto-only repo.

## Project Identity

**Project:** AICL - Artificial Intelligence Compilation Language  
**Originator:** Marc Johnston  
**Organization:** NeuroSync AI Dynamics Pty Ltd  
**Location:** Cape Town, South Africa

AICL treats software construction as a semantic compilation problem. Its layered model centers on:

- kernel semantics for goals, constraints, capabilities, policies, resources, and proofs
- SHG semantics for branching, parallelism, contradiction handling, and adaptation boundaries
- WKG-backed grounding for identifiers and ontology
- workflow and skill semantics for multi-agent execution
- materialization targets for deployable artifacts

## Canonical Documents

Start with these documents, in roughly this order:

1. [`WHY_AICL.md`](WHY_AICL.md) - project motivation and problem framing
2. [`MANIFESTO.md`](MANIFESTO.md) - public philosophical framing
3. [`ABOUT_THE_ORIGINATOR.md`](ABOUT_THE_ORIGINATOR.md) - origin and attribution context
4. [`AI_CONTRIBUTOR_GUIDE.md`](AI_CONTRIBUTOR_GUIDE.md) - contributor orientation for AI systems
5. [`AGENTS.md`](AGENTS.md) - operating memory and contribution guardrails
6. [`SKILLS.md`](SKILLS.md) - capability, skill, and workflow semantics
7. [`spec/programming-reference-manual.md`](spec/programming-reference-manual.md) - strongest current technical baseline
8. [`spec/unified-spec-v1.0-draft.md`](spec/unified-spec-v1.0-draft.md) - synthesis target for convergence
9. [`spec/working-draft.md`](spec/working-draft.md) - collaborative design layer
10. [`spec/architecture/AICL_Architecture_Snapshot_v1.md`](spec/architecture/AICL_Architecture_Snapshot_v1.md) - concise architecture overview
11. [`spec/History/AICL_Consortium_Decision_History.md`](spec/History/AICL_Consortium_Decision_History.md) - project decision history and lineage
12. [`commentary/claude/latest-review.md`](commentary/claude/latest-review.md) - authoritative review commentary

## Schemas, Commentary, and Examples

- Draft machine-readable schemas live in [`spec/schemas/`](spec/schemas/).
- WKG core semantics and registry material live under [`wkg/core/`](wkg/core/), with [`wkg/core/aicl-core-ontology-spec.md`](wkg/core/aicl-core-ontology-spec.md) as the textual companion for ontology, snapshot, and contradiction rules.
- Model commentary is organized under [`commentary/`](commentary/).
- The flagship serious example is [`examples/enterprise-service-resolution/README.md`](examples/enterprise-service-resolution/README.md).
- A secondary lightweight example brief lives at [`examples/cross-platform-app-brief/README.md`](examples/cross-platform-app-brief/README.md).

The public emphasis should remain on policy-aware, multimodal, cross-platform, agent-compatible systems rather than novelty demos.

## Repository Layout

```text
.
|-- README.md
|-- WHY_AICL.md
|-- MANIFESTO.md
|-- ABOUT_THE_ORIGINATOR.md
|-- AI_CONTRIBUTOR_GUIDE.md
|-- AGENTS.md
|-- SKILLS.md
|-- AUTHORS.md
|-- CONTRIBUTING.md
|-- GOVERNANCE.md
|-- SECURITY.md
|-- NOTICE
|-- TRADEMARK.md
|-- SPONSORSHIP_AND_RESEARCH_SUPPORT.md
|-- CITATION.cff
|-- LICENSE
|-- LICENSE-docs
|-- spec/
|   |-- programming-reference-manual.md
|   |-- unified-spec-v1.0-draft.md
|   |-- working-draft.md
|   `-- schemas/
|-- commentary/
|   |-- claude/
|   |-- gemini/
|   |-- grok/
|   `-- chatgpt/
|-- examples/
|   |-- enterprise-service-resolution/
|   `-- cross-platform-app-brief/
|-- kernel/
|-- tools/
|-- wkg/
|   |-- core/
|   `-- domains/
|-- roadmap/
`-- .github/
```

## Collaboration

- Human and AI contributors should start with [`AI_CONTRIBUTOR_GUIDE.md`](AI_CONTRIBUTOR_GUIDE.md) and [`AGENTS.md`](AGENTS.md).
- Language or architecture proposals should use [`.github/ISSUE_TEMPLATE/language_proposal.md`](.github/ISSUE_TEMPLATE/language_proposal.md).
- Repository and specification defects should use [`.github/ISSUE_TEMPLATE/bug_report.md`](.github/ISSUE_TEMPLATE/bug_report.md).
- Contributions should preserve origin attribution and should not collapse AICL into a generic framework repo.

## Licensing

- [`LICENSE`](LICENSE) contains the full Apache License 2.0 text for code-oriented material.
- [`LICENSE-docs`](LICENSE-docs) contains the full CC BY 4.0 legal code for documentation-oriented material.
- [`NOTICE`](NOTICE), [`AUTHORS.md`](AUTHORS.md), and [`TRADEMARK.md`](TRADEMARK.md) provide attribution and project-identity context.

The current repository priority is conceptual rigor, semantic precision, teachability, and clean public presentation.
