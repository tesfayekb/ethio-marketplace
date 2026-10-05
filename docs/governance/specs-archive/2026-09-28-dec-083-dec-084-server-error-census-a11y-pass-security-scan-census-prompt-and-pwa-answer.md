Source: supervisor thread, turn 897, Mon 2026-09-28 10:05 New York.
Status at 2026-10-05: ratified by the operator's "proceed" of 2026-09-28 10:05; built (694689f6; R1 in turn 905; DEC-083 gating from 2026-10-12, DEC-084 after the sixth zero run — the gating switch has not been recorded as flipped); the repo holds the DEC-083/084 descriptions in docs/features/e2e-harness.md and the census in docs/tracking/security-scan-2026-09-28.md; REQ-039 (installable PWA) was moved up the queue but is not built.
Related: DEC-083, DEC-084, INC-312, INC-321, G22, REQ-039, DEC-004, D69.

Two things: the proposal, made concrete and queued as the next turn after INC-321; then the app question.

## DEC-083 / DEC-084 — ratified by your "proceed"; the rules, frozen now

**DEC-083 — server-error census on every run.** Today the reporter quotes `[ssr-error]` lines only for a *failed* source (`e2e-failure-report.ts:840–846`, capped at 20 lines), so a swallowed exception on a green run is invisible — that is how INC-312 hid. Rule: every run, green or red, gets a "Server errors — census" section: counts by normalised message across all sources; messages on a tracked allowlist (`docs/tracking/ssr-error-allowlist.txt`: the deny-case answers negative tests deliberately provoke — "permission denied", "listing not found", "step-up required", INC-301's `listings_price_bp_check`, and so on, each with the test that produces it) are counted but quiet; anything else is listed in full. **Gating rule, pre-committed:** non-gating for 14 days; any SQL-class line on a green run (SQLSTATE 22/23/42 — "violates", "does not exist", "null value") gets an INC the same day; after 14 days with five consecutive runs carrying zero off-allowlist SQL-class lines, the merged verdict fails on any new one.

**DEC-084 — accessibility pass, non-gating.** axe-core in the smoke tier on the marketplace home, a listing page, the storefront, sign-in, and wizard steps 1/3/5 at 360 and 1280; a report section with serious/critical counts. Gating rule: after five consecutive runs with zero serious/critical, gates on any new serious/critical.

**ACT — the 165 security-scan warnings (G13):** read-only census this turn; dispositions from me next.

Paste this after INC-321 is green and verified (serial):

---
```
DEC-083 + DEC-084 + security-scan census. Tier B (harness, under G22 with named DECs and pre-committed rules — no gating changes this turn). No migration.

SCOPE — you may touch only:
  scripts/e2e-failure-report.ts (+ its self-test fixtures)      DEC-083
  docs/tracking/ssr-error-allowlist.txt (NEW)                    DEC-083
  e2e/a11y.spec.ts (NEW), package.json (+ @axe-core/playwright pinned exact), the smoke-tier spec list in .github/workflows/ci.yml only if the smoke tier enumerates files   DEC-084
  docs/tracking/security-scan-2026-09-28.md (NEW)                census
  docs/features/e2e-harness.md, docs/_changelog.md
Nothing else; the workflow graph, serve stack and verdict writers are untouched (G22). Census first: cite the reporter lines you change.

PART A — DEC-083 census. In the reporter, grep [ssr-error] lines for EVERY source on every run (not only failed ones; lift the 20-line cap for counting only — quoting stays capped). Normalise a message by stripping the path prefix and any UUID / number / quoted value, then count. Write a section "## Server errors — census (DEC-083, non-gating)" in BOTH the red and the green forms: a table of message · count · sources; allowlisted messages are shown in a compact "quiet" line with their counts; every off-allowlist message is listed in full with one verbatim example (redacted as today). The allowlist file: one message pattern per line with `# <test ids that provoke it>` comments; seed it from the last red run's evidence (run 36383469726: permission denied, listing not found, step-up required, listings_price_bp_check, account is deactivated, unknown language, seller alias already taken, impersonation refusals, admin.* refusal codes, catchallParent, rankInherited, orderMismatch, linkNotFound, deleteHasLinks, attributes_depends_on_fkey, category_tree_pointers_parent_id_fkey) — each entry needs the test that produces it; a message you cannot attribute stays OFF the list. Self-test (G20): capture one real job log with a census fixture; assert counts, the quiet line, the off-allowlist listing, and that the green form carries the section. No change to verdicts or promote.

PART B — DEC-084 a11y smoke. e2e/a11y.spec.ts, tagged for the smoke tier: @axe-core/playwright (pin the exact version in package.json; no other dependency) on / (marketplace), one listing page (a scratch listing you create and delete in finally — G27), the storefront of the scratch seller, /sign-in, and wizard steps 1, 3 and 5 for a scratch seller, at mobile-360 and desktop-1280. The test NEVER fails on violations this turn: it writes counts by impact to the test's annotations and console (`[a11y] <page> <project> serious=<n> critical=<n>`), and the reporter's green/red forms gain a one-line "## Accessibility (DEC-084, non-gating)" summary read from those lines. First-paint weight guard must stay green (axe loads only inside the test runner, never in the app).

PART C — security-scan census (read-only). Export the platform's current security-scan findings (the "165 older warnings") into docs/tracking/security-scan-2026-09-28.md: grouped by class (e.g. function search_path mutable, RLS policy always-true, auth.uid() re-evaluated per row, exposed view, extension in public, leaked password protection …), count per class, the first three concrete examples per class (object names only, no secrets), and the platform's own remediation link per class. No fixes, no migrations.

DOCS: e2e-harness.md — DEC-083 (census, allowlist law: an entry needs a provoking test; the 14-day gating rule verbatim) and DEC-084 (pages, the five-run gating rule verbatim); one changelog line per DEC.
INVARIANTS: DEC-023 local run of the reporter self-test and the a11y spec; report only on green; nothing outside scope; limitations before the end.
COMPLETION REPORT: the census section from your local run; the allowlist as seeded with attributions; the a11y counts per page/project; the security census class table.
```
---

## Do we need a native app to compete?

Not to launch, and probably not for a long while — but one thing must be built first, and it isn't yet. DEC-004 chose the PWA form for exactly your market (cheap Android, expensive data: hundreds of kilobytes on first visit, free invisible updates, no 40–80 MB store download), with "native wrappers later if store presence proves necessary." What a PWA gives buyers: a home-screen icon that opens full-screen like an app, a cached shell so repeat visits open in under two seconds even on poor data, and push notifications on Android (on iPhone too, once the person has added it to the home screen). What it does not give: a Play Store / App Store listing as a discovery and trust channel, and background integrations native apps have. Jiji has store apps, but its web is what most of its traffic uses; for a classifieds site the listing quality, the Amharic/Ge'ez experience and speed on a cheap phone decide more than the store badge.

The honest gap: the repo today has no manifest, no service worker and no install prompt — that is **REQ-039 (PWA mechanics)**, specced "superficial", scheduled "Phase 8 at latest." Without it the site is a fast mobile website, not an installable app, and iOS push cannot work at all. It is a small Tier B build (manifest + icons + offline shell + our own "Install" button; ESTIMATE one or two Lovable turns), and it belongs before launch, ahead of any push-notification work in D69. I'll move it up the queue after the wizard fixes.

How easy is it for a user once REQ-039 is in: on Android Chrome the browser offers "Add to Home screen" itself and our button does the same in one tap; on iPhone it is Share → "Add to Home Screen" (we show a one-line hint); one Ethiopia-specific caveat — links opened inside Telegram's or Facebook's in-app browser can't install anything, so the page needs an "Open in Chrome" nudge. Later, if store presence matters, a Play Store listing is cheap: a Trusted Web Activity wraps the same PWA with no second codebase; an iOS App Store shell is real extra work and only worth it if diaspora iPhone usage demands it.
