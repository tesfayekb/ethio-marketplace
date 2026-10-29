/**
 * D234 speed turn S1 — THE PER-PAGE FIRST-DOWNLOAD CEILINGS (KiB, gzip level 6),
 * read by scripts/check-bundle-size.mjs. Every page route the build's route
 * manifest names has one line here (server routes under /api/ have no page and
 * are left out by rule); a page with no line fails the guard, and so does a line
 * whose page is gone. `public` marks a page a visitor opens signed out: its
 * first download must also hold none of PUBLIC_MUST_STAY_LAZY
 * (scripts/bundle-closure.mjs).
 *
 * A RATCHET: each ceiling is the page's measured download plus 3 KiB of
 * build-to-build room, rounded up. A page that grows past its ceiling fails; a page that
 * shrinks 8 KiB or more below it fails too, until its ceiling is lowered in the
 * same commit — so every saving is kept. Raising a ceiling is a commit that says
 * why. Measured 2026-10-26 on the Foundations turn 34 build (DEC-261: the Supabase client left
 * every public page's first download, 49.9–50.4 KiB off each; the comment after each line). The 29
 * signed-in and staff pages whose code still imports the client (the vendor-seams freeze, INC-877)
 * now fetch it as a chunk of its own beside the entry, 3.9–4.0 KiB more than when it rode the
 * entry (the door, the import helper and the client's own compression), and their ceilings rise
 * by that much — a signed-in visitor's client starts downloading as the page's code arrives
 * (src/lib/supabase-door.ts). The three admin pages that import the whole catalogue
 * (/admin/listings_/$listingId, /admin/roles_/$roleId, /admin/translations) carry its member part
 * as a chunk of their own (INC-902).
 */
export const ROUTE_BUDGETS_KIB = {
  "/": { ceiling: 221, public: true }, // 219.9 (CI-2 NEAR band (R4), local build on f9569298: grew in D239/CI-1 — the account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page); was 217.0
  "/$name": { ceiling: 220, public: true }, // 219.3 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the seller page's member-since date (seller-line)); before: 215.7
  "/account": { ceiling: 268, public: false }, // 267.1 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the overview's dates and counts); before: 266.1 on CI 7a95706a (N1b-2c: three post.seller.* strings in the base locale — the owner notice draws on the public ad page)
  "/account_/legal": { ceiling: 210, public: false }, // 209.1 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the acceptance moments); before: 205.4
  "/account_/legal_/$versionId": { ceiling: 211, public: false }, // 209.7 (CI-2 NEAR band (R4), local build on f9569298: grew in D239/CI-1 — the account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page); was 206.9
  "/account_/saved": { ceiling: 220, public: false }, // 219.4 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the saved cards' prices (use-price-unit-labels)); before: 215.8
  "/admin": { ceiling: 208, public: false }, // 204.5
  "/admin/": { ceiling: 209, public: false }, // 205.4
  "/admin/ai": { ceiling: 336, public: false }, // 334.8 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the page's own dates and numbers; the NEAR band, R4); before: 334.1 (CI-1 local build: D239's account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page; INC-864 keeps reader-failure lazy); was 333.8 on CI 69339baf (N1b-3a A1, INC-987: the shared Filters blocks — FiltersButton, FilterChips — now on the AI calls table)
  "/admin/attributes": { ceiling: 349, public: false }, // 348.0 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the console's relative times (category-dialogs → relative-time)); before: 347.1 on CI 7a95706a (N1b-2c: three post.seller.* strings in the base locale)
  "/admin/audit": { ceiling: 309, public: false }, // 307.9 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the page's own dates and numbers; the NEAR band, R4); before: 304.1
  "/admin/categories": { ceiling: 357, public: false }, // 356.3 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the console's relative times (category-dialogs → relative-time)); before: 352.1
  "/admin/countries": { ceiling: 339, public: false }, // 337.8 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the console's relative times (category-dialogs → relative-time); the NEAR band, R4); before: 337.1 (CI-1 local build: D239's account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page; INC-864 keeps reader-failure lazy); was 333.7
  "/admin/coverage": { ceiling: 331, public: false }, // 329.7 (CI-2 NEAR band (R4), local build on f9569298: grew in D239/CI-1 — the account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page); was 326.3
  "/admin/images": { ceiling: 209, public: false }, // 205.2
  "/admin/impersonation_/$sessionId": { ceiling: 309, public: false }, // 307.9 (CI-2 NEAR band (R4), local build on f9569298: grew in D239/CI-1 — the account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page); was 304.6
  "/admin/legal": { ceiling: 279, public: false }, // 277.7 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the page's own dates and numbers; the NEAR band, R4); before: 276.9 (CI-2 NEAR band (R4), local build on f9569298: grew in D239/CI-1 — the account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page); was 273.9
  "/admin/legal_/$versionId": { ceiling: 278, public: false }, // 277.0 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the page's own dates and numbers; the NEAR band, R4); before: 273.2
  "/admin/legal_/edit": { ceiling: 283, public: false }, // 279.3
  "/admin/listings": { ceiling: 355, public: false }, // 354.2 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the table's dates and prices); before: 353.1 on CI 7a95706a (N1b-2c: three post.seller.* strings in the base locale)
  "/admin/listings_/$listingId": { ceiling: 380, public: false }, // 378.8 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the page's own dates and numbers; the NEAR band, R4); before: 375.6 (turn C1-2: the maps' failure in place; INC-964)
  "/admin/listings_/$listingId_/edit": { ceiling: 403, public: false }, // 399.1 (turn C1-2: the maps' failure in place; INC-964)
  "/admin/locations": { ceiling: 270, public: false }, // 266.1
  "/admin/places": { ceiling: 340, public: false }, // 339.1 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the console's relative times (category-dialogs → relative-time)); before: 338.0 on CI 31d5fb6b (INC-974: the rail seed, +0.3–0.4 on every page — the blank-menu fix)
  "/admin/roles": { ceiling: 306, public: false }, // 302.1
  "/admin/roles_/$roleId": { ceiling: 308, public: false }, // 306.8 (CI-2 NEAR band (R4), local build on f9569298: grew in D239/CI-1 — the account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page); was 306.4 (CI-1, run on 9b8a8cdc: N1b-3c's 37 admin-layer strings)
  "/admin/screening": { ceiling: 380, public: false }, // 378.8 (CI-2 NEAR band (R4), local build on f9569298: grew in D239/CI-1 — the account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page); was 378.2 (CI-1, run on 9b8a8cdc: N1b-3c's held-names section, the job line and its 37 admin strings); was 373.5 (turn C1-2: the maps' failure in place; INC-964)
  "/admin/translations": { ceiling: 411, public: false }, // 410.5 (CI-1 local build: D239's account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page; INC-864 keeps reader-failure lazy); was 409.8 (CI-1, run on 9b8a8cdc: N1b-3c's 37 admin-layer strings); was 408.4 (INC-974: the rail seed, +0.3 on every page — the blank-menu fix)
  "/admin/translations_/$lang": { ceiling: 322, public: false }, // 320.8 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the console's relative times (relative-time); the NEAR band, R4); before: 320.1 (CI-1 local build: D239's account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page; INC-864 keeps reader-failure lazy); was 316.6
  "/admin/users": { ceiling: 305, public: false }, // 303.8 (CI-2 NEAR band (R4), local build on f9569298: grew in D239/CI-1 — the account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page); was 300.6
  "/admin/users_/$userId": { ceiling: 286, public: false }, // 284.9 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the page's own dates and numbers; the NEAR band, R4); before: 281.1
  "/auth": { ceiling: 220, public: true }, // 219.0 (CI-1 local build: D239's account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page; INC-864 keeps reader-failure lazy); was 216.0
  "/auth_/callback": { ceiling: 208, public: true }, // 204.5
  "/auth_/reset": { ceiling: 210, public: true }, // 206.5
  "/c/$slug": { ceiling: 221, public: true }, // 219.9 (CI-2 NEAR band (R4), local build on f9569298: grew in D239/CI-1 — the account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page); was 217.0
  "/dev/primitives": { ceiling: 223, public: false }, // 219.3
  "/dev/style": { ceiling: 242, public: false }, // 238.1
  "/dev/tall": { ceiling: 208, public: false }, // 206.7 (CI-2 NEAR band (R4), local build on f9569298: grew in D239/CI-1 — the account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page); was 203.9
  "/l/$slug": { ceiling: 251, public: true }, // 247.3 (turn C1-2: the maps' failure in place; INC-964)
  "/legal/$kind": { ceiling: 212, public: true }, // 211.1 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the document's effective date (legal-dates)); before: 207.5
  "/legal/accept": { ceiling: 219, public: false }, // 217.9 (CI-2 NEAR band (R4), local build on f9569298: grew in D239/CI-1 — the account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page); was 215.0
  "/legal/publishing": { ceiling: 213, public: true }, // 211.9 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the document's effective date (legal-dates); the NEAR band, R4); before: 208.2
  "/my-listings": { ceiling: 329, public: false }, // 327.7 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the page's own dates and numbers; the NEAR band, R4); before: 327.0 (CI-1 local build: D239's account rule, the tab-follow listener and the on-demand reader-failure loader in the root language provider, on every page; INC-864 keeps reader-failure lazy); was 323.4
  "/my-listings_/$listingId": { ceiling: 318, public: false }, // 316.9 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the page's own dates and numbers; the NEAR band, R4); before: 316.0 (CI-1, run on 9b8a8cdc: N1b-2c's review notice on my listing page); was 315.1 (INC-972: INC-949's mapsPathQuery is first-paint — the Maps address no longer waits for the tree; the six INC-951 dial entries ride the one eager registry, src/lib/dials.ts, which no page may split)
  "/my-listings_/$listingId_/edit": { ceiling: 397, public: false }, // 393.2 (CI, turn C1)
  "/post": { ceiling: 397, public: false }, // 393.1 (CI, turn C1)
  "/post_/$listingId": { ceiling: 397, public: false }, // 393.1 (CI, turn C1)
  "/privacy": { ceiling: 212, public: true }, // 211.1 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the document's effective date (legal-dates)); before: 207.5
  "/settings": { ceiling: 272, public: false }, // 270.7 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the page's own dates and numbers; the NEAR band, R4); before: 267.3
  "/terms": { ceiling: 212, public: true }, // 211.1 locally on L-1 (INC-985: src/lib/format.ts on the first paint by right — the document's effective date (legal-dates)); before: 207.5
};

/** A page this far under its ceiling (KiB) fails until the ceiling is lowered. */
export const RATCHET_SLACK_KIB = 8;
