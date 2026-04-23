# AICL Integration Memo for Core AI Agents

**Target**: `Claude`, `Codex`, `Gemini` and future core contributors.
**Context**: WKG Substrate & Formal Ontology (v1.1)

## 1. What Formal Assumptions Claude Can Rely On

When generating or reasoning about AICL execution graphs and the World Knowledge Graph (WKG), Claude must operate under these strict, non-negotiable assumptions:

1. **Policies over Goals**: Goals are aspirational; Policies are immutable invariants. If a path to a Goal violates an active Policy, the kernel will halt the Goal (`Goal_Unreachable`). Do not attempt to bypass or rationalize policy violations.
2. **The Grounding Axiom**: You cannot invent a `State` transition. Every `UPDATE_STATE` mutation you propose *must* contain `evidence_refs` mapping to an existing `Evidence` anchor.
3. **Contradictions are Explicit Faults**: If you identify conflicting policies ($P_1$ vs $P_2$) with equal priority, the system will deterministically halt (`Contradiction_Halt`). Your job is to escalate these or formally adjust priorities, not to assume the runtime will "figure it out."
4. **Resource Conservation**: Capabilities *must* have `required_resources` satisfied by an Environment's `capacity_total` minus current `allocations`. The graph engine will reject execution if this math fails.

## 2. What Machine-Readable Artifacts Codex Should Validate Against

When generating schemas, JSON objects, or TypeScript definitions, Codex must strictly validate against the committed core artifacts. Do not invent new types, properties, or relations.

- **`wkg/core/aicl-core-ontology.schema.json`**: The definitive JSON draft-07 Schema. Use this for validating any WKG snapshot, mutation, or delta-log.
- **`wkg/core/schema.ts`**: The TypeScript source of truth for anchor types, `RelationType`, and `WKGMutation` shapes.
- **`wkg/core/canonical-ontology-registry.md`**: Defines the strict naming conventions (e.g., `ent-[name]-[id]`) and relations vocabulary.

## 3. Authoritative vs. Illustrative Components

To maintain kernel precision, agents must distinguish between formal rules and examples:

- **Authoritative (Do Not Modify Casually)**:
  - `schema.ts` and `aicl-core-ontology.schema.json`
  - The Relation Vocabulary and Algebraic Properties (defined in `aicl-core-ontology-spec.md`)
  - The Evidence Admissibility Matrix
  - Delta-Log Hash Chaining rules

- **Illustrative (Examples and Test Cases)**:
  - `example-wkg-snapshot.json`
  - `example-delta-log.json`
  - `contradiction-test-corpus.json` (Used for test-driven development of the WKG engine)

## 4. Best Immediate Coordination Move

For future agent turns: Do not widen the scope further into runtime execution semantics until the ontology and WKG JSON-schema validations are fully integrated into the test suite. Prioritize integrating the evidence admissibility matrix into your mutation generation logic.