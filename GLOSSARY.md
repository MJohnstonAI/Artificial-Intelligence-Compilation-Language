# AICL Glossary

## Agent

An AI or software actor that can perform bounded work inside an AICL workflow under declared capabilities, policies, constraints, and proof obligations.

## AICL

Artificial Intelligence Compilation Language, an open research project for an AI-native semantic programming language focused on intent, constraints, capabilities, policies, proofs, workflows, and materialized artifacts.

## Capability

A declared permission or ability available to an agent, tool, runtime, or materializer. Capabilities should be bounded and policy-aware rather than assumed as ambient authority.

## Constraint

A condition that limits acceptable plans, artifacts, resources, policies, runtime behavior, or materialization choices.

## EIF

External Integration Format, a proposed boundary artifact for ingesting external evidence or integration data into AICL/WKG workflows. EIF remains a research-stage concept in the repository history.

## ICC

Intent Clarity Certificate, the root-of-trust artifact that records clarified intent, constraints, policies, WKG grounding, proof expectations, and provenance for a compilation pass.

## Materializer

A compiler-stage component that lowers semantic artifacts into target outputs such as code, configuration, tests, documentation, deployment manifests, or platform-specific packages.

## OpaqueIntent

A declared boundary around an external tool, API, model, or service whose internal behavior is not fully visible to the AICL compiler and therefore requires explicit policy and trust handling.

## PACT

Parallel Agent Coordination Topology, a proposed coordination model for bounded multi-agent work within AICL workflows.

## Policy

A normative rule or governance constraint that affects what an AICL artifact, agent, tool, or materializer may do.

## ProofBundle

A grouped set of proof artifacts, proof expectations, or validation records associated with an ICC, SHG, example, target pack, or materialized artifact.

## Proof Gate

A checkpoint in an AICL workflow or SHG that requires a proof, validation result, policy check, or explicit unresolved status before downstream work can proceed.

## Resource

A bounded asset or budget, such as time, compute, memory, money, energy, storage, API calls, or human review capacity.

## SHG

Semantic Hypergraph, the planning and composition layer used to represent dependencies, branching, parallelism, proof gates, contradictions, and adaptation boundaries.

## Skill

A reusable bounded workflow capability for an agent or tool, such as planning, verification, materialization, review, or deployment preparation.

## SkillContract

A declared contract for a skill, including inputs, outputs, dependencies, sandbox assumptions, budgets, guarantees, and trust assumptions.

## TargetPack

A proposed target-specific materialization package that groups constraints, platform requirements, output expectations, and validation needs for a target environment.

## WKG

World Knowledge Graph, the semantic grounding substrate for AICL identifiers, anchors, ontology records, evidence, and contradiction handling.
