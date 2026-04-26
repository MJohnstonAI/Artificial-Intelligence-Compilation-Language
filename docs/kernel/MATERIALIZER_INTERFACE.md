# AICL Materializer Interface

**Status:** Kernel v0.1.1 consolidation draft  
**Purpose:** Define the contract between the SHG and target artifact generation.

## 1. Definition

A Materializer is an AICL component that transforms a verified SHG into one or more target artifacts.

Target artifacts may include:

* TypeScript / Next.js projects
* Python services
* Kotlin / Android projects
* Swift / iOS projects
* SQL schemas
* Windows / WinUI projects
* policy bundles
* test suites
* QA reports
* provenance manifests

A materializer is not the semantic authority. It is an emitter.

## 2. Core Rule

Materializers may choose implementation strategy, but they may not alter AICL semantics.

The semantic source of truth is:

```text
ICC + WKGSnapshot + SHG + ProofObligationSet + ROM
```

Target languages are materialization outputs, not the root authority.

## 3. Materializer Input Contract

```text
MaterializerInput ::= {
  icc: ICC
  wkg_snapshot: WKGSnapshot
  shg: SHG
  proof_obligations: ProofObligationSet
  residuals_manifest: ResidualsManifest
  target: MaterializationTarget
  options: MaterializerOptions
}
```

Preconditions:

1. ICC is sealed.
2. WKG snapshot hash matches ICC.
3. SHG is valid.
4. No Tier 1 obligation is failed.
5. ROM is complete.
6. Target platform is declared in the MaterializationPlan.

## 4. Materializer Output Contract

```text
MaterializerOutput ::= {
  target: MaterializationTarget
  artifacts: [ArtifactRecord]
  provenance: MaterializationProvenance
  preserved_semantics: [SemanticPreservationClaim]
  warnings: [MaterializationWarning]
  failures: [MaterializationFailure]
}
```

```text
ArtifactRecord ::= {
  path: String
  artifact_type: SourceCode | Config | Schema | Test | Report | Metadata
  hash: Hash
  embeds_icc_hash: Boolean
  embeds_rom_ref: Boolean
}
```

```text
MaterializationProvenance ::= {
  icc_hash: Hash
  wkg_snapshot_hash: Hash
  shg_hash: Hash
  materializer_id: WKGAnchorRef
  materializer_version: SemVer
  produced_at: ISO8601
  artifact_hashes: [Hash]
}
```

## 5. Semantic Preservation Obligations

A materializer must preserve:

1. declared goals,
2. active policies,
3. capability bounds,
4. resource budgets,
5. proof gate structure,
6. residual runtime obligations,
7. provenance links,
8. OpaqueIntent boundaries,
9. IFC label constraints,
10. HAIG/risk acceptance metadata.

If a target language cannot express a semantic element directly, the materializer must emit one of:

* sidecar metadata
* generated runtime guard
* generated test
* configuration constraint
* explicit warning
* materialization failure

It may not silently drop the semantic element.

## 6. Materializer Failure Modes

```text
MaterializationFailure ::=
  | UnsupportedSHGNodeKind
  | UnsupportedHyperedgeKind
  | UnsupportedPolicyPredicate
  | UnsupportedCapabilityEffect
  | CannotPreserveIFCLabel
  | CannotAttachROM
  | CannotEmbedProvenance
  | TargetPlatformMissingPrimitive
  | UnsafeSemanticDrop
```

`UnsafeSemanticDrop` is a materialization error. Artifact production must fail unless explicitly approved through HAIG as research-only or non-production risk.

## 7. Materializer and AI-Generated Code

A materializer may call an AI model to generate code, but the generated code must be checked against the SHG and proof obligations.

AI generation is an implementation technique, not a proof mechanism.

Rules:

1. AI-generated code must not introduce undeclared capabilities.
2. AI-generated code must not bypass OpaqueIntent boundaries.
3. AI-generated code must not omit ROM hooks.
4. AI-generated code must be traceable to SHG nodes/hyperedges.
5. AI-generated code must be rejected if it violates Tier 1 obligations.

## 8. Kernel v0.1.1 Decision

For Kernel v0.1.1:

> A Materializer is a semantics-preserving emitter from verified SHG to target artifacts. It may choose implementation details, but it must preserve ICC, WKG grounding, proof obligations, policies, capability bounds, ROM, and provenance.
