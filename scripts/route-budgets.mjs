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
  "/admin/ai": { ceiling: 331, public: false }, // 327.7
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
  "/admin/listings_/$listingId": { ceiling: 375, public: false }, // 371.7
  "/admin/listings_/$listingId_/edit": { ceiling: 399, public: false }, // 395.1
  "/admin/locations": { ceiling: 270, public: false }, // 266.1
  "/admin/places": { ceiling: 338, public: false }, // 335.0
  "/admin/roles": { ceiling: 306, public: false }, // 302.1
  "/admin/roles_/$roleId": { ceiling: 306, public: false }, // 302.7
  "/admin/screening": { ceiling: 373, public: false }, // 369.5
  "/admin/translations": { ceiling: 408, public: false }, // 404.4
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
  "/l/$slug": { ceiling: 247, public: true }, // 243.5
  "/legal/$kind": { ceiling: 211, public: true }, // 207.5
  "/legal/accept": { ceiling: 218, public: false }, // 215.0
  "/legal/publishing": { ceiling: 212, public: true }, // 208.2
  "/my-listings": { ceiling: 327, public: false }, // 323.4
  "/my-listings_/$listingId": { ceiling: 315, public: false }, // 311.1
  "/my-listings_/$listingId_/edit": { ceiling: 393, public: false }, // 389.8
  "/post": { ceiling: 393, public: false }, // 389.8
  "/post_/$listingId": { ceiling: 393, public: false }, // 389.8
  "/privacy": { ceiling: 211, public: true }, // 207.5
  "/settings": { ceiling: 271, public: false }, // 267.3
  "/terms": { ceiling: 211, public: true }, // 207.5
};

/** A page this far under its ceiling (KiB) fails until the ceiling is lowered. */
export const RATCHET_SLACK_KIB = 8;
