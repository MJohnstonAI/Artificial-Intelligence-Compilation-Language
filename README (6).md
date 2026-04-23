{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "AICL Agent Capsule",
  "type": "object",
  "required": [
    "agent_id",
    "goal",
    "capabilities"
  ],
  "properties": {
    "agent_id": {
      "type": "string"
    },
    "goal": {
      "type": "string"
    },
    "capabilities": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "coordination": {
      "type": "string"
    },
    "autonomy": {
      "type": "object"
    },
    "constraints": {
      "type": "object"
    },
    "proofs": {
      "type": "object"
    }
  }
}