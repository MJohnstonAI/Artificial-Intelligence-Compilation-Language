# AICL AI-Model Evaluation

This directory provides an onboarding layer for external reviewers who want to run an AI model against AICL and submit structured findings.

These documents are evaluation support material. They do not define canonical kernel semantics and do not modify Kernel v0.1.1.

## Start Here

1. Read [`AI_MODEL_EVALUATION_GUIDE.md`](AI_MODEL_EVALUATION_GUIDE.md).
2. Use [`MODEL_REVIEW_PROMPT.md`](MODEL_REVIEW_PROMPT.md) as the model-facing review prompt.
3. Record results with [`STRUCTURED_FINDINGS_TEMPLATE.md`](STRUCTURED_FINDINGS_TEMPLATE.md).

## Evaluation Scope

The goal is to test whether an AI model can:

- understand AICL's core purpose,
- distinguish canonical kernel material from research-track proposals,
- identify semantic gaps or contradictions,
- evaluate implementability,
- preserve stated boundaries around safety, proof, policy, WKG grounding, and materialization,
- produce concrete, reviewable findings.

## Boundary

Model findings are not authoritative by themselves.

A finding becomes actionable only when it states:

1. the exact document and section,
2. the problem,
3. why the current wording or structure is insufficient,
4. a proposed correction or decision,
5. downstream impact on kernel, WKG, proof, runtime, tooling, examples, or research tracks.

## Submission Path

Submit findings as a GitHub issue using the repository's language proposal or bug report templates, or as a pull request when the proposed change is narrow and concrete.
