# CLAUDE_WKG_BRIDGE_REVIEW_v1.md

**Reviewer:** Claude (Anthropic) — low-token pass  
**Source files:** `wkg/core/aicl-core-ontology-spec.md`, `wkg/core/schema.ts`, `spec/programming-reference-manual.md` §4, §9, §10, §11, §7.2  
**Note:** `wkg/core/integration-memo.md` was not present in the provided documents. Review proceeds from available files only.

---

## 1. Accept

Five Gemini assumptions the kernel should adopt without modification:

- **Nine-pillar anchor taxonomy.** `Entity / State / Goal / Metric / Policy / Capability / Resource / Environment / Evidence` is a sound nominal set. The kernel's type classes are compatible labels for these anchors; no conflict if the resolution contract is defined (see Tension 1).

- **Merkle delta-log for WKG governance.** Append-only, hash-chained, commit-validated. Correct architecture for provenance. Adopt as-is for the runtime layer.

- **Contradiction surface taxonomy.** `χ_{G,P}`, `χ_{C,R}`, `χ_{P,P}` is more precise than anything currently in the kernel's contradiction section. Promote into kernel §11 as the normative taxonomy.

- **Runtime Grounding Axiom.** No state observation may be written to the WKG without `evidence_refs`. Correct and important — applies to runtime state writes, not compile-time type declarations (see Tension 2).

- **Capability pre-flight resource check (Γ_C).** Capability execution blocked if resource allocation would exceed `capacity_total`. Adopt as the kernel's runtime capability guard.

---

## 2. Tension Points

Three highest-risk mismatches:

**T1 — Dual type authority.**  
`schema.ts` defines `Goal`, `State`, `Policy`, `Capability`, `Metric` as WKG anchor types. The kernel defines the same identifiers as its own type classes (PRM §4.1). Neither document specifies which is authoritative or how resolution works. Risk: first implementer builds two competing type systems.  
*Required fix:* One sentence in each document: "Kernel type classes are category labels for WKG anchors. WKG is the authority. Resolution is `identifier → WKG.lookup → AnchorType`."

**T2 — Grounding Axiom fires at wrong pipeline stage.**  
`schema.ts` `State` interface requires `evidence_refs` unconditionally. But kernel `state` declarations (PRM §4.3) are compile-time type declarations — no runtime evidence exists yet. As written, the compiler cannot declare any state type without fabricating evidence.  
*Required fix:* Split the `State` interface into two objects:
- `StateAnchor` — compile-time type declaration, `evidence_refs` absent or empty.
- `StateObservation` — runtime fact, `evidence_refs` required.

**T3 — Contradiction resolution has two behaviors with no pipeline boundary.**  
WKG spec §4.2 fires `Contradiction_Halt` for equal-priority policy conflicts at the WKG level. Kernel §11.2 fires `escalate_to_haig` for the same condition at compile time. These are complementary, not competing — but because neither document references the other, they will be implemented as duplicate systems.  
*Required fix:* One cross-reference note: compile-time equal-priority conflict → `escalate_to_haig` (kernel, primary defense); runtime delta-log conflict → `Contradiction_Halt` (WKG, last-resort backstop).

---

## 3. Required Kernel Hooks

Minimum formal additions needed for clean integration:

**Hook 1 — WKG resolution contract in the type system (PRM §4)**  
```
identifier → WKG.lookup(id, snapshot) → Anchor → TypeClass
```
Kernel type classes (`State`, `Goal`, `Policy`, `Capability`, `Metric`) are read from the WKG anchor's `type` field. Unknown identifiers with no WKG anchor remain compile errors.

**Hook 2 — WKG snapshot binding in the ICC (PRM §17)**  
Add `wkg_snapshot_hash: Hash` as a required ICC field. Compiler takes a WKG snapshot before compilation begins; all identifier resolution uses that snapshot; ICC records the hash. Guarantees reproducible compilation.  
```aicl
icc {
  ...
  wkg_snapshot_hash: Hash   // ADD THIS
  ...
}
```

**Hook 3 — StateAnchor declaration form (PRM §4.3)**  
Current form is fine; just add a note that it produces a `StateAnchor` in the WKG, not a `StateObservation`. No syntax change required — the distinction lives in the compiler's output, not the source form.

**Hook 4 — Contradiction pipeline stage annotation (PRM §11.2)**  
Extend the conflict policy declaration with a `stage` field:
```aicl
ontology_conflict_policy {
  same_tier:    escalate_to_haig  [stage: compile]
  cross_tier:   higher_precedence_wins
  unresolvable: compile_error     [stage: compile]
  runtime_delta_conflict: halt    [stage: runtime, handled_by: wkg]
}
```

**Hook 5 — Capability effect-to-WKG-anchor mapping (PRM §9.1)**  
Each kernel `effects: [Net:payments_api]` row must map to a WKG `Capability` anchor. The compiler needs a lookup: `effect_label → WKG.Capability.id`. This mapping is currently implicit. It must be declared, either inline in the capability block or via `capabilitypack` import resolution.

---

## 4. Tomorrow's Full Review

Items deferred for a higher-token pass:

- `schema.ts` fields `predicate_signature` and `execution_signature` — currently lock in a content-addressed execution model that the kernel has not committed to. Needs a spec-layer vs implementation-layer split.
- `Environment` anchor has no kernel counterpart. Likely maps to `app {}` scope — needs explicit documentation or a new `environment` keyword.
- Full ICC schema integration with `wkg_snapshot_hash` and `ContradictionRecord` shape.
- `SkillContract` sandbox interaction with WKG `Resource` allocation model — two resource accounting paths may diverge.
- WKG Policy `enforcement_mode: "strict_halt" | "compensate" | "audit"` vs kernel proof tier mechanism annotations — alignment needed before Tier 1/2 distinction is finalized.
- `integration-memo.md` — once available, review for any additional Gemini integration assumptions not captured in the core ontology spec.
