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
 * why. Measured 2026-10-25 on the Foundations turn 31 build (DEC-259: the tooltip's and the
 * dropdown menu's code left every page's first download; the comment after each line). The three
 * admin pages that import the whole catalogue (/admin/listings_/$listingId, /admin/roles_/$roleId,
 * /admin/translations) carry its member part as a chunk of their own (INC-902).
 */
export const ROUTE_BUDGETS_KIB = {
  "/": { ceiling: 277, public: true }, // 273.4
  "/$name": { ceiling: 276, public: true }, // 272.1
  "/account": { ceiling: 268, public: false }, // 264.9
  "/account_/legal": { ceiling: 265, public: false }, // 261.8
  "/account_/legal_/$versionId": { ceiling: 267, public: false }, // 263.3
  "/account_/saved": { ceiling: 276, public: false }, // 272.2
  "/admin": { ceiling: 264, public: false }, // 260.9
  "/admin/": { ceiling: 265, public: false }, // 261.8
  "/admin/ai": { ceiling: 327, public: false }, // 323.4
  "/admin/attributes": { ceiling: 343, public: false }, // 339.7
  "/admin/audit": { ceiling: 303, public: false }, // 299.8
  "/admin/categories": { ceiling: 351, public: false }, // 347.9
  "/admin/countries": { ceiling: 333, public: false }, // 329.5
  "/admin/coverage": { ceiling: 325, public: false }, // 322.0
  "/admin/images": { ceiling: 265, public: false }, // 261.6
  "/admin/impersonation_/$sessionId": { ceiling: 304, public: false }, // 300.4
  "/admin/legal": { ceiling: 279, public: false }, // 275.9
  "/admin/legal_/$versionId": { ceiling: 279, public: false }, // 275.2
  "/admin/legal_/edit": { ceiling: 286, public: false }, // 282.2
  "/admin/listings": { ceiling: 349, public: false }, // 345.1
  "/admin/listings_/$listingId": { ceiling: 377, public: false }, // 373.7
  "/admin/listings_/$listingId_/edit": { ceiling: 401, public: false }, // 397.9
  "/admin/locations": { ceiling: 272, public: false }, // 268.2
  "/admin/places": { ceiling: 334, public: false }, // 330.7
  "/admin/roles": { ceiling: 301, public: false }, // 297.9
  "/admin/roles_/$roleId": { ceiling: 308, public: false }, // 304.7
  "/admin/screening": { ceiling: 370, public: false }, // 366.1
  "/admin/translations": { ceiling: 405, public: false }, // 401.1
  "/admin/translations_/$lang": { ceiling: 317, public: false }, // 313.3
  "/admin/users": { ceiling: 300, public: false }, // 296.3
  "/admin/users_/$userId": { ceiling: 287, public: false }, // 283.2
  "/auth": { ceiling: 276, public: true }, // 272.3
  "/auth_/callback": { ceiling: 264, public: true }, // 260.9
  "/auth_/reset": { ceiling: 266, public: true }, // 262.9
  "/c/$slug": { ceiling: 277, public: true }, // 273.4
  "/dev/primitives": { ceiling: 279, public: false }, // 275.7
  "/dev/style": { ceiling: 291, public: false }, // 287.7
  "/dev/tall": { ceiling: 264, public: false }, // 260.3
  "/l/$slug": { ceiling: 303, public: true }, // 299.8
  "/legal/$kind": { ceiling: 267, public: true }, // 263.9
  "/legal/accept": { ceiling: 275, public: false }, // 271.3
  "/legal/publishing": { ceiling: 268, public: true }, // 264.6
  "/my-listings": { ceiling: 323, public: false }, // 320.0
  "/my-listings_/$listingId": { ceiling: 317, public: false }, // 314.0
  "/my-listings_/$listingId_/edit": { ceiling: 396, public: false }, // 392.7
  "/post": { ceiling: 396, public: false }, // 392.6
  "/post_/$listingId": { ceiling: 396, public: false }, // 392.6
  "/privacy": { ceiling: 267, public: true }, // 263.9
  "/settings": { ceiling: 273, public: false }, // 269.3
  "/terms": { ceiling: 267, public: true }, // 263.9
};

/** A page this far under its ceiling (KiB) fails until the ceiling is lowered. */
export const RATCHET_SLACK_KIB = 8;
