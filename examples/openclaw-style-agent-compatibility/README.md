# OpenClaw-Style Agent Compatibility Example

## Purpose

This example demonstrates AICL compatibility with OpenClaw-style autonomous agent systems at the semantic coordination layer. It does not claim official OpenClaw integration.

## Scenario

A local autonomous assistant proposes adding a StudyPath example to the AICL repository. It delegates schema validation to a verifier agent and requires proof gates before a documentation patch can be applied.

## Agents

- `agent://openclaw-style/local-initiator` proposes the patch and holds R2 authority.
- `agent://aicl/verifier` checks the proposed artifacts and emits a proof bundle under R2 authority.

## Delegation flow

The local initiator creates a `DelegationContract` that allows read-only repository inspection, schema validation, and Markdown link checking. The verifier is explicitly forbidden from writing files, reading secrets, using unapproved network access, or publishing.

## Proof gates

- JSON valid
- Markdown links valid
- no official OpenClaw claim
- no private product reference
- authority ceiling respected
- no forbidden effects requested

## Authority boundaries

The example keeps both agents below R3. R4 and R5 are disabled, human approval is required above R3, self-escalation is forbidden, and delegation cannot exceed the delegator's authority.

## Files

- [`agent-identity.example.json`](agent-identity.example.json)
- [`delegation-contract.example.json`](delegation-contract.example.json)
- [`agent-patch.example.json`](agent-patch.example.json)
- [`proof-bundle.example.json`](proof-bundle.example.json)
- [`authority-policy.example.json`](authority-policy.example.json)

## What this example proves

It shows how AICL can represent local agent identity, bounded delegation, proof-gated patch proposals, and authority policy for an OpenClaw-style workflow.

## What it does not prove

It does not prove official platform integration, runtime adapter behavior, universal agent safety, or production deployment readiness.
