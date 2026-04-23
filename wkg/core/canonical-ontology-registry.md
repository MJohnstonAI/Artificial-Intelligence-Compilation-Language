# AICL WKG Canonical Ontology Registry

**Document Type**: WKG Core Registry
**Status**: Draft (v1.2)

This registry defines naming conventions, logical minimums, and snapshot rules for the AICL core World Knowledge Graph.

The WKG is the authoritative source of semantic identity for `Goal`, `StateAnchor`, `Policy`, `Capability`, `Metric`, `Entity`, `Resource`, `Environment`, and `Evidence` anchors. Kernel type classes are compiler-facing category labels over those anchors.

## 1. Anchor Naming Conventions

All identifiers in the WKG should follow a predictable namespace format:

`[anchor_prefix]-[domain]-[unique_id]`

| Anchor Type | Prefix | Example ID |
|---|---|---|
| **Environment** | `env-` | `env-prod-001`, `env-legal-eu` |
| **Entity** | `ent-` | `ent-db-service-01`, `ent-user-900` |
| **StateAnchor** | `state-anchor-` | `state-anchor-db-runtime-footprint` |
| **StateObservation** | `state-obs-` | `state-obs-db-init`, `state-obs-db-processing` |
| **Evidence** | `ev-` | `ev-log-startup`, `ev-api-success` |
| **Metric** | `met-` | `met-latency-ms`, `met-cpu-usage` |
| **Policy** | `pol-` | `pol-memory-limit`, `pol-data-sovereignty` |
| **Capability** | `cap-` | `cap-batch-process-01` |
| **Resource** | `res-` | `res-compute-cluster` |
| **Goal** | `goal-` | `goal-zero-downtime` |
| **WKGSnapshot** | `snap-` | `snap-runtime-prod-001`, `snap-compile-2026-04-23` |

## 2. Minimum Required Fields per Class

The JSON schema (`schema.ts`, `aicl-core-ontology.schema.json`) enforces structural typing. This registry adds logical minimums and conventions. All anchors require `id`, `version_hash`, and `type`.

- **Environment**: `env_class`, `active_policies`, `hosted_entities`
- **Entity**: `properties`, `relations`
- **StateAnchor**: `subject_type`, `anchor_signature`, `relations`
- **StateObservation**: `state_anchor_id`, `subject_ref`, `observed_snapshot`, `timestamp_ms`, `evidence_refs`
- **Evidence**: `stream_type`, `trust_class`, `raw_payload_hash`, `confidence_score`
- **Metric**: `evaluator_signature`, `target_subject_type`
- **Policy**: `predicate_signature`, `priority_level`, `enforcement_mode`
- **Capability**: `required_resources`, `expected_state_delta`, `execution_signature`
- **Resource**: `environment_id`, `capacity_total`, `allocations`
- **Goal**: `target_metrics`, `target_state_anchors`, `priority_level`
- **WKGSnapshot**: `snapshot_id`, `wkg_snapshot_hash`, `timestamp_ms`, `purpose`, `ontology_registry_ref`, `anchors`

Notes:

- `StateAnchor` is the compile-time declaration form. It does not require `evidence_refs`.
- `StateObservation` is the runtime observed-fact form. It must include one or more `evidence_refs`.
- `predicate_signature` and `execution_signature` are implementation placeholders. They should not be read as a final commitment to a particular execution-distribution model.

## 3. Relation Naming Conventions

Relations are restricted to the predefined edge types below. No custom relation names should be introduced in the core ontology without a coordinated spec update.

Format:

- `snake_case`

Core relation vocabulary:

- `is_a`
- `depends_on`
- `constrains`
- `consumes`
- `satisfies`
- `violates`
- `evidenced_by`
- `executed_in`

Operational note:

- `evidenced_by` should attach runtime `StateObservation` records or mutation-level reasoning to `Evidence` anchors. It is not required on `StateAnchor`.

## 4. Snapshot and Delta-Log Rules

1. **Pinned compilation snapshot**: every compilation pass resolves identifiers against one pinned `WKGSnapshot`. The ICC must record that snapshot in `wkg_snapshot_hash`.
2. **Monotonic timestamps**: a `DeltaLogEntry` must have a `timestamp_ms` strictly greater than the snapshot referenced by `parent_wkg_snapshot_hash`.
3. **Merkle continuity**: `new_wkg_snapshot_hash` must be derived from `parent_wkg_snapshot_hash` plus the ordered `mutations` array according to the runtime hashing protocol.
4. **Immutability**: once committed to a snapshot, an anchor's `version_hash` does not change.
5. **State evolution**: runtime state change appends a new `StateObservation` linked to its `StateAnchor`. The anchor remains the semantic identity; observations record evidence-backed runtime facts.
6. **Deactivation**: anchors are not deleted. They are retired through `DEACTIVATE_ANCHOR` to preserve historical traversals and auditability.
