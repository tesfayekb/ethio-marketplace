# P-1b — plans and packages, part 2: the credits model's products and console (the task)

```text
Task P-1b — plans and packages, part 2: the credits model's products and console — levels with their perks and the duration matrix, the reach product, one prices table with a credit cost, the per-country baseline and "paid levels" switch, the Monetisation console, names per language, `docs/features/plans.md`. PLAN FIRST. Base: dev af312ca2 (branch from origin/dev's head after pull request #12, records turn R10, is merged — R10 added records only; the base line stays af312ca2 for the checks).
**MODEL — plan: Claude Fable 5.1 (High). Build: Claude Fable 5.1 (High)** (migrations, a permission surface, prices: Tier A).

THIS TURN IS THE PLAN ONLY. Read, census, report in the chat; change nothing but STEP 0's record (save this task byte for byte as docs/governance/briefs/p1b-monetisation.md, name it on roadmap line 3, commit on `cursor/p1b-monetisation`, push). The build starts on the supervisor's ruling on your plan.

Builds on: the operator's decisions D286 → D312 (2026-11-02; docs/spec/spec-ledger.md block S85) and the Project doc "Plans & packages — model v2 (credits)" (its text is carried whole in §M below: STEP 0 also saves §M as docs/governance/plans-packages-model-v2.md); P-1 (`listing_packages`, `package_prices`, `package_price_for`, the three staff doors, Admin › Plans and Admin › Packages, CF-PERM-1, CF-PRICE-1; docs/governance/briefs/p1-packages.md and its report); T1 (`listings.tier`, `admin_set_listing_tier`).

FLAGS: no-package-change, no-agents-change, no-workflow-change. Migrations: expected (several, split by concern — you never apply one; the supervisor applies each on ethio-staging from your pushed commit, the operator on ethio-prod after the merge).

SCOPE (by area; your plan names the files): `supabase/migrations/` (new files only); `src/features/admin-coverage/` and `src/features/admin-packages/` (they become the one console — rename or merge as the plan proposes), `src/features/admin/sections.ts`, the admin menu's config and rail icons, `src/features/admin/roles/` (labels); `src/routes/admin.*` (the console's route; redirects from the two old paths); `src/lib/schemas/` and `src/integrations/supabase/types.ts` (the generator's entries, DEC-320, supplied by the supervisor after the staging apply); `src/i18n/locales/` (EN now; Amharic by the supervisor's ruling after the migration stop — never written by you); `scripts/conformance/` (CF-PRICE-1 extended; new guards), `scripts/public-surface-allowlist.txt`, `scripts/acceptance-doors-allowlist.txt`, `e2e/` (the admin flows; `e2e/helpers/pool-reset-map.ts`), `scripts/e2e-select.ts`; `docs/features/plans.md` (new), `docs/features/packages.md`, `docs/governance/mechanisms.md` (rows), `docs/_changelog.md`, `roadmap.md` (line 3; your owed lines). Every source file's own tests are in scope with it. Nothing else — a sibling outside the scope is reported (K2), never touched.

THE SYSTEM (G0)
CONCERN 1 — every product the marketplace sells or grants (a level on an ad, a reach on an ad, later a bundle of credits) is a row with a key, its perks as data and its prices as rows; nothing about a product is a literal in code or SQL.
MECHANISM 1: `public.listing_packages` (P-1; M1b `20261102081600…`) grows into the LEVELS table — rows `regular`, `featured`, `premium` (the P-1 seeds `featured_45` / `premium_60` become the Featured and Premium rows; your plan says how, with their price rows carried), per-level perks (photos at most, placement, badge key), and a DURATION MATRIX (level × main category × optional country → days; subcategories inherit their main category's row; a level default where no row exists) with a category SEASON window (D308, D309); the REACH product as rows (`city` included, `nationwide`, `worldwide` — D296). One resolver per question: `listing_duration_days(level, category, country)` (matrix → country row → category row → level default; capped by the category's season end) and the price resolver below. Consumers by definition (your census): every reader of `listing_packages`, `package_prices`, `package_price_for`, `coverage_plans.max_photos` / `default_days` / `max_active_ads`, `categories.expiry_days` (SQL, app, e2e, scripts), and every screen that shows a tier word.
CONCERN 2 — every price is one row per product × country (× category override) × currency × window with a money amount AND a credit cost; a screen never computes a price; nothing reads a price except through the one resolver (D301, D304).
MECHANISM 2: `public.package_prices` + `package_price_for` (P-1) generalised to every product kind (level, reach, bundle) with `credit_cost`; the resolver answers {amount, currency, credit_cost} or null = not offered; the three P-1 doors generalised (save, end) plus EDIT UNTIL FIRST USE (D288: an `edit` door refused once an ad has used the price — a `used_count` the apply door of P-2 will maintain; 0 today).
CONCERN 3 — a market's baseline and its switch are rows per country: the free Regular allowance (ads live at a time — D300, D310), the included reach, the "paid levels" switch (OFF at launch) and the launch bundle it grants when turned ON (D305).
MECHANISM 3: NONE YET — a `market_settings` table (country_code PK with a default row for "any other country"), staff doors to edit it, read by P-2's doors; the existing `coverage_plans` row `free` keeps the coverage dials the posting doors read today (`validate_listing_draft`, the wizard) until P-2 moves reach onto the reach product — this turn only moves its `'free'` literal onto `seller_plan()` (INC-1034) and adds CF-PLAN-1.
CONCERN 4 — a product's or market's name shown to a person is a translation per enabled language, never a typed key (D290).
MECHANISM 4: the translations mechanism (`ui_translations` through the translations door the console already uses; keys derived `level.<key>`, `reach.<key>`); the typed "Label key" field of P-1 goes.
CONCERN 5 — staff change money-shaped rows through doors in the config-door order (permission → step-up → dial → rules → write) with audit rows and created_by / updated_by (D289), shown as staff display names only to staff.
MECHANISM 5: the P-1 doors' shape (`admin_save_listing_package`, `admin_save_package_price`, `admin_end_package_price`; permission `packages:update` with step-up; `staff_config` dial) extended, every new door in the same order; `created_by` / `updated_by` columns on every product and price row, never in the browser's column grant for anon.
GUARDS: CF-PRICE-1 extended to every product kind and the credit cost; CF-PERM-1 (every new permission word in both languages); CF-PLAN-1 (every SQL reader of `coverage_plans` resolves the plan through `seller_plan()`; planted bypass); a conformance census that every reader of a product's perks or duration goes through the resolvers (no literal days, photos or level names outside the constants module and the rows); the migration proofs (header, grants, RLS deny cases, the resolver's precedence on scratch rows, the season cap, the edit-until-used refusal, the audit rows).
FIVE LENSES — security: every new table born closed (RLS deny-all to anon and authenticated; public read of enabled rows and valid prices only; staff read by `packages:view`); every write through a door with the permission, step-up and dial; the switch and the baseline are staff-only writes; no money moves in this turn; the public read never exposes `created_by` / `updated_by` · performance: the public pages read nothing new on first paint (the console is staff-only; the resolvers are SQL); the admin pages grow with their cause by DEC-296; INC-1042 (the admin sections on the public entry) is NOT this turn's — report it under K2 if your census touches it · failure modes: a product with no price row for a market is "not offered" (typed null), never 0; a missing duration row falls to the level default, never to a literal; a season window with no end is refused by the door · consistency: one console, one editor shape (the Field kit), one refusal reader, the same door order everywhere · future growth: countries and currencies are rows; categories are rows; a new product kind is a row kind, not a table; a third language is one more name field; bundles (P-3) and payments (P-4) join by rows and a product kind — no literal 'ET', 'ETB', 'am' outside the constants module.
FORWARD-SCAN: P-2 adds the ad's level and reach, the sweep, Promote and the free-slot rule — every resolver here takes a listing's category and country by parameter, never reads the seller's home country; P-3 adds bundles as a product kind and the credit ledger; P-4 adds checkout. REGISTER: rows 91 and 92 extended; new rows for the duration matrix, the reach product, the market settings and the names-per-language rule (your plan drafts the rows; the records turn lands them).

THE PLAN (change nothing; report in the chat, by file:line at the base):
1. Census: every reader of `listing_packages`, `package_prices`, `package_price_for`, the three P-1 doors, `coverage_plans` (every column), `seller_plan()`, `categories.expiry_days`, `listings.tier` (SQL, app, e2e, scripts, docs); the translations door the console can call and how a key's rows are written per enabled language; the roles matrix words; the admin menu groups and how a new group is added; the two old routes and their tests; the posting wizard's readers of photos-at-most and lifetime (what breaks if they move, what stays).
2. The migrations, split by concern with the marks you propose (next full hour + 1 after your stamps, above the ledger's newest mark `20261103000000`): (a) levels — the rows, perks, the Regular row, the duration matrix table, the season window on categories, `listing_duration_days`; (b) prices — the product kind, `credit_cost`, the resolver generalised, the edit door, `used_count`; (c) markets — `market_settings`, its doors, the switch, the launch bundle fields; (d) INC-1034 — `validate_listing_draft` onto `seller_plan()`; the reach rows. Each with proofs on scratch rows (a scratch country `XZ` and a scratch language inside the block — INC-1040; one RAISE per condition; no real-row read), redeclarations whole from the live definition, grants named in the allowlist, RLS born closed, the pre-stop scan (CASE in IF parenthesised; every non-draft scratch listing has a place; quotes in literals doubled; one RAISE per condition; every scratch key against its column's CHECK), and the stop report saying "proofs not yet executed; the staging apply is their first run".
3. Screens: ONE page under a new menu group "Monetisation" (between Listings and Locations), sections Markets (per country: free Regular live ads, included reach, paid levels ON/OFF, launch bundle credits and days), Levels (the three rows; perks; the duration matrix editor per main category with a country override row; the season window on the category editor or here — propose), Reach, Prices (every product; "Add price" always visible, the product picked first in the dialog; a row reads "<Product> · <Market> · <Category>"; Edit while unused; End), created/updated by as staff names; the two old routes redirect; the old "Label key" field removed and the names-per-language fields added; what the public pages and the posting wizard show unchanged this turn.
4. Strings: every new English key with its text (the Amharic comes in the supervisor's ruling after the migration stop; `am-*.ts` are typed to every EN key, so the build order puts the strings commit after that ruling).
5. Tests: unit (the resolvers' precedence and the season cap; the door mappers; the forms), conformance (CF-PRICE-1 extended, CF-PLAN-1, CF-PERM-1, the perks census), e2e (the console's flows incl. a refused reviewer; a market switched ON writes its launch bundle row; a price edited while unused and refused once `used_count` > 0 via a scratch row) — ids proposed by you, grep-checked free (TI-1).
6. Page growth (DEC-296) for the admin pages touched; nothing public should move — say so from the build.
7. Questions with recommendations: the levels table's name (keep `listing_packages` with a `kind` or rename — propose the one with the smaller blast radius); where the season window lives; whether the `packages` resource is renamed `monetisation` or only relabelled; how the Regular row's price rows look while Regular is free (no row = free, or a zero row); the sizing — this task is ESTIMATE 2–3 build turns; propose the split (a) migrations first, (b) console, (c) tests and docs, or better.

HOW TO WORK (the Cursor rules 00 → 80 apply in full; restated here): plan first; one branch `cursor/p1b-monetisation`; `Base: dev af312ca2` stays in this brief for the checks; the laws step is the build's first command and its line opens the report; a red is a STOP only when its failure or server log touches a path the turn changed, otherwise it is named under Limits and CI judges; a page's first download that grows by at most 0.1 KiB with its cause named is reported, a larger or unexplained growth is a STOP; K1 → K6 (one mechanism per concern; every sibling reported, never touched); a migration stop = push, open the draft pull request, report the file names, sizes and sha256, the pairing lines "apply <fragment> → expect mark <value>", and wait; the supervisor's "continue" ruling carries the generated client types (DEC-320) and the Amharic; no `git apply` of anything but a patch the supervisor sends with its sha256; the report per rule 60 with the walk subject: Markets, Levels (the matrix editor), Prices (Add price always), the names per language, the Monetisation menu entry.

FINDINGS: anything major you notice outside the task (security, structure, performance, languages, accessibility), file:line, in the report's own section; a security hole is a STOP at once, described in the chat only, never in a committed file; a non-security finding small enough to fix inside the scope is fixed and named under Departures; outside scope it is reported.

§M — THE MODEL (saved at STEP 0 as docs/governance/plans-packages-model-v2.md, verbatim between the markers)
-----BEGIN MODEL-----
# Plans & packages — model v2 (credits)

2026-11-02 · the operator and the supervisor

The seller buys **levels** and **reach** for single ads, with money or with **credits** from a bundle; Regular stays free up to a number of live ads. This replaces the morning's seller plans (scenarios v1).

## 1. The products

Four things are sold, all per country and currency, and every one can be paid with money or with credits (D304).

| Product | What it is | Perks and price | Who buys it |
| --- | --- | --- | --- |
| **Level** (Regular, Featured, Premium) | A designation on one ad for the level's duration (D294) | Per level: photos at most (4 / 8 / 12 — D311), placement (top of list, feed boost), badge; the duration comes from a staff-set matrix of main category × level, with an optional country row where a market is crowded (D308), and a seasonal category ends every ad at its season's end (D309). Price per country; a category row only where it differs (D301) | Anyone, for one ad — a one-off buy (D302) or credits |
| **Reach** (city included, nationwide, worldwide) | A second dial on the same ad (D296) | Price per country; credit cost set by staff | The seller of one item who wants the whole country or the diaspora |
| **Bundle** (several sizes: seller, business…) | N credits usable for a period, e.g. 30 credits over 60 days (D297) | Rates: Premium 3, Featured 2, Regular 1, reach as staff set; any mix; price per country; one balance to show | Shops and repeat sellers; anyone may buy (D307) |
| **Free baseline** | What every seller has without buying | N Regular ads live at a time — counted live, not per period — staff set N per country (to start: 10 in Ethiopia, 3 abroad; more if it draws sellers), city reach, Regular's perks (D300, D310) | Everyone |

The morning's seller plans (Free, Featured, Premium with a highest tier) are gone (D303): there is one baseline, and everything above it is bought per ad, with money or credits. A bundle is not a plan — it is prepaid credits with an expiry; a seller holding none buys one-off.

## 2. The rules

Six rules cover every case; the sweep job applies them every hour and at every change, and nothing else writes an ad's level or reach.

1. **A level runs for its own duration from the moment it is set — the duration read from the matrix (main category × level, then the country row if one exists, then the level's default 30 / 45 / 60; staff's rule of thumb Regular 1 : Featured 2 : Premium 3; a seasonal category caps every ad at its season's end) —**, whatever paid for it. An ad set to Premium on day 59 of a 60-day bundle keeps Premium for Premium's full duration (D299). A staff mark runs until staff end it (D276).
2. **Credits are one pool with rates.** Setting a level or reach deducts its credit cost; without enough credits the seller pays the money price for that one ad (D304). The balance, the rates and the period end are always shown.
3. **Credits expire at the period end and roll over once**: whatever is unspent moves into the next bundle the seller buys within 30 days of the end; after that it is gone (D298). A reminder goes out 7 days before the end.
4. **Regular is free up to N live ads** per seller (N per country, staff set); the N+1th Regular ad is bought with a credit or the money price (D300). Sold, removed or expired ads free their slot.
5. **When a level ends**, the ad falls to Regular if the seller has a free slot open; otherwise it pauses with "renew to keep it live" (a credit, a one-off buy, or wait for a slot), after a reminder 3 days before the end (D306). Reach ends with its own duration the same way, back to city.
6. **The launch switch is per country** (D305). OFF: any level or reach is set at no cost and no bundle is needed; the free baseline still applies. Staff turn it ON for a country the day payments exist there, and every seller in that country receives a free launch bundle (size and days staff set) so the first paid days are learned on free credits. Staff can grant credits to any seller at any time, audited.

What the rules deliberately do not do: no level ever bypasses screening or the quota; a paused ad is not deleted; a credit is never refunded to money; a seller never loses a level they already paid for because a bundle ended.

## 3. Scenarios under the rules

| # | Scenario | What happens | Rule |
| --- | --- | --- | --- |
| S1 | Shop buys a Business bundle: 30 credits, 60 days, $100 | Sets 10 ads to Premium (3 each), or 15 Featured, or 30 Regular, or any mix; the balance counts down; each ad keeps its level for the level's duration | 2, 1 |
| S2 | Person with one item, no bundle | Posts it Regular free (inside N); taps Promote → Premium at the country's one-off price (e.g. $15), paid with money | 4, 2 |
| S3 | Shop sets an ad to Premium on day 59 | Premium runs its full duration past the bundle's end; the credits were spent in time | 1 |
| S4 | Bundle ends with 7 credits unspent | They wait 30 days; a new bundle in that window starts with its credits + 7; otherwise they are gone | 3 |
| S5 | A Premium ad's 60 days end | Falls to Regular if a free slot is open; else pauses with the renew notice sent 3 days before | 5 |
| S6 | A seller in the US with one item for buyers in Ethiopia | The ad's market is its place (Ethiopia): Ethiopia's prices in ETB apply; reach "nationwide" covers Ethiopia; "worldwide" reaches the diaspora | 1, 2 |
| S7 | Staff mark an ad Premium (T1) | Runs until staff end it; costs nothing; the seller's balance is untouched | 1 |
| S8 | Launch, switch OFF for every country | Any level or reach is set free; sellers learn the controls; nothing is counted | 6 |
| S9 | Payments start in Ethiopia; switch ON for ET | Every ET seller receives the launch bundle (say 10 credits, 30 days); ads already at a level keep it to their end; after the bundle, money or a new bundle | 6, 1 |
| S10 | Cars priced differently from phones | A category row on the Premium level for Cars overrides the country price; phones use the country price | D301 |
| S11 | A shop posts 200 Regular ads on the free baseline | The N+1th Regular ad is refused until bought; screening, rate dials and the posting quota stand in front of every level | 4 |
| S12 | Staff view | Monetisation console: levels and their perks per category, reach, bundles, prices by country with category rows, the launch switch per country, grants; a seller's balance and purchases on the user page; an ad's level, reach and their end dates on the listing page | — |

## 4. Built today, and what each piece becomes

P-1 built the per-ad product and its prices; the credits model keeps that and adds the credit ledger, reach and the per-country switch. The seller-plan dials move to where the model now puts them.

| Built (dev af312ca2) | Becomes |
| --- | --- |
| `listing_packages` (key, tier, days, enabled, self-serve, extends lifetime) | The **levels** table: one row per level, plus per-category override rows for duration, photos, placement, badge (D295). `featured_45` / `premium_60` become the Featured and Premium rows; a Regular row is added; a duration matrix table (main category × level × optional country, D308) and a season window on categories (D309); subcategories inherit their main category's row |
| `package_prices` (package × country × category × amount × currency × window) + `package_price_for` | The one **prices** table for every product (level, reach, bundle): + `credit_cost`; the resolver answers money price and credit cost; the country row with category overrides (D301) |
| `coverage_plans` (`free`: cities, regions, countries, everywhere, photos, lifetime, ads at most) | The **free baseline** per country: N free Regular live ads (D300) and the included reach (city). Photos and lifetime move to the levels; the reach caps move to the reach product |
| `listings.tier` + `admin_set_listing_tier` (T1) | Stays; gains `tier_until`, `reach`, `reach_until`, `source` (money, credits, staff, launch). The seller's door `set_listing_level` (owner, pays by rule 2) and `set_listing_reach` |
| — | **Credits ledger** `seller_credits` (bundle bought, launch grant, staff grant, spend, rollover, expiry) — append-only, idempotent, the balance derived; Tier A |
| — | **Bundles** table (key, credits, period days, sizes) + a bundle's price rows in the prices table |
| — | **Product switches** per country: `paid_levels` with the launch bundle's size and days (D305) |
| — | **Sweep job** on the scheduled-jobs mechanism: level and reach ends, pauses and reminders, credit expiry and rollover windows; a heartbeat row per run |
| Admin › Plans, Admin › Packages (two entries) | One **Monetisation** console (D286): levels and perks, reach, bundles, prices, switches, grants; created/updated by (D289); Add price always visible (D287); edit until first use (D288); names per language, keys derived (D290) |
| Seller side: nothing yet | Promote on My listings and the ad page: level, reach, what it costs in credits or money, the balance; Settings › Credits: balance, purchases, end dates; the pause notice and renew |
| Payments: none | Later: a provider per market (Ethiopia local, cards abroad); provider truth reconciles to the ledger (the archived payments rules return) |

## 5. Decisions recorded today, and the few still open

Recorded (2026-11-02, 10:56–11:15, the operator's words and three question cards): D294 levels are per-ad designations bought separately; D295 perks per level with category overrides (duration, photos, placement, badge); D296 reach as a per-ad add-on (city included, nationwide, worldwide); D297 bundles are one credit pool with rates (Premium 3, Featured 2, Regular 1), several sizes; D298 unspent credits roll over once within 30 days; D299 a level set late in the period runs its full duration; D300 Regular free up to N live ads per seller per country; D301 country price with category overrides; D302 one-off buys with money; D303 the seller plans of the morning are replaced by baseline + bundles; D304 credits or money for every product; D305 one switch per country, OFF at launch, a free launch bundle when switched ON; D306 a level that ends falls to Regular if a slot is open, else pauses; D307 anyone may buy a bundle. From the morning and kept: D286–D290 (one console in a Monetisation group, Add price always visible, edit until first use, created/updated by, names per language with derived keys).

Answered at 11:28 (D308–D312) — all are staff settings in the console, never hardcoded; these are the starting values:

- [ ] N free Regular ads, live at a time, per country: 10 in Ethiopia, 3 abroad to start — raised freely while sellers are few (D310)
- [ ] Durations: a matrix per main category × level (defaults 30 / 45 / 60; rule of thumb 1 : 2 : 3; long while the market is thin, shorter where a location is crowded; seasonal categories end on their date) — D308, D309. Photos: 4 / 8 / 12 (D311)
- [ ] Credit rates for reach: nationwide 1, worldwide 2 (D312)
- [ ] Bundle sizes and periods: Seller 10 credits / 30 days; Business 30 / 60; Enterprise 100 / 90 (D312)
- [ ] The launch bundle per country when its switch turns ON: staff set it then; 10 credits / 30 days is the starting value (D305)
- [ ] Category rows (prices and durations): added by staff as the market shows the need; nothing seeded (D312)

## 6. Build order

Five Cursor tasks after the records turn; ESTIMATE 7–9 executor turns in all. Migrations and the credit ledger on Claude Fable 5.1; screens on Claude Opus 5.5; records on Claude Sonnet 5.5.

1. **R10 — records** (now): the ledger since 2026-10-30, D286–D307, this document into the repository, the handoff.
2. **P-1b — levels, reach, prices, the console**: `listing_packages` → levels with per-category perks; `package_prices` → prices for every product with `credit_cost`; the reach product; the free baseline per country; the per-country switch; the Monetisation console (one page; created/updated by; Add price always; edit until first use; names per language); `docs/features/plans.md`.
3. **P-2 — the ad's level and reach**: `tier_until`, `reach`, `reach_until`, `source`; the seller's `set_listing_level` / `set_listing_reach` doors (switch OFF: free; ON: credits or a money hold); the sweep job (ends, pauses, reminders); Promote on My listings and the ad page; the free-slot rule at publish.
4. **P-3 — credits**: bundles, the append-only ledger, grants, rollover and expiry in the sweep, Settings › Credits, the launch bundle on switch-ON; staff grants on the user page.
5. **P-4 — payments** (when a provider is chosen per market): checkout for one-off buys and bundles, provider truth reconciled to the ledger, refunds policy, the paid-service runbook executed per country.

Sources: the repository at dev `af312ca2` (`docs/governance/plans-packages-spec-v1.md`, P-1's three migrations); the doc "Plans & packages — scenarios v1" (superseded, the morning's record); [ProductMint — how Jiji makes money](https://productmint.com/how-does-jiji-make-money/) for the peer shape.
-----END MODEL-----
```
