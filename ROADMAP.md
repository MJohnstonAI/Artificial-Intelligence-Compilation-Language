# AICL Roadmap

This roadmap describes a buildable research path. It does not claim timelines or production readiness.

## Phase 1 — Specification consolidation

Goal: Consolidate the core language documents into a coherent public specification set.

Expected artifacts:

- reconciled reference manual
- current architecture snapshot
- canonical read order
- explicit open-problem register

Not-yet-in-scope:

- production compiler
- stable runtime
- certification program

## Phase 2 — Schema and example validation

Goal: Align schemas, examples, WKG records, and proof-bundle expectations so reviewers can test the documents mechanically.

Expected artifacts:

- JSON schema validation
- example consistency checks
- ICC and skill-contract fixture validation
- contradiction-test fixtures

Not-yet-in-scope:

- full semantic proof checker
- package manager
- official IDE tooling

## Phase 3 — Validator CLI

Goal: Build a small command-line validator for repository artifacts.

Expected artifacts:

- JSON validation command
- schema validation command
- proof-gate consistency checks
- forbidden-claim and repository hygiene checks

Not-yet-in-scope:

- source-to-target compilation
- runtime execution
- platform deployment

## Phase 4 — Reference compiler skeleton

Goal: Create a minimal compiler skeleton that models the AICL pipeline without claiming production completeness.

Expected artifacts:

- parser or loader for canonical artifacts
- ICC ingestion
- WKG snapshot binding stub
- SHG construction stub
- proof-obligation registry

Not-yet-in-scope:

- optimized code generation
- certified proof checking
- production runtime

## Phase 5 — Target materializer stubs

Goal: Demonstrate how semantic artifacts could be lowered into target-specific outputs.

Expected artifacts:

- materializer interface
- sample target-pack definitions
- stub outputs for at least one conventional target
- provenance report format

Not-yet-in-scope:

- production-ready app generation
- platform store deployment
- broad target coverage

## Phase 6 — Agentic compatibility layer

Goal: Define how AICL artifacts can guide bounded agent workflows without granting unconstrained authority.

Expected artifacts:

- skill contract examples
- agent capsule examples
- capability-boundary checks
- workflow routing semantics

Not-yet-in-scope:

- autonomous-agent safety guarantees
- external platform certification
- unattended production operation

## Phase 7 — Conformance and research evaluation

Goal: Establish repeatable public evaluation methods for AICL specifications, schemas, examples, and early tools.

Expected artifacts:

- conformance test suite draft
- contradiction-report process
- AI-model evaluation process
- research review checklist

Not-yet-in-scope:

- standards-body certification
- production compliance claims
- safety-critical approval
