# Turn C3 — the browser client in tests reached one way (INC-959); the owed docs and small guards; the supervisor's brief checks as conformance tests
Base: 4907c2b8356da048455b61812dae3e9cdd25b465 · Final commit: 63db55b1 · Brief: docs/governance/briefs/foundations-turn-c3.md (sha256 2bef615c52e7aa9a148a4ec263ad77c9759ac0aaac32a2297c6000b196945ffc)
Review: READY · 0 BLOCKER · 1 MAJOR · 6 MINOR · on 63db55b

## 1. Done / not done, by part and step

- **Part A — done.**
  - The session's startup line said local `dev` had diverged (143 commits not on origin/dev). That came from the shallow clone. After `git fetch --deepen=400 origin dev`, `git merge-base --is-ancestor dev origin/dev` returned 0: local dev is an ancestor (82 behind, 0 ahead).
  - `git fetch origin dev:dev` then fast-forwarded `0586d7f2..4907c2b8`, followed by `git switch dev`.
  - `git rev-parse HEAD origin/dev` → 4907c2b8356da048455b61812dae3e9cdd25b465 for both. BASE = origin/dev, so the anchors are fresh.
  - CI at Part A: the newest completed run was f18cb06, SUCCESS (run 40713967683). It was STALE for BASE, because the run on 4907c2b8 had not reported yet.
  - The repeat lane's line from local-backend-proof.md: `Repeat: each 2 on both projects; 1074 tests selected, 18 repeated; budget 720 s at 4.7 s a test`.
  - No red known.
- **STEP 0 — done** (`2dcbd68d`). The brief is saved with sha256 2bef615c…945ffc and 14075 bytes, both equal to the stated values. roadmap.md line 3 is replaced as dictated.
- **Part B — done** (`f9ec7188`).
  - The helper e2e/helpers/browser-client.ts.
  - Its unit tests, BCL-1…5 (src/test/e2e-browser-client.test.ts).
  - Its census, CF-BC-1/2, with the 24 files allowlisted.
- **Part C — done** (`b236b437`).
  - Moved: ui.ts, posting.ts and the three synchronous readers (admin-users, admin-translations-data, admin-translations-console).
  - The second review added e2e/auth-signout.spec.ts (`63db55b1`). 18 files are left until INC-959.
  - The repeat-lane cap carries no more files: the three readers alone are 14 + 5 + 22 = 41 tests, and 41 × 2 × 2 × 4.7 s = 770.8 s, above the lane's 720 s.
- **Part D — done** (`e43121b3`).
  - Concern 2: e2e-harness.md names the colour reader, quotes D237's law, and names the helper.
  - Concern 3: CF-FT reads the `font:` shorthand.
  - Concern 4: LR-C1/2. LR-C1 was refined in Part E and again after review (§10).
- **Part E — done** (`868905fd`).
  - PPF-1/2, TI-6, AGL-1…3.
  - Register rows 69–71.
  - Later words under INC-959, INC-910 and INC-929.
  - Five roadmap ticks and one changelog line.
- **Part F — done** (`e478d26c`).
  - (a) INC-937's residue.
  - (b) `holdsStoredSession` removed.
  - (c) The three accepted items recorded.
  - (d) The four record errors corrected as dated later words.
  - INC-967 registered; Numbering is now INC-968.
  - Build and bundle check run.
- **The reviews' fixes:** `494b6f9b` (first review) and `63db55b1` (second review), §10.
- **THE CHECKS, THE END-TO-END CHECK, THE INDEPENDENT REVIEW** — §5 and the header.

## 2. Files changed

`git diff --name-only 4907c2b8356da048455b61812dae3e9cdd25b465..HEAD` (36 paths):

```
docs/_changelog.md
docs/features/ci-guards.md
docs/features/e2e-harness.md
docs/governance/briefs/foundations-turn-c3.md
docs/governance/mechanisms.md
docs/tracking/incidental-findings.md
e2e/admin-translations-console.spec.ts
e2e/admin-translations-data.spec.ts
e2e/admin-users.spec.ts
e2e/auth-signout.spec.ts
e2e/helpers/browser-client.ts
e2e/helpers/posting.ts
e2e/helpers/session.ts
e2e/helpers/ui.ts
roadmap.md
scripts/conformance/agents-lines-allowlist.txt
scripts/conformance/agents-lines.test.ts
scripts/conformance/browser-client-allowlist.txt
scripts/conformance/browser-client.test.ts
scripts/conformance/error-text-allowlist.txt
scripts/conformance/fonts-allowlist.txt
scripts/conformance/fonts.test.ts
scripts/conformance/language-records.test.ts
scripts/conformance/live-regions-allowlist.txt
scripts/conformance/live-regions.test.ts
scripts/conformance/non-null-allowlist.txt
scripts/conformance/planted-proofs-allowlist.txt
scripts/conformance/planted-proofs.test.ts
scripts/test-ids.test.ts
scripts/test-ids.ts
src/features/auth/auth-client.test.ts
src/features/my-listings/my-listings.test.ts
src/lib/lovable-error-reporting.ts
src/routes/api/translate.route.test.ts
src/test/app-target.test.ts
src/test/e2e-browser-client.test.ts
```

New files (`--diff-filter=A`, 12 of them), all tracked (`git ls-files -- <the 12> | wc -l` → 12):
- docs/governance/briefs/foundations-turn-c3.md
- e2e/helpers/browser-client.ts
- scripts/conformance/agents-lines.test.ts and its allowlist
- scripts/conformance/browser-client.test.ts and its allowlist
- scripts/conformance/fonts-allowlist.txt
- scripts/conformance/live-regions.test.ts and its allowlist
- scripts/conformance/planted-proofs.test.ts and its allowlist
- src/test/e2e-browser-client.test.ts

Deleted files: none (`--diff-filter=D` → 0).

## 3. Behaviour contract — answer tables before → after

| Touched | BASE | Now |
|---|---|---|
| e2e/helpers/ui.ts: `elevateInBrowser` (its getSession poll and challengeAndVerify), `endActiveImpersonation`, `readAal` | Each used page.evaluate on `window.__ethioSupabase`, with its own cast. `readAal` waited 15 s first (Playwright's timeout text). The others read at once, so a missing client threw a TypeError. | The same in-page code through `inBrowserClient`. Each call first waits up to 15 s for the hand-off. A missing client fails in one message: `[e2e:browser-client] the page's database client never arrived: …`. Returns are unchanged. Each turn of the 10 s getSession poll now also costs a wait, a handle and a dispose round trip. |
| e2e/helpers/posting.ts `bearerOf` | page.evaluate with a cast, no wait | through `inBrowserClient`; same return and assertion |
| admin-users `rpcFromBrowser`; admin-translations-data (7 sites); admin-translations-console (5 sites); auth-signout SO-3 (its hand wait and signOut) | page.evaluate with a cast each; admin-users and auth-signout waited first | through `inBrowserClient`; every assertion is byte for byte the same; typed results through `rpc<T>` |
| The window's client type | two declarations: auth-signout's global one (signOut only) and a cast at each site | one `declare global` in e2e/helpers/browser-client.ts, typed `BrowserClient`, with `signOut` added |
| src/lib/lovable-error-reporting.ts, the message sent to the editor's reporter | `error instanceof Error ? error.message : String(error)` | `errorText(error)`; a Response keeps its own text. See the rows below. Nothing a person sees changes. |
| — a plain object | "[object Object]" | its message, else its code, else its status |
| — an Error with an empty message | "" | its name |
| — null / undefined | "null" / "undefined" | "no message (null)" / "no message (undefined)" |
| — an HTML error page | the page's text | named as an HTML error page, with its status |
| Three unit tests (auth-client :117, translate.route :73, app-target :15) | `String(error)` / `(error as Error).message` | `errorText(error)`; their assertions (`toEqual`, `includes`) hold |
| e2e/helpers/session.ts | exported `holdsStoredSession`, which had no caller | removed together with its doc comment |
| Censuses | CF-FT-1 read no `font:` shorthand; TI-1 skipped ids of several parts (CF-BC-1) and lettered numbers (LR-C1, ML-U12) | each reads them (§4, §5) |

No route, door, screen or string changed.

## 4. Censuses

- **INC-959.**
  - At BASE, `grep -rc "__ethioSupabase" e2e` → 91 mentions in 24 files, file for file the brief's counts.
  - CF-BC-1 reads code with comments blanked: 721 files read, 24 files, 107 reads.
  - At the end: `[CF-BC-1] files read: 721; files naming the client by hand: 18; reads: 64; allowlist: 18`.
  - In src/: app-shell.tsx :826 is the hook. src/lib/env-flags.test.ts :32 is a test, which the census does not read (§10).
- **Concern 2.**
  - `grep -rn "CF-FT allowlist" docs` finds only briefs and turn 33's report. The sentence of record was register row 49 ("one allowlist line in the census"), now corrected.
  - The colour test ids are EC-1…EC-6 (src/test/e2e-colors.test.ts).
  - D237 is quoted from docs/spec/spec-ledger.md :4545.
  - Turn C1-2's MINOR-8: `grep -rn routePageClosed e2e src docs/features` → none, and nightly-e2e.md :23 already names INC-962/NH-6. Turn C2 closed it; nothing was left.
- **Concern 3.** `font:` in src/ and public/:
  - src/lib/error-page.ts :55 and :63 — findings;
  - src/lib/error-page.ts :60 (`font: inherit`) — passes;
  - src/routes/__root.tsx :342 — a comment, and the rule reads code only.

  CF-FT-1: 603 files, 2 findings, both on the allowlist.
- **Concern 4 (LR-C1).**
  - `[LR-C1] files read: 287; aria-live elements: 32; drawn always, waiting for words: 3; with a role: 0; allowlist: 0`.
  - The three drawn before their words: on-demand-notice.tsx :65, fading-notice.tsx :36, and action-message.tsx :53 (its role comes only with its words).
  - Every consumer the census printed: app-shell.tsx :911, :932; brand/spinner.tsx :30; on-demand-notice.tsx :65; action-message.tsx :53; fading-notice.tsx :36; notice-outlet.tsx :12; attributes-page.tsx :548; category-attributes-dialog.tsx :296, :321; attribute-link-cells.tsx :149; categories-page.tsx :1013, :1061; category-dialogs.tsx :871; listing-page.tsx :180, :476; listing-settings.tsx :140; listings-page.tsx :589; impersonation-banner.tsx :24; role-detail.tsx :31; roles-list.tsx :230; strings-page.tsx :211; user-detail.tsx :86, :382; users-list.tsx :240; my-listing-page.tsx :337, :625, :717; my-listings-page.tsx :690; step-specifications.tsx :1892; step-where.tsx :1586; routes/admin.tsx :90.
- **Concern 5.**
  - (a) PPF-1 reads 34 scripts/conformance/*.test.ts files: 0 findings on the tree, 2 at BASE (language-records.test.ts :59, :61).
  - (b) A test-id census already existed: scripts/test-ids.ts (INC-536, TI-1…5). I extended it rather than writing a second one. It now reads ids of several parts and lettered numbers, which uncovered the duplicate `ML-U12` (my-listings.test.ts :90 and :154).
  - (c) `grep -rln AGENTS scripts src .claude/hooks` found no AGENTS.md check; land.ts holds only the no-agents-change flag. Now `[AGL-1] AGENTS.md lines: 51; pointers read: 63` (all exist) and `[AGL-2] AGENTS.md after the LOVABLE block: 9409 bytes; budget 5120`.
- **SIXTH.**
  - (a) ERRT-6 went from 17 reads and 13 allowed files at turn C2's close to `[error-text] files read: 1102; hand reads: 12; allowed files: 9`. `grep -c "| INC-937$"` on its allowlist → 0.
  - (b) `grep -rn holdsStoredSession e2e src scripts docs/features` at BASE found only its definition and the harness doc.

## 5. Tests

- **Added:** BCL-1…5; CF-BC-1/2; LR-C1/2; PPF-1/2; AGL-1…3; TI-6.
- **Changed:**
  - CF-FT-1 now reads its allowlist.
  - CF-FT-3's planted tree is extended. These now fail: a shorthand in CSS, one in a style object, and one that names a family beside the token. These pass: `font: inherit`, a shorthand whose family is the token alone, and a comment.
  - CF-LANG-2's planted tree moved to node_modules/.cache/lang-planted; its assertions are unchanged.
- **Re-pointed id:** src/features/my-listings/my-listings.test.ts :154, ML-U12 → ML-U23. It is the D224 share test that collided with turn R1's ML-U12 at :90. The records' "ML-U12…ML-U16" (bundle-16-turn-r1, docs/features/my-listings.md :136) name the :90 test, which keeps its id.
- **Red first** (each shown on BASE's code or on a planted change, never committed):
  - CF-BC-1 with an empty allowlist → 24 files, 107 reads.
  - CF-FT-3 on BASE's census → the planted shorthands are missing. CF-FT-1 on the tree → error-page.ts :55 and :63. With the first-cut pattern, `bad.tsx:5` (a family beside the token) is missing.
  - LR-C1 with FadingNotice's old `role="status"` put back → `fading-notice.tsx:36`. LR-C2 with the first-cut rules → bad.tsx :14, :15, :16 missing (`??` words, a role given while quiet, a role under another condition).
  - PPF-1 with BASE's language-records.test.ts → :59, :61.
  - TI-6 on BASE's pattern → `expected [] to deeply equal [ 'ZZ-QQ-1', …`. TI-1 with the widened pattern and ML-U12 put back → `ML-U12: …my-listings.test.ts:90, …:154`.
  - AGL-2 on the tree (9409 B) before its line. AGL-3 runs on planted text.
- **Unit:** `bunx vitest run` on 63db55b1 → Test Files 350 passed (350); Tests 2088 passed (2088).
- **THE END-TO-END CHECK** (ethio-staging, both projects, 2 workers, 0 retries):
  - `bun run e2e:local -- e2e/admin-translations-data.spec.ts e2e/admin-translations-console.spec.ts e2e/admin-users.spec.ts` on e478d26c → `Running 84 tests using 2 workers` … `1 failed · 1 skipped · 82 passed (11.3m)`.
    - Failed: AU-3 at desktop-1280 (it passed at mobile-360). The step-up gate's verify answered `HTTP 422 POST /auth/v1/factors/…/verify ({"code":"mfa_ip_address_mismatch","message":"Challenge and verify IP addresses mismatch."})` (§10, §12).
    - Skipped: TR-25 at mobile-360, which is `@global-state` and runs in one project by design.
    - `[ssr-error]`: 0.
  - `bun run e2e:local -- e2e/auth-signout.spec.ts` on 63db55b1 → `Running 34 tests using 2 workers` … `34 passed (3.2m)`; `[ssr-error]`: 0.
  - The three translations/users specs were not re-run after 494b6f9b and 63db55b1. What those commits change for them: the helper's window read lost its cast, which is the same code at runtime.
  - For CI's repeat lane: the four changed specs, and every importer of ui.ts and posting.ts (INC-967).
- **J-audit** (e2e/** changed): J1–J9 hold. No fixture, namespace, identity or locator changed. The moved readers keep their bodies and assertions. The helper's wait is Playwright's own `waitForFunction` with a deadline (J7), never `waitForTimeout`.

## 6. K2 — siblings that bypass the mechanism

- **`window.__ethioSupabase` by hand:**
  - the 18 allowlisted files, until INC-959;
  - src/components/app-shell.tsx :826, the hook, which keeps its own `as unknown as` cast;
  - src/lib/env-flags.test.ts :32, a mention in a test.

  The helper's `declare global` is visible to src/ too, because one tsconfig covers both. CF-BC-1 still names any src reader.
- **Other window instruments read by hand in e2e/** (`grep -rhoE "__ethio[A-Za-z]+" e2e | sort | uniq -c`): __ethioQueryClient 10, __ethioLegalKinds 11, __ethioStepUp 6, __ethioClientOff 6, __ethioPublicLanguages 5, __ethioSessionPolicy 3, __ethioHomeAhead 2, __ethioMenuAhead 1. They are outside concern 1; unchanged.
- **The seven hand copies** of "a refusal's own message" (a mechanism-less extractor), each now a dated errorText line:
  - listing-page.tsx :328, :368
  - listing-photos.tsx :103, :132
  - listing-settings.tsx :103
  - listings-page.tsx :289
  - photo-changes.tsx :74
  - photo-reviews.tsx :84
  - use-edit-draft.ts :476
- **The font shorthand:** src/lib/error-page.ts :55, :63. Also error-page.ts :25, :27 against errorText.
- **Planted writes outside PPF-1's folder:** src/lib/error-text.test.ts :196, scripts/bundle-closure.test.ts :25, :104, scripts/brief/apply-blocks.test.ts :29, scripts/ci/nightly-hour.test.ts, scripts/ci/with-deadline.test.ts. Not read by PPF-1; the reviewer found the first three compliant.
- **roadmap.md line 3** still says a brand face returns "through the CF-FT allowlist". An allowlist now exists, but it holds only recorded exceptions (row 49). Line 3 is left as is (STEP 0 only).
- **Greps run:** those above, plus `grep -rn "aria-live" src` and `grep -n "writeFileSync|mkdirSync|mkdtempSync|copyFileSync|appendFileSync" scripts/conformance/*.test.ts`.

## 7. Allowlists and guards

- **error-text-allowlist.txt: 13 → 9.**
  - Removed: lovable-error-reporting.ts, auth-client.test.ts, translate.route.test.ts, app-target.test.ts.
  - Re-worded and dated 2026-12-31: the seven refusal mappers ("map a refusal's own message to the words shown …") and error-page.ts.
  - shell.spec.ts is unchanged.
- **browser-client-allowlist.txt (new): 0 → 18.** Each line reads `<file> (<count>) | reads the page's client by hand (written before the helper); it moves onto e2e/helpers/browser-client.ts with its file | INC-959`. There were 24 at Part B; 5 left at Part C and auth-signout after review.
- **non-null-allowlist.txt: 144 → 143.** auth-signout's `(1)` went stale when its read moved; a count only falls.
- **fonts-allowlist.txt (new): 0 → 1** — `src/lib/error-page.ts (2) | the SSR error page is its own document, dependency-free by law (INC-085c) … | 2026-12-31`.
- **agents-lines-allowlist.txt (new): 0 → 1** — `AGENTS.md (9409) | over the 5,120-byte budget recorded at S326 (INC-735) … | 2026-12-31`.
- **live-regions-allowlist.txt and planted-proofs-allowlist.txt (new):** 0 lines.
- **Guard checks:**
  - Every new `readAllowlist` caller hands its findings; CF-KIT-7 is green.
  - The new censuses are vitest files; wired.test.ts's domain is census modules that are not tests, and none were added.
  - `bunx vitest run scripts/` → 51 files, 252 tests passed.

## 8. Strings

None. The no-new-string flag holds; `bun run i18n:usage` is green and the maps are unchanged.

## 9. Migrations

None.

## 10. Departures

1. **Part A.** The startup hook said to STOP on a diverged local `dev`. Its premise was the shallow history (§1), and the fast-forward went through, so I continued.
2. **error-page.ts and errorText — for a ruling** (the third review's MAJOR). The brief's SIXTH (a) allows two outcomes: move the read onto errorText, or keep a line for a refusal mapping. src/lib/error-page.ts :25, :27 is neither. The root error page is dependency-free by its own law (INC-085c): it inlines even the E2E flag, and errorText would also drop the `name:` its instrumented cause shows. So it stays as a dated line (2026-12-31) "held for the supervisor's ruling". INC-937 is written FIXED on the strength of that line. The choice for the ruling: keep the exception, or change the page in a product turn.
3. **The font shorthand exception — for a ruling.** CF-FT-1 found the same page's two shorthands, which concern 3 did not foresee. The census gained an allowlist (fonts-allowlist.txt) with one dated line, and register row 49 now says what exists.
4. **The AGENTS.md budget — for a ruling.** The only recorded budget is 5,120 B (S326, INC-735). AGENTS.md holds 9,409 B after its LOVABLE block, and the no-agents-change flag closes the file. AGL-2's line holds today's count, so any change goes stale, until 2026-12-31. The check-brief roadmap line is ticked, while concern 5(c)'s "stays under its size budget" holds only through this line. The question for the ruling: which budget is in force.
5. **LR-C1's reading of INC-929 — for a ruling.**
   - The rule as built: a region drawn always, whose words come under a condition, carries no role while it is quiet. Words count as conditional behind `?:`, `&&`, `||` or `??`.
   - A role passes only in the form `role={c ? role : undefined}`, under the same condition `c` that draws the words. That is AMSG-2's and S446's form for ActionMessage.
   - So spinner.tsx :30 and impersonation-banner.tsx :24 pass: they are drawn always with a role, but with their words.
   - A region whose words are an unconditional `{message}` that may be empty passes too. So does a region handed over as a prop's value (DataTable's `loadingState`), with no allowlist line.
   - History: Part D's first cut flagged ActionMessage and allowlisted it. Part E corrected the census (Part D's commit title still says "one recorded exception, ActionMessage"). The first review then tightened the role and `??` rules (`494b6f9b`).
6. **CF-BC-1's reach.** It reads e2e/ and src/'s non-test code, not src/ tests or scripts/. src/lib/env-flags.test.ts names the hook in its own census, and the helper's unit test sets a fake client. The brief's "no `__ethioSupabase` outside" the two homes is read that way.
7. **CF-LANG-2's planted tree** moved from scripts/conformance/.lang-planted to node_modules/.cache/lang-planted. That was PPF-1's one real finding, inside SCOPE.
8. **The ML-U12 duplicate** that TI-6's widened pattern exposed: renamed ML-U23 (§5). The concern 5(b) census refuses it.
9. **auth-signout.spec.ts** moved onto the helper after the second review. Its own Window declaration had to go so the helper could declare the client once.
10. **Colour ids:** EC-1…6, not EC-1…5. The brief said to read the file for the ids.
11. **INC-967** was inserted with the editing tool, because the shell guard refused the inline copy. The inserted block's sha256 equals the brief's own block extracted by awk: f109a9e8…0456 for both.
12. **Changelog:** the line carries the SAH-3 record correction as its own later word, so the turn keeps one line.
13. **The end-to-end red, AU-3 at desktop.** Its stack is in e2e/helpers/ui.ts :1062 (`stepUpIfPrompted`, code unchanged) and admin-users.spec.ts :273 (AU-3, unchanged). Its cause is the auth server's `mfa_ip_address_mismatch`: the browser's challenge and verify left the sandbox through different egress addresses. AU-3 does not call the one function this turn changed in that file, and it passed at mobile-360. It is named here and in §12 rather than as a STOP, because the cause is explained at its root and is not this turn's code. CI judges.
14. **Review findings left as they are, for a ruling:**
    - New `as unknown as` casts on the fakes in src/test/e2e-browser-client.test.ts :50 and :58. The precedent is src/test/e2e-route-guard.test.ts :31, and no guard covers the form.
    - PPF-1's removal check counts any `rmSync` in the test or its hooks, not the written path. It reads `*Sync` writes only.
    - The brief's agents-line rule (a mechanism landed with its AGENTS.md line) stays the supervisor's check on the brief.
15. **Process.**
    - The reviewer was asked to run in the foreground three times; the harness ran it in the background each time, and the turn waited for each answer.
    - Runs: e478d26 → READY · 0 BLOCKER · 2 MAJOR · 6 MINOR; 494b6f9 → READY · 0 BLOCKER · 3 MAJOR · 8 MINOR; 63db55b → the line in the header.
    - Fixed between them: one Window declaration and no cast in the helper; LR-C1's `??` and conditional-role rules; CF-FT's family-beside-the-token gap; TI-6's lettered numbers with ML-U12; auth-signout moved.
    - The rest is listed above (2–6, 14) and in §3 and §5.

## 11. CI

`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`, after `git fetch origin ci-evidence`:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `4907c2b8356da048455b61812dae3e9cdd25b465` (short `4907c2b`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-28T18:04:12Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40738433855
```

Two-step check: the conclusion is SUCCESS, and the reported commit equals BASE = `git rev-parse origin/dev` (4907c2b8…). This landing's run has not completed.

## 12. Limits

- **AU-3 at desktop-1280** failed locally on `mfa_ip_address_mismatch`, an egress fault in this sandbox. CI's run on the landing judges it.
- **Specs not re-run after the review commits:** the three translations/users specs (§5).
- **No repeat runs** (DEC-184). CI's repeat lane will select nearly every spec, because ui.ts and posting.ts changed (INC-967), and repeats what its 720 s cap carries.
- **Bundle:**
  - `bun run build` passed and `node scripts/check-bundle-size.mjs` printed "Bundle budget OK." on e478d26c.
  - That build was compared with one using BASE's copy of lovable-error-reporting.ts, the only product file this turn changed. No page grew: /admin, /admin/legal_/edit, /admin/roles, /admin/users, /auth, /auth_/reset and /my-listings are 0.1 KiB smaller, the rest equal.
  - The later commits change no product file.
- **The static censuses are heuristics** over source text and syntax trees:
  - LR-C1 cannot see a caller that mounts a region conditionally;
  - PPF-1 reads only scripts/conformance/;
  - AGL-1 checks that a named file exists, not that the line's claim is true;
  - TI-1 reads titles that open with an id.
