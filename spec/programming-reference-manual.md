# AICL Programming Reference Manual
**Version:** v0.3-reference  
**Status:** Detailed working reference for AI agents, human reviewers, and future compiler implementers

---

## 0. Companion Documents

This manual should be read together with:

- [`../README.md`](../README.md) for the public repository entry point
- [`unified-spec-v1.0-draft.md`](unified-spec-v1.0-draft.md) for spec convergence targets
- [`working-draft.md`](working-draft.md) for the collaborative draft layer
- [`schemas/`](schemas/) for draft machine-readable schema companions
- [`../wkg/core/aicl-core-ontology-spec.md`](../wkg/core/aicl-core-ontology-spec.md) for the WKG semantics companion
- [`../wkg/core/canonical-ontology-registry.md`](../wkg/core/canonical-ontology-registry.md) for WKG naming and snapshot conventions
- [`../commentary/claude/latest-review.md`](../commentary/claude/latest-review.md) for the authoritative review summary
- [`../examples/enterprise-service-resolution/README.md`](../examples/enterprise-service-resolution/README.md) for the flagship serious example

---

## 1. Purpose

This manual defines the programming-facing reference model for AICL.

AICL is a layered, AI-native semantic compilation language whose purpose is to express:
- goals
- constraints
- capabilities
- policies
- resources
- proofs
- workflows
- deployable artifacts

This manual is written so that:
- AI agents can read it and scaffold contributions,
- human developers can review and critique it,
- future compiler/runtime implementers have a stable textual baseline.

---

## 2. Canonical Forms

AICL has three parallel canonical forms:

### 2.1 AICL-Text
Human-readable, reviewable source form.

### 2.2 AICL-SHG-TENSOR
Machine-native graph/tensor form for compilation and optimization.

### 2.3 AICL-JSON
Transport and diagnostic form.

---

## 3. Layer Model

### 3.1 AICL-Kernel
Formal core for:
- goals
- state constraints
- capabilities
- policies
- resources
- proof obligations
- composition

### 3.2 AICL-SHG
Semantic Hypergraph layer for:
- planning
- branching
- parallelism
- adaptation
- optimization
- agent coordination

### 3.3 Materializers
Target emitters for:
- web apps
- mobile apps
- desktop apps
- backend services
- game runtimes
- agent capsules

---

## 4. Identifier Resolution and the Type System

AICL uses a **WKG-backed nominal type system**.

Every identifier must resolve through the World Knowledge Graph or through a local declaration.

The WKG is the authoritative source of semantic identity for `Goal`, `StateAnchor`, `Policy`, `Capability`, `Metric`, `Entity`, `Resource`, `Environment`, and `Evidence` anchors. Kernel type classes are compiler-facing category labels over WKG anchors. Identifier resolution during compilation is performed against a pinned WKG snapshot recorded in the ICC.

Resolution pipeline:

`Identifier -> WKG.lookup(id, snapshot) or local declaration -> WKG anchor -> kernel type class`

### 4.1 Core Type Classes
- **Entity** — things that exist (Player, Ticket, Agent, Button)
- **State** — compiler-facing category label for WKG `StateAnchor` declarations; runtime facts are recorded separately as `StateObservation`
- **Intent** — things that must be achieved/maintained/avoided
- **Metric** — measurable optimization targets
- **Policy** — machine-checkable obligations
- **Capability** — allowed actions/effects

### 4.2 Validity Rules
- `goal`, `maintain`, and `avoid` accept only identifiers resolving to the kernel **State** category, backed by WKG `StateAnchor` records
- `optimize` accepts only identifiers resolving to **Metric**
- `requires_policy` accepts only **Policy**
- `capability` declarations must resolve to **Capability** or define one
- unknown identifiers are **compile errors**

### 4.3 User-Defined Declarations
```aicl
state RefundProcessed {
  wkg_anchor: "Commerce.Refund.Completion.v2"
  preconditions: [RefundRequested, AuthorisedByPolicy]
}

metric AverageResolutionTime {
  unit: seconds
  wkg_anchor: "Support.Metrics.Resolution.v1"
  direction: minimize
}
```

`state` declarations produce `StateAnchor` records at compile time. Runtime state facts are represented as `StateObservation` records in the WKG and must include `evidence_refs`.

---

## 5. Lexical Structure

### 5.1 Comments
```aicl
// single-line
/* multi-line */
```

### 5.2 Identifiers
Letters, digits, underscore, and dot are allowed.

Examples:
```aicl
Gameplay.PlayerShip
policy.gdpr
cost.max_usd
```

### 5.3 Literals
```aicl
"string"
123
12.5
true
false
```

### 5.4 Units
Units must be explicit where practical:
```aicl
latency.p95_ms <= 200
memory.mb <= 256
cost.usd_per_session <= 0.02
battery.mw <= 800
carbon.gco2e <= 0.5
```

---

## 6. Core Declarations

### 6.1 app
Top-level artifact declaration.
```aicl
app "ServiceResolutionPlatform" {
  // declarations
}
```

At the WKG layer, an `app` declaration defines or resolves the active `Environment` scope against which policies, resources, and capabilities are interpreted.

### 6.2 module
Reusable semantic package.
```aicl
module Support.CoreWorkflow {
  // declarations
}
```

### 6.3 import
```aicl
import module Support.CoreWorkflow
import capabilitypack CRM_Billing_Core
import policypack GDPR_POPIA_Minimal
import targetpack Web.Vercel
```

---

## 7. Goals, Constraints, and Budgets

### 7.1 Goals
```aicl
goal CaseResolved
goal PolicyCompliantOutcome
```

### 7.2 Maintain
`maintain` has both **compile-time** and **runtime** semantics.

Semantically, `maintain P` means: maintain proposition `P` as an invariant.

#### Compile-time obligation
The compiler must prove that no reachable state in the intended graph violates `P`, within the proof mechanism declared.

#### Runtime obligation
The runtime must install monitoring hooks for `P`.

#### Repair protocol
If violated at runtime:
1. suspend affected capability or path
2. attempt a pre-proven alternate
3. if none exists, circuit-break and escalate
4. log the violation trace

```aicl
maintain PolicyCompliant

repair_protocol PolicyCompliant {
  suspend_affected_capability
  attempt_preproven_alternate
  else circuit_break_and_escalate
}
```

### 7.3 Avoid
```aicl
avoid PolicyViolation
avoid DataLeak
avoid UnboundedLoop
```

### 7.4 Budgets
```aicl
budget {
  cost.usd_per_session <= 0.02
  latency.p95_ms <= 200
  battery.mw <= 800
  memory.mb <= 256
  carbon.gco2e <= 0.5
}
```

---

## 8. Proof Tiers and Proof Mechanisms

AICL distinguishes **proof tiers** by **mechanism**, not just by rhetorical strength.

### 8.1 Tier 1 — Decidable / static
Properties checked deterministically at compile time:
- type consistency
- capability containment
- schema consistency
- effect boundaries
- label flow / policy flow
- resource ceilings where statically analyzable

### 8.2 Tier 2 — probabilistic / model-bounded
Properties requiring runtime models or empirical validation:
- p95 latency
- crash probability
- fairness thresholds
- ranking quality

### 8.3 Tier 3 — heuristic
Best-effort optimization:
- aesthetic quality
- engagement tuning
- subjective UX quality

### 8.4 Constraint Annotation
Each constraint should carry:
- tier
- mechanism
- optional model reference

```aicl
constrain Performance {
  latency.p95_ms <= 200 [tier: 2, mechanism: probabilistic, model: wkg.perf_model_v3]
  memory.mb <= 256      [tier: 1, mechanism: static_analysis]
}
```

---

## 9. Capabilities and OpaqueIntents

### 9.1 Capability Declaration
```aicl
capability Payments.Refund {
  effects: [Net:payments_api, Secrets:payments_key]
  limits: [cost.usd_per_call <= 0.01]
}
```

Each `effects` label must resolve to, or be imported through, a WKG `Capability` anchor. Effect labels are not an independent capability type system; they are compiler-facing handles over WKG capability identity.

### 9.2 OpaqueIntent
OpaqueIntent wraps an external tool, API, or service.

```aicl
opaqueintent tool.crm.write {
  input: CustomerRecord [label: {pii, za}]
  output: WriteConfirmation
  effects: [Net:crm_api, Secrets:crm_key]
  policy_attestation: POPIA_ZA
  policy_attestation_proof: "cert://provider-audit-2026"
}
```

### 9.3 Information Flow Control (IFC)
AICL adopts an IFC-style model for policy-sensitive flows.

Every value may carry policy/taint labels derived from policy nodes.  
The compiler must reject flows from labelled values into an OpaqueIntent unless the intent declares an equivalent or stricter `policy_attestation`.

This is the formal trust boundary:
- the compiler can verify the declared interface,
- it cannot verify the internals of the external provider.

---

## 10. Policies

Policies are machine-checkable obligations.

```aicl
policy GDPR {
  residency: eu
  pii: minimal
}

policy POPIA_ZA {
  residency: za
  pii: minimal
}
```

Attach with:
```aicl
requires_policy GDPR
requires_policy POPIA_ZA
```

---

## 11. Contradiction Detection

Imported modules and policy packs may conflict.

The contradiction taxonomy spans both compile-time and runtime defenses:

- `Goal_vs_Policy`
- `Capability_vs_Resource`
- `Policy_vs_Policy`

### 11.1 Normalization
Before SHG construction, constraints should be normalized to a common tuple form:

`(subject, predicate, bound, scope, priority)`

### 11.2 Conflict Policy
```aicl
ontology_conflict_policy {
  same_tier: escalate_to_haig [stage: compile]
  cross_tier: higher_precedence_wins [stage: compile]
  unresolvable: compile_error [stage: compile]
  runtime_delta_conflict: contradiction_halt [stage: runtime, handled_by: wkg]
}
```

Compile-time contradictions discovered during kernel normalization or constraint analysis are the primary defense. Equal-priority conflicts at this stage escalate to HAIG; irreducible contradictions fail compilation.

Runtime contradictions discovered while validating WKG delta-log mutations are the last-resort backstop. They halt the mutation path rather than re-running compile-time arbitration.

### 11.3 Example
A data-retention module requiring 7-year storage may conflict with a delete-on-request policy. If that conflict is discovered during compilation, it must be surfaced to HAIG and recorded in the ICC. If a live policy import or runtime WKG delta introduces an equal-priority contradiction after deployment, the runtime must halt the conflicting delta-log path.

---

## 12. Workflow and Flow Algebra

Linear arrows are insufficient for production systems.

### 12.1 Minimal Flow Algebra
Support:
- sequencing
- parallelism
- proof gates
- conditional branching
- failure routing

```aicl
flow BuildPipeline {
  plan_agent ->
  (design_agent || code_agent) ->
  [proof: design.consistent_with(code)] ->
  verifier ->
  [if tests_pass: deployer | else: escalate_to_haig]
}
```

### 12.2 Semantics
- `->` sequence
- `||` parallel execution
- `[proof: ...]` proof gate
- `[if ... : A | else: B]` conditional routing

---

## 13. Agents

### 13.1 Agent Declaration
```aicl
agent SupportExecutor {
  goal: ExecuteRefund
  capabilities: [Payments.Refund]
  coordination: PACT
}
```

### 13.2 Autonomy
Autonomy is multi-dimensional, not scalar.

```aicl
autonomy {
  action: 0.8
  goal: 0.0
  resource: 0.3
  delegation: false
}
```

Dimensions:
- **action** — freedom to choose methods
- **goal** — freedom to alter goals
- **resource** — freedom to allocate/request budget
- **delegation** — freedom to spawn or delegate to subagents

Draft machine-readable companion schema:
- [`schemas/agent-capsule.schema.json`](schemas/agent-capsule.schema.json)

### 13.3 OpenClaw-Style Agent Compatibility

AICL can describe local autonomous assistant agents as bounded agent capsules with explicit identity, authority, capabilities, skills, workspaces, and proof obligations. This supports compatibility with OpenClaw-style systems at the semantic coordination layer without requiring official platform integration.

Such agents should be represented through AgentIdentity, SkillContract, DelegationContract, AgentPatch, ProofBundle, and AuthorityPolicy artifacts when their actions affect repository state, external tools, or materialized outputs.

---

## 14. Skills

AICL treats skills as reusable semantic workflow behaviors.

Draft machine-readable companion schema:
- [`schemas/skill-contract.schema.json`](schemas/skill-contract.schema.json)

### 14.1 SkillIntent
```aicl
skill Stitch.ScreenDesign {
  class: design_skill
  inputs: [prompt, screenshot, style_reference]
  outputs: [screen_graph, style_tokens, component_map]
  constraints: [responsive, a11y_aa]
}
```

### 14.2 SkillPack
```aicl
skillpack AgentApp.Build {
  includes: [
    Claude.Plan,
    Gemini.Design,
    Codex.Implement,
    Claude.Verify,
    Deployer.Release
  ]
}
```

### 14.3 SkillRoute
```aicl
route BuildFlow {
  use Claude.Plan when task in [architecture, constraints]
  use Gemini.Design when task in [screens, layout]
  use Codex.Implement when task in [repo_changes, tests]
  use Claude.Verify when task in [proofs, compliance]
}
```

### 14.4 SkillContract
```aicl
skillcontract Codex.Implement {
  sandbox: {
    filesystem: repo_subset("/app", "/tests")
    network: allow(["registry.npmjs.org"])
    secrets: deny_all
  }
  budgets: {
    max_runtime_min: 20
    max_cost_usd: 0.50
  }
  guarantees: [
    tests_updated,
    reproducible_diff
  ]
}
```

---

## 15. Multimodality

AICL assumes modern systems may operate over more than text.

```aicl
intent SupportAgent {
  observes: [text, image, audio, screen_recording, ui_state]
  goal: ResolveCustomerIssue
  constraints: [privacy_minimal, latency.p95_ms <= 5000]
}
```

Recommended semantic constructs:
- ModalIntent
- ToolIntent
- WorkspaceIntent
- DelegateIntent
- MemoryIntent

---

## 16. Memory and Workspaces

### 16.1 Memory
```aicl
memory Project {
  persistence: long_term
  scope: repo + constitution + prior_proofs
}

memory Session {
  persistence: ephemeral
  scope: current_user_task
}
```

### 16.2 Workspace
```aicl
workspace BuildSandbox {
  filesystem: repo_subset("/app", "/tests")
  network: allow(["api.example.com"])
  persistence: resumable
  max_runtime: 20m
}
```

---

## 17. ICC Schema

The ICC is the root of trust and must be machine-checkable.

Draft machine-readable companion schema:
- [`schemas/icc.schema.json`](schemas/icc.schema.json)

Conceptual schema:
```aicl
icc {
  version: "1.0"
  timestamp: ISO8601
  originator: "human" | "agent"
  goals: [StateAnchorRef]
  non_goals: [StateAnchorRef]
  constraints: [ConstraintNode]
  risk_accepted: [ContradictionRecord]
  wkg_snapshot_hash: Hash
  wkg_anchors: [WKGNodeRef]
  signature: CryptographicHash
  expires: ISO8601 | never
}
```

All identifier resolution for a compilation pass must use the pinned snapshot recorded in `wkg_snapshot_hash`. This is the provenance link between the ICC and the WKG snapshot used for semantic resolution.

---

## 18. Serious Demonstration Example

### Enterprise Service Resolution Platform

Reference example file:
- [`../examples/enterprise-service-resolution/README.md`](../examples/enterprise-service-resolution/README.md)

AICL’s reference demonstration should not center entertainment or games.  
The serious demo should show how AICL expresses a cross-platform, policy-aware, multimodal system with human and AI collaboration.

#### Problem class
Resolve customer support and service issues across web, mobile, desktop, backend, and agent workflows while respecting policy, budgets, and proof obligations.

#### Example
```aicl
app "EnterpriseServiceResolution" {
  import module Support.CoreWorkflow
  import capabilitypack CRM_Billing_Core
  import policypack GDPR_POPIA_Minimal
  import targetpack Web.Vercel
  import targetpack Android.Compose
  import targetpack Windows.WinUI

  goal CaseResolved
  maintain PolicyCompliant
  maintain AuditTraceAvailable
  avoid DataLeak
  avoid UnauthorizedRefund

  budget {
    cost.usd_per_session <= 0.03
    latency.p95_ms <= 250
    memory.mb <= 256
  }

  agent Triage {
    goal: ClassifyIncomingCase
    capabilities: [CRM.Read, LLM.Classify]
    coordination: PACT
    autonomy {
      action: 0.8
      goal: 0.0
      resource: 0.2
      delegation: false
    }
  }

  agent PolicyCheck {
    goal: ValidateEligibility
    capabilities: [PolicyEngine.Read, Billing.Read]
    coordination: PACT
    autonomy {
      action: 0.5
      goal: 0.0
      resource: 0.1
      delegation: false
    }
  }

  agent Executor {
    goal: ResolveCase
    capabilities: [Payments.Refund, StoreCredit.Issue, Case.Close]
    coordination: PACT
    autonomy {
      action: 0.6
      goal: 0.0
      resource: 0.2
      delegation: false
    }
  }

  flow ResolutionFlow {
    Triage ->
    PolicyCheck ->
    [if eligibility_passes: Executor | else: escalate_to_human]
  }
}
```

This demo better represents AICL’s research ambition:
- cross-platform
- capability-bounded
- policy-aware
- multimodal-ready
- agent-coordinated
- commercially relevant
- academically serious

---

## 19. Implementation Notes

This manual defines the programming-facing model.  
It does not yet define the final parser, theorem library, or tensor wire format.

Open work remains in:
- kernel grammar
- module system
- full skill semantics
- multimodal evidence typing
- runtime adaptation envelope
- WKG governance
