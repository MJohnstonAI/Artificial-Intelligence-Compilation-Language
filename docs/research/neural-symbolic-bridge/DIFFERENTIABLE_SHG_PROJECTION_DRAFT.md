# Differentiable SHG Projection Draft

## 1. Research Question

Can a canonical SHG be projected into a differentiable representation that supports model-side analysis while preserving a verifiable link back to symbolic nodes, hyperedges, policies, and proof obligations?

## 2. Non-Goals

This draft does not:

- add an internal AICL autodiff engine,
- replace SHG logical semantics,
- allow vector similarity to override WKG anchors,
- use embeddings as proof mechanisms,
- modify Kernel v0.1.1.

## 3. Projection Boundary

The projection is one-way:

```text
Canonical SHG -> Differentiable Projection
```

Any model output derived from the projection must be mapped back to canonical SHG references before it can influence compiler behavior.

## 4. Candidate Representation

```text
DifferentiableSHGProjection ::= {
  shg_hash: Hash
  node_embeddings: Map<SHGNodeId, VectorRef>
  hyperedge_embeddings: Map<SHGHyperedgeId, VectorRef>
  relation_type_table: Map<SHGHyperedgeKind, Integer>
  anchor_table: Map<WKGAnchorRef, Integer>
  provenance: ProjectionProvenance
}
```

## 5. Evaluation Criteria

A projection is useful only if it improves at least one bounded task:

1. contradiction candidate ranking,
2. policy-impact clustering,
3. materializer target planning,
4. proof obligation triage,
5. cross-model SHG reconstruction.

## 6. Failure Modes

- embedding drift obscures WKG identity,
- vector similarity is mistaken for semantic equivalence,
- policy/proof boundaries collapse into continuous scores,
- projection cannot round-trip structural references,
- model explanations cannot cite SHG nodes and hyperedges.

## 7. Status

Research draft only.
