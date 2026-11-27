RULING — cursor-bundle-8b, stop 2: only a judgement of the bearer reads as signed out; every other auth failure is upstream and reported (INC-1312 corrected). Base: cursor/bundle-8b f76cbee3b

**MODEL — Claude Opus 5.5 (High), in the SAME Cursor chat.**

Save this ruling as `docs/governance/briefs/cursor-bundle-8b-ruling-2.md` (new), by scripted copy (sha256 in `expected.txt`).

PREVENTION (G70)

- Class (S817, mine): a defect premise registered from a report's words, where the pinned code could tell.
  - INC-1312 took Cursor 8a's wording ("an `AuthApiError`, not retryable" at 500) as fact.
  - The pinned `@supabase/auth-js` 2.110.9 throws `AuthRetryableFetchError` for 500–504 and 520–530 before it reads the body (`dist/main/lib/fetch.js`, `NETWORK_ERROR_CODES`, `handleError`). I read it there after your stop.
  - This is the second occurrence of the class "a premise stated without its decisive evidence" (S813 was the first). G70 says the second occurrence gets a guard, not a note:
    - Repository: Cursor 8c's GO carries, in its first part, a GO-checker law: every INC that a GO's fix names must appear in the GO's OPEN premises with the test that must show it red first.
    - Instructions, in force now: a defect I register from an executor's report about a library's or the platform's behaviour is recorded as "premise: the report's claim", until a red-first test on the pinned version shows it.
    - Cursor rules: not needed. Your GO's own wrong-premise clause and your red-first run caught it. Knowledge: not needed.
- Class 2 (found reading your commit): reading an Error's stack has no one reader.
  - Dev already has seven local `instanceof Error` reads, each under an `eslint-disable-next-line no-restricted-syntax` comment: two in `src/lib/error-text.ts` (lines 33 and 67), two in `src/lib/error-capture.ts` (lines 22 and 50), and one each in `src/lib/error-page.ts` (line 21), `src/routes/__root.tsx` (line 255) and `src/server/answer.ts` (line 177). Commit `8e8e9118a` adds an eighth, in `src/server/error-reports.ts` (line 143).
  - Repository: decision 3 below (one stack reader, used by every site this lane adds or touches). The rest is INC-1315 (below), on the before-launch list.
  - Instructions, Cursor rules, Knowledge: not needed.

Your stop is accepted as written: the premise found wrong, red-first with the captured body, the three laws fixed at their root (CF-RT-2, PROVERR-1, DARGS-2), and the third push the GO's own clause required.

DECISIONS

1. Keep your rule and make it the positive one (CF-SESSION-1's server side: a failed read is unknown, never signed out). `userClientFromRequest` answers `notSignedIn` only when the auth server judged the bearer: an `AuthApiError` (`isAuthApiError`) with a status from 400 to 499, other than 429.
   - Every other error from `getUser` answers `upstream` and is reported once by your trigger, whatever list a future library keeps: the library's retryable errors, any 5xx, a 429, a body that is not JSON (`AuthUnknownError`, which carries no status), and any other error kind.
   - `missingBearer`, `serverEnv`, the answer with no error and no user, and the deactivated branch keep today's answers.
2. Tests: extend the existing UP-8, or add a test beside it under a new id you grep-check free first.
   - Each case reaches `user-client.ts` through the same fetch seam UP-8 uses, with the fixtures' captured bodies. A case may vary the status of a captured body.
   - Cases: a captured 500 (upstream, reported once); a 505 and a 531 with a JSON body (upstream); a 505 with a body that is not JSON (upstream); a 429 (upstream); the captured 401 and 403 shapes (`notSignedIn`, nothing reported).
   - Red-first: the 505, 531, 429 and non-JSON cases fail on the base (`8f6c3f2fc`'s `user-client.ts`, written into place from `git show` and put back from a copy, as you did for stop 2). Show it in the report.
   - If PROVERR-1 or another law refuses a planted case, keep the cases the law admits and name the refused one under §10.
3. One reader of an Error's stack. Add `errorStack(error: unknown): string | undefined` to `src/lib/error-text.ts`, with its tests in `src/lib/error-text.test.ts`. Both files enter this lane's scope by this ruling.
   - It holds the one `instanceof Error` check, and `errorWithStack` reads through it.
   - Every stack read this lane adds or touches uses it: `src/server/error-reports.ts` (`reportServerFailure`), `serverError` in `src/server/answer.ts`, and the crash boundary's report in `src/routes/__root.tsx` when STEP 3 reaches it.
   - Each site's own `eslint-disable` line goes with it. The other sites stay as they are, listed under §6 as INC-1315.
4. Dev has not moved: `origin/dev` = `07162fd7a` = the merge already in your branch, so no fast-forward is due. Continue STEP 3 (the browser half, the staff readers and their door words, the census, the e2e spec), then Parts 2 and 3 and steps 6–9, as the GO and ruling 1 write them.
   - Your stop push's `CI` run (45918046430 on `f76cbee3b`) may still be running. Read it again before your final push. Its judged commit will be your final code commit.

NUMBERS ASSIGNED (G66): S817 (the supervisor's); INC-1315. For your report's §14, word for word:

- "INC-1312 correction (the supervisor's record) — the record's premise is not reproduced on the pinned auth library. `@supabase/auth-js` 2.110.9 throws its retryable error for 500–504 and 520–530 before it reads the body, so the user client already answered those as `upstream` (503); what was true is that no report saw them. The rest of the class stood: an auth answer that judged nothing (another 5xx, a 429, a body that is not JSON) still read as signed out. Fixed in Cursor bundle 8b: `notSignedIn` only when the auth server judged the bearer (an `AuthApiError` with a 4xx status other than 429); every other auth failure answers `upstream` and is reported. Evidence: UP-8 red-first against the base (cursor-bundle-8b stop 2 and ruling 2)."
- "INC-1315 (the supervisor's record) — reading an Error's stack had no one reader: seven sites on dev read it by a local `instanceof Error` under an `eslint-disable-next-line no-restricted-syntax` comment, and Cursor bundle 8b added an eighth. Cursor bundle 8b adds `errorStack` to `src/lib/error-text.ts` and moves its own sites onto it. Left: `src/lib/error-capture.ts` (the cause-chain walk and its type guard), `src/lib/error-page.ts`, and the line in `src/lib/error-text.ts` that falls back to an Error's name. Class: concern 'a caught error is read through the error-text reader'; mechanism `src/lib/error-text.ts`. Owner: the before-launch list."
