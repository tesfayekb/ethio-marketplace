# INC-974 — the rail's category names in the first paint (plan)

Base: dev 34a89807. Tier B (shell, first paint). Held A2 items (a)–(c) are NOT in this turn; they land in the next build message as ruled.

## 1. The hypothesis — CONFIRMED, with one addition

- `src/components/shell/app-rail.tsx:516–519` — `CategoryNav` sets `isLoading = treeLoading || !glyphs.settled` and draws its skeleton while true. Both conditions hold.
- (1) The tree is a client read only. `src/features/categories/category-tree.ts:453–459`: `useSyncExternalStore(..., () => cache?.tree ?? EMPTY_TREE, () => EMPTY_TREE)` — the **server snapshot is always EMPTY_TREE**, and `isLoading` starts `cache === null` (true on every first load, server and client). The read starts in `useEffect` (:463) → `loadCategoryTree()` (:340) → `/api/categories/tree` (:276) after hydration. `firstReadLinks` (src/lib/first-reads.ts:66) preloads that address, which cuts the round trip but not the wait for hydration.
- (2) The glyph module: `src/components/shell/use-category-glyphs.ts:31–56` — `settled` is false until the `loadOnce` import of `category-glyphs` lands (or fails); the file's own header (:8–20) states the skeleton is held for it on purpose (D234 S1).
- Addition: the server **already reads the tree in-process** during the first flush, but only on `/c/<slug>` and only to find the category id: `src/server/first-screen.ts:86–102` (`answerOf(categoryTreeGet, …)`, the route's `versionCache` at `src/routes/api/categories.tree.ts:29`). The answer is discarded, not handed to the shell.
- So on a slow phone the blank rail lasts: HTML → JS download → hydration → tree read (preloaded, may be in hand) AND glyph chunk download. The "few seconds" is the JS + glyph chunk on slow 4G.

## 2. Consumers that wait on a client read for first paint (census, by the concern)

Waits for the tree (server snapshot EMPTY_TREE), first-paint visible:
- `src/components/shell/app-rail.tsx:516` CategoryNav (rail, strip, menu) — skeleton. **The concern.**
- `src/components/shell/app-rail.tsx:82` (rail's favourite/selected helper) — empty until read.
- `src/components/app-shell.tsx:566` — shell's selected-category facts.
- `src/components/shell/breadcrumbs.tsx:116`, `src/components/shell/ad-crumbs.tsx:15` — crumbs empty until read.
- `src/features/feed/use-feed.ts:255`, `src/components/marketplace/feed.tsx:148`, `src/components/marketplace/listing-card.tsx:46` — public listings pages (feed's first page already arrives via HeldFirstPage; category pictures/names wait on the tree).
Signed-in / staff (not first-paint of a public page; listed for K2, fixed for free by the same seed): `posting/wizard.tsx:226`, `my-listings-page.tsx:154`, `my-listing-page.tsx:177`, `admin-listings/listings-page.tsx:119`, `listing-page.tsx:134`, `admin-screening/screening-page.tsx:151`.
Glyph map: only `app-rail.tsx:518` holds first paint on it.

## 3. The change — on existing mechanisms, nothing new

A. The tree rides the server's first flush (G1, version-cached), on the S5 pattern:
- `src/server/first-screen.ts`: one exported `readFirstCategoryTree(request)` that calls the same `answerOf(categoryTreeGet, …)` (same versionCache, same deadline family as `FIRST_PAGE_DEADLINE_MS`), and `readFirstFeedPage` reuses its answer for the `/c/<slug>` lookup (one read, not two).
- `src/routes/__root.tsx` loader: on the server only, **awaited** (names must be in the first HTML, so it cannot stream like the feed) with its own short deadline; the result is the route's plain payload (`{ nodes, pointers, version }`, SSR-serializable) on `RootData.firstTree`, or null on failure/deadline (one `[first-screen]` line, never a rejection). Client navigations carry null.
- `src/features/categories/category-tree.ts`: one `seedCategoryTree(payload)` that parses through `parseCategoryTree` and sets `cache` only when `cache === null` (a held newer tree wins). The shell calls it from root loader data before the first render on both server and client (server: per-request snapshot via the hook's server-snapshot reading the seeded value from router context, never module state shared between requests). `isLoading` then starts false. INC-263's "every mount asks" stays: the effect still revalidates (a 304 on an unmoved version, same object → no re-render, I3).
- A failed/late server read → `firstTree: null` → today's behaviour exactly (skeleton, client read, then the error).

B. The glyphs stop holding the names hostage (register row 60, "a late part holds its box"):
- `app-rail.tsx`: `isLoading = treeLoading` only. Each row's glyph sits in its existing fixed-size icon box (`size-*` already on the icon slot; verified at build and made explicit if not), empty until the map lands, then filled. No row shifts. Strip variant (icons-only) draws the box plus its accessible name; its visible label is unchanged.
- `use-category-glyphs.ts`: header comment rewritten to the new contract; failure path unchanged (names kept, `reportOnDemandFailure` once, INC-911).
- `firstReadLinks`: the tree preload link is dropped when `firstTree` was handed over (the read is already in the HTML), kept otherwise.

## 4. First-download effect, per page class (lock-exact build, G60)

- JS: must not grow on any page; `category-glyphs` stays in PUBLIC_MUST_STAY_LAZY; check-bundle-size and `scripts/route-budgets.mjs` judge, no budget raised.
- HTML: grows by the tree payload once (dehydrated loader data) plus the drawn rail rows. The build measures, per page class (home, /c/<slug>, ad page, legal/static, signed-in shell, admin), the gzip HTML before/after from the lock-exact build and reports each against G60's tolerance; the tree's own gzip size is pasted. If any class exceeds tolerance → STOP with the numbers (option: hand over only the roots + first level).
- One fewer request on first visit (the preloaded tree fetch becomes a 304-able revalidation).

## 5. Measurement and tests

- Speed lab, slow-4G phone profile, first and repeat visit: time to the rail's first row via a dedicated mark (`data-rail-ready` on CategoryNav's list when its first row draws, beside `data-app-ready`), before and after, medians pasted. Computer profile once each.
- Unit (ids grep-checked free at build; proposed RFT-1…5):
  - RFT-1 server render of the shell with a seeded tree contains every root's name in rail, strip and menu markup, no skeleton.
  - RFT-2 glyphs unsettled → names drawn, icon boxes present at final size; settled → same box sizes (no shift).
  - RFT-3 glyph download fails → names kept, one on-demand report.
  - RFT-4 `firstTree: null` → skeleton then error, as today.
  - RFT-5 `seedCategoryTree` never replaces a held tree; per-request server snapshot never leaks between two requests.
- E2E (new spec `e2e/rail-first-paint.spec.ts`, both projects, whole file, 0 retries, via `bun run e2e:local`): with JS blocked on first response, the HTML already lists the category names (phone and desktop widths); with the glyph chunk delayed by route, the first row's bounding box is unchanged after it lands (CLS 0 for the rail). Route handlers through whilePageLives (CF-RG-1).
- Whole unit suite before the turn ends.

## 6. Conflicts

- AGENTS.md "speed": the listings feed is streamed unawaited; this tree is awaited. Justified: names-in-first-HTML is the concern, and the tree is a cached in-process read; a deadline bounds it. Stated as a DEC request for the supervisor (awaited first read in the root loader).
- D234 S1's comment ("rows never draw without their glyph") is superseded by row 60; record in docs/features (categories / speed) and _changelog.
- I5 (first-frame Supabase reads belong to the auth flow): not touched — the tree read is a public route in-process on the server, no browser Supabase call.
- Module-level `cache` must not be written on the server across requests (INC-788 one-store rule kept on the client; server reads via context). No other conflict found with the kit.

## 7. Estimate

Medium: 1 build turn, band 0.75–1.5 turns. Risk to the top of the band: the per-request server snapshot wiring and any page class landing over the HTML tolerance.
