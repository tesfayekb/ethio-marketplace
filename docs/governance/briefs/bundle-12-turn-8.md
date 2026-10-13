# Bundle 12 — the tidy-up round, turn T8 (read only): what the live site's texts are (INC-488), and the database tool's older warnings counted: brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 12 — THE TIDY-UP ROUND (D145) — TURN T8 (2026-10-13). ONE TURN, READ ONLY. No migration. No code change. No new strings. No package change.
Base: dev 4cb2c589 (turn T7's landing). This file is public: it is written as instructions.
Tier B: two reads on ethio-prod (SELECT only), the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn T7 landed byte for byte (4cb2c589): every carrier path equals the supervisor's copy, the migration equals the text with its mark filled, and your ethio-prod read-back equals the expected guard (61f59c0b…, 1543), its two triggers and the mark.
- CI on 4cb2c589 (run 38351995076) is green and moved main to it: 0 failed, 0 flaky. PP-12 passed, so a stored photo now draws on the photo step through its signed link. CT-45 passed. The staging apply was in place before the browser tests ran.
- Your carrier script's first run (it expected a blank line between sections): no harm, since it stopped before writing. This brief now says there is none.
- The 183 older warnings: yes, Part 2 below.

WHY THIS TURN
- Every fix of the tidy-up round is chosen after its cause is read (D145). This turn reads two things that only your tools can reach. It changes no code, so it is short.
- INC-398 (for your information; nothing to do this turn): T7's census named the tests behind `listing not found` on run 38351995076 — PR-15 (a deliberate save on a deleted draft) and posting-wizard tests (PW-49, PW-99, PW-112, PR-42). The supervisor reads their cleanup and sends the fix in a later turn.
- Bundle 7's last item (an import preview that foresees the parent-first refusal) is parked for a spec. It needs a dry run of the commit, which meets the step-up gate and the import lock. Nothing to do this turn.

PART 1 — INC-488'S PRODUCTION READ (read only: nothing is written to either database, and no file of the repository changes for it)
- Why:
  - The live site lays the store's approved texts over the compiled catalogues (src/i18n/locales/en.ts and am.ts). It reads them through `get_ui_bundle(lang)` (also behind /api/i18n/:lang).
  - `admin_sync_ui_keys` rewrites English on every sync. It fills an Amharic row only while the row is empty or untranslated.
  - So an Amharic text corrected in am.ts after a sync may still show its old words on the live site. INC-431's 25 pin words, corrected in am.ts on 2026-10-04, may be among them. Nobody has read this.
  - The fix is chosen from this read, in a later turn.
- On ethio-prod, with your query tool (SELECT only), paste each result:
  - (B1) `select (select count(*) from jsonb_each_text(public.get_ui_bundle('en'))) as en, (select count(*) from jsonb_each_text(public.get_ui_bundle('am'))) as am;`
  - (B2) `select key, md5(value) as h from jsonb_each_text(public.get_ui_bundle('en')) order by key;` Save the rows to a file under /tmp, never in the repository. Paste only the row count.
  - (B3) the same for 'am'. Paste only the row count.
  - `get_ui_bundle` is what the site itself serves to every visitor: one text per key, no person's data. A count of 0 for a language means the site shows that catalogue unchanged.
- Compare B2 and B3 with the catalogues as built, using a script under /tmp (never committed):
  - load them with `import { en } from "<repo>/src/i18n/locales/en.ts"` and `import { am } from "<repo>/src/i18n/locales/am.ts"`;
  - hash each catalogue value with md5 over its UTF-8 bytes, as Postgres's md5(text) does.
- For each language, report:
  - keys in the catalogue; keys the store serves; keys whose text is equal; keys whose text differs;
  - keys the store serves that the catalogue does not have (no screen draws them);
  - the differing keys, sorted: every one if there are 100 or fewer, else the first 100 and the total.
- Prove the script first: change one value in a copy of am.ts under /tmp, and show the count of differing keys rise by one.
- The report carries key names and counts only, never a text from the store.

PART 2 — THE DATABASE TOOL'S 183 OLDER WARNINGS (read only; the list stays in your report and is never written to a file of the repository)
- Your turn-T7 report: the database tool listed 183 older warnings about the database's settings when it applied the migration. The migration added none, and you offered to look at them.
- If your tool can list them again without a migration (its security and performance advisors, read only), list them. If it shows them only while it applies a migration, say so in one line and skip Part 2.
- Report them grouped, one line per warning type:
  - the tool's own name for the type;
  - its level (ERROR, WARN or INFO);
  - security or performance;
  - its count.
- Then, for the security types only, the names of the objects each warning names (a table, view, function or policy). Names only.
- Change nothing. This repository is public: no warning, name or count goes into a committed file, a commit message or a code comment (G51). The supervisor rules on them in a later turn.

THE DOCS — the carrier writes roadmap.md (line 3, the T8 line, D149's line) and the changelog's T8 entry.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- INC-488 is read through `get_ui_bundle`, the function the site itself calls for every visitor, not through the store's table: it is what a visitor sees, and it holds no person's data.
- The warnings are counted by type, and the security types are named by object; nothing about them is written to the repository while it is public (G51).
- No code changes in this turn: each fix is chosen from these reads.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-12-turn-8.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It names turn T7's commit 4cb2c589 with SUCCESS. Whatever it shows, go on: do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. Part 1;
  6. Part 2;
  7. `bun run format:check`;
  8. the report;
  9. END THE TURN.
  Do not stop between steps.
- No migration: nothing is written to either database. Every query is a SELECT. Every script lives under /tmp and is never committed.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the carrier's two paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-12-turn-8.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 2 files → each equal to:
  29a7f74e7134e839fa696a356fade43ce617c1df6b4a23bc87291e798787bf3d  docs/_changelog.md
  64f5e92373236e8aa15b76f1fa276f76077968c3b4f6cc5cefe56ce48107a567  roadmap.md

THE CARRIER — T8-TURN-CARRIER-2026-10-13.md (1,774 bytes; sha256 0a949103e88445fe99c6eb2e6ad9d449ae60a95794fd39df2311f87f0945c039; 3 sections)
- Its first line starts "T8 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 2 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  4e9693063afdcefbfeab4b85a1c2fc2b4bccefe9dd992634f6815d248a51f5b6  docs/_changelog.md
  4af8926263c79be6811251f93bbda31a3111227843553b3074cbfa8cd65e9024  roadmap.md

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a) and (b).
- The 2 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 2 paths and the brief.
- Part 1: B1–B3 and the comparison, with the script's proof.
- Part 2: the grouped list, or the one line saying the tool cannot list them.
- `bun run format:check`'s last line.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply, Publish or walk for this turn.
```
