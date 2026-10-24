# Browser route calls

`src/lib/route-client.ts` owns browser calls to `/api/` paths. `callRoute`
reads the browser session once (unless `auth: "none"`), attaches its bearer
only in the Authorization header, and always requests JSON. A JSON body alone
selects POST and adds `Content-Type: application/json`; a bodyless call defaults
to GET. Tokens, headers and bodies are never logged.

## Answers

- `answered`: HTTP status, `ok`, an object payload or null, and the string
  envelope fields `error` and `detail` or null. A refusal is not success.
- `signedOut`: required authentication has no token; nothing is sent.
- `unreachable`: network, timeout or caller abort. Consumers keep their existing
  failure captions; counters ignore the answer.

`downloadRoute(path, filename, init?)` shares the request mechanism. A successful
answer saves the response bytes unchanged under the supplied filename with one
object URL and one temporary anchor; both are cleaned up. A refusal saves
nothing and returns the parsed envelope. Its successful payload is null.

## Deadline

There is one AbortController per call. An optional timer and the caller's
signal forward into it; the first abort retains its cause. No AbortSignal.any
is required, preserving older Safari and Android WebView support. No default
deadline or retry is introduced. Cleanup removes the timer and signal listener.

## Consumers and conformance

Foundations turn 13 moves the shared import dialog, translations import/undo,
the categories/attributes/countries/locations export controls, and view/share
counters. Required imports and exports send nothing without a session;
counters retain optional authentication. Export paths, scopes and filenames
are unchanged, including attributes' sequential two-file loop.

RCL-1…10 mock session and fetch and prove absence, exact headers/body, envelopes,
network and abort classes, and exact downloaded bytes and cleanup. RCG-1…3
(`scripts/conformance/route-client.test.ts`) census browser fetches and bearer
builders/token readers through the conformance kit, with a planted bypass proof.
The caller is the unit runner, named in wired.test.ts.

`scripts/conformance/route-client-allowlist.txt` has one live line per file:
AI clients expire at INC-861; posting/feed/seller/shell readers at INC-875 (turn
14). Object URLs, outside tiles, static assets, database REST reads and session
claim/handoff readers are not route calls. Non-route-only files expire for
review on 2027-04-24. Leaflet has both route and outside-host fetches, so its
single file allowance expires at INC-875; after moving the route sites only
the outside-host reason remains. Stale and dated-expired allowances fail.
