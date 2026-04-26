# AICL Proof Tier Semantics

**Status:** Formal specification
**Purpose:** Define the three proof tiers, their mechanisms, validation rules, failure modes, and hard constraints

---

## 1. Core Principle

AICL proof tiers are distinguished by **mechanism**, not by degree of confidence. This distinction is critical: it is not that Tier 1 is "very confident" and Tier 3 is "less confident." It is that:

- **Tier 1** uses decidable, static mechanisms that can be verified by the compiler without uncertainty
- **Tier 2** uses probabilistic or model-bounded mechanisms that require empirical data or statistical models
- **Tier 3** uses heuristic or AI-assisted reasoning that cannot be formally verified

---

## 2. Tier 1 — Decidable / Static

### Definition
A Tier 1 proof obligation is one where the property can be determined to hold or not hold by the AICL compiler during a single compilation pass, without reference to runtime state, model outputs, or empirical data.

### Valid Mechanisms (Tier 1)
- `type_checking` — identifier resolution and type class assignment
- `static_analysis` — reachability, unreachable branches, dead code
- `label_flow` — IFC label propagation and boundary enforcement
- `capability_containment` — verifying that declared effects are bounded by declared capabilities
- `schema_consistency` — structural compatibility of imports and module interfaces
- `policy_compatibility` — static clash detection between policy predicates and declared capabilities
- `resource_ceiling` — budget bounds where consumption is statically determinable

### Validation Rule
A property `P` may be classified as Tier 1 if and only if there exists a decision procedure `D(P, ICC, WKGSnapshot)` that:
1. Terminates in finite time
2. Returns `True` (proved), `False` (refuted), or `Unknown` (undecidable for this property)
3. Requires no inputs beyond the ICC, the pinned WKG snapshot, and the source text

If `D(P)` returns `Unknown`, the property CANNOT be classified as Tier 1.

### Failure Modes
| Failure condition | Action |
|---|---|
| `D(P)` returns `False` | Hard compile error. Artifact production blocked. |
| `D(P)` returns `Unknown` | Property must be reclassified as Tier 2 or Tier 3 with explicit annotation |
| `D(P)` cannot be run (mechanism not implemented) | Compile error: "no Tier 1 mechanism available for this obligation" |
| Tier 2 or Tier 3 evidence presented to satisfy a Tier 1 slot | Compile error unless `risk_accepted` recorded in ICC with explicit human approval |

### Hard Constraint
> **Tier 3 MUST NOT satisfy a Tier 1 obligation slot under any circumstances.**

> **Tier 2 MUST NOT silently satisfy a Tier 1 obligation slot.** Explicit ICC `risk_accepted` recording plus human approval is required for any Tier 2 downgrade of a Tier 1 slot.

Tier 2 evidence, including model-bounded evidence with high confidence, cannot make a failed or undischarged Tier 1 obligation proof-compliant. If risk is accepted through HAIG or ICC risk acceptance, the resulting artifact must be marked with the accepted-risk scope rather than described as satisfying the Tier 1 obligation.

---

## 3. Tier 2 — Probabilistic / Model-Bounded

### Definition
A Tier 2 proof obligation is one where the property is evaluated against a statistical model or empirical dataset, producing a confidence value and uncertainty bound rather than a binary determination.

### Valid Mechanisms (Tier 2)
- `probabilistic` (requires `model` field pointing to a WKG-anchored model record)
- `benchmark_validation` — empirical measurement against a test corpus
- `statistical_bound` — confidence interval derivation from sample data

### Required Fields
Every Tier 2 constraint annotation MUST include:
```
[tier: 2, mechanism: probabilistic, model: <WKGAnchorRef>, confidence: Float, bound_type: p50 | p95 | p99]
```

The `model` field MUST resolve to a valid WKG anchor record of type `Evidence` or `Metric` that identifies the model and its version. A Tier 2 annotation without a valid `model` reference is a compile error.

### Validation Rule
A Tier 2 obligation is satisfied at compile time if the model evaluation produces a confidence value meeting the declared bound. If model evaluation is not possible at compile time (model requires live data, model not yet trained, etc.), the obligation becomes a **residual runtime monitor** and is recorded in the Residual Obligation Manifest (see Compile/Runtime Boundary document).

### Failure Modes
| Failure condition | Action |
|---|---|
| Model evaluation returns confidence below declared bound | Residual runtime monitor installed; compile warning emitted |
| `model` field missing or unresolvable | Hard compile error |
| Model version mismatch (snapshot has different version than declared) | Compile error unless version compatibility is declared |
| Tier 2 obligation used to satisfy a Tier 1 slot | See Tier 1 hard constraint above |

### Uncertainty Metadata
Every Tier 2 constraint in the ICC and SHG must carry:
- `confidence: Float [0.0, 1.0]`
- `uncertainty: Float` (one-sigma or declared interval)
- `model_ref: WKGAnchorRef`
- `evaluation_timestamp: ISO8601 | null` (null if evaluated at runtime)

---

## 4. Tier 3 — Heuristic / AI-Assisted

### Definition
A Tier 3 proof obligation is one that cannot be formally verified or statistically bounded — it relies on qualitative judgment, AI-generated assessment, or best-effort optimization.

### Valid Mechanisms (Tier 3)
- `heuristic` — rule-based advisory check
- `ai_assessment` — AI model evaluation without formal bounds
- `subjective_quality` — aesthetic, UX, or engagement tuning

### Validation Rule
Tier 3 obligations are always advisory. They produce annotations and recommendations but never block compilation.

### Failure Modes
| Failure condition | Action |
|---|---|
| Heuristic check fails | Advisory annotation in compilation output; no block |
| AI assessment returns negative result | Advisory annotation; no block |
| Tier 3 obligation used to satisfy a Tier 1 or Tier 2 slot | Hard compile error — this combination is forbidden unconditionally |

### Hard Constraint
> **Tier 3 proofs are advisory only. They cannot satisfy any obligation that requires a non-advisory action.**

---

## 5. Tier Interaction Matrix

| Obligation slot tier | Satisfying evidence tier | Result |
|---|---|---|
| Tier 1 | Tier 1 | Valid — compile passes |
| Tier 1 | Tier 2 | Compile error unless `risk_accepted` in ICC with human approval |
| Tier 1 | Tier 3 | Hard compile error — unconditionally forbidden |
| Tier 2 | Tier 1 | Valid — over-satisfied, no issue |
| Tier 2 | Tier 2 | Valid if confidence meets declared bound |
| Tier 2 | Tier 3 | Compile error — Tier 3 cannot satisfy Tier 2 slots |
| Tier 3 | Any | Advisory only — no enforcement |

---

## 6. Annotation Syntax

Constraints must carry tier and mechanism annotations:

```
constrain Performance {
  latency.p95_ms <= 200  [tier: 2, mechanism: probabilistic, model: wkg.perf_model_v3, confidence: 0.95]
  memory.mb <= 256       [tier: 1, mechanism: static_analysis]
  carbon.gco2e <= 0.5    [tier: 2, mechanism: benchmark_validation, model: wkg.carbon_model_v1, confidence: 0.80]
}
```

A constraint without a tier annotation defaults to Tier 1 if the mechanism is decidable, otherwise a compile error is raised requiring explicit tier declaration.

---

## 7. Proof Obligation Lifecycle

```
Source constraint declared
        |
        v
Tier classification (mechanism analysis)
        |
        |-- Tier 1 --> Compiler evaluates --> Pass / Compile error
        |
        |-- Tier 2 --> Model available at compile time?
        |              |-- Yes --> Model evaluation --> Pass / Warning + residual monitor
        |              |-- No  --> Residual monitor recorded in ROM
        |
        |-- Tier 3 --> Advisory annotation only
```

All residual runtime monitors are enumerated in the Residual Obligation Manifest (ROM) attached to the compiled artifact. No Tier 2 obligation may silently become a Tier 3 obligation — the downgrade must be explicit and recorded.
