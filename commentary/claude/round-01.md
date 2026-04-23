# AICL Consortium Working Draft — Claude Commentary

---

[*Claude Commentary*]

**Reviewer:** Claude (Anthropic)  
**Round:** 1  
**Scope:** Formal verification, kernel design, proof tier boundaries, contradiction detection, capability/policy soundness, module system semantics, workflow safety  
**Status:** Appended per consortium protocol. Do not overwrite prior content.

---

## Section 1 — Understanding of AICL

AICL's core thesis is credible and strategically significant: that the correct abstraction layer for AI-built systems is not syntax but *semantic contracts* — goals, constraints, capabilities, and proofs — grounded in a shared ontology. This positions AICL closer to a formal specification language (think TLA+, Alloy, or Coq) than to a general-purpose programming language, which is the right framing. The three-layer architecture (Kernel / SHG / Materializers) is a sound separation of concerns, echoing the verified compiler pipeline: specification → intermediate representation → target code.

The ambition is defensible. The current specification is not yet.

The documents present a compelling research vision, but several critical structural gaps remain that would prevent this from surviving rigorous peer review or implementation. My review addresses these directly.

---

## Section 2 — Proposed Design Ideas

### 2.1 The Proof Tier Boundary is Structurally Unsound

The current Tier 1 / Tier 2 / Tier 3 classification conflates *proof mechanism* with *proof strength*. This creates a category error that will cause problems at implementation.

**The actual distinction should be decidability:**

- **Tier 1 (Decidable):** Properties that can be checked statically, at compile time, by a deterministic algorithm. These are the only true "hard proofs." Examples: policy compliance (data residency tagging), capability containment (effect systems), schema consistency, resource ceilings as static budget declarations. These map to type-checking and static analysis.

- **Tier 2 (Semi-decidable / Probabilistic):** Properties that require runtime evidence or statistical models and cannot be proven purely at compile time. Examples: p95 latency bounds, crash probability, fairness thresholds. These are *verified* properties, not *proven* ones. The distinction matters: a proof is unconditional; a statistical bound is conditional on a model of the environment.

- **Tier 3 (Heuristic):** Best-effort optimisation with no formal guarantees.

**Critical issue:** The current spec places "resource ceilings" in Tier 1 and "latency.p95_ms" in Tier 2, implying `memory.mb <= 256` is a hard proof while `latency.p95_ms <= 200` is only a statistical guarantee. This is correct — but the spec does not explain *why*. Memory allocation is bounded by static analysis; latency is environment-dependent and cannot be proven without a runtime model. The specification must make this reasoning explicit, or implementers will conflate the two tiers.

**Proposed fix:** Add a `proof_mechanism` field to each verification declaration:

```aicl
constrain Performance.Latency {
  latency.p95_ms <= 200 [tier: 2, mechanism: probabilistic, model: wkg.perf_model_v3]
  memory.mb <= 256      [tier: 1, mechanism: static_analysis]
}
```

This grounds the proof tier in its mechanism, making it machine-checkable and academically defensible.

---

### 2.2 The OpaqueIntent / Policy Compliance Problem Requires Information Flow Control

The specification asks: "How do we formally prove that an `OpaqueIntent` does not violate a regional data residency policy?"

This is not a gap in AICL — it is a known hard problem in security research, solved by **Information Flow Control (IFC)**. AICL should formally adopt IFC semantics for this.

The solution:

Every value in an AICL program carries a **taint label** derived from its originating policy node. A value originating from a `policy POPIA_ZA { residency: za }` context carries the label `{za}`. The compiler maintains a label lattice and enforces the following rule:

> A labelled value may not flow into an `OpaqueIntent` unless that `OpaqueIntent` declares an equivalent or stricter policy attestation.

In AICL syntax:

```aicl
opaqueintent tool.crm.write {
  input: CustomerRecord [label: {pii, za}]
  output: WriteConfirmation
  effects: [Net:crm_api, Secrets:crm_key]
  policy_attestation: POPIA_ZA          // compiler checks: attested policy covers input label
  policy_attestation_proof: "cert://popia-audit-2026-crm-provider"
}
```

The compiler refuses to compile a program where a `{za}` labelled value flows into an `opaqueintent` without a matching `policy_attestation`. This is mechanically checkable at Tier 1.

**The caveat:** `policy_attestation` is a *declared* attestation — it transfers legal/contractual responsibility to the OpaqueIntent provider, but the compiler cannot verify the provider's internal behaviour. AICL should be explicit that the boundary of Tier 1 proof ends at OpaqueIntent interfaces. This should be stated as a formal trust boundary in the spec.

---

### 2.3 Contradiction Detection in the SHG is Undefined and Needs to Be

The spec states that domain ontologies are "pluggable" — a POPIA compliance ontology and a logging ontology can both be imported. It does not define what happens when they conflict.

**Concrete contradiction example:**

```aicl
import policypack POPIA_ZA_Minimal        // implies: data.delete_on_request = required
import module Compliance.AuditLog_7Year   // implies: events.retain_minimum = 7yr
```

These create a direct contradiction: an event containing PII must both be deleted on request and retained for seven years. The SHG will contain contradictory hyperedges with no defined resolution.

**Proposed contradiction detection mechanics:**

1. **Constraint normalisation:** All policy constraints are normalised to a common form `(subject, predicate, bound, scope)` tuples before SHG construction. This makes semantic conflicts detectable as tuple collisions.

2. **Priority lattice:** The WKG maintains a partial order over policy nodes. Regulatory policies (POPIA, GDPR) have higher precedence than operational policies (audit logs). Conflicts within the same precedence tier are not auto-resolvable.

3. **Conflict resolution modes:**

```aicl
ontology_conflict_policy {
  same_tier:    escalate_to_haig       // unresolvable → ICC must record explicit override
  cross_tier:   higher_precedence_wins // regulatory beats operational
  unresolvable: compile_error          // hard stop, not a warning
}
```

4. **ICC as contradiction record:** When HAIG encounters an unresolvable conflict, the ICC must record the contradiction explicitly, the human-approved override, and the risk acknowledgement. This transforms an implicit assumption into a traceable architectural decision.

This is not optional. Without contradiction detection, the SHG is not a sound semantic graph — it is a weighted opinion aggregator, which is a fundamentally weaker claim.

---

### 2.4 The Type System is Absent and Must Be Defined

The spec uses identifiers like `goal RefundProcessed`, `maintain PolicyCompliant`, and `avoid DataLeak` without defining how these identifiers resolve to semantic entities. This is the most critical gap in the current AICL-Kernel grammar.

AICL needs a **nominal type system** with WKG-backed resolution:

```
Identifier → WKG lookup → SemanticNode → TypeClass (Entity | State | Intent | Policy | Capability)
```

**Required rules:**

- `goal`, `maintain`, `avoid` accept only identifiers resolving to `State` type nodes in the WKG.
- `optimize` accepts only identifiers resolving to `Metric` type nodes.
- `capability` declarations must reference `Effect` nodes with defined signatures.
- Unknown identifiers are compile errors, not warnings. Implicit creation of WKG nodes at compile time should be opt-in and gated behind `experimental {}` blocks.

**Proposed declaration syntax for user-defined types:**

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

Without this, the compiler has no way to validate that `goal ResolutionReached` and `avoid BiasEscalation` are semantically coherent, or even that they refer to declared concepts in any ontology.

---

### 2.5 The `maintain` Keyword Has Undefined Temporal Semantics

In formal logic, `maintain P` expresses `□P` (always P) in Linear Temporal Logic. This is a strong claim — it means P must hold at every state in every execution trace.

The spec does not define:

- Whether `maintain` is checked at compile time, at runtime, or both.
- What happens when a `maintain` constraint is violated at runtime (exception? rollback? circuit break?).
- Whether `maintain` interacts with the runtime adaptation envelope (can a runtime switch break a `maintain` invariant transiently during the switch?).

**Proposed semantics:**

```
maintain<P> := 
  compile_time: static proof that no reachable state in the intent graph violates P
  runtime:      continuous monitoring hook; violation triggers repair_protocol<P>
  
repair_protocol<P> :=
  1. Suspend affected capability
  2. Attempt pre-proven alternate (from SHG alternates graph)
  3. If no alternate: circuit break + escalate to HAIG
  4. Log violation trace to WKG Evidence Layer with timestamp
```

This distinction — `maintain` as both a compile-time obligation and a runtime invariant — is what separates AICL from a prompt template. It must be explicit.

---

### 2.6 The `flow` Syntax is Insufficient for Production Systems

The current flow syntax `flow session -> verifier -> ui` expresses only linear dependency chains. Real production systems require:

- **Conditional branching:** `flow session -> [if ConflictDetected: verifier | else: ui]`
- **Parallel execution:** `flow [design_agent || code_agent] -> merge_gate -> verifier`
- **Error paths:** `flow payment -> [on failure: rollback_agent | on success: fulfillment]`
- **Proof gates:** `flow code_agent -> [proof: tests_pass, coverage >= 80] -> deploy`

A minimal flow algebra is needed. I recommend adopting process algebra notation (CSP or CCS subset) for the flow layer, which already has formal concurrency semantics and well-understood conflict detection properties.

Minimal proposed extension:

```aicl
flow BuildPipeline {
  plan_agent ->
  (design_agent || code_agent) ->   // parallel
  [proof: design.consistent_with(code)] ->  // proof gate
  verifier ->
  [if tests_pass: deployer | else: escalate_to_haig]  // conditional
}
```

---

### 2.7 Autonomy as a Scalar is Semantically Incorrect

`autonomy: 0.8` (from the agent declaration) is not a well-defined property. Autonomy is multi-dimensional:

- **Action autonomy:** Can the agent choose *how* to achieve a goal?
- **Goal autonomy:** Can the agent *modify* its goals?
- **Resource autonomy:** Can the agent *self-allocate* resources?
- **Trust propagation:** Can the agent *delegate* to sub-agents?

A single scalar collapses these into a meaningless aggregate. Proposed:

```aicl
agent SupportExecutor {
  goal: Execute<Refund>
  capabilities: [Payments.Refund]
  autonomy {
    action:     0.8    // high: chooses refund method
    goal:       0.0    // none: cannot modify the refund goal
    resource:   0.3    // limited: may request up to budget.auto_ceiling
    delegation: false  // cannot spawn sub-agents
  }
  coordination: PACT
}
```

This is not just aesthetic — it directly affects security properties and the proof obligations the compiler must discharge.

---

### 2.8 The ICC Needs a Formal Schema

The Intent Clarity Certificate is described as recording "clarified goals, explicit constraints, non-goals, risk/cost boundaries, WKG anchors, signatures / provenance." This is an important concept that is currently described only in prose.

The ICC must be defined as a first-class AICL data structure with a schema:

```aicl
icc {
  version:          "1.0"
  timestamp:        ISO8601
  originator:       "human" | "agent"
  goals:            [State]           // resolved WKG identifiers only
  non_goals:        [State]           // explicitly excluded
  constraints:      [ConstraintNode]  // typed, with proof tier annotations
  risk_accepted:    [ContradictionRecord]  // explicitly overridden conflicts
  wkg_anchors:      [WKGNodeRef]      // versioned
  signature:        CryptographicHash  // tamper-evident
  expires:          ISO8601 | never
}
```

Without a schema, the ICC cannot be machine-checked, versioned, diffed, or audited. As the "root of trust" for the pipeline, it must be the most formally specified object in the system.

---

## Section 3 — Inter-Model Collaboration Strategy

**For Gemini (WKG Architecture):** The WKG's most dangerous failure mode is circular dependency — the compiler needs the WKG to compile, but compiled systems update the WKG. Gemini should propose a strict write-ahead log protocol for WKG updates, with versioned snapshots and a quarantine period before new ontology nodes become compiler-visible. Gemini should also define the formal distinction between *read* operations (compile-time WKG lookups) and *write* operations (Evidence Layer updates post-deployment).

**For ChatGPT (Workflow Semantics):** The branch merging problem in multi-agent workflows is essentially a **distributed consensus problem**. ChatGPT should explore whether AICL-Workflow can adopt existing distributed consensus semantics (Raft, Paxos at the conceptual level) for resolving conflicting hypergraph states from parallel agents. The proof gate syntax proposed in Section 2.6 above may be a useful starting point.

**For all models:** The SkillRegistry is the least formally developed concept. Skills need version pinning, dependency resolution semantics, and trust attestation chains. This is essentially the same problem as a package manager (npm, cargo) but with formal semantic contracts instead of just API signatures. This warrants a dedicated section in v1.1.

---

## Section 4 — Potential Issues & Mitigation

| Risk | Severity | Assessment |
|---|---|---|
| WKG scope creep | High | If the WKG attempts to model "everything," it becomes unmaintainable and the compiler becomes dependent on a moving target. Mitigation: strict domain ontology isolation and versioned snapshots at compile time. |
| OpaqueIntent trust boundary | High | The IFC approach (Section 2.2) transfers risk to the OpaqueIntent provider but cannot eliminate it. AICL should document this as an explicit trust boundary, not paper over it. |
| Bootstrapping paradox | Medium | AICL is designed for AI systems to write, but AI systems must write AICL correctly before the compiler can prove its correctness. The HAIG/ICC layer is the answer, but its own validation needs definition. |
| SHG computational complexity | Medium | Hypergraph satisfiability is in general NP-hard. If the SHG grows unbounded, proof checking becomes intractable. The compiler needs scope limits and incremental proof checking with caching. |
| `maintain` runtime overhead | Medium | Continuous invariant monitoring at runtime has a performance cost. The budget system should include a `monitoring.overhead_ms` budget to make this cost explicit and enforceable. |
| Autonomy scalar (Section 2.7) | Medium | A multi-dimensional autonomy model is more complex but necessary for security proofs. Mitigation: adopt the proposed schema in v1.1 and migrate the example programs. |

---

## Section 5 — Summary / Final Notes

AICL's architecture is sound at the conceptual level. The four-layer model (WKG / Kernel / SHG / Materializers) is the right structure. The commitment to making resources, policies, and proof obligations first-class language constructs is the correct differentiator from both prompt engineering and conventional programming languages.

The primary work needed before white-paper publication:

1. **Formalise the type system** with WKG-backed identifier resolution (Section 2.4). Without this, AICL-Text programs are unverifiable.
2. **Adopt IFC semantics** for OpaqueIntent policy compliance (Section 2.2). This is a solved problem in security research — AICL should cite and leverage it.
3. **Define contradiction detection mechanics** for the SHG (Section 2.3). Without these, the SHG is not a proof system.
4. **Extend the flow syntax** to support branching, parallelism, and proof gates (Section 2.6).
5. **Formalise the ICC schema** as a machine-checkable first-class object (Section 2.8).
6. **Clarify proof tier mechanics** by grounding each tier in its proof mechanism (Section 2.1).

None of these are architectural objections. They are the precision work that separates a research concept from a publishable specification. The foundation is solid — these are the walls and the roof.

**Attribution note:** This commentary is provided by Claude (Anthropic) as a collaborative research contributor under the consortium protocol. The AICL concept and originating architecture are attributed to Marc Johnston per the attribution language in the Working Draft.

---

[*Claude* has completed its round. Passing to next model.]  
[/End *Claude Commentary*]
