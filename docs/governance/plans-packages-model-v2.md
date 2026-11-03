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
