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
ten in all: Leaflet's outside tile-host probe (INC-875), the translations
folder's static asset read, its service's hand-built failures (INC-1304), and seven
non-route files (session claim/handoff readers, the client's door, the bearer
read) expiring for review on 2027-04-24. Stale and dated-expired allowances fail.

**A deadline on every call (DEC-477, INC-1285).** `src/lib/call-deadline.ts` is
the one place the values live: read 15 s, write 30 s, auth 20 s, download 60 s,
model 60 s, and an upload's 30 s stall inside a 300 s cap (a slow phone that
keeps moving is not cut). The route client arms the class of its method on every
call (a caller's `timeoutMs` wins); the database client's `global.fetch`
(`createSupabaseFetch`, `src/integrations/supabase/client.ts` — the one
hand-edit of that generated file), the anonymous call, the verifier client, the
two language-bundle reads and the photo editor's read go through
`fetchWithDeadline` / `deadlineFetch`. A call past its deadline fails as the
network kind (a `TypeError`); a caller's own abort stays an abort. CDL-1…6
(`src/lib/call-deadline.test.ts`), RCL-20, 21 and 15f prove the classes and the
stall; CF-DEADLINE-1…4 (`scripts/conformance/call-deadline.test.ts`) census every
`fetch(` and `createClient(` in browser code against
`call-deadline-allowlist.txt` (two live lines: Leaflet's outside host, INC-875,
and the translations folder's static asset, INC-1304), with a planted bypass.

**A retry only when it can succeed (INC-1288).** The query client
(`src/features/auth/session-query-client.ts`) retries a failed read only when
the failure notice's own reading (`failureKind`, `isRetryable`) calls it a
network or server failure; a refusal is asked once, whatever a query's `retry`
says, and a query's count still bounds the retries. Until the reader of door
codes has arrived the failure is read by what it carries (a status, a
`TypeError`), and the first retry decision starts the reader's download.
`useRetryFailed` (the notice's Retry for a screen behind several reads) follows
the same rule and adds a rate refusal whose named time has passed. SQC-1…4
(`session-query-client.test.ts`) and RRF-1…2 (`use-retry-failed.test.tsx`) prove
both; CF-RETRY-1…3 (`scripts/conformance/query-retry.test.ts`) fail a query
option `retry` set to a function or `true`, and a second `new QueryClient(`.

**Offline, said once (INC-1286).** A read paused for the network (TanStack's
`networkMode`, resumed by the browser's `online` event, no polling) is said by
the shell once: while the device is offline and a read waits,
`OfflineLine` (`src/components/shell/offline-line.tsx`, `shell.offline`) draws
one line in the notice dock above the download notice (`useOfflinePaused`
follows `onlineManager` and the query cache). A screen that draws a failure
while offline draws the network words: `failureKind` reads the unreadable
(`server`) kind as `network` offline; a refusal stays a refusal. FR-U15,
OFL-1…2 and the browser case OFF-1 (`e2e/offline.spec.ts`, joined to the shell
area of `scripts/e2e-select.ts`) prove it.

**One typed failure from a route (INC-1296).** `routeFailure(answer)`
(`src/lib/route-client.ts`) turns an answer that is not a success into the
failure the reader types (`readFailed`): an unreachable call is the network
kind, a signed-out call is 401, an answer is its code at its status, a code-less
answer is read by its status, and a refusal's detail rides after its code only
when it is a short code. The route's detail also rides whole, as data beside the
code (`ReaderFailure.detail`, read through `failureDetail`): the import dialog's
`reasonOf` names a commit's rows (`cat: parent → child`) from it, never by
re-reading the answer — today's one reader of a long detail (cursor bundle 8a,
ruling 1). The reader (`src/lib/reader-failure.ts`) arrives on
demand, so it stays off the first download; a download that fails is reported to
the shell's one notice and reads as network. The location reads, the category
tree, the card and photo links, the catalog finder, the feed, the category
picture step, the similar ads (INC-1305), the alias suggestions and the
translations console (INC-1304) use it. RCL-22…25 prove it; RCG-5 and RCG-6
(`scripts/conformance/route-client.test.ts`) fail an `Error` built by hand from
an answer's status in a file that reads routes (no allowance since cursor bundle
8a); RCG-6 plants one. A route's own answer below 500 with a body code is a refusal, read by the one accessor `refusalCode` (src/lib/refusal.ts), never a malformed answer with a Retry (RCL-26; INC-1340); CF-MOCK-1 keeps a test's mock of the module whole.
