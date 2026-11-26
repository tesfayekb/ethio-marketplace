RULING — cursor-bundle-8a, stop 1: real server-error bodies, captured and sourced; the helper's test in src/test/; the footer's owed pages; INC-1305 whole; the detail read by the import dialog. Base: cursor/bundle-8a 425364496

**MODEL — Claude Opus 5.5 (High), in the SAME Cursor chat (it is stopped at STEP 1).**

Save this ruling as `docs/governance/briefs/cursor-bundle-8a-ruling-1.md` (new), by scripted copy (sha256 in the carrier).

PREVENTION (G70)

- Class — two premises of the GO written from my own record instead of the files they name (S810, mine; S800's class, third occurrence). The GO said `PROVIDER_ERRORS` holds server-error bodies, without reading the fixture, and it listed INC-1305's reads from my running record's short entry, not from the census that registered it (Cursor 7b's report, finding F3, which also names `peekAssist` and `suggestAliases`).
  - Instructions, in force now: a GO that names what a fixture, a list or an incident's census holds quotes it from the file at the base, with the file and line; an incident's consumer list is copied from the census that registered it.
  - Repository: not needed this turn (the census items `premises` and `consumers` already ask for it; this stop is that check working).
  - Cursor rules: not needed. Knowledge: not needed.

Your census is accepted as reported: the floor (80 comparisons, 56 of them `until INC-1281`, 24 left after the move), INC-1304's three failures and its static read, `REFUSAL_DETAIL` and `COMPARISON_FLOOR` where the GO cites them, and your answers to OPEN (a) and (c). The stop counts against the lane as the supervisor's (DEC-414).

DECISIONS

1. Q1 — the server errors the crawl forces are real: SOURCED AND CAPTURED, never written by hand.
   - SCOPE gains `src/test/provider-errors.ts` with `src/test/provider-errors.test.ts`.
   - Add one server-error entry for each backend the crawl forces, and only where both proofs exist: (a) the vendor's source line at the version CI's Supabase CLI pin runs (the image tags that CLI starts), and (b) a capture of the real answer, status and body verbatim, from your throwaway local stack (the one `bun run db:proof` and the local backend start) with its database container stopped. Paste each raw capture, the command and the image tags into the report.
   - The four backends: the data API (with its database unreachable it answers a 5xx with its own error code); storage (the same); the sign-in server (`unexpected_failure` at 500 — the auth v2.197.0 source your 7c sibling read, `internal/api/errors.go`); our own routes (`serverError`, `src/server/answer.ts` `serverError`: `{"error":"server error","incident":…}` at 500, captured from your local server).
   - `SOURCE` in `src/test/provider-errors.test.ts` learns the new source forms (the data API's and storage's source paths at their pinned versions, and `src/server/answer.ts`), with one planted case each: a source line of another form still fails.
   - A backend whose real server-error body cannot be both sourced and captured is crawled with the network failure only and named OPEN in the report, with why. Nothing is invented.
2. Q2 — the crawl helper's unit test lives where the repository's other e2e helper tests live: `src/test/failure-crawl.test.ts` (new; add it to SCOPE), with the planted case (a page answer that swallows a failure fails the helper's assertion). The page-coverage census under `scripts/conformance/` keeps its own planted route.
3. Q3 — accepted. The page-coverage census also reads the footer's unrouted items from `src/components/shell/app-footer.tsx` (read only, not edited) as pages owed. Each needs a line ending `| DEC-463`; when one gains a route, its line goes stale and the census fails until the crawl covers the page.
4. Q4 — INC-1305 is the census's list, so fix 2 owns both reads.
   - `peekAssist` (`src/features/posting/posting-service.ts:959` `peekAssist`) is a designed default. The remaining-tries count is advisory: the screen keeps its own count, and the route decides at the press. It becomes a line in the crawl's allowlist with that reason. No code change: its screen, `step-details.tsx`, is Lovable's this turn.
   - `suggestAliases` (`src/features/posting/posting-service.ts:1111` `suggestAliases`): a failed read draws the failure notice line where the suggestions show, in `src/features/posting/step-who.tsx`, with Retry and the existing failure words (no new string). SCOPE gains `src/features/posting/posting-service.ts` with `src/features/posting/posting-service.test.ts` and `src/features/posting/posting-service-reads.test.ts`, and `src/features/posting/step-who.tsx` with `src/features/posting/step-who.test.tsx`.
5. Q5 — accepted. The typed failure carries the route's detail as data, and only `reasonOf` in `src/features/admin/import-dialog.tsx` reads it: the shared import dialog is today's one reader of a long route detail (your census). `src/lib/refusal.ts` does not change. The day a second screen needs a long detail in a sentence, the reading moves into the one reader at that turn; name it under §13 so the register carries it.
6. Then the rest of STEP 1 and Parts 1–3, as the brief says. Measure the crawl's CI time once it exists (OPEN (b)), and split it by area so no spec file grows past the size rule.

NUMBERS ASSIGNED (G66): S810 (the supervisor's).
