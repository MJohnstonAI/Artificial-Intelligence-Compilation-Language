# Proof Tier Semantics

AICL must distinguish formal proof, statistical assurance, and model-assisted justification. These categories can all be useful, but they are not interchangeable.

## Tier 1: Static / Decidable Proof

Tier 1 is static, decidable proof. It may block compilation.

Only Tier 1 is formal proof in the strict sense. A Tier 1 obligation must be satisfied by a mechanism that the relevant compiler, verifier, schema checker, type checker, policy checker, or formal method can evaluate under declared assumptions.

Examples may include schema consistency, declared capability bounds, type resolution, forbidden secret detection, static policy compatibility, or target-platform feasibility where the relevant facts are available at compile time.

## Tier 2: Probabilistic / Statistical Assurance

Tier 2 is probabilistic or statistical assurance. It must carry:

- confidence
- model or method used
- dataset, sample, or evidence source
- uncertainty
- acceptance threshold
- evaluation date or version where relevant

Tier 2 evidence may support review and risk decisions. It cannot be mislabeled as formal proof.

## Tier 3: Heuristic / Model-Assisted Justification

Tier 3 is heuristic or model-assisted justification. It is useful for exploration, review, explanation, hypothesis generation, and triage.

Tier 3 cannot silently satisfy Tier 1 obligations. A model's explanation, even from a strong model, is not formal proof unless it is converted into an artifact that satisfies a Tier 1 proof mechanism.

## Hard Rule

No Tier 3 claim may satisfy a Tier 1 obligation.

No probabilistic or heuristic claim may be mislabeled as formal proof.

If an obligation cannot be statically proven, it must become a residual runtime obligation or be marked unresolved.

## Reporting Requirement

Any artifact that carries proof obligations should report:

- obligation identifier
- obligation source
- required tier
- supplied evidence
- supplied tier
- status: satisfied, residual, unresolved, or blocked
- reason for any downgrade from requested proof to residual obligation
