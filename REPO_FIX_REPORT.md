# Repository Fix Report

## What Changed

- Rewrote the root `README.md` as the canonical GitHub landing page for AICL.
- Updated `.github/ISSUE_TEMPLATE/language_proposal.md` to the requested proposal template text.
- Verified `.github/ISSUE_TEMPLATE/bug_report.md` is present in the correct location and already matched the requested content.
- Replaced `LICENSE` with the full official Apache License 2.0 text.
- Replaced `LICENSE-docs` with the full official Creative Commons Attribution 4.0 legal code text.
- Removed several misleading root files whose names implied canonical spec assets but whose contents were unrelated commentary or template material.
- Added `REPO_FIX_PLAN.md` and this report.

## Deleted Files

- `programming-reference-manual.md`
- `unified-spec-v1.0-draft.md`
- `working-draft.md`
- `latest-review.md`
- `icc.schema.json`

## Created Files

- `REPO_FIX_PLAN.md`
- `REPO_FIX_REPORT.md`

## Moved Files

- No repository files were moved in this pass.
- `README (6).md` was not present, so no delete or rename action was required for that filename.

## Verification Summary

- Confirmed the repository root now contains only one `README.md`.
- Confirmed `.github/ISSUE_TEMPLATE/` contains:
  - `language_proposal.md`
  - `bug_report.md`
- Confirmed the root `README.md` is a public-facing landing page and does not contain issue-template front matter or schema content.
- Confirmed the stray root misfiles listed above are no longer present.
- Confirmed canonical files remain in their intended locations under `spec/`, `commentary/`, and `.github/`.
- Confirmed `LICENSE` now contains the full official Apache License 2.0 text.
- Confirmed `LICENSE-docs` now contains the full official CC BY 4.0 legal code text.

## Unresolved Items

- The GitHub About box was **not** updated programmatically in this environment.
- Local `gh` CLI is not installed.
- The available GitHub connector in this session exposed repository read access but not repository-settings update operations for description, homepage, or topics.

## About Box Status

**Actually set:** No

### Manual GitHub About box values

**Description**  
AICL is an open research project for an AI-native semantic programming language designed for AI systems to express intent, constraints, capabilities, policies, and deployable artifacts.

**Website**  
https://github.com/MJohnstonAI/Artificial-Intelligence-Compilation-Language

**Topics**

- aicl
- artificial-intelligence
- programming-language
- semantic-compilation
- ai-agents
- formal-methods
- compiler-design
- multimodal-ai
- ontology
- wkg
- research
- open-source

## GitHub License Detection Caveat

GitHub license detection may take some time to refresh after the updated license files are pushed. The repository now contains the full official texts, but the badge and repository metadata may lag briefly.

## Exact Manual Follow-Up Steps

1. Open the GitHub repository settings or repository home page edit controls.
2. Update the About description to the value listed above.
3. Set the Website field to the value listed above.
4. Add the topics listed above.
5. Push the committed cleanup changes to GitHub.
6. Refresh the repository home page and confirm:
   - the new `README.md` renders as the landing page
   - issue templates appear when opening a new issue
   - GitHub recognizes the license files after processing
