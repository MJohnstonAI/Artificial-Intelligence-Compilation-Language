# Discovery Audit: WKG Integration Pass

## Scope

This file records the required discovery/context-acquisition pass for the WKG/kernel integration update.

Open problem explicitly acknowledged before edits, per `AGENTS.md`: **WKG-backed type resolution** remains a load-bearing unresolved problem. This pass is limited to disciplined integration of Gemini's WKG substrate work using Claude's bridge guidance.

Primary formal bridge memo for this pass:

- `C:\Users\marca\Downloads\CLAUDE_WKG_BRIDGE_REVIEW_v1.md`

Supporting risk analysis for this pass:

- `C:\Users\marca\Downloads\wkg-integration-risk-review.md`

## 1. Files Reviewed

Reviewed before any changes:

- `README.md`
- `AGENTS.md`
- `AI_CONTRIBUTOR_GUIDE.md`
- `SKILLS.md`
- `commentary/claude/latest-review.md`
- `spec/programming-reference-manual.md`
- `spec/unified-spec-v1.0-draft.md`
- `spec/architecture/AICL_Architecture_Snapshot_v1.md`
- `spec/History/AICL_Consortium_Decision_History.md`
- `spec/schemas/icc.schema.json`
- `wkg/core/aicl-core-ontology-spec.md`
- `wkg/core/schema.ts`
- `wkg/core/aicl-core-ontology.schema.json`
- `wkg/core/canonical-ontology-registry.md`
- `wkg/core/contradiction-test-corpus.json`
- `wkg/core/example-wkg-snapshot.json`
- `wkg/core/example-delta-log.json`
- `wkg/core/integration-memo.md`
- `wkg/core/README.md`
- `C:\Users\marca\Downloads\CLAUDE_WKG_BRIDGE_REVIEW_v1.md`
- `C:\Users\marca\Downloads\wkg-integration-risk-review.md`

## 2. Current WKG-Related File Inventory

### Core WKG docs and schemas

- `wkg/core/aicl-core-ontology-spec.md`
- `wkg/core/schema.ts`
- `wkg/core/aicl-core-ontology.schema.json`
- `wkg/core/canonical-ontology-registry.md`
- `wkg/core/integration-memo.md`
- `wkg/core/README.md`

### WKG examples and fixtures

- `wkg/core/example-wkg-snapshot.json`
- `wkg/core/example-delta-log.json`
- `wkg/core/contradiction-test-corpus.json`

### Related canonical spec files

- `spec/programming-reference-manual.md`
- `spec/unified-spec-v1.0-draft.md`
- `spec/schemas/icc.schema.json`
- `spec/architecture/AICL_Architecture_Snapshot_v1.md`
- `spec/History/AICL_Consortium_Decision_History.md`

## 3. Where the Current Kernel/WKG Overlap Is

### A. Dual type authority

Current overlap/problem:

- `spec/programming-reference-manual.md` defines kernel-facing core type classes such as `Entity`, `State`, `Metric`, `Policy`, and `Capability`.
- `wkg/core/aicl-core-ontology-spec.md`, `wkg/core/schema.ts`, and `wkg/core/aicl-core-ontology.schema.json` also define `Entity`, `Environment`, `State`, `Evidence`, `Metric`, `Policy`, `Capability`, `Resource`, and `Goal`.
- `spec/architecture/AICL_Architecture_Snapshot_v1.md` says major identifiers resolve to WKG-backed anchors, but does not fully resolve the authority split against the kernel categories.

Bridge implication:

- The repo currently implies both a kernel-level type authority and a WKG-level semantic authority.
- Claude's bridge fix is necessary: semantic identity must come from the WKG, while kernel categories must be compiler-facing labels over WKG anchors.

### B. Ambiguous `State`

Current overlap/problem:

- `wkg/core/schema.ts` and `wkg/core/aicl-core-ontology.schema.json` define a single `State` shape.
- `wkg/core/aicl-core-ontology-spec.md` imposes a grounding rule that every `State` must have evidence.
- `wkg/core/example-wkg-snapshot.json` and `wkg/core/example-delta-log.json` model runtime state facts with `relations.evidenced_by`.
- `spec/programming-reference-manual.md` still treats `State` as a compile-time language category for declarations such as `goal`, `maintain`, and `avoid`.

Bridge implication:

- The current model conflates:
  - compile-time semantic state declarations
  - runtime observed state facts
- This directly conflicts with Claude's bridge review. The ontology must be split into:
  - `StateAnchor`
  - `StateObservation`

### C. Snapshot/provenance mismatch

Current overlap/problem:

- `spec/schemas/icc.schema.json` currently requires `wkg_hash`.
- WKG docs and delta-log artifacts use `parent_wkg_hash` / `new_wkg_hash`.
- Neither the manual nor the ICC schema currently state clearly that identifier resolution occurs against a pinned WKG snapshot during compilation.

Bridge implication:

- Reproducible kernel compilation needs explicit snapshot binding.
- The ICC should require `wkg_snapshot_hash`, with documentation tying identifier resolution to a pinned snapshot.

### D. Contradiction handling by stage is under-specified

Current overlap/problem:

- `spec/programming-reference-manual.md` describes compile-time contradiction handling in module/policy imports.
- `wkg/core/aicl-core-ontology-spec.md` describes runtime contradiction surfaces inside the WKG engine and delta-log path.
- The repo does not yet present these as stage-specific defenses in one coherent model.

Bridge implication:

- The documents need explicit distinction between:
  - compile-time contradictions during kernel normalization / constraint analysis
  - runtime contradictions during WKG delta-log mutation / live update handling

## 4. What Files Are Authoritative

These should be treated as authoritative or normative for this pass:

- `spec/programming-reference-manual.md`
- `spec/unified-spec-v1.0-draft.md`
- `spec/schemas/icc.schema.json`
- `wkg/core/schema.ts`
- `wkg/core/aicl-core-ontology.schema.json`
- `wkg/core/aicl-core-ontology-spec.md`
- `wkg/core/canonical-ontology-registry.md`
- `wkg/core/integration-memo.md`
- `commentary/claude/latest-review.md` as authoritative review guidance
- `C:\Users\marca\Downloads\CLAUDE_WKG_BRIDGE_REVIEW_v1.md` as the primary bridge memo for this pass
- `C:\Users\marca\Downloads\wkg-integration-risk-review.md` as supporting risk analysis

Notes:

- `schema.ts` and `aicl-core-ontology.schema.json` are the strongest machine-readable WKG authority.
- `aicl-core-ontology-spec.md` is the textual WKG semantics companion.
- `integration-memo.md` already contains an authoritative-vs-illustrative distinction and should likely remain the main coordination note for that.

## 5. What Files Are Illustrative / Examples / Fixtures

- `wkg/core/example-wkg-snapshot.json`
- `wkg/core/example-delta-log.json`
- `wkg/core/contradiction-test-corpus.json`

Notes:

- `contradiction-test-corpus.json` should remain explicitly machine-readable test input, not normative ontology law.
- The example snapshot and delta log should be updated to reflect the `StateAnchor` / `StateObservation` split and snapshot protocol, but remain illustrative.

## 6. What Must Be Changed

Critical bridge fixes required:

1. Add an explicit type-authority statement making the WKG the semantic authority and the kernel categories compiler-facing labels over WKG anchors.
2. Replace ambiguous `State` with `StateAnchor` and `StateObservation` in:
   - `wkg/core/schema.ts`
   - `wkg/core/aicl-core-ontology.schema.json`
   - `wkg/core/aicl-core-ontology-spec.md`
   - affected examples and registry text
3. Add a WKG snapshot concept and `wkg_snapshot_hash` binding in:
   - WKG schema/spec docs
   - ICC schema
   - programming reference manual
4. Make contradiction handling explicitly stage-aware across:
   - compile-time kernel contradiction handling
   - runtime WKG contradiction handling
5. Mark authoritative vs illustrative WKG artifacts clearly in coordination docs and/or WKG docs.
6. Link the WKG core documents into disciplined canonical read paths in:
   - `README.md`
   - `AGENTS.md`
   - `AI_CONTRIBUTOR_GUIDE.md`
7. Check architecture/history doc discoverability without renaming folders casually.

## 7. What Must Not Be Casually Changed

High-caution files for this pass:

- `README.md`
- `WHY_AICL.md`
- `MANIFESTO.md`
- `ABOUT_THE_ORIGINATOR.md`
- `commentary/claude/latest-review.md`
- `spec/programming-reference-manual.md`
- `spec/unified-spec-v1.0-draft.md`
- `spec/architecture/AICL_Architecture_Snapshot_v1.md`
- `spec/History/AICL_Consortium_Decision_History.md`

Reason:

- These files define public identity, historical lineage, or formal/spec posture.
- They should be tightened only where the WKG bridge changes require it.

## Additional Observations

- `spec/architecture/AICL_Architecture_Snapshot_v1.md` already points toward WKG-backed resolution, so it may only need a small authority clarification rather than a broader rewrite.
- `spec/History/AICL_Consortium_Decision_History.md` is historical and should not be deeply rewritten; if touched, it should only be for linkage clarity, not retrospective reinterpretation.
- The architecture snapshot's recommended reading order refers to `AICL_Consortium_Decision_History_and_Meeting_Notes_v3.md`, but the actual tracked history file is `spec/History/AICL_Consortium_Decision_History.md`. This is a safe link/reference issue to note.
