# StudyPath — Offline Learning Plan Builder

StudyPath is the flagship public demonstration for AICL as an AI-native coordination language for educational software. It is intentionally presented as a specification and artifact bundle rather than as an executable application so that the example remains reviewable in semantic, policy, proof, and materialization terms.

## Why this demo

StudyPath gives AICL a public academic example that is serious, socially useful, and easy to evaluate without exposing private commercial product ideas. It demonstrates how an AI-originated intent can remain bounded by privacy, accessibility, deterministic local adaptation, and cross-platform target constraints while still producing a useful educational application brief.

## Scenario

A learner wants to prepare for an introductory Python assessment in 21 days. They have 45 minutes available on weekdays and 90 minutes on weekends. They struggle with loops and functions and want a local-only study plan, practice queue, and progress tracker.

## What this demonstrates

StudyPath demonstrates how AICL can express:

- a personalized study roadmap
- a weekly and daily schedule
- a topic dependency graph
- local practice questions
- revision prompts
- a progress model stored on-device
- accessibility-safe UI constraints
- proof artifacts showing no cloud runtime dependency and no analytics

## AICL concepts demonstrated

- agent-originated project intent with bounded authority and human approval thresholds
- SHG structure linking learner goals, curriculum grounding, planning outputs, privacy policy, accessibility profile, and proof material
- specialist agent delegation for curriculum planning, schedule generation, quiz generation, adaptation, accessibility review, privacy review, proof assembly, and target materialization
- proof gates for local-only storage, no runtime cloud dependency, no analytics, provenance, deterministic adaptation, and accessibility baselines
- cross-platform materialization briefs for web, Android, and Windows without claiming a finished runtime implementation

## Files

- [`studypath.intent.aicl.json`](studypath.intent.aicl.json) - project-level semantic intent and proof gates
- [`studypath.shg.json`](studypath.shg.json) - semantic handover graph sketch for the StudyPath pipeline
- [`studypath.agent-delegation.aicl.json`](studypath.agent-delegation.aicl.json) - bounded agent roles, inputs, outputs, and effect limits
- [`studypath.curriculum-pack.intro-python.json`](studypath.curriculum-pack.intro-python.json) - synthetic local curriculum pack for introductory Python study
- [`studypath.proof-bundle.expected.json`](studypath.proof-bundle.expected.json) - expected proof outcomes and failure consequences
- [`studypath.target.android.aicl.json`](studypath.target.android.aicl.json) - Android materialization brief
- [`studypath.target.web.aicl.json`](studypath.target.web.aicl.json) - web/PWA materialization brief
- [`studypath.target.windows.aicl.json`](studypath.target.windows.aicl.json) - Windows materialization brief
- [`PRIVACY_PROOF.md`](PRIVACY_PROOF.md) - human-readable privacy proof summary
- [`ACCESSIBILITY_PROOF.md`](ACCESSIBILITY_PROOF.md) - human-readable accessibility proof summary
- [`QA_REPORT.md`](QA_REPORT.md) - acceptance criteria and QA matrix for the demo artifacts

## Public-demo boundaries

This demo deliberately avoids:

- real exam-board copyrighted curriculum
- real student records
- cloud analytics
- backend services
- claims of guaranteed exam performance
- private product concepts

All curriculum content in this example is synthetic, local, and demo-only. The example is intended to show AICL semantics, delegation, proof structure, and target constraints, not to claim that a production educational product is already implemented.

## Status

StudyPath is a reference demo and specification bundle. It is suitable for repository study, academic discussion, schema evolution, and future validator/tooling work, but it is not a production application and should not be presented as one.
