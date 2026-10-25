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
 * why. Measured 2026-10-25 on the Foundations turn 30 build (DEC-258: the member strings
 * left every page's first download; the comment after each line). Three admin pages rose
 * (/admin/listings_/$listingId, /admin/roles_/$roleId, /admin/translations): each imports
 * the whole catalogue to test a key or to sync it, and its member part is now a chunk of
 * its own (INC-902).
 */
export const ROUTE_BUDGETS_KIB = {
  "/": { ceiling: 297, public: true }, // 293.7
  "/$name": { ceiling: 296, public: true }, // 292.4
  "/account": { ceiling: 289, public: false }, // 285.2
  "/account_/legal": { ceiling: 285, public: false }, // 282.0
  "/account_/legal_/$versionId": { ceiling: 287, public: false }, // 283.5
  "/account_/saved": { ceiling: 296, public: false }, // 292.4
  "/admin": { ceiling: 285, public: false }, // 281.2
  "/admin/": { ceiling: 285, public: false }, // 282.0
  "/admin/ai": { ceiling: 337, public: false }, // 333.4
  "/admin/attributes": { ceiling: 353, public: false }, // 349.7
  "/admin/audit": { ceiling: 313, public: false }, // 309.8
  "/admin/categories": { ceiling: 361, public: false }, // 357.9
  "/admin/countries": { ceiling: 343, public: false }, // 339.5
  "/admin/coverage": { ceiling: 335, public: false }, // 332.0
  "/admin/images": { ceiling: 285, public: false }, // 281.8
  "/admin/impersonation_/$sessionId": { ceiling: 314, public: false }, // 310.4
  "/admin/legal": { ceiling: 300, public: false }, // 296.2
  "/admin/legal_/$versionId": { ceiling: 299, public: false }, // 295.5
  "/admin/legal_/edit": { ceiling: 306, public: false }, // 302.5
  "/admin/listings": { ceiling: 359, public: false }, // 355.2
  "/admin/listings_/$listingId": { ceiling: 397, public: false }, // 393.5
  "/admin/listings_/$listingId_/edit": { ceiling: 421, public: false }, // 417.8
  "/admin/locations": { ceiling: 292, public: false }, // 288.4
  "/admin/places": { ceiling: 344, public: false }, // 340.7
  "/admin/roles": { ceiling: 311, public: false }, // 307.9
  "/admin/roles_/$roleId": { ceiling: 328, public: false }, // 324.9
  "/admin/screening": { ceiling: 380, public: false }, // 376.1
  "/admin/translations": { ceiling: 415, public: false }, // 411.1
  "/admin/translations_/$lang": { ceiling: 327, public: false }, // 323.3
  "/admin/users": { ceiling: 310, public: false }, // 306.4
  "/admin/users_/$userId": { ceiling: 306, public: false }, // 303.0
  "/auth": { ceiling: 296, public: true }, // 292.2
  "/auth_/callback": { ceiling: 285, public: true }, // 281.1
  "/auth_/reset": { ceiling: 287, public: true }, // 283.2
  "/c/$slug": { ceiling: 297, public: true }, // 293.7
  "/dev/primitives": { ceiling: 299, public: false }, // 295.6
  "/dev/style": { ceiling: 301, public: false }, // 297.7
  "/dev/tall": { ceiling: 284, public: false }, // 280.5
  "/l/$slug": { ceiling: 321, public: true }, // 317.2
  "/legal/$kind": { ceiling: 288, public: true }, // 284.1
  "/legal/accept": { ceiling: 295, public: false }, // 291.2
  "/legal/publishing": { ceiling: 288, public: true }, // 284.8
  "/my-listings": { ceiling: 334, public: false }, // 330.1
  "/my-listings_/$listingId": { ceiling: 337, public: false }, // 333.8
  "/my-listings_/$listingId_/edit": { ceiling: 416, public: false }, // 412.6
  "/post": { ceiling: 416, public: false }, // 412.6
  "/post_/$listingId": { ceiling: 416, public: false }, // 412.5
  "/privacy": { ceiling: 288, public: true }, // 284.1
  "/settings": { ceiling: 293, public: false }, // 289.6
  "/terms": { ceiling: 288, public: true }, // 284.1
};

/** A page this far under its ceiling (KiB) fails until the ceiling is lowered. */
export const RATCHET_SLACK_KIB = 8;
