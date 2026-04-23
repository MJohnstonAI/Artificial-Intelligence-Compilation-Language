/**
 * AICL-Core Ontology Schema v1.0
 * Machine-checkable nominal type definitions for the World Knowledge Graph (WKG) substrate.
 */

export type ID = string;
export type Hash = string;

/**
 * Base definition for all WKG nodes.
 * Every concept in the WKG maps to an Anchor.
 */
export interface Anchor {
  id: ID;
  version_hash: Hash;
  type: "Entity" | "State" | "Goal" | "Metric" | "Policy" | "Capability" | "Resource" | "Environment" | "Evidence";
}

/** 1. Entity: An identifiable subject/object within the WKG. */
export interface Entity extends Anchor {
  type: "Entity";
  properties: Record<string, unknown>;
  relations: Array<{ type: string; target_id: ID }>;
}

/** 2. Environment: The contextual boundary or domain isolating entities, resources, and policies. */
export interface Environment extends Anchor {
  type: "Environment";
  parent_env_id?: ID;
  active_policies: ID[]; // Array of Policy IDs
  hosted_entities: ID[]; // Array of Entity IDs
}

/** 3. State: A temporal binding of variables/attributes for an Entity or Environment. */
export interface State extends Anchor {
  type: "State";
  subject_ref: ID; // Reference to Entity or Environment
  snapshot: Record<string, unknown>;
  timestamp_ms: number;
  evidence_refs: ID[]; // Must be backed by Evidence
}

/** 4. Evidence: A cryptographically verifiable grounding proof mapping external streams to WKG claims. */
export interface Evidence extends Anchor {
  type: "Evidence";
  stream_type: "telemetry" | "log" | "document" | "media" | "human_attestation";
  raw_payload_hash: Hash;
  confidence_score: number; // Range: [0.0, 1.0]
  provenance_uri: string;
}

/** 5. Metric: A computable evaluation function returning a scalar or vector based on State. */
export interface Metric extends Anchor {
  type: "Metric";
  evaluator_signature: string; // Hash or URI of the pure evaluation function
  target_subject_type: "Entity" | "Environment";
}

/** 6. Policy: A strict invariant constraint over state transitions. */
export interface Policy extends Anchor {
  type: "Policy";
  predicate_signature: string; // Hash or URI of the boolean constraint function
  priority_level: number;
  enforcement_mode: "strict_halt" | "compensate" | "audit";
}

/** 7. Capability: An executable state-transition function. */
export interface Capability extends Anchor {
  type: "Capability";
  required_resources: Array<{ resource_id: ID; quantity: number }>;
  expected_state_delta: Record<string, unknown>; 
  execution_signature: string; // Hash or URI of the execution logic
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
  target_states: ID[];
  deadline_ms?: number;
  priority_level: number;
}

/**
 * Mutation structures for WKG delta-log.
 */
export type WKGMutation = 
  | { type: "ADD_ANCHOR"; anchor: Anchor }
  | { type: "DEACTIVATE_ANCHOR"; id: ID }
  | { type: "UPDATE_STATE"; old_state_id: ID; new_state: State }
  | { type: "ALLOCATE_RESOURCE"; resource_id: ID; capability_id: ID; amount: number }
  | { type: "RELEASE_RESOURCE"; resource_id: ID; capability_id: ID; amount: number };

export interface DeltaLogEntry {
  transaction_id: ID;
  parent_wkg_hash: Hash; 
  mutations: WKGMutation[];
  timestamp_ms: number;
  new_wkg_hash: Hash;
}
