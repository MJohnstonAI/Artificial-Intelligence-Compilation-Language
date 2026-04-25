# Accessibility Proof — StudyPath

## Claim

StudyPath defines accessibility constraints for readable, low-cognitive-load learning sessions across Android, Web/PWA, and Windows target briefs.

## Tier 1 compile-time obligations

AICL can check that target briefs declare accessibility requirements, that sessions are short and bounded, and that progress indicators are not color-only. It can also verify that proof gates PG07 and PG09 are present in the target briefs.

## Tier 2 materializer obligations

AICL can require accessibility constraints and verify target declarations, but final rendered accessibility remains a target-materializer and deployment responsibility.

Contrast, font rendering, screen-reader behavior, platform accessibility APIs, and actual keyboard focus behavior must be verified by the final materializer and platform implementation.

## Cognitive-load constraints

StudyPath uses short study sessions, plain language prompts, local revision queues, and prerequisite ordering so the learner is not overloaded with unrelated topics.

## Visual accessibility

Target briefs require readable typography, contrast support, scalable text where relevant, reduced visual clutter, and no color-only progress indicators.

## Interaction accessibility

Target briefs require keyboard or platform-equivalent navigation, screen-reader compatible labels, and local controls that do not depend on network state.

## Reduced motion

Target briefs require a reduced-motion option or reduced-motion support so motion is not required for understanding progress or completing study tasks.

## What AICL does not prove

AICL does not prove final rendered contrast, font metrics, assistive-technology behavior, or deployment-specific accessibility compliance at Tier 1. Those remain target-materializer and implementation responsibilities.

## Failure conditions

This proof fails if target briefs omit readable typography, contrast, low cognitive load, short study sessions, keyboard/screen-reader compatible design intent, reduced motion, plain language, or non-color-only progress indicators.
