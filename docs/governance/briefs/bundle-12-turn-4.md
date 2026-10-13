# Bundle 12 — the tidy-up round, turn T4: a held answer is never printed raw (INC-587), and how stored photos may be served (INC-588's measurement): brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 12 — THE TIDY-UP ROUND (D145) — TURN T4 (2026-10-13). ONE TURN, NO MIGRATION. No new strings. No package change.
Base: the commit that lands turn T3 on dev (send this brief after T3's turn has ended); the census below proves every file by content. This file is public: it is written as build instructions. Tier B: the posting form's previews and review (how a held answer is printed), a unit test, docs. Three read-only measurements. No door, no database change.

ANSWERS TO THE LAST TURN
- Turns T2 and T3 are each read against their own stand-in when they land. The operator's walk of turn T1 passed all three lines. The walk named INC-588: a stored photo never shows in the previews. This turn measures how photos may be served before the previews are given their photos.

WHY THIS TURN
- INC-587. Three readers printed a held answer's raw value when its option had been deleted (not switched off), for example `toyota_other`:
  - the side preview (src/features/posting/listing-preview.tsx);
  - the listing's preview page (src/features/posting/preview/listing-detail.tsx);
  - the review (src/features/posting/step-review.tsx), which also printed a removed question's raw key.
  The title builder (build-title.ts) and the deal lines (deal-lines.ts) already leave such an answer out: "a raw token is never written". With the catalogue's 355 per-parent Others being retired (INC-582), the rule is needed in all five.
- INC-588 (the operator's walk of T1, 2026-10-13). A stored photo never shows in the side preview, the review or the admin's preview as buyer. Read: the upload route stores each variant as `{ partition, key }`, never a URL (src/routes/api/upload/photo.ts; the media pipeline's design). Every client reader kept a variant only when it was a string, so every stored photo reads as "no photo". The fix builds the URL from the partition's base, but first the bucket's access must be known. The first migration made 'listing-photos' private, with public reads only for an active listing's stripped photos (20260804174739, part g). The media pipeline builds public URLs from MEDIA_PROVIDER, R2_PUBLIC_BASE or MEDIA_PUBLIC_BASE. Which holds today decides between a public base and signed URLs. This turn measures it; the fix follows from the numbers (G21).

WHAT THIS TURN BUILDS
- src/features/posting/attribute-display.ts — `choiceHeldKnown(definition, value, options)`. A choice answer is shown when every picked value is offered or switched off (its label is kept, INC-466), or is `other` with its text. Any other type is always shown.
- src/features/posting/listing-preview.tsx and src/features/posting/preview/listing-detail.tsx — the facts list leaves out a choice that `choiceHeldKnown` refuses. A settled range still shows.
- src/features/posting/step-review.tsx — the specifications line leaves out an answer whose question no longer exists, or whose choice has no words left.
- src/features/posting/attribute-display.test.ts — DSP-1..DSP-3.
- Docs: posting.md (INC-587), the changelog, the roadmap (line 3; the T4 line and the INC-588 line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- INC-587: an answer with no words left is left out, never printed raw. This is the rule the title and the deal lines already follow (a raw token is never written).
- INC-588: no photo URL is built until the measurement shows how the bucket may be read. A URL the bucket refuses would draw a broken picture, which is worse than the category's picture.
- The new ids are DSP-1..DSP-3.

TESTS
- Unit: DSP-1..DSP-3 (NEW).
- E2E: none new. The specs that read the review and the previews run as before, and every answer they set has its words.
- Not edited: every other test.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn T3 applied)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 731 unit tests (123 files), the usage maps (they match), the hardcoded-string scan, the root-route check, the selector self-test, the identity-tag guard.
- Red first: DSP-1..DSP-3 fail on the base, which has no `choiceHeldKnown`.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-12-turn-4.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn T3's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the three measurements;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- No migration this turn: nothing is written to either database. The measurements read only.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 8 paths in the hashes table and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-12-turn-4.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 8 files → each equal to:
  5dd935e72c3b8ea88fe4bde6a7b93c181667f34454042ef5ff64c60f7a8e3a56  docs/_changelog.md
  0b3befd77bb270830948d1adb953fbb7e1540fbd366c780839971bb8946d389c  docs/features/posting.md
  6d8f3b6b40ef37fddb48efc952fa4aa555e22df9a928c980130efacd79e226ab  roadmap.md
  787d66fe6ea053717865545e6cd1bfb337b48a333feac04daf1a207d4e6e3564  src/features/posting/attribute-display.test.ts
  350e2d3fbb5ac586a59984fe79c47966b4ffcbf0653faadd39d276a272f0aaf2  src/features/posting/attribute-display.ts
  44c8d000f44d8233ab18eeb9be023cff384dba4bdf7f7ed07dd498b9fdb7a8b9  src/features/posting/listing-preview.tsx
  42331feb1ec2aa0c6d57e4957e47e499d16395a839d8ff45a8532b87953841d8  src/features/posting/preview/listing-detail.tsx
  8aa4258487b12e39d5ab370f473c96d6dd8999018cd2dcc651abb55a76444387  src/features/posting/step-review.tsx

THE CARRIER — T4-TURN-CARRIER-2026-10-13.md (8,804 bytes; sha256 a0f9200b025fea9a8f7b468b7bd1ba17461ceee692f41fb2c4c2b68d85f0551c; 14 sections)
- Its first line starts "T4 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 8 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  bdc502e15b0ee61017e0fdeb36a9e8765080ac3d88173cdd16ce49ff5e6a2653  docs/_changelog.md
  40e8712ea2c70b18cdb717817fc921b051c50075bf0d760cd4e3b0fd9b8840cf  docs/features/posting.md
  e3b714a10ad2dc25a9365ee623306f55015275e1460ed82decd584a4472b9169  roadmap.md
  7dce758c36e5277a60271627e468ce07dab30c7f68fd38b95a3b6573ffde0964  src/features/posting/attribute-display.test.ts
  a61bd5dd19476813aa3e00edfb5bb76a8db45b3e830d3459ab90d2ec21d3811b  src/features/posting/attribute-display.ts
  a59992b4fe672ba507f6704e017164f254105b609315959b47bb66194141b9f0  src/features/posting/listing-preview.tsx
  7e0bac3956c0c590ec120da080dd70b1a53f6bc96e35ee4058eef9bf6ca16c8f  src/features/posting/preview/listing-detail.tsx
  e7716f0596e35674887ec0da05500b453ea4ef85fddae5f832eba492ec9f6c24  src/features/posting/step-review.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 731 passed (123 files);
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bash scripts/check-identity-tags.sh` (the OK line and the three named deferrals, as before this turn);
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE THREE MEASUREMENTS — read only; paste each result whole; never print a key, a token, a user id or a secret's value.
- M1, ethio-prod, with your query tool (SELECT only):
  SELECT id, public FROM storage.buckets WHERE id IN ('listing-photos', 'category-assets') ORDER BY id;
  SELECT count(*) AS photos, count(*) FILTER (WHERE jsonb_typeof(paths->'card') = 'object') AS card_as_object, count(*) FILTER (WHERE jsonb_typeof(paths->'card') = 'string') AS card_as_string, min(paths->'card'->>'partition') AS a_partition FROM public.listing_photos;
- M2, your project's secrets: for each of these names say only "set" or "not set", never a value — MEDIA_PROVIDER, MEDIA_BUCKET, MEDIA_PUBLIC_BASE, R2_BUCKET, R2_PUBLIC_BASE. If your tools cannot list secret names, say so and go on.
- M3, ethio-staging, through REST with the E2E credentials you hold (never print a key): run, from the repository's root, exactly:
  node --input-type=module -e 'const url = process.env.E2E_SUPABASE_URL, key = process.env.E2E_SUPABASE_SERVICE_ROLE_KEY; for (const id of ["listing-photos", "category-assets"]) { const r = await fetch(`${url}/storage/v1/bucket/${id}`, { headers: { apikey: key, Authorization: `Bearer ${key}` } }); const b = r.ok ? await r.json() : {}; console.log(id, "status", r.status, "public", b.public); }'
  Paste its two lines.

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(b).
- The 8 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 8 paths and the brief.
- The checks.
- M1's two results; M2's five answers; M3's two lines.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply, nothing to walk (a rule about answers that lost their words). Publish once CI is green on the final commit.
```
