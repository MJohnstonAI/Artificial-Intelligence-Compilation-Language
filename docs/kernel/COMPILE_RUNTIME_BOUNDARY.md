# AICL Compile/Runtime Boundary

**Status:** Formal specification
**Purpose:** Define what belongs at compile time, what belongs at runtime, and the Residual Obligation Manifest

---

## 1. Boundary Principle

The compile/runtime boundary is not a performance optimization. It is a **correctness boundary**.

Properties that can be verified statically — without live system state, external API interaction, or model evaluation against real data — MUST be verified at compile time. Moving verifiable properties to runtime weakens the guarantee model without benefit.

Properties that inherently require live state — latency measurements, user behavior, external policy drift — CANNOT be verified at compile time and MUST be runtime obligations.

The boundary is determined by the proof tier and mechanism of each obligation (see PROOF_TIER_SEMANTICS.md).

---

## 2. Compile-Time Domain

The following property classes MUST be verified at compile time (Tier 1):

### 2.1 Policy Compatibility
All attached policies are checked for compatibility with all declared capabilities within the compilation scope.

- Input: `{P₁, P₂, ... Pₙ}` (active policies) × `{C₁, C₂, ... Cₘ}` (declared capabilities)
- Check: For each `(Pᵢ, Cⱼ)` pair, verify that `Cⱼ.effects` do not violate `Pᵢ.predicates`
- Failure: Compile error (not runtime warning)

### 2.2 Permission Minimality
No capability may be declared in an agent's capability list if it is not reachable from any flow path that agent participates in.

- Check: For each `Agent A`, verify that `∀ c ∈ A.capabilities: ∃ flow F such that A participates in F and F requires c`
- Failure: Compile warning (excess capability). May be elevated to error by strict compilation mode.

### 2.3 Static Constraints
All Tier 1 constraints with `mechanism: static_analysis` or `mechanism: type_checking` are evaluated during compilation.

Examples:
- `memory.mb <= 256` where aggregate static memory allocation is analyzable
- Type class assignments on all identifiers
- Schema compatibility between imported modules
- IFC label flow — verifying no labeled value crosses an unattested boundary

### 2.4 Capability Bounds
The set of effects produced by any capability must be fully covered by the declared effects list. An undeclared effect is a compile error.

### 2.5 Goal Reachability (structural)
The structural reachability check: given the declared flow graph and agents, can each declared goal state be reached? This is a graph reachability check, not a proof of correctness.

Note: This check proves reachability within the declared graph structure, not that the goal will be achieved at runtime. Runtime goal achievement depends on conditions that are inherently residual.

### 2.6 Contradiction Detection
All three contradiction surfaces (`χ_{G,P}`, `χ_{C,R}`, `χ_{P,P}`) are checked at compile time against the normalized constraint set.

---

## 3. Runtime Domain

The following property classes MUST be handled at runtime (cannot be statically proved):

### 3.1 Latency
Actual system latency depends on network conditions, load, external service performance, and hardware. No static analysis can prove a p95 latency bound in a live system.

- Compile-time: Tier 2 model evaluation may produce an estimate (residual monitor if not dischargeable)
- Runtime: actual p95 latency measurement, alerting on bound violation

### 3.2 Real-World Policy Drift
External policies (GDPR updates, regulatory changes, third-party API policy changes) cannot be imported and frozen forever. Runtime monitors must detect when a live policy diverges from the compile-time snapshot.

- Compile-time: policy compatibility with the pinned snapshot is proved
- Runtime: delta-log validation detects when a live mutation would violate an active policy

### 3.3 User State and Context
User identity, session state, preferences, and entitlements are runtime facts. They cannot be statically declared as `StateAnchor` conditions without actual observation.

- Compile-time: the state schema (StateAnchor declarations) is verified
- Runtime: StateObservation records capture actual user state with evidence_refs

### 3.4 External API Behavior
OpaqueIntent boundaries wrap external APIs. The compiler verifies the declared interface contract; it cannot verify that the external API will behave as declared at runtime.

- Compile-time: interface type and IFC label compatibility are proved
- Runtime: actual API responses are observed and must match the declared output schema

### 3.5 Model Uncertainty
Tier 2 obligations depend on statistical models. At runtime, actual observations may diverge from model predictions. Runtime monitors detect and report these divergences.

### 3.6 Accessibility in Real Environments
Rendering correctness, accessibility compliance (WCAG, etc.), and device-specific behavior cannot be statically proved in all target environments. These are residual runtime obligations.

---

## 4. Residual Obligation Manifest (ROM)

The ROM is the formal interface between the compile-time and runtime domains. Every obligation that cannot be discharged at compile time MUST appear in the ROM.

### ROM Schema

```
ResidualsManifest ::= {
  icc_hash: Hash                         -- back-reference to the generating ICC
  manifest_version: String
  produced_at: ISO8601
  monitors: [RuntimeMonitor]
  repair_protocols: [RepairProtocol]
  circuit_breakers: [CircuitBreaker]
}

RuntimeMonitor ::= {
  id: MonitorId
  obligation_id: ObligationId            -- links to the ProofObligation in P
  property: SemanticPropertyExpr         -- the condition being monitored
  tier: 2 | 3                            -- runtime monitors are never Tier 1
  evaluation_freq: Duration | "continuous" | "on_event"
  trigger_condition: ThresholdExpr       -- when to fire
  trigger_action: TriggerAction
  escalation_path: EscalationPath
}

TriggerAction ::=
  | log_violation
  | suspend_capability(CapabilityRef)
  | invoke_repair(RepairProtocolRef)
  | circuit_break(CircuitBreakerRef)
  | escalate_to_human

RepairProtocol ::= {
  id: RepairProtocolId
  target_property: SemanticPropertyExpr  -- the maintain invariant being protected
  steps: [RepairStep]                    -- ordered repair actions
  fallback: CircuitBreakerRef            -- if all steps fail
}

RepairStep ::=
  | suspend_affected_capability
  | attempt_preproven_alternate(FlowRef)
  | rollback_to_last_valid_state
  | escalate_to_haig
  | escalate_to_human

CircuitBreaker ::= {
  id: CircuitBreakerRef
  triggers_on: [ViolationCondition]
  action: halt_path | halt_system | notify_and_degrade
  notification_target: [EndpointRef]
}
```

### ROM Completeness Requirement

The ROM MUST enumerate:
1. All Tier 2 obligations not discharged at compile time
2. All `maintain` invariants and their associated repair protocols
3. All `avoid` goals that require runtime enforcement (i.e., cannot be statically proved absent)
4. All resource budget dimensions checked at Tier 2

The ROM MUST NOT include:
- Tier 1 obligations (these are compile-time; if undischarged, they are compile errors)
- Tier 3 advisory annotations (these are informational, not monitors)

### ROM Attachment

The ROM is attached to every compiled artifact. Without an attached ROM, a compiled artifact cannot be deployed — the runtime monitoring framework has no basis for operating.

---

## 5. Boundary Decision Procedure

To determine whether a given property belongs at compile time or runtime, apply this procedure:

```
Given property P with declared tier T and mechanism M:

IF T = 1 AND decision_procedure(P, ICC, WKGSnapshot) terminates:
    → Compile-time. Must be discharged or compile fails.

IF T = 1 AND decision_procedure(P, ICC, WKGSnapshot) does not terminate:
    → Compile error: reclassify the property.

IF T = 2 AND model available in WKGSnapshot at compile time:
    → Attempt compile-time discharge. If confidence meets bound: discharged.
      If not: residual runtime monitor in ROM.

IF T = 2 AND model NOT available at compile time:
    → Residual runtime monitor in ROM. Compile warning emitted.

IF T = 3:
    → Advisory annotation only. Never in ROM. Never blocking.
```

---

## 6. The maintain Boundary Case

`maintain P` is the primary source of boundary ambiguity. It is resolved as follows:

**Compile-time obligation of `maintain P`:**
The compiler must prove (Tier 1) that no reachable state in the declared SHG violates `P`. This is a static graph reachability and constraint satisfaction check.

- If proved: `maintain P` is a discharged Tier 1 obligation at compile time. A runtime monitor is STILL installed (defense in depth — the SHG may not perfectly model all runtime paths).
- If not provable: this is a compile error if `P` is declared as a Tier 1 property. The fix is to either strengthen the SHG structure (add missing constraints) or reclassify `P` as Tier 2 and provide a model.

**Runtime obligation of `maintain P`:**
A runtime monitor for `P` is ALWAYS installed, regardless of whether the compile-time proof succeeded. This is not redundancy — it is defense-in-depth for cases where the SHG abstraction leaks.

The compile-time proof says: "within the declared model, P always holds."
The runtime monitor says: "in the actual running system, P is continuously verified."

These are complementary, not competing.

**Failure of `maintain P` at runtime:**
The registered `repair_protocol` is invoked. If no repair is possible, the circuit breaker fires.
