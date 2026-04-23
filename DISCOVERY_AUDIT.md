# Discovery Audit

## Scope

This file records the required discovery/context-acquisition pass before any Phase 2 structural edits.

Open problem explicitly acknowledged before edits, per `AGENTS.md`: **skill registry semantics** remains unresolved at the language level, but this Phase 2 pass is focused on repository structure, cross-linking, and contributor guidance rather than semantics changes.

## Repo Tree Summary

### Tracked repository surface

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
|-- SPONSORSHIP_AND_RESEARCH_SUPPORT.md
|-- TRADEMARK.md
|-- NOTICE
|-- CITATION.cff
|-- LICENSE
|-- LICENSE-docs
|-- REPO_FIX_PLAN.md
|-- REPO_FIX_REPORT.md
|-- .github/
|   `-- ISSUE_TEMPLATE/
|       |-- bug_report.md
|       `-- language_proposal.md
|-- commentary/
|   |-- chatgpt/README.md
|   |-- claude/latest-review.md
|   |-- gemini/README.md
|   `-- grok/README.md
|-- examples/
|   |-- cross-platform-app-brief/README.md
|   `-- enterprise-service-resolution/README.md
|-- roadmap/
|   `-- README.md
`-- spec/
    |-- programming-reference-manual.md
    |-- unified-spec-v1.0-draft.md
    |-- working-draft.md
    `-- schemas/
        |-- agent-capsule.schema.json
        |-- icc.schema.json
        `-- skill-contract.schema.json
```

### Local-only empty directories currently present but not tracked

These exist in the working directory but contain no tracked files, so GitHub will not present them as repository structure:

- `kernel/`
- `tools/`
- `wkg/core/`
- `wkg/domains/`

## File Classification

### Canonical

These appear to be core identity or specification documents and should be treated as canonical or canonical-intent:

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
- `examples/enterprise-service-resolution/README.md`

Notes:

- `spec/programming-reference-manual.md` is the strongest current technical baseline.
- `spec/unified-spec-v1.0-draft.md` is canonical in intent, but currently very thin and still functions more as a synthesis stub than a mature spec.
- `spec/working-draft.md` is canonical as a collaboration pointer layer, not yet a substantive draft body.

### Supporting

- `AUTHORS.md`
- `CONTRIBUTING.md`
- `GOVERNANCE.md`
- `SECURITY.md`
- `SPONSORSHIP_AND_RESEARCH_SUPPORT.md`
- `TRADEMARK.md`
- `NOTICE`
- `CITATION.cff`
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/language_proposal.md`
- `roadmap/README.md`
- `REPO_FIX_PLAN.md`
- `REPO_FIX_REPORT.md`

### Commentary

- `commentary/claude/latest-review.md`
- `commentary/gemini/README.md`
- `commentary/grok/README.md`
- `commentary/chatgpt/README.md`

Observations:

- Claude commentary is substantive and should remain the authoritative commentary artifact for now.
- Gemini, Grok, and ChatGPT commentary areas are present but only contain placeholder index text.
- `commentary/claude/` has no `README.md` index, unlike the other commentary folders.

### Schema

- `spec/schemas/icc.schema.json`
- `spec/schemas/agent-capsule.schema.json`
- `spec/schemas/skill-contract.schema.json`

Observations:

- Schema placement is now correct.
- The schemas are concise and plausible, but still lightweight relative to the spec language; they should be treated as early draft schemas, not final normative schemas.

### Example

- `examples/enterprise-service-resolution/README.md`
- `examples/cross-platform-app-brief/README.md`

Observations:

- `enterprise-service-resolution` is correctly the serious flagship example.
- `cross-platform-app-brief` is secondary and appropriately lightweight.

### Duplicate / Misplaced

Confirmed cleanups from Phase 1:

- No duplicate root `README` remains.
- No stray root schema files remain.
- No root fake-spec or fake-commentary files remain.

Possible remaining placement concerns:

- `REPO_FIX_PLAN.md` and `REPO_FIX_REPORT.md` are process artifacts in the repository root. They are not harmful, but they are maintenance documents rather than enduring project docs.

### Unclear / Needs Review

- `spec/unified-spec-v1.0-draft.md` is canonical in intent but currently too brief for its role as synthesis target.
- `spec/working-draft.md` is structurally correct but functions mostly as a pointer note.
- `CITATION.cff` contains a placeholder repository URL and needs correction.
- `GOVERNANCE.md` references “the changelog,” but no `CHANGELOG.md` exists.
- `spec/unified-spec-v1.0-draft.md` mentions “Professor AI synthesis,” which has no corresponding tracked file or documented meaning elsewhere in the repo.
- Empty local directories (`kernel/`, `tools/`, `wkg/core/`, `wkg/domains/`) create the appearance of structure locally but are not represented on GitHub.

## Files That Should Not Be Touched Without Caution

High-caution identity/spec files:

- `README.md`
- `WHY_AICL.md`
- `MANIFESTO.md`
- `ABOUT_THE_ORIGINATOR.md`
- `spec/programming-reference-manual.md`
- `spec/unified-spec-v1.0-draft.md`
- `AGENTS.md`
- `AI_CONTRIBUTOR_GUIDE.md`
- `SKILLS.md`
- `commentary/claude/latest-review.md`

Reason:

- These files define project identity, public framing, contributor operating rules, or the strongest current language semantics.
- They should be converged and cross-linked carefully, not overwritten casually.

## Missing Files the Repository Expects

Based on the intended structure and current documentation, these are missing or effectively missing:

- `kernel/README.md` to keep the kernel directory visible on GitHub and explain intended contents
- `tools/README.md` to keep the tools directory visible on GitHub and explain intended contents
- `wkg/core/README.md` to keep the WKG core directory visible on GitHub and explain intended contents
- `wkg/domains/README.md` to keep the WKG domains directory visible on GitHub and explain intended contents
- `commentary/claude/README.md` to normalize commentary folder indexing
- Possibly `CHANGELOG.md`, because `GOVERNANCE.md` assumes one exists

Optional but potentially useful:

- `REPOSITORY_MAP.md` if Phase 2 changes make structure clearer without bloating the root `README.md`

## Broken or Suspicious References

Confirmed broken/suspicious items:

- `CITATION.cff` contains a placeholder URL:
  - `repository-code: "https://github.com/<your-username>/aicl"`
- `GOVERNANCE.md` refers to “the changelog,” but no `CHANGELOG.md` is present.
- `AI_CONTRIBUTOR_GUIDE.md` references `wkg/core/` and `wkg/domains/`, but those areas have no tracked files yet.
- `README.md` presents `wkg/`, `kernel/`, and `tools/` as repo structure, but those directories currently have no tracked content.
- `spec/unified-spec-v1.0-draft.md` references “Professor AI synthesis,” which is not grounded elsewhere in the repository.

No broken local Markdown links were detected in the current tracked Markdown files.

## Recommendations for Safe Phase 2 Edits

1. Preserve the current identity docs and formal manual; improve cross-links instead of rewriting them.
2. Keep `README.md` as the public landing page and avoid turning it into the full white paper.
3. Strengthen `spec/unified-spec-v1.0-draft.md` as a synthesis map that explicitly points to the manual, working draft, schemas, commentary, and flagship example.
4. Add tracked `README.md` files to `kernel/`, `tools/`, `wkg/core/`, and `wkg/domains/` so the intended structure actually exists on GitHub.
5. Add `commentary/claude/README.md` and normalize commentary folder indexing without removing `latest-review.md`.
6. Update `AI_CONTRIBUTOR_GUIDE.md`, `AGENTS.md`, and `SKILLS.md` for consistency about:
   - read order
   - canonical files
   - schema location
   - commentary location
   - example location
   - what not to overwrite
7. Keep `examples/enterprise-service-resolution/README.md` prominent and reference it from the root `README.md` and spec docs where helpful.
8. Fix `CITATION.cff` repository metadata.
9. Decide whether to create `CHANGELOG.md` or remove the governance reference to it; either path is safer than leaving a dangling reference.
10. Do not delete Phase 1 artifacts casually; if root cleanliness becomes a concern, archive them deliberately rather than silently removing them.
