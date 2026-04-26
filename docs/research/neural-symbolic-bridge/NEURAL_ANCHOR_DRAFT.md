# Neural Anchor Draft

## 1. Definition

A neural anchor is an experimental derived representation that links a WKG anchor or SHG node to model-facing vectors, features, or learned summaries.

It is not a WKG anchor and does not replace WKG authority.

## 2. Intended Use

Neural anchors may help with:

- retrieval over large SHG collections,
- similarity search for prior proof patterns,
- clustering related policies or capabilities,
- ranking candidate contradictions for symbolic validation.

## 3. Hard Boundary

Neural anchors must not:

- create new kernel type authority,
- satisfy Tier 1 proof obligations,
- silently change WKG grounding,
- weaken OpaqueIntent boundaries,
- override policy priority,
- substitute for HAIG decisions.

## 4. Schema Sketch

```text
NeuralAnchor ::= {
  id: NeuralAnchorId
  source_ref: WKGAnchorRef | SHGNodeId | SHGHyperedgeId
  source_hash: Hash
  model_ref: WKGAnchorRef
  vector_ref: VectorRef
  generated_at: ISO8601
  provenance: ProvenanceRecord
}
```

## 5. Evaluation Criteria

Neural anchors require empirical validation against:

- retrieval precision,
- reconstruction accuracy,
- policy-boundary preservation,
- contradiction ranking quality,
- stability across model versions.

## 6. Status

Research draft only.
