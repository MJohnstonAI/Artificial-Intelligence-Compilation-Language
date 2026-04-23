# WKG Kernel Integration Plan

Primary formal guide for this plan:

- `C:\Users\marca\Downloads\CLAUDE_WKG_BRIDGE_REVIEW_v1.md`

Supporting risk detail:

- `C:\Users\marca\Downloads\wkg-integration-risk-review.md`

## Exact Files To Edit

### Critical bridge fixes

- `wkg/core/schema.ts`
- `wkg/core/aicl-core-ontology.schema.json`
- `wkg/core/aicl-core-ontology-spec.md`
- `wkg/core/example-wkg-snapshot.json`
- `wkg/core/example-delta-log.json`
- `wkg/core/canonical-ontology-registry.md`
- `wkg/core/integration-memo.md`
- `spec/programming-reference-manual.md`
- `spec/unified-spec-v1.0-draft.md`
- `spec/schemas/icc.schema.json`

### Repo discoverability / read-path updates

- `README.md`
- `AGENTS.md`
- `AI_CONTRIBUTOR_GUIDE.md`

### Optional light-touch support edits if needed

- `spec/architecture/AICL_Architecture_Snapshot_v1.md`
- `wkg/core/README.md`

## Exact Files To Create

Required creation for this pass:

- `WKG_KERNEL_INTEGRATION_REPORT.md`

Potential creation only if necessary during implementation:

- no new code or schema files are planned by default
- no folder renames are planned
- no large validation subsystem is planned

## Exact Files To Update With Links

- `README.md`
  - add disciplined WKG-core references without turning the landing page into a schema dump
- `AGENTS.md`
  - add WKG core docs to the canonical/recommended read path
- `AI_CONTRIBUTOR_GUIDE.md`
  - add WKG docs to contributor orientation and clarify their role
- `spec/programming-reference-manual.md`
  - add references to WKG core spec and ICC snapshot binding
- `spec/unified-spec-v1.0-draft.md`
  - add WKG integration targets and stage-aware contradiction handling language

## Planned Implementation Order

1. Update `wkg/core/schema.ts` to:
   - split `State` into `StateAnchor` and `StateObservation`
   - add `evidence_refs` to `StateObservation`
   - add `WKGSnapshot` and snapshot-aware delta-log support
2. Update `wkg/core/aicl-core-ontology.schema.json` to mirror the TypeScript changes exactly.
3. Update `wkg/core/aicl-core-ontology-spec.md` to:
   - state WKG semantic authority explicitly
   - explain kernel type classes as compiler-facing category labels
   - distinguish `StateAnchor` vs `StateObservation`
   - add snapshot binding language
   - make contradiction handling explicitly stage-aware
4. Update `wkg/core/example-wkg-snapshot.json` and `wkg/core/example-delta-log.json` to use the new state forms and snapshot fields consistently.
5. Update `wkg/core/canonical-ontology-registry.md` and `wkg/core/integration-memo.md` to:
   - reflect the new state split
   - reinforce authoritative vs illustrative file roles
6. Update `spec/schemas/icc.schema.json` to replace `wkg_hash` with `wkg_snapshot_hash`.
7. Update `spec/programming-reference-manual.md` and `spec/unified-spec-v1.0-draft.md` with the bridge clarifications:
   - semantic authority
   - snapshot binding
   - stage-aware contradiction handling
8. Apply light-touch discoverability updates in `README.md`, `AGENTS.md`, and `AI_CONTRIBUTOR_GUIDE.md`.
9. Apply a minimal architecture snapshot correction only if needed for consistency and link clarity.
10. Verify consistency across schema, examples, docs, and terminology; then write the final report.

## Risks

1. **Scope creep risk**
   - The WKG work invites broader redesign, but this pass must stay narrow and bridge-focused.
2. **Schema/docs drift risk**
   - `schema.ts`, `.schema.json`, and examples can easily diverge if not updated in lockstep.
3. **Overwriting history risk**
   - `spec/History/AICL_Consortium_Decision_History.md` is historical and should not be rewritten to match the new bridge language.
4. **Public-facing clutter risk**
   - `README.md` can become too low-level if WKG links are added without discipline.
5. **Compatibility ambiguity risk**
   - Leaving old ambiguous `State` language partially intact would weaken the bridge fix.

## Verification Steps

1. Confirm `DISCOVERY_AUDIT_PHASE_WKG.md` exists before implementation changes.
2. Confirm `WKG_KERNEL_INTEGRATION_PLAN.md` exists before implementation changes.
3. Confirm `schema.ts` and `aicl-core-ontology.schema.json` both define:
   - `StateAnchor`
   - `StateObservation`
   - `WKGSnapshot`
4. Confirm `StateAnchor` does not require evidence refs.
5. Confirm `StateObservation` does require `evidence_refs`.
6. Confirm `example-wkg-snapshot.json` and `example-delta-log.json` use the new state structures correctly.
7. Confirm `spec/schemas/icc.schema.json` requires `wkg_snapshot_hash`.
8. Confirm the programming reference manual explicitly states:
   - WKG semantic authority
   - kernel type classes as compiler-facing labels over WKG anchors
   - pinned-snapshot identifier resolution
   - stage-aware contradiction handling
9. Confirm `wkg/core/integration-memo.md` and/or related WKG docs clearly label authoritative vs illustrative artifacts.
10. Confirm `README.md`, `AGENTS.md`, and `AI_CONTRIBUTOR_GUIDE.md` reference the new WKG docs without overloading public framing.
11. Confirm no broken local Markdown links were introduced.
12. Review `git diff --stat` and `git status --short` before committing.
