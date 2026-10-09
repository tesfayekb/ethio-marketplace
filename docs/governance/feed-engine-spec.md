# SPEC — The feed engine: fast filtering by category branch and place (v1, APPROVED 2026-10-08)

APPROVED by the operator on 2026-10-08 at 11:59Z — "On the above answers, Agree with all," (D101; spec-ledger block S58): the five decisions of §8 as written; decision 2 amends REQ-005's order for the feed. The text below is draft v1 as he approved it, unchanged apart from its title line; it is bundle 10.

Supervisor's Pass-2 draft, 2026-10-08. Read at dev `aec5bc82`. Not built until the operator approves it (§3). Numbers marked ESTIMATE are not measured yet; measured values replace them.

## 1. What the operator decided (his words are in the running record)

- **D99** — a category's page shows every listing in its whole branch: Vehicles shows Cars, Trucks, Buses and the rest; Cars shows cars only. Every page — home, category, subcategory — also filters by place. Speed is the main task.
- **D98** — below 1024 px, a tap on a category opens its page behind the menu and shows its subcategories; a last-level subcategory opens its page and closes the menu; from 1024 px a short hover (or a › button, or the keyboard) shows a panel of subcategories; no subcategory chips on the page.
- **D100** — the direction of 11:05Z agreed: the server filters, orders and pages; one index answers any category level × any place level; continue-after-last paging; the widening ladder; a short edge cache for visitors who are not signed in; speed targets fixed before building.

## 2. What the code does today (read at `aec5bc82`)

- `src/features/feed/use-feed.ts` :129–140 reads `listings` with `status = 'active'`, an exact `category_id` match, **no order and no page**; `ranking.ts` :49–65 sorts in the browser. The place filter is a stub (:139–143).
- **INC-503** — the exact match misses the branch: sellers post in last-level categories, so a top category's page shows few or none of its listings.
- **INC-504** — `selectedCategoryId` is looked up in the top-level list only (`app-shell.tsx` :355–358), so a subcategory's URL filters nothing.
- **INC-505** — the whole active catalogue is downloaded on every view; past the hosted API's row cap (1,000 by default — the project's own setting not read), an unordered set is cut before the browser sorts it.
- Indexes on `listings` are single-column (status, category, country, place, published, seller); none serves "branch × place × newest".
- What already exists and is reused: the public category tree with guests (`/api/categories/tree`, INC-246, INC-263); the place tree with `country / region / city / sub_city` and each row's `region_id` and `city_id`; a listing's main place (`listings.location_id`) and its extra places (`listing_locations`, single-country law); the write doors `submit_listing`, `publish_listing`, `transition_listing` and the expiry sweep (REQ-021/022: the only writers of `listings`).

## 3. The design

### 3.1 One lookup table for every combination

A new table, `feed_index`, holds one row for each pair of (a category on the listing's branch, a place the listing is shown in) — only for **active** listings:

| column | meaning |
|---|---|
| `category_key` | the listing's category, each of its parents, each parent it is surfaced under (guests, INC-246), and one "all categories" key |
| `place_key` | each place the listing is shown in (main place and extra places), each of their parents up to the country, and one "everywhere" key |
| `tier_rank` | the promotion tier's order (REQ-024; every listing is the same tier in v1) |
| `published_at` | newest first |
| `listing_id` | the listing |

Primary key and only index: `(category_key, place_key, tier_rank, published_at DESC, listing_id)`.

So "Vehicles in Addis Ababa", "Cars in Bole" or "everything everywhere" is **one ordered range read of one index**, whatever the catalogue's size: the database reads the first 20 entries of one range and stops.

Size, ESTIMATE: about 4 category keys × 4 place keys = 16 rows per listing; 100,000 listings → about 1.6 million rows, roughly 150–200 MB with the index. Small for Postgres.

Alternatives weighed and rejected:
- an `IN (branch ids)` list on `listings` — no single ordered read across the branch and the place;
- arrays of ancestors with a GIN index — filters fast, but cannot hand back the newest 20 in order without sorting all matches;
- a path column (ltree) — one parent per category only, so guests break it.

### 3.2 Keeping it right

- One function, `feed_index_refresh(listing_id)`, deletes and rewrites a listing's rows. It is called inside the existing write doors only — publish, edit of an active listing, every transition into or out of `active`, the expiry sweep, and a change of a listing's places — never from the browser.
- A change to the trees (a category moved, surfaced or retired; a place moved or retired) re-indexes the affected listings through a bounded background job that writes a completion heartbeat row (the ops invariant).
- A nightly check compares `feed_index` with `listings` (every active listing has its rows; no row for an inactive one) and reports counts only; a divergence is an incident.

### 3.3 The read door

- One database function, `feed_page(category, place, after, size)`, read-only. It returns at most 20 cards with only the fields a card shows (title, price, first photo's address, place name, published time) and a cursor for the next page. No seller identity beyond what the card already shows.
- Visitors read it through the server route `/api/feed`. It sends `Cache-Control: public, max-age=60, stale-while-revalidate=300` for a first page with no session (the INC-263 pattern), so popular pages are served from the edge for a minute.
- Paging continues after the last card seen (the cursor is `tier_rank, published_at, listing_id`), so page 50 costs what page 1 costs.
- The phone loads the next page only when the last card comes into view (REQ-029: no prefetch beyond the viewport).
- New public grants are named in `scripts/public-surface-allowlist.txt` with their reason (G39).

### 3.4 The widening ladder (REQ-005)

- When the reader's place is a city and the first page holds fewer than **8** listings (ESTIMATE threshold), the same call continues at the region, then the country, then everywhere.
- Each step is one more range read, and the answer names the step for the page's honest label: "No cars in Bole — showing Addis Ababa".
- Within a step: promoted first (REQ-024), then newest.

### 3.5 The pages and menus

- A subcategory's URL resolves through the whole tree (INC-504).
- The breadcrumbs show the path at every level.
- The menus of D98 link to the same pages.

## 4. Forward scan (§3) — later requirements this design must not block

| REQ | Effect on the design |
|---|---|
| REQ-005 | The ladder above. Its "nearest-first by distance within tiers" becomes "nearer step first, newest within a step" — an exact distance sort cannot use an ordered index. **Operator decision (b).** |
| REQ-023 | The home feed is `feed_page(all categories, reader's place)`. The self-learning category row reads its own aggregates, not this table. |
| REQ-024 | `tier_rank` is in the key, so promoted listings lead each step when paid tiers arrive — no rebuild. |
| REQ-025 | Search inherits the same ladder. Text match and the category's attribute filters (price range, make, model…) are added later as further conditions on the same ordered range, each with its own index. Not in this spec. |
| REQ-029 | 20 small cards per page, no prefetch beyond the viewport, the edge cache — within the < 5 s first-visit and < 5 MB-per-session budgets. |
| REQ-033 | `feed_index` holds no personal data (ids, keys, time), so it is part of the global public catalogue and is cacheable. |
| DEC-008 seam | Unchanged: the index points at listings; it does not move them. |

## 5. Speed targets — the decision rule, frozen before building (ESTIMATE bands for the operator to approve)

Measured on ethio-staging with **100,000 scratch active listings** (scratch categories with the real tree's fan-out — 15 tops, about 146 second-level, a few third-level, guests included — and scratch places in a scratch market). Rows are created by the test and removed after it (J3; no real rows).

| Target | Shape |
|---|---|
| ≤ 50 ms at p95 | Server time per page, each of six shapes: all/everywhere, top/country, leaf/city, top/city with widening, page 50 by cursor, a guest category |
| ≤ 30 KB | One page's payload |
| ≤ 100 ms | A cached first page's time to first byte |
| ≤ 1.5 s after the app shell | The first page visible on a slow-3G profile, indicative, measured locally |

A missed target revises the database design before any screen is built on it.

## 6. Tests

- **Correctness:** a top category shows its whole branch; a leaf shows only its own; a guest category appears under each of its parents; extra places and "everywhere" coverage; every status change removes or adds the rows; expiry; a moved category or place re-indexes; the ladder's steps and labels; a subcategory URL filters.
- **Security:** an anonymous reader sees only active listings; no personal field in the index or the cards; the new grants are on the allowlist.
- **Performance:** the six shapes above as a nightly job with the judge.

## 7. How it lands (ESTIMATE: three executor turns)

| Turn | What lands | Tier | Notes |
|---|---|---|---|
| E1 | `feed_index`, its key, `feed_index_refresh`, the backfill of today's active listings, the consistency check | A | One migration; proofs on scratch rows; the executor's tool applies it on ethio-prod, the operator's apply on ethio-staging (G39) |
| E2 | The write doors call the refresh; the tree-change re-index job; `feed_page`; `/api/feed` with its cache | A | A second migration and the route |
| E3 | The feed hook on `/api/feed` with cursor paging; subcategory URLs resolved; the breadcrumbs; the performance job | B | — |

The subcategory menus of D98 follow as the next screen turn.

## 8. Decisions for the operator

1. The speed targets of §5.
2. "Nearer step first, newest within a step" instead of an exact distance sort (REQ-005).
3. The widening threshold: fewer than 8 listings on the first page (ESTIMATE; tunable later).
4. 20 cards per page, the next page loaded as the last card comes into view.
5. Order: the feed engine goes next after bundle 9's version 10, ahead of the subcategory menus, the scroll area and the pattern console.
