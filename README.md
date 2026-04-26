# AICL - Artificial Intelligence Compilation Language

AICL is an open research project for an AI-native semantic programming language designed for AI systems to express intent, constraints, capabilities, policies, proofs, workflows, and deployable artifacts.

This repository is the public research workspace for AICL. It is intended to read as a serious programming-language project rather than a generic framework, prompt library, or manifesto-only repo.

**Status:** Draft research specification. Reference compiler not yet implemented.

## Current Status

AICL is currently a draft research specification, not a working compiler.

The repository contains:

- Kernel v0.1.1 contract specifications
- WKG grounding documents
- SHG, HAIG, PACT, and materializer contracts
- research tracks for future extensions
- evaluation prompts and issue templates for structured AI-model review
- early examples and schemas

The next implementation target is a minimal reference pipeline:

```text
Brief → ICC → WKG grounding → SHG validation → proof obligation classification → materializer stub
```

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

## Kernel Specification

The formal AICL kernel specification lives in:

* [`docs/kernel/`](docs/kernel/)

Kernel v0.1.1 defines the current contract layer:

* SHG schema
* HAIG arbitration
* PACT agent coordination
* materializer interface
* kernel patch notes

Detailed semantic support documents live in:

* [`docs/kernel/semantic/`](docs/kernel/semantic/)

The root-level [`kernel/`](kernel/) directory is reserved for future executable kernel/compiler implementation artifacts.

## Research Tracks

Experimental frontier proposals live in:

* [`docs/research/`](docs/research/)

Research tracks are not canonical kernel law. They exist to evaluate future ideas such as SHG-TENSOR, MachineICC, neural-symbolic projection, adversarial PACT testing, meta-circular WKG grammar anchoring, and rejected proposals before any kernel adoption is considered.

## Evaluate AICL With Your AI Model

External reviewers can run an AI model against AICL using:

- [`docs/evaluation/AI_MODEL_EVALUATION_GUIDE.md`](docs/evaluation/AI_MODEL_EVALUATION_GUIDE.md)
- [`docs/evaluation/MODEL_REVIEW_PROMPT.md`](docs/evaluation/MODEL_REVIEW_PROMPT.md)
- [`docs/evaluation/STRUCTURED_FINDINGS_TEMPLATE.md`](docs/evaluation/STRUCTURED_FINDINGS_TEMPLATE.md)

Submit structured results with:

- [`.github/ISSUE_TEMPLATE/ai-model-evaluation.md`](.github/ISSUE_TEMPLATE/ai-model-evaluation.md)
- [`.github/ISSUE_TEMPLATE/contradiction-report.md`](.github/ISSUE_TEMPLATE/contradiction-report.md)
- [`.github/ISSUE_TEMPLATE/challenge-brief.md`](.github/ISSUE_TEMPLATE/challenge-brief.md)

Evaluation outputs are reviewer evidence, not canonical kernel law.

## What You Can Do Today

- Review Kernel v0.1.1 in [`docs/kernel/`](docs/kernel/)
- Run your AI model against [`docs/evaluation/MODEL_REVIEW_PROMPT.md`](docs/evaluation/MODEL_REVIEW_PROMPT.md)
- Submit structured findings using the AI model evaluation issue template
- Submit contradictions using the contradiction report template
- Submit challenge briefs for ICC, SHG, proof, and materialization testing
- Review the enterprise service resolution example in [`examples/enterprise-service-resolution/`](examples/enterprise-service-resolution/)
- Propose implementation issues for the minimal reference compiler pipeline

## Public Review and Roadmap

- [`docs/PUBLIC_REVIEW_GUIDE.md`](docs/PUBLIC_REVIEW_GUIDE.md) explains how to review AICL for the first time.
- [`roadmap/README.md`](roadmap/README.md) tracks the near-term path from research specification to minimal reference implementation.

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
|-- docs/
|   |-- PUBLIC_REVIEW_GUIDE.md
|   |-- kernel/
|   |   |-- semantic/
|   |   |-- README.md
|   |   |-- SHG_SCHEMA.md
|   |   |-- HAIG_SPEC.md
|   |   |-- PACT_COORDINATION_SPEC.md
|   |   |-- MATERIALIZER_INTERFACE.md
|   |   `-- KERNEL_v0.1.1_PATCH_NOTES.md
|   |-- research/
|   |   |-- shg-tensor/
|   |   |-- machine-autonomy/
|   |   |-- neural-symbolic-bridge/
|   |   |-- pact-sandbox/
|   |   |-- meta-circularity/
|   |   `-- rejected/
|   `-- evaluation/
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
|   `-- README.md
`-- .github/
```

## Collaboration

- Human and AI contributors should start with [`AI_CONTRIBUTOR_GUIDE.md`](AI_CONTRIBUTOR_GUIDE.md) and [`AGENTS.md`](AGENTS.md).
- First-time public reviewers should start with [`docs/PUBLIC_REVIEW_GUIDE.md`](docs/PUBLIC_REVIEW_GUIDE.md).
- AI model evaluations should use [`.github/ISSUE_TEMPLATE/ai-model-evaluation.md`](.github/ISSUE_TEMPLATE/ai-model-evaluation.md).
- Contradictions should use [`.github/ISSUE_TEMPLATE/contradiction-report.md`](.github/ISSUE_TEMPLATE/contradiction-report.md).
- Challenge briefs should use [`.github/ISSUE_TEMPLATE/challenge-brief.md`](.github/ISSUE_TEMPLATE/challenge-brief.md).
- Language or architecture proposals should use [`.github/ISSUE_TEMPLATE/language_proposal.md`](.github/ISSUE_TEMPLATE/language_proposal.md).
- Repository and specification defects should use [`.github/ISSUE_TEMPLATE/bug_report.md`](.github/ISSUE_TEMPLATE/bug_report.md).
- Contributions should preserve origin attribution and should not collapse AICL into a generic framework repo.

## Licensing

- [`LICENSE`](LICENSE) contains the full Apache License 2.0 text for code-oriented material.
- [`LICENSE-docs`](LICENSE-docs) contains the full CC BY 4.0 legal code for documentation-oriented material.
- [`NOTICE`](NOTICE), [`AUTHORS.md`](AUTHORS.md), and [`TRADEMARK.md`](TRADEMARK.md) provide attribution and project-identity context.

The current repository priority is conceptual rigor, semantic precision, teachability, and clean public presentation.
