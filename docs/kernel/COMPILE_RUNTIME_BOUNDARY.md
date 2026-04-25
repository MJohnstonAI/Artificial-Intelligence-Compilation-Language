# Compile/Runtime Boundary

AICL must never falsely claim that dynamic facts are statically proven.

The compile/runtime boundary exists to separate obligations that can be checked before materialization from obligations that depend on live environments, users, services, deployment conditions, or model behavior.

## Compile-Time Obligations

Compile-time obligations include:

- permission minimality
- declared policy compatibility
- static capability bounds
- schema consistency
- target-platform feasibility
- declared data-flow containment
- no hard-coded secrets
- required provenance links

These obligations may block compilation or materialization when required evidence is absent or contradictory.

## Residual Runtime Obligations

Residual runtime obligations include:

- live API policy drift
- latency and power budgets under real load
- user consent state
- deployment-region enforcement
- accessibility behavior in actual generated UI
- external service failures
- model-output uncertainty
- runtime security monitoring

These obligations cannot be honestly treated as fully proven at compile time when their truth depends on runtime facts.

## Residual Obligation Manifest

Unresolved or environment-dependent obligations must travel with the artifact and be monitored at runtime. This record is the Residual Obligation Manifest.

A Residual Obligation Manifest should include:

- obligation identifier
- originating intent, policy, capability, or proof rule
- reason the obligation is residual
- required runtime signal or monitor
- allowed repair action
- escalation condition
- responsible agent, service, or reviewer
- provenance link back to the compiled artifact

## Boundary Rule

If an obligation cannot be statically proven, AICL must mark it as residual, unresolved, or blocked. It must not downgrade a dynamic fact into a static proof claim for presentation convenience.
