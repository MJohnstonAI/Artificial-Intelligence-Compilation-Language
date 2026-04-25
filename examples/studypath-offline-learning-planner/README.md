# StudyPath — Offline Learning Plan Builder

StudyPath is the flagship public academic demo for AICL as an AI-native semantic programming and coordination language for educational software. It is a reference architecture and artifact set, not a finished app.

## Why this demo

StudyPath shows how AICL can coordinate educational software from agent-originated intent through ICC grounding, SHG planning, bounded delegation, proof gates, and target materialization. It is academically useful, privacy-first, and understandable to students, researchers, and AI contributors without relying on private commercial concepts or entertainment-first examples.

## Scenario

A learner wants to prepare for an introductory Python assessment in 21 days. They have 45 minutes available on weekdays and 90 minutes on weekends. They struggle with loops and functions and want a local-only study plan, practice queue, and progress tracker.

## What this demonstrates

StudyPath generates:

- personalized study roadmap
- weekly and daily schedule
- topic dependency graph
- local practice questions
- revision prompts
- progress model stored on-device
- accessibility-safe UI constraints
- proof artifacts showing no cloud runtime dependency and no analytics

## AICL concepts demonstrated

| Concept | StudyPath role |
|---|---|
| ICC | Root-of-trust intent certificate |
| SHG | Semantic graph of learner goal, curriculum, sessions, progress, and adaptation |
| WKG anchors | Semantic grounding for learner, curriculum topic, study session, privacy, and accessibility |
| Agent delegation | Nine bounded specialist agents |
| Proof gates | Nine top-level proof obligations guarding materialization |
| Target briefs | Android, Web/PWA, and Windows materialization constraints |
| Privacy proof | Local-only learner data and no analytics |
| Accessibility proof | Readability, contrast, session design, reduced cognitive load |

## Files

- [`studypath.intent.aicl.json`](studypath.intent.aicl.json) - agent-originated project intent
- [`studypath.icc.json`](studypath.icc.json) - ICC root-of-trust artifact
- [`studypath.shg.json`](studypath.shg.json) - semantic handover graph and proof gates
- [`studypath.agent-delegation.aicl.json`](studypath.agent-delegation.aicl.json) - bounded specialist agent delegation
- [`studypath.curriculum-pack.intro-python.json`](studypath.curriculum-pack.intro-python.json) - synthetic local Python foundations curriculum
- [`studypath.proof-bundle.expected.json`](studypath.proof-bundle.expected.json) - expected proof outcomes for PG01-PG09
- [`studypath.target.android.aicl.json`](studypath.target.android.aicl.json) - Android target brief
- [`studypath.target.web.aicl.json`](studypath.target.web.aicl.json) - Web/PWA target brief
- [`studypath.target.windows.aicl.json`](studypath.target.windows.aicl.json) - Windows target brief
- [`PRIVACY_PROOF.md`](PRIVACY_PROOF.md) - human-readable privacy proof
- [`ACCESSIBILITY_PROOF.md`](ACCESSIBILITY_PROOF.md) - human-readable accessibility proof
- [`QA_REPORT.md`](QA_REPORT.md) - QA matrix and acceptance criteria
- [`pipeline-walkthrough.md`](pipeline-walkthrough.md) - AICL compilation trace for StudyPath

## Public-demo boundaries

This demo avoids:

- real exam-board copyrighted curriculum
- real student records
- cloud analytics
- backend services
- guaranteed exam outcome claims
- private commercial product concepts
- games/private game ideas

All curriculum material is synthetic and demo-only. The target briefs describe materialization constraints, not executable app code or deployment instructions.

## Status

This is a reference architecture and AICL demonstration, not a production app implementation.
