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
  "/": { ceiling: 220, public: true }, // 217.0
  "/$name": { ceiling: 219, public: true }, // 215.7
  "/account": { ceiling: 266, public: false }, // 262.9
  "/account_/legal": { ceiling: 209, public: false }, // 205.4
  "/account_/legal_/$versionId": { ceiling: 210, public: false }, // 206.9
  "/account_/saved": { ceiling: 219, public: false }, // 215.8
  "/admin": { ceiling: 208, public: false }, // 204.5
  "/admin/": { ceiling: 209, public: false }, // 205.4
  "/admin/ai": { ceiling: 333, public: false }, // 332.3 (INC-974: A2's call history — admin.ai +1.2, en/am-admin +0.6, data-table keyset +0.1 — and the rail seed +0.4; a split is bigger, INC-978)
  "/admin/attributes": { ceiling: 347, public: false }, // 343.9
  "/admin/audit": { ceiling: 308, public: false }, // 304.1
  "/admin/categories": { ceiling: 356, public: false }, // 352.1
  "/admin/countries": { ceiling: 337, public: false }, // 333.7
  "/admin/coverage": { ceiling: 330, public: false }, // 326.3
  "/admin/images": { ceiling: 209, public: false }, // 205.2
  "/admin/impersonation_/$sessionId": { ceiling: 308, public: false }, // 304.6
  "/admin/legal": { ceiling: 277, public: false }, // 273.9
  "/admin/legal_/$versionId": { ceiling: 277, public: false }, // 273.2
  "/admin/legal_/edit": { ceiling: 283, public: false }, // 279.3
  "/admin/listings": { ceiling: 353, public: false }, // 349.4
  "/admin/listings_/$listingId": { ceiling: 379, public: false }, // 375.6 (turn C1-2: the maps' failure in place; INC-964)
  "/admin/listings_/$listingId_/edit": { ceiling: 403, public: false }, // 399.1 (turn C1-2: the maps' failure in place; INC-964)
  "/admin/locations": { ceiling: 270, public: false }, // 266.1
  "/admin/places": { ceiling: 338, public: false }, // 335.0
  "/admin/roles": { ceiling: 306, public: false }, // 302.1
  "/admin/roles_/$roleId": { ceiling: 306, public: false }, // 302.7
  "/admin/screening": { ceiling: 377, public: false }, // 373.5 (turn C1-2: the maps' failure in place; INC-964)
  "/admin/translations": { ceiling: 409, public: false }, // 408.4 (INC-974: the rail seed, +0.3 on every page — the blank-menu fix)
  "/admin/translations_/$lang": { ceiling: 320, public: false }, // 316.6
  "/admin/users": { ceiling: 304, public: false }, // 300.6
  "/admin/users_/$userId": { ceiling: 285, public: false }, // 281.1
  "/auth": { ceiling: 219, public: true }, // 216.0
  "/auth_/callback": { ceiling: 208, public: true }, // 204.5
  "/auth_/reset": { ceiling: 210, public: true }, // 206.5
  "/c/$slug": { ceiling: 220, public: true }, // 217.0
  "/dev/primitives": { ceiling: 223, public: false }, // 219.3
  "/dev/style": { ceiling: 242, public: false }, // 238.1
  "/dev/tall": { ceiling: 207, public: false }, // 203.9
  "/l/$slug": { ceiling: 251, public: true }, // 247.3 (turn C1-2: the maps' failure in place; INC-964)
  "/legal/$kind": { ceiling: 211, public: true }, // 207.5
  "/legal/accept": { ceiling: 218, public: false }, // 215.0
  "/legal/publishing": { ceiling: 212, public: true }, // 208.2
  "/my-listings": { ceiling: 327, public: false }, // 323.4
  "/my-listings_/$listingId": { ceiling: 316, public: false }, // 315.1 (INC-972: INC-949's mapsPathQuery is first-paint — the Maps address no longer waits for the tree; the six INC-951 dial entries ride the one eager registry, src/lib/dials.ts, which no page may split)
  "/my-listings_/$listingId_/edit": { ceiling: 397, public: false }, // 393.2 (CI, turn C1)
  "/post": { ceiling: 397, public: false }, // 393.1 (CI, turn C1)
  "/post_/$listingId": { ceiling: 397, public: false }, // 393.1 (CI, turn C1)
  "/privacy": { ceiling: 211, public: true }, // 207.5
  "/settings": { ceiling: 271, public: false }, // 267.3
  "/terms": { ceiling: 211, public: true }, // 207.5
};

/** A page this far under its ceiling (KiB) fails until the ceiling is lowered. */
export const RATCHET_SLACK_KIB = 8;
