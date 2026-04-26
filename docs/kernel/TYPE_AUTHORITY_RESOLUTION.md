# AICL Type Authority Resolution

**Status:** Formal specification
**Purpose:** Define the single semantic type authority chain and eliminate dual type systems

---

## 1. The Single Authority Principle

AICL has exactly one source of semantic identity: the **World Knowledge Graph (WKG)**, accessed through a pinned **WKGSnapshot** bound to the active ICC.

There is no secondary type system. There are no locally valid types that exist independently of WKG grounding. Kernel type classes are **compiler-facing category labels** over WKG anchors — they are not a separate type hierarchy.

This eliminates the dual type system problem: previously, the existence of both "kernel type classes" and "WKG anchor types" created the appearance of two parallel systems. They are the same system at two different views:

- WKG anchor = the semantic identity record (in the knowledge graph)
- Kernel type class = the compiler-facing category label for that anchor

---

## 2. Resolution Pipeline

Every identifier in an AICL program must traverse this pipeline to acquire semantic meaning:

```
Step 1: Identifier (syntactic token in source text)
           |
           v
Step 2: WKG.lookup(identifier, snapshot_hash)
           |
           | IF found:
           v
Step 3: WKG Anchor Record (one of: Goal, StateAnchor, Policy, Capability,
        Metric, Entity, Resource, Environment, Evidence)
           |
           v
Step 4: Kernel Type Class assignment
        (compiler-facing label derived from anchor record type)
           |
           v
Step 5: Obligation derivation
        (what proof obligations this entity generates)
           |
           v
Step 6: Materialization target mapping
        (how this entity is emitted in a target language)
```

**Failure modes at Step 2:**
- Identifier not found in snapshot → hard **compile error**
- Identifier found but in a different snapshot version → **compile error** unless snapshot upgrade is explicitly declared
- Identifier resolves ambiguously (two anchors with equal specificity) → **compile error**, must be disambiguated with namespace qualifier

---

## 3. Kernel Type Class Map

The following table defines the complete mapping from WKG anchor types to kernel type classes:

| WKG Anchor Type | Kernel Type Class | Valid in declaration position |
|---|---|---|
| `Goal` | `Intent` | `goal`, `achieve`, `maintain`, `avoid`, `optimize` |
| `StateAnchor` | `State` | `state`, `goal`, `maintain`, `avoid` targets |
| `Policy` | `Policy` | `requires_policy`, `policy` declaration |
| `Capability` | `Capability` | `capability` declaration, agent `capabilities` list |
| `Metric` | `Metric` | `optimize`, `budget`, `constrain` metric fields |
| `Entity` | `Entity` | domain object references |
| `Resource` | `Resource` | `budget` resource dimensions, capability `consumes` |
| `Environment` | `Environment` | `app` scope, policy `scope`, capability `executed_in` |
| `Evidence` | `Evidence` | StateObservation `evidence_refs` (runtime only) |

---

## 4. User-Defined Declarations and WKG Registration

User-defined `state` and `metric` declarations create new WKG anchor records at compile time.

```
state RefundProcessed {
  wkg_anchor: "Commerce.Refund.Completion.v2"
  preconditions: [RefundRequested, AuthorisedByPolicy]
}
```

This declaration:
1. Creates a `StateAnchor` record in the active WKG snapshot (or validates that `Commerce.Refund.Completion.v2` already exists)
2. Registers `RefundProcessed` as a local alias for that anchor within this compilation scope
3. Assigns the identifier to kernel type class `State`
4. Resolves `preconditions` through the same pipeline (they must already be valid `StateAnchorRef` items)

A user-defined declaration that conflicts with an existing WKG anchor at the same path is a compile error unless the version suffix is distinct.

---

## 5. The IFC Layer

Information Flow Control (IFC) operates as a label system layered over the type resolution pipeline. It does not create a separate type system — it annotates resolved types with policy-derived flow labels.

```
value: CustomerRecord [label: {pii, za}]
```

The label `{pii, za}` is not a type; it is a flow policy annotation derived from the active policies (`POPIA_ZA`, `GDPR`). The compiler propagates labels forward through flow operations and verifies at `OpaqueIntent` boundaries that no labeled value enters a boundary without matching `policy_attestation`.

IFC label propagation rules:
- Labels are additive: if a computation combines inputs with labels `{A}` and `{B}`, the output carries `{A, B}`
- Labels are not dropped by the compiler without an explicit `declassify` operation (not yet specified in PRM; noted as open work)
- An `OpaqueIntent` boundary requires: `output.policy_attestation ⊇ input.labels`

---

## 6. Snapshot Pinning and Reproducibility

The type resolution pipeline is only deterministic when bound to a pinned snapshot. This is why:

```
ICC.wkg_snapshot_hash → WKGSnapshot → {all anchor records valid at that hash}
```

Any re-compilation using a different snapshot may produce different type resolutions. This is intentional: semantic drift in the WKG is controlled and audited, not silently absorbed.

Consequences:
- Two ICCs with different `wkg_snapshot_hash` values may classify the same identifier differently
- This is not a bug; it is the mechanism by which WKG evolution is tracked
- CI/CD pipelines must pin to a known snapshot and explicitly approve snapshot upgrades

---

## 7. Elimination of Dual Type Systems

Prior confusion arose from treating "kernel types" and "WKG types" as parallel. This document resolves that:

| Apparent dual | Correct interpretation |
|---|---|
| "kernel type class `State`" vs "WKG `StateAnchor`" | Same thing at two layers: `StateAnchor` is the WKG record; `State` is the compiler label for it |
| "kernel type class `Policy`" vs "WKG `Policy` anchor" | Same resolution: `Policy` WKG anchor → `Policy` kernel label |
| "local type declaration" vs "WKG type" | Local declarations are registered into the WKG snapshot before use; there are no floating local types |
| "effect labels as a type system" | Effect labels are compiler handles over WKG `Capability` anchors; they are not a separate type hierarchy |

The result: there is exactly one type system. It lives in the WKG. The kernel's type class vocabulary is a fixed projection over that system, not a competing one.
