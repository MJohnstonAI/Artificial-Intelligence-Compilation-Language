# AICL - Artificial Intelligence Compilation Language

AICL means **Artificial Intelligence Compilation Language**.

AICL is an **AI-native semantic compilation research project**. It is designed for AI systems first, not human programmers first.

The current repository is a **pre-implementation research specification**. It contains specifications, schemas, examples, WKG material, and model commentary. It does not currently contain a documented working compiler.

AICL is not trying to imitate legacy programming languages. It is not optimized primarily around human syntax preference. Its canonical artifacts are semantic contracts, ICC, SHG, WKG-grounded meaning, proof obligations, capability containment, policy-bounded autonomy, provenance, and materialization outputs.

Human-readable syntax may exist, but it is a projection layer. It is not the root semantic authority.

AICL should not be evaluated as "a nicer Python", "a Rust competitor", "a TypeScript alternative", or "a new DSL for humans." The correct evaluation method is to run advanced AI models against the repository and submit structured contradiction reports, counterexamples, weak-point analyses, and improvement proposals.

## Project Identity

**Project:** AICL - Artificial Intelligence Compilation Language  
**Originator:** Marc Johnston  
**Organization:** NeuroSync AI Dynamics Pty Ltd  
**Location:** Cape Town, South Africa

AICL treats software construction as a semantic compilation problem. Its layered model centers on:

- semantic contracts for goals, constraints, capabilities, policies, resources, and proof obligations
- ICC artifacts for signed intent/proof certificates
- SHG semantics for branching, parallelism, contradiction handling, proof gates, and adaptation boundaries
- WKG-backed grounding for identifier meaning and ontology
- workflow and skill semantics for multi-agent execution
- provenance-aware materialization targets for deployable artifacts
- residual runtime obligations where static proof is not honest

## Why This Is Not Just Python/Rust/TypeScript With Extra Steps

Python, Rust, TypeScript, Kotlin, Swift, SQL, and other implementation languages are excellent human-first languages. They remain useful and may be used inside AICL tooling or generated outputs.

AICL addresses a different layer: **AI-native semantic compilation**.

Legacy languages primarily express implementation logic. AICL expresses intent, constraints, policies, capabilities, proof obligations, provenance, resource budgets, and materialization contracts before target code is generated.

The output of an AICL pipeline may still include Python, TypeScript, Kotlin, Swift, SQL, Rust, or other languages. Those languages are materialization targets, not the semantic source of truth.

"Python can already do this" misses the point when it treats runtime implementation ability as equivalent to semantic authority. Python can implement parts of an AICL compiler, verifier, runtime, or materializer. Python itself does not make AICL's intent, policy, capability, proof tier, provenance, WKG grounding, SHG structure, and residual runtime obligations first-class compilation objects.

## How to Evaluate AICL

1. Clone or read the repository.
2. Run a frontier AI model or strong local model against [`docs/evaluation/AI_EVALUATION_PROMPT.md`](docs/evaluation/AI_EVALUATION_PROMPT.md).
3. Ask the model to identify contradictions, weak semantics, missing proof obligations, compile/runtime boundary errors, overclaims, and legacy-language contamination risks.
4. Submit the output using the GitHub issue templates:
   - [AI model evaluation](.github/ISSUE_TEMPLATE/ai-model-evaluation.md)
   - [Contradiction report](.github/ISSUE_TEMPLATE/contradiction-report.md)
   - [Challenge brief](.github/ISSUE_TEMPLATE/challenge-brief.md)

Useful review evaluates whether AICL succeeds on its own terms as an AI-native semantic compilation project. It should not redesign AICL around a reviewer's favorite legacy language.

## Public Positioning Docs

- [`docs/foundations/FOUNDATIONAL_THESIS.md`](docs/foundations/FOUNDATIONAL_THESIS.md) - core thesis for AI-native semantic compilation
- [`docs/foundations/AI_NATIVE_DESIGN_PRINCIPLES.md`](docs/foundations/AI_NATIVE_DESIGN_PRINCIPLES.md) - design principles and legacy-language traps avoided
- [`docs/foundations/WHAT_AICL_IS_NOT.md`](docs/foundations/WHAT_AICL_IS_NOT.md) - explicit non-goals and boundary statements
- [`docs/foundations/HUMAN_REVIEW_BOUNDARY.md`](docs/foundations/HUMAN_REVIEW_BOUNDARY.md) - useful and less useful review patterns
- [`docs/foundations/LEGACY_LANGUAGE_MISREADINGS.md`](docs/foundations/LEGACY_LANGUAGE_MISREADINGS.md) - common misreadings and responses

## Kernel Clarification Docs

- [`docs/kernel/KERNEL_WEAK_POINTS_REGISTER.md`](docs/kernel/KERNEL_WEAK_POINTS_REGISTER.md) - current kernel design obligations
- [`docs/kernel/TYPE_AUTHORITY_RESOLUTION.md`](docs/kernel/TYPE_AUTHORITY_RESOLUTION.md) - WKG as the single semantic authority
- [`docs/kernel/PROOF_TIER_SEMANTICS.md`](docs/kernel/PROOF_TIER_SEMANTICS.md) - formal, probabilistic, and heuristic proof tiers
- [`docs/kernel/GRAMMAR_AND_IR_STRATEGY.md`](docs/kernel/GRAMMAR_AND_IR_STRATEGY.md) - AICL-H, AICL-IR, AICL-SHG, and AICL-ICC
- [`docs/kernel/OPERATIONAL_SEMANTICS.md`](docs/kernel/OPERATIONAL_SEMANTICS.md) - lifecycle and state tuple
- [`docs/kernel/COMPILE_RUNTIME_BOUNDARY.md`](docs/kernel/COMPILE_RUNTIME_BOUNDARY.md) - compile-time obligations and residual runtime obligations

## Evaluation and Launch Docs

- [`docs/evaluation/AI_MODEL_EVALUATION_PROTOCOL.md`](docs/evaluation/AI_MODEL_EVALUATION_PROTOCOL.md) - external AI-model review process
- [`docs/evaluation/EVALUATION_OUTPUT_SCHEMA.md`](docs/evaluation/EVALUATION_OUTPUT_SCHEMA.md) - structured output format
- [`docs/evaluation/CONTRADICTION_REPORT_TEMPLATE.md`](docs/evaluation/CONTRADICTION_REPORT_TEMPLATE.md) - focused contradiction report template
- [`docs/launch/PUBLIC_POSITIONING.md`](docs/launch/PUBLIC_POSITIONING.md) - approved and risky public wording
- [`docs/launch/PLATFORM_POSTS.md`](docs/launch/PLATFORM_POSTS.md) - launch post drafts
- [`docs/launch/PUBLIC_LAUNCH_CHECKLIST.md`](docs/launch/PUBLIC_LAUNCH_CHECKLIST.md) - pre-publication checklist

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
12. [`wkg/core/aicl-core-ontology-spec.md`](wkg/core/aicl-core-ontology-spec.md) - WKG core ontology companion
13. [`wkg/core/canonical-ontology-registry.md`](wkg/core/canonical-ontology-registry.md) - canonical registry and anchor rules
14. [`wkg/core/integration-memo.md`](wkg/core/integration-memo.md) - WKG/kernel integration guardrails
15. [`commentary/claude/latest-review.md`](commentary/claude/latest-review.md) - authoritative review commentary

## Schemas, Commentary, and Examples

- Draft machine-readable schemas live in [`spec/schemas/`](spec/schemas/).
- WKG core semantics and registry material live under [`wkg/core/`](wkg/core/).
- Model commentary is organized under [`commentary/`](commentary/).
- The flagship public academic example is [`examples/studypath-offline-learning-planner/README.md`](examples/studypath-offline-learning-planner/README.md).
- The flagship enterprise workflow example is [`examples/enterprise-service-resolution/README.md`](examples/enterprise-service-resolution/README.md).
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
|-- CONTRIBUTING.md
|-- docs/
|   |-- foundations/
|   |-- kernel/
|   |-- evaluation/
|   |-- launch/
|   `-- implementation-plans/
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
|   |-- studypath-offline-learning-planner/
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

- Human and AI contributors should start with [`AI_CONTRIBUTOR_GUIDE.md`](AI_CONTRIBUTOR_GUIDE.md), [`AGENTS.md`](AGENTS.md), and [`CONTRIBUTING.md`](CONTRIBUTING.md).
- AI model evaluations should use [`docs/evaluation/AI_EVALUATION_PROMPT.md`](docs/evaluation/AI_EVALUATION_PROMPT.md).
- Contradictions should use [`docs/evaluation/CONTRADICTION_REPORT_TEMPLATE.md`](docs/evaluation/CONTRADICTION_REPORT_TEMPLATE.md).
- Contributions should preserve origin attribution and should not collapse AICL into a generic framework, prompt library, Python wrapper, or conventional human-first DSL.

## Licensing

- [`LICENSE`](LICENSE) contains the full Apache License 2.0 text for code-oriented material.
- [`LICENSE-docs`](LICENSE-docs) contains the full CC BY 4.0 legal code for documentation-oriented material.
- [`NOTICE`](NOTICE), [`AUTHORS.md`](AUTHORS.md), and [`TRADEMARK.md`](TRADEMARK.md) provide attribution and project-identity context.

The current repository priority is conceptual rigor, semantic precision, teachability, and clean public presentation.
