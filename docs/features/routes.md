# The route boundary (Foundations turn 2, DEC-237)

Every server endpoint — a TanStack server route under `src/routes/api/` or a `createServerFn` — authenticates, bounds, parses, answers and calls out through ONE mechanism: `defineRoute` (`src/server/route.ts`), a shape from `src/lib/schemas/`, the two envelopes of `src/server/answer.ts`, and the one outside call `upstream()` (`src/server/upstream.ts`). No `request.json()`, `new Response(`, `createClient(` or `fetch(` anywhere else — the census (`scripts/conformance/routes.test.ts`, CF-RT-1…7) and the ESLint `no-restricted-syntax` block (its ignore list IS `scripts/conformance/routes-allowlist.txt`) fail on a bypass.

## The boundary's order

Foundations turn 3 (INC-865): the caller is known before any byte of the body is read (ASVS V13.1).

1. **The outer catch** — anything thrown answers `serverError` (a generic body, the stack in the log with the incident id).
2. **The byte ceiling by header** — a `Content-Length` over the limit (`limits.bodyBytes`, default 64 KiB, or `form.maxBytes`) answers 413; nothing is read.
3. **The caller** — `auth: "none" | "anon" | "optional" | "user" | { staff }`: none builds no client, checks no environment and reads no Authorization header; a user route refuses a signed-out caller (401), a deactivated one (403); an optional route refuses a bearer that is present but refused; a staff route asks `has_permission` (`p_user_id`, `p_resource`, `p_action`) as the caller and refuses 403.
4. **Before-parse dials** — `rate: [{ when: "beforeParse", … }]` spend before the body is read (the denial-of-service choice).

RateSpec (Foundations turn 8): `{ dial: Dial; key: "user" | "address"; when?; refuseAs? }` — the dial is a registry entry (`DIALS`, src/lib/dials.ts; docs/features/rate-dials.md). 5. **The content type** — a JSON body route refuses anything but `application/json` with 415, before the body is read. 6. **The bounded read** — only when `body` or `form` is declared: the counting reader; over the ceiling (a body sent without `Content-Length`) answers 413. 7. **The shape** — params, query and body through their zod schemas (`.strict()`: an unknown key is a refusal); a refusal is the route class's badShape answer. 8. **After-parse dials, then the handler** — the handler gets `{ request, path, params, query, body, form, userId, supabase, service, incident }`; `service()` loads the privileged client lazily, only after the caller is verified.

A spent dial answers the 429 `clientError("rateLimited", { resetsAt })`, or — with `refuseAs: { verdict: { field, reason? } }` — the posting verdict at 200 `{ field, reason: reason ?? "rateLimited", detail: resetsAt }` that the wizard reads (use-draft.ts, refusal-text.ts). A dial that cannot answer is 503.

## Auth modes (Foundations turn 5)

| Mode        | Client / identity                                                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `none`      | No client, environment check or Authorization read; `supabase` and `userId` null. Lazy `service()` remains available for an explicitly privileged reader such as catalog.find. |
| `anon`      | `anonymousClient()`; missing server environment refused.                                                                                                                       |
| `optional`  | A present Authorization header is checked as the caller; otherwise the anonymous client.                                                                                       |
| `user`      | A verified caller and their RLS-scoped client.                                                                                                                                 |
| `{ staff }` | The verified caller's client checks `has_permission` before the handler.                                                                                                       |

`badShape` also accepts `({ part, path, code }) => Response`: only the first issue, in params → query → body order; the path joined with dots and the zod code, never its message. The route returns its own answer through answer.ts. Malformed JSON passes `{ part: "body", path: "", code: "invalid_json" }`; unreadable multipart passes `{ part: "body", path: "body", code: "badShape" }`. Existing verdict/clientError defaults are unchanged.

Public GET query exception: only `auth: "none"` or `"anon"` readers may use non-strict `z.object`, stripping unknown keys rather than refusing them.
The caller census found cache-busters/tracking parameters on public data requests; params, bodies and other queries remain strict.

Reader 5xx decision for turns 6–9: database errors answer `upstreamUnavailable` 503 when `upstreamFailed` identifies transport failure, otherwise `serverError` 500.
The local 502 `{error:"internal error"}` retires with each reader move: the census found callers keying only on ok, 200 or 404, never 502.

## Reader answers (Foundations turn 5)

- **`ok(body, { status?, cache?, headers? })`** — headers merge after Cache-Control, allowing Vary and Server-Timing; old defaults stay unchanged.
- **`conditional(request, { etag, body, cache, vary? })`** — caller-provided quoted strong ETag; exact If-None-Match or a trimmed comma-list match → `notModified`, otherwise JSON 200. No wildcard or weak-tag matching; Vary defaults to Accept-Encoding.
- **`notModified(etag, cache, vary?)`** — bodyless 304 with ETag, Cache-Control and Vary.
- **`redirect(location, { status?, cache?, headers? })`** — 302 default, no-store default, Location and nosniff; only absolute HTTPS or single-slash local paths. Backslashes and controls/whitespace are refused to prevent a local-path authority bypass.
- **`plain(text, status, { cache? }?)`** — text/plain; charset=utf-8, nosniff, no-store default (AP-2 pins the photo/QR text contract).

## One version cache and cursor (Foundations turn 5)

`versionCache<K, T>({ ttlMs, max })` in `src/server/version-cache.ts` returns `get(key, version, build)`. Each route owns its instance, no shared module state. Within TTL no version read; TTL 0 reads on every request (INC-265); an unchanged version reuses the value, a changed version rebuilds. Null versions/builds and throws evict any old entry and are never cached; throws propagate to the route's outer catch. Keys are bounded by max and evicted least-recently-used, including TTL hits as use. Bounds must be finite/non-negative TTL and positive integer max. VRC-1…5 prove the contracts.

`cursor(shape)` and `encodeCursor(value)` in `src/lib/schemas/cursor.ts` share the identical feed/seller UTF-8 base64url-of-JSON codec. The decoder is bounded to 512 characters, refuses non-object JSON and invalid encodings as schema issues, then pipes through the supplied shape (CUR-1…3). Feed and seller consume this codec (Foundations turn 7). `langCodeLoose` and `countryCodeLoose` opt in to the existing readers' trimming/normalisation; original primitives remain unchanged (SCH-2).

## The two envelopes

- **`verdict(refusals)`** — the posting contract: 200 with `{ ok: false, refusals: [{ field, reason, detail? }] }`; a bad shape is one refusal `{ field: <zod path joined with ".">, reason: "badShape" }`. A door's refusal keeps the door's own message.
- **`clientError(word, status)`** — the readers' contract: a bare status with the machine word. 400 bad shape, 404 gone, 429 rate-limited.
- **`bytes(body, contentType, init?)`** — the one binary answer (Cache-Control `no-store` unless given); no route builds its own `new Response` for bytes.
- **`serverError`** — 500, generic body, incident id in the log. **`upstreamFailed` / `upstreamUnavailable`** — a door never reached (no answer, a gateway status, an HTML page) is 503, never a refusal.

## The status table per route class

| Class                 | bad shape   | caller    | dial | door                          | upstream |
| --------------------- | ----------- | --------- | ---- | ----------------------------- | -------- |
| Posting (verdict)     | 200 verdict | 401       | 429  | 200 verdict, the door's words | 503      |
| Readers (clientError) | 400         | 401       | 429  | 404                           | 503      |
| Staff                 | 400         | 403 / 428 | 429  | 403                           | 503      |
| Uploads               | 400         | 401       | 429  | the declared 403 / 409        | 503      |

## The allowlist's waves

`routes-allowlist.txt` holds 15 exceptions after Foundations turn 12 (20 after turn 11; the four imports and gate.ts left in turn 12; 23 after turn 10; 33 after turn 7): INC-859 closed (posting/media), INC-860 closed (imports/exports), INC-861 staff AI, INC-862 public readers, INC-863 server functions, INC-857 four client-side UUID copies. A line whose INC's wave lands leaves the file in the same edit — a stale line fails the census. CF-RT-2's helper set now names version-cache.ts.

## A new route

```ts
export const Route = createFileRoute("/api/listings/example")({
  server: {
    handlers: {
      POST: defineRoute({
        path: "/api/listings/example",
        auth: "user",
        body: ExampleBody, // a strict zod shape from src/lib/schemas/
        rate: [{ dial: DIALS.example, key: "user" }], // a registry line in src/lib/dials.ts
        handler: async ({ supabase, body }) => {
          return doorCall(PATH, () => supabase!.rpc("example_door", { p_id: body.id }));
        },
      }),
    },
  },
});
```

Ten lines of spec; the order, the envelopes and the dials come with the mechanism.

## The two helpers (Foundations turn 3)

- **`doorCall(path, call, { translate?, raw? })`** (`src/server/door.ts`) — the door-call envelope: a door never reached is 503 (INC-574); a door error is the verdict at 200 — `translate`'s refusal when it answers (expected, so not logged — INC-368), else logged and the door's own code (`doorRefusal`); ok is `doorAnswer(data)`, or the raw data with `raw`. The seed of the door mechanism (DEC-237's door turn).
- **`ownListing(supabase, userId, listingId, columns)`** (`src/server/listings/own-listing.ts`) — "this listing is the caller's": one read as the caller carrying both the id and the seller condition (never a caller-scoped read alone, INC-830). Its three outcomes (`{row}`, `{error}`, `{row: null}`) stay distinct; each route maps them to its own answers.

## The recorded bypasses of `rate:`

A dial goes in the spec unless its answer or its spending cannot be said there yet. Until the door turn gives the spec a predicate and hands a dial's answer to the handler, these stay in their handlers through `spend` (src/server/dials.ts), each with its "dial in the handler: … — INC-859" comment:

- **share and view counters** — the spent answer is 200 `{counted:false}`, neither envelope.
- **identity's imitation dial** (`identity:imitation`, 20 per 24 hours) — spent on one branch only (an alias is being named).
- **assist's per-listing budget** (`assist:listing`, 5 per 10 years) — conditional, keyed by the listing, read for its remaining count (`triesLeft`).
- **upload's draft week** (`upload:draft-week`, 50 per 7 days) — spent only for a draft (Foundations turn 4).
- **upload's size dials** (`MAX_COVER_BYTES`, `MAX_MID_BYTES`, `MAX_CARD_BYTES`, `MAX_THUMB_BYTES`) — a byte budget per file, not a rate.
- **upload's site screen budget** (`upload:screen`, key "site", 2000 per day) — site-wide, the AI gateway's (INC-861).
- **background's daily dial** (`background:day`, 10 per day) — after the AI switch, so a switched-off tool spends none of the seller's tries (D158's order; BGR-5).
- **background's per-listing tries** (`background:listing`, 2 per 10 years) — keyed by the listing, read for `x-tries-left`.
- **outline's geocode dial** (`geocode`, on a cache miss only) — a cached outline costs the seller nothing (Foundations turn 9).
- **photo-links' address dial** (`photo-links:address`, 600 per hour) — anonymous callers only; keyed by `hashAddress(clientAddress(request))`, the one address reader.

## The cached public readers on the mechanism (INC-862 T2, Foundations turn 6)

| Route                     | Auth | Params                      | Cache (key · TTL · max)                                      | ETag                              | Cache-Control                                      | Answers                                                                                                     |
| ------------------------- | ---- | --------------------------- | ------------------------------------------------------------ | --------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `/api/categories/tree`    | anon | none                        | `"tree"` · 0 (version read every request, INC-265) · 1       | `"cat-tree-<version>"`            | `public, max-age=60, stale-while-revalidate=300`   | 200 `{version, nodes, pointers}`; 304; 503/500                                                              |
| `/api/locations`          | anon | none                        | `"open"` · 15 s (a 15-second time bucket as the version) · 1 | `"open-markets-<FNV-1a hex>"`     | `public, max-age=300, stale-while-revalidate=3600` | 200 `{countries}`; 304; 503/500                                                                             |
| `/api/locations/$country` | anon | `country: countryCodeLoose` | upper-case code · 15 s · 64                                  | `bundleEtag("loc-<CC>", version)` | `public, max-age=300, stale-while-revalidate=3600` | 200 `{country, version, nodes}`; 304; 400 `badCountry`; 404 `closedOrUnknownMarket` (never cached); 503/500 |
| `/api/i18n/$lang`         | anon | `lang: langCodeLoose`       | normalised code · 15 s · 32                                  | `bundleEtag(code, version)`       | `public, max-age=300, stale-while-revalidate=3600` | 200 `{lang, bundle}`; 304; 400 `invalid language code`; 503/500                                             |

Readers: the old 502 `{error:"internal error"}` retires — a database error answers 503 `upstream unavailable` when `upstreamFailed` says the database did not answer, else `serverError` 500. A cold conditional request (If-None-Match equal to the current tag, nothing held) builds nothing and answers 304. Every JSON answer carries `charset=utf-8` and every 304 carries `Vary: Accept-Encoding`.

## The posting routes on the mechanism (INC-859 A)

- **publish** (`POST /api/listings/publish`) — auth user; `{ listingId, certified?, language? }`; the door's own dial; `doorCall`.
- **draft** (`POST /api/listings/draft`) — auth user; the sixteen DraftBody keys (coarse bounds above the door's); the door's `rate_gate('draft')`; the residency fact (service role, the verified caller's id) before the door; `doorCall` with `translate` (`listings_price_bp_check` → `price_bp`/`commissionRange`, `listings_price_mode_check` → `price_mode`/`badValue`, else `door`/`doorError` with the constraint as detail).
- **alias** (`POST /api/listings/alias`) — auth user; `{ alias?, suggest?, businessName?, firstName?, lastName?, categoryId? }`; the doors' own `alias_check` dial; `check_seller_alias` or `suggest_seller_aliases` through `doorCall`, a flat door refusal rewritten into `refusals`.
- **share** (`POST /api/listings/share`) — auth optional; `{ publicId, channel }`; badShape 400; dial `listing-share:address` in the handler; answers `{counted}`.
- **view** (`POST /api/listings/view`) — auth optional; `{ publicId, session? }`; badShape 400; dials `listing-view:address`, `listing-view:session`, `listing-view:address-ad` in the handler; answers `{counted}`.
- **identity** (`POST /api/listings/identity`) — auth user; `{ homeCountryChange?, alias?, sellerType?, businessName?, firstName?, lastName?, homeCountryCode?, contactPref? }`; `change_home_country` alone, or the imitation dial (handler) → the imitation check (`upstream()`, 15 s; the model's name cut at 200 characters, INC-866) → the contact validator → `save_posting_identity` through `doorCall`.
- **assist** (`GET`/`POST /api/listings/assist`) — auth user; GET `?listingId`, POST the twelve AssistBody keys; dials `assist` (RATE_LIMIT_ASSIST_PER_HOUR, 30, 1 hour) and `assist:day` (RATE_LIMIT_ASSIST_PER_DAY, 60, 1 day) declared beforeParse with `refuseAs` `rate`; the per-listing budget in the handler; ownership through `ownListing`; the provider and photo fetches through `upstream()` (20 s / 10 s), a timeout answering `assist`/`providerUnavailable`.
- **photos.$id** (`DELETE`/`POST /api/listings/photos/$id`) — auth user; params `{ id: uuid }` (a non-uuid is the badShape verdict); POST `{ action?, position? }`; DELETE dials `photo-remove` (30 / hour) and `photo-remove:day` (100 / day) with `refuseAs` `photos`; the photo read then `ownListing` (403 `id`/`notYourListing`); doors through `doorCall` raw; storage cleanup only after the door's ok.

## The media routes on the mechanism (INC-859 B, Foundations turn 4)

- **upload/photo** (`POST /api/upload/photo`) — auth user; `form: { maxBytes: 2 MiB }` — the one byte ceiling, over the sum of the four size dials (1.63 MiB), by Content-Length before the caller and by the counting reader after; a non-multipart body is 415, an unreadable multipart body the `body`/`badShape` verdict; dials `upload` (RATE_LIMIT_UPLOAD_PER_HOUR, 60, 1 hour) and `upload:day` (RATE_LIMIT_UPLOAD_PER_DAY, 200, 1 day) beforeParse with `refuseAs` `rate`; the fields read from `ctx.form` (`replaces` and `certified` by the one `uuid`); ownership through `ownListing` (403 `listingId`/`notYourListing`, 409 `status`/`listingNotOpenForPhotos`); the register/replace door's error through `doorCall` raw after the rollback of the objects just written; every 500 through `serverError`.
- **background** (`POST /api/listings/background`) — auth user; `{ listingId: uuid, photoId: uuid }` strict (a malformed id is the badShape verdict); the AI switch, then the daily and per-listing dials in the handler; ownership through `ownListing`; the cut-out through `bytes()` (no-store, `x-tries-left`).
- **media/photo-links** (`POST /api/media/photo-links`) — auth optional (a bearer is read as the caller and refused 401/403 as before; none is the anonymous client); `{ photoIds, variants? }` strict, judged by links.ts's `photoIdsOf`/`variantsOf` so a refusal names the key, and every id a UUID (a non-UUID id is `photoIds`/`badShape`, no longer a 503); the address dial for anonymous callers in the handler; a failed read or signature is 503.

## The four media deadlines (Foundations turn 4)

Each through `upstream()`; a timeout takes the branch a network error takes:

- `src/server/media/policy.ts` — the Gemini photo screen, 20 s (`gemini photo_screen`) → `providerUnavailable` with `retry`.
- `src/server/media/background.ts` — the source photo, 10 s (`photo source`) → null; Photoroom, 30 s (`photoroom segment`) → null; both `providerUnavailable`.
- `src/server/media/storage.ts` — every R2 request, 15 s (`r2 <method>`; never the key or the signed URL) → the put or delete throws, as a network error does.

## Paged public readers and signed-in options (INC-862 T3, Foundations turn 7)

The one failed-read mapping is `readFailure(path, what, error)` (answer.ts), using `readerFailure` for raw or typed errors; `readFailed(error, status)` (reader-failure.ts) constructs the typed database failure. CF-RT-7 rejects local mapping/factory copies; CF-RT-6 recognises generic boundary calls. ANS-10 proves 503/500 without diagnostic text.

| Route                         | Auth | Shape                                                                                     | Cache / success                                                                                                                        | Refusals                                                                              |
| ----------------------------- | ---- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `/api/feed`                   | anon | non-strict query category/place uuid, size 1–50 (default 20), after cursor of JSON object | no in-process cache; public max-age=60, stale-while-revalidate=300; `{cards, ladder, steps, next}` plus optional cover links           | 400 badCategory/badPlace/badSize/badCursor; 404 unknownCategory/unknownPlace; 503/500 |
| `/api/seller`                 | anon | non-strict query key required, max 60, empty accepted; after same cursor                  | no in-process cache; same public headers; `{seller, cards, next}`                                                                      | 400 badKey/badCursor/badSize; 404 unknownSeller; 503/500                              |
| `/api/attributes/$id/options` | user | strict params id uuid                                                                     | versionCache id · 15 s · 512; private max-age=60, stale-while-revalidate=300; ETag `"attr-options-2-<stamp>"`; 200/304 via conditional | 404 unknown attribute; 429 rateLimited (not cached); shared caller refusals; 503/500  |

- CHANGE (1): feed/seller database failures now use readFailure: 503 upstream unavailable or 500 server error with incident and no detail; INC-804 retains its test id/title and no-detail intent; malformed pages answer serverError.
- CHANGE (2): options adopts missing bearer token / not signed in 401, account is deactivated 403 and upstream unavailable 503; PR-51 matches its draft/identity siblings; ATO-1/2 and PR-6 prove refusals.
- CHANGE (3): options validates id after caller; signed-in non-uuid 404, signed-out non-uuid 401; ATO-3 proves caller-before-shape, PR-6's valid all-zero uuid stays 404.
- CHANGE (4): every options request checks caller before any cache hit; ATO-5 proves two caller checks and one version read. The baseline already checked caller before cache; this is preserved, not a new order change.

## The geo routes on the mechanism (INC-862 T4, Foundations turn 9)

| Route              | Auth | Shape                                       | Cache / success                                                          | Refusals                                                                                                           |
| ------------------ | ---- | ------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `/api/geo`         | none | none                                        | no-store; the guess object; a thrown guess answers `GEO_NONE`            | none                                                                                                               |
| `/api/geo/search`  | user | q optional; trimmed; under 2 → no results   | geoCached `search:<q>`; no-store; `{ok, results, cached?}`               | geocode rateLimited (dial beforeParse) · queryTooLong + length · geocoderUnavailable (not cached); caller refusals |
| `/api/geo/reverse` | user | lat `coordinate(90)`, lng `coordinate(180)` | geoCached `reverse:<lat 4dp>,<lng 4dp>`; street trimmed to 200; no-store | geocode rateLimited (dial beforeParse) · badCoordinates · geocoderUnavailable; caller refusals                     |
| `/api/geo/outline` | user | q trimmed 2–160                             | geoCached `outline:<q>`; private, max-age=604800; dial on a miss only    | geocode badQuery · rateLimited (not cached) · geocoderUnavailable; caller refusals                                 |

- CHANGE (1): reverse refuses a missing or empty lat/lng as badCoordinates instead of looking up 0,0 (GRV-1).
- CHANGE (2), corrected wording (operator ruling 2026-10-24; the saved brief is unchanged): the one geocode cache keeps the 24-hour lifetime from insertion — within the TTL no version is read; once it has passed the UTC bucket has necessarily moved and the entry rebuilds (GEC-4). The only real change is the bound: 800 entries with least-recent eviction instead of clear-all at 500 (geocode) or 300 (outline).
- CHANGE (3): a request whose client has gone answers an empty 499 and logs `[client-aborted] <METHOD> <path>` instead of `[ssr-error]` + the 500 page (ABT-1…3; ci-guards.md).
- A dial store failure on search/reverse is now the mechanism's 503 upstream unavailable (it was a 500); an undeclared throw is `serverError` with an incident id.

## The last INC-862 routes (Foundations turn 10; INC-862 closed, 15 of 15)

| Route               | Auth | Shape                                                  | Cache / success                                                                   | Refusals                                                    |
| ------------------- | ---- | ------------------------------------------------------ | --------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `/api/catalog/find` | anon | q trimmed 2–64; lang `langCodeLoose` ≤ 3, default `en` | `public, max-age=60` + Server-Timing; `{ok, results}`                             | 400 `bad query` · 429 `rateLimited` (clientError, no-store) |
| `/api/map/tiles`    | none | GET none; POST `{reason?: string}`                     | GET `private, max-age=3600` plan, OSM `no-store` on a throw; POST `{ok}` no-store | POST bad body or spent dial → `{ok:false}`                  |
| `/l/$id/photo.jpg`  | none | id `publicId`                                          | 302 `redirect()` to the signed https link, `private, max-age=1800`                | plain text: 404 not found · 429 rate limited · 503 · 500    |
| `/l/$id/qr.svg`     | none | id `publicId`                                          | `bytes()` SVG, `public, max-age=31536000, immutable`, nosniff                     | plain 404 not found (no-store)                              |

- Every route's outer catch answers `clientAborted(request) ?? serverError(...)`: a handler that throws after its client left is an empty 499 with one `[client-aborted]` line (RT-20; server.ts uses the same helper, ABT-4/5).
- CHANGE (1) (declared language): see i18n-runtime.md — the first byte declares the base language the server renders.
- CHANGE (2): a route whose handler throws after the client left answers 499 + `[client-aborted]`, not serverError (RT-20).
- CHANGE (3): catalog find's 400/429 come from clientError; routeJson already carried `no-store` and the charset, so the answers are byte-identical (CFR-1, CFR-4).
- CHANGE (4): tiles POST — an unreadable or non-JSON body answers `{ok:false}` with no dial and no line (TIL-3).

## The admin exports (Foundations turn 11, INC-860 part 1)

| Route                              | Auth                    | Query                                 | 200                                                   | Refusals                                                                              |
| ---------------------------------- | ----------------------- | ------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `GET /api/admin/categories/export` | staff `categories:view` | `scope?`                              | `download` text/csv; charset=utf-8, no-store, nosniff | 401 / 403 `forbidden` / 400 `badScope` / 404 `unknown category scope` / readFailure   |
| `GET /api/admin/attributes/export` | staff `categories:view` | `file` definitions\|links, `scope?`   | as above                                              | 400 `file must be definitions or links`, else as above                                |
| `GET /api/admin/locations/export`  | staff `locations:view`  | `file` countries\|locations, `scope?` | as above                                              | 400 `file must be countries or locations`, 404 `unknown country scope`, else as above |

Changes: (5) a caller without view is refused 403 `{error:"forbidden"}` by the
boundary; an anonymous request with a bad `file` answers 401 (the caller first);
(6) every export carries the registry's columns except `action` (locations and
countries drop it; the importer treats a trailing `action` as optional);
(7) the filename is `ethio-<scope->-<file id>-YYYY-MM-DD.csv` (UTC), sent as
`attachment; filename="…"; filename*=UTF-8''…`.

## The staff imports (Foundations turn 12, INC-860 closed)

| Route                              | Factory call                          | Permission              | Metered modes |
| ---------------------------------- | ------------------------------------- | ----------------------- | ------------- |
| POST /api/admin/categories/import  | `defineImportRoute("categories", …)`  | `categories:import`     | preview       |
| POST /api/admin/attributes/import  | `defineImportRoute("attributes", …)`  | `categories:import`     | preview       |
| POST /api/admin/locations/import   | `defineImportRoute("locations", …)`   | `locations:import`      | preview       |
| POST /api/admin/translations/import | `defineImportRoute("translations", …)` | `translations:update` | commit, undo  |

The boundary itself gained two rules this turn: every JSON body is decoded
with `new TextDecoder("utf-8", { fatal: true })` — invalid bytes answer
`clientError("invalidEncoding", 400)` before `JSON.parse` (RFC 8259 §8.1);
and `limits.tooLarge` names the word of BOTH 413 answers (by header and by
the counting reader; default `payloadTooLarge`). `clientError` takes 409 and
`stepUpRequired()` is the one 428. The factory and its vocabulary:
docs/features/imports.md.
