# Bundle 12 — the tidy-up round, turn T1: the operator's walk first (INC-581, INC-585, INC-584 / D148), the CI evidence files' gaps (DEC-179), listings.md (INC-471) and INC-582's census: brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 12 — THE TIDY-UP ROUND (D145) — TURN T1 (2026-10-13). ONE TURN, NO MIGRATION. Two new strings. No package change.
Base: dev 506d4a4e, the commit that landed the records turn closing bundle 11; the census below proves every file by content. This file is public: it is written as build instructions. Tier A: the photo screening instruction (screening). Tier B: the shell's frame, the photo step, the CI reporter and its workflow (under DEC-179), e2e specs, docs. One read-only measurement on ethio-prod. No door, no database change.

ANSWERS TO THE LAST TURN
- The records turn that closed bundle 11 landed as `506d4a4e`, byte for byte as built: CLEAN, with CI judging it on that commit. Turn C15 is CLEAN: run 38335668624 was green and main was promoted to `6c0c2be5`.

WHY THIS TURN
- The operator walked on his phone on 2026-10-12, 22:30 local. All three lines passed. The same walk named five findings (G26: walk findings come first):
  - INC-581. Going to the posting form from the home page shows the home page for a moment, then the form ("needs to fix so its fast instant and no other page seen"). Read in @tanstack/router-core 1.171 (load-client): when a navigation starts, the router sets its location store and its status to pending. It commits the new page's matches only after that page's code and `beforeLoad` have run. The shell read the location (`useRouterState(s => s.location.pathname)` in src/components/app-shell.tsx, breadcrumbs.tsx, app-rail.tsx and src/routes/admin.tsx), so its frame switched first: no location band, My Listings active, around the home page's body, until the form arrived.
  - INC-585. A photo the site refused stays on the photo step as a tile, by design: the seller replaces exactly that photo (PP-10). Next still moved on. The operator: the seller removes it before Next works, and the category's picture shows while there is no photo.
  - INC-584 / D148. A photograph of a business card was refused "This is not a photo of the item." (`not_a_photo`, src/server/media/policy.ts). The pass's own instruction keeps that code for screenshots, drawings, blank frames and test patterns. The operator (D148): "ANYTHING ON BUSINESS CARD SHOULD BE ALLOWED, JUST A DISCLOSURE EVERYTHING ON PHONE WILL GO PUBLIC FOR EVERYONE". He means the photo: the step says that what a photo shows is public.
  - INC-582. On Tablets with the brand Alcatel, Series offered only "Other", and choosing it opened no box to say what it is. The form opens the write-in for an option whose value is `other`. The census below reads whether the catalogue's "Other" rows carry another value. The rows are corrected by the curator (D147), and the check follows in the next turn from the numbers.
  - INC-583 (catalogue gaps) goes to the curator (D147). Nothing is built for it here.
- DEC-179 (the tidy-up round's CI items) covers three gaps in the CI evidence files:
  - INC-429. A failure body said "context file not found" for every test whose title ends in punctuation (AT-7 "(DB truth)", PW-74 "(INC-329, big model list)" in run 38245598293). Playwright keeps a trailing "-" and runs of "-" in its directory names; the report's slug drops them.
  - INC-495. A re-run of failed jobs wrote a flaky test of the same run into the flake ledger a second time.
  - INC-419. The guards file took no ESLint error lines, so a failed lint showed only its warnings.
- INC-471. docs/features/listings.md still shows five states in its first sections. The live machine has nine states plus Restore (D137).

WHAT THIS TURN BUILDS
- src/components/shell/use-shown-pathname.ts (NEW): `useShownPathname()`. It returns the path of the deepest committed match, which is the page the body is showing. A page no route matched lets the location stand in.
- src/components/app-shell.tsx, src/components/shell/breadcrumbs.tsx, src/components/shell/app-rail.tsx and src/routes/admin.tsx read their path through it. Each line carries its cause. src/features/admin/impersonation/use-impersonation.ts keeps the location: it re-reads the session on every route change and is not part of the frame.
- src/features/posting/step-photos.tsx: `onHeldChange(count)` reports the tiles whose photo was not added (refused or not sent), and 0 on leaving the step. Under the helper line, the D148 notice: `post.photos.public` (`post-photos-public`).
- src/features/posting/wizard.tsx: on step 2, Next is closed while a tile holds a photo that was not added. `post.photos.nextHeld` (`post-next-photos-held`) says so under Next.
- src/server/media/policy.ts: the instruction is exported as `PHOTO_POLICY_INSTRUCTION`. It says that a business card passes with everything printed on it, its phone numbers, e-mail addresses and handles included. It also says that any other printed item photographed is a photograph, its print judged by the other codes.
- src/server/media/policy.test.ts (NEW): PPOL-1 (the business card), PPOL-2 (`not_a_photo`'s four kinds and every code kept) and PPOL-3 (other printed items).
- scripts/e2e-failure-report.ts (DEC-179):
  - `playwrightOutputDir()`, Playwright 1.58.1's own directory name (`sanitizeForFilePath`, then `trimLongString` to 60 characters with the sha1's first five hex digits, then the project). The matcher tries it first.
  - `missingContextLine()`: a body without a context says Playwright's name for the directory, how many context files the run carried, and those of the same spec.
  - `ledgerKey()` and `newLedgerLines()`: one ledger line per test, source and run.
  - Self-test cases for all three. The self-test summary names them.
- .github/workflows/ci-status-report.yml (DEC-179): every ESLint error line (` N:N  error  …`) is taken as evidence, with the file line above it.
- The two new strings (keys added after `post.photos.refusedFinal` in en.ts and am.ts; G43):
  - `post.photos.nextHeld` — "Remove the photo that could not be added to continue." · «ለመቀጠል ያልተጨመረውን ፎቶ ያስወግዱ።»
  - `post.photos.public` — "Everything in your photos is public: anyone can see it, including the phone number, e-mail and address on a business card." · «በፎቶዎችዎ ላይ ያለው ሁሉ ለማንም ይታያል፤ በቢዝነስ ካርድ ላይ ያለ ስልክ ቁጥር፣ ኢሜይልና አድራሻም ጭምር።»
- E2E:
  - PW-187 (e2e/post-wizard-category.spec.ts, phone width): it records every DOM state after the bottom bar's Post and refuses any state that holds the home page's body without its location band.
  - PP-11 (e2e/photo-pipeline.spec.ts): a refused photo holds Next and says why; removed, Next opens and nothing is registered; the D148 notice shows.
- Docs:
  - posting.md (INC-581, INC-585, INC-584 / D148);
  - media-pipeline.md (D148);
  - ci-guards.md (DEC-179);
  - ci-status-reporter.md (INC-419);
  - listings.md (INC-471: the first P2 sections marked superseded, the Restore row added);
  - the changelog;
  - the roadmap (line 3; bundle 12's heading and the T1 line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- INC-581: the frame follows the committed page, everywhere the frame reads the path (G29). No preload or loading screen is added in this turn; how fast a page's code arrives on a slow network belongs to the performance review (D126).
- INC-585: a tile that could not be sent holds Next too. Its "Send again" lifts the hold as Remove does.
- D148's notice sits on the photo step for every seller. It names a business card because cards are what it is about.
- DEC-179, with its JUDGE frozen first: kept unless, over the next five completed runs, the reporter crashes, a file passes its publish limit, the ledger misses a flaky test the report's own flake section names for that run, or a "context file not found" line lists Playwright's own name among the same spec's files.
- The new ids are PW-187, PP-11 and PPOL-1..PPOL-3.

TESTS
- Unit: PPOL-1..PPOL-3 (NEW). The reporter's self-test gains the INC-429 and INC-495 cases.
- E2E: PW-187 (NEW, phone width; skipped at desktop width with its reason) and PP-11 (NEW).
- Not edited: every other test.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, the records turn applied)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 724 unit tests (123 files), the usage maps (they match), the hardcoded-string scan, the root-route check, the selector self-test, the identity-tag guard, and the reporter's self-test.
- Red first:
  - The reporter's self-test fails without the exact name ("INC-429: Playwright's name for … PW-74 …") and without the ledger key ("INC-495: the ledger keeps one line per test, source and run").
  - PPOL-1..PPOL-3 fail on the base, which exports no instruction.
  - The guards extractor, run on a real ESLint capture of four planted errors, took "✖ 4 problems" alone before the change. After it, it took the file line and the four errors.
  - PW-187 and PP-11 are proven in CI only (INC-506: no browser in the executor's sandbox). PW-187 fails on the base by the mechanism read above, a reading, not a run.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-12-turn-1.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name the records turn's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the usage maps;
  6. the checks;
  7. the measurement;
  8. the report;
  9. END THE TURN.
  Do not stop between steps.
- No migration this turn: nothing is written to either database. The measurement reads only.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the carrier's paths, the two usage maps and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-12-turn-1.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 20 files → each equal to:
  e2d6d80ce4654d711a3acc9b589af0fef80a14250ea6a41da4277fc4bf37aedb  .github/workflows/ci-status-report.yml
  27ab55210b2860581ac7fa76c6e9fcd8bd621a88577ad74a415fb76fd3ea5efa  docs/_changelog.md
  072a6911f116b1b24a215fd25d889fcb14f166fcfca8108d7f29305fffe078bf  docs/features/ci-guards.md
  41458b67763f0922482c0127000e91d519d0002715b2a0f5aab6fd126b0ea228  docs/features/ci-status-reporter.md
  49d170693f6d92fa5d9fbd149762b6e99c94cc03a8301b715657b6e1a6b1197f  docs/features/listings.md
  304bc6401b331869dc54f9729cd315554f6fd453575877cd3f7ee12c97d5f863  docs/features/media-pipeline.md
  f72ade72a2d3c48f9746e12ff23eac52d7874c679b052c38651fe5e5c16c91d7  docs/features/posting.md
  56d640207a16d8fb11e90a59425de9276e8239d4b8f6b5c90dd9835685e64fe3  e2e/photo-pipeline.spec.ts
  e0352da1fb97684fd8eaf7acef58f1b321a07c6481f1ae0def122e1ad0e76458  e2e/post-wizard-category.spec.ts
  c1ce75d210c9899f5419620951c6c7ff031de0812a7e02a938fbac73dbdffe32  roadmap.md
  a2275fd13b614b919ee9715c8c4cd08344a11501a3c61ce1204f1848ec079390  scripts/e2e-failure-report.ts
  beb6d8ea7f1fb141409799b6fbc46d217b065750a4a32a217761ad3f605fe6a9  src/components/app-shell.tsx
  6422b329cd3eb1f2f03c51c397ee9a68503e8c5dcbc82754461ecc1f93177b90  src/components/shell/app-rail.tsx
  4e1ae582c6b69e434183e05cca6690e4acd2c84fcbf4fda015efbe0a79996931  src/components/shell/breadcrumbs.tsx
  d5be3fd15d284de546afa833cf565d7a997abc8ba4a90c5dad512d361388cb9c  src/features/posting/step-photos.tsx
  d9d98aba17ce2747f62b0ad763fd776d2f8b6ec93bd771f801e9bdae42838cea  src/features/posting/wizard.tsx
  61404f23e3378e5d129a0cbc37171db2f9be92b984d1bfc839b7c8069f590957  src/i18n/locales/am.ts
  fce31832202117c9b2034a2c1e22a9de7f32cf0127d163fea615ae294ad3c720  src/i18n/locales/en.ts
  f16ff8623a642afcbc1895e15c748065341fc5b54e557e93c7442c01c8a34b18  src/routes/admin.tsx
  faea8bdcd79bfd3c093ed51458dcd283ba681eeb110e1379c337459b465e8fbd  src/server/media/policy.ts
- (c) `ls src/components/shell/use-shown-pathname.ts src/server/media/policy.test.ts` → "No such file or directory" for both.

THE CARRIER — T1-TURN-CARRIER-2026-10-13.md (35,977 bytes; sha256 84ccda263cdadc5fff9e1a71f0640007464a23bce1756f4259dda7e72c29f198; 48 sections)
- Its first line starts "T1 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 24 paths below; each must equal the table. On any mismatch, STOP. The two usage maps are among them; they are hashed after step 5. Also paste the saved brief's sha256sum.
  0ff109b1c4518db9edefdc69276a42f6ec1ed89a7423aedc668aedb22c2e47d6  .github/workflows/ci-status-report.yml
  b212533887f6de150b6cc3c6b15bb10f5012afe698e4aa1c9afd6104a62b13d8  docs/_changelog.md
  807f42ad217a2f50c2a0dc4bd8710254230a635611fbf55c90275c6be5234aa6  docs/features/ci-guards.md
  fda1f93fe2fd185611ee00a02e516cce02d86986e2b7360a545a523c9c1d823e  docs/features/ci-status-reporter.md
  c8baf069a4a7ef707a6668963e4ed04d44de9bdef074665bdda3df0eb8b86b7a  docs/features/listings.md
  c6324c7c41e757696b93134a50d7458bdea6b69dd75a3bb39caabcc7a015aaa7  docs/features/media-pipeline.md
  0b3befd77bb270830948d1adb953fbb7e1540fbd366c780839971bb8946d389c  docs/features/posting.md
  65ba84ea8cc63495463054bced3f1752bd4066579ed24faca47a5c53558bd0e1  docs/generated/i18n-usage.json
  6ca0f836fda5bdcf3fa857372c17dc3f17bb38b00168cd542b80055ea009fccf  e2e/photo-pipeline.spec.ts
  eee9ff0e4bca12912f01298c881650e093047300be6532a5d5680d6401472fa6  e2e/post-wizard-category.spec.ts
  65ba84ea8cc63495463054bced3f1752bd4066579ed24faca47a5c53558bd0e1  public/i18n-usage.json
  3650c840a0a74fdfec7c3699b2b2c8a69c78ba1e911600a87a05b610cb0c8b8a  roadmap.md
  c27a9187995969edd10222bcdf31bc665433ff3459b5f5003525586cfff64d5f  scripts/e2e-failure-report.ts
  98a8594ea8b080b5ed72df97e7c9daa915ef6497084ff22e739f1595c720757e  src/components/app-shell.tsx
  c3e707930960169d6657df5320b66e5b303ff59220b050d5e7428b77acaaf45b  src/components/shell/app-rail.tsx
  f0d442b02240e248f12e305ac02a457ef6864ba68f6650e5e893418feca82a88  src/components/shell/breadcrumbs.tsx
  03982bad6bcdcd3e986217a4035e932ecf0be02ff985dba73674108bf2a5b49c  src/components/shell/use-shown-pathname.ts
  0e1438c40b1a1fca740b1fbace82b85ecad18b72972092836cc30d67b7e927e7  src/features/posting/step-photos.tsx
  7e21d44afe9a285bf4fbd76cc421e9d218a3c7ab6abfd857bc2c6d39e702b80a  src/features/posting/wizard.tsx
  63888a2ade9961eef8176ab8573fa831de740131467be709edc24e16fa0fcb28  src/i18n/locales/am.ts
  92ff5b6a8eccf73f3d5631c31006e6182dd3d7310e4428593d1cff2a80c50d87  src/i18n/locales/en.ts
  1b63d3c7abfaa07c23494f33697ebfdd3cab0fab0b1dcf1efcd2cd7a2e3175ac  src/routes/admin.tsx
  658750c678efad641308ae4eeca601f2b6a40700c6af0225f523211f2a536ef8  src/server/media/policy.test.ts
  dc5de6920c6603c11c2f5598dd2eebf75cac7e2f43846bb88ce067d1b221de66  src/server/media/policy.ts

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (two new keys), then exits 1. Run it again: it must print "usage maps match the tree." Then hash the two maps (the table above).

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 724 passed (123 files);
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bash scripts/check-identity-tags.sh` (the OK line and the three named deferrals, as before this turn);
- `SELF_TEST=1 bun scripts/e2e-failure-report.ts` "Self-test OK: …" (its last line);
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE MEASUREMENT — ethio-prod, with your query tool, SELECT only (it reads the real catalogue; nothing is written). Paste each result whole; a result over 80 rows: its row count and the first 80 rows.
- (a) every option labelled Other whose value is not `other`:
  SELECT a.attr_key, o->>'value' AS value, o->>'label_en' AS label_en, o->>'label_am' AS label_am, coalesce(o->>'parent', '') AS parent FROM public.attributes a CROSS JOIN LATERAL jsonb_array_elements(coalesce(a.options, '[]'::jsonb)) AS o WHERE a.attr_type IN ('single_select', 'multi_select') AND (o->>'label_en' ~* '^\s*others?\M' OR coalesce(o->>'label_am', '') LIKE 'ሌላ%') AND o->>'value' IS DISTINCT FROM 'other' ORDER BY 1, 2;
- (b) the choice questions with no `other` option at all:
  SELECT count(*) AS choice_questions, count(*) FILTER (WHERE NOT EXISTS (SELECT 1 FROM jsonb_array_elements(coalesce(a.options, '[]'::jsonb)) AS o WHERE o->>'value' = 'other')) AS without_other FROM public.attributes a WHERE a.attr_type IN ('single_select', 'multi_select');
- (c) every option that names Alcatel, or whose parent does:
  SELECT a.attr_key, o->>'value' AS value, o->>'label_en' AS label_en, coalesce(o->>'parent', '') AS parent FROM public.attributes a CROSS JOIN LATERAL jsonb_array_elements(coalesce(a.options, '[]'::jsonb)) AS o WHERE o->>'value' ILIKE '%alcatel%' OR o->>'parent' ILIKE '%alcatel%' ORDER BY 1, 2;

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(c).
- The 24 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 24 paths and the brief.
- The checks.
- The two new strings, key by key, English and Amharic, as they stand in en.ts and am.ts (G43).
- The measurement (a), (b) and (c).
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Publish once CI is green on the final commit. Then walk on the phone: Post from the home page shows no home page inside the form's frame; on the photo step, the notice under the photo helper line; a business card photo goes through.
```
