# Bundle 10 follow-up — D127: every listings heading says "in": brief, version 1 (saved unchanged, 2026-10-10)

```text
BUNDLE 10 FOLLOW-UP — D127 (2026-10-10). ONE TURN. No migration, no database change, no new string, no package change.
Base: dev 2c986991 (the records turn of bundle 10's follow-ups). This file is public: it is written as build instructions. Tier B.

ANSWERS TO THE RECORDS TURN
- Verified by diff of 5b963ca7..2c986991: exactly the nine paths, each byte-identical to the supervisor's copy; the tree is the one this brief was built on. Its CI run (38037552627) was still running when this brief was written. This turn's push may cancel it, and that is expected: the records are documents only, and this turn's run judges both.

THE OPERATOR'S RULING (2026-10-10, D127 — it replaces D125's "near" heading)
- His words: "near inside same country may not be near. say a posting in dc can not be near LA despite being posted inside USA. so best to say listing in {country} rather than near, same for state level etc." — "or listing in {state} or region".
- Every heading on the listings pages says "in":
  - the page title over the chosen place's own listings: "Listings in {place}" (feed.headingIn — unchanged);
  - each wider place of the ladder gets its own heading, "Listings in {that place}" (feed.headingIn): the region or state, then the country; the place is looked up in the location path (a place not in the path gets no heading); each step is headed once;
  - everywhere beyond the country: "All listings" (nav.allListings — unchanged);
  - with no place chosen, the page title is "All listings" (nav.allListings) in place of "Listings near you".
- feed.heading ("Listings near {location}") and feed.scopeAll lose their last use. The keys stay in en.ts and am.ts (as feed.views did after DEC-165); nothing in the locale files changes.
- Code: src/features/feed/feed-page.ts (the label `{ kind: "place", placeId }` again; `feedSections` labels each step once) and src/components/marketplace/feed.tsx.
- Tests: FP-5 and FP-10 (unit); FS-3, FS-4 and FS-13 (the wider headings name their own place), FS-14 (new: no place chosen → "All listings", no step heading); TR-22 (nightly only, @global-state) reads "All listings" as its unseeded English heading.
- Docs: docs/features/feed-engine.md (the sections line), the changelog, the roadmap (line 3 names this brief; the D127 line ticked).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-10-d127.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect commit 5b963ca with SUCCESS, or commit 2c98699 with SUCCESS if the records turn's run has finished). If it shows FAILURE, STOP and report. You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier;
  5. the usage maps;
  6. the hashes;
  7. the checks;
  8. the browser run;
  9. the report;
  10. END THE TURN.
  Do not stop between steps.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the carrier's paths, the two usage maps and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-10-d127.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum roadmap.md` → ba2693366f32fbcf41c1c5a56faf4acec1bb919e00c88211b514d01d771fca20
- (c) `sed -n '38p' docs/features/feed-engine.md | sha256sum` → 9b3d3d9fa1f1071094f9f9ca5a768f43e8f7dc4f74662bcb61008ee8bf7c464c
- (d) `sed -n '624,625p' e2e/admin-translations-governance.spec.ts | sha256sum` → 060619eac5a5a9e0c1cb1ba310a2b9aa87c92e44de3d72408aff97a5957677b5
- (e) `grep -c 'kind: "near"' src/features/feed/feed-page.ts` → 2

THE CARRIER — D127-CARRIER-2026-10-10.md (71,590 bytes; sha256 ba15a16c662157768783f8b62b603c7d6178841eec581a716d1b26d3410da8be; 8 sections)
- Its first line starts "D127 CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE (the whole file);
  - APPEND (added at the end of the file);
  - REPLACE-LINES <a>-<b>: replace lines a through b of the file — both included, counted from 1 — with the section's lines. The section ends with a newline; that newline ends its last line and adds no empty line.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (feed.heading and feed.scopeAll leave them), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 10 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  4e21898ae00a612102a4a085c7c27bd097ee413731cddfae76987b35f5eaf6cd  src/features/feed/feed-page.ts
  62496721b4cb0bc3fc8a0179e54f47e459f7a7455cbe8753a4828caa42ab1017  src/features/feed/feed-page.test.ts
  ed3048be575200195552c846123448eaeee0c70383cfb531085810c928db58b9  src/components/marketplace/feed.tsx
  fd073ec19ce59aaafea1add444906beab64a143d476ba4472d65b304c8a82ebf  e2e/feed-screens.spec.ts
  07e27c4fea3f02d2985d34fa269d2eb1456e2b3028e976885427454c1213e843  e2e/admin-translations-governance.spec.ts
  6cc220f756a771822f67d7a56b9f899c2cf3b51da05743ba5f84ee7e9a832340  docs/features/feed-engine.md
  477a6df3be5b07b46e0776f4536f51dc82e9f7f84a623f2ad38a6c877483d1e3  roadmap.md
  568b9f75a546c147545b0dc57e8530a49a600d694cfcc634b56a1a67fc30b6a6  docs/_changelog.md
  49f6bf9620b054c9d118dbc16d60f0419c959f87daa49ae5b8e77b5145594f86  docs/generated/i18n-usage.json
  49f6bf9620b054c9d118dbc16d60f0419c959f87daa49ae5b8e77b5145594f86  public/i18n-usage.json

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 601 passed (91 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run build` clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/feed-screens.spec.ts`. If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506).

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(e).
- The 10 sha256sum lines and the brief's.
- `git diff --name-only 2c986991` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 2c986991 HEAD` too. Expect 11 paths.
- The checks.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then the three walk lines the supervisor sends.
```
