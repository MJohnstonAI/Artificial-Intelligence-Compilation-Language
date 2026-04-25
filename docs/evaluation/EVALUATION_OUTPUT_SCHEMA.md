# Evaluation Output Schema

AI model evaluations should be submitted in a structured form similar to this schema. Markdown is acceptable if all fields are present.

```json
{
  "model_name": "",
  "model_provider": "",
  "evaluation_date": "",
  "repo_commit_hash": "",
  "overall_verdict": "ready for public launch | ready with caveats | not ready",
  "contradictions": [
    {
      "summary": "",
      "files": [],
      "conflicting_claims": [],
      "why_it_matters": "",
      "severity": "low | medium | high | blocking",
      "confidence": "low | medium | high",
      "recommended_fix": ""
    }
  ],
  "weak_points": [
    {
      "area": "type authority | proof tiers | grammar/IR | operational semantics | compile/runtime boundary | other",
      "issue": "",
      "recommended_fix": "",
      "severity": "low | medium | high | blocking",
      "confidence": "low | medium | high"
    }
  ],
  "legacy_language_bias_detected": [
    {
      "location": "",
      "bias_or_misreading": "",
      "recommended_fix": "",
      "severity": "low | medium | high | blocking",
      "confidence": "low | medium | high"
    }
  ],
  "recommended_fixes": [
    {
      "fix": "",
      "minimality_reason": "",
      "preserves_ai_native_intent": true,
      "risk_of_legacy_language_drift": "low | medium | high"
    }
  ],
  "severity": "low | medium | high | blocking",
  "confidence": "low | medium | high",
  "reviewer_notes": ""
}
```

## Field Notes

- `repo_commit_hash` should identify the exact repository state reviewed.
- `overall_verdict` should judge public-launch readiness, not whether AICL is a finished compiler.
- `legacy_language_bias_detected` should flag places where the repository invites "just use Python", "just use YAML", "just a DSL", or similar misreadings.
- `recommended_fixes` should prefer minimal corrections over broad redesigns.
