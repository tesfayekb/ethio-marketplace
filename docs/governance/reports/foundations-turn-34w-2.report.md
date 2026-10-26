# Foundations turn 34w-2 — completion report

Brief: `docs/governance/briefs/foundations-turn-34w-2.md`. Status: **done, all parts**. Reviewer: **READY** (one MINOR).

## 1. Parts

- A — done. `git rev-parse HEAD` = `f09ec2a90bc6fc4405b3ac5e5b1e53caab50e898` = BASE (<START>). The last readable CI is on `470d16b`, not BASE: run 40360382373, FAILURE. Its 3 gating failures were all `auth-signout.spec.ts › SO-12` (smoke mobile, smoke desktop, shard 3), which is the expected red. No other red.
- STEP 0 — done: `8aba958654aa308da35e9e31ac17f34da5ef3a3f979f7574f27d2fc6253120b3`, 44812 bytes (taken from the saved message by script).
- B, C, D — done; every block was copied by script from the saved brief, and each OLD text matched exactly once. Roadmap line 3 was updated by script.
- THE CHECKS, THE END-TO-END CHECK, review, report — done.

## 2. Files (`git diff --name-only <START>`)

docs/_changelog.md, docs/governance/briefs/foundations-turn-34w-2.md, docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-34w-2.report.md, e2e/auth-signout.spec.ts, roadmap.md, scripts/conformance/signed-in-routes.test.ts, src/components/app-shell.tsx, src/components/ui/action-message.test.tsx, src/components/ui/action-message.tsx, src/components/ui/fading-notice.test.tsx, src/components/ui/fading-notice.tsx, src/routes/\_\_root.tsx, src/routes/root-reads-once.test.ts.

## 3. Behaviour contract (before → after)

- Offline sign-out from "/": the root's error view replaced the app → the site stays on screen, signed out, and loads afresh when the connection returns (SO-12 passed at both widths).
- A same-href navigation online: the root's facts were read again from the server → no read.
- A sign-out in another tab while on /post, /legal/accept or /legal/publishing: the page stood open, signed out → the tab goes to "/", as /settings, /account and /my-listings already did.
- The fading notice: always `role="status"`, even empty → no role, polite live region. ActionMessage `persistent`: role while empty → no role until its words come, with `aria-live` from the start.

## 4. Red first (B2, BASE code)

`Tests  4 failed | 7 passed (11)`:

- RRO-1: `AssertionError: expected undefined to be false`.
- CF-SIR-4: `expected 'import { CARD_SURFACE } from "@/compo…' to match /…/admin"\) \|\| sendsToSignIn\(pathname\);`.
- AMSG-2 and FN-1: `Expected the element not to have attribute:` (role).

## 5. Checks

- Hash list: every line OK. `git diff <START> --stat -- src/integrations supabase`: empty.
- Build log: `build OK`.
- C5 run: 115 files, 550 passed.
- Lint: 0 errors, 39 warnings.
- `bun run test:unit`: 318 files, 1965 passed, 1 skipped (1966). No known-limit timeout appeared.
- i18n:map-guard: maps match the tree. Hardcoded strings: findings 0. format:check: last, clean.

## 6. End-to-end (Chromium 1194 override, both projects, 2 workers, 0 retries)

| Run | Result |
| --- | --- |
| auth-signout + settings + account-saved (one run) | `45 passed (4.9m)` — SO-11 and SO-12 green at both widths |
| shell | `62 skipped`, `156 passed (7.4m)` |
| my-listings-page + legal-certify + admin-screening (one run) | killed by the 590-second ceiling; 67 passed, 0 failed before the kill (my-listings-page 9, legal-certify 25, admin-screening 31 started) |
| admin-listings | killed by the ceiling; 66 passed, 0 failed |
| my-listings-ad | `36 passed (6.2m)` |

- `[ssr-error]`: 0 in every log.
- Neither killed run was re-run (S407).

## 7. K2 (from the reviewer's census)

- Other hand-kept page groupings, all presentation and not authorities: `src/components/app-shell.tsx:514–525` (panel ownership), `src/components/shell/breadcrumbs.tsx:359–363`. Test subsets: `e2e/layout.spec.ts:38`, `e2e/phone-frame.spec.ts:61`, `e2e/shell.spec.ts:1651,1747`, `e2e/legal-accept.spec.ts:220`.
- Other route loaders a same-href navigation re-runs that reach the network: `src/routes/terms.tsx:18`, `privacy.tsx:18`, `$name.tsx:27`, `l.$slug.tsx:34`, `legal.publishing.tsx:49`; `legal.$kind.tsx:33` for E2E scratch kinds.
- Other unconditional role renderers: `src/components/ui/alert.tsx:26`, `src/components/shell/on-demand-notice.tsx:84` (LoadFailedHere), `src/components/marketplace/feed.tsx:36`. Each is drawn only with its content; none is an empty always-drawn region.

## 8. Migrations and strings

Migrations: none. Strings: none.

## 9. Reviewer (independent, on the final tree)

Verdict: **READY**.

- MINOR: RRO-1 checks the configured value only. It does not prove that `router.invalidate()` still reads the facts again. The reviewer checked the installed router code (`load-client.js:331`: `match.invalid || …`) and confirmed it does. This is not fixed because the test's text is fixed by the hash list; it is listed for a later guard.
- The reviewer also noted that a persistent alert carries both `aria-live="assertive"` and the alert role once worded. It should be checked by hand with a screen reader; there is no demonstrated regression.

## 10. Departures

- Two E2E runs were cut by the ceiling (§6).
- The specs were grouped into five runs to fit the ceiling.

## 11. CI (last readable)

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `470d16baef25173a3993588d6d9076b0bfc822c7` (short `470d16b`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-26T17:18:09Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40360382373
```

## 12. Limits

- Large specs (admin-listings, and the three-file group) exceed the 600-second ceiling in this sandbox.
- No real screen-reader test was run.
- INC-930 (offline sign-out from a page whose marketplace code never downloaded) remains a known limit, recorded for turn 34c.
