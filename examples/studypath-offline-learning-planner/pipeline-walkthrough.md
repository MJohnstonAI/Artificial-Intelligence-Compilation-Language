# StudyPath Pipeline Walkthrough

## Stage 0 — Agent-originated intent

`IntentAgent` starts from the public academic demo objective and the learner scenario. It emits `studypath.intent.aicl.json` with non-goals, maintained invariants, target outputs, required agents, and proof gates PG01-PG09.

## Stage 1 — ICC generation

`IntentAgent` produces `studypath.icc.json` as the root-of-trust certificate. The ICC records the 21-day learner scenario, WKG anchors, goals, constraints C01-C09, accepted risks, and signature placeholders.

## Stage 2 — WKG grounding

StudyPath binds learner, curriculum topic, study session, practice queue, local-only privacy, and accessibility concepts to WKG anchors. This prevents the example from relying only on prose labels.

## Stage 3 — SHG construction

`CurriculumAgent` creates the synthetic curriculum pack and topic order. `PlannerAgent` constructs `StudySessionPlan` from `LearnerProfile`, `DeadlineConstraint`, and `TopicGraph`. The 21-day deadline is checked through PG04 and the HE01 hyperedge.

Prerequisite order is enforced through `precedes` edges:

- variables to data_types
- data_types to conditionals
- conditionals to loops
- loops to functions
- functions to lists
- lists to dictionaries
- dictionaries to debugging_basics
- debugging_basics to mini_project_review

## Stage 4 — Agent delegation

StudyPath traces nine bounded agents:

- IntentAgent
- CurriculumAgent
- PlannerAgent
- QuizAgent
- AdaptationAgent
- AccessibilityAgent
- PrivacyAgent
- ProofAgent
- MaterializationAgent

Each agent declares `authority_level`, ICC delegation chain, inputs, outputs, allowed effects, forbidden effects, and proof obligations. No agent exceeds R3.

## Stage 5 — Proof gates

`ProofAgent` assembles PG01-PG09. No cloud runtime is preserved through PG01, PG02, PG03, target brief constraints, and global forbidden effects for runtime cloud, analytics, and backend services.

## Stage 6 — Target materialization

`MaterializationAgent` emits Android, Web/PWA, and Windows target briefs. Target briefs are blocked until PG01-PG09 pass. The briefs are not executable app code and do not publish or deploy anything.

## Stage 7 — QA and acceptance

The QA report checks first-run flow, learner goal capture, study plan generation, deadline calculation, local save/reload, offline behavior, corrupted local state, low available time, zero weak areas, prerequisite order, local-only adaptation, accessibility, target consistency, and proof bundle completeness.

## Stage 8 — Future EIF loop

Future learner feedback becomes an EIF candidate patch rather than silent runtime mutation. The candidate patch would update the ICC/SHG/proof artifacts and require reproof before changing future materialization briefs.
