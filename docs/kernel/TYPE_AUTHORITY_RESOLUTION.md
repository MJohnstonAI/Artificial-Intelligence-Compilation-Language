# Type Authority Resolution

## Core Rule

The WKG is the single semantic authority.

Kernel categories such as `Goal`, `Policy`, `Capability`, `Constraint`, `ResourceBudget`, `Agent`, `Flow`, and `ProofObligation` are projections of WKG-backed anchors. The kernel enforces structure. The WKG supplies meaning.

No identifier has semantic authority merely because it appears in source text. AICL identifiers must resolve to WKG anchors or explicitly declared provisional experimental anchors.

This prevents dual type authority.

## Kernel Structure and WKG Meaning

The kernel should define the structural roles required for compilation: which fields exist, which relationships are allowed, which proof obligations must be generated, and which materialization rules are triggered.

The WKG should define the semantic meaning of the entities occupying those roles. A `Policy` identifier, for example, is not meaningful because a document names it as a policy. It becomes meaningful when resolved to a WKG anchor with declared semantics, versioning, provenance, and compatibility rules.

## Identifier Resolution Flow

```text
identifier -> WKG anchor -> TypeClass -> proof obligations -> materialization rules
```

1. `identifier`: A name or reference appearing in AICL-H, AICL-IR, ICC, SHG, examples, or schemas.
2. `WKG anchor`: The grounded semantic authority for the identifier.
3. `TypeClass`: The kernel role projected from that anchor, such as `Goal`, `Policy`, or `Capability`.
4. `proof obligations`: The required checks created by the resolved semantic role and its constraints.
5. `materialization rules`: The target-generation, containment, monitoring, and provenance requirements allowed by the resolved meaning.

## Provisional Experimental Anchors

Research work may need concepts before they are stabilized in the WKG. Such concepts should be declared as provisional experimental anchors rather than treated as implicitly authoritative local names.

A provisional anchor should state:

- proposed semantic role
- expected TypeClass projection
- scope of use
- known uncertainty
- review status
- path to stabilization or removal

## Failure Mode

If an identifier cannot resolve to a WKG anchor or provisional experimental anchor, it should not silently acquire meaning from surrounding prose. The artifact should be marked unresolved, and any dependent proof obligations or materialization steps should be blocked or carried as unresolved obligations.
