# Bundle 12 — the tidy-up round, turn T11 (read only): the live texts after Sync keys (INC-488), and where a person's id is readable: brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 12 — THE TIDY-UP ROUND (D145) — TURN T11 (2026-10-13). ONE TURN, READ ONLY. No migration. No code change. No new strings. No package change.
Base: dev 961160c8 (turn T10's landing). This file is public: it is written as instructions.
Tier A: the read of which columns and functions expose a person's id. Also: the live texts read (INC-488), the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn T10 landed byte for byte (961160c8). The migration equals the text with its mark filled, and your ethio-prod read-back equals the expected one.
- CI on 961160c8 (run 38363785159) is green, and main moved to it: 0 failed, 0 flaky. IG-6 passed on both projects, and the staging apply was in place.
- Your Part 2 page: read. The function census is complete.
- The unit failure you could not name: this turn keeps the whole unit output (HOW TO WORK, step 7).

WHY THIS TURN
- INC-488: the operator pressed Sync keys. Part 1 reads whether the live site now serves the texts as built.
- Part 2 is the evidence for a rule about who may ask what another account is allowed to do. Before that rule is written, it reads where a person's id is visible.
- The unit-test rule below: in T10 one unit test failed once and its name was not kept.

PART 1 — INC-488: THE LIVE TEXTS AFTER THE OPERATOR'S "SYNC KEYS" (read only; nothing is written to either database, no file of the repository changes for it)
- The operator pressed Sync keys in Admin › Translations on ethio-prod (2026-10-13, after your T8 read). Sync rewrites the approved English rows from the compiled catalogue and marks keys the code no longer ships. This part reads whether the live site now serves en.ts as built.
- Read exactly as in T8, because your query tool cannot run `get_ui_bundle`: call the same public function with the site's own publishable key, as every visitor's browser does. Use the REST RPC `get_ui_bundle` with `{"p_lang":"en"}`, then `{"p_lang":"am"}`, on ethio-prod. Save the answers under /tmp only, never in the repository.
- Compare each with the catalogue as built, by a script under /tmp (never committed):
  - load `import { en } from "<repo>/src/i18n/locales/en.ts"` and `import { am } from "<repo>/src/i18n/locales/am.ts"`;
  - compare each served text with the catalogue's text for its key.
- For each language, report:
  - keys in the catalogue; keys the store serves; equal; differ; served but not in the catalogue;
  - every differing key and every served-not-in-catalogue key, by name.
- Expected (not a STOP if it differs; report it): English differ 0, Amharic differ 0, served-not-in-catalogue 0. Last time (T8) English differed on 11 keys and 6 keys were served that no catalogue has.
- Prove the script as in T8: change one value in a copy of am.ts under /tmp and show the Amharic differing count rise by one.
- The report carries key names and counts only, never a text from the store.

PART 2 — WHERE A PERSON'S ID IS READABLE (read only; the rows stay in your report, never in a file, a commit message or a code comment — G51)
- On ethio-prod, with your query tool (SELECT only), paste every row of each:
  - (P1) the columns holding a person's id that the public or a signed-in user may read:
    `select c.relname, c.relkind, a.attname, has_column_privilege('anon', c.oid, a.attnum, 'SELECT') as anon_reads, has_column_privilege('authenticated', c.oid, a.attnum, 'SELECT') as signed_in_reads, c.relrowsecurity as rls_on from pg_class c join pg_namespace n on n.oid = c.relnamespace join pg_attribute a on a.attrelid = c.oid where n.nspname = 'public' and c.relkind in ('r', 'v', 'm') and a.attnum > 0 and not a.attisdropped and (a.attname like '%user_id' or a.attname like '%seller_id' or a.attname like '%actor_id' or a.attname in ('target_id', 'owner_id', 'created_by', 'updated_by', 'approved_by')) and (has_column_privilege('anon', c.oid, a.attnum, 'SELECT') or has_column_privilege('authenticated', c.oid, a.attnum, 'SELECT')) order by 1, 3;`
  - (P2) the functions the public may run whose declared result names such a column:
    `select p.proname, pg_get_function_result(p.oid) as result from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' and has_function_privilege('anon', p.oid, 'EXECUTE') and pg_get_function_result(p.oid) ~* '(user_id|seller_id|actor_id|owner_id)' order by 1;`
- These are names, kinds and yes/no only. Change nothing.

THE DOCS — the carrier writes roadmap.md (line 3 and the T11 line) and the changelog's T11 entry.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The live texts are read the way a visitor's browser reads them (the publishable key), as in T8: your query tool may not run that function.
- The id census reads names and yes/no only, and stays out of the repository while it is public (G51).
- The unit run keeps its whole output from now on, and every failure is named.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-12-turn-11.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It names turn T10's commit 961160c8 with SUCCESS. Whatever it shows, go on: do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. Part 1;
  6. Part 2;
  7. `bun run format:check`, then `bun run test:unit 2>&1 | tee /tmp/unit-t11.log` — keep the whole output. If any test fails, paste its name and its first error line from that file. If you run it again, keep each run's file;
  8. the report;
  9. END THE TURN.
  Do not stop between steps.
- No migration: nothing is written to either database. Every query is a SELECT. Every script lives under /tmp and is never committed.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the carrier's two paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-12-turn-11.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 2 files → each equal to:
  ee17dce9b57febb132d68b7ae64fb4276d75cae9e6d2834feba2b0f8a66ae39d  docs/_changelog.md
  56f0183fc96b05a9cc1eaa5cb517948b631f66b0cf2bcc5e8de82a7f0bdc42ab  roadmap.md

THE CARRIER — T11-TURN-CARRIER-2026-10-13.md (1,016 bytes; sha256 975544a85a2b698eb46dea07a5d82fdda2c7fc21303160af987b8e8ec4706fe7; 3 sections)
- Its first line starts "T11 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 2 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  b1cff9bf1ee9ab726bb6df8eea2ac7b80dcbab3afa7c85ad67f9ca2a4e6d0805  docs/_changelog.md
  01a47e50a99cc789f0ac7f9f4fadd08f8e0d12a0c5f629a2f6d2944b38395cb4  roadmap.md

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a) and (b).
- The 2 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 2 paths and the brief.
- Part 1: the two counts per language, the names, and the script's proof.
- Part 2: every row of P1 and P2.
- `bun run format:check`'s last line; `bun run test:unit`'s summary line, and any failing test by name.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply, Publish or walk for this turn.
```
