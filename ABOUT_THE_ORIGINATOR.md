# Enterprise Service Resolution — Serious AICL Demonstration

This example exists to demonstrate AICL as a **serious semantic systems language**, not as a game-specific language.

## Why this demo

AICL should first be understood through a problem class that is:
- commercially real
- multi-platform
- policy-sensitive
- multimodal
- workflow-heavy
- agent-compatible
- verifiable

A customer and service-resolution platform satisfies all of these.

## Scenario

The system must:
- ingest customer cases through web, mobile, and desktop channels
- classify them using bounded AI capabilities
- verify eligibility against policy and billing state
- resolve cases through refund, store credit, escalation, or closure
- enforce privacy, residency, auditability, and latency budgets
- coordinate among multiple agents and human approval paths where necessary

## What this demonstrates

This example demonstrates:
- WKG-backed type resolution
- goal, maintain, avoid semantics
- capability-bounded OpaqueIntents
- IFC policy flows
- contradiction-aware policy imports
- multi-agent workflow routing
- cross-platform materialization targets
- ICC-rooted semantic contracts
- proof gates and human escalation paths

## Conceptual AICL Example

```aicl
app "EnterpriseServiceResolution" {
  import module Support.CoreWorkflow
  import capabilitypack CRM_Billing_Core
  import policypack GDPR_POPIA_Minimal
  import targetpack Web.Vercel
  import targetpack Android.Compose
  import targetpack Windows.WinUI

  goal CaseResolved
  maintain PolicyCompliant
  maintain AuditTraceAvailable
  avoid DataLeak
  avoid UnauthorizedRefund

  budget {
    cost.usd_per_session <= 0.03
    latency.p95_ms <= 250
    memory.mb <= 256
  }

  agent Triage {
    goal: ClassifyIncomingCase
    capabilities: [CRM.Read, LLM.Classify]
    coordination: PACT
    autonomy {
      action: 0.8
      goal: 0.0
      resource: 0.2
      delegation: false
    }
  }

  agent PolicyCheck {
    goal: ValidateEligibility
    capabilities: [PolicyEngine.Read, Billing.Read]
    coordination: PACT
    autonomy {
      action: 0.5
      goal: 0.0
      resource: 0.1
      delegation: false
    }
  }

  agent Executor {
    goal: ResolveCase
    capabilities: [Payments.Refund, StoreCredit.Issue, Case.Close]
    coordination: PACT
    autonomy {
      action: 0.6
      goal: 0.0
      resource: 0.2
      delegation: false
    }
  }

  flow ResolutionFlow {
    Triage ->
    PolicyCheck ->
    [if eligibility_passes: Executor | else: escalate_to_human]
  }
}
```

## Why this is a better public demonstration

This example signals that AICL is aimed at:
- enterprise software
- policy-aware systems
- multimodal AI workflows
- cross-platform application generation
- serious research in programming languages and AI systems

It avoids the impression that AICL is primarily a niche language for games or entertainment demos.
