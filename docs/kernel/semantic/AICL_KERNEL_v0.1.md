# AICL Kernel v0.1

**Status:** Formal specification — first-pass kernel
**Grounded in:** `spec/programming-reference-manual.md` (v0.3), `wkg/core/aicl-core-ontology-spec.md` (v1.2)
**Supersedes:** No prior kernel document (this is the inaugural kernel specification)

**Kernel v0.1.1 companion documents:** [`../SHG_SCHEMA.md`](../SHG_SCHEMA.md), [`../HAIG_SPEC.md`](../HAIG_SPEC.md), [`../PACT_COORDINATION_SPEC.md`](../PACT_COORDINATION_SPEC.md), and [`../MATERIALIZER_INTERFACE.md`](../MATERIALIZER_INTERFACE.md) define the SHG schema, HAIG arbitration, PACT coordination, and materializer interface for the current contract layer.

---

## 1. Scope

This document defines the core entity model of the AICL kernel layer. It covers the eight primary kernel entities:

- `Goal`
- `Policy`
- `Capability`
- `Constraint`
- `ResourceBudget`
- `Agent`
- `Flow`
- `ProofObligation`

These entities are the objects that the AICL kernel reasons over during compilation. They are not source-code constructs — they are semantic objects that exist in the compilation graph and are grounded through the WKG.

---

## 2. Foundational Axioms

### Axiom 1 — WKG Supremacy
Every semantic identifier in an AICL program must resolve to a WKG anchor via a pinned `WKGSnapshot` associated with the active ICC. An identifier that cannot resolve is a hard compile error.

### Axiom 2 — Compile/Runtime Separation
Properties that can be decided statically over the declared semantic graph must be checked at compile time. Properties that require runtime state, external system interaction, or model evaluation are residual runtime obligations. No runtime obligation may be silently promoted to satisfy a compile-time proof requirement.

### Axiom 3 — Tier Monotonicity
A proof obligation at tier `k` may only be satisfied by a mechanism at tier `≤ k`. Tier 3 (heuristic) cannot satisfy Tier 1 (decidable). Tier 2 (probabilistic) cannot satisfy Tier 1 without explicit downgrade acknowledgment recorded in the ICC.

### Axiom 4 — ICC as Root of Trust
Every compilation pass is anchored to exactly one ICC. The ICC records the WKG snapshot hash, all goal and constraint declarations, accepted risk, and a cryptographic signature. Reproducibility requires that the same ICC + same source text → same semantic graph.

### Axiom 5 — StateAnchor vs StateObservation
`StateAnchor` records are compile-time semantic declarations. `StateObservation` records are runtime facts. No runtime evidence is required for a `StateAnchor` to be valid. Runtime evidence is mandatory before any `StateObservation` may be committed to the WKG.

---

## 3. Entity Definitions

### 3.1 Goal

**Definition:**
A `Goal` is a named target condition over a `StateAnchor` or a named optimization direction over a `Metric`. It is the primary semantic intent of an AICL program or module.

**Formal structure:**
```
Goal ::= 
  | AchieveGoal(anchor: StateAnchorRef)          -- reach and hold a state
  | MaintainGoal(anchor: StateAnchorRef)          -- invariant to preserve
  | AvoidGoal(anchor: StateAnchorRef)             -- state to never enter
  | OptimizeGoal(metric: MetricRef, dir: Direction) -- optimize a metric
```

**WKG grounding:**
All `anchor` references must resolve to `StateAnchor` records in the active WKG snapshot. All `metric` references must resolve to `Metric` anchors.

**Constraints on goals:**
- `goal` and `achieve` accept only `StateAnchorRef`
- `maintain` accepts only `StateAnchorRef`; carries both compile-time invariant proof and runtime monitoring obligations (see §5)
- `avoid` accepts only `StateAnchorRef`
- `optimize` accepts only `MetricRef` with an explicit `Direction` (`minimize` | `maximize`)

**Compile-time behavior:**
The kernel must verify that the declared goal set is jointly satisfiable given the active constraints and capabilities. A goal set that is statically contradictory with a declared policy is a compile error.

---

### 3.2 Policy

**Definition:**
A `Policy` is a named, machine-checkable invariant over states, capability effects, or environment properties. Policies constrain what the system may do, under what conditions.

**Formal structure:**
```
Policy ::= {
  id: PolicyId                           -- WKG-anchored identifier
  wkg_anchor: WKGAnchorRef              -- WKG Policy anchor
  predicates: [PolicyPredicate]          -- machine-checkable clauses
  scope: Environment | "*"              -- applies in named environment or globally
  priority: Integer                     -- for conflict resolution (higher = stronger)
  proof_tier: Tier                      -- minimum tier required to satisfy this policy
}
```

**WKG grounding:**
`id` must resolve to a `Policy` anchor. `scope` must resolve to an `Environment` anchor or the wildcard `"*"`.

**Attachment:**
Policies are attached to a program scope via `requires_policy <PolicyId>`. Once attached, all capabilities operating within that scope inherit the policy constraint.

**Compile-time behavior:**
The kernel must check that all capabilities in scope are compatible with all attached policies. An incompatible capability-policy pair is a compile error unless the contradiction is explicitly recorded as `risk_accepted` in the ICC.

**Conflict resolution:**
When two policies at equal priority conflict, the compiler escalates to HAIG. When priorities differ, the higher-priority policy wins and the resolution is recorded. An unresolvable conflict after HAIG escalation is a compile error.

---

### 3.3 Capability

**Definition:**
A `Capability` is a named, bounded executable transition function. It represents an action the system may perform, with declared effects, resource consumption, and limits.

**Formal structure:**
```
Capability ::= {
  id: CapabilityId                       -- WKG-anchored identifier
  wkg_anchor: WKGAnchorRef              -- WKG Capability anchor
  effects: [EffectLabel]                -- side-effects, each resolving to WKG Capability anchor
  resource_consumption: [ResourceClaim] -- resources consumed on execution
  limits: [ConstraintNode]              -- per-execution bounds
  policy_requirements: [PolicyRef]      -- policies that must be satisfied before use
}
```

**WKG grounding:**
`effects` labels are compiler-facing handles over WKG `Capability` anchors. They are not a separate type system. Each effect label must resolve through the WKG or be declared locally and grounded before use.

**Capability Grounding Axiom (from WKG spec):**
```
Gamma_C(c) = True  iff  forall r in c.resource_consumption:
                         r.quantity <= r.resource.capacity_available
```
If `Gamma_C(c)` is false, the capability cannot be scheduled or executed.

**IFC on OpaqueIntents:**
When a `Capability` is implemented as an `OpaqueIntent` (external tool/API boundary), every value passed in must carry matching or weaker policy labels than those declared in the OpaqueIntent's `policy_attestation`. The compiler enforces this at the boundary. The compiler cannot verify internal behavior of the external provider.

---

### 3.4 Constraint

**Definition:**
A `Constraint` is a named, typed, bounded requirement on a measurable property of the system, annotated with a proof tier and mechanism.

**Formal structure:**
```
Constraint ::= {
  subject: IdentifierRef                 -- entity or metric being constrained
  predicate: ComparisonOp               -- <=, >=, ==, !=
  bound: Literal (with unit)            -- typed bound value
  scope: ScopeRef                       -- compilation scope where active
  priority: Integer                     -- for conflict resolution
  tier: ProofTier                       -- 1 | 2 | 3
  mechanism: ProofMechanism             -- static_analysis | probabilistic | heuristic
  model: WKGAnchorRef | null            -- required for Tier 2; optional for Tier 3
}
```

**Normalization:**
Before SHG construction, the kernel normalizes all constraints to this form. Constraints from different sources (imports, policypack, direct declarations) are merged and checked for contradictions.

**Tier binding:**
A constraint with `tier: 1` requires a static, decidable proof. Absence of such a proof blocks compilation (not downgrades). A constraint with `tier: 2` requires a probabilistic model reference (`model` field mandatory). A constraint with `tier: 3` is advisory and cannot block compilation.

---

### 3.5 ResourceBudget

**Definition:**
A `ResourceBudget` is a named declaration of upper bounds on consumable resource dimensions within a compilation scope.

**Formal structure:**
```
ResourceBudget ::= {
  scope: ScopeRef
  bounds: [ResourceBound]
}

ResourceBound ::= {
  resource: MetricRef                   -- must resolve to WKG Metric or Resource anchor
  dimension: String                     -- e.g., "cost.usd_per_session", "latency.p95_ms"
  limit: Literal (with unit)
  tier: ProofTier                       -- how this bound is enforced
}
```

**Compile-time behavior:**
The kernel checks that the aggregate resource consumption of all capabilities within scope does not exceed declared budget bounds. Tier 1 bounds are statically verified; Tier 2 bounds produce probabilistic validation obligations carried as residual runtime monitors.

**Known dimensions (from PRM §7.4):**
`cost.usd_per_session`, `latency.p95_ms`, `battery.mw`, `memory.mb`, `carbon.gco2e`

---

### 3.6 Agent

**Definition:**
An `Agent` is a named actor with a declared goal, a set of permitted capabilities, a coordination protocol, and a multi-dimensional autonomy profile.

**Formal structure:**
```
Agent ::= {
  id: AgentId
  goal: GoalRef
  capabilities: [CapabilityRef]
  coordination: CoordinationProtocol    -- e.g., PACT
  autonomy: AutonomyProfile
}

AutonomyProfile ::= {
  action: Float [0.0, 1.0]             -- freedom to select execution method
  goal: Float [0.0, 1.0]              -- freedom to modify declared goal
  resource: Float [0.0, 1.0]          -- freedom to allocate/request budget
  delegation: Boolean                  -- may spawn or delegate to subagents
}
```

**Constraints:**
- `goal.goal` autonomy = 0.0 means the agent may NOT modify its declared goal. This is the default safe value.
- `delegation: false` means the agent may NOT create subagents. This is the default safe value.
- All `capabilities` must be listed at compile time. An agent may not exercise a capability not in its declared set.

**WKG grounding:**
`goal` must resolve to a `Goal` anchor. Each element of `capabilities` must resolve to a `Capability` anchor.

**Note on coordination:**
`PACT` is defined by the Kernel v0.1.1 contract document [`../PACT_COORDINATION_SPEC.md`](../PACT_COORDINATION_SPEC.md). This first-pass kernel document preserves the original Agent structure and delegates coordination protocol details to that companion specification.

---

### 3.7 Flow

**Definition:**
A `Flow` is a named directed computation graph over agents and proof gates, expressing the execution structure of a multi-step, potentially parallel, policy-gated workflow.

**Formal algebra:**
```
Flow ::=
  | Seq(a: FlowNode, b: FlowNode)       -- a -> b (sequencing)
  | Par(a: FlowNode, b: FlowNode)       -- a || b (parallel execution)
  | ProofGate(proof: ProofExpr)         -- [proof: P]; blocks if P fails
  | CondRoute(cond: Cond, a: FlowNode, b: FlowNode)  -- [if C: a | else: b]
  | AgentRef(agent: AgentId)            -- named agent step
  | EscalateToHuman                     -- human review handoff
```

**Semantics:**
- `Seq(a, b)`: `b` executes only after `a` completes successfully.
- `Par(a, b)`: `a` and `b` execute concurrently; the flow continues when both complete.
- `ProofGate(P)`: execution halts at this point until `P` is verified. If `P` cannot be verified, the flow does not continue. The tier of `P` determines whether this check is compile-time (Tier 1) or runtime (Tier 2/3).
- `CondRoute(C, a, b)`: evaluates `C` at runtime and routes to `a` or `b`.

**Compile-time behavior:**
The kernel converts the flow algebra into a graph structure (SHG fragment) and verifies reachability of goal states, absence of unresolvable branches, and capability coverage for each agent step.

---

### 3.8 ProofObligation

**Definition:**
A `ProofObligation` is a named, tier-classified requirement that a property holds, bound to a specific proof mechanism, and associated with a semantic object (Goal, Policy, Constraint, or Capability).

**Formal structure:**
```
ProofObligation ::= {
  id: ObligationId
  property: SemanticPropertyExpr        -- what must be proven
  tier: ProofTier                       -- 1 | 2 | 3
  mechanism: ProofMechanism             -- the means of proof
  model: WKGAnchorRef | null            -- required for tier 2
  associated_with: [KernelEntityRef]    -- which entities this obligation protects
  stage: CompileTime | Runtime          -- when this is checked
  failure_action: FailureAction         -- what happens if not satisfied
}

ProofTier ::= 1 | 2 | 3

ProofMechanism ::=
  | static_analysis
  | type_checking
  | label_flow
  | probabilistic (requires model ref)
  | heuristic

FailureAction ::=
  | compile_error                       -- blocks artifact production (Tier 1)
  | residual_monitor                    -- downgrade to runtime obligation
  | advisory                            -- records but does not block (Tier 3 only)
```

**Tier rules:**
- Tier 1 failure action MUST be `compile_error`. It cannot be `residual_monitor`.
- Tier 2 failure action MUST be `residual_monitor` or `compile_error` (if model evaluation fails at compile time).
- Tier 3 failure action MUST be `advisory`.
- A Tier 2 obligation may NOT silently satisfy a Tier 1 obligation slot. If a Tier 1 obligation is pending and only Tier 2 evidence exists, the compiler must either fail or record an explicit `risk_accepted` entry in the ICC.

---

## 4. Composition Rules

**Goal set satisfiability:**
The kernel must verify that the declared goal set `{G_1, ... G_n}` is jointly satisfiable: no `G_i` is a `MaintainGoal` and `G_j` is an `AvoidGoal` where `G_i` and `G_j` reference the same `StateAnchor`.

**Capability-policy compatibility:**
For every `Agent A` with `capability c` and every `Policy P` in scope: `P.predicates` must be satisfiable by `c.effects`. If not, this is a compile error unless recorded as `risk_accepted`.

**Flow reachability:**
For every declared `Goal G` in `achieve` form, the kernel must verify that there exists at least one executable `Flow` path that terminates in a state satisfying `G`. Unreachable goals are compile warnings (not errors) unless marked `required`.

**Budget closure:**
The aggregate `resource_consumption` across all concurrent flow branches must not exceed declared `ResourceBudget` bounds for Tier 1 bounds. Tier 2 bounds generate residual monitors.
