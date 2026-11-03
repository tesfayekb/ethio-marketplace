# P-1b — ruling 1 (the plan approved with changes)

```text
RULING — P-1b, the plan: APPROVED WITH CHANGES. Base: dev 8ae1bec5 · branch cursor/p1b-monetisation at 87c336c0a (STEP 0 verified: the brief saved verbatim inside its fence, the model document, roadmap line 3). Read 2026-11-03 03:4xZ.

**MODEL — Claude Fable 5.1 (High), this same chat. Build turn (a) now — the four migrations, CF-PLAN-1 and the allowlist lines — to the MIGRATION stop (draft PR), then END THE TURN.**

## 0. Save first (two files, then the build)

- Save this ruling unchanged as `docs/governance/briefs/p1b-monetisation-ruling-1.md`.
- Save your plan unchanged — the whole message that begins "The census is complete. Here is the plan." — as `docs/governance/briefs/p1b-monetisation-plan.md` (the record of what was approved; G41). Roadmap line 3 stays as it is.

## 1. Verdict

The census is accepted as the ground truth of this bundle (every file:line you cite is the tree's; I re-read the ones the decisions rest on). The plan is approved with the changes in §2 and §3. The one premise you found wrong (Mechanism 4) is mine, not the brief's intent: the intent — a product's name per language — stands, on the catalogue's own mechanism (§2 Q7). The sizing of §7 Q12 is approved: (a) migrations, (b) console + strings + tests + guards, (c) browser check + docs + report; (b) and (c) may fold.

## 2. The twelve questions

1. **Table names — keep.** `listing_packages` + `kind`, `package_prices`, `package_price_for` stay; the core is `product_price_for`. (Supervisor's call, G17.)
2. **The season window — reuse `categories.visible_until`.** D309 as recorded ("a seasonal category ends every ad at its season's end", model v2 rule 1) is the visibility window; no new column, no new door. The resolver caps at the nearest `visible_until` up the chain (the category's own, else its nearest ancestor's); an ended season answers 0.
3. **The `packages` resource — neither renamed nor relabelled.** The matrix row keeps "Packages — View / Update"; the menu and the page say Monetisation.
4. **Regular's price rows: no row = not offered (the law stands). `credit_cost integer NOT NULL CHECK (credit_cost >= 0)`** — not nullable: `package_prices` holds zero rows on ethio-prod and on ethio-staging (my reads, 2026-11-03 03:3xZ), so the column is added NOT NULL with no default and no backfill; a non-empty table at apply time makes the apply fail, which is the finding, never a sentinel. The doors require it; `product_price_for` answers it.
5. **The Ethiopia market row — the operator creates it in the console on the walk** (a staff setting; no `'ET'` in SQL — K4). Only the default row ("any other country": 3 free Regular ads, city included, OFF, launch 10 / 30) is seeded.
6. **Reach rows' `days` — 30** for city, nationwide and worldwide (ESTIMATE; staff edit it in the console; the operator may change it on the walk).
7. **Names per language — your recommendation, exactly:** `name_en text NOT NULL` (after the backfill), `name_am text NULL` on `listing_packages`; shown through `catalogText` (`src/i18n/entity.ts` :57–65, the one fallback law); the product editor renders one name field per base language the way the categories editor does (the same primitive, the same pair), never a list of its own. The entity type `product` for a third language is a roadmap line, not this bundle (name it in your report under K2). No `names jsonb`. D290's "label key" is gone: the row's `key` is the identifier and the name is a column.
8. **`tier` and `label_key` are DROPPED from `listing_packages`** — destructive; approved by the operator's word before this paste (no reader survives the turn: `packages-service.ts` :46 goes with the folder; `package_price_for` never read them). The **Posting caps** section is approved (§3 d). The **scope additions** are approved (§4).
9. **Badge — a boolean.** The card already draws by tier.
10. **The staff reader `admin_list_monetisation()` — approved**, in M-c (STABLE, SECURITY DEFINER, `SET search_path = public`; signed in → `packages:view` else `denied`; RETURNS jsonb `{markets, products, overrides, prices}`, every row with `created_by_name` / `updated_by_name` from `profiles.display_name` the way `admin_list_audit` does, never an id; `REVOKE ALL FROM PUBLIC, anon` and `GRANT EXECUTE TO authenticated`, its public-surface line with the reason). It is the one admin reader of `package_prices` (CF-PRICE-1's READ_FORMS gains the rpc). The public policies and column grants stay for P-2.
11. **M-d's live definition — read on ethio-prod and ethio-staging 2026-11-03 03:2xZ:** `validate_listing_draft` — `md5(prosrc)` = `dfa2d9cd3e4d633314717597e9902986`, `length(prosrc)` = 21973, no CR; VOLATILE, SECURITY DEFINER, `proconfig = {search_path=public}`; identity arguments `p_uid uuid, p_step smallint, p_category_id uuid, p_title text, p_description text, p_video_url text, p_attributes jsonb, p_price_mode text, p_price_amount numeric, p_price_currency character, p_price_period text, p_poster_expires_at timestamp with time zone, p_coverage uuid[], p_contact_pref jsonb, p_prior jsonb, p_price_bp integer, p_price_negotiable boolean`. The repository's `20261028224333` body (between `AS $function$` and `$function$`) has the same md5 and length — it IS the live body; no later declaration exists (`grep -l "FUNCTION public.validate_listing_draft"` ends at that file). So: `CREATE OR REPLACE` with the same signature and header, the body byte for byte except line 371 `WHERE plan = public.seller_plan(p_uid)`; proof (b) in your report: a script that takes your new file's body, restores that one line, and prints `dfa2d9cd3e4d633314717597e9902986` (paste the command and its output).
12. **Sizing — approved as proposed.** Turn (a) ends at the migration stop with a draft PR; I apply the four files on ethio-staging, read the marks back, and the continue ruling carries the generated types (DEC-320), the Amharic strings file and the go for (b).

## 3. Changes to the plan (binding)

a. **D295 — the per-category rows carry every perk, not only days.** The model as recorded: "per-category override rows for duration, photos, placement, badge (D295)"; the operator's words: "each level's duration/photos per category". So the matrix table is **`level_overrides`**, not `level_durations`: `id uuid PK`, `level_key text NOT NULL REFERENCES listing_packages(key) ON UPDATE CASCADE`, `category_id uuid NULL REFERENCES categories(id)`, `country_code char(2) NULL REFERENCES countries(code)`, `days integer NULL CHECK (days IS NULL OR days > 0)`, `max_photos smallint NULL CHECK (max_photos IS NULL OR max_photos BETWEEN 0 AND 30)`, `placement text NULL CHECK (placement IS NULL OR placement IN ('standard','boost','top'))`, `badge boolean NULL`, CHECK at least one of the four is NOT NULL, `created_by`/`updated_by`, timestamps + trigger; **`UNIQUE NULLS NOT DISTINCT (level_key, category_id, country_code)`** (both databases are PostgreSQL 17.6 — my `version()` reads; one index, not four). A blank cell inherits. Born closed; public read of every column but the two attribution ones (allowlist line); RLS public read, no write; nothing seeded (D312).
b. **One resolver, `level_perks_for(p_level_key text, p_category_id uuid, p_country_code char(2)) RETURNS jsonb`** in place of `listing_duration_days` — STABLE, SECURITY INVOKER, `SET search_path = public`, granted to anon/authenticated/service_role (its public-surface line: P-2's Promote and the ad page read it). Answer: `{"days": n, "max_photos": n, "placement": "…", "badge": b, "season_until": ts | null}` — each perk resolved by the same precedence per column: (main category, country) → (NULL, country) → (main category, NULL) → the level row (`listing_packages.days / max_photos / placement / badge`); `days` is the effective value, capped at the season's end (Q2; 0 when ended); an unknown, disabled or non-level key answers NULL (typed absence). The main category: the root reached through `category_tree_pointers` (your §2 M-a definition). Proofs (c) and (d) run per column: a cell overriding `max_photos` only leaves `days` at the level's; the leaf inherits the root's cell; a cell on another root is never picked.
c. **Doors:** `admin_save_level_override(p_level_key text, p_category_id uuid DEFAULT NULL, p_country_code char(2) DEFAULT NULL, p_days integer DEFAULT NULL, p_max_photos smallint DEFAULT NULL, p_placement text DEFAULT NULL, p_badge boolean DEFAULT NULL)` — upsert on the scope; refusals `unknown level` (also for a reach key), `not a main category`, `unknown country`, `bad days`, `bad photos`, `unknown placement`, `empty override` (all four NULL); audit `level_override.saved` old→new; `admin_clear_level_override(p_id uuid)` — `not found`; audit `level_override.cleared`. Config-door order throughout (signed in → `packages:update` → step-up → `staff_config` dial → rules → write → audit). The console's section is **Per-category perks** (`overrides-section.tsx`, `override-dialog.tsx`), replacing Durations; the strings `admin.monetisation.durations.*` become `overrides.*` (`overrides.title` "Per-category perks"; `help.overrides` "A subcategory inherits its main category's row; a blank cell means the level's own value; a seasonal category ends every ad at its season's end."; `error.emptyOverride` "Set at least one value."; the Levels table's `col.days` reads "Default days", the overrides table's `col.days` reads "Days" — two keys, `col.defaultDays` and `col.days`). CF-LEVEL-1 names `level_overrides` and `level_perks_for`. MON-6 proves the precedence for `days` AND `max_photos` through the service client; MON-7 stays.
d. **Posting caps** (your §1j-3): the fifth section, last on the page, the P-1 editor without its Label key field, title `caps.title` "Posting caps", help `caps.untilP2` "These caps move to the levels and the reach when an ad's level lands (P-2)."; the block shows only with `coverage:view`, its verb only with `coverage:update` (the door `admin_set_coverage_plan` is unchanged — M1a's live body; not redeclared). **MON-15**: the caps editor round-trips every stored field of the free plan (`max_cities`, `max_regions`, `max_countries`, `allow_everywhere`, `max_photos`, `default_days`, `max_active_ads`) — the CV specs' coverage does not go with them. The posting wizard keeps reading the free plan's `max_photos` (10 today) until P-2; `docs/features/plans.md` says so in one line.
e. **`kind`** stays a CHECK of two words (`level`, `reach`); P-3's migration widens it to `bundle` with its own row — no lookup table (G17).
f. **The seed names, Amharic included** (G43: read from the catalogue where a key exists; the last two are mine — list all six key by key in the stop report):

| key | name_am |
|---|---|
| `regular` | መደበኛ |
| `featured` | የተለየ |
| `premium` | ፕሪሚየም |
| `city` | ከተማ |
| `nationwide` | ሀገር አቀፍ |
| `worldwide` | ዓለም አቀፍ |

   `name_en`: Regular, Featured, Premium, City, Nationwide, Worldwide.
g. **Column grants:** the public `GRANT SELECT` on `listing_packages` (M1b :49) is restated for the new shape — `key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort, created_at, updated_at` — never `created_by` / `updated_by`; `tier` and `label_key` leave it. `package_prices`'s grant gains `credit_cost, used_count`. The `scripts/public-surface-allowlist.txt` lines move with the grants.
h. **Marks (declared, DEC-022): M-a `20261103160000`, M-b `20261103170000`, M-c `20261103180000`, M-d `20261103190000`** — above the ledger's `20261103000000` and ahead of any apply this turn; the file stamps are whatever the build's UTC time gives. Header `-- e2e-areas: admin-monetisation` (M-d: `admin-monetisation, posting`).
i. **The vendor-seams allowlist** (`scripts/conformance/vendor-seams-allowlist.txt` :12, `coverage-service.ts | direct vendor use before DEC-250 | INC-877`) — the line goes in turn (b) with the file; the merged service reads through the door, not the client.
j. **The P-1 proofs' real currency read** (M1b :296, M1c :244) — landed and read-only; filed by me as a later word on INC-1040; your new proofs insert a scratch currency, as planned.

## 4. Approved scope (the plan's list, by area, plus the additions)

- `supabase/migrations/` — four new files only (M-a → M-d); no landed file edited.
- `src/features/admin-monetisation/**` (new; `admin-packages/` and `admin-coverage/` fold in and are deleted — every deleted path in `docs/tracking/intentional-deletions.txt` with the marker), `src/routes/admin.monetisation.tsx` (new), `src/routes/admin.packages.tsx` and `admin.coverage.tsx` (redirects), `src/features/admin/sections.ts`, `rail-items.ts` + its test, `src/routes/admin.tsx` (sectionForPath), `src/features/admin-overview/locations-overview.tsx` (the tile and its import — ADDED), `src/integrations/supabase/types.ts` (the DEC-320 patch I hand you in the continue ruling, never hand-edited).
- `src/i18n/locales/en-base.ts`, `en-admin.ts`, `am-base.ts`, `am-admin.ts` (the Amharic from my file only), the two usage maps.
- `scripts/conformance/` — `package-price.ts/.test.ts/-allowlist.txt`, new `plan-seam.*` (CF-PLAN-1), new `listing-levels.*` (CF-LEVEL-1), `vendor-seams-allowlist.txt` :12, `wired.test.ts`; `scripts/public-surface-allowlist.txt`, `scripts/acceptance-doors-allowlist.txt`, `scripts/e2e-select.ts`, `scripts/route-budgets.mjs`.
- `e2e/admin-monetisation.spec.ts` (new, MON-1 → MON-15), `e2e/admin-packages.spec.ts` and `e2e/admin-coverage.spec.ts` (deleted, declared), `e2e/helpers/pool-reset-map.ts`, `e2e/admin-roles.spec.ts` (RP-17 re-run, edited only if its words change), `e2e/admin-shell.spec.ts`, `e2e/admin-locations.spec.ts` :1258–1266 (ADDED), `e2e/phone-frame.spec.ts` :80 (ADDED), `e2e/post-wizard-place.spec.ts` (re-run).
- `docs/features/plans.md` (new), `docs/features/packages.md`, `docs/governance/mechanisms.md` (rows 91 and 92 extended; new rows drafted in (c)'s report), `docs/_changelog.md`, `roadmap.md`, `docs/tracking/intentional-deletions.txt`, the two brief files of §0.
- Nothing else. A sibling outside this list is reported (K2), never touched.

## 5. Turn (a) — the migration stop

Build M-a, M-b, M-c (with the staff reader), M-d, CF-PLAN-1 and the allowlist lines; run `bash scripts/check-migrations.sh` and `bun run checks` (the laws step first; Mac-only reds named under Limits); push; open the draft PR; END THE TURN with the stop report:

1. The file list from `git diff --name-only 87c336c0a`.
2. Per migration: filename, declared mark, the five-point pre-stop scan, `-- e2e-areas`, and the sentence "proofs not executed — the staging apply is their first run".
3. The `Self-marking guard OK` line from `scripts/check-migrations.sh`.
4. M-d: the command and output of proof (b) (§2 Q11), and the header line (VOLATILE, SECURITY DEFINER, search_path, the argument list unchanged).
5. Every public-surface and acceptance-doors line added, moved or removed (file:line).
6. The six seed names key by key with their Amharic (§3 f) and every other string the migrations carry.
7. The FINAL EN key list for turn (b) — every `admin.monetisation.*`, `admin.nav.group.monetisation`, `admin.section.monetisation.*` key with its English text, the §4 list of your plan with §3 c–d applied — so the Amharic file I build for the continue ruling covers exactly that list. A key you add in (b) beyond it is a departure named in (b)'s report.
8. The K2 list (file:line), the Limits, the draft PR number and the CI line (first six lines of ci-status.md for your last commit, read at the raw address).

A red is a STOP when its failure or server log touches a path this turn changed; otherwise it is named under Limits and CI judges. A security-shaped finding is a STOP described in chat only (the repository is public — G51).

## 6. After the stop

I apply the four files on ethio-staging (sha-checked, whole, the specific marks read back), run the types generator, and send the continue ruling: the types patch between markers, the Amharic strings file, the walk-free go for (b) (console, strings, tests, guards) and (c). The operator applies on ethio-prod after the merge, then Publishes; the walk follows (c).
```
