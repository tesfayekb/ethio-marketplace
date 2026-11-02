QUESTION — p1-packages part B: the generator's entries for the P-1 columns, tables and doors (DEC-320)
DONE: STEP 0; part A (M1a, M1b, M1c — applied on ethio-staging per rulings 2–4); part B's first
half (the Plans name on the section, the route head and the page; the 14 plan-dial keys EN + AM;
every `admin.coverage.*` Amharic value replaced per INC-1036; the coverage section pair moved to the
admin layer by CF-SL-1); part C's guard CF-PERM-1 (`scripts/conformance/perm-vocabulary.ts`, its
test, its allowlist) and the key `admin.roles.perm.resource.packages` EN + AM; part D whole (W4:
Screening's Tier filter, Set tier from the listings row menu, the one runner `changeListingTier`;
SF-7, CLT-1..3; e2e SC-27, ATR-6, ATR-7)
LEFT: part B's second half (the service's three columns and four door arguments; the editor's
fields days / ads + Unlimited / label with the typed number parse replacing `numberOrZero`; the
page's three columns; `coverage-dialogs.test.tsx`; CV-9..12 and CV-8's column list;
`docs/features/coverage-console.md`); part C's screen (`src/features/admin-packages/`,
`src/routes/admin.packages.tsx`, the section and rail entries, the budget line, the e2e area,
CF-PRICE-1, the `admin.packages.*` / `admin.section.packages.*` keys, PKG-1..9, RP-12,
`docs/features/packages.md`); part E (docs, the changelog, the register rows, THE CHECKS, the
browser check whole, DEC-296 on base and tree, the self-review, the report, the pull request's CI)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `7f3f39f35549dd8559b7ef9071692f77b13f60a9` (short `7f3f39f`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-02T09:33:38Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41418519493
FILES:
docs/generated/i18n-usage.json
docs/governance/briefs/p1-packages.md
docs/governance/briefs/p1-packages.ruling-1.md
docs/governance/briefs/p1-packages.ruling-2.md
docs/governance/briefs/p1-packages.ruling-3.md
docs/governance/briefs/p1-packages.ruling-4.md
docs/governance/plans-packages-spec-v1.md
docs/governance/reports/p1-packages.stop-1.md
docs/governance/reports/p1-packages.stop-2.md
e2e/admin-listings.spec.ts
e2e/admin-screening.spec.ts
e2e/helpers/pool-reset-map.ts
public/i18n-usage.json
roadmap.md
scripts/acceptance-doors-allowlist.txt
scripts/conformance/perm-vocabulary-allowlist.txt
scripts/conformance/perm-vocabulary.test.ts
scripts/conformance/perm-vocabulary.ts
scripts/public-surface-allowlist.txt
src/features/admin-coverage/coverage-page.tsx
src/features/admin-listings/change-listing-tier.test.ts
src/features/admin-listings/change-listing-tier.ts
src/features/admin-listings/listing-page.tsx
src/features/admin-listings/listings-page.tsx
src/features/admin-screening/screening-page.tsx
src/features/admin-screening/use-screening.test.ts
src/features/admin-screening/use-screening.ts
src/features/admin/sections.ts
src/i18n/locales/am-admin.ts
src/i18n/locales/am-base.ts
src/i18n/locales/en-admin.ts
src/i18n/locales/en-base.ts
src/routes/admin.coverage.tsx
supabase/migrations/20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql
supabase/migrations/20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql
supabase/migrations/20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql

## The question (DEC-320)

Part B's service and every line of part C read or call what P-1's migrations added, and
`src/integrations/supabase/types.ts` is platform-generated: the task names it in scope ONLY for
"the generator's entries (the supervisor hands you the exact text after the staging apply —
DEC-320)". Rulings 2–4 confirmed the three applies on ethio-staging; none handed the text. No
Supabase MCP server is configured in this Cursor, the CLI is forbidden (rule 50), and the file is
never hand-edited (rule 10, Vendors). Proven on a scratch probe (`src/zz-probe.ts`, typechecked and
removed, nothing committed): `supabase.from("coverage_plans").select("plan, default_days")` answers
`SelectQueryError<"column 'default_days' does not exist on 'coverage_plans'.">`, and
`rpc("admin_set_coverage_plan", { …, p_default_days: 30 })` is TS2353 (an unknown property). So the
plan read and the plan write, and the packages feature whole, cannot be committed green until the
entries land.

What the generator must emit (the shapes M1a–M1c define; the exact text is the supervisor's):

1. `Tables.coverage_plans` — Row gains `default_days: number`, `label_key: string | null`,
   `max_active_ads: number | null`; Insert and Update gain the optional forms.
2. `Functions.admin_set_coverage_plan.Args` — adds `p_ads_unlimited?: boolean`,
   `p_default_days?: number`, `p_label_key?: string`, `p_max_active_ads?: number`
   (M1a: `(…, p_max_photos smallint DEFAULT NULL, p_default_days integer DEFAULT NULL,
   p_max_active_ads integer DEFAULT NULL, p_ads_unlimited boolean DEFAULT false, p_label_key text
   DEFAULT NULL)`).
3. `Tables.listing_packages` — Row `created_at: string; days: number; enabled: boolean;
   extends_lifetime: boolean; key: string; label_key: string | null; self_serve: boolean;
   sort: number; tier: string; updated_at: string; updated_by: string | null`; Insert / Update;
   Relationships (`updated_by` → `profiles.user_id`).
4. `Tables.package_prices` — Row `amount: number; category_id: string | null; country_code: string
   | null; created_at: string; currency: string; id: string; package_key: string; updated_at:
   string; updated_by: string | null; valid_from: string; valid_to: string | null`; Insert / Update;
   Relationships (`package_key` → `listing_packages.key`, `country_code` → `countries.code`,
   `category_id` → `categories.id`, `currency` → `currencies.code`, `updated_by` →
   `profiles.user_id`).
5. `Functions.package_price_for` — Args `{ p_listing_id: string; p_package_key: string }`,
   Returns `Json`.
6. `Functions.admin_save_listing_package` — Args `{ p_days: number; p_enabled: boolean;
   p_extends_lifetime: boolean; p_key: string; p_label_key?: string; p_self_serve: boolean;
   p_sort?: number; p_tier: string }`, Returns `Json`.
7. `Functions.admin_save_package_price` — Args `{ p_amount: number; p_category_id?: string;
   p_country_code?: string; p_currency: string; p_package_key: string; p_valid_from?: string;
   p_valid_to?: string }`, Returns `Json`.
8. `Functions.admin_end_package_price` — Args `{ p_id: string; p_valid_to?: string }`,
   Returns `Json`.

The T1 precedent (commit `60604f06`) pasted the generator's text whole into the matching places; I
will do the same with what the ruling hands me, and nothing else in that file.

## A census hit the plan missed (K2) — needs a ruling

`src/features/admin-overview/locations-overview.tsx:28–33` also reads
`admin.section.coverage.title` / `admin.section.coverage.body` (the Admin overview's card for the
section). It is outside SCOPE, so the old pair stays (now in the admin layer, where CF-SL-1 puts a
pair only `admin.locations` shows) and the overview card still says "Coverage" while the menu, the
route head and the page say "Plans". Either (a) the file enters scope and its two lines take
`admin.section.plans.*`, after which the `admin.section.coverage.*` pair is deleted (a renamed
string is a new key; the old one then has no reader), or (b) it stays as it is and the report names
the difference. I recommend (a): one name for one screen.

## What this stop also reports

- The pull request's run on `7f3f39f3` (the migrations-only tree) is red on ONE test, both
  projects: `i18n-coverage.spec.ts › the roles permission matrix renders no raw English
  vocabulary` — the matrix rendered `packages` raw, because M1b seeded the resource and its
  `admin.roles.perm.resource.packages` key did not exist yet. Class (c), the window between a door
  and its screens; the key landed in commit `642af37d` (EN "Packages", AM «ጥቅሎች» from ruling 4),
  and CF-PERM-1 now fails the component tests on exactly this gap (its PV-1 was red on the real tree
  before the key, green after — the planted bypass is PV-3).
- `changeListingTier` lives in its own file (`change-listing-tier.ts`), not beside
  `setAdminListingTier` in `use-admin-listing.ts`: that file rides the posting path through
  `src/features/posting/use-edit-draft.ts`, and CF-SL-1 showed the tier/move keys following it onto
  `__root`, `post` and `my-listings` — the strings-layers census caught a weight regression before
  the bundle check did.
- Browser check (local, ethio-staging, both projects, retries 0): `--grep "SC-27|ATR-6|ATR-7"` —
  6 passed after SC-27's label assertion was corrected (the `FilterChoices` label is the group's
  `aria-labelledby`, not its text); the two specs whole
  (`E2E_WORKERS=2`, DEC-024's knob): `admin-screening.spec.ts` 50 passed, 4 failed (SC-25, SC-26 ×
  both projects); `admin-listings.spec.ts` 70 passed, 6 failed (AL-20, AL-23, AL-30 × both
  projects). Every one of the ten failures is the same local artefact: the spec presses
  `Control+A` to clear a field, which selects nothing on macOS (Chromium there binds ⌘A), so the
  typed text is appended — the received titles read `Corrected … E2E admin listing …`, and AL-30's
  day count became `300`, which passed the 1–365 check and reached the door as a factor-less
  enforcer (the step-up hint). AL-30 alone with one worker fails the same way (not a worker
  interaction). None of the ten touches W4; CI's Linux runners are their proof (`7f3f39f3`'s run
  passed all of them). I changed no spec for it: the sequence is the harness's convention, out of
  this task's scope (K2: 7 presses in these two specs).
- The local Playwright browser: the Cursor shell sets `PLAYWRIGHT_BROWSERS_PATH` to a sandbox cache
  that holds no browser; the operator's install is `~/Library/Caches/ms-playwright`, so the runs
  above set that path for the command only. No package or config changed.
- `scripts/ci/nightly-hour.test.ts` NH-6 fails on this macOS (TZDIR is ignored); it fails on the
  base tree too and is outside scope; CI is its proof (named in stop 1).
- K2 (not touched, outside scope): `src/features/admin-countries/country-dialogs.tsx:172`
  `numberOrZero` (used by `country-editor.tsx:12,65`) — the sentinel parse ruling 1 (answer 10)
  replaces in the coverage form; `src/features/admin-listings/listings-page.tsx:219` and
  `listing-page.tsx:175` each hold a local `tierLabel` closure beside `TIER_LABEL`
  (`tier-reasons.ts`), which Screening now uses directly; T1's `admin_set_listing_tier`
  (`20261102045918…sql:32`) keeps an inline `account_status = 'deactivated'` read (DEC-241, named
  in stop 1).
