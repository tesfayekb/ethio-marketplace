MIGRATION — cursor-bundle-2 part A0–C: the list rule, the list doors, the Screening queue's door, two closed public reads
DONE: STEP 0, STEP 1, STEP 2 (ruling 1's files A0, A, A2, B, C; items 1, 2 and 3 in the database; the DEC-423 guard)
LEFT: STEPS 3–8 (the readers and their tests, the types patch's consumers, items 4–6, the gate, the report)
CI: dev `63d6bee0d60517187cf1a636666c5ffeb308f7d4` — Conclusion: **SUCCESS**, completed 2026-11-21T23:06:30Z, run https://github.com/tesfayekb/ethio-marketplace/actions/runs/44959633359; this branch at `80eed9f7e` (stop 1's head) — Conclusion: **SUCCESS**, completed 2026-11-21T23:36:54Z, run https://github.com/tesfayekb/ethio-marketplace/actions/runs/44962204804. The four commits below are not yet pushed, so not yet run.
FILES: (`git diff --name-only 63d6bee0d..HEAD`)
docs/governance/briefs/cursor-bundle-2-ruling-1.md
docs/governance/briefs/cursor-bundle-2.md
docs/governance/reports/cursor-bundle-2.census.md
docs/governance/reports/cursor-bundle-2.stop-1.md
docs/governance/reports/cursor-bundle-2.stop-2.md
e2e/ad-page-doors.spec.ts
e2e/admin-listings.spec.ts
e2e/admin-monetisation.spec.ts
e2e/my-listings-page.spec.ts
roadmap.md
scripts/conformance/seller-names-allowlist.txt
scripts/conformance/wired.test.ts
scripts/doors/catalogue.ts
scripts/doors/check-doors-allowlist.txt
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/identity.ts
scripts/doors/judge.ts
scripts/doors/manifest.txt
scripts/doors/open-rules.txt
scripts/doors/rows.ts
scripts/public-surface-allowlist.txt
supabase/migrations/20261122023100_a1caa1e9-2188-4f2e-8441-c1da1dad769a.sql
supabase/migrations/20261122023200_3d572b84-aa6b-4bc6-beeb-145593fb13a3.sql
supabase/migrations/20261122023300_7366b006-8a16-4200-b479-44976331bf43.sql
supabase/migrations/20261122023400_219cb8ac-c6b7-44ce-a1c2-522657879179.sql
supabase/migrations/20261122023500_3ab61b82-efab-48ec-8133-bf879e994a1b.sql

The ruling (docs/governance/briefs/cursor-bundle-2-ruling-1.md) was saved by scripted copy; its sha256
`0dd1c29c9d1cd046cd1409202e26a3591e143a8c9675a79b6db765a8549e1181` equalled the stated value at the source and at the
destination.

## The five files, in apply order

Marks were chosen at the first commit (UTC hour 02, rounded up, plus one hour: 04:00), then +100 per further file; each
is above the ledger's newest (`20261121160000`) and above the previous file's pre-check; the file-name order equals the
mark order.

### 1. `20261122023100_a1caa1e9-2188-4f2e-8441-c1da1dad769a.sql` — A0, commit `0757d25d7`
- sha256 `40c399e0b47734737fea3bc2e1842713fd5e22a7ba6b703a9293634a49bdbd4b`; mark `20261122040000`.
- Creates `door_filter_countries(text[], text) → character(2)[]` (body md5 `082a4b33fe8ae87959cdbc26c3f07a37`) and
  `door_filter_categories(uuid[], text) → uuid[]` (body md5 `5cd2410db10c8e5077f6d8f7e86df5fa`). INVOKER, STABLE,
  `search_path public`, closed to PUBLIC, anon and authenticated, EXECUTE to the service role (no manifest line: not
  browser-callable). Redeclares nothing; its pre-check reads the previous mark and the existence of `door_refuse` and
  `cat_descendants`.
- Proofs: (a) header, grants, both body md5s; (b) the answers (NULL and `{}` → NULL; distinct upper-cased codes in order;
  a well-formed code naming no market answers itself; a category list answers its roots with their subtrees, distinct; a
  category that exists nowhere answers itself); (c) the refusals `badValue:<field>`: 21 values, 21 equal values (counted as
  sent), a NULL value, three letters, a digit, an empty string; exactly 20 pass.
- Guard (rides this commit): the door finding `filter-off-helper` in `scripts/doors` (judge.ts), proven on a planted body
  that compares the argument itself (`PLANTED_LIST_OFF`) and on its clean twin (`PLANTED_LIST_THROUGH`); DOORS-18, named in
  `scripts/conformance/wired.test.ts`. Its allowlist lines: 35 permanent (until 2027-05-31, grouped by reason: a writer's
  target, a console's one category, the feed's own category or place, a page's market, a download's or an import's scope);
  the three temporary lines it carried for the three list doors left in the next commit.
- `apply a1caa1e9 → expect mark 20261122040000`

### 2. `20261122023200_3d572b84-aa6b-4bc6-beeb-145593fb13a3.sql` — A, commit `490515b13`
- sha256 `b0054b2e7cc4aa5c434b1467286c75c870f2e23983678ca8d83757ebd068fdfe`; mark `20261122040100`.
- Pre-check: mark `20261122040000`; live md5s `admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)`
  `ec92e6b6d2453d53a24fb9622f9ec9d7`, `my_listings(text,integer,integer,text,uuid,text)`
  `de99323ea3dfe39e78fa49ce8c7d8aa9` (the values the ruling gave; the proof stack held both, so no STOP).
- DROP + CREATE, whole from `20261118012800` and `20261119150200`, changed only where named:
  `admin_list_listings(text,text,text[],uuid[],text,date,date,text,integer,integer)` (body md5
  `a9ce9f7a9a65db31ac086883e0b81091`; `p_country text[]`, `p_category uuid[]`; the two lists read by the list rule after the
  view and tier checks; the reach clause stays AND-ed; the status arrays verbatim) and
  `my_listings(text,integer,integer,text,uuid[],text)` (body md5 `619f5b92860683dc5eb6b8686e0306bd`; `p_category uuid[]`
  read once, after the mark check, by both reads). Grants restated (admin_list_listings: authenticated and service role;
  my_listings: authenticated, and ALL to the service role).
- Proofs: (a) new and old argument lists, header, grants, both md5s; (b) 15 list reads on scratch ads (two countries OR-ed,
  case and spaces, one country, NULL and `{}`, a code naming no market → no row, two categories, a parent with its subtree,
  both lists AND-ed, a category that exists nowhere → no row); (c) 10 refusals (21 values, three letters, a NULL value, a NULL
  category, each as `badValue:<field>`; no permission → `permissionDenied` and no caller → `notSignedIn`, each before the list is
  read) and exactly 20 passing; (d) the reach (an XZ holder lists XZ's ads in every list form and never XY's), `my_listings`
  stays the caller's own, its counts follow the list, another person's list is empty; (e) EXPLAIN: a category list keeps
  `listings_category_idx`.
- `apply 3d572b84 → expect mark 20261122040100`

### 3. `20261122023300_7366b006-8a16-4200-b479-44976331bf43.sql` — A2, commit `490515b13`
- sha256 `5edf87e77309bce595d7d33f8b3b80abe3ec1209e34031e1b39627bf43bbca97`; mark `20261122040200`.
- Pre-check: mark `20261122040100`; live md5 `admin_list_locations(text,text,text,boolean)`
  `61bce55bd1c482aec95991d015bfa5f8` (the ruling's value; the proof stack held it).
- DROP + CREATE `admin_list_locations(text[],text,text,boolean)`, whole from `20261115123200`, body md5
  `72ba9a070eabdc79d8a34a25b257d973`: `p_country_code text[] DEFAULT NULL`, read by the list rule with field `country`, the
  reach clause AND-ed. Grants: authenticated and the service role (see the first departure below).
- Proofs: (a) header, grants, md5, the old argument list gone; (b) 9 list reads on scratch places; (c) refusals as A's, and
  20 values passing; (d) the reach; (e) EXPLAIN: a country list keeps `locations_country_idx`.
- `apply 7366b006 → expect mark 20261122040200`

### 4. `20261122023400_219cb8ac-c6b7-44ce-a1c2-522657879179.sql` — B, commit `e5e3c5574`
- sha256 `5d79887115e5f36ca5ec10189af7094f7e45d6504e20bb4b03e24cc9e0d2d7e5`; mark `20261122040300`.
- Pre-check: mark `20261122040200`; the helper and `door_context` exist (a new function: no body to compare).
- CREATE `admin_screening_queue(text,text[],text,text,integer,integer) → jsonb` (body md5
  `b9361dc3860adf0b6ddeb541933fe93d`), STABLE SECURITY DEFINER, `search_path public`: `door_context('staff-reader',
  'listings','review',NULL,NULL,'filter')`; `badValue:tier` as `admin_list_listings`; the country list by the list rule; the
  seller's e-mail shown and matched only with `profiles:view`; rows in screening only; oldest change first; `{total, rows}`,
  the total counted apart from the page (a MATERIALIZED hit set, the page joined back); a row has exactly 25 keys (the 17
  columns the queue's read selected, the category's and the place's names and the place's country flat, and the seller's alias,
  business name and e-mail). Grants: authenticated and service role; closed to PUBLIC and anon.
- Proofs: (a) header, grants, md5; (b) the answer's shape and the row's exact key set, the order read back from the table,
  the row's values, an ad's id finds it, an ad not in screening is never a row; (c) the page and the total; (d) the e-mail
  with and without `profiles:view`, the alias and the business name matching for both; (e) the gates and codes (7 cases);
  (f) the lists and the reach (two countries OR-ed, `XQ` → no row and total 0, the XZ holder's total counts only its own);
  (g) EXPLAIN: a country list keeps `locations_country_idx`.
- Lists it joined: `scripts/doors/manifest.txt` (`admin_screening_queue(text,text[],text,text,integer,integer) |
  staff-reader | authenticated | listings:review | … | filter | - | badValue | -`), `scripts/public-surface-allowlist.txt`,
  `scripts/conformance/seller-names-allowlist.txt`.
- `apply 219cb8ac → expect mark 20261122040300`

### 5. `20261122023500_3ab61b82-efab-48ec-8133-bf879e994a1b.sql` — C, commit `51fe27c9d`
- sha256 `ea0b9a860e64b4ca5d3789ed9ba0432ebf7d39f94187d6436c9cb2ae416bc0a1`; mark `20261122040400`.
- Pre-check: mark `20261122040300`. Redeclares no function.
- REVOKE SELECT (every column) on `level_overrides` and on `market_settings` from anon and authenticated; DROP POLICY
  `level_overrides_public_read` and `market_settings_public_read`. Nothing granted.
- Proofs: (a) neither role holds SELECT on either table or any column; the service role reads both; (b) each table's
  policies are exactly its three write refusals; (c) a read as anon and as authenticated is refused by privilege (42501);
  (d) neither table forces row security.
- Lists it joined: `scripts/doors/open-rules.txt` (two lines removed), `scripts/public-surface-allowlist.txt` (two lines in
  the RETIRED form), `e2e/admin-monetisation.spec.ts` (MON-13 expects 42501 for both roles on `market_settings`; the stale
  comment replaced).
- `apply 3ab61b82 → expect mark 20261122040400`

## The pre-stop scan and the guards

pre-stop scan: 7 of 7, a1caa1e9, 3d572b84, 7366b006, 219cb8ac, 3ab61b82

`bash scripts/check-migrations.sh` on the final tree (exit 0), its guard lines:

```
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard OK (floor 20260817054246).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard OK (floor 20261007000000).
Spanning-literal guard OK (floor 20261109000000).
Random-text guard OK (floor 20261118160000).
Migration guard OK.
```

`bun run db:proof --fresh`, last line, on the final tree: `db:proof PASS — applied 550/550, CLI 2.120.0, cold, 56 s`.

Also green on the final tree: `bun run typecheck`, `bun run lint`, `bunx vitest run scripts --maxWorkers=2` (128 files, 696
passed, 1 skipped), `bun scripts/doors/check-doors.ts` (self-test: 18 finding kinds fired, the clean pair fired nothing;
static: 221 manifest lines reconcile). `bun run checks` (the pre-push gate) and the browser tests are STEPS 7–8's and have not
run; no E2E value was used.

Red before green, as far as it was shown: DOORS-18 (a planted body that compares the argument itself is a
`filter-off-helper` finding; its clean twin is none); file B's proof (f) failed when its reach clause was replaced by `true`
and passed on the restored body (the scratch copy is not in the tree); each proof also failed once on its own first
draft (the refusals' form, below) before it passed. The proofs of A0, A, A2 and C were not separately mutated.

## Departures and things the supervisor should read

1. **A2 grants the service role too.** Ruling 1 said "authenticated only"; the door guard's `grant-dropped` finding refuses a
   DROP + CREATE that does not restate a grant the dropped function held, and `admin_list_locations` held the service role's
   (`20260915232928`). The file restates it (`GRANT ALL … TO service_role`). Say so if the ruling meant to withdraw it.
2. **A reader's refusal is PGRST, not P0D01, in a transaction a reader's gate has marked** (F1-7c). The proofs of A, A2 and B
   clear `door.outer` before each refused call and expect SQLSTATE `PGRST` with the body `{code: P0D01, message: <code>}`.
3. **One temporary allowance:** `scripts/doors/check-doors-allowlist.txt` carries `grant-without-caller
   admin_screening_queue(…) | … | DEC-422` — the door is born here and its caller moves onto it in STEP 3, where the line goes
   stale and is removed in the same commit as the caller.
4. **No types patch is applied.** `src/integrations/supabase/types.ts` is untouched; the readers (`use-admin-listings.ts`,
   `my-listings.ts`, `locations-service.ts`, the queue's four) change in STEP 3 after the patch. The existing e2e call sites that
   passed one country or category (`e2e/admin-listings.spec.ts`, `e2e/ad-page-doors.spec.ts`, `e2e/my-listings-page.spec.ts`)
   now pass a list of one; they are `Record<string, unknown>` or untyped `rpc` calls, so typecheck is unaffected.
5. **The new signatures for the types patch** (all `DEFAULT NULL` trailing-optional where they were): `admin_list_listings(p_view,
   p_search, p_country text[], p_category uuid[], p_seller, p_from, p_to, p_tier, p_limit, p_offset)`; `my_listings(p_group,
   p_limit, p_offset, p_search, p_category uuid[], p_mark)`; `admin_list_locations(p_country_code text[], p_search, p_level,
   p_active)`; `admin_screening_queue(p_search, p_country text[], p_tier, p_seller, p_limit, p_offset) → jsonb`; the two helpers
   are closed to browsers and not in the types.
6. **K2 — other places with the same concern.** The `filter-off-helper` census names every door argument that is a country,
   category or scope and is not read by the list rule; the 35 permanent lines in `check-doors-allowlist.txt` are each a value a
   door writes or names, a download's or an import's scope, or a page's own market — none is a list filter.
7. **Process notes.** The lists were edited once with a short Python heredoc script (not `python -c`); the generated migrations
   (A, A2, B) were assembled by a scratch script under `/tmp/ethio-scratch/cursor-bundle-2/gen/` from the last declarations,
   each replacement asserted to match exactly once; the scratch directory is the operator's to remove. At the push no Feed
   bench run was queued or in progress (`gh run list` showed none; the weekly run starts Sunday 13:10 UTC).
