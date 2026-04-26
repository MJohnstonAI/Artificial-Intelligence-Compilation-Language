# MachineICC Draft

## 1. Definition

A `MachineICC` is an experimental machine-verifiable intent contract for autonomous AICL compilation paths.

It allows a machine agent to sign an intent contract only when the compilation falls inside a pre-approved risk envelope and all mandatory proof and policy conditions are satisfied.

## 2. Relationship to ICC and HAIG

MachineICC does not replace ICC.

MachineICC is a restricted subtype or mode of ICC used when no human arbitration is required.

MachineICC does not replace HAIG.

If a compilation requires human, legal, compliance, or project-owner authority, HAIG remains mandatory.

## 3. Required Conditions

A MachineICC may be issued only if:

1. all identifiers resolve against the pinned WKG snapshot,
2. all Tier 1 obligations are discharged,
3. no Tier 1 risk acceptance is required,
4. no equal-priority policy conflict exists,
5. no unresolved WKG ambiguity exists,
6. all capabilities are declared and bounded,
7. all OpaqueIntent boundaries have policy attestation,
8. all residual Tier 2 obligations are represented in the ROM,
9. risk score is below the configured threshold,
10. the signing agent has a valid machine identity for the sandbox.

## 4. MachineICC Schema Sketch

```text
MachineICC ::= {
  icc_hash: Hash
  machine_issuer: MachineAgentId
  issuer_public_key: PublicKeyRef
  risk_envelope: RiskEnvelopeRef
  proof_summary: ProofSummary
  residuals_manifest_hash: Hash
  wkg_snapshot_hash: Hash
  issued_at: ISO8601
  expires: ISO8601
  signature: CryptographicSignature
}
```

## 5. Risk Envelope Sketch

```text
RiskEnvelope ::= {
  id: RiskEnvelopeId
  permitted_domains: [EnvironmentRef]
  max_capability_risk: RiskLevel
  forbidden_capabilities: [CapabilityRef]
  required_policies: [PolicyRef]
  max_residual_tier: 2
  requires_haig_on: [HAIGRequestType]
}
```

## 6. Failure Modes

A MachineICC must fail closed if:

- any Tier 1 obligation is failed or undischarged,
- the WKG snapshot hash does not match the ICC,
- policy conflict resolution requires HAIG,
- capability declarations exceed the risk envelope,
- OpaqueIntent attestation is missing,
- provenance or signature verification fails.

## 7. Research Questions

1. Can risk envelopes be expressed as WKG-grounded policy objects?
2. Can machine identity and provenance be verified without weakening ICC authority?
3. Which compilation paths are low-risk enough for autonomous signing?
4. How should MachineICC artifacts be labeled to avoid implying human approval?

## 8. Status

This is a research draft only. It is not accepted kernel behavior.
