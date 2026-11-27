QUESTION — cursor-bundle-8b part 1: ruling 2 decision 1 reads a revoked session as upstream
DONE: steps 0, 1, 2; STEP 3's server half (commit `8e8e9118a`); ruling 2 saved (`e864ed43b`, sha256 db7a9a86a696fa1e15633c7c96c51c889a3c000632036031f7e474c067c3253f, equal to `expected.txt`)
LEFT: ruling 2 decisions 1–3; STEP 3's browser half, the staff readers and their door words, the census, the e2e spec; parts 2 and 3; steps 6–9
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `6a5c19f81e48e2bc54dcd2c75119d305f662c915` (short `6a5c19f`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-27T00:28:25Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45913849134
FILES: unchanged from stop 2, plus docs/governance/briefs/cursor-bundle-8b-ruling-2.md and this stop.

The stop push's run (45918046430 on `f76cbee3b`) reads `pending` at this stop (`gh run view`), so the lane's newest
completed CI is the one above. Dev has not moved: `origin/dev` = `07162fd7a`. No code changed since stop 2.

## The finding

Ruling 2's title says "only a judgement of the bearer reads as signed out". Decision 1 makes that test "an
`AuthApiError` (`isAuthApiError`) with a status from 400 to 499, other than 429", with "any other error kind" upstream.
The pinned library delivers one judgement of the bearer as another kind:

- `@supabase/auth-js` 2.110.9 `handleError` turns the server's code `session_not_found`, whatever its status, into
  `AuthSessionMissingError`, not `AuthApiError` (`node_modules/@supabase/auth-js/dist/main/lib/fetch.js:78–83`). Its
  own comment names the case: "The `session_id` inside the JWT does not correspond to a row in the `sessions` table.
  This usually means the user has signed out, has been deleted, or their session has somehow been terminated." That
  is the bearer the user client sends to `GET /auth/v1/user`, while its access token has not yet expired.
- That class is a `CustomAuthError`, name `AuthSessionMissingError`, status 400 (`dist/main/lib/errors.js:115–119`).
  `isAuthApiError` is true only for the name `AuthApiError` (`dist/main/lib/errors.js:62–63`).
- The fixture holds the code's captured body from the refresh path (`session_not_found`, 400, "Invalid Refresh Token:
  No Valid Session Found", `src/test/provider-errors.ts:182–187`, from the auth server's
  `internal/tokens/service.go:234`). No fixture holds `GET /auth/v1/user`'s own answer with that code. A test reaches
  the case with the captured body at 403, which ruling 2 decision 2 allows ("a case may vary the status of a
  captured body"). The neighbouring `session_expired` (403, `middleware.go:223`) arrives as an `AuthApiError` and
  reads as signed out under decision 1 as written.

So decision 1, as written, would answer a revoked session `upstream` (503) and report it on every call until the
token expires. The base answers it `notSignedIn` (401), and the browser ends the session on it
(`src/lib/ended-sign-in.ts`). That is a behaviour change on an identity path that neither the ruling's title nor its
case list names. It fails closed, so it is not a hole.

The project already has the one test for "the sign-in server says this session is gone": `sessionGone(error)` in
`src/lib/ended-sign-in.ts:48–52` (INC-1274). It is true for the library's `AuthSessionMissingError` and for the
server's codes `session_not_found`, `session_expired`, `refresh_token_not_found` and `refresh_token_already_used`.
It imports only `src/lib/error-text.ts` and `src/lib/refusal-split.ts`, so the server can use it.

## The question

1. Signed out when `isAuthApiError(error)` with a status 400–499 other than 429, OR `sessionGone(error)` (the existing
   mechanism, K1). Every other error answers `upstream` and is reported, as decision 1 says. UP-8's cases gain the
   captured `session_not_found` body at 403 (`notSignedIn`, nothing reported), and it passes on the base too (no red-first
   owed for that case). My recommendation: it keeps the ruling's title, keeps today's answer for a revoked session,
   and uses the mechanism that already answers the same question in the browser.
2. Decision 1 as written: a revoked session answers `upstream` (503) and is reported. UP-8 then asserts that.

Decisions 2 (the other cases, red-first), 3 (`errorStack`) and 4 do not depend on this answer and wait for the
`continue` with it.
