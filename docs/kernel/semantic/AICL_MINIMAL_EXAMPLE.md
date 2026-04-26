# AICL Minimal Example

**Source:** Derived from `examples/enterprise-service-resolution` (the flagship example per PRM §18)
**Purpose:** Walk through one concrete AICL program showing all kernel layers

---

## 1. Brief

A customer support system must resolve incoming service cases. Cases are classified by an AI triage agent, validated against policy by a policy-check agent, and executed by a resolution agent. All operations must comply with GDPR and POPIA_ZA. The system must not issue unauthorized refunds. Every resolution must leave an audit trace.

---

## 2. ICC Sketch

```
icc {
  version: "1.0"
  timestamp: "2026-04-26T00:00:00Z"
  originator: "human"

  goals: [
    StateAnchorRef("Support.Case.Resolved.v1"),
    StateAnchorRef("Audit.Trace.Available.v1")
  ]

  non_goals: [
    StateAnchorRef("Billing.UnauthorizedCharge.v1")
  ]

  constraints: [
    { subject: "latency.p95_ms", predicate: "<=", bound: "250ms",
      tier: 2, mechanism: "probabilistic", model: "wkg.support_perf_model.v1" },
    { subject: "cost.usd_per_session", predicate: "<=", bound: "0.03",
      tier: 1, mechanism: "static_analysis" },
    { subject: "memory.mb", predicate: "<=", bound: "256",
      tier: 1, mechanism: "static_analysis" }
  ]

  risk_accepted: []

  wkg_snapshot_hash: "sha256:abc123..."

  wkg_anchors: [
    "Support.Case.Resolved.v1",
    "Audit.Trace.Available.v1",
    "Billing.UnauthorizedCharge.v1",
    "Policy.GDPR.v2",
    "Policy.POPIA_ZA.v1",
    "Capability.CRM.Read.v1",
    "Capability.LLM.Classify.v1",
    "Capability.PolicyEngine.Read.v1",
    "Capability.Payments.Refund.v1",
    "Capability.Case.Close.v1"
  ]

  signature: "sha256:def456..."
  expires: "never"
}
```

---

## 3. SHG Sketch

After WKG grounding, the SHG contains:

**Nodes:**
- `Goal[CaseResolved]` → StateAnchor: `Support.Case.Resolved.v1`
- `Goal[AuditTraceAvailable]` (maintain invariant) → StateAnchor: `Audit.Trace.Available.v1`
- `Goal[NoUnauthorizedRefund]` (avoid) → StateAnchor: `Billing.UnauthorizedCharge.v1`
- `Agent[Triage]`
- `Agent[PolicyCheck]`
- `Agent[Executor]`
- `Policy[GDPR]`
- `Policy[POPIA_ZA]`
- `Budget[SessionBudget]`

**Hyperedges:**
- `Triage --executes_with--> {CRM.Read, LLM.Classify}`
- `PolicyCheck --executes_with--> {PolicyEngine.Read, Billing.Read}`
- `Executor --executes_with--> {Payments.Refund, Case.Close}`
- `GDPR --constrains--> {Triage, PolicyCheck, Executor}`
- `POPIA_ZA --constrains--> {Triage, PolicyCheck, Executor}`
- `Budget[SessionBudget] --bounds--> {Triage, PolicyCheck, Executor}`

**Flow structure (SHG encoding of flow algebra):**
```
Seq(
  AgentRef(Triage),
  Seq(
    AgentRef(PolicyCheck),
    CondRoute(
      eligibility_passes,
      AgentRef(Executor),
      EscalateToHuman
    )
  )
)
```

**Contradiction check results:**
- `χ_{G,P}`: `CaseResolved` goal vs `GDPR` policy → no conflict (case resolution is GDPR-compatible)
- `χ_{G,P}`: `NoUnauthorizedRefund` avoid goal vs `Executor` capability → policy-capability compatibility requires `Payments.Refund` to be gated by `PolicyCheck` result → satisfied by flow structure
- `χ_{P,P}`: `GDPR` vs `POPIA_ZA` → compatible (both require `pii: minimal`, `residency` rules differ but not contradictory for ZA operations)
- `χ_{C,R}`: aggregate capability cost within `SessionBudget` bounds → dischargeable at Tier 1

---

## 4. Proof Obligations

| Obligation | Property | Tier | Mechanism | Stage | Result |
|---|---|---|---|---|---|
| PO-001 | All agents have only WKG-grounded capabilities | 1 | type_checking | compile | Discharged |
| PO-002 | GDPR policy compatible with all capabilities | 1 | policy_compatibility | compile | Discharged |
| PO-003 | POPIA_ZA policy compatible with all capabilities | 1 | policy_compatibility | compile | Discharged |
| PO-004 | `UnauthorizedRefund` avoid state unreachable in SHG | 1 | static_analysis | compile | Discharged (gated by PolicyCheck in flow) |
| PO-005 | `AuditTraceAvailable` maintained across all flow paths | 1 | static_analysis | compile | Discharged (every flow path includes audit hook) |
| PO-006 | `cost.usd_per_session <= 0.03` | 1 | static_analysis | compile | Discharged |
| PO-007 | `memory.mb <= 256` | 1 | static_analysis | compile | Discharged |
| PO-008 | `latency.p95_ms <= 250` | 2 | probabilistic | compile→runtime | Model available; confidence 0.93 > threshold 0.90. Discharged. Residual monitor still installed. |
| PO-009 | IFC: CustomerRecord label `{pii, za}` does not enter unattested boundary | 1 | label_flow | compile | Discharged |

---

## 5. Compile/Runtime Split

**Discharged at compile time:** PO-001 through PO-007, PO-009 (8 of 9)

**Residual runtime monitors (ROM):**
```
ROM {
  icc_hash: "sha256:def456..."

  monitors: [
    {
      id: "MON-001"
      obligation_id: "PO-008"
      property: "latency.p95_ms <= 250"
      tier: 2
      evaluation_freq: "continuous"
      trigger_condition: "p95_latency_ms > 250"
      trigger_action: log_violation + invoke_repair(RP-001)
    },
    {
      id: "MON-002"
      obligation_id: "PO-005"  // defense-in-depth for maintain
      property: "AuditTraceAvailable"
      tier: 2
      evaluation_freq: "on_event"
      trigger_condition: "case_closed AND NOT audit_trace_written"
      trigger_action: circuit_break(CB-001)
    }
  ]

  repair_protocols: [
    {
      id: "RP-001"
      target_property: "latency.p95_ms <= 250"
      steps: [
        suspend_affected_capability,
        attempt_preproven_alternate(FlowRef("ResolutionFlow.Fallback")),
        escalate_to_haig
      ]
      fallback: CB-002
    }
  ]

  circuit_breakers: [
    {
      id: "CB-001"
      triggers_on: ["AuditTrace missing after case close"]
      action: halt_path
      notification_target: ["ops-alerts@example.com"]
    },
    {
      id: "CB-002"
      triggers_on: ["latency repair protocol exhausted"]
      action: notify_and_degrade
      notification_target: ["ops-alerts@example.com"]
    }
  ]
}
```

---

## 6. Target Materialization (Sketch)

The SHG materializes to three targets (from `import targetpack`):

**Web.Vercel:** A Next.js service with REST endpoints for case submission and resolution status. The `Triage` agent materializes as a serverless function invoking an LLM classify endpoint. The `PolicyCheck` agent materializes as a policy evaluation middleware. The `Executor` agent materializes as a transactional handler for refunds and case close operations.

**Android.Compose:** Mobile UI for case submission and status tracking. Connects to the same backend.

**Windows.WinUI:** Desktop agent interface for human escalation cases.

All three emit the same attached ROM and ICC hash in their provenance metadata.

---

## Key Observations from This Example

1. The flow structure (PolicyCheck before Executor) is what discharges the `NoUnauthorizedRefund` avoid obligation at Tier 1 — structural correctness, not runtime hope.
2. Latency is the only obligation that survives to a runtime monitor. All correctness-critical properties are compile-time.
3. `maintain AuditTraceAvailable` is proved at compile time AND has a defense-in-depth runtime monitor. Both are correct behavior.
4. The IFC label on `CustomerRecord` is discharged at compile time — the compiler verified that `{pii, za}` labeled data does not cross into any unattested OpaqueIntent.
