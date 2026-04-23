# Claude Review — Gemini WKG Work: Kernel-Integration Risk Assessment

**Reviewer:** Claude (Anthropic)  
**Scope:** Kernel-integration risks in `wkg/core/aicl-core-ontology-spec.md` and `wkg/core/schema.ts`  
**Round:** 1 (focused supplement)  
**Files reviewed:**
- `wkg/core/aicl-core-ontology-spec.md` (v1.1 draft)
- `wkg/core/schema.ts` (v1.0)

**What this review is not:** A full redesign of the WKG. The ontological structure, the nine pillars, the evidence grounding model, and the delta-log are all sound research directions. This review identifies only the points where the WKG work as written will create concrete integration problems at the kernel boundary.

---

## Risk 1 — Dual type authority (critical)

**What Gemini did:**  
The WKG defines `Goal`, `Policy`, `Capability`, `Metric`, `State` as WKG anchor types in `schema.ts`:

```typescript
type: "Entity" | "State" | "Goal" | "Metric" | "Policy" | "Capability" | "Resource" | "Environment" | "Evidence"
```

**The integration problem:**  
The kernel also defines these as its own type classes (from `spec/programming-reference-manual.md`, Section 4.1):

```
Entity — things that exist
State  — propositions that may become true
Intent — things that must be achieved/maintained/avoided
Metric — measurable optimization targets
Policy — machine-checkable obligations
Capability — allowed actions/effects
```

Two systems are now claiming type authority over the same identifiers. The original design intent is that the kernel *resolves* identifiers *through* the WKG — the WKG is the source of truth, not a competing definition. But as written, neither document specifies the resolution contract. A compiler implementer reading both will not know which to treat as canonical.

**Required resolution before implementation:**  
A single paragraph in each document explicitly stating the relationship:

> The kernel's type classes (`State`, `Goal`, `Policy`, `Capability`, `Metric`) are *compiler-facing* labels for the category of a WKG anchor. They are not independent type definitions. When the kernel encounters `goal CaseResolved`, it performs a WKG lookup for an anchor of type `"Goal"` with that identifier. The WKG anchor is the ground truth; the kernel type class is its category label.

Without this, the compiler has two competing type systems and no resolution rule.

---

## Risk 2 — The Grounding Axiom blocks compile-time state declarations (critical)

**What Gemini did:**  
Section 2 states:

> No `State` ($S$) can be added to the WKG without an array of `evidence_refs` mapping to valid `Evidence` ($Ev$) anchors.

This is enforced in `schema.ts`:

```typescript
export interface State extends Anchor {
  evidence_refs: ID[]; // Must be backed by Evidence
}
```

**The integration problem:**  
The kernel uses `state` declarations as *compile-time type declarations*, not as runtime state writes:

```aicl
state RefundProcessed {
  wkg_anchor: "Commerce.Refund.Completion.v2"
  preconditions: [RefundRequested, AuthorisedByPolicy]
}
```

This is a type declaration. It describes a category of system state. It has no runtime evidence at compile time — it cannot, because nothing has happened yet.

The Grounding Axiom applies to *runtime WKG state updates* (when a system observes that a state has been reached and writes that fact into the WKG). It does not and cannot apply to compile-time type declarations.

If the Grounding Axiom is applied to both, the compiler cannot declare any state type without fabricating evidence, which would poison the WKG.

**Required resolution:**  
The WKG spec must explicitly distinguish:

- **WKG anchor declarations** (compile-time): define a state *type* — no evidence required.
- **WKG state writes** (runtime): record that a state *has been reached* — evidence required.

The `schema.ts` `State` interface conflates both. A compile-time anchor declaration and a runtime state observation are different objects and need different schemas:

```typescript
// Compile-time: type declaration
export interface StateAnchor extends Anchor {
  type: "State";
  preconditions?: ID[];
  wkg_reference?: string;
}

// Runtime: observed state instance
export interface StateObservation {
  anchor_ref: ID; // references a StateAnchor
  snapshot: Record<string, unknown>;
  timestamp_ms: number;
  evidence_refs: ID[]; // required at runtime
}
```

---

## Risk 3 — Contradiction resolution conflicts with the kernel's escalation model (moderate)

**What Gemini did:**  
Section 4.2 defines three contradiction types. For Policy vs. Policy at equal priority:

> If $P_1$ and $P_2$ have equal priority, the WKG engine triggers a systemic halt (`Contradiction_Halt`) to prevent divergent state corruption.

**The integration problem:**  
The kernel's contradiction policy (from my Round 1 commentary, accepted into the programming reference manual, Section 11.2) defines:

```aicl
ontology_conflict_policy {
  same_tier: escalate_to_haig
  cross_tier: higher_precedence_wins
  unresolvable: compile_error
}
```

`escalate_to_haig` at compile time vs `Contradiction_Halt` at runtime are different behaviors, but both are triggered by the same underlying condition (equal-priority policy conflict).

The WKG version fires a runtime halt. The kernel version escalates at compile time. Neither is wrong — they apply at different pipeline stages. But because the two documents don't reference each other, an implementer will not know that these are meant to be complementary rather than competing.

**Required resolution:**  
A cross-reference note in each document clarifying the pipeline stage at which each mechanism fires:

- **Compile time** (kernel): equal-priority conflict detected during constraint normalization → `escalate_to_haig`, recorded in ICC as `ContradictionRecord`.
- **Runtime** (WKG): if a contradiction somehow reaches the WKG delta-log (e.g., via a runtime-imported policy update) → `Contradiction_Halt`.

The kernel's compile-time escalation is the primary defense. The WKG runtime halt is the last-resort backstop. Document this explicitly or both mechanisms will be re-implemented as competing systems.

---

## Risk 4 — `schema.ts` leaks implementation into the spec layer (moderate)

**What Gemini did:**  
Two fields in `schema.ts` use strings to represent what are implicitly executable artifacts:

```typescript
export interface Policy extends Anchor {
  predicate_signature: string; // Hash or URI of the boolean constraint function
}

export interface Capability extends Anchor {
  execution_signature: string; // Hash or URI of the execution logic
}
```

**The integration problem:**  
A `predicate_signature` as a string hash or URI implies that policy predicates are evaluated by fetching and executing external code at a URI, or by matching a hash against a known executable. This is a concrete implementation choice — specifically, it implies a content-addressed execution model (similar to IPFS or Sigstore).

The kernel does not currently commit to this execution model. The programming reference manual treats policies as declarative constraints that the compiler checks, not as executable code fetched at runtime. If the schema ships as-is, it will look normative to implementers and constrain the kernel's policy evaluation model before that model has been specified.

**Required resolution:**  
Mark `predicate_signature` and `execution_signature` as implementation-layer fields, not spec-layer ones. The spec-layer schema should use an abstract reference type:

```typescript
// Spec layer — abstract
export interface PolicyRef {
  policy_id: ID;
  // evaluation mechanism is compiler/runtime defined, not schema-specified
}

// Implementation layer — concrete (not in spec/)
export interface PolicyExecutable extends PolicyRef {
  predicate_signature: string; // content hash or URI — implementation choice
}
```

Alternatively, add a clear comment marking these fields as implementation placeholders, not normative schema. Without this, the first person to implement a compiler will hard-code against URIs and hashes, and that decision will be very difficult to reverse.

---

## Risk 5 — The delta-log's compile-time vs runtime boundary is undefined (moderate)

**What Gemini did:**  
Section 5 defines the WKG as an append-only Merkle-tree delta-log, with `DeltaLogEntry` including `parent_wkg_hash`. This is an excellent runtime governance model.

**The integration problem:**  
The compiler needs to resolve identifiers against a *versioned snapshot* of the WKG — a fixed, immutable view at a known hash. If the WKG is a live append-only log, the compiler needs a protocol for:

1. Taking a snapshot at the start of compilation.
2. Locking that snapshot for the duration of the compilation pass.
3. Recording the snapshot hash in the ICC (so the compiled artifact is tied to a specific WKG version).

None of this is specified. Without it, two compilation passes over the same AICL source could produce different output if the WKG was updated between them — breaking reproducibility, which is explicitly listed as a `SkillContract` guarantee (`reproducible_diff`).

The delta-log is a runtime mechanism. The compiler needs a snapshot protocol layered on top of it.

**Required resolution:**  
Add a `WKGSnapshot` concept to the WKG spec:

```typescript
export interface WKGSnapshot {
  snapshot_id: ID;
  wkg_hash: Hash;       // hash of the WKG state at snapshot time
  timestamp_ms: number;
  purpose: "compile" | "audit" | "deploy";
}
```

The compiler takes a snapshot before compilation begins, records `snapshot_id` in the ICC, and all identifier resolution during that compilation pass uses only the snapshot. The ICC then permanently links the compiled artifact to the WKG version it was compiled against — which is exactly the kind of provenance the ICC is meant to provide.

---

## Risk 6 — `Environment` has no kernel counterpart (low)

**What Gemini did:**  
`Environment` is defined as a first-class WKG anchor type:

```typescript
export interface Environment extends Anchor {
  type: "Environment";
  parent_env_id?: ID;
  active_policies: ID[];
  hosted_entities: ID[];
}
```

**The integration problem:**  
The kernel has no `environment` keyword. The closest concept is `app {}`, which is the top-level scoping construct. If `Environment` maps to `app {}`, this should be explicit. If it is a separate concept, the kernel needs an `environment` declaration or a way to reference WKG environment nodes.

The risk is not that `Environment` is wrong — it is likely necessary for multi-tenant or multi-deployment scenarios. The risk is that it will be implemented in the WKG layer before the kernel knows it exists, leading to a WKG concept with no kernel-visible surface.

**Required resolution:**  
A one-sentence note in the WKG spec and the kernel spec cross-referencing the relationship:

> `Environment` in the WKG corresponds to the `app {}` scope in the kernel. Each `app {}` declaration resolves to a WKG `Environment` anchor.  

Or, if the mapping is more complex (e.g., one `app {}` may target multiple deployment environments), document that explicitly and add an `environment` keyword to the kernel roadmap.

---

## Summary table

| Risk | Severity | Nature | Action required |
|---|---|---|---|
| Dual type authority | Critical | Architectural collision | Explicit resolution contract in both docs |
| Grounding Axiom blocks compile-time declarations | Critical | Impossible constraint at compile time | Separate `StateAnchor` from `StateObservation` in schema |
| Contradiction resolution model conflict | Moderate | Behavior divergence at different pipeline stages | Cross-reference note clarifying pipeline stage for each mechanism |
| `schema.ts` leaks implementation into spec layer | Moderate | Premature implementation commitment | Mark execution/predicate signatures as implementation-layer |
| Delta-log missing compile-time snapshot protocol | Moderate | Reproducibility break | Add `WKGSnapshot` concept; link snapshot hash into ICC |
| `Environment` unmapped at kernel level | Low | Missing cross-reference | One-sentence mapping note in both documents |

---

## What does not need to change

The nine-pillar ontological structure is sound and complementary to the kernel type classes — it just needs the resolution contract (Risk 1) to clarify the relationship.

The Merkle-tree delta-log governance model is the right architecture for WKG provenance — it just needs the snapshot protocol (Risk 5) layered on top for compile-time use.

The contradiction surface taxonomy (`χ_{G,P}`, `χ_{C,R}`, `χ_{P,P}`) is more detailed and precise than the kernel's current treatment and should be promoted into the kernel's contradiction detection section in the next spec pass.

The Resource conservation model and the `DeltaLogEntry` commit validation rules are strong and should be adopted as-is for the runtime layer.

---

**End of kernel-integration risk assessment.**  
No full redesign recommended. Six targeted fixes, two of which are critical and should be resolved before any compiler scaffolding begins.
