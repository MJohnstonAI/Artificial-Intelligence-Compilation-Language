# Model Review Prompt

Copy this prompt into an advanced AI model after providing repository context.

```text
You are evaluating AICL — Artificial Intelligence Compilation Language.

AICL is an AI-native semantic compilation research project. It is not a conventional human-first programming language, not a prompt-template system, and not a Python/Rust/TypeScript replacement.

Your task is not to redesign AICL as a legacy language.

Your task is to evaluate whether the repository is internally coherent on its own stated premise:

AICL is a semantic compilation layer where intent, goals, policies, constraints, capabilities, proof obligations, resource budgets, provenance, and materialization targets are first-class build objects.

Evaluate the repository across these areas:

1. Kernel coherence
2. WKG type authority
3. SHG schema completeness
4. Proof-tier separation
5. Compile/runtime boundary
6. HAIG escalation semantics
7. PACT coordination semantics
8. Materializer interface integrity
9. Research-track boundary control
10. Legacy-language contamination risk
11. Overclaims versus implemented reality
12. Missing files, undefined terms, or broken references

Important constraints:

- Do not assume AICL should resemble Python, Rust, TypeScript, YAML, JSON, Haskell, Prolog, or a conventional DSL.
- Do not treat human-readable syntax as the root design objective.
- Treat conventional languages as possible materialization targets, not the source of semantic authority.
- Do not accept claims of proof unless the proof tier and mechanism support them.
- Do not let Tier 2 or Tier 3 evidence satisfy Tier 1 obligations.
- Do not treat research-track proposals as canonical kernel features.
- Do not treat AI-generated commentary as canonical unless the repository explicitly promotes it into the kernel or specification.

Produce output using this structure:

1. Executive verdict
2. Readiness score from 0 to 10
3. Critical issues
4. High-priority issues
5. Medium-priority issues
6. Low-priority issues
7. Contradictions
8. Undefined or underspecified terms
9. Overclaims
10. Legacy-language contamination risks
11. Research-track scope risks
12. Minimal fix set
13. Public launch recommendation:
   - ready
   - ready with caveats
   - not ready
14. Suggested GitHub issues to open

For each issue, include:

- severity
- affected files
- why it matters
- proposed minimal fix
- whether the fix preserves AICL’s AI-native premise

Be precise. Cite file paths and section names wherever possible.
```
