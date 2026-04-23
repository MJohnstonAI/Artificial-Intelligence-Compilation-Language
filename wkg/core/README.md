# WKG Core

This directory contains the core AICL World Knowledge Graph substrate.

For this repository, the WKG is the semantic authority for anchor identity. The kernel reads compiler-facing categories from WKG anchors rather than defining a competing semantic type system.

## Read First

1. `aicl-core-ontology-spec.md`
2. `schema.ts`
3. `aicl-core-ontology.schema.json`
4. `canonical-ontology-registry.md`
5. `integration-memo.md`

## File Roles

### Authoritative

- `aicl-core-ontology-spec.md`
- `schema.ts`
- `aicl-core-ontology.schema.json`
- `canonical-ontology-registry.md`
- `integration-memo.md`

### Illustrative

- `example-wkg-snapshot.json`
- `example-delta-log.json`
- `contradiction-test-corpus.json`

The example files and contradiction corpus are fixtures and examples. They should align with the authoritative schema/spec layer but should not be treated as normative on their own.

Work in this directory should stay aligned with:

- `spec/programming-reference-manual.md`
- `spec/unified-spec-v1.0-draft.md`
- `spec/schemas/icc.schema.json`
