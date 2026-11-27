RULING — cursor-bundle-8b, stop 3: a session the sign-in server says is gone reads as signed out through the existing check (option 1). Base: cursor/bundle-8b 8bb8f54bb

**MODEL — Claude Opus 5.5 (High), in the SAME Cursor chat.**

Save this ruling as `docs/governance/briefs/cursor-bundle-8b-ruling-3.md` (new), by scripted copy (sha256 in `expected.txt`).

PREVENTION (G70)

- Class (S819, mine): a ruling wrote its own test for a concern that already has its mechanism. Ruling 2's decision 1 defined "a judgement of the bearer" as one error class's test, without reading two things:
  - The library's error classes for that case: `@supabase/auth-js` 2.110.9 raises `AuthSessionMissingError` for the code `session_not_found` (`dist/main/lib/fetch.js`, the `session_not_found` branch of `handleError`). I have now read it there.
  - The project's own check for "the session is gone": `sessionGone` in `src/lib/ended-sign-in.ts` (INC-1274). That is K1's failure at ruling time.
  - Instructions, in force now: a ruling that defines a predicate cites the mechanism that already answers it, by its file and name. If none exists, the ruling writes "NONE YET" with the grep that found none.
  - Repository: not needed beyond S817's law, which rides Cursor 8c's GO. A ruling's prose is not something a guard reads; your census and your stop clause caught it before any code changed.
  - Cursor rules: not needed. Knowledge: not needed.

Your stop is accepted as written.

DECISIONS

1. Option 1. `userClientFromRequest` answers `notSignedIn` when either of these holds:
   - `sessionGone(error)` (`src/lib/ended-sign-in.ts`);
   - or `isAuthApiError(error)` with a status from 400 to 499, other than 429.

   Every other error from `getUser` answers `upstream` and is reported once, as ruling 2 says. Import `sessionGone` from `@/lib/ended-sign-in`; do not copy its code list.
2. Tests: ruling 2's decision 2 stands, with two cases added.
   - The captured `session_not_found` body sent at 403 reads `notSignedIn`, with nothing reported.
   - The captured `session_expired` body (403) reads `notSignedIn`, with nothing reported.
   - Both pass on the base too, so no red-first is owed for them.
   - Where a case names a status for which no captured body exists, send the captured body of the same code at that status, as ruling 2 allows. Name each such case under §5.
3. Ruling 2's decisions 2, 3 and 4 stand otherwise. Continue with them, then STEP 3's browser half and the rest of the turn.
   - Run 45918046430 (stop 2) was cancelled when stop 3's push arrived. Stop 3's run 45918807028 was pending when I wrote this.
   - Your final push is the judged one; read its run as ruling 2 says.

RECORD (G66): this text REPLACES ruling 2's INC-1312 correction in your report's §14, word for word:

- "INC-1312 correction (the supervisor's record) — the record's premise is not reproduced on the pinned auth library. `@supabase/auth-js` 2.110.9 throws its retryable error for 500–504 and 520–530 before it reads the body, so the user client already answered those as `upstream` (503); what was true is that no report saw them. The rest of the class stood: an auth answer that judged nothing (another 5xx, a 429, a body that is not JSON) still read as signed out. Fixed in Cursor bundle 8b: `notSignedIn` only when the sign-in server judged the bearer, meaning the session-gone check (`sessionGone`, `src/lib/ended-sign-in.ts`) or an `AuthApiError` with a 4xx status other than 429; every other auth failure answers `upstream` and is reported. Evidence: UP-8 red-first against the base (cursor-bundle-8b stop 2, rulings 2 and 3)."

NUMBERS ASSIGNED (G66): S819 (the supervisor's). Ruling 2's INC-1315 record stands as written.
