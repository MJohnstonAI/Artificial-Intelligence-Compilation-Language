# Meta-Circularity Research Track

## Purpose

This track explores whether AICL grammar, type rules, and semantic constraints can eventually be represented as WKG-governed objects.

The goal is not self-modifying syntax. The goal is to examine whether the language can describe parts of its own governance model without undermining stability.

## Status

Speculative.

## Boundary

Meta-circularity must not enter the canonical kernel unless it has:

- termination guarantees,
- semantic-stability proofs,
- versioned grammar governance,
- rollback rules,
- WKG snapshot compatibility,
- clear authority boundaries.

No self-modifying grammar or runtime kernel mutation is permitted by this research track.

## Research Questions

1. Can grammar productions be WKG-anchored without becoming mutable during compilation?
2. Can type rules be versioned as governed semantic objects?
3. Can compiler behavior cite WKG grammar anchors without circular authority?
4. What proof obligations are required before a grammar update becomes admissible?

## Non-Goals

- live grammar mutation,
- self-modifying compiler behavior,
- replacing Kernel v0.1.1,
- allowing WKG anchors to override compiler safety rules.
