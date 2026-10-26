# Browser route calls

`src/lib/route-client.ts` owns browser calls to `/api/` paths. `callRoute`
reads the browser session once (unless `auth: "none"`), attaches its bearer
only in the Authorization header, and always requests JSON. A JSON body alone
selects POST and adds `Content-Type: application/json`; a bodyless call defaults
to GET. A `form` body posts multipart with the browser's own boundary. `cache`
and `keepalive` forward to fetch. Tokens, headers and bodies are never logged.
The session is read through the client's door (`currentSession`,
`src/lib/supabase-door.ts`, DEC-261): a signed-out visitor's call fetches no
Supabase client.

## Answers

- `answered`: HTTP status, `ok`, an object payload or null, the string envelope
  fields `error` and `detail` or null, the response headers, and `bytes` when
  `expect: "bytes"` kept a non-JSON body. A JSON body that does not parse is
  still `answered` with payload null — only a transport failure is unreachable.
  A refusal is not success.
- `signedOut`: required authentication has no token; nothing is sent.
- `unreachable`: network, timeout or caller abort. Consumers keep their existing
  failure captions; counters ignore the answer.

`downloadRoute(path, filename, init?)` shares the request mechanism. A successful
answer saves the response bytes unchanged under the supplied filename with one
object URL and one temporary anchor; both are cleaned up. A refusal saves
nothing and returns the parsed envelope. Its successful payload is null.

`uploadRoute(path, form, init?)` is the one upload transport (XMLHttpRequest
Level 2 — the only one that reports upload progress). The bearer is exactly the
one `callRoute` sets and the answer is parsed by the same envelope reader.
Status 0 or `onerror` is unreachable network, `ontimeout` or the deadline is
timeout, the caller's abort is aborted. `onProgress` receives loaded and total
bytes.

## Deadline

There is one AbortController per call. An optional timer and the caller's
signal forward into it; the first abort retains its cause. No AbortSignal.any
is required, preserving older Safari and Android WebView support. No default
deadline or retry is introduced. Cleanup removes the timer and signal listener.

## Consumers and conformance

Foundations turn 13 moved the shared import dialog, translations import/undo,
the categories/attributes/countries/locations export controls, and view/share
counters. Turn 14 moved the posting doors (posting-service onto `callRoute` and
`uploadRoute`; the `DoorAnswer` adapter keeps every public result byte for
byte) and the thirteen INC-875 readers: attribute options, photo links
(optional auth), the geocoder, the geo guess, pricing (the `ETB` fallback
kept), the catalog finder (its abort signal kept), the tile plan and its
keepalive fallback report, the seller feed, the category tree (its
`cache: "no-cache"` revalidation kept), similar ads, card photos, the feed and
the shell's location readers. Public readers pass `auth: "none"`.

RCL-1…15 mock session, fetch and XHR and prove absence, exact headers/body,
envelopes, broken-JSON answers, form/bytes/cache/keepalive forwarding, network
and abort classes, upload progress, and exact downloaded bytes and cleanup.
PSV-1…6 prove the posting door adapter's results. RCG-1…4
(`scripts/conformance/route-client.test.ts`) census browser fetches and bearer
builders/token readers through the conformance kit, with a planted bypass
proof; RCG-4 holds the undated allowances to the two named INCs. The caller is
the unit runner, named in wired.test.ts.

`scripts/conformance/route-client-allowlist.txt` has one live line per file,
ten in all: the two AI clients (INC-861), Leaflet's outside tile-host probe
(INC-875 — its route reads moved in turn 14), and seven non-route files
(object URLs, static assets, the database REST read, session claim/handoff
readers) expiring for review on 2027-04-24. Stale and dated-expired allowances
fail.
