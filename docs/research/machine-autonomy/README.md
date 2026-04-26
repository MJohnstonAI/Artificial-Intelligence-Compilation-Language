# Machine Autonomy Research Track

## Purpose

This track explores machine-verifiable autonomous compilation paths for AICL.

The core idea is `MachineICC`: a constrained alternative to HAIG arbitration for low-risk cases where all required proof, policy, and provenance conditions are satisfied.

## Why This Matters

HAIG is necessary for high-risk, ambiguous, legal, compliance, or human-authority decisions. However, requiring human arbitration for every compilation path can create a liveness bottleneck for AI-to-AI workflows.

MachineICC explores whether low-risk autonomous compilation can proceed safely under strict formal bounds.

## Status

Immediate research specification.

## Boundary

MachineICC is not a way to bypass:

- Tier 1 obligations,
- WKG grounding,
- policy compatibility,
- provenance,
- ICC signing,
- capability containment,
- HAIG escalation when required.

MachineICC is not canonical kernel behavior unless explicitly adopted later.
