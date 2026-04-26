# Adversarial PACT Sandbox Research Track

## Purpose

This track designs a bounded adversarial testbed for PACT coordination.

The sandbox is intended to test whether PACT rules, IFC labels, capability containment, OpaqueIntent boundaries, and provenance requirements survive hostile or malformed multi-agent interactions.

## Status

Later research track.

## Boundary

No sandbox implementation should be started until AICL has parser/validator support or structured SHG fixtures.

The sandbox must not redefine PACT. It should test the canonical or draft PACT specification against adversarial scenarios.

## Candidate Test Cases

- delegated agent requests undeclared capability,
- agent attempts to write shared state without permission,
- PACT message omits evidence references,
- IFC label crosses unattested OpaqueIntent boundary,
- equal-priority policy conflict attempts to avoid HAIG,
- resource budget is exceeded through parallel delegation,
- provenance chain is missing or forged.

## Evaluation Outputs

- adversarial fixture catalog,
- expected pass/fail outcomes,
- validator requirements,
- PACT failure-mode coverage map,
- recommendations for future kernel consideration.
