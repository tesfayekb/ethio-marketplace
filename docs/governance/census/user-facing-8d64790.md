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
| 8 | Share (row ⋯ / share sheet) | Share dialog | works | MLP-8 my-listings-page:837 | none |
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

## Screen 11 — Account: `src/routes/account.tsx` (30 lines, `requireSignedIn` :10) → account-overview.tsx (276 lines)

| # | Control / event | Must do | Cases | Test | Defect |
|---|---|---|---|---|---|
| 1 | Loading `common.loading` / failed `account.overview.loadError` "Your account overview couldn't be loaded." (en-member:55, am-member:56), :130-134 | Says so | failed | NONE | D26 (no Retry) |
| 2 | Profile: alias, seller type, business, member since, home country, full name, channels (:138-194); `account.overview.notSet` | Shows the profile | works | layout / press specs (account-profile-name); PW bundle2 | none |
| 3 | Edit profile `account.overview.editProfile` (:216) | Opens the edit | works | NONE | none |
| 4 | Listings counts `account-listings-counts` (:219-237); none `account.overview.noListings`; Open `account-open-listings` | → /my-listings | works; empty | MLP-4 my-listings-page:450 | none |
| 5 | Saved and notifications cards; empty `account.overview.nothingSaved` / `noNotifications` (:242-249) | — | empty | NONE | none |
| 6 | Legal card, Open `account.legal.open` "Open" (en-member:144), :252-256 | → /account/legal | works | LGH-1 legal-history:122 | none |
| 7 | Quick actions `nav.postListing`, `nav.signInSecurity` (:260-266) | Links | works | NONE | none |
| 8 | Seller review notice (`SellerReviewNotice`, :24-25) | Shows the review state | works | NONE (browser) | none |
| 9 | Amharic; 360 / 768 / 1280 | — | — | NONE | none |

## Screen 12 — Saved: `src/routes/account_.saved.tsx` (29 lines, `requireSignedIn` :9) → saved-page.tsx (155 lines)

Reads `mySaved`; Remove calls `unsaveListing` (ad-page/save.ts). The door is `unsave_listing` (migration 20261117040400). It refuses through `door_context('owner', …, 'save')` codes (`ownListing`, `rateLimited`, header :6-10).

| # | Control / event | Must do | Cases | Test | Defect |
|---|---|---|---|---|---|
| 1 | Loading / failed `account.saved.failed` "Your saved ads could not be loaded — try again." (en-member:80, am-member:81), :88-93 | Says so | failed | NONE | D26 (no Retry) |
| 2 | Empty `account.saved.empty` (en-member:76), :96-97 | — | empty | SAVED-2 account-saved:97 | none |
| 3 | Saved card (`saved-item`, :104), opens the ad; sold ribbon | — | works | SAVED-1 :20 | none |
| 4 | Gone ad: `account.saved.unavailable` "No longer available" (en-member:77), :118-121 | Shows the card without a link | gone | SAVED-1 | none |
| 5 | Remove `account.saved.remove` "Remove" (en-member:78), :129-133 | Unsaves and drops the card (:55-70) | works; refused; no public id (:51-53) | SAVED-1 (works); refused NONE | D27 |
| 6 | Show more `account.saved.more` (en-member:79), :146-150 | Next page | works | NONE | none |
| 7 | Signed out: sign-in return | — | signed out | SAVED-1 | none |
| 8 | Amharic; 360 / 768 | — | — | NONE | none |

## Screen 13 — My legal documents: `src/routes/account_.legal.tsx` (29 lines) → my-legal-page.tsx (130 lines)

| # | Control / event | Must do | Cases | Test | Defect |
|---|---|---|---|---|---|
| 1 | Loading / failed `myLegal.loadError` "Your legal documents could not be loaded." (en-member:656, am-member:630), :46-51 | Says so | failed | NONE | D26 (no Retry) |
| 2 | Acceptances, with meta `myLegal.acceptedMeta`, adult line, consent (:54-86); none `myLegal.noAcceptances` | — | works; empty | LGH-1 :122; LGH-3 :187 | none |
| 3 | Open a version `myLegal.open` (:35-36) | → version | works | LGH-1 | none |
| 4 | Notices `myLegal.notices` / none `myLegal.noNotices` (:95-114) | — | works; empty | LGH-1; LGH-3 | none |
| 5 | Amharic; 360 / 768 | — | — | NONE | none |

## Screen 14 — one version: `src/routes/account_.legal_.$versionId.tsx` (34 lines) → my-legal-version.tsx (74 lines)

| # | Control / event | Must do | Cases | Test | Defect |
|---|---|---|---|---|---|
| 1 | Back `myLegal.back` (:25-26) | → list | works | LGH-2 legal-history:160 | none |
| 2 | Not his / bad id: `myLegal.notFound` "This document is not available." (en-member:655), :38-39 | — | not his | LGH-2 | D28 |
| 3 | Failed `myLegal.loadError` (:41-43) | — | failed | NONE | D26 (no Retry) |
| 4 | Text with version and frozen facts; fallback note `legal.fallbackNote` (:53-59) | Shows in the site's language | works | LGH-2 | none |
| 5 | Amharic; 360 / 768 | — | — | NONE | none |

**Browser tests (11–14):** account-saved (SAVED-1, SAVED-2), legal-history (LGH-1…3), my-listings-page MLP-4, layout, press. **360 px sideways: none for 11–14.**

## Summary — area 2 (closed)

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
- Account (11): 1, 3, 5, 7, 8, 9.
- Saved (12): 1, 5 (refused), 6, 8.
- Legal (13): 1, 5. Version (14): 3, 5.

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
- D25 (confirmed): the edit saves through my-listing.ts:686-688. That reads a raised refusal with `actionErrorKey` (:292-293), which reads `SELLER_DOOR_REFUSALS` (:266-288). So `notEditable`, `draftNotEdited`, `renewFirst`, `listingNotEditable`, `badShape`, `streetTooLong`, `contactInNote` and `directionsTooLong` (migration 20261115204100:78-142) all show "That did not work. Try again." (en-base:144).

- D26: the account overview (account-overview.tsx:131-134), Saved (saved-page.tsx:90-93), My legal (my-legal-page.tsx:48-51) and the version (my-legal-version.tsx:41-43) say a read failed but offer no Retry. Same kind as D18.
- D27: a failed or refused Remove on Saved (saved-page.tsx:51-58) shows the page's load words, "Your saved ads could not be loaded — try again." (:135-137, en-member:80). The door's code (`rateLimited` etc.) is dropped, so it never reaches the refusal reader.
- D28: my-legal-version.tsx:38 tells "not found" from failure by comparing the raw database message "invalid input syntax for type uuid". It should use a typed code.

Area 2 is closed: every member screen listed for it is in the census (settings excepted, Cursor's).

# AREA 3 — admin consoles (27 `admin*` route files)

## Screen A1 — admin shell: `src/routes/admin.tsx` (118 lines)

Gate (`AdminGate`, :37-83):
- It reads `usePermissions` (permissions/usePermissions.ts:64-67).
- Signed out, or without `admin_panel:access` (`ADMIN_PANEL_PERMISSION`, permissions/service.ts:21), it replaces the page with `SIGN_OUT_LANDING` = "/" (sign-out-landing.ts:20). That is admin.tsx:55-58.
- A section without its permission (`sectionAt`, sections.ts) sets `accessDenied` and replaces the page with /admin (:60-62).
- While anything is pending it draws `admin.loading` "Checking your access…" (en-admin:2175, am-admin:2038), :66-76.

Rail sections and their permissions (sections.ts): Locations `/admin/locations` (:46); All listings `listings:view` (:68-69); Screening `listings:review` (:76-77); Monetisation `packages:view` (:88-89); Users `profiles:view` (:96-97); Roles `roles:view` (:103-104); Audit `audit_logs:view` (:110-111); Places `locations:view` (:117-118); Countries `countries:view` (:125-126); Categories / Attributes / Images `categories:view` (:133-150); Translations `translations:view` (:157-158); Legal `legal:view` with alert `legalReview` (:164-168); AI `services:view` (:172-173). Alerts are read by `useNavAlerts` (sections' `alert`).

| # | Control / event | Permission (file:line) | Without it, the staff member sees | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Enter /admin | `admin_panel:access` (admin.tsx:47) | Sent to "/" (:56); regular user | works; refused | A-6 admin-shell:90; A-8 :274 | none |
| 2 | Deep link to a section | that section's permission (:48) | Sent to /admin with `admin.accessDenied` "You don't have access to that section." (en-admin:65, am-admin:64) | refused | A-7 :193 | none |
| 3 | Permission read fails | — | `usePermissions` error (:67) is not read by the gate (:40-47). Empty permissions count as "not allowed", so the person is sent to "/" as if refused | failed | NONE | D29 |
| 4 | Rail items and groups (Categories group with sub-items) | per section | Item not drawn | works | A-5 :295; IN-1 :414 | none |
| 5 | Admin tab from the marketplace | `admin_panel:access` | Tab hidden | works | A-4 :255 | none |
| 6 | Menu alert (`legalReview`) | `legal:view` | Not drawn | works | NONE (browser) | none |
| 7 | Amharic; 360 / 768 / 1280 | — | — | — | i18n-coverage (strings only); widths NONE | none |

## Screen A2 — dashboard: `src/routes/admin.index.tsx` (73 lines)

| # | Control / event | Permission | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Title `admin.landing.title`, body `admin.landing.body` (:43, :64) | `admin_panel:access` (gate) | not reached | works | A-6 | none |
| 2 | Access notice `admin-access-notice` (:45-53) | — | shown after a refused section | refused | A-7 | none |
| 3 | Section cards `admin-section-link-<id>` (admin-nav.tsx:24-30), filtered by permission (`useAdminSections`) | each section's | card not drawn | works | A-6; A-7 | none |
| 4 | No sections `admin.noSections.title` / `body` (:56-61) | — | panel access with no section | empty | NONE | none |
| 5 | Amharic; 360 / 768 | — | — | — | NONE | none |

**360 px sideways (A1–A2): none.**

## Screen A3 — Users: `src/routes/admin.users.tsx` (41 lines) → users/users-list.tsx (310 lines)

Section permission is `profiles:view` (sections.ts:96-97). The list reads `admin_list_users` (admin-users-service.ts:81), behind `door_context('staff-reader','profiles','view')` (migration 20261114070800:59).

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Enter the page | `profiles:view` (sections.ts:97; door :59) | Sent to /admin with the access notice (A1 row 2) | refused | AU-1 admin-users:144 | none |
| 2 | Search `admin.users.searchPlaceholder` (:260-263) | same | — | works | AU-2 :165 | none |
| 3 | Status filter `admin.users.statusFilter` (:114) and role filter `admin.users.roleFilter` (:128) | same | — | works | AU-2; users-role-filter.test.tsx | none |
| 4 | Columns: name, email, country, status, roles, joined (:154-207); row opens the person | same | — | works | AU-13 :499 | none |
| 5 | Loading `admin.users.loading` / failed `admin.users.error` "Users could not be loaded." (en-admin:86) / empty `admin.users.empty` (en-admin:87), :244-253 | — | — | failed; empty | users-count.test.tsx; browser NONE | none |
| 6 | Pager and page size (DataTable keyset) | — | — | works | AU-13 | none |
| 7 | Amharic; 360 / 768 / 1280 | — | — | — | NONE | none |

## Screen A4 — one person: `src/routes/admin.users_.$userId.tsx` (34 lines) → users/user-detail.tsx (661 lines)

Doors (admin-users-service.ts:105-229):
- `admin_get_user`: `profiles:view` (migration 20261114070800:107).
- `admin_user_activity`: `profiles:view` and `audit_logs:view` (:225, :286).
- `admin_set_account_status`: `profiles:update` (20261114070600:50). It refuses `badValue` (:53), `required` reason (:56) and `unknownUser` (:64).
- `assign_role`: `roles:assign` (20261120100100:37). It refuses `roleReserved` (:40), `unknownRole` (:43), `badCountryCode` (:47) and `unknownUser` (:50).
- `revoke_role`: `roles:assign` (20261114070400:89). It refuses `roleReserved` (:92) and `unknownRole` (:95).
- `admin_update_profile`: `profiles:update` (20261114070900:57). It refuses `nameRequired` (:61), `unknownCountry` (:68), `unknownUser` (:76), `aliasShape` (:84), `aliasTaken` (:87) and `aliasReserved` (:90).
- `begin_impersonation`: `impersonation:use` (20261114070700:65). It refuses `impersonateSelf` (:66), the super-admin target (:67), `unknownUser` (:69), `badLength` reason (:73) and `sessionActive` (:77).

The UI hides controls by `profiles:update` (user-detail.tsx:50), `roles:assign` (:51), `impersonation:use` (:175) and `translations:manage` (:370).

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Back `admin.users.detail.back` (:87), crumb | `profiles:view` | — | works | AU-7 :235 | none |
| 2 | Loading / failed `admin.users.error` / not found `admin.users.detail.notFound` "This user does not exist." (en-admin:98), :93-104 | `profiles:view` | — | failed; unknown | NONE (failed); not found NONE | none |
| 3 | Identity: email, alias, country, joined, last sign-in (:143-149) | `profiles:view` | — | works | AU-3 :183 | none |
| 4 | Status: reason `deactivate-reason` (:206-219), "reason required" `admin.users.status.reasonRequired` (en-admin:108), :231-234; Deactivate / Activate (:240-267) | `profiles:update` (:50; door :50) | Status shown, no controls; own row `admin.users.status.ownAccount` (:159-196) | works; own row | AU-3; AU-8 :252; AU-6 :335 (door) | none |
| 5 | Status refused: `badValue`, `required`, `unknownUser` | — | — | refused | NONE (screen) | D30 — all show "The status could not be changed." (`admin.users.status.failed`, en-admin:112, :270-272) |
| 6 | Roles: chips, System role `admin.users.roles.locked` (en-admin:120), Remove `role-remove-<role>` (:293-311); Assign select + `assign-role` (:326-357) | `roles:assign` (:51; doors :37, :89) | Chips without Remove / Assign | works | AU-4 :265 | none |
| 7 | Role refused: `roleReserved`, `unknownRole`, `badCountryCode`, `unknownUser` | — | — | refused | NONE (screen) | D30 — all show "The role change failed." (`admin.users.roles.failed`, en-admin:121, :361-363) |
| 8 | View as (ImpersonationStarter): Start `impersonation-begin`, reason `impersonation-reason` (impersonation-starter.tsx:55-114); short reason `impersonation.reasonTooShort` (:60) | `impersonation:use` (:175; door :65) | Not drawn; never on own row | works | admin-audit spec; i18n-sign-in-language spec | none |
| 9 | View-as refused: `impersonateSelf`, super-admin target, `unknownUser`, `badLength`, `sessionActive` | — | — | refused | NONE | D31 — `readRefusal(failure, { generic: "impersonation.failed" })` (:80) has no words, so every code shows the generic |
| 10 | Activity list `user-activity-list` (:381-420), loading / error / empty | `audit_logs:view` (door :286) | Error line `admin.users.error` "Users could not be loaded." (:413-416) | works; failed | AU-3 (audit row); AU-9 :350 | D32 |
| 11 | Edit profile: name, alias, alias reason, country, Save `edit-save`, saved `edit-saved`, error `edit-error` (:480-637) | `profiles:update` (:50; door :57) | Not drawn; own row: no form | works; own row | AU-9; AU-11 :481 | none |
| 12 | Edit refused (`PROFILE_EDIT_REFUSALS`, admin-users-service.ts:247-262): `permissionDenied` → `errorPermission` "You are not allowed to edit this profile." (en-base:449); `nameRequired` → `errorNameRequired` "A display name is required." (en-base:444); `unknownCountry` → `errorCountry` "That country is not available." (en-base:447); `aliasShape` → `errorAliasFormat` "That seller alias is not allowed." (en-base:446); `aliasTaken` → `errorAliasTaken` "That seller alias is already taken." (en-base:445); `aliasReserved` → `errorAliasReason` "This name needs a reason before it can be set." (en-base:442); step-up → `errorStepUp`; `unknownUser` / `rateLimited` → generic `admin.users.edit.failed` "The profile could not be saved." (en-base:443) | — | — | refused | AU-10 :378 (aliasTaken); AU-12 :418 (aliasReserved); others NONE | none |
| 13 | Translator block (:370) | `translations:manage` | Not drawn | works | NONE | none |
| 14 | Deactivated staff hold no permission | — | — | — | AU-14 :562 | none |
| 15 | Amharic; 360 / 768 | — | — | — | NONE | none |

**Browser tests (A3–A4):** admin-users (AU-1…AU-14), admin-audit, i18n-sign-in-language. **360 px sideways: none.**

- D30: on one person's page, the status and role doors' codes (`badValue`, `required`, `unknownUser`; `roleReserved`, `unknownRole`, `badCountryCode`) reach no words. user-detail.tsx:270-272 and :361-363 show one sentence each, whatever the code.
- D31: View as (impersonation-starter.tsx:80) reads the refusal with no words. `impersonateSelf`, the super-admin target, `unknownUser`, `badLength` and `sessionActive` (migration 20261114070700:66-77) all show `impersonation.failed`.
- D32: a failed activity read on one person's page (user-detail.tsx:413-416) says "Users could not be loaded." (en-admin:86). Those are the list's words, not the activity's, and there is no Retry.

## Screen A5 — All listings: `src/routes/admin.listings.tsx` → admin-listings/listings-page.tsx (LP)

Gate: `listings:view` (sections.ts:67-71; admin.tsx:72-97). The list reads `admin_list_listings` (use-admin-listings.ts:69; migration 20261122023200:67 `listings:view`). It refuses `badValue:view` (:76) and `badValue:tier` (:81). Moves go through `admin_move_listing` (20261118012400:43, `listings:enforce`), which delegates to `_core`. The level is `admin_set_listing_tier` (20261118012500:55, `listings:enforce`). Settings are `admin_set_listing_policy` (same file :154), which refuses `badValue:renew_days` (:156). Words come from `listing-refusals.ts:17-45` (en-member:231-279); the generic is `common.error` "Something went wrong" (en-base:34).

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Views all / live / waiting / ended / removed (LP:287-288, :608-619); search (:669-678) | `listings:view` | page refused (A1 row 2) | works | AL-10 admin-listings:727; AL-11 :812; AL-13 :903 | none |
| 2 | Filters: country, category (multi), seller, level, from / to dates; chips; Columns (LP:175-221, :681-698) | seller email `profiles:view` (LP:119) | non-email seller placeholder | works | AL-10; ATR-6 :2475; AL-32 :2171 (door); dates UI NONE | none |
| 3 | Row open; ⋯ menu: Send back, Remove, Restore (move-reasons.ts:42-48), Set level, View as seller (LP:307-343) | moves/level `listings:enforce` (LP:120), not own; View as `impersonation:use` (LP:121) | items omitted (menu keeps Open) | works | AL-13; AL-14 :958; AL-17 :1165; ATR-6; ATR-7 :2553 | none |
| 4 | Move dialog: reason, note (Other requires a note, max 500 characters), confirm (move-dialog.tsx:72-143) | inherits | — | invalid | AL-14 | none |
| 5 | Move refusals: `listingNotFound`, `ownListing`, `illegalTransition`, `severeRestore`, `rateLimited`(+when), `permissionDenied`, `noteRequired`, `noteTooLong`, `noFreeSlot` → own words (en-member:231-279); others → generic | — | — | refused | AL-7/8/9 :552-665 (door); screen AL-13/14 | none |
| 6 | Level dialog: pick, days, reason, note (tier-dialog.tsx:70-217). Refusals: `badValue:tier` → "Unknown level."; `nothingChanged` → "The ad already has this level."; `listingRemoved` → "A removed ad takes no level." (en-admin:367-369); `badDays` (en-admin:2219); `ownListing`, `listingNotFound`, `noteRequired`, `noteTooLong` → shared words; `badValue:reason` → `admin.listings.move.pickReason` | `listings:enforce` | — | works; refused | ATR-1…ATR-4 :2259-2403 | none |
| 7 | Selection and bulk Remove / Restore, one guarded move per ad (LP:345-391, :704-740) | `listings:enforce` | no selection | works | AL-15 :998; absence AL-11 :841 | none |
| 8 | Settings: renew allowed and days (listing-settings.tsx:124-239). `badValue:renew_days` → "A whole number from 1 to 365." (en-admin:393); others → "The settings were not saved." (en-admin:397) | `listings:enforce` | button omitted | works | AL-30 :2012 | none |
| 9 | Report count per row (LP:547-555), `admin_open_report_counts` (`listings:review`, 20261118012900:256; `badSize` :258) | `listings:review` (LP:247-250) | column absent | works; failed | AL-31 :2081 | none |
| 10 | Photo warning per row (LP:466-468), `admin_warned_listings` | `listings:view` | — | failed | SC-22 admin-screening:1102 | D36 |
| 11 | Loading / empty `listings-empty` / failed `common.error` + Retry (LP:635-661); pager (DataTable) | — | — | failed; empty | AL-15 :1048 (empty); failed NONE; Prev/Next NONE | none |
| 12 | Amharic; 360 / 768 / 1280 | — | — | — | NONE (shell-table-law.spec.ts:18 visits /admin/users only) | none |

## Screen A6 — one listing: `admin.listings_.$listingId.tsx` → admin-listings/listing-page.tsx (DP)

Reads `admin_listing_detail` (20261118012900:96, `listings:view`; `listingNotFound` :100). Also `admin_listing_photos` (20261123020700:56; `listingNotFound` :59), `admin_listing_reports` (20261118012900:207, `listings:review`) and `admin_listing_certifications` (:46). Undo: `admin_undo_listing_edit` (20261118012200:48, `listings:enforce`). It refuses `listingNotFound` (:53), `nothingToUndo` (:62, :72, :94), `listingChanged` (:65, :82) and `photoRemovalFinal` (:75). Photo Allow: `admin_allow_listing_photo` (20261118012300:45, `listings:review`). This page has no Approve / Reject of its own (DP:487-549); those live in the staff edit coming from Screening.

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Loading; not found `admin.listings.detail.notFound`, else `common.error` (DP:208-225); Back | `listings:view` | — | unknown; failed | AL-16 :1059; AL-18 :1229 | none |
| 2 | Edit (DP:487-504); Send back / Remove / Restore (:506-519); Set level (:521-535); View as seller (:537-549) | `listings:enforce` and not own (DP:136, :230-235); View as `impersonation:use` (:137) | buttons omitted | works | AL-17; AL-20 :1347; ATR-1…4; View as positive NONE | none |
| 3 | Move / level refusals | — | — | refused | as A5 rows 5–6 | none |
| 4 | Buyer preview `listing-as-seen` (DP:563-601) | `listings:view` | — | works | AL-17 | none |
| 5 | Photos: remove one (reason / note; `admin_edit_listing` remove_photos); Allow a held photo; load failed + Retry (listing-photos.tsx:92-417) | remove `listings:enforce`; Allow `listings:review` (DP:143-144, :237) | controls absent | works; failed | AL-28 :1856; AL-6 :496 (door); Allow on this page NONE; failed NONE | none |
| 6 | Reports card (DP:612-655) | `listings:review` | card absent | works; failed | AL-31 | none |
| 7 | Seller link (DP:664-690) | `profiles:view` (DP:138) | plain seller text | works | AL-18 (restricted) | none |
| 8 | History lines, show / hide changes (DP:767-850) | — | — | works | AL-17/18/20/26; toggle NONE | none |
| 9 | Undo the newest staff edit + dialog (DP:859-876; undo-dialog.tsx:39-95). `listingChanged` / `nothingToUndo` → "The listing has changed since this edit, so it cannot be undone." (en-admin:453); `photoRemovalFinal` → generic | `listings:enforce` (undo-edit.ts:22-30) | absent | works; refused | AL-26 :1670; AL-27 :1755 (door) | D33 |
| 10 | Certifications (DP:996-1045) | links need `legal:view` (DP:987) | text, no link | works | NONE | none |
| 11 | Amharic; 360 / 768 | — | — | — | NONE | none |

## Screen A7 — staff edit: `admin.listings_.$listingId_.edit.tsx` (171 lines)

This is the posting wizard as staff, following the area 2 rows. Staff may edit Specifications, Price and Details; Category, Photos, Place and Contact have no Edit (step-review.tsx:630-660). Saves go through `admin_edit_listing` (20261118012400:64, `listings:enforce`, delegates to `_core`). The route reaches Approve / Reject when opened `?from=screening` (route :77), through `admin_review_listing` (20261118013000:253, `listings:review`; `badValue:status` :255).

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Reason and note box (needed before a change) (step-review.tsx:565-583) | backend `listings:enforce` | the save is refused | invalid | AL-20 :1347 | none |
| 2 | Step navigation; Next saves the changed fields (use-edit-draft.ts:436-438); edit refusals `nothingChanged` → "Nothing has changed." / `listingRemoved` → "A removed listing is not edited. Restore it first." (en-member:275-276) | — | — | works; refused | AL-21 :1460; AL-22 :1531; AL-23 :1577; AL-3/24/25 :331-355 (door) | none |
| 3 | Identity failed + raw class (step-review.tsx:595-601) | — | — | failed | NONE | D20 (shared) |
| 4 | Done (step-review.tsx:856-865) → detail, or Screening with the ad open | — | — | works | AL-20; SC-25 admin-screening:1318 | none |
| 5 | Approve / Reject + confirm (route :87-184; step-review.tsx:867-884). `ownListing` → "This is your own ad. Another reviewer must approve or reject it." (en-admin:549-550); shared decision words; `badValue:status` → generic | `from=screening` and `listings:review` (route :77) | absent | works; refused | SC-26 :1393; refusal line NONE | none |
| 6 | Route opens directly without `listings:enforce` | section gate `listings:view` only | wizard opens; save refused by the server | refused | NONE | none |

## Screen A8 — Screening: `admin.screening.tsx` → admin-screening/screening-page.tsx (S)

Gate: `listings:review` (sections.ts:75-79). Queue: `admin_screening_queue` (20261122023400:52; `badValue:tier` :56). Decisions: `admin_review_listing` (20261118013000:253; `badValue:status` :255). Facts: `admin_screening_facts` (20261118012800:152; `listingNotFound` :157). Show number: `admin_reveal_listing_contact` (20261118012700:76, `listings:reveal`; `badValue:channel` :78, `listingNotFound` :83). Name checks: list / summary (20261118012900:225, :240, `listings:view`) and clear (20261118012700:116, `profiles:update`; `badValue` :117-118). Photo reviews / changes (20261123020600:93, :121; Allow and review 20261118012300:45, :64, `listings:review`). Job health / resume (20261119031000:185 `services:view`; 20261119030900:109 `services:manage`, `badValue:job` :110). Decision words come from use-screening.ts:281-291 with listing-refusals.ts:19-29. Show-number words are `revealLimited`(+When) and `revealNotShown` (en-admin:545-548). Photo words: `reviewGone` → "This photo was already decided." (en-admin:422); `changeGone` → "This change was already reviewed." (en-admin:530). Every other code shows `common.error`.

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Header; queue rows (S:281-334, :628-667) | `listings:review` | page refused | works | SC-1 admin-screening:224 | none |
| 2 | Search; Filters: Country, Seller, Level; chips; Columns (S:214-259, :699-724) | seller email `profiles:view` (S:137) | non-email placeholder | works | SC-5 :316; SC-11 :486; SC-27 :1472; SC-28/29 :1543-1587; SC-30 :1614 | none |
| 3 | Row ⋯ Preview / Approve / Reject; selection and bulk Approve / Reject; confirm (S:469-489, :727-865) | `listings:review` (S:136) | actions and selection omitted | works; refused | SC-2 :237; SC-3 :256; SC-4 :279; SC-12 :557; SC-16 :297 (step-up); bulk Reject NONE | D35 |
| 4 | Decision refusals: `listingNotFound`, `ownListing`, `illegalTransition`, `severeRestore`, `rateLimited`, `permissionDenied`, `noteRequired`, `noteTooLong`, `noFreeSlot` → own words; `badValue:status` → generic | — | — | refused | SC-4 (role); others NONE | none |
| 5 | Preview: facts, photos, held-photo note, marked photos (S:870-939) | marked photos and Edit `listings:enforce` (S:139); Open listing `listings:view` (S:141) | omitted | works | SC-6 :327; SC-7 :358; SC-13 :600; SC-18 :849; SC-20 :916; SC-23 :1151; SC-25 | none |
| 6 | Show number per channel (S:440-462) | UI `listings:review` (S:440); door `listings:reveal` (migration :76) | a reviewer without reveal sees the button, then "Something went wrong" | works; limited; not shown | SC-9 :440; SC-15 :720; SC-17 :409 | D34 |
| 7 | Name checks: count, list, Allow (reason) / Rename (N:103-352) | list `listings:view`; Allow / Rename `profiles:update` (S:143) | Allow / Rename drawn but disabled (N:269-281) | works | NCQ-E2E-1…4 name-check-queue:65-206 | none |
| 8 | Photos to review: Allow (R:91-210); live-ad photo changes: Mark reviewed (C:81-203) | `listings:review` | sections omitted | works; gone | SC-21 :985; SC-24 :1239 | none |
| 9 | Job line, Resume when paused (J:43-115) | view `services:view`; Resume `services:manage` | omitted | works | NCQ-E2E-3 :206 | none |
| 10 | Queue loading / empty / failed + Retry (S:671-692); pager | — | — | failed; empty | SC-5 (empty); failed NONE; pager NONE | none |
| 11 | Name / photo / change / job read failures use their section's fixed words + Retry; the warned-ads read failure becomes an empty set (S:497) | — | — | failed | NONE | D36 |
| 12 | Amharic; 360 / 768 | — | — | — | NONE | none |

**360 px sideways (A5–A8): none.** shell-table-law.spec.ts:18-32 checks /admin/users only.

- D33: `admin_undo_listing_edit`'s `photoRemovalFinal` (migration 20261118012200:75) has no line in `UNDO_REFUSALS` (undo-edit.ts:34-45). It shows "Something went wrong" (en-base:34).
- D34: Screening's Show number is drawn for `listings:review` (screening-page.tsx:136, :440). The door checks `listings:reveal` (migration 20261118012700:76), so a reviewer without it gets "Something went wrong". The same mismatch on the screen: `badValue:channel` and `listingNotFound` (:78, :83) also fall to `common.error` (screening-page.tsx:417-420).
- D35: Screening's Reject sends no reason or note (screening-page.tsx:843-850; use-screening.ts:274-277). The listings console's moves require both (move-reasons.ts:52-56). No bulk Reject browser test.
- D36: a failed warned-ads read draws no line, on Screening (screening-page.tsx:497) and on All listings (listings-page.tsx:254). The photo warnings vanish silently.
- D37 (notes, not behaviour): admin.screening.tsx:10-12 and the staff edit route's opening comment name `transition_listing`, but the code calls `admin_review_listing`. use-screening.ts:382-385 says Show number needs review, but the door checks reveal.

## Screen A9 — Roles: `admin.roles.tsx` → admin/roles/roles-list.tsx (RL)

Gate: `roles:view` (sections.ts:102-106). Reads `admin_list_roles_detailed` (migration 20261114070800:153, `roles:view`; no refusals). Create: `admin_create_role` (20261114070500:50, `roles:create`). It refuses `nameRequired` (:54) → "A role key is required.", `badSlug` (:57) → "Use lowercase letters, digits, dash or underscore." and `duplicateKey` (:60) → "That role key is already taken." (en-base:456-458; map roles-service.ts:155-176). Other codes → "The role could not be created." (en-admin:164).

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Heading, search, Columns, rows (name, display, kind, members, permissions), row Open / View members, pager (RL:60-230) | `roles:view` | page refused (A1) | works | RP-1 admin-roles:133; RP-2 :166; RP-16 :496; search NONE | none |
| 2 | Create: key, display name, description, submit (step-up), cancel, error (RL:158-375) | `roles:create` (RL:55) | button and form hidden | works; refused | RP-2 (works); refusals NONE | none |
| 3 | Loading / failed `admin.roles.error` / empty / no match (RL:231-246) | — | — | failed | NONE | D38 |
| 4 | Amharic; 360 | — | — | — | RP-8 :353-366; RP-11/12/17 (360 sideways via e2e/helpers/ui.ts:50-55) | none |

## Screen A10 — one role: `admin.roles_.$roleId.tsx` → role-detail.tsx (RD), permission-matrix.tsx (PM)

Doors (20261114070500):
- `admin_update_role` (:94, `roles:update`) refuses `unknownRole` (:97) and `systemRole` (:100).
- `admin_delete_role` (:131, `roles:delete`) refuses `unknownRole` (:134), `systemRole` (:135) and `hasDependents` (:137).
- `admin_set_role_permission` (:171, `roles:update`) refuses `unknownRole` (:174), `systemRole` (:175), `unknownPermission` (:182), `permissionReserved` (:188) and `corePermission` (:202).

Words:
- `systemRole` → "System roles cannot be changed." (en-base:453).
- `hasDependents` → "This role still has members." (:455).
- `permissionReserved` → "System-managed — cannot be granted to custom roles" (:450).
- `corePermission` → "This core permission cannot be revoked." (:454).
- `permissionDenied` (:452) and step-up (:451) have their own words.
- `unknownRole` / `unknownPermission` → the operation's generic: "The role could not be saved." / "deleted." / "That permission change failed." (en-admin:172, :234, :185).

Roles are assigned on one person's page (A4 rows 6–7).

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Loading / failed / not found (RD:29-53); Back (RD:71-76) | `roles:view` | — | failed; unknown | NONE | D38 |
| 2 | Metadata: display name, description, Save (step-up) (RD:93-201) | `roles:update` and not a system role (RD:57, :91) | read-only, with the system-role note `admin.roles.systemLockedNote` (RD:115-116) | works; refused | RP-4 :209; edit NONE | D41 |
| 3 | Permission grid: grant / revoke per permission; locked, core, reserved and baseline marks (PM:79-187) | `roles:update` (RD:64-66) | locked text instead of buttons | works; refused | RP-3 :179; RP-6 :281; RP-7 :330; RP-11 :417; RP-12 :458; RP-17 :556 | D41 |
| 4 | Members count and link to Users (RD:212-225) | — (destination needs `profiles:view`) | link drawn; Users then refuses | works | RP-10 :395 | none |
| 5 | Danger: typed key, Delete (step-up); members block it (RD:239-317) | `roles:delete` and custom role (RD:58, :69) | section hidden | works; has members | RP-5 :249; RP-9 :369 | none |
| 6 | Amharic; 360 | — | — | — | RP-17 :591 (360) | none |

## Screen A11 — Audit: `admin.audit.tsx` → admin/audit/audit-page.tsx (AP)

Gate: `audit_logs:view` (sections.ts:109-113). Reads `admin_list_audit`, `admin_audit_facets` and `admin_audit_stats` (migration 20261114070800:286, :341, :357; no refusals). There is no export.

| # | Control / event | Permission | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Four counts with loading / failed / Retry (AP:254-287) | `audit_logs:view` | page refused | works; failed | AS-1 admin-audit:48; failed NONE | none |
| 2 | Trend chart with loading / failed / empty (AP:290-311; chart-frame.tsx:102-120) | — | — | failed | NONE | D38 |
| 3 | Search, action / entity / date filters, chips, Columns (AP:119-366) | — | — | works | AS-2 :68; AS-3 :113 | none |
| 4 | Facets read fails: the action / entity choices are silently empty (AP:122-135) | — | — | failed | NONE | D42 |
| 5 | Rows; expand detail (AP:323-400); pager with capped total (:403-418) | — | — | works | AS-2; AS-3; expand NONE | none |
| 6 | Loading / failed `admin.audit.error` / empty (AP:327-331) | — | — | failed | NONE | D38 |
| 7 | Amharic; 360 | — | — | — | AS-1 :65 (360) | none |

## Screen A12 — View as: `admin.impersonation_.$sessionId.tsx` → impersonation-view.tsx (IV), banner (IB), fallback notice (IN)

Reads `get_active_impersonation` (20261114070700:135), `impersonated_get_profile` and `impersonated_list_listings` (20261119150500:43, :63). End: `end_impersonation` (20261114070900:160; `noActiveSession` :163). Begin is covered in A4 (D31).

| # | Control / event | Permission | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Heading, countdown, read-only note (IV:152-170) | session check on the server | — | works | IMP-1 admin-audit:193 | none |
| 2 | End now on the page (IV:172-188) | session owner | — | works; refused | IMP-1 (works); failure NONE | D39 |
| 3 | Profile panel; loading / error / empty (IV:192-215; detail-panel.tsx:41-61) | — | — | failed | NONE | D38 |
| 4 | Ad list, Columns, pager (IV:91-258); empty `impersonation.listings.empty` | — | — | works; empty | IMP-1; empty NONE | none |
| 5 | Ad list loading / error: no words supplied (IV:262-263) | — | — | failed | NONE | D40 |
| 6 | Session ended: `impersonation.expired` "This impersonation session has ended." (en-admin:2201) + back (IV:65-85) | — | — | ended | NONE | none |
| 7 | Bar across pages: banner, Open, End now (IB:25-55); polls every 30 s (use-impersonation.ts:25-46) | staff only | not drawn | works; refused | IMP-1; IMP-6 :345; Open / End NONE | D39 |
| 8 | Fallback bar (on-demand failure): End, failed `door.refused` (en-base:765) + Refresh page (IN:33-95) | — | — | failed | NONE | none |
| 9 | Amharic; 360 | — | — | — | IMP-1 :241 (360) | none |

## Screen A13 — Translations: `admin.translations.tsx` → admin/translations/languages-page.tsx (L)

Gate: `translations:view` (sections.ts:156-160). Words: translations-service.ts:419-496 (en-base:488-508). Unknown codes → "That change could not be saved." (en-base:503).

Doors and their codes:
- `admin_set_language_flags` (20261114114100:160, manage): `badLanguage` (:163), `pseudoLanguage` (:168), `catalogEmpty` (:176) and `notFullyApproved` (:183). `notFullyApproved` → "This language cannot be published until every key is approved." `catalogEmpty` → the sync-first words (L:60-64). The other two → generic.
- `admin_upsert_language` (:47): `badValue:code` (:51) → "Enter a valid language code (2–8 letters)."; `nameRequired` (:54) → generic.
- `admin_delete_language` (:94): `badLanguage` (:98) → generic; `baseLanguage` (:101) → "The base language cannot be deleted."; `languagePublished` (:104) → "Unpublish this language before deleting it."
- `admin_sync_ui_keys` (20261114114000:53): `badValue:en` (:55) → generic.
- `admin_set_language_order` (20261114114100:211): no codes.

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Language rows: coverage meters, badges, Open strings, Columns, pager (L:127-666) | `translations:view` | page refused | works | TR-1 admin-translations-console:102; TR-2 :147; TR-3 :164; TR-38 :124 | none |
| 2 | Three counts with Retry (L:134-160) | — | — | failed | NONE | none |
| 3 | Staff / public switches, public gate (L:497-570) | `translations:manage` (L:101-102) | switches disabled | works; refused | TR-6 :249 | none |
| 4 | Move up / down; Delete + dialog (typed confirm, counts) (L:295-302, :668-680; delete-language-dialog.tsx:100-178) | manage | items hidden | works; published | TR-20 governance:305; TR-20m :461; TR-31 :1141 | none |
| 5 | Sync keys (step-up) (L:727-789) | manage | absent | works | TR-7 :297; TR-7b :321; TR-21 governance:506; TR-40 :1149 | none |
| 6 | Add language: picker (no Retry; manual instead), code, names, RTL, countries, submit (L:852-1044; language-picker.tsx:35-66) | manage | absent | works; refused | TR-25 :947; manual NONE | none |
| 7 | Pseudo language generate + confirm, progress (pseudo-bar.tsx:88-151) | manage | absent | works | TR-30 governance:1270 | D43 |
| 8 | Loading / failed / empty (L:627-632); flags error (L:706) | — | — | failed | NONE | D38 |
| 9 | Amharic; 360 | — | — | — | NONE (governance:458 is a comment) | none |

## Screen A14 — one language: `admin.translations_.$lang.tsx` → strings-page.tsx (P), data-scope.tsx

Doors and their codes:
- `admin_set_translation_status` (20261114130400:37, approve): `permissionDenied:language` (:39) → "You are not assigned to this language."; `badValue:action` (:42) → generic; `unknownTranslation` (:48, :65) → generic; `translationFlagged` (:50) → "Flagged strings can't be approved — fix the placeholders first."
- `admin_set_entity_translation_status` (:88): the same codes (:90-99).
- `admin_save_translation` / `admin_save_entity_translation` (update), `admin_machine_translation` (machine) and `admin_approve_all_*` (approve; `permissionDenied:language`): codes come from delegated bodies.
- `admin_set_key_context` (20261114114000:139, manage): `tooLong:context` (:143) and `unknownKey` (:152) → generic.
- `admin_export_translations` (20261114114500:175, view): `badValue:limit` (:177).
- `admin_import_translations` (20261114113900:57, update): `permissionDenied:language` (:59); `badValue:items` (:63); `tooManyRows` (:66) → "That was too much at once…"; `baseLocked` (:71) → "English is the source language and changes only through a key sync."
- `admin_undo_import` (:166, manage): `required:batch` (:168) → "This is needed."; `unknownBatch` (:176) → generic.
- File refusals (server/imports/gate.ts:591-826) → `fileRejected` / `fileShape` / `fileEmpty` (en-base:496-500).
- /api/translate (routes/api/translate.ts:95-169) sends sentences. Machine-translation rate → "Too many machine translations in the last hour." (en-base:754); others → generic.

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Interface / Data scope; status, flagged and orphaned filters; search; Columns; rows (P:68-485, :624-628) | `translations:view` | page refused; unknown language → `admin.translations.strings.unknown` and back to the list (P:250-268) | works | TR-5 console:200; TR-14 data:188; TR-21 governance:571; TR-39 :217 | none |
| 2 | Not assigned to this language: notice `admin.translations.editor.notAssigned` (P:278-282) | update / approve without assignment | notice; actions still drawn, server refuses | refused | TR-4 :180 | none |
| 3 | Expand a row: source, context, used on; translation box (P:512-853) | view | box can be typed in, but no Save | works | TR-8 :352 | D44 |
| 4 | Context edit / save (P:777-813) | `translations:manage` (P:114-117) | hidden | works | NONE | none |
| 5 | Save; AI per row; Approve; Clear; placeholder repair (P:888-978) | update / machine / approve / update (P:114-117, :498) | each hidden | works; flagged | TR-8; TR-11 :499; TR-23 :782; TR-35 :745; Clear NONE | none |
| 6 | History: list, restore, clear-instead; failed, no Retry (history-drawer.tsx:115-250) | view; restore update; clear approve | buttons hidden | works; failed | TR-16 :1003; failed NONE | D38, D43 |
| 7 | Approve all + confirm (approve-bar.tsx:84-168) | approve, non-base (P:380-382) | absent | works | TR-19 governance:120 | none |
| 8 | AI bulk: count, confirm, progress, failures (ai-bulk-bar.tsx:218-316) | machine, non-base (P:384-400) | absent | works; failed count | TR-12 :565; failed NONE | none |
| 9 | Export CSV / XLIFF; Import; Undo import (transfer-bar.tsx:157-244) | UI `translations:manage` (P:403); export door `view` | bar absent for viewers | works; refused | TR-29 governance:758; TR-32 :993; TR-33 :1122; XLIFF NONE | D43, D44 |
| 10 | Data scope rows: save / AI / approve / clear; approve all; coverage (data-scope.tsx:182-593) | as row 5 | hidden | works | TR-14; TR-24 data:271; TR-26 :453; TR-34 :598; TR-42 :724 | D43 |
| 11 | Loading / failed / empty (P:423-438) | — | — | failed | NONE | D38 |
| 12 | Amharic; 360 | — | — | — | NONE | none |

## Screen A15 — Legal: `admin.legal.tsx` → admin/legal/legal-page.tsx (P), legal-facts-card.tsx (C)

Gate: `legal:view` (sections.ts:163-168). Words: legal-service.ts:124-147 (en-admin:57-58, :2131-2144). Codes without words → "That did not work. Try again." (en-admin:2140).

Doors and their codes:
- Reads: `admin_legal_documents` and `admin_legal_settings` (20261114114600:48, :145; no codes); the menu alert's `legal_review_overdue` (:162).
- `admin_mark_legal_reviewed` (20261114114300:98, `legal:edit`): `nothingToReview` (:101) → "This document has no published version to review."; `badValue` (:103) → generic.
- `admin_set_legal_settings` (20261114114400:44, edit): `badValue` (:45-170) → generic, after local checks (C:95-108).

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Documents by kind and country; status, metadata, unaccepted count (P:95-203, :323-406) | `legal:view` | page refused | works | legal-admin:250, :356, :586, :691-731 | none |
| 2 | Read in place, view, history list (P:204-291) | view | — | works | :587-591; :1040 | none |
| 3 | Add translation (P:235-248) | `legal:publish` | absent | works | :1048-1099 | none |
| 4 | Edit draft / New version / Add country (P:253-393) | `legal:edit` (P:69) | absent | works | :382; :949; Add country NONE | none |
| 5 | Review: due / overdue, Mark reviewed + note dialog (P:101-141, :415-500) | edit | Mark absent | works; refused | :750-759; :838-849 | none |
| 6 | Menu alert "Review due" (nav-alerts.ts:22-33) | view | no mark; a failed read also shows no mark | works | :786-849 | none |
| 7 | Legal facts: values, edit, local errors, Save / Cancel (C:26-190) | edit | read-only | works; invalid | :288-292; :426-459; server error NONE | D45 |
| 8 | Loading / failed `admin.legal.error.load` (P:315-321) | — | — | failed | NONE | D38 |
| 9 | Amharic; 360 | — | — | — | NONE | none |

## Screen A16 — one legal version: `admin.legal_.$versionId.tsx` → legal-version-view.tsx (V)

Doors and their codes:
- `admin_legal_version` (20261114114600:106): `unknownVersion` (:108) → "This version does not exist." (en-admin:2080).
- `admin_add_legal_translation` (20261114114300:54, `legal:publish`): `unknownVersion` (:56), `notPublished` (:57), `badLanguage` (:60) → "That language cannot take a legal text.", `badValue` (:61), `tooLong` (:62), `translationExists` (:64) → "This version already has a text in that language.", `unknownFact` (:67) and `factMissing` (:68) → their own words. `unknownVersion`, `notPublished`, `badValue` and `tooLong` → generic.
- `admin_export_legal_acceptances` (:139, `legal:export`): `badValue` (:140-141) and `unknownVersion` (:146). Every export failure shows the generic (V:513-529).

| # | Control / event | Permission | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Changelog, language tabs, Download, Print, Compare with diff (V:65-285) | view | — | works | :476-478; :610-636 | none |
| 2 | Add translation: language, text, import, preview, Save (V:290-485) | `legal:publish` | section absent | works; refused | :978-993 | D45 |
| 3 | Export acceptances (V:489-529) | `legal:export` | absent | works; failed | :650; :667; failed NONE | D45 |
| 4 | Frozen facts; draft's Edit (V:534-563) | Edit needs `legal:edit` | Edit absent | works | :477; :949; :480 | none |
| 5 | Loading / not found / failed; compare load (V:49-54, :183-191) | — | — | failed | NONE | D38 |
| 6 | Amharic; 360 | — | — | — | NONE | none |

## Screen A17 — legal editor: `admin.legal_.edit.tsx` → legal-editor.tsx (E), legal-editor-form.tsx (F), legal-publish-dialog.tsx (D)

Doors and their codes:
- `admin_save_legal_draft` (20261114114200:48, `legal:edit`): `badValue` (:49-61), `badLanguage` (:53), `tooLong` (:55), `labelRequired` (:70) → "Give the version a name." and `labelTaken` (:74, :80) → "Another version of this document already has this name."
- `admin_discard_legal_draft` (:123): `unknownVersion` (:125) and `notDraft` (:126) → "This version is already published."
- `admin_publish_legal_version` (:155, `legal:publish`): `badValue` (:156), `unknownVersion` (:158), `notDraft` (:159), `labelRequired` (:161), `bothLanguages` (:165) → "Publishing needs both the English and the Amharic text.", `changelogRequired` (:168) → "Say what changed before publishing.", `unknownFact` (:174), `factMissing` (:175) and `noticeTooShort` (:179) → "A material change cannot take effect before {date}."
- Server `tooLong` and `badValue` → generic, though local "Too long: at most {max} characters." exists (en-admin:2138).

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Bad kind / country `admin.legal.badDocument` (E:17-18); loading / failed (E:21-29; F:156-161) | view | — | invalid; failed | NONE | D38 |
| 2 | Name, language tabs, write / preview, text per language, import, change note (F:116-316) | `legal:edit` (F:94) | fields disabled | works | :171-176; :320-326; :680-686; :922-924 | none |
| 3 | Preview warnings: unknown tokens, empty facts (F:103-109, :278-286) | view | — | works | :326; empty NONE | none |
| 4 | Save draft; Discard + confirm (F:319-429) | edit | absent | works; refused | :177; :343; :493-494 | D45 |
| 5 | Publish → dialog: material / correction, date, confirm (F:375-389; D:56-183) | `legal:publish` | absent; disabled until saved | works; refused | :178; :328-348; :395-402; :941; correction NONE | none |
| 6 | Back (F:384-386) | — | — | works | NONE | none |
| 7 | Amharic; 360 | — | — | — | NONE | none |

**360 px sideways (A9–A17):** Roles RP-8/11/12/17, Audit AS-1, View as IMP-1 (e2e/helpers/ui.ts:50-55). None for Translations or Legal.

- D38: these admin reads fail with no Retry: the roles list and one role (roles-list.tsx:237-242; role-detail.tsx:29-53); audit rows and chart (audit-page.tsx:327-331; chart-frame.tsx:111-115); the view-as profile (detail-panel.tsx:51-55); the language list and strings (languages-page.tsx:627-632; strings-page.tsx:423-438; history-drawer.tsx:137-143); and legal (legal-page.tsx:315-321; legal-version-view.tsx:183-191; legal-editor.tsx:21-29). Same kind as D18 and D26.
- D39: a failed End now is never shown, on the view-as page (impersonation-view.tsx:175-188) or on its bar (impersonation-banner.tsx:48-55). `noActiveSession` (migration 20261114070900:163) has no words there.
- D40: the view-as ad list passes no loading or error words (impersonation-view.tsx:262-263), so both states draw blank (data-table.tsx:684-692).
- D41: a custom role that a staff member may not change shows the system-role note (role-detail.tsx:64-66, :115-116; permission-matrix.tsx). Without `roles:update` the role is passed as `isSystem`, so the note says it is a system role when it is not.
- D42: a failed audit facets read leaves the action and entity choices silently empty (audit-page.tsx:122-135).
- D43: on Translations, an unrecognised failure shows its raw message under the generic line (transfer-bar.tsx:241-244; history-drawer.tsx:242-250; pseudo-bar.tsx:148-151; translations-service.ts:503-507). The data scope also writes raw error text into the page (data-scope.tsx:186-192). Same kind as D20.
- D44: on Translations, the translation box can be typed in without `translations:update` (strings-page.tsx:837-853). The export bar is drawn only for `translations:manage` (strings-page.tsx:403), while its door needs only `translations:view` (migration 20261114114500:175).
- D45: in Legal, the server's `tooLong`, `badValue`, `notPublished` and `unknownVersion` (mutations) have no words in legal-service.ts:124-140. They show "That did not work. Try again." (en-admin:2140), even though "Too long: at most {max} characters." exists (en-admin:2138). Export shows the generic for every failure (legal-version-view.tsx:513-529).

## Screen A18 — Categories: `admin.categories.tsx` → admin-categories/categories-page.tsx (CP), category-dialogs.tsx (CD)

Section `categories:view` (sections.ts:156-163); without it the shell sends staff to `/admin` (admin.tsx:71-99). Door permissions are `door_context` actions on `categories`. Migrations M214…M232, M304 = `supabase/migrations/2026111502{14..32}00_*.sql`, `20261120030400_*.sql`.

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Roster rows `category-row-*`, actions `category-actions-*` (CP:433-655, :1070-1099); `admin_list_categories` (M231:42) | view | redirected | works | CT-2 console:122; CT-9a/b :615, :656 | none |
| 2 | Search, subtree, missing-assets filter, chips (CP:211-225, :1100-1162) | view | — | works | CT-2; CT-31 :151; CT-11 :717 | none |
| 3 | Columns, pagination, page size (CP:1151-1183) | view | — | works | CT-9a/b; CT-11; column toggle NONE | none |
| 4 | Add / edit / save (CD:277-395; category-form-fields.tsx:124-390); `admin_create_category` M220:89 (core refusals M220:29-74), `admin_update_category` M214:86 | create (CP:261-265) / update (CP:751-761) | opener absent | works; refused | CT-3 :271; CT-17 lifecycle:569 | D50 |
| 5 | Visibility window, country exclusions (CD:495-604); M216:166, M221:75 | update (CP:672-693) | absent | works | CT-4/5 :303, :334; CT-16 :523 | none |
| 6 | Move up / down (CP:702-727); `admin_reorder_categories` M216:111 | UI restructure; door **update** (M216:111-118) | restructure-only staff see a move the door refuses | refused | NONE | D47 |
| 7 | Parent paths, add pointer, primary, move/remove pointer (CD:777-988); M220:137, M221:95 (`unknownPointer` :110, `parentInactive` :113), M217:95/146 | restructure (CP:702-727) | absent | works; refused | CT-14/15 :233, :290; CT-39 home:117; CT-44 :420 | D50 |
| 8 | Retire / reactivate / delete with typed slug (CD:677-731, :1083); M214:149, M215:144/94 | restructure (CP:729-770) | absent; delete disabled while active | works; refused | CT-6 :369; CT-12/13 :60, :155; CT-40; CT-43 | none |
| 9 | Category attributes dialog (category-attributes-dialog.tsx:229-645) — rows in A19 | update (CP:688-692) | absent | works | AT-3/4; AT-42/80/84; AT-76 | D46 |
| 10 | Image dialog: generate, accept (category-image-dialog.tsx:130-340); `admin_set_category_images` M222:38 (`unknownCategory` :63), accept M222:95 (`acceptNoImage` :116); api/admin/categories/generate-image.ts:23-44 | assets (CP:697-701) | absent | works; refused | images spec :44, :169 | none |
| 11 | Bulk generate, progress, failures (CP:974-1055) | assets (CP:974-984) | absent | works; failed | NONE | D51 |
| 12 | Import dialog: file, preview, confirm, undo, discard (category-import-dialog.tsx:70-95; import-dialog.tsx:438-684); preview M231:240, commit M218:43 (`importRunning` :77, `unknownParent` :164), undo M219:41 (`unknownBatch` :69) | import (CP:265, :998-1005) | absent | works; refused | CT-28 :2491; CT-22 :1845; CT-19 :1109; CT-21 :1648 | D51 |
| 13 | Export `category-export`; `admin_export_categories` M304:31 (`unknownCategory` :44); export.ts:40-41 (`forbidden`, `unknownCategory`) | view | — | works; failed → `admin.categories.export.error` (CP:307-315) | CT-18 :1037 | D55 |
| 14 | Loading / empty / failed (CP:1080-1098); paths dialog (CD:907-916) | view | — | failed | NONE | D46 |
| 15 | Amharic; 360 | — | — | — | CT-8 console:549-588 (360/768/1024/1240) | none |

Refusal words (category-refusals.ts:14-30): `acceptNoImage`, `catchallParent`, `reassignRequired`, `deleteActive`, `deleteSlugMismatch`, `deleteHasListings`, `deleteHasChildren`, `required`, `rateLimited` have their own words (en-admin:909, :1051-1053, :867-872; en-base:562; en-admin:733). `unknownCategory`, `unknownPointer`, `parentInactive` and every unmapped code → "The change could not be saved." (en-admin:1049). Import `importRunning` → its busy words (import-dialog.tsx:270-271); `unknownBatch` and `unknownParent` → NONE (the code shows as the reason, import-dialog.tsx:253-254).

## Screen A19 — Attributes: `admin.attributes.tsx` → admin-attributes/attributes-page.tsx (AP), attribute-dialogs.tsx (AD)

Section `categories:view` (sections.ts:165-172). Category filter in the address (admin.attributes.tsx:29-32).

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Library rows, options, coverage, used by, inherited (AP:245-392, :538-566); `admin_list_attributes` M232:102 | view | redirected | works | AT-9 library:423; AT-17/19 | none |
| 2 | Coverage column; `admin_attribute_option_coverage` M232:171 | read on page load (AP:188-197); door **update** | view-only staff: refused read, shown as no coverage | failed | NONE | D49 |
| 3 | Search, category filter, clear (AP:578-620) | view | — | works | AT-7 :342; search NONE | none |
| 4 | Columns, pagination (AP:95-105, :620-650) | view | — | works | AT-79 :494 | none |
| 5 | Add / edit definition (AD:330-442, :568-591); `admin_upsert_attribute` M223:39, 17 refusals :62-205 | update (AP:119, :452-458, :515-523) | absent | works; refused | AT-2 :72; AT-31 editor:199; AT-81 | none |
| 6 | Number / text fields, presets (attribute-v2-fields.tsx:60-340) | update (editor) | — | works | NONE per field | none |
| 7 | Options, dependencies, bounds, allowed values (attribute-option-rows.tsx:119-183; attribute-option-row.tsx:87-319; attribute-allowed-values.tsx:78-179) | update (editor) | — | works; refused | AT-31; AT-33 editor:275 | none |
| 8 | Assign to category (AD:961-1012); `admin_link_attribute` M224:37 (`unknownCategory` :52, `unknownAttribute` :55/:70, `alreadyLinked` :59, `badAllowedOption` :67, `badDefault` :68, `badVisibleWhen` :69, `priceBasisDuplicate` :80) | update (AP:429-436) | absent | works; refused | AT-8 :384 | D50 |
| 9 | Remove from category (AD:1081-1146); `admin_unlink_attribute` M226:87 (`unknownLink` :99, `unlinkHasDependents` :109) | UI restructure (AP:437-447); door **update** | restructure-only see a refused verb; update-only lack it | works; refused | AT-11 :624; AT-73/73b safety:188, :239 | D48 |
| 10 | Delete, merge (AD:673-718, :786-887); M226:39 (`unknownAttribute` :51, `confirmMismatch` :55, `deleteHasDependents` :62, `deleteHasLinks` :68); M227:130 (`mergeAcrossDependency` :151, `mergeHasHolders` :158) | restructure (AP:461-487) | absent | works; refused | AT-5/6 :223, :289; AT-74 :280 | none |
| 11 | Link cells: allowed, default, visible-when, card / fact ranks, order (attribute-link-cells.tsx:173-433); M225:36 (`badClearCell` :65, `unknownLink` :71, `badAllowedOption` :91, `badDefault` :92, `badVisibleWhen` :93, `unknownAttribute` :94); M228:112/40/168 (`factLimit` :128, `cardLimit` :59, `rankInherited` :76, `unknownLink` :67/:136, `orderMismatch` :190) | update (category manager) | inherited links read only | works; refused | AT-59/60/66 links:782, :887, :1459; AT-76b | D50 |
| 12 | Import: definitions and links files, preview, confirm, undo (attributes import-dialog.tsx:147-193); M232:201; M229:39 (`importRunning` :70); M230:40 (`required` :60, `unknownBatch` :65) | import (AP:122, :506-513) | absent | works; refused | AT-40/61; AT-21/23/24 import:491, :1191, :1237 | D51 |
| 13 | Export (two files) (AP:208-237); M232:237; export.ts:43-44 (`forbidden`, `unknownCategory`) | view | — | works; failed → `admin.attributes.export.error` | AT-15/16/18 | D55 |
| 14 | Loading / empty / failed (AP:548-566); link manager (category-attributes-dialog.tsx:278-286) | view | — | failed | NONE | D46 |
| 15 | Secondary reads: category roster (AP:95-96, :125), effective links (:140-143), used by (:182-184) | view | — | failed → drawn as empty | NONE | D49 |
| 16 | Amharic; 360 | — | — | — | AT-9 `expectNoHorizontalOverflow` (library:423-444, mobile-360 project) | none |

Refusal words (attribute-refusals.ts:17-64): every code in rows 5, 7, 10 and 11 has its own sentence (en-admin:1454-1507, :875-876) except `unknownCategory`, `badAllowedOption`, `badDefault`, `badVisibleWhen`, `priceBasisDuplicate`, `badClearCell` → "The change could not be saved." (en-admin:1473). `required` → "This is needed." (en-base:562).

## Screen A20 — Images: `admin.images.tsx` → admin/section-page.tsx

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Placeholder `admin-section-images`: `admin.comingSoon` "Not built yet" (en-admin:69), `admin.section.images.body` "Image tooling arrives in U8." (en-base:436); admin.images.tsx:29-30, section-page.tsx:20-28 | `categories:view` (sections.ts:174-181) | redirected | shown | NONE | none |
| 2 | No controls, door or states (section-page.tsx:15-31) | — | — | — | — | none |

**360 px sideways: none** (nothing to measure).

## Screen A21 — Locations overview: `admin.locations.tsx` → admin-overview/locations-overview.tsx (LO)

No section of its own (sections.ts:39-47); the panel gate only (admin.tsx:71).

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Heading `admin-overview-locations` (LO:60-65) | panel | — | works | OV-1 admin-locations:1264-1267 | none |
| 2 | Markets tile `overview-stat-markets` (LO:39-45, :72-79); read enabled with `countries:view` (:35-36) | countries:view for the read | tile still drawn, as 0 | works; no permission | OV-1 :1269-1275; no-permission NONE | D52 |
| 3 | Places tile `overview-stat-places`, levels (LO:46-57, :81-98) | locations:view for the read (:34, :37) | tile still drawn, as 0 | works; no permission | OV-1; NONE | D52 |
| 4 | Tile loading / failed / Retry (stat-card.tsx:60-81; LO:74-85) | — | — | failed | NONE | none |
| 5 | Links `overview-link-locations`, `overview-link-countries` (LO:101-115) | filtered per view permission (:102) | link absent | works | OV-1 :1271-1284; filtering NONE | none |
| 6 | Amharic; 360 | — | — | — | NONE | none |

**360 px sideways: none.**

## Screen A22 — Places: `admin.places.tsx` → admin-locations/locations-page.tsx (LP)

Section id `locations`, `locations:view` (sections.ts:115-121). Migrations A–K as in the census aliases: A `20261122023300`, B `20261115122700`, C `20261115122900`, D `20261115122800`, G `20261120030400`, H `20261115123300`, J `20261115123400`, K `20261120030600`.

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Roster rows `location-*` (LP:205-294, :426-444); `admin_list_locations` A:28 | view | redirected | works | LT-2 :171; LT-9a/b; LT-10 | none |
| 2 | Market, search, level / status filters, chips (LP:133-168, :449-503) | view | — | works | LT-2; LT-11 :998; LT-13 :1089 | none |
| 3 | Columns, pagination (LP:493-532) | view | — | works | LT-9a :909; columns NONE | none |
| 4 | Add / add child (location-dialogs.tsx:164-244); `admin_upsert_location` B:37 (`badLevel` :59, `isoOnRegionsOnly` :62/:113, `nameRequired` :65/:116, `rootMustBeCountry` :69, `unknownCountry` :73, `parentMissing` :78, `locationMissing` :105, `useMoveDoor` :108/:110) | `locations:create` (LP:99, :303-310) | absent | works; refused | LT-3 :249; LT-16 :1205 | none |
| 5 | Edit fields, aliases (location-editor.tsx:98-143; location-form-fields.tsx:76-264) | `locations:update` (LP:100, :344-350) | absent | works; refused | LT-7b :807; LT-8 :853 | none |
| 6 | Activate / retire (C:80, `locationMissing` :94); reorder (C:39, `orderCountriesInProfile` :52, `notAChild` :58) | update (LP:311-338) | absent | works; refused | LT-3; LT-4 :360; reorder NONE | none |
| 7 | Move (D:38: `locationMissing` :53, `cannotMoveCountry` :54, `parentMissing` :57, `crossCountry` :58) | `locations:restructure` | absent | works; refused | LT-6 :516 | none |
| 8 | Delete with typed slug (D:79: `locationMissing` :93, `slugMismatch` :94, `retireInstead` :97-106) | restructure (LP:353-360) | absent; blocked rows disabled | works; refused | LT-5 :434 | none |
| 9 | Export `location-export-locations` (LP:180-204, :386-394); G:52 (`unknownCountry` :66); export.ts:44-46, :68-69 | view | — | works; failed → one generic flag, no Retry | LT-7 :613; LT-12; LT-13 | D55 |
| 10 | Import dialog: file, preview, confirm, undo (location-import-dialog.tsx:94-115; import-dialog.tsx); H:36; J:37 (`importRunning` :52, `planHasRefusals` :57); K:27 (`unknownBatch` :54, `batchAlreadyUndone` :58, `permissionDenied` :69, `undoBlocked` :136) | `locations:import` (LP:102, :396-403) | absent | works; refused | LT-7; LT-15 :753 | D51 |
| 11 | Loading / empty / failed (LP:435-444) | view | — | failed | NONE | D46 |
| 12 | Amharic; 360 | — | — | — | LT-2 :201-213 (roster scrollWidth, mobile-360) | none |

Refusal words (location-refusals.ts:24-55): every code in rows 4–8 has its own sentence (en-admin:1524-1546); `permissionDenied` → "You do not have permission to do that." (:1528). Import: `importRunning` → "Another import is already running." (:1667); `planHasRefusals`, `unknownBatch`, `batchAlreadyUndone`, `undoBlocked` → their own words (:1720-1728); 403 → "You do not have permission to import places." (:1664).

## Screen A23 — Countries: `admin.countries.tsx` → admin-countries/countries-page.tsx (CN)

Section `countries:view` (sections.ts:123-129). Migrations E `20261115123200`, F `20261120030500`, G as above.

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Roster rows, badges, counts (CN:142-234, :327-342); `admin_list_countries` E:100 | view | redirected | works | CO-2 :85 | none |
| 2 | Search, status filter, chips, columns, pagination (CN:347-395) | view | — | works | CO-2 :85-150; CO-9 :464-501 | none |
| 3 | No Add / Delete (creation by import) | — | — | absent | CO-3 :154-161 | none |
| 4 | Edit name, unit, currency, order (country-editor.tsx:86-123); F:83 (`badCountryCode` :96, `badUnitSystem` :99, `badCurrency` :102, `nameRequired` :107) | `countries:update` (CN:74, :243-250) | absent | works; refused | CO-5 :224-240 | none |
| 5 | Open / close, force (country-verb-dialogs.tsx:67-114); F:138 (`badCountryCode` :154, `unknownCountry` :157, `scopedRolesExist` :179) | `countries:activate` (CN:75, :252-262) | absent | works; refused | CO-4 :164-201 | none |
| 6 | Rail order, reset (country-verb-dialogs.tsx:186-265); F:199 (`badCountryCode` :216, `unknownCountry` :219, `duplicateCategory` :224, `notARoot` :233) | update (CN:263-274) | absent | works; refused | CO-6 :254-353 | none |
| 7 | Rail dialog root-category read (country-verb-dialogs.tsx:135-149, :224-227) | update | — | failed → drawn as empty | NONE | D54 |
| 8 | Export, scope (CN:283-301); G:52 (`unknownCountry` :66); export.ts:64 needs `locations:view` | UI: none | countries-only staff see Export the route refuses | works; failed → generic | CO-7 :361-375; mismatch NONE | D53, D55 |
| 9 | Import dialog (country-import-dialog.tsx:62-79); doors as A22 row 10 | `locations:import` (CN:76, :304-312) | absent | works; refused | CO-7 :361-407 | D51 |
| 10 | Loading / empty / failed (CN:333-342) | view | — | failed | NONE | D46 |
| 11 | Amharic; 360 | — | — | — | CO-8 :416-435 (mobile-360) | none |

Refusal words (country-refusals.ts:17-33): every code in rows 4–6 has its own sentence (en-admin:1802-1812).

## Screen A24 — Coverage: `admin.coverage.tsx` (redirect)

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | `beforeLoad` redirects to `/admin/monetisation` (admin.coverage.tsx:8-12); nothing drawn | target `packages:view` (sections.ts:83-92) | as A25 | works | MON-3 admin-monetisation:634-638 | none |

**360 px sideways: none** (nothing drawn).

## Screen A25 — Monetisation: `admin.monetisation.tsx` → admin-monetisation/monetisation-page.tsx (MP)

Section `packages:view` (sections.ts:83-93). Every write needs `packages:update` (MP:35-36); without it the tables stay readable and the add / edit / clear / end verbs are absent. Writes sit behind `StepUpGate` (MP:64-92). Migrations S305…S310 = `20261119030{5..9}00_*.sql`, `20261119031000_*.sql`.

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Header, order strip (MP:66-88); `admin_list_monetisation` S310:35 | view | redirected | works | MON-1 :490; MON-16/17 | none |
| 2 | Markets list (markets-section.tsx:60-187) | view | — | works | MON-1; MON-12 :1220 | none |
| 3 | Market add / edit (market-dialog.tsx:104-218); S308:171 (`unknownCountry` :190, `badFreeAds` :193, `unknownReach` :198, `launchRequired` :201, `badLaunch` :204) | update (markets-section.tsx:154-163, :212-220) | absent | works; refused | MON-12; MON-2 :555 | none |
| 4 | Levels / Reach lists, details (products-section.tsx:85-342) | view | — | works | MON-1; MON-4/5; MON-18 | none |
| 5 | Product add / edit with switches (product-editor.tsx:167-327); S308:36 (`badKey` :60, `unknownKind` :63, `badName` :66, `badDays` :69, `kindChange` :75, `capsOnLevel` :82, `badPhotos` :92, `unknownPlacement` :95, `perksOnReach` :99, `badCaps` :109-123) | update (products-section.tsx:307-316, :387-400) | absent | works; refused | MON-4 :646; MON-5 :767; MON-18 :1583 | none |
| 6 | Overrides add / edit / clear (level-overrides-table.tsx:154-248; override-dialog.tsx:166-278); S307:34 (`unknownLevel` :53, `notMainCategory` :59, `unknownCountry` :62, `badDays` :65, `badPhotos` :68, `unknownPlacement` :71, `emptyOverride` :74); S307:108 (`overrideNotFound` :128) | update (level-overrides-table.tsx:160-169, :209-230) | absent | works; refused | MON-6 :819 | none |
| 7 | Prices: search, columns, paging (product-prices-table.tsx:76-295) | view | — | works | MON-8 :986; paging NONE | none |
| 8 | Price add / edit / end (price-dialog.tsx:123-353; price-end-dialog.tsx:61-92); S305:33 (`unknownPackage` :52, `badAmount` :55, `badCreditCost` :58, `unknownCurrency` :61, `unknownCountry` :64, `unknownCategory` :67, `badWindow` :70, `overlappingWindow` :78); S306:37 (`priceNotFound` :67, `permissionDenied` :78, `priceInUse` :84, `priceEnded` :87, and the S305 codes :91-115); S306:137 (`priceNotFound` :166, `permissionDenied` :173, `priceEnded` :177, `badWindow` :180, `overlappingWindow` :189) | update (product-prices-table.tsx:203-212, :264-289); edit only unused | absent; used prices keep End only | works; refused | MON-8/9/10/11 :986-1170 | none |
| 9 | Unmapped save failure: generic plus "Reason: {reason}" with the raw text (use-monetisation-error.ts:25-40; monetisation-dialogs.tsx:33-40) | — | — | failed | NONE | D51 |
| 10 | Loading / empty / failed (markets-section.tsx:178-187; products-section.tsx:345-365) | view | — | failed | NONE | D46 |
| 11 | No seasons, import or delete (override-dialog.tsx:251-283; product-editor.tsx:64-68) | — | — | absent | MON-7 :953 is the resolver, not a screen | none |
| 12 | Amharic; 360 | — | — | — | MON-1 :538-552 (`expectNoHorizontalOverflow`, mobile-360) | none |

Refusal words (monetisation-refusals.ts:76-132): every code in rows 3, 5, 6 and 8 has its own sentence (en-admin:1888-1904, :1966-1985); `permissionDenied` → "You do not have permission to do that." (:1888); `stepUpRequired` / `P0009` → "Verify a code and try again." (:1889). Unmapped → "That could not be saved." (:1904) + reason.

## Screen A26 — Packages: `admin.packages.tsx` (redirect)

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | `beforeLoad` redirects to `/admin/monetisation` (admin.packages.tsx:7-10); nothing drawn | target `packages:view` | as A25 | works | MON-3 :634 | none |

**360 px sideways: none** (nothing drawn).

## Screen A27 — AI: `admin.ai.tsx` → admin-ai/ai-page.tsx (AI)

Section `services:view` (sections.ts:170-177); writes need `services:manage` (AI:63-64).

| # | Control / event | Permission (file:line) | Without it | Cases | Test | Defect |
|---|---|---|---|---|---|---|
| 1 | Feature rows, state, spend, calls, price, alert badges (AI:73-204, :239-250); `admin_ai_features` S310:80 | view | redirected | works | SV-4 admin-services:279; SV-3 :218 | none |
| 2 | Search, columns, paging (AI:262-305) | view | — | works | NONE | none |
| 3 | Edit `ai-actions-*` (AI:219-233) | manage (AI:224-231) | absent | works | SV-4 | none |
| 4 | Editor: on / off, screening note, budget, price, save / cancel (ai-feature-form.tsx:117-205; ai-editor.tsx:47-56); `admin_set_ai_feature` S309:33 (`badValue:enabled` :51, `badValue:unitCost` :53, `badValue:budget` :56, `unknownFeature` :59, `overBudget` :72) | manage | — | works; refused | SV-2 :153 (door only); UI save NONE | D56 |
| 5 | Unmapped save failure: generic plus raw reason (ai-refusals.ts:48-59; ai-feature-form.tsx:194-205) | — | — | failed | NONE | D51 |
| 6 | Daily spend, feature picker, Retry (ai-spend-days.tsx:44-127); S310:125 (`badValue:days` :137) | view | — | works; failed + Retry | SV-5 :327; failed NONE | none |
| 7 | Call history, filters, previous / next, Retry (ai-calls.tsx:33-184); S310:156 (`badValue:limit/feature/outcome/cursor` :165-168) | view | — | works; empty; failed + Retry | ACR-E1 admin-ai-calls:8, :29; failed NONE | none |
| 8 | Feature list loading / empty / failed (AI:253-261) | view | — | failed | NONE | D46 |
| 9 | Amharic; 360 | — | — | — | NONE | none |

Refusal words (ai-refusals.ts:17-59): `permissionDenied` → "You do not hold the right to do this." (en-admin:319); `stepUpRequired` → :320; `unknownFeature` :325; `overBudget` :323-324; `badValue:budget` :326; `badValue:unitCost` :328; `badValue:enabled` → generic "That could not be saved." (:321) + reason. Read failures → their own load words (:264, :337, :36).

**360 px sideways (A18–A27):** Categories CT-8, Attributes AT-9, Places LT-2, Countries CO-8, Monetisation MON-1. None for Images, Locations overview, Coverage, Packages, AI.

- D46: these admin reads fail with no Retry: Categories list and paths (categories-page.tsx:1086-1098; category-dialogs.tsx:907-916); Attributes list and link manager (attributes-page.tsx:554-566; category-attributes-dialog.tsx:278-286); Places (locations-page.tsx:435-444); Countries (countries-page.tsx:333-342); Monetisation (markets-section.tsx:178-187; products-section.tsx:345-365); AI features (ai-page.tsx:253-261). Same kind as D38.
- D47: Categories' Move up / down is drawn for `categories:restructure` (categories-page.tsx:702-727); `admin_reorder_categories` checks `categories:update` (migration 20261115021600:111-118).
- D48: Attributes' Remove from category is drawn for `categories:restructure` (attributes-page.tsx:437-447); `admin_unlink_attribute` checks `categories:update` (migration 20261115022600:87-99). Update-only staff lack a verb they may use.
- D49: Attributes reads coverage on every load (attributes-page.tsx:188-197) through a door that needs `categories:update` (migration 20261115023200:171); its error, and those of the category roster (:95-96, :125), effective links (:140-143) and used by (:182-184), are not read, so a failure draws as empty.
- D50: `unknownCategory`, `unknownPointer`, `parentInactive` (category-refusals.ts:14-30; migration 20261115022100:110, :113) and `badAllowedOption`, `badDefault`, `badVisibleWhen`, `priceBasisDuplicate`, `badClearCell` (attribute-refusals.ts:17-64; migrations 20261115022400:67-80, 20261115022500:65-93) show "The change could not be saved." (en-admin:1049, :1473).
- D51: raw technical text under the generic line: category bulk image failures (categories-page.tsx:789-792, :1052-1055); the shared import dialog's `code — detail` reason (import-dialog.tsx:243-255, :670-678; Categories, Attributes, Places, Countries); Monetisation's reason (use-monetisation-error.ts:25-40; monetisation-dialogs.tsx:33-40); AI's reason (ai-refusals.ts:48-59; ai-feature-form.tsx:194-205). Same kind as D43.
- D52: the Locations overview draws both tiles without the permission their reads need, so they show 0 (locations-overview.tsx:34-43, :60-98).
- D53: Countries' Export is drawn without a `locations:view` check (countries-page.tsx:283-301); the route needs it (api/admin/locations/export.ts:64).
- D54: the rail-order dialog never reads the root categories' error (country-verb-dialogs.tsx:135-149, :224-227), so a failure draws as an empty list.
- D55: export failures drop their code (`forbidden`, `unknownCountry`, `unknownCategory`): Places and Countries (locations-page.tsx:180-204; countries-page.tsx:283-301), Categories (categories-page.tsx:307-315), Attributes (attributes-page.tsx:224-234) show one generic export line.
- D56: AI's `badValue:enabled` (migration 20261119030900:51) has no words in ai-refusals.ts:17-59; it shows "That could not be saved." (en-admin:321) plus the raw reason.

# CENSUS SUMMARY — all three areas

## 1. Counts (counted from this file: a row is a numbered table line `| n |`; NONE = the line contains NONE)

| Area | Screens | Rows | Rows with NONE |
|---|---|---|---|
| 1 — public | 6 (screen 6 in five parts, 6a–6e) | 94 | 41 |
| 2 — posting and member | 8 (screen 7 in nine parts: frame and steps 1–8) | 175 | 74 |
| 3 — admin | 27 (A1–A27, one per `admin*` route file) | 229 | 101 |
| **All** | **41** | **498** | **216** |

## 2. Defects D1–D56, by kind

**A failed load with no Retry**
- D7 legal-document-page.tsx:47, :135; legal-accept-screen.tsx:26-30.
- D12 app-rail.tsx:711-713, :725-728 (also reads as empty).
- D13 location-selector.tsx:280-286.
- D15 wizard.tsx:860-861; step-category.tsx:229-234.
- D18 step-specifications.tsx:1197-1198; step-pricing.tsx:461-462.
- D26 account-overview.tsx:131-134; saved-page.tsx:90-93; my-legal-page.tsx:48-51; my-legal-version.tsx:41-43.
- D32 user-detail.tsx:413-416 (also the list's words).
- D38 roles-list.tsx:237-242; role-detail.tsx:29-53; audit-page.tsx:327-331; chart-frame.tsx:111-115; detail-panel.tsx:51-55; languages-page.tsx:627-632; strings and legal readers.
- D46 categories-page.tsx:1086-1098; attributes-page.tsx:554-566; locations-page.tsx:435-444; countries-page.tsx:333-342; markets-section.tsx:178-187; products-section.tsx:345-365; ai-page.tsx:253-261.

**A refusal shown in the wrong words, or the generic**
- D1 use-feed.ts:38; feed.tsx:215-216 (404 shows a Retry that cannot succeed).
- D4 l.$slug.tsx:167-169; listing-detail.tsx:1535-1540.
- D16 posting-service.ts:56-57 (ended sign-in read as unreachable; Cursor's).
- D17 api/upload/photo.ts:279; refusal-text.ts:111-138.
- D21 migration 20261115203900:85-109; refusal-text.ts:27-102.
- D22 publish_listing :171, :193; refusal-text.ts:27-102 (words exist in my-listing.ts:282, promote-service.ts:190).
- D24 my-listing.ts:268-288 (`badValue`, `notCopied`).
- D25 my-listing.ts:686-688, :292-293, :266-288; migration 20261115204100:78-142.
- D27 saved-page.tsx:51-58, :135-137.
- D30 user-detail.tsx:270-272, :361-363.
- D31 impersonation-starter.tsx:80; migration 20261114070700:66-77.
- D33 undo-edit.ts:34-45; migration 20261118012200:75.
- D45 legal-service.ts:124-140.
- D50 category-refusals.ts:14-30; attribute-refusals.ts:17-64.
- D55 locations-page.tsx:180-204; countries-page.tsx:283-301; categories-page.tsx:307-315; attributes-page.tsx:224-234.
- D56 ai-refusals.ts:17-59; migration 20261119030900:51.

**Raw technical text on screen**
- D6 legal.$kind.tsx:62, :73 (address slug as title).
- D9 legal.publishing.tsx:95-97.
- D20 step-who.tsx:687; step-review.tsx:597-598.
- D23 my-listings-page.tsx:746; my-listing-page.tsx:671.
- D43 transfer-bar.tsx:241-244; history-drawer.tsx:242-250; pseudo-bar.tsx:148-151; data-scope.tsx:186-192.
- D51 categories-page.tsx:789-792, :1052-1055; import-dialog.tsx:243-255, :670-678; use-monetisation-error.ts:25-40; ai-refusals.ts:48-59.

**A control that does nothing, or is shown when it cannot work**
- D3 feed.tsx:149 (no next page without IntersectionObserver).
- D10 app-header.tsx:54, :167 (search forms).
- D14 app-footer.tsx:82 (About, Contact, Safety; intended, :19-20).
- D19 step-details.tsx:411-416 (assist drawn when switched off).
- D34 screening-page.tsx:136, :440 (Show number; door needs reveal).
- D35 screening-page.tsx:843-850; use-screening.ts:274-277 (Reject sends no reason).
- D41 role-detail.tsx:64-66, :115-116 (system-role note on a custom role).
- D44 strings-page.tsx:837-853, :403.
- D47 categories-page.tsx:702-727.
- D48 attributes-page.tsx:437-447.
- D52 locations-overview.tsx:34-43, :60-98.
- D53 countries-page.tsx:283-301.

**A silent failure**
- D5 seller-page.tsx:31; use-seller-feed.ts:158-163.
- D29 admin.tsx gate :40-47 with usePermissions :67 (failed read treated as refused).
- D36 screening-page.tsx:497; listings-page.tsx:254.
- D39 impersonation-view.tsx:175-188; impersonation-banner.tsx:48-55.
- D40 impersonation-view.tsx:262-263.
- D42 audit-page.tsx:122-135.
- D49 attributes-page.tsx:95-96, :125, :140-143, :182-197.
- D54 country-verb-dialogs.tsx:135-149, :224-227.

**Other**
- D2 feed.tsx:286 (Retry without a test id).
- D11 app-header.tsx:273-278; bottom-bar.tsx:160 (Sign in without return; no test id).
- D28 my-legal-version.tsx:38 (raw database message compared).
- D37 admin.screening.tsx:10-12; use-screening.ts:382-385 (stale comments; note only).

**Withdrawn**
- D8 legal.accept.tsx:44 — a deliberate fallback title.

## 3. Screens whose 360 px sideways check is NONE

- Area 1: screen 2 (ad page), 3 (seller), 4 (legal pages), 5 (accept, publishing). Screens 1 and 6 are covered (shell.spec.ts:1712, :2720).
- Area 2: screen 7 frame and steps 1, 2, 3, 4, 5, 7, 8 (only step 6 has one, post-wizard-where.spec.ts:857); screens 8, 9, 10, 11, 12, 13, 14.
- Area 3: A1 shell, A2 dashboard, A3 Users, A4 one person, A5 All listings, A6 one listing, A7 staff edit, A8 Screening, A13 Translations, A14 one language, A15 Legal, A16 one version, A17 legal editor, A20 Images, A21 Locations overview, A24 Coverage, A26 Packages, A27 AI.
