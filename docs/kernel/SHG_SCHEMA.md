# AICL SHG Schema

**Status:** Kernel v0.1.1 consolidation draft  
**Purpose:** Define the internal structure of the Semantic Hypergraph (SHG) so materializers, proof engines, and AI evaluators have a stable intermediate representation.

## 1. Role of the SHG

The Semantic Hypergraph (SHG) is AICL's canonical planning and compilation graph.

It is not a visualization layer and it is not a conventional control-flow graph. It is the semantic intermediate representation that connects:

```text
ICC + WKG grounding
-> kernel entities
-> proof obligations
-> flow structure
-> materialization targets
-> residual runtime obligations
```

The SHG exists to represent relationships that are not adequately captured by binary edges alone. A single policy may constrain several agents, capabilities, resources, and environments at once. A single proof obligation may depend on a goal, a capability, a flow path, and a policy. These are n-ary relationships, so the SHG uses hyperedges.

## 2. SHG Top-Level Schema

```text
SHG ::= {
  id: SHGId
  icc_hash: Hash
  wkg_snapshot_hash: Hash
  nodes: Map<SHGNodeId, SHGNode>
  hyperedges: Map<SHGHyperedgeId, SHGHyperedge>
  constraints: [NormalizedConstraintNode]
  proof_gates: [ProofGateNode]
  contradiction_log: [ContradictionRecord]
  provenance: ProvenanceRecord
}
```

Required invariants:

1. `SHG.icc_hash` must match the active ICC hash.
2. `SHG.wkg_snapshot_hash` must match the ICC-pinned WKG snapshot.
3. Every semantic node must reference a valid WKG anchor or an explicitly declared provisional anchor.
4. Every hyperedge endpoint must reference an existing SHG node.
5. Every proof gate must reference at least one proof obligation.
6. Every materializer must consume the SHG, not bypass it.

## 3. SHG Node Schema

```text
SHGNode ::= {
  id: SHGNodeId
  kind: SHGNodeKind
  label: String
  wkg_anchor: WKGAnchorRef | null
  kernel_entity_ref: KernelEntityRef | null
  attributes: Map<String, Value>
  provenance: ProvenanceRef
}
```

```text
SHGNodeKind ::=
  | GoalNode
  | NonGoalNode
  | StateAnchorNode
  | PolicyNode
  | CapabilityNode
  | ConstraintNode
  | ResourceBudgetNode
  | AgentNode
  | FlowNode
  | ProofObligationNode
  | ProofGateNode
  | EnvironmentNode
  | MaterializationTargetNode
  | RuntimeResidualNode
  | EvidenceNode
  | OpaqueIntentNode
```

A node whose kind corresponds to a WKG-backed semantic object must contain `wkg_anchor`.

A node without `wkg_anchor` is valid only if it represents an internal compilation object, such as a proof gate or a runtime residual.

## 4. SHG Hyperedge Schema

```text
SHGHyperedge ::= {
  id: SHGHyperedgeId
  kind: SHGHyperedgeKind
  sources: [SHGNodeId]
  targets: [SHGNodeId]
  participants: [SHGNodeId]
  relation: SemanticRelation
  guard: GuardExpr | null
  obligations_generated: [ProofObligationId]
  attributes: Map<String, Value>
  provenance: ProvenanceRef
}
```

```text
SHGHyperedgeKind ::=
  | Achieves
  | Maintains
  | Avoids
  | Optimizes
  | Constrains
  | RequiresPolicy
  | HasCapability
  | ConsumesResource
  | ProducesEffect
  | ExecutesFlow
  | Sequence
  | Parallel
  | ConditionalRoute
  | ProofGate
  | DelegatesTo
  | CoordinatesWith
  | MaterializesTo
  | ResidualizesToRuntime
  | AttestedBoundary
  | Violates
  | Satisfies
```

## 5. Mapping Kernel Entities to SHG

### Goal

```text
AchieveGoal(StateAnchorRef)
-> GoalNode --Achieves--> StateAnchorNode

MaintainGoal(StateAnchorRef)
-> GoalNode --Maintains--> StateAnchorNode
-> generates ProofObligation: invariant preservation

AvoidGoal(StateAnchorRef)
-> GoalNode --Avoids--> StateAnchorNode
-> generates ProofObligation: unreachable forbidden state

OptimizeGoal(MetricRef, Direction)
-> GoalNode --Optimizes--> MetricNode
```

### Policy

```text
PolicyNode --Constrains--> {CapabilityNode, AgentNode, EnvironmentNode, FlowNode}
```

### Capability

```text
AgentNode --HasCapability--> CapabilityNode
CapabilityNode --ProducesEffect--> Effect/CapabilityNode
CapabilityNode --ConsumesResource--> ResourceBudgetNode
CapabilityNode --RequiresPolicy--> PolicyNode
```

### Flow

```text
Seq(a, b)
-> FlowNode(a) --Sequence--> FlowNode(b)

Par(a, b)
-> {FlowNode(a), FlowNode(b)} --Parallel--> JoinNode

CondRoute(cond, a, b)
-> FlowNode --ConditionalRoute[guard=cond]--> {FlowNode(a), FlowNode(b)}

ProofGate(P)
-> ProofGateNode --ProofGate--> ProofObligationNode
```

## 6. Proof Obligation Generation

Typical derivations:

```text
GoalNode --Avoids--> StateAnchorNode
-> PO: forbidden state unreachable

PolicyNode --Constrains--> CapabilityNode
-> PO: capability effects compatible with policy predicates

AgentNode --HasCapability--> CapabilityNode
-> PO: capability listed, grounded, and reachable from flow

CapabilityNode --ConsumesResource--> ResourceBudgetNode
-> PO: resource ceiling not exceeded

OpaqueIntentNode --AttestedBoundary--> PolicyNode
-> PO: IFC labels do not cross unattested boundary
```

Every generated proof obligation must reference the SHG nodes and hyperedges that caused it.

## 7. SHG Validity Rules

An SHG is valid if:

1. All WKG-backed nodes resolve against the pinned WKG snapshot.
2. All hyperedge endpoints exist.
3. Every declared goal appears as a `GoalNode`.
4. Every declared policy appears as a `PolicyNode`.
5. Every declared capability appears as a `CapabilityNode`.
6. Every agent capability edge references a declared capability.
7. Every flow step references a valid flow node, agent node, or proof gate.
8. Every proof gate references a valid proof obligation.
9. Every materialization target is connected through `MaterializesTo`.
10. Every residual runtime obligation is represented by `RuntimeResidualNode` and appears in the ROM.

## 8. Kernel v0.1.1 Decision

For Kernel v0.1.1, the SHG is formally defined as:

> A WKG-grounded semantic hypergraph whose nodes represent kernel entities and whose hyperedges represent n-ary semantic relationships that generate proof obligations, materialization mappings, and runtime residuals.
