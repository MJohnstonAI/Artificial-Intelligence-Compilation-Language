# AICL Extraction Report

**Phase:** 1 — Extraction
**Sources Consulted:**
- `spec/programming-reference-manual.md` (v0.3-reference) — primary technical baseline
- `wkg/core/aicl-core-ontology-spec.md` (v1.2) — WKG semantic substrate
- `commentary/claude/latest-review.md` — authoritative review findings
- `README.md` — repository structure and canonical document order
- Project Knowledge document (AICL Claude Project Knowledge)

---

## 3.1 Core Entities Identified

The following entities appear across the repository with varying degrees of formal definition:

| Entity | Source(s) | Formal Status |
|---|---|---|
| `Goal` | PRM §7.1, WKG §1.1, OntSpec §1.1.9 | Defined (WKG anchor + kernel type class) |
| `Policy` | PRM §10, WKG §1.1, OntSpec §1.1.6 | Defined (machine-checkable invariant) |
| `Capability` | PRM §9.1, WKG §1.1, OntSpec §1.1.7 | Defined (executable transition function) |
| `Constraint` | PRM §8, §11 | Partially defined; normalization form given |
| `ResourceBudget` | PRM §7.4, OntSpec §4.1 | Defined structurally; `budget {}` block |
| `Agent` | PRM §13 | Defined (declaration + autonomy model) |
| `Flow` | PRM §12 | Defined (algebra: seq, par, gate, branch) |
| `ProofObligation` | PRM §8, OntSpec §5 | Defined by tier; mechanism not fully operationalized |
| `ICC` | PRM §17 | Schema given; cryptographic binding defined |
| `SHG` | PRM §3.2, README | Named in layer model; internal structure not yet formally specified |
| `OpaqueIntent` | PRM §9.2 | Defined (trust-boundary wrapper for external tools) |
| `StateAnchor` | PRM §4, OntSpec §1.1.3 | Defined (compile-time state category declaration) |
| `StateObservation` | OntSpec §1.2 | Defined (runtime fact record over StateAnchor) |
| `Evidence` | OntSpec §1.1.4, §3.2 | Defined (trust-classed grounding records) |
| `Metric` | PRM §4.1, OntSpec §1.1.5 | Defined (computable evaluation function) |
| `Environment` | OntSpec §1.1.1 | Defined (boundary for entity/resource/policy interpretation) |
| `Entity` | OntSpec §1.1.2 | Defined (identifiable subject or object) |
| `Resource` | OntSpec §1.1.8, PRM §7.4 | Defined (quantifiable prerequisite) |
| `WKGSnapshot` | OntSpec §6.1 | Defined (pinned compilation snapshot) |
| `DeltaLog` | OntSpec §6.3 | Defined (append-only mutation log) |
| `Skill` / `SkillContract` | PRM §14 | Defined (reusable semantic workflow behavior) |
| `SkillPack` / `SkillRoute` | PRM §14.2–14.3 | Defined (composition and routing constructs) |
| `HAIG` | PRM §11.2, §12.1 | Referenced but not formally defined in fetched sources |
| `PACT` | PRM §13.1 | Referenced as agent coordination protocol; not formally defined |
| `Materializer` | PRM §3.3, Project Knowledge §8 | Named as output layer; internal semantics absent |

---

## 3.2 Definitions (Most Precise Available)

**Goal**
> A target state-anchor condition or metric optimization objective. (OntSpec §1.1.9)
> Accepts only identifiers resolving to kernel `State` category (backed by `StateAnchor` records) or `Metric`. (PRM §4.2)

**Policy**
> A machine-checkable invariant or bound over states, capabilities, or transitions. (OntSpec §1.1.6)
> Attached with `requires_policy`; constrains `StateAnchor`, `Capability`, or `Environment`. (PRM §10)

**Capability**
> An executable transition function bounded by resources and policies. (OntSpec §1.1.7)
> Effects labels must resolve through WKG `Capability` anchor. Not an independent type system. (PRM §9.1)

**Constraint**
> A bound on a metric, resource, or state property, annotated with tier, mechanism, and optional model reference. (PRM §8.4)
> Normalized form: `(subject, predicate, bound, scope, priority)`. (PRM §11.1)

**ResourceBudget**
> A named set of `(metric, bound)` pairs representing consumable limits per compilation scope. (PRM §7.4)
> Resources: `cost.usd_per_session`, `latency.p95_ms`, `memory.mb`, `battery.mw`, `carbon.gco2e`, etc.

**Agent**
> A named actor with a declared `goal`, a set of permitted `capabilities`, a coordination protocol, and a multi-dimensional `autonomy` profile. (PRM §13)
> Autonomy dimensions: `action`, `goal`, `resource`, `delegation`. (PRM §13.2)

**Flow**
> A directed computation graph over named agents or steps, supporting: sequencing (`->`), parallelism (`||`), proof gates (`[proof: ...]`), conditional routing (`[if ... : A | else: B]`). (PRM §12)

**ProofObligation**
> A compile-time or runtime requirement that a property holds, classified by proof tier (1/2/3) and bound to a specific mechanism. (PRM §8)

**ICC (Intent Clarity Certificate)**
> The root of trust for a compilation pass. Records: version, timestamp, originator, goals, non-goals, constraints, risk-accepted contradictions, `wkg_snapshot_hash`, WKG anchor refs, cryptographic signature, expiry. (PRM §17)

**SHG (Semantic Hypergraph)**
> The intermediate representation layer for planning, branching, parallelism, adaptation, optimization, and agent coordination. Internal structure not formally specified in fetched sources.

**OpaqueIntent**
> A wrapper for an external tool, API, or service at a trust boundary. Declares input/output types with IFC labels, effects, and `policy_attestation`. The compiler verifies the declared interface; it cannot verify internals. (PRM §9.2–9.3)

**StateAnchor**
> A compile-time semantic declaration of a state category. Produces compile-time records; does NOT require runtime evidence. (OntSpec §1.2)

**StateObservation**
> A runtime fact record over a `StateAnchor`. Requires `evidence_refs` resolving to valid `Evidence` records before WKG commit. (OntSpec §1.2, §3.1)

**WKGSnapshot**
> A pinned, immutable view of the WKG used for identifier resolution during a single compilation pass. Identified by `wkg_snapshot_hash`. (OntSpec §6.1)

---

## 3.3 Entity Relationships

| From | Relation | To | Stage |
|---|---|---|---|
| `Capability` | `depends_on` | `Entity`, `Resource`, `Capability` | runtime/SHG |
| `Policy` | `constrains` | `StateAnchor`, `Capability`, `Environment` | compile + runtime |
| `Capability` | `consumes` | `Resource` | runtime |
| `StateObservation` / `Capability` | `satisfies` | `Goal`, `Policy` | runtime |
| `StateObservation` / `Capability` | `violates` | `Policy` | runtime |
| `StateObservation` | `evidenced_by` | `Evidence` | runtime |
| `Capability` | `executed_in` | `Environment` | runtime |
| `ICC` | binds to | `WKGSnapshot` (via hash) | compile |
| `identifier` | resolves to | `WKG anchor` → kernel type class | compile |
| `Goal` | references | `StateAnchor` or `Metric` | compile |
| `Agent` | holds | `Capability[]` | compile |
| `Flow` | sequences | `Agent[]` + proof gates | compile/runtime |

---

## 3.4 Weak Points Identified

### Type Authority
- **W1 (Moderate):** The relation between "kernel type classes" and "WKG anchors" is stated but the mapping function is not formally defined. The resolution pipeline `Identifier → WKG.lookup → WKG anchor → kernel type class` lacks a formal specification of `lookup` semantics (e.g., what happens on partial match, version conflict, or snapshot miss).
- **W2 (Moderate):** `State` is listed as a compiler-facing category label for `StateAnchor` declarations AND as a type class in §4.1. The dual use is stated but the boundary between the two needs a formal distinction in the kernel.

### Proof Tiers
- **W3 (Critical):** Tier 2 (probabilistic) and Tier 3 (heuristic) obligations lack formal failure semantics. The constraint annotation syntax `[tier: 2, mechanism: probabilistic, model: ...]` is given but what happens when a Tier 2 constraint cannot be validated (missing model, model version mismatch) is not specified.
- **W4 (Critical):** No formal rule specifies what happens when a Tier 2 obligation is used to satisfy a Tier 1 obligation slot. The project knowledge says "Tier 3 must never satisfy Tier 1" but the Tier 2 case is ambiguous.

### Missing Operational Semantics
- **W5 (Critical):** `SHG` has no formal internal structure in the fetched sources. The layer model names it and lists properties (branching, parallelism, optimization, adaptation) but no node/edge/hyperedge schema is specified.
- **W6 (Moderate):** `HAIG` (referenced as conflict escalation target) is not defined anywhere in the fetched sources. It appears as a resolution arbiter but its decision procedure, inputs, outputs, and authority boundaries are absent.
- **W7 (Moderate):** `PACT` (agent coordination protocol) is named in agent declarations but has no specification in the fetched sources.
- **W8 (Minor):** `Materializer` targets are listed (Python, TypeScript, etc.) but the interface between the SHG layer and a materializer is not specified.

### Compile vs Runtime Confusion
- **W9 (Moderate):** `maintain P` is stated to carry both compile-time and runtime semantics (PRM §7.2). The compile-time obligation requires the compiler to prove no reachable state violates `P`; the runtime obligation installs monitoring hooks. The transition protocol between "compile-time proof failed → runtime residual" is not defined. Does a failed compile-time proof block compilation or downgrade to a runtime obligation?
- **W10 (Minor):** The `repair_protocol` block syntax is introduced for `maintain` but its formal relation to the flow algebra is not specified. Is it a flow fragment? A separate declaration? Is it compiled into the SHG?

---

## === EXTRACTION COMPLETE ===
