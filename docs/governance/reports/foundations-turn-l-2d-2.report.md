# Foundations turn L-2d-2 (with its close, L-2d-3) — report

CI first: newest completed run at the start of L-2d-3 — e639f0b4, **SUCCESS** (run 40958738279; guards: no failed job; E2E: passed, 0 flaky). The run on 444acdf3 had not completed when read; its expected red (the /admin/translations first-paint ceiling) is what the close fixes.

Step 0: docs/governance/briefs/foundations-turn-l-2d-2.md sha256 f8ff391f7d408669d5b4187413a9fc3be10eb9687686b2b589514b915a53c0ec; docs/governance/briefs/foundations-turn-l-2d-3.md sha256 04b8de0a363f0a1e3341073a5cc983c8cab18ee9071270e43305f612c8b2944e (both read back from the fenced block; roadmap line 3 names L-2d-3).

## 1. B1–B7

- B1 (no English change) — done: the route table below, every row equal.
- B2 (the 44 keys, by layer, EN+AM; post.head.title retired) — done: read back from the files below; post.head.title removed in both languages.
- B3 (legal.$kind and dev.* allowlisted in CF-HEAD-1) — done.
- B4 (language laws a/b/c, no router.invalidate) — done: page-head.ts is the base resolver on the first paint; page-head-client.ts arrives on demand through loadOnce in provider.tsx, only for a pick or a non-base applied language; PGH-E1/E2.
- B5 (weight) — done under L-2d-3: every page's growth measured (below); the one page over 0.5 KiB is /admin/translations, ruled growth by right.
- B6 (tests) — done: PGH-1…6 (unit), PGH-E1/E2 (both projects, 0 retries).
- B7 (CF-HEAD-1 proven on a planted literal and wired) — done (with CF-HEAD-2 for the on-demand client).

## 2. Weight

Measured locally with the guard's own closure functions (scripts/bundle-closure.mjs) and node's gzip, as CI's `node scripts/check-bundle-size.mjs` does; before = a `git archive e639f0b4` build, after = this tree. The before column equals the L-2c values recorded in route-budgets.mjs to the 4th decimal. (Note: bun's gzip gives ~1.85 KiB larger figures; only node's is CI's measure.)

### Per-chunk (changed chunks, gzipped KiB)

| Chunk | Before | After | Δ | On |
| --- | --- | --- | --- | --- |
| index (entry) | 122.9688 | 122.5078 | −0.4609 | every page (route literals left) |
| page-head (new) | 0 | 0.2666 | +0.2666 | every page (base resolver) |
| provider | 19.1631 | 19.1943 | +0.0312 | every page (on-demand loader hook) |
| overlay-facade | 3.2656 | 3.2832 | +0.0176 | every page |
| am-admin | 32.0977 | 32.3750 | +0.2773 | /admin/translations (whole catalogue) |
| am-base | 13.7637 | 14.0693 | +0.3057 | /admin/translations |
| am-member | 12.2881 | 12.5518 | +0.2637 | /admin/translations |
| en-admin | 25.7168 | 25.9268 | +0.2100 | /admin/translations |
| en-member | 10.0020 | 10.2227 | +0.2207 | /admin/translations |

Net on a page without the catalogue: about −0.15 KiB. /admin/translations: +1.1309 KiB, cause languages-page.tsx :28–:29 bundling every compiled key in both languages. /admin/listings_/$listingId (+0.30) and /admin/roles_/$roleId (+0.28) carry the member/admin layer chunks (INC-902).

### Per-page (before, after, ceiling)

| Page | Before (KiB) | After (KiB) | Growth | Ceiling before → after |
| --- | --- | --- | --- | --- |
| `/` | 220.9424 | 220.7959 | -0.1465 | 222 → 221 |
| `/$name` | 219.6162 | 219.4688 | -0.1475 | 220 → 220 |
| `/account` | 267.4570 | 267.3105 | -0.1465 | 268 → 268 |
| `/account_/legal` | 209.4131 | 209.2656 | -0.1475 | 210 → 210 |
| `/account_/legal_/$versionId` | 210.0938 | 209.9453 | -0.1484 | 211 → 210 |
| `/account_/saved` | 219.7012 | 219.5557 | -0.1455 | 221 → 220 |
| `/admin` | 207.7656 | 207.6172 | -0.1484 | 209 → 208 |
| `/admin/` | 208.6084 | 208.4600 | -0.1484 | 209 → 209 |
| `/admin/ai` | 335.2510 | 335.1035 | -0.1475 | 336 → 336 |
| `/admin/attributes` | 348.4932 | 348.3438 | -0.1494 | 349 → 349 |
| `/admin/audit` | 308.3506 | 308.2178 | -0.1328 | 309 → 309 |
| `/admin/categories` | 356.7480 | 356.5996 | -0.1484 | 358 → 357 |
| `/admin/countries` | 338.2578 | 338.1113 | -0.1465 | 339 → 339 |
| `/admin/coverage` | 330.8408 | 330.6934 | -0.1475 | 332 → 331 |
| `/admin/images` | 208.4111 | 208.2627 | -0.1484 | 209 → 209 |
| `/admin/impersonation_/$sessionId` | 308.9902 | 308.8467 | -0.1436 | 310 → 309 |
| `/admin/legal` | 278.0195 | 277.8682 | -0.1514 | 279 → 278 |
| `/admin/legal_/$versionId` | 277.3135 | 277.1641 | -0.1494 | 278 → 278 |
| `/admin/legal_/edit` | 282.8652 | 282.7148 | -0.1504 | 284 → 283 |
| `/admin/listings` | 354.6367 | 354.5127 | -0.1240 | 355 → 355 |
| `/admin/listings_/$listingId` | 379.2148 | 379.5186 | +0.3037 | 380 → 380 |
| `/admin/listings_/$listingId_/edit` | 401.5723 | 401.5000 | -0.0723 | 402 → 402 |
| `/admin/locations` | 269.3945 | 269.2461 | -0.1484 | 270 → 270 |
| `/admin/places` | 339.5898 | 339.4404 | -0.1494 | 340 → 340 |
| `/admin/roles` | 305.9570 | 305.8115 | -0.1455 | 307 → 306 |
| `/admin/roles_/$roleId` | 307.2373 | 307.5166 | +0.2793 | 308 → 308 |
| `/admin/screening` | 379.8447 | 379.7275 | -0.1172 | 381 → 380 |
| `/admin/translations` | 410.9893 | 412.1201 | +1.1309 | 412 → 413 |
| `/admin/translations_/$lang` | 321.1846 | 321.0391 | -0.1455 | 322 → 322 |
| `/admin/users` | 304.9580 | 304.8115 | -0.1465 | 306 → 305 |
| `/admin/users_/$userId` | 285.2900 | 285.1396 | -0.1504 | 286 → 286 |
| `/auth` | 219.4678 | 219.3164 | -0.1514 | 220 → 220 |
| `/auth_/callback` | 207.8027 | 207.6553 | -0.1475 | 209 → 208 |
| `/auth_/reset` | 209.8701 | 209.7246 | -0.1455 | 211 → 210 |
| `/c/$slug` | 220.9424 | 220.7959 | -0.1465 | 222 → 221 |
| `/dev/primitives` | 222.7031 | 222.5508 | -0.1523 | 224 → 223 |
| `/dev/style` | 241.7939 | 241.6406 | -0.1533 | 243 → 242 |
| `/dev/tall` | 207.1230 | 206.9775 | -0.1455 | 208 → 207 |
| `/l/$slug` | 250.4922 | 250.3682 | -0.1240 | 251 → 251 |
| `/legal/$kind` | 211.4688 | 211.3213 | -0.1475 | 212 → 212 |
| `/legal/accept` | 218.3877 | 218.2363 | -0.1514 | 219 → 219 |
| `/legal/publishing` | 212.2256 | 212.0820 | -0.1436 | 213 → 213 |
| `/my-listings` | 328.1328 | 327.9902 | -0.1426 | 329 → 328 |
| `/my-listings_/$listingId` | 317.2783 | 317.1582 | -0.1201 | 318 → 318 |
| `/my-listings_/$listingId_/edit` | 396.0615 | 395.9883 | -0.0732 | 397 → 396 |
| `/post` | 396.0215 | 395.9482 | -0.0732 | 397 → 396 |
| `/post_/$listingId` | 395.9863 | 395.9141 | -0.0723 | 397 → 396 |
| `/privacy` | 211.4570 | 211.3145 | -0.1426 | 212 → 212 |
| `/settings` | 271.0732 | 270.9316 | -0.1416 | 272 → 271 |
| `/terms` | 211.4521 | 211.3105 | -0.1416 | 212 → 212 |

All 50 pages moved; every ceiling is now the NEAR band's minimum (ceil of the measured size): /admin/translations 412 → 413 with the strings-console cause; the others with the INC-990 cause, lowered where a page shrank. `node scripts/check-bundle-size.mjs` on this tree: "Bundle budget OK."

## 3. Route table (English before and after)

Rendered English read from the server's HTML (entities decoded) on the dev server; two pages that redirect a signed-out request read through pageHead.

| Route file | Before (literal at 5d61def7) | After (rendered English) | |
| --- | --- | --- | --- |
| `__root.tsx` | ethio.com | "ethio.com" (app.name, root fallback) | n/a |
| `account.tsx` | Account — ethio.com | Account — ethio.com | equal |
| `account_.legal.tsx` | My legal documents — ethio.com | My legal documents — ethio.com | equal |
| `account_.legal_.$versionId.tsx` | A legal document — ethio.com | A legal document — ethio.com | equal |
| `account_.saved.tsx` | Saved — ethio.com | Saved — ethio.com | equal |
| `admin.ai.tsx` | AI — ethio.com Admin | AI — ethio.com Admin | equal |
| `admin.attributes.tsx` | Attributes — ethio.com Admin | Attributes — ethio.com Admin | equal |
| `admin.audit.tsx` | Audit & Security — ethio.com Admin | Audit & Security — ethio.com Admin | equal |
| `admin.categories.tsx` | Categories — ethio.com Admin | Categories — ethio.com Admin | equal |
| `admin.countries.tsx` | Countries — ethio.com Admin | Countries — ethio.com Admin | equal |
| `admin.coverage.tsx` | Coverage — ethio.com Admin | Coverage — ethio.com Admin | equal |
| `admin.images.tsx` | Images — ethio.com Admin | Images — ethio.com Admin | equal |
| `admin.impersonation_.$sessionId.tsx` | Impersonation session — ethio.com Admin | Impersonation session — ethio.com Admin | equal |
| `admin.index.tsx` | Overview — ethio.com Admin | Overview — ethio.com Admin | equal |
| `admin.legal.tsx` | Legal documents — ethio.com Admin | Legal documents — ethio.com Admin | equal |
| `admin.legal_.$versionId.tsx` | Legal version — ethio.com Admin | Legal version — ethio.com Admin | equal |
| `admin.legal_.edit.tsx` | Legal draft — ethio.com Admin | Legal draft — ethio.com Admin (admin layer fallback, read from pageHead; SSR answered 307 signed out) | equal |
| `admin.listings.tsx` | All listings — ethio.com Admin | All listings — ethio.com Admin | equal |
| `admin.listings_.$listingId.tsx` | Listing — ethio.com Admin | Listing — ethio.com Admin | equal |
| `admin.listings_.$listingId_.edit.tsx` | Edit listing — ethio.com Admin | Edit listing — ethio.com Admin | equal |
| `admin.locations.tsx` | Locations — ethio.com Admin | Locations — ethio.com Admin | equal |
| `admin.places.tsx` | Places — ethio.com Admin | Places — ethio.com Admin | equal |
| `admin.roles.tsx` | Roles & Permissions — ethio.com Admin | Roles & Permissions — ethio.com Admin | equal |
| `admin.roles_.$roleId.tsx` | Role — ethio.com Admin | Role — ethio.com Admin | equal |
| `admin.screening.tsx` | Screening queue — ethio.com Admin | Screening queue — ethio.com Admin | equal |
| `admin.translations.tsx` | Translations — ethio.com Admin | Translations — ethio.com Admin | equal |
| `admin.translations_.$lang.tsx` | Language strings — ethio.com Admin | Language strings — ethio.com Admin | equal |
| `admin.tsx` | Admin — ethio.com | "Admin — ethio.com" (layout; the index page title wins on /admin) | n/a |
| `admin.users.tsx` | Users — ethio.com Admin | Users — ethio.com Admin | equal |
| `admin.users_.$userId.tsx` | User — ethio.com Admin | User — ethio.com Admin | equal |
| `auth.tsx` | Sign in — ethio.com | Sign in — ethio.com | equal |
| `auth_.callback.tsx` | Confirm your email — ethio.com | Confirm your email — ethio.com | equal |
| `auth_.reset.tsx` | Reset your password — ethio.com | Reset your password — ethio.com | equal |
| `c.$slug.tsx` | Category — ethio.com | Category — ethio.com | equal |
| `dev.primitives.tsx` | Primitives check — ethio.com | Primitives check — ethio.com | equal |
| `dev.style.tsx` | House style check — ethio.com | House style check — ethio.com | equal |
| `dev.tall.tsx` | Layout check — ethio.com | Layout check — ethio.com | equal |
| `index.tsx` | ethio.com — Ethiopia's marketplace | ethio.com — Ethiopia's marketplace | equal |
| `legal.$kind.tsx` | `${params.kind} — ethio.com` | not rebuilt (B3: E2E scratch seam, CF-HEAD-1 allowlist) | n/a |
| `legal.accept.tsx` | Before you continue — ethio.com | Before you continue — ethio.com | equal |
| `my-listings.tsx` | My listings — ethio.com | My listings — ethio.com | equal |
| `my-listings_.$listingId.tsx` | My listing — ethio.com | My listing — ethio.com | equal |
| `my-listings_.$listingId_.edit.tsx` | Edit your ad — ethio.com | Edit your ad — ethio.com | equal |
| `post.tsx` | Post a listing — ethio.com | Post a listing — ethio.com | equal |
| `post_.$listingId.tsx` | Continue your listing — ethio.com | Continue your listing — ethio.com | equal |
| `settings.tsx` | Account settings — ethio.com | Account settings — ethio.com | equal |
| `/privacy` | Privacy Policy — ethio.com | Privacy Policy — ethio.com | equal |
| `/terms` | Terms of Service — ethio.com | Terms of Service — ethio.com | equal |
| `/legal/publishing` | Publishing statement — ethio.com | Publishing statement — ethio.com (pageHead resolved; SSR answered 307 signed out) | equal |

## 4. The 44 keys as committed

| Key | Layer | English | Amharic |
| --- | --- | --- | --- |
| `head.auth.description` | base | "Sign in or create your free ethio.com account." | "ይግቡ ወይም ነጻ የ ethio.com አካውንትዎን ይፍጠሩ።" |
| `head.authCallback.description` | base | "Finish confirming your ethio.com account." | "የ ethio.com አካውንትዎን ማረጋገጥ ይጨርሱ።" |
| `head.authCallback.title` | base | "Confirm your email" | "ኢሜይልዎን ያረጋግጡ" |
| `head.authReset.description` | base | "Choose a new password for your ethio.com account." | "ለ ethio.com አካውንትዎ አዲስ የይለፍ ቃል ይምረጡ።" |
| `head.category.description` | base | "Browse listings in this category from sellers near you." | "በዚህ ምድብ ውስጥ በአቅራቢያዎ ካሉ ሻጮች ማስታወቂያዎችን ይመልከቱ።" |
| `head.category.title` | base | "Category" | "ምድብ" |
| `head.home.description` | base | "Browse listings from sellers near you. Free to post, free to browse." | "በአቅራቢያዎ ካሉ ሻጮች ማስታወቂያዎችን ይመልከቱ። መለጠፍም መመልከትም ነጻ ነው።" |
| `head.home.title` | base | "ethio.com — Ethiopia's marketplace" | "ethio.com — የኢትዮጵያ ገበያ" |
| `head.legalAccept.description` | base | "Accept the Terms of Service and the Privacy Policy." | "የአገልግሎት ውሎቹን እና የግላዊነት መመሪያውን ይቀበሉ።" |
| `head.seller.description` | base | "Ads by {name} on ethio.com." | "በ ethio.com ላይ የ{name} ማስታወቂያዎች።" |
| `head.site.description` | base | "Ethiopia's marketplace — coming soon." | "የኢትዮጵያ ገበያ — በቅርቡ ይመጣል።" |
| `head.site.pattern.title` | base | "{name} — ethio.com" | "{name} — ethio.com" |
| `head.privacy.description` | base |  | "የ ethio.com የግላዊነት መመሪያ፣ በሥራ ላይ ያለው ስሪት እና ቀጣዩ።" |
| `head.publishing.description` | base |  | "እያንዳንዱ ሻጭ ማስታወቂያው በቀጥታ ከመውጣቱ በፊት የሚያረጋግጠው የማስታወቂያ ማረጋገጫ ቃል።" |
| `head.terms.description` | base |  | "የ ethio.com የአገልግሎት ውሎች፣ በሥራ ላይ ያለው ስሪት እና ቀጣዩ።" |
| `head.account.description` | member | "Review your ethio.com account and listing activity." | "የ ethio.com አካውንትዎን እና የማስታወቂያ እንቅስቃሴዎን ይመልከቱ።" |
| `head.continuePost.description` | member | "Finish the listing you started on ethio.com." | "በ ethio.com ላይ የጀመሩትን ማስታወቂያ ይጨርሱ።" |
| `head.continuePost.title` | member | "Continue your listing" | "ማስታወቂያዎን ይቀጥሉ" |
| `head.editAd.description` | member | "Change one of your ads on ethio.com, step by step." | "በ ethio.com ላይ ካሉ ማስታወቂያዎችዎ አንዱን ደረጃ በደረጃ ይቀይሩ።" |
| `head.myLegal.description` | member | "The legal documents you accepted on ethio.com." | "በ ethio.com ላይ የተቀበሏቸው ሕጋዊ ሰነዶች።" |
| `head.myLegalDocument.description` | member | "A legal document you accepted on ethio.com." | "በ ethio.com ላይ የተቀበሉት ሕጋዊ ሰነድ።" |
| `head.myLegalDocument.title` | member | "A legal document" | "ሕጋዊ ሰነድ" |
| `head.myListing.description` | member | "One of your ads on ethio.com: its state, history and actions." | "በ ethio.com ላይ ካሉ ማስታወቂያዎችዎ አንዱ፦ ሁኔታው፣ ታሪኩ እና እርምጃዎቹ።" |
| `head.myListing.title` | member | "My listing" | "የእኔ ማስታወቂያ" |
| `head.myListings.description` | member | "Your ads on ethio.com: live, in review, closed and sold." | "በ ethio.com ላይ ያሉ ማስታወቂያዎችዎ፦ በቀጥታ ያሉ፣ በግምገማ ላይ ያሉ፣ የተዘጉ እና የተሸጡ።" |
| `head.post.description` | member | "Post what you are selling on ethio.com in a few short steps." | "የሚሸጡትን በጥቂት አጭር ደረጃዎች በ ethio.com ላይ ይለጥፉ።" |
| `head.saved.description` | member | "Your saved ads on ethio.com." | "በ ethio.com ላይ ያስቀመጧቸው ማስታወቂያዎች።" |
| `head.settings.description` | member | "Manage your ethio.com sign-in methods and security." | "የ ethio.com መግቢያ መንገዶችዎን እና ደህንነትዎን ያስተዳድሩ።" |
| `head.settings.title` | member | "Account settings" | "የአካውንት ቅንብሮች" |
| `head.admin.editListing.title` | admin | "Edit listing" | "ማስታወቂያውን ያርትዑ" |
| `head.admin.impersonation.title` | admin | "Impersonation session" | "የመወከል ክፍለ ጊዜ" |
| `head.admin.languageStrings.title` | admin | "Language strings" | "የቋንቋ ሐረጎች" |
| `head.admin.legal.title` | admin | "Legal documents" | "ሕጋዊ ሰነዶች" |
| `head.admin.legalDraft.title` | admin | "Legal draft" | "የሕጋዊ ሰነድ ረቂቅ" |
| `head.admin.legalVersion.title` | admin | "Legal version" | "የሕጋዊ ሰነድ ስሪት" |
| `head.admin.listing.title` | admin | "Listing" | "ማስታወቂያ" |
| `head.admin.panel.description` | admin | "Administration panel for ethio.com staff." | "ለ ethio.com ሠራተኞች የአስተዳደር ክፍል።" |
| `head.admin.pattern.description` | admin | "{name} in the ethio.com staff panel." | "{name} በ ethio.com የሠራተኞች ክፍል ውስጥ።" |
| `head.admin.pattern.title` | admin | "{name} — ethio.com Admin" | "{name} — ethio.com አስተዳደር" |
| `head.admin.role.title` | admin | "Role" | "ሚና" |
| `head.admin.user.title` | admin | "User" | "ተጠቃሚ" |
| `head.admin.legal.description` | admin |  | "በ ethio.com ላይ የሕጋዊ ሰነዶችን ስሪቶች እና ሲታተሙ የሚቀመጡ መረጃዎችን ያስተዳድሩ።" |
| `head.admin.legalDraft.description` | admin |  | "በ ethio.com ላይ ባለ ሁለት ቋንቋ የሕጋዊ ሰነድ ረቂቆችን ይጻፉ እና ያትሙ።" |
| `head.admin.legalVersion.description` | admin |  | "በ ethio.com ላይ የሕጋዊ ሰነድ ስሪትን እና ሲታተም የተቀመጡ መረጃዎቹን ያንብቡ።" |


nav.locations moved from the base layer to the admin layer (both languages, same text); post.head.title retired.

## 5. Tests

- PGH-1…6 (src/lib/page-head.test.ts): pass in the unit run of `bun run checks`.
- PGH-E1/E2 (e2e/page-head.spec.ts): 4/4 passed, both projects, 0 retries (L-2d-2's `bun run e2e:local -- e2e/page-head.spec.ts`); no code changed in L-2d-3.

## 6. Checks

CHECKS_LINE

## 7. K2

- Tooling `localeCompare` outside the reader-order mechanism: scripts/admin-tables.ts:175, scripts/i18n-usage-map.ts:113, scripts/ci/turn-checks.ts:229, scripts/e2e-failure-report.ts:946,962, scripts/destructive-red.ts:170; the E2E Segmenter oracle e2e/helpers/ui.ts:1457 (reported, not touched).
- src/features/admin/translations/languages-page.tsx :28–:29 imports the whole compiled catalogues by value; every new key grows that page (ruled by right; reported as the cause).

## 8. Limits and follow-ups

- The category-name title for /c/$slug (roadmap), and non-Latin database fixed-order parity, stay open.
- CI on the final commit is the full-suite proof; this report claims no CI verdict for it.
