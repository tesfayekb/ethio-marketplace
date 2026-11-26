RULING — cursor-bundle-8a, report: the browse-path guard admits the hook where its own rule says, on the path CI gives it (INC-1309); the report's asks answered. Base: cursor/bundle-8a ec88bb1f0

**MODEL — Claude Opus 5.5 (High), in the SAME Cursor chat.**

Save this ruling as `docs/governance/briefs/cursor-bundle-8a-ruling-2.md` (new), by scripted copy (sha256 in the carrier).

PREVENTION (G70)

- Class 1: a guard proven on one form of its input while CI gives it another (INC-1309). `scripts/check-browse-imports.sh` admits the hook from an admin folder by the patterns `*/src/features/admin/*` and `*/src/features/admin-*/*`, which need a character before `src`.
  - Its test `scripts/check-browse-imports.test.ts` (BPG-1…4) always passes absolute paths. CI's step runs `bash scripts/check-browse-imports.sh src`, where the paths start `src/`, so the exception never matches.
  - Nothing imported the hook from an admin folder until Lovable 10b part 2, so no run showed it. The guard also admits only `src/routes/admin.tsx` of the admin route files.
  - Repository: this ruling (the guard, with planted cases on both path forms).
  - Instructions, in force now: when I verify a guard, I run it the way CI's step runs it, with CI's arguments.
  - Cursor rules: not needed. Knowledge: not needed.
  - This joins the lane after its report because it blocks the turn in flight beside it (G71). Lovable 10b part 2 moves 20 admin-folder files and one admin route file onto `useMayCall`, and its pull request merges after this lane.
- Class 2 (S813, mine): a premise written from my reading where only a capture could tell. Ruling 1 named the body our routes answer with the database down (`serverError`'s 500). Your capture shows 503 `upstream unavailable` (`src/server/supabase/user-client.ts` `upstreamUnavailable`).
  - Instructions, in force now: a ruling that asks for a captured answer names no expected body.
  - Repository: not needed (the capture-before-entry rule caught it). Cursor rules: not needed. Knowledge: not needed.

Your report is accepted as written: the scratch legal version (e2ed49f10), the CFC-5 fix (0774f0ff2), the second push, the allowlist's home, the mechanical edits a standing guard demanded, the three ceilings, the 31 designed-default lines, and the two MINORs. CI on e2ed49f10 (run 45894289368) is green; I read it by workflow name and head sha.

DECISIONS

1. `scripts/check-browse-imports.sh` judges a path the same whether it is given relative (starting at the source folder) or absolute (a full path through it). Read every rule against the path's part from the source folder `src/` on.
2. It also admits the hook — `src/features/permissions/use-may-call.ts`, and nothing else of the permission seam — from the admin route files `src/routes/admin.*`: `src/routes/admin.tsx` and every child route file named `admin.<…>`. These are the admin route chunks. The bundle closure's must-stay-lazy rule (BC-17) keeps the generated permissions out of the entry.
   - Any other route importing the hook still fails. So does any admin route importing the seam beside the hook.
3. Tests in `scripts/check-browse-imports.test.ts`, with fixtures under `scripts/fixtures/browse-imports/` (new trees), cover each case from both a relative and an absolute run:
   - an admin-folder file importing the hook passes;
   - an admin route file importing the hook passes;
   - a browse-path route importing the hook fails, by its path;
   - an admin route importing the seam beside the hook fails.
   - BPG-4 also runs the guard on `src` as CI's step does: `spawnSync` with `cwd` at the repository root and the argument `src`.
   - Any test id you add is grep-checked free first; the guard's existing test ids stay as they are.
   - Nothing else changes in the guard. CI's step stays as it is.
4. The crawl's repeat proof. Accepted as capped for this lane. `scripts/ci/repeat-cap.ts` is the repeat lane's designed tolerance; the nightly runs every crawl test each night; and the flake ledger's three-in-seven-days rule catches a flaky one.
   - The long rows are INC-1311, owned by Cursor 8c: every crawl test must fit the repeat budget. Name it under §13.
5. Our routes' server error: your captured 503 `upstream unavailable` is the entry. `serverError` answers only an unexpected throw.
6. Findings numbered (G71: no detour; nothing to change in this lane):
   - INC-1312, owned by Cursor 8b (fix 1, whose census reads every 500 our server answers): an auth server 500 is read as signed out (`src/server/supabase/user-client.ts`, `reason: "notSignedIn"`). Its sibling is the two names for the signed-out state (`src/lib/refusal.ts`, `translations-service.ts`).
   - INC-1313, owned by Cursor 8c: a whole-module mock hides the typed failure (`src/features/feed/use-feed.test.ts` mocks `@/lib/route-client` without `routeFailure`).
   - The crawl allowlist's `| INC-1278` lines and the impersonation page's fixture stay under INC-1278. I schedule them.
7. One further push, the guard fix only. Then update the report: §1, §2 and §5 for the new commit; this ruling under §10; §11 for that push's completed run; and §14 gains the four records below, word for word. Push the report, records only.
   - "INC-1309 (the supervisor's record) — the browse-path guard's admin exception matched only absolute paths, and CI runs it on a relative one. `scripts/check-browse-imports.sh` admits the hook from admin folders by patterns that need a character before `src`; its tests passed absolute paths, CI's step passes `src`; and it admitted no admin route file but `src/routes/admin.tsx`. Evidence: the supervisor's gate on Lovable 10b part 2's head `7622725bb` (20 admin-folder files flagged on the relative run, 1 admin route file on both). Class: concern 'a guard is proven on the input form CI gives it'; mechanism the browse-path guard; fixed in Cursor bundle 8a, ruling 2."
   - "INC-1311 (the supervisor's record) — a crawl test longer than the repeat budget's share is never repeated by the repeat lane. Evidence: run 45894289368's repeat lane passed capped, 76 test runs left by the cap; FCR-41 took 281.6 s. Class: concern 'every changed test is proven repeatable'; mechanism the repeat lane (DEC-283, `scripts/ci/repeat-cap.ts`); owner Cursor 8c (each crawl test fits the budget). Until then the nightly and the flake ledger watch them."
   - "INC-1312 (the supervisor's record) — an auth server failure is read as signed out. `src/server/supabase/user-client.ts` answers an auth 500 (`unexpected_failure`) with `reason: \"notSignedIn\"`, so a caller whose sign-in server failed is told they are signed out; it fails closed. Sibling: two names for the signed-out state (`signedOut`, `notSignedIn`; `src/lib/refusal.ts`, `translations-service.ts`). Evidence: Cursor bundle 8a's capture with the stack's auth server failing. Class: concern 'a failure is never read as signed out' (CF-SESSION-1's server side); mechanism the user client; owner Cursor 8b, fix 1."
   - "INC-1313 (the supervisor's record) — a whole-module mock hides the typed failure. `src/features/feed/use-feed.test.ts` mocks `@/lib/route-client` with `callRoute` only, so UFS-7's 500 case meets the mock's own error and never proves the route client's typed failure. Class: concern 'a test proves the mechanism it names'; mechanism the route client's test mocks (spread `importOriginal`, the form other route-client mocks use); owner Cursor 8c."

NUMBERS ASSIGNED (G66): INC-1309, INC-1311, INC-1312, INC-1313; S813 (the supervisor's).
