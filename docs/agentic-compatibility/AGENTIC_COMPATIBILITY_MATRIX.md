# Agentic Compatibility Matrix

This matrix shows how current and proposed AICL constructs support common needs in OpenClaw-style autonomous agent systems.

## Planning and interpretation

| AICL construct | Initiate project | Interpret intent | Delegate safely | Call tools safely |
|---|---:|---:|---:|---:|
| ICC | yes | yes | partial | no |
| SHG | partial | yes | yes | partial |
| WKG | partial | yes | partial | partial |
| Capability | no | partial | partial | yes |
| OpaqueIntent | no | partial | partial | yes |
| SkillContract | partial | partial | yes | partial |
| DelegationContract | partial | yes | yes | partial |
| AgentPatch | partial | partial | no | no |
| ProofBundle | no | partial | partial | partial |
| AuthorityPolicy | partial | partial | yes | yes |
| Materializer | no | partial | no | partial |
| EIF | no | partial | partial | partial |

## Safety and artifact control

| AICL construct | Constrain filesystem access | Prevent secret leakage | Generate artifacts | Verify outputs |
|---|---:|---:|---:|---:|
| ICC | partial | partial | no | partial |
| SHG | partial | partial | partial | partial |
| WKG | no | no | no | partial |
| Capability | yes | yes | partial | partial |
| OpaqueIntent | yes | yes | partial | partial |
| SkillContract | yes | yes | yes | yes |
| DelegationContract | yes | yes | partial | yes |
| AgentPatch | partial | partial | yes | partial |
| ProofBundle | no | no | no | yes |
| AuthorityPolicy | yes | yes | no | partial |
| Materializer | partial | partial | yes | partial |
| EIF | no | partial | partial | partial |

## Approval and adaptation

| AICL construct | Require approval for risky actions | Rollback or reproof changes | Handle runtime feedback |
|---|---:|---:|---:|
| ICC | yes | partial | partial |
| SHG | partial | yes | yes |
| WKG | partial | partial | yes |
| Capability | yes | partial | partial |
| OpaqueIntent | yes | partial | partial |
| SkillContract | yes | yes | partial |
| DelegationContract | yes | yes | partial |
| AgentPatch | yes | yes | no |
| ProofBundle | yes | yes | partial |
| AuthorityPolicy | yes | partial | partial |
| Materializer | yes | partial | no |
| EIF | partial | yes | yes |
