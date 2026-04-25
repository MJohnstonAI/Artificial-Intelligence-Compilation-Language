# AI Model Evaluation Protocol

## Purpose

This protocol defines how external reviewers should evaluate AICL using AI models. The goal is not to redesign AICL as a familiar legacy programming language. The goal is to test whether AICL is internally coherent as an AI-native semantic compilation research project.

## Steps

1. Select a model.

   Use a frontier AI model or a strong local model capable of long-context technical review.

2. Provide repository context.

   Give the model the repository files or a representative bundle including `README.md`, the foundation docs, kernel docs, evaluation docs, core specs, WKG core docs, and examples.

3. Use `docs/evaluation/AI_EVALUATION_PROMPT.md`.

   Copy the prompt exactly or state any changes made to it.

4. Require structured output.

   Ask the model to produce findings in the categories listed by the prompt and schema.

5. Submit result through a GitHub issue template.

   Use `.github/ISSUE_TEMPLATE/ai-model-evaluation.md` for full evaluations or `.github/ISSUE_TEMPLATE/contradiction-report.md` for focused contradictions.

## Evaluation Areas

- Type authority coherence
- Proof-tier coherence
- Grammar/IR separation
- Operational semantics completeness
- Compile/runtime boundary correctness
- Legacy-language contamination
- Overclaiming
- Missing related work
- Contradictions across docs
- Whether AICL remains AI-native

## Review Standard

The model should evaluate AICL on its own terms. It should ask whether the repository succeeds at defining an AI-native semantic compilation layer for AI systems, not whether it looks like Python, Rust, TypeScript, Prolog, Haskell, YAML, JSON, or a conventional DSL.

Useful output should identify contradictions, underspecified semantics, missing proof obligations, unclear materialization boundaries, false proof claims, or places where the repository accidentally invites legacy-language misreadings.
