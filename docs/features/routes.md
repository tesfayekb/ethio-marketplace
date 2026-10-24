# The route boundary (Foundations turn 2, DEC-237)

Every server endpoint — a TanStack server route under `src/routes/api/` or a `createServerFn` — authenticates, bounds, parses, answers and calls out through ONE mechanism: `defineRoute` (`src/server/route.ts`), a shape from `src/lib/schemas/`, the two envelopes of `src/server/answer.ts`, and the one outside call `upstream()` (`src/server/upstream.ts`). No `request.json()`, `new Response(`, `createClient(` or `fetch(` anywhere else — the census (`scripts/conformance/routes.test.ts`, CF-RT-1…5) and the ESLint `no-restricted-syntax` block (its ignore list IS `scripts/conformance/routes-allowlist.txt`) fail on a bypass.

## The boundary's order

1. **The outer catch** — anything thrown answers `serverError` (a generic body, the stack in the log with the incident id).
2. **The byte ceiling** — the body is counted as it is read; over the limit (`limits.bodyBytes`, default 64 KiB, or `form.maxBytes`) answers 413 before any parse.
3. **The caller** — `auth: "anon" | "user" | "staff"`: a user route refuses a signed-out caller (401), a staff route asks `has_permission` (`p_user_id`, `p_resource`, `p_action` — the names copied from the SQL declaration) and refuses 403, or 428 when a second factor is owed.
4. **Before-parse dials** — `rate: [{ when: "beforeParse", … }]` spend before the body is read; a denial is 429 `clientError("rateLimited", …)`; a dial that cannot answer is 503.
5. **The content type** — a JSON body route refuses anything but `application/json` with 415 before the body is read.
6. **The shape** — params, query and body through their zod schemas; a refusal is the route class's badShape answer. A form route (`form: { maxBytes }`) parses the bounded bytes as FormData instead.
7. **After-parse dials, then the handler** — the handler gets `{ request, path, params, query, body, form, userId, supabase, service, incident }`; `body` is the schema's output type; `supabase` is the caller's client (RLS as the caller, null for an anonymous route); `service()` loads the privileged client lazily, only after the caller is verified.

## The two envelopes

- **`verdict(refusals)`** — the posting contract: 200 with `{ ok: false, refusals: [{ field, reason, detail? }] }`; a bad shape is one refusal `{ field: <zod path joined with ".">, reason: "badShape" }`. A door's refusal keeps the door's own message.
- **`clientError(word, status)`** — the readers' contract: a bare status with the machine word. 400 bad shape, 404 gone, 429 rate-limited.
- **`serverError`** — 500, generic body, incident id in the log. **`upstreamFailed` / `upstreamUnavailable`** — a door never reached (no answer, a gateway status, an HTML page) is 503, never a refusal.

## The status table per route class

| Class | bad shape | caller | dial | door | upstream |
| --- | --- | --- | --- | --- | --- |
| Posting (verdict) | 200 verdict | 401 | 429 | 200 verdict, the door's words | 503 |
| Readers (clientError) | 400 | 401 | 429 | 404 | 503 |
| Staff | 400 | 403 / 428 | 429 | 403 | 503 |
| Uploads | 400 | 401 | 429 | the declared 403 / 409 | 503 |

## The allowlist's waves

`routes-allowlist.txt` holds the 53 exceptions, each with its wave: INC-859 (the readers), INC-860 (the uploads), INC-861 (the AI calls), INC-862 (the media routes), INC-863 (the server functions), INC-857 (the four client-side UUID copies). A line whose INC's wave lands leaves the file in the same edit — a stale line fails the census.

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
          const { data, error, status } = await supabase!.rpc("example_door", {
            p_id: body.id,
          });
          if (upstreamFailed(error, status)) return upstreamUnavailable(PATH, "example_door", status);
          if (error) return verdict([doorRefusal(error.message)]);
          return ok(data);
        },
      }),
    },
  },
});
```

Ten lines of spec; the order, the envelopes and the dials come with the mechanism.
