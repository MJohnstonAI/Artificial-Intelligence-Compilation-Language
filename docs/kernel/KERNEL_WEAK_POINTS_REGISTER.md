# Kernel Weak Points Register

This register does not hide weak points. It treats them as formal design obligations for an AI-native semantic compilation language.

## 1. Type Authority

Risk: AICL could accidentally create two competing semantic authorities: kernel type classes and WKG anchors.

Why it matters: If local identifiers or kernel categories can define meaning independently of WKG grounding, proof obligations and materialization rules may bind to unstable or ambiguous semantics.

AICL-native resolution direction: The WKG is the single semantic authority. Kernel categories enforce structure as projections of WKG-backed anchors.

Current status: The repository has WKG core material and integration notes, but public positioning should state the authority rule more directly.

Required next artifact: A precise type authority resolution note and later a formal resolver specification.

Open questions:

- How are provisional experimental anchors governed?
- What is the exact failure mode when an identifier cannot resolve?
- How are versioned WKG anchors handled across compiled artifacts?

## 2. Proof Tiers

Risk: Probabilistic or model-assisted claims could be mislabeled as formal proof.

Why it matters: Policy, safety, privacy, security, and correctness obligations require clear proof status. A heuristic explanation cannot silently satisfy a strict proof obligation.

AICL-native resolution direction: Define proof tiers explicitly and require unresolved or non-static obligations to become residual runtime obligations.

Current status: Proof obligations are central to the project, but public docs need a short hard rule separating formal proof from statistical assurance and heuristic justification.

Required next artifact: Proof tier semantics and later a proof obligation schema update.

Open questions:

- Which obligations are allowed to block compilation?
- What metadata is required for probabilistic assurance?
- How are residual obligations monitored and reported?

## 3. Grammar

Risk: Reviewers may treat surface syntax as the language's root authority.

Why it matters: If syntax becomes the center of gravity, AICL can drift into a conventional human-first DSL and lose its AI-native semantic compilation premise.

AICL-native resolution direction: Separate AICL-H as a human-readable projection from AICL-IR, AICL-SHG, and AICL-ICC as canonical machine-facing artifacts.

Current status: Existing specs discuss language layers, but the public framing should make the projection/authority distinction unmistakable.

Required next artifact: Grammar and IR strategy note, followed by a canonical IR schema.

Open questions:

- Which artifact is the minimum compilable unit?
- How are multiple human-readable projections generated from the same canonical artifact?
- What syntax constraints are needed for round-trip review?

## 4. Operational Semantics

Risk: AICL could describe valuable artifacts without defining how they move through a compilation lifecycle.

Why it matters: AI-native semantic compilation needs state transitions: intent extraction, WKG grounding, SHG construction, proof obligation generation, proof classification, materialization planning, output generation, QA/provenance reporting, and runtime repair.

AICL-native resolution direction: Define a basic lifecycle and state tuple that can later be formalized.

Current status: The architecture and examples imply a pipeline, but a concise operational semantics note is needed for public review.

Required next artifact: Operational semantics note and later transition rules.

Open questions:

- Which transitions are deterministic?
- Which transitions may use model-assisted inference?
- Which transitions require signed certificates?

## 5. Compile-Time Obligations vs Runtime Repair

Risk: AICL could falsely imply that dynamic facts are statically proven.

Why it matters: Some obligations depend on live systems, user consent, region enforcement, real load, model output uncertainty, service failures, or runtime security conditions.

AICL-native resolution direction: Separate compile-time obligations from residual runtime obligations and require a Residual Obligation Manifest.

Current status: Runtime adaptation is an acknowledged open problem; public docs should define the boundary now.

Required next artifact: Compile/runtime boundary note and later Residual Obligation Manifest schema.

Open questions:

- Which residual obligations are acceptable at launch?
- Which residual obligations must block materialization?
- How are runtime repair actions bounded by policy and capability constraints?
