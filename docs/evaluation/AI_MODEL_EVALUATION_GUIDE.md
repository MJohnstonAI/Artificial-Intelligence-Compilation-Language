# AI Model Evaluation Guide

This guide explains how to evaluate AICL using an external AI model.

AICL is an AI-native semantic compilation research project. The preferred review method is to run an advanced AI model against the repository and submit structured findings.

Evaluation outputs are reviewer evidence. They are not canonical kernel law.

## 1. Purpose

The purpose of AI-model evaluation is to identify:

- internal contradictions,
- underspecified concepts,
- broken authority boundaries,
- proof-tier failures,
- compile/runtime boundary confusion,
- SHG schema defects,
- WKG grounding issues,
- MachineICC or research-track risks,
- overclaims,
- legacy-language contamination.

The goal is not to redesign AICL as a conventional human-first programming language.

## 2. Recommended Context Files

Provide the reviewing model with as many of these files as its context window allows.

### Required Minimum

- `README.md`
- `docs/kernel/README.md`
- `docs/kernel/SHG_SCHEMA.md`
- `docs/kernel/HAIG_SPEC.md`
- `docs/kernel/PACT_COORDINATION_SPEC.md`
- `docs/kernel/MATERIALIZER_INTERFACE.md`
- `docs/kernel/KERNEL_v0.1.1_PATCH_NOTES.md`
- `docs/research/README.md`
- `docs/evaluation/MODEL_REVIEW_PROMPT.md`

### Strongly Recommended

- `docs/kernel/semantic/AICL_KERNEL_v0.1.md`
- `docs/kernel/semantic/AICL_STATE_MODEL.md`
- `docs/kernel/semantic/PROOF_TIER_SEMANTICS.md`
- `docs/kernel/semantic/COMPILE_RUNTIME_BOUNDARY.md`
- `docs/kernel/semantic/OPERATIONAL_SEMANTICS.md`
- `docs/kernel/semantic/TYPE_AUTHORITY_RESOLUTION.md`
- `wkg/core/aicl-core-ontology-spec.md`
- `spec/programming-reference-manual.md`
- `examples/enterprise-service-resolution/README.md`

### Optional

- `spec/unified-spec-v1.0-draft.md`
- `spec/architecture/AICL_Architecture_Snapshot_v1.md`
- `spec/History/AICL_Consortium_Decision_History.md`
- `commentary/claude/latest-review.md`
- relevant files in `docs/research/`

## 3. Evaluation Procedure

1. Open `docs/evaluation/MODEL_REVIEW_PROMPT.md`.
2. Paste that prompt into the reviewing AI model.
3. Provide the recommended context files.
4. Ask the model to cite file paths and section names wherever possible.
5. Convert the model output into the structure in `STRUCTURED_FINDINGS_TEMPLATE.md`.
6. Submit the result using the GitHub issue template:
   - `.github/ISSUE_TEMPLATE/ai-model-evaluation.md`

## 4. Evaluation Areas

The reviewing model should assess:

### 4.1 Kernel Coherence

- Are SHG, HAIG, PACT, Materializer, and ROM boundaries clear?
- Are there dangling concepts?
- Are there conflicting definitions across files?

### 4.2 WKG Type Authority

- Is WKG the single semantic authority?
- Are kernel types projections over WKG anchors?
- Are there any hidden dual-type-system risks?

### 4.3 Proof Tiers

- Are Tier 1, Tier 2, and Tier 3 separated correctly?
- Can Tier 2 or Tier 3 accidentally satisfy Tier 1?
- Are residual runtime obligations handled honestly?

### 4.4 Compile/Runtime Boundary

- Are static obligations separated from runtime facts?
- Does the ROM capture residual obligations?
- Are runtime repair protocols bounded?

### 4.5 SHG Semantics

- Is the SHG schema sufficient for early compiler planning?
- Are nodes, hyperedges, proof gates, and materializers linked coherently?
- Are n-ary relationships represented cleanly?

### 4.6 Research-Track Boundaries

- Are experimental ideas clearly isolated from the canonical kernel?
- Are speculative proposals marked as non-canonical?
- Is scope explosion controlled?

### 4.7 Legacy-Language Contamination

- Does the repository accidentally collapse AICL into Python, Rust, TypeScript, YAML, JSON, or a conventional DSL?
- Are conventional languages treated as materialization targets rather than semantic authorities?

### 4.8 Overclaims

- Does the repository imply a working compiler exists where it does not?
- Does it claim proof-completeness where only a draft exists?
- Does it claim machine-native efficiency without benchmark evidence?

## 5. Severity Levels

Use these severity levels:

- Critical - blocks public technical launch or undermines the core architecture.
- High - should be fixed before broad promotion.
- Medium - should be tracked and resolved.
- Low - editorial, clarity, or non-blocking issue.

## 6. Submission

Submit structured results using:

- `.github/ISSUE_TEMPLATE/ai-model-evaluation.md`

Submit individual contradictions using:

- `.github/ISSUE_TEMPLATE/contradiction-report.md`

Submit test cases using:

- `.github/ISSUE_TEMPLATE/challenge-brief.md`

## 7. Boundary Reminder

Do not evaluate AICL as "a nicer Python" or "a better Rust."

AICL should be evaluated on its own premise:

> AICL is an AI-native semantic compilation layer where intent, policy, proof, capability, provenance, and materialization are first-class build objects.
