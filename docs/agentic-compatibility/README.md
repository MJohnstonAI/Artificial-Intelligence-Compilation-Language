# Agentic Compatibility

## What this folder is for

This folder explains how AICL can be used as a semantic coordination layer for autonomous agent systems. It focuses on contracts, authority boundaries, proof gates, patch proposals, and materialization constraints rather than runtime adapter code.

## Why AICL matters for autonomous agents

Autonomous agents need more than task text. They need structured ways to represent what was requested, who is acting, what authority they hold, what they may delegate, what tools they may call, what proofs are required, and what artifacts may be changed or materialized.

## OpenClaw-style systems

AICL is compatible with OpenClaw-style systems at the semantic and workflow layer: it can describe what an autonomous agent is allowed to initiate, delegate, modify, prove, and materialize.

This folder does not claim official OpenClaw integration, endorsement, or certification.

## What AICL provides

- project intent
- agent identity
- delegation
- capability boundaries
- skill contracts
- proof gates
- patch proposals
- audit trails
- materialization targets

## What AICL does not claim

AICL does not claim official integration with external agent platforms. It does not claim certification, endorsement, universal runtime compatibility, or guaranteed safety for autonomous agents in all contexts.

## Start here

- [`OPENCLAW_STYLE_AGENT_COMPATIBILITY.md`](OPENCLAW_STYLE_AGENT_COMPATIBILITY.md) explains the compatibility model.
- [`AGENTIC_COMPATIBILITY_MATRIX.md`](AGENTIC_COMPATIBILITY_MATRIX.md) maps AICL constructs to agentic needs.
- [`TRUST_BOUNDARIES.md`](TRUST_BOUNDARIES.md) defines authority and trust boundaries for local autonomous agents.
