# QA Report — StudyPath

## Scope

This QA report covers StudyPath as a reference architecture and AICL demonstration. It validates semantic artifacts, proof gates, target briefs, privacy/accessibility boundaries, and cross-platform consistency. It does not validate a production application.

## Acceptance criteria

- StudyPath files are present under `examples/studypath-offline-learning-planner/`.
- All JSON artifacts are valid JSON.
- Markdown links resolve locally.
- Proof gates PG01-PG09 appear consistently across intent, SHG, proof bundle, and target briefs.
- No backend, cloud runtime, analytics, ads, payments, or hidden telemetry dependency is introduced.
- Curriculum content remains synthetic and demo-only.
- Existing enterprise-service-resolution references remain intact.

## Test matrix

| Test | Acceptance signal | Primary artifacts |
|---|---|---|
| first-run flow | Local learner profile and StudyPath scenario can be represented without sign-in or backend dependency | `studypath.intent.aicl.json`, `studypath.icc.json` |
| learner goal capture | 21-day Python preparation goal, 45 weekday minutes, 90 weekend minutes, loops/functions weak areas are captured | `studypath.intent.aicl.json`, `studypath.icc.json` |
| study plan generation | StudySessionPlan depends on learner profile, deadline, and prerequisite-respecting topic graph | `studypath.shg.json` |
| deadline calculation | PG04 checks the 21-day deadline and availability constraints | `studypath.shg.json`, `studypath.proof-bundle.expected.json` |
| local save/reload | ProgressState is constrained by local-only privacy and target local storage | `PRIVACY_PROOF.md`, target briefs |
| offline behavior | Core flow requires no cloud runtime, backend, or account | `studypath.target.*.aicl.json` |
| corrupted local state | Failure should remain local and recoverable without learner-data transmission | `PRIVACY_PROOF.md` |
| very little available study time | Planner must reduce scope or surface planning failure rather than claim impossible outcomes | `QA_REPORT.md`, `studypath.icc.json` |
| zero weak areas selected | Planner should fall back to balanced prerequisite order | `studypath.curriculum-pack.intro-python.json` |
| curriculum prerequisite order | Topic graph preserves variables through mini_project_review order | `studypath.shg.json`, curriculum pack |
| adaptation from local progress only | HE02 and PG06 limit adaptation to local progress, policy, and existing plan | `studypath.shg.json` |
| accessibility checks | PG07 and target briefs require readable, bounded, reduced-motion design declarations | `ACCESSIBILITY_PROOF.md`, target briefs |
| target consistency | Android, Web/PWA, and Windows preserve the same privacy/progress/accessibility constraints | `studypath.proof-bundle.expected.json` |
| proof bundle PG01-PG09 | All nine proof gates have expected proof entries | `studypath.proof-bundle.expected.json` |

## Edge cases

- Fewer than 21 days remaining should produce a planning failure or reduced-scope plan.
- Very little available study time should prioritize prerequisites and weak areas without outcome claims.
- Zero weak areas selected should produce balanced topic coverage.
- Corrupted local state should not trigger network recovery or telemetry.
- Missing curriculum provenance should block materialization.

## Proof-bundle validation

The proof bundle must include exactly PG01-PG09. Each proof entry must include proof id, gate reference, claim, tier, mechanism, status, evidence, related SHG nodes, and failure consequence.

Explicit gate set: PG01, PG02, PG03, PG04, PG05, PG06, PG07, PG08, PG09.

## Cross-platform checks

Each target brief must reference PG01-PG09 and declare offline-first operation, no analytics, no backend, no ads, no payments, local storage only, local curriculum pack, local progress state, accessibility baseline, and platform-specific accessibility support.

## Known limitations

StudyPath does not prove final rendered accessibility at Tier 1, does not prove physical device security, does not implement executable app code, and does not claim student success or exam performance.
