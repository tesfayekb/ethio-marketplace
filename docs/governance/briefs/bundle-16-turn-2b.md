# Bundle 16 — turn 2b: the fixes of turn 2's two reds: brief, version 1 (saved unchanged, 2026-10-14)

```text
BUNDLE 16 — TURN 2b (2026-10-14). ONE TURN. No migration, no string, no package change.
Base: dev 447cbb19 (turn 2's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the shell's live guard (sign-out evacuation). Tier B: the E2E test. Tier C: the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 2 landed byte for byte: dev `447cbb19` holds the 19 paths as the manifest, your test file and the migration (mark 20261015100000). The operator applied it on ethio-staging.
- Its CI run (38640035525 on `447cbb19`) is red with these two reds only: 1,696 passed, 6 failed — MLP-2 on mobile-360 and MLP-3 on both projects, each in its shard and again in the fast lane. Nothing else failed; one flaky pass (AL-16: a pool account's clean-up got an HTML error page from staging, and the retry passed).

THE TWO REDS (CI run 38640035525, shards 2 and 5 and the fast lane; read by the supervisor in e2e-last-failure.md)
1. MLP-3, both projects: a signed-out `/my-listings` ended on "/" (the call log: "/my-listings", then "/"), not on `/auth?return=/my-listings`.
   - Cause (read in src/components/app-shell.tsx, the live guard): turn 2 added `/my-listings` to the guard's gated routes. On a fresh signed-out load, the guard sees no user and replaces the page with "/" before the route's own `beforeLoad` redirect to sign in can finish. `/account` has the same race: its `beforeLoad` and docs/features/account.md send a signed-out visitor to sign in, and the guard drops him on the marketplace instead.
   - INC-627 (registered by the supervisor): a fresh signed-out visit to a page that has its own sign-in redirect lands on the marketplace. Class: two guards that decide the same moment and disagree. Census: the gated routes are `/admin`, `/settings`, `/account` and `/my-listings`; only `/account` and `/my-listings` have their own sign-in redirect (`/settings` and `/admin` have none).
   - Fix (the carrier, app-shell.tsx): the guard evacuates `/account` and `/my-listings` only once a session this tab held has gone. `/admin` and `/settings` are evacuated as before, so SO-3, SO-3b and SP-4 are unchanged.
2. MLP-2, mobile-360: a draft's Continue was looked for inside `my-listing-<D>-card` and not found.
   - Cause (read in src/components/shell/data-table.tsx, the card layout): below 1280 px a row's actions render in the card's foot, after the card's body. The box holding both is `my-listing-<id>-actions`; `my-listing-<id>-card` is the body only. The page is right; the locator is wrong.
   - Fix (you, the test): below 1280 px look for Continue in `my-listing-<D>-actions`; from 1280 px in the table row `my-listing-<D>`, as now.

WHAT THIS TURN CHANGES
- The carrier: src/components/app-shell.tsx (the guard), docs/features/admin-shell.md and docs/features/my-listings.md (the later word), the changelog and the roadmap.
- You, in e2e/my-listings-page.spec.ts only:
  - MLP-2: a helper `box(page, id)` — the table row `my-listing-<id>` from 1280 px, the card's box `my-listing-<id>-actions` below it. Continue is found with it. `twin` stays for what lives in the card's body (titles, marks, state lines).
  - MLP-3, keep every assertion and add three:
    - signed out (a fresh context, no session), `/account` goes to `/auth` with return `/account`;
    - signed in, on `/my-listings` with `my-listings-page` visible, a same-tab sign-out through the app's own client (as SO-3 does: `window.__ethioSupabase.auth.signOut({ scope: "local" })`) leaves for "/", and `my-listings-page` is gone;
    - the same for `/account`: after a same-tab sign-out there, the URL is "/".
  - Keep at most two leased accounts per test (DEC-174), the test titles unchanged, and the "[e2e:mlp]" prefix. Run `node_modules/.bin/prettier --write e2e/my-listings-page.spec.ts` after.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- A fresh signed-out visit to `/account` or `/my-listings` goes to sign in and back, as each page's own redirect and its docs say. A sign-out while on them still leaves for the marketplace.
- The fix sits in the guard, not in a test's expectation: the pages' redirect is the documented rule (D20; docs/features/account.md).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 447cbb19 with this turn's carrier files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), the usage maps (unchanged; they match).
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them, with SO-3, SO-3b, SP-1, SP-3, SP-4 and the shell's panel tests.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-16-turn-2b.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. The CI read. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>.
  2. Step 0.
  3. The census (below). If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/integrations/supabase/types.ts or src/routeTree.gen.ts since turn 2, those two are not this turn's files; name the difference and go on.
  4. The carrier, then the hashes.
  5. The test edits.
  6. The checks.
  7. The report.
  8. END THE TURN.
  Do not stop between steps.
- The carrier's sections each end with a newline, blank lines included. Write every section's bytes exactly as they stand between its header line and the next header. Check each written file's sha256 against the table before you go on.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope:
  - Files: these only — the 5 carrier paths, e2e/my-listings-page.spec.ts and the brief. Name any other file in the report's first lines, with its reason.
  - Database: none. No query, no migration.
  - Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-16-turn-2b.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 5 files → each equal to:
  8fb0017e67bc42034668902b52f0de64f9c8270efb5587f993f1ac6882ac1465  docs/_changelog.md
  a8a4c0bbd823157a3d89b25ea103664867b8a0b4a610c026d2d83c8a6ca60c9a  docs/features/admin-shell.md
  00417437f369403e581a3558b83b5c7556cb5cf3bdb2ef3ffccf90a13adbdaae  docs/features/my-listings.md
  97a6da31bf6f941fbb6f5f56bdaa54ed5a771c1ea949ab852b1d563e862e6218  roadmap.md
  9ea3d9640779259c5ccebb73ad7c61680e7a4755557ff8b65a1f67fa0e7656b9  src/components/app-shell.tsx
- (c) `sha256sum e2e/my-listings-page.spec.ts` → f05780f74c5e31c5b59e3767767849382277ff9d311e280dcbc7b52c3d4f0bb5 (your turn-2 file).
- (d) `ls supabase/migrations | tail -1` → 20261014212353_bfa3b7fc-a891-4c2a-b47b-8ac58761dd8e.sql (turn 2's). This turn adds none.

THE CARRIER — B16T2b-TURN-CARRIER-2026-10-14.md (3,242 bytes; sha256 dd0db3d571dfb151095b76b0d6b4e75bb93e28ae2db378d2a80c720bfab120e2; 7 sections)
- Its first line starts "B16T2b TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
- Line numbers: counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 5 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  18066317d3061f44e364d093feb211cbca9414f3ad8f14c944664497281c0fea  docs/_changelog.md
  504d6af6babb9cb3f4eb05dc62e1f82f9a88dc1bd49172a88e7247cd5b95b020  docs/features/admin-shell.md
  b599b0f24eeb841369a1f0256df4c1c6ff97cc14e1b5b9aa87c185fb2f41f7df  docs/features/my-listings.md
  a35c2e0d7f76c141da33452dda49d9d900d5d6e1d92be6a8feab76d5e394914a  roadmap.md
  c39261a877b964af698532f35b4735c936dd7a27c601186bb71013449ca1af91  src/components/app-shell.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` → clean;
- `bun run lint` → 0 errors / 33 warnings — a warning in your test file is fixed, not left;
- `bun run test:unit 2>&1 | tee /tmp/unit-b16t2b.log` → 856 passed (150 files);
- `bun run i18n:map-guard` → "usage maps match the tree.";
- `bash scripts/check-hardcoded-strings.sh` → "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` → OK;
- `grep -n 'test("MLP-' e2e/my-listings-page.spec.ts` → the four titles, unchanged, in order;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule). CI judges them.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 5 sha256sum lines and the brief's; the sha256sum and line count of your test file.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 5 carrier paths, your test file and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator), in this order:
1. Bring the supervisor Lovable's report. The next prompt comes back at once (DEC-181).
2. Publish only when the supervisor says the newest commit is green and Lovable is idle. Then press "Sync keys" in Admin › Translations (turn 2's words).
```
