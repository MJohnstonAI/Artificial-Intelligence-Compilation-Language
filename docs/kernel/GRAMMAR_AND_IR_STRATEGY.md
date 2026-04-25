# Grammar and IR Strategy

Surface syntax is not the primary authority.

AICL should support human inspection without making human-readable syntax the root semantic layer. The language stack should separate projections, canonical machine representation, semantic planning, and signed intent/proof certificates.

## AICL-H: Human-Readable Projection Layer

AICL-H is a human-readable projection layer. It exists for inspection, teaching, governance, debugging, and review.

Humans may inspect AICL-H. They may also author drafts in AICL-H where tooling supports round-trip conversion. AICL-H should not override grounded semantics.

## AICL-IR: Canonical Machine Representation

AICL-IR is the canonical machine representation. It should carry the structured semantic contract, grounded identifiers, declared constraints, capability bounds, policies, resources, proof obligations, provenance links, and materialization requirements.

AI systems should primarily operate over AICL-IR rather than relying on surface syntax.

## AICL-SHG: Semantic Hypergraph Planning Layer

AICL-SHG is the semantic hypergraph planning layer. It represents branching, parallelism, dependency structure, contradiction detection, proof gates, adaptation boundaries, and materialization planning.

AICL-SHG should make agentic planning and repair inspectable without reducing workflows to prompt chains.

## AICL-ICC: Signed Intent/Proof Certificate

AICL-ICC is the signed intent/proof certificate. It should bind intent, grounded semantics, proof status, residual obligations, provenance, and materialization assumptions into a reviewable artifact.

ICC should be suitable for audit, handoff, and downstream materialization.

## Projection Rule

Pretty syntax should never override grounded semantics.

AICL may generate multiple human-readable views from the same canonical semantic artifact. If two projections disagree, the canonical grounded artifact and its WKG anchors should control. The disagreement should be reported as a projection defect or unresolved contradiction.
