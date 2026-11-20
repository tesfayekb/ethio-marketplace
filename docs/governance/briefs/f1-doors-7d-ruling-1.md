RULING — f1-doors-7d, stop 1: the preview adapter ruled out by the logs; sign-out becomes this device only; the plan accepted with a two-tab reproduction. Base: cursor/f1-doors-7d bfe3a2033.

PREVENTION (G70)
- Class (the supervisor's, second occurrence after S692; S694): a session finding was proposed without each request's context, its Referer, User-Agent and IP, read first. Changed here: the supervisor read that context (below), and it rules out the adapter. In force now: a session finding names each request's surface (Referer), browser (User-Agent) and IP before it names a code path. Listed for the instructions' next version.
- Class: a guard over a whole tree, built in one lane while another lane edits that tree, is judged by the tree CI tests, which is the pull request merged with dev. Changed here: decision 3 (b) says which allowlist lines to keep at your push.
Repository, Cursor rules, Knowledge: not needed beyond the above.

THE CONTEXT (ethio-prod's edge log, 2026-11-20, read by the supervisor, `OPTIONS` rows dropped). The logout at 07:00:56Z, the sign-in at 07:01:20.820Z, the refused refresh at 07:01:22.102Z and the anon 401s from 07:01:22.174Z all carry:
- Referer `https://my-market-dawn.lovable.app/`, the PUBLISHED site, not the editor's preview host (`id-preview--…`);
- User-Agent: desktop Safari 26.5 on macOS;
- one IP for all of them.
When the page is not framed, the adapter `src/integrations/supabase/previewAuthStorage.ts` answers plain `localStorage` (its line 57). So the editor's adapter is NOT the cause of this event. The edge log cannot tell two tabs of one browser apart. The operator does not know whether a second tab or window was open.

THE RULINGS
1. THE CAUSE stays unproven, and the adapter is excluded. Two contexts remain that the code admits, and you look for both:
   (i) A second tab or window of the published site, sharing the same `localStorage` and auth-js's cross-tab events.
   (ii) The app's own removal of the stored session: every caller of `forgetStoredSession`, `evictExpiredSession`, a `removeItem` of the session key, and `signOut`, with what triggers each.
   Your census says auth-js keeps a stored session whose access token is still valid after a refused refresh (GoTrueClient.js:4224-4232). Yet the session was dropped, so something removed or replaced the stored session. Look for it.
   - Build SO-16 (id checked free) RED-FIRST at the base. Two pages in ONE browser context, both signed in with a scratch account. On page A, sign out, then sign in again, and wait at least 5 s. Assert that page A keeps its new session, that neither page shows "could not be loaded", and that page A makes no 401 calls.
   - If SO-16 is red at the base, the cause is found. Name it from the code, file:line, in the report; fix it where it lives, within SCOPE; SO-16 then goes green.
   - If SO-16 is green at the base, it stays as a guard. The report says the cause is still unproven and names what SO-16 rules out.
   Either way, (b) and (c) are built as the brief says. On a session's end the app also writes ONE console line, `[session] ended: <event> <code or none> <seconds since this tab's last sign-in or none> <visibility>`, never a token or an id, so the next occurrence names its context.
2. SIGN-OUT IS THIS DEVICE ONLY: DEC-411, the operator's answer of 2026-11-20 (about 08:25 New York). `signOut()` (`src/features/auth/sign-out.ts:23`) calls `supabase.auth.signOut({ scope: "local" })`. The shell's hard-reset comment in `src/components/app-shell.tsx` (its step (a), above `hardReset`) is restated to say so, with DEC-411.
   - `signOutOtherDevices` and the credential-change calls with `scope: "others"` (`auth-service.ts`) do not change.
   - A unit test asserts the scope.
   - Security, recorded: other devices keep their sessions until they expire or the person uses "Sign out other devices". A password change still ends them.
3. THE PLAN, accepted, with these readings:
   (a) The status mirror stays in `src/lib/reader-failure.ts`. CF-REFUSAL-2 checks it against `door_refusal_status` in BOTH directions, so a code that exists only in the mirror fails too (INC-1223).
   (b) THE MECHANISM IS TWO FILES. Lovable's L21 (`lovable/refusal-reader`, built, in the supervisor's gate) moves `splitRefusal` and `RefusalParts` into `src/lib/refusal-split.ts` (new there), and `src/lib/refusal.ts` re-exports both. CF-REFUSAL-1 treats both files as the mechanism.
   L21 folds these client parsers: `door-codes.ts`, `door-error.ts`, `impersonation-service.ts`, the two verb dialogs, `posting-service.ts`, `use-image-failure.ts`, `refusal-text.ts`, `my-listing.ts`, `legal-reader.ts` and `import-dialog.tsx`.
   CI judges a pull request merged with dev. So at your final push, read `git cat-file -e origin/dev:src/lib/refusal-split.ts`:
   - If L21 is on dev, write no allowlist line for its files. Your local guard will report them as bypasses on your branch, which lacks L21; name that under Limits, and CI judges.
   - If L21 is not on dev, keep their lines `until L21`. Lovable removes them once both have landed (DEC-396).
   Your report says which case held.
   (c) `feed_page` and `seller_feed_page` raise `<function>: <code>`. Read them through `splitRefusal` twice: the outer key is the function's name, and the code is the inner key of the trimmed tail. Never split by hand. INC-1224 records the database shape, and its owner is the before-launch list (G71).
   (d) SO-14 and SO-15 as you propose, each with a scratch account only.
   (e) `src/server/jobs/route.ts:70` joins the server readers.
   (f) `src/features/auth/mfa/mfa-service.ts:100` reads GoTrue's error text, not a door's refusal. Exclude it from CF-REFUSAL-1 by the guard's definition (provider errors are not refusals), say so in the guard's comment, and name it under §10. If the definition cannot exclude it cleanly, give it an allowlist line with its reason and `until ACT-027`.
4. `src/features/admin/legal/legal-version-view.tsx:160` is a client screen, so it is Lovable's: an allowlist line `until L22` (Lovable's next turn).
5. SCOPE: the brief's, plus `src/features/auth/sign-out.ts` with its test (already under `src/features/auth/`) and `src/server/jobs/` with its tests (already under `src/server/`). No widening.
6. Clean `/tmp/ethio-scratch/f1-doors-7d/` yourself at the end; it is your sandbox's.

RECORDS (word for word into §14, beside the GO's)
DEC-411 — Sign-out ends the session on this device only (`scope: "local"`), the operator's answer of 2026-11-20. "Sign out other devices" and a credential change still end the other sessions. Supersedes U0j's (INC-072) "global, kept deliberately".
INC-1224 — `feed_page` and `seller_feed_page` raise `<function>: <code>`, not `code:detail` (F1-7d's census). The servers read them through `splitRefusal` twice. Class: a refusal shape outside the door law. Owner: the before-launch list (G71).
