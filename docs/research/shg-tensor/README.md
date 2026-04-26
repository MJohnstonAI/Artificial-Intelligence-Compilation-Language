# SHG-TENSOR Research Track

## Purpose

The SHG-TENSOR research track investigates whether AICL can provide a compact machine-native representation of the Semantic Hypergraph.

The canonical SHG is currently defined logically in:

- [`../../kernel/SHG_SCHEMA.md`](../../kernel/SHG_SCHEMA.md)

SHG-TENSOR is not a replacement for the logical SHG. It is an experimental serialization and benchmarking target.

## Why This Matters

AICL claims to be AI-native. A human-readable text projection is useful for review, but it does not by itself prove machine-native efficiency.

To support the AI-native thesis, AICL needs evidence that its machine-oriented form can outperform or improve on ordinary structured text formats in at least some of these dimensions:

- token density,
- parse reliability,
- semantic fidelity,
- cross-model consistency,
- embedding or attention efficiency,
- validator performance.

## Status

Immediate research priority.

## Boundary

This track must not change kernel semantics.

The logical SHG remains the semantic source of truth. SHG-TENSOR is a transport, compression, or model-ingestion format.

## Near-Term Outputs

- evaluation plan,
- candidate wire formats,
- benchmark design,
- toy encoder/decoder later,
- comparison against AICL-Text, AICL-JSON, YAML, JSON, and compact binary encodings.
