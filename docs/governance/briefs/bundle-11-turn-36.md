# Bundle 11 — turn C8: the posting-area turn's evidence first (DEC-175), the first-paint guard by the entry's import closure (INC-556, DEC-176), Settings answering beside each control (INC-570), and the lease check's run time (INC-571): brief, version 3 (saved unchanged, 2026-10-12)

```text
BUNDLE 11 — TURN C8 (2026-10-12). ONE TURN, NO MIGRATION. No new strings. No package change.
Version 3. It replaces versions 1 and 2; you saved neither. Version 2 added INC-571. Version 3 removes the typecheck and the build from your checks, because of your platform's rule, which you quoted: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." CI's jobs judge them ("Build, typecheck, lint" and "First-paint bundle budget").
Base: dev 3a26255f, the commit that applied the records turn's carrier (RECORDS-2026-10-12-bundle11.md); the census below proves every file by content. This file is public: it is written as build instructions. Tier B: the Settings page's messages and two admin pages' notices, a new display block, the e2e fixture and one helper, the bundle-budget guard, the tests and the docs. No door, no database change.

ANSWERS TO THE LAST TURN
- The records turn: verified. Dev 3a26255f equals the supervisor's build byte for byte (the nine paths). Your typecheck was not run under your platform's rule; CI judges it.
- Turn C6: verified. Dev 6a9b0dda holds the delivered tree, the brief as sent and the migration as delivered, with its mark 20261012180000 chosen at apply time. Its CI (run 38235379780): every E2E source passed, TR-29 and VP-11 included, with no flaky test. One job failed: the component tests, on EL-4's 5 s timeout. That is INC-571, fixed in this turn.

WHY THIS TURN
- INC-562's class (INC-430, INC-449, INC-533, INC-562 — a posting step's Next does not advance, or a save does not reach the draft) has been read four times without the answer that refused it. The fixture's client-error capture names page errors, console errors and every 5xx, never a 4xx or a door's `ok: false`. The posting-area turn's fix is written from the first failure the new capture explains (DEC-175).
- INC-556: the first-paint budget guard (scripts/check-bundle-size.mjs) counts only the chunks whose file name starts with client, entry, index, main or styles (the build emits no HTML). At this base it reads 231.0 KiB while the entry chunk's static import closure is 309.6 KiB, and its figure moved by 57 KiB whenever the bundler named a shared chunk "client-…" (DEC-176).
- INC-570 (the operator's walk of turn C4, on a phone): Change password "doesnt do anything, doesnt give alert". Settings draws every action's refusal or confirmation once, under the page header, several screens above the form at 360, so a press looks like nothing happened. The checks themselves run: S-3 proves them on staging, but it asserts `toBeVisible()`, which is true off-screen. The same class in the admin Listings list and Screening: a row's outcome is drawn above the table, while the row can sit far below.
- INC-571 (CI on 6a9b0dda, the component-test job): EL-4 "Test timed out in 5000ms". It parses the whole e2e tree (about ninety files, 2.3 MB) with the TypeScript parser, and it did so twice: once for `counts`, and again inside `check`. About 2.6 s alone on the supervisor's copy, and past 5 s on CI's runner, which runs every test file at once.

WHAT THIS TURN BUILDS
- DEC-175 — refusals in the failure report:
  - e2e/fixtures.ts — `armRefusalCapture`. It records every 4xx answer of the app's own routes (`/api/…`) and of the database and sign-in services (`/auth/v1/…`, `/rest/v1/…`, `/functions/v1/…`): method, path, status and the body's first 200 characters, never the query. It also records a 200 from a posting door (`/api/listings/draft`, `/identity`, `/publish`) that says `ok: false`, with its refusals. It is kept apart from the client errors (the last twelve) and printed as `[client-error]` lines only when the test fails.
  - e2e/helpers/posting.ts — `nextToStep` names the identity save's answer too (the contact step's Next waits on it): "Saves (draft, identity): …".
- DEC-176 (INC-556):
  - scripts/bundle-closure.mjs (NEW) — `staticImportsOf`, `staticClosure`, `entryChunks`.
  - scripts/bundle-closure.test.ts (NEW) — BC-1..BC-4 on planted chunks.
  - scripts/check-bundle-size.mjs — JS is the entry chunk's static import closure (309.6 KiB at this base); CSS keeps the name rule; finding no entry chunk fails the guard. The ceiling stays 320 KiB.
- INC-570 — an action's outcome is seen where it was taken:
  - src/components/ui/action-message.tsx (NEW) — `ActionMessage`, one live region for one action's outcome:
    - `tone` is error or done; the role is alert or status by tone, unless the caller names one;
    - it is placed beside its control, and whenever its text appears or changes it scrolls itself into view with `block: "nearest"` (smooth unless reduced motion is asked for);
    - its scroll margins keep it clear of the fixed top band and the phone's bottom bar;
    - without text it renders nothing, unless `persistent`.
  - src/routes/settings.tsx — the message under the page header is removed; each action answers in its own place:
    - the sign-in methods' actions (Unlink, Link Google's refusal, Remove password's success): at the end of that section;
    - Remove password's refusal: inside its confirmation, above "Yes, remove";
    - Change password and Change email: inside their forms, above their buttons;
    - Sign out other devices: under its button.
    - Test ids: `settings-message-<slot>`, `remove-password-confirmation`, `settings-devices`.
  - src/features/admin-listings/listings-page.tsx (`listings-notice`) and src/features/admin-screening/screening-page.tsx (`admin-screening-notice`, persistent) draw their notice through `ActionMessage`. The test ids, the role (status) and the colours are unchanged.
- INC-571:
  - scripts/e2e-leases.ts — `overLimit(all)` judges counts already made; `check(sources)` is `overLimit(counts(sources))`, unchanged for its callers.
  - scripts/e2e-leases.test.ts — EL-4 parses the tree once (`counts`, then `overLimit` on the same counts) and carries a 20 s limit, its cause written beside it (about 2 s alone after the change). EL-1..EL-3 unchanged.
- The usage maps (docs/generated/i18n-usage.json, public/i18n-usage.json): regenerated by the map guard (one more file scanned, one dynamic call site fewer); no key moves.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- DEC-175, with its JUDGE frozen before the numbers: evidence only. It is kept unless, over the next five completed runs, it costs a source of the failure report (the reporter's own crash) or a job log past its limit; either reverts it.
- DEC-176: the guard measures the entry's static import closure. The 320 KiB ceiling stays until the operator decides it again (G52).
- INC-570: each outcome beside its control; a message brings itself into view when it appears, so the admin pages scroll up to their notice after a row's move. No toast: none is mounted in this app.
- The new ids: AMSG-1..AMSG-3, SETM-1..SETM-4, BC-1..BC-4.
- INC-571: EL-4's 20 s limit has a named cause (it parses the whole e2e tree); the parse is also halved. Nothing it asserts is loosened.

TESTS
- Unit (all NEW):
  - AMSG-1..AMSG-3 (src/components/ui/action-message.test.tsx).
  - SETM-1..SETM-4 (src/test/settings-messages.test.tsx): each outcome inside its own form or block. SETM-1 and SETM-2 fail on the base.
  - BC-1..BC-4 (scripts/bundle-closure.test.ts).
- Unit, changed: EL-4 (scripts/e2e-leases.test.ts) — one parse, the same three assertions, a 20 s limit (INC-571).
- E2E: S-3 (e2e/settings.spec.ts) finds every outcome inside the Change password form and on screen (`toBeInViewport()`), with one alert on the page. Nothing is loosened.
- Not edited: every other test. The admin notices keep their test ids, role and text, so the AL and SC tests are unchanged.

DOCS
- e2e-harness.md (DEC-175 and its judge; EL-4's run time, INC-571), design-foundation.md (DEC-176), display-primitives.md (`ActionMessage`), settings-surface.md (each outcome beside its control), the changelog, the roadmap (line 3; the C8 line; INC-556 ticked; the ceiling decision open).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, the records turn applied)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 709 unit tests (120 files), the usage maps (rewritten once, then they match), the hardcoded-string scan, the import, listing-write, browse and marketplace guards, the root-route check, the selector self-test, the identity-tag guard and the build.
- The bundle budget: "JS: 309.6 KiB / 320 KiB — ok", "CSS: 18.6 KiB / 40 KiB — ok". Semgrep over the changed files: 0.
- EL-4 alone: 2.6 s on the base, 1.9 s after the change.
- SETM-1 and SETM-2 on the base: red ("Unable to find an accessible element with the role alert" inside the password form; no status inside the email form); green after.
- DEC-175's capture in a planted Playwright test against a local page: a failing test printed its 4xx and `ok: false` lines; a passing control printed none.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-36.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name the records turn's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the usage maps, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- No migration this turn: nothing is written to either database.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 22 paths in the hashes table and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-36.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 15 files → each equal to:
  aed41911ea4a2f7a344c6c8c43ca5033a5ffbe8ae6ee6ce2566419f531c237c8  docs/_changelog.md
  bee5c8ae3b80ded594e81a1ed0dfd64fd0874fb5df3d529a9a582565b2069ffa  docs/features/design-foundation.md
  9a4f9401ee1e5f6d6ed8d99005964b8c2df2b2f33fa3b7acdc617ba781e35afc  docs/features/display-primitives.md
  e71e25cfebb078b6a93878f439168495cba0a0ce18004c8c15695f985dd389e8  docs/features/e2e-harness.md
  621ba56b03b0b0f8e3571750146fa46dfdeac827ec36b65c2560c945173426d8  docs/features/settings-surface.md
  4985041b053f1846f5b3d26307933bd3db3bbaaf3138869d84b71d943a88109a  e2e/fixtures.ts
  a797ab5cc7461d160a00d6f49a06d1f3fc471eeb43bceda3f881b0752579b8bc  e2e/helpers/posting.ts
  1751da5d02fdf51ad6e7488eb7b69f8b786d2af2ca7a0799c82139059507874f  e2e/settings.spec.ts
  7cb00e026cf71e15cb203cbad518dcd8f0ca191b06e0563edcf06387bb057a82  roadmap.md
  96e09f9f49145b8e91d4d224113cd42fbe0dc0a4c9e2a737d26a8a0431ef1976  scripts/check-bundle-size.mjs
  a3263b8475522443c2b44ae8a5b210fe86f8d7dbbaa2db05f8dae56d77fa4d22  scripts/e2e-leases.test.ts
  c3e1d323ce4ece6ad297e370a841782bdecc5d55e85920f27be561a422495c8c  scripts/e2e-leases.ts
  94ce0e16334045e8db5954c67cbd43ebcbfe1f8b7be57bc03c11c5de5fff2ea9  src/features/admin-listings/listings-page.tsx
  6d5650d827213381f7c15a39a4c2e50fcd756dabf7b7704489d56cf7be84d7d2  src/features/admin-screening/screening-page.tsx
  5c13c65a0f8bcb8242eb0624f7d3e9e88b4eaf586d1246c3441a6c479b5f7c33  src/routes/settings.tsx
- (c) `ls scripts/bundle-closure.mjs scripts/bundle-closure.test.ts src/components/ui/action-message.test.tsx src/components/ui/action-message.tsx src/test/settings-messages.test.tsx` → "No such file or directory" for each.

THE CARRIER — C8-TURN-CARRIER-2026-10-12.md (39,962 bytes; sha256 deca0ce1800c073084f9289e872942d0bf5cc7e71c9bae9491096adbb4f647a9; 69 sections)
- Its first line starts "C8 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (one more file scanned, one dynamic call site fewer), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 22 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  0c4f263afd8d73784ca2a12c6d0387d81e52626959f120d8ccca40b493184ff1  docs/_changelog.md
  c0a8c62605dbd6bb6df2a0a0f8b2cf5aec36e6fdfa275c8ec7d87dad69d16487  docs/features/design-foundation.md
  4389e6045aa410bffa14799fafc66c57c6bea6d171ff078c1caed8ce2270e6d0  docs/features/display-primitives.md
  c89f96270a63dded58a1866d46402cd4ba9aa9597af72b843d56407e83bd8677  docs/features/e2e-harness.md
  99ccffe036df5e29a2525b44974b19a273cdcef1511527387ef776f11bcee89d  docs/features/settings-surface.md
  b8c02606193c9bf2559cfa4e75ee1eb17a213534c61136db549150921dfeccd4  docs/generated/i18n-usage.json
  483711a7efa22ffa358b340aa35709007d4c6a5001847443690263c20772070d  e2e/fixtures.ts
  d36f9e111a1c2f6f0a0ba7c9beca9ed95bc8503d6427f380e38f62d3a2a3db9d  e2e/helpers/posting.ts
  bfc1cf15652cc7c73b2f75e7e6358b435f5e217a32030d364c5f140909082d41  e2e/settings.spec.ts
  b8c02606193c9bf2559cfa4e75ee1eb17a213534c61136db549150921dfeccd4  public/i18n-usage.json
  9bf6e1eff98c9200c10e96f5e1481fadf0ce7f573f279aa13c869c742f4c7219  roadmap.md
  8dc10ed41b8908b0f40c939ec72ed77f1a0494701d5626d0af4c1cfec1dda026  scripts/bundle-closure.mjs
  4c0896dc6c9796ae06339c66e37098003958b06268e73942c1943e85b168df0e  scripts/bundle-closure.test.ts
  9b546e4ff8d8ea4fe8972dc6c2b5e742eb3bba720e0885544a539b6bbbc6ab3d  scripts/check-bundle-size.mjs
  9bb0972b398cfb9d8dadf1587373e0ea64d396ebe80140827f85e75c74349b9d  scripts/e2e-leases.test.ts
  a8283c93af75a53fd252905fa44d558c94cd5b3b096e2e60d20a2c40571e360e  scripts/e2e-leases.ts
  500cd07129ac468d218d2b4d2cf81f61888421642e1f9f17edf6e26b6e778400  src/components/ui/action-message.test.tsx
  53b4f4eebb8eb912d7fe83604588b84aa5acfd45ec393422fe402b218e328c18  src/components/ui/action-message.tsx
  7db1624796e6fecaca37fffce21f12b59d32304594c716f5e22e6f30aa5265a6  src/features/admin-listings/listings-page.tsx
  8db6141c7c1178b8d4b6771fdac3eaa1da8fef305d20d6526f10595ab1954d01  src/features/admin-screening/screening-page.tsx
  ae218785abf37aa02f688d45a1bb93ae942c50c04b0d331780c248651a4ae401  src/routes/settings.tsx
  11b0b0e84e1df3ebd37683ba5e38ac7a0d8de6020c152de87d7c9d6abe06c923  src/test/settings-messages.test.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 709 passed (120 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bash scripts/check-identity-tags.sh` (the OK line and the three named deferrals, as before this turn);
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule above). CI's jobs judge them; the supervisor ran all three on its own copy (WHAT THE SUPERVISOR RAN).

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(c).
- The 22 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 22 paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Publish once CI is green on the final commit; then the walk of Change password on a phone (the supervisor sends its lines).
```
