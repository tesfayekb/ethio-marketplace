# Bundle 10 — the feed engine: brief, version 8 (saved unchanged, 2026-10-09)

```text
BUNDLE 10 — THE FEED ENGINE, VERSION 8 (2026-10-09). THIS FILE REPLACES VERSION 7. Turn 7 built Admin › Screening (E3a). Turn 8 fixed its three CI failures (INC-513, INC-514, INC-515). This version specifies TURN 9 = PART E3b, the listings pages read from /api/feed:
- the home page and every category page read one page of cards at a time from /api/feed, in D108's order, for the place the location row shows;
- the next page loads when the end of the list comes into view;
- when the page reaches beyond the chosen place, each wider place is named above its listings;
- a subcategory's address shows that subcategory (INC-504), and a top category's address shows its whole branch (INC-503);
- the breadcrumbs show the whole category path;
- two scanner warnings are fixed (INC-516, INC-517).
It is screens, tests and docs only: NO migration, no new message key (every word on the page uses a key that exists today in both languages), no package. Tier B.
Line numbers are as of commit b987d837 (dev). This file is public: it is written as build instructions.

ANSWERS TO TURN 7 AND TURN 8
- Turn 7 (326258b1), verified by diff:
  - the saved brief equals version 7;
  - the migration equals the tested text, with the mark 20261009200000;
  - the fifteen keys equal the brief's values in both files;
  - the section, the page, the read hook, SC-1 to SC-5, the route correction (E3a.6), the selector area and the docs are as specified.
  Two departures are accepted: src/features/admin/rail-items.ts (the section's icon), and the inline status line in place of a toast.
- Turn 8 (b987d837), verified by diff:
  - exactly the eight files of the ruling;
  - both locale files byte-equal to prettier 3.8.3's output;
  - the spec's twin functions as ruled;
  - the section opens with listings:review (DEC-163).
  CI green on b987d837 (run 37901886344, promoted: main = dev). Part E3a is CLEAN.

WHAT THE PAGES DO (D99, D101, D108)
- "/" shows every category. "/c/<slug>" shows that category's whole branch: its own listings and every listing in a category below it. Sellers post in last-level categories, so a top category shows its subcategories' listings.
- Every page is for the place the location row shows: the last place of the shell's path (country, region, city or sub-city). With no place, the page is "everywhere".
- The order is the server's (D108): premium, then featured, then regular, newest first inside each. The browser never re-sorts.
- The server widens the place when the chosen place holds fewer than 8 listings: first the chosen place, then each wider place, then everywhere. Each listing appears once, under the narrowest place that holds it; each card carries that place's step.
- 20 cards per page. The next page loads only when the end of the list comes into view (REQ-029: nothing is loaded beyond what is in view).

STEP 0 — keep this brief
- Save this file byte for byte OVER docs/governance/briefs/bundle-10.md (it is already in its saved form). roadmap.md line 3 stays as it is. Tick no roadmap line. On every later turn, read the brief first.

HOW TO WORK
- Order of the turn:
  1. step 0;
  2. E3b.0, the read-only census. If any result differs from what it expects, STOP and report: write nothing else;
  3. E3b.1 to E3b.9;
  4. the checks;
  5. the report;
  6. END THE TURN.
  Do not stop between steps.
- The turn starts by reading CI for the last commit on dev:
  - read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md;
  - then e2e-last-failure.md and guards-last-failure.md at the same address;
  - paste the first six lines of ci-status.md.
  You cannot git-fetch that branch. A red there is fixed first.
- This turn has NO migration and writes nothing to any database. If any step seems to need one, STOP and say why.
- Browser tests: try once (`bun run e2e:local e2e/feed-screens.spec.ts`). If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506). Nothing runs against ethio-prod or the published site.
- Tests (G38):
  - no assertion loosened, no timeout raised, no retry added;
  - a test this brief does not name is not edited;
  - tests create their own scratch rows and remove them in afterEach (J3);
  - no test attaches a listing to a real place, and no test changes a real row.
- No package or dependency change. No new message key and no literal text on a page: every word comes from a key that exists today in both src/i18n/locales/en.ts and src/i18n/locales/am.ts (the list is in E3b.4).
- Scope — these files only:
  - src/features/feed/feed-page.ts (new), src/features/feed/feed-page.test.ts (new);
  - src/features/feed/use-feed.ts, src/features/feed/ranking.ts;
  - src/components/marketplace/feed.tsx, src/components/marketplace/listing-card.tsx;
  - src/components/app-shell.tsx (the category lookup only), src/components/shell-context.ts (one field);
  - src/components/shell/breadcrumbs.tsx (the category path only);
  - src/features/admin-screening/screening-page.tsx (E3b.9, two lines);
  - scripts/list-action-labels.ts (E3b.9, closeTag only);
  - e2e/feed-screens.spec.ts (new);
  - e2e/shell.spec.ts (one line, E3b.7);
  - e2e/post-wizard-pricing.spec.ts (PW-94 only, E3b.7);
  - scripts/e2e-select.ts (the feed area);
  - docs/features/feed-engine.md, docs/_changelog.md;
  - the brief.
  The platform may regenerate src/integrations/supabase/types.ts and src/routeTree.gen.ts, and the i18n map guard may regenerate the two usage maps (A6). That is allowed; name it in the report. Name any other file in the report's first lines, with its reason. Delete no file.
- Closed surfaces (G22): the workflow files, the failure reporter, scripts/check-migrations.sh, the e2e helpers and e2e/global-setup.ts are not touched. Shared UI blocks are used as they are; none changes its default.
- Checks before the turn ends. Run each one whole, as CI runs it, and paste the last line of each:
  - `bun run typecheck`
  - `bun run format:check`
  - `bun run lint`
  - `bun run test:unit`
  - `bun run i18n:map-guard`
  - `bun run scripts/e2e-select.ts --self-test`
  - `bun run scripts/check-root-routes.ts --self-test && bun run scripts/check-root-routes.ts`
  - `bun run build`

PART E3b — THE LISTINGS PAGES

E3b.0 — THE CENSUS (read-only; paste each result):
- (a) `grep -n "useCategories\|categoriesLoading\|selectedCategoryId" src/components/app-shell.tsx` → lines 32, 355, 356, 364, 570, 590.
- (b) `grep -rln "rankListings\|TIER_RANK\|RankableListing\|LocationScope" src e2e` → exactly src/features/feed/ranking.ts and src/features/feed/use-feed.ts.
- (c) `grep -rn "listing-card\|feed-empty\|rest/v1/listings" e2e --include=*.ts` → nine lines: e2e/shell.spec.ts :183, :195, :402, :419, :436, :466, :475, :539 and e2e/post-wizard-pricing.spec.ts :458.
- (d) Each of these keys appears exactly once in en.ts and once in am.ts: feed.heading, feed.scopeAll, feed.loading, feed.emptyTitle, feed.emptyBody, feed.errorTitle, feed.errorBody, common.retry, nav.allListings, error.pageNotFound, error.pageNotFoundBody.
- (e) `grep -n "const confirm\|void confirm()" src/features/admin-screening/screening-page.tsx` → :140 and :263.

E3b.1 — THE ANSWER AND ITS SECTIONS: src/features/feed/feed-page.ts (new). Pure functions, no React, no fetch.
- `export const EVERYWHERE = "00000000-0000-0000-0000-000000000000";` — the ladder's "everywhere" step.
- `export interface FeedListing` — one card, exactly the fields /api/feed returns:
  - id: string; title: string; tier: ListingTier;
  - priceAmount: number | null; priceCurrency: string | null; priceMode: string; priceBp: number | null; priceNegotiable: boolean; pricePeriod: string; priceUnit: string | null; priceUnitText: string | null; photosSoon: boolean;
  - publishedAt: string; categoryId: string;
  - locationId: string | null; locationNameEn: string | null; locationNameAm: string | null;
  - step: number.
  No viewCount (E3b.5).
- `export interface FeedPage { cards: FeedListing[]; ladder: string[]; next: string | null }`.
- `export function parseFeedPage(value: unknown): FeedPage | null` checks every field's type exactly and answers null on any mismatch (F4: a malformed answer is a failure, never an empty page). Rules:
  - value is an object;
  - `cards` is an array, `steps` is an array (it is not kept), `ladder` is a non-empty array of strings;
  - `next` is a string or null;
  - each card has every field above with its type;
  - tier is "premium", "featured" or "regular";
  - step is an integer from 1 to ladder.length.
  Never a default for a missing or wrong field.
- `export type FeedSectionLabel = { kind: "place"; placeId: string } | { kind: "all" } | null;`
- `export interface FeedSection { step: number; label: FeedSectionLabel; cards: FeedListing[] }`.
- `export function feedSections(cards: FeedListing[], ladder: string[]): FeedSection[]`. Consecutive cards with the same step form one section, in the order received. Its label is:
  - null for step 1 (the page's heading names the chosen place);
  - `{ kind: "all" }` when ladder[step - 1] is EVERYWHERE;
  - otherwise `{ kind: "place", placeId: ladder[step - 1] }`.
  An empty list gives [].
- ListingTier is imported from ./ranking.

E3b.2 — THE HOOK: src/features/feed/use-feed.ts and src/features/feed/ranking.ts.
- `useFeed({ categoryId, placeId, enabled })` replaces the old hook. It reads `/api/feed` (same origin, GET):
  - with `category=<categoryId>` when categoryId is not null;
  - with `place=<placeId>` when placeId is not null;
  - with no `size` (the route's 20).
  It never reads `listings` directly and never sorts.
- What it returns:
  - `cards`: every page so far, in the order received;
  - `ladder`: from the first page;
  - `hasMore`: true when the last page's `next` is not null;
  - `isLoading`: the first page;
  - `isLoadingMore`;
  - `error`: the first page failed;
  - `moreError`: a later page failed;
  - `loadMore()`, `retry()`.
- A failure — any of these is an error (or moreError), never an empty page (F4):
  - a response that is not 200;
  - a fetch that throws;
  - a body that parseFeedPage refuses.
- `loadMore()`: when hasMore and nothing is loading and moreError is false, fetch with `after=<next>` and append the cards. `retry()` repeats the request that failed (the first page, or the next page).
- Starting over: a change of categoryId, placeId or enabled clears the cards, sets isLoading, and ignores any answer to an earlier request.
- While enabled is false: isLoading stays true and no request is made (INC-282).
- `export type { FeedListing } from "./feed-page";` so src/components/marketplace/listing-card.tsx keeps its import path.
- useCategories and FeedCategory (use-feed.ts :181–217) stay exactly as they are; the rail (src/components/shell/app-rail.tsx :23) still uses them.
- src/features/feed/ranking.ts keeps only `export type ListingTier = "premium" | "featured" | "regular";`. Its comment becomes two lines: the order is the server's (D108, feed_page); the browser never sorts. Remove rankListings, TIER_RANK, RankableListing, LocationScope and RankingContext.

E3b.3 — THE CATEGORY LOOKUP (INC-504): src/components/app-shell.tsx :352–364 and src/components/shell-context.ts.
- The slug resolves through the WHOLE tree. Use `useCategoryTree()` (src/features/categories/category-tree.ts :400) in place of `useCategories()` (:355), and find the node with `tree.nodes.find((node) => node.slug === selectedCategorySlug)`.
- `selectedCategoryId` stays: the found node's id, else null.
- A new ShellValue field after selectedCategoryId: `categoryLookup: "none" | "pending" | "found" | "missing" | "failed"`. The cases, checked in this order:
  - "none": no slug;
  - "found": the node is in the tree;
  - "pending": the tree is loading;
  - "failed": the tree read failed (its `error`);
  - "missing": otherwise.
  Add it to the value object (:569–571) and to its dependency list (:589–591).
- feedInputsReady (:363–364) reads the tree's isLoading in place of categoriesLoading. Nothing else in the expression changes.
- Remove the useCategories import (:32) if nothing else in the file uses it. Nothing else in app-shell.tsx changes.

E3b.4 — THE PAGE: src/components/marketplace/feed.tsx (rewritten).
- Read selectedCategoryId, categoryLookup, locationPath and feedInputsReady from useShell(). placeId is the id of the last node of locationPath, or null.
- Call `useFeed({ categoryId: selectedCategoryId, placeId, enabled: feedInputsReady && (categoryLookup === "none" || categoryLookup === "found") })`.
- The heading h1 is t("feed.heading") with {location} replaced by:
  - the chosen place's name: `entityName("location", { id, nameEn: name_en, nameAm: name_am }, entities)` of the last node of locationPath;
  - or t("feed.scopeAll") when there is no place (today's text).
- What the page shows, in this order of cases:
  - categoryLookup "missing": a PageCard `feed-category-unknown` with an h2 t("error.pageNotFound") and a paragraph t("error.pageNotFoundBody"). No feed request.
  - categoryLookup "failed": today's error block (role alert, h2 t("feed.errorTitle"), paragraph t("feed.errorBody")) with testid `feed-category-failed`. Its Retry button (t("common.retry")) reloads the page with `window.location.reload()`. No feed request.
  - First page loading: today's spinner, t("feed.loading").
  - First page failed: today's error block with testid `feed-error`. Its Retry button, testid `feed-retry`, calls the hook's retry.
  - No cards at all: today's empty state, unchanged (`feed-empty`, t("feed.emptyTitle"), t("feed.emptyBody")).
  - Cards: see the next bullets.
- One `<section data-testid="feed-section" data-step="<n>">` per entry of feedSections(cards, ladder).
- A section with a label starts with an h2 `feed-step-label`:
  - kind "all": t("nav.allListings");
  - kind "place": t("feed.heading") with {location} = that place's name, the node of locationPath with that id, named as the heading names its place;
  - a place id that is not in locationPath: the section has no h2. Never a made-up name.
- Each section's cards sit in a `<ul>` with today's classes exactly (`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`), each card in an `<li>`. e2e/shell.spec.ts :532–564 measures `main ul.grid` and `main ul > li`.
- When cards exist and the first card's step is above 1 (nothing in the chosen place), a paragraph `feed-step-none` with t("feed.emptyTitle") sits under the h1, before the first section.
- When hasMore, a `<div data-testid="feed-more">` (at least 44 px tall) follows the sections:
  - An IntersectionObserver on it, created in an effect with rootMargin "0px", calls loadMore when it comes into view. The effect disconnects the observer on unmount and whenever its inputs change. The server render has no observer.
  - While the next page loads, the div holds today's Spinner with t("feed.loading").
  - A failed next page shows today's error block inside the div, with testid `feed-more-error`. The cards are kept, and its Retry button calls the hook's retry.
  The supervisor tried this pattern in Chromium (20 cards, the 44 px div, rootMargin 0px): nothing loaded before the div was in view, and one load followed when it was scrolled into view.
- Keep `data-testid="feed-container"` and its `data-ready` attribute exactly as they are (the INC-282 tests read them).
- The words used, all existing in both files: feed.heading, feed.scopeAll, feed.loading, feed.emptyTitle, feed.emptyBody, feed.errorTitle, feed.errorBody, common.retry, nav.allListings, error.pageNotFound, error.pageNotFoundBody.

E3b.5 — THE CARD: src/components/marketplace/listing-card.tsx.
- Remove the views line (:111–115) and the `Eye` import (:2). The count was always 0, because nothing tracks views; a number the app cannot know is not printed (DEC-165). The `feed.views` key stays in the locale files.
- Nothing else in the card changes.

E3b.6 — THE BREADCRUMBS: src/components/shell/breadcrumbs.tsx (:17, :44, :48–49 and :237–259).
- The path is `pathOf(tree, node.id)` (src/features/categories/category-tree.ts :346), with tree from `useCategoryTree()` and node the one whose slug equals selectedCategorySlug. A subcategory shows Home › <parent> › … › <itself>; a category with several parents follows its first parent (the tree's parentOf).
- The current (last) segment keeps `breadcrumb-category` (a BreadcrumbPage, as today). Every earlier segment is a Link to /c/<its slug> with testid `breadcrumb-category-parent`.
- Replace the comment at :30–32 to say so. Nothing else in the file changes.

E3b.7 — THE TESTS.
- (a) e2e/feed-screens.spec.ts (new), `test.describe("FEED SCREENS", …)`.
  - Imports:
    - `expect`, `test` from ./fixtures;
    - `en` from ../src/i18n/locales/en;
    - `adminClient` from ./helpers/users;
    - `anchorOf`, `destroyLocation`, `scratchSlug`, `seedScratchChain`, `waitForTreeSlug` from ./helpers/locations;
    - `destroyCategoryBranch`, `destroyListingsOf`, `leaseSeller`, `rand`, `RUN`, `scratchCategorySlug`, `seedCategoryBranch` from ./helpers/posting;
    - `gotoReady` from ./helpers/ui.
  - Cleanup: in afterEach, in this order (as e2e/feed-route.spec.ts :48–52 does):
    1. destroyListingsOf(seller id);
    2. destroyLocation(region slug) for each scratch chain;
    3. destroyCategoryBranch(slugs).
  - `addListing(categoryId, sellerId, placeId, tier, minutesAgo)`: as e2e/feed-route.spec.ts :84–107 does (status "active", tier, published_at = now minus minutesAgo minutes, home_country_code "ET", title `e2e-feed-${RUN}-${rand()}`). FS-2 inserts its 25 rows in ONE insert of an array.
  - Every listing's place is a scratch place from seedScratchChain("ET"), never a real place.
  - `addLeaf(parentId)`: inserts a category and its pointer, as seedCategoryBranch does (e2e/helpers/posting.ts :390–411):
    - slug scratchCategorySlug(), name_en the slug, is_active true, allow_listings true, is_catchall false, display_order 9102;
    - the pointer: parent_id, child_id, display_order 2.
    Its slug joins the branch's list for cleanup.
  - `cardIds(page)`: the data-listing values of `[data-testid="listing-card"]`, in page order.
  - `feedCalls`: urls of requests whose pathname is /api/feed, collected with page.on("request").
  - Test FS-1 "a subcategory shows its own listings; its parent shows the whole branch" (INC-503, INC-504):
    - setup: seedCategoryBranch() gives parent P and leaf L1; addLeaf(P.id) gives L2; one regular listing in L1 (5 minutes ago) and one in L2 (10 minutes ago); no area cookie (the page is everywhere);
    - gotoReady `/c/${L1.slug}`: cardIds equals [L1's] (expect.poll);
    - `breadcrumb-category-parent` has text P.slug, and `breadcrumb-category` has text L1.slug;
    - click `breadcrumb-category-parent`: the URL ends `/c/${P.slug}`, and cardIds equals [L1's, L2's];
    - gotoReady `/c/${L2.slug}`: cardIds equals [L2's].
  - Test FS-2 "20 per page in D108's order; the next page loads only when the end comes into view":
    - setup: one leaf L; 25 listings at a scratch city: rows 1–2 premium, 3–5 featured, 6–25 regular, minutesAgo 1–25 in that order;
    - expected order: tier first (premium, featured, regular), then newest;
    - gotoReady `/c/${L.slug}`: cardIds equals the first 20 expected (expect.poll), and no feed call so far carries `after`;
    - scroll `feed-more` into view: cardIds equals all 25 (expect.poll); `feed-more` has count 0; exactly one feed call carries `after`.
  - Shared setup for FS-3 and FS-4 ("the area fixture"):
    - leaf L; chain A = seedScratchChain("ET"), plus a second sub-city under chain A's city (level "sub_city", country_code "ET", slug scratchSlug("fs-sub"), name_en the slug, is_active true, source "admin", center_lat 9.03, center_lng 38.74). With two sub-cities the shell's path stops at the city (autoExtendPath, src/components/shell/location-data.ts :332–343);
    - chain B = seedScratchChain("ET");
    - waitForTreeSlug(page, "ET", <the second sub-city's slug>);
    - add the cookie `ethio_area` = `ET:${chainA.city.id}`, as e2e/shell.spec.ts :2549–2557 does;
    - gotoReady `/c/${L.slug}`.
    The ladder is then [city A, region A, Ethiopia, everywhere]; Ethiopia is step 3. Read Ethiopia's English name with anchorOf("ET").name_en.
  - Test FS-3 "the page reaches beyond the chosen place and names the wider place":
    - setup: two regular listings at chain A's city (1 and 2 minutes ago) and three at chain B's city (3, 4 and 5 minutes ago);
    - the h1 equals en["feed.heading"] with {location} = chainA.city.name_en;
    - `[data-testid="feed-section"][data-step="1"]`: its cards are A's two, newest first, and it has no `feed-step-label`;
    - exactly one `feed-step-label` on the page, its text en["feed.heading"] with {location} = Ethiopia's name; it sits in the section with data-step "3", whose cards are B's three, newest first;
    - `feed-step-none` has count 0.
  - Test FS-4 "nothing in the chosen place: the note, then the wider place": the same fixture, with no listing at chain A and three at chain B. `feed-step-none` is visible with en["feed.emptyTitle"]; no section has data-step "1"; the section with data-step "3" holds B's three under its label.
  - Test FS-5 "an address nobody has shows not found and asks the feed nothing":
    - gotoReady `/c/e2e-none-${rand()}`;
    - `feed-category-unknown` is visible and holds en["error.pageNotFound"] and en["error.pageNotFoundBody"];
    - `feed-empty` has count 0 and feedCalls is empty.
  - Test FS-6 "a failed read is shown, and Retry recovers":
    - setup: leaf L with one listing at a scratch city; page.route("**/api/feed*") answers:
      1. the first call: status 502, body {"error":"internal error"};
      2. the second call: status 200 with body {} (a malformed answer);
      3. later calls: route.continue();
    - gotoReady `/c/${L.slug}`: `feed-error` is visible with en["feed.errorTitle"];
    - click `feed-retry`: `feed-error` is still visible (the malformed answer is a failure, F4);
    - click `feed-retry`: the listing's card is visible and `feed-error` has count 0.
- (b) e2e/shell.spec.ts :475: the spinner test holds the feed's read, which is now /api/feed. Change `"**/rest/v1/listings*"` to `"**/api/feed*"`. Nothing else in the test changes.
- (c) e2e/post-wizard-pricing.spec.ts PW-94 (:442–462): the existing `.update({ … })` (:448–453) also sets `published_at: new Date().toISOString()`. The feed shows only listings with a publish time, which every door stamps (feed_index_refresh skips an active listing without one).
- (d) src/features/feed/feed-page.test.ts (vitest):
  - FP-1: a valid page with two cards, a two-step ladder and next "abc" is parsed to the same values.
  - FP-2: null for a page without `cards`, and for one whose ladder is empty.
  - FP-3: null for a card whose tier is "gold", whose step is 0, whose step is above ladder.length, or whose priceAmount is the string "5".
  - FP-4: null when next is 5.
  - FP-5: cards with steps 1, 1, 3, 3, 4 and the ladder [A, B, C, EVERYWHERE] give three sections:
    - step 1, label null, 2 cards;
    - step 3, label { kind: "place", placeId: C }, 2 cards;
    - step 4, label { kind: "all" }, 1 card.
  - FP-6: an empty list gives [].
- (e) Read, not edited — these reach the changed code and must stay green:
  - e2e/shell.spec.ts: the empty state, the gutters, INC-282, the grid reflow, the breadcrumb segments, the Amharic heading and the vertical stack;
  - e2e/category-nav.spec.ts;
  - e2e/admin-translations-governance.spec.ts :688 (the heading with no area);
  - e2e/phone-frame.spec.ts :55;
  - e2e/smoke-auth-i18n.spec.ts :29;
  - e2e/feed-route.spec.ts and e2e/feed-index.spec.ts.

E3b.8 — THE SELECTOR AND THE DOCS.
- scripts/e2e-select.ts :166–169, the area "feed":
  - src gains "src/components/marketplace/**", "src/components/app-shell.tsx" and "src/components/shell/breadcrumbs.tsx";
  - specs gain "e2e/feed-screens.spec.ts", "e2e/shell.spec.ts" and "e2e/post-wizard-pricing.spec.ts".
  Run the self-test.
- docs/features/feed-engine.md:
  - "## What it does not do yet" with its line "E3 adds the screens." becomes "## What E3b built": the pages and the hook, the sections and their labels, paging, not found, the breadcrumbs, and the card without a views count.
  - A new "## What it does not do yet": the performance judge (E3c); the rail's highlight and the subcategory menus (D98); the place kept on the account and the "different place" notice (D106, D107).
  - The tests line gains FS-1..FS-6 and FP-1..FP-6.
- docs/_changelog.md: one line.

E3b.9 — TWO SCANNER WARNINGS (code scanning, Semgrep OSS).
- INC-516 (#417, javascript-confirm): src/features/admin-screening/screening-page.tsx. The page's own function is named `confirm` (:140, called at :263); the scanner reads it as the browser's confirm. Rename it to `decide` at both lines. Nothing else changes.
- INC-517 (#416, detect-non-literal-regexp): scripts/list-action-labels.ts :106–108, closeTag. `tag` is only ever a key of TAG_KIND (:52–70) or "Link" (:204–205). Make that a rule in the function, and mark the reviewed site as scripts/e2e-select.ts :216–217 does:
  - first line of the body: `if (!/^[A-Za-z]+$/.test(tag)) return -1;`
  - directly above the `new RegExp` line, these two comment lines, exactly:
      // Reviewed (DEC-153): tag is letters only (checked above): a TAG_KIND key or "Link".
      // nosemgrep: detect-non-literal-regexp
  Nothing else in the script changes; scripts/list-action-labels.test.ts must stay green.

NAMED FOR THE NEXT VERSIONS (not specified here; build none of it)
- E3c — the performance judge of the spec's §5 (D101): 100,000 scratch listings on ethio-staging; six shapes; p95 server time ≤ 50 ms; ≤ 30 KB per page. A nightly job, with its own DEC (G22).
- Bundle 10's walk, one, at the bundle's close: the listings pages with the ads the operator approves on Admin › Screening.
- Then D106 and D107: the chosen place kept on the account, and the amber "different place" notice.

REPORT (one, at the end).
First lines:
- done or not done, for step 0 and E3b.0 to E3b.9;
- E3b.0's results;
- whether the browser started;
- any cited line that read differently;
- any file outside the lists, with its reason.
Then:
- the last line of each check;
- the six ci-status lines;
- the file list from `git diff --name-only b987d837` (untracked new files listed by name);
- "Logs read: … · unavailable: …".
Never "CI green" from a local run. END THE TURN after the report.
```
