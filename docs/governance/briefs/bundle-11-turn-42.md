# Bundle 11 — turn C14: why the console's new category is missing from its search (INC-579, evidence and measurement), and the identity and alias routes never send a door's raw words (INC-578): brief, version 1 (saved unchanged, 2026-10-12)

```text
BUNDLE 11 — TURN C14 (2026-10-12). ONE TURN, NO MIGRATION. No new strings. No package change.
Base: dev 74503dfd, the commit that landed turn C13; the census below proves every file by content. This file is public: it is written as build instructions. Tier B: the categories console (attributes on its search box only), an e2e helper, two posting routes (Tier A by the listing doors' rule), a unit test, docs. Two read-only measurements. No door, no database change.

ANSWERS TO THE LAST TURN
- Turn C13: verified. Dev 74503dfd equals the supervisor's build byte for byte, the brief as sent. Its CI was running when this brief was written; the supervisor reads it.
- Turn C12: CI red (run 38261739605) — AT-6 failed on both attempts at `createViaUi`: INC-579, this turn's first part. Everything else passed (component tests included: INC-575's fix held).

WHY THIS TURN
- INC-579 (turn C12's red, run 38261739605). AT-6 failed on both attempts, and AT-59, CT-41, CI-4 and CT-7 passed only on retry. All five stopped at the same step: `createViaUi` (e2e/helpers/categories.ts) created a category in the console, closed the dialog, searched the roster for the new slug, and did not find its row in 20 s. CT-12 failed the same way on turn C11's run. One test a run has done so in thirteen runs since 2026-10-07. No client error reached the page in any of these attempts, and the dialog dump says no dialog was open.
- Read in the code: the roster is one whole read (`admin_list_categories`, paged by id through `readAllPages` — src/features/admin-categories/categories-service.ts), re-read after every write (`invalidateQueries` on the create's settle — use-categories.ts). The search narrows what that read holds (categories-page.tsx, `filtered`). So the new row appears only once the re-read after the create has landed.
- `admin_list_categories` builds the whole tree on every call: a recursive walk, an ancestor walk that calls `cat_primary_parent()` per row and level, and five aggregates. PostgREST pages its result after computing all of it.
- What is not known, and decides the fix: whether the re-read was still in flight after 20 s, or landed without the row; how long the roster's query takes on the real catalogue; and how many categories ethio-staging holds (scratch rows left behind make every read longer). Under six equal shards every catalogue spec runs in shards 1 and 4 at the same time, four workers against the same tables. That is a HYPOTHESIS for the load, not a measured cause. No fix is written from a guess (G21): this turn makes the next miss name its cause and measures the read, and the fix follows from the numbers.
- INC-578. The identity route (src/routes/api/listings/identity.ts — the country change, the contact check, the identity save) and the alias route sent a door's exception text as the refusal's reason: `not authenticated`, `account is deactivated`. INC-447's rule ("a door's exception, never its raw text": `doorRefusal`, src/features/posting/door-error.ts) reached the draft, publish and photo routes, and not these two.

WHAT THIS TURN BUILDS
- src/features/admin-categories/categories-page.tsx — the search box (`category-search`) carries three data attributes, and nothing on screen changes:
  - `data-reading`: "1" while the roster's read is in flight;
  - `data-roster`: the rows the read holds;
  - `data-results`: the rows the search shows.
- e2e/helpers/categories.ts:
  - `createViaUi` notes the moment the create's editor showed;
  - `findRow` takes it. When it misses a row, it adds one `[roster-dump]` line: the database's truth (the row, active or not, its tree pointers — service client), the page's three attributes, and the seconds since the create. The dump never throws. Nothing else in the helper changes.
- src/routes/api/listings/identity.ts (three refusals) and src/routes/api/listings/alias.ts (one): a door's exception is answered through `doorRefusal` — a machine code kept, anything else `doorError`.
- src/server/supabase/upstream.test.ts — UP-5 (the identity route: a door's sentence → `doorError`; a machine code kept), UP-6 (the alias route: a sentence → `doorError`).
- Docs: categories.md (INC-579), posting.md (INC-578), the changelog, the roadmap (line 3; the C14 line).

THE TWO MEASUREMENTS — read only; nothing written to either database; paste each result whole
- M1, ethio-staging, through REST with the E2E credentials you hold (never print a key): run, from the repository's root, exactly:
  node --input-type=module -e 'const url = process.env.E2E_SUPABASE_URL, key = process.env.E2E_SUPABASE_SERVICE_ROLE_KEY; const count = async (path) => (await fetch(`${url}/rest/v1/${path}`, { method: "HEAD", headers: { apikey: key, Authorization: `Bearer ${key}`, Prefer: "count=exact" } })).headers.get("content-range"); const day = new Date(Date.now() - 86400000).toISOString(); console.log("categories", await count("categories?select=id")); console.log("scratch categories", await count("categories?select=id&slug=like.e2e-*")); console.log("scratch older than a day", await count(`categories?select=id&slug=like.e2e-*&created_at=lt.${day}`)); console.log("tree pointers", await count("category_tree_pointers?select=id")); console.log("attribute links", await count("category_attribute_links?select=category_id"));'
  Paste its five lines. If an E2E variable is missing in your sandbox, say which, and go on.
- M2, ethio-prod, with your query tool (a SELECT only; it reads the real catalogue):
  (a) SELECT (SELECT count(*) FROM public.categories) AS categories, (SELECT count(*) FROM public.category_tree_pointers) AS pointers, (SELECT count(*) FROM public.category_attribute_links) AS links;
  (b) the roster's own query (`admin_list_categories`' body, as in supabase/migrations/20260928002133_f98b5cf0-bb5a-4842-ac89-7bad2fc31517.sql), under EXPLAIN ANALYZE. Run it exactly as below; paste the plan's last two lines ("Planning Time", "Execution Time") and its first line:
EXPLAIN (ANALYZE, BUFFERS)
  WITH RECURSIVE edge AS (
      SELECT c.id AS cat_id, e.parent_id, e.display_order AS edge_order
        FROM public.categories c
        LEFT JOIN LATERAL (
          SELECT p.parent_id, p.display_order
            FROM public.category_tree_pointers p
            LEFT JOIN public.categories pc ON pc.id = p.parent_id
           WHERE p.child_id = c.id
             AND (p.parent_id IS NULL OR pc.is_active)
           ORDER BY (NOT p.is_primary), (p.parent_id IS NOT NULL), p.display_order, p.created_at
           LIMIT 1
        ) e ON TRUE
       WHERE EXISTS (SELECT 1 FROM public.category_tree_pointers p2
                      WHERE p2.child_id = c.id)
    ),
    node AS (
      SELECT c.id, c.slug, c.is_catchall, e.parent_id,
             COALESCE(e.edge_order, c.display_order) AS edge_order
        FROM public.categories c
        JOIN edge e ON e.cat_id = c.id
    ),
    walk AS (
      SELECT n.id, n.slug, n.parent_id, n.edge_order,
             ARRAY[n.edge_order] AS path, 1 AS depth
        FROM node n
       WHERE n.parent_id IS NULL
      UNION ALL
      SELECT n.id, n.slug, n.parent_id, n.edge_order,
             w.path || n.edge_order, w.depth + 1
        FROM node n
        JOIN walk w ON w.id = n.parent_id
       WHERE w.depth < 20
    ),
    orphan AS (
      SELECT c.id, c.slug, NULL::uuid AS parent_id,
             row_number() OVER (ORDER BY c.slug)::int AS edge_order,
             ARRAY[row_number() OVER (ORDER BY c.slug)::int] AS path
        FROM public.categories c
       WHERE NOT EXISTS (SELECT 1 FROM public.category_tree_pointers p
                          WHERE p.child_id = c.id)
    ),
    listed AS (
      SELECT w.id, w.slug, w.parent_id, w.edge_order, w.path, 0 AS seg FROM walk w
      UNION ALL
      SELECT o.id, o.slug, o.parent_id, o.edge_order, o.path, 1 AS seg FROM orphan o
    ),
    -- DIRECT links: the "attributes: N" figure stays the category's own count.
    lnk AS (
      SELECT k.category_id,
             count(*)::int AS attribute_count
        FROM public.category_attribute_links k
       GROUP BY k.category_id
    ),
    -- C3-INH (DEC-044), amended by INH-1: the CARD count is EFFECTIVE over the
    -- PRIMARY lineage only — own ∪ primary ancestors, nearest link wins. A
    -- secondary (browse) parent confers nothing, so its child keeps the amber
    -- flag until it carries (or primarily inherits) its own card attributes.
    anc AS (
      SELECT c.id AS cat_id, c.id AS src_id, 0 AS depth
        FROM public.categories c
      UNION ALL
      SELECT a.cat_id, public.cat_primary_parent(a.src_id), a.depth + 1
        FROM anc a
       WHERE a.depth < 10
         AND public.cat_primary_parent(a.src_id) IS NOT NULL
    ),
    effl AS (
      SELECT DISTINCT ON (anc.cat_id, k.attribute_id)
             anc.cat_id, k.attribute_id, k.card_rank
        FROM anc
        JOIN public.category_attribute_links k ON k.category_id = anc.src_id
       ORDER BY anc.cat_id, k.attribute_id, anc.depth ASC, k.id
    ),
    effcard AS (
      SELECT effl.cat_id AS category_id,
             count(*) FILTER (WHERE effl.card_rank IS NOT NULL)::int AS card_attribute_count
        FROM effl
       GROUP BY effl.cat_id
    ),
    sec AS (
      SELECT l.id AS category_id,
             array_agg(pc.name_en ORDER BY pc.name_en) AS names
        FROM listed l
        JOIN public.category_tree_pointers p ON p.child_id = l.id
        JOIN public.categories pc ON pc.id = p.parent_id AND pc.is_active
       WHERE l.parent_id IS NULL OR p.parent_id <> l.parent_id
       GROUP BY l.id
    ),
    excl AS (
      SELECT x.category_id,
             count(*)::int AS exclusion_count,
             array_agg(x.country_code::text ORDER BY x.country_code) AS codes
        FROM public.category_country_exclusions x
       GROUP BY x.category_id
    ),
    lst AS (
      SELECT li.category_id, count(*)::int AS listing_count
        FROM public.listings li
       WHERE li.status = 'active'
       GROUP BY li.category_id
    )
    SELECT c.id, c.slug, c.name_en, c.icon, c.is_active,
           c.is_catchall, c.allow_listings,
           l.edge_order,
           c.price_enabled, c.expiry_days,
           c.visible_from, c.visible_until,
           l.parent_id,
           COALESCE(e.exclusion_count, 0),
           COALESCE(s.listing_count, 0),
           COALESCE(e.codes, ARRAY[]::text[]),
           (c.image_url IS NOT NULL),
           COALESCE(k.attribute_count, 0),
           COALESCE(ec.card_attribute_count, 0),
           COALESCE(sp.names, ARRAY[]::text[])
      FROM listed l
      JOIN public.categories c ON c.id = l.id
      LEFT JOIN lnk  k  ON k.category_id  = l.id
      LEFT JOIN effcard ec ON ec.category_id = l.id
      LEFT JOIN sec  sp ON sp.category_id = l.id
      LEFT JOIN excl e  ON e.category_id  = l.id
      LEFT JOIN lst  s  ON s.category_id  = l.id
     ORDER BY l.seg, l.path, l.slug
  If your tool refuses EXPLAIN ANALYZE, say so, and run (b) without its first line as SELECT count(*) FROM ( … ) AS q, pasting the count and the time your tool shows.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- INC-579 is measured before it is fixed (G21). The fix — a lighter roster read, a test that waits for the page's own re-read, or the scratch rows cleared — is chosen from M1, M2 and the next `[roster-dump]` line, in the next turn.
- INC-578 follows INC-447's rule; the new ids are UP-5 and UP-6.

TESTS
- Unit: UP-5, UP-6 (NEW).
- E2E: every test that uses `createViaUi` or `findRow` runs as before; a miss now carries the `[roster-dump]` line.
- Not edited: every other test.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn C13 applied)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 721 unit tests (122 files), the usage maps (they match), the hardcoded-string scan, the root-route check, the selector self-test, the identity-tag guard, the build and the bundle budget ("JS: 309.6 KiB / 320 KiB").
- Red first: with the two routes as they were, UP-5 and UP-6 fail (the raw sentence comes back as the reason); with the change they pass.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-42.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn C13's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the two measurements;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- No migration this turn: nothing is written to either database. The measurements read only.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 9 paths in the hashes table and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-42.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 9 files → each equal to:
  aed074c7d5cd4dd013333aeb9e18d85fcf76832f7365fdaec6c7b5161ce8469b  docs/_changelog.md
  dfd9dae7cc758633a7ebbe59b8fe6060631843517d9906eaf795f02381379fd3  docs/features/categories.md
  deb2abe7c5410d3a0bf4a1d289ed53064cfca0e9809e0e550a382c1cc178d7d6  docs/features/posting.md
  5748bb7831da2f0a9dc2bf284cc3789bbde874193f240aefe8b10862764beb2b  e2e/helpers/categories.ts
  8850a0e4f4106db5ce5f6210d4ea61c42a3280f660cc017c95adfe04faf5b2b9  roadmap.md
  aab7aca0bfc818f03fbf3f33cbf07b0bb3eb0a10fcb6221d29feab1be955ef32  src/features/admin-categories/categories-page.tsx
  70095bb4364bd96e4a2e4d192dcc6d399e7ec7e613417f03d2006c532dda5c06  src/routes/api/listings/alias.ts
  169a13723a616e2437d0e84f87ecb7796335c56e0bc76a897c747c4add0a40d5  src/routes/api/listings/identity.ts
  24cda281517822970fa2217ecf385b13d6d2cc5533322203caa235d909a2ccea  src/server/supabase/upstream.test.ts

THE CARRIER — C14-TURN-CARRIER-2026-10-12.md (10,696 bytes; sha256 5f1d3fab638fb683bb83f7f291728fec7438e847357836f151c0333650b630f2; 21 sections)
- Its first line starts "C14 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 9 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  20aa470759d840921d9883bd4a02553534748851613ec57592498aac03f981f1  docs/_changelog.md
  dcd01ba165549d047ce7bc358bc2c8157e61742f5fda12b0542c9a18b199b7cf  docs/features/categories.md
  f72ade72a2d3c48f9746e12ff23eac52d7874c679b052c38651fe5e5c16c91d7  docs/features/posting.md
  67ad3024a2b5a09903a9d167da15311a7b6d03bdde0f138e2fdf197da57400e9  e2e/helpers/categories.ts
  43e91fc5be9d195801146a95637c98c6df51857ba169268a9d1b0d84742bd67d  roadmap.md
  e0f507dc58d681b2f66a82e2d9d6cb5f1692a1fa36e133afeaa97349654f4f42  src/features/admin-categories/categories-page.tsx
  2dd4d7165abd4cafeb7acce73bd65f0a6edf0bb76e6303cb875ab4e44de39f62  src/routes/api/listings/alias.ts
  329ab31e18caccad5958cc90428bff355da5f91311559c5277011054208ee23e  src/routes/api/listings/identity.ts
  1ac9714887d34812e001fba019e3617c5e40463145135e6b091acd44e3bea9ee  src/server/supabase/upstream.test.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 721 passed (122 files);
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bash scripts/check-identity-tags.sh` (the OK line and the three named deferrals, as before this turn);
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran all three on its own copy (WHAT THE SUPERVISOR RAN).

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(b).
- The 9 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 9 paths and the brief.
- The checks.
- M1's five lines; M2 (a)'s row and (b)'s lines.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Publish once CI is green on the final commit (the posting routes changed).
```
