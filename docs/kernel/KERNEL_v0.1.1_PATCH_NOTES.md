# AICL Kernel v0.1.1 Patch Notes

**Status:** Consolidation patch  
**Purpose:** Close the critical gaps identified after Kernel v0.1 first-pass formalization.

## 1. Summary

Kernel v0.1 created a first-pass structure for:

* WKG type authority
* core kernel entities
* proof tiers
* compilation state model
* operational semantics
* compile/runtime boundary
* minimal example

Kernel v0.1.1 adds missing definitions for:

1. SHG internal structure
2. HAIG escalation semantics
3. PACT agent coordination
4. Materializer interface

These were the primary blockers to treating the kernel package as internally complete.

## 2. Files Added

```text
docs/kernel/SHG_SCHEMA.md
docs/kernel/HAIG_SPEC.md
docs/kernel/PACT_COORDINATION_SPEC.md
docs/kernel/MATERIALIZER_INTERFACE.md
docs/kernel/KERNEL_v0.1.1_PATCH_NOTES.md
```

## 3. Required Edits to Existing Semantic Files

The supporting documents in `docs/kernel/semantic/` should be treated as the detailed semantic layer.

Update references as follows:

* `AICL_STATE_MODEL.md` should reference `../SHG_SCHEMA.md` for SHG internals.
* `OPERATIONAL_SEMANTICS.md` should reference `../SHG_SCHEMA.md`, `../HAIG_SPEC.md`, and `../MATERIALIZER_INTERFACE.md`.
* `COMPILE_RUNTIME_BOUNDARY.md` should reference `../HAIG_SPEC.md`.
* `PROOF_TIER_SEMANTICS.md` should clarify that Tier 2 evidence cannot make a Tier 1 obligation proof-compliant.
* `AICL_KERNEL_v0.1.md` should state that Kernel v0.1.1 companion documents define SHG, HAIG, PACT, and the materializer interface.

## 4. Tier 1 Risk Rule

A Tier 1 obligation must be discharged at compile time or compilation fails.

If HAIG accepts risk for a failed Tier 1 obligation, the artifact must be marked:

* `ResearchOnly`
* `NonProduction`
* `ProductionWithAcceptedRisk`

It may not be described as proof-compliant.

## 5. Kernel v0.1.1 Status

After applying this patch, the kernel package should be described as:

> AICL Kernel v0.1.1 - draft formal kernel specification suitable for AI-model evaluation and early implementation planning.

It should not yet be described as:

* a finished compiler
* a production language
* proof-complete
* fully materializer-ready
* academically complete

## 6. Remaining Open Work

Kernel v0.1.1 still leaves these legitimate research areas open:

1. full WKG snapshot governance workflow
2. declassification operation for IFC
3. AICL-SHG-TENSOR serialization
4. formal targetpack registry
5. complete PRM integration
6. reference compiler architecture
7. conformance test suite
