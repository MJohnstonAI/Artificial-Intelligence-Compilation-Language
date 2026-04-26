# Quantum-State Semantic Anchors Rejection

## Status

Rejected research proposal.

## Proposal

Represent AICL semantic anchors as quantum-state objects or quantum-inspired superpositions, allowing uncertain or ambiguous meanings to remain in a superposed state until resolved by compilation or runtime observation.

## Rejection Rationale

This proposal is rejected for the current AICL research track because it weakens the project's core need for reviewable, grounded, machine-checkable semantics.

The current kernel depends on:

- pinned WKG snapshots,
- explicit WKG anchor resolution,
- deterministic proof obligations,
- auditable contradiction records,
- bounded HAIG escalation,
- stable provenance.

Quantum-state semantic anchors would make semantic identity harder to audit without providing a concrete implementation or proof advantage.

## Specific Problems

1. Anchor identity would become ambiguous at exactly the point where AICL requires stable grounding.
2. Proof obligations would need a formal interpretation over superposed meanings.
3. Contradiction detection could become probabilistic without a clear tier boundary.
4. WKG snapshot reproducibility would be weakened.
5. The proposal risks metaphor-driven design rather than implementable semantics.

## Future Reconsideration Criteria

This idea should not re-enter the active design process unless a future proposal provides:

1. a formal semantics,
2. a concrete compiler use case,
3. deterministic audit behavior,
4. compatibility with WKG snapshot grounding,
5. clear proof-tier interaction,
6. measurable advantage over ordinary uncertainty annotations.

Until then, AICL should model uncertainty through explicit evidence, proof tiers, contradiction records, risk acceptance, and HAIG escalation rather than quantum-state anchors.
