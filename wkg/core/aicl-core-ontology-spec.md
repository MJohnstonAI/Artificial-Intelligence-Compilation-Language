# AICL-Core Ontology and WKG Specification

**Document Type:** Formal technical specification
**Module:** WKG (World Knowledge Graph) Core
**Status:** Draft (v1.2)

## 0. Scope and Authority Contract

This document defines the WKG-side semantic substrate used by the AICL kernel, SHG layer, runtime, and governance path.

The WKG is the authoritative source of semantic identity for Goal, StateAnchor, Policy, Capability, Metric, Entity, Resource, Environment, and Evidence anchors. Kernel type classes are compiler-facing category labels over WKG anchors. Identifier resolution is performed through a pinned WKG snapshot during each compilation pass.

Important distinction:

- `StateAnchor` is a compile-time semantic declaration.
- `StateObservation` is a runtime observed fact referencing a `StateAnchor`.

The runtime grounding axiom applies to `StateObservation`, not to `StateAnchor`.

## 1. Ontological Framework and Nominal Anchors

The semantic identity layer of the AICL-Core ontology is formalized as nine nominal anchor classes:

- `Entity`
- `Environment`
- `StateAnchor`
- `Evidence`
- `Metric`
- `Policy`
- `Capability`
- `Resource`
- `Goal`

The complete, machine-readable companion definitions are maintained in:

- `wkg/core/schema.ts`
- `wkg/core/aicl-core-ontology.schema.json`

### 1.1 The Nine Pillars

1. **Environment**: The boundary in which entities, resources, capabilities, and policies are interpreted.
2. **Entity**: An identifiable subject or object within an environment.
3. **StateAnchor**: The compile-time semantic declaration of a state category.
4. **Evidence**: A grounding record linking observations or mutations to external proof sources.
5. **Metric**: A computable evaluation function over an entity or environment.
6. **Policy**: A machine-checkable invariant or bound over states, capabilities, or transitions.
7. **Capability**: An executable transition function bounded by resources and policies.
8. **Resource**: A quantifiable prerequisite consumed, locked, or released by capabilities.
9. **Goal**: A target state-anchor condition or metric optimization objective.

### 1.2 Runtime Observation Record

`StateObservation` is not a competing semantic authority. It is a runtime fact record over a `StateAnchor`.

- `StateAnchor` is what the kernel means when it speaks about a compile-time `State` category.
- `StateObservation` is what the runtime writes when evidence supports that a particular state condition has been observed.

This split prevents compile-time declarations from requiring runtime evidence.

## 2. Relation Vocabulary and Reasoning Properties

The ontology restricts graph edges to a predefined, machine-checkable relation vocabulary. This prevents arbitrary semantic drift and supports deterministic traversal and validation.

| Relation | Domain | Range | Closure / reasoning rule | Stage relevance |
|---|---|---|---|---|
| `is_a` | anchor | anchor | transitive taxonomy closure | compile + runtime |
| `depends_on` | `Capability` or `Entity` | `Entity`, `Resource`, or `Capability` | dependency ordering and cycle checks | runtime / SHG |
| `constrains` | `Policy` | `StateAnchor`, `Capability`, or `Environment` | policy applies to declared semantic targets | compile + runtime |
| `consumes` | `Capability` | `Resource` | resource accounting and lock checks | runtime |
| `satisfies` | `StateObservation` or `Capability` | `Goal` or `Policy` | observed or executed conformance | runtime |
| `violates` | `StateObservation` or `Capability` | `Policy` | contradiction or policy-breach signal | runtime |
| `evidenced_by` | `StateObservation` or mutation record | `Evidence` | graph-level traceability projection | runtime |
| `executed_in` | `Capability` | `Environment` | capability inherits active policies of target environment | runtime |

Notes:

- `evidence_refs` remains the required structural field on `StateObservation`. `evidenced_by` relations are the graph projection of that evidence linkage, not a substitute for it.
- Compile-time kernel normalization should reason primarily over `StateAnchor`, `Goal`, `Policy`, `Capability`, `Metric`, and `Resource` anchors resolved through a pinned snapshot.

## 3. Grounding, Evidence, and Admissibility

### 3.1 Runtime Grounding Axiom

No `StateObservation` may be committed to the WKG without `evidence_refs` resolving to one or more valid `Evidence` records.

This does **not** apply to `StateAnchor` declarations.

### 3.2 Evidence Trust Classes

Evidence records must be classified before mutation admission:

- **Class A (Cryptographic)**: signed telemetry, signed API responses, signed hardware outputs
- **Class B (System Generative)**: unsigned server logs, traces, APM outputs
- **Class C (Opaque Generative)**: model outputs, generated classifications, opaque synthesis
- **Class D (Human Generative)**: human reports, uploaded screenshots, operator assertions

### 3.3 Admissibility Matrix

| Mutation or record type | Minimum evidence class | Escalation rule | Mandatory human approval |
|---|---|---|---|
| `ADD_ANCHOR` for `Entity`, `Metric`, `StateAnchor` | Class C | none | no |
| `ADD_ANCHOR` for `Policy`, `Goal`, `Capability` | Class B | if only Class C support exists, escalate | no unless escalated |
| `UPDATE_STATE` producing `StateObservation` (routine) | Class B | if only Class C support exists, mark probabilistic | no |
| `UPDATE_STATE` producing `StateObservation` at critical boundary | Class A | if Class A unavailable, escalate to human | yes when escalated |
| `ALLOCATE_RESOURCE` below 50% capacity | Class B | none | no |
| `ALLOCATE_RESOURCE` at or above 90% capacity | Class A | if unavailable, escalate to human | yes when escalated |

Critical boundary means a mutation associated with:

- `strict_halt` policy evaluation
- financial or legal commitment
- cross-environment transfer
- externally visible system commit

## 4. Capability, Policy, and Resource Grounding

### 4.1 Capability Grounding

Capability execution is valid only if required resources are available in the target environment:

Gamma_C(c) = True iff every required resource quantity can be allocated without exceeding `capacity_total`.

If `Gamma_C(c)` is false, the capability cannot be scheduled or executed.

### 4.2 Policy Grounding

Policies constrain declared state categories at compile time and observed state transitions at runtime.

- Compile time: policies participate in normalization, contradiction analysis, and proof obligations over `StateAnchor`-level declarations.
- Runtime: policies are checked against `StateObservation` and capability effects in the active environment.

### 4.3 Implementation-Placeholder Signatures

The fields `predicate_signature`, `evaluator_signature`, and `execution_signature` are implementation placeholders. They indicate that the record points to an evaluation or execution mechanism, but they do **not** by themselves commit the AICL spec to a specific runtime loading model such as content-addressed code fetch or URI-executed semantics.

## 5. Contradiction Surfaces and Pipeline Stages

The ontology recognizes three contradiction surfaces:

1. `chi_{G,P}` - Goal vs. Policy
2. `chi_{C,R}` - Capability vs. Resource
3. `chi_{P,P}` - Policy vs. Policy

### 5.1 Compile-Time Contradictions

Compile-time contradictions are discovered during kernel normalization, identifier resolution, constraint analysis, and proof preparation against a pinned WKG snapshot.

Primary outcomes:

- equal-priority policy conflict: `escalate_to_haig`
- unresolvable contradiction after normalization: `compile_error`
- precedence-resolvable contradiction: higher-precedence rule wins and the decision is recorded

This is the primary contradiction defense.

### 5.2 Runtime WKG Contradictions

Runtime contradictions are discovered when delta-log mutations, live imports, or late policy/resource changes produce an invalid runtime state.

Primary outcomes:

- `chi_{G,P}` runtime block: `Goal_Unreachable` or halt of the blocked path
- `chi_{C,R}` resource violation: `Resource_Exhausted` or deterministic suspension of the lower-priority capability
- `chi_{P,P}` equal-priority runtime conflict: `Contradiction_Halt`

This is the last-resort backstop after compile-time defenses.

The compile-time kernel escalation path and the runtime WKG halt path are complementary stage-specific defenses, not competing contradiction systems.

## 6. Snapshot Protocol and Delta-Log Governance

### 6.1 WKG Snapshot

Compilation must not resolve identifiers against a moving WKG head.

A `WKGSnapshot` captures:

- `snapshot_id`
- `wkg_snapshot_hash`
- `parent_wkg_snapshot_hash` when applicable
- `timestamp_ms`
- `purpose`
- `ontology_registry_ref`
- anchored records visible in that snapshot

All kernel identifier resolution during one compilation pass is performed against exactly one pinned `WKGSnapshot`.

### 6.2 ICC Binding

The ICC must record the snapshot used for compilation via:

- `wkg_snapshot_hash`

This is the reproducibility link between:

- source text
- resolved semantic anchors
- proof obligations
- emitted artifact

### 6.3 Delta-Log

The live WKG evolves through an append-only, Merkle-style delta-log:

W_(t+1) = Apply(W_t, Delta_(t+1))

Each `DeltaLogEntry` must validate:

1. `parent_wkg_snapshot_hash` matches the current accepted head
2. any `StateObservation` written by `UPDATE_STATE` has valid `evidence_refs`
3. resource allocations do not exceed `capacity_total`
4. no runtime mutation violates active policy admissibility rules

## 7. File Roles

### Authoritative / normative

- `wkg/core/schema.ts`
- `wkg/core/aicl-core-ontology.schema.json`
- relation vocabulary and admissibility rules in this file
- `wkg/core/canonical-ontology-registry.md`
- `wkg/core/integration-memo.md`

### Illustrative / examples / fixtures

- `wkg/core/example-wkg-snapshot.json`
- `wkg/core/example-delta-log.json`
- `wkg/core/contradiction-test-corpus.json`

The contradiction corpus is a machine-readable runtime test fixture. It is not, by itself, normative ontology law.
