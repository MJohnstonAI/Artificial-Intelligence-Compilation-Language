/**
 * AICL-Core Ontology Schema v1.2
 * Machine-checkable nominal type definitions for the World Knowledge Graph (WKG) substrate.
 *
 * Semantic authority rule:
 * The WKG is the authoritative source of semantic identity for Goal, StateAnchor,
 * Policy, Capability, Metric, Entity, Resource, Environment, and Evidence anchors.
 * Kernel type classes are compiler-facing category labels over WKG anchors.
 * Identifier resolution is performed against a pinned WKG snapshot.
 */

export type ID = string;
export type Hash = string;

/**
 * Base definition for all WKG-addressable records.
 */
export interface Anchor {
  id: ID;
  version_hash: Hash;
  type: string;
}

/** Relation Vocabulary */
export type RelationType =
  | "is_a"
  | "depends_on"
  | "constrains"
  | "consumes"
  | "satisfies"
  | "violates"
  | "evidenced_by"
  | "executed_in";

export interface Relation {
  type: RelationType;
  target_id: ID;
}

/** 1. Entity: An identifiable subject/object within the WKG. */
export interface Entity extends Anchor {
  type: "Entity";
  properties: Record<string, unknown>;
  relations: Relation[];
}

/** 2. Environment: A boundary that activates policies and hosts entities/resources. */
export type EnvironmentClass = "Runtime" | "Deployment" | "Legal" | "Cohort";

export interface Environment extends Anchor {
  type: "Environment";
  env_class: EnvironmentClass;
  parent_env_id?: ID;
  active_policies: ID[];
  hosted_entities: ID[];
}

/**
 * 3a. StateAnchor: Compile-time semantic declaration for a state category.
 * This is the authoritative WKG anchor corresponding to the kernel's `State` category.
 * No runtime evidence is required at declaration time.
 */
export interface StateAnchor extends Anchor {
  type: "StateAnchor";
  subject_type: "Entity" | "Environment";
  anchor_signature: string;
  preconditions?: ID[];
  relations: Relation[];
}

/**
 * 3b. StateObservation: Runtime observed fact referencing a StateAnchor.
 * Evidence is mandatory because this record captures an observed fact, not a declaration.
 */
export interface StateObservation extends Anchor {
  type: "StateObservation";
  state_anchor_id: ID;
  subject_ref: ID;
  observed_snapshot: Record<string, unknown>;
  timestamp_ms: number;
  evidence_refs: ID[];
  relations: Relation[];
}

/** 4. Evidence & Trust Classes */
export type EvidenceTrustClass =
  | "ClassA_Cryptographic"
  | "ClassB_SystemGenerative"
  | "ClassC_OpaqueGenerative"
  | "ClassD_HumanGenerative";

export type StreamType =
  | "telemetry"
  | "log"
  | "document"
  | "screenshot"
  | "api_response"
  | "model_output"
  | "human_report";

export interface Evidence extends Anchor {
  type: "Evidence";
  stream_type: StreamType;
  trust_class: EvidenceTrustClass;
  raw_payload_hash: Hash;
  confidence_score: number; // Range: [0.0, 1.0]
  provenance_uri: string;
}

/** 5. Metric: A computable evaluation function returning a scalar or vector. */
export interface Metric extends Anchor {
  type: "Metric";
  evaluator_signature: string; // Implementation placeholder, not a fixed execution model.
  target_subject_type: "Entity" | "Environment";
}

/** 6. Policy: A strict invariant constraint over transitions. */
export interface Policy extends Anchor {
  type: "Policy";
  predicate_signature: string; // Implementation placeholder, not a fixed execution model.
  priority_level: number;
  enforcement_mode: "strict_halt" | "compensate" | "audit";
}

/** 7. Capability: An executable state-transition function. */
export interface Capability extends Anchor {
  type: "Capability";
  required_resources: Array<{ resource_id: ID; quantity: number }>;
  expected_state_delta: Record<string, unknown>;
  execution_signature: string; // Implementation placeholder, not a fixed execution model.
  relations: Relation[];
}

/** 8. Resource: A quantifiable prerequisite consumed or locked by Capabilities. */
export interface Resource extends Anchor {
  type: "Resource";
  environment_id: ID;
  capacity_total: number;
  allocations: Array<{ capability_id: ID; quantity: number; lock_timestamp: number }>;
}

/** 9. Goal: A target state condition or metric optimization objective. */
export interface Goal extends Anchor {
  type: "Goal";
  target_metrics: Array<{ metric_id: ID; operator: ">" | "<" | "==" | ">=" | "<="; value: number }>;
  target_state_anchors: ID[];
  deadline_ms?: number;
  priority_level: number;
}

export type AnchorNode =
  | Entity
  | Environment
  | StateAnchor
  | StateObservation
  | Evidence
  | Metric
  | Policy
  | Capability
  | Resource
  | Goal;

/**
 * Compile-time snapshot binding for reproducible identifier resolution.
 * All kernel lookups during a compilation pass are resolved against one pinned snapshot.
 */
export interface WKGSnapshot {
  snapshot_id: ID;
  wkg_snapshot_hash: Hash;
  parent_wkg_snapshot_hash?: Hash;
  timestamp_ms: number;
  purpose: "compile" | "audit" | "deploy" | "runtime";
  ontology_registry_ref: string;
  anchors: AnchorNode[];
}

/** Mutation structures for WKG delta-log. */
export type WKGMutation =
  | { type: "ADD_ANCHOR"; anchor: AnchorNode }
  | { type: "DEACTIVATE_ANCHOR"; id: ID }
  | { type: "UPDATE_STATE"; old_observation_id: ID; new_observation: StateObservation }
  | { type: "ALLOCATE_RESOURCE"; resource_id: ID; capability_id: ID; amount: number }
  | { type: "RELEASE_RESOURCE"; resource_id: ID; capability_id: ID; amount: number };

export interface DeltaLogEntry {
  transaction_id: ID;
  parent_wkg_snapshot_hash: Hash;
  timestamp_ms: number;
  mutations: WKGMutation[];
  new_wkg_snapshot_hash: Hash;
}
