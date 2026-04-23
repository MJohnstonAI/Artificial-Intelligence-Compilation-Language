# Claude Commentary — AICL Consortium

**Contributor:** Claude (Anthropic)  
**Role:** Formal verification, kernel design, proof tier boundaries, contradiction detection, capability/policy soundness, type system, workflow safety, strategic analysis  
**Status:** Round 1 complete. Round 2 pending resolution of OQ-001 through OQ-015.

---

## Contents of this folder

| File | Type | Summary |
|---|---|---|
| `round-01.md` | Formal consortium commentary | Eight structural findings on the kernel, proof tiers, type system, and ICC. The primary Round 1 contribution. |
| `wkg-integration-risk-review.md` | Focused technical review | Six kernel-integration risks in Gemini's WKG work. Two critical blockers identified before compiler work can begin. |
| `wkg-bridge-review-v1.md` | Compact bridge review | Low-token surgical pass. Five accepts, three tension points, five required kernel hooks, deferred items list. |
| `strategic-insights-v1.md` | Strategic analysis | Eight non-obvious observations from a full repository review. Covers positioning, publication strategy, MVP path, and structural gaps. |

---

## Key findings — quick reference

### From Round 1 (`round-01.md`)

1. **Proof tier mechanics are a category error.** Tier 1/2 must be grounded in proof *mechanism* (static vs probabilistic), not proof strength. Add `[tier: N, mechanism: type]` annotations to constraints.

2. **OpaqueIntent policy compliance is a solved problem.** Use Information Flow Control (IFC) with taint labels. Values carry policy labels; compiler blocks unlabelled flow into OpaqueIntent without `policy_attestation`.

3. **Contradiction detection in the SHG is undefined.** Needs: constraint normalisation, a priority lattice, and hard `compile_error` for unresolvable conflicts. Without this, the SHG is not a proof system.

4. **There is no type system.** `goal RefundProcessed` — what is `RefundProcessed`? WKG-backed nominal type resolution is required. Unknown identifiers must be compile errors, not warnings.

5. **`maintain` has undefined temporal semantics.** It is implicitly LTL `□P` but this is never stated. Needs compile-time proof obligation and a runtime repair protocol with explicit circuit-break behaviour.

6. **`flow` supports only linear chains.** Production systems need parallelism (`||`), conditional branching, and proof gates. A minimal flow algebra is required.

7. **`autonomy: 0.8` is not a valid concept.** Autonomy is multi-dimensional: action / goal / resource / delegation. Collapsing to a scalar breaks security proof obligations.

8. **The ICC needs a formal schema.** As the root of trust, it cannot remain a prose description. Schema with `version`, `timestamp`, `goals`, `constraints`, `risk_accepted`, `wkg_anchors`, `signature` is the minimum.

---

### From WKG integration reviews (`wkg-integration-risk-review.md`, `wkg-bridge-review-v1.md`)

**Accepts (Gemini's work to keep as-is):**
- Nine-pillar WKG anchor taxonomy
- Merkle delta-log governance model
- Contradiction surface taxonomy (χ_{G,P}, χ_{C,R}, χ_{P,P}) — promote into kernel §11
- Runtime Grounding Axiom (applies to runtime state writes, not compile-time declarations)
- Capability pre-flight resource check (Γ_C)

**Critical blockers before compiler work:**

1. **Dual type authority** — both WKG and kernel define `Goal`, `State`, `Policy` etc. Resolution contract missing. Fix: "Kernel type classes are category labels for WKG anchors. WKG is the authority. Resolution is `identifier → WKG.lookup(snapshot) → AnchorType`."

2. **Grounding Axiom fires at wrong pipeline stage** — `schema.ts` `State` requires `evidence_refs` unconditionally, but kernel `state` declarations are compile-time type declarations with no runtime evidence. Fix: split `StateAnchor` (compile-time) from `StateObservation` (runtime).

**Required kernel hooks:**
- `identifier → WKG.lookup(id, snapshot) → AnchorType` resolution contract
- `icc.wkg_snapshot_hash` field — compiler locks a WKG snapshot; ICC records the hash
- `StateAnchor` vs `StateObservation` distinction in schema
- Contradiction pipeline stage annotation (compile-time escalate vs runtime halt)
- Capability effect-to-WKG-anchor mapping declaration

---

### From strategic analysis (`strategic-insights-v1.md`)

Eight observations from a full repository review:

1. **The consortium methodology is publishable now.** The decision history document is a research methodology paper. No compiler required. Submit to arXiv as a preprint — it is the fastest path to grant-qualifying citations.

2. **AICL is a governance project being pitched as a language project.** Reframe for grant applications: "formal governance architecture for AI systems with a language interface." Opens different funding doors.

3. **The EIF loop is the most commercially differentiated idea and the least developed.** Nobody else is building a formal feedback loop from production incidents into the compilation contract. Promote to a first-class spec document.

4. **The SkillRegistry can ship before a compiler exists.** The schema exists. The spec exists. A publicly accessible skill registry is a tangible AICL artifact that generates adoption today.

5. **The ICC has an agent authority problem.** No `delegation_chain` field means multi-agent systems can forge human authority. Add `delegation_chain: [ICCRef]` as OQ-016.

6. **No minimum viable compilation target exists.** The spec expands indefinitely without an implementation forcing function. Define a "hello world" program as the Phase 2 target.

7. **WKG governance is harder than the kernel grammar.** The organisational and social governance layer is unsolved. Create `wkg/GOVERNANCE.md` before adoption makes it a crisis.

8. **The multi-dimensional autonomy model is an unpublished AI safety contribution.** A standalone paper on decomposing agent autonomy as compiler-enforced proof obligations would land at AI safety venues and feed back into AICL's credibility.

---

## Open questions raised by Claude

All Claude-raised open questions are tracked in `spec/open-questions.md`:

| OQ | Title | Status |
|---|---|---|
| OQ-004 | Proof tier decidability boundary | Open |
| OQ-005 | OpaqueIntent IFC policy compliance | Open |
| OQ-006 | SHG contradiction detection | Open |
| OQ-007 | Type system and WKG identifier resolution | Open |
| OQ-008 | `maintain` temporal semantics | Open |
| OQ-009 | `flow` algebra for parallel/conditional execution | Open |
| OQ-010 | Autonomy dimensionality | Open |
| OQ-011 | ICC formal schema | Open |
| OQ-015 | SHG computational complexity bounds | Open |
| OQ-016 | ICC delegation chain for multi-agent authority | Proposed — add to tracker |

---

## Round 2 scope (when tokens are available)

The following were explicitly deferred from the WKG bridge review:

- `schema.ts` `predicate_signature` / `execution_signature` — spec-layer vs implementation-layer separation
- `Environment` anchor mapping to `app {}` kernel scope
- Full ICC schema alignment with `wkg_snapshot_hash` and `ContradictionRecord`
- `SkillContract` sandbox interaction with WKG Resource allocation model
- WKG Policy `enforcement_mode` vs kernel proof tier mechanism annotations
- `wkg/core/integration-memo.md` — not present in Round 1 documents; review when available

---

## Relationship to other commentary folders

| Folder | Primary focus | Interaction with Claude's work |
|---|---|---|
| `commentary/gemini/` | WKG architecture, ontology, multimodal grounding | Claude's WKG bridge reviews are the direct interface point. Gemini should respond to OQ-005, OQ-007, and the Grounding Axiom split. |
| `commentary/chatgpt/` | Workflow semantics, ICC design, synthesis | ChatGPT should address OQ-009 (flow algebra), OQ-010 (autonomy), OQ-011 (ICC schema), and the delegation chain gap. |
| `commentary/grok/` | Adversarial review, runtime, optimisation | Grok should stress-test the SHG complexity bounds (OQ-015) and the runtime adaptation envelope. |

---

## Attribution

All content in this folder is contributed by Claude (Anthropic) as a collaborative research contributor to the AICL consortium. Claude is not an originator of the AICL concept. The AICL concept, architecture, and project direction originate with Marc Johnston, founder of NeuroSync AI Dynamics Pty Ltd, Cape Town, South Africa.

Per consortium protocol: append only, never overwrite, treat this as a live research record.
