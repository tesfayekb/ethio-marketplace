# Plans — the credits model's products and the Monetisation console

The model v2 (the Project doc "Plans & packages — model v2 (credits)", D290 →
D312; `docs/governance/plans-packages-spec-v1.md` is v1's record): an ad has a
**level** (Regular, Featured, Premium — rows staff may rename, end or add to)
whose perks — days, photos, placement, badge — may differ per main category and
per market; it has a **reach** (City, Nationwide, Worldwide); every product has
**prices** in credits (and money, for later checkout) by market, category and
window; each **market** has a free baseline, an included reach and a "paid
levels" switch with its launch bundle. Landed by turn P-1b (migrations M-a →
M-d, the console, the strings, the guards). The ad's own columns, the seller's
doors and the sweep are P-2's; credits P-3's; payments P-4's. Nothing of P-1b
reaches a buyer's page.

An ad's caps are its own level's photos and its reach row's place limits
(`max_cities`, `max_regions`, `max_countries`, each NULL for no limit), resolved
by `listing_caps` (P-2 (c) c2b, DEC-356): the seller's edit reads them from
`my_listing_private`'s `caps`, a new ad's step 6 from `get_posting_schema`'s
plan block (the market's included reach). The console's Posting caps block is
retired; a reach product's limits are set in the Reach block's editor.

## The data

### Levels and reach — `public.listing_packages` (M-a `20261103040805`)

One row per product: `key` (the identity, `^[a-z][a-z0-9_]{1,31}$`), `kind`
(`level` | `reach`; a CHECK of two words — P-3 widens it to `bundle`), `name_en`
and `name_am` (the names per language, D311: `catalogText` picks the catalogue's
language and falls back to English), `days` (> 0), the level perks `max_photos`
(0–30), `placement` (`standard` | `boost` | `top`), `badge` — NULL / false on a
reach row, the door refuses `perks on reach` — `enabled`, `self_serve`,
`extends_lifetime`, `sort`, `created_by` / `updated_by`, timestamps. Seeds:
`regular` (7 days, 10 photos, standard), `featured` (30, 20, boost, badge),
`premium` (60, 30, top, badge); `city`, `nationwide`, `worldwide` (M-c). The
P-1 seeds `featured_45` / `premium_60` and the columns `tier` and `label_key`
are gone. A product is switched off, never deleted.

### The perks matrix — `public.level_overrides` (M-a)

One row per (level, main category | any, market | any) naming the perks it
overrides: `days`, `max_photos`, `placement`, `badge`, each nullable, at least
one set (`empty override`); `UNIQUE NULLS NOT DISTINCT (level_key, category_id,
country_code)`; `category_id` must be a root (`not a main category`).

### The one resolver — `level_perks_for(level, category, market) RETURNS jsonb`

STABLE, SECURITY INVOKER, granted to the browser roles (P-2's Promote and the ad
page read it). `{"days", "max_photos", "placement", "badge", "season_until"}`,
each perk by the same precedence per column: (main category, market) → (any,
market) → (main category, any) → the level row. The main category is the root
reached through `category_tree_pointers`. `days` is capped at the season's end
(the nearest `categories.visible_until` up the chain; 0 when ended) and
`season_until` names it. An unknown, disabled or reach key answers NULL. This
is the ONLY place a level's effective perks are computed (CF-LEVEL-1).

### Prices — `public.package_prices` (M-b `20261103040806`)

One row per (product, market | any, category | any, window): `amount numeric ≥
0` (0 = free) with `currency`, **`credit_cost integer ≥ 0`** (the price in
credits, D301), `valid_from` / `valid_to`, **`used_count`** (0 until P-2's apply
door counts a use), `created_by` / `updated_by`. Two windows of one scope never
overlap. The resolver `product_price_for(listing_id, product_key)` is P-1's
`package_price_for` under its new name (the most specific valid row wins; none →
NULL, never free by default); a screen shows the stored rows as data and never
computes a price (CF-PRICE-1).

### Markets — `public.market_settings` (M-c `20261103040807`)

One row per market (`country_code`; NULL = the default row every market without
its own falls to): `free_regular_ads` (the free baseline, ≥ 0), `included_reach`
(a reach key), `paid_levels` (the switch), `launch_credits` / `launch_days` (the
bundle P-3 grants when the switch goes ON — required when ON: `launch bundle
required`), `paid_levels_since` (set when the switch goes ON, cleared when OFF,
kept while ON), `created_by` / `updated_by`. The browser roles read a market's
dials (the wizard's free-slot rule at P-2), never its authors.

The free slot is the table's law (CF-SLOT-1, DEC-342; `20261105080111`, M-1c
part 8): `listings_free_slot_guard()`, a BEFORE INSERT OR UPDATE OF status, tier
row trigger on `listings`, fires only when a row ENTERS the counted baseline
set — status screening, held, active or reduced at `baseline_level_key()`, the
OLD row not there. The ad's primary place (`location_id`, else its first
`listing_locations` row) names the market; an unplaced ad is not checked (the
judge refuses it already). Under an advisory lock per seller and market it
counts the seller's OTHER counted baseline ads there
(`seller_regular_live(uuid, character, uuid)`, the count leaving this ad out)
and refuses `noFreeSlot` with the market's `free_regular_ads` as DETAIL when
they already fill it. Counted → counted (the reviewer's approve, a reduce)
never fires, so no one is locked out of an ad already in. The doors over it:
`publish_listing` keeps its envelope pre-check (the friendly refusal before
`legal_certify`); `resume_listing` lets the guard answer inside
`transition_listing`'s UPDATE (same key, same DETAIL, nothing written);
`edit_my_listing`'s write into screening meets it; `admin_set_listing_tier`
lowering a LIVE ad to the baseline with no slot pauses it in the same UPDATE
(part 9, `20261105080112`: clock kept, `resume_status` the live status, a
'state' revision, audit `listing.level_paused`, one `level_paused` notice) and
is never refused for a live ad — a screening or held ad it lowers with no slot
is refused by the guard, since such an ad cannot pause
(`listings_resume_status_check`); the sweep's level end without a slot writes
the fall and the pause in ONE UPDATE (part 3), so the guard stays quiet.

### Grants

The browser roles read each table's OWN columns — `created_by` / `updated_by`
are never granted and `select("*")` is refused (MON-13) — behind the public
policies: enabled products, prices inside their window, every override, every
market. `packages:view` reads everything through the staff reader
`admin_list_monetisation()` (`{markets, products, overrides, prices}` with
`created_by_name` / `updated_by_name` from `profiles.display_name`; `denied`
without the permission) — the console's ONE read.

## The doors (config order: signed in → `packages:update` → step-up → the `staff_config` dial → the rules → the write → the audit row)

| Door                                                                                                                                                                   | Refusals by name                                                                                                                                  | Audit                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `admin_save_listing_package(key, kind, name_en, days, enabled, self_serve, extends, name_am?, max_photos?, placement?, badge?, sort?)`                                 | `bad key`, `unknown kind`, `bad name`, `bad days`, `kind change`, `bad photos`, `unknown placement`, `perks on reach`                             | `package.saved` (`listing_package`, key)      |
| `admin_save_level_override(level, category?, country?, days?, max_photos?, placement?, badge?)`                                                                        | `unknown level`, `not a main category`, `unknown country`, `bad days`, `bad photos`, `unknown placement`, `empty override`                        | `level_override.saved` (`level_override`, id) |
| `admin_clear_level_override(id)`                                                                                                                                       | `not found`                                                                                                                                       | `level_override.cleared`                      |
| `admin_save_package_price(product, amount, currency, credit_cost, country?, category?, from?, to?)`                                                                    | `unknown package`, `bad amount`, `bad credit cost`, `unknown currency`, `unknown country`, `unknown category`, `bad window`, `overlapping window` | `package_price.saved` (`package_price`, id)   |
| `admin_edit_package_price(id, amount, currency, credit_cost, country?, category?, from?, to?)` — while `used_count = 0` and live; a NULL `from` keeps the stored start | `price not found`, `price in use`, `price already ended`, then the save door's rules                                                              | `package_price.edited` (old → new)            |
| `admin_end_package_price(id, to?)`                                                                                                                                     | `price not found`, `price already ended`                                                                                                          | `package_price.ended`                         |
| `admin_save_market_settings(free_regular_ads, included_reach, paid_levels, country?, launch_credits?, launch_days?)`                                                   | `unknown country`, `bad free ads`, `unknown reach`, `launch bundle required`, `bad launch bundle`                                                 | `market.saved` (`market_settings`, id)        |
| `admin_set_coverage_plan(…)` (M1a's live body, unchanged; `coverage:update`)                                                                                           | the P-1 plan refusals (`badPlan`, `belowMinimum`, `badMaxPhotos`, `badDefaultDays`, `badMaxActiveAds`)                                            | `coverage.plan.update`                        |

Every refusal is a RAISE the console names by key (`monetisationErrorKey`,
`admin.packages.error.*` and `admin.monetisation.error.*`; MNS-6 reads the three
migrations and proves every message has a key — the cleared override's `not found`
is `admin.monetisation.error.overrideNotFound`, records turn R11). A refused attempt
leaves no trace (MON-2, MON-12).

## The console — Admin › Monetisation (`/admin/monetisation`)

Section id `monetisation` (its own group `monetisation`, right after Listings;
rail icon `Coins`, group icon `BadgeDollarSign`) · gate `packages:view` (the
`/admin` layout owns it) · root testid `admin-section-monetisation` · h1
`monetisation-header`. `/admin/packages` and `/admin/coverage` redirect here
(`beforeLoad`, MON-3); the Locations overview lost its Plans tile.

`src/features/admin-monetisation/` — `monetisation-page.tsx` (the `StepUpGate`,
`useAdminShell().permissions`, `useSettling`), `use-monetisation.ts` (the one
read and the door mutations), `monetisation-service.ts` (the seam: the Supabase
door, `admin_list_monetisation`, the doors, `DOOR_MESSAGE_KEYS`),
`monetisation-rows.ts` (the reader's rows, narrowed by shape — a malformed row
is a `ReaderError`), `use-monetisation-names.ts` (a market's, a category's and
a product's name in the catalogue's language; a product or a category the read
does not hold is "not known", never its key or id — INC-1087), the sections and their dialogs,
`monetisation-forms.ts` / `price-forms.ts` (the forms judge
the doors' own shapes first; a blank number is a refusal, never 0),
`monetisation-dialogs.tsx` (`MonetisationErrorLine`, the verb bar,
`NumberField`, `Toggle`, the placement and badge selects), `on-off.tsx`,
`monetisation-columns.tsx` (`attributionColumns`: created by / updated by as
staff NAMES, detail tier; `capWord`: a reach row's limit, "No limit" when NULL), `monetisation-order.ts` (the strip's states from the
one read; `MONETISATION_ANCHORS`, `productAnchor`), the product row's pieces
(`product-name-toggle.tsx`, `product-details.tsx`, `level-overrides-table.tsx`,
`product-prices-table.tsx`).

**The order strip** (P-1c, D313; `OrderStrip` testid `monetisation-order`) sits
under the h1: Markets → Products → Prices, each a link into its block. Markets is _Set_ and names the
markets whose paid levels are on; Products is _Set_ once one level and one reach
are enabled; Prices reads _Needs a row_ when a market with paid levels on has an
enabled self-serve product without a price valid now for it (its own market or
every market) — the detail names the first such product and market and the
link opens that product's prices.

**Regrouped by product** (P-1c): three blocks on the page (P-2 (c) c2b
retired the fourth, Posting caps), each the agreed table
shape (`DataTable` `cardUntil="lg"`, `TableToolbar` with `ColumnsButton` +
`useHiddenColumns`, the Guide (`docs/features/admin-guide.md`),
`DataTablePagination` + `useKeptPage`, `RowActions`, `card: "title"`,
`TableActions level="h2"` under the page's one h1; testids `monetisation-<id>`,
`-header`, `-help`, `-toolbar`, `-columns`, `-pagination`, `-empty`; frame ids
`admin-monetisation-<markets|level|reach>`), in this order:

| Block (id)          | Rows (row testid)                                                                                                                                              | Header verb                                                           | Row verbs                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------- |
| Markets (`markets`) | `market-<code                                                                                                                                                  | default>`: name, free ads, included reach, paid levels, launch, since | Add market (`monetisation-market-add`)                          | Edit (`market-actions-<code>-edit`) |
| Levels (`levels`)   | `product-<key>`: key, name (the toggle `product-<key>-open`), days, photos, placement, badge, enabled, self-serve, extends, sort                               | Add level (`monetisation-level-add`)                                  | Edit (`product-actions-<key>-edit`; the key shown, never typed) |
| Reach (`reach`)     | `product-<key>`: key, name (the toggle), days, cities, regions, countries ("No limit" when NULL, `product-<key>-cities` …), enabled, self-serve, extends, sort | Add reach (`monetisation-reach-add`)                                  | Edit                                                            |

A product's name is a toggle (`aria-expanded`, `aria-controls`); open, the
row's `expandedRow` (`product-<key>-details`) holds the product's own tables,
each the agreed shape with its Guide (prefixes `levelOverrides`,
`productPrices`), its own `ColumnsButton`, `useKeptPage` key and h2:

| Inner table (frame id)                                  | Rows (row testid)                                                                                                 | Header verb                                                  | Row verbs                                                                                |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Per-category perks (`product-<key>-perks`; levels only) | `override-<id>`: category ("Every main category"), country ("Every country"), days, photos, placement, badge      | Add override (`product-<key>-override-add`; the level given) | Edit, Clear (red; `override-actions-<id>-more-clear`)                                    |
| Prices (`product-<key>-prices`)                         | `price-<id>`: "<Market> · <Category>" (`-title`), amount ("Free" at 0), credits, from, until ("Open-ended"), used | Add price (`product-<key>-price-add`; the product given)     | Edit while `used_count = 0` and live (`price-actions-<id>-edit`); End (red; `-more-end`) |

A hash `#product-<key>-prices` (the strip's Prices link, a Guide's next link)
opens that product's row and scrolls to the frame. The page-wide Prices and
Per-category perks blocks are gone with P-1c (`prices-section.tsx`,
`overrides-section.tsx`; `docs/tracking/intentional-deletions.txt`): the
strip's Prices state is the overview, and a search across every product's
prices is no longer offered.

Dialog prefixes: `monetisation-market-<create|edit>` (the market picked on
create — the default row when none holds it, then the open markets; shown as
text on edit), `monetisation-<level|reach>-<create|edit>` (key on create, EN and
AM names, days, the level's photos / placement / badge, the three switches, the
order), `monetisation-override-<create|edit|clear>` (the level as a line `-level`
— `fixedLevel`, the row it was opened from — main category, market, the four
cells; the scope line `-scope` on edit and clear),
`monetisation-price-<create|edit>` (the product as a line `-product` —
`fixedProduct` — market, category, amount, currency — the curated list's first
is the default — credit cost, from, until), `monetisation-price-end` (a day;
today = now). Each has `-error` (role alert; the
door's raw words under it as `-reason` when no key names them), `-cancel`,
`-save` / `-confirm`. A product's prices toolbar sieves by market, category and
currency (`product-<key>-prices-search`, label `admin.monetisation.prices.searchLabel`).

## Guards

- **CF-PRICE-1** (`scripts/conformance/package-price.ts`, `.test.ts`,
  `package-price-allowlist.txt`): outside the one reader
  (`monetisation-service.ts`) no file under `src/`, `e2e/helpers/` or `scripts/`
  reads `package_prices`, calls `product_price_for` / `package_price_for` or the
  console rpc `admin_list_monetisation`; a file that handles prices never puts
  `amount`, `credit_cost` or `creditCost` beside an arithmetic operator. CFP-2
  plants a read, the three calls and a credit computation.
- **CF-LEVEL-1** (`scripts/conformance/listing-levels.ts`, `.test.ts`,
  `listing-levels-allowlist.txt`; wired): no file but the one reader reads
  `listing_packages` or `level_overrides` or calls `level_perks_for`; no file
  names a level by a quoted word (`'featured'`, `'premium'`, or `'regular'` on a
  line naming `tier`). The P-1 tier consumers (ranking, card tier, the flag, the
  admin listings' tier verbs, the style page, the bench, the ad-page helper) sit
  in the allowlist until P-2 folds the ad's tier onto the level rows.
- CF-PLAN-1 retired in P-2 (c) c2b with the plan seam it guarded (an ad's caps
  come from its level and reach rows through `listing_caps`). Its reader of the
  migrations is `scripts/conformance/migration-reader.ts` (MGR-1…3), shared by
  the SQL censuses and the door catalogue.
- CF-PERM-1: the `packages` resource's `admin.roles.perm.*` keys (the
  `coverage` resource and its key leave with M-3c-b, P-2 (c) c2b).
- `scripts/admin-tables.ts` judges the three blocks and the two inner tables
  (T1–T10; the search slot is on a product's prices); CF-GUIDE-1 their five
  guides (the reach Guide names the three cap columns, the level Guide says a
  level has none) (`docs/features/admin-guide.md`); `scripts/check-hardcoded-strings.sh` (key-typed props are `labelKey`
  / `helpKey` / `titleKey`); the budget line `/admin/monetisation` in
  `scripts/route-budgets.mjs` (DEC-296); `vendor-seams.test.ts` (the merged
  service reads through the door; the P-1 coverage-service allowlist line is
  gone).

## Tests

`e2e/admin-monetisation.spec.ts` (area `admin-monetisation` in
`scripts/e2e-select.ts`) — MON-1 the entry, the strip and the three blocks on
both twins, no overflow, a level opened to its perks and prices, one h1, the
real rows read, Amharic headings · MON-2 a reviewer: no entry,
the deep link refused, both doors refuse by name; a `packages:view`-only staff
sees the blocks without a verb (the inner ones too);
nothing written · MON-3 the two
redirects · MON-4 a level created with its perks and both names (the key
lower-cased), the language switch, created by / updated by as names, opened
to its empty perks and prices and closed, edited
(days, off), two `package.saved` rows old → new · MON-5 a reach row without
perks (no perks table in its row); `perks on reach` by name · MON-6 overrides
inside the level's row (the level given, never picked): `empty override` before the
round trip; (root, any) days and (any, market) days + photos saved;
`level_perks_for` through the service client answers per column by precedence
for days AND max*photos; a cleared photos cell falls to the level; Clear falls
to the root · MON-7 a season caps days and names `season_until`; ended → 0 ·
MON-8 Add price inside the product's row (the product given), the row's
"Market · Category", Free, credits, the product's search · MON-9 Edit while
unused: amount, credit cost, end; the start kept; `package_price.edited` old →
new · MON-10 the service client marks a price used: Edit refused `priceInUse`,
nothing changes, the verb gone after a refresh while End stays · MON-11 End
price: the row stays, no verb, the public read no longer lists it · MON-12 a
scratch market: ON without a bundle refused by name (dialog and door), ON with
10/30 writes `paid_levels_since` and the audit row, OFF clears it · MON-13 anon
and a plain user read the own columns of enabled products, valid prices and
markets, never `created_by` / `updated_by`, never a disabled product or an
ended price; the console rpc refuses them · MON-14 step-up before any write,
the outcome reported after · MON-16 the strip:
a scratch market on with a sellable product without a price → Prices \_Needs a
row*, naming a product and its market, the link opening that product's prices;
Markets names the market; Products _Set_ · MON-17 a price added inside that
product (every market) clears it from the strip; _Set_ once no pair is left
(the expectation computed from the rows, `unpricedPairs`) · MON-18 (after the
types patch) a scratch reach product saved with cities blank and regions 3: the
table reads "No limit" and 3; reopening the editor shows blank and 3.
`e2e/admin-guides.spec.ts` AG-1 → AG-7 — the Guides (`admin-guide.md`).
`e2e/admin-roles.spec.ts` RP-17 — the matrix's `packages` resource.
`e2e/admin-locations.spec.ts` OV-1 — the overview has no Plans tile.

Scratch products carry the `e2e_mon_` prefix, namespaced run × worker × project × test, and are removed (overrides and
prices first; a scratch market's or category's rows before the fixture) in
`afterEach`; the real levels, reach rows and the default market are only READ.

Unit: `monetisation-service.test.ts` MNS-1…3, MNS-5…7 (the reader's rows, a
malformed row, the door calls, the message map against M-a / M-b / M-c, the
caps refusals and a reach row's caps);
`monetisation-forms.test.ts` MNF-2…9, MNF-11 (the product, override, price and
market forms' judges and defaults, a reach product's three caps; MNF-1's whole-number read moved with
`wholeNumber` to `src/lib/whole-number.test.ts` WN-1 in P-2 (b)); `rail-items.test.ts` (the group after
Listings; the old paths gone); `monetisation-order.test.ts` MNO-1…4 (the
strip's states on fixtures: an on market without a price → _Needs a row_ naming
the product; a null-market price counts; an ended price does not; three steps,
no caps step); `monetisation-page.test.tsx` MNP-1 (one h1, the h2s, the strip,
the Guides, a reach row's cap cells, a product's open row);
`use-monetisation-names.test.ts` MNN-1…3 (a held product's names; a missing
product or category is "not known").

## Related

- `docs/features/packages.md` — P-1's console (superseded; its history).
- `docs/features/coverage-console.md` — the plan caps' P-1 console (its route
  now redirects here).
- `docs/features/admin-listings.md` — the ad's tier and staff's tier verb until
  P-2 folds the tier onto the level rows.
