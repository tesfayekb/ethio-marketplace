# Rate dials — the registry and the one spend (Foundations turn 8)

A rate dial is an action name, a limit (a fallback and, where the deploy may
override it, an env name) and a window. Every dial is one entry of
`src/lib/dials.ts` (`DIALS`; pure data, no imports, safe for the client) and is
spent through `src/server/dials.ts`:

- `dialLimit(dial)` — the env override through `envDial` (a whole number of at
  least 1; anything else falls back) when the entry names one, else the fallback.
- `spend(dial, key)` — `consumeRate(action, key, dialLimit(dial), "<windowSeconds> seconds")`.
- `peek(dial, key)` — the same over `peekRate`; nothing is spent.

A route declares a dial on its spec (`rate: [{ dial: DIALS.x, key, when?, refuseAs? }]`);
a handler that spends at a point only it knows calls `spend`/`peek`. Each site
keeps its own answer.

**The rule: a new dial is a registry line; a site spends it with `spend`.** The
guard is `scripts/conformance/dials.test.ts` (DIAL-1…5; no allowlist).

## The registry

| Entry                | Action                      | Limit | Env                                    | Window (s) | Consumer                                                                                       | Spent answer                                      |
| -------------------- | --------------------------- | ----- | -------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| uploadHour           | upload                      | 60    | RATE_LIMIT_UPLOAD_PER_HOUR             | 3600       | upload/photo.ts (declared, beforeParse, user)                                                  | verdict `rate`                                    |
| uploadDay            | upload:day                  | 200   | RATE_LIMIT_UPLOAD_PER_DAY              | 86400      | upload/photo.ts (declared, beforeParse, user)                                                  | verdict `rate`                                    |
| photoRemoveHour      | photo-remove                | 30    | RATE_LIMIT_PHOTO_REMOVE_PER_HOUR       | 3600       | listings/photos.$id.ts (declared, user)                                                        | verdict `photos`                                  |
| photoRemoveDay       | photo-remove:day            | 100   | RATE_LIMIT_PHOTO_REMOVE_PER_DAY        | 86400      | listings/photos.$id.ts (declared, user)                                                        | verdict `photos`                                  |
| assistHour           | assist                      | 30    | RATE_LIMIT_ASSIST_PER_HOUR             | 3600       | listings/assist.ts (declared, beforeParse, user)                                               | verdict `rate`                                    |
| assistDay            | assist:day                  | 60    | RATE_LIMIT_ASSIST_PER_DAY              | 86400      | listings/assist.ts (declared, beforeParse, user)                                               | verdict `rate`                                    |
| assistListing        | assist:listing              | 5     | —                                      | 315576000  | listings/assist.ts (peek on GET, spend on POST; key listing id); posting/types.ts ASSIST_TRIES | verdict `assist`/`assistBudgetSpent`              |
| listingViewAddress   | listing-view:address        | 600   | RATE_LIMIT_LISTING_VIEW_PER_HOUR       | 3600       | server/ad-view.ts (raw address)                                                                | `{counted:false}`                                 |
| listingViewSession   | listing-view:session        | 1     | —                                      | 86400      | server/ad-view.ts (`<hashed session>:<publicId>`)                                              | `{counted:false}`                                 |
| listingViewAddressAd | listing-view:address-ad     | 30    | RATE_LIMIT_LISTING_VIEW_PER_ADDRESS_AD | 3600       | server/ad-view.ts (`<address>:<publicId>`)                                                     | `{counted:false}`                                 |
| listingShareAddress  | listing-share:address       | 120   | RATE_LIMIT_LISTING_SHARE_PER_HOUR      | 3600       | server/ad-share.ts (raw address)                                                               | `{counted:false}`                                 |
| listingPhotoAddress  | listing-photo:address       | 600   | RATE_LIMIT_LISTING_PHOTO_PER_HOUR      | 3600       | server/ad-photo.ts (raw address)                                                               | 429 text "rate limited"                           |
| listingReadAddress   | listing-read:address        | 600   | RATE_LIMIT_LISTING_READ_PER_HOUR       | 3600       | server/ad-page.ts (raw address)                                                                | `{kind:"rate"}`                                   |
| photoLinksAddress    | photo-links:address         | 600   | RATE_LIMIT_PHOTO_LINKS_PER_HOUR        | 3600       | media/photo-links.ts (anonymous only, hashed address)                                          | verdict `rate`/`rateLimited`                      |
| geocode              | geocode                     | 60    | —                                      | 3600       | geo/reverse.ts, search.ts, outline.ts (user id)                                                | refusal `geocode`/`rateLimited`                   |
| uploadDraftWeek      | upload:draft-week           | 50    | DRAFT_UPLOADS_PER_WEEK_WITHOUT_AD      | 604800     | upload/photo.ts (drafts only, user id)                                                         | the draft-week refusal unless an ad was submitted |
| uploadScreen         | upload:screen               | 2000  | PHOTO_SCREENS_PER_DAY_SITE             | 86400      | upload/photo.ts (key "site")                                                                   | screening off by budget (held)                    |
| mapFallback          | map:fallback                | 60    | —                                      | 3600       | map/tiles.ts (hashed address)                                                                  | `{ok:false}`                                      |
| backgroundDay        | background:day              | 10    | RATE_LIMIT_BACKGROUND_PER_DAY          | 86400      | listings/background.ts (user id)                                                               | verdict `rate`/`rateLimited`                      |
| backgroundListing    | background:listing          | 2     | —                                      | 315576000  | listings/background.ts (listing id)                                                            | verdict `background`/`backgroundSpent`            |
| identityImitation    | identity:imitation          | 20    | —                                      | 86400      | listings/identity.ts (user id; alias branch)                                                   | verdict `rate`/`rateLimited`                      |
| catalogFind          | catalog_find (door-counted) | 120   | —                                      | 3600       | server/catalog-find.server.ts (`p_rate_limit`; E2E 2)                                          | the door's own                                    |

## The epoch note

`consume_rate_limit` buckets by `extract(epoch from p_window)`, so a window
passed as "3600 seconds" counts in the same bucket as the "1 hour" it replaced:
10 years = 315576000 s, 7 days = 604800 s, 24 hours / 1 day = 86400 s,
1 hour = 3600 s. No live window was reset or doubled by the move.

`catalogFind` is the one door-counted entry: the app hands its limit to
`catalog_search`, whose `consume_catalog_find_rate` counts under its own action
(`catalog_find`) and its own one-hour window.
