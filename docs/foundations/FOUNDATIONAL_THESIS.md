# Foundational Thesis

AICL is founded on the claim that the next major programming abstraction for AI-built software should not be optimized around human syntax. It should be optimized around machine-verifiable intent, semantic contracts, policy-bounded autonomy, and cross-platform materialization.

## 1. The Legacy Programming Assumption

Most programming languages were designed for human authors sitting at keyboards. Their syntax, module systems, editor workflows, package ecosystems, and error surfaces assume that a human programmer is the primary author and that the language should make implementation logic legible and controllable to that person.

That assumption remains valid for many systems. Python, Rust, TypeScript, Kotlin, Swift, SQL, C++, Java, Prolog, and Haskell are serious tools. AICL is not an attempt to erase their value. The limitation is that these languages make code text the main source of authority, while AI-built software increasingly needs explicit semantic contracts, proof obligations, policy constraints, capability boundaries, provenance records, and materialization targets.

## 2. The AI-Native Assumption

AI systems can operate over semantic graphs, proof obligations, policies, constraints, and structured contracts more naturally than over human-oriented syntax alone. They can inspect dependencies among goals, policies, capabilities, resources, evidence, risks, and output targets when those relationships are first-class artifacts rather than comments, conventions, or scattered implementation details.

AICL assumes that AI systems should not be forced to infer core semantic obligations from legacy code structure after the fact. The language should expose those obligations directly.

## 3. AICL's Core Claim

AICL treats goals, policies, constraints, capabilities, resources, proofs, and provenance as first-class compilation objects. These objects are not decorative metadata. They determine what may be generated, what must be proven, what must remain a residual runtime obligation, what capabilities may be used, and what target artifacts may be materialized.

The semantic source of truth is the grounded contract and its related IR, ICC, SHG, WKG, proof, and provenance artifacts. Surface syntax may help humans inspect the system, but it does not override grounded semantic authority.

## 4. Human Readability Is Secondary But Not Irrelevant

Human-readable projections are useful for inspection, governance, debugging, teaching, and public review. AICL should remain reviewable by humans, especially where policy, safety, security, provenance, and deployment decisions are involved.

Human readability is not the primary optimization target. The root design objective is machine-evaluable semantic structure. A human-facing projection can be generated from canonical artifacts, but it should not become the source of authority merely because it is comfortable to read.

## 5. Materialization Rather Than Hand-Coding

AICL should compile or materialize into conventional codebases where necessary. The output of an AICL pipeline may include Python, TypeScript, Kotlin, Swift, SQL, Rust, Java, configuration files, deployment manifests, test suites, policy reports, provenance logs, or documentation.

Those outputs are materialization targets. They are not the canonical semantic source of truth. AICL exists to define the intent, constraints, policy boundaries, proof obligations, provenance, and target requirements that guide materialization.

## 6. Research Status

AICL is under active design. This repository is currently a research specification and public design workspace unless and until a working compiler is present in the repository and documented as such.

Unresolved kernel questions are tracked openly. The project should expose weak points such as type authority, proof tiers, grammar and IR strategy, operational semantics, and compile-time versus runtime obligations as formal design obligations rather than hiding them behind finished-language claims.
