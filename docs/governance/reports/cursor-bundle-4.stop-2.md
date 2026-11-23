MIGRATION — cursor-bundle-4 part 2 file 1: the five staff photo readers as doors (and Part 1 built)
DONE: STEP 2 (Part 1, commit a2a20f094), STEP 3 file 1 (commit 992b88205), `bun run db:proof --fresh`
LEFT: STEP 4 (the five readers and the photo-links route move; file 2, the drops; the standing check DOORS-19/20; the comment corrections of decision 22), STEP 5 (Part 3), STEP 6 (the gate and the self-review), STEP 8 (the one final push), STEP 9 (the report)
CI: # CI Status (auto-generated — do not edit by hand) · Commit `ce25a77513c7aed2ce500159dacb54f2c813545d` (short `ce25a77`) · Conclusion **SUCCESS** · Completed (UTC) 2026-11-22T23:44:00Z · Run https://github.com/tesfayekb/ethio-marketplace/actions/runs/45084055511 (dev's, read this turn by `git fetch origin dev ci-evidence`; no run of this branch exists yet)
FILES:
docs/features/doors.md
docs/features/routes.md
docs/governance/briefs/cursor-bundle-4-ruling-1.md
scripts/conformance/briefs-allowlist.txt
scripts/conformance/refusal-readers-allowlist.txt
scripts/conformance/refusal-readers.test.ts
scripts/conformance/refusal-readers.ts
scripts/doors/check-doors-allowlist.txt
scripts/doors/manifest.txt
scripts/public-surface-allowlist.txt
scripts/route-budgets.mjs
src/features/ad-page/save.test.ts
src/features/ad-page/save.ts
src/features/admin-ai/ai-service.ts
src/features/admin-categories/category-images-service.test.ts
src/features/admin-categories/category-images-service.ts
src/features/admin-listings/listing-settings.tsx
src/features/admin-listings/use-admin-listing.test.ts
src/features/admin-listings/use-admin-listing.ts
src/features/admin-listings/use-admin-listings.ts
src/features/admin-listings/use-listing-reports.test.tsx
src/features/admin-listings/use-listing-reports.ts
src/features/admin-monetisation/monetisation-service.ts
src/features/admin-screening/use-name-checks.ts
src/features/admin-screening/use-photo-changes.ts
src/features/admin-screening/use-photo-reviews.ts
src/features/admin-screening/use-screening.ts
src/features/legal/legal-page-data.ts
src/features/my-listings/my-listing.test.ts
src/features/my-listings/my-listing.ts
src/features/my-listings/my-listings.ts
src/features/my-listings/promote-service.ts
src/features/posting/posting-service-reads.test.ts
src/features/posting/posting-service.test.ts
src/features/posting/posting-service.ts
src/features/posting/pricing-data.test.ts
src/features/posting/pricing-data.ts
src/features/posting/step-pricing.test.tsx
src/features/posting/step-pricing.tsx
src/features/posting/step-where.test.tsx
src/features/posting/step-where.tsx
src/features/posting/use-edit-draft.test.ts
src/features/posting/use-edit-draft.ts
src/features/seller/seller-review.ts
src/lib/reader-failure.test.ts
src/lib/reader-failure.ts
src/server/answer.test.ts
supabase/migrations/20261123020600_4a43af42-55bf-4760-b019-b26ca688cf95.sql
docs/governance/reports/cursor-bundle-4.stop-2.md

## The file

`supabase/migrations/20261123020600_4a43af42-55bf-4760-b019-b26ca688cf95.sql`
- sha256 `6f84a3b824d3293e4082db8a9a922f0e5d4d7533160d85e4e0abc27a03b71d40`
- declared mark `20261123040000` (commit at 02:17 UTC: next hour 03:00 plus one hour; above the ledger's newest, `20261122040400`)
- first line `-- e2e-areas: admin-screening, admin-listings`
- creates five functions (STABLE, SECURITY DEFINER, `SET search_path TO 'public'`, each `door_context('staff-reader', 'listings', <action>, NULL, NULL, 'filter')`); nothing is dropped, nothing is revoked, no table is touched
- closers in-file: `REVOKE ALL … FROM PUBLIC, anon; GRANT EXECUTE … TO authenticated, service_role` for each, then the mark
- also: five lines in `scripts/doors/manifest.txt`, five in `scripts/public-surface-allowlist.txt`, five `grant-without-caller` lines in `scripts/doors/check-doors-allowlist.txt` (see Departures)

### The five doors, the md5 of each body (`md5(replace(prosrc, chr(13), ''))`, the value the proof's (a) holds)

| door | permission | body md5 |
|---|---|---|
| `admin_listing_photos(uuid)` | listings:view | `7ad565d3adf63eee60350ebab868ffc7` |
| `admin_photo_changes()` | listings:review | `f5f2535c58136a339bacb547f33d81ef` |
| `admin_photo_reviews()` | listings:review | `a9411ee130eecdb50e8a532a6b32fff1` |
| `admin_warned_listings(uuid[])` | listings:view | `6495fe5ed5b855f1301552f33e31393a` |
| `admin_photo_link_rows(uuid[])` | listings:view | `24d9742263a5bf653094c3c1071c4076` |

(Every door here is new: no body is redeclared, so no pre-check reads a live md5; the one pre-check reads the previous mark, `20261122040400`.)

### Each door's columns beside its reader's old select

| door | answers | the reader's old select (file:line) |
|---|---|---|
| `admin_listing_photos` | `id, display_order, paths, storage_path, unscreened, warning jsonb {codes}, review jsonb {label, code, evidence, decided_at}`, `ORDER BY display_order` | `PHOTO_ROW_SELECT` = `id,display_order,paths,storage_path,unscreened,warning:listing_photo_warnings(codes),review:listing_photo_reviews(label,code,evidence,decided_at)`, `.eq("listing_id")`, `.order("display_order")` (`use-screening.ts:259`, `use-edit-draft.ts:136`, `:322`) |
| `admin_photo_changes` | `id, kind, photo_id, replaced_photo_id, codes, created_at, listing jsonb {id, title, status}`; `reviewed_at IS NULL`; `ORDER BY created_at, id`; `LIMIT 100` | `id,kind,photo_id,replaced_photo_id,codes,created_at,listing:listings(id,title,status)`, `.is("reviewed_at", null)`, order `created_at` then `id`, `.limit(PHOTO_CHANGES_LIMIT)` = 100 (`use-photo-changes.ts:68`) |
| `admin_photo_reviews` | `photo_id, label, code, evidence, created_at, listing jsonb {id, title, status}`; `decided_at IS NULL`; status not in `draft, removed, rejected`; `ORDER BY created_at, photo_id`; `LIMIT 100` | `photo_id,label,code,evidence,created_at,listing:listings!inner(id,title,status)`, `.is("decided_at", null)`, `.not("listing.status","in",…)`, order `created_at` then `photo_id`, `.limit(PHOTO_REVIEWS_LIMIT)` = 100 (`use-photo-reviews.ts:63`) |
| `admin_warned_listings` | `listing_id, codes` for the given ids | `listing_id,codes`, `.in("listing_id", …)` (`use-photo-changes.ts:111`); the `not_relevant` filter stays in the reader |
| `admin_photo_link_rows` | `id, paths, exif_stripped` for the given ids | `id, paths, exif_stripped`, `.in("id", …)` (`src/server/media/links.ts:100`) |

"Rows in the caller's reach" is the one reach rule of `admin_screening_facts`: `v_ctx.countries IS NULL OR listings.home_country_code = ANY (v_ctx.countries)`. The old table rules had no country scope; this is the narrowing decision 14 asks for.

### The two list doors' ceilings and where they were read from

- `admin_photo_link_rows`: `badSize` above **30** ids = `MAX_LINK_PHOTOS` (`src/server/media/links.ts:33`); stated in its manifest line's reason.
- `admin_warned_listings`: `badSize` above **100** ids = the largest page any staff list that calls it draws: `PAGE_SIZE_OPTIONS = [10, 25, 50, 100]` (`src/components/shell/page-size-options.ts:2`, the Listings console) and `SCREENING_PAGE_SIZES = [25, 50, 100]` (`use-screening.ts:33`, the Screening console); stated in its manifest line's reason.
- The two queues' `LIMIT 100` are `PHOTO_CHANGES_LIMIT` (`use-photo-changes.ts:21`) and `PHOTO_REVIEWS_LIMIT` (`use-photo-reviews.ts`).

### The hidden statuses (DECIDE-AND-NAME)

Written once, in the body of `admin_photo_reviews` (`v_hidden CONSTANT text[] := ARRAY['draft', 'removed', 'rejected']`). No other SQL body names the list (grep of the migrations). The client constant `PHOTO_REVIEW_HIDDEN_STATUSES` (`use-photo-reviews.ts`) has no user but that reader; the reader's move in STEP 4 removes it, so the list then stands in one place only. Say if you want it kept.

### The proofs (one `DO $proof$` block, scratch rows only, rolled back)

(a) catalog facts of each door and its body md5; (b) the gates raised as PGRST with the body the route reads: no caller `notSignedIn`, no permission `permissionDenied`, a deactivated holder `accountDeactivated`, and the holder of listings:view alone refused the two queues and reading the other three; (c) `listingNotFound` (no ad; an ad of another country for the country holder), `badSize` at 101 and 31 and none at 100 and 30; (d) the answers and the reach for the global holder, the country holder (XZ only) and the service role, judged on the scratch rows only (scratch rows are dated 1970 so they sort first, never a real row's value): open only, the hidden statuses out, a reviewed change out, order, the review only listings:review reads, paths and unscreened and the warning as the table gave them; (e) no dial spent and no refusal metered.

Planted-failure proof: I changed one expected array of (d) (the country holder's link rows) in the file; `bun run db:proof --fresh` answered FAIL at that proof, naming the rows it saw; I restored the file by copy (the two files' md5 were equal) and ran `bun run db:proof --fresh` again: PASS (the last line below).

pre-stop scan: 7 of 7 — (1) order: the scratch country, places, listings, photos precede their rows; (2) every scratch key keeps its column's pattern (slug, key and name forms copied from `20261118012800`'s proof; `evidence` under 200); (3) every literal has its parameter's type (`ARRAY[...]::uuid[]`, `timestamptz '1970-…'`); (4) no real row is a proof's expectation (every list is filtered to scratch ids; the scratch rows are dated 1970); (5) one `gen_random_uuid()` per name, none drawn twice for one key; (6) the one pre-check reads the previous mark; (7) carrier: the md5 and body compare strip `chr(13)`, no literal spans a line break.

### The guard lines

```
db:proof PASS — applied 551/551, CLI 2.120.0, cold, 57 s
Self-marking guard OK (floor 20260817054246).
Public-surface guard OK (floor 20261003215043).
Spanning-literal guard OK (floor 20261109000000).
Random-text guard OK (floor 20261118160000).
Migration guard OK.
check-doors static OK: 226 manifest lines reconcile with the migrations' catalogue
```

`bunx vitest run scripts --maxWorkers=2`: 129 files, 714 passed, 1 skipped, 0 failed (on commit 992b88205's tree).

### The apply pairing line

apply 4a43af42 → expect mark 20261123040000

The pull request's preflight job will report STAGING BEHIND until ethio-staging holds the mark: expected, not re-run.

## Part 1 (STEP 2), built and committed (a2a20f094)

Typecheck and lint clean; `bunx vitest run scripts --maxWorkers=2` 129 files / 714 tests passed; the touched feature tests pass. Decisions 1–12 as ruled: `readFailed(error, status?)` is the one factory; the mark is `P0D01` with a camelCase head; the 26 consumer rows and every `new ReaderError(readerFailure(` site moved; the category-image prune throws nothing; INC-1257's four readers throw typed failures and their callers log `[client-error] <what> <class>` and draw no prefill.

### The allowlist lines CFRR-5 holds

`scripts/conformance/refusal-readers-allowlist.txt` gains one line:
`src/lib/signed-in-route.ts:20 | the session read failed, not a database call: requireSignedIn says so in its own sentence for the route's error view (INC-914); the line moves to the typed failure with the raw rethrows of INC-1256 | INC-1256`

### The page table, before / after (first-download KiB, my lock-exact local build; base = `9a6c235a9`, same machine)

Fifty pages measured; 48 moved by at most 51 B (hashed-name noise: `index.js` +12 B, `shared-shell.js` +4 B, ±1–4 B on small chunks). The two that grow by the reader's chunk:

| page | base | after | Δ | ceiling before → after | new room |
|---|---|---|---|---|---|
| `/account_/saved` | 221.813 | 222.761 | +970 B | 223 → **224** | 1.139 (local +0.1) |
| `/admin/categories` | 348.134 | 349.103 | +992 B | 349 → **350** | 0.797 |

Cause, chunk by chunk: `reader-failure.js` 0 → 950 B gz on both (they carried no reader-failure chunk before; static import, no `loadOnce`, decision 11); `save.js` +19 B (`/account_/saved`); `admin.categories.js` +58 B (`/admin/categories`); the rest ±1–4 B. On the 14 pages that already carried `reader-failure.js` it moved 916 → 950 B (+34 B), inside their ceilings. After the new ceilings no page is in the NEAR band; the smallest room is `/auth` at 0.496. Each ceiling line carries its cause comment. Files under `/tmp/ethio-scratch/cursor-bundle-4/`: `chunks-base.tsv`, `chunks-after.tsv`, `rooms-after.tsv`, `base/` (a tree copy, the operator's to remove).

## Departures and questions (nothing the ruling answers)

1. **`scripts/doors/check-doors-allowlist.txt` is outside the SCOPE as widened.** File 1 lands before its callers, so check-doors fails `grant-without-caller` on all five doors. The F1-7a precedent (the file's own header: "the four lines the new readers held until their callers moved left with the callers") is five lines of that kind, `until 2026-12-31`, each leaving with its reader in STEP 4. Without them the commit is red. Tell me if you want it otherwise.
2. **`scripts/conformance/briefs-allowlist.txt` is outside it too.** CF-BRIEF-19 found `DEC-429` named by four files under `scripts/` (the refusal-readers allowlist, test and module, and `scripts/route-budgets.mjs`) outside the ruling's SCOPE paragraph, and by the new allowlist lines themselves; five lines (`until 2026-12-31`), reason: the brief's SCOPE grants `scripts/conformance/` and the page ceilings, and the ruling's paragraph lists only what it widens. I kept `DEC-430` out of `scripts/public-surface-allowlist.txt` and the manifest for the same finding. Say if the supervisor prefers the ruling's SCOPE to grant the paths.
3. **`admin_listing_photos` reads the review as null for a holder of listings:view alone.** The old embed passed through `listing_photo_reviews`' own rule (listings:review), so a viewer saw none; the door keeps that (decision 14: "exactly what its reader asks today"). Staff screens that show the review hold listings:review. Confirm.
4. **Rule 30 asks list RPCs to ship their index and an EXPLAIN in the proof.** No new index: the queues are served by `listing_photo_changes_open_idx` and `listing_photo_reviews_open_idx` (open rows by `created_at`), the warnings by `listing_photo_warnings_listing_idx`, the photo reads by key. I ship no EXPLAIN (tiny scratch tables would not choose the index; the last migrations of this kind ship none). Confirm or rule.
5. **`src/integrations/supabase/types.ts` has none of the five doors,** so the readers' `supabase.rpc("admin_…")` calls cannot typecheck in STEP 4 until the generated types carry them (platform-generated, never hand-edited): the "client-types patch" the ruling names. I will not touch it.
6. **File 2's rule census.** The standing role rules (a policy text calling `has_permission(`, `has_permission_scoped(` or `is_super_admin(`) on `public` tables, read from the migrations in apply order, are 19 — `user_roles_read`, `audit_log_read`, `listings_admin_read`, `listings_admin_update`, `listing_photos_admin_read`, `profiles_admin_read`, `resources_rbac_select`, `permissions_rbac_select`, `roles_rbac_select`, `role_permissions_rbac_select`, `listing_locations_admin_read`, `listing_photo_warnings_admin_read`, `listing_photo_changes_admin_read`, `listing_photo_reviews_admin_read`, `reveal_flags_staff_read`, `listing_reports_staff_read`, `listing_packages_staff_read`, `package_prices_staff_read`, and, on `storage.objects` (stay, declared lines per decision 20), `category_assets_assets_insert`, `category_assets_assets_update`, `category_assets_assets_delete`, `category_assets_public_read`. Beyond the ruling's likely set (`audit_log`, `listing_photo_changes`, `permissions`, `resources`, `reveal_flags`, `role_permissions`, `roles`, `user_roles`), `listing_reports` and `package_prices` look like tables whose only browser SELECT rule is a staff rule; I confirm them from the migrations in STEP 4, together with the browser readers of `listings`, `profiles`, `listing_locations` and `listing_packages` (a grep of `.from("…")` under `src/` finds no staff screen on `audit_log`, `user_roles`, `roles`, `permissions`, `role_permissions`, `resources`, `reveal_flags`, `listing_reports` or `package_prices`; the hits on the other four are the seller's and the public's own reads). Nothing is dropped in this file.
7. **Gaps in Part 1's tests (named, not hidden).** No class-assertion test yet for `use-photo-reviews`, `use-photo-changes` and the staff path of `use-edit-draft` (their readers are rewritten in STEP 4); `listing-settings.tsx` has none; the 14 former hand-built sites rest on the factory's own tests (RF-10). K2 finding: `signedInId` in `src/features/posting/pricing-data.ts:148` still turns a failed session read into null.
8. **Test-id repair:** my INC-1257 test in `use-edit-draft.test.ts` is `EW-8` (EW-6 was taken); CFRR-7 is one test holding the three laws.
