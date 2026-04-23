# AICL WKG Canonical Ontology Registry

**Document Type**: WKG Core Registry
**Status**: Draft (v1.0)

This registry establishes the strict naming conventions, required structural properties, and versioning rules for the AICL-Core World Knowledge Graph.

## 1. Anchor Naming Conventions

All anchors in the WKG must follow a predictable namespace format: `[anchor_prefix]-[domain]-[unique_id]`.

| Anchor Type | Prefix | Example ID |
|---|---|---|
| **Environment** | `env-` | `env-prod-001`, `env-legal-eu` |
| **Entity** | `ent-` | `ent-db-service-01`, `ent-user-900` |
| **State** | `state-` | `state-db-init-t17` |
| **Evidence** | `ev-` | `ev-log-startup-001` |
| **Metric** | `met-` | `met-latency-ms`, `met-cpu-usage` |
| **Policy** | `pol-` | `pol-memory-limit`, `pol-data-sovereignty` |
| **Capability** | `cap-` | `cap-batch-process-01` |
| **Resource** | `res-` | `res-compute-cluster` |
| **Goal** | `goal-` | `goal-zero-downtime` |

## 2. Minimum Required Fields per Anchor Class

While the JSON schema (`schema.ts`, `.schema.json`) enforces structural typing, the registry defines logical minimums for validation. All anchors require `id`, `version_hash`, and `type`.

- **Environment**: `env_class`, `active_policies`
- **Entity**: `properties` (minimum {}), `relations`
- **State**: `subject_ref`, `snapshot`, `timestamp_ms`, `relations` (where `evidenced_by` > 0)
- **Evidence**: `stream_type`, `trust_class`, `raw_payload_hash`, `confidence_score`
- **Metric**: `evaluator_signature`, `target_subject_type`
- **Policy**: `predicate_signature`, `priority_level`, `enforcement_mode`
- **Capability**: `required_resources`, `expected_state_delta`, `execution_signature`
- **Resource**: `environment_id`, `capacity_total`, `allocations`
- **Goal**: `target_metrics`, `target_states`, `priority_level`

## 3. Relation Naming Conventions

Relations are restricted to the 8 predefined edge types. No custom relations are permitted.
Format: `snake_case` strictly.

- `is_a`
- `depends_on`
- `constrains`
- `consumes`
- `satisfies`
- `violates`
- `evidenced_by`
- `executed_in`

## 4. Snapshot Versioning Rules

1. **Monotonic Timestamps**: A `DeltaLogEntry` must have a `timestamp_ms` strictly greater than its `parent_wkg_hash` snapshot.
2. **Merkle Continuity**: The `new_wkg_hash` must be a cryptographically sound SHA-256 hash derived from the `parent_wkg_hash` concatenated with the hash of the ordered `mutations` array.
3. **Immutability**: Once an anchor is committed to a snapshot, its `version_hash` cannot change. To "update" an entity, a new `State` anchor referencing that entity must be appended.
4. **Deactivation**: Anchors are not deleted; they are deactivated via the `DEACTIVATE_ANCHOR` mutation, preserving historical graph traversals.