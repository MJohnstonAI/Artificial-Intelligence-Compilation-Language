# AICL Research Tracks

This directory contains experimental research-track proposals for AICL.

These documents are **not part of the canonical Kernel v0.1.1 contract layer**. They exist to explore future capabilities, identify risks, and define bounded experiments before any proposal is considered for kernel adoption.

The canonical kernel remains:

- [`../kernel/`](../kernel/)

Detailed kernel semantic support remains:

- [`../kernel/semantic/`](../kernel/semantic/)

## Purpose

The research track protects the kernel from scope explosion.

Advanced ideas may be important, but they must first be tested as separate research proposals, evaluation plans, or sandbox designs before they can modify the canonical language.

## Current Research Tracks

### 1. SHG-TENSOR

Location:

- [`shg-tensor/`](shg-tensor/)

Purpose:

Define and evaluate a compact machine-native wire format for the Semantic Hypergraph.

Status:

Immediate research priority.

Boundary:

The logical SHG remains canonical. SHG-TENSOR is an experimental serialization and benchmarking target.

### 2. Machine Autonomy / MachineICC

Location:

- [`machine-autonomy/`](machine-autonomy/)

Purpose:

Define a machine-verifiable intent contract for low-risk autonomous compilation paths that do not require HAIG arbitration.

Status:

Immediate research specification.

Boundary:

MachineICC must not bypass Tier 1 proof obligations, WKG grounding, policy constraints, or provenance.

### 3. Neural-Symbolic Bridge

Location:

- [`neural-symbolic-bridge/`](neural-symbolic-bridge/)

Purpose:

Explore whether symbolic SHG structures can project into differentiable or vector-backed representations without weakening the formal kernel.

Status:

Immediate research design, later implementation.

Boundary:

No internal AICL autodiff engine. Any differentiable projection must be one-way and externally validated.

### 4. Adversarial PACT Sandbox

Location:

- [`pact-sandbox/`](pact-sandbox/)

Purpose:

Design a bounded testbed for red-team validation of PACT, IFC, capability containment, and OpaqueIntent boundaries.

Status:

Later.

Boundary:

Requires parser/validator or structured SHG fixtures before implementation.

### 5. Meta-Circularity

Location:

- [`meta-circularity/`](meta-circularity/)

Purpose:

Explore whether AICL grammar and type rules can eventually be represented as WKG-governed objects.

Status:

Speculative.

Boundary:

No self-modifying grammar or kernel mutation is permitted in the canonical branch without termination, safety, and semantic-stability proofs.

### 6. Rejected Proposals

Location:

- [`rejected/`](rejected/)

Purpose:

Record ideas that are out of scope so they do not repeatedly re-enter the design process.

## Adoption Rule

A research-track proposal may move toward kernel consideration only if it provides:

1. a precise problem statement,
2. a bounded scope,
3. a proposed interface to the existing kernel,
4. failure modes,
5. proof or evaluation criteria,
6. no unresolved conflict with Kernel v0.1.1,
7. a migration path that preserves AI-native intent.

Until then, it remains research only.
