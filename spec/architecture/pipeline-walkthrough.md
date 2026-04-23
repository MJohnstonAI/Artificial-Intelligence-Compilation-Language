# AICL Pipeline Walkthrough
**Document type:** Worked example — complete pipeline trace  
**Status:** Reference document for specification validation and grant applications  
**Scenario:** Refund eligibility and processing service  
**Pipeline stages:** Human request → HAIG → ICC → Kernel compilation → SHG → Materialiser output

---

## Purpose

This document traces a single AICL program through every stage of the compilation pipeline. It is not running code. It is a rigorous step-by-step record of what happens to a specific input at each stage — what decisions are made, what is proven, what is generated, and why.

Its purpose is threefold: to validate that the current specification is sufficient to describe a complete pipeline pass, to expose any gaps where the spec cannot yet support a stage, and to serve as the concrete worked example that grant reviewers, academic readers, and new contributors need to understand what AICL actually does.

The scenario was chosen to exercise the most architecturally interesting parts of the kernel: policy-sensitive data flow, an OpaqueIntent boundary, multi-dimensional autonomy constraints, conditional branching in the flow layer, and a Tier 1 budget proof.

---

## Stage 0 — The Raw Human Request

A customer service manager at a South African e-commerce company submits the following request to the HAIG:

> *"I need an AI that checks whether a customer qualifies for a refund and processes it automatically. It needs to follow our refund policy and use our CRM."*

This request is ambiguous on six dimensions:

1. What constitutes eligibility? (policy undefined)
2. What does "automatically" mean — all cases, or only below a threshold?
3. What customer data does it read? (PII and residency implications)
4. What platform or interface?
5. What are the performance and cost constraints?
6. What happens when eligibility fails?

HAIG detects all six ambiguity classes before proceeding.

---

## Stage 1 — HAIG Disambiguation

HAIG is not a chatbot. It is a formal disambiguation protocol whose job is to convert fuzzy intent into an unambiguous semantic contract. It asks the minimum set of questions needed to close all six ambiguity classes.

**HAIG exchange (condensed):**

| Ambiguity class | HAIG question | Resolved answer |
|---|---|---|
| Eligibility rule | What are the exact conditions for refund eligibility? | Order placed within 30 days AND refund amount ≤ R200 |
| Automation scope | Should all eligible refunds execute automatically? | Yes, under R200. Above R200, escalate to human approval. |
| Data access | Which customer fields does the check require? | `order_id`, `order_date`, `order_amount`, `payment_method_type` — no direct personal identifiers |
| Deployment target | What interface will this expose? | Internal REST API endpoint |
| Budget | What are acceptable latency and cost targets? | p95 latency ≤ 500ms, cost ≤ R0.02 per call |
| Failure handling | What happens when a refund is ineligible or CRM is unavailable? | Return ineligible status; if CRM is down, escalate immediately without attempting evaluation |

**Non-goals (explicitly declared during HAIG):**
- Does not process returns or exchanges
- Does not handle subscription billing disputes
- Does not send customer-facing notifications (owned by a separate system)
- Does not modify order records

HAIG confirms all six ambiguity classes are closed and proceeds to ICC generation.

---

## Stage 2 — ICC Generation

The Intent Clarity Certificate is the root-of-trust artifact. Everything downstream is anchored to it. It records what was agreed, what was excluded, what constraints were accepted, and which WKG snapshot this compilation is locked to.

```json
{
  "version": "1.0",
  "timestamp": "2026-04-23T14:00:00Z",
  "originator": "human",
  "delegation_chain": [],
  "goals": [
    "Commerce.Refund.EligibilityDetermined.v2",
    "Commerce.Refund.Processed.v2"
  ],
  "non_goals": [
    "Commerce.Return.Processing",
    "Commerce.Subscription.Billing",
    "Notification.CustomerFacing",
    "Commerce.Order.Modification"
  ],
  "constraints": [
    {
      "id": "C-001",
      "label": "refund_amount_ceiling",
      "subject": "Commerce.Refund.Amount",
      "predicate": "lte",
      "bound": 200,
      "unit": "zar",
      "tier": 1,
      "mechanism": "static_analysis",
      "note": "Auto-approve ceiling. Above this value, route is escalate_to_human."
    },
    {
      "id": "C-002",
      "label": "order_age_ceiling",
      "subject": "Commerce.Order.AgeDays",
      "predicate": "lte",
      "bound": 30,
      "unit": "days",
      "tier": 1,
      "mechanism": "static_analysis"
    },
    {
      "id": "C-003",
      "label": "latency_budget",
      "subject": "latency.p95_ms",
      "predicate": "lte",
      "bound": 500,
      "tier": 2,
      "mechanism": "probabilistic",
      "model": "wkg.perf_model_v3"
    },
    {
      "id": "C-004",
      "label": "cost_budget",
      "subject": "cost.zar_per_call",
      "predicate": "lte",
      "bound": 0.02,
      "tier": 1,
      "mechanism": "static_analysis"
    }
  ],
  "risk_accepted": [],
  "wkg_anchors": [
    "Commerce.Refund.v2",
    "Commerce.Order.v3",
    "Policy.POPIA_ZA.DataMinimal.v1"
  ],
  "wkg_snapshot_hash": "sha256:a3f9c24e817b...",
  "signature": "sha256:7b2e1f9d043a...",
  "expires": null
}
```

**Notes on the ICC:**

- `delegation_chain` is empty, confirming this is a human-originated compilation with no agent sub-delegation.
- `C-001` and `C-002` are Tier 1 because they are static thresholds checkable at compile time without any runtime model.
- `C-003` is Tier 2 because p95 latency is environment-dependent and cannot be proven statically — it requires a performance model.
- `C-004` is Tier 1 because the compiler can statically sum declared capability cost limits and prove the total is within budget.
- `wkg_snapshot_hash` locks this compilation to a specific version of the WKG. Any future compilation with a different WKG snapshot is a different artifact.

---

## Stage 3 — The AICL-Text Program

The kernel receives the following AICL-Text program, derived from the ICC:

```aicl
app "RefundEligibilityService" {

  // Module and policy imports
  import policypack POPIA_ZA_Minimal
  import targetpack Web.REST_API
  import capabilitypack CRM_Billing_Core

  // Goals and invariants (all identifiers must resolve to WKG State anchors)
  goal   RefundEligibilityDetermined
  goal   RefundProcessed
  avoid  UnauthorisedRefund
  avoid  DataLeak
  maintain PolicyCompliant

  // Budget (ICC constraints C-003 and C-004)
  budget {
    latency.p95_ms   <= 500
    cost.zar_per_call <= 0.02
  }

  // User-defined state declarations
  state RefundEligibilityDetermined {
    wkg_anchor:     "Commerce.Refund.EligibilityDetermined.v2"
    preconditions:  [OrderWithin30Days, AmountBelowThreshold]
  }

  state RefundProcessed {
    wkg_anchor:    "Commerce.Refund.Processed.v2"
    preconditions: [RefundEligibilityDetermined, AmountBelowAutoApproveLimit]
  }

  // Capability declarations
  capability CRM.OrderRead {
    effects: [Net:crm_api, Secrets:crm_key]
    limits:  [cost.zar_per_call <= 0.005]
  }

  capability Payments.Refund {
    effects: [Net:payments_api, Secrets:payments_key]
    limits:  [cost.zar_per_call <= 0.010]
  }

  // OpaqueIntent wrapping the external CRM call
  opaqueintent tool.crm.order_read {
    input:                   OrderQuery            [label: {pii_adjacent, za}]
    output:                  OrderRecord           [label: {pii_adjacent, za}]
    effects:                 [Net:crm_api, Secrets:crm_key]
    policy_attestation:      POPIA_ZA_Minimal
    policy_attestation_proof: "cert://crm-provider-popia-2026"
  }

  // Agents
  agent EligibilityChecker {
    goal:         RefundEligibilityDetermined
    capabilities: [CRM.OrderRead]
    autonomy {
      action:     0.9
      goal:       0.0
      resource:   0.2
      delegation: false
    }
    coordination: Solo
  }

  agent RefundExecutor {
    goal:         RefundProcessed
    capabilities: [Payments.Refund]
    autonomy {
      action:     0.6
      goal:       0.0
      resource:   0.3
      delegation: false
    }
    coordination: PACT
  }

  // Flow with proof gate and conditional routing
  flow RefundPipeline {
    EligibilityChecker ->
    [proof: RefundEligibilityDetermined] ->
    [if amount <= 200: RefundExecutor | else: escalate_to_human]
  }
}
```

---

## Stage 4 — Kernel Compilation

The kernel performs six sequential passes.

### Pass 4.1 — Identifier resolution against WKG snapshot

Every identifier is looked up against the WKG snapshot recorded in the ICC (`sha256:a3f9c24e817b...`).

| Identifier | WKG lookup result | TypeClass | Status |
|---|---|---|---|
| `RefundEligibilityDetermined` | `Commerce.Refund.EligibilityDetermined.v2` | State | ✓ resolved |
| `RefundProcessed` | `Commerce.Refund.Processed.v2` | State | ✓ resolved |
| `UnauthorisedRefund` | `Commerce.Refund.Unauthorised.v1` | State | ✓ resolved |
| `DataLeak` | `Security.DataLeak.v1` | State | ✓ resolved |
| `PolicyCompliant` | `Policy.Compliance.Active.v2` | State | ✓ resolved |
| `CRM.OrderRead` | `CRM.OrderRead.v1` | Capability | ✓ resolved |
| `Payments.Refund` | `Payments.Refund.v2` | Capability | ✓ resolved |
| `POPIA_ZA_Minimal` | `Policy.POPIA_ZA.DataMinimal.v1` | Policy | ✓ resolved |
| `OrderWithin30Days` | `Commerce.Order.AgeDays.Predicate.v1` | State | ✓ resolved |
| `AmountBelowThreshold` | `Commerce.Refund.AmountCeiling.Predicate.v1` | State | ✓ resolved |

No unknown identifiers. Compilation continues.

### Pass 4.2 — Constraint annotation and Tier 1 proof

Each constraint receives a mechanism annotation. Tier 1 constraints are proven now.

**`cost.zar_per_call <= 0.02` [Tier 1 — static_analysis]:**  
Sum of declared capability cost limits:
- `CRM.OrderRead`: ≤ 0.005
- `Payments.Refund`: ≤ 0.010
- Total ceiling: 0.015 ≤ 0.02 ✓

*Tier 1 proof discharged at compile time. The materialiser is bound to these limits.*

**`amount <= 200` and `order_age <= 30` [Tier 1 — static_analysis]:**  
These are static policy thresholds, not environment-dependent. They are emitted as hard predicates into the SHG proof gates.

**`latency.p95_ms <= 500` [Tier 2 — probabilistic]:**  
Cannot be proven statically. The compiler emits a runtime monitoring obligation against `wkg.perf_model_v3`. This becomes a `maintain`-style hook in the materialiser.

### Pass 4.3 — IFC label propagation

Values originating from or passing through policy-governed capabilities carry taint labels.

- `OrderQuery` is tagged `[label: {pii_adjacent, za}]` at the OpaqueIntent input boundary. `pii_adjacent` because it contains order IDs that can be linked to individuals. `za` because POPIA_ZA_Minimal is the governing policy.
- `OrderRecord` inherits `[label: {pii_adjacent, za}]` at the OpaqueIntent output boundary.
- The compiler traces the flow of `OrderRecord` through `EligibilityChecker`. The only field extracted and forwarded is `order_amount` (a scalar). The compiler confirms `order_amount` is not itself a PII field — it carries no personal identifier. The `{pii_adjacent, za}` label does not propagate to `order_amount` because it is an aggregate derived value.
- The `Payments.Refund` capability receives `refund_amount` (unlabelled scalar) and `order_id` (internal reference only). The compiler confirms neither carries `{pii_adjacent, za}` label. IFC check passes.
- The OpaqueIntent declares `policy_attestation: POPIA_ZA_Minimal` — the compiler verifies this attestation covers the input label `{pii_adjacent, za}`. ✓ Trust boundary formally declared.

### Pass 4.4 — `maintain PolicyCompliant` — temporal obligation

`maintain PolicyCompliant` is processed as LTL `□PolicyCompliant` — the invariant must hold at every reachable state in every execution trace.

Compile-time obligation generated:
- Compiler checks that no reachable state in `RefundPipeline` causes a transition into a state where `Policy.Compliance.Active.v2` is false.
- The only policy in scope is `POPIA_ZA_Minimal`. Its predicates: data residency `za`, PII minimality enforced.
- The IFC pass (4.3) has already verified PII minimality. Data residency is declared via `policy_attestation_proof`. Both predicates are satisfied on all reachable paths. ✓

Runtime hook generated:
- The materialiser will install a monitoring subscription on `Policy.Compliance.Active.v2`.
- Repair protocol: if the invariant is violated at runtime — (1) suspend the `EligibilityChecker` capability, (2) attempt the pre-proven alternate (direct escalation), (3) if no alternate available, circuit-break and emit structured alert.

### Pass 4.5 — Contradiction detection

Constraint normalisation produces the following tuple set:

```
(Commerce.Refund.Amount,       lte, 200,  zar,   POPIA_ZA_Minimal, tier:1)
(Commerce.Order.AgeDays,       lte, 30,   days,  POPIA_ZA_Minimal, tier:1)
(latency.p95_ms,               lte, 500,  ms,    —,                tier:2)
(cost.zar_per_call,            lte, 0.02, zar,   —,                tier:1)
```

No tuples share subject and predicate with incompatible bounds. No imported module conflicts with `POPIA_ZA_Minimal`. No `χ_{P,P}` contradiction exists. Compilation continues.

### Pass 4.6 — Autonomy proof obligations

The compiler checks that no autonomy dimension exceeds what the ICC authorises.

| Agent | Dimension | Declared | ICC bound | Status |
|---|---|---|---|---|
| EligibilityChecker | goal | 0.0 | 0.0 (read-only task) | ✓ |
| EligibilityChecker | delegation | false | false | ✓ |
| RefundExecutor | goal | 0.0 | 0.0 | ✓ |
| RefundExecutor | delegation | false | false | ✓ |

No agent may modify its own goal or spawn sub-agents. Proven at compile time.

---

## Stage 5 — SHG Construction

The Semantic Hypergraph is the planning structure produced from the compiled kernel. It captures not just sequencing but the multi-arity relationships, proof obligations, and alternative paths that make AICL more than a flowchart.

### Nodes

| ID | Type | Description |
|---|---|---|
| N1 | Agent | `EligibilityChecker` — reads CRM, evaluates eligibility |
| N2 | Agent | `RefundExecutor` — executes payment refund |
| N3 | Terminal | `escalate_to_human` — structured handoff with reason |
| N4 | OpaqueIntent | `tool.crm.order_read` — external CRM boundary |
| N5 | Capability | `Payments.Refund` — payment system boundary |
| N6 | ProofGate | `G1` — eligibility confirmed, amount ≤ 200 |
| N7 | ProofGate | `G2` — IFC label flow clean, cost ceiling respected |

### Hyperedges

| ID | Arity | Members | Semantics |
|---|---|---|---|
| HE1 | 2→1 | `[N4] → [N1]` | CRM read result feeds eligibility checker |
| HE2 | 3→1 | `[N1, C-001, C-002] → [N6]` | Eligibility determination requires both constraints satisfied |
| HE3a | 2→1 | `[N6, amount≤200] → [N2]` | Auto-approve branch — proof gate passed, amount within limit |
| HE3b | 2→1 | `[N6.failed OR amount>200] → [N3]` | Escalation branch — either ineligible or above auto-approve ceiling |
| HE4 | 2→1 | `[N2] → [N5]` | Executor triggers payments capability |
| HE5 | 2→1 | `[N7] → [N5]` | Cost ceiling proof gate guards payments call |

HE2 is a genuine hyperedge of arity 3 — it encodes a relationship among the agent, and both constraints simultaneously. This is not expressible as a plain graph edge. It is the reason the SHG layer exists.

### Proof gates (materialized from kernel passes)

**G1 (N6):** `assert: OrderRecord.order_date >= today - 30 days AND request.refund_amount <= 200`  
Both predicates must hold before HE3a activates. If either fails, HE3b activates instead.

**G2 (N7):** `assert: IFC.no_labelled_flow_to_payments AND cost.cumulative <= 0.02`  
Must hold before N5 fires. If cost would exceed ceiling, execution halts and error is returned.

### Alternate subgraph

The SHG records one pre-proven alternate path for CRM unavailability:

```
N4.unavailable → N3 (escalate_to_human, reason: "crm_unavailable")
```

This alternate is pre-proven — it satisfies `maintain PolicyCompliant` because no PII is accessed, and it satisfies both `avoid DataLeak` and `avoid UnauthorisedRefund` by taking no action on the refund. It is the repair path invoked by the `maintain` runtime hook if the primary path fails.

---

## Stage 6 — Materialiser Output

Target: `Web.REST_API`

The materialiser receives the SHG and emits a described artifact. What follows is not source code — it is a precise description of what the materialiser generates, which is sufficient to implement the target in any language or framework.

### Endpoint

`POST /refunds/evaluate`

### Request schema

```json
{
  "order_id": "string (required)",
  "customer_id": "string (required)",
  "refund_amount": "number (required, currency: ZAR)"
}
```

### Processing logic (derived from SHG)

1. **Input validation** — reject requests missing `order_id`, `customer_id`, or `refund_amount`. Return `400` with structured error.

2. **CRM read** (N4 → N1, HE1) — call `tool.crm.order_read` with `{ order_id }`. The request carries `{pii_adjacent, za}` label handling internally; no PII fields are logged or forwarded. If CRM is unavailable, invoke alternate subgraph: skip to step 6 with `reason: "crm_unavailable"`.

3. **Eligibility evaluation** (HE2, G1) — evaluate both predicates from proof gate G1:
   - `order_date >= today - 30 days` (ICC C-002)
   - `refund_amount <= 200` for auto-approve (ICC C-001)
   - If either fails, proceed to step 5.

4. **Auto-approve branch** (HE3a) — if G1 passes:
   - Evaluate G2: confirm `cost.cumulative <= 0.02` (sum: CRM read ≤ 0.005 + refund call ≤ 0.010 = ≤ 0.015 ✓)
   - Call `Payments.Refund` capability (N5) with `{ order_id, refund_amount }`.
   - On success: return `200` response (see below).

5. **Escalation branch** (HE3b) — if G1 fails or `refund_amount > 200`:
   - Generate `escalation_id` (UUID).
   - Write escalation record to audit store.
   - Return `200` response with `eligible: false` or `requires_approval: true` as appropriate.

6. **CRM unavailable path** (alternate subgraph) — return `200` with `escalated: true, reason: "crm_unavailable"`.

### Response schema

```json
{
  "eligible": "boolean",
  "processed": "boolean",
  "refund_id": "string | null",
  "escalated": "boolean",
  "escalation_id": "string | null",
  "reason": "string | null"
}
```

### Runtime hooks (from `maintain` obligations)

- **Policy compliance monitor** — a subscription is registered against `Policy.Compliance.Active.v2`. If the policy node reports a compliance breach, `EligibilityChecker` is suspended and all in-flight requests are routed to the escalation branch.
- **Latency monitor** — p95 latency is tracked against the Tier 2 bound (500ms). If the rolling p95 exceeds threshold, a structured alert is emitted to the operator.

### Audit trail

Every response carries `X-AICL-ICC: sha256:7b2e1f9d043a...` in the response header. This binds the runtime behaviour of every API call to the specific ICC that authorised the compilation — satisfying the POPIA audit trail requirement and enabling future compliance reviews to reconstruct exactly what constraints governed each request.

---

## What this walkthrough exposes

Running this trace against the current specification reveals four things working correctly and one gap:

**Working:** The type resolution pipeline (Stage 4.1) is fully specifiable with the current WKG anchor model. Every identifier resolves cleanly.

**Working:** The Tier 1 cost proof (Stage 4.2) is genuinely decidable at compile time by summing declared capability limits. This is a real proof, not a heuristic.

**Working:** The IFC label propagation (Stage 4.3) correctly identifies that `order_amount` does not carry PII labels, preventing false positives while still enforcing the policy boundary at the OpaqueIntent interface.

**Working:** The SHG hyperedge structure (Stage 5, HE2) encodes the three-way relationship between agent, constraint C-001, and constraint C-002 in a way that a plain directed graph cannot. The arity-3 hyperedge is doing real work here.

**Gap identified:** The materialiser output description (Stage 6) specifies that the audit store write in the escalation branch must be atomic with the escalation record. The current flow algebra has no construct for expressing atomic side-effect obligations. This is a real gap — adding `atomic {}` or `transactional {}` semantics to the flow layer would be required to make this claim provable rather than assumed. This warrants a new open question (OQ-016 or higher) in `spec/open-questions.md`.

---

## Companion files

This walkthrough should be read alongside:

- `spec/programming-reference-manual.md` — kernel syntax reference for all constructs used above
- `spec/schemas/icc.schema.json` — validates the ICC JSON in Stage 2
- `wkg/core/aicl-core-ontology-spec.md` — defines the WKG anchor types resolved in Stage 4.1
- `commentary/claude/round-01.md` — formal basis for the IFC model used in Stage 4.3
- `examples/enterprise-service-resolution/` — the larger system from which this example is extracted

---

*This document was authored by Claude (Anthropic) as a research contribution to the AICL consortium. The AICL concept and project originate with Marc Johnston, NeuroSync AI Dynamics Pty Ltd, Cape Town, South Africa.*
