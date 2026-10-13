# Bundle 12 — the tidy-up round, turn T9 (read only): why a stored photo does not show on the published site (INC-592), and the signed-in functions named and checked: brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 12 — THE TIDY-UP ROUND (D145) — TURN T9 (2026-10-13). ONE TURN, READ ONLY. No migration. No code change. No new strings. No package change.
Base: dev f6027a22 (turn T8's landing). This file is public: it is written as instructions.
Tier A: the reads behind a photo shown through links (INC-592) and the census of signed-in functions. Also: the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn T8 landed byte for byte (f6027a22). Your reading of `get_ui_bundle` with the site's public key, after the query tool was refused: accepted. It is what every visitor's browser does.
- INC-488 is confirmed. 11 English texts the live site serves differ from en.ts; nine of them are the short labels of 2026-10-07. Amharic: 0 differ. 6 keys are served that no catalogue has. The fix is the operator's, not yours: he runs "Sync keys" in Admin › Translations.
- Part 2's truncated list: read whole in Part 2 below.

WHY THIS TURN
- The operator's walk found that a stored photo shows nowhere on the published site, although the same code passed in CI on ethio-staging (INC-592). The fix is chosen from the cause, so this turn reads it.
- Your T8 list of the signed-in functions stopped part-way. The supervisor checks every one, so this turn reads them whole.
- Your T8 read of INC-488 is the evidence it needed. Nothing to do on it this turn.

PART 1 — INC-592: WHY A STORED PHOTO DOES NOT SHOW ON THE PUBLISHED SITE (read only)
- The operator's walk of turn T6 on the published site (2026-10-13, after T7's green and a Publish): a photo he added shows nowhere.
  - The side card on the Price step shows the category's picture.
  - Back on the photo step, the tile shows "Sent" and "Cover" with no image.
  - "Preview as buyer" (review, admin) shows no photo either.
- In CI, on ethio-staging, PP-12 and PP-13 passed: the route signs, the link serves, the image draws. So something differs on the published site or on ethio-prod. The supervisor does not guess it: these three reads decide it.
- (P1) From your sandbox, with no session and no key, one request to the published site:
  `curl -s -m 20 -X POST -H 'content-type: application/json' -d '{"photoIds":[]}' -w '\nHTTP %{http_code}\n' https://ethio-market-dawn.lovable.app/api/media/photo-links | tail -c 300`
  Paste the last 300 characters. A 401 with `{"error":…}` means the published build has the route. A 404, or the site's HTML page, means it does not. This is the only request to the published site in this turn: no sign-in, no other address.
- (P2) On ethio-prod, with your query tool (SELECT only), counts only:
  `select count(*) as photos, count(*) filter (where exif_stripped) as stripped, count(*) filter (where jsonb_typeof(paths) = 'object') as object_paths, count(*) filter (where paths -> 'card' ->> 'partition' = 'default' and coalesce(paths -> 'card' ->> 'key', '') <> '') as card_ref, count(*) filter (where created_at > now() - interval '6 hours') as last_6h, count(*) filter (where created_at > now() - interval '6 hours' and exif_stripped) as last_6h_stripped from public.listing_photos;`
  If your tool is refused, paste the refusal's code and words, and go on.
- (P3) If your platform shows the published site's server log, paste every line that names /api/media/photo-links or /api/upload/photo from the last six hours: time, path, status and error words only, never a token, a key or an address of a photo. If it does not show that log, say so in one line.

PART 2 — THE SIGNED-IN FUNCTIONS, NAMED AND CHECKED (read only; the list stays in your report, never in a file, a commit message or a code comment of the repository — G51)
- Your T8 list stopped part-way through the 103 `admin_` functions. Read them in pages so nothing is cut.
- On ethio-prod, with your query tool (SELECT only), run this four times, with OFFSET 0, 40, 80 and 120, and paste every row:
  `select p.proname, p.oid::regprocedure::text as signature, position('has_permission' in p.prosrc) > 0 as names_has_permission, position('auth.uid()' in p.prosrc) > 0 as names_auth_uid, has_function_privilege('anon', p.oid, 'EXECUTE') as anon_can_run from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' and p.prosecdef and has_function_privilege('authenticated', p.oid, 'EXECUTE') order by p.proname, signature limit 40 offset <N>;`
- This covers every function in the warnings, the non-admin ones included. The report carries names, signatures and the three yes/no columns only. Change nothing.

THE DOCS — the carrier writes roadmap.md (line 3 and the T9 line) and the changelog's T9 entry.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- One request to the published site, with no session (P1). It tells whether the published build has the route, and nothing else can tell that from your sandbox.
- No sign-in on the published site or on ethio-prod: the signed-in side of INC-592 is read by the operator in his own browser.
- The functions' census reads names and yes/no columns only, and stays out of the repository while it is public (G51).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-12-turn-9.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It names turn T8's commit f6027a22 or turn T7's 4cb2c589, with SUCCESS. Whatever it shows, go on: do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
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
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-12-turn-9.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 2 files → each equal to:
  4e9693063afdcefbfeab4b85a1c2fc2b4bccefe9dd992634f6815d248a51f5b6  docs/_changelog.md
  4af8926263c79be6811251f93bbda31a3111227843553b3074cbfa8cd65e9024  roadmap.md

THE CARRIER — T9-TURN-CARRIER-2026-10-13.md (1,323 bytes; sha256 2b9a302a7ceec72eec4e8cd4ba3b17c3129cc4816cd946d4df9ce6e5bbe9eca7; 3 sections)
- Its first line starts "T9 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 2 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  48ea395e15fe0b6ba56eb53d5cdc18d2bbfc17d358112573b71f0bb61eae8158  docs/_changelog.md
  19805a3615c7d544bc0f5f6ba2285d96906b9b0acbe4b688c2f6a798f1d429b2  roadmap.md

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a) and (b).
- The 2 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 2 paths and the brief.
- Part 1: P1, P2 and P3, as asked.
- Part 2: every row of the four pages.
- `bun run format:check`'s last line.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply, Publish or walk for this turn.
```
