# Public Readiness Preparation Plan

## Objective

Prepare AICL for broad public advertising while preserving research accuracy and avoiding unsupported claims.

## Audience

- academic reviewers
- students
- programming language researchers
- compiler researchers
- AI-agent developers
- local/autonomous agent communities
- open-source contributors

## Non-Goals

- no production compiler claim
- no official external platform integration claim
- no safety certification claim
- no broad redesign of AICL
- no private product/game references

## Files to Add

- `GLOSSARY.md` to define AICL terminology for new visitors.
- `ROADMAP.md` to show a buildable research path from specification consolidation to conformance evaluation.
- `docs/reviewer-quickstart.md` to guide academic, student, AI-agent, and technical reviewers.
- `docs/public-claim-guide.md` to define safe public advertising language and claims to avoid.
- `docs/public-launch-checklist.md` to provide a pre-advertising readiness checklist.
- `.github/ISSUE_TEMPLATE/contradiction-report.md` for semantic conflicts, proof-boundary issues, and compile/runtime boundary reports.
- `.github/ISSUE_TEMPLATE/ai-model-evaluation.md` for structured AI-model reviews.
- `.github/workflows/validate-repository.yml` for JSON syntax validation and unsafe public-claim checks.

## Files to Update

- `PUBLIC_STATUS.md`: improve the existing status file to include the required exact research-stage limitation and clearer public-claim guidance.
- `README.md`: add a short public review status section and add the public-readiness files to the repository layout without rewriting the README.
- `WHY_AICL.md`: add a research-thesis disclaimer after the title.
- `CONTRIBUTING.md`: append pull-request scope guidance, public-readiness rules, and JSON validation guidance.

## Claim Discipline

Safe claim language should describe AICL as a research-stage semantic language specification and open research project. It may say AICL explores AI-native semantic programming, semantic compilation from intent and constraints, WKG-backed meaning, proof obligations, workflows, and materialized artifacts.

Unsafe claim language includes production compiler claims, safety certification claims, official external platform integration claims, universal replacement claims, guaranteed autonomous-agent safety, and claims that every app can be compiled today.

Public wording should be sober, precise, and defensible. It should invite critique rather than imply that unresolved compiler, verifier, runtime, and conformance work is already complete.

## Validation

Validation before committing should include:

- JSON validation for all repository JSON files.
- Markdown local link checks for changed Markdown files.
- Forbidden public-claim wording checks for unsupported claims.
- Private wording checks to ensure no private product or non-public concept references were introduced.
- Public-review checks confirming README links the new files, issue templates exist, the validation workflow exists, and StudyPath is not referenced from this branch unless already merged into `main`.

## Rollback

The public-readiness changes should be isolated on `feature/public-readiness-prep`. To revert cleanly, revert the final public-readiness commit or close the public-readiness PR without merging. The StudyPath branch and PR are not modified by this work.
