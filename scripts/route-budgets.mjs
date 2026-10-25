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
 * why. Measured 2026-10-25 on the S1 build (the comment after each line).
 */
export const ROUTE_BUDGETS_KIB = {
  "/": { ceiling: 307, public: true }, // 303.3
  "/$name": { ceiling: 305, public: true }, // 302.0
  "/account": { ceiling: 298, public: false }, // 294.9
  "/account_/legal": { ceiling: 295, public: false }, // 291.7
  "/account_/legal_/$versionId": { ceiling: 297, public: false }, // 293.2
  "/account_/saved": { ceiling: 306, public: false }, // 302.1
  "/admin": { ceiling: 294, public: false }, // 291.0
  "/admin/": { ceiling: 295, public: false }, // 291.9
  "/admin/ai": { ceiling: 346, public: false }, // 342.1
  "/admin/attributes": { ceiling: 362, public: false }, // 358.4
  "/admin/audit": { ceiling: 323, public: false }, // 319.7
  "/admin/categories": { ceiling: 369, public: false }, // 365.1
  "/admin/countries": { ceiling: 352, public: false }, // 348.2
  "/admin/coverage": { ceiling: 344, public: false }, // 340.7
  "/admin/images": { ceiling: 295, public: false }, // 291.7
  "/admin/impersonation_/$sessionId": { ceiling: 324, public: false }, // 320.2
  "/admin/legal": { ceiling: 307, public: false }, // 303.4
  "/admin/legal_/$versionId": { ceiling: 306, public: false }, // 302.7
  "/admin/legal_/edit": { ceiling: 313, public: false }, // 309.7
  "/admin/listings": { ceiling: 367, public: false }, // 363.9
  "/admin/listings_/$listingId": { ceiling: 396, public: false }, // 392.2
  "/admin/listings_/$listingId_/edit": { ceiling: 431, public: false }, // 427.6
  "/admin/locations": { ceiling: 302, public: false }, // 298.3
  "/admin/places": { ceiling: 353, public: false }, // 349.4
  "/admin/roles": { ceiling: 319, public: false }, // 315.6
  "/admin/roles_/$roleId": { ceiling: 326, public: false }, // 322.1
  "/admin/screening": { ceiling: 389, public: false }, // 385.3
  "/admin/translations": { ceiling: 409, public: false }, // 405.7
  "/admin/translations_/$lang": { ceiling: 336, public: false }, // 332.1
  "/admin/users": { ceiling: 317, public: false }, // 313.6
  "/admin/users_/$userId": { ceiling: 314, public: false }, // 310.2
  "/auth": { ceiling: 305, public: true }, // 301.9
  "/auth_/callback": { ceiling: 294, public: true }, // 290.8
  "/auth_/reset": { ceiling: 296, public: true }, // 292.9
  "/c/$slug": { ceiling: 307, public: true }, // 303.3
  "/dev/primitives": { ceiling: 309, public: false }, // 305.3
  "/dev/style": { ceiling: 311, public: false }, // 307.4
  "/dev/tall": { ceiling: 294, public: false }, // 290.3
  "/l/$slug": { ceiling: 331, public: true }, // 327.4
  "/legal/$kind": { ceiling: 297, public: true }, // 293.9
  "/legal/accept": { ceiling: 304, public: false }, // 300.9
  "/legal/publishing": { ceiling: 298, public: true }, // 294.5
  "/my-listings": { ceiling: 343, public: false }, // 339.7
  "/my-listings_/$listingId": { ceiling: 347, public: false }, // 344.0
  "/my-listings_/$listingId_/edit": { ceiling: 426, public: false }, // 422.2
  "/post": { ceiling: 426, public: false }, // 422.1
  "/post_/$listingId": { ceiling: 426, public: false }, // 422.1
  "/privacy": { ceiling: 297, public: true }, // 293.8
  "/settings": { ceiling: 302, public: false }, // 298.2
  "/terms": { ceiling: 297, public: true }, // 293.8
};

/** A page this far under its ceiling (KiB) fails until the ceiling is lowered. */
export const RATCHET_SLACK_KIB = 8;
