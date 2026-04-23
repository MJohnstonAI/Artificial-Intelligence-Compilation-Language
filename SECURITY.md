{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "AICL Skill Contract",
  "type": "object",
  "required": [
    "name",
    "class",
    "inputs",
    "outputs"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "class": {
      "type": "string"
    },
    "inputs": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "outputs": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "sandbox": {
      "type": "object"
    },
    "budgets": {
      "type": "object"
    },
    "guarantees": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}