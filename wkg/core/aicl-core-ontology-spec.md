# AICL-Core Ontology and WKG Specification

**Document Type**: Formal Technical Specification
**Module**: WKG (World Knowledge Graph) Core
**Status**: Draft (v1.0)

## 1. Ontological Framework & Nominal Type Anchors

The AICL-Core ontology is formalized as a set of nominal anchors $\Omega = \{E, S, G, M, P, C, R\}$. These anchors establish a strict inheritance and relational hierarchy for modeling execution environments.

### 1.1 Type Definitions and Schemas

We employ a formalized data-definition language (TypeScript-equivalent) to define the schema and boundaries of each anchor.

```typescript
type ID = string;
type Hash = string;

// Base definition for all WKG nodes
interface Anchor {
  id: ID;
  version_hash: Hash;
  type: string;
}

// 1. Entity: An identifiable subject/object within the WKG.
interface Entity extends Anchor {
  type: "Entity";
  properties: Record<string, unknown>;
  relations: Relation[]; // Directed edges to other Entities
}

// 2. State: A temporal binding of variables/attributes for an Entity.
interface State extends Anchor {
  type: "State";
  entity_ref: ID; // Reference to Entity
  snapshot: Record<string, unknown>;
  timestamp: number;
}

// 3. Metric: A computable evaluation function returning a scalar or vector.
interface Metric extends Anchor {
  type: "Metric";
  evaluator: (s: State) => number | number[];
}

// 4. Policy: A strict invariant constraint over state transitions.
interface Policy extends Anchor {
  type: "Policy";
  predicate: (s_current: State, s_next: State) => boolean;
  priority_level: number;
}

// 5. Capability: An executable state-transition function.
interface Capability extends Anchor {
  type: "Capability";
  required_resources: Record<ID, number>; // Resource ID -> Quantity required
  effect: (s_current: State) => State; 
}

// 6. Resource: A quantifiable prerequisite consumed or locked by Capabilities.
interface Resource extends Anchor {
  type: "Resource";
  capacity: number;
  allocations: Record<ID, number>; // Capability ID -> Quantity allocated
}

// 7. Goal: A target state condition or metric optimization objective.
interface Goal extends Anchor {
  type: "Goal";
  target_metrics: Record<ID, { operator: ">" | "<" | "=="; value: number }>;
  target_states: ID[];
  deadline_ms?: number;
}
```

## 2. Multimodal Evidence Semantic Layer

Every assertion, relation, and state transition in the WKG must be backed by verifiable data. This prevents hallucination and ensures traceability across heterogeneous inputs (e.g., telemetry, unstructured text, visual data).

```typescript
type StreamType = "telemetry" | "log" | "document" | "media";

interface Evidence {
  evidence_id: ID;
  stream: StreamType;
  raw_payload_hash: Hash;
  confidence_score: number; // Range: [0.0, 1.0]
  provenance: string;       // Origin of the data stream
}

interface GroundedClaim {
  claim_id: ID;
  subject_anchor_id: ID;
  assertion_logic: string;  // Formal logic representation of the claim
  evidence_refs: ID[];      // References to Evidence instances
  attestation_signature: Hash;
}
```

*Semantic Rule*: For any State $S$ to be appended to the WKG, there must exist a `GroundedClaim` mapping evidence to the state's `snapshot`.

## 3. Formal Grounding Mechanism

### 3.1 Capability-to-Resource Mapping
Capabilities are physically and logically constrained by Resources. Let $C$ be the set of capabilities and $R$ the set of resources. The grounding function requires:

$$ \forall c \in C, \text{Execute}(c) \implies \left( \forall r_i \in \text{Req}(c), \text{Available}(r_i) \ge \text{Req}(c, r_i) \right) $$

Upon capability execution, resource allocations are atomically updated in the WKG delta-log.

### 3.2 Policy-to-State & Metric Thresholds
Policies constrain the allowable subset of state transitions. A policy $P$ maps to a transition validation function based on metric thresholds:

$$ \text{ValidTransition}(S_i, S_{i+1}) \iff \forall P_k \in \mathcal{P}, P_k(S_i, S_{i+1}) = \text{True} $$

Where $P_k$ often asserts threshold bounds via Metrics:
$$ P_k \implies \left( \forall m \in M_{constrained}, \text{evaluator}_m(S_{i+1}) \in [m_{min}, m_{max}] \right) $$

## 4. Contradiction Surfaces & Resolution Logic

"Contradiction surfaces" represent points of logical friction within the Semantic Hypergraph (SHG).

### 4.1 Identified Friction Points
1. **Goal vs. Policy ($\chi_{G,P}$)**: A Goal $G$ requires a state transition sequence $\{S_i \to ... \to S^*\}$ where at least one transition violates Policy $P$.
2. **Capability vs. Resource ($\chi_{C,R}$)**: Parallel capabilities $C_1, C_2$ request an aggregate resource volume $v$ where $v > \text{capacity}(R)$.
3. **Policy vs. Policy ($\chi_{P,P}$)**: $P_1$ requires Metric $M_a > x$, while $P_2$ requires Metric $M_a \le x$.

### 4.2 Resolution Logic (The Contradiction Handler)

The AICL interpreter resolves contradictions via strict, verifiable operational semantics, preventing silent failures.

```typescript
function resolveContradiction(conflict: FrictionPoint): Resolution {
  match (conflict.type) {
    case "Goal_vs_Policy":
      // Policies are strict invariants; Goals are aspirational.
      return { action: "Halt_Goal", reason: "Policy_Violation", priority_winner: conflict.policy.id };
    
    case "Capability_vs_Resource":
      // Enforce temporal serialization or partial failure based on Capability priority.
      const winner = max(conflict.capabilities, c => c.priority);
      return { action: "Suspend_Capability", suspended: conflict.capabilities.filter(c => c !== winner) };
    
    case "Policy_vs_Policy":
      if (conflict.p1.priority_level > conflict.p2.priority_level) {
        return { action: "Override", active: conflict.p1, overridden: conflict.p2 };
      }
      if (conflict.p2.priority_level > conflict.p1.priority_level) {
        return { action: "Override", active: conflict.p2, overridden: conflict.p1 };
      }
      // Unresolvable contradiction triggers systemic halt.
      return { action: "System_Halt", reason: "Unresolvable_Policy_Conflict" };
  }
}
```

## 5. Governance & Versioning Model

The WKG operates as a Merkle-tree structured, append-only ledger to ensure cryptographic integrity, proof-of-state, and exact reproducibility.

### 5.1 Immutable Snapshots and Delta-Logs

- **Snapshot ($W_t$)**: A complete representation of the WKG at time $t$.
- **Delta-Log ($\Delta_{t+1}$)**: A verified set of mutations applied to $W_t$.

$$ W_{t+1} = \text{Apply}(W_t, \Delta_{t+1}) $$

### 5.2 Delta-Log Schema

```typescript
interface DeltaLogEntry {
  transaction_id: ID;
  parent_wkg_hash: Hash; // Cryptographic link to previous state
  mutations: Mutation[];
  evidence_refs: ID[];   // Proofs justifying the mutation
  timestamp: number;
  new_wkg_hash: Hash;
}

type Mutation = 
  | { type: "ADD_ANCHOR"; anchor: Anchor }
  | { type: "DEACTIVATE_ANCHOR"; id: ID }
  | { type: "UPDATE_STATE"; old_state: ID; new_state: State }
  | { type: "ALLOCATE_RESOURCE"; resource: ID; capability: ID; amount: number };
```

### 5.3 Governance Execution
Governance queries the Delta-Log to verify state provenance. Before applying $\Delta_{t+1}$, the WKG engine asserts:
1. **Continuity**: `parent_wkg_hash` == current HEAD hash.
2. **Grounding**: All mutations link to valid `evidence_refs`.
3. **Consistency**: No unhandled contradictions ($\chi$) exist in the resulting $W_{t+1}$.