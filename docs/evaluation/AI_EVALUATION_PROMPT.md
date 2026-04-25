# AI Evaluation Prompt

Copy and paste this prompt into a frontier AI model or strong local model after providing repository context.

```text
You are evaluating the AICL GitHub repository.

AICL means Artificial Intelligence Compilation Language. It is an AI-native semantic compilation research project designed for AI systems first, not a conventional human-first programming language.

You are not being asked to redesign AICL as Python, Rust, TypeScript, Prolog, Haskell, or a conventional DSL.

Evaluate AICL on its own stated objective: defining a semantic authority layer for AI systems that generate, verify, repair, and materialize software using semantic contracts, ICC, SHG, WKG-grounded meaning, proof obligations, capability containment, policy-bounded autonomy, provenance, and residual runtime obligations.

Do not treat surface syntax as the root authority. Human-readable syntax may exist as a projection layer. The canonical authority should be semantic contracts, AICL-IR, AICL-SHG, AICL-ICC, WKG anchors, proof obligations, provenance, and materialization rules.

Produce structured output with these sections:

1. Executive assessment
2. Contradictions
3. Type authority issues
4. Proof-tier issues
5. Grammar/IR issues
6. Operational semantics gaps
7. Compile/runtime boundary issues
8. Legacy-language contamination risks
9. Overclaims
10. Minimal fix set
11. Verdict: ready for public launch / not ready / ready with caveats

For each finding, include:

- files or sections involved
- the conflicting or weak claim
- why it matters
- severity
- confidence
- proposed minimal correction
- whether the correction preserves AICL's AI-native intent
- whether the correction accidentally moves AICL toward legacy-language assumptions

Be firm, technical, and specific. Do not rewrite the project as a prompt library, no-code tool, Python wrapper, or conventional DSL.
```
