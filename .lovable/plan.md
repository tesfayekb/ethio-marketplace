# Bundle 9 — area 1 census (public screens), part 1 of N

Base `1bbfc7dad` (HEAD verified with `git rev-parse`). No file changed except this plan. Projects in `playwright.config.ts:66-124`: mobile-360, desktop-1280, email-serial (360), webkit-1280, webkit-390. **No project runs at 768 px**, so every "768" case below is NONE.

The area is too large for one plan. This plan covers ONE whole screen: the feed (`/` and `/c/$slug`), which share one component. **Screens left:** `l.$slug`, `$name`, `legal.$kind`, `privacy`, `terms`, `legal.accept`, `legal.publishing`, and the shell (`app-shell.tsx`, 1,200 lines: header search, language, theme, sign-in, menu, rail, categories).

## Screen 1 — the feed: `src/routes/index.tsx` (36 lines) and `src/routes/c.$slug.tsx` (42 lines)

Both routes render `<Feed/>` under Suspense with `feed.loading` (index.tsx:26-34, c.$slug.tsx:26-34). Body: `src/components/marketplace/feed.tsx` (390 lines). Reads: `use-feed.ts:37` `callRoute(feedPath(...), { auth: "none" })` to `GET /api/feed` (`src/routes/api/feed.ts`).

Server refusals for `/api/feed`: shape errors 400 `badCategory|badPlace|badSize|badCursor` (api/feed.ts:150-162); `feed_page` refusals 404 `unknownCategory|unknownPlace` and 400 `badCursor|badSize` (api/feed.ts:54-61, 80-84); every other database error goes to `readFailure` (api/feed.ts:85). The browser treats every non-200 the same way: it returns null (use-feed.ts:38), and the screen shows the generic error.

| # | Control or event (key EN / AM, where) | What it must do | Cases that exist | Test today | Defect |
|---|---|---|---|---|---|
| 1 | Page heading, `nav.allListings` "All listings" / "ሁሉም ማስታወቂያዎች" (en-base:326, am-base:304); top row, feed.tsx:305-320 | No place chosen: shows All listings | works | e2e/feed-screens.spec.ts:660 FS-14 | none |
| 2 | Heading `feed.headingIn` "Listings in {location}" / "የ{location} ማስታወቂያዎች" (en-base:385, am-base:363); feed.tsx:310-316 | Place chosen: names the deepest place; only the place name is cut | works; 360/1280 | sage-cards.spec.ts:122, :319, :338 (one-line slot); FS-13 :612 | none |
| 3 | Favourite star, aria `shell.favouriteAdd` "Make favourite" / "ተወዳጅ አድርግ", `shell.favouriteRemove` "Remove favourite" / "ከተወዳጅ አስወግድ" (en-base:337-338, am-base:315-316); beside the heading on a category page only, feed.tsx:321-337 | Turns the device favourite on or off (`favourite.set`), with no server call | works; survives a reload | shell.spec.ts:4054 FV-1 (:4059, :4136-4139) | none |
| 4 | Favourite hint `shell.favouriteHint` / `shell.favouriteIs` (en-base:340-341, am-base:318-319); a tooltip with a mouse, small text without one, feed.tsx:339-350 | Explains the star | works; Amharic | shell.spec.ts:4320 FV-2; i18n-coverage.spec.ts:377 | none |
| 5 | Page Guide button (PageGuide, feed.tsx:354-369) | Opens the feed's Guide; next step is `/post` (feed.tsx:81) | not read in this turn | NOT READ | — |
| 6 | Unknown category address: `error.pageNotFound` / `error.pageNotFoundBody` (en-base:44-45, am-base:41-42); feed.tsx:196-205 | Shows not found and asks the feed nothing | works | feed-screens.spec.ts:359 FS-5 | none |
| 7 | The category lookup fails: `feed.errorTitle`, `feed.errorBody`, Retry `common.retry` (en-base:389-390, :35; am-base:367-368, :33); feed.tsx:206-208 | Retry calls `refreshPage` (INC-1140) | works | src/components/marketplace/feed.test.tsx:64 FD-U1 (unit). Browser: NONE | none |
| 8 | Loading spinner `feed.loading` "Loading listings…" / "ማስታወቂያዎች በመጫን ላይ…" (en-base:387, am-base:365); feed.tsx:209-214, :220-226 | Shown while the first read runs and the server's page is not held | works; slow network | use-feed.test.ts:171 UFS-5 (held page); spinner itself NONE | none |
| 9 | First read fails: FeedError `feed-error` with Retry `feed-retry`; feed.tsx:215-216 | Retry reads again, never the server's held page | works; 502; bad body (`{}`) | feed-screens.spec.ts:371 FS-6; use-feed.test.ts:129 UFS-4 | see D1 |
| 10 | Server refusal 404 `unknownPlace` (api/feed.ts:82) — a place the device keeps that no longer exists | — | refusal reaches the screen only as the generic error (use-feed.ts:38) | NONE | D1 |
| 11 | Server refusal 404 `unknownCategory` after the lookup found the category (race) | — | generic error | NONE | D1 |
| 12 | Refusals 400 `badCursor` / `badSize` / `badCategory` / `badPlace` (api/feed.ts:54-61, 150-162) | — | generic error | api: src/routes/api/feed.test.ts (ids not listed in this turn); screen NONE | none |
| 13 | Empty list: the invitation alone; feed.tsx:217-219; texts `feed.invite.*` (invite-card.tsx:30-37; e.g. `feed.invite.none` en-base:404, am-base:382) | Shows only the invitation card | works | feed-screens.spec.ts:507 FS-10, :723 FS-18 | none |
| 14 | Note `feed.emptyTitle` "Nothing here yet in your area" / "በአካባቢዎ እስካሁን ምንም የለም" (en-base:388, am-base:366); feed.tsx:231-235 | Shown when the first band is wider and there is no invitation | absent-case checks only | FS-3/FS-4 assert count 0 (:332, :353); shown case NONE | none |
| 15 | Band headings `feed-step-label` (`nav.allListings` / `feed.headingIn`); feed.tsx:238-260 | Each wider place is headed in its own name | works | FS-3 :278, FS-13 :612 | none |
| 16 | Invitation link `nav.postListing` "Post listing" / "ማስታወቂያ ይለጥፉ" (en-base:307, am-base:285); invite-card.tsx:55-63 | Goes to `/post` carrying place and category | works; 360 card size | FS-3 :278 (:326), shell.spec.ts:273, sage-tiers.spec.ts:756, FS-12 :577 (phones) | none |
| 17 | Listing card link (`listing-card-link`, listing-card.tsx:204-212); price `price.contact` (en-base:411, am-base:389) | Goes to `/l/$slug` | works | press.spec.ts:127; ad-page.spec.ts:196; listing-card.test.tsx | none |
| 18 | Next page on scroll (`feed-more`, feed.tsx:283-291; IntersectionObserver feed.tsx:147-158) | Loads 20 more when the end comes into view | works | FS-2 :163 (:197-199) | D3 |
| 19 | Next page fails: FeedError `feed-more-error` with Retry; feed.tsx:285-286 | Retry reads the next page again | — | NONE (`feed-more-error` appears in no test; rg in e2e and src) | D2 |
| 20 | Signed out / signed in | The read is `auth: "none"`; the place this browser chose stays after sign-out | signed out → kept place | FS-11 :532 | none |
| 21 | Sign-in ending mid-way | The feed does not depend on the session | — | NONE | none |
| 22 | Amharic page | All words above come from am-base | partly (row 4 only) | i18n-coverage.spec.ts:377 (hint only); the rest NONE | none |

**Browser tests that visit this screen:** feed-screens.spec.ts (FS-1…FS-18), shell.spec.ts (FV-1, FV-2, invitation rows), sage-cards, sage-tiers, sage-bands, sage-shell, press, ad-page:196, i18n-coverage:377, smoke-auth-i18n (rg `goto("/"`). **Sideways scrolling or clipped controls at 360 px: none of them checks.** The only page-level `documentElement.scrollWidth` checks are ad-page.spec.ts:976 and :2063, and house-style.spec.ts:68 (HS-1 on `/dev/style`).

## Summary (screen 1)

**Rows marked NONE:** 7 (browser), 8 (spinner), 10, 11, 12 (screen), 14 (shown case), 19, 21, 22 (all but the hint); 768 px for every row; the 360 px overflow check for the screen.

**Defects seen while reading:**
- D1: use-feed.ts:38 turns every non-200 into null, so 404 `unknownPlace` / `unknownCategory` (api/feed.ts:82) show "We couldn't load listings" with a Retry that can never succeed (feed.tsx:215-216). A kept place that has since been removed has no way out on this screen.
- D2: feed.tsx:286 renders the next-page Retry with no `retryTestid`, so the button has no test id (law C9: a new control gets one), and no test covers it.
- D3: feed.tsx:149: without IntersectionObserver no further page ever loads, and there is no button to press. This is a reading only; it affects old browsers.

**Could not read in this turn:** the Guide's controls (`page-guide.tsx`); the ids in `src/routes/api/feed.test.ts`; whether `smoke-auth-i18n.spec.ts` runs this screen in Amharic.

**Screens left for the next plan:** `l.$slug` (363 lines), `$name`, `legal.$kind`, `privacy`, `terms`, `legal.accept`, `legal.publishing`, the shell.
