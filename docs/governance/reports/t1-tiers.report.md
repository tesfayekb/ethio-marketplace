# Task T1 — the redesign's last turn: an ad's tier everywhere it is shown, staff mark an ad Premium or Featured (D242, D276), and the walk's leftovers (D277, W3's K2 and guard gaps) — report

Base: e5e191c638b1cc0aa11faeb7c7577680e752503f · Final commit: 91babee6f · Brief: docs/governance/briefs/t1-tiers.md (no sha256 given by the task) · Ruling 1: docs/governance/briefs/t1-tiers.ruling-1.md
Review: READY · 0 BLOCKER · 0 MAJOR · 4 MINOR · on 91babee

## 1. Done / not done, by part and step

Order as ruling 1 (7): C → D → E → A → B (M1 stop, M2 stop) → the control and e2e → docs, budgets, the checks, the browser check, the self-review, this report.

- **Part C — the iPhone tick dropped (D277, INC-1032)** — done (`240127d`). `src/lib/press.ts`: the hidden switch (`makeTickSwitch`, its click, its removal) gone; a touch tap ticks only through `navigator.vibrate`; one exported helper `canTapTick()` (false on the server). `src/routes/settings.tsx`: the "This device" section reads `canTapTick` through `useSyncExternalStore` (server snapshot false), so the server draws no row and a device that vibrates adds it after hydration; it is the page's last section, so nothing above it moves. PR-U10 replaced by PR-U11; CF-PRESS-1 rule 4 now reads "no switch checkbox anywhere, press.ts included" (PRP-7 re-titled). Records: `docs/features/design-foundation.md` and the register row say Android only. Ruling 1 (9): `common.dismiss` in `am-base.ts` → «ዝጋ».
- **Part D — the panel switcher marks the chosen panel at once** — done (`5fdb9f1`). `panel-header.tsx:81` `DropdownMenuRadioGroup value={chosen}` with `chosen = panelAt(useMenuAt().pathname, panelChoice)`; the title keeps `activePanel` (the frame). CF-PRESS-1 names `panel-header.tsx` a menu file (PRP-11). E2E PS-9.
- **Part E — W3's guard gaps** — done (`053cbfb`). CF-DOCK-1 refuses a live notice fixed to the phone's bottom off the dock (planted NDK-5); CF-PRESS-1 follows a mark through a multi-line const, a chain of consts and a helper (planted PRP-10).
- **Part A — the tier on every view of an ad** — done (`a1f0b06`). `my_listing`'s read was found to carry `tier` already (ruling 1), so no read migration; `readDraft` (`posting-service.ts`) selects `tier` and reads it through `tierOf`; `use-draft.ts` / `use-edit-draft.ts` / `wizard.tsx` / `step-review.tsx` carry it to the Review preview; `screening-page.tsx` passes the queue row's tier; `my-listing-page.tsx` and staff's `listing-page.tsx` pass theirs; `ListingDetailView.tier` is required. Guard CF-TIER-4 (`scripts/conformance/card-tiers.test.ts`, CTR-6 planted / CTR-7 passes). Tests LD-31, PSV-7, SF-6; E2E SAP-3.
- **Part B — staff set an ad's tier (D242, D276)** — done.
  - M1 `admin_set_listing_tier` (`e76f940`, fixed `7907b89` INC-1033, `625ca5d` INC-1033 b) — applied on ethio-staging by the supervisor (round 3; "continue").
  - M2 `transition_listing` clears the tier on removal only (`9ac910c`, fixed `bee1181` INC-1033 c) — applied on ethio-staging (round 2; "continue").
  - The dialog, its lists and the strings EN + AM (`e5beb49`); the generated client types' entry (DEC-320, `60604f0`); the control on the listing page, `setAdminListingTier`, E2E ATR-1…5 (`18a6673`); docs, register, changelog, roadmap (`ef81bf1`); the page ceiling (`ead4bf0`); the usage maps (`43d6530`); ATR-1 and PS-9 corrected after the local browser run (`91babee`, section 5).
- **Not done (by ruling):** the state revision carrying the tier when a removal clears it (a third insertion in `transition_listing`) — stop-2 ruling 4: "not now"; a roadmap line sits at the records turn (section 10).

## 2. Files changed

`git diff --name-only e5e191c6` (56 files):

```
docs/_changelog.md
docs/features/admin-listings.md
docs/features/design-foundation.md
docs/features/listings.md
docs/generated/i18n-usage.json
docs/governance/briefs/t1-tiers.md
docs/governance/briefs/t1-tiers.ruling-1.md
docs/governance/mechanisms.md
docs/governance/reports/t1-tiers.stop-1.md
docs/governance/reports/t1-tiers.stop-2.md
docs/governance/reports/t1-tiers.stop-3.md
e2e/admin-listings.spec.ts
e2e/press.spec.ts
e2e/sage-ad-page.spec.ts
public/i18n-usage.json
roadmap.md
scripts/acceptance-doors-allowlist.txt
scripts/conformance/card-tiers.test.ts
scripts/conformance/notice-dock.test.ts
scripts/conformance/press.test.ts
scripts/public-surface-allowlist.txt
scripts/route-budgets.mjs
src/components/shell/panel-header.tsx
src/features/admin-listings/listing-page.tsx
src/features/admin-listings/tier-dialog.test.tsx
src/features/admin-listings/tier-dialog.tsx
src/features/admin-listings/tier-reasons.test.ts
src/features/admin-listings/tier-reasons.ts
src/features/admin-listings/use-admin-listing.ts
src/features/admin-screening/screening-page.tsx
src/features/admin-screening/use-screening.test.ts
src/features/admin-screening/use-screening.ts
src/features/my-listings/my-listing-page.tsx
src/features/posting/posting-service.test.ts
src/features/posting/posting-service.ts
src/features/posting/preview/listing-detail-map-failed.test.tsx
src/features/posting/preview/listing-detail-map.test.tsx
src/features/posting/preview/listing-detail-tier.test.tsx
src/features/posting/preview/listing-detail.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/step-review.test.tsx
src/features/posting/step-review.tsx
src/features/posting/use-draft.ts
src/features/posting/use-edit-draft.ts
src/features/posting/wizard.tsx
src/i18n/locales/am-admin.ts
src/i18n/locales/am-base.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-admin.ts
src/i18n/locales/en-member.ts
src/integrations/supabase/types.ts
src/lib/press.test.ts
src/lib/press.ts
src/routes/settings.tsx
supabase/migrations/20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql
supabase/migrations/20261102052535_4fb5d636-3ae7-42f3-8737-290ae63e7237.sql
```

New files (`git ls-files`, all tracked): the two migrations, `src/features/admin-listings/tier-dialog.tsx`, `tier-dialog.test.tsx`, `tier-reasons.ts`, `tier-reasons.test.ts`, `src/features/posting/preview/listing-detail-tier.test.tsx`, the two briefs, the three stop reports, this report. Deleted files: none (`git diff --diff-filter=D --name-only e5e191c6` is empty).

Scope: every path is in the SCOPE areas, the standing allowance, or a ruling — `scripts/acceptance-doors-allowlist.txt`, `src/features/posting/wizard.tsx`, `use-draft.ts`, `use-edit-draft.ts` by ruling 1 (6); `src/integrations/supabase/types.ts` by the stop-3 ruling (DEC-320); `scripts/route-budgets.mjs` by DEC-296's form (the stop-3 ruling names "the budgets" as a step; section 10).

## 3. Behaviour contract — before → after

- **`admin_set_listing_tier(p_listing_id uuid, p_tier text, p_reason text, p_note text DEFAULT NULL) RETURNS jsonb`** — new (M1). SECURITY DEFINER, `search_path = public`, VOLATILE; EXECUTE to `authenticated` only (REVOKE FROM PUBLIC, anon). Order: signed in (`not signed in`) → `has_permission(caller,'listings','enforce')` (`permission denied`) → deactivated (`account is deactivated`) → `rate_gate('staff_moderation')` (`rateLimited`) → `p_tier IN (premium, featured, regular)` (`unknown tier`) → the row, never a draft (`listing not found`) → not the caller's own (`your own listing is changed the seller's way`) → not removed (`a removed listing takes no tier`) → a change (`nothing changed`) → `p_reason IN (promotion, promotion_ended, other)` (`unknown reason`) → a note for Other (`a note is required`), ≤ 500 (`the note is too long`) → `require_step_up_if_needed('listings','enforce')` (P0009) → `UPDATE listings SET tier` → `listing_revisions` (kind `edit`, `{tier}` before/after, actor) → `audit_log` (`listing.admin_tier`; meta from, to, reason, note). Returns `{ ok: true, from, to }`. No seller notice (ruling 1, 5). Every refusal leaves no row.
- **`transition_listing(uuid, text)`** (M2) — redeclared whole from its last declaration (`20261015012743:570–744`; the body's md5 with the insertions stripped equals the live body's, checked at apply). Before: a removal left `tier` as it was. After: the owner's delete sets `tier = 'regular'`; the shared last UPDATE sets `tier` to `regular` only when `p_new_status = 'removed'`; every other transition keeps the tier. Nothing else in the function changes (status rules, revisions, notices, marks, grants).
- **Staff's listing page (`/admin/listings/$listingId`)** — before: the tier shown as a Badge; the preview drawn in the free look. After: the preview takes the ad's tier look (part A); a "Set tier" button (`listing-set-tier`) when `listings:enforce` and not own and `mayTier(status)`; the dialog (section 1); on success the notice "Tier set to {tier}." and the page re-reads. Every other control unchanged.
- **The seller's own ad page, the wizard's Review preview, Screening's preview** — before: the free look whatever the tier. After: the tier's look (tint, frames, `data-tier`), no flag and no tag (S5's rule; an unknown tier draws the free look). No other change.
- **`readDraft` / the screening select** — one more column (`tier`) on reads that already run; the row's tier read through `tierOf` (unknown → null).
- **`press.ts`** — before: without `vibrate`, a touch tap clicked a hidden switch's label. After: without `vibrate` a tap does nothing and makes no element; `canTapTick()` new. With `vibrate`: unchanged (10 ms, only while the device switch is on).
- **Settings** — before: "This device · Vibrate on tap" always. After: only where `canTapTick()`; the strings stay.
- **Panel header** — before: the radio's checked value `activePanel`. After: `panelAt(useMenuAt().pathname, panelChoice)`; title unchanged.
- **Guards** — CF-TIER-4 new; CF-DOCK-1 and CF-PRESS-1 widened as part E / parts C–D say.

## 4. Censuses

Run at the plan (the chat) and re-run on `91babee` for this section:

- ListingDetail renders (`rg -n "<ListingDetail\b" src --glob '!*.test.tsx'`): `src/routes/l.$slug.tsx:226` (passes, S5), `src/features/my-listings/my-listing-page.tsx:624` (passes, T1), `src/features/posting/preview/preview-sheet.tsx:53` (spreads the view, which carries `tier` — the Review and Screening previews reach it), `src/features/admin-listings/listing-page.tsx:534` (passes, T1). CF-TIER-4 judges all four; its allowlist is empty.
- Writers of `listings.tier` in SQL (`rg -n -i "set\s+tier\s*=|,\s*tier\s*=" supabase/migrations`): M1 :64 (the door) and M2 :170, :173 (the two insertions) — none else. App writes of `tier` (`rg "tier" src … | rg "update\(|from\(\"listings\"\)"`): none.
- The tick's readers (`rg -n "navigator\.vibrate|vibrate\b|tick-switch|makeTickSwitch" src --glob '!*.test.*'`): `src/lib/press.ts:103` (`canTapTick`), `:187` (the tick), `src/routes/settings.tsx:921–922` (the row, through `canTapTick`) — no second check.
- Panel marks (`rg -n "DropdownMenuRadioGroup value=|aria-checked=|aria-selected=" src/components/shell/*.tsx`): `panel-tabs.tsx:68` (the tabs, `panelAt`), `panel-header.tsx:81` (now `panelAt`), `location-selector.tsx:112` (a place pick, not a panel — not CF-PRESS-1's concern).
- Staff listing doors, their permission and step-up use, the audit path, the states that take an ad off the site, the feed index refresh: in `docs/governance/reports/t1-tiers.stop-1.md` (§What it creates, §The proof) and `stop-2.md` — the door follows `admin_move_listing`'s shape; the feed index follows the tier through `feed_index_on_listing_update`; `removed` (staff) and the owner's delete clear the tier; sold, expired, held, rejected, paused keep it.
- The generated client types (`rg -n "admin_set_listing_tier" src/integrations/supabase/types.ts`): one entry, the generator's (DEC-320).

## 5. Tests

Added: unit PR-U11 (replaces PR-U10, dropped with the switch — part C), TIR-1…5, TD-1…5, LD-31, PSV-7, SF-6; conformance CTR-6, CTR-7 (CF-TIER-4), NDK-5 (CF-DOCK-1), PRP-10, PRP-11 (CF-PRESS-1); E2E SAP-3 (`sage-ad-page.spec.ts`), PS-8, PS-9 (`press.spec.ts`), ATR-1…5 (`admin-listings.spec.ts`). Re-titled: PRP-7 (rule 4 reads "anywhere"). Re-pointed: the ListingDetail unit tests pass a `tier` now that the prop is required (`listing-detail*.test.tsx`, `step-review.test.tsx`, `use-screening.test.ts`, `posting-service.test.ts`). Renamed before the first green run: the reasons' unit ids `TR-1…5` → `TIR-1…5` (TI-1: `TR-` was taken by the translations console; the draft run at 647d475 found it — section 11).

Changed shape after a red: ATR-1 asserted the History line's reason; red locally (`element(s) not found`): `admin_listing_detail` joins a line's reason from the seller notice written at the same moment, and this door writes none (ruling 1, 5). The assertion is now `listing-history-reason` count 0 on that line, with the reason proven on the audit row (`meta.reason`), which ATR-1 already read. PS-9 was red on the phone project (the panel band is md and up; the drawer has none — `shell.spec.ts:1369`): it now sets the viewport to 768 on `mobile-360`, as PS-7 does.

Red-first: the guards' planted cases CTR-6, NDK-5, PRP-10 and PRP-11 each run the census on a planted bypass inside the test and expect the finding (the guard proven on the bypass, K3). No defect was fixed by a unit test in this turn, so no other red-first evidence was owed; ATR-1 and PS-9 were red in the local browser run before `91babee` (above). TIR-5's own red (a RAISE in M1 without a key) was not planted — a limit (section 12).

Refusals prove no side effect: ATR-2 (a removed ad: the door refuses, `tier` unchanged), ATR-3 (a reviewer: `permission denied`, no audit row, no revision, tier unchanged), ATR-4 (no second factor: `step-up required`, nothing written); M1's proof block the same for permission, own listing, removed, unknown tier, unknown reason, Other without a note.

Unit totals (THE CHECKS, `bun run checks` on `43d6530` + docs/e2e-only commits since): laws-first `Test Files 1 failed | 83 passed (84)`, `Tests 1 failed | 429 passed (430)`; component tests `Test Files 1 failed | 421 passed (422)`, `Tests 1 failed | 2642 passed (2643)` — the one failure in both is NH-6 (`scripts/ci/nightly-hour.test.ts`), which fails on this macOS machine only (the New York zone resolution; section 12). `bun run typecheck`: exit 0.

THE CHECKS' lines: fast line `checks (fast): 16 PASS · 5 FAIL · 227s`; last line `checks: 23 PASS · 5 FAIL · 30 NOT RUN · 285s`. The five FAILs: laws-first (NH-6 only), component-tests (NH-6 only), Workflow lint (the pinned actionlint is a linux_amd64 binary; on macOS its self-test cannot run — environment), Secrets scan (the pinned gitleaks is linux_x64 — environment; CI's gitleaks judges), i18n drift (real: the maps were regenerated before the page wiring; fixed in `43d6530`). The NOT RUNs: the build-and-check steps after the actionlint fail (Typecheck, Format check, Lint, e2e selector self-test, Root route names, Build, Bundle report — each run by hand afterwards: typecheck 0, `bun run format:check` 0, `bun run lint` 0 errors / 46 warnings none in a file this task changed except two pre-existing in `listing-detail.tsx` (the base has them), `e2e-select --self-test` OK, `check-root-routes` 59 entries safe, the build and `check-bundle-size` OK); Install dependencies ×3 (installed); dependency-audit ×2 (the advisory service unreachable from the sandbox); e2e-preflight ×4 (staging credentials); e2e ×6 (CI's artifacts); promote ×4 (CI only); semgrep Upload SARIF ×2 (GitHub only).

E2E (local, ethio-staging, `bun run e2e:local`, both projects, `E2E_RETRIES=0`):

- Run 1 — `e2e/admin-listings.spec.ts e2e/sage-ad-page.spec.ts e2e/press.spec.ts e2e/settings.spec.ts e2e/shell.spec.ts e2e/admin-screening.spec.ts e2e/my-listings-ad.spec.ts e2e/ad-page.spec.ts e2e/post-wizard-bundle2.spec.ts`: `15 failed · 83 skipped · 493 passed (25.9m)`. The 15: AL-20, AL-23, AL-30, SC-25, SC-26, MLA-13 ×2 projects = 12 — every one a `page.keyboard.press("Control+A")` select-all that does not select on macOS (the typed text appends: `"Corrected listing …E2E admin listing local …"`, price `90100`, AL-30's day count valid so the door asked for the second factor) — pre-existing specs, a local limit, CI (Linux) judges; ATR-1 ×2 (the History reason, above); PS-9 ×1 (mobile, above). `[ssr-error]` lines: 0; `[slow-rpc]`: 0.
- Run 2 (after `91babee`) — `--grep "ATR-|PS-9"`: `2 failed · 10 passed (2.4m)`: ATR-5 and PS-9 on desktop, both `Test timeout of 60000ms exceeded` with a blank screenshot and no assertion, the last two tests of the run at the same moment; both passed on mobile in the same run and both passed on desktop in run 1 (ATR-5) / run 3.
- Run 3 — `--grep "ATR-5|PS-9"`: `4 passed (16.9s)`. The repeat lane is the proof of repeatability (DEC-283).

J-audit (`e2e/admin-listings.spec.ts` ATR-1…5, `sage-ad-page.spec.ts` SAP-3, `press.spec.ts` PS-8/PS-9): J1/J3 — scratch seller, ads and permission holders from the specs' existing namespaced helpers (`scratchSeller`, `seed`, `scratchHolder`), removed by the describe's throwing `afterEach`; no real row read or written (ATR-5's owner delete and sale act on scratch ads). J2 — no sweep. J4 — DB truth by id through the service client (`tierTruth`, `tierAudits`, `revisionRows`, `noticeRows`, `feedRanks`). J5 — testids, no `.first()`, no `waitForTimeout`. J6 — no shared roster. J7 — seed before navigate, `gotoReady`, assert the seeded title before acting. J8 — not `@global-state`. J9 — identity through `useJobSuperAdmin` / `signInViaSession` only.

## 6. K2 — siblings that bypass the mechanism

Greps: `rg -n "async function scratchHolder|const scratchHolder" e2e`, `rg -n '\?\? "regular"' src`, `rg -n "staff_moderation" src/lib/dials.ts`, `rg -n "as unknown as" src/features/admin-screening`, the censuses of section 4.

- `e2e/ad-page-doors.spec.ts:180`, `e2e/admin-listings.spec.ts:288`, `e2e/admin-screening.spec.ts:262`, `e2e/my-listings-doors.spec.ts:339` — four local `scratchHolder` helpers for one concern (a scratch permission holder); `e2e/helpers/` is outside scope. Left; ATR-3/4 reuse the admin-listings one.
- `src/features/admin-listings/use-admin-listing.ts:115` `tier: String(l["tier"] ?? "regular")` — a sentinel default on the staff read (pre-existing; the brief named the line as "holds it"). Left: not a numbered change; a tier is not identity, geography or screening, but the law's spirit says a typed absence.
- `src/lib/dials.ts:176` — the `staff_moderation` dial's comment names its doors; `admin_set_listing_tier` now shares it and is not named (file outside scope). Left.
- `src/features/admin-screening/use-screening.ts` — pre-existing `as unknown as` casts (the file was touched for the `tier` column only). Left.
- `admin_listing_detail` (`20261011124548`) joins a History line's reason from `seller_notices` by `created_at`: a staff change without a notice (this door) shows no reason in History although the audit row carries one. Reported, not changed (a door outside the task).
- `transition_listing` clears the tier without a `state` revision carrying it (stop-2 ruling 4; roadmap line).

## 7. Allowlists and guards

- `scripts/public-surface-allowlist.txt`: 160 → 161 lines — `admin_set_listing_tier | authenticated | Turn T1 (D242, D276): staff set an ad's tier (premium, featured, regular); listings:enforce with a fresh second factor; never a draft, a removed or the admin's own listing; a reason (promotion, promotion_ended, other with a note); a revision and an audit row`.
- `scripts/acceptance-doors-allowlist.txt`: 112 → 113 — `admin_set_listing_tier(uuid,text,text,text) | staff | Writes listings (the tier only), listing_revisions, audit_log; rejects callers lacking listings:enforce before its mutations` (ruling 1, 6).
- CF-TIER-4's allowlist: none (empty). CF-DOCK-1, CF-PRESS-1: no new allowlist line.
- Guard self-tests run: the laws (`bunx vitest run scripts`) in THE CHECKS — 429 of 430 passed (NH-6); the migration guard (`check-migrations.sh`) PASS with its self-tests; acceptance-doors, caller-gates, deletions, shell-pipes, promote, outbound-calls self-tests PASS; public-surface judged in the migration-lint job PASS.
- The four-check pre-commit scan for migrations (stop-2 ruling 6; `/tmp/mig-scan.py`, outside the repository): 0 findings on M1 and M2 — (i) CASE in IF/ELSIF/WHILE/EXIT WHEN parenthesised; (ii) string literals with inner quotes doubled; (iii) every non-draft scratch listing has a place; (iv) the proof reads no real row.
- Non-null allowlist: no file gains an assertion (the laws pass).

## 8. Strings

New, EN + AM in the same change (ruling 1's Amharic, copied by key):

| key | EN | AM |
| --- | --- | --- |
| `admin.listings.action.tier` (admin) | Set tier | ደረጃ አስቀምጥ |
| `admin.listings.tier.title` (admin) | Set the tier | የማስታወቂያውን ደረጃ አስቀምጥ |
| `admin.listings.tier.hint` (admin) | Premium ads lead the feed and Featured ads follow; Regular is the free look. The tier stays until staff change it or the ad is removed. | ፕሪሚየም ማስታወቂያዎች በዝርዝሩ መጀመሪያ ይታያሉ፣ የተለዩ ማስታወቂያዎች ይከተላሉ፤ መደበኛ ነጻው መልክ ነው። ደረጃው ሠራተኞች እስኪቀይሩት ወይም ማስታወቂያው እስኪወገድ ድረስ ይቆያል። |
| `admin.listings.tier.done` (admin) | Tier set to {tier}. | ደረጃው ወደ {tier} ተቀይሯል። |
| `admin.listings.tier.error.same` (admin) | The ad already has this tier. | ማስታወቂያው አስቀድሞ ይህ ደረጃ አለው። |
| `admin.listings.tier.error.removed` (admin) | A removed ad takes no tier. | የተወገደ ማስታወቂያ ደረጃ አይቀበልም። |
| `admin.listings.tier.error.unknown` (admin) | Unknown tier. | ያልታወቀ ደረጃ። |
| `admin.listings.reason.promotion` (member) | Promotion | ማስተዋወቅ |
| `admin.listings.reason.promotion_ended` (member) | Promotion ended | ማስተዋወቁ ተጠናቋል |

Changed: `common.dismiss` (base) AM «አሰናብት» → «ዝጋ» (ruling 1, 9; D278). The compiled value changes; `ui_translations` is runtime truth, so the database row is the operator's to align (section 12). Both usage maps regenerated (`bun run i18n:usage`) and committed; the map guard passes.

## 9. Migrations

- M1 `supabase/migrations/20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql` — sha256 `0d5dc77a2bf8e01235e5e3b967080ab2717119ec8a54600ad805f20498c79df7` (17248 bytes), mark `20261102200000`; `apply cf2b45c5 → expect mark 20261102200000`. Applied on ethio-staging at round 3 (the supervisor's "continue"); its proofs ran there for the first time.
- M2 `supabase/migrations/20261102052535_4fb5d636-3ae7-42f3-8737-290ae63e7237.sql` — sha256 `2f4f4846a0e9bda7f158d9c270224b9029f1c2b066dc8eb866b5c8e6a9bdb50e` (18021 bytes), mark `20261102210000`; `apply 4fb5d636 → expect mark 20261102210000`. Applied on ethio-staging at round 2.
- ethio-prod: both await the operator's apply (the stop reports' pairing lines).

## 10. Departures

- Dial order in M1: `rate_gate('staff_moderation')` after the permission and deactivation checks, before the rules and the step-up — `admin_move_listing`'s order, not the brief's "permission → step-up → scope" sketch; accepted by the stop-1 ruling (INC-951 3b).
- M2's second insertion is conditional (`CASE WHEN p_new_status = 'removed'`) on the shared last UPDATE rather than a separate statement — accepted by the stop-2 ruling.
- No third insertion (the `state` revision does not carry the tier) — stop-2 ruling 4: "not now … a roadmap line at the records turn"; the line is in `roadmap.md`.
- The ATR tests live in `e2e/admin-listings.spec.ts`, not a new spec file: `scripts/e2e-select.ts` (outside scope) requires every spec to be reachable from an area, and the admin-listings area names that file only.
- `TR-1…5` renamed `TIR-1…5` before the first green run (TI-1); `stop-3.md` still says "TR-1…5" (a record, not edited after the fact).
- `src/integrations/supabase/types.ts` edited by hand with the generator's 9-line entry (DEC-320, stop-3 ruling; the platform's next regeneration must leave it unchanged).
- `scripts/route-budgets.mjs`: `/admin/listings_/$listingId` 387 → 388 = `ceilingForLocal(387.3)`, cause on its line (the tier dialog and its reasons, +0.9 KiB on this page). Every other page: within −0.1 … +0.6 KiB of the base (`/admin/listings` +0.6, `/admin/translations` +0.3, four pages +0.1, the rest −0.1), none inside the 0.3 KiB NEAR band, so no other ceiling moves (the base and the tree both built locally; the base in a worktree at `e5e191c6`).
- STOPs and rulings in the turn: stop 1 (M1; rulings INC-1033, INC-1033 b; "continue"), stop 2 (M2; ruling INC-1033 c; "continue"), stop 3 (the generated types; ruling DEC-320).
- Added helpers: `canTapTick` (ruled by the brief), `mayTier`, `tierProblem`, `tierErrorKey`, `TIER_LABEL` (the plan's), e2e locals `tierTruth`, `tierAudits`, `feedRanks`, `setTierViaConsole`.

## 11. CI

The base `e5e191c6`'s CI (ci-status.md read at the start of the task, two-step: the commit equals the base; conclusion SUCCESS):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `e5e191c638b1cc0aa11faeb7c7577680e752503f` (short `e5e191c`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-02T04:21:14Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41386156268
```

No red of an earlier turn to fix. `origin/dev` is still `e5e191c6` at the time of this report.

This pull request's own runs so far (draft, on the stop pushes): the newest completed run is on `647d4753` (stop 3; ci-status FAILURE, run 41395409251): Component tests — TI-1 `no test id is used twice` (`TR-1…5` clashed with the translations console) → class (e), fixed in `18a6673` (the TIR rename); E2E lanes 7, repeat and the merge verdict — PS-9 on the phone project (`panel-header-title` not found in the drawer: the band is md and up) → class (e), fixed in `91babee`. No re-run. The runs on the final commit are read after the push; any red is fixed at its root in a new commit and this section updated in the same commit.

## 12. Limits

- The browser check's local pre-existing reds (AL-20, AL-23, AL-30, SC-25, SC-26, MLA-13) are the macOS `Control+A` select-all limit; they are not proven here — CI (Linux) is the proof.
- Run 2's two desktop timeouts (ATR-5, PS-9; blank page, both at the run's end) did not repeat in run 3; I cannot name their cause from here. CI's repeat lane judges repeatability (DEC-283).
- NH-6 fails on this macOS machine (the zone resolution), so the laws and component jobs show 1 FAIL locally; CI's Linux runner is the judge.
- The pinned actionlint and gitleaks binaries are Linux builds; their steps cannot run on this machine — CI's judge for both; my own diff was read for secrets before each commit (the `'PROOFSECRET'` literal is the house placeholder).
- `dependency-audit`, `e2e-preflight`, the e2e merge and `promote` are not runnable here (section 5 names each).
- `common.dismiss`'s Amharic changed in the compiled catalog; the `ui_translations` row on staging and production is runtime truth and is the operator's to align.
- TIR-5 was not shown red on a planted M1 (the test reads the committed file by path; I did not edit the migration to plant one).
- No Settings unit test proves the row's absence (PS-8 does, in the browser); the server-side snapshot is `false` by construction.
- The migrations' proofs ran only through the staging applies (the supervisor's); I never applied anything.
- The operator's walk lines: (1) his own listing page, the edit's Review preview and staff's listing page show the tier's look — tint and frames, no flag and no tag — for a Premium and a Featured ad, and the free look for a Regular one; staff's Badge still names the tier; (2) as staff with `listings:enforce` and a second factor, Set tier → Premium with the reason Promotion: the notice, the badge, the preview's look, the feed's order, the History line "Edited: Tier" (no reason line; the reason is in the audit); Set tier → Regular with Promotion ended; a reviewer sees no Set tier; (3) Settings on the iPhone shows no "This device" row; on Android it shows the row and the tick plays.
