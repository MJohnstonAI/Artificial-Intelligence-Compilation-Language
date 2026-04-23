# Phase 2 Repo Plan

## Current Structural Problems

1. The intended top-level structure is only partially represented on GitHub because `kernel/`, `tools/`, `wkg/core/`, and `wkg/domains/` have no tracked files.
2. Commentary is uneven:
   - `commentary/claude/` contains the strongest review artifact but lacks an index `README.md`
   - other commentary folders only contain placeholder indexes
3. Canonical cross-linking is thin:
   - `README.md` does not currently point to the flagship enterprise example
   - `spec/programming-reference-manual.md` does not point clearly to schemas, the unified spec, or the flagship example
   - `spec/unified-spec-v1.0-draft.md` is too minimal for its intended role as synthesis target
4. AI contributor guidance is directionally strong but not fully normalized across `AGENTS.md`, `AI_CONTRIBUTOR_GUIDE.md`, and `SKILLS.md`.
5. Supporting metadata has at least one broken reference:
   - `CITATION.cff` still contains a placeholder repository URL
6. `GOVERNANCE.md` assumes a changelog exists, but no `CHANGELOG.md` is currently tracked.
7. Root maintenance artifacts (`REPO_FIX_PLAN.md`, `REPO_FIX_REPORT.md`, and now discovery/phase-2 files) are useful, but they are operational rather than canonical language docs.

## Target Normalized Structure

Phase 2 should normalize the repository toward this tracked structure:

```text
Artificial-Intelligence-Compilation-Language/
|-- README.md
|-- WHY_AICL.md
|-- MANIFESTO.md
|-- ABOUT_THE_ORIGINATOR.md
|-- AI_CONTRIBUTOR_GUIDE.md
|-- AGENTS.md
|-- SKILLS.md
|-- AUTHORS.md
|-- NOTICE
|-- GOVERNANCE.md
|-- CONTRIBUTING.md
|-- SECURITY.md
|-- TRADEMARK.md
|-- SPONSORSHIP_AND_RESEARCH_SUPPORT.md
|-- CITATION.cff
|-- LICENSE
|-- LICENSE-docs
|-- spec/
|   |-- working-draft.md
|   |-- programming-reference-manual.md
|   |-- unified-spec-v1.0-draft.md
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
`-- .github/
```

The main normalization tactic is not large-scale moving. It is to make the intended structure real and reviewable by adding missing tracked index files and tightening canonical cross-links.

## Files To Move

Planned moves: none unless a hidden misplaced file is discovered during implementation.

Rationale:

- Phase 1 already removed the obvious misplaced root files.
- Current issues are mostly missing tracked indexes and weak cross-linking, not file misplacement.

## Files To Merge or Converge

- Converge `README.md` with:
  - `WHY_AICL.md`
  - `MANIFESTO.md`
  - `ABOUT_THE_ORIGINATOR.md`
  - `AI_CONTRIBUTOR_GUIDE.md`
  - `AGENTS.md`
  - `SKILLS.md`
  - `spec/programming-reference-manual.md`
  - `spec/unified-spec-v1.0-draft.md`
  - `examples/enterprise-service-resolution/README.md`
- Converge `spec/programming-reference-manual.md` with:
  - `spec/unified-spec-v1.0-draft.md`
  - `spec/schemas/`
  - `commentary/claude/latest-review.md`
  - flagship example references
- Converge `AGENTS.md`, `AI_CONTRIBUTOR_GUIDE.md`, and `SKILLS.md` so they agree on:
  - read order
  - canonical files
  - schema location
  - commentary location
  - examples location
  - safe editing boundaries

## Files To Leave Alone

These should be edited minimally or left intact unless a small linking/clarity correction is necessary:

- `WHY_AICL.md`
- `MANIFESTO.md`
- `ABOUT_THE_ORIGINATOR.md`
- `examples/enterprise-service-resolution/README.md`
- `commentary/claude/latest-review.md`
- `LICENSE`
- `LICENSE-docs`
- `.github/ISSUE_TEMPLATE/*`

## Placeholders vs Canonical

### Canonical

- `README.md`
- `WHY_AICL.md`
- `MANIFESTO.md`
- `ABOUT_THE_ORIGINATOR.md`
- `AGENTS.md`
- `AI_CONTRIBUTOR_GUIDE.md`
- `SKILLS.md`
- `spec/programming-reference-manual.md`
- `spec/unified-spec-v1.0-draft.md`
- `spec/working-draft.md`
- `commentary/claude/latest-review.md`

### Placeholder or Skeleton

- `commentary/gemini/README.md`
- `commentary/grok/README.md`
- `commentary/chatgpt/README.md`
- `spec/unified-spec-v1.0-draft.md` in its current level of detail
- `spec/working-draft.md` in its current level of detail
- local-only empty structure for `kernel/`, `tools/`, `wkg/core/`, `wkg/domains/`

### Supporting but Non-Canonical

- `AUTHORS.md`
- `CONTRIBUTING.md`
- `GOVERNANCE.md`
- `SECURITY.md`
- `NOTICE`
- `CITATION.cff`
- `SPONSORSHIP_AND_RESEARCH_SUPPORT.md`
- `TRADEMARK.md`
- roadmap docs
- Phase 1 and Phase 2 maintenance reports

## Planned Implementation Steps

1. Add tracked `README.md` files to:
   - `kernel/`
   - `tools/`
   - `wkg/core/`
   - `wkg/domains/`
2. Add `commentary/claude/README.md` and normalize commentary folder index language where useful.
3. Strengthen `README.md` to reference:
   - canonical deeper docs
   - schemas
   - commentary
   - flagship example
4. Strengthen `AI_CONTRIBUTOR_GUIDE.md` and `AGENTS.md` for consistency and explicit repository orientation.
5. Strengthen `SKILLS.md` so capability vs skill semantics and repository placement guidance are clearer.
6. Strengthen `spec/programming-reference-manual.md` and `spec/unified-spec-v1.0-draft.md` with cross-links, not large semantic rewrites.
7. Fix `CITATION.cff` to use the actual repository URL.
8. Resolve the changelog gap by either:
   - creating `CHANGELOG.md`, or
   - removing the governance reference if a changelog is premature
9. Create `REPOSITORY_MAP.md` only if the resulting structure still needs a dedicated map beyond the root `README.md`.
10. Write `PHASE2_REPO_REPORT.md` after verification.

## Risks of Overwriting Important Content

1. `README.md`, `WHY_AICL.md`, `MANIFESTO.md`, and `ABOUT_THE_ORIGINATOR.md` are public identity documents; editorial cleanup must not flatten the project into a generic framework repo.
2. `spec/programming-reference-manual.md` contains the strongest current technical formulation; edits must stay additive and navigational unless a small correction is necessary.
3. `commentary/claude/latest-review.md` is the authoritative review artifact and should not be diluted or paraphrased into weaker text.
4. `spec/unified-spec-v1.0-draft.md` is sparse, but expanding it too aggressively would risk inventing semantics rather than converging existing ones.
5. Empty local directories may tempt over-expansion; Phase 2 should add orientation files, not fabricate deep content.
6. Governance and citation fixes should avoid changing attribution or licensing posture.

## Verification Steps

1. Confirm `DISCOVERY_AUDIT.md` and `PHASE2_REPO_PLAN.md` exist before implementation changes.
2. Confirm the repository still has a single canonical root `README.md`.
3. Confirm all JSON schemas remain under `spec/schemas/`.
4. Confirm commentary is organized under:
   - `commentary/claude/`
   - `commentary/gemini/`
   - `commentary/grok/`
   - `commentary/chatgpt/`
5. Confirm `kernel/`, `tools/`, `wkg/core/`, and `wkg/domains/` have tracked files so the intended structure appears on GitHub.
6. Confirm `README.md`, `spec/programming-reference-manual.md`, `spec/unified-spec-v1.0-draft.md`, and `commentary/claude/latest-review.md` cross-reference sensibly.
7. Confirm `AI_CONTRIBUTOR_GUIDE.md`, `AGENTS.md`, and `SKILLS.md` agree on file orientation and contributor behavior.
8. Confirm the enterprise example is referenced prominently and no game/demo material is elevated above it.
9. Confirm `CITATION.cff` no longer contains placeholder repository metadata.
10. Run `git status --short` and review the final diff before committing.
