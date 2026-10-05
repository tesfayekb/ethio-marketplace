Source: supervisor thread, turn 1168, Fri 2026-10-02 12:10 New York.
Status at 2026-10-05: built as 5e09c8d3 (run 37038531279 green, no flaky test, promoted; DEC-104's first clean run of five recorded in turn 1180, later runs not tallied); DEC-103 raised MAX_OPTIONS to 1,500 (its timing proof step 11 was accepted by ruling, unproven); INC-386 fixed, and step 14 surfaced INC-387 (suggest-icon model rejected) fixed in bundle 2 step 18; the repo holds DEC-103/104 lines in docs/governance/dec-050-spec.md, docs/features/e2e-harness.md and the changelog, not this prompt.
Related: DEC-103, DEC-104, INC-385, INC-386, INC-387, batch 16 (618-option model-cars list), GEMINI_FAKE.

Lovable's turn is verified clean on dev (8fa761d4). The window-measuring test now passes in CI, and the visibility plan is in the repo. CI is red on one test, for the same reason as this morning's second failure: the connection to the test database was dropped during a clean-up call.

**Why it is red, and why I'm fixing it now**
- Reads from the test database are retried automatically when a connection drops; writes are not. All 14 entries of this error in the flake record, and both of today's reds, are writes.
- Since this morning's fix, a failed clean-up fails its test loudly. That is correct, but it means a dropped connection now turns CI red.
- This morning I chose to only record it; with a second red that was the wrong call. The prompt below makes the test client retry a dropped call and report how many retries each run needed.
- The retry reasoning is my reading of the pattern. The fix records the exact error code, so the next runs confirm or refute it.

**Also in this prompt**
- **The option limit, 400 to 1,500**, so batch 16 can be imported.
- **Lovable's five local AI image failures.** Its machine reaches the real AI service where CI uses a stand-in. I'm making the local run use the stand-in too, and asking it to report whether the real service's rejection means the live image generator in admin is broken.

**Your steps**
1. Paste this to Lovable. Nothing needs attaching.
2. Do not Publish yet, and do not import batch 16 yet.
3. When Lovable reports, paste me its report.

---
```
SUPERVISOR VERIFICATION of 8fa761d4 — CLEAN. INC-384 is fixed (CT-8 green in CI), the records landed, scope was respected.
Rulings: search timing is closed as recorded (missed by 6 ms, hop-bound, bundle 4); it is not waiting. PW-96 stands as accepted. Local runs use the default 2 workers; the 429s came from 4. Bundle 1 closes when CI is green.

CI on 8fa761d4 is RED: 1 gating failure. Do Parts A, B and C in one turn, without notes between items. Report only on green.

SCOPE — files you may touch:
- Part A: e2e/helpers/net-retry.ts (new); e2e/global-setup.ts (adminClient only); e2e/global-teardown.ts (one summary line); any other file the step 1 census shows building a service-role client; src/test/e2e-net-retry.test.ts (new); docs/features/e2e-harness.md.
- Part B: src/server/imports/registry.ts; src/server/imports/gate.test.ts; docs/governance/dec-050-spec.md; any feature doc your census finds stating the 400 ceiling.
- Part C: package.json (the e2e:local script only).
- Records: docs/_changelog.md; roadmap.md.
No product code beyond registry.ts, no migration, no workflow, no playwright.config.ts.

PART A — DEC-104: the test service client retries a dropped call (fixes INC-385)
Evidence: shard 5, desktop-1280, PW-7: "[e2e:reap] listings of e2e-post-5-0-gpgbte failed: TypeError: fetch failed". The same shard's server log has "The socket connection was closed unexpectedly" on /api/attributes/…/options. The flake record holds "fetch failed" 14 times since 2026-09-13 and every one is a write (insert, createUser, delete, upload); none is a read. Both of today's reds are the first write straight after a read.
Reading, a hypothesis until the cause code is logged: the runtime retries a read on a closed socket by itself and does not retry a write. Since INC-383 a failed cleanup is loud, so a dropped write now fails the test.

1. Census, stated in your report: every place e2e/ builds a Supabase client with the service-role key. Known: e2e/global-setup.ts:150 adminClient. Check e2e/category-image-routes.spec.ts:46.
2. e2e/helpers/net-retry.ts — retryingFetch(input, init):
   - It calls fetch. If fetch THROWS (no response at all), it waits and tries again: at most 3 retries, after 300 ms, 1,500 ms and 5,000 ms. The waits are injectable so the unit test is fast.
   - Any Response is returned as it is, whatever its status. A 4xx or 5xx is the server's answer and is never retried.
   - Every method is retried. A replayed insert whose first copy landed must surface as the database's own duplicate error, never be swallowed.
   - When the retries run out it throws a TypeError whose message carries the cause code and the attempt count, for example "fetch failed (UND_ERR_SOCKET) after 4 attempts", with the original error as cause.
   - Each retry appends one line to a run ledger, in the pattern of the account ledger (e2e/helpers/users.ts:161–169): method, path without the query string, cause code, attempt number. Never a header, a key or a body.
3. adminClient passes it as global.fetch. So does any other service-role client from step 1.
4. e2e/global-teardown.ts, beside the "accounts signed in this run" line: one line "[e2e:teardown] transport retries this run: N" with the counts by method and by cause code, and how many ran out. It prints even when N is 0.
5. src/test/e2e-net-retry.test.ts:
   - a call that throws once and then answers returns the answer and records 1 retry;
   - an HTTP 500 response is returned with 0 retries;
   - a call that throws 4 times throws after 3 retries, with the cause code in the message;
   - the ledger line holds method, path and code and nothing else.
   Red-first: the first case fails against plain fetch.
6. docs/features/e2e-harness.md: one line for DEC-104 with its rule. ADOPT after five consecutive full CI runs with no failure or flake that is a transport error in a service-client call, and with the teardown line present in every source. If any failure is traced to a replayed insert, the POST retry is removed and the rest stays.
7. roadmap.md: INC-385 becomes "fixed by DEC-104".

PART B — DEC-103: the option ceiling rises from 400 to 1,500
Supersedes point 3 of §9 in docs/governance/dec-050-spec.md. Catalogue batch 16 makes model-cars 618 options (operator ruling: every vehicle make lists its models), and the gate refuses it as tooManyOptions: src/server/imports/registry.ts:27, enforced at src/server/imports/gate.ts:522. The 1 MB file ceiling still bounds the payload.

8. Census, stated in your report: every place that states or assumes 400 options (MAX_OPTIONS, tooManyOptions, "400" beside options) in src, e2e, supabase and docs. Known: registry.ts:27 and its comment, gate.ts:522, dec-050-spec.md:112.
9. registry.ts: MAX_OPTIONS = 1500. Rewrite its comment: the ceiling is a DoS bound, the 1 MB file ceiling bounds the payload, and model-cars holds 618.
10. gate.test.ts: a cell of 1,500 options is accepted; a cell of 1,501 is refused as tooManyOptions. Red-first: the 1,500 case fails while the constant is 400.
11. Staging, read-only, pasted in your report: attr_split_option_cell on a 1,500-record multibyte cell returns 1,500 parts in under 2,000 ms. Use the shape of PROOF 2 in migration f6a0ec50, as a SELECT. If you cannot run it, say so before the turn ends.
12. dec-050-spec.md: one dated line under §9 point 3 naming DEC-103.
Not in this turn: the 50-value ceiling on an option's allowed list (attr_option_shape, migration ff92c5b8:147). It rises to 150 in bundle 2's migration.

PART C — INC-386: the local run reaches the real AI image service
CI has no GEMINI_API_KEY, so src/server/category-images/gemini.ts runs its stand-in. Your machine has a key, so CI-2, CI-3 and CI-5 call the real service and fail. The switch exists: GEMINI_FAKE=1 (gemini.ts:25).

13. package.json, e2e:local: add GEMINI_FAKE=1 beside E2E_FAKE_TRANSLATE=1 and E2E_FAKE_GEOCODE=1. Nothing else in the script changes.
14. Read-only, stated in your report: with the stand-in off, the model id sent and the service's full rejection for one generate call and one suggest-icon call. Say whether the published app's generate path sends the same request. Change nothing; if the live feature is broken, that is a new INC for my ruling.

CHECKS
15. Typecheck, lint, unit tests, format check.
16. The DEC-023 local run, full suite, both projects, 2 workers. Paste the totals and the "transport retries this run" line.
17. One line each in docs/_changelog.md for DEC-103, DEC-104 and INC-386.

COMPLETION REPORT: the two censuses; files created, modified, removed; the two red-first lines; the staging timing; the step 14 findings; the step 16 totals; confirmation that nothing outside scope changed; any limitation named before the turn ends.
```
---

The curator's batch 16 rulings stay on hold until batch 17 arrives.
