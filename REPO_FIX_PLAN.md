# Repository Fix Plan

## Scope

This pass is limited to repository cleanup, publication hygiene, and GitHub-facing metadata preparation for the public AICL repository. It does not change AICL language semantics.

Open problem explicitly acknowledged before edits: **formal ICC schema** remains unresolved at the language level, but is out of scope for this cleanup pass.

## Files To Delete

- `README (6).md` if present in the repository root
- Root `programming-reference-manual.md` if retained only as a misplaced duplicate
- Root `unified-spec-v1.0-draft.md` if retained only as a misplaced duplicate
- Root `working-draft.md` if retained only as a misplaced duplicate
- Root `latest-review.md` if retained only as a misplaced duplicate
- Root `icc.schema.json` if retained only as a misplaced duplicate

## Files To Move / Create / Update

- Update `README.md` as the single canonical root landing page
- Update `.github/ISSUE_TEMPLATE/language_proposal.md` to the requested content
- Update `.github/ISSUE_TEMPLATE/bug_report.md` to the requested content
- Replace `LICENSE` with the full official Apache License 2.0 text
- Replace `LICENSE-docs` with the full official Creative Commons Attribution 4.0 legal code text
- Create `REPO_FIX_REPORT.md` with final outcomes and any manual follow-up items

## Risks

- Several misleading root files use names that imply canonical spec content, but currently contain unrelated commentary or template text. Deleting them is only safe if the real canonical files already exist in their intended locations and no repository files reference the root copies.
- GitHub license detection may take time to refresh after the license files change.
- GitHub About-box metadata is repository settings, not a tracked file. It may not be writable from this environment even with repository access.

## GitHub Settings That Cannot Be Changed Through Repo Files

- Repository About description
- Repository website URL
- Repository topics

If those settings cannot be updated programmatically from this environment, the exact required values will be recorded in `REPO_FIX_REPORT.md` as manual follow-up.

## Exact Verification Steps

1. Confirm the repository root contains exactly one `README.md` and no `README (6).md`.
2. Confirm the root `README.md` is a publication-quality landing page and does not include issue-template or schema content.
3. Confirm `.github/ISSUE_TEMPLATE/language_proposal.md` and `.github/ISSUE_TEMPLATE/bug_report.md` exist with the requested content.
4. Confirm `LICENSE` contains the full Apache License 2.0 text.
5. Confirm `LICENSE-docs` contains the full CC BY 4.0 legal code text.
6. Confirm any deleted root misfiles are no longer present and their canonical counterparts remain in place.
7. Inspect `git status --short` to verify the exact file changes made by this pass.
8. If possible, query repository metadata to determine whether the GitHub About box was updated; otherwise record manual values in `REPO_FIX_REPORT.md`.
