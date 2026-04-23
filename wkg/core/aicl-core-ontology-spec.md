# AICL-Core Ontology and WKG Specification

**Document Type**: Formal Technical Specification
**Module**: WKG (World Knowledge Graph) Core
**Status**: Draft (v1.1)

## 1. Ontological Framework & Nominal Type Anchors

The AICL-Core ontology is formalized as a set of nine nominal anchors: $\Omega = \{E, Env, S, Ev, G, M, P, C, R\}$. These anchors establish a strict, machine-checkable structural foundation for the World Knowledge Graph (WKG).

The complete, machine-readable TypeScript definition of this ontology is maintained in `wkg/core/schema.ts`.

### 1.1 The Nine Pillars of the AICL-Core Ontology

1. **Environment ($Env$)**: The contextual boundary isolating entities, resources, and policies. Formally decomposed into `Runtime`, `Deployment`, `Legal`, or `Cohort` sub-classes.
2. **Entity ($E$)**: An identifiable subject/object within an Environment.
3. **State ($S$)**: A temporal, immutable binding of variables/attributes for an Entity or Environment at a specific timestamp.
4. **Evidence ($Ev$)**: A cryptographically verifiable grounding proof mapping external data streams to WKG claims.
5. **Metric ($M$)**: A computable evaluation function returning a scalar or vector based on a State.
6. **Policy ($P$)**: A strict invariant constraint over state transitions (e.g., $S_t \to S_{t+1}$).
7. **Capability ($C$)**: An executable state-transition function, bounded by preconditions and resource requirements.
8. **Resource ($R$)**: A quantifiable prerequisite consumed, locked, or released by Capabilities.
9. **Goal ($G$)**: A target state condition or metric optimization objective, acting as the driving force for Capability execution.

## 2. Relation Vocabulary & Reasoning Properties

The AICL ontology restricts graph edges to a predefined, machine-checkable relation vocabulary. This prevents arbitrary semantic drift and ensures deterministic graph traversal. Each relation carries strict algebraic properties and contradiction implications evaluated by the kernel.

| Relation ($R$) | Domain | Range | Algebraic Properties | Closure Rules | Contradiction Implications | Validity Layer |
|---|---|---|---|---|---|---|
| `is_a` | `Anchor` | `Anchor` | Transitive, Reflexive, Antisymmetric | If $A$ `is_a` $B$ and $B$ `is_a` $C$, then $A$ `is_a` $C$ | $A$ `is_a` $B \land B$ `is_a` $A \implies A=B$ | Both |
| `depends_on` | `Capability`\|`Entity` | `Entity`\|`Resource`\|`Capability` | Transitive, Irreflexive, Asymmetric | If $C_1$ `depends_on` $C_2$, execution order is $C_2 \to C_1$ | Cycle: $A$ `depends_on` $B$ `depends_on` $A \implies$ Scheduling Halt | SHG |
| `constrains` | `Policy` | `State`\|`Capability`\|`Environment` | Irreflexive, Asymmetric | Policies apply implicitly to all nested sub-environments | Target $S$ transition violates $P \implies$ Kernel Halt | Kernel |
| `consumes` | `Capability` | `Resource` | Irreflexive, Asymmetric | Resource pool decreases monotonically during capability lock | $\sum \text{consumed} > \text{capacity} \implies \chi_{C,R}$ Fault | SHG |
| `satisfies` | `State`\|`Capability` | `Goal`\|`Policy` | Irreflexive, Asymmetric | If $S$ `satisfies` $G$, goal is terminated or marked achieved | $S$ `satisfies` $X \land S$ `violates` $X \implies$ Logic Halt | SHG |
| `violates` | `State`\|`Capability` | `Policy` | Irreflexive, Asymmetric | If $S$ `violates` $P$, the transition is formally invalid | $S$ `violates` $P \implies \chi_{G,P}$ Halt or Escalate | Kernel |
| `evidenced_by` | `State`\|`Mutation` | `Evidence` | Irreflexive, Asymmetric | Every valid $S$ mutation must map to $\ge 1$ $Ev$ | $\neg \exists Ev$ for $S \implies$ Grounding Halt | Kernel |
| `executed_in`| `Capability` | `Environment` | Irreflexive, Asymmetric, Functional | $C$ must inherit active policies of $Env$ | $C$ `executed_in` disjoint $Env_1, Env_2 \implies$ Halt | SHG |

## 3. Multimodal Evidence Semantics & Trust Classes

To prevent hallucination and ensure absolute traceability, the WKG enforces a strict **Multimodal Evidence Semantic Layer**.

- **The Grounding Axiom**: No `State` ($S$) can be added to the WKG without an array of `evidence_refs` mapping to valid `Evidence` ($Ev$) anchors.
- **Multimodal Streams**: The `stream_type` supports heterogeneous inputs (`telemetry`, `log`, `document`, `screenshot`, `api_response`, `model_output`, `human_report`).
- **Evidence Trust Classes**: Evidence must be mapped to formal trust classes, which dictate mutation admissibility.
  - **Class A (Cryptographic)**: Signed hardware telemetry, signed API responses. Deterministic and non-repudiable.
  - **Class B (System Generative)**: Unsigned server logs, APM traces. Strong environmental trace, but potentially spoofable.
  - **Class C (Opaque Generative)**: LLM/Model outputs (e.g., text, code, generated classifications). Probabilistic confidence scores $\le 0.99$.
  - **Class D (Human Generative)**: User reports, uploaded screenshots without cryptographic signatures.

### 3.1 Admissibility Matrix

The WKG delta-log enforcing governance validates the mutation type against the provided `evidence_refs`. If the evidence trust class is insufficient, the transaction either halts or mandates a Class D (Human) escalation.

| Mutation Type | Minimum Evidence Class | Escalation Requirements | Mandatory Human Approval |
|---|---|---|---|
| **ADD_ANCHOR** (Entity, Metric) | Class C (Opaque Generative) | None | No |
| **ADD_ANCHOR** (Policy, Goal) | Class B (System Generative) | If Class C, escalate to Class D | No (unless Class C origin) |
| **UPDATE_STATE** (Routine) | Class B | If Class C, flag as probabilistic state | No |
| **UPDATE_STATE** (Critical Boundary) | Class A (Cryptographic) | If Class B provided, requires Class D | Yes (if Class A unavailable) |
| **ALLOCATE_RESOURCE** ($<50\%$ Cap) | Class B | None | No |
| **ALLOCATE_RESOURCE** ($\ge90\%$ Cap) | Class A | Mandatory Escalate to Class D | Yes |

*Critical Boundary*: A state update resulting from a `strict_halt` policy evaluation or an external financial/system-level commit.

## 4. Capability and Policy Grounding

### 4.1 Capability Grounding ($\Gamma_C$)
Capabilities are functionally useless unless grounded in available WKG Resources. The grounding mechanism requires a pre-flight resource validation check:

$$ \Gamma_C(c) = \text{True} \iff \forall r \in \text{Req}(c), \text{Capacity}(r) - \sum \text{Allocations}(r) \ge \text{Quantity}(c, r) $$

If $\Gamma_C(c)$ is false, the capability cannot be scheduled or executed. Resource allocation mutations (`ALLOCATE_RESOURCE`, `RELEASE_RESOURCE`) are handled atomically in the Delta-Log.

### 4.2 Policy Grounding ($\Gamma_P$)
Policies represent the immutable laws of an Environment. A state transition sequence $\{S_t, S_{t+1}\}$ generated by a Capability is grounded if and only if it satisfies all active policies within the Environment:

$$ \Gamma_P(S_t, S_{t+1}) = \text{True} \iff \forall p \in \text{ActivePolicies}(Env), \text{Predicate}_p(S_t, S_{t+1}) = \text{True} $$

Policies can enforce bounds via Metrics (e.g., asserting that the `Network_Latency` Metric remains $< 50ms$).

## 5. Contradiction Surfaces ($\chi$)

Ontological structure inherently introduces logical friction points. The AICL runtime identifies and handles these "contradiction surfaces" explicitly rather than failing silently.

### 5.1 Identified Friction Points
1. **Goal vs. Policy ($\chi_{G,P}$)**: A Goal requires reaching a target state $S^*$, but the only Capability paths to $S^*$ result in intermediate states that violate an active Policy $P$.
2. **Capability vs. Resource ($\chi_{C,R}$)**: Parallel active capabilities attempt to lock a volume of resources exceeding the Environment's maximum `capacity_total`.
3. **Policy vs. Policy ($\chi_{P,P}$)**: $P_1$ asserts Metric $m > x$, while $P_2$ asserts Metric $m \le x$ for the same Environment.

### 5.2 Resolution Logic
- **$\chi_{G,P}$**: Policies have strict precedence. The runtime yields a `Goal_Unreachable` fault with the blocking Policy ID.
- **$\chi_{C,R}$**: Capabilities are serialized by a deterministic priority queue, or the lower-priority Capability yields a `Resource_Exhausted` fault.
- **$\chi_{P,P}$**: Resolved via the `priority_level` defined on the Policy anchors. If $P_1$ and $P_2$ have equal priority, the WKG engine triggers a systemic halt (`Contradiction_Halt`) to prevent divergent state corruption.

## 6. Mapping to Formal Semantics

The ontology is not merely descriptive; it serves as the underlying target for the AICL kernel and runtime compiler:

| Ontology Anchor / Construct | Formal Semantic Target | Runtime Behavior |
|---|---|---|
| Nominal Anchors ($E, S, G, P, etc.$) | **Type Classes** | Static typing constraints resolved during AST traversal. |
| Capabilities ($C$) | **Effect / Capability System** | Bounded functions forming a formal effect algebra. Assessed pre-execution. |
| Policies ($P$) | **Proof Obligations** | SMT-solvable propositions evaluated synchronously on edge transition. |
| Contradictions ($\chi$) | **Halt / Escalate Semantics** | Deterministic process faults triggering priority-based backoff or external human escalation (via Class D evidence). |

## 7. Governance & Versioning Model

The WKG evolves via a Merkle-tree structured, append-only ledger. This ensures cryptographic integrity and temporal reproducability.

### 7.1 The Delta-Log
The WKG state at time $t+1$ is exclusively derived by applying a `DeltaLogEntry` to the state at time $t$.

$$ W_{t+1} = \text{Apply}(W_t, \Delta_{t+1}) $$

### 7.2 Commit Validation Rules
Before a `DeltaLogEntry` is committed to the WKG, the governance engine asserts:
1. **Hash Chain Continuity**: `parent_wkg_hash` strictly matches the current HEAD of the WKG.
2. **Evidence Completeness**: Any `UPDATE_STATE` mutation has valid, resolvable `evidence_refs`.
3. **Resource Conservation**: No `ALLOCATE_RESOURCE` mutation pushes allocations past `capacity_total`.
4. **Policy Compliance**: No state mutation violates the active Policies ($\Gamma_P = \text{True}$).

By enforcing these constraints at the structural level, AICL guarantees that the Semantic Hypergraph remains logically sound, grounded, and fully verifiable.