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
 * why. Measured 2026-10-26 on the Foundations turn 32 build (DEC-260: the dialog's and the alert
 * dialog's code left every page's first download; the comment after each line; no ceiling rises:
 * the twelve staff and dev pages that draw another Radix overlay (a popover, a select) now carry the
 * focus, dismiss and positioning layers it shares with the dialog in a chunk of their own, 0.3–0.4 KiB
 * more, and keep their ceilings). The three
 * admin pages that import the whole catalogue (/admin/listings_/$listingId, /admin/roles_/$roleId,
 * /admin/translations) carry its member part as a chunk of their own (INC-902).
 */
export const ROUTE_BUDGETS_KIB = {
  "/": { ceiling: 271, public: true }, // 267.5
  "/$name": { ceiling: 270, public: true }, // 266.2
  "/account": { ceiling: 262, public: false }, // 259.0
  "/account_/legal": { ceiling: 259, public: false }, // 255.8
  "/account_/legal_/$versionId": { ceiling: 261, public: false }, // 257.3
  "/account_/saved": { ceiling: 270, public: false }, // 266.3
  "/admin": { ceiling: 258, public: false }, // 255.0
  "/admin/": { ceiling: 259, public: false }, // 255.8
  "/admin/ai": { ceiling: 327, public: false }, // 323.8
  "/admin/attributes": { ceiling: 343, public: false }, // 340.0
  "/admin/audit": { ceiling: 303, public: false }, // 300.2
  "/admin/categories": { ceiling: 351, public: false }, // 348.2
  "/admin/countries": { ceiling: 333, public: false }, // 329.8
  "/admin/coverage": { ceiling: 325, public: false }, // 322.4
  "/admin/images": { ceiling: 259, public: false }, // 255.7
  "/admin/impersonation_/$sessionId": { ceiling: 304, public: false }, // 300.7
  "/admin/legal": { ceiling: 273, public: false }, // 270.0
  "/admin/legal_/$versionId": { ceiling: 273, public: false }, // 269.3
  "/admin/legal_/edit": { ceiling: 279, public: false }, // 275.4
  "/admin/listings": { ceiling: 349, public: false }, // 345.5
  "/admin/listings_/$listingId": { ceiling: 371, public: false }, // 367.8
  "/admin/listings_/$listingId_/edit": { ceiling: 395, public: false }, // 391.2
  "/admin/locations": { ceiling: 266, public: false }, // 262.2
  "/admin/places": { ceiling: 334, public: false }, // 331.1
  "/admin/roles": { ceiling: 301, public: false }, // 298.3
  "/admin/roles_/$roleId": { ceiling: 302, public: false }, // 298.8
  "/admin/screening": { ceiling: 369, public: false }, // 365.6
  "/admin/translations": { ceiling: 404, public: false }, // 400.6
  "/admin/translations_/$lang": { ceiling: 316, public: false }, // 312.8
  "/admin/users": { ceiling: 300, public: false }, // 296.7
  "/admin/users_/$userId": { ceiling: 281, public: false }, // 277.2
  "/auth": { ceiling: 270, public: true }, // 266.4
  "/auth_/callback": { ceiling: 258, public: true }, // 255.0
  "/auth_/reset": { ceiling: 260, public: true }, // 257.0
  "/c/$slug": { ceiling: 271, public: true }, // 267.5
  "/dev/primitives": { ceiling: 273, public: false }, // 269.7
  "/dev/style": { ceiling: 291, public: false }, // 288.0
  "/dev/tall": { ceiling: 258, public: false }, // 254.4
  "/l/$slug": { ceiling: 297, public: true }, // 293.9
  "/legal/$kind": { ceiling: 261, public: true }, // 258.0
  "/legal/accept": { ceiling: 269, public: false }, // 265.4
  "/legal/publishing": { ceiling: 262, public: true }, // 258.6
  "/my-listings": { ceiling: 323, public: false }, // 319.5
  "/my-listings_/$listingId": { ceiling: 311, public: false }, // 307.2
  "/my-listings_/$listingId_/edit": { ceiling: 389, public: false }, // 385.9
  "/post": { ceiling: 389, public: false }, // 385.9
  "/post_/$listingId": { ceiling: 389, public: false }, // 385.8
  "/privacy": { ceiling: 261, public: true }, // 258.0
  "/settings": { ceiling: 267, public: false }, // 263.4
  "/terms": { ceiling: 261, public: true }, // 257.9
};

/** A page this far under its ceiling (KiB) fails until the ceiling is lowered. */
export const RATCHET_SLACK_KIB = 8;
