# AICL PACT Coordination Specification

**Status:** Kernel v0.1.1 consolidation draft  
**Purpose:** Define PACT so agent coordination is no longer an undefined field in `Agent` declarations.

## 1. Definition

PACT means **Policy-Aware Coordination Treaty**.

PACT is the coordination protocol used by AICL agents when they exchange commitments, delegate work, share state, request capabilities, or coordinate flow execution.

PACT exists to prevent multi-agent execution from becoming informal message passing.

## 2. PACT Record Schema

```text
PACT ::= {
  id: PACTId
  version: SemVer
  participants: [AgentRef]
  message_types: [PACTMessageType]
  commitments: [PACTCommitmentRule]
  delegation_rules: [DelegationRule]
  shared_state_rules: [SharedStateRule]
  policy_constraints: [PolicyRef]
  failure_modes: [PACTFailureMode]
  audit_requirements: [AuditRequirement]
}
```

## 3. PACT Message Types

```text
PACTMessageType ::=
  | ProposeTask
  | AcceptTask
  | RejectTask
  | RequestEvidence
  | ProvideEvidence
  | RequestCapability
  | GrantCapability
  | DenyCapability
  | DelegateSubtask
  | ReportProgress
  | ReportFailure
  | RequestEscalation
  | CommitResult
```

```text
PACTMessage ::= {
  id: MessageId
  pact_id: PACTId
  sender: AgentRef
  receiver: AgentRef | Broadcast
  type: PACTMessageType
  payload_ref: PayloadRef
  policy_labels: [IFCLabel]
  evidence_refs: [EvidenceRef]
  timestamp: ISO8601
  signature: CryptographicSignature
}
```

## 4. Commitment Semantics

```text
PACTCommitment ::= {
  id: CommitmentId
  agent: AgentRef
  action: CapabilityRef | FlowRef
  preconditions: [StateAnchorRef]
  postconditions: [StateAnchorRef]
  resource_bound: ResourceBudgetRef
  policy_bound: [PolicyRef]
  expiry: ISO8601 | "never"
  failure_action: PACTFailureAction
}
```

A commitment is valid only if:

1. the agent has the required capability,
2. the capability is permitted by active policy,
3. the required resources fit within budget,
4. the agent autonomy profile permits the action,
5. the commitment is represented in the SHG.

## 5. Delegation Rules

```text
DelegationRule ::= {
  from_agent: AgentRef
  to_agent: AgentRef | AgentClass
  permitted: Boolean
  allowed_capabilities: [CapabilityRef]
  max_depth: Integer
  requires_haig: Boolean
}
```

Hard rules:

1. If `Agent.autonomy.delegation = false`, delegation is forbidden.
2. Delegated agents may not gain capabilities not held by the delegating scope.
3. Delegation must preserve all active policy constraints.
4. Delegation must emit provenance.

## 6. Shared State Rules

```text
SharedStateRule ::= {
  state_ref: StateAnchorRef
  permitted_readers: [AgentRef]
  permitted_writers: [AgentRef]
  evidence_required: Boolean
  ifc_labels: [IFCLabel]
}
```

State shared between agents must respect IFC labels.

## 7. Failure Modes

```text
PACTFailureMode ::=
  | AgentTimeout
  | CapabilityDenied
  | EvidenceMissing
  | PolicyViolation
  | ResourceExceeded
  | DelegationForbidden
  | ConflictingCommitments
  | UnreachableAgent
```

```text
PACTFailureAction ::=
  | retry_with_backoff
  | invoke_repair_protocol
  | escalate_to_haig
  | escalate_to_human
  | circuit_break
  | fail_compilation
```

## 8. PACT and SHG

PACT coordination must be represented in the SHG.

```text
AgentA --CoordinatesWith[PACTRef]--> AgentB
AgentA --DelegatesTo[DelegationRule]--> AgentB
PACTCommitment --RequiresPolicy--> PolicyNode
PACTCommitment --ConsumesResource--> ResourceBudgetNode
```

The compiler must generate proof obligations for:

* capability authorization
* delegation depth
* policy compatibility
* resource budget compliance
* evidence requirements
* IFC label flow

## 9. Kernel v0.1.1 Decision

For Kernel v0.1.1:

> PACT is the policy-aware coordination protocol for AICL agents. It defines how agents exchange commitments, delegate work, share state, and handle failures while preserving policy, capability, autonomy, and provenance constraints.
