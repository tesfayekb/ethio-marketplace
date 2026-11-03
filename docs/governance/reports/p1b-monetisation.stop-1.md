MIGRATION — p1b-monetisation part A: the credits model's products — levels with per-category perks (M-a), prices with a credit cost (M-b), market settings and the staff reader (M-c), validate_listing_draft onto seller_plan (M-d), CF-PLAN-1
DONE: part A (turn (a) of ruling 1 §5): M-a, M-b, M-c, M-d written; CF-PLAN-1 (plan-seam census, test, allowlist, wired); the public-surface, acceptance-doors and pool-reset lines
LEFT: turn (b) — the Monetisation console (folder merge, route, redirects, sections, strings EN + AM, unit tests, budgets), `e2e/admin-monetisation.spec.ts` MON-1…MON-15, CF-PRICE-1 / CF-LEVEL-1, `scripts/e2e-select.ts`'s `admin-monetisation` area, the vendor-seams line; turn (c) — the browser check, docs, register rows, changelog, roadmap, self-review, report, PR CI
CI: (the base, read at origin/ci-evidence before the build)
# CI Status (auto-generated — do not edit by hand)

- Commit: `8ae1bec5017b2772bc444a4acfb317568a734ebb` (short `8ae1bec`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-03T02:59:18Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41567593377
FILES: (`git diff --name-only 87c336c0a`)
docs/governance/briefs/p1b-monetisation-plan.md
docs/governance/briefs/p1b-monetisation-ruling-1.md
e2e/helpers/pool-reset-map.ts
scripts/acceptance-doors-allowlist.txt
scripts/conformance/plan-seam-allowlist.txt
scripts/conformance/plan-seam.test.ts
scripts/conformance/plan-seam.ts
scripts/conformance/wired.test.ts
scripts/public-surface-allowlist.txt
supabase/migrations/20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql
supabase/migrations/20261103040806_3f552dc1-73ac-4377-a5ea-c01e1725dfea.sql
supabase/migrations/20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql
supabase/migrations/20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql
(13 files, 2898 insertions, 9 deletions; plus this report)

Base `8ae1bec5`; `origin/dev` is still `8ae1bec5` (no Lovable commit). Branch `cursor/p1b-monetisation`; commits since the task was saved (87c336c0a): 203f64dfe ruling 1 and the plan saved · f1ae7d590 M-a, M-b, M-c and the allowlist lines · 092c0d8dc M-d · b9ebdd65a CF-PLAN-1.

## The four migrations

Every proof: one `DO $proof$` block; scratch rows only (country `XZ` named `e2e-mig-…`, its anchor read by that name; a scratch currency `XTS` — the ISO testing code, a K4 exception named inline; scratch categories root → leaf; scratch users with aal2 sessions, TOTP factors and `request.jwt.claims` set in the block); keys from `gen_random_uuid()` (CF-PROOF-KEY-1); one RAISE per condition; the sentinel `p1b-mX-proof-ok` rolls the scratch back. **Proofs not executed — the staging apply is their first run** (I run no database; CI's temporary backend applies every migration before the lanes).

Five-point pre-stop scan (the brief §2), run on the four files with `rg`/`awk` and read by eye: (1) no `IF … CASE` unparenthesised (every CASE inside an IF sits in parentheses — the perks-by-kind CHECK is a constraint, not an IF); (2) the one non-draft scratch listing (M-b, the price wrapper's ad) has a place (`location_id = v_city`, the scratch XZ city); (3) every quote inside a RAISE literal is doubled (the odd-quote scan found none); (4) one RAISE per condition in every door and proof (63 / 55 / 36 / 11 RAISE lines, none joined across concerns); (5) every scratch key against its column's CHECK — `listing_packages.key ~ '^[a-z][a-z0-9_]{1,31}$'`: the scratch keys are `e2e_mig_lv_` / `e2e_mig_rc_` + eight letters (19 chars, letters and underscores only); `placement` only `standard|boost|top`; `max_photos` 0–30; `credit_cost ≥ 0`; `kind` `level|reach`.

### M-a — `20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql` (786 lines, 47,440 bytes)
- sha256 `8eaeb1fb179d423645077deefe22832ee55812b1bc28b17dc2ea015d984cf312`; declared mark `20261103160000`; header `-- e2e-areas: admin-monetisation`.
- Creates / redeclares: `listing_packages` + `kind` (CHECK level|reach), `name_en` (NOT NULL after the backfill), `name_am` (NULL), `max_photos`, `placement`, `badge`, `created_by`; `tier` and `label_key` DROPPED; keys renamed `featured_45 → featured`, `premium_60 → premium` through the price FK re-created `ON UPDATE CASCADE`; the `regular` level seeded; `listing_packages_perks_by_kind_check`; the public column grant restated (never `created_by`/`updated_by`). New table `level_overrides` (born closed; public read of all but attribution; `UNIQUE NULLS NOT DISTINCT (level_key, category_id, country_code)`; one-cell CHECK). New `level_perks_for(text, uuid, character)` (STABLE, INVOKER; per-column precedence country+category → country → category → level; `days` capped at the main category's `visible_until`, 0 when ended; NULL for unknown/off/reach). `admin_save_listing_package` DROPPED and re-created with the new argument list; new `admin_save_level_override`, `admin_clear_level_override` (config-door order; audits `package.saved`, `level_override.saved`, `level_override.cleared`).
- Proof (a)–(i): headers and grants; the old signature gone; columns and privileges; `tier`/`label_key` gone; the three seeds by name and perk; (b) the FK cascade on a scratch key rename; (c) per-column precedence over five scratch cells (expected `{15, 9, 'top', true, null}` for leaf/XZ); (d) the season cap (10 days left → 10; ended → 0); (e) the doors as a scratch super_admin with aal2 — create, rateLimited, NULL keeps `name_am`, reach create, override save/upsert/clear, fifteen refusals; (f) `permission denied` ×3 as a plain user; (g) P0009 ×3 at aal1; counts; (i) anon reads a row, `created_by` → 42501.
- `apply 1fc03fef → expect mark 20261103160000`

### M-b — `20261103040806_3f552dc1-73ac-4377-a5ea-c01e1725dfea.sql` (601 lines, 36,663 bytes)
- sha256 `2630ef7b850e30f18d227aa1976ace743aafdbaab67fcf393ee2fb34ec25dffd`; declared mark `20261103170000`; header `-- e2e-areas: admin-monetisation`.
- `package_prices` + `credit_cost integer NOT NULL CHECK (≥ 0)` (no default, no backfill — the table holds no rows), `used_count integer NOT NULL DEFAULT 0`, `created_by`; the public column grant restated. New `product_price_for(text, uuid, character)` (the core resolver: M1b's precedence, the answer adds `credit_cost`, `used_count`); `package_price_for(uuid, text)` redeclared as the listing wrapper over it (`CREATE OR REPLACE`, same signature). `admin_save_package_price` DROPPED and re-created with `p_credit_cost` (refusal `bad credit cost`); new `admin_edit_package_price(uuid, …)` (`price not found`, `price in use` when `used_count > 0`, `price already ended`, value refusals, `overlapping window` excluding itself; audit `package_price.edited` old→new).
- Proof (a)–(h): headers, grants, columns, the old signature gone; (b) six-row precedence through the core and the wrapper for a scratch ad in a scratch city, a reach product priced, off/unknown NULL; (c) save + audit; the dial; (d) edit + audit (amounts `1.00 → 1.50`), overlap refused, `used_count = 1 → price in use`, ended row refused; (e) fifteen refusals; (f) denied; (g) P0009; counts.
- `apply 3f552dc1 → expect mark 20261103170000`

### M-c — `20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql` (440 lines, 26,976 bytes)
- sha256 `77bbd0eb3a153eb334f71df446adb40b8a6e0959f6afb4252665b7d20d398f90`; declared mark `20261103180000`; header `-- e2e-areas: admin-monetisation`.
- The three reach rows seeded (`city`, `nationwide`, `worldwide`; `kind = 'reach'`, 30 days, enabled; perks NULL/NULL/false). New table `market_settings` (born closed; public read of all but attribution; `UNIQUE NULLS NOT DISTINCT (country_code)`; `paid_levels = (paid_levels_since IS NOT NULL)`; launch bundle whole or absent); the default row `(NULL, 3 free Regular ads, included reach 'city', paid levels off, launch 10 credits / 30 days)` — no `'ET'` row. New `admin_save_market_settings(integer, text, boolean, character, integer, integer)` (`unknown country`, `bad free ads`, `unknown reach`, `launch bundle required`, `bad launch bundle`; `paid_levels_since` set when the switch turns on, kept while on, cleared when off; audit `market.saved`). New `admin_list_monetisation()` (STABLE DEFINER; `packages:view` checked inside; `{markets, products, overrides, prices}` with `created_by_name` / `updated_by_name` from `profiles.display_name`, never an id; `denied` otherwise).
- Proof (a)–(h): headers, grants, the seeds, the default row; the door's refusals and writes as a scratch super_admin; `since` kept across a save while on and after moving it back a day; the reader's shape and the admin's name; `denied` for a plain user; the dial; P0009; anon column 42501.
- `apply 0cdc612d → expect mark 20261103180000`

### M-d — `20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql` (550 lines, 30,047 bytes)
- sha256 `01fb57808259aea6dfb82a06fd8001ad171a4bf0ef7c144ea13a3515f8b4c38a`; declared mark `20261103190000`; header `-- e2e-areas: admin-monetisation, posting`.
- `validate_listing_draft` redeclared WHOLE by `CREATE OR REPLACE` with the same header (`LANGUAGE plpgsql`, `SECURITY DEFINER`, `SET search_path TO 'public'`, VOLATILE, the 17-argument list unchanged) and the body of `20261028224333` byte for byte except its line 371: `WHERE plan = 'free'` → `WHERE plan = public.seller_plan(p_uid)`. The REVOKE/GRANT lines restated (service_role only). A pre-check `DO` block refuses the apply unless the LIVE body's `md5(replace(prosrc, chr(13), ''))` is `dfa2d9cd3e4d633314717597e9902986` (the ruling's read-back), so the file can never overwrite a body that moved.
- The body was assembled by script from the landed file, never typed: `sed -n '10,444p' 20261028224333_….sql` → the one line replaced by anchored `sed` (`grep -c` of the old line printed `1`; `diff` against the source shows exactly line 362 changed).
- Proof (b), as §2 Q11 asks — the command and its output:
  ```
  perl -0777 -MDigest::MD5=md5_hex -ne 'if (/AS \$function\$(.*?)\$function\$;/s) { my $b = $1; $b =~ s/WHERE plan = public\.seller_plan\(p_uid\);/WHERE plan = '"'"'free'"'"';/; print md5_hex($b), "\n"; }' supabase/migrations/20261103040808_4854ce93-2b81-41da-9a13-ec7a8b677a6d.sql
  dfa2d9cd3e4d633314717597e9902986
  ```
  (the same command without the restore prints `6fdcdbc38cac35a964253bf7a2098b74`, the new body). The in-file proof (b) repeats the check on the LIVE `prosrc` after the apply: the body with the one change restored has md5 `dfa2d9cd…` and the body contains the seam read.
- Header line: `pg_proc` after the apply — `provolatile = 'v'` (VOLATILE), `prosecdef` (SECURITY DEFINER), `proconfig = '{search_path=public}'`, `pg_get_function_identity_arguments` = `p_uid uuid, p_step smallint, p_category_id uuid, p_title text, p_description text, p_video_url text, p_attributes jsonb, p_price_mode text, p_price_amount numeric, p_price_currency character, p_price_period text, p_poster_expires_at timestamp with time zone, p_coverage uuid[], p_contact_pref jsonb, p_prior jsonb, p_price_bp integer, p_price_negotiable boolean` — proof (a) raises on any difference; anon and authenticated have no EXECUTE, service_role has.
- Proof (c): a scratch seller in a scratch XZ market (region + `max_cities + 1` cities, `max_cities` read from `coverage_plans WHERE plan = public.seller_plan(v_uid)`); the place step with one city too many answers the refusal `{"field":"coverage","reason":"coverageExceedsPlan:city"}`; with `max_cities` cities it does not.
- `apply 4854ce93 → expect mark 20261103190000`

Apply order: M-a → M-b → M-c → M-d (M-b's FK and `product_price_for` need M-a's `kind` and renamed keys; M-c's reach seeds need M-a's columns; M-d stands alone).

## Guards

`bash scripts/check-migrations.sh` on the final tree:
```
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard OK (floor 20260817054246).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard OK (floor 20261007000000).
Migration guard OK.
```
(Before the allowlist lines it listed the nine new objects as unlisted — the guard sees them.)

CF-PLAN-1 — `scripts/conformance/plan-seam.ts` + `plan-seam.test.ts` (PSM-1…3) + `plan-seam-allowlist.txt`, named in `wired.test.ts` (`toContain("PSM-3")`). The census reads every migration in order (comments blanked through `sqlCodeOf`, `DO` blocks removed), keeps each function's last declaration minus later `DROP FUNCTION`s, and finds `reads:<fn>` (a `FROM`/`JOIN … coverage_plans` without `seller_plan(`) and `literal:<fn>` (`plan = 'free'`); the seam's three functions are never findings. Shown red on the tree WITHOUT M-d (`literal:validate_listing_draft` and `reads:validate_listing_draft` at `20261028224333:10`, plus `reads:admin_set_coverage_plan`), clean with M-d; PSM-2 plants a bypass in a last declaration (found), a superseded one, a seamed one, a dropped one and two proof-only ones (not found); PSM-3 a commented read, a `JOIN` and an unqualified name. Allowlist: `reads:admin_set_coverage_plan | the staff config door reads and writes the plan row its p_plan argument names (P-1 M1a); no seller is involved | INC-1034`. The ids `PS-1…3` were taken (`e2e/press.spec.ts`, `post-wizard-bundle2.spec.ts`; TI-1 caught it locally) — the guard's ids are `PSM-1…3`.

## Allowlist lines (file:line)

`scripts/public-surface-allowlist.txt` — moved (reason rewritten for the new shape): :166 `listing_packages`, :167 `package_prices`, :168 `package_price_for`, :169 `admin_save_listing_package`, :170 `admin_save_package_price`. Added: :172 `level_overrides | anon,authenticated`, :173 `level_perks_for | anon,authenticated`, :174 `admin_save_level_override | authenticated`, :175 `admin_clear_level_override | authenticated`, :176 `product_price_for | anon,authenticated`, :177 `admin_edit_package_price | authenticated`, :178 `market_settings | anon,authenticated`, :179 `admin_save_market_settings | authenticated`, :180 `admin_list_monetisation | authenticated`. Removed: none.

`scripts/acceptance-doors-allowlist.txt` — replaced: :119 `admin_save_listing_package(text,text,text,integer,boolean,boolean,boolean,text,smallint,text,boolean,integer) | staff`, :120 `admin_save_package_price(text,numeric,character,integer,character,uuid,timestamp with time zone,timestamp with time zone) | staff` (the P-1 signatures' lines are gone with the DROPs). Added: :122 `admin_edit_package_price(uuid,numeric,character,integer,character,uuid,timestamp with time zone,timestamp with time zone)`, :123 `admin_save_level_override(text,uuid,character,integer,smallint,text,boolean)`, :124 `admin_clear_level_override(uuid)`, :125 `admin_save_market_settings(integer,text,boolean,character,integer,integer)` (all `staff`). Judged against the live backend in CI (a stale line fails there).

`e2e/helpers/pool-reset-map.ts` `POOL_EXEMPT_TABLES` — added :64 `level_overrides`, :66 `market_settings`; :62 `listing_packages` and :72 `package_prices` now name `created_by / updated_by` (M-a and M-b add `created_by`).

## Strings the migrations carry

Seed names (ruling §3 f, key by key):

| key | kind | name_en | name_am |
|---|---|---|---|
| `regular` | level | Regular | መደበኛ |
| `featured` | level | Featured | የተለየ |
| `premium` | level | Premium | ፕሪሚየም |
| `city` | reach | City | ከተማ |
| `nationwide` | reach | Nationwide | ሀገር አቀፍ |
| `worldwide` | reach | Worldwide | ዓለም አቀፍ |

Seed values I ESTIMATED where the ruling gave none (name them or correct them in the continue ruling): `regular` 30 days, 4 photos, `standard`, no badge, sort 0, self-serve, extends lifetime; `featured` (from `featured_45`) 8 photos, `boost`, badge, sort unchanged; `premium` (from `premium_60`) 12 photos, `top`, badge; the reach rows sort 100/110/120, `self_serve` false for `city` (it is the included reach) and true for the other two, `extends_lifetime` false for all three; the default market's launch bundle 10 credits / 30 days.

Door refusal texts (each one `admin.monetisation.error.*` key in turn (b)): `admin_save_listing_package` — `not signed in`, `permission denied`, `rateLimited`, `bad key`, `unknown kind`, `bad name`, `bad days`, `bad photos`, `unknown placement`, `perks on reach`; `admin_save_level_override` — `unknown level`, `not a main category`, `unknown country`, `bad days`, `bad photos`, `unknown placement`, `empty override`; `admin_clear_level_override` — `not found`; `admin_save_package_price` — `unknown package`, `bad amount`, `bad credit cost`, `unknown currency`, `unknown country`, `unknown category`, `bad window`, `overlapping window`; `admin_edit_package_price` — `price not found`, `price in use`, `price already ended` + the same value refusals; `admin_save_market_settings` — `unknown country`, `bad free ads`, `unknown reach`, `launch bundle required`, `bad launch bundle`; `admin_list_monetisation` — `denied`; step-up `P0009` everywhere. Audit actions: `package.saved` (`listing_package`), `level_override.saved`, `level_override.cleared` (`level_override`), `package_price.saved`, `package_price.edited` (`package_price`), `market.saved` (`market_settings`). No other user-visible text: the proofs' row names are `E2E …` / `e2e-mig-…` scratch values and `e2e am` where a scratch `name_am` is needed (no Amharic of my own).

## The FINAL EN key list for turn (b)

Base layer (`en-base.ts`): `admin.nav.group.monetisation` "Monetisation"; `admin.section.monetisation.title` "Monetisation"; `admin.section.monetisation.body` "Levels, reach and their prices per market; the free baseline and the paid-levels switch per country."

Admin layer (`en-admin.ts`), every key under `admin.monetisation.`:
- sections: `markets.title` "Markets"; `levels.title` "Levels"; `overrides.title` "Per-category perks"; `reach.title` "Reach"; `prices.title` "Prices"; `caps.title` "Posting caps"; `caps.untilP2` "These caps move to the levels and the reach when an ad's level lands (P-2)."
- columns: `col.market` "Market"; `col.freeAds` "Free Regular ads"; `col.includedReach` "Included reach"; `col.paidLevels` "Paid levels"; `col.launch` "Launch bundle"; `col.since` "Since"; `col.name` "Name"; `col.photos` "Photos at most"; `col.placement` "Placement"; `col.badge` "Badge"; `col.defaultDays` "Default days"; `col.days` "Days"; `col.level` "Level"; `col.category` "Category"; `col.country` "Country"; `col.product` "Product"; `col.creditCost` "Credits"; `col.createdBy` "Created by"; `col.updatedBy` "Updated by"; `col.used` "Used".
- values: `placement.standard` "Standard"; `placement.boost` "Feed boost"; `placement.top` "Top of list"; `kind.level` "Level"; `kind.reach` "Reach"; `defaultMarket` "Any other country"; `mainCategoryAny` "Every category"; `countryAny` "Every country".
- actions (two or three words): `market.add` "Add market"; `market.edit` "Edit market"; `level.edit` "Edit level"; `product.add` "Add product"; `override.add` "Add override"; `override.edit` "Edit override"; `override.clear` "Clear override"; `price.add` "Add price"; `price.edit` "Edit price"; `price.end` "End price"; `caps.edit` "Edit caps".
- fields: `field.nameEn` "Name (English)"; `field.nameAm` "Name (Amharic)"; `field.launchCredits` "Launch credits"; `field.launchDays` "Launch days"; `field.creditCost` "Credit cost".
- refusals: `error.unknownKind` "Unknown product kind."; `error.badName` "The English name is required; names are 80 characters at most."; `error.badPhotos` "Photos at most is a whole number from 0 to 30."; `error.unknownPlacement` "Unknown placement."; `error.perksOnReach` "A reach product carries no level perks."; `error.unknownLevel` "Unknown level."; `error.notMainCategory` "Pick a main category."; `error.emptyOverride` "Set at least one value."; `error.badCreditCost` "Credit cost is a whole number, 0 or more."; `error.priceInUse` "This price has been used; end it and add a new one."; `error.unknownReach` "Unknown reach product."; `error.badFreeAds` "Free Regular ads is a whole number, 0 or more."; `error.launchRequired` "Turning paid levels on needs a launch bundle."; `error.badLaunch` "Launch credits and launch days are whole numbers above 0."
- states: `loading` "Loading…"; `empty.markets` "No market rows yet."; `empty.levels` "No levels yet."; `empty.overrides` "No per-category perks yet."; `empty.reach` "No reach products yet."; `empty.prices` "No prices yet."; `error` "The monetisation settings could not be loaded."
- help: `help.overrides` "A subcategory inherits its main category's row; a blank cell means the level's own value; a seasonal category ends every ad at its season's end."

§3 c applied: `durations.*` → `overrides.*` (title "Per-category perks", `help.overrides`, `error.emptyOverride`, the two day columns `col.defaultDays` / `col.days`, and the three actions renamed `override.add` / `override.edit` / `override.clear` — the plan's `duration.*` verbs, since the section is no longer Durations; say so if you want the plan's verb words kept). §3 d applied: `caps.untilP2` takes the ruling's text. Reused by key, unchanged: the `admin.packages.*` dialog words and refusals (`badAmount`, `badWindow`, `overlap`, `notFound`, `alreadyEnded`, `unknownCountry` / `unknownCategory` / `unknownCurrency`, `stepUp`, `denied`, `rateLimited`, `on` / `off`) and the `admin.coverage.*` block. Retired in (b): `admin.packages.col.tier`, `admin.packages.error.unknownTier`, `.badLabelKey`, the `labelKey` field words, `admin.section.packages.*`, `admin.section.plans.*`, `admin.coverage.labelKey*`. The refusal texts marked above beyond the plan's three given sentences are my proposals for the ruling to edit. Total new keys: 3 base + 73 admin (counted from this list by script).

## QUESTION — rule 30's size law against the ruling's four marks

Rule 30 says "a very large migration (about 25 KB or more) is split by concern into ordered parts, each with its own mark, proofs and stop". M-a is 47 KB, M-b 37 KB, M-c 27 KB and M-d 30 KB (M-d's size is the live body itself, 22 KB, which the ruling says to redeclare whole). The ruling §3 h fixes exactly four marks (`…160000` → `…190000`) and §4 "four new files only". I did not invent a fifth mark: the files stand as the ruling names them, each one concern (levels / prices / markets / the seam), each with its own mark and proofs. If the rule's ceiling binds here, the split I propose for M-a is: M-a1 the table changes, the seeds, `level_overrides` and `level_perks_for` with their proofs (a)–(d) (≈ 20 KB); M-a2 the three doors with proofs (e)–(i) (≈ 27 KB) — marks to be given by the ruling; M-b and M-c would stay (the ~25 KB is "about"). Please rule: apply as written, or split M-a (I would re-stamp and re-mark only M-a's two halves in a new commit before any apply).

## Departures

- M-d's form: rule 30 asks for "computed insertion, guarded by md5" for a body over ~10 KB; the ruling (§2 Q11) asks for `CREATE OR REPLACE` with the body byte for byte and proof (b). I followed the ruling's form and added the md5 guard rule 30 wants as a pre-check `DO` block (the apply refuses a moved live body) plus the in-file proof (b) on the live `prosrc`. P-1 M1a used the same form.
- The seed values marked ESTIMATED above.
- `scripts/e2e-select.ts` is in §4's scope but was not touched: its self-test requires every area glob to match a file, and `e2e/admin-monetisation.spec.ts` does not exist until turn (b). The header `-- e2e-areas: admin-monetisation` is an unknown area today, so a change to these migrations selects ALL (the selector's own rule: "an unknown area name must never under-select"). The area entry lands with the spec in (b).

## K2 — the same concerns, outside this turn's scope, not touched

- `src/features/admin-packages/packages-service.ts` :93 (reads `tier`, `label_key` — dropped by M-a), :157–165 (`admin_save_listing_package` with the P-1 argument list — dropped by M-a), :186 (`admin_save_package_price` without `p_credit_cost`), `packages-service.test.ts` :66, :99, :146–167, :209–210; `packages-page.tsx` :38 — turn (b) merges them into `admin-monetisation`. Until then the Packages console's save fails (the old signature is gone) and its roster read errors on `tier`.
- `e2e/admin-packages.spec.ts` :172–173, :303–311, :487, :517, :587, :598, :969, :990 (the PKG tests read `tier`/`label_key` and call the old doors) — deleted in (b); on this PR's temporary backend they will be RED (expected, named under Limits).
- `e2e/admin-coverage.spec.ts` :78, :131, :426–494 (the Plans console; unchanged by this turn — `admin_set_coverage_plan` keeps M1a's body); deleted in (b) with the merge.
- `src/features/admin-coverage/coverage-service.ts` :2 imports the integrations client directly (not the supabase door) — fixed by the merge in (b); `vendor-seams-allowlist.txt` :12 goes with it (§3 i).
- `src/integrations/supabase/types.ts` (platform-generated) does not know `level_overrides`, `market_settings`, the new columns or the new signatures — the ruling with the types after the apply (DEC-320).
- The level words in six modules (plan §1d) — CF-LEVEL-1's allowlist in (b); the fold is P-2's.
- `plan_photo_cap`'s literal 10 (`20260919054044` :94) and `coalesce(expiry_days, 60)` (`20261011085637` :155) — P-2's.
- The P-1 proofs' real currency read (M1b :296, M1c :244) — landed, filed by the supervisor (§3 j).
- `src/features/admin-overview/locations-overview.tsx` :7, :27–33, :45 (the Plans tile) — per the ruling's scope for (b).

## Limits

- No database here: the proofs are unexecuted; the staging apply is their first run (and CI's temporary backend on the draft PR runs them first — a proof red there is mine to read).
- `bun run checks` on this Mac: `build-and-check › Workflow lint (actionlint, pinned)` FAILS because the pinned `actionlint_1.7.7_linux_amd64` binary does not run on macOS (checksum OK; "the bad fixture failed for another reason"), which marks that job's later steps NOT RUN — I ran them by hand: `bun run typecheck` (clean), `bun run format:check` (all files Prettier-clean), `bun run lint` (0 errors, 45 pre-existing warnings), `bun run scripts/e2e-select.ts --self-test` (OK), `bun run scripts/check-root-routes.ts --self-test` and the check (60 entries safe). `laws-first › scripts/ tests first` FAILS on NH-6 only (`scripts/ci/nightly-hour.test.ts`: macOS ignores `TZDIR`; 439 passed, 1 failed), which marks that job's two later steps NOT RUN; the same NH-6 is the only red in `bunx vitest run scripts --maxWorkers=2` (438 → 439 passed with the renamed ids). No workflow changed this turn. CI on Linux is the proof of both.
- `component-tests › Install dependencies` and `build-and-check › Install dependencies`: NOT RUN by the runner's own rule (dependencies installed; a package change is its own turn).
- The checks' fast line and last line: see below.
- Expected CI reds on the draft PR: `e2e-preflight` "STAGING BEHIND: apply 1fc03fef…/3f552dc1…/0cdc612d…/4854ce93…" until ethio-staging holds the four marks; the E2E lane carrying `e2e/admin-packages.spec.ts` (PKG-*) red against the dropped columns and signatures — the console is turn (b)'s (ruling §1's sizing). Any OTHER red I read as rule 40 says.
- The browser tests were not run: no spec changed this turn, and the E2E values' presence was not needed for any step.
- No security-shaped finding.

## The checks

`bun run typecheck` on the final tree: clean (`tsc --noEmit`, no output). `bun run checks`, once, whole, on the final code tree (b9ebdd65a):
```
checks (fast): 17 PASS · 4 FAIL · 237s — laws-first, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)
checks: 24 PASS · 4 FAIL · 30 NOT RUN · 291s
```
The four FAILs, each read in its log: (1) `laws-first › scripts/ tests first` — NH-6 only (439 passed, 1 failed; macOS ignores `TZDIR`); (2) `build-and-check › Workflow lint (actionlint, pinned)` — the pinned `actionlint_1.7.7_linux_amd64` is a Linux ELF (checksum OK; "the bad fixture failed for another reason"); (3) `component-tests › Component tests` — NH-6 only (2674 passed, 1 failed); (4) `secrets-scan › Secrets scan (gitleaks, pinned)` — the pinned `gitleaks_8.24.3_linux_x64` is a Linux ELF (`file`: ELF 64-bit x86-64; checksum OK; it named "9 commits in af312ca2..HEAD" and printed no leak line because it never ran) — before each commit I read `git diff --cached` for key-, secret-, token- and password-shaped text and found none (the proofs' `'PROOFSECRET'` TOTP placeholder is P-1's precedent, M1a :243). None of the four touches a path this turn changed; CI on Linux judges them.
The 30 NOT RUN: 8 are the two jobs' later steps behind the Mac reds (typecheck, format, lint, e2e-selector self-test, root route names, build, bundle report — each run by hand above and clean; `changed folders' unit tests` and `Semgrep ERROR on changed files` — the whole component-tests job and the semgrep scan ran instead, both clean but for NH-6); 4 are `Install dependencies` steps the runner skips by its own rule; 2 `dependency-audit` (the advisory service is unreachable from the sandbox); 4 `e2e-preflight` (staging credentials the script never holds); 6 `e2e` merge steps and 4 `promote` steps (GitHub-only); 2 semgrep SARIF upload steps (GitHub-only). PASS includes `migration-lint`, `i18n-usage-map`, `string-scan`, `import-gate`, `listing-write-seam`, `browse-path-guard`, `marketplace-weight`, `bundle-budget` (0 NEAR, none grew — no app code changed) and `semgrep › Scan (counts only)`.

## The draft pull request

Draft PR #13 — https://github.com/tesfayekb/ethio-marketplace/pull/13 (`cursor/p1b-monetisation` → `dev`), opened on b9ebdd65a; this report is the commit after it. Its CI builds the temporary backends from every migration in the repository, so the four files' proofs run there first; the expected reds are named under Limits (STAGING BEHIND; the PKG lane). The CI line for the base (`8ae1bec5`, SUCCESS) is at the top; the PR's own run had not completed when this report was written — I read it as rule 40 says once it has, and a red that touches a path this turn changed is a STOP I report in the chat.

Stopping here as ruling 1 §5 says: the apply pairing lines are above; the staging apply is the supervisor's step; `continue` (with the types, the Amharic and the md5 read-backs) starts turn (b).
