# Operational Semantics

This document defines a high-level compilation lifecycle for AICL. It is not yet a complete formal semantics, but it gives reviewers a state model for identifying gaps and contradictions.

## Compilation Lifecycle

```text
Brief
-> Intent extraction
-> ICC generation
-> WKG grounding
-> SHG construction
-> proof obligation generation
-> proof tier classification
-> materialization planning
-> target code generation
-> QA/provenance reporting
-> runtime monitor/repair loop
```

## Basic State Tuple

```text
S = <I, W, G, P, M, R>
```

Where:

- `I` = intent contract
- `W` = resolved WKG anchors
- `G` = semantic hypergraph
- `P` = proof obligation set
- `M` = materialization target set
- `R` = residual runtime obligations

## Transition: Brief -> Intent Extraction

The input brief is transformed into an intent contract candidate. This transition may use AI models, human review, examples, or templates, but its output must be structured enough to inspect and challenge.

The result updates `I`.

## Transition: Intent Extraction -> ICC Generation

The intent contract is bound into an ICC candidate that records declared goals, constraints, policies, capabilities, resources, provenance, and proof expectations.

The result stabilizes `I` into a certificate-oriented artifact.

## Transition: ICC Generation -> WKG Grounding

Identifiers and semantic claims are resolved to WKG anchors or provisional experimental anchors. Unresolved identifiers must be reported rather than treated as implicitly meaningful.

The result updates `W`.

## Transition: WKG Grounding -> SHG Construction

Grounded intent is expanded into a semantic hypergraph representing dependencies, branches, parallel work, proof gates, contradiction checks, adaptation boundaries, and materialization routes.

The result updates `G`.

## Transition: SHG Construction -> Proof Obligation Generation

The grounded contract and graph generate proof obligations. These obligations should include type, policy, capability, resource, provenance, platform, data-flow, and materialization constraints where relevant.

The result updates `P`.

## Transition: Proof Obligation Generation -> Proof Tier Classification

Each proof obligation is classified as Tier 1, Tier 2, Tier 3, residual, unresolved, or blocked. Tier 3 and probabilistic claims must not silently satisfy Tier 1 obligations.

The result refines `P` and may add entries to `R`.

## Transition: Proof Tier Classification -> Materialization Planning

The system selects target artifacts that are allowed by the grounded intent, policy constraints, capabilities, resource budgets, proof status, and residual obligations.

The result updates `M`.

## Transition: Materialization Planning -> Target Code Generation

Materializers generate target outputs such as Python, TypeScript, Kotlin, Swift, SQL, Rust, deployment manifests, tests, policy reports, and documentation.

The result produces materialized artifacts under the constraints of `I`, `W`, `G`, `P`, `M`, and `R`.

## Transition: Target Code Generation -> QA/Provenance Reporting

Generated artifacts are checked, tested where possible, and linked back to intent, WKG anchors, proof obligations, residual obligations, and materialization decisions.

The result produces reviewable QA and provenance records.

## Transition: QA/Provenance Reporting -> Runtime Monitor/Repair Loop

Residual obligations are monitored at runtime. Repair actions must remain bounded by declared policy, capability, proof, resource, and provenance constraints.

The result updates `R` and may trigger new materialization or review cycles.
