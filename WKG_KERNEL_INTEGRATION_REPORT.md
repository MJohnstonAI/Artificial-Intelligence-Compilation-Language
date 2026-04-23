# WKG Kernel Integration Report

## Scope

This pass integrated Gemini's WKG substrate work into the AICL repository using:

- `C:\Users\marca\Downloads\CLAUDE_WKG_BRIDGE_REVIEW_v1.md` as the primary formal bridge memo
- `C:\Users\marca\Downloads\wkg-integration-risk-review.md` as supporting risk analysis

Where the two differed in granularity, the narrower actionable guidance from the bridge memo was followed.

## What Changed

### 1. WKG semantic authority is now explicit

Why:

- the repo previously implied two competing type authorities at the kernel and WKG layers

What changed:

- the WKG core spec, registry, integration memo, programming reference manual, and unified spec now state that the WKG is the authoritative source of semantic identity
- kernel type classes are now described consistently as compiler-facing category labels over WKG anchors
- the architecture snapshot now includes a light-touch note that compile-time resolution uses a pinned WKG snapshot recorded in the ICC

### 2. `State` was split into compile-time and runtime forms

Why:

- the old single `State` shape incorrectly forced runtime evidence requirements onto compile-time declarations

What changed:

- `wkg/core/schema.ts` now defines `StateAnchor` and `StateObservation`
- `wkg/core/aicl-core-ontology.schema.json` mirrors that split
- `wkg/core/aicl-core-ontology-spec.md` explains the distinction directly
- examples and registry text now use the split consistently
- the contradiction corpus now refers to `StateObservation` for runtime grounding failures

### 3. WKG snapshot binding was added to the compilation contract

Why:

- reproducible compilation requires semantic resolution against a pinned snapshot instead of a moving WKG head

What changed:

- `WKGSnapshot` was added to the WKG schema/spec layer
- `spec/schemas/icc.schema.json` now requires `wkg_snapshot_hash`
- the programming reference manual and unified spec now describe pinned-snapshot resolution explicitly
- registry and memo language now reinforce snapshot provenance rules

### 4. Contradiction handling is now stage-aware

Why:

- compile-time escalation and runtime halts were previously described as if they might be competing systems

What changed:

- the WKG core spec and programming reference manual now distinguish:
  - compile-time contradictions during normalization and constraint analysis
  - runtime contradictions during delta-log mutation handling
- the programming reference manual now includes a stage-annotated `ontology_conflict_policy`
- the unified spec includes the same stage boundary as a convergence constraint

### 5. WKG artifact roles are now clearer

Why:

- authoritative schema/spec files and illustrative examples were not clearly separated

What changed:

- `wkg/core/integration-memo.md` now marks authoritative vs illustrative artifacts directly
- `wkg/core/README.md` now gives a disciplined read order and file-role breakdown
- `wkg/core/canonical-ontology-registry.md` now documents naming, logical minimums, and snapshot rules with the new state split

### 6. Canonical repo read paths now expose the WKG layer without clutter

Why:

- the WKG work existed but was not easy to discover from the main contributor entry points

What changed:

- `README.md` now points to the WKG core area in the schemas/commentary/examples section
- `AGENTS.md` and `AI_CONTRIBUTOR_GUIDE.md` now include the WKG core files in their read paths and caution boundaries
- `spec/unified-spec-v1.0-draft.md` and `spec/programming-reference-manual.md` now cross-link to the WKG core semantics layer
- `spec/architecture/AICL_Architecture_Snapshot_v1.md` now links to the actual tracked decision history file instead of the old missing filename

## Files Edited

- `README.md`
- `AGENTS.md`
- `AI_CONTRIBUTOR_GUIDE.md`
- `spec/architecture/AICL_Architecture_Snapshot_v1.md`
- `spec/programming-reference-manual.md`
- `spec/schemas/icc.schema.json`
- `spec/unified-spec-v1.0-draft.md`
- `wkg/core/README.md`
- `wkg/core/aicl-core-ontology-spec.md`
- `wkg/core/aicl-core-ontology.schema.json`
- `wkg/core/canonical-ontology-registry.md`
- `wkg/core/contradiction-test-corpus.json`
- `wkg/core/example-delta-log.json`
- `wkg/core/example-wkg-snapshot.json`
- `wkg/core/integration-memo.md`
- `wkg/core/schema.ts`

## Files Created

- `DISCOVERY_AUDIT_PHASE_WKG.md`
- `WKG_KERNEL_INTEGRATION_PLAN.md`
- `WKG_KERNEL_INTEGRATION_REPORT.md`

## Verification Performed

Mechanical checks completed:

- parsed `wkg/core/example-wkg-snapshot.json`
- parsed `wkg/core/example-delta-log.json`
- parsed `wkg/core/contradiction-test-corpus.json`
- parsed `spec/schemas/icc.schema.json`
- parsed `wkg/core/aicl-core-ontology.schema.json`
- verified the example snapshot contains both `StateAnchor` and `StateObservation`
- verified the example delta log `UPDATE_STATE` mutation carries `evidence_refs`
- verified the example delta log capability reference exists in the example snapshot
- verified `spec/schemas/icc.schema.json` requires `wkg_snapshot_hash`
- verified the old `wkg_hash` field was removed from the ICC schema
- verified the ontology schema still requires `evidence_refs` on `StateObservation`
- verified README / AGENTS / AI contributor guide / unified spec / architecture snapshot contain the intended WKG and history references
- reviewed `git diff --stat` for scope sanity

## Unresolved Issues

- No full schema-validation harness was added in this pass. The JSON files were parsed and checked with targeted assertions, but a dedicated validator is still future work.
- `predicate_signature`, `evaluator_signature`, and `execution_signature` remain implementation placeholders rather than finalized execution-model commitments.
- The ICC schema remains intentionally narrow. This pass added `wkg_snapshot_hash` but did not fully formalize `ContradictionRecord`, `WKGNodeRef`, or richer provenance objects.
- `spec/History/` remains mixed-case. It was left unchanged intentionally to avoid churn and broken links in a focused bridge pass.

## Risky Follow-Ups Deferred

- full compiler-side capability effect-label to WKG capability resolution rules
- full ICC contradiction-record shape and provenance model
- stronger schema-to-example validation tooling under `tools/` or `wkg/core/`
- deeper environment semantics beyond the current `app {}` to `Environment` cross-reference
- broader skill/resource accounting alignment across WKG and skill-contract work

## Suggested Next-Step Assignments

### Claude

- review the updated kernel/WKG bridge wording for proof soundness
- formalize the next-pass `ContradictionRecord` and compile-time/runtime boundary language in the ICC model
- review capability effect-label mapping and proof obligations around capability imports

### Gemini

- extend domain ontology work under `wkg/domains/` without changing the locked core bridge contract
- add more authoritative example snapshots and delta logs for non-trivial policy/resource scenarios
- propose a narrow validator strategy for schema/example lockstep checking

### Grok

- stress-test runtime contradiction, cycle, and resource-exhaustion scenarios
- review whether the contradiction corpus needs additional adversarial runtime fixtures
- explore bounded adaptation cases that respect the new compile-time/runtime separation

### ChatGPT / Professor AI

- continue editorial convergence between the programming reference manual, unified spec, architecture snapshot, and public README
- keep contributor guidance and publication-facing structure coherent as more WKG and kernel work lands
- prepare the next repo-level normalization pass only after compiler- and validator-facing artifacts stabilize further
