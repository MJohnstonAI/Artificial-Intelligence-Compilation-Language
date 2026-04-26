# AICL Roadmap

This roadmap tracks the near-term path from draft research specification to minimal reference implementation.

It is intentionally narrow. AICL has many research possibilities, but the immediate goal is to make the core pipeline reviewable, testable, and eventually executable.

## Phase 1 — Public Review and Contradiction Hardening

Goal:

Collect structured technical feedback before broad promotion.

Deliverables:

- AI-model evaluations
- contradiction reports
- challenge briefs
- broken-link fixes
- terminology cleanup
- public-review notes

Exit criteria:

- no critical README/path issues,
- no unresolved contradiction in kernel contract files,
- issue templates actively used,
- at least one external or independent AI-model evaluation submitted.

## Phase 2 — Machine-Readable Fixtures

Goal:

Define canonical fixtures for examples.

Deliverables:

- ICC fixture for enterprise service resolution example
- SHG fixture for enterprise service resolution example
- proof obligation fixture
- ROM fixture
- WKG snapshot fixture linkage

Exit criteria:

- one complete example can be represented as structured artifacts,
- artifacts link back to kernel and WKG references,
- fixtures are suitable for validator development.

## Phase 3 — Minimal Validator

Goal:

Build a basic validator for static artifact shape.

Deliverables:

- ICC structural validator
- WKG anchor reference validator
- SHG shape validator
- materializer input precondition checker

Exit criteria:

- validator accepts the canonical example fixture,
- validator rejects malformed ICC/SHG fixtures,
- validation errors are readable and actionable.

## Phase 4 — Proof Obligation Classifier

Goal:

Classify obligations into Tier 1, Tier 2, Tier 3, or ROM residuals.

Deliverables:

- proof obligation schema
- tier classification rules
- examples of valid and invalid classification
- ROM residual extraction

Exit criteria:

- example obligations are classified consistently,
- Tier 2 and Tier 3 cannot satisfy Tier 1,
- unresolved runtime obligations are represented in ROM.

## Phase 5 — Materializer Stub

Goal:

Emit a minimal target artifact from a validated SHG fixture.

Deliverables:

- materializer stub
- provenance manifest
- ROM sidecar
- simple generated target output

Exit criteria:

- artifact preserves ICC hash, SHG hash, and ROM reference,
- materializer fails on unsafe semantic drops,
- output is demonstrably traceable to SHG nodes/hyperedges.

## Phase 6 — SHG-TENSOR Evaluation

Goal:

Evaluate whether a compact SHG representation improves machine readability or validation efficiency.

Deliverables:

- candidate encodings
- benchmark fixture
- size/token comparison
- parse reliability comparison
- semantic round-trip check

Exit criteria:

- SHG-TENSOR candidate beats AICL-JSON in at least two defined metrics,
- no semantic loss in round-trip tests,
- results are documented under `docs/research/shg-tensor/`.

## Deferred Work

The following are intentionally deferred until the minimal reference pipeline exists:

- full compiler,
- production runtime,
- distributed WKG consensus,
- neural-symbolic execution,
- autopoietic runtime repair,
- meta-circular grammar mutation,
- external package registry,
- marketplace or ecosystem features.

## Current Priority

The immediate priority is:

```text
Public review → structured fixtures → validator → proof classifier → materializer stub
```
