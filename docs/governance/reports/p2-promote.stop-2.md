MIGRATION — p2-promote part M-2a: promote_options, the seller's Promote reader door (ruling 1 §1, DEC-349)
DONE: step 0, step 1 (stop 1), ruling 1 saved (docs/governance/briefs/p2-promote-ruling-1.md, sha256 of the fenced text e8d5ae137f12b8d575effd4cdccf3139439e45c3f8d9d53c316a2ed392d5cd6a = the attachment's), part M-2a (the door, its manifest line, its public-surface line, its proofs; db:proof PASS)
LEFT: after "continue" with the types patch — the service and the sheet, the row menu and the page, staff Days / source / until / the typed absence, moneyText and its two callers, DOOR_CODES, the strings, tests PMS / PMV / ALV / LVP-1…4, budgets, THE CHECKS, the self-review, the report, the pull request's CI
CI: # CI Status (auto-generated — do not edit by hand)
    (blank)
    - Commit: `c2327fc28da250de2c88bff4f060449315b06ca1` (short `c2327fc`)
    - Conclusion: **SUCCESS**
    - Completed (UTC): 2026-11-06T21:15:40Z
    - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42288319904
    (c2327fc is this branch's stop-1 commit; origin/dev is still 7acae2b4d — no drift.)
FILES: docs/governance/briefs/p2-promote-ruling-1.md
       docs/governance/briefs/p2-promote.md
       docs/governance/reports/p2-promote.stop-1.md
       roadmap.md
       scripts/doors/check-doors-allowlist.txt
       scripts/doors/manifest.txt
       scripts/public-surface-allowlist.txt
       supabase/migrations/20261106233808_bc86fa74-d073-4c1d-8250-f767b6251152.sql
       (and this file)

## The file

- Name: `supabase/migrations/20261106233808_bc86fa74-d073-4c1d-8250-f767b6251152.sql`
- sha256: `75a6bd836b9733768d57da148f7834a567905e51bf9de466f14ccffb4aa899a2`
- Mark: `20261107001000` (above the ledger's top `20261106120600`, later than the file's stamp)
- Pre-check: the marks `20261106120600` (F1-1 M-F1a part 6) and `20261104210000` (P-2 M-1b part 2,
  `set_listing_level`) — the ledger, never a definition read.
- Creates: `public.promote_options(p_listing_id uuid) RETURNS jsonb` — plpgsql, STABLE, SECURITY
  DEFINER, `SET search_path = public`. `REVOKE ALL … FROM PUBLIC, anon`; `GRANT EXECUTE … TO
  authenticated`; `GRANT ALL … TO service_role` (after the body and again as the closers).
- Order inside the body: `door_context('reader')` (notSignedIn, accountDeactivated; no dial) →
  ownership on `listings.seller_id = ctx.uid` (`door_refuse('listingNotFound')`) → the location's
  country only (`door_refuse('listingNotPlaced')`; never `my_listing`'s home-country fallback) →
  `market_settings_for(country)` (its `marketNotSet` RAISE caught and answered as
  `door_refuse('marketNotSet')`) → one row per enabled self-serve level in `sort, key` order, each
  through `level_perks_for` and `product_price_for` with the ad's category and that country. A
  reader has no shell: a refusal is RAISEd out with SQLSTATE P0D01 and `message` = the code.

## The answer, as built

```
{ ok: true,
  status: <listings.status>,
  level: { key: <listings.tier>, until: <tier_until | null>, source: <tier_source | null> },
  country: <the location's country_code>,
  paidLevels: <market row's paid_levels>,
  currency: <countries.currency_code of that country | null>,
  levels: [ { key, name_en, name_am (null when unset), sort,
              current: key = the ad's level,
              below: not current and (sort <= the current level's sort, or the current level is no level row),
              days: level_perks_for(...).days (null when the perks are null),
              amount: product_price_for(...).amount (null when not offered),
              currency: product_price_for(...).currency (null when not offered),
              availability: levelNotAvailable  when level_perks_for is null
                          | seasonEnded        when days is null or under 1
                          | notOffered         when product_price_for is null
                          | available } ] }
```

`below` is `set_listing_level`'s lowerLevel rule (`v_level.sort <= v_cur.sort`) and `availability`
its refusal order after it (levelNotAvailable → seasonEnded → notOffered), by the same two
resolvers with the same arguments.

## Proofs (one DO block, sentinel rollback `p2b-m2a-proof-ok`)

Scratch rows only: currency XTS, markets XZ (its own market row) and XY (none), each with a region
and a city; a scratch seller and a second user; a scratch leaf category; six scratch levels with
sorts derived above every real level (`max(sort) + 100`, never a real value) — below, current,
offered (priced 7 XTS, 20 days), unpriced (40 days), disabled, staff-only — and a scratch reach row;
three scratch ads (live in XZ at the scratch current level, unplaced, live in XY).
- (a) header and grants: definer, STABLE, `search_path=public`, no PUBLIC entry, anon refused,
  authenticated and service_role granted.
- (b) the seller's answer: ok, status, the ad's level key / until / source, country XZ,
  paidLevels false, currency XTS; the scratch rows exactly [below, current, offered, unpriced] in
  that order (disabled and staff-only absent); below: current false, below true, names, sort,
  notOffered; current: current true, below false, name_am null, days 15; offered: days 20, amount 7,
  currency XTS, available; unpriced: days 40, amount and currency null, notOffered.
- (c) the season rule: the category ending within the hour → the offered level seasonEnded, days 0.
- (d) refusals, each SQLSTATE P0D01 with the code as message: notSignedIn (no caller),
  listingNotFound (the other user), listingNotPlaced (the unplaced ad), marketNotSet (XY with no
  row and no default — the real default row, if any, parked on XZ inside the rolled-back block, as
  M-1b part 1's proof does); then a scratch default row (paid ON) answers XY with paidLevels true.
- (e) nothing any read wrote: rate_limits for both users, revisions, audit rows and the three ads
  compared before and after.
- (f) agreement with the door: `set_listing_level` refuses the unpriced level `notOffered` and the
  level below `lowerLevel`, sets the offered one; the reader then answers the new level and marks
  the old one below.

## Guard lines

- `bash scripts/check-migrations.sh`: "Born-closed guard OK (floor 20261007143529)." · "Definer
  guard OK." · "Self-marking guard OK (floor 20260817054246)." · "Public-surface guard OK (floor
  20261003215043)." · "Real-row proof guard OK (floor 20261007000000)." · "Migration guard OK."
- `bun scripts/doors/check-doors.ts`: "check-doors self-test OK: 7 finding kinds fired on their
  planted fixtures, the clean pair fired nothing" · "check-doors static OK: 266 manifest lines
  reconcile with the migrations' catalogue".
- `bun run db:proof` (last line, final tree): `db:proof PASS — applied 416/416, CLI 2.120.0, warm, 4 s`
  (the run before it failed in the proof on `levelMismatch` — the XY city sat under its country with
  no region; fixed in the file before the commit, the second run is the one above).
- `bunx vitest run scripts --maxWorkers=2`: 491 passed, 1 failed — NH-6
  (`scripts/ci/nightly-hour.test.ts`), which fails on this computer alone as well (macOS's `date`
  does not read `TZDIR`, so the planted "no zone files" machine still resolves New York); it reads
  none of this turn's files and CI's Linux runners pass it (the stop-1 run above is green). A
  finding, below; not touched.

## Manifest and allowlists

- `scripts/doors/manifest.txt` + 1: `promote_options(uuid) | signed-in-reader | authenticated | - |
  - | - | - | - | - | listingNotFound,listingNotPlaced,marketNotSet | P-2 (b) M-2a (DEC-349): …`
  (265 → 266 lines).
- `scripts/public-surface-allowlist.txt` + 1: `promote_options | authenticated | …` with its reason.
- `scripts/doors/check-doors-allowlist.txt` + 1 (9 → 10): `grant-without-caller promote_options(uuid)
  | … promote-service.ts names it in the same turn after the types patch, and this line goes with it
  | 2026-11-20` — a departure: the door guard fails a browser grant no code names, and the service
  is written only after "continue" (rule 30's order, ruling 1 §8). The line leaves in the service's
  commit; the kit fails it as stale if it stays.

## Departures from ruling 1 §1 (for the supervisor's reading)

1. Each level row also carries `currency` (the price row's own). A price resolved from a row of
   another market or a global row may be in a currency other than the country's; the top
   `currency` alone would label such an amount wrongly. The top `currency` is the country's
   (`countries.currency_code`).
2. `levelNotAvailable` cannot arise for a listed row today: the list and `level_perks_for` read the
   same `enabled` level row, so the perks are never null for it (as in `set_listing_level`, where
   `unknownLevel` comes first). Kept in the order for parity; no proof can reach it.
3. A current level that is not self-serve (a staff-only level) is not among `levels`; its key is in
   `level.key`. The sheet will name it from `levels` when present and fall back to the generic
   level words otherwise.
4. The allowance line above (`check-doors-allowlist.txt`), outside the named files.

## Finding

- NH-6 (`scripts/ci/nightly-hour.test.ts:99`) cannot pass on macOS: the BSD `date` ignores `TZDIR`.
  Pre-existing, outside scope, reported for its own tracked fix.

## The pairing line

apply bc86fa74 → expect mark 20261107001000

The pull request's preflight job reports "STAGING BEHIND" until ethio-staging holds the mark —
expected. The service reads `promote_options` through a shape guard; the generated types patch
from the supervisor follows the apply.
