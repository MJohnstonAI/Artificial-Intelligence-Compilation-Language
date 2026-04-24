# QA Report

## Scope

This report defines the acceptance criteria and review matrix for the StudyPath specification demo. It evaluates document consistency, proof coverage, and target-brief coherence rather than a shipped application binary.

## Acceptance criteria

- The StudyPath example remains a serious AICL specification demo rather than executable product code.
- All JSON artifacts are valid and internally consistent.
- README links resolve within the repository.
- Privacy, accessibility, adaptation, and target constraints align across intent, SHG, delegation, proofs, and target briefs.
- No private product references or disallowed public-demo claims appear in the new demo corpus.

## QA matrix

| Area | Scenario | Expected result | Primary artifacts |
|---|---|---|---|
| First-run flow | Learner opens StudyPath with no prior local state | Local profile capture, curriculum selection, and plan generation remain possible without sign-in or backend dependency | `studypath.intent.aicl.json`, `studypath.target.*.aicl.json` |
| Study plan generation | Learner requests a 21-day plan with weekday and weekend constraints | Planner outputs a bounded roadmap with daily and weekly structure tied to topic dependencies | `studypath.intent.aicl.json`, `studypath.shg.json`, `studypath.curriculum-pack.intro-python.json` |
| Local save/reload | Learner closes and reopens the app | Progress and schedules persist through local storage only | `studypath.intent.aicl.json`, `PRIVACY_PROOF.md` |
| Offline behavior | Device has no network connectivity | Core study planning, practice queue use, and progress review remain available | `studypath.intent.aicl.json`, `studypath.target.*.aicl.json`, `studypath.proof-bundle.expected.json` |
| Corrupted local state | Local progress store becomes unreadable | Future implementations should surface recoverable local reset/export options without transmitting data | `studypath.intent.aicl.json`, `QA_REPORT.md`, `PRIVACY_PROOF.md` |
| Deadline edge cases | Learner changes the exam deadline to fewer than 21 days | Planner should compress the schedule deterministically and mark unmet scope rather than fabricate impossible guarantees | `studypath.agent-delegation.aicl.json`, `studypath.proof-bundle.expected.json` |
| Very little available study time | Learner reports minimal weekly availability | Planner should reduce scope, prioritize prerequisite topics, and preserve low cognitive load | `studypath.curriculum-pack.intro-python.json`, `ACCESSIBILITY_PROOF.md` |
| Zero weak areas selected | Learner does not name any weak topics | Planner should fall back to balanced coverage using the curriculum prerequisite graph | `studypath.curriculum-pack.intro-python.json`, `studypath.shg.json` |
| Accessibility checks | Learner uses keyboard navigation, screen reader support, reduced motion, and larger text | Materialization briefs and accessibility proof remain aligned with readable, redundant, low-load interaction design | `ACCESSIBILITY_PROOF.md`, `studypath.target.*.aicl.json`, `studypath.proof-bundle.expected.json` |
| Cross-platform layout consistency | StudyPath is materialized for web, Android, and Windows | All targets preserve offline-first behavior, local storage, no analytics, and core surface parity | `studypath.target.android.aicl.json`, `studypath.target.web.aicl.json`, `studypath.target.windows.aicl.json` |
| Proof-bundle checks | Reviewer audits expected proof outcomes | Each proof entry maps to evidence, SHG nodes, and a stated failure consequence | `studypath.proof-bundle.expected.json`, `studypath.shg.json` |

## Exit criteria

- All required files exist.
- JSON validation passes for every StudyPath artifact.
- Root README references StudyPath as the flagship public academic demo while preserving Enterprise Service Resolution as the flagship enterprise workflow example.
- Repository diff remains limited to StudyPath/demo-related changes plus the requested roadmap and README updates.
