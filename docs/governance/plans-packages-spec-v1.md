# Plans and packages — spec v1 (pre-plan; for Cursor's plan phase)

Date: 2026-11-02 · Supervisor draft after the operator's answers of 02:23 NY · Status: APPROVED IN PRINCIPLE by the operator's answers (decisions D279–D283 below); the open points in §8 are decided at the plan phase or by one ruling. Builds on T1 (the tier column, `admin_set_listing_tier`, `transition_listing` clearing the tier on removal) with no rework of it. Order: before launch (D281), after T1 closes and the records turn R10 lands; before the Foundations bundle.

## 1. The operator's decisions (2026-11-02, 01:39 and 02:23 NY)
- D279 — Plans and packages are two things: a **plan** is the seller's account level (coverage, photos, how many ads, the default lifetime of an ad); a **package** is a per-ad promotion (the tier it grants, for how many days). Every number of both is edited in the admin, never in code.
- D280 — `free` is the seeded default plan, editable in every property (days, photos, coverage, quota), never deleted; staff add more plans. Packages are seeded for Featured and Premium; staff add, edit and switch them off.
- D281 — Prices are rows: package × country × category (or any) × amount × currency × from/to. A free promotion is a zero-price row with an end date. Sellers may apply a package to their own ad themselves when a price row (free for now) applies; the site launches with a free self-serve promotion, so this bundle comes BEFORE launch.
- D282 — On the ad: the tier (T1) plus an end date, the package, who applied it and how; blank end date = until staff remove it (D276). A scheduled job clears expired tiers through the one door, with a history line.
- D283 — Durations are data with defaults: an ad's lifetime 30 days on the free plan; Featured 45 days; Premium 60 days. A plan also restricts how many ads a seller may have (dynamic).

## 2. What exists (read at dev e5e191c6 + PR #10)
- `public.coverage_plans` (plan key `^[a-z_]{2,32}$`, max_cities, max_regions, max_countries, allow_everywhere, max_photos 0–30, updated_by/at); one row `free`; Admin › Coverage edits and adds, never deletes (`admin.coverage.*`); `seller_plan(uid)` returns `'free'` — the one seam for per-seller plans (`20260919054044…sql:70–82`).
- Lifetime: `categories.expiry_days` (nullable; DEC-117 `LEAST(the seller's date, now() + category days)` in `transition_listing`'s activate branch); `listing_policy` (one row: renew_allowed, renew_days); `expire_stale_listings` + `cron.schedule('listing-expiry-sweep', '17 * * * *')`; the job kit (`job_runs`, `job_lease_take/release`, `job_health_core`, `admin_job_health`).
- Tier: `listings.tier` ∈ regular|featured|premium (feed rank through `feed_tier_rank` and the `feed_index_on_listing_update` trigger); T1: `admin_set_listing_tier` (enforce + step-up + staff_moderation dial; revision + audit; reasons promotion/promotion_ended/other); `transition_listing` clears the tier on `removed`.
- Money: `currencies` table exists; no payment provider (v1 free).

## 3. The model
### 3.1 Plans (the seller's level) — `coverage_plans` grows, Admin › Coverage becomes Admin › Plans
New columns, all editable: `default_days integer NOT NULL DEFAULT 30 CHECK (> 0)` (an ad's lifetime where the category sets none — see §8.1), `max_active_ads integer NULL` (NULL = unlimited; counted per seller across live statuses active/reduced/screening/held), `label_key` (a translation key for the plan's name on screens — the key stays data). `free` row seeded with 30 / NULL / its key. Assignment stays `seller_plan()` = 'free' for everyone this bundle (the per-seller column is the next step, out of scope here — D283's "restrict how many" works today because every seller is on `free`).
Enforcement: the publish door refuses the (N+1)th live ad with a typed refusal (`plan_quota`), read before any side effect; the wizard shows the count and the limit before the last step.

### 3.2 Packages (the per-ad promotion) — new table `listing_packages`
`key text PK (^[a-z_]{2,32}$)`, `tier text NOT NULL CHECK (tier IN ('featured','premium'))`, `days integer NOT NULL CHECK (days > 0)`, `enabled boolean NOT NULL DEFAULT true`, `self_serve boolean NOT NULL DEFAULT false`, `extends_lifetime boolean NOT NULL DEFAULT true` (§8.1), `label_key text`, `sort integer`, `updated_by`, `updated_at`. Seeded: `featured_45` (featured, 45 days), `premium_60` (premium, 60 days), both enabled, self_serve true. RLS: public read of enabled rows (anon, authenticated: the seller's "Promote" screen and the price reader need them); writes only through the staff door `admin_save_listing_package` (`listings:enforce`? — see §8.3: a new resource `packages` with `view`/`update` is cleaner; the plan phase proposes).

### 3.3 Prices — new table `package_prices`
`id uuid PK`, `package_key FK`, `country_code char(2) NULL` (NULL = every market), `category_id uuid NULL` (NULL = every category; a leaf or a branch — the branch rule follows the feed's ancestry), `amount numeric(12,2) NOT NULL CHECK (>= 0)`, `currency char(3) FK currencies`, `valid_from timestamptz NOT NULL DEFAULT now()`, `valid_to timestamptz NULL`, `updated_by/at`. Resolution for an ad at a moment: the most specific valid row wins — (country, category) > (country, any) > (any, category) > (any, any); none → the package is not offered on that ad. A zero amount = free; the self-serve door requires amount = 0 until a payment step exists (§6). Switching the promotion off = `valid_to` set (never a delete; history stays).

### 3.4 On the ad — `listings` gains
`tier_until timestamptz NULL` (NULL = until staff remove it, D276), `tier_package text NULL FK`, `tier_source text NULL CHECK (IN ('staff','self','paid'))`, `tier_applied_by uuid NULL`, `tier_applied_at timestamptz NULL`. Feed rank keeps reading `tier` (no feed change). `public_listing_json`/`adPageView` unchanged (the buyer sees the tier only).

### 3.5 The doors (one mechanism, three callers)
- `apply_listing_package(p_listing_id, p_package_key)` — the seller's self-serve door: signed in → owner of the listing → listing live (active/reduced) → package enabled and self_serve → a valid price row resolves for (listing's market, category) → amount = 0 (v1) → no active package already on the ad (one at a time; §8.2) → `rate_gate('promote')` (a new dial, e.g. 5/day) → write tier, tier_until = now() + days, package, source 'self', applied_by/at; extend `expires_at` to at least tier_until when `extends_lifetime` (§8.1); revision row (kind edit: tier, tier_until) and audit `listing.package_applied`. Typed refusals, each with a key; a refusal writes nothing (proof).
- `admin_set_listing_tier` (T1) gains `p_days integer DEFAULT NULL` → `tier_until` (NULL keeps D276's indefinite mark), `tier_source = 'staff'`; the dialog gets a days field (default from the package of that tier, or blank).
- `expire_listing_tiers()` — the sweep: every ad with `tier <> 'regular' AND tier_until <= now()` → tier regular, `tier_until/package/source` cleared, revision (tier old → regular, reason `expired`) and audit; through the job kit (lease, heartbeat row, health line) on `cron.schedule('tier-expiry-sweep', '23 * * * *')`; `transition_listing`'s clearing on removal also clears the new columns (M-redeclare, two more insertions).
- `admin_save_listing_package`, `admin_save_package_price` — staff writes with step-up, audit rows, typed refusals (overlapping validity windows for the same (package, country, category) refused).

### 3.6 Screens
- Admin › Plans (today's Coverage page + the three new fields; the quota and days columns).
- Admin › Packages (new, under Listings): the package list, add/edit, on/off; per package its price rows (country, category, amount, currency, from/to) with "Add price" and "End" (sets valid_to); the free promotion is one row with no country, no category, amount 0, a `valid_to` the operator picks.
- The seller: on My listings' ad page and the ad's own page (owner view) a "Promote this ad" control listing the packages that resolve to a price for that ad, with the price (free shows «ነጻ»/"Free") and the days; confirm → the door; the ad shows its tier look and "Premium until <date>"; the countdown line uses the one date formatter (locale/format mechanism).
- Staff's listing page: the tier line shows source, package, until; Set tier gains days.
- Every word a translation key; Amharic the supervisor's.

### 3.7 Guards
- CF-PRICE-1: every read of a package's price goes through the one resolver (SQL `package_price_for(listing_id, package_key)` and its one client reader); a screen never computes a price.
- CF-TIER-5: every writer of `listings.tier`/`tier_until` is one of the three doors (census over migrations; planted bypass).
- The job's conformance (heartbeat row, health line names the job, `scripts/conformance/ci-deadlines`/job census as the kit requires).
- Route/door tests prove each refusal writes nothing (rows, audit, dial count).

## 4. Five lenses
- Security: self-serve is a user-facing write on a row the caller must own (ownership asserted on the FOR UPDATE row, never on a permissive read — G54 a); the price must resolve server-side (never client-sent); `amount = 0` enforced in SQL until payments; the promote dial per user; packages/prices readable by anon only as enabled rows; staff doors behind step-up; audit on every write; no tier beyond the package's.
- Performance: one more index `listings (tier_until) WHERE tier <> 'regular'` for the sweep; the price resolver is one indexed query per package on the owner's page only; the buyer's pages carry nothing new on the first download (the Promote control loads on demand).
- Failure modes: a missing price row → the package is not offered (typed, never "free by default"); the sweep's lease and heartbeat (ran-with-nothing ≠ never ran); a package switched off mid-promotion → existing ads run to `tier_until`, new applies refused.
- Consistency: one resolver, one apply door, one sweep; the staff door and the self-serve door write the same columns through the same revision/audit shape.
- Future growth: payments = a payment step that hands the apply door a paid receipt id (`tier_source 'paid'`) — no schema change; per-category/per-country prices are rows; more tiers = a row in `listing_packages` + the look's token set (card-tier.ts); per-seller plans = the `seller_plan()` seam + a profiles column; stacking packages (§8.2) = a second row shape later.

## 5. Forward-scan
- Payments (post-launch): the apply door's `amount = 0` check becomes "amount = 0 OR a verified receipt"; the receipt table and provider truth are their own Tier A bundle.
- Per-seller plans: `profiles.plan` + `seller_plan()` reading it; Admin › Users assigns.
- D199 (discount/sale): unrelated to packages; shares nothing.
- The feed engine: unchanged (rank from `tier`).
- Stage 2 (shops): a shop's package prices = rows with a shop scope later (a column, not a fork).

## 6. Turns (ESTIMATE 4–5 Cursor turns; migrations Tier A, Fable; screens Opus)
1. P-1 (migration + admin): plans' three columns, `listing_packages`, `package_prices`, the resolver, the staff doors, Admin › Plans fields and Admin › Packages screen; seeds.
2. P-2 (migration + door + job): the ad's columns, `apply_listing_package`, `admin_set_listing_tier` + days, `transition_listing` clearing, `expire_listing_tiers` + cron + health; CF-TIER-5.
3. P-3 (screens): the seller's Promote control and the "until" line; staff's page; the quota in the wizard and the publish door's refusal.
4. P-4 (records + Amharic review + walk fixes), folded into the next records turn.

## 7. Acceptance (what the walk proves)
Staff edits free's days/photos/quota and sees them enforced; staff creates a package and a free price row with an end date; a seller promotes an ad for free and sees Premium with its end date; the sweep returns it to regular at the date with a history line; ending the price row hides the offer; a seller at the quota is refused the next ad with the message.

## 8. Open points (plan phase or one ruling)
1. Lifetime vs category days (D283 "30/45/60"): proposed — the plan's `default_days` applies where the category sets no `expiry_days`; a package with `extends_lifetime` pushes the ad's `expires_at` to at least `tier_until` (a 60-day Premium stays live 60 days); when the package ends the ad keeps its expiry (renewal rules unchanged). Alternative: the package never touches `expires_at`. Recommended: as proposed.
2. One package per ad at a time (a new apply refused while `tier_until > now()`), or an upgrade path (featured → premium replaces, the remaining days forfeited)? Recommended: replace upward only, never downward; staff may always override.
3. Permission for the staff doors: reuse `listings:enforce` (as T1) or add resource `packages` with `view`/`update` (+ `admin.roles.perm.*` keys)? Recommended: a new resource — pricing is not moderation.
4. The promote dial's numbers and the quota's default (free: unlimited at launch? or e.g. 20)? Operator's call at the plan.
