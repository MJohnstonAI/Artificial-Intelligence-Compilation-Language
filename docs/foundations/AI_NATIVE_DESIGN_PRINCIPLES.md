# AI-Native Design Principles

## 1. Semantic Contract Over Syntax

AICL treats the semantic contract as the authoritative object. Surface syntax may help humans inspect or author projections, but syntax is not the deepest layer of meaning.

Legacy-language trap avoided: Treating the most readable text form as the source of semantic truth.

AICL-native direction: Define canonical contracts, IR, ICC, SHG, WKG grounding, proof obligations, and materialization rules before optimizing surface notation.

## 2. WKG-Grounded Meaning Over Local Naming

Names in source text are not self-authorizing. AICL identifiers must resolve to WKG-backed anchors or explicitly declared provisional experimental anchors before they can carry semantic authority.

Legacy-language trap avoided: Assuming that a local type name, class name, or interface name is enough to define meaning.

AICL-native direction: Bind identifiers to grounded semantic anchors that can participate in type resolution, contradiction checks, proof obligations, and materialization rules.

## 3. Proof Obligations Over Comments

Claims about safety, policy compliance, access control, resource limits, privacy, or correctness must become proof obligations or residual runtime obligations. They should not remain informal comments.

Legacy-language trap avoided: Encoding critical assurances as documentation that tooling cannot evaluate.

AICL-native direction: Attach proof tiers, evidence, thresholds, unresolved states, and runtime monitoring requirements to the artifacts they constrain.

## 4. Capability Containment Over Informal Trust

AICL should model capabilities explicitly. Agents, tools, skills, services, and materializers should receive bounded capabilities rather than being trusted by default.

Legacy-language trap avoided: Treating available APIs, credentials, file systems, or network access as ambient authority.

AICL-native direction: Require capability declarations, policy compatibility checks, provenance links, and containment boundaries for any action that can affect data, users, systems, or deployment state.

## 5. Policy-Bounded Autonomy Over Unconstrained Agency

Autonomy in AICL must be bounded by declared policies, proof obligations, resource budgets, capability limits, and runtime monitoring requirements. Agentic behavior is not a license to ignore constraints.

Legacy-language trap avoided: Describing agents as autonomous without defining what they may not do.

AICL-native direction: Represent autonomy dimensions, adaptation envelopes, escalation paths, and policy gates as first-class semantics.

## 6. Machine-Evaluable Structure Over Human Familiarity

AICL should prefer structures that AI systems and tools can evaluate directly, even when those structures are less familiar than conventional human-first syntax.

Legacy-language trap avoided: Redesigning the language around what resembles Python, Rust, TypeScript, YAML, or a familiar DSL.

AICL-native direction: Use machine-readable contracts, graphs, schemas, certificates, and grounded identifiers as canonical artifacts, with human-readable views generated as needed.

## 7. Residual Runtime Obligations Over False Static Certainty

Some facts cannot be proven at compile time. Live API behavior, deployment-region enforcement, consent state, model uncertainty, service availability, latency, power budgets, and real UI accessibility can depend on runtime conditions.

Legacy-language trap avoided: Claiming static proof for dynamic facts.

AICL-native direction: Carry unresolved or environment-dependent obligations forward in a Residual Obligation Manifest and monitor them at runtime.

## 8. Provenance-First Materialization

Generated artifacts should preserve their origin, source obligations, proof status, target assumptions, and materialization decisions. Provenance is part of the compilation story, not a release note afterthought.

Legacy-language trap avoided: Producing code without a durable record of why it exists, which obligations shaped it, and what evidence supports it.

AICL-native direction: Link generated code, tests, policies, deployment manifests, and reports back to intent contracts, WKG anchors, proof obligations, and residual obligations.

## 9. Multi-Agent Evaluation Over Single-Author Authority

AICL should be evaluated by structured critique from multiple AI models and human reviewers. The goal is to surface contradictions, weak semantics, missing proof obligations, and legacy-language contamination risks.

Legacy-language trap avoided: Treating one authorial narrative or one model review as sufficient authority.

AICL-native direction: Invite structured AI model evaluations, contradiction reports, counterexamples, challenge briefs, and minimal fix proposals.

## 10. AI-Native Evolution Over Legacy-Language Conformity

AICL should evolve toward better semantic compilation for AI systems, not toward resemblance to established human-first languages.

Legacy-language trap avoided: Accepting redesign proposals mainly because they make AICL look more like a conventional programming language.

AICL-native direction: Judge changes by whether they improve grounded meaning, proof obligations, policy/capability semantics, provenance, materialization, and AI-driven verification.
