/**
 * AICL-Core Ontology Schema v1.1
 * Machine-checkable nominal type definitions for the World Knowledge Graph (WKG) substrate.
 */

export type ID = string;
export type Hash = string;

/**
 * Base definition for all WKG nodes.
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

/** 2. Environment Subtypes */
export type EnvironmentClass = "Runtime" | "Deployment" | "Legal" | "Cohort";

export interface Environment extends Anchor {
  type: "Environment";
  env_class: EnvironmentClass;
  parent_env_id?: ID;
  active_policies: ID[];
  hosted_entities: ID[];
}

/** 3. State: A temporal binding of variables/attributes for an Entity or Environment. */
export interface State extends Anchor {
  type: "State";
  subject_ref: ID;
  snapshot: Record<string, unknown>;
  timestamp_ms: number;
  relations: Relation[]; // E.g., satisfies/violates Policy, evidenced_by Evidence
}

/** 4. Evidence & Trust Classes */
export type EvidenceTrustClass = "ClassA_Cryptographic" | "ClassB_SystemGenerative" | "ClassC_OpaqueGenerative" | "ClassD_HumanGenerative";
export type StreamType = "telemetry" | "log" | "document" | "screenshot" | "api_response" | "model_output" | "human_report";

export interface Evidence extends Anchor {
  type: "Evidence";
  stream_type: StreamType;
  trust_class: EvidenceTrustClass;
  raw_payload_hash: Hash;
  confidence_score: number; // Range: [0.0, 1.0]
  provenance_uri: string;
}

/** 5. Metric: A computable evaluation function returning a scalar or vector based on State. */
export interface Metric extends Anchor {
  type: "Metric";
  evaluator_signature: string;
  target_subject_type: "Entity" | "Environment";
}

/** 6. Policy: A strict invariant constraint over state transitions. */
export interface Policy extends Anchor {
  type: "Policy";
  predicate_signature: string;
  priority_level: number;
  enforcement_mode: "strict_halt" | "compensate" | "audit";
}

/** 7. Capability: An executable state-transition function. */
export interface Capability extends Anchor {
  type: "Capability";
  required_resources: Array<{ resource_id: ID; quantity: number }>;
  expected_state_delta: Record<string, unknown>; 
  execution_signature: string;
  relations: Relation[]; // executed_in, consumes, depends_on
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

/** Mutation structures for WKG delta-log. */
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