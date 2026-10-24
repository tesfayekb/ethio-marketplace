# The route boundary (Foundations turn 2, DEC-237)

Every server endpoint — a TanStack server route under `src/routes/api/` or a `createServerFn` — authenticates, bounds, parses, answers and calls out through ONE mechanism: `defineRoute` (`src/server/route.ts`), a shape from `src/lib/schemas/`, the two envelopes of `src/server/answer.ts`, and the one outside call `upstream()` (`src/server/upstream.ts`). No `request.json()`, `new Response(`, `createClient(` or `fetch(` anywhere else — the census (`scripts/conformance/routes.test.ts`, CF-RT-1…5) and the ESLint `no-restricted-syntax` block (its ignore list IS `scripts/conformance/routes-allowlist.txt`) fail on a bypass.

## The boundary's order

Foundations turn 3 (INC-865): the caller is known before any byte of the body is read (ASVS V13.1).

1. **The outer catch** — anything thrown answers `serverError` (a generic body, the stack in the log with the incident id).
2. **The byte ceiling by header** — a `Content-Length` over the limit (`limits.bodyBytes`, default 64 KiB, or `form.maxBytes`) answers 413; nothing is read.
3. **The caller** — `auth: "none" | "anon" | "optional" | "user" | { staff }`: none builds no client, checks no environment and reads no Authorization header; a user route refuses a signed-out caller (401), a deactivated one (403); an optional route refuses a bearer that is present but refused; a staff route asks `has_permission` (`p_user_id`, `p_resource`, `p_action`) as the caller and refuses 403.
4. **Before-parse dials** — `rate: [{ when: "beforeParse", … }]` spend before the body is read (the denial-of-service choice).
5. **The content type** — a JSON body route refuses anything but `application/json` with 415, before the body is read.
6. **The bounded read** — only when `body` or `form` is declared: the counting reader; over the ceiling (a body sent without `Content-Length`) answers 413.
7. **The shape** — params, query and body through their zod schemas (`.strict()`: an unknown key is a refusal); a refusal is the route class's badShape answer.
8. **After-parse dials, then the handler** — the handler gets `{ request, path, params, query, body, form, userId, supabase, service, incident }`; `service()` loads the privileged client lazily, only after the caller is verified.

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

`cursor(shape)` and `encodeCursor(value)` in `src/lib/schemas/cursor.ts` share the identical feed/seller UTF-8 base64url-of-JSON codec. The decoder is bounded to 512 characters, refuses non-object JSON and invalid encodings as schema issues, then pipes through the supplied shape (CUR-1…3). Feed and seller remain unchanged until turn 7. `langCodeLoose` and `countryCodeLoose` opt in to the existing readers' trimming/normalisation; original primitives remain unchanged (SCH-2).

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

`routes-allowlist.txt` holds 40 exceptions after Foundations turn 4, unchanged in turn 5 (no route moves): INC-859 closed (posting/media), INC-860 imports/exports, INC-861 staff AI, INC-862 public readers, INC-863 server functions, INC-857 four client-side UUID copies. A line whose INC's wave lands leaves the file in the same edit — a stale line fails the census. CF-RT-2's helper set now names version-cache.ts.

## A new route

```ts
export const Route = createFileRoute("/api/listings/example")({
  server: {
    handlers: {
      POST: defineRoute({
        path: "/api/listings/example",
        auth: "user",
        body: ExampleBody, // a strict zod shape from src/lib/schemas/
        rate: [{ action: "example", key: "user", limit: 10, windowSeconds: 3600 }],
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

A dial goes in the spec unless its answer or its spending cannot be said there yet. Until the door turn gives the spec a predicate and hands a dial's answer to the handler, these stay in their handlers through `consumeRate`, each with its "dial in the handler: … — INC-859" comment:

- **share and view counters** — the spent answer is 200 `{counted:false}`, neither envelope.
- **identity's imitation dial** (`identity:imitation`, 20 per 24 hours) — spent on one branch only (an alias is being named).
- **assist's per-listing budget** (`assist:listing`, 5 per 10 years) — conditional, keyed by the listing, read for its remaining count (`triesLeft`).
- **upload's draft week** (`upload:draft-week`, 50 per 7 days) — spent only for a draft (Foundations turn 4).
- **upload's size dials** (`MAX_COVER_BYTES`, `MAX_MID_BYTES`, `MAX_CARD_BYTES`, `MAX_THUMB_BYTES`) — a byte budget per file, not a rate.
- **upload's site screen budget** (`upload:screen`, key "site", 2000 per day) — site-wide, the AI gateway's (INC-861).
- **background's daily dial** (`background:day`, 10 per day) — after the AI switch, so a switched-off tool spends none of the seller's tries (D158's order; BGR-5).
- **background's per-listing tries** (`background:listing`, 2 per 10 years) — keyed by the listing, read for `x-tries-left`.
- **photo-links' address dial** (`photo-links:address`, 600 per hour) — anonymous callers only; keyed by `hashAddress(clientAddress(request))`, the one address reader.

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
