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
 * why. Measured 2026-10-25 on the S3 build (the comment after each line).
 */
export const ROUTE_BUDGETS_KIB = {
  "/": { ceiling: 304, public: true }, // 300.6
  "/$name": { ceiling: 303, public: true }, // 299.3
  "/account": { ceiling: 296, public: false }, // 292.2
  "/account_/legal": { ceiling: 293, public: false }, // 289.1
  "/account_/legal_/$versionId": { ceiling: 294, public: false }, // 290.6
  "/account_/saved": { ceiling: 303, public: false }, // 299.4
  "/admin": { ceiling: 292, public: false }, // 288.4
  "/admin/": { ceiling: 293, public: false }, // 289.2
  "/admin/ai": { ceiling: 344, public: false }, // 340.7
  "/admin/attributes": { ceiling: 360, public: false }, // 356.9
  "/admin/audit": { ceiling: 320, public: false }, // 317.0
  "/admin/categories": { ceiling: 369, public: false }, // 365.1
  "/admin/countries": { ceiling: 350, public: false }, // 346.7
  "/admin/coverage": { ceiling: 343, public: false }, // 339.3
  "/admin/images": { ceiling: 292, public: false }, // 289.0
  "/admin/impersonation_/$sessionId": { ceiling: 321, public: false }, // 317.5
  "/admin/legal": { ceiling: 307, public: false }, // 303.4
  "/admin/legal_/$versionId": { ceiling: 306, public: false }, // 302.7
  "/admin/legal_/edit": { ceiling: 313, public: false }, // 309.7
  "/admin/listings": { ceiling: 366, public: false }, // 362.4
  "/admin/listings_/$listingId": { ceiling: 394, public: false }, // 390.2
  "/admin/listings_/$listingId_/edit": { ceiling: 429, public: false }, // 425.5
  "/admin/locations": { ceiling: 299, public: false }, // 295.6
  "/admin/places": { ceiling: 351, public: false }, // 347.9
  "/admin/roles": { ceiling: 319, public: false }, // 315.1
  "/admin/roles_/$roleId": { ceiling: 325, public: false }, // 321.7
  "/admin/screening": { ceiling: 387, public: false }, // 383.2
  "/admin/translations": { ceiling: 409, public: false }, // 405.7
  "/admin/translations_/$lang": { ceiling: 334, public: false }, // 330.5
  "/admin/users": { ceiling: 317, public: false }, // 313.6
  "/admin/users_/$userId": { ceiling: 314, public: false }, // 310.2
  "/auth": { ceiling: 303, public: true }, // 299.2
  "/auth_/callback": { ceiling: 292, public: true }, // 288.1
  "/auth_/reset": { ceiling: 294, public: true }, // 290.2
  "/c/$slug": { ceiling: 304, public: true }, // 300.6
  "/dev/primitives": { ceiling: 306, public: false }, // 302.6
  "/dev/style": { ceiling: 308, public: false }, // 304.8
  "/dev/tall": { ceiling: 291, public: false }, // 287.6
  "/l/$slug": { ceiling: 328, public: true }, // 324.2
  "/legal/$kind": { ceiling: 295, public: true }, // 291.2
  "/legal/accept": { ceiling: 302, public: false }, // 298.3
  "/legal/publishing": { ceiling: 295, public: true }, // 291.9
  "/my-listings": { ceiling: 341, public: false }, // 337.1
  "/my-listings_/$listingId": { ceiling: 344, public: false }, // 340.8
  "/my-listings_/$listingId_/edit": { ceiling: 424, public: false }, // 420.1
  "/post": { ceiling: 424, public: false }, // 420.1
  "/post_/$listingId": { ceiling: 424, public: false }, // 420.1
  "/privacy": { ceiling: 295, public: true }, // 291.2
  "/settings": { ceiling: 300, public: false }, // 296.6
  "/terms": { ceiling: 295, public: true }, // 291.2
};

/** A page this far under its ceiling (KiB) fails until the ceiling is lowered. */
export const RATCHET_SLACK_KIB = 8;
