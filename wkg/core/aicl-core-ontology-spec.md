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

## 2. Relation Vocabulary

The AICL ontology restricts graph edges to a predefined, machine-checkable relation vocabulary. This prevents arbitrary semantic drift and ensures deterministic graph traversal.

| Relation ($R$) | Domain ($Dom(R)$) | Range ($Ran(R)$) | Description |
|---|---|---|---|
| `is_a` | `Anchor` | `Anchor` | Subtyping or instance-of mapping (e.g., Entity -> Entity). |
| `depends_on` | `Capability` \| `Entity` | `Entity` \| `Resource` \| `Capability` | Asserts a strict execution or existence prerequisite. |
| `constrains` | `Policy` | `State` \| `Capability` \| `Environment` | Connects an invariant to its target scope. |
| `consumes` | `Capability` | `Resource` | Denotes a capability allocating/locking a resource. |
| `satisfies` | `State` \| `Capability` | `Goal` \| `Policy` | Asserts a target has been met or an invariant upheld. |
| `violates` | `State` \| `Capability` | `Policy` | Asserts a contradiction against a specific invariant. |
| `evidenced_by` | `State` \| `Mutation` | `Evidence` | Establishes the grounding link between a claim and its proof. |
| `executed_in` | `Capability` | `Environment` | Maps a capability to its contextual execution boundary. |

## 3. Multimodal Evidence Semantics & Trust Classes

To prevent hallucination and ensure absolute traceability, the WKG enforces a strict **Multimodal Evidence Semantic Layer**.

- **The Grounding Axiom**: No `State` ($S$) can be added to the WKG without an array of `evidence_refs` mapping to valid `Evidence` ($Ev$) anchors.
- **Multimodal Streams**: The `stream_type` supports heterogeneous inputs (`telemetry`, `log`, `document`, `screenshot`, `api_response`, `model_output`, `human_report`).
- **Evidence Trust Classes**: Evidence must be mapped to formal trust classes, which dictate mutation admissibility.
  - **Class A (Cryptographic)**: Signed hardware telemetry, signed API responses. Deterministic and non-repudiable.
  - **Class B (System Generative)**: Unsigned server logs, APM traces. Strong environmental trace, but potentially spoofable.
  - **Class C (Opaque Generative)**: LLM/Model outputs (e.g., text, code, generated classifications). Probabilistic confidence scores $\le 0.99$.
  - **Class D (Human Generative)**: User reports, uploaded screenshots without cryptographic signatures.

*Admissibility Rule*: Mutations modifying critical constraints (e.g., bypassing a `strict_halt` policy or allocating $>90\%$ of a `Resource`) strictly require **Class A** or **Class B** evidence. Class C/D evidence requires a secondary human-in-the-loop attestation (escalation) before the delta-log accepts the mutation.

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