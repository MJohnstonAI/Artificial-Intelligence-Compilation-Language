# StudyPath Flagship Demo Plan

## Objective

Add StudyPath as the flagship public academic AICL demonstration for a privacy-preserving, offline-first educational application specification that highlights agent delegation, SHG structure, proof gates, and cross-platform target materialization briefs without drifting into production-app claims.

## Files to add

- `examples/studypath-offline-learning-planner/README.md`
- `examples/studypath-offline-learning-planner/studypath.intent.aicl.json`
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

## Files to update

- `README.md`

## Risks

- The example could accidentally read like a generic app brief instead of an AICL coordination artifact.
- Privacy or accessibility claims could become stronger than the proof material actually supports.
- The public-demo wording could undercut the existing enterprise example if the README change is not carefully framed.
- JSON example artifacts could drift from each other in identifiers, target names, or proof-gate vocabulary.

## Verification steps

- Validate each new `.json` file with a JSON parser.
- Check Markdown links in the new StudyPath README and the root README.
- Search the changed scope for forbidden private-product references.
- Review the final diff to ensure only StudyPath, roadmap, and README changes are present.
- Confirm the new README wording preserves Enterprise Service Resolution as the flagship enterprise workflow example.

## Rollback notes

- Revert the new StudyPath example directory if the demo scope or naming needs to change.
- Revert `roadmap/STUDYPATH_FLAGSHIP_DEMO_PLAN.md` if the implementation is abandoned.
- Revert the root `README.md` hunk if public-demo positioning needs to be reworded independently of the example corpus.
