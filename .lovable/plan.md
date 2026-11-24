# Bundle 9 — area 1 census (public screens), parts 1–3

Base `1bbfc7dad` (HEAD verified with `git rev-parse`). No file changed except this plan. Projects in `playwright.config.ts:66-124`: mobile-360, desktop-1280, email-serial (360), webkit-1280, webkit-390. **No project runs at 768 px.** A 768 case exists only where a test resizes the window itself.

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

**Browser tests that visit this screen:** feed-screens.spec.ts (FS-1…FS-18), shell.spec.ts (FV-1, FV-2, invitation rows), sage-cards, sage-tiers, sage-bands, sage-shell, press, ad-page:196, i18n-coverage:377, smoke-auth-i18n. **Sideways scrolling at 360 px (corrected):** two tests in shell.spec.ts measure `document.documentElement.scrollWidth` on the feed. (a) :1712 "location row is present on Marketplace and absent on Account". It signs in and opens `/` (:1716), then measures at the project's width (:1731-:1736). It then sets 360, 768 and 1280 × 900 and measures the panel tabs row and the page at each width (:1738-:1745). This is the screen's only check at 768. It runs signed in on the Marketplace panel. (b) The test that starts at :2719 ("long location names share one band row line"; `test.skip` unless the width is 360, :2720). It opens `/` (:2735), measures the page at 360 (:2750), then at 320 × 800 (:2791, measured at :2802). Neither checks for clipped controls on the feed's cards, invitation or Retry. Both run only with no category; no test measures `/c/$slug`.

## Summary (screen 1)

**Rows marked NONE:** 7 (browser), 8 (spinner), 10, 11, 12 (screen), 14 (shown case), 19, 21, 22 (all but the hint); 768 px for every row; 768 px for every row except the page width (shell.spec.ts:1738); no 360 px overflow check on `/c/$slug`.

**Defects seen while reading:**
- D1: use-feed.ts:38 turns every non-200 into null, so 404 `unknownPlace` / `unknownCategory` (api/feed.ts:82) show "We couldn't load listings" with a Retry that can never succeed (feed.tsx:215-216). A kept place that has since been removed has no way out on this screen.
- D2: feed.tsx:286 renders the next-page Retry with no `retryTestid`, so the button has no test id (law C9: a new control gets one), and no test covers it.
- D3: feed.tsx:149: without IntersectionObserver no further page ever loads, and there is no button to press. This is a reading only; it affects old browsers.

**Could not read in this turn:** the Guide's controls (`page-guide.tsx`); the ids in `src/routes/api/feed.test.ts`; whether `smoke-auth-i18n.spec.ts` runs this screen in Amharic.

Part 2 below covers screens 2 to 5; part 3 covers screen 6, the shell.

---

## Screen 2 — the ad page: `src/routes/l.$slug.tsx` (363 lines)

The page reads `readAdPage` on the server (l.$slug.tsx:38). A changed address redirects with 301 (:49); a gone ad draws `ad-page-gone` (:98-106). The body is `ListingDetail` (src/features/posting/preview/listing-detail.tsx). Buyer doors (browser `rpc` through supabase-door): `save_listing` / `unsave_listing` (save.ts:25), `listing_viewer_state` (save.ts:72), `reveal_listing_contact` (contact.ts:41), `report_listing` (report.ts:26). Counting: `/api/listings/view` and `/api/listings/share` (count-view.ts:25, :38). Words families: ad-page-refusals.ts:11-35.

Door refusals from SQL:
- save: `listingNotAvailable`, `ownListing` (migration 20261117040400:50, :58, :61); the dial through `door_refused(...,'save')` (:72).
- report: `listingNotAvailable`, `badReason`, `noteTooLong`, `ownListing`, `alreadyReported` (20261117040500:44-63); dial (:70).
- contact: `listingNotAvailable`, `acceptanceRequired` (20261117040600:50-62); dials `contact_reveal_sellers` / `contact_reveal` (:76, :125).

| # | Control or event (key EN / AM; place) | What it must do | Cases that exist | Test today | Defect |
|---|---|---|---|---|---|
| 1 | Gone page: `adPage.gone.title` "This ad is no longer available" / "ይህ ማስታወቂያ ከእንግዲህ አይገኝም" (en-base:260, am-base:241); link `adPage.gone.home` "Back to Home" / "ወደ መነሻ ተመለስ" (en:263, am:243); l.$slug.tsx:98-106 | Link to `/` | works | ad-page.spec.ts:133 AP-11 | none |
| 2 | Photo gallery: main photo, previous/next, thumbnails, viewer (photo-gallery.tsx:142-429) | Changes the photo; opens the full viewer | works; 360/1280 | AP-9 :74-79; AP-56 :1630-1635; photo-pipeline PP-22 :1251; dialogs.spec :580 | none |
| 3 | Save `adPage.save.add` "Save" / "አስቀምጥ" ↔ `adPage.save.saved` "Saved" / "ተቀምጧል" (en:207/256, am:188/237); action row, listing-detail.tsx:919-956 | Saves or unsaves (l.$slug.tsx:158-174) and updates the count `adPage.save.count` (:964) | works; signed in/out; owner sees no Save | AP-26 :503; SAVE-1…4 save.test.ts:11-54 | none |
| 4 | Save signed out: Link with label `adPage.save.signIn` "Sign in to save this ad" / "ይህን ማስታወቂያ ለማስቀመጥ ይግቡ" (en:209, am:190) to `/auth?return=…#save` (l.$slug.tsx:325) | After sign-in, saves once (save-intent, l.$slug.tsx:176-195) | sign-in mid-way | AP-26; SAI-1…SAI-9 save-intent.test.ts:7-34 | none |
| 5 | Save refusal `listing-save-refusal` (listing-detail.tsx:797-804): `adPage.save.rateLimited` / `…rateLimitedWhen`, `adPage.save.failed` "The ad could not be saved — try again." (en:211-212, am:192-193) | Shows the reason | rateLimited, failed | words: RTW-15 ad-page-refusals.test.ts:125; screen NONE | D4 |
| 6 | Contact signed out: `adPage.contact.link` "Contact seller" / "ሻጩን ያግኙ" (en:206, am:187), listing-detail.tsx:1453 | Goes to sign in and remembers the reveal intent (l.$slug.tsx:344) | sign-in mid-way | AP-9 :91; AP-23 :422; RI-1…RI-5 reveal-intent.test.ts | none |
| 7 | Show contact `adPage.contact.show` "Show contact" / "ግንኙነት አሳይ" (en:200, am:181), listing-detail.tsx:1482 | Calls `reveal_listing_contact` and lists phone / Telegram / WhatsApp (`post.who.channel.*`) | works | AP-23 :445; doors AP-20 :381, AP-21 :458, AP-22 :545 | none |
| 8 | Contact refusal `listing-contact-refusal` (listing-detail.tsx:1534-1540): `adPage.contact.sellersCap`, `adPage.contact.rateLimited` (+When), `adPage.contact.failed` (en:201-204, am:182-185) | Shows the reason | caps; failed | words RTW-17 :137; doors AP-21/22 (SQL answer); **screen NONE** | D4 |
| 9 | Contact `acceptanceRequired` (SQL :62) | `certifyRefusal` sends the person to accept (l.$slug.tsx:225-227) | — | NONE | none |
| 10 | Share `adPage.share.open` "Share" / "አጋራ" (en:232, am:213), share-ad.tsx:56 | Opens the dialog: Telegram, WhatsApp, Facebook, Copy link `adPage.share.copy`, QR `adPage.share.qr`, More apps `adPage.share.more` (share-ad-dialog.tsx:89-184); each one is counted | works | AP-30 :666-679; DLG-E7 dialogs:398; AP-57 :1650 (QR); share-ad.test.tsx | none |
| 11 | QR download `listing-share-qr-download` (share-ad-dialog.tsx:163) | Downloads the QR | — | NONE | none |
| 12 | Copy failed / status `listing-share-status` (share-ad-dialog.tsx:131) | Says copied, or that it could not | — | MLP-8 my-listings-page:873 (copy only); failure NONE | none |
| 13 | Report signed out: `adPage.report.open` "Report this ad" / "ማስታወቂያውን ሪፖርት አድርግ" (en:214, am:195), report-ad.tsx:32 | To `/auth?return=…#report` | sign-in mid-way | AP-29 :581 | none |
| 14 | Report dialog: reasons, note `adPage.report.note`, Send `adPage.report.send` "Send report" / "ሪፖርቱን ላክ" (en:226, am:207); report-ad-dialog.tsx:95-175 | Calls `report_listing` once | works; empty reason → Send disabled | AP-29 :597-602; KRA-1…3 report-ad.test.tsx:117-148; doors AP-27 :798 | none |
| 15 | Report refusals `listing-report-status`: `adPage.report.already`, `…rateLimited` (+When), `…failed` (en:228-231, am:209-212); `badReason` / `noteTooLong` → generic (ad-page-refusals.ts:69-75) | Shows the reason | already; rate; failed | words RTW-16 :130; doors AP-27; screen: AP-29 checks status after the first send only | none |
| 16 | Seller block and `adPage.seller.allAds` "All ads by this seller" / "የዚህ ሻጭ ሁሉም ማስታወቂያዎች" (en:259, am:240), listing-detail.tsx:1074 | Link to `/$name` | works | AP-35 :824; SPA-E2E-1 seller-name-hidden:40 | none |
| 17 | Map: enlarge, dialog, Google link, places-maps chooser (app / web / cancel) (listing-detail.tsx:1285-1414) | Opens a larger map or the maps app | works; map fails | AP-39 :1135-1149; AP-41 :1304-1309; listing-detail-map-failed.test.tsx; **maps-app / web / cancel NONE** | none |
| 18 | Section nav `adPage.sections.label` (listing-detail.tsx:1092-1110) | Jumps to a section | works | AP-36 :906; sage-ad-page :278 | none |
| 19 | Counts / failed counts `adPage.counts.unavailable` "The view count could not be loaded." / "የእይታ ቆጠራውን መጫን አልተቻለም።" (en:194, am:175), listing-detail.tsx:663-694 | Owner sees counts; a failed read says so | works | AP-17 :275; AP-22 doors :570; failed-count NONE | none |
| 20 | Owner's own page: no Save/Report (l.$slug.tsx:315, :329); name-under-review notice (:197-213) | — | owner | AP-26 (owner, no heart); seller-review.test.ts; review notice in browser NONE | none |
| 21 | Similar ads `listing-similar` (similar-ads.tsx:69) | Never for a sold ad or the owner (l.$slug.tsx:354) | works | AP-32 :771; STG-4 sage-tiers:688; similar-ads.test.tsx | none |
| 22 | Owner's edit or manage controls on this page | Not drawn here: the route passes none to ListingDetail (l.$slug.tsx:285-349) | — | — | none |
| 23 | Amharic; 768 | — | — | NONE for the ad page in Amharic; NONE at 768 | none |

**Browser tests that visit it:** ad-page.spec.ts (AP-9…AP-57, OVW-1), ad-page-doors.spec.ts (door level), sage-ad-page, photo-pipeline PP-22, dialogs DLG-E7, seller-name-hidden, supabase-door SBE-1. **360 px sideways:** AP-36 (:851; page check at :976) at the project widths plus 1100 (:984); OVW-1 (:1986; skipped on desktop, :1992; page width ≤ 390 at :2063-:2073) at 360 and webkit-390.

## Screen 3 — a seller's page: `src/routes/$name.tsx` (72 lines)

The loader checks `sellerExists`, refuses a path holding a slash (:30), and lowercases with 301 (:31-32). Not found → `SellerGonePage` (:60-63). Body: seller-page.tsx; reads `/api/seller`. The route's refusals: 404 `unknownSeller`, 400 `badCursor` / `badKey`, else `readFailure` (api/seller.ts:61-64, :102).

| # | Control or event | What it must do | Cases | Test today | Defect |
|---|---|---|---|---|---|
| 1 | Gone page `sellerPage.notFound` "This seller was not found." / "ሻጩ አልተገኘም።" (en:266, am:246) + `adPage.gone.home` link ($name.tsx:60-63) | Link to `/` | works | SPA-E2E-1 seller-name-hidden:61 | none |
| 2 | Title `sellerPage.title` "Ads by {name}" / "የ{name} ማስታወቂያዎች" (en:264, am:244), seller-page.tsx:88-91 | Business name, else the alias | works | AP-35 :827; SL-4 seller-page.test.tsx:97 | none |
| 3 | Cards (`ListingCard`), seller-page.tsx:117 | Link to the ad | works | AP-35 :828 | none |
| 4 | Empty `sellerPage.empty` (en:265, am:245) | — | empty | SL-4 (unit); browser NONE | none |
| 5 | Not found after the loader passed (`seller-page-not-found`, :54) | — | 404 race | SL-4 (unit); browser NONE | none |
| 6 | Error `sellerPage.failed` + Retry `common.retry` (:58-70) | Reads again | failed | SL-4 (unit); browser NONE | none |
| 7 | Next page on scroll (:126-130) | Loads more; a failure must show | failure | NONE | D5 |
| 8 | Signed in/out; Amharic; 768 | — | — | NONE | none |

**Browser tests:** ad-page.spec AP-35, seller-name-hidden SPA-E2E-1. **360 px sideways: none.**

## Screen 4 — `legal.$kind`, `privacy`, `terms` (one table)

They share their parts: all three render `LegalDocumentPage` (legal.$kind.tsx:3, privacy.tsx:4, terms.tsx:4), read by `legalPage` on the server. `legal.$kind` also gives 301 / notFound (:36-38) and per-country sections. Its title is the raw `kind` (:62, :73), not a key.

| # | Control or event | What it must do | Cases | Test today | Defect |
|---|---|---|---|---|---|
| 1 | Title `legal.kind.privacy` "Privacy Policy" / "የግላዊነት መመሪያ", `legal.kind.terms` "Terms of Service" / "የአገልግሎት ውሎች" (en:712-713, am:656-657) | — | works | LGP-1 legal-pages:120 | D6 (`$kind`) |
| 2 | None yet `legal.page.none` "The {document} will be published here soon." (en:716, am:660); legal-document-page.tsx:51 | — | empty | LGP-1 :123 | D6 |
| 3 | Version switch `legal.page.showCurrent` / `showUpcoming` (en:718-719, am:662-663); :79-93 | Shows the version in force or the next one | works | LGP-2 :204-206 | none |
| 4 | Fallback note `legal.fallbackNote` (am-base:22, en-base:23) | Shown when the text is in English | Amharic | LGC-6 legal-certify:1362 | none |
| 5 | Load error `legal.page.loadError` "This page could not be loaded." (en:720, am:664); :47, :135 | — | failure | NONE | D7 |
| 6 | Per-country section `legal-public-section` (:126) | — | — | NONE | none |
| 7 | 360 / 768 / signed in | — | — | NONE | none |

**Browser tests:** legal-pages LGP-1…3, legal-certify LGC-6, legal-accept LAC-3 :217. **360 px sideways: none.**

## Screen 5 — `legal.accept` and `legal.publishing`

`legal.accept`: `ssr:false`, `requireSignedIn` (:13-14), status `my_legal_status`; if nothing is owed, redirect to `next` (:30-31). Door `accept_legal` refuses `emptyList`, `adultRequired`, `badLanguage`, `notInForce`, `notApplicable` (migration 20261117040700:94-118); only `notInForce` has words (legal-accept-refusals.ts:14-17). `legal.publishing`: `requireSignedIn`, data via `legalPageData` (:47-48), same LegalDocumentPage.

| # | Control or event | What it must do | Cases | Test today | Defect |
|---|---|---|---|---|---|
| 1 | Title `legal.accept.title` "Before you continue" / "ከመቀጠልዎ በፊት" (en:721, am:665) | — | works | LAC-1 legal-accept:140; SU-3 auth-signup:275 | D8 |
| 2 | Read / Hide `legal.accept.read` / `hide` (en:727-728, am:670-671), legal-accept-screen.tsx:131-137 | Opens the document's text | works | LAC-1 :172 | none |
| 3 | Document text load error `legal.accept.loadError` (:26-30) | — | failure; no Retry | NONE | D7 |
| 4 | Agree tick (`AgreeToDocument`, :144-154) and `legal.accept.submit` "Agree and continue" / "ተስማምቼ እቀጥላለሁ" (en:741, am:683), :164-199 | Unticked → marks the tick; ticked → `accept_legal`, then goes to `next` | works; empty tick | LAC-1 :145; SU-3 :283 | none |
| 5 | Refusal `legal-accept-error`: `legal.accept.changed` (notInForce) / `legal.accept.error` (en:745-746, am:686-687) | Changed → untick and re-read | failed | NONE | none |
| 6 | Status load error + `common.tryAgain` "Try again" / "እንደገና ይሞክሩ" (en:43, am:40), :100-105 | Reads again | failure | NONE | none |
| 7 | Decline `legal.accept.decline` "Decline, sign out" / "ውድቅ አድርገው ይውጡ" (en:742, am:684), :204 | Signs out | works | LAC-3 :225 | none |
| 8 | Signed out → sign in with the way back | — | signed out | LGP-4 legal-pages:135 (publishing); accept: NONE | none |
| 9 | Publishing page title `legal.kind.publishing` "Publishing statement" / "የማስታወቂያ ማረጋገጫ ቃል" (en:714, am:658) | — | works | LGP-4 :145 | none |
| 10 | Publishing read fails (`PublishingError`, legal.publishing.tsx:87-100) | Shows the error | failure | NONE | D9 |
| 11 | Amharic; 360 / 768 | — | — | NONE | none |

**Browser tests:** legal-accept LAC-1…3, auth-signup SU-3, legal-pages LGP-4, legal-certify (links :575-587). **360 px sideways: none.**

## Summary (parts 1 and 2)

**Rows marked NONE:**
- Feed: see part 1.
- Ad page: 5 (screen), 8 (screen), 9, 11, 12 (failure), 17 (maps app/web/cancel), 19 (failed counts), 20 (review notice), 23.
- Seller page: 4-6 (browser), 7, 8.
- Legal pages: 5, 6, 7.
- Accept / publishing: 3, 5, 6, 8 (accept), 10, 11.

**Defects seen while reading (new):**
- D4: l.$slug.tsx:167-169 and listing-detail.tsx:1535-1540. A `listingNotAvailable` refusal (an ad sold or removed while open; SQL :50-58) shows "could not be saved / loaded — try again". Retry cannot succeed.
- D5: seller-page.tsx:31 never reads `moreError` from use-seller-feed.ts:158-163. A failed next page goes silent: no words and no Retry (law F4). The feed's equivalent is feed.tsx:285.
- D6: legal.$kind.tsx:62 and :73 pass the address word (`kind`) as the title. `legal.page.none`'s `{document}` then shows an untranslated slug (law D1).
- D7: legal-document-page.tsx:47, :135 and legal-accept-screen.tsx:26-30. The load errors have no Retry (law C4).
- D8: legal.accept.tsx:44 passes the English literal "Before you continue — ethio.com" to `pageHead`. Its role was not read; it is a literal in app code (law D1) — to confirm.
- D9: legal.publishing.tsx:95-97 shows the raw failure class and status (for example " (network 503)") to the person, untranslated.

**Could not read in this turn:** the Guide controls on the feed and the ad page (page-guide.tsx); the ids in api/feed.test.ts; whether AP-29 reaches each report refusal on screen; the role of `pageHead`'s fifth argument.


---

## Screen 6 — the shell on public pages: `src/components/app-shell.tsx` (1,200 lines)

Parts drawn at app-shell.tsx:973-1193: LegalGate (:988, signed in), session warning and notice (:997-1034), band with the rail toggle (:1088) and logo (:1096), AppHeader (:1116), AppRail (:1121), SearchRow (:1143), PanelTabs (:1144), Breadcrumbs (:1150), LocationSelector (:1164), PlaceNotice (:1166), BottomBar (:1186), OnDemandNotice (:1188), AppFooter (:1193). Test widths: the projects run 360 (mobile-360) and 1280 (desktop-1280). The only 768 runs are shell.spec.ts:891 (`test.use` 768 × 1024: :893 "tablets get the persistent rail and the FULL controls", :930 top bar band, :963 theme toggle), shell.spec.ts:1738 (panel tabs and page width), and press.spec.ts:382/:414 (PS-7, PS-9 panel tabs).

### 6a Header — src/components/shell/app-header.tsx (286 lines), language-switcher.tsx, theme-toggle.tsx (33 lines)

| # | Control or event | What it must do | Cases | Test today (360 / 1280 / 768) | Defect |
|---|---|---|---|---|---|
| 1 | Inline search `shell.searchLabel` / `shell.searchPlaceholder` "Search listings" / "ማስታወቂያዎችን ይፈልጉ" (en-base:343-344, am-base:321-322); app-header.tsx:162-178, from md | Search listings | typing; Enter | 1280: sage-shell:89, shell.spec:914 (present only) / 360: hidden / 768: :893 | D10 |
| 2 | Phone search toggle `search-toggle` (aria `shell.searchLabel`), :195-203; row `search-row`, close `shell.searchClose` "Close search" / "ፍለጋን ዝጋ" (en:346, am:324), Escape (:64-66) | Opens and closes the search row | open, close, Escape | 360: SR-1 shell.spec:1460; sage-shell:107 / 768: NONE | D10 |
| 3 | Language switch `language.label` "Language" / "ቋንቋ" (en:27, am:25), language-switcher.tsx:53; options `language-option-<code>` (:95) | Switches the page's language | works; Amharic | smoke-auth-i18n:78; choice-lists:348; one-line-slots-admin:32 (360) / 768: :893 (FULL label) | none |
| 4 | Theme `shell.themeToggle` "Switch light or dark theme" / "ብሩህ ወይም ጨለማ ገጽታ ቀይር" (en:347, am:325), theme-toggle.tsx:20-21 | Flips light/dark | works | FS-16 feed-screens:568 (1280/360); 768: shell.spec:963 | none |
| 5 | Sign in `auth.signIn` "Sign in" / "ይግቡ" (en:49, am:45), app-header.tsx:273-278, from md only; hidden while the session is unknown (:272) | Goes to `/auth` | signed out | no test id on the link; reached through the bottom bar on phones (row 6e-3); 1280 / 768: NONE | D11 |
| 6 | Account menu `shell.accountMenu` "Account menu" / "የአካውንት ዝርዝር" (en:345, am:323), :218-270: identity, Profile `nav.profile` → /account, Settings `settings.navLabel` → /settings, Sign out `auth.signOut` "Sign out" / "ይውጡ" (en:84, am:77) | Opens the menu; signs out | signed in | SO-3 auth-signout:113; shell.spec:1301; AU-3 admin-users:220; 768: NONE | none |

### 6b Rail toggle, left rail and categories — app-rail.tsx (1,183 lines), favourite-category.ts

| # | Control or event | What it must do | Cases | Test today | Defect |
|---|---|---|---|---|---|
| 1 | Rail toggle `shell.collapseRail` / `shell.expandRail` "Collapse sidebar" / "Expand sidebar" (en:372-373, am:350-351), app-shell.tsx:1086-1095, from md; phone menu (app-header.tsx:130) | Collapses or expands the rail; opens the phone menu | works | IN-1 admin-shell:454; phone-frame:110; shell-bands:22; 768: shell.spec:893 | none |
| 2 | Categories `shell.categoriesLabel` "Categories" / "ምድቦች" (en:352, am:330): rows, submenu trigger, back `shell.mainMenu` "Main Menu" / "ዋና ዝርዝር" (en:336, am:314), app-rail.tsx:333-361, :494, :635 | Drills in and out; a row goes to `/c/$slug` | works | shell.spec:745 (submenus), RM-1 :1266, :1049 strip; press.spec:198 (360); i18n-coverage:279 (Amharic) | none |
| 3 | Favourite category row (app-rail.tsx:666) | Leads the list | works | FV-1 shell.spec:4054 | none |
| 4 | Loading skeleton (:680) / empty `shell.categoriesEmpty` "No categories yet" / "እስካሁን ምድብ የለም" (en:353, am:331), :711-713 | — | empty | NONE | D12 |
| 5 | Tree read failed: `common.error` "Something went wrong" / "የሆነ ስህተት ተከስቷል" (en:34, am:32), :725-728 | Says it failed | failure | NONE (no test id) | D12 |
| 6 | Rail sign-out `rail-sign-out` / `strip-sign-out` `auth.signOut` (:942-959) | Signs out | signed in | SO-4 auth-signout:146; shell.spec:884 (absent signed out) | none |

### 6c Search row, panel tabs, breadcrumbs, location row and its notice

| # | Control or event | What it must do | Cases | Test today | Defect |
|---|---|---|---|---|---|
| 1 | Panel tabs `shell.panelLabel` "Section" / "ክፍል" (en:350, am:328), panel-tabs.tsx:45-70 | Switches the panel; the tab is current before the page lands | works; 360/768/1280 | shell.spec:1712 (360/768/1280, sideways :1731-:1745); PS-7/PS-9 press:375-418 (768); shell-bands:59 | none |
| 2 | Breadcrumbs `shell.breadcrumbLabel` "Breadcrumb", Home `nav.home` "Home" / "መነሻ" (en:32, am:30); breadcrumbs.tsx:141-279 (home, ad, auth, account, admin crumbs) | Home link; the current page cut to one line | works | AP-9 ad-page:106; A-6 admin-shell:126; BND-E2 shell-bands:90 (360); 768: NONE | none |
| 3 | Location row `location.rowLabel` "Showing listings in" / "ማስታወቂያዎች በ" (en:365, am:343); levels, `location.anyArea` "Any area" (en:358, am:336); location-selector.tsx:249-292 | Chooses the place; the feed follows | works; 320/360/1280 | shell.spec:2719 (360 + 320, sideways :2750, :2802); shell-bands:63; FS-11 | none |
| 4 | Location read failed `location.readFailed` "Areas could not be loaded — try again shortly" (en:364, am:342), :280-286; empty `location.empty` (en:363, am:341) | Says so | failure; empty | NONE | D13 |
| 5 | Place notice `location.noticeAsk` "Show listings in {place}?" with Switch / Keep `location.noticeSwitch` / `noticeKeep` (en:367-369, am:345-347), location-selector.tsx:343-364 | Switches to the guessed place or keeps the current one | works; Amharic | shell.spec:3094-3126; i18n-coverage:358-362 | none |

### 6d Session idle warning and notice — app-shell.tsx:997-1034

| # | Control or event | What it must do | Cases | Test today | Defect |
|---|---|---|---|---|---|
| 1 | Warning `session.idleWarning` "You'll be signed out for inactivity in {s}s" (en:438, am:414); `session.staySignedIn` "Stay signed in" / "ገብቼ ልቆይ" (en:439, am:415) | Extends the session | works | SP-1 auth-signout:411; SP-2 :425 | none |
| 2 | Notice (`t(sessionNotice)`, :1022-1042); `common.dismiss` "Dismiss" / "ዝጋ" (en:437, am:413) | Says why the session ended; Dismiss closes it | ended | SP-1 :416 (shown); Dismiss NONE | none |

### 6e Bottom bar, on-demand notice, footer

| # | Control or event | What it must do | Cases | Test today | Defect |
|---|---|---|---|---|---|
| 1 | Bottom bar (`shell.panelLabel`), bottom-bar.tsx:106-173; phones only | Home, My listing `panel.myListingsShort` (en:294, am:272), Post → /post, Account / Sign in, Admin | 360 | auth-signout:566; shell.spec:1583 (signed out); PW-15 post-wizard-category:1196 | none |
| 2 | Bottom Sign in → `/auth` (:160-161) | — | signed out | press.spec:358 (360); shell.spec:1303 | D11 |
| 3 | On-demand notice `common.loadFailed` with Refresh `common.refreshPage` "Refresh page" / "ገጹን ያድሱ" (en:39-41, am:37-38) and Close `common.close`; on-demand-notice.tsx:37-60 | A failed piece offers Refresh; Close hides it | failure | on-demand-failure.spec:27-38; SBE-6 supabase-door:207 | none |
| 4 | Footer: Terms `footer.terms` → /terms, Privacy `footer.privacy` → /privacy (app-footer.tsx:9-11); About `footer.about`, Contact, Safety drawn as text (:82); copyright `footer.rights` (:94) | Links to the two pages | works | LGP-1 legal-pages:126-130; FT-1 shell.spec:578; FTE-E1 shell-bands:167; About/Contact/Safety NONE | D14 |

**Sideways scrolling or clipped controls:**
- Checked: panel tabs (shell.spec:1731-:1745 at 360/768/1280); location row (shell.spec:2750, :2802 at 360 and 320); the ad page's frame (AP-36, OVW-1).
- No test checks them: the header (search, language, theme, sign-in, account menu); the rail and its categories; the search row; breadcrumbs outside the ad page; the place notice; the session warning and notice; the bottom bar; the on-demand notice; the footer.

## Summary — area 1 as a whole

**NONE rows by screen:**
- Feed (1): 7 (browser), 8, 10, 11, 12 (screen), 14 (shown), 19, 21, 22; 768 except the page width.
- Ad page (2): 5, 8 (screen), 9, 11, 12 (failure), 17 (maps app/web/cancel), 19 (failed counts), 20 (review notice), 23.
- Seller page (3): 4-6 (browser), 7, 8.
- Legal / privacy / terms (4): 5, 6, 7.
- Accept / publishing (5): 3, 5, 6, 8 (accept), 10, 11.
- Shell (6): 6a-1 (search results), 6a-2 at 768, 6a-5, 6a-6 at 768; 6b-4, 6b-5; 6c-2 at 768, 6c-4; 6d-2 (Dismiss); 6e-4 (About, Contact, Safety).

**Defects:**
- D1 use-feed.ts:38 / feed.tsx:215-216: 404 `unknownPlace` / `unknownCategory` (api/feed.ts:82) shows a Retry that can never succeed.
- D2 feed.tsx:286: the next-page Retry has no test id.
- D3 feed.tsx:149: no IntersectionObserver means no next page and no button.
- D4 l.$slug.tsx:167-169, listing-detail.tsx:1535-1540: `listingNotAvailable` shows "try again".
- D5 seller-page.tsx:31 (use-seller-feed.ts:158-163): a next-page failure is silent.
- D6 legal.$kind.tsx:62, :73: the raw slug is the title.
- D7 legal-document-page.tsx:47, :135; legal-accept-screen.tsx:26-30: load errors with no Retry.
- D8 legal.accept.tsx:44: English literal handed to `pageHead` (to confirm).
- D9 legal.publishing.tsx:95-97: raw failure class and status shown to the person.
- D10 app-header.tsx:54, :167: both search forms only `preventDefault`; typing and Enter do nothing, and no route or door is called.
- D11 app-header.tsx:273-278 (and bottom-bar.tsx:160): Sign in goes to `/auth` with no `return`, so the person lands away from the page they were on. The header link has no test id (law C9).
- D12 app-rail.tsx:711-713 with :725-728: a failed category read shows "No categories yet" as well as "Something went wrong". There is no Retry and no test id (law F4: a failed read never reads as empty).
- D13 location-selector.tsx:280-286: "try again shortly" with no Retry (law C4).
- D14 app-footer.tsx:82: About, Contact and Safety are drawn with the link look and a 44 px target but do nothing. The comment at :19-20 says this is intended until those pages exist; it is reported, not judged.

**Could not read:** the Guide controls (page-guide.tsx); the api/feed.test.ts ids; `pageHead`'s fifth argument; every message `sessionNotice` can hold (app-shell.tsx:686); the admin alerts and submenu layer inside the rail (app-rail.tsx:225, :717); LegalGate's own screen (app-shell.tsx:988).

---

# Area 2 — posting and member pages, part 1

Base `1bbfc7dad`. This part covers the wizard's frame (what every step shares) and step 1. The wizard is about 12,200 lines (wizard.tsx 1,789; step files 476–2,265 each; posting-service.ts 1,316), so the census stops after step 1. Steps are named in types.ts:12-21.

Routes: `post.tsx` and `post_.$listingId.tsx` are both `ssr:false` and guarded by `requireSignedIn` (post.tsx:22-23, post_.$listingId.tsx:30-31). Both render `PostingWizard` (wizard.tsx). Saving a step goes through `POST /api/listings/draft` → `submit_listing` (draft.ts:162). That door refuses `badValue:step`, `notYourListing`, `notADraft`, `listingNotFound` (migration 20261115204200:60-129). Field refusals arrive in the answer and are worded by refusal-text.ts:28-102 (e.g. `required` → `post.refusal.required`; any door failure → `post.refusal.doorError`). Publishing goes through `/api/listings/publish` → `publish_listing` (publish.ts:52-53). That door refuses `notYourListing`, `illegalTransition`, `listingNotPlaced` (migration 20261115203900:169-193).

## Screen 7 — the wizard frame (every step)

| # | Control or event (key EN / AM; place) | What it must do | Cases | Test today | Defect |
|---|---|---|---|---|---|
| 1 | Signed out on `/post` or `/post/$id` | Goes to sign in with the way back | signed out | (route guard) — NONE in post-wizard specs found by this census | none |
| 2 | Loading `post.loading` "Opening the form…" / "ቅጹ እየተከፈተ ነው…" (en-member:295, am-member:286), wizard.tsx:848 | — | slow | NONE | none |
| 3 | Load error `post.error.load` "This draft could not be opened." / `post.error.notYours` "This draft belongs to another account." (en-member:296-297, am-member:287-288), wizard.tsx:860-861 | Says why | notFound; failed | PW-7 post-wizard-category:738 | D15 |
| 4 | Step list (desktop aside, `post-step-list-item`, wizard.tsx:977-985) and progress `post.stepOf` (:1049-1059) | Goes to a reached step | works | post-wizard-pricing:919 | none |
| 5 | Save state `post.save.saving` "Saving…" / `saved` "Saved" / `unsaved` "Not saved yet — we keep trying." (en-member:299-301, am-member:290-292), wizard.tsx:1101-1106 | Shows the draft's state | works; failed | post-wizard-category:184; PW-8 :860-865 | D16 |
| 6 | Retry `post.action.retry` "Try again" / "እንደገና ይሞክሩ" (en-member:294, am-member:285), wizard.tsx:1141-1145 | Saves again | failed | PW-8 post-wizard-category:865 | none |
| 7 | Paused `post.save.paused` "Saving paused for {seconds} s" (en-member:520, am-member:498), wizard.tsx:1134-1135 | Shown while the draft dial holds saves | rateLimited | NONE | none |
| 8 | Edit problem `post-edit-problem` (wizard.tsx:1126) | — | — | NONE | none |
| 9 | Category chip and Change `post.category.change` "Change" / "ቀይር" (en-member:308, am-member:299), wizard.tsx:1155-1169 | Returns to step 1 | works | PW-2 post-wizard-category:236 | none |
| 10 | Category-changed notice: Undo `post.specs.resetUndo`, dismiss `post.category.changedDismiss`, photos recheck (wizard.tsx:1187-1233) | Undoes the dropped answers; dismisses | works | PW-72 post-wizard-resets:340; PW-26 :282 | none |
| 11 | Back `post.action.back` "Back" / "ተመለስ" (en-member:292, am-member:283), wizard.tsx:1279-1314; Back to review (:1327-1336) | Previous step / review | works | PW-123 post-wizard-bundle2:951; PP-12 photo-pipeline:603; PW-13 post-wizard-place:588 | none |
| 12 | Next `post.action.next` "Next" / "ቀጥል" (en-member:293, am-member:284); in an edit `myListings.editBox.save`; wizard.tsx:1342-1384 | Saves the step through `submit_listing`, then moves on | works | A11Y-2 a11y:90; AL-20 admin-listings:1390 | none |
| 13 | Next blocked `post.category.nextBlocked` "Choose a category to continue." / `post.nextBlocked.required` "Fill in what is needed to continue." (en-member:603-604, am-member:578-579), wizard.tsx:1400-1412 | Says what is missing | invalid input | PW-1 post-wizard-category:205; PW-192 post-wizard-pricing:1239; MLA-17 | none |
| 14 | Next unreachable (`post-next-unreachable`, `post.save.unsaved`), wizard.tsx:1391-1394 | — | network failed | PW-8 :860; PW-162 post-wizard-pricing:788 | D16 |
| 15 | Door refusals `notYourListing` / `notADraft` / `listingNotFound` from `submit_listing` | Words from refusal-text.ts (`notYourListing` → `post.refusal.notYourListing`, :54); others `post.refusal.doorError` | — | unit: refusal-text.test.ts (ids not read); browser NONE | none |
| 16 | Sign-in ends mid-way | — | posting-service.ts:56-57 turns "signed out" into the unreachable answer (status 401) | NONE | D16 |
| 17 | Amharic; 768 | — | — | NONE | none |

**Browser tests:** post-wizard-*.spec.ts (12 files), photo-pipeline, a11y A11Y-2, admin-listings AL-20/21, my-listings-ad MLA-17. **360 px sideways:** only post-wizard-where.spec.ts:857 (step 6). The frame and step 1 have none.

## Screen 7, step 1 — Category (step-category.tsx, 476 lines)

The tree comes from the category store. Search calls `GET /api/catalog/find` (catalog-finder.ts:62); a failure becomes `failed` (catalog-finder.ts:105) and the list falls back to name matches.

| # | Control or event | What it must do | Cases | Test today | Defect |
|---|---|---|---|---|---|
| 1 | Why line `post.category.why` "The category decides which details buyers can search by." (en-member:302, am-member:293), :247 | — | — | — | none |
| 2 | Used before `post.category.recentLabel` "Used before:" / "ከዚህ በፊት የተጠቀሙባቸው፦" (en-member:303, am-member:294); chips `post-category-recent` (:253-277); read `my_recent_categories` (posting-service.ts:656) | Picks a recent category | works | post-wizard-recent:56 | none |
| 3 | Search, placeholder `post.category.searchPlaceholder` "e.g. phone" / "ለምሳሌ ስልክ" (en-member:304, am-member:295), :300-305 | Filters; hits show their match line | works | A11Y-2 a11y:82; choice-lists:325; photo-pipeline:1085 | none |
| 4 | Searching `post.category.searching` (:372-375) / no hits `post.category.noHits` "Nothing matched. Try another word, or browse below." (en-member:306, am-member:297) | — | empty | PW-105 post-wizard-finder:168-172 | none |
| 5 | Search failed → `post.category.nameMatchesOnly` "Showing name matches only." (en-member:608, am-member:583), :364-366 | Keeps name matches and says so | failed | PW-86 post-wizard-finder:138 | none |
| 6 | Browse: folders, leaves, trail, `post.category.allRoots` "All categories" (en-member:625, am-member:599), :404-463 | Drills in; a leaf chooses | works | PW-52 post-wizard-category:248-258; PW-62 :408; PW-87 post-wizard-finder:190-204 | none |
| 7 | Current choice and Keep it `post.category.keepIt` "Keep it" / "ይህንኑ ያቆዩ" (en-member:607, am-member:582), :324-334 | Returns to the chosen branch | works | PW-87 :218 | none |
| 8 | Choose one `post.category.chooseOne` "Choose a category from the list." (en-member:605, am-member:580), :358-359 | Shown after Next with none chosen | invalid | PW-1 :212 | none |
| 9 | Tree failed `post.category.treeError` "The categories could not be loaded." / "ምድቦቹ መጫን አልቻሉም።" (en-member:309, am-member:300), :229-234 | Says so | failed | NONE | D15 |
| 10 | Door refusal `categoryNotPostable` → `post.refusal.categoryNotPostable` (refusal-text.ts:47) | Shown at Next | — | NONE (browser) | none |
| 11 | AI assist | Not on this step (assist is `/api/listings/assist`, posting-service.ts:946; its steps not read yet) | — | — | — |
| 12 | Amharic; 360 / 768 | — | — | NONE | none |

**Browser tests:** post-wizard-category, post-wizard-finder, post-wizard-recent, a11y, choice-lists, photo-pipeline. **360 px sideways: none.**

## Screen 7, step 2 — Photos (step-photos.tsx, 1,066 lines)

Uploads go through `POST /api/upload/photo` (posting-service.ts:62). The route's own refusals: `required`, `badValue`, `publishFirst`, `levelNotAvailable`, `tooManyPhotos`, `tooLarge`, `stripFailed`, plus the screening verdict's code with `retry` only for `providerUnavailable` (api/upload/photo.ts:161-313, :360-362). Words: `PHOTO_REASONS` (refusal-text.ts:111-138), dial `post.photo.refusal.rateLimitedWhen`, generic `post.photo.refusal.unknown` "This photo was not accepted." / "ይህ ፎቶ አልተቀበለም።" (en-base:561, am-base:518) (refusal-text.ts:163-167). Remove: `DELETE /api/listings/photos/$id` (posting-service.ts:217). Photos-soon tick: `set_listing_photos_soon` (posting-service.ts:1184).

| # | Control or event (key EN / AM; place) | What it must do | Cases | Test today | Defect |
|---|---|---|---|---|---|
| 1 | Why line `post.photos.why` (en-member:311, am-member:302), :879; count `post.photos.count` "{count} of {max}" (en-member:314, am-member:304), :885-886 | — | works | PW-29 post-wizard-category:1315; MLA-19 my-listings-ad:1340 | none |
| 2 | Add `post.photos.add` "Add photos" / "ፎቶዎች ጨምር" (en-member:313, am-member:303); input `post-photos-input`, drop zone `post-photos-drop` (:854, :975-984) | Prepares, shrinks and sends each photo | works | PP-10 photo-pipeline:481; PW-4 post-wizard-category:554; LGC-5 legal-certify:1316 | none |
| 3 | Row state `post.photos.preparing` / `post.photos.uploading` "Sending… {percent}%" / `post.photos.done` (en-member:322, am-member:312), :664-668 | Shows progress | slow network | PP-10 :490 | none |
| 4 | Final refusal `post.photos.refusedFinal` "This photo can't be used. Choose a different one." / "ይህ ፎቶ መጠቀም አይቻልም። ሌላ ይምረጡ።" (en-member:463, am-member:444), :675-676 | Never retried; holds Next until removed | refused | PP-10 :462-488; PP-11 :535 | none |
| 5 | Row refusal reason (`post-photo-row-refusal`, :682) — words by code: `unsupportedFormat` "Only JPEG, PNG and WebP photos are accepted." (en-base:549, am-base:509), `tooLarge` "This photo is too large." (en-base:551, am-base:511), `tooManyPhotos` (en-base:554, am-base:513), screening codes (`nudity` … `not_a_photo`), `rateLimited`, `publishFirst`, `photoGone`, `screeningPaused` | Shows the reason for the code | type, size, count, scan, dial | words: PRK-1 photo-refusal.test.ts:9 (2 tests); **screen NONE** | D17 |
| 6 | Send again `post.photos.retry` "Send again" / "እንደገና ላክ" (en-member:324, am-member:314), :691-697 | Offered for a 5xx or `providerUnavailable`; sent once more | failed upload | PP-10 :494 | none |
| 7 | Make cover `post.photos.makeCover` "Make cover" / "ሽፋን አድርግ" (en-member:317, am-member:307), :703-707, :761-766 | Moves the photo first | works | PP-15 :783-810 | none |
| 8 | Remove `post.photos.remove` "Remove" / "አስወግድ" (en-member:318, am-member:308), :712-716, :771-776 | Deletes the photo | works | PP-11 :569; PW-4 :586; PP-15 | none |
| 9 | Move earlier / later `post.photos.moveUp` "Move earlier" (en-member:319, am-member:309) / `moveDown`, :798-818 | Reorders; the first is the cover | works | PP-17 :883-907 | none |
| 10 | Edit `post.photos.edit` "Edit photo" (en-member:326, am-member:316), :822-832 | Opens the photo editor | works | PP-27 :1698 | none |
| 11 | Background `post.photos.background`, :837-845; hint `post.photos.backgroundCoverOnly` (:961-962) | Opens the background tool (`/api/listings/background`, posting-service.ts:179) | works | PP-30 :1924 | none |
| 12 | Hidden photo and why (`post-photo-review`, :616-621); not-relevant warning `post.photos.notRelevant` (:584-590) | Tells the seller why | held | PP-33 :2139-2159; PP-29 :1887 | none |
| 13 | No photos `post.photos.none` (en-member:315, am-member:305), stand-in `post.photos.standIn`, photos-soon tick `post.photos.soonTick` (:892-920) | Saves "photos soon" | works | MLA-16 my-listings-ad:1167; post-wizard-category:611 | none |
| 14 | Photos-soon failed `post.photos.soonFailed` "That could not be saved. Please try again." (en-member:519, am-member:497), :942-944 | Says so | failed | NONE | none |
| 15 | Sign-in ends mid-way during an upload | — | — | NONE | D16 (same path) |
| 16 | Amharic; 360 / 768 | — | — | NONE | none |

**Browser tests:** photo-pipeline.spec.ts (PP-10…PP-33), post-wizard-category PW-4/PW-29, my-listings-ad MLA-16/19, legal-certify LGC-5. **360 px sideways: none.**

## Screen 7, step 3 — Specifications (step-specifications.tsx, 1,921 lines)

The schema comes from `get_posting_schema` (posting-service.ts:892). Field refusals come back from `submit_listing` and are worded by refusal-text.ts:28-102: `required` "This is needed." (en-base:562, am-base:519), `outOfBounds` (en-base:592, am-base:546), `badPreset`, `badDecimals`, `badMulti`, `dependentMissing`, `inactiveOption`, `otherNeedsText`, `unknownOption`, `unknownAttribute`, `notPositive`.

| # | Control / event | Must do | Cases | Test | Defect |
|---|---|---|---|---|---|
| 1 | No category `post.specs.needCategory` (:1190) | — | — | NONE | none |
| 2 | Load failed `post.specs.loadFailed` "These details could not be loaded." (en-member:439, am-member:421), or the dial text; :1197-1198 | Says so | failed; rateLimited | NONE | D18 |
| 3 | None `post.specs.none` "This category asks for no extra details." (en-member:434, am-member:418), :1226 | — | empty | PW-8 post-wizard-category:895 | none |
| 4 | Field control (select `post.specs.choose` "Choose", number, text, year) `post-attr-control`, :1369-1400 | Answer stored | works | PW-44 post-wizard-category:1530; AL-23 | none |
| 5 | Unit `post-attr-unit` (:1432) | — | works | PW-161 post-wizard-units:86 | none |
| 6 | Colour swatches (:1537-1573) | — | works | PW-34 post-wizard-specs:1985 | none |
| 7 | Other + text `post.specs.otherPlaceholder` "Say what it is" (en-member:443, am-member:425), :1601-1606 | Needs text (`otherNeedsText`) | invalid | PW-108 post-wizard-pricing:435 | none |
| 8 | Checks, multi `post-attr-check` (:1634-1642) | — | works | PW-120 post-wizard-specs:619 | none |
| 9 | Dependent: `post.specs.parentFirst` "Choose {parent} first." (en-member:565, am-member:540), :1701; none for parent `post.specs.noneForParent` (:1710-1713) | — | dependent | PW-21 :1318; no-options NONE | none |
| 10 | Model values: set by model (:1689), from model (:1721), differs + `post.specs.useModelValue` "Use model's value" (en-member:568, am-member:543), :1734-1748 | Fills from the model | works | NONE | none |
| 11 | Options failed `post.specs.optionsFailed` "The choices could not be loaded. Tap again to retry." / `post.specs.rateLimited` (en-member:442, am-member:424), :1756-1762 | Retry by tapping | failed; rate | PW-145 post-wizard-specs:399 | none |
| 12 | Help and More (:1769-1793) | Shows the field's help | — | NONE | none |
| 13 | Bounds and hints `post.specs.boundsHint` / `lengthHint` / `presetHint` / `multiHint` (:1803-1819) | — | invalid | PW-5 post-wizard-specs:261 | none |
| 14 | Model reset `post.specs.resetForModel` "Details reset for {model}" (en-member:570, am-member:545) + Undo `post.specs.resetUndo` (:1879-1909) | Undo restores | works | PW-32 post-wizard-resets:1053 | none |
| 15 | Required gate: Next shows `post.nextBlocked.required` (wizard.tsx:1400-1412) and the field's `required` words | — | invalid | PW-192 post-wizard-pricing:1239 | none |
| 16 | Amharic; 360 / 768 | — | — | NONE | none |

**Browser tests:** post-wizard-specs, -units, -resets, -category, -pricing, admin-listings AL-23. **360 px sideways: none.**

## Screen 7, step 4 — Price (step-pricing.tsx, 726 lines)

Refusals (refusal-text.ts:34-44): `unknownCurrency` "That currency is not in use." (en-base:568, am-base:525), `periodLocked` "The price period is fixed for this category." (en-base:570, am-base:527), `periodFollowsBasis`, `modeFollowsBasis`, `commissionNotOffered`, `priceBasisAmbiguous`, `commissionRange` "Enter a commission between 0.01% and 100%." (en-base:574, am-base:531), `commissionRequired`, `priceNotAllowed`.

| # | Control / event | Must do | Cases | Test | Defect |
|---|---|---|---|---|---|
| 1 | Mode `post.price.modeLabel` "How are you pricing it?" (en-member:698, am-member:670); buttons `post-price-mode-<mode>` (:408-435) | A no-price mode clears the amount (:426-430) | works | post-wizard-bundle2:1605; post-wizard-specs:200 | none |
| 2 | Not allowed `post.price.notAllowed` "This category is posted without a price." (en-member:359, am-member:345), :440 | — | — | NONE | none |
| 3 | Mode refusal `post-price-mode-refusal` (`draftRefusalKey`), :445-446 | Shows the reason | refused | NONE | none |
| 4 | Currency `post.price.currencyLabel` "Currency" (en-member:696, am-member:668); search `post.price.currencySearch` "Search by code or name" (en-member:366); More currencies `post.price.moreCurrencies` (en-member:610, am-member:585); :456-545 | Picks a currency | works | PW-10 post-wizard-pricing:266; PW-17 :1447; choice-lists:450 | none |
| 5 | Currency list failed `post.price.currencyFailed` "The currency list could not be loaded. Try again in a moment." (en-member:368, am-member:354), :461-462 | Says so | failed | NONE | D18 |
| 6 | Amount `post.price.amountLabel` "Amount" (en-member:695, am-member:667), :578; scale `post.price.scaleLabel` "Amount in" + none / thousand / million (:601-613) | — | works; invalid (`notPositive`) | MLA-13 my-listings-ad:916; PW-89 post-wizard-where:486 | none |
| 7 | Commission `post.price.commissionLabel` "Commission (%)" (en-member:372, am-member:358), :624-631 | — | range | PW-55 :363 | none |
| 8 | Negotiable `post.price.negotiableToggle` "Price is negotiable" / "ዋጋው የሚደራደር ነው" (en-member:356, am-member:342), :652-661 | — | works | PW-64 :583 | none |
| 9 | Period `post.price.periodLabel` "Per" (en-member:699, am-member:671), :674-681; fixed `post.price.periodFixed` "This category is always priced {period}." (en-member:369, am-member:355), :700-714 | — | locked | PW-10 :249-250 | none |
| 10 | Door refusals listed above, shown at Next | Field words | refused | `periodLocked` / `commissionRange` / `unknownCurrency` on screen: NONE (rg found no spec reading them) | none |
| 11 | Amharic; 360 / 768 | — | — | NONE | none |

**Browser tests:** post-wizard-pricing (PW-10…PW-192), -bundle2, -where, my-listings-ad MLA-13. **360 px sideways: none.**

## Screen 7, step 5 — Details and the AI assist (step-details.tsx, 462 lines)

Assist: `GET /api/listings/assist` (posting-service.ts:946). It answers `assistBudgetSpent` (api/listings/assist.ts:277, :322), `featureOff` when the switch is off or the budget is out (:324-325), else `providerUnavailable` (:328); and rate verdicts (:337, :343). Words: `post.refusal.assistBudgetSpent` (en-base:676, am-base:620), `featureOff` "The writing help is switched off for now." (en-base:677, am-base:621), `providerUnavailable` "The writing help is unavailable right now." (en-base:623, am-base:575).

| # | Control / event | Must do | Cases | Test | Defect |
|---|---|---|---|---|---|
| 1 | Title `post.details.titleLabel` "Title" (en-member:693, am-member:665), :288-310; built note `post.details.titleBuilt` "Written from your answers. Change it as you like." (en-member:451, am-member:433), :294; count `post.details.count` (:299) | Stored; built from the answers | works; `tooLong`; `required` | PW-140 post-wizard-pricing:1312; AL-20 :1399 | none |
| 2 | Description `post.details.descriptionLabel` "Description" (en-member:692, am-member:664), :327-343 | — | works | PW-121 post-wizard-bundle2:1608; choice-lists:469 | none |
| 3 | Phone in text (`judgeContact`, :226, :319, :355) → `post.refusal.contactInText` "Leave phone numbers out. Buyers contact you through the app." (en-base:597, am-base:551) | Warns | invalid | door level only: admin-listings:481, :1335; screen NONE | none |
| 4 | Write for me `post.assist.action` "Write for me" / "ለእኔ ይጻፍልኝ" (en-member:457, am-member:438); again `post.assist.again` (en-member:537); working (:429); :413-432 | Asks the assist | works | PW-6 post-wizard-specs:436-437; MLA-18 my-listings-ad:1302 | none |
| 5 | Suggestions and Use this one `post.assist.use` "Use this one" / "እሱን ተጠቀም" (en-member:536, am-member:513), :367-403 | Fills title and description | works | PW-6 :475 | none |
| 6 | Tries `post.assist.triesLeft` "{left} of {max} tries left" / `post.assist.exhausted` (en-member:533-534, am-member:510-511), :444-449; button disabled when spent (:416) | Budget shown | budget | PW-6 :458; MLA-18 :1294 | none |
| 7 | Assist refusal `post-assist-refusal` `t(draftRefusalKey(...))`, :453-454: budget, featureOff, providerUnavailable, rate | Shows the reason | refused; failed | NONE | D19 |
| 8 | Switch off | The button is still drawn whenever a category is chosen (:416); "off" is learnt only after a press | off | NONE | D19 |
| 9 | Amharic; 360 / 768 | — | — | NONE | none |

**Browser tests:** post-wizard-specs PW-6, -pricing PW-140, -bundle2 PW-121, my-listings-ad MLA-18, admin-listings AL-20. **360 px sideways: none.**

## Screen 7, step 6 — Place (step-where.tsx, 2,265 lines; map under src/features/posting/map/)

Place answers go through `submit_listing`. `cityRequired` → `post.refusal.cityRequired` (step-where.tsx:1726-1731), `unknownPlace` → `post.refusal.unknownPlace`, `coverageExceedsPlan` → `post.refusal.coverageExceedsReach` (refusal-text.ts:35, :51, :75). The pin door `set_listing_pin` (posting-service.ts:1237-1307) refuses `notYourListing`, `contactInNote`, `directionsTooLong`, `badLatitude`, `badLongitude`, `badPrecision`, `badZoom` (migration 20261115203900:62-109).

| # | Control / event | Must do | Cases | Test | Defect |
|---|---|---|---|---|---|
| 1 | Market `post.where.marketLabel` / `marketChoose` (:725-744); loading `post.where.marketLoading`; failed `post.where.marketFailed` (:1571-1574); unresolved `post.where.marketUnresolved` (:1622-1623) | Picks the market | failed; unresolved | NONE (all four) | D18-kind: no Retry |
| 2 | Tree loading / failed `post.where.treeLoading` / `treeFailed` (:1627-1631) | Says so | failed | NONE | D18-kind: no Retry |
| 3 | Add country / region / city / sub-city `post.where.addCountry` / `addRegion` / `addCity` / `addSubCity` (:352-357, :663-688, :1715-1719) | Adds a level | works | PW-11 post-wizard-place:345-347; PW-117 post-wizard-bundle2:1491 | none |
| 4 | No regions `post.where.noRegions` (:451-453); "All of" `post.where.allOf` (:581-582) | — | empty | NONE | none |
| 5 | Remove `post.where.removePlace` (:391-396) | Removes a place | works | PW-20 :928; PW-117 :1518 | none |
| 6 | Prefilled `post.where.prefilled` (:1738-1739) | Says the place came from the last ad | works | PW-116 bundle2:1281; PW-180 post-wizard-where:307 | none |
| 7 | Reach / plan line and toggle (`post.where.planLine*`, :1756-1795) | Shows the reach the level allows | works | PW-90 post-wizard-where:530 | none |
| 8 | Place refusal `post-where-refusal` (`cityRequired` etc., :1726-1731) | Shows at Next | invalid | PW-80 post-wizard-place:1049; MLA-17 my-listings-ad:1238 | none |
| 9 | Map pin: open sheet `post-pin-sheet`, search `post-pin-search`, results / none `post-pin-noresults`, locate me `post-pin-locate`, street / satellite layers, Save `post-pin-save`, Cancel `post-pin-cancel` (map/*.tsx) | Places and saves a pin through `set_listing_pin` | works | PW-37 post-wizard-place:1351; PW-38 :1384; PW-160 :1490; PW-97 post-wizard-where:717; PW-92 :633 (fallback); no results / satellite NONE | none |
| 10 | Pin outside the market `post-pin-outside`; pin error `post-pin-error`; map failed (`MapFailedHere`, step-where.tsx:49) | Says so | failed | NONE | none |
| 11 | Pin door refusals `badLatitude` / `badLongitude` / `badPrecision` / `badZoom` / `directionsTooLong` | Words for each | refused | NONE | D21 |
| 12 | Amharic; 768 | — | — | NONE | none |

**Browser tests:** post-wizard-place, -where, -bundle2, dialogs :612, my-listings-ad MLA-17. **360 px sideways:** post-wizard-where.spec.ts:857 (in PW-97's file; the project width).

## Screen 7, step 7 — Contact (step-who.tsx, 1,255 lines)

Identity reads: `my_seller_line` (posting-service.ts:998). Refusals by key (refusal-text.ts:53, :79-98): `messagesRequired`, `aliasReserved`, `aliasTaken`, `aliasShape`, `aliasEthio`, `aliasRole`, `aliasClaim`, `aliasTooSoon`, `businessEthio`, `businessReserved`, `businessClaim`, `badLength`, `badHandle`, `showNeedsValue`, `aliasLatinOnly`. The alias check is `/api/listings/alias`.

| # | Control / event | Must do | Cases | Test | Defect |
|---|---|---|---|---|---|
| 1 | Identity read failed `post.who.readFailed` + raw class (:684-688) | Says so | failed | NONE | D20 |
| 2 | Saved identity and Edit `post.who.edit` (:694-705) | Opens the fields | works | PW-150 post-wizard-bundle2:693 | none |
| 3 | Type person / business `post.who.typeLabel` / `typeBusiness` (:724-754) + type refusal | — | works; refused | PW-148 :779; refusal NONE | none |
| 4 | Business name `post.who.businessLabel` (:763-771) | — | works; `business*` refusals | PW-148 :783 | none |
| 5 | First / last name `post.who.firstNameLabel` / `lastNameLabel` (:798-831) + hint | — | works | PW-134 :511; PW-12 post-wizard-place:452 | none |
| 6 | Alias `post.who.aliasLabel`, rules, checking `post.who.aliasChecking`, available `post.who.aliasAvailable`, suggestions (:860-949) | Checks and suggests | works; taken / shape | PW-134 :517; PW-12 :436; PW-130 :575; "available" NONE | none |
| 7 | Alias change rule `post.who.aliasChangeFirst` / `aliasCorrectionWindow` / `aliasNextChange` (:920-935) | — | too soon | NONE | none |
| 8 | Channels: messages (always on, `post.who.messagesCannotOff`), phone / second phone / Telegram / WhatsApp (`post-who-channel-*`, :969-1062) | Turns ways on | works | PW-114 :865; PW-12 :429 | none |
| 9 | Values `post-who-value-*` (phone field, :1081) | Phone checked by the phone library | invalid; `badHandle` | MLA-15 my-listings-ad:1092; choice-lists:480 | none |
| 10 | Phone library failed `post.who.phoneLibFailed` + `common.refreshPage` (:990-1001) | Refresh | failed | NONE | none |
| 11 | Carried contact `post.who.contactFromLastPost` (:1006-1007) | — | works | NONE | none |
| 12 | Messages refusal (`messagesRequired`, :1011) | — | refused | NONE | none |
| 13 | Amharic; 360 / 768 | — | — | NONE | none |

**Browser tests:** post-wizard-bundle2 (PW-114…PW-150), -place PW-12, my-listings-ad MLA-15, choice-lists. **360 px sideways: none.**

## Screen 7, step 8 — Review and Publish (step-review.tsx, 952 lines)

Publish: `/api/listings/publish` → `publish_listing`. The live body is migration 20261115203900:150-219 (the later of the two files declaring it). Its codes and the words the screen shows (`draftRefusalKey`, step-review.tsx:841; legal codes via `certifyRefusal`, :939):

| Code (file:line) | Screen words |
|---|---|
| `notYourListing` (:169) | `post.refusal.notYourListing` "This listing belongs to another account." (en-base:585, am-base:540) |
| `illegalTransition` (:171) | none of its own; generic `post.refusal.unknown` "That could not be saved." (en-base:586, am-base:541) — D22 |
| the judge's field refusals (:175-186) | each field's words (refusal-text.ts:28-102), plus "Open step {step}" `post.review.fixStep` (en-member:507, am-member:486) |
| `listingNotPlaced` (:193) | generic `post.refusal.unknown` — D22 |
| `noFreeSlot` (:196-197) | `post.refusal.noFreeSlot` (en-base:694, am-base:638) |
| `acceptanceRequired` / `certificationRequired` from `legal_certify` (:201-202) | navigates to `/legal/accept`, or re-reads the certification (certify-refusal.ts:61-69); no line on this screen |
| other errors `door_refused` (:219) | `post.save.unsaved` (step-review.tsx:824-825) |

| # | Control / event | Must do | Cases | Test | Defect |
|---|---|---|---|---|---|
| 1 | Summary rows and Edit `post.review.edit` "Edit" / "አስተካክል" (en-member:563, am-member:538), :611-659; not given `post.review.notGiven` | Goes to the step | works | AL-20 admin-listings:1384; SC-25 | none |
| 2 | Identity failed in the summary + raw class (:597-598) | — | failed | NONE | D20 |
| 3 | Preview as buyer `post.review.previewAsBuyer` (en-member:627, am-member:601), :696-700 | Opens the preview | works | dialogs:592; photo-pipeline:1248 | none |
| 4 | Active window and take-down switch `post.review.takeDownSwitch` "Take it down on a date" (en-member:527, am-member:504), :754-802 | Sets the end date | works | NONE | none |
| 5 | Statement `post.review.statement` (en-member:524), :898-899; certification tick | A tap without the tick marks it refused and sends nothing (:906-907) | invalid | LGC-1 legal-certify:588 | none |
| 6 | Publish `post.review.publish` "Publish" / "አውጣ", busy `post.review.publishing` (en-member:505-506, am-member:484-485), :904-944 | Calls `publish_listing` | works | LGC-1 :588; PW-123 post-wizard-bundle2:948 | none |
| 7 | Refusals `post-review-refusal` + fix button `post-review-fix` (:835-848) | Shows each refusal and opens its step | refused | NONE | D22 |
| 8 | Unreachable `post-review-failed` (:824-825) | — | network | NONE | none |
| 9 | Acceptance asked mid-publish (`acceptanceRequired`) | Goes to `/legal/accept` and back | — | NONE (browser) | none |
| 10 | Success: in review `post.review.reviewBody` (:484-489); share (checking / wait, :492-527); My listings `nav.myListings`, Home (:539-550) | Says it is in review; links | works | PW-123 :949-950; LGC-1 :602; PS-1 :985 | none |
| 11 | Amharic; 360 / 768 | — | — | NONE | none |

**Browser tests:** post-wizard-bundle2 PW-123/PS-1, legal-certify LGC-1, dialogs, photo-pipeline, admin-listings AL-20, admin-screening SC-25. **360 px sideways: none.**

## Screen 8 — My listings: `src/routes/my-listings.tsx` (36 lines) → my-listings-page.tsx (965 lines)

The list reads `my_listings` (my-listings.ts:249). Row actions (my-listing.ts:342-376):
- `set_listing_reserved` refuses `notYourListing`, `badValue`, `notLive` (migration 20261115203600:88-92).
- `mark_sold` refuses `notYourListing`, `illegalTransition`, `badValue`, `notLive` (same file :52-92).
- `transition_listing` (close / reopen / delete) refuses `notYourListing`, `badValue` (20261118012600:55, :78).
- `renew_listing` / `resume_listing` refuse `notYourListing`, `notPaused` (20261115203700:58-120).
- `copy_my_listing` refuses `notYourListing`, `listingNotFound`, `notCopied`, `residencyUnknown` (20261115203800:91-98).

Words: `SELLER_DOOR_REFUSALS` (my-listing.ts:268-288). Generic is `myListings.error.failed` "That did not work. Try again." (en-base:144, am-base:133). Mapped codes: `notYourListing` / `listingNotFound` → `myListings.error.notYours` "This ad could not be found." (en-base:142); `illegalTransition` / `notLive` / `notPaused` / `renewNeedsExpired` / `ownerOnly` → `myListings.error.changed` (en-base:143); `rateLimited`; `severeRemove` → `myListings.error.severe` (en-base:160); `renewOff` (en-base:123); `residencyUnknown`; `noFreeSlot`. Unmapped, so they show the generic words: `badValue`, `notCopied` (D24).

| # | Control / event | Must do | Cases | Test | Defect |
|---|---|---|---|---|---|
| 1 | Signed out | Asks to sign in | signed out | MLP-3 my-listings-page:396 | none |
| 2 | Header `nav.myListings`; Post `nav.postListing` (:683-690) | → /post | works | MLP-6 :626 | none |
| 3 | Groups, search `myListings.searchPlaceholder` (:770-774), Filters (category, mark `myListings.filter.mark`, :198-210), Columns | Filters the list (keyset pages) | works | MLP-2 :314; MLP-5 :474; MLP-6; MLP-10 :580 | none |
| 4 | Loading `common.loading` (:737) / empty `myListings.empty` "No listings here yet." (en-member:82, am-member:83), :760 | — | empty | MLP-2 (rows); empty NONE | none |
| 5 | Failed `myListings.loadError` "Your listings could not be loaded." + raw class + Retry `common.retry` (:743-755) | Retry refetches | failed | NONE | D23 |
| 6 | Row ⋯: Edit `myListings.edit` (:499), Open `myListings.open` (:530), Share `adPage.share.open` (:542), Promote `myListings.action.promote` "Promote ad" (:559), Post similar `myListings.action.copy` (:569), Delete `myListings.action.delete` (:518), and the state actions (reserve, sold, close, reopen, renew, resume) via `take(action)` (:553) | Each door above | works | MLP-6; MLP-8 :837 (Share); MLA-14 my-listings-ad:970 (Edit, Post similar); LVP-1 my-listings-promote:298 | none |
| 7 | Confirm `my-listings-confirm` with Cancel / Yes (:875-896) | Asks before delete or sold | works | MLA-5 :473; MLA-7 :593 | none |
| 8 | Bulk actions (`my-listings-bulk-*`, :660, :825), from tablet width | Acts on several ads | 360 / 768 | MLP-7 :767 | none |
| 9 | Action refusals in the seller family (above) | Words per code | refused | doors ML-2 my-listings-doors:321, ML-3, ML-7; screen: MLA-10 :745 (severe), FSL-3 my-listings-levels:848 (noFreeSlot); others NONE | D24 |
| 10 | Pager (DataTable keyset) | Pages | works | NONE (browser) | none |
| 11 | Amharic; 768 | — | — | MLP-7 (768 bulk); Amharic NONE | none |

**Browser tests:** my-listings-page (MLP-1…MLP-11), my-listings-ad, my-listings-doors, my-listings-levels, my-listings-promote. **360 px sideways: none** (MLP-7 checks a phone acts one ad at a time, not overflow).

## Screen 9 — one ad: `src/routes/my-listings_.$listingId.tsx` (45 lines) → my-listing-page.tsx (875 lines)

Reads `my_listing`, `listing_history`, `listing_counts` (my-listing.ts:86-174). Actions use the same doors and words as screen 8. Promote: `promote_options` / `set_listing_level` / `set_listing_reach` (promote-service.ts:172-272). Refusals (migration 20261115204000:64-169): `notYourListing`, `notLive`, `unknownLevel`, `sameLevel`, `lowerLevel`, `listingNotPlaced`, `levelNotAvailable`, `seasonEnded`, `notOffered`, `creditsNotAvailable`, `unknownReach`, `includedReach`, `sameReach`, `lowerReach`. Every one has words in REFUSAL_KEY / REACH_REFUSAL_KEY (promote-service.ts:180-205); the generic is `door.refused` (en-base:765).

| # | Control / event | Must do | Cases | Test | Defect |
|---|---|---|---|---|---|
| 1 | Back `nav.myListings` (:163-167) | → list | works | MLA-3 :349 | none |
| 2 | Loading / error `myListings.ad.loadError` "This ad could not be loaded." + Retry (:361-375) / not found `myListings.ad.notFound` (en-member:104-105, am-member:105-106), :385 | — | failed; not yours | MLA-6 :519 (another seller's); load error NONE | none |
| 3 | Open public page `myListings.ad.openPublic` (:475-478) | → /l/$slug | works | MLA-3 | none |
| 4 | Edit (:499-506) / Continue on a draft `myListings.continue` (:515-517) | → edit / wizard | works | MLA-13 :872; MLA-6 | none |
| 5 | State actions (reserve, sold, close, reopen, renew, resume, delete) in the action bar (:467-575) | Doors of screen 8 | works | MLA-3, MLA-4 :424, MLA-5, MLA-6, MLA-7, MLA-9 :677, MLA-12 :826; FSL-3 | none |
| 6 | Promote `myListings.action.promote` (:548-553) → promote-sheet.tsx: level and reach choices | `set_listing_level` / `set_listing_reach` | works; each refusal | LVP-1 :298, LVP-2 :354, LVP-5 :410; LDR-2 my-listings-levels:385 (door); promote-sheet.test.tsx | none |
| 7 | Post similar (:562-567) | `copy_my_listing` → new draft | works; `notCopied` | MLA-14 :970; ML-13 doors:921; refusal NONE | D24 |
| 8 | Share (row ⋯ / share sheet) | Share dialog | works | MLP-8; MLA-8? (not read) | none |
| 9 | Problem line `my-listing-problem` (:587); paused help `myListings.pausedHelp` (:615-616); in review `myListings.ad.waiting` (en-base:121) | Explains the state | works | MLA-11 :767 | none |
| 10 | Visibility, dates, sold days (:621-659) | — | works | MLA-3; MLA-4 | none |
| 11 | As buyers see it, identity failed + raw class (:667-671) | — | failed | NONE | D23 |
| 12 | History lines (:767-792) / empty `myListings.history.empty` | — | works | ML-9 doors:637; MLA-2 :323 | none |
| 13 | Amharic; 360 / 768 | — | — | NONE | none |

**Browser tests:** my-listings-ad (MLA-1…MLA-19), my-listings-promote (LVP-1…5), my-listings-levels, my-listings-doors. **360 px sideways: none.**

## Screen 10 — edit: `src/routes/my-listings_.$listingId_.edit.tsx` (59 lines)

It is the posting wizard in edit mode (route comment :8-11; `requireSignedIn` :27). It opens on Review, with no Edit on Category. Each step saves on Next through `edit_my_listing` (my-listing.ts:680). Every row of the wizard's steps 2–8 applies as written above. Only the differences are listed here.

| # | Control / event | Must do | Cases | Test | Defect |
|---|---|---|---|---|---|
| 1 | Opens on Review; Category has no Edit | — | works | MLA-13 :872; MLA-14 :970 | none |
| 2 | Next reads `myListings.editBox.save`; Done `myListings.editBox.done` / `doneReview` (wizard.tsx:1117-1118, :1384) | Saves through `edit_my_listing` | works | MLA-13; MLA-15 :1014 | none |
| 3 | `edit_my_listing` refusals (migration 20261115204100:72-142): `nothingChanged` → `myListings.editBox.nothing` "Nothing has changed yet." (en-base:168); `inReview` → `myListings.ad.waiting`; `notYourListing` / `listingNotFound` → notYours; `notEditable`, `draftNotEdited`, `renewFirst`, `listingNotEditable`, `badShape`, `streetTooLong` → no line in SELLER_DOOR_REFUSALS (my-listing.ts:268-288); `contactInNote`, `directionsTooLong` → posting words / generic | Words per code | refused | ML-11 doors:759, ML-12 :849, ML-14 :1015 (door only); screen NONE | D25 |
| 4 | Photos soon on a closed ad | Tick saves | works | MLA-16 :1144 | none |
| 5 | Place with no city closes Save | — | invalid | MLA-17 :1194 | none |
| 6 | Assist tries read before a click | — | works | MLA-18 :1258 | none |
| 7 | Photo cap at the ad's level | — | works | MLA-19 :1310 | none |

**360 px sideways: none.**

## Summary — area 2 (the wizard and My listings)

**NONE rows:**
- Frame: 1, 2, 7, 8, 15 (browser), 16, 17.
- Step 1: 9, 10, 12.
- Step 2: 5 (screen), 14, 15, 16.
- Step 3: 1, 2, 9 (no options), 10, 12, 16.
- Step 4: 2, 3, 5, 10, 11.
- Step 5: 3 (screen), 7, 8, 9.
- Step 6: 1, 2, 4, 9 (no results, satellite), 10, 11, 12.
- Step 7: 1, 3 (refusal), 6 (available), 7, 10, 11, 12, 13.
- Step 8: 2, 4, 7, 8, 9, 11.
- My listings (8): 4 (empty), 5, 9 (most codes on screen), 10, 11 (Amharic).
- One ad (9): 2 (load error), 7 (refusal), 11, 13.
- Edit (10): 3 (screen).

**Defects:**
- D15: wizard.tsx:860-861 and step-category.tsx:229-234. "This draft could not be opened." and "The categories could not be loaded." offer no Retry (law C4).
- D16: posting-service.ts:56-57. A sign-in that ends mid-way is treated as an unreachable server (status 401), so the wizard shows "Not saved yet — we keep trying." (wizard.tsx:1106, :1391-1394) and never asks the person to sign in again. This is from reading; the retry loop was not traced through use-draft.ts.

- D17: api/upload/photo.ts:279 answers `levelNotAvailable`, which has no line in `PHOTO_REASONS` (refusal-text.ts:111-138), so the seller sees only "This photo was not accepted." (en-base:561). No test shows any row refusal's words on screen (`post-photo-row-refusal`, step-photos.tsx:682).
- D18: step-specifications.tsx:1197-1198 and step-pricing.tsx:461-462. "These details could not be loaded." and "The currency list could not be loaded. Try again in a moment." offer no Retry (law C4). No test covers either.
- D19: step-details.tsx:411-416. The assist button is drawn even when the writing help is switched off (assist.ts:324-325), so the seller learns it is off only after pressing. No test shows any assist refusal (`post-assist-refusal`, :453).

- D20: step-who.tsx:687 and step-review.tsx:597-598 show the raw failure class and status (for example " (network 503)") to the seller, untranslated. Same kind as D9.
- D21: the pin door's `badLatitude`, `badLongitude`, `badPrecision`, `badZoom` and `directionsTooLong` (migration 20261115203900:85-109) have no line in `DRAFT_REASONS` (refusal-text.ts:27-102). They fall to the generic "That could not be saved." (en-base:586). Step-where's market and tree failures (:1571-1574, :1627-1631) also offer no Retry (D18's kind).
- D22: `publish_listing`'s `illegalTransition` (:171) and `listingNotPlaced` (:193) have no words (refusal-text.ts:27-102), so Publish shows "That could not be saved." No test shows any publish refusal on screen (`post-review-refusal`, step-review.tsx:835). Other families already have words for the same codes: my-listing.ts:282 maps `illegalTransition` → `myListings.error.changed`, and promote-service.ts:190 maps `listingNotPlaced` → `myListings.promote.error.listingNotPlaced` "Add the ad's place before promoting it." (en-member:672).

- D23: my-listings-page.tsx:746 and my-listing-page.tsx:671 show the raw failure class and status to the seller. Same kind as D9 and D20.
- D24: `badValue` (mark_sold / set_listing_reserved / transition_listing, migrations 20261115203600:89, 20261118012600:78) and `notCopied` (20261115203800:93) have no line in SELLER_DOOR_REFUSALS (my-listing.ts:268-288). They show "That did not work. Try again." (en-base:144).
- D25: `edit_my_listing`'s `notEditable`, `draftNotEdited`, `renewFirst`, `listingNotEditable`, `badShape` and `streetTooLong` (migration 20261115204100:78-134) have no seller words in my-listing.ts:268-288. Which family the edit screen reads them through was not traced; it is to confirm.

**Left for the next parts:**
- `account`, `account_.saved`, `account_.legal`, `account_.legal_.$versionId`.
