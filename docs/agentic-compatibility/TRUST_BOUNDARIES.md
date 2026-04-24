# Trust Boundaries for Agentic Systems

## Principle

Autonomous agents should not infer permission from task wording alone. AICL treats identity, authority, capabilities, skills, delegation, proofs, and materialized artifacts as separate semantic concerns.

## Agent identity is not enough

An agent identity says who or what is acting. It does not by itself authorize file writes, tool calls, publishing, spending, secret access, or external side effects.

## Capabilities are not skills

Capabilities describe allowed effects. Skills describe repeatable workflow behavior. An agent may know how to perform a task without having authority to perform it in a specific workspace.

## Skills are not permissions

A skill contract must still declare allowed effects, forbidden effects, sandbox assumptions, proof obligations, and authority requirements. The existence of a skill does not authorize its execution.

## Delegation must be explicit

Delegation should be represented through a `DelegationContract`. Delegation cannot grant more authority than the delegator has, and agents may not escalate their own authority.

## Tool calls are OpaqueIntents

External tools, APIs, shell commands, models, services, and platform operations should be represented as capabilities or OpaqueIntents. Their effects must be visible enough for policy and proof checks.

## Proofs must travel with artifacts

High-risk artifacts should carry proof bundles. A patch, generated schema, materialization target, or release candidate should state what was checked, how it was checked, what passed, and what failure would mean.

## Human approval boundaries

R4 and R5 require human owner approval by default. AICL should make that boundary visible in authority policies and delegation contracts before an agent builds, deploys, publishes, spends money, or changes external state.

## Recommended authority levels

| Level | Meaning |
|---|---|
| R0 | Observe/comment only |
| R1 | Propose intent/spec |
| R2 | Generate local artifacts/spec files |
| R3 | Modify repo/project files |
| R4 | Build/deploy/publish |
| R5 | Spend money/use paid services/change external state |

Rules:

- R4 and R5 require human owner approval by default.
- Agents may not escalate their own authority.
- Delegation cannot grant more authority than the delegator has.
- Tool access must be represented as capabilities or OpaqueIntents.
- Proofs must accompany high-risk artifacts.
