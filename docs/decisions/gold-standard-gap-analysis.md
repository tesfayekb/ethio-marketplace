# Gold-standard gap analysis (record)

Date: 2026-08-01. Status: **record only** — no code, schema or config changed by this analysis.
Full reasoning lives in the supervisor analysis of 2026-08-01; this is the repo-side summary.

## Method

An operator-requested forward scan compared the frozen ethio.com spec against what a
"gold-standard" classifieds marketplace carries, then triaged every gap by **retrofit cost** —
how expensive the item becomes if it is not designed for now:

- **Tier 1 — adopt now** (cheap now, schema/architecture rebuild later)
- **Tier 2 — track the seam** (design must not preclude it; build later)
- **Tier 3 — defer** (additive later, no structural debt)

## Tier 1 — adopted

| Item                                  | Landed as        |
| ------------------------------------- | ---------------- |
| Server-side EXIF/GPS strip on uploads | DEC-009, REQ-036 |
| CAPTCHA-ready auth (Turnstile seam)   | DEC-010, REQ-037 |
| Reputation/ratings seam               | DEC-011          |
| Search-indexability + rate-limiting   | REQ-038          |

## Tier 2 — tracked (seam planned, build later)

- Generic notification event→channel pipeline (confirm REQ-031 models one pipeline, not per-feature one-offs).
- User reporting/flagging as a planned trust-&-safety feature (extends REQ-028).
- Accessibility elevated to a standing requirement; axe checks to join the E2E suite later.

## Tier 3 — deferred (no structural debt)

Payments (already archived — no payments in v1), favourites/saved searches, multi-currency
settlement, KYC/identity verification, a third-party public API, and dispute resolution.

## Pillar check

Every adopted item was tested against the five product pillars and preserves them:
**user-friendly** (Turnstile is invisible; EXIF strip is silent), **lightweight** (no client
payload added; work is server-side), **security** (all four Tier-1 items are hardening),
**multilingual** (no new user-visible surface without translation keys), **mobile-first**
(nothing added to the critical mobile path).

## Consequence

Governing instructions amended to v1.3: G13 phase-gate completeness, G14 publish-before-retest,
G15 every feature ships with its E2E test green in CI before its phase closes.
