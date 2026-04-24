# AI_CONTRIBUTOR_GUIDE.md

This file is a practical orientation guide for AI coding agents, research agents, and review agents working in the AICL repository.

It answers five operational questions:

1. What is AICL trying to do?
2. Which files are canonical?
3. What should be read first?
4. Where should different kinds of work go?
5. What should not be overwritten casually?

## 1. What AICL Is

AICL is an open research project proposing an **AI-native semantic programming language**.

Its goal is not to create another framework or prompt library. Its goal is to define a language for expressing:

- goals
- constraints
- capabilities
- policies
- resources
- proofs
- workflows
- deployable artifacts

AICL is intended to move software construction away from syntax-first programming toward semantic, proof-aware, agent-compatible compilation.

## 2. Canonical Files and Their Roles

### Public identity

- `README.md` - public landing page
- `WHY_AICL.md` - motivation and problem framing
- `MANIFESTO.md` - public philosophical framing
- `ABOUT_THE_ORIGINATOR.md` - origin and attribution context

### Contributor operating docs

- `AI_CONTRIBUTOR_GUIDE.md` - practical contributor orientation
- `AGENTS.md` - agent operating memory and guardrails
- `SKILLS.md` - capability, skill, and workflow semantics

### Spec layer

- `spec/programming-reference-manual.md` - strongest current technical baseline
- `spec/unified-spec-v1.0-draft.md` - synthesis target for convergence
- `spec/working-draft.md` - collaborative design layer
- `spec/architecture/AICL_Architecture_Snapshot_v1.md` - concise architecture summary
- `spec/History/AICL_Consortium_Decision_History.md` - historical lineage and prior decisions

### WKG core layer

- `wkg/core/aicl-core-ontology-spec.md` - textual WKG semantics companion
- `wkg/core/schema.ts` - TypeScript source of truth for WKG structures
- `wkg/core/aicl-core-ontology.schema.json` - JSON Schema companion
- `wkg/core/canonical-ontology-registry.md` - naming, minimum fields, snapshot rules
- `wkg/core/integration-memo.md` - narrow integration guardrails and artifact roles

### Commentary and evidence

- `commentary/claude/latest-review.md` - current authoritative review commentary
- `commentary/gemini/` - WKG and ontology commentary area
- `commentary/grok/` - optimization and runtime commentary area
- `commentary/chatgpt/` - synthesis and repository-evolution commentary area

### Schemas and examples

- `spec/schemas/` - draft machine-readable schemas
- `examples/enterprise-service-resolution/` - flagship serious example
- `examples/cross-platform-app-brief/` - secondary compact example

## 3. Read Order for AI Agents

If you are newly pointed at this repository, read files in this order:

1. `README.md`
2. `WHY_AICL.md`
3. `MANIFESTO.md`
4. `ABOUT_THE_ORIGINATOR.md`
5. `AI_CONTRIBUTOR_GUIDE.md`
6. `AGENTS.md`
7. `SKILLS.md`
8. `spec/programming-reference-manual.md`
9. `wkg/core/aicl-core-ontology-spec.md`
10. `wkg/core/canonical-ontology-registry.md`
11. `wkg/core/integration-memo.md`
12. `spec/unified-spec-v1.0-draft.md`
13. `commentary/claude/latest-review.md`
14. relevant example folders in `examples/`

Do not jump straight into syntax changes before reading the reference manual and the Claude review.

## 4. Core Mental Model

Treat AICL as a layered language project:

- **Kernel** = smallest formal core
- **SHG** = planning and semantic hypergraph layer
- **WKG** = world knowledge graph and ontology substrate
- **Workflow / Skills / Agents** = orchestration layer
- **Materializers** = target-specific outputs

Good contributions preserve those boundaries.

Bad contributions collapse them into one blob.

## 5. Where Different Work Should Go

### Kernel precision

Typical work:

- grammar
- type system
- identifier resolution
- proof annotations
- resource semantics
- policy binding

Primary files:

- `spec/programming-reference-manual.md`
- `spec/unified-spec-v1.0-draft.md`
- `kernel/`

### WKG and ontology

Typical work:

- type lattices
- policy nodes
- capability ontologies
- contradiction precedence models
- multimodal evidence typing

Primary files:

- `wkg/core/aicl-core-ontology-spec.md`
- `wkg/core/schema.ts`
- `wkg/core/aicl-core-ontology.schema.json`
- `wkg/core/canonical-ontology-registry.md`
- `wkg/core/integration-memo.md`
- `wkg/domains/`
- `commentary/gemini/`

### SHG and workflow semantics

Typical work:

- branching and proof gates
- contradiction detection
- agent coordination semantics
- runtime adaptation envelopes

Primary files:

- `spec/unified-spec-v1.0-draft.md`
- `commentary/`
- future tooling under `tools/`

### Skills and agent workflow design

Typical work:

- reusable skill definitions
- skill contracts
- skill packs
- workflow routing semantics
- sandbox assumptions

Primary files:

- `SKILLS.md`
- `AGENTS.md`
- `spec/programming-reference-manual.md`
- `spec/schemas/skill-contract.schema.json`

### Schemas and examples

Typical work:

- schema cleanup
- example alignment
- machine-readable companion artifacts
- human-readable walkthroughs

Primary files:

- `spec/schemas/`
- `examples/`

## 6. High-Value Open Problems

AI contributors should prioritize these:

1. WKG-backed nominal type system
2. Proof mechanism annotations
3. IFC semantics for OpaqueIntent
4. Contradiction detection policy
5. Formal ICC schema
6. Flow algebra with branching / parallel / proof gates
7. Multi-dimensional autonomy
8. Skill registry semantics
9. Runtime adaptation envelope
10. Multimodal evidence semantics

These are load-bearing problems, not side issues.

## 7. What Not To Do

Do **not**:

- turn AICL into a generic app framework
- reduce it to "better prompt engineering"
- replace formal semantics with slogans
- invent unsupported security guarantees
- overload the language with unnecessary metaphysics
- rebrand the project or erase origin attribution
- elevate toy or entertainment-first examples above the serious flagship example

## 8. Safe Editing Rules

High-caution files:

- `README.md`
- `WHY_AICL.md`
- `MANIFESTO.md`
- `ABOUT_THE_ORIGINATOR.md`
- `spec/programming-reference-manual.md`
- `spec/unified-spec-v1.0-draft.md`
- `wkg/core/aicl-core-ontology-spec.md`
- `wkg/core/schema.ts`
- `wkg/core/aicl-core-ontology.schema.json`
- `wkg/core/canonical-ontology-registry.md`
- `commentary/claude/latest-review.md`

If you are writing or revising files in this repository:

- preserve attribution language
- keep technical docs sober
- keep manifesto/vision docs separate from formal specs
- prefer append-only clarification for draft layers
- mark speculative ideas clearly
- treat WKG examples and contradiction fixtures as illustrative, not normative
- update examples or schemas if the language changes

## 9. Good Contribution Format

When proposing a change, use this pattern:

### Problem

What is broken, vague, or missing?

### Why it matters

How does it affect:

- type soundness
- proof obligations
- runtime semantics
- policy safety
- implementation feasibility

### Proposed change

Be precise. If syntax changes, show syntax. If semantics change, explain semantics.

### Downstream effect

List which documents, schemas, commentary notes, or examples also need updating.

## 10. Mission for AI Contributors

Your job is not to make AICL sound impressive.

Your job is to help make AICL:

- more exact
- more implementable
- more internally coherent
- more publishable
- more useful to future AI and human collaborators

That is the standard.

## For OpenClaw-Style Agent Contributors

If you are an autonomous local agent working in this repository, treat AICL artifacts as contracts rather than prompts. Do not infer authority from task wording alone.

Check AGENTS.md, skill contracts, authority policy, and proof requirements before proposing or applying changes.

AICL compatibility with OpenClaw-style systems means semantic and workflow compatibility, not official platform integration.
