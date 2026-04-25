# StudyPath Flagship Demo Implementation Plan

## Objective

Add StudyPath as the flagship public academic AICL demo.

## Why StudyPath

StudyPath is academically useful because it is understandable to learners, researchers, and AI contributors while still exercising AICL's serious semantic layers. It demonstrates privacy-first educational planning, bounded multi-agent coordination, proof-carrying artifacts, and target materialization without exposing private commercial concepts or entertainment-first examples.

## Files to Add

- `examples/studypath-offline-learning-planner/README.md`
- `examples/studypath-offline-learning-planner/studypath.intent.aicl.json`
- `examples/studypath-offline-learning-planner/studypath.icc.json`
- `examples/studypath-offline-learning-planner/studypath.shg.json`
- `examples/studypath-offline-learning-planner/studypath.agent-delegation.aicl.json`
- `examples/studypath-offline-learning-planner/studypath.curriculum-pack.intro-python.json`
- `examples/studypath-offline-learning-planner/studypath.proof-bundle.expected.json`
- `examples/studypath-offline-learning-planner/studypath.target.android.aicl.json`
- `examples/studypath-offline-learning-planner/studypath.target.web.aicl.json`
- `examples/studypath-offline-learning-planner/studypath.target.windows.aicl.json`
- `examples/studypath-offline-learning-planner/PRIVACY_PROOF.md`
- `examples/studypath-offline-learning-planner/ACCESSIBILITY_PROOF.md`
- `examples/studypath-offline-learning-planner/QA_REPORT.md`
- `examples/studypath-offline-learning-planner/pipeline-walkthrough.md`

## Files to Update

- `README.md`

No separate docs index was found.

## Design Baseline

StudyPath demonstrates ICC root-of-trust, SHG semantic planning, WKG anchoring, bounded agent delegation, proof gates, target materialization, offline-first privacy, accessibility proof boundaries, and deterministic local adaptation.

## Proof Gate Strategy

StudyPath uses nine proof gates: PG01-PG09.

## Risks

- Overclaiming accessibility
- Overclaiming student outcomes
- Treating synthetic curriculum as real exam content
- Privacy claims depending on target materializers

## Validation

- JSON validation
- Markdown link check
- proof gate count consistency
- no private-reference or private game references
- no backend/cloud/analytics claims

## Rollback

Remove `examples/studypath-offline-learning-planner/` and revert README changes.
