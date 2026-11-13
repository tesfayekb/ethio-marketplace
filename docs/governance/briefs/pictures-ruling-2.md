RULING — pictures, stop 2: the merged report's lane list, the WebKit lane's certificate, the three tests, and the first WebKit run. Base: cursor/pictures ea41af488.

Both questions are answered below. The stop's own push gave the lane its first CI run (43319295611), which the supervisor read: the `webkit` lane passed 14, failed 38 and had 2 flaky (`docs/tracking/branches/cursor/pictures/local-backend-proof.md` on ci-evidence); E2E is red, and the merged `e2e-last-failure.md` names no failing test — Question 1's gap, live. Nearly all 38 come from the lane's environment, not from the pictures (item 2). Build Part E below, then STEPS 6 → 8; the brief is not rebuilt. Save this ruling by scripted copy as `docs/governance/briefs/pictures-ruling-2.md`, BARE (no header, no fence: the file's sha256 equals the operator's line), in Part E's first commit, and name it in §10.

PREVENTION (G70). Root causes, as classes:
(1) A lane added to the matrix and missed by a list that reads lanes — the second occurrence (INC-966: `repeat`; now `webkit`, INC-1124). The matrix in `local-backend-proof.yml` is the one list, and the guard lands this turn: CF-CID-10 checks every reader against it (item 1).
(2) A new engine's environment proven on a different backend from the lane's. The census ran WebKit against ethio-staging, which has real certificates. The lane runs against a temporary backend whose certificate comes from an authority made for the run, trusted by Chromium through the NSS database (`local-backend-proof.yml` :378 → :382) and by Node through `NODE_EXTRA_CA_CERTS` (:383), and never by WebKit (INC-1125). The supervisor's ruling 1 put WebKit in a lane without naming that fact (S597, the supervisor's record). Guard: EBG-6 (item 2). Template line (records turn): a GO that adds a browser or a lane names each environment fact the lane relies on (certificate trust, fonts, locale), and the census proves each for the new engine on the lane's own backend, or says it cannot and names the first CI run as the proof.
(3) Two mechanisms built on a Chromium behaviour. The dialog reads its opener from `document.activeElement` (`dialog.tsx` :113 → :115), but Safari does not focus a button on a click (INC-1126). The stale-chunk handler reloads the page on any failed download (`stale-chunk.ts` :57 → :69). HYPOTHESIS: WebKit fails the downloads a page abandons when it navigates away, and the handler reloads "/" over the navigation (INC-1127). Class: a browser behaviour a mechanism relies on is proven in every engine we support. The WebKit lane is that proof from now on; the fixes are at the two mechanisms (items 4 and 5).
(4) A ruling saved in the brief's wrapper. Ruling 1 was saved with a header and a fence; its inner text is exact. Every earlier ruling is bare, so one kind of file now has two forms. Guard: CF-BRIEF-17 (item 7).
Repository: CF-CID-10, EBG-6, CF-BRIEF-17, the template line. Instructions: v1.18 — G60's census clause gains "on the lane's own backend". Cursor rules: rules turn 4 — rule 40: a new browser project's census runs on the local backend where the machine can (db:proof's stack); otherwise the report names CI's first run as its proof. Knowledge: not needed. Stops this turn: 2.

1. Q1 — (a) YES, and the class with it. SCOPE gains `.github/workflows/ci.yml` for the one token on :682 (`smoke,email,webkit,1,…,16,repeat?`) and nothing else in that file. With it comes CF-CID-10 (free; CF-CID-1 → 9 are taken):
   - The lane matrix of `local-backend-proof.yml` (:146 → :169) is the one list.
   - Every list that reads lanes equals it, in order: the summary's `lanes = [...]` (:1097), its evidence pattern (:1101), the lane reporter's `E2E_EXPECTED_SOURCES` (:1073) and the merged report's in `ci.yml` (:682). The two reporters write the repeat lane as `repeat?`.
   - A planted lane missing from each of the four is a finding (four planted cases).
   RPL-2's anchor stays as it is. The rule goes in the conformance file that already reads both workflows (the plan names it). INC-1124.

2. The first WebKit run (43319295611): the lane's certificate. Grounded:
   - AP-56's body reads "never loaded — natural 0×0" for every photo at `https://127.0.0.1:31321/storage/…`.
   - The lane's evidence carries "Failed to preconnect to https://127.0.0.1:31321/. Error: Unacceptable TLS certificate" 28 times.
   - The run's authority is trusted only through the NSS database and `NODE_EXTRA_CA_CERTS`.
   Fix: in `playwright.config.ts` the two WebKit projects set `ignoreHTTPSErrors: true` ONLY when the target is the temporary backend (`E2E_LOCAL_BACKEND` = "1"). A comment names INC-1125 and the reason: the backend's certificate is signed by an authority made for the run, and Chromium keeps verifying it through the NSS database, so the chain stays proven in every run; WebKit's tests are about pictures and Safari behaviour, never certificates.
   Why not the system trust store: WebKit's trust of a custom authority on Linux is not reliable across Playwright builds (microsoft/playwright issue 28967), and a second CI round to find out costs more than it proves.
   EBG-6 (free; EBG-1 → 5 are taken): `ignoreHTTPSErrors` appears only on the WebKit projects and only under the local-backend condition. A planted Chromium project with it, and a planted WebKit project with it set unconditionally, are findings. DEC-371's amendment line records it (item 9).

3. Q2 — the three tests. Each comes back into the set when its cause is fixed, by these rules:
   (a) SCS-1 comes back in, fixed in the test. The edge colour is read through `e2e/helpers/colors.ts` and compared as numbers (lightness, chroma, hue) at the token's own precision, 0.001. The token is `0.417 0.02 167.6` and WebKit writes `167.600006`: that is the engine's spelling of a float, not a different colour. The other assertions stay unchanged.
   (b) DLG-E8 comes back in, fixed at the mechanism (item 4).
   (c) STG-1 comes back in when item 5's probe confirms the cause and its fix lands; otherwise it stays out, and INC-1127 carries the evidence.

4. INC-1126 — the dialog's opener in Safari. SCOPE gains `src/components/ui/dialog.tsx` and a unit test beside it (`dialog-opener.test.tsx`, or the plan's name).
   Law:
   - The opener is the element that held the focus when the panel opened. Where the browser left the focus on the page after a click (Safari), it is the control the opening press landed on.
   - A press is used by one opening only, and only by a panel opened within the same gesture (before the next press or key).
   - Keyboard openings are unchanged.
   - The press record holds no element after the opening (no leak).
   Proof:
   - The unit test: focus on the page plus a recorded press → the focus returns to that control; a keyboard opening → unchanged; a stale press → not used.
   - DLG-E8 in WebKit.
   Census (K2, nothing touched): every other place that records who held the focus in order to give it back — `wizard.tsx` :1286, `app-rail.tsx` :1149, and any other the census finds by that definition — each named with whether it has the same Safari gap.

5. INC-1127 — the stale-chunk reload over a navigation (HYPOTHESIS).
   First, the decisive probe, in WebKit on staging or the local stack: load "/", start `page.goto("/settings")` at once, then read sessionStorage's `ethio:stale-chunk-reloaded-at` (`STALE_CHUNK_KEY`, `stale-chunk.ts` :25). If it is set, the handler reloaded the page over the navigation.
   CONFIRMED → SCOPE gains `src/lib/stale-chunk.ts` and `src/lib/stale-chunk.test.ts`.
   - Law: a download the page abandons because it is leaving never reloads it, in any engine. A stale chunk still reloads once (INC-640, INC-922 and DEC-271 unchanged). No `unload` listener, because it disables the back-forward cache.
   - The form is the plan's choice, named in the report with its reason. Either a leaving mark (pagehide or beforeunload) checked before the reload, or a check that the failed chunk is really gone (a 404, or an answer that is not JavaScript, such as an HTML fallback page).
   - Each branch is unit-tested: stale → reload; leaving → none; offline → none; second failure → none.
   - Proof: STG-1, LY-3 and LY-4 green in WebKit, and `e2e/on-demand-failure.spec.ts` green in Chromium.
   NOT CONFIRMED → no change. STG-1 stays out, §13 carries the probe's result and the failure body, and INC-1127 stays OPEN with them.

6. The run's other failures, by rule, so there is no further stop. After the push carrying items 1–5, read the lane's run. Each WebKit failure still red falls in one of four kinds:
   (a) A picture fault → fixed; that is this turn's job.
   (b) A test that reads an engine's spelling or event order (a float, a focus on click) → the test reads it engine-neutral, never with a looser expectation of the product.
   (c) A behaviour a Safari visitor meets → fixed at its mechanism when that is one module with its unit test (as in items 4 and 5). Otherwise the tag comes off, and it is a §13 finding with its evidence; the supervisor numbers it at verification.
   (d) No cause found after reading its body and its server log → the tag comes off; a §13 finding.
   All of these go in ONE code commit after the first run, and that commit's run is the judged run.
   The lane's time: report its seconds on the judged run. If it is slower than the slowest Chromium lane by more than 300 s, name it under Limits with its ten slowest tests; that is not a stop. On this run, `webkit` took 2,261 s against 1,330 s for the slowest Chromium lane, and most of the gap is the 60 s and 120 s timeouts behind the certificate failures.
   Any first-download growth from items 4 and 5 is listed chunk by chunk with its cause (DEC-355), and a ceiling in `scripts/route-budgets.mjs` is raised only by that named cause.

7. Saving rulings. Ruling 1's saved copy carries the brief's wrapper (a header and a fence); its inner text is exact (sha256 9e83316ad7d42674a18339a2784496dd8c35c8560b169dc56c241b302e57d650). Rulings are saved bare, as every earlier one was (for example `housekeeping-4-ruling-1.md` on dev).
   - Part E's first commit restores `docs/governance/briefs/pictures-ruling-1.md` as the bare copy, so its file's sha256 equals that line, and saves this ruling bare.
   - CF-BRIEF-17 (free): every `docs/governance/briefs/*-ruling-<n>.md` begins with "RULING — " on its first line; a planted wrapped ruling is a finding.
   - SCOPE gains the GO checker's law file and its test, as CF-BRIEF-16's did (the plan names them).

8. Also in the report:
   - Under Limits: CF-REDACT-1's one failure under the concurrent build, with its failure message. The supervisor ledgers it; a second occurrence within seven days is an INC.
   - Under Departures: the direct `playwright test --list` run, as you wrote it.

9. RECORDS (word for word into §14; the executor fills the brackets):
   INC-1124 — the merged E2E report in `ci.yml` (:682) did not list the `webkit` lane, so a red WebKit lane turned E2E red while `e2e-last-failure.md` named no failing test, and a WebKit test that passed on retry never reached the flake ledger (run 43319295611); the second lane missed by a list that reads lanes (INC-966: `repeat`); fix: the token, and CF-CID-10 — the lane matrix is the one list, and every reader equals it; the pictures turn; FIXED [commit].
   INC-1125 — the `webkit` lane's browser did not trust the temporary backend's certificate (an authority made for the run, trusted through the NSS database and `NODE_EXTRA_CA_CERTS` only), so every photo, and the calls behind the sign-in and read timeouts, failed at `https://127.0.0.1:31321`: 14 passed, 38 failed and 2 flaky on the lane's first run (43319295611); the census had run WebKit against ethio-staging; fix: `ignoreHTTPSErrors` on the two WebKit projects for the temporary backend only, EBG-6; the pictures turn; FIXED [commit; the judged run's `webkit` line].
   INC-1126 — in Safari a click does not focus a button, so a screen-sized dialog opened by a click (the photo viewer) recorded the page as its opener and gave the focus to the page on close (`dialog.tsx` :113 → :115; DLG-E8 in WebKit); fix: the opener falls back to the control the opening press landed on; the pictures turn; FIXED [commit]; K2: [the census's list].
   INC-1127 — HYPOTHESIS: in WebKit the downloads a page abandons when it navigates away fail as errors, and the stale-chunk handler (`stale-chunk.ts` :57 → :69) reloads the page over the navigation ("Navigation to "/settings" is interrupted by another navigation to "/"" — STG-1 on staging; LY-1, LY-3, LY-4, PP-12 and PW-3 in the lane's first run); probe: [result]; fix: [the form] / OPEN with the evidence; the pictures turn.
   DEC-371 amendment — the WebKit lane runs against the temporary backend with `ignoreHTTPSErrors` on its two projects only (INC-1125; EBG-6); the WebKit set is the `@webkit`-tagged tests: [n] per project on the judged run, [the tests that left it, each with its finding].
   Register: the CI-lanes row gains CF-CID-10; the browser-guard row gains EBG-6; the briefs row gains CF-BRIEF-17. The changelog line gains "; the merged report reads the webkit lane; WebKit trusts the temporary backend's certificate; a dialog opened by a click in Safari gives the focus back[; a download abandoned by leaving the page no longer reloads it]".

10. ORDER AND PUSHES.
    - Part E, one commit each: E1 (ruling 1 bare, this ruling saved, CF-BRIEF-17); E2 (the `ci.yml` token and CF-CID-10); E3 (EBG-6 and the WebKit projects' option); E4 (SCS-1); E5 (the dialog's opener); E6 (the stale-chunk fix, after the probe, or nothing).
    - Then STEP 6's checks on the final tree: the changed specs whole in Chromium; the WebKit set whole in WebKit; `bun run checks`; `check-go --at 50783a30e`.
    - ONE push, then read its run.
    - Item 6's one commit if WebKit is still red, and ONE push.
    - Then STEP 8 and the report (a docs-only push).
    A stop is only for a security finding or a file this ruling does not name.
