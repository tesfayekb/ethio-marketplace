# Bundle 17 — turn 1: the small items before the Edit (INC-661, D196, D197, DEC-183): brief, version 1 (saved unchanged, 2026-10-16)

```text
BUNDLE 17 — TURN 1 (2026-10-16). ONE TURN: THREE SMALL CHANGES BY CARRIER, TWO TESTS OF YOURS. No migration. One string changed in two languages (no new key: the usage maps are unchanged). No package change. No browser test is changed; one browser test and one unit test are written.
Base: dev e34c88ac (the bundle-16 records turn). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the auth change. Tier C: the ribbon words and colour, the docs.

ANSWERS TO THE LAST TURN
- The bundle-16 records turn is verified on dev e34c88ac: the eight files equal the supervisor's copy byte for byte. Its run (956, docs only) is the supervisor's read. Bundle 16 is closed; bundle 17 opens with this turn. Nothing is owed from it.

DECIDED (DEC-183, the supervisor under G42, recorded in the running record and imported at the next records turn): the platform's own bump of @lovable.dev/vite-tanstack-config 2.25.3 → 2.26.5 inside S2's work-in-progress commit (INC-637, PLATFORM-ORIGIN) is KEPT — it is the platform's own configuration package, every run since has been green with it, and a revert would itself be a package change against the platform. The rule stands: an unnamed package change is a finding at once; a bot-authored one is PLATFORM-ORIGIN and is judged by the runs that follow; a third platform-authored package change in a bundle gets the operator's ruling.

WHY THIS TURN
- INC-661 (the operator's walk of 2026-10-16, line 8): a deactivated account signing in "appears for a fraction of a second its logging in then logged out". useAuth set the user before the profile read answered. Now, on a signed-out → signed-in transition, the user is set only once the read has answered; a user already on screen stays while a later read runs; a read that fails still sets the user. The sign-in page shows the reason as before (S3).
- D196 (the operator): the closed ribbon "No longer available" was cut off on the card — it reads "Not available" / «አይገኝም» (feed.ribbon.closed; the state line and the action keep their words). D197: the "Photos coming soon" band is drawn in the gold like the status ribbons (listing-picture.tsx).

WHAT THIS TURN BUILDS (the carrier)
- src/features/auth/use-auth.ts — the hold described above (one setState changed; the deactivated branch of S3 unchanged).
- src/components/marketplace/listing-picture.tsx — the photos-soon band's classes (bg-gold, text-gold-foreground, shadow-sm) and its comment.
- src/i18n/locales/en.ts, am.ts — feed.ribbon.closed.
- docs/features/admin-users.md (one paragraph after the S3 section), roadmap.md line 3, the changelog.

THE TESTS (yours; Claude writes none) — plain words, the file names where they go:
1. SO-9 (e2e/auth-signout.spec.ts, in the "D189 deactivated session" group, after SO-8) — "SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661)". A leased account U (the pool); through the service client U's profiles.account_status → 'deactivated' (as SO-8 does, with the same `finally` that sets it back to 'active'). Open /auth signed out and sign in through the FORM with U's e-mail and password (the file's own UI sign-in helper, not a session injection). Expect: the page ends at /auth?reason=deactivated with `auth-deactivated` reading en["auth.deactivated"]; `account-menu` has count 0; and the signed-in screen never came — a wait for `account-menu` of 1,500 ms must time out (assert the timeout, as the file's "never appears" checks do, or `expect(page.getByTestId("account-menu")).toHaveCount(0)` polled over 1,500 ms with `expect.poll`); the stored session is gone (SO-8's check). Both projects.
2. RB-1 (a new unit file src/components/marketplace/ribbon-words.test.ts, vitest) — "RB-1 every ribbon's words fit the card": for each of en and am, the values of feed.ribbon.sold, feed.ribbon.rented, feed.ribbon.filled, feed.ribbon.closed, feed.reserved and feed.priceReduced are at most 14 characters, and listing.photosSoon at most 18 — the longest words the card's band shows whole at 360 px (D196); the test imports the locale objects as the other locale tests do.
3. The render case (in src/components/marketplace/listing-card.test.tsx, beside its existing render tests of the picture): render `ListingPicture` with `photosSoon` and no photo and assert that the band inside `listing-photos-soon-ribbon` carries the class `bg-gold` (D197), as the status ribbon's band does.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The hold applies to the signed-out → signed-in transition only; a token refresh never blanks a shown user; a failed read is fail-open (the doors refuse regardless, F3).
- The state line "No longer available" and the action's label keep their words; only the ribbon changes.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev e34c88ac with this turn's carrier files)
- Clean: typecheck, format, lint (0 errors, 33 warnings), 913 unit tests (157 files), the hardcoded-strings guard (0 findings). No key changes: the usage maps are unchanged.
- Not run by the supervisor: the browser tests. CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-17-turn-1.md (roadmap.md line 3 comes from the carrier).

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts or src/integrations/supabase/types.ts since the base, name the difference and go on (neither is in this turn's carrier);
  4. the carrier, then the hashes;
  5. the tests (SO-9, RB-1 and the render case), by hand, no search-and-replace;
  6. the checks;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header, reading each file whole before any file is opened for writing. Check each written file's sha256 against the table before you go on.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 7 paths of the hash table, the brief, e2e/auth-signout.spec.ts (SO-9), the new unit file and the one component test file the render case goes in. The database: none. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.
- THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec, SO-9 included.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-17-turn-1.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 7 files → each equal to:
  236c35c19bef50d626f920b1ea5bf34c822f3874e12c3895c51c23cba995d7fb  docs/_changelog.md
  f57d59a6e44a5978532e90b09d3fe5b9216c8927c691b80a9a69a14f09abb3e2  docs/features/admin-users.md
  01d6be8cdc25a6f1a4c8aece54c5ed16c8084eb414184d3047e832ce90724e40  roadmap.md
  f5eedbc8c77e25fa4597cf94b2dfa9059a6883df3ab29fce54b8260c89a25932  src/components/marketplace/listing-picture.tsx
  fd5461fa11b130c3b851837dde4f15ae985beb36d8b9a1e3fb5b51f2918a4234  src/features/auth/use-auth.ts
  7351fd3fe41a491da3ac6e882ef28d5906e85456fcf3b78c00ea1e27a7c2bdfc  src/i18n/locales/am.ts
  4e57fc6c02c170032115f13155bbfc7526bebfe9ab6066699824bfbd89370d72  src/i18n/locales/en.ts
- (c) `sha256sum e2e/auth-signout.spec.ts` → e19f1847f51a4c53a924e135e992427af3d99ae940027860d2a1f3fdf620f5dc (the file SO-9 goes in; its SO-8 is the model).
- (d) `ls supabase/migrations | tail -1` → 20261015204631_c99005e8-3799-499f-b6b8-ec439d4b9c35.sql (bundle 16's last; no migration this turn).

THE CARRIER — B17T1-TURN-CARRIER-2026-10-16.md (2,971 bytes; sha256 d95240fb391b723974dbd9cb3feb80013fb5088d9dda69fdf4f467bfb0216232; 9 sections)
- Its first line starts "B17T1 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 7 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  841ce2712f342ba354097fb898518df685531a51fb92567171f34f9f33379904  docs/_changelog.md
  9a9674d5923200fbf5a2bb2d893c26c607329fdc485b52489a126525b06c30d8  docs/features/admin-users.md
  19add5615985a17c500ffb44e2643da8bce57395cc483511b42e77aa60eeecaf  roadmap.md
  8255f9dd75637dfa90ac9cc205275a135348a6d71719c253ddb5d451385c2abd  src/components/marketplace/listing-picture.tsx
  c4836d4401854a23f198d936307265d7017ba599214f780c7d013cf6ae5d21a0  src/features/auth/use-auth.ts
  cc942ef0eaf4e22e3e73c81789d69e18d4c1f2495562f03f5d1668deba6cc67c  src/i18n/locales/am.ts
  66bd091925726f6882015dcee7cd2d79120c983b07b3d3553dc5f7e3b675276a  src/i18n/locales/en.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b17t1.log` — 913 passed (157 files) before your two unit cases; paste the count after them;
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- Not run by you: the typecheck, the build, the bundle budget and the browser tests. CI judges them.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 7 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 7 paths, the brief, e2e/auth-signout.spec.ts, the new unit file and the component test file.
- `git diff <START> -- e2e/auth-signout.spec.ts` whole, and `git ls-files` proof that the new unit file is tracked (G20).
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator), in this order:
1. Bring the supervisor Lovable's report. Do not wait for CI (DEC-181).
2. Turn 2 (the Edit as the wizard) follows from the supervisor; Publish waits for the bundle's close.
```
