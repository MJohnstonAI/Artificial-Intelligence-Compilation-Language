# AICL Public Positioning and AI-Native Intent Plan

## Open Problem

AICL already describes itself as AI-native, semantic, proof-aware, and agent-compatible, but the public entry points do not yet make the evaluation boundary hard enough. A new reviewer can still misread the repository as a conventional human-first programming-language proposal, a DSL, a prompt-template framework, or a Python/Rust/TypeScript competitor. The update should make the semantic authority layer explicit before any syntax or implementation discussion.

## 1. Current Repository Structure Summary

The repository currently has a strong research-doc structure with these major areas:

- Top-level identity and governance documents: `README.md`, `WHY_AICL.md`, `MANIFESTO.md`, `ABOUT_THE_ORIGINATOR.md`, `AI_CONTRIBUTOR_GUIDE.md`, `AGENTS.md`, `SKILLS.md`, `CONTRIBUTING.md`, `GOVERNANCE.md`, `SECURITY.md`, licensing, attribution, and audit/phase reports.
- `spec/`: the main formal and semi-formal language material, including `programming-reference-manual.md`, `unified-spec-v1.0-draft.md`, `working-draft.md`, architecture notes, history, and schemas.
- `wkg/core/`: the WKG-backed ontology, schema, canonical registry, integration memo, examples, contradiction corpus, and TypeScript schema source.
- `examples/`: current public examples, including `studypath-offline-learning-planner`, `enterprise-service-resolution`, and `cross-platform-app-brief`.
- `commentary/`: model/source commentary from Claude, Gemini, Grok, and ChatGPT.
- `kernel/`: currently reserved for future formal core material and containing a `README.md`.
- `tools/`: reserved for validators, parsers, and supporting utilities.
- `roadmap/`: implementation and demo planning material.
- `.github/ISSUE_TEMPLATE/`: currently contains `bug_report.md` and `language_proposal.md`.

There is no `docs/` public positioning tree yet. This plan file creates the first `docs/implementation-plans/` entry and intentionally stops before broader implementation.

## 2. Files Proposed to Create

The implementation phase should create:

- `docs/foundations/FOUNDATIONAL_THESIS.md`
- `docs/foundations/AI_NATIVE_DESIGN_PRINCIPLES.md`
- `docs/foundations/WHAT_AICL_IS_NOT.md`
- `docs/foundations/HUMAN_REVIEW_BOUNDARY.md`
- `docs/foundations/LEGACY_LANGUAGE_MISREADINGS.md`
- `docs/kernel/KERNEL_WEAK_POINTS_REGISTER.md`
- `docs/kernel/TYPE_AUTHORITY_RESOLUTION.md`
- `docs/kernel/PROOF_TIER_SEMANTICS.md`
- `docs/kernel/GRAMMAR_AND_IR_STRATEGY.md`
- `docs/kernel/OPERATIONAL_SEMANTICS.md`
- `docs/kernel/COMPILE_RUNTIME_BOUNDARY.md`
- `docs/evaluation/AI_MODEL_EVALUATION_PROTOCOL.md`
- `docs/evaluation/AI_EVALUATION_PROMPT.md`
- `docs/evaluation/EVALUATION_OUTPUT_SCHEMA.md`
- `docs/evaluation/CONTRADICTION_REPORT_TEMPLATE.md`
- `docs/launch/PUBLIC_POSITIONING.md`
- `docs/launch/PLATFORM_POSTS.md`
- `docs/launch/PUBLIC_LAUNCH_CHECKLIST.md`
- `.github/ISSUE_TEMPLATE/ai-model-evaluation.md`
- `.github/ISSUE_TEMPLATE/contradiction-report.md`
- `.github/ISSUE_TEMPLATE/challenge-brief.md`

This plan file has been created first:

- `docs/implementation-plans/aicl-public-positioning-and-ai-native-intent-plan.md`

## 3. Files Proposed to Modify

The implementation phase should modify:

- `README.md`
- `CONTRIBUTING.md`

No existing specification, WKG, commentary, example, licensing, attribution, or origin file should be deleted. The update should add public navigation and clarification while preserving existing canonical material.

## 4. Exact Folder Structure After the Change

The requested public-positioning structure after implementation should include:

```text
README.md
CONTRIBUTING.md
docs/
  implementation-plans/
    aicl-public-positioning-and-ai-native-intent-plan.md

  foundations/
    FOUNDATIONAL_THESIS.md
    AI_NATIVE_DESIGN_PRINCIPLES.md
    WHAT_AICL_IS_NOT.md
    HUMAN_REVIEW_BOUNDARY.md
    LEGACY_LANGUAGE_MISREADINGS.md

  kernel/
    KERNEL_WEAK_POINTS_REGISTER.md
    TYPE_AUTHORITY_RESOLUTION.md
    PROOF_TIER_SEMANTICS.md
    GRAMMAR_AND_IR_STRATEGY.md
    OPERATIONAL_SEMANTICS.md
    COMPILE_RUNTIME_BOUNDARY.md

  evaluation/
    AI_MODEL_EVALUATION_PROTOCOL.md
    AI_EVALUATION_PROMPT.md
    EVALUATION_OUTPUT_SCHEMA.md
    CONTRADICTION_REPORT_TEMPLATE.md

  launch/
    PUBLIC_POSITIONING.md
    PLATFORM_POSTS.md
    PUBLIC_LAUNCH_CHECKLIST.md

.github/
  ISSUE_TEMPLATE/
    ai-model-evaluation.md
    contradiction-report.md
    challenge-brief.md
```

The broader repository should still retain the existing `spec/`, `wkg/`, `examples/`, `commentary/`, `kernel/`, `tools/`, `roadmap/`, top-level governance, licensing, attribution, and audit files.

## 5. Core Messaging Changes

The implementation should make these messages visible from the README first screen and then reinforce them in supporting docs:

- AICL means Artificial Intelligence Compilation Language.
- AICL is an AI-native semantic compilation research project.
- AICL is designed for AI systems first, not human programmers first.
- AICL is currently a pre-implementation research specification unless the repository later contains a working compiler.
- The canonical artifacts are semantic contracts, ICC, SHG, WKG-grounded meaning, proof obligations, policy/capability boundaries, provenance, and materialization outputs.
- Human-readable syntax can exist, but only as a projection layer. It is not the root semantic authority.
- Python, Rust, TypeScript, Kotlin, Swift, SQL, and similar languages may be materialization targets, not the semantic source of truth.
- AICL should not be evaluated as a nicer Python, a human-first DSL, a prompt-template system, or a framework wrapper.
- The preferred evaluation method is to run advanced AI models against the repository and submit structured contradiction reports, counterexamples, weak-point analyses, and minimal improvement proposals.

## 6. Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| The update could sound like marketing instead of research positioning. | Use sober technical prose, state pre-implementation status, and avoid superiority claims that depend on an implemented compiler. |
| The update could alienate human reviewers. | Make clear that human review is welcome, but bounded by AICL's AI-native objective and structured evaluation protocol. |
| New docs could duplicate existing canonical specs. | Keep new docs as public positioning, evaluation protocol, and kernel weak-point registers; link to existing specs instead of replacing them. |
| Legacy-language comparisons could become defensive. | Use firm but respectful explanations: legacy languages are excellent implementation targets, but operate at a different layer. |
| WKG and kernel authority could be blurred. | State the rule directly: WKG supplies semantic meaning, kernel enforces structure, identifiers do not gain authority from source text alone. |
| Proof language could overclaim. | Separate Tier 1 formal proof from probabilistic and heuristic assurances, and require residual runtime obligations where static proof is unavailable. |
| Runtime obligations could be misrepresented as compile-time guarantees. | Introduce a Residual Obligation Manifest and explicitly forbid static claims about dynamic facts. |

## 7. How the Changes Preserve AICL's AI-Native Intent

The proposed changes preserve the AI-native intent by placing semantic contracts, grounded identifiers, proof obligations, capability containment, policy-bounded autonomy, provenance, and materialization before human syntax. The new foundation docs should make human-readable syntax useful for inspection and governance, while stating that AI systems should primarily operate over AICL-IR, AICL-SHG, AICL-ICC, and WKG-grounded artifacts.

The kernel docs should also preserve AI-native intent by treating weak points as formal design obligations: type authority, proof tiers, grammar/IR separation, operational semantics, and compile/runtime boundaries. This frames AICL as a semantic compilation layer for AI-driven software generation, verification, repair, and materialization, not a conventional surface-language proposal.

## 8. How the Changes Prevent Legacy-Language Misreadings

The implementation should pre-empt legacy-language misreadings in four ways:

1. The README should include a dedicated section titled `Why this is not just Python/Rust/TypeScript with extra steps`.
2. `docs/foundations/WHAT_AICL_IS_NOT.md` should explicitly reject the framing of AICL as a prompt system, no-code tool, conventional DSL, Python wrapper, or universal replacement for implementation languages.
3. `docs/foundations/LEGACY_LANGUAGE_MISREADINGS.md` should answer common claims such as `Python can already do this`, `Why not YAML/JSON`, and `This is just prompts`.
4. The evaluation docs and issue templates should ask reviewers to test AICL on its own stated objective: AI-native semantic compilation with grounded meaning, proof tiers, policy/capability semantics, provenance, and residual obligations.

The key distinction should remain consistent: legacy languages may implement generated systems or AICL tooling, but they are materialization targets and runtime substrates, not the canonical semantic authority layer.

## 9. Verification Checklist

Before considering the implementation complete, verify:

- [ ] `README.md` first screen states AI-native semantic compilation, AI-systems-first design, and honest pre-implementation status.
- [ ] `README.md` includes `Why this is not just Python/Rust/TypeScript with extra steps`.
- [ ] `README.md` includes `How to evaluate AICL`.
- [ ] `README.md` links to the new foundations, kernel, evaluation, and launch docs.
- [ ] `CONTRIBUTING.md` prioritizes AI model evaluations, contradiction reports, challenge briefs, related work, kernel proposals, and ICC/SHG artifacts.
- [ ] `CONTRIBUTING.md` says proposals should preserve AICL's AI-native premise and should not primarily make AICL resemble a human-first legacy language.
- [ ] `docs/foundations/FOUNDATIONAL_THESIS.md` states the thesis around machine-verifiable intent, semantic contracts, policy-bounded autonomy, and cross-platform materialization.
- [ ] `docs/foundations/AI_NATIVE_DESIGN_PRINCIPLES.md` includes all ten required principles with explanation, legacy-language trap avoided, and AICL-native direction.
- [ ] `docs/foundations/WHAT_AICL_IS_NOT.md` explicitly rejects the required misframings and includes the Python clarification.
- [ ] `docs/foundations/HUMAN_REVIEW_BOUNDARY.md` distinguishes useful from less useful review.
- [ ] `docs/foundations/LEGACY_LANGUAGE_MISREADINGS.md` covers DSL, Python, YAML/JSON, prompt, and readability misunderstandings.
- [ ] `docs/kernel/KERNEL_WEAK_POINTS_REGISTER.md` lists all five weak points as design obligations.
- [ ] `docs/kernel/TYPE_AUTHORITY_RESOLUTION.md` states WKG as the single semantic authority and includes the identifier-to-materialization flow.
- [ ] `docs/kernel/PROOF_TIER_SEMANTICS.md` prevents Tier 3 or probabilistic claims from satisfying Tier 1 obligations.
- [ ] `docs/kernel/GRAMMAR_AND_IR_STRATEGY.md` separates AICL-H, AICL-IR, AICL-SHG, and AICL-ICC.
- [ ] `docs/kernel/OPERATIONAL_SEMANTICS.md` defines the lifecycle and state tuple `S = <I, W, G, P, M, R>`.
- [ ] `docs/kernel/COMPILE_RUNTIME_BOUNDARY.md` defines compile-time obligations, residual runtime obligations, and Residual Obligation Manifest.
- [ ] `docs/evaluation/AI_MODEL_EVALUATION_PROTOCOL.md` gives clear external evaluation steps and areas.
- [ ] `docs/evaluation/AI_EVALUATION_PROMPT.md` instructs models not to redesign AICL as Python, Rust, TypeScript, Prolog, Haskell, or a conventional DSL.
- [ ] `docs/evaluation/EVALUATION_OUTPUT_SCHEMA.md` includes the required fields.
- [ ] `docs/evaluation/CONTRADICTION_REPORT_TEMPLATE.md` includes preservation checks for AI-native intent and legacy-language drift.
- [ ] `docs/launch/PUBLIC_POSITIONING.md` includes approved positioning, risky wording, and safer alternatives.
- [ ] `docs/launch/PLATFORM_POSTS.md` includes GitHub, Hacker News, r/ProgrammingLanguages, r/MachineLearning, Dev.to, and LinkedIn drafts.
- [ ] `docs/launch/PUBLIC_LAUNCH_CHECKLIST.md` covers status, weak points, evaluation protocol, issue templates, affiliation claims, compiler/proof claims, examples, contribution boundaries, legacy-language misreadings, and public post review.
- [ ] GitHub issue templates exist for AI model evaluation, contradiction report, and challenge brief.
- [ ] Existing useful files remain intact.
- [ ] No new text claims official affiliation with OpenAI, Anthropic, Google, xAI, or any model provider.
- [ ] No new text claims a finished compiler or guaranteed proof where the repository does not support that claim.

## 10. Implementation Stop Point

This plan is the only file to create before approval. No README, CONTRIBUTING, docs/foundations, docs/kernel, docs/evaluation, docs/launch, or GitHub issue template implementation should occur until Marc explicitly replies:

`[APPROVE]`

Awaiting Marc approval
