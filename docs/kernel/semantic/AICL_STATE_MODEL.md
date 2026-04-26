# AICL State Model

**Status:** Formal specification
**Purpose:** Define the compilation state tuple, its components, and transitions

---

## 1. State Tuple

The AICL compilation state is defined as a 6-tuple:

```
S = ⟨ I, W, G, P, M, R ⟩
```

Where:

| Symbol | Name | Type | Description |
|---|---|---|---|
| `I` | Intent Contract | ICC | The root of trust; anchors all semantic resolution |
| `W` | WKG Grounding | WKGSnapshot | Pinned snapshot used for identifier resolution |
| `G` | Semantic Hypergraph | SHG | The intermediate compilation graph |
| `P` | Proof Obligations | ProofObligationSet | All obligations, classified by tier and stage |
| `M` | Materialization Targets | MaterializationPlan | Emitters and target language bindings |
| `R` | Residual Runtime Obligations | ResidualsManifest | Obligations that survive to runtime |

---

## 2. Component Specifications

### 2.1 I — Intent Contract (ICC)

The ICC is the root of trust. It is established before any other state component.

```
ICC ::= {
  version: String
  timestamp: ISO8601
  originator: "human" | "agent"
  goals: [GoalRef]                     -- references to StateAnchor or Metric WKG anchors
  non_goals: [GoalRef]                 -- explicitly excluded goals
  constraints: [ConstraintNode]        -- annotated with tier and mechanism
  risk_accepted: [ContradictionRecord] -- explicitly accepted compile-time contradictions
  wkg_snapshot_hash: Hash              -- pins W
  wkg_anchors: [WKGNodeRef]           -- enumerated anchors used in this compilation
  signature: CryptographicHash         -- integrity seal
  expires: ISO8601 | "never"
}
```

**Invariant:** Once sealed (signed), the ICC is immutable. Any change to goals, constraints, or snapshot requires a new ICC. Two compilations with the same ICC and same source text must produce identical S tuples.

---

### 2.2 W — WKG Grounding (WKGSnapshot)

The WKG snapshot is the semantic ground truth for this compilation pass. It is pinned by the ICC's `wkg_snapshot_hash`.

```
WKGSnapshot ::= {
  snapshot_id: SnapshotId
  wkg_snapshot_hash: Hash
  parent_wkg_snapshot_hash: Hash | null
  timestamp_ms: Integer
  purpose: String
  ontology_registry_ref: String
  anchors: {AnchorId → AnchorRecord}   -- the full visible anchor set at this snapshot
}
```

**Invariant:** All identifier lookups during a compilation pass use exactly the anchor set from `W.anchors`. No live WKG head is consulted during compilation.

---

### 2.3 G — Semantic Hypergraph (SHG)

The SHG is the intermediate representation produced after intent extraction and WKG grounding. It encodes the full semantic structure of the program: entities, transitions, constraints, proof gates, and agent coordination.

```
SHG ::= {
  nodes: [SHGNode]
  hyperedges: [SHGHyperedge]
  constraints: [NormalizedConstraintNode]
  proof_gates: [ProofGateNode]
  contradiction_log: [ContradictionRecord]
}
```

**Reference:** The internal schema of SHG nodes and hyperedges is defined by the Kernel v0.1.1 contract document [`../SHG_SCHEMA.md`](../SHG_SCHEMA.md). This document defines the SHG as a named component of the state tuple and specifies its role in compilation state transitions.

**Role of G:**
- Receives normalized constraints from kernel compilation
- Encodes branching, parallelism, and adaptation structure
- Is the input to all materializers
- Records all detected contradictions before materialization

---

### 2.4 P — Proof Obligations (ProofObligationSet)

The proof obligation set is derived from the goals, policies, and constraints in `I` after grounding in `W`.

```
ProofObligationSet ::= {
  tier1: [ProofObligation]             -- must be discharged at compile time
  tier2: [ProofObligation]             -- discharged at compile time if model available, else residual
  tier3: [ProofObligation]             -- advisory; carried as annotations
  discharged: [DischargedObligation]   -- obligations proven during this compilation pass
  failed: [FailedObligation]           -- obligations that produced compile errors
}
```

**Invariant:** No obligation in `tier1` may move to the residual manifest `R` without explicit ICC `risk_accepted` entry.

---

### 2.5 M — Materialization Plan

The materialization plan specifies which target emitters are active for this compilation and what mapping rules apply.

```
MaterializationPlan ::= {
  targets: [MaterializationTarget]
  mapping_rules: [MappingRule]         -- how SHG constructs map to target language constructs
}

MaterializationTarget ::= {
  language: TargetLanguage             -- Python | TypeScript | Kotlin | Swift | SQL | etc.
  platform: TargetPlatform             -- e.g., Web.Vercel | Android.Compose | Windows.WinUI
  emitter_ref: WKGAnchorRef            -- the emitter implementation
}
```

**Note:** The internal semantics of materializers (how an SHG fragment maps to a specific language construct) is not yet fully specified. This is noted as open work in the Consistency Report.

---

### 2.6 R — Residual Runtime Obligations (ResidualsManifest)

The residuals manifest is the output of the compile/runtime boundary analysis. It enumerates every obligation that was not discharged at compile time and must be enforced at runtime.

```
ResidualsManifest ::= {
  monitors: [RuntimeMonitor]           -- active at runtime
  repair_protocols: [RepairProtocol]   -- registered for maintain invariants
  circuit_breakers: [CircuitBreaker]   -- activated on unrecoverable violation
  expiry: ISO8601 | "never"            -- when this manifest becomes invalid
}

RuntimeMonitor ::= {
  obligation_id: ObligationId          -- back-reference to P
  property: SemanticPropertyExpr       -- what is being monitored
  tier: 2 | 3                          -- runtime monitors are never Tier 1
  trigger_action: TriggerAction
  escalation: EscalationPath
}
```

---

## 3. State Transitions

### 3.1 Transition: ∅ → S₀ (Initialization)

Trigger: A new compilation brief is submitted.

```
S₀ = ⟨ I₀, W₀, G₀, P₀, M₀, R₀ ⟩
```

Where:
- `I₀` = newly constructed ICC (goals, non-goals, constraints declared; not yet sealed)
- `W₀` = WKGSnapshot identified by `I₀.wkg_snapshot_hash`
- `G₀` = empty SHG
- `P₀` = empty proof obligation set
- `M₀` = declared target pack
- `R₀` = empty residuals

---

### 3.2 Transition: S₀ → S₁ (WKG Grounding)

Trigger: All identifiers in `I₀` are resolved against `W₀`.

```
S₁ = ⟨ I₁, W₀, G₀, P₁, M₀, R₀ ⟩
```

Changes:
- `I₁` = `I₀` with all identifiers resolved to WKG anchor refs (or compile error)
- `P₁` = initial proof obligations derived from `I₁.goals` and `I₁.constraints`

**Guard:** If any identifier in `I₀` cannot be resolved in `W₀`, the transition fails with a compile error. No further transitions proceed.

---

### 3.3 Transition: S₁ → S₂ (SHG Construction)

Trigger: Kernel compiles `I₁` into semantic graph structure.

```
S₂ = ⟨ I₁, W₀, G₁, P₁, M₀, R₀ ⟩
```

Changes:
- `G₁` = populated SHG encoding goals, constraints, capabilities, agent coordination, and flow structure
- Contradiction detection runs during this transition; all detected contradictions are logged in `G₁.contradiction_log`

**Guard:** If an unresolvable contradiction is detected and not in `I₁.risk_accepted`, the transition fails with a compile error.

---

### 3.4 Transition: S₂ → S₃ (Proof Classification and Discharge)

Trigger: Proof obligations in `P₁` are classified by tier and evaluated where possible.

```
S₃ = ⟨ I₁, W₀, G₁, P₂, M₀, R₁ ⟩
```

Changes:
- `P₂` = `P₁` with obligations moved to `discharged`, `failed`, or retained as residuals
- `R₁` = all obligations that could not be discharged at compile time (Tier 2 without model, or Tier 2 model not yet available)

**Guard:** If any Tier 1 obligation remains undischarged after this transition, the compilation fails unless `risk_accepted` in ICC.

---

### 3.5 Transition: S₃ → S₄ (Materialization)

Trigger: The SHG `G₁` is emitted to all declared target languages in `M₀`.

```
S₄ = ⟨ I₁, W₀, G₁, P₂, M₁, R₁ ⟩
```

Changes:
- `M₁` = materialization plan with emitted artifacts annotated
- The residuals manifest `R₁` is attached to the emitted artifact

**Guard:** Materialization may not proceed if any Tier 1 obligation is in `failed` state.

---

### 3.6 Runtime Transition: S₄ → S₄ᵣ (Runtime Evolution)

After deployment, the runtime state evolves within the envelope established by `R₁`.

Runtime events:
- `StateObservation` records committed to WKG (must carry `evidence_refs`)
- Runtime monitors in `R₁` evaluate observations against residual obligations
- Violations trigger repair protocols or circuit breakers
- WKG delta-log mutations are validated against active policies

**Hard constraint:** No runtime mutation may re-enter the compile-time proof path. Runtime violations trigger repair or halt; they do not trigger re-compilation automatically.

---

## 4. State Integrity Invariants

1. `I.wkg_snapshot_hash = W.snapshot_id` — the ICC and snapshot are always bound
2. `P.tier1 ∩ P.failed = ∅ → artifact producible` — no failed Tier 1 obligations in a valid artifact
3. `R.monitors ⊇ {o ∈ P.tier2 | o not discharged at compile time}` — all undischarged Tier 2 obligations become monitors
4. `M.targets ≠ ∅` — a compilable program must have at least one materialization target
5. Once `I` is sealed, no modification to goals or constraints is possible without creating a new ICC (new compilation pass)
