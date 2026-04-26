# AICL Public Review Guide

This guide is for developers, researchers, AI-system builders, and model users reviewing AICL for the first time.

AICL is a draft research specification for an AI-native semantic compilation layer. It is not currently a working compiler.

## 1. What AICL Is

AICL explores whether AI-built software should be specified through semantic contracts rather than human-first source code.

It treats the following as first-class build objects:

- intent,
- goals,
- policies,
- constraints,
- capabilities,
- proof obligations,
- resource budgets,
- provenance,
- materialization targets.

Conventional languages such as Python, TypeScript, Kotlin, Swift, SQL, or Rust may be materialization targets. They are not the semantic source of truth.

## 2. What AICL Is Not

AICL is not:

- a finished compiler,
- a production programming language,
- a prompt-template library,
- a no-code framework,
- a replacement for all programming languages,
- a Python/Rust/TypeScript competitor at the same abstraction layer,
- an official project of any model provider.

## 3. Recommended Reading Path

For a first review, read in this order:

1. [`README.md`](../README.md)
2. [`docs/kernel/README.md`](kernel/README.md)
3. [`docs/kernel/SHG_SCHEMA.md`](kernel/SHG_SCHEMA.md)
4. [`docs/kernel/HAIG_SPEC.md`](kernel/HAIG_SPEC.md)
5. [`docs/kernel/PACT_COORDINATION_SPEC.md`](kernel/PACT_COORDINATION_SPEC.md)
6. [`docs/kernel/MATERIALIZER_INTERFACE.md`](kernel/MATERIALIZER_INTERFACE.md)
7. [`docs/evaluation/AI_MODEL_EVALUATION_GUIDE.md`](evaluation/AI_MODEL_EVALUATION_GUIDE.md)
8. [`examples/enterprise-service-resolution/README.md`](../examples/enterprise-service-resolution/README.md)

If you want deeper context, continue with:

- [`docs/kernel/semantic/`](kernel/semantic/)
- [`wkg/core/aicl-core-ontology-spec.md`](../wkg/core/aicl-core-ontology-spec.md)
- [`spec/programming-reference-manual.md`](../spec/programming-reference-manual.md)
- [`docs/research/README.md`](research/README.md)

## 4. Best Way to Review

The preferred review method is:

1. Read the kernel overview.
2. Run your preferred AI model against [`docs/evaluation/MODEL_REVIEW_PROMPT.md`](evaluation/MODEL_REVIEW_PROMPT.md).
3. Ask the model to cite file paths and section names.
4. Convert findings into [`docs/evaluation/STRUCTURED_FINDINGS_TEMPLATE.md`](evaluation/STRUCTURED_FINDINGS_TEMPLATE.md).
5. Submit findings using the GitHub issue templates.

## 5. Useful Feedback

Useful feedback includes:

- contradictions between documents,
- undefined or overloaded terms,
- unclear WKG type authority,
- proof-tier leakage,
- SHG schema gaps,
- compile/runtime boundary confusion,
- HAIG or PACT ambiguity,
- materializer contract weaknesses,
- unsupported claims,
- research-track scope risks,
- implementation blockers for the minimal reference pipeline.

## 6. Less Useful Feedback

Less useful feedback includes:

- asking AICL to become Python-like,
- judging AICL primarily by human syntax ergonomics,
- reducing AICL to YAML/JSON,
- treating research tracks as accepted kernel features,
- assuming the project claims to have a working compiler,
- proposing large rewrites without identifying the minimal contradiction being fixed.

## 7. Public Review Boundary

AICL should be evaluated on its own stated premise:

> AICL is an AI-native semantic compilation layer where intent, policy, proof, capability, provenance, and materialization are first-class build objects.

Human-readable syntax is useful for inspection and governance, but it is not the root design objective.

## 8. Contribution Paths

Use:

- AI model evaluation issue template for structured model reviews.
- Contradiction report issue template for conflicting claims.
- Challenge brief issue template for test cases.
- Pull requests only for narrow, concrete corrections.

## 9. Current Implementation Status

AICL does not yet have a reference compiler.

The next target is a minimal reference pipeline:

```text
Brief → ICC → WKG grounding → SHG validation → proof obligation classification → materializer stub
```

Reviewers interested in implementation should focus on this pipeline before proposing broader runtime systems.
