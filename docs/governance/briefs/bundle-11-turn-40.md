# Bundle 11 — turn C12: an upstream failure is not a refusal (INC-574), and the Settings test waits for its first render (INC-575): brief, version 1 (saved unchanged, 2026-10-12)

```text
BUNDLE 11 — TURN C12 (2026-10-12). ONE TURN, NO MIGRATION. No new strings. No package change.
Base: dev 87dc5630, the commit that landed turn C11; the census below proves every file by content. This file is public: it is written as build instructions. Tier A: the listing doors' routes and the sign-in check of the server routes. No door, no database change, no screen change.

ANSWERS TO THE LAST TURN
- Turn C11: verified. Dev 87dc5630 equals the supervisor's build byte for byte, the brief as sent. Its CI (run 38254910194, the first on six shards): every E2E job passed, with one test passed on retry (3 to 17 a run on eight shards); the component-test job failed once, on SETM-1 (INC-575, fixed below). Main stays at 45637132 until a run on dev is green.
- Turn C10: CI green (run 38250004537; main promoted to 45637132). Its first DEC-177 block (PW-59) is INC-574's evidence (below).

WHY THIS TURN
- INC-575 (the red, fixed first). The component-test job of run 38254910194 (turn C11) failed on one test: SETM-1 (src/test/settings-messages.test.tsx), "Unable to find an element by: [data-testid="password-method"]", in `renderSettings`. That wait has the 1 s default of `findBy`. The reads the page awaits are mocked and answer at once; what takes the time is the page's first render in the file, which is cold: SETM-1 takes 344 ms alone on the supervisor's copy against 77 ms for SETM-2, and 1,360 ms with the processor loaded. In CI, beside the other test files, it passed 1 s. Turn C11 changed no app code and no unit test. No other unit test renders a whole route page (`Route.options.component`).
- INC-574. PW-59 passed on retry in run 38250004537 (turn C10, shard 4). Its failed attempt says:
  - the save state went "saving", then "idle" — the category choice is a claimed save, answered with a refusal;
  - its own client errors (DEC-177): "refused POST /api/listings/draft: ok=false (door:doorError)";
  - the same run's server-error census: "[ssr-error] /api/listings/draft <html>" on shard 4 — the door's call came back as the HTML error page of the gateway in front of the database.
  The route's branch for an unexpected door exception (src/routes/api/listings/draft.ts) answers any error as `doorError` at status 200. The wizard reads that as a verdict on the claimed step: it shows "We couldn't save this step" and does not try again. A 5xx it reads as "not reached" and tries again (INC-228). The door never saw the save.
- The same branch is in every posting route that turns a door's exception into a refusal: publish, identity (three calls), alias, the photo's remove and cover, the upload's register. And the sign-in check: when the auth server does not answer, `userClientFromRequest` and the other gates say "not signed in" (401).
- The library's own shapes, read in @supabase/supabase-js 2.110.9 (the lockfile's version) and run against a stubbed network:
  - an error body that is not JSON comes back as `{ message: <the body> }` with its HTTP status (502 for the gateway's page);
  - a fetch that throws comes back with status 0;
  - `auth.getUser()` answers a 5xx, a 52x or a thrown fetch with `AuthRetryableFetchError`, and a refused bearer with `AuthApiError` 401.

WHAT THIS TURN BUILDS
- src/server/supabase/user-client.ts:
  - `upstreamFailed(error, status)`: true for no answer (status 0), a gateway status (502–504, 520–530), or an HTML page in the message. A status-500 answer with the database's own JSON stays a door error.
  - `upstreamUnavailable(path, what, status)`: logs one `[ssr-error]` line and answers 503 `{ "error": "upstream unavailable" }`.
  - `userClientFromRequest`: a retryable auth failure is the new reason `upstream`; `refuseUserClient` answers it 503 `{ "error": "upstream unavailable" }`.
  - `logRouteError` writes "upstream returned an HTML error page" in place of a page, keeping what came before it.
- The posting routes ask `upstreamFailed` first, before their refusal branch:
  - src/routes/api/listings/draft.ts (submit_listing);
  - src/routes/api/listings/publish.ts (publish_listing);
  - src/routes/api/listings/identity.ts (change_home_country, listing_contact_refusals, save_posting_identity);
  - src/routes/api/listings/alias.ts;
  - src/routes/api/listings/photos.$id.ts (remove_listing_photo, set_cover_photo);
  - src/routes/api/upload/photo.ts (register_listing_photo, after its rollback).
  Every other answer of these routes is unchanged.
- The sign-in check answers 503 for `upstream`, never 401:
  - src/server/imports/gate.ts (the import and the export gate);
  - src/routes/api/attributes.$id.options.ts;
  - src/server/category-images/gate.ts and src/routes/api/translate.ts (each calls `auth.getUser()` itself: `isAuthRetryableFetchError`).
- src/server/supabase/upstream.test.ts (NEW): UP-1..UP-4. They drive the real Supabase client over a stubbed `fetch`:
  - UP-1: what counts as upstream, and what does not (the door's P0001 at 400, a status-500 database error, a 200);
  - UP-2: the log line;
  - UP-3: the sign-in reason, 503 against 401;
  - UP-4: the draft route end to end — an error page answers 503; the door's own exception answers 200 `doorError` as before.
- src/test/settings-messages.test.tsx — `renderSettings`: the first wait is sized for the page's first render (5 s), its cause named in the file. No other line changes.
- Docs: listings.md (the shared client), posting.md (INC-574), the changelog, the roadmap (line 3; the C12 line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- What counts as upstream: no answer, 502–504, 520–530, an HTML page. A 500 with the database's JSON stays a door error.
- The answer is 503 `{ "error": "upstream unavailable" }`; each gate keeps its own wording beside it.
- INC-575: the first render's wait is 5 s, with its cause named; every other wait keeps its default.
- The new ids: UP-1..UP-4.

TESTS
- Unit: UP-1..UP-4 (NEW); SETM-1..SETM-4 (the first wait only).
- E2E: none new. Staging cannot be made to answer a gateway's page on demand; UP-4 drives the draft route end to end with the real client. The e2e tests that save through these routes run the unchanged door path.
- Not edited: every other test.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn C11 applied)
- Clean: typecheck, format, lint (0 errors, 33 warnings), 716 unit tests (122 files), the usage maps (they match), the hardcoded-string scan, the root-route check, the selector self-test, the identity-tag guard, the build and the bundle budget ("JS: 309.7 KiB / 320 KiB", unchanged).
- Red first: with the source changes taken out and the new test kept, UP-1..UP-4 fail ("upstreamFailed is not a function"; "expected 'notSignedIn' to be 'upstream'"; "expected 200 to be 503"). With them, they pass.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-40.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn C11's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and its fix is in this turn (INC-575). Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- No migration this turn: nothing is written to either database.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no retry added; the one wait changed is named above with its cause. A test this brief does not name is not edited.
- Scope — these files only: the 17 paths in the hashes table and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-40.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 16 files → each equal to:
  684aedde14c925580f09d77fb2d05d255958a35ca1741962b3b429e70b18f660  docs/_changelog.md
  df84fa93bc1520f91ae31a82a859857bfb694bfe16ea30c457afad8b11ae85dd  docs/features/listings.md
  8feb3578adb27d77882675f38dac4205ca7afcce93a3c18cf63f93594fcbfdb9  docs/features/posting.md
  c0ebeccd71e079cddc9d764d0898a8ee99af6e0c90d27f39553ce3af13918866  roadmap.md
  dd70d5aa37a2608543c090fdfb33999c6d3bfb80243d6fca8f7b17a79bb28a56  src/routes/api/attributes.$id.options.ts
  428af744115b55a6c0119623378d0f0b747b189a69b314388f58363e9e2438ab  src/routes/api/listings/alias.ts
  51491c18257b3039edecae7b197bb4ed36e6b9031e9a9cc389c1926c39bbff18  src/routes/api/listings/draft.ts
  b78e089a60e977d9265287df56e44e1ec5bfd860055fc73c479e701582b7398a  src/routes/api/listings/identity.ts
  f70f05cab646e2d8e487e3827d1bca8437e07e1e1af20ec970ff59161866c438  src/routes/api/listings/photos.$id.ts
  3e220bf905a8149d46b7bc3e85b69d81138db3212290e68300484f13ef3862c7  src/routes/api/listings/publish.ts
  d4fc86aaa241903d4d82b5bec857cbe52030c4d0dec72da9eaabb9a6ff787d3a  src/routes/api/translate.ts
  b4b98dc3d7172762d71878a8a6bc1a8fb3f87fbdf127d048bf1c430f239b7396  src/routes/api/upload/photo.ts
  9f74bb925a2132f44c83949a4e68b5c98eba2dce7ec7e998824ad0c78d587f19  src/server/category-images/gate.ts
  750a1d5371f0975d1301b6e95bdc72e30adafef8619f66debfe09e5e06ec2939  src/server/imports/gate.ts
  03eebf925a3b47f28f4f21751f709002ea863b6349b905366f74889129c7bc49  src/server/supabase/user-client.ts
  11b0b0e84e1df3ebd37683ba5e38ac7a0d8de6020c152de87d7c9d6abe06c923  src/test/settings-messages.test.tsx
- (c) `ls src/server/supabase/upstream.test.ts` → "No such file or directory".

THE CARRIER — C12-TURN-CARRIER-2026-10-12.md (21,275 bytes; sha256 e60f0b67618c4f7fca24c9f84d252a59a8313581cbf7a66e9d09141a9d433bdf; 46 sections)
- Its first line starts "C12 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 17 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  99a28a30e53e17c99f0e330fe2946aa35f0f67f46f6b1755c0527a2e8cc12095  docs/_changelog.md
  49d170693f6d92fa5d9fbd149762b6e99c94cc03a8301b715657b6e1a6b1197f  docs/features/listings.md
  f48e3daea7cc57310650bbc6fd86c22e1c54f224aa9d5f54098f651d6a937779  docs/features/posting.md
  b6bd2b9392b0ea7b117c2a9cc3f98b6c90226b0edbac472c63c7d3f145e3d6a5  roadmap.md
  189d51f76f5a55ce04130c0d44355d805b39f3744395436547744bab4a0ce790  src/routes/api/attributes.$id.options.ts
  70095bb4364bd96e4a2e4d192dcc6d399e7ec7e613417f03d2006c532dda5c06  src/routes/api/listings/alias.ts
  04deddab1055452c7b5bdde1a526c229654ff55c202e87658858d8faee3e476d  src/routes/api/listings/draft.ts
  169a13723a616e2437d0e84f87ecb7796335c56e0bc76a897c747c4add0a40d5  src/routes/api/listings/identity.ts
  445135e03044c57fb93849ed1773264bbe92ca19196681ed9861eb1c4b64b1ea  src/routes/api/listings/photos.$id.ts
  bf22a6c1d0df5a61d94ce839cb4e2dac494a8f68409c3c4a5559a6fbdcbae3d1  src/routes/api/listings/publish.ts
  690a0e5786467d443b33797a64187a36b5aa4434beb321cb1ae96db8e83a85d7  src/routes/api/translate.ts
  cb705d8ae5175f5e5ed131f05326195e9263bba89565c117c48666d7e6274d7f  src/routes/api/upload/photo.ts
  f58acc34122e4df18a469abc10acaed41fa8be46fdc60ce79294032bf482202f  src/server/category-images/gate.ts
  72d671648c07b32e53097e274656b36e9d4c7c39dce7bc1d1e8bbf7ace3dbb39  src/server/imports/gate.ts
  24cda281517822970fa2217ecf385b13d6d2cc5533322203caa235d909a2ccea  src/server/supabase/upstream.test.ts
  59a90d1798f498041f99490cab8c74f87cdfedf7700830f6946ad51f6bd81e70  src/server/supabase/user-client.ts
  aaec473fce8daf58ad7432c162a61a15c3ba154bb9ba05d8e87f69ea346c25e7  src/test/settings-messages.test.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 716 passed (122 files);
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bash scripts/check-identity-tags.sh` (the OK line and the three named deferrals, as before this turn);
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran all three on its own copy (WHAT THE SUPERVISOR RAN).

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(c).
- The 17 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 17 paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Publish once CI is green on the final commit (the server routes changed).
```
