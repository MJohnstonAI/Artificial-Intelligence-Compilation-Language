# Privacy Proof — StudyPath

## Claim

StudyPath is specified as an offline-first educational reference architecture where learner data remains local and the core study flow requires no backend, analytics, cloud account, or runtime cloud dependency.

## What AICL proves

AICL can represent and check privacy constraints at the semantic artifact level. The StudyPath ICC, SHG, target briefs, and proof bundle declare local-only storage, no learner-data transmission, no analytics, no backend services, and user-initiated export only.

## What AICL does not prove

AICL does not prove physical device security, operating-system account security, disk encryption, backup behavior, or implementation choices made outside the declared target materializers. Device compromise is outside AICL's proof boundary.

## Data inventory

- learner profile: weak areas, study window, availability, accessibility preferences
- study plan: weekly and daily sessions
- practice queue: local synthetic prompts and revision tasks
- progress state: completion counters, topic confidence, retry markers

## Storage boundary

Progress is stored locally. The curriculum pack is bundled locally. Target briefs require local app sandbox storage, IndexedDB/local storage abstraction, or local app data storage depending on platform.

## Network boundary

No student data is transmitted. No cloud account is required. No backend service is required for the core learning plan, practice queue, or progress tracker.

## Analytics boundary

No analytics SDK, telemetry endpoint, hidden tracking flow, or cloud student tracking is declared.

## Export boundary

Export is user-initiated only. Any future export mechanism must be explicit, local-first, and excluded from automatic synchronization.

## Risk acceptance

The ICC accepts `RA01 device_storage_boundary`: AICL can require local-only storage, but cannot guarantee physical device security outside the generated app boundary.

## Failure conditions

This proof fails if a target materializer introduces backend services, cloud accounts, analytics, hidden telemetry, automatic export, remote curriculum fetch, learner-data transmission, or permissions beyond the declared local storage/export boundary.
