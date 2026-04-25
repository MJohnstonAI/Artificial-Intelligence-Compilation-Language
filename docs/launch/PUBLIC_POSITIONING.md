# Public Positioning

## Approved Positioning

AICL is an AI-native semantic compilation research project.

It is designed for AI systems first.

It treats intent, goals, constraints, policies, capabilities, proof obligations, resource budgets, and provenance as first-class compilation objects.

It does not ask humans to redesign it around legacy programming-language preferences.

The preferred review method is AI-model evaluation: run advanced AI models against the repository and submit structured contradiction reports, counterexamples, weak-point analyses, and improvement proposals.

## Status Language

Use honest status language:

- "AICL is a pre-implementation research specification" if no working compiler is present.
- "AICL is under active design" for unresolved kernel questions.
- "This document proposes" or "This draft defines" for material that is not implemented.
- "Materialization targets may include Python, TypeScript, Kotlin, Swift, SQL, Rust, or other languages" when describing outputs.

## Forbidden or Risky Wording

| Avoid | Reason | Safer alternative |
| --- | --- | --- |
| "official multi-model consortium" | Risky unless legally and operationally true. | "AI-assisted review and commentary from multiple model sources" |
| "finished compiler" | False unless implemented and documented. | "pre-implementation research specification" |
| "guaranteed proof" for non-Tier-1 obligations | Overstates probabilistic or heuristic evidence. | "Tier 2 statistical assurance", "Tier 3 model-assisted justification", or "residual runtime obligation" |
| "replaces all programming languages" | Misstates the layer AICL targets. | "defines a semantic compilation layer above implementation targets" |
| "affiliated with OpenAI/Anthropic/Google/xAI" | False unless formally documented. | "not affiliated with any model provider" |

## Public Boundary

Public descriptions should be strong but precise. The claim is not that AICL already surpasses implemented languages as a compiler. The claim is that AI-built software needs a semantic authority layer above ordinary code, and AICL is an attempt to define that layer rigorously.
