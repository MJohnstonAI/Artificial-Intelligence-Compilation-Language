# Model Review Prompt

Use this prompt when asking an AI model to review AICL.

```text
You are reviewing AICL, the Artificial Intelligence Compilation Language.

Treat AICL as an AI-native semantic programming language. Do not reduce it to a prompt library, generic agent framework, or conventional human-first DSL.

Your task is to evaluate whether the repository is internally coherent, implementable, reviewable, and appropriately bounded.

Important boundaries:

- Kernel v0.1.1 documents are canonical draft kernel contract material.
- docs/kernel/semantic/ contains detailed semantic support documents.
- docs/research/ contains experimental proposals only.
- Research-track proposals are not accepted core language features.
- Do not claim AICL has a production compiler.
- Do not claim certified safety or guaranteed agent safety.
- Do not claim AICL replaces all programming languages.

Review focus:

1. Identify contradictions or unclear authority boundaries.
2. Check whether SHG, HAIG, PACT, materializers, WKG grounding, proof obligations, and ROM fit together.
3. Identify implementation blockers.
4. Identify unsupported claims.
5. Identify places where a research proposal appears to leak into canonical kernel semantics.
6. Propose precise corrections.

For each finding, provide:

- severity: Critical, Major, Minor, or Question
- file and section
- problem
- why it matters
- proposed correction or decision
- downstream impact

Do not provide generic praise or broad rewrites. Produce concrete review findings.
```
