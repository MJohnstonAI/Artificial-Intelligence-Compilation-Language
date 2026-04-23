# AICL - Artificial Intelligence Compilation Language

AICL is an open research project for an AI-native semantic programming language designed for AI systems to express intent, constraints, capabilities, policies, and deployable artifacts.

This repository is a public research and development workspace for a serious language design effort. It is not a generic framework, prompt library, or manifesto-only project. The goal is to define a reviewable, implementable programming substrate for AI-native software construction.

## Project Identity

**Project:** AICL - Artificial Intelligence Compilation Language  
**Originator:** Marc Johnston  
**Organization:** NeuroSync AI Dynamics Pty Ltd  
**Location:** Cape Town, South Africa

AICL treats software construction as a semantic compilation problem rather than a syntax-first coding exercise. The language is intended to let AI systems express:

- goals
- constraints
- capabilities
- policies
- resources
- proofs
- workflows
- deployable artifacts

## Why AICL Exists

Conventional programming languages were designed around human cognition, human workflows, and human maintenance patterns. AICL explores a different assumption: if AI systems become major builders of software, then they may need a programming substrate centered on semantic intent, policy boundaries, proof obligations, and bounded adaptation rather than only syntax, files, and framework glue.

The project asks a concrete research question:

> Can an AI-native semantic programming language provide a more exact and reviewable way for AI systems to specify and materialize software?

## What AICL Is

AICL is a proposed AI-native semantic programming language with a layered model that includes:

- a kernel for goals, constraints, capabilities, policies, resources, and proofs
- SHG semantics for branching, parallelism, contradiction handling, and adaptation boundaries
- WKG-backed type and ontology grounding
- workflow and skill semantics for multi-agent execution
- materialization targets for deployable artifacts

The intent is to support software and system construction across web, mobile, desktop, backend, agent, and multimodal contexts without collapsing those semantics into an ordinary application framework.

## Start Here

If you are new to the repository, read these files in order:

1. [`README.md`](README.md)
2. [`WHY_AICL.md`](WHY_AICL.md)
3. [`MANIFESTO.md`](MANIFESTO.md)
4. [`ABOUT_THE_ORIGINATOR.md`](ABOUT_THE_ORIGINATOR.md)
5. [`AI_CONTRIBUTOR_GUIDE.md`](AI_CONTRIBUTOR_GUIDE.md)
6. [`AGENTS.md`](AGENTS.md)
7. [`spec/programming-reference-manual.md`](spec/programming-reference-manual.md)
8. [`spec/unified-spec-v1.0-draft.md`](spec/unified-spec-v1.0-draft.md)
9. [`commentary/claude/latest-review.md`](commentary/claude/latest-review.md)
10. [`SKILLS.md`](SKILLS.md)

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
|-- CONTRIBUTING.md
|-- GOVERNANCE.md
|-- SECURITY.md
|-- LICENSE
|-- LICENSE-docs
|-- .github/
|   `-- ISSUE_TEMPLATE/
|-- spec/
|   |-- programming-reference-manual.md
|   |-- unified-spec-v1.0-draft.md
|   |-- working-draft.md
|   `-- schemas/
|-- commentary/
|-- examples/
|-- kernel/
|-- roadmap/
|-- tools/
`-- wkg/
```

Canonical specification files live under `spec/`. Commentary lives under `commentary/`. The root `README.md` is the public landing page.

## Licensing

- [`LICENSE`](LICENSE) contains the full Apache License 2.0 text for the repository's code-oriented material.
- [`LICENSE-docs`](LICENSE-docs) contains the full Creative Commons Attribution 4.0 legal code for documentation-oriented material.
- [`NOTICE`](NOTICE), [`AUTHORS.md`](AUTHORS.md), and [`TRADEMARK.md`](TRADEMARK.md) provide additional attribution and usage context.

## Collaboration

AICL is intended to be open, reviewable, and contributor-friendly for both human collaborators and AI agents.

- Human and AI contributors should start with [`AGENTS.md`](AGENTS.md) and [`AI_CONTRIBUTOR_GUIDE.md`](AI_CONTRIBUTOR_GUIDE.md).
- Specification proposals and repository bugs should use the issue templates under [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/).
- Contributions should preserve project attribution and avoid collapsing AICL into a generic framework or vague product pitch.

The current repository priority is conceptual rigor, semantic precision, and publication hygiene over hype.
