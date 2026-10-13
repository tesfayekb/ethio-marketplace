# Bundle 12 — the tidy-up round, turn T2: CO-2 reads its total in a window no write crosses (INC-586), the purges that raced an autosave (INC-398), and the import refuses an Other that asks nothing (INC-582): brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 12 — THE TIDY-UP ROUND (D145) — TURN T2 (2026-10-13). ONE TURN, NO MIGRATION. One new string. No package change.
Base: dev ff2d094b, the commit that landed turn T1; the census below proves every file by content. This file is public: it is written as build instructions. Tier B: three e2e specs, the import gate's options cell (the catalogue import), a unit test, docs. One read-only measurement on ethio-staging. No door, no database change.

ANSWERS TO THE LAST TURN
- Turn T1 landed as `ff2d094b`, byte for byte as built: CLEAN, with CI judging it on that commit. Its report and INC-582's census are read in the curator's next message. The records turn (`506d4a4e`) is CLEAN.

WHY THIS TURN
- INC-586. CO-2 (e2e/admin-countries.spec.ts) passed only on retry on 2026-10-07, 2026-10-09 and 2026-10-13: the DEC-030 threshold. Its failed attempt waited 20 s at line 96 for the roster's total to equal the service client's count of markets. Read: the page reads its total once. A scratch market another test created or removed after that read kept the two numbers apart for the whole wait (G28's class: a total on a roster other tests' fixtures change).
- INC-398. The server-error census lists `[ssr-error] /api/listings/draft listing not found` 6 to 11 times a run, the one message off the allowlist. INC-323's cause: an autosave reaching a draft that a test already purged. INC-323's rule: a hook that purges drafts stops the page first (`stopPageBeforePurge`, e2e/helpers/posting.ts: wait for the network to go quiet, then blank).
  Census of the 27 specs that purge listings: two of them open the posting form without the rule.
  - e2e/post-wizard-recent.spec.ts: its `afterEach` takes no page, and PW-171's chip saves a draft.
  - e2e/photo-pipeline.spec.ts: `page.goto("about:blank")` alone, which lets a save already sent land after the purge.
- INC-582 (the operator's walk, 2026-10-13). On Tablets › Alcatel, Series offered "Other", and choosing it opened no box. The form opens its "say what it is" box only for the value `other` (src/features/posting/step-specifications.tsx). An option labelled Other under another value asks nothing. Turn T1's census reads the rows already in the catalogue; the curator corrects them (D147). This turn stops any file bringing one in again.

WHAT THIS TURN BUILDS
- e2e/admin-countries.spec.ts — CO-2. Each try of the poll does four things:
  1. it reads the database count;
  2. it reloads the roster and waits for hydration;
  3. it reads the page's total;
  4. it reads the database again.
  A try whose two database counts differ saw a write in between and does not count. A try whose counts agree must show that total. No other line changes.
- e2e/post-wizard-recent.spec.ts — the `afterEach` takes the page and calls `stopPageBeforePurge(page)` before it purges. No other line changes.
- e2e/photo-pipeline.spec.ts — the `afterEach` calls `stopPageBeforePurge(page)` in place of `page.goto("about:blank")`. No other line changes.
- src/server/imports/gate.ts — the options cell refuses, as `optionOtherValue`, an option labelled Other or Others (case-insensitive, at the label's start, as a word) whose value is not `other`.
- src/server/imports/gate.test.ts — three cases:
  - Other under `other` passes;
  - Other or Others under another value is refused;
  - a label that only begins with the letters (Otherwise, Otterbox) passes.
- src/features/admin-attributes/import-dialog.tsx — the reason is listed with the others, so it shows its words.
- The new string (G43): `admin.attributes.import.reason.optionOtherValue` — "An option named Other on this row must have the value other" · «በዚህ መስመር Other የሚል ስም ያለው አማራጭ ዋጋው other መሆን አለበት»
- Docs: e2e-harness.md (INC-586, INC-398), attributes.md (INC-582), the changelog, the roadmap (line 3; the T2 line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- INC-398's JUDGE, frozen first: it closes after three consecutive completed runs that list the message at most twice (PR-15 provokes it twice on purpose). More than that, and its cause is read again.
- INC-586: the count is read in a window no write crosses. No timeout is raised; the total stays a count against database truth (J4).
- INC-582: the gate refuses new rows. The rows already stored are the curator's to correct; the gate does not touch them.

TESTS
- Unit: the three INC-582 cases in gate.test.ts.
- E2E: CO-2 (changed). The `afterEach` hooks of post-wizard-recent.spec.ts and photo-pipeline.spec.ts are changed; no test body in those files changes.
- Not edited: every other test.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn T1 applied)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 727 unit tests (123 files), the usage maps (they match), the hardcoded-string scan, the root-route check, the selector self-test, the identity-tag guard.
- Red first: the "refused" case fails on the base, which has no such rule. CO-2 and the hooks are proven in CI only (INC-506).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-12-turn-2.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn T1's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the measurement;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- No migration this turn: nothing is written to either database. The measurement reads only.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 12 paths in the hashes table and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-12-turn-2.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 12 files → each equal to:
  b212533887f6de150b6cc3c6b15bb10f5012afe698e4aa1c9afd6104a62b13d8  docs/_changelog.md
  bbaf8de5d47dc38bf8b85df0b217ac844f41c4fdbc34a3bb4651f09c1d8d4a52  docs/features/attributes.md
  82f9e4fda84561a9ad5449b06e07b3b341a271f6da2e2eeb07e9114fdaf2affb  docs/features/e2e-harness.md
  a7b337fce746ca31bba17d2d540b2692c55e4773dddc93ee2e164e9d71ce8081  e2e/admin-countries.spec.ts
  6ca0f836fda5bdcf3fa857372c17dc3f17bb38b00168cd542b80055ea009fccf  e2e/photo-pipeline.spec.ts
  6dd53c2fa6b89f5b0d01cef8159d0d8dfc142929b67847027fbf848015937f97  e2e/post-wizard-recent.spec.ts
  3650c840a0a74fdfec7c3699b2b2c8a69c78ba1e911600a87a05b610cb0c8b8a  roadmap.md
  f002ec482ad700b41cbcffc47ef76fcc3b7e28b1ed001dbf6a604dbcc5dab6da  src/features/admin-attributes/import-dialog.tsx
  63888a2ade9961eef8176ab8573fa831de740131467be709edc24e16fa0fcb28  src/i18n/locales/am.ts
  92ff5b6a8eccf73f3d5631c31006e6182dd3d7310e4428593d1cff2a80c50d87  src/i18n/locales/en.ts
  d47deb5be449f1ddd1c1682d0c20b154c61326fbfead640e1a3e84ab1865f726  src/server/imports/gate.test.ts
  72d671648c07b32e53097e274656b36e9d4c7c39dce7bc1d1e8bbf7ace3dbb39  src/server/imports/gate.ts

THE CARRIER — T2-TURN-CARRIER-2026-10-13.md (7,958 bytes; sha256 a52ac47571e63d9766a66c5520b2c93ee7f0e8cae1aa6dd6bc5f56c198f0693d; 16 sections)
- Its first line starts "T2 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 12 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  77ff5696c54fbc6429be2617540147c56590945e5afaeab746f6e0a26e89f574  docs/_changelog.md
  2f8395a9d96df91a625ab56c695459e6d34d8277279ca8ae9b39547d515c2e3e  docs/features/attributes.md
  ed37b2f898ac6b7cd632e0e4ddc41c7a8975594c56f7ec51437213b157ded362  docs/features/e2e-harness.md
  c56d57a9605ab5d0ae36ec6514c66607bd6afdc375baa1da58d762c2f942b5c1  e2e/admin-countries.spec.ts
  9c192069aa32924eb63e2aaccd8f7fce2ad48653863f6bf5d0a670b9fac76067  e2e/photo-pipeline.spec.ts
  d7b26bbce606c9ad3babe5f5690b3a6d026a32aeed794cf0256b27f725844b2c  e2e/post-wizard-recent.spec.ts
  56cea53f203e44b9385d98d3bf66cf5deefcb1c2f19b69ddd6776ed40c1fd6ab  roadmap.md
  036802ce71925ec4382ceda3a53db944099b31c889f866c988bb49290200825a  src/features/admin-attributes/import-dialog.tsx
  5710c81ff29e315225fa5ebf977aecf11e5915c522d7382da494014d59cb714a  src/i18n/locales/am.ts
  70d32bb5d6dc12394b720d1aef7d9d339719e832fcb84fce5c24351d4d2ced90  src/i18n/locales/en.ts
  7097baf5c1dbc331e619dc5b2150e362099c302c05a77a0cccf9c2b4f5fcd7dd  src/server/imports/gate.test.ts
  756acead064099012b6d58ab6a03f79c57674f29f6f64fd0f812f4d9dd8ab00a  src/server/imports/gate.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 727 passed (123 files);
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bash scripts/check-identity-tags.sh` (the OK line and the three named deferrals, as before this turn);
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE MEASUREMENT — ethio-staging, through REST with the E2E credentials you hold (never print a key); read only. It is for INC-497: whether the real top-level categories' order numbers are in sequence. Run, from the repository's root, exactly:
  node --input-type=module -e 'const url = process.env.E2E_SUPABASE_URL, key = process.env.E2E_SUPABASE_SERVICE_ROLE_KEY; const r = await fetch(`${url}/rest/v1/category_tree_pointers?select=display_order,is_primary,child:categories!category_tree_pointers_child_id_fkey(slug)&parent_id=is.null&order=display_order`, { headers: { apikey: key, Authorization: `Bearer ${key}` } }); const rows = r.ok ? await r.json() : []; console.log("status", r.status); const real = rows.filter((x) => !String(x.child?.slug ?? "").startsWith("e2e-")); console.log("top-level pointers", rows.length, "real", real.length, "scratch", rows.length - real.length); console.log("real orders", real.map((x) => x.display_order).join(","));'
  Paste its three or four lines. If the status is not 200, paste the status alone and go on (the foreign key's name may differ; say so).

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(b).
- The 12 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 12 paths and the brief.
- The checks.
- The new string, key by key, English and Amharic, as it stands in en.ts and am.ts (G43).
- The measurement's lines.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply, nothing to walk (tests and the import's refusal). Publish once CI is green on the final commit.
```
