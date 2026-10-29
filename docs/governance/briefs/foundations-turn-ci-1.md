# Foundations turn CI-1 — brief (the text as sent, restored by records turn R7; sha256 b029314a873ba0392cef6a6f18de2e040e96ac5890d5ff5f0a7d0261578ae3a6)

````text
D239-1 VERIFIED (dev a7c3639c, fresh clone): the account rule in src/i18n/provider.tsx is the one place (a published code switches the device with no account write; an account with none takes the device's published language; unpublished ignored and kept; a failed read keeps the device, one named line; the latch blocks a token refresh); the storage listener with the shape and gate checks; fetchPreferredLanguage on a typed read; U4h's comments rewritten; LANG-D239-U1…U8 and D239-E1…E6 green; CF-LANG-1's two refusals fixed by passing the record name as a value, the guard unchanged. RULED: the ?lang= departure is ACCEPTED (a link's language is a view, never a choice). The post-sign-in flash (one sample in four, about 184 ms) is a roadmap line: "hold the sign-in redirect for the account rule's answer, under a short deadline — a sign-in flow change, its own plan and DEC". The report's path is excluded from formatting by .prettierignore (ratified records) — accepted. CLEAN pending CI.

FOUNDATIONS — TURN CI-1: CI GREEN AND KEPT GREEN — THE OPEN REDS FIRST, THEN ONE LOCAL CHECK THAT RUNS WHAT CI RUNS (2026-10-29; G0, G60). Base: dev a7c3639c. Tier B (CI tooling and two admin screens). Lovable.

WHY (the operator, 29 Oct 08:28 New York: "please work with lovable to once and for all fix [CI]"): today's reds were almost all guards that run without a database — the i18n map (INC-982), gitleaks (INC-983), the migration linter, the acceptance-doors list (INC-993), the string scan (INC-994) and the first-paint budget (six times). Each was caught by CI 25 minutes after the push, and each cost a turn. Every one of them can run in your sandbox before the push.

STEP 0: save this message as docs/governance/briefs/foundations-turn-ci-1.md, by scripted copy, in one fenced block, and set roadmap line 3 to name it. Roadmap: add INC-994, INC-995 and INC-996 (open; fixed in CI-1), the D239 flash line above, and a line for Part B (`bun run checks`, built after its plan).

PART A — THE OPEN REDS AND THE WALK FINDING, FIRST (build now)
A1. CI FIRST: the newest completed run, 3b572f22 (D239 mid-turn), is FAILURE on: component tests (CF-LANG-1 — your a7c3639c fixes it), the hardcoded-string scan (A3), the first-paint budget (A4), and lanes 4 and 12 (A2); 2,412 passed, 4 failed. Read the run on a7c3639c when it lands, and fix any other red first.
A2. INC-996 (registered 13:2xZ) — D239 changed the language contract, and two existing specs were not in the turn's owed-test census. The run on 3b572f22 is red in lanes 4 and 12, both projects, 4 failures, all in e2e/i18n-coverage.spec.ts:
   - "the admin shell renders no English fallback" (:237 expects html lang "am" and receives "en");
   - "the roles permission matrix renders no raw English vocabulary".
   useAmharic (e2e/i18n-coverage.spec.ts :88–:99) writes only the device's current-language record and then signs in. Under D239, the signed-in account's published language now decides at session start, so the page is English. The behaviour is the decided one, and the tests' setup is what is now wrong.
   Fix the setup, not the assertions: a signed-in test that needs a language sets the ACCOUNT's language (through the language menu's pick, which writes both, or the service client on the test's own account, restored in afterEach), never only the device.
   Census by definition: every spec and helper that sets the language by device storage or cookie and then signs in or runs signed in (useAmharic, resetLanguageBaseline, ui.ts :967–:990 and :1231–:1238, and any other). Fix each one, or name it with why it is safe.
   The class: a contract change's owed tests are found by what exercises the contract, not by the files the turn touched. The selector picks specs by the files a turn changes, and i18n-coverage.spec.ts imports nothing D239 changed. Add one line to the e2e harness doc's authoring laws (docs/features/e2e-harness.md): after a change to a shared contract (the language rule, the session, the shell), the owed-test census greps the specs for the contract's observable effects (here: html lang, the language records, preferred_language).
   Run e2e/i18n-coverage.spec.ts and every census hit whole, both projects, 0 retries.
A3. INC-994 — the hardcoded-string scan refused src/features/admin-screening/name-checks.test.tsx :45 and :77: the fixture `of: "<b>Coca-Cola</b>"` reads as JSX text (">Coca-Cola</"). Fix: the plain-text proof uses a payload with no closing tag, `<img src=x onerror=alert(1)>`. Assert that the literal text is shown and that no img element exists in the section — a stronger proof, not a weaker one. Also: guards-last-failure.md showed only the scan's FAIL line, not its findings, so the reporter (or the scan's own output) must carry the finding lines into the evidence. Prove it with the reporter's fixture.
A4. FIRST-PAINT BUDGET, run on 9b8a8cdc:
   - /admin/screening 378.2/377 — the held-names section, the job line and the 37 admin strings;
   - /admin/roles_/$roleId 306.4/306 and /admin/translations 409.8/409 — the admin string layer's 37 keys;
   - /my-listings_/$listingId 316.0/316 — N1b-2c's notice on my listing page.
   Each is above G60's 0.1 KiB tolerance with its cause named, so RULED, accepted: raise each line to its measured value rounded up to the next whole KiB (379, 307, 410, 317), with the cause in the comment and the commit. If your build (and D239's changes) measures any other page over, name it with its cause the same way, and STOP only for a page whose growth you cannot explain.
A5. INC-995 — the operator's walk of N1b-3 (29 Oct 08:27 New York):
   - The "Seller-name re-check" line sits at the top of Admin › Screening, not with the held-names section.
   - "The name is allowed…" shows above the listings table, not by the seller-names table.
   The cause: screening-page.tsx routes every section's outcome (PhotoReviews, NameChecks, PhotoChanges, the job line; onNotice ×4) into ONE page-level ActionMessage above the listings table (:481). INC-570's mechanism places a message beside the control that produced it (src/components/ui/action-message.tsx :6–:10).
   Fix:
   - each section hosts its own ActionMessage beside its own table; the page-level one keeps the listings table's outcomes;
   - the job line moves into the NameChecks section, above its table.
   Census by definition: every ActionMessage in src/ that receives an outcome from a section other than the one it sits beside, file:line. Cover each one here, or list it with its INC.
   Guard: a conformance check that fails when a component passes an onNotice-style callback to a sibling section, or the census as a unit test — design it in the report. Prove it on the planted current shape.

PART B — `bun run checks`: ONE LOCAL RUN OF EVERY CI JOB THAT NEEDS NO DATABASE OR BROWSER (plan it in this turn's report; build it after my ruling)
THE SYSTEM (G0)
CONCERN: a guard that CI runs must have run, and passed, before a turn ends.
MECHANISM: NONE YET — one script (scripts/ci/turn-checks.sh, run as `bun run checks`) that runs, in CI's order, every check in .github/workflows/ci.yml that needs neither the temporary backend nor a browser:
- the shell-pipes guard;
- the guard self-tests (acceptance doors, caller gates, outbound calls);
- actionlint, pinned, when it can be fetched;
- typecheck, then format:check, then lint;
- the e2e selector self-test;
- the production build, followed by the bundle report and the first-paint budget check;
- the component tests;
- gitleaks, pinned, over origin/main..HEAD, when it can be fetched;
- the migration linter with its self-tests;
- the i18n map freshness check;
- the hardcoded-string scan;
- the import gate, the listing-write seam, the browse-path guard and the marketplace weight guard, each with its self-test;
- semgrep, if its pinned version installs.
It prints one line per check — PASS, FAIL or NOT RUN (with the reason; never PASS for a check that did not run) — and a last line "checks: N passed, M failed, K not run".
CONFORMANCE GUARD: a unit test reads ci.yml and fails when a CI step that needs no backend or browser is missing from the script. The jobs that need them (the lanes, the staging preflight, the merged report, the promote) and the jobs the sandbox cannot run (the dependency audit — its advisory service is unreachable, §9; the SARIF upload) are allowlist lines with a reason. Prove it on a planted step.
THE BUDGET'S NEAR BAND: your build can differ from CI's by about 0.1 KiB. The script reports every page within 0.3 KiB of its line as NEAR, with the turn's growth for that page. A NEAR page that grew in this turn is raised in the same turn with its cause (G60), never left to CI.
THE RULE THAT USES IT: AGENTS.md's checks before a turn ends become "run `bun run checks`; every FAIL is fixed before you push; every NOT RUN is named in the report; the report pastes the last line". It replaces the separate eslint / format / unit / i18n:usage lines there, which become the script's steps.
THE PLAN (in this turn's report; build nothing for Part B now):
1. Every CI step: covered, or allowlisted with its reason.
2. Which steps your sandbox can run, and which cannot, with the reason.
3. The time the whole script takes in your sandbox (an ESTIMATE until measured).
4. The tests, ids grep-checked free.
5. Every conflict with Knowledge v3.11, AGENTS.md or the platform.
6. Sizing.

FIVE LENSES:
- Security: gitleaks and the guards run before the push, not after; no secret printed.
- Performance: the script's run time is measured and reported, and a turn's push waits for it.
- Failure modes: a check that cannot run says NOT RUN with its reason, never PASS.
- Consistency: one script, mirrored to CI by its own guard.
- Future growth: a new CI guard joins the script, or the guard refuses the push.

HOW TO WORK: CI FIRST; K1–K6; the whole unit suite; the i18n maps when src/ files move; no weakened proof; each touched spec file run whole, both projects, 0 retries. Push, and END THE TURN with the report: the CI line first; A1–A5 each done or not, with the censuses for A2 and A5; Part B's plan; the unit count; the K2 list; and the files from git diff --name-only a7c3639c.
````
