# Foundations SAGE-S2b / S2b-2 report

## 1. CI first

- `3d94bd6b610f8401f9ccbf30bd442e117ceb0862` — **FAILURE**, run [41163450560](https://github.com/tesfayekb/ethio-marketplace/actions/runs/41163450560), completed 2026-10-31 03:32:48 UTC. Evidence read from raw ci-evidence, including all four tracking files; status re-read after the failure bodies. Bundle check refused nine page ceilings inside DEC-296's NEAR band. Four gating browser failures were the same TB-1 alignment assertion (smoke mobile/desktop, lane 8 mobile, lane 15 desktop): expected ≤2 px, received 3 px. All backends started; these are **not infrastructure**. Aggregate: 2,429 passed, 287 skipped, 4 failed, 0 flaky, no missing result sources. Component tests, build/typecheck/lint, security lints and migration parity passed.
- `0a16eed0d2b15972b114913c0652793bb82d7a1e` — **FAILURE**, run [41160992985](https://github.com/tesfayekb/ethio-marketplace/actions/runs/41160992985), completed 2026-10-31 02:58:00 UTC. Historical raw ci-evidence snapshot `f6c382fbefe3b14a07837dd62d05a227af647850` and the run's jobs API were read: smoke failed Database security lints (DEC-240); the aggregate verdict consequently failed. No test failed: 2,226 passed, 216 skipped; smoke supplied no results. INC-1025 is the deliberately new anon door against baseline 19, corrected by S2b, not registry infrastructure.

## 2. Step 0 and scope restoration

- S2b fenced ruling: `c2f1d64de7afaf8fd134037915519986418f148fe3bc2fdda9068e123f50c4cc`.
- S2b-2 fenced ruling: `a3a4c615b5d6ab0cac8dea9db5cb2a7d4e955c682a368572b77108ef9a4026cb`.
- Both hashes recomputed over the fenced body including its final newline and match the supplied values.
- Roadmap line 3 names both briefs; `bunx prettier --check roadmap.md` passed.
- AGENTS.md restored byte-for-byte from `git show 0a16eed0:AGENTS.md`, including “state borders on top”; SHA256 `ec55abe2a34dd3c05451e290dac49b00e9175b035419e323671284d3114d517d`. Its diff against 0a16eed0 is empty. The unauthorized S2b shortening is reverted, not retained. This turn adds no architecture rule there; mechanism register row 81 is the record.

## 3. INC-1025 lint baseline

`scripts/security-lints-baseline.json:4`: `function_executable_by_anon` 19 → 20. Reason in `docs/features/security-scanning.md`: D1's intentional public `get_ui_bundle_parts`, INC-1023. No permission or migration change. The one-list public-surface class fix remains the separate CI turn.

## 4. Census as built — D265

| Consumer | Before 0a16eed0 | After S2b |
| --- | --- | --- |
| `location-selector.tsx` | Own segment at :83/:86 and track at :275 | Shared BAND_SEGMENT/current/idle :90–93; BAND_TRACK :279 |
| `panel-tabs.tsx` | CURRENT_PILL :62; no shared pressed-in track | BAND_TRACK :53; shared segment/current/idle :66–69 |
| `breadcrumbs.tsx` | CURRENT :39 underlined bold; BreadcrumbList trails :138/:164/:192/:252/:388/:451 without location track | CURRENT = BAND_CRUMB_CURRENT :41; shared track :144/:171/:199/:259/:399/:466; all links/shared current segments |
| `ad-crumbs.tsx` | Local medium links and current crumb | BAND_CRUMB link :26; BAND_CRUMB_CURRENT :40 |
| `seller-crumbs.tsx` | Local CURRENT underline and medium links | CURRENT :22; BAND_CRUMB links :32/:37 |
| `admin-detail-crumbs.tsx` | Local CURRENT/CURRENT_CUT underline and medium links | CURRENT :20, CURRENT_CUT :71; shared links :31/:36 |
| `bottom-bar.tsx` | CURRENT_PILL | Unchanged, sole consumer :1/:49 |

The six BreadcrumbList branches in breadcrumbs.tsx include public ad/seller trails, account/legal, admin group/section/detail and category trails. Nested crumb components use their enclosing track; separators, CutText and name floors remain. No words, dropdowns or navigation paths change.

## 5. D266 rail header and guards

`band-row.ts:22–30` owns one 34 px track with 3 px padding and 28 px segments, plus raised/current variants and crumb allocation. `RAIL_HEADER` at :32 is sidebar surface, band label and bottom groove. `panel-header.tsx:31` combines it with BAND_ROW; both expanded/compact branches retain 40 px, heading and switch. Before: BAND_LOOK.row; after: RAIL_HEADER. D266 supersedes P-S7.

CF-BAND-1 counts the header by definition as the rail header: it still requires data-band-row and BAND_ROW for height but requires RAIL_HEADER, not BAND_LOOK.row, for look; no allowance. `shell-bands.test.ts:282` segmentFindings checks all four crumb files plus location and tabs for shared constants, refusing a private track/current look. Its planted missing shared raised constant/private bg-track case and header substitution fail. `menu-rows.test.ts:204` railHeaderFindings independently refuses a header bypass; the planted RAIL_HEADER → BAND_LOOK.row substitution is refused. Existing height/spacing/drop-transfer tests remain. Guard results pending the full suite below.

## 6. G38 changes and regression correction

| Test | Old assertion | New assertion / reason |
| --- | --- | --- |
| SGB-1 at 834/1440, light/dark | Four rows share BAND_LOOK surface | Three content rows share it; panel header equals sidebar/rail, same groove, 40 px, zero bottom border (D266) |
| SGB-5 at 834/1440, light/dark | Current tab bg-nav-pill / lift-pill / nav-ink | Card / lift-segment / nav-ink; tab and current crumb equal chosen location segment, both tracks equal location track (D265) |
| admin-shell A-6 | Current crumb class /underline/ | Every BAND_SEGMENT_CURRENT class; text/aria-current and link behaviour unchanged (D265) |
| shell TB-1, mobile and folded desktop | Logo/wordmark x aligns to breadcrumb-home segment within 2 px | Align to breadcrumb-track outer x within the same 2 px; segment is intentionally inset by shared track's 3 px padding (D265) |
| SGB-6 EN/AM at 360 (new) | None | Scratch deep crumb trail: 40 px row, ≤1 px overflow, three one-line contained text slots |

TB-1 failed in CI because S2b added the shared track inset but missed this geometry consumer. The production track is correct by D265; the old anchor was stale. Tolerance is not widened and track padding is not removed. This is the root-cause owed-test correction, not additional feature work.

## 7. Browser verification and limits

Prior S2b browser result: 50 passed, 1 skipped, both projects, retries 0 (prior turn record; operator fresh-clone confirmation says 50 of 50). Artifacts are not available in this sandbox, so this is explicitly prior evidence, not a newly claimed run.

S2b-2 TB-1 regression: pending. The initial allowed e2e:local command stopped at browser guard before tests because the Node Playwright revision's browser path was absent; a retry uses the already-installed Python Playwright Chromium via E2E_CHROMIUM_PATH, no install/dependency change. Full changed shell.spec.ts is owed; any unrun portion is named below rather than called green. CI repeat lane did not repeat sage-bands.spec.ts on 3d94bd6b; it did repeat admin-shell.spec.ts. Repeat proof is CI-only, no local repeats.

## 8. Growth table and named ceilings

Cause: shared D265 track/segment constants and all crumb consumers, D266 rail-header composition in the shell; no stylesheet source change. S2b-2 changes only test anchors, docs, the revert and ceilings, so no browser-code growth in this finishing turn. A production local comparison against 0a16eed0 is pending checks; CI rounded sizes are included only where the failure body printed them. Missing values are not invented.

| Page | CI 3d94bd6b JS KiB | Local final JS KiB | Growth vs local 0a16eed0 KiB |
| --- | --- | --- | --- |
| `/admin/legal_/edit` | 285.2 | Pending local checks | Pending |
| `/admin/listings` | 356.8 | Pending local checks | Pending |
| `/admin/listings_/$listingId` | 381.7 | Pending local checks | Pending |
| `/admin/listings_/$listingId_/edit` | 403.9 | Pending local checks | Pending |
| `/admin/locations` | 271.7 | Pending local checks | Pending |
| `/admin/places` | 341.8 | Pending local checks | Pending |
| `/admin/roles` | 308.2 | Pending local checks | Pending |
| `/admin/roles_/$roleId` | 309.8 | Pending local checks | Pending |
| `/admin/screening` | 382.1 | Pending local checks | Pending |
| `/admin/translations` | 414.2 | Pending local checks | Pending |
| `/admin/translations_/$lang` | 323.5 | Pending local checks | Pending |
| `/admin/users` | 307.2 | Pending local checks | Pending |
| `/admin/users_/$userId` | 287.6 | Pending local checks | Pending |
| `/auth` | 221.7 | Pending local checks | Pending |
| `/auth_/callback` | 210.0 | Pending local checks | Pending |
| `/auth_/reset` | 212.1 | Pending local checks | Pending |
| `/c/$slug` | 223.2 | Pending local checks | Pending |
| `/dev/primitives` | 224.9 | Pending local checks | Pending |
| `/dev/style` | 244.8 | Pending local checks | Pending |
| `/dev/tall` | 209.4 | Pending local checks | Pending |
| `/l/$slug` | 252.7 | Pending local checks | Pending |
| `/legal/$kind` | 213.7 | Pending local checks | Pending |
| `/legal/accept` | 220.6 | Pending local checks | Pending |
| `/legal/publishing` | 214.5 | Pending local checks | Pending |
| `/my-listings` | 330.3 | Pending local checks | Pending |
| `/my-listings_/$listingId` | 319.5 | Pending local checks | Pending |
| `/my-listings_/$listingId_/edit` | 398.4 | Pending local checks | Pending |
| `/post` | 398.4 | Pending local checks | Pending |
| `/post_/$listingId` | 398.4 | Pending local checks | Pending |
| `/privacy` | 213.7 | Pending local checks | Pending |
| `/settings` | 273.4 | Pending local checks | Pending |
| `/terms` | 213.7 | Pending local checks | Pending |

Nine ceilings raised from CI's own size with ceilingFor(size), never local estimates:

| Page | CI KiB | Old → new cap KiB |
| --- | --- | --- |
| /account | 269.8 | 270 → 271 |
| /admin/attributes | 350.7 | 351 → 352 |
| /admin/categories | 358.8 | 359 → 360 |
| /admin/places | 341.8 | 342 → 343 |
| /dev/style | 244.8 | 245 → 246 |
| /l/$slug | 252.7 | 253 → 254 |
| /legal/$kind | 213.7 | 214 → 215 |
| /privacy | 213.7 | 214 → 215 |
| /terms | 213.7 | 214 → 215 |

Each line preserves earlier causes and adds SAGE-S2b D265/D266 + CI 3d94bd6b + DEC-296. Entry cap stays 210 KiB; stylesheet cap stays 40 KiB. Their measured sizes and stylesheet growth pending full checks.

## 9. Unit count and checks

Report written before checks as ruled. Final unit count: pending full suite. Full checks: not started yet. If completion is blocked: **checks: not finished — CI judges**. Last line and every NOT RUN will be added from the actual output.

## 10. K2

No other shared-track/current-segment bypass found in the four crumb files, tabs, location or rail-header consumers by source census. TB-1 was the missed geometry-test consumer; now corrected. CURRENT_PILL is the bottom bar's only consumer. Older admin-shell.md text mentioning bg-nav-active is a historical documentation sibling, not an app implementation and not rewritten in this scoped turn. CF-ROWS and CF-BAND planted cases remain.

## 11. Files against base

`git diff --name-only 0a16eed0` (including this report):

```text
docs/_changelog.md
docs/features/admin-shell.md
docs/features/security-scanning.md
docs/governance/briefs/foundations-turn-sage-s2b-2.md
docs/governance/briefs/foundations-turn-sage-s2b.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-sage-s2b.report.md
e2e/admin-shell.spec.ts
e2e/sage-bands.spec.ts
e2e/shell.spec.ts
roadmap.md
scripts/conformance/menu-rows.test.ts
scripts/conformance/shell-bands.test.ts
scripts/route-budgets.mjs
scripts/security-lints-baseline.json
src/components/shell/ad-crumbs.tsx
src/components/shell/admin-detail-crumbs.tsx
src/components/shell/band-row.ts
src/components/shell/breadcrumbs.tsx
src/components/shell/location-selector.tsx
src/components/shell/panel-header.tsx
src/components/shell/panel-tabs.tsx
src/components/shell/seller-crumbs.tsx
```

AGENTS.md is absent because its restore makes it byte-identical to base. The platform manages commits/push; no stateful git command is run by the agent. No publish requested or performed.

## 12. Final disposition

S2b visual changes retained, unauthorized AGENTS.md change reverted, CI's nine named ceilings corrected, and the missed TB-1 track-anchor assertions updated. Final verification pending below; no additional feature, dependency, migration or string.

J-audit: geometry-only TB-1 change, no fixture/data write; SGB-6 uses captured scratch category helpers and afterEach destroy that throws; cleanup-survives-timeout inherited unchanged. No assertion tolerance weakened, no real row used as a mutable fixture, no retries or local repeats.
