# The route boundary (Foundations turn 2, DEC-237)

Every server endpoint — a TanStack server route under `src/routes/api/` or a `createServerFn` — authenticates, bounds, parses, answers and calls out through ONE mechanism: `defineRoute` (`src/server/route.ts`), a shape from `src/lib/schemas/`, the two envelopes of `src/server/answer.ts`, and the one outside call `upstream()` (`src/server/upstream.ts`). No `request.json()`, `new Response(`, `createClient(` or `fetch(` anywhere else — the census (`scripts/conformance/routes.test.ts`, CF-RT-1…5) and the ESLint `no-restricted-syntax` block (its ignore list IS `scripts/conformance/routes-allowlist.txt`) fail on a bypass.

## The boundary's order

Foundations turn 3 (INC-865): the caller is known before any byte of the body is read (ASVS V13.1).

1. **The outer catch** — anything thrown answers `serverError` (a generic body, the stack in the log with the incident id).
2. **The byte ceiling by header** — a `Content-Length` over the limit (`limits.bodyBytes`, default 64 KiB, or `form.maxBytes`) answers 413; nothing is read.
3. **The caller** — `auth: "anon" | "optional" | "user" | { staff }`: a user route refuses a signed-out caller (401), a deactivated one (403); an optional route refuses a bearer that is present but refused; a staff route asks `has_permission` (`p_user_id`, `p_resource`, `p_action`) as the caller and refuses 403.
4. **Before-parse dials** — `rate: [{ when: "beforeParse", … }]` spend before the body is read (the denial-of-service choice).
5. **The content type** — a JSON body route refuses anything but `application/json` with 415, before the body is read.
6. **The bounded read** — only when `body` or `form` is declared: the counting reader; over the ceiling (a body sent without `Content-Length`) answers 413.
7. **The shape** — params, query and body through their zod schemas (`.strict()`: an unknown key is a refusal); a refusal is the route class's badShape answer.
8. **After-parse dials, then the handler** — the handler gets `{ request, path, params, query, body, form, userId, supabase, service, incident }`; `service()` loads the privileged client lazily, only after the caller is verified.

A spent dial answers the 429 `clientError("rateLimited", { resetsAt })`, or — with `refuseAs: { verdict: { field, reason? } }` — the posting verdict at 200 `{ field, reason: reason ?? "rateLimited", detail: resetsAt }` that the wizard reads (use-draft.ts, refusal-text.ts). A dial that cannot answer is 503.

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

`routes-allowlist.txt` holds the exceptions (46 after Foundations turn 3), each with its wave: INC-859 (the readers), INC-860 (the uploads), INC-861 (the AI calls), INC-862 (the media routes), INC-863 (the server functions), INC-857 (the four client-side UUID copies). A line whose INC's wave lands leaves the file in the same edit — a stale line fails the census.

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

## The posting routes on the mechanism (INC-859 A)

- **publish** (`POST /api/listings/publish`) — auth user; `{ listingId, certified?, language? }`; the door's own dial; `doorCall`.
- **draft** (`POST /api/listings/draft`) — auth user; the sixteen DraftBody keys (coarse bounds above the door's); the door's `rate_gate('draft')`; the residency fact (service role, the verified caller's id) before the door; `doorCall` with `translate` (`listings_price_bp_check` → `price_bp`/`commissionRange`, `listings_price_mode_check` → `price_mode`/`badValue`, else `door`/`doorError` with the constraint as detail).
- **alias** (`POST /api/listings/alias`) — auth user; `{ alias?, suggest?, businessName?, firstName?, lastName?, categoryId? }`; the doors' own `alias_check` dial; `check_seller_alias` or `suggest_seller_aliases` through `doorCall`, a flat door refusal rewritten into `refusals`.
- **share** (`POST /api/listings/share`) — auth optional; `{ publicId, channel }`; badShape 400; dial `listing-share:address` in the handler; answers `{counted}`.
- **view** (`POST /api/listings/view`) — auth optional; `{ publicId, session? }`; badShape 400; dials `listing-view:address`, `listing-view:session`, `listing-view:address-ad` in the handler; answers `{counted}`.
- **identity** (`POST /api/listings/identity`) — auth user; `{ homeCountryChange?, alias?, sellerType?, businessName?, firstName?, lastName?, homeCountryCode?, contactPref? }`; `change_home_country` alone, or the imitation dial (handler) → the imitation check (`upstream()`, 15 s; the model's name cut at 200 characters, INC-866) → the contact validator → `save_posting_identity` through `doorCall`.
- **assist** (`GET`/`POST /api/listings/assist`) — auth user; GET `?listingId`, POST the twelve AssistBody keys; dials `assist` (RATE_LIMIT_ASSIST_PER_HOUR, 30, 1 hour) and `assist:day` (RATE_LIMIT_ASSIST_PER_DAY, 60, 1 day) declared beforeParse with `refuseAs` `rate`; the per-listing budget in the handler; ownership through `ownListing`; the provider and photo fetches through `upstream()` (20 s / 10 s), a timeout answering `assist`/`providerUnavailable`.
- **photos.$id** (`DELETE`/`POST /api/listings/photos/$id`) — auth user; params `{ id: uuid }` (a non-uuid is the badShape verdict); POST `{ action?, position? }`; DELETE dials `photo-remove` (30 / hour) and `photo-remove:day` (100 / day) with `refuseAs` `photos`; the photo read then `ownListing` (403 `id`/`notYourListing`); doors through `doorCall` raw; storage cleanup only after the door's ok.
