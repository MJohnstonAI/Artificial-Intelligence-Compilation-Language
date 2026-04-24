# Privacy Proof

## Claim

StudyPath is specified as a local-only educational application demo in which learner data stays on-device and no cloud runtime dependency is required for the core study-planning flow.

## Proof points

- No student data is transmitted.
- No analytics SDK is permitted.
- No backend is required.
- No cloud account is required.
- Progress is stored locally.
- The curriculum pack is bundled locally.
- Export is user-initiated only.

## Evidence within this demo

- `studypath.intent.aicl.json` declares `storage_mode: local_only`, `analytics: none`, and `backend: none`.
- Each declared data store marks transmission as forbidden.
- `studypath.agent-delegation.aicl.json` forbids learner-data transmission and runtime cloud model calls for every agent.
- All target briefs prohibit analytics and backend dependencies.
- `studypath.proof-bundle.expected.json` includes expected-pass entries for `privacy.local_only`, `network.no_runtime_cloud`, `analytics.none`, and `student_data.no_transmission`.

## Assumptions

- The future materializer honors the declared storage and network constraints.
- Any export operation is explicit, local, and initiated by the user.
- Synthetic curriculum content is packaged with the application or otherwise made available locally before runtime.
- No third-party libraries are introduced later that add telemetry, remote logging, or hidden synchronization.

## Failure conditions

This proof fails if any of the following become true:

- learner profile or progress data is uploaded automatically
- analytics or telemetry SDKs are added
- a backend becomes mandatory for study-plan generation or quiz access
- a sign-in or cloud account becomes required for normal operation
- curriculum content must be fetched remotely at runtime
- export occurs automatically or without a clear user action

## Conclusion

Within the scope of this specification demo, StudyPath satisfies the intended privacy posture only while remaining local-first, analytics-free, backend-free, and user-controlled with respect to export.
