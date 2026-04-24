# AICL for OpenClaw-Style Autonomous Agent Systems

## Compatibility Statement

AICL is designed to support OpenClaw-style autonomous agent systems by giving agents a typed, proof-aware coordination layer for intent, delegation, capability control, and artifact generation.

This is semantic and workflow compatibility guidance. It is not a claim of official platform integration, certification, endorsement, or direct runtime support.

## Why autonomous agents need AICL

Autonomous agents can plan, delegate, call tools, edit files, and propose artifacts. Without a shared semantic layer, those actions can be difficult to audit, constrain, or prove. AICL gives those actions explicit forms that can be reviewed by humans and processed by future tooling.

## The agentic gap AICL fills

AICL separates identity, authority, capabilities, skills, workflows, proof obligations, and materialized artifacts. This separation helps prevent task wording from being mistaken for permission and helps agents carry proof context with the artifacts they propose.

## How AICL maps to OpenClaw-style systems

| OpenClaw-style concern | AICL construct |
|---|---|
| User or agent intent | ICC / AgentProjectIntent |
| Local agent identity | AgentIdentity |
| Tool use | Capability / OpaqueIntent |
| Skill execution | SkillContract |
| Agent delegation | DelegationContract |
| Multi-agent plan | SHG |
| Patch proposal | AgentPatch |
| Safety verification | ProofBundle |
| Publishing boundary | AuthorityPolicy |
| Runtime adjustment | Bounded Adaptive Runtime / EIF |

## Example: agent-initiated project

An OpenClaw-style local assistant can initiate a project by emitting an `AgentProjectIntent` grounded in an ICC. The intent records goals, non-goals, policy constraints, authority thresholds, and expected target artifacts before any file changes occur.

## Example: delegated implementation

A planner agent can delegate validation to a verifier through a `DelegationContract`. The contract states the task, allowed effects, forbidden effects, proof gates, required outputs, authority ceiling, and rollback expectations.

## Example: proof-gated patch

An implementation agent can propose an `AgentPatch` that lists affected artifacts, SHG nodes, risk class, required reproof, and rollback plan. A `ProofBundle` then travels with the patch so reviewers can inspect validation evidence before applying or publishing.

## Safe claim language

AICL is designed to support OpenClaw-style autonomous agent systems by giving agents a typed, proof-aware coordination layer for intent, delegation, capability control, and artifact generation.

Use phrasing such as:

- OpenClaw-style autonomous agent systems
- semantic and workflow compatibility
- local autonomous agent coordination
- structured agent intent, delegation, proof, and artifact contracts

## Unsafe claim language

Do not say:

- AICL is officially integrated with OpenClaw.
- AICL is certified by OpenClaw.
- OpenClaw requires AICL.
- AICL guarantees agent safety in all contexts.
- AICL provides direct runtime support for OpenClaw.

## Future integration work

Future work may define runtime adapters, MCP-style bridges, local-agent workspace policies, signed proof-bundle exchange, and reference validators. Those are future possibilities, not claims made by this compatibility guidance.
