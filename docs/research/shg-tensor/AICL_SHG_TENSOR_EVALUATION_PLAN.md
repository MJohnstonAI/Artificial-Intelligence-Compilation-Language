# AICL-SHG-TENSOR Evaluation Plan

## 1. Research Question

Can AICL represent its Semantic Hypergraph in a compact machine-native format that improves efficiency or reliability for AI systems compared with human-readable structured text?

## 2. Non-Goals

This plan does not:

- replace the canonical SHG schema,
- modify Kernel v0.1.1,
- define final byte-level encoding,
- build a full compiler,
- claim superiority before measurement.

## 3. Candidate Formats

Evaluate at least these candidates:

1. AICL-JSON
2. Compact JSON
3. MessagePack
4. FlatBuffers
5. Cap'n Proto
6. Safetensors-style tensor container
7. Custom packed adjacency representation

## 4. Evaluation Dimensions

### 4.1 Size

Measure:

- bytes on disk,
- compressed bytes,
- tokenized length under common tokenizer families,
- schema overhead.

### 4.2 Parse Reliability

Measure:

- successful parse rate,
- invalid parse recovery,
- schema validation error clarity,
- cross-model reconstruction accuracy.

### 4.3 Semantic Fidelity

Given a source SHG, encode and decode it.

The decoded SHG must preserve:

- nodes,
- hyperedges,
- WKG anchor references,
- proof obligation references,
- guards,
- provenance,
- residual runtime obligation references.

### 4.4 AI Consumption

Test whether AI models can:

- summarize the encoded artifact,
- reconstruct logical SHG,
- identify contradictions,
- answer structural questions,
- preserve policy/proof boundaries.

### 4.5 Validator Performance

Measure:

- decode time,
- schema validation time,
- memory overhead,
- failure mode clarity.

## 5. Baselines

Compare against:

- AICL-Text,
- AICL-JSON,
- YAML,
- normal JSON,
- MLIR-style textual IR where applicable.

## 6. Minimum Benchmark Fixture

Use the enterprise service resolution example as the initial fixture.

Required fixture components:

- ICC sketch,
- SHG nodes,
- SHG hyperedges,
- proof obligations,
- residual runtime obligations,
- materializer targets.

## 7. Acceptance Criteria

A candidate SHG-TENSOR format becomes eligible for further development only if it demonstrates at least two of:

1. lower token count than AICL-JSON,
2. faster validation than JSON,
3. better cross-model reconstruction fidelity,
4. clearer validator failure modes,
5. compact lossless round-trip encoding.

## 8. Scope Control

Do not build an internal tensor computation engine.

This track is about representation and evaluation, not neural execution.
