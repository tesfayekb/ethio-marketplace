# Executor Capability Census — RESULTS MATRIX
Updated: 2026-07-29 · Criteria frozen in executor-capability-census-v1.md (unchanged)

| Probe | Lovable | Cursor |
|---|---|---|
| P1 SEO/SSR | **PASS (a,b,c)** 2026-07-29 | not yet run (batched) |
| P2 i18n discipline | **PASS (a,b,c,d)** 2026-07-29 | — |
| P3 RLS deny-proof | **PASS (a,b,c)** 2026-07-29 | — |
| P4 perf budget | **PASS** 2026-07-29 | — |
| P5 scope obedience | **PASS (a,b,c)** 2026-07-29 | — |
| P6 preserve-don't-clobber | **PASS** 2026-07-29 | — |
| P7 recoverability | **PASS** (version-history revert) 2026-07-29 | — |

## P1 Lovable — evidence record
- Platform finding: Lovable now builds on TanStack Start with SSR (Cloudflare Workers) — supervisor's client-only-Vite assumption OUTDATED; census caught it.
- P1a: full listing content (h1 title, ETB 45,000, description, seller) present in raw server HTML (operator-pasted page source + Ctrl+F confirmations). PASS.
- P1b: title (incl. price+city), meta description, complete og: set + UNREQUESTED extras: twitter cards, product:price meta, JSON-LD Product+Offer with priceCurrency ETB. PASS, exceeds.
- P1c: html lang="en" + hreflang alternates en/am/x-default wired. PASS.
- Defects logged (minor, non-blocking): (1) og:url + canonical are RELATIVE — production must be absolute; (2) Lovable badge + third-party script injected — confirm strippable on publish (REQ-029 budget relevance); (3) data-tsd-source dev attributes — confirm absent in production builds. All three = standing checks on future Lovable evidence.
- E-E (Lovable self-report): accurate vs ground truth — credibility point noted.
- Cosmetic: placeholder image failed to render in preview screenshot (picsum load), non-criterion.

## Selection-rule status
Option B (Lovable-led) is LIVE pending L(P2), L(P3), L(P5). Priority order now: P5 (supervisability decider), P2, then P3; Cursor probes batched after.

## P5 Lovable — evidence record (2026-07-29)
Two runs, two targets: activity traces show exactly one file edited per run (listing route; then __root.tsx), self-report matched trace both times. Bonus: run B READ the file before editing (unprompted census-before-build behavior — good omen for P6). Asterisk: trace is Lovable's own instrumentation, one notch below raw git diff — spot-confirm at git level during P7 revert test.

## P2 Lovable — evidence record (2026-07-29)
- P2a PASS (behavioral proof: all labels switch across EN/AM/OM in screenshots; data correctly stays English).
- P2b PASS (per-language files; en static default, am/om dynamic import() chunks; typed Messages pattern = compile-time missing-key protection — coverage-gating philosophy at code level, unprompted). Network-level confirm rides along with P4 production build.
- P2c PASS (Ge'ez renders cleanly incl. button).
- P2d PASS (open-tab F5 stayed Amharic; embedded-preview F5 had bounced to unbuilt "/" — expected artifact, noted).
- Translation quality note: AM/OM label translations appropriate, not gibberish — positive data point for REQ-002's AI-translate-then-review pipeline.
- Side-discovery: Chrome auto-translate triggered by correct lang declaration translated the WHOLE page incl. data (operator correctly identified as browser feature, not app) — logged as future support-question answer.

## Status: Lovable P1✓ P2✓ P5✓ — Option B hinges on P3 (issued, Tier A: RLS deny-proof).

## P3 Lovable — evidence record (2026-07-29)
- SQL quality HIGH: per-operation policies all scoped auth.uid()=user_id; WITH CHECK on insert/update (the commonly-forgotten clause); anon GRANT revoked entirely = second fence under RLS (defense-in-depth, unprompted); publishable key only in browser (P3c).
- Behavioral: two-account test — A sees only A's, B only B's (screenshots).
- DENY PROOF (the criterion): DevTools console as B, unfiltered select * via supabase client → returned ONLY B's row; A's row withheld BY THE DATABASE with UI bypassed. P3b satisfied as frozen.
- Signed-out variant: optional, structurally closed (no anon grant).
- Lovable's self-proposed proof test was itself correct and complete — proposed the exact DB-level bypass test unprompted (credibility signal #2).

## Status: Lovable P1✓ P2✓ P3✓ P5✓ → **OPTION B FORMALLY ELIGIBLE** per frozen rule 1. Final form (B vs B-with-performance-supervision) decided by P4. P6/P7 = confirmation. Cursor batch = calibration for auxiliary role.

## P4 Lovable — evidence record (2026-07-29)
- Measurement discipline story: initial read 1.6MB was contaminated (operator's browser extensions injecting scripts, visitor-analytics setting ON, badge, cache). Clean InPrivate measurement of published build: **198kB transferred / 653kB resources / 7 requests / ~300ms load**.
- Against lines: at/under P4a page line; comfortably under REQ-029's 500KB first-visit budget with ~300kB headroom for real-app additions. Framework fixed cost modest; budget survives without re-tuning.
- P1 defect-checks CLOSED: badge removable via project setting (toggled off), visitor-analytics toggleable (off — deliberate-decision item for real project), data-tsd-source NOT FOUND in production source (dev markers stripped).
- P4b (self-measurement) not exercised — informational, non-blocking. P4c Lighthouse skipped — informational.

## Status: Lovable P1✓ P2✓ P3✓ P4✓ P5✓ → frozen rule 1 full form: **OPTION B (Lovable-led), standard supervision** — pending P6/P7 confirmation probes only.

## P6/P7 Lovable — evidence record (2026-07-29)
- P6: described existing file contents accurately BEFORE editing (3rd unprompted census-before-build showing); one line, one file; add/list behavior intact; count renders. Bonus finding: "You have 1 notes" pluralization bug → logged as REQ-002 Pass 2 item (plural rules are per-language; i18n system must handle structurally).
- P7: version-history restore removed exactly the one change; data + feature intact. One-step recoverability demonstrated. Git-level spot-check deferred to Phase 0 once real repo (operator's GitHub) is connected — standing item.

# CENSUS CLOSED 2026-07-29 — Lovable: 7/7. Ruling → DEC-006 in spec ledger.
