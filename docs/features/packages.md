# Packages console (Admin → Listings → Packages) — superseded by P-1b

> **Turn P-1b folded this console into Admin › Monetisation**
> (`docs/features/plans.md`): `/admin/packages` redirects to
> `/admin/monetisation`; `src/features/admin-packages/` and
> `e2e/admin-packages.spec.ts` are deleted (declared in
> `docs/tracking/intentional-deletions.txt`); `listing_packages` lost `tier`
> and `label_key` and gained `kind`, the names per language and the level perks;
> `package_prices` gained `credit_cost` and `used_count`; the resolver is
> `product_price_for`. What follows is P-1's record.

The promotions a seller may apply to an ad — the tier each grants and for how
many days — and their prices by market, category and window. Landed by turn
P-1 (D279–D283; `docs/governance/plans-packages-spec-v1.md`). The seller's
apply door, the tier's expiry sweep and the ad's own columns are P-2's; the
seller's Promote control is P-3's. Nothing of P-1 reaches a buyer's page.

Route `/admin/packages` · section id `packages` (group `listings`, after
Screening) · gate `packages:view` (the `/admin` layout owns it) · root testid
`admin-section-packages` · rail icon `Package`.

## The data (M1b `20261102081600`, M1c `20261102081700`)

`public.listing_packages` — one row per package: `key` (the identity,
`^[a-z][a-z0-9_]{1,31}$`), `tier` (`featured` | `premium`), `days` (> 0),
`enabled`, `self_serve`, `extends_lifetime`, `label_key` (nullable; the screen
key P-3's reader resolves, `^[a-z][a-z0-9_.]{1,79}$`), `sort`, `updated_by/at`.
Seeds: `featured_45` (featured, 45 days, sort 10) and `premium_60` (premium,
60 days, sort 20). A package is switched off, never deleted.

`public.package_prices` — one row per (package, market, category, window):
`country_code` (NULL = every market), `category_id` (NULL = every category; a
branch covers its descendants), `amount numeric(12,2) ≥ 0` (0 = free),
`currency` (FK `currencies`), `valid_from` (default now), `valid_to` (NULL =
open-ended; set to end, never deleted). Two windows of the same (package,
market, category) never overlap — the door refuses `overlapping window` under
`FOR UPDATE` on the package row (ruling 1 answer 4; no extension, G42).

Browser roles read each table's OWN columns (`updated_by` is never granted;
`select("*")` is refused, PKG-9): the public policy shows enabled packages and
prices inside their window; `packages:view` shows every row, ended and future
windows too.

### The one resolver — `package_price_for(listing_id, package_key)`

STABLE, SECURITY INVOKER, over public rows: the ad's market is
`locations.country_code` of `listings.location_id` (the primary place prices
the ad; `home_country_code` never — ruling 1 answer 5); the ad's category and
its ancestors through `category_tree_pointers` (the feed's walk). The most
specific valid row wins — (market, category) > (market, any) > (any, category)

> (any, any), the nearer ancestor before the farther, the newer window before
> the older — as `{price_id, amount, currency, valid_from, valid_to, country_code,
category_id}`; none → NULL (not offered, never free by default). This is the
> ONLY place a price is computed: a screen shows the stored rows as data.

## What it renders

Admin › AI's two-table shape on the agreed blocks (D118 / D128). ONE READ of
`listing_packages` drawn as the roster (its own block, `packages-roster`;
`DataTable`, `cardUntil="lg"`, row testid `package-<key>`), then the prices of
the chosen package under it (`packages-prices`).

| Column           | Priority  | Content                                       |
| ---------------- | --------- | --------------------------------------------- |
| Key              | primary   | `package-<key>-key` — the identity (title)    |
| Tier             | primary   | `package-<key>-tier` — the tier word (badge)  |
| Days             | primary   | `package-<key>-days`                          |
| Enabled          | primary   | `package-<key>-enabled` — On / Off `TipBadge` |
| Self-serve       | secondary | `package-<key>-self-serve` — On / Off         |
| Extends lifetime | secondary | `package-<key>-extends` — On / Off            |
| Order            | detail    | `package-<key>-sort` (the card's footer)      |
| Updated          | detail    | the row's `updated_at` day (the footer)       |

Toolbar `packages-toolbar`: `packages-search` (the key or the tier word, sieved
in the browser), `packages-columns`; header `packages-header` holds Add package
(`packages-create-open`); footer `packages-pagination` with `useKeptPage`.

The prices table (`PackagePrices`, row testid `price-<id>`): Market
(`price-<id>-market`, "Every market" when NULL), Category (`-category`, "Every
category" when NULL), Amount (`-amount`: "Free" when 0, else the exact number
and its currency code), From (`-from`), Until (`-to`: "Open-ended" when NULL).
Toolbar `packages-prices-toolbar`: Filters `packages-prices-filters` with the
package as pills (`packages-prices-package-<key>`, `-all`), the chip
`packages-prices-chips-chip-package`, `packages-prices-columns`; header
`packages-prices-header` holds Add price (`packages-price-create-open`, once a
package is chosen); footer `packages-prices-pagination`. The empty caption
(`packages-prices-empty`) asks for a package, or says the package has no price.

## Verbs

| Verb            | Surface                                        | Door                         | Permission        |
| --------------- | ---------------------------------------------- | ---------------------------- | ----------------- |
| Add package     | `packages-create` (key, tier, days, on, …)     | `admin_save_listing_package` | `packages:update` |
| the row's Edit  | `packages-editor` (the key shown, never typed) | `admin_save_listing_package` | `packages:update` |
| Add price       | `packages-price-create`                        | `admin_save_package_price`   | `packages:update` |
| End price (red) | `packages-price-end` (a day; today = now)      | `admin_end_package_price`    | `packages:update` |

Every door re-checks the permission, the second factor
(`require_step_up_if_needed('packages','update')`) and the `staff_config` dial
before any side effect, and writes an audit row: `package.saved` (old → new),
`package_price.saved`, `package_price.ended`. The gates in the console are
convenience only (F3).

The package editor round-trips every stored field (INC-188). On create the
label key follows the key as `package.<key>` until typed (ruling 1 answer 6);
the order field admits digits only and a blank keeps the stored order. The
price dialog's market is the open-markets list, its category the whole tree
indented by depth, its currency the curated list (the first is the default);
"Valid from" is the start of the chosen day (today = now), "Valid until" the
end of that day — the start of the next, exclusive, as the door reads it.

## Refusals (F4)

Rendered by name in the dialog's own line (`<prefix>-error`, role alert; the
door's raw words under it as `-reason` when no key names them): the forms judge
the door's own shapes first (`packages-forms.ts`: a blank or non-numeric number
is a refusal, never 0 — `wholeNumber`, ruling 1 answer 10) and the door judges
again. The keys, one per RAISE message, in `packagesErrorKey`
(`admin.packages.error.*`): denied, stepUp, rateLimited, badKey, unknownTier,
badDays, badLabelKey, unknownPackage, unknownCountry, unknownCategory,
unknownCurrency, badAmount, badWindow, overlap, notFound, alreadyEnded,
unknown. `packages-service.test.ts` PKS-6 reads M1c and proves no message falls
to the fallback.

## The seam (`packages-service.ts`)

The client arrives through the Supabase door (`getSupabase` / `rpc`, DEC-261);
a failed download of it is reported to the shell's one notice (INC-911) and
read as a typed `ReaderError`, never a blank table. This file is the ONE admin
reader of `package_prices` (CF-PRICE-1).

## Guards

- CF-PRICE-1 (`scripts/conformance/package-price.ts`, `.test.ts`, allowlist
  `package-price-allowlist.txt`): outside the one reader, no file under `src/`,
  `e2e/helpers/` or `scripts/` reads `package_prices` or calls
  `package_price_for`; a file that handles package prices never puts `amount`
  beside an arithmetic operator (a computed price is the resolver's alone). The
  generated client types are not a consumer. CFP-1 the tree, CFP-2 planted
  bypasses (a read, a resolver call, a computation; a shown amount and an ad's
  own asking price are clean), CFP-3 specs, tests and comments do not count.
- CF-PERM-1 (`scripts/conformance/perm-vocabulary.ts`): every resource and
  action a migration seeds has its `admin.roles.perm.*` keys — the `packages`
  resource's among them.
- `scripts/admin-tables.ts` judges both tables (T1–T9); the budget line
  `/admin/packages` in `scripts/route-budgets.mjs` (DEC-296).

## Tests

`e2e/admin-packages.spec.ts` — PKG-1 gating (the two seeds with their tier
words for a super admin; a plain user refused, no entry) · PKG-2 a package
created, edited (days, label), switched off and on through the door, the key
fixed on edit, three `package.saved` rows old → new · PKG-3 a reviewer and a
coverage editor: no entry, the screen refused, both doors refuse by name,
nothing written · PKG-4 a free price and three narrower rows saved through the
dialog; the resolver's four precedence answers and NULL where nothing covers,
read as the ad's owner · PKG-5 an overlapping window refused by name with
nothing written; an adjacent window saves · PKG-6 End price: the row stays, the
public read no longer lists it, the resolver answers NULL, one
`package_price.ended` row · PKG-7 a staff session without a fresh second factor
is asked before any write · PKG-8 geometry at 360 and in Amharic · PKG-9 the
browser roles read enabled packages and valid prices only, never `updated_by`.
`e2e/admin-roles.spec.ts` RP-17 — the matrix shows the `packages` resource with
View and Update, Update marked step-up.

Scratch packages carry the `e2e_pkg_` prefix, namespaced run × worker × project
× test, and are removed (prices first) in `afterEach`; audit rows outlive them,
so every audit read is bounded by the test's own start. PKG-4 waits on the
open-markets ROUTE before opening the console (INC-218).

Unit: `packages-service.test.ts` PKS-1…6 (the rows as the console shows them,
a malformed tier, the door calls and their refusals, the message map against
M1c); `packages-forms.test.ts` PKF-1…7 (the package form's judge and its
defaults, the price form's amount, currency and window, `dayStart` / `dayEnd`,
`flattenTree`).

## Related

- `docs/features/coverage-console.md` — Admin › Plans (the seller's account
  level; P-1's three dials).
- `docs/governance/plans-packages-spec-v1.md` — the spec; §8.1 / §8.2 (lifetime,
  one package at a time) are P-2's.
