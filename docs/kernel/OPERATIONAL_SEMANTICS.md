# AICL Operational Semantics

**Status:** Formal specification
**Purpose:** Define the full compilation pipeline as a sequence of named stages with inputs, outputs, and guards

---

## 1. Pipeline Overview

```
Brief (natural language or structured intent)
    |
    v
[Stage 1] Intent Extraction
    |
    v
ICC (Intent Clarity Certificate) — sealed, hash-bound
    |
    v
[Stage 2] WKG Grounding
    |
    v
Grounded ICC (all identifiers resolved to WKG anchors)
    |
    v
[Stage 3] SHG Construction
    |
    v
SHG (Semantic Hypergraph) — normalized, contradiction-checked
    |
    v
[Stage 4] Proof Obligation Classification
    |
    v
Proof Obligation Set (Tier 1 / 2 / 3, discharged / residual / failed)
    |
    v
[Stage 5] Proof Discharge (compile-time)
    |
    v
Discharged Obligations + Residual Obligation Manifest (ROM)
    |
    v
[Stage 6] Materialization
    |
    v
Target Artifacts (Python / TypeScript / SQL / etc.) + Attached ROM
    |
    v
[Stage 7] Runtime Monitoring and Repair
    |
    v
Runtime State Evolution (WKG delta-log + monitors + repair)
```

---

## 2. Stage Definitions

### Stage 1 — Intent Extraction

**Input:** A human-authored brief, an AI-generated specification, or a structured AICL-Text source file.

**Process:**
1. Extract declared goals, non-goals, and constraints from the input
2. Identify explicitly declared capabilities, policies, agents, and flows
3. Construct a draft ICC (unsigned)
4. Record originator type (`human` | `agent`)
5. Identify target WKG snapshot (from import or declaration)
6. Seal and sign the ICC

**Output:** A sealed ICC `I` with `wkg_snapshot_hash`, goals, non-goals, constraints, and originator recorded.

**Guards:**
- If no goals are declared, Stage 1 produces a compile warning and a minimal ICC. This is valid for library/module artifacts but not for top-level programs.
- If the WKG snapshot cannot be resolved, Stage 1 fails with an error.

**Formal notation:**
```
Stage1(brief, snapshot_ref) → ICC | CompileError
```

---

### Stage 2 — WKG Grounding

**Input:** Sealed ICC `I`, pinned WKGSnapshot `W` (identified by `I.wkg_snapshot_hash`).

**Process:**
1. For every identifier in `I.goals`, `I.constraints`, `I.capabilities`, `I.policies`:
   - Execute `WKG.lookup(identifier, W)`
   - If found: record the WKG anchor ref and derive kernel type class
   - If not found: compile error
2. Verify that all type class assignments are consistent with their declaration positions (see TYPE_AUTHORITY_RESOLUTION.md §3)
3. Register any user-defined `state` or `metric` declarations as new WKG anchor records in `W` (snapshot fork or inline, depending on governance mode)
4. Produce grounded ICC `I'` with all identifier refs replaced by WKG anchor refs

**Output:** Grounded ICC `I'` with full anchor resolution.

**Guards:**
- Unresolvable identifier → hard compile error
- Type class mismatch at declaration position → compile error
- User-defined declaration conflicts with existing WKG anchor at same path → compile error (version suffix required)

**Formal notation:**
```
Stage2(I, W) → I' | CompileError
```

---

### Stage 3 — SHG Construction

**Input:** Grounded ICC `I'`, WKGSnapshot `W`.

**Process:**
1. Normalize all constraints to `(subject, predicate, bound, scope, priority)` form
2. Construct hypergraph nodes for each semantic entity (goals, states, agents, flows)
3. Construct hyperedges for each relationship (capability → effect, policy → constraint, flow → agent, agent → goal)
4. Encode flow algebra (Seq, Par, ProofGate, CondRoute) as graph structure
5. Run contradiction detection:
   - `χ_{G,P}`: test each goal against each active policy for static incompatibility
   - `χ_{C,R}`: test each capability's resource consumption against declared budgets (Tier 1 bounds only)
   - `χ_{P,P}`: test all policy pairs for predicate-level conflicts
6. For each detected contradiction:
   - If in `I'.risk_accepted`: log and continue
   - If equal-priority policy conflict: escalate to HAIG
   - If unresolvable: compile error

**Output:** SHG `G` with nodes, hyperedges, normalized constraints, and contradiction log.

**Guards:**
- Unresolvable contradiction not in `risk_accepted` → compile error
- Equal-priority policy conflict without HAIG resolution → compilation suspended pending HAIG decision

**Formal notation:**
```
Stage3(I', W) → SHG | CompileError | HaigEscalation
```

---

### Stage 4 — Proof Obligation Classification

**Input:** SHG `G`, grounded ICC `I'`.

**Process:**
1. For each constraint and goal in `G`, derive the corresponding proof obligation
2. Classify each obligation by tier and mechanism (using annotation if present; derive if absent)
3. For obligations without explicit tier annotation: attempt to classify as Tier 1 by testing the mechanism. If decidable, Tier 1. If not, compile error requiring explicit tier annotation.
4. Verify tier interaction matrix (see PROOF_TIER_SEMANTICS.md §5): no Tier 3 evidence satisfying Tier 1 slots, etc.
5. Output the classified `ProofObligationSet P`

**Output:** `ProofObligationSet P` with all obligations classified.

**Guards:**
- Obligation without tier annotation and non-decidable mechanism → compile error requiring annotation
- Tier interaction violation → compile error

**Formal notation:**
```
Stage4(G, I') → ProofObligationSet | CompileError
```

---

### Stage 5 — Proof Discharge (Compile-Time)

**Input:** `ProofObligationSet P`, SHG `G`, WKGSnapshot `W`.

**Process:**
1. Attempt to discharge all Tier 1 obligations using the compiler's static analysis engine
2. For each Tier 1 obligation:
   - If discharged: move to `P.discharged`
   - If refuted: move to `P.failed` → compile error
   - If undecidable: compile error (should have been caught in Stage 4)
3. Attempt to discharge Tier 2 obligations where model is available in `W`:
   - If model available and confidence meets bound: move to `P.discharged`
   - If model available but confidence insufficient: move to residual manifest `R` as monitor
   - If model not available: move to residual manifest `R` as monitor
4. Move all Tier 3 obligations to `P.tier3` as advisory annotations
5. Construct Residual Obligation Manifest `R`

**Output:** Final `ProofObligationSet P` + Residual Obligation Manifest `R`.

**Guards:**
- Any undischarged Tier 1 obligation without `risk_accepted` entry → compile error
- Residual manifest `R` must enumerate all undischarged Tier 2 obligations (none may be silently dropped)

**Formal notation:**
```
Stage5(P, G, W) → (P', R) | CompileError
```

---

### Stage 6 — Materialization

**Input:** SHG `G`, Materialization Plan `M`, Residual Manifest `R`.

**Process:**
1. For each declared materialization target in `M`:
   - Invoke the target emitter on the SHG
   - Emit target language artifact (Python module, TypeScript file, SQL schema, etc.)
   - Attach the Residual Obligation Manifest `R` to the artifact (as metadata, sidecar file, or embedded)
   - Emit provenance record linking: ICC hash → SHG hash → artifact hash
2. Validate emitted artifacts against any Tier 1 structural checks applicable to the target language

**Output:** Target artifacts, each with attached ROM and provenance chain.

**Guards:**
- No artifact may be produced if `P.failed ≠ ∅`
- Each artifact must embed the ICC hash in its provenance record (ensures traceability)

**Formal notation:**
```
Stage6(G, M, R) → [Artifact] | CompileError
```

---

### Stage 7 — Runtime Monitoring and Repair

**Input:** Deployed artifact, Residual Obligation Manifest `R`, WKG delta-log access.

**Process (continuous):**
1. Runtime monitors in `R` evaluate incoming `StateObservation` records against residual obligations
2. For each `maintain P` obligation with a runtime monitor:
   - Continuously evaluate `P` against observed state
   - On violation: execute the registered `repair_protocol` for `P`
3. Repair protocol execution order:
   1. Suspend affected capability or flow path
   2. Attempt a pre-proven alternate path (if one exists in the SHG)
   3. If no alternate: circuit-break and escalate (to HAIG or human reviewer)
   4. Log violation trace to WKG delta-log (must carry `evidence_refs`)
4. WKG delta-log mutations from the running system are validated against:
   - Active policy admissibility rules (OntSpec §3.3)
   - Resource capacity constraints
   - StateObservation evidence requirements

**Output:** Continuously maintained WKG delta-log; violation traces; escalation records.

**Hard Constraint:** Runtime repair does not re-enter the compile-time proof path. A runtime violation is handled within the residuals envelope. A violation that cannot be handled by any registered repair protocol triggers circuit-break + human escalation, NOT re-compilation.

**Formal notation:**
```
Stage7(R, WKGDeltaLog, Events) → UpdatedWKGState | CircuitBreak | HumanEscalation
```

---

## 3. Error Classes

| Error code | Stage | Condition | Action |
|---|---|---|---|
| `E_IDENT_UNRESOLVED` | 2 | Identifier not in WKG snapshot | Compile error |
| `E_TYPE_MISMATCH` | 2 | Identifier resolves to wrong type class for its position | Compile error |
| `E_CONTRADICTION` | 3 | Unresolvable contradiction not in risk_accepted | Compile error |
| `E_PROOF_TIER_VIOLATION` | 4 | Tier interaction invariant broken | Compile error |
| `E_TIER1_UNDISCHARGED` | 5 | Tier 1 obligation not provable | Compile error |
| `E_NO_TARGET` | 6 | No materialization targets declared | Compile error |
| `E_RUNTIME_VIOLATION` | 7 | Residual monitor detects policy breach | Repair protocol or circuit-break |
| `W_GOAL_UNREACHABLE` | 3 | Goal has no reachable flow path | Compile warning |
| `W_TIER2_RESIDUAL` | 5 | Tier 2 obligation not dischargeable at compile time | Warning + residual monitor |
