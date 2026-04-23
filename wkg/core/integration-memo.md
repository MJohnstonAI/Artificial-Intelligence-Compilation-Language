# AICL Integration Memo for Core AI Agents

**Target**: `Claude`, `Codex`, `Gemini`, `Grok`, and future core contributors
**Context**: WKG substrate and kernel bridge alignment (v1.2)

## 1. Formal Assumptions for This Integration Pass

The bridge contract for this pass is intentionally narrow.

1. **WKG semantic authority**: The WKG is the authoritative source of semantic identity for `Goal`, `StateAnchor`, `Policy`, `Capability`, `Metric`, `Entity`, `Resource`, `Environment`, and `Evidence` anchors. Kernel type classes are compiler-facing category labels over WKG anchors.
2. **Pinned resolution**: Identifier resolution during compilation runs against a pinned `WKGSnapshot`. The ICC records that provenance in `wkg_snapshot_hash`.
3. **Policies over goals**: Goals remain aspirational; policies remain invariants. If satisfying a goal would violate an active policy, the path is blocked.
4. **Grounding axiom applies at runtime**: `StateAnchor` is a compile-time declaration form and does not require evidence. `StateObservation` is a runtime observed fact and must include `evidence_refs`.
5. **Stage-aware contradiction handling**: Compile-time contradictions discovered during kernel normalization escalate or fail compilation. Runtime contradictions discovered in delta-log mutation validation halt the mutation path.
6. **Resource conservation**: Capability execution remains subject to resource pre-flight checks against environment capacity and live allocations.

## 2. Machine-Readable Artifacts to Validate Against

When generating schema changes, fixtures, or related compiler assumptions, validate against the committed WKG core artifacts. Do not invent parallel types or relation names.

- **`wkg/core/schema.ts`**: TypeScript source of truth for WKG anchor, snapshot, and mutation shapes.
- **`wkg/core/aicl-core-ontology.schema.json`**: JSON Schema companion for snapshots, anchors, and delta-log entries.
- **`wkg/core/aicl-core-ontology-spec.md`**: Textual semantics companion, including relation vocabulary, admissibility, contradiction taxonomy, and snapshot protocol.
- **`wkg/core/canonical-ontology-registry.md`**: Naming conventions and logical minimums.

## 3. Authoritative vs Illustrative Artifacts

### Authoritative / normative

- `wkg/core/schema.ts`
- `wkg/core/aicl-core-ontology.schema.json`
- relation vocabulary in `wkg/core/aicl-core-ontology-spec.md`
- evidence admissibility rules in `wkg/core/aicl-core-ontology-spec.md`
- registry conventions in `wkg/core/canonical-ontology-registry.md`

### Illustrative / examples / fixtures

- `wkg/core/example-wkg-snapshot.json`
- `wkg/core/example-delta-log.json`
- `wkg/core/contradiction-test-corpus.json`

The contradiction corpus is machine-readable test input for runtime validation work. It is not normative ontology law.

## 4. Narrow Integration Guardrails

- Do not re-open the nine-pillar ontology taxonomy in this pass.
- Do not redesign kernel syntax to mirror every WKG runtime object.
- Do not treat `predicate_signature` or `execution_signature` as a final execution model; they remain implementation placeholders.
- Do not widen this pass into full runtime execution semantics or skill-resource redesign.

## 5. Best Immediate Coordination Move

Near-term coordination should stay focused on three things:

1. keep schema, JSON examples, and textual spec language aligned,
2. keep compile-time and runtime semantics distinct,
3. bind compiler provenance to `wkg_snapshot_hash` so future compiler work remains reproducible.
