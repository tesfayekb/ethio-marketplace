# Bundle 11 — group 3, turn G3b: G3a's red (Roles' search; IMP-1's scratch listing), the Audit chart drawn again (INC-547) and its dates bounded (INC-548): brief, version 1 (saved unchanged, 2026-10-11)

```text
BUNDLE 11 — GROUP 3, TURN G3b (2026-10-11). ONE TURN. No migration, no database change, no package change. Three new strings (below).
Base: dev 7f2db3334dfbf1e4338f22669353d36ff8e0d601. This file is public: it is written as build instructions. Tier A pages (roles, audit, impersonation), presentation and tests only: every door, permission and step-up stays as it is.

ANSWERS TO TURN G3a
- Verified by diff of 6e055589..7f2db333: the 18 carrier and map paths and the brief, each byte-identical to the supervisor's copy.
- CI on 7f2db333 (run 38120714250): FAILURE. Nine gating failures in three tests, all from the supervisor's G3a tests (part 0 below); one retried pass (RP-2, the fast lane). The fast lane is signal-only.

PART 0 — G3a'S RED (run 38120714250 on 7f2db333)
- RP-2 (shard 4 desktop; shard 1 and the fast lane, mobile) and RP-16 (shard 1 and the fast lane, mobile): the test's own new role was not on the page. G3a paged the roles roster (25 rows) and the roster sorts by priority, then key; other tests' scratch roles (CI, the fast lane and the nightly run at the same time) push a new role past the first page. The tests read a row by its position on page 1 — the G28 class; the supervisor's G3a census missed it.
  Fix: src/features/admin/roles/roles-list.tsx gains a search on the toolbar, before Columns (`role-search`; it matches the role's key or display name; the page returns to the first; a search that matches nothing shows "No role matches this search."). e2e/admin-roles.spec.ts finds a role by the search: a helper `searchRole(page, name)`; RP-2 and RP-16 use it (RP-16 also reads the toolbar's order and the footer's "1–1 of 1" after the search); the two delete tests' absence checks (RP-5, RP-9) search first and see the no-match line (on a paged roster an absence check by position proves nothing).
- IMP-1 (shards 1 and 4, both projects; the fast lane): `impersonation-listings-pagination-range` not found. A pooled account is reaped to no listings, so the view shows its empty state and no footer; the supervisor's G3a line expected a footer the account could not have.
  Fix: IMP-1 leases a seller and seeds one scratch listing for it (a scratch category branch and place chain, as the screening tests seed theirs; status screening), then sees the listing's row and the range "1–1 of 1"; the listing, the place chain and the branch are removed in finally (J3).
- Retried pass: RP-2 (desktop, the fast lane) — the same cause.

PART 1 — INC-547: THE AUDIT CHART IS DRAWN AGAIN (the operator's walk of G2b: "I see event per day and i dont see that working … now i dont see anything in both desktop or mobile")
- The cause, read in src/components/shell/chart-frame.tsx: the plot was measured once, at mount, through a ref. Admin › Audit mounts the frame while its figures load, so there is no plot yet; the measurement found nothing, never ran again, the width stayed 0 and the chart was never drawn.
- The fix: the plot's node is held in state (a callback ref); the measurement and its ResizeObserver run whenever the plot is rendered. Census (G29): the frame is the only measurement that observes a node rendered later (the label-room and footer-inset hooks observe nodes that are always there).

PART 2 — INC-548: THE AUDIT DATES ARE BOUNDED (the walk: "it allows me to select future date, and allows to select a date inside to box that is earlier than from box")
- src/features/admin/audit/audit-page.tsx: From's latest date is To (when set) or today; To's earliest is From (when set) and its latest today ("today" in the admin's own calendar). A date outside them, picked or typed, is refused: the field keeps its value. Census (G29): the Audit pair is the app's only pair of date fields.

STRINGS (G43 — the Amharic below is what ships; English in en.ts, Amharic in am.ts, after `admin.roles.empty`)
- admin.roles.searchLabel — en "Search" · am "ፍለጋ"
- admin.roles.searchPlaceholder — en "Role key or display name" · am "የሚና ቁልፍ ወይም የሚታይ ስም"
- admin.roles.noMatch — en "No role matches this search." · am "ከዚህ ፍለጋ ጋር የሚዛመድ ሚና የለም።"

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- Roles gets a search after all (G2a decided none, the roster being short): the house toolbar is Search · Columns, and a paged list is searched.
- A date outside the bounds is refused silently (the field keeps its value); no message.

TESTS
- Unit, NEW src/components/shell/chart-frame.test.tsx: CFM-1 (a frame that mounts loading draws its chart once the data arrives), CFM-2 (one that mounts empty draws once rows arrive), CFM-3 (one that mounts with data draws at once). CFM-1 and CFM-2 fail against the old frame.
- e2e/admin-audit.spec.ts: AS-1 one line (the chart's bars are drawn); AS-3 (today read from the browser's calendar; both dates' latest is today; a future From and a To before From are refused); IMP-1 as in part 0.
- e2e/admin-roles.spec.ts: RP-2, RP-5 (its last check), RP-9 (its last check) and RP-16, as in part 0.
- Not edited: AS-2, IMP-2, IMP-3, RP-1, RP-3, RP-4, RP-6 to RP-8, RP-10 to RP-12, every other test.

DOCS
- display-primitives.md: "ChartFrame measures the plot whenever it appears"; admin-roles.md and admin-audit-security.md: one line each; the changelog; the roadmap (line 3; the G3b line; Stage 4's line gains D138 — the operator's My listings directive of 2026-10-11).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn G3a applied)
- typecheck, format, lint (0 errors, 33 warnings), 643 unit tests (102 files, the test-id guard included), the usage maps, the hardcoded-string scan, the import, listing-write, browse and marketplace guards, the selector self-test, the build and the bundle budget: all clean.
- CFM-1 and CFM-2 run red against the old frame, green against the new.
- A local render (Chromium, a node build, mocked rows, the figures answered after 1.2 s) at 360 and 1280 px: the chart shows its loading state, then its bars; From and To both offer today as the latest; a future From and a To before From are refused; on a 30-role roster a role on page 2 is found by the search ("1–1 of 1"), and a search with no match says so; no sideways scroll.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-15.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect commit 7f2db333…, conclusion FAILURE (run 38120714250) — part 0 is its red). If it shows another commit or another conclusion, STOP and report. You cannot git-fetch that branch;
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
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-15.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 12 files → each equal to:
  05a5c8d3355bf40bcad589245278c651db774149179ceaaf897cf0e708695303  docs/_changelog.md
  4b014d5c8da1da8ffdb919b7440c3873270e9e344af719b33ef66fd23c777c7e  docs/features/admin-audit-security.md
  b854e3fa7d569fbb3f3233971319eb13f3a4494acd98e0d03b202c73bb9cfae5  docs/features/admin-roles.md
  c50dd50b80403430e23acc481e06c4b37fad7a00e24231ceb3ffdbccb359903a  docs/features/display-primitives.md
  4d96bd50c2f91e407ca2853de924f6c6ceaadab91fd7cc878bb1738f7bc3d081  e2e/admin-audit.spec.ts
  9439ead7eedfe8f154cf2287d26dbd3c1a1f1f820acd2c412b7d8b0cd04593a0  e2e/admin-roles.spec.ts
  6e5101ef344b8dd90c4e162a413019a4249938f312209e5783c191198957744c  roadmap.md
  11c7562c38d5267df82ee46b322c49424803ac815857a51c7506d3f8cdaeda0a  src/components/shell/chart-frame.tsx
  3db0f7ae88b6291c4f400e0e52e141cc4298d24eb9d793a58b4d5486588af7cc  src/features/admin/audit/audit-page.tsx
  7146788a9cd9bc6dfb5b98a0676bb9dc7a9b1f653c00e8db9edade3087bb959c  src/features/admin/roles/roles-list.tsx
  81c06b78135b921da4f8978b42fbacdcc98a4310b9b35c2090d2dd80e09e533e  src/i18n/locales/am.ts
  12c9fed8fe3d70e175336b5ac33e122ce681e1a70ebc0f33e4f6c7ec03fad552  src/i18n/locales/en.ts
- (c) `ls src/components/shell/chart-frame.test.tsx` → "No such file or directory".

THE CARRIER — G3B-TURN-CARRIER-2026-10-11.md (18,386 bytes; sha256 f373ee41e727e352ff03aafc46f6901b2745fc91046dd304d0987ff43a312a8d; 43 sections)
- Its first line starts "G3B TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (the three new keys; keys moved between lines), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 15 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  3e2f15aeb663c6dde90b96381c28cbbb812df944e94604e3ae72bef4965f4a24  docs/_changelog.md
  3ddbf8bea41a884b1ef71163ab875eed3dd6e7a87343f1848d0ff2e7bfab015a  docs/features/admin-audit-security.md
  0b9910cb85e705afa38a44685acf3218f305d5c70686c6ecf93352aa04c28538  docs/features/admin-roles.md
  86e48cdd1d4fa86ce6fe47992ea1076370e3786eee7ac6d7609b607d46f5a16c  docs/features/display-primitives.md
  5e4878f65a06ea4e85ee373fda57595e784cb24bf4443ca1d13b2720d0cd9864  docs/generated/i18n-usage.json
  560c286941c8369f13613bfbd14b001b58492cfb68a43c59fccd852657bf88cf  e2e/admin-audit.spec.ts
  e7e162a6306a366719c29444b4a7c83a95fc25a2e59d6b65d813473e11806023  e2e/admin-roles.spec.ts
  5e4878f65a06ea4e85ee373fda57595e784cb24bf4443ca1d13b2720d0cd9864  public/i18n-usage.json
  776e7fa0652d9a9d2d569beb3faa1c9f739742658c31c197cc3efa856635101b  roadmap.md
  44dae45158659c5927a6d39134db11df553866b814ab9016907c7df1fa1e5cdf  src/components/shell/chart-frame.test.tsx
  8e1525557bf622a05ad6cedc60db2e3be2a237122071fc378de3d1432080c63f  src/components/shell/chart-frame.tsx
  6baf77b1a74ec9872f81fa0dbf0dd4960393c907a30df8b8da18e9d0be5dd3f5  src/features/admin/audit/audit-page.tsx
  ca414ec71ab6465ee6502ac365bb147346b88712f7a02426cddd46b5b296ac6a  src/features/admin/roles/roles-list.tsx
  899cc3db87dfad1295ac2284c76afa88b32e29b3f48f6820924e20a1da794c86  src/i18n/locales/am.ts
  d9c1ab299317a0587ee4bd244ed2acbae61923ff17395cbd20ca4e5e12bda963  src/i18n/locales/en.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 643 passed (102 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/admin-roles.spec.ts e2e/admin-audit.spec.ts`. If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506).

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(c).
- The 15 sha256sum lines and the brief's.
- `git diff --name-only 7f2db3334dfbf1e4338f22669353d36ff8e0d601` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 7f2db3334dfbf1e4338f22669353d36ff8e0d601 HEAD` too. Expect 16 paths: the hashed paths and the brief.
- The three new strings, key by key, English and Amharic, as written in en.ts and am.ts (G43).
- The checks.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then the supervisor's walk lines (G3a's and G3b's together).
```
