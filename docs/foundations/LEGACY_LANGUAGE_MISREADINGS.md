# Legacy Language Misreadings

This document pre-empts common misunderstandings from reviewers who approach AICL primarily through Python, Rust, TypeScript, Java, C++, Prolog, Haskell, YAML, JSON, or conventional DSL assumptions.

## Misreading 1: "This Is Just a DSL"

Response: AICL may expose DSL-like human projections, but its canonical authority is the semantic contract / IR / ICC / SHG stack, not surface syntax.

A conventional DSL usually optimizes a human-facing notation for a domain. AICL is trying to define the semantic authority layer that AI systems can use to generate, verify, repair, and materialize software.

## Misreading 2: "Python Can Already Do This"

Response: Python can implement tools that participate in an AICL pipeline. It is not itself an AI-native semantic compilation contract language.

Python can host a verifier, parse artifacts, call models, generate code, or run tests. AICL asks for first-class representation of intent, policy, capability, proof tier, provenance, WKG grounding, SHG structure, materialization targets, and residual runtime obligations.

## Misreading 3: "Why Not Just Use YAML/JSON?"

Response: Serialization is not semantics. AICL may serialize artifacts as JSON/YAML, but the semantics come from WKG grounding, type authority, proof obligations, and operational rules.

JSON can carry an object. YAML can carry a document. Neither defines by itself whether a capability is authorized, whether a proof tier is valid, whether an identifier has WKG authority, or whether a runtime obligation remains unresolved.

## Misreading 4: "This Is Just Prompts"

Response: AICL is specifically an attempt to move beyond prompts into typed, grounded, proof-carrying, provenance-linked artifacts.

Prompts may initiate intent extraction or model review, but prompt text should not be the final authority for policy, capability, proof, provenance, or materialization decisions.

## Misreading 5: "This Is Not Readable Enough for Humans"

Response: Human readability is useful, but not the root design objective. Human-facing projections can be generated from canonical AI-native artifacts.

The relevant question is not whether every canonical artifact reads like a familiar programming language. The relevant question is whether AI systems and review tools can evaluate the artifact's intent, constraints, policies, capabilities, proof obligations, provenance, and materialization boundaries.
