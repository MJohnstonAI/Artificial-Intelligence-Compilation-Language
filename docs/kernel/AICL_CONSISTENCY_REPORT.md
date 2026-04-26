# AICL Consistency Report

**Status:** Formal analysis
**Scope:** Findings across `spec/programming-reference-manual.md` (v0.3), `wkg/core/aicl-core-ontology-spec.md` (v1.2), `commentary/claude/latest-review.md`, and Project Knowledge document
**Classification:** Critical / Moderate / Minor

---

## Summary

The AICL repository has a coherent core design that is largely self-consistent between the PRM and the WKG ontology spec. The primary gaps are in entities that are referenced but not defined (`HAIG`, `PACT`, `SHG internals`) and in the boundary semantics for certain edge cases (`maintain` downgrade, Tier 2 failure modes). These are tractable specification gaps, not fundamental design contradictions.

---

## Critical Issues

### C-1: SHG Internal Structure Undefined

**Location:** PRM §3.2, README, Project Knowledge §8
**Description:** The Semantic Hypergraph (SHG) is named as the primary intermediate representation and is central to the compilation pipeline. However, no document in the fetched sources defines the internal schema of SHG nodes or hyperedges. The SHG layer is described by properties it must support (branching, parallelism, optimization, adaptation, agent coordination) but not by structure.
**Impact:** Without an SHG schema, Stage 3 (SHG Construction) in the operational semantics cannot be fully implemented. Any materializer that consumes the SHG has no stable interface.
**Resolution required:** Define `SHGNode`, `SHGHyperedge`, and the mapping from kernel entities (Goal, Agent, Flow, etc.) to SHG graph elements.

---

### C-2: HAIG Undefined

**Location:** PRM §11.2, §12.1; AICL_KERNEL_v0.1 §3.2
**Description:** HAIG is referenced as the escalation target for equal-priority policy conflicts and as a routing destination in flow algebra (`escalate_to_haig`). It appears to be a Human-AI Integration Gate or similar arbitration mechanism. However, no document defines HAIG's decision procedure, its authority scope, its inputs, outputs, or its interaction with the compilation process.
**Impact:** The contradiction resolution path for equal-priority policy conflicts has a formal hole. When compilation escalates to HAIG, the semantics of what happens next are undefined. This means the `ontology_conflict_policy` in PRM §11.2 has a dangling reference.
**Resolution required:** Define HAIG as a first-class AICL construct: its role (arbiter), its decision inputs (conflicting policy records, context, ICC), its outputs (resolution record to be added to ICC `risk_accepted` or to the conflict policy), and its authority limits.

---

### C-3: Tier 2 Failure Under Missing Model Not Fully Specified

**Location:** PRM §8.2, §8.4
**Description:** The PRM defines Tier 2 constraints with a `model` field and states these are "runtime models or empirical validation." However, the exact behavior when the model is absent at compile time, returns insufficient confidence, or references a model version not in the WKG snapshot is not fully enumerated.
**Impact:** The compile/runtime boundary for Tier 2 obligations is ambiguous in these edge cases, potentially leading to undetected residuals.
**Resolution required:** The PROOF_TIER_SEMANTICS document (this kernel package) provides the initial resolution. It should be ratified and merged into the PRM and WKG spec.

---

## Moderate Issues

### M-1: PACT Undefined

**Location:** PRM §13.1 (agent coordination field)
**Description:** Every agent declaration includes `coordination: PACT`. PACT is not defined anywhere in the fetched sources. It is unclear whether PACT is a protocol for inter-agent communication, a trust model, a commitment protocol (analogous to formal commitment protocols in multi-agent systems), or something else.
**Impact:** Agent coordination semantics are incomplete. The SHG cannot encode agent coordination edges without knowing what PACT means.
**Resolution required:** Define PACT (or reference an existing protocol) with its message types, commitment semantics, and failure modes.

---

### M-2: maintain Downgrade Path Ambiguous

**Location:** PRM §7.2; COMPILE_RUNTIME_BOUNDARY.md §6 (this kernel package)
**Description:** The PRM states that `maintain P` carries both compile-time and runtime semantics. However, it is not explicit about what happens when the compile-time invariant proof fails. Is `maintain P` with a failed compile-time proof a hard compile error? Or does it downgrade to a Tier 2 runtime obligation?
**Impact:** Inconsistent handling would allow programs with unproven invariants to compile silently.
**Resolution in this kernel:** The COMPILE_RUNTIME_BOUNDARY document specifies that a failed compile-time `maintain P` proof is a compile error for Tier 1 declarations, and that the runtime monitor is always installed as defense-in-depth (NOT as a downgrade of the compile-time obligation). This should be ratified in the PRM.

---

### M-3: Materializer Interface Not Specified

**Location:** PRM §3.3, §19; README
**Description:** Materialization targets are listed (Web.Vercel, Android.Compose, Windows.WinUI, Python, TypeScript, etc.) and the concept of `targetpack` import is defined. However, the interface between the SHG and a materializer is not specified. It is unclear what operations a materializer must implement, what it receives (SHG fragment? full SHG?), and what guarantees it must satisfy.
**Impact:** The AICL materialization layer cannot be implemented, extended, or verified without this interface.
**Resolution required:** Define a `Materializer` interface contract, specifying: inputs (SHG + ROM + ICC), outputs (artifact + provenance record), and correctness obligations (what the materializer must preserve from the SHG).

---

### M-4: declassify Operation Missing

**Location:** PRM §9.3 (IFC section)
**Description:** The IFC model defines label propagation (labels are additive; labeled values cannot cross unattested boundaries). However, there is no `declassify` operation defined. In any IFC system, there must be a mechanism to explicitly lower the sensitivity of a labeled value (under human approval or policy-bounded conditions), otherwise the label system becomes unworkable for real programs.
**Impact:** The IFC system as specified is complete for detection but has no safe release mechanism. This would make many legitimate programs impossible to express.
**Resolution required:** Define `declassify(value, from_labels, to_labels, approval: PolicyRef | HumanApproval)` with rules for when declassification is permitted.

---

### M-5: WKG Snapshot Governance Underspecified

**Location:** OntSpec §6.2–6.3
**Description:** The delta-log and snapshot governance model is defined in outline but the governance process for snapshot upgrades within a CI/CD pipeline is not specified. It is unclear who may approve a snapshot upgrade, under what conditions, and how ICC re-binding works after an upgrade.
**Impact:** In practice, teams upgrading their WKG snapshot would have no formal process to follow, potentially leading to ad hoc procedures that undermine the reproducibility guarantee.
**Resolution required:** Define a snapshot upgrade protocol: `approve_snapshot_upgrade(old_hash, new_hash, approver, diff_summary)` with the ICC re-binding rules.

---

## Minor Issues

### N-1: `repair_protocol` Syntax Not Integrated with Flow Algebra

**Location:** PRM §7.2
**Description:** The `repair_protocol` block is introduced for `maintain` invariants but its formal relationship to the flow algebra is not stated. Is a `repair_protocol` a named `Flow` fragment? Is it compiled into the SHG? Can a `repair_protocol` reference agents?
**Resolution:** The COMPILE_RUNTIME_BOUNDARY document (this kernel) specifies repair protocols as part of the ROM. The repair steps (`suspend_affected_capability`, `attempt_preproven_alternate`, etc.) should be formalized as a sub-algebra of the flow algebra.

---

### N-2: `non_goals` Semantics Not Specified

**Location:** PRM §17 (ICC schema); PRM §18 (example does not include non_goals)
**Description:** The ICC schema includes a `non_goals` field. The semantics of a non-goal — what it constrains, how it interacts with goals, whether it generates `avoid` obligations automatically — are not defined.
**Resolution required:** Define `non_goals` as a source of `AvoidGoal` declarations: `∀ ng ∈ ICC.non_goals: derive AvoidGoal(ng)`.

---

### N-3: `expires` on ICC Semantics Undefined

**Location:** PRM §17
**Description:** The ICC schema includes `expires: ISO8601 | "never"`. What happens when an ICC expires? Can an expired ICC artifact be deployed? Does expiry invalidate the WKG snapshot binding?
**Resolution required:** Define ICC expiry semantics: at minimum, an expired ICC should produce a deployment warning and may block deployment depending on runtime governance policy.

---

### N-4: `SkillContract` sandbox / `deny_all` Not Formalized

**Location:** PRM §14.4
**Description:** The `SkillContract` sandbox block uses `deny_all` for secrets. The sandbox model (filesystem restrictions, network allow-lists, secret denial) is described by example but not formally defined as a policy mechanism.
**Resolution:** The sandbox block should be specified as a set of `Capability` restriction policies applied to the skill's execution environment. `deny_all` for secrets should expand to a `Policy` that prevents all `Secrets.*` capability effects.

---

## Undefined Concepts (Requiring New Specification Work)

The following concepts are referenced in the repository but lack any formal definition in the fetched sources:

| Concept | Referenced in | Needed for |
|---|---|---|
| `HAIG` | PRM §11.2, §12.1 | Contradiction resolution, human escalation |
| `PACT` | PRM §13.1 | Agent coordination semantics |
| `AICL-SHG-TENSOR` | PRM §2.2 | Machine-native graph format |
| `SHG` internals | PRM §3.2 | All pipeline stages after grounding |
| `Materializer` interface | PRM §3.3 | Emitter implementation |
| `declassify` | (implicit in IFC) | IFC label release |

---

## Areas of Solid Consistency

The following areas are well-defined and consistent across sources:

- The nine WKG anchor types and their kernel type class mappings
- The `StateAnchor` / `StateObservation` split (compile-time vs runtime)
- The ICC schema and its role as root of trust
- The snapshot pinning and reproducibility principle
- The three proof tiers (mechanism-based, not rhetorical)
- The IFC label flow model for policy-sensitive data
- The contradiction detection surfaces (χ_{G,P}, χ_{C,R}, χ_{P,P})
- The compile-time vs runtime split for contradiction defense
- The evidence trust class model (A/B/C/D)
- The admissibility matrix for WKG mutations
- The `budget {}` syntax and resource bound model

---

## === AICL KERNEL v0.1 FORMALIZATION COMPLETE ===
