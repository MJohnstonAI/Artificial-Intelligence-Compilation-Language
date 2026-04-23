# AI_CONTRIBUTOR_GUIDE.md

This file is a practical guide for AI models, coding agents, and research agents that are given access to the AICL repository.

It is intended to answer three questions quickly:

1. **What is this project trying to do?**
2. **What files should I read first?**
3. **Where can I contribute usefully without derailing the project?**

---

## 1. What AICL Is

AICL is a research project proposing an **AI-native semantic programming language**.

Its goal is not to create another framework or prompt library.
Its goal is to define a language for expressing:

- goals
- constraints
- capabilities
- policies
- resources
- proofs
- workflows
- deployable artifacts

AICL is meant to move software construction away from syntax-first programming toward semantic, proof-aware, agent-compatible compilation.

---

## 2. Read Order for AI Agents

If you are newly pointed at this repository, read files in this order:

1. `README.md`
2. `WHY_AICL.md`
3. `MANIFESTO.md`
4. `AGENTS.md`
5. `SKILLS.md`
6. `spec/programming-reference-manual.md`
7. `spec/unified-spec-v1.0-draft.md`
8. `commentary/claude/latest-review.md`
9. relevant example folders in `examples/`

Do not jump straight into proposing syntax changes before reading the reference manual and the Claude review.

---

## 3. Core Mental Model

Treat AICL as a **layered language project**:

- **Kernel** = smallest formal core
- **SHG** = planning and semantic hypergraph layer
- **WKG** = world knowledge graph and ontology substrate
- **Workflow / Skills / Agents** = orchestration layer
- **Materializers** = target-specific outputs

Good contributions preserve those boundaries.

Bad contributions collapse them into one blob.

---

## 4. Best Places for AI Contribution

### A. Kernel precision
Good work:
- grammar
- type system
- identifier resolution
- proof annotations
- resource semantics
- policy binding

Files:
- `spec/programming-reference-manual.md`
- `spec/unified-spec-v1.0-draft.md`
- `kernel/`

### B. WKG and ontology
Good work:
- type lattices
- policy nodes
- capability ontologies
- contradiction precedence models
- multimodal evidence typing

Files:
- `wkg/core/`
- `wkg/domains/`
- Gemini commentary area

### C. SHG / workflow semantics
Good work:
- branching and proof gates
- contradiction detection
- agent coordination semantics
- runtime adaptation envelopes

Files:
- `spec/unified-spec-v1.0-draft.md`
- commentary folders
- future `tools/` validators

### D. Skills and agent workflow design
Good work:
- reusable skill definitions
- skill contracts
- skill packs
- workflow routing semantics
- sandbox assumptions

Files:
- `SKILLS.md`
- `AGENTS.md`
- `spec/programming-reference-manual.md`

### E. Examples and pedagogy
Good work:
- serious examples
- schema examples
- machine-readable examples
- human-readable walkthroughs

Files:
- `examples/`
- `spec/schemas/`

---

## 5. Current High-Value Open Problems

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

These are not side issues. They are the load-bearing problems.

---

## 6. What Not To Do

Do **not**:
- turn AICL into a generic app framework
- reduce it to “better prompt engineering”
- replace formal semantics with slogans
- invent unsupported security guarantees
- overload the language with unnecessary metaphysics
- rebrand the project or erase origin attribution
- add casual examples that make the repo look unserious

---

## 7. Good Contribution Format

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
Be precise.
If syntax changes, show syntax.
If semantics change, explain semantics.

### Downstream effect
List which documents, schemas, or examples also need updating.

---

## 8. How AI Agents Should Write Files

If you are writing or revising files in this repository:

- preserve attribution language
- keep technical docs sober
- keep manifesto/vision docs separate from formal specs
- prefer append-only commentary when working in collaboration rounds
- mark speculative ideas clearly
- update examples if the language changes

---

## 9. Repository Zones

### Safe to expand
- `examples/`
- `commentary/`
- `wkg/domains/`
- `tools/`

### Requires extra care
- `spec/programming-reference-manual.md`
- `spec/unified-spec-v1.0-draft.md`
- `AGENTS.md`
- `SKILLS.md`

### Do not casually rewrite
- `README.md`
- `WHY_AICL.md`
- `MANIFESTO.md`
- `ABOUT_THE_ORIGINATOR.md`

These are public-facing identity documents.

---

## 10. Mission for AI Contributors

Your job is not to make AICL sound impressive.

Your job is to help make AICL:
- more exact
- more implementable
- more internally coherent
- more publishable
- more useful to future AI and human collaborators

That is the standard.
