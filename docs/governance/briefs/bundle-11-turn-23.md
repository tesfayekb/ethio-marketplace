# Bundle 11 — the Listings console, turn L4c: L4b's red (INC-558) and the breadcrumb's group (INC-557): brief, version 1 (saved unchanged, 2026-10-11)

```text
BUNDLE 11 — THE LISTINGS CONSOLE, TURN L4c (2026-10-11). ONE SHORT TURN, NO MIGRATION. No new strings. No package change.
Base: dev 98b0841bc7c938f243cbf40ecf273d5818f1bd0f. This file is public: it is written as build instructions. Tier A: what an admin's edit sends to `admin_edit_listing`. Tier B: the breadcrumb's look and two tests.

ANSWERS TO TURN L4b
- Verified: dev 98b0841b holds the delivered tree and the brief as sent.
- CI run 38177021983 on 98b0841b: FAILURE — one gating failure, AL-23 on shard 5 (desktop-1280): the notice read "Specifications, Title" where it expected "Specifications". It is a real defect, INC-558 (below), and AL-23 is its red. Everything else passed (1,657; no flaky test). Not your defect: the form was the supervisor's.

WHAT THIS TURN BUILDS
- INC-558 — an edit sent a value nobody changed. AL-23 saved a title, opened Edit again at once and changed a specification: the door was told the title had changed too and wrote the previous title back. The page re-reads the listing after a save; Edit had opened on the old read, and the form measured its values against the new one.
  - src/features/admin-listings/edit-form.tsx: the form keeps the listing it opened on and measures everything it sends against that (only what was changed in this form travels).
  - src/features/admin-listings/listing-page.tsx: Edit is greyed out while the page is re-reading the listing, so the form always opens on a settled read.
  - AL-23 is unchanged: it is this defect's red (CI on 98b0841bc7c938f243cbf40ecf273d5818f1bd0f).
  - The same class in every other admin edit form or dialog (seeded from a read that refetches after a save) is censused and fixed in group 3's last turn (the roadmap names it).
- INC-557 — the operator's walk of L4b: in the breadcrumb, a group with no page of its own (Listings, Catalog) wore the current segment's look (bold, underlined, `aria-current`) beside the real current page.
  - src/components/shell/breadcrumbs.tsx: such a group is a plain name (grey like the links, not underlined, not a link, no `aria-current`); a group with a page (Locations) is unchanged.
  - Tests: AL-21 (the Listings group plain on a listing's page) and A-5 in e2e/admin-shell.spec.ts (Catalog plain; the section is the current segment).
- DOCS: admin-listings.md (turn L4c), the changelog, the roadmap (line 3; the L4c line; the queued class census).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- Edit waits for a settled read (a short grey moment after a save) rather than opening on old data.
- A page-less group in the breadcrumb is plain grey text, like the other crumbs that are not the current page.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn L4b applied)
- typecheck, format, lint (0 errors, 33 warnings), 666 unit tests (107 files), the usage maps, the hardcoded-string scan, the selector self-test, the root-route check, the build and the bundle budget: all clean.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-23.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect 98b0841b… with Conclusion FAILURE (run 38177021983 — AL-23, INC-558; this turn fixes it)). If it shows another commit or another conclusion, STOP and report. You cannot git-fetch that branch;
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
- Scope — these files only: the 10 carrier paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-23.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 8 files → each equal to:
  80ff6c150f544373757fabb76f8f8cab9bc4fbfea361c91be988304e47e98871  docs/_changelog.md
  674efe6ee4f87fe7371dc1b921e84ed5b1fcfe5d0a1de5289ea25aa590be7b33  docs/features/admin-listings.md
  7234550fc08579e5729ca5092b02fc03e7b7b053f6dca7e0c186c83af3d78811  e2e/admin-listings.spec.ts
  adf67c952d34095fcbd9ed8442ee0223e4517d6db4864d82f70c14153470aa75  e2e/admin-shell.spec.ts
  b5230a81eb3c32baf77ffbf530a942054fe46cad21c6944d8ed11c2db766c659  roadmap.md
  f851201d1acf936c390298d869a041134b918b04ee401f4aca2e247e9b2ce335  src/components/shell/breadcrumbs.tsx
  47d276f23ea248e803a2769ea8d5eddd8e12e607076a345ae4546d251082d0b4  src/features/admin-listings/edit-form.tsx
  b1a9c03e5eae9983bacbe99bceb1db583e498076821dd1e19997df26622f4e46  src/features/admin-listings/listing-page.tsx

THE CARRIER — L4C-TURN-CARRIER-2026-10-11.md (5,311 bytes; sha256 0804510070fc039958821bc25ddd0a76aea5474ab782b786d45aae6727abd33b; 12 sections)
- Its first line starts "L4c TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (keys moved between lines), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 10 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  bedd953ffe783d1f3a24b726b403b6529e4ec650f110ea7e81280b6bcc371046  docs/_changelog.md
  3b19b81e2db163cb9e65d5729a2320a66a8aeba7c5230c3366b6e688527ae488  docs/features/admin-listings.md
  6a7419e778c056356623290d9bfa25ce19f95be79736e4e8a150ce856fe7ea86  docs/generated/i18n-usage.json
  85d8076029992bf3a501927f1eb82a7f965a25720be214e177277fef69c2093f  e2e/admin-listings.spec.ts
  c08bced03aeba244f2cfe4dcd00d1229c724b2d3bfa3892d1d4fb4bdff73bbd1  e2e/admin-shell.spec.ts
  6a7419e778c056356623290d9bfa25ce19f95be79736e4e8a150ce856fe7ea86  public/i18n-usage.json
  53204aeac084662cf733f6fa8ce65393f4faa4e3b6cd6b3128f91b376dba95a6  roadmap.md
  4e1ae582c6b69e434183e05cca6690e4acd2c84fcbf4fda015efbe0a79996931  src/components/shell/breadcrumbs.tsx
  60dad80b83a7503bc609d5ddde8d9684e544155f65eab8babcdf820e8b386dd0  src/features/admin-listings/edit-form.tsx
  6c335c858fdf051c083a83a7825bb621dcbf8a959988a4940e6a08a5ff42f4a6  src/features/admin-listings/listing-page.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 666 passed (107 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(b).
- The 10 sha256sum lines and the brief's.
- `git diff --name-only 98b0841bc7c938f243cbf40ecf273d5818f1bd0f` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 98b0841bc7c938f243cbf40ecf273d5818f1bd0f HEAD` too. Expect the 10 carrier paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Send the executor nothing until the supervisor reads CI on the final commit; then Publish and walk L4a and L4b together.
```
