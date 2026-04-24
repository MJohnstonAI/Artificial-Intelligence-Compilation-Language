# OpenClaw-Style Agentic Compatibility Plan

## Objective

Add a semantic compatibility layer for OpenClaw-style autonomous agent systems so agent users can understand how AICL represents intent, identity, delegation, capability boundaries, proof gates, patch proposals, audit trails, and materialization targets.

## Non-Goals

- No official OpenClaw integration claim.
- No runtime adapter implementation.
- No claim of guaranteed agent safety.
- No private product or game references.

## Target Audience

- OpenClaw-style local autonomous agent users
- AI agent developers
- researchers studying agentic AI
- AICL contributors
- multi-agent workflow designers

## Compatibility Claim Boundaries

Safe claim language:

- AICL is designed to be useful for OpenClaw-style autonomous agent systems at the semantic coordination layer.
- AICL can describe what an autonomous agent is allowed to initiate, delegate, modify, prove, and materialize.
- AICL can provide structured artifacts for intent, delegation, capability control, proof gates, and safe artifact generation.

Unsafe claim language:

- AICL is officially integrated with OpenClaw.
- AICL is certified by OpenClaw.
- OpenClaw requires AICL.
- AICL guarantees agent safety in all contexts.
- AICL is a runtime adapter for OpenClaw.

## Repository Changes

- Add `docs/agentic-compatibility/` for human-readable compatibility guidance.
- Add compact JSON Schemas under `spec/schemas/` for agent identity, delegation contracts, agent patches, proof bundles, and authority policies.
- Add `examples/openclaw-style-agent-compatibility/` with a bounded local-agent delegation example.
- Update `README.md`, `AGENTS.md`, `SKILLS.md`, `AI_CONTRIBUTOR_GUIDE.md`, and `spec/programming-reference-manual.md` with concise compatibility language.

## Validation Steps

- Validate all new JSON examples and schemas as parseable JSON.
- Confirm each new schema declares JSON Schema Draft 2020-12.
- Check Markdown links in the root README and new compatibility docs.
- Search changed files for unsupported official integration, certification, endorsement, guaranteed-safety, and platform-requirement claims.
- Search changed files for private-product references.
- Confirm OpenClaw references use OpenClaw-style compatibility wording.

## Future Work

- Prototype runtime adapters only after the semantic artifacts are stable.
- Explore MCP-style bridges for exchanging agent identity, proof bundles, and authority policy data.
- Define local-agent workspace policies for filesystem, network, secret, and tool boundaries.
- Define signed proof-bundle exchange for high-risk patch and materialization workflows.
