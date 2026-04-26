# AICL HAIG Specification

**Status:** Kernel v0.1.1 consolidation draft  
**Purpose:** Define HAIG so policy conflicts and unresolved semantic decisions do not point to an undefined escalation target.

## 1. Definition

HAIG means **Human-AI Integration Gate**.

HAIG is a controlled arbitration mechanism used when AICL encounters a decision that cannot be resolved purely by static kernel rules, WKG authority, or proof-tier mechanics.

HAIG is not a general human override. It is a bounded gate that produces a signed decision record.

## 2. HAIG Inputs

```text
HAIGRequest ::= {
  id: HAIGRequestId
  icc_hash: Hash
  wkg_snapshot_hash: Hash
  request_type: HAIGRequestType
  triggering_stage: CompilationStage
  subject_refs: [KernelEntityRef | SHGNodeId | SHGHyperedgeId]
  conflict_record: ContradictionRecord | null
  options: [HAIGOption]
  recommended_option: HAIGOptionId | null
  model_assessments: [ModelAssessment]
  required_authority: AuthorityClass
  deadline: ISO8601 | null
}
```

```text
HAIGRequestType ::=
  | EqualPriorityPolicyConflict
  | OntologyConflict
  | RiskAcceptance
  | TierDowngradeRequest
  | AmbiguousIntent
  | MaterializationChoice
  | RuntimeEscalation
```

## 3. HAIG Outputs

```text
HAIGDecision ::= {
  id: HAIGDecisionId
  request_id: HAIGRequestId
  decision: HAIGDecisionKind
  selected_option: HAIGOptionId | null
  rationale: String
  constraints_added: [ConstraintNode]
  policies_added: [PolicyRef]
  risk_accepted_entry: RiskAcceptedRecord | null
  expiry: ISO8601 | "never"
  approver: ApproverRecord
  signature: CryptographicSignature
}
```

```text
HAIGDecisionKind ::=
  | AcceptOption
  | RejectCompilation
  | RequireClarification
  | AcceptRiskForResearch
  | AcceptRiskForProduction
  | DeferToHigherAuthority
```

## 4. Authority Classes

```text
AuthorityClass ::=
  | CompilerOnly
  | AIReview
  | HumanReviewer
  | ProjectOwner
  | LegalOrCompliance
  | ProductionApprover
```

Authority must match the risk class of the decision.

## 5. HAIG and Risk Acceptance

```text
RiskAcceptedRecord ::= {
  id: RiskAcceptedId
  contradiction_ref: ContradictionRecordId
  accepted_by: ApproverRecord
  reason: String
  scope: ResearchOnly | NonProduction | Production
  expiry: ISO8601 | "never"
  compensating_controls: [ControlRef]
  signature: CryptographicSignature
}
```

Hard rule:

A Tier 1 obligation that is not discharged may not be described as proof-compliant. If HAIG accepts the risk, the artifact must be marked:

* `ResearchOnly`
* `NonProduction`
* `ProductionWithAcceptedRisk`

## 6. HAIG in Policy Conflict Resolution

When two policies conflict:

1. If one policy has higher priority, the higher-priority policy wins.
2. If priorities are equal, the compiler emits `HAIGRequest(EqualPriorityPolicyConflict)`.
3. HAIG may select one policy, introduce a narrower scoped policy, reject compilation, request clarification, or record accepted risk.
4. Unresolved HAIG escalation suspends compilation.

## 7. HAIG in Runtime Repair

Runtime repair protocols may include:

```text
escalate_to_haig
```

At runtime, HAIG does not re-run compile-time proof. It decides how to handle a residual runtime violation inside the limits of the ROM.

## 8. HAIG Non-Goals

HAIG is not:

* a way to bypass proof obligations silently
* a replacement for WKG type authority
* a general human preference mechanism
* a conversational approval step with no audit record
* an excuse to treat Tier 2 or Tier 3 as Tier 1

## 9. Kernel v0.1.1 Decision

For Kernel v0.1.1:

> HAIG is a signed arbitration gate for unresolved semantic, policy, risk, or runtime escalation decisions. It emits auditable decision records that either modify the compilation path, reject the artifact, request clarification, or record accepted risk with explicit scope.
