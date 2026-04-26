# AICL AI Build Protocol

**Document type:** Autonomous build workflow  
**Audience:** AI agents. Not humans.  
**Human role:** Project governance only — review, approve, commit, arbitrate. Human maintainers do not implement protocol stages.

---

## Protocol overview

The AICL compilation pipeline is built by AI agents, validated by AI agents, and governed by the Project Maintainer. Each stage is a bounded AI task with a defined context, a defined output schema, and a defined validation criterion. Stages execute sequentially. Each stage's output is the next stage's input.

No human implements any stage. Humans review outputs and make three kinds of decisions: approve and commit, return with correction notes, or escalate as an architectural decision record.

---

## Build stages

### Stage 0 — Grammar bootstrap

**Assigned to:** Claude Code (primary), GPT-4o (validation pass)

**Context provided:**
- `spec/programming-reference-manual.md` §4–§18 (complete)
- `examples/enterprise-service-resolution/README.md` (reference program)
- `examples/studypath-offline-learning-planner/README.md` (reference program)

**Task:** Produce a complete EBNF grammar for AICL-Text covering all constructs in the PRM. Alongside it, produce a Tree-sitter grammar in JavaScript format. Produce a test suite of 15 programs (10 valid, 5 invalid with expected error codes).

**Output files:**
- `kernel/aicl-text.ebnf`
- `tools/tree-sitter-aicl/grammar.js`
- `ai-execution-context/test-programs/*.aicl`

**Validation:** GPT-4o receives the grammar and the test programs. It attempts to parse each test program using the grammar and reports whether valid programs parse successfully and invalid programs fail with the expected error codes. If all 15 tests pass, the stage is complete. If any fail, Claude Code receives the failure report and corrects the grammar.

**Human gate:** The Project Maintainer reviews the grammar for alignment with the spec intent. Approves or returns with notes. Does not rewrite.

**Escalation condition:** If the grammar cannot express a construct described in the PRM without ambiguity, emit `escalation_required` with the conflicting PRM sections. Do not resolve the ambiguity autonomously.

---

### Stage 1 — WKG core population

**Assigned to:** Gemini (primary), Claude (review pass)

**Context provided:**
- `wkg/core/aicl-core-ontology-spec.md`
- `wkg/core/schema.ts`
- Domain list: Commerce, Education, Privacy, Security, Accessibility, Support, Gaming, Analytics, Health (non-clinical only)

**Task:** For each domain, enumerate a minimum of 20 WKG anchors covering the most common entity, state, goal, metric, policy, and capability types. Each anchor must include: `id` (URN format), `type` (from the nine-pillar taxonomy), `label`, `domain`, `version`, and `description`. Output as `wkg/core/wkg-core.json`.

**Validation:** Claude reviews the proposed anchors against the PRM type system rules. Flags any anchor whose type assignment is incorrect or whose ID format is invalid. Gemini corrects flagged anchors.

**Human gate:** The Project Maintainer reviews the anchor set for scope and suitability. May add anchors, remove anchors, or adjust descriptions. Does not redesign the schema.

**Escalation condition:** If two domains have anchors that create inherent `χ_{P,P}` conflicts at the core ontology level, escalate. Do not resolve cross-domain policy conflicts autonomously.

---

### Stage 2 — JSON schema validators

**Assigned to:** Claude Code

**Context provided:**
- `spec/schemas/icc.schema.json`
- `spec/schemas/skill-contract.schema.json`
- `spec/schemas/agent-capsule.schema.json`
- `ai-execution-context/compiler-agent-system-prompt.md`

**Task:** Implement validators for all three schemas in Python (using `jsonschema`) and TypeScript (using `ajv`). Each validator takes a JSON file path as input and emits structured output per the compiler agent output format. Emit a CLI tool: `aicl-validate <schema_type> <file.json>`.

**Output files:**
- `tools/validators/validate.py`
- `tools/validators/validate.ts`
- `tools/validators/README.md` (machine-readable usage instructions for AI agents)

**Validation:** Claude Code runs each validator against the test cases in `ai-execution-context/test-programs/`. Valid files must pass. Invalid files must emit the correct error codes.

**Human gate:** The Project Maintainer reviews that the validator tools are runnable and produce correct output on the example files. Does not rewrite.

---

### Stage 3 — Parser implementation

**Assigned to:** Claude Code (implementation), Gemini Code (review)

**Context provided:**
- `kernel/aicl-text.ebnf` (from Stage 0)
- `ai-execution-context/compiler-agent-system-prompt.md`
- `ai-execution-context/test-programs/`

**Task:** Implement a parser for AICL-Text that produces an AST in JSON format conforming to the AST schema. The parser must be implemented in Python or TypeScript. Use a parser generator (ANTLR or lark for Python, nearley or peggy for TypeScript) — do not hand-write a recursive descent parser unless the grammar cannot be expressed in a generator format.

**Output files:**
- `tools/parser/aicl_parser.py` or `tools/parser/aicl_parser.ts`
- `tools/parser/ast-schema.json` (defines the AST node types)
- `tools/parser/README.md` (machine-readable for AI agents)

**Validation:** All 15 test programs from Stage 0 must parse with correct results. The AST for each valid program must be syntactically valid against `ast-schema.json`.

**Human gate:** The Project Maintainer confirms test suite passes. Does not review parser internals.

---

### Stage 4 — Type checker and WKG resolver

**Assigned to:** Claude Code (primary), GPT-4o Code (review)

**Context provided:**
- `spec/programming-reference-manual.md` §4 (type system)
- `wkg/core/wkg-core.json` (from Stage 1)
- `tools/parser/ast-schema.json` (from Stage 3)
- `ai-execution-context/compiler-agent-system-prompt.md`

**Task:** Implement the identifier resolver (AST identifiers → WKG anchors → TypeClass) and the type checker (validates type class assignments, detects violations). Emit structured errors per the compiler agent output format. Each error must include `wkg_anchor_candidates` when the error is `E001`.

**Output files:**
- `tools/typechecker/resolver.py` or `resolver.ts`
- `tools/typechecker/typechecker.py` or `typechecker.ts`

**Validation:** A set of AICL programs with known type errors must produce exactly the expected error codes. A set of valid programs must pass without errors.

**Human gate:** The Project Maintainer reviews that error messages are comprehensible and correction suggestions are accurate.

---

### Stage 5 — Tier 1 proof checkers

**Assigned to:** Claude Code

**Context provided:**
- `spec/programming-reference-manual.md` §8 (proof tiers)
- `spec/programming-reference-manual.md` §9 (capabilities/IFC)
- `spec/programming-reference-manual.md` §11 (contradiction detection)
- Typed AST schema from Stage 4

**Task:** Implement the following proof checkers as discrete, independently testable functions:

1. `check_cost_ceiling(ast)` — sum capability limits, verify against budget
2. `check_network_absence(ast)` — trace all Net:* effects, verify none present
3. `check_deadline_satisfaction(ast)` — verify plan fits within declared constraint
4. `check_ifc_labels(ast)` — trace taint labels, verify OpaqueIntent boundaries
5. `check_contradiction(ast)` — normalise constraints, detect χ conflicts
6. `check_permission_minimality(ast)` — verify no agent declares effects beyond its declared capabilities
7. `check_delegation_chain(ast)` — verify ICC delegation chain traces to human originator

Each checker returns either `{"status": "pass", "evidence": "..."}` or `{"status": "fail", "error_code": "...", "details": "..."}`.

**Validation:** Test programs with known proof failures must produce the correct error codes from the correct checker.

**Human gate:** The Project Maintainer reviews that the proof evidence strings are accurate and the failure messages are clear.

---

### Stage 6 — SHG builder

**Assigned to:** Gemini Code (primary), Claude Code (review)

**Context provided:**
- Typed AST from Stage 4
- Proof bundle from Stage 5
- `examples/studypath-offline-learning-planner/studypath.shg.json` (reference)
- `examples/enterprise-service-resolution/README.md` (reference)
- SHG JSON schema (to be defined in this stage)

**Task:** Implement the SHG builder that converts a type-checked AST into a valid SHG JSON file. The SHG must include nodes, edges, hyperedges (for genuine n-ary constraints), and proof gates populated from the proof bundle. Define the SHG JSON schema as part of this stage.

**Output files:**
- `tools/shg-builder/shg_builder.py` or `shg_builder.ts`
- `spec/schemas/shg.schema.json`

**Validation:** The SHG produced from the enterprise example program must be structurally equivalent to the hand-authored SHG in the enterprise example folder.

---

### Stage 7 — ICC generator

**Assigned to:** Claude Code

**Context provided:**
- Typed AST, proof bundle, SHG (from prior stages)
- `spec/schemas/icc.schema.json`
- WKG snapshot hash (from Stage 1)

**Task:** Implement the ICC generator. The ICC must be produced from the compilation outputs, include all required fields (including `delegation_chain`, `wkg_snapshot_hash`, `risk_accepted`), and validate against `icc.schema.json`. The ICC `signature` field must be a SHA-256 hash of the canonical ICC content (all fields except `signature` itself).

**Output files:**
- `tools/icc-generator/icc_generator.py` or `icc_generator.ts`

**Validation:** Generated ICC for the enterprise example must validate against the schema and match the hand-authored `studypath.icc.json` in structure.

---

### Stage 8 — CLI and first materializer

**Assigned to:** Claude Code (CLI), GPT-4o Code (REST API materializer)

**Context provided:**
- All tools from prior stages
- `spec/programming-reference-manual.md` §19 (targets and packaging)

**Task A (Claude Code):** Implement the `aicl` CLI with commands:
- `aicl check <file.aicl>` — runs type checker and Tier 1 proofs, emits structured JSON
- `aicl compile <file.aicl>` — full pipeline, emits ICC + SHG + proof bundle
- `aicl prove <file.aicl>` — shows proof gate outcomes in human-readable format
- `aicl validate-icc <icc.json>` — validates ICC against schema

**Task B (GPT-4o Code):** Implement the REST API materializer. Takes a compiled SHG + ICC as input. Emits a FastAPI (Python) application skeleton that:
- Implements the declared flow as endpoint handlers
- Enforces budget constraints as middleware (timeout = p95 latency ceiling)
- Injects capability effects as environment variable references (not hardcoded secrets)
- Adds the `X-AICL-ICC` response header with the ICC hash
- Includes the proof bundle as a `/.aicl/proof-bundle.json` endpoint

**Validation:** Running `aicl compile examples/enterprise-service-resolution/*.aicl` then `aicl materialize --target rest_api` must produce a FastAPI application that starts and responds to `curl` without errors.

**Human gate:** The Project Maintainer runs the compiled enterprise service resolution example. Reviews that the output behaves as the AICL program specifies.

---

## Human governance decisions — the complete list

The Project Maintainer makes exactly these governance decisions and no others:

| Decision | Trigger | What the Project Maintainer decides |
|---|---|---|
| Grammar approval | Stage 0 complete | Does the grammar correctly capture the PRM? Yes / Return with notes |
| WKG anchor set approval | Stage 1 complete | Is this anchor set appropriate in scope and quality? Yes / Adjust scope |
| Validator tool approval | Stage 2 complete | Do validators run correctly on example files? Yes / Return with notes |
| Escalation arbitration | Any stage emits `escalation_required` | Which of the proposed options should be adopted? Record as ADR |
| Thesis demonstration | Stage 8 complete | Does the compiled enterprise example produce a working REST API? Yes → publish |

The Project Maintainer does not write code. The Project Maintainer does not design algorithms. The Project Maintainer does not choose parser generators. The Project Maintainer does not format error messages. These are AI decisions.

---

## Escalation protocol

When any stage emits `escalation_required`:

1. The escalation JSON is added as a GitHub issue with label `architectural-escalation`
2. The Project Maintainer reviews the `options_considered` array.
3. The Project Maintainer selects an option or proposes a new one in plain language.
4. The implementing agent receives the Project Maintainer's decision.
5. The decision is recorded as an ADR in `spec/decisions/`

No escalation should be left open for more than 48 hours. If the Project Maintainer is unavailable, the pipeline pauses at the escalation point.

---

## The self-validation test

When Stage 8 is complete, the following must be true:

```
aicl compile examples/enterprise-service-resolution/ \
  && aicl prove enterprise-service-resolution \
  && aicl materialize --target rest_api enterprise-service-resolution \
  && curl -X POST http://localhost:8000/refunds/evaluate \
       -H "Content-Type: application/json" \
       -d '{"order_id": "ORD-001", "customer_id": "CUST-001", "refund_amount": 150}' \
  | grep '"eligible"'
```

This command sequence must succeed without errors. When it does, AICL has proven its thesis on itself. An AICL program has been compiled by an AI-built pipeline, governed by a human, and materialised into a running application. No human engineer wrote the compiler.

---

*This protocol is read by AI agents. It is the build plan for AICL's self-bootstrapping. Attribution: AICL originated by Marc Johnston, NeuroSync AI Dynamics Pty Ltd, Cape Town, South Africa.*
