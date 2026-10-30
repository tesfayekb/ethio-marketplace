# Foundations turn R1a — report (R1a-2 continue; split after item 3)

Done: CI read, PGH-E2 ×12, INC-948 class fix, Part 0 (INC-1005). Left: R1b (items 5–11 of foundations-turn-r1a.md), not started. CI: last completed run f66ca04c SUCCESS; CI on this push not yet seen.

## 1. Step 0
- docs/governance/briefs/foundations-turn-r1a-2.md, fenced body sha256 `06cdfe2ccedb237193f19d0e9c8d6233c6823d79122f3f3935e1f6755c4ec731` (equals the ruling's value). Roadmap line 3 names foundations-turn-r1a-2.md beside foundations-turn-r1a.md.

## 2. CI line
- `f66ca04cd6883aa73944dd4b7b8ae651802b387d` — run 40981493608 — **SUCCESS** (completed 2026-10-30T01:03:01Z); guards: no failed job; E2E: passed, 0 flaky.

## 3. PGH-E2 ×12
- `bun run e2e:local -- e2e/page-head.spec.ts -g "PGH-E2" --repeat-each 12 --retries 0`: **24 passed (1.4m)**, both projects, 0 failed. INC-715's retirement is the supervisor's decision.

## 4. INC-948 — the class
- Helper: `pickCity(page, city, refusal?)` in e2e/helpers/posting.ts. The city's region comes from its own row (adminClient). Each option is awaited (waitFor attached, 20 s) before it is chosen, then the city's value is asserted. If an option never arrives, the helper throws with the caller's INC-235 evidence. No retry, and no wait raised beyond the local one it replaces.

| Site | Status |
| --- | --- |
| post-wizard-place.spec.ts (PW-30, PW-20, three pickCity callers) | local copy removed; imports helper |
| post-wizard-pricing.spec.ts chooseOneCity (:1039 walk) | replaced by helper; INC-235 refusal text kept as the `refusal` callback |
| post-wizard-category.spec.ts chooseOneCity (:977 walk) | replaced by helper; INC-235 refusal text kept |
| post-wizard-place.spec.ts :341, :1002, :1105, :1200 | `selectOption(chain.city.id)` waits for its option; region by id |
| post-wizard-where.spec.ts :179, :575, :771, :801 | `selectOption(id)` waits for its option |
| post-wizard-bundle2.spec.ts :1337, :1489–1497 | `selectOption(id)` waits; :1495 already awaits option toHaveCount(1) |
| my-listings-ad.spec.ts :1149, :1163, :1317 | `selectOption(id)` waits for its option |

- Proofs, both projects, retries 0: post-wizard-place + post-wizard-pricing + post-wizard-category whole: **134 passed, 4 skipped (17.3m)**. The 4 are the files' own project skips. PW-30 `--repeat-each 12`: **24 passed (4.8m)**.
- Departure: the first whole run of post-wizard-place failed once, at PW-37 on mobile-360: `Expected "38.73693" Received "38.73694"`. PW-37 does not use the pick. Cause: the screen rounds the browser's float to 5 places, and the test rounded the stored figure separately. A value on the half-way line rounds two ways. The fix compares within the screen's half-step (0.000005). The non-null count is unchanged (2 → 2).

## 5. Part 0 — INC-1005
- Measurement: Chromium without `--hide-scrollbars`, home page, 1280×900 (/tmp/browser/ovs/measure_shift.py).
  - before: scrollbar 15 px, body overflow `clip visible`, body margin-right 0, main x 256 w 1009.
  - during (language menu open): body overflow `hidden`, `data-scroll-locked`, body margin-right **15px** (from the lock library), scrollbar still 15 px, main x 256 w **994**.
  - after: same as before.
- Cause: the root element is the scroll container (INC-743's `html { overflow-x: hidden }` makes html scroll). So body's lock hides no scrollbar. The library still adds a 15 px margin, which doubles the gutter, and the main column narrows by 15 px. Its centred content moves 7.5 px.
- Mechanism (src/styles.css only): `html { scrollbar-gutter: stable; }` plus `html body[data-scroll-locked] { margin-right: 0 !important; }`. The neutralisation is justified because the measurement showed a doubled gutter. Modal dialogs and sheets keep their lock, and dropdowns keep modality.
- After the fix (OVS run, the harness at 400 px height): main box is identical before, during and after.
- CF-SHIFT-1: scripts/conformance/overlay-shift.test.ts. It requires both rules in src/styles.css and refuses any gutter, lock attribute or lock variable elsewhere under src/. Its self-test plants a missing gutter, a missing neutralisation and two second mechanisms; all four are refused.
- OVS-1/OVS-2 (e2e/overlay-shift.spec.ts; keeps the harness launch options, drops only `--hide-scrollbars`; asserts scrollbar > 0; viewport 400 px tall so the page scrolls; OVS-2 scrolled 50 px):
  - red on base (before the CSS), 4 failed. Main width 1009 → 994 (desktop-1280) and 297 → 282 (mobile-360), x unchanged.
  - green after: 4 passed (in the run with post-wizard-place, 41 passed + PW-37 failing before its fix).
- e2e-select area `overlay-shift` added (scripts/e2e-select.ts) so the spec is reachable (the selector self-test refused it at first).

## 6. R1b
- Items 5–11: **not started** (split per the ruling after item 3). No per-page growth table for R1b. Part 0's CSS stayed within every ceiling: "Bundle budget OK." (bundle-budget step, checks).

## 7. Unit count
- 2,265 / 2,265 tests, 380 files.

## 8. Checks' last line
- `checks: 34 PASS · 0 FAIL · 21 NOT RUN · 868s` (NOT RUN: dependency installs ×3, SARIF upload ×2, dependency audit ×2, staging parity preflight ×4, E2E merge/verdict ×6, promote ×4).

## 9. K2
- Non-modal overlays that predate INC-1005: src/components/shell/app-rail.tsx:963 (`DialogPrimitive.Root modal={false}`), src/components/shell/row-actions.tsx:111 (`DropdownMenu modal={false}`). Not touched and not judged by CF-SHIFT-1.
- The sandbox's Playwright-managed path (chromium-1208) is absent; local runs used `E2E_CHROMIUM_PATH` (the config's documented escape hatch).
- Still open from earlier turns: tooling localeCompare sites; other menus' waits.

## 10. git diff --name-only 51cae041
```
docs/_changelog.md
docs/governance/briefs/foundations-turn-r1a-2.md
docs/governance/briefs/foundations-turn-r1a.md
docs/governance/reports/foundations-turn-r1a.report.md
docs/governance/reports/foundations-turn-r1a.stop-1.md
e2e/helpers/posting.ts
e2e/overlay-shift.spec.ts
e2e/post-wizard-category.spec.ts
e2e/post-wizard-place.spec.ts
e2e/post-wizard-pricing.spec.ts
roadmap.md
scripts/conformance/overlay-shift.test.ts
scripts/e2e-select.ts
src/styles.css
```

J-audit: scratch only (helpers' namespaced sellers/categories, destroyed in hooks that survive a timeout); no real row; no retry; no raised timeout beyond the replaced local waits.
