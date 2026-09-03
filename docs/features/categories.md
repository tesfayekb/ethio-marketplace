# Categories

Status: Category Era in progress (spec: /docs/governance/category-era-spec.md, RATIFIED 2026-09-02).

Model: canonical nodes + pointer tree (REQ-017). One canonical node may appear on multiple browse paths (pointer edges); leaf = no child pointers. Roots are browse containers (allow_listings=false); posting is leaf-only, including catch-alls.

Taxonomy of record: /docs/spec/category-era/c1-target-taxonomy.md (113 nodes = 14 roots + 85 leaves + 14 catch-alls), ratified 2026-09-02, produced from the live WordPress export (DEC-003 item, closed) diffed against the apex donor and current prod seed; full per-row fates in c1-dispositions.csv and c1-current-prod-dispositions.csv beside it. The tree is admin-dynamic; counts are advisory.

Visibility: nodes carry is_active, optional visible_from/visible_until window, and per-country exclusion rows; browse paths require full-path visibility; posting is server-gated on visibility; listing detail pages are never gated. Catch-alls ("Other <Root>", is_catchall) sort last, hide from browse while empty, and always show to posters.

Names: entity_translations is the sole runtime source for category names (D3); name_am columns retire at era gate. Transaction type (sale/rent/lease/hire) is the offer_type attribute, never a category (L1). Brand/make is an attribute, never an entity.

Images: every node carries thumbnail / card 512 / large 1200×630; the card image is the display fallback for photo-less listings (REQ-019). Superseded plans: the pre-rebuild "authoritative WooCommerce import" task is closed by the C1 ratified tree.

## Admin console (C2-UI, 2026-09-03)

`/admin/categories` (`src/features/admin-categories/**`) is gated by `categories:view`; each write re-checks its own granular permission and step-up on the server (F3).

- **Roster** — one depth-ordered list of the whole tree from `admin_list_categories`, rendered through the DataTable primitive with `cardUntil="lg"` and per-column min-widths (law C7). Search narrows on name or slug. Loading / empty / error states are translated.
- **Create** — `admin_create_category` (slug, English name, icon, optional parent, accepts-listings).
- **Edit** — `admin_update_category` (name, icon, display order, listing expiry, accepts-listings, price field).
- **Visibility window** — `admin_set_category_window`; an empty date removes that bound. Times are UTC.
- **Country exclusions** — `admin_set_country_exclusions`. The table stays client-unreadable; C2b instead returns `excluded_country_codes` on the roster RPC, so the dialog PRE-TICKS the current set and still submits a full replacement.
- **Restructure** — `admin_reorder_categories` (move up/down within siblings) and the **Browse paths** dialog: `admin_list_category_pointers` lists every pointer whose child is this category (parent name/slug, pointer id, order) and `admin_add_category_pointer` / `admin_move_category_pointer` / `admin_remove_category_pointer` write through step-up.
- **Retire** — `admin_retire_category` with a required reassignment target; catch-alls and already-retired nodes are refused.

## C2-UI-FIX (2026-09-03)

- **C2b contract** — `admin_list_categories` gains `excluded_country_codes text[]` (every pre-existing column name and the gate are byte-identical); `admin_list_category_pointers(p_category_id uuid)` is a new `categories:view`-gated SECURITY DEFINER read returning `(pointer_id, parent_id, parent_slug, parent_name_en, display_order)`. The former pointer MOVE/REMOVE limitation is CLOSED.
- **Visibility window** — `datetime-local` controls. The stored instant renders in the operator's zone and serialises back to a zone-correct UTC ISO string; an empty control sends NULL, never a midnight guess.
- **Roster shape** — Slug moved under Name as muted text; a Parent column (roots read "—"); compact flags; a root-subtree filter beside search; `DataTablePagination` at 25 rows per page.
- **Row actions** — ONE button set with two presentations: full text in the 360 card, a compact icon strip from lg with the label in `aria-label`/`title`. DELIBERATE DEVIATION from the requested overflow menu: a second icon-only twin (or a portalled menu) would put two matches for `category-<verb>-<slug>` inside one actions region and break the twin-aware locators (J5), so every verb stays a single element at ≥44px.

E2E: `e2e/admin-categories.spec.ts` (CT-1..CT-9) covers gating, roster + search, create/edit, visibility window, exclusions, retirement, step-up, pointer-move refusal without a proven factor (CT-7b), tablet-band action reachability at 1024 (CT-8) and the Parent column + 25-row page (CT-9). Scratch nodes are slugged `e2e-cat-%` and swept by the global-setup reaper (DEC-031).

## C2c — server-derived slugs, missing assets, and roster controls

- **The slug is no longer typed.** Create takes a name; `admin_create_category`
  derives the slug, collapses non-alphanumerics and appends a numeric suffix on
  collision. The dialog shows a read-only PREVIEW (`deriveSlugPreview`) that
  mirrors the derivation but decides nothing — uniqueness has exactly one
  authority, the server (F3).
- **Missing assets.** `admin_list_categories` now returns `has_image`. A category
  with no icon or no image carries an amber flag with a tooltip, and the roster
  gains a "Missing assets" filter, so the launch gap is visible rather than
  discovered in browse.
- **Badge tooltips.** Every status/flag badge carries `title` plus an
  `aria-label` of the form `<chip>: <description>`. Retired reads exactly:
  it keeps its history and its browse pointers, but no new listing can be posted
  to it and it no longer appears as a destination.
- **Parent pickers offer ACTIVE nodes only**, each rendered with its full path
  (`Vehicles › Cars`). A retired node is not a destination; hanging a live child
  under one would hide it from browse at birth. CT-10 asserts the absence.
- **Roster controls.** Search matches name, slug AND parent name; the root filter
  prints per-root counts; page size is a DEVICE setting (10/25/50/100, default 25)
  persisted in localStorage and read after mount, so SSR and the first client
  frame agree. CT-11 asserts it survives a reload.
- **Column tiers.** Order / Listings / Excluded moved to the `wide` tier and the
  Name column is pinned, so the 1024–1240 band shows identity plus actions.

## C2d — lifecycle (2026-09-04)

- **Expiry is optional.** `categories.expiry_days` is now nullable with default
  NULL and a `(expiry_days IS NULL OR expiry_days > 0)` check; existing values
  were cleared. "No expiry" is the norm, not an unrepresentable state.
- **Reactivate.** `admin_reactivate_category(p_id)` is the exact inverse of
  retire: `categories:restructure` + step-up, refused on an already-active row
  (`admin.categories.error.already_active`), audited as `category.reactivate`.
  The console swaps Retire → Reactivate on a retired row (CT-12).
- **Delete.** `admin_delete_category(p_id, p_confirm_slug)` is the console's one
  destructive verb: `categories:restructure` + step-up, refused unless the row
  is retired, the typed slug matches exactly, and no listing references it (the
  refusal carries the count). It removes pointers (both directions), country
  exclusions, attributes and entity translations before the row, and audits the
  full old row. The console shows it on retired rows only, behind a typed-slug
  dialog (CT-13).
- **Cards until xl.** The roster runs at `cardUntil="xl"`: below a wide desktop
  there is no table at all, so nothing scrolls sideways in the laptop band. The
  card carries every column — parent, flags, order, missing-assets — plus a
  wrapping 44px icon action strip. A retired row hides the Accepts-listings and
  Price flags: only Retired and Missing-assets read there. CT-8 asserts cards at
  1024/1240 with no horizontal scroll anywhere and the table at 1440.
- **INC-136.** The pinned first column drifted 40px on the first scroll tick
  because only the header was sticky and the 40px selection column was not. The
  primitive now pins the selection cell at `start-0` and the first data column
  at `start-10` for header AND body cells (unit tests + law L11).

## C2e + UI-FIX-4 — one row verb, one editor (2026-09-04)

- **INC-137.** `admin_create_category` was last replaced by C2c with
  `CREATE OR REPLACE`, which keeps the privileges but leaves that file without
  its own REVOKE/GRANT pair. C2e restates the ACL for
  `admin_create_category(text, text, text, uuid, boolean)` in one file —
  revoked from PUBLIC and `anon`, executable by `authenticated` and
  `service_role` — with an in-file privilege proof. No behaviour change.
- **The Roles interaction model.** The roster row carries exactly ONE button:
  Edit. Every other verb — Visibility, Countries, Browse paths, Move up, Move
  down, Retire (active only) / Reactivate (retired only) and Delete (retired
  only, danger) — is a full-text ≥44px button in a wrapping verb bar at the top
  of the editor. Testids (`category-<verb>-<slug>`), permission gates and
  step-up flows are unchanged; only the door moved. The actions column now
  needs room for a single button, so the roster fits at every width by
  construction while `cardUntil="xl"` stays.
- **E2E.** `action()` resolves `edit` in the row's actions region and every
  other verb inside the open editor, so each verb still has exactly one match
  (J5). CT-8 is the reachability law: at 360/768/1024/1240 the editor exposes
  every verb, visible, clickable and ≥44px, with no horizontal scroll on the
  page or the dialog; at 1440 the table renders wide columns with an inert
  scroller. CT-6, CT-12 and CT-13 drive their verbs from the bar.

## C2-UI-FIX-5 + C2f + TR-29 — the roster conforms; the tree tells the truth (2026-09-04)

- **The roster conforms to the audit table (INC-139).** Every per-column
  `minWidth`, the `cardUntil` override and the sticky/wide leftovers are gone
  from the categories consumer: the primitive's defaults decide everything, and
  priorities alone place a column — Name (+slug line) and Status and Flags are
  primary, Parent is secondary, Order/Listings/Excluded are detail, Actions
  holds the single Edit button. The Name cell truncates with a `title`. The
  priority map lives in `categories-service.ts` as `ROSTER_COLUMN_PRIORITIES`
  and a unit test machine-checks the conformance (no `minWidth`, no
  `cardUntil`, no `stickyFirstColumn` in the page) without rendering it.
- **C2f (mark 20260904030000, INC-138).** Pointer edges whose parent is a
  retired category are deleted, and `admin_list_categories` now resolves a
  category's parent deterministically: the NULL-parent (root) pointer when one
  exists, else the lowest-`display_order` pointer whose parent is ACTIVE. The
  17-column contract, including the trailing `has_image`, is byte-identical and
  the definer ACL is restated in the same file.
- **TR-29 / INC-141 — the export is total.** The export LOOP was already
  total-complete (it pages until a short page or the server's own
  `total_count`); its SCOPE was not. The reader filtered `orphaned = false`, so
  a language whose catalog holds orphaned keys exported fewer rows than it
  owns. `listTranslations` now accepts `orphaned: null` — no orphan predicate
  at all — and the export reader uses it, so "every page until exhausted" and
  "every row the language owns" finally mean the same thing.
- **Self-diagnosing specs.** CT-8 and CT-9a carry a geometry dump (scroller,
  table, last cell and each ancestor's overflow/max-width), CT-12 polls with a
  lifecycle dump (mounted dialogs, step-up state, the row's `is_active` via the
  service client, the last client errors), and L10 scrolls the last cell into
  the vertical viewport before asserting horizontal reachability, dumping the
  whole wrapper chain on failure. No assertion changed meaning.

## C2g + UI-FIX-6 — fresh rows, honest expiry, the catch-all parent law (2026-09-04)

- **INC-142 — the editor reads the LIVE row.** The dialog state carries only
  the category id; the rendered row is looked up in the roster query data on
  every render, so Retire → Reactivate swaps the moment the query settles, and
  the editor closes gracefully when its row vanishes (delete).
- **INC-143 — expiry is honest.** A NULL `expiry_days` renders an EMPTY input
  with a translated "No expiry" placeholder; saving an empty field sends NULL.
  No coalesce to a numeric literal survives in the form or the service mapping.
- **C2g (mark 20260904040000) — the catch-all parent law.** A catch-all is a
  terminal posting bucket, never a branch. `assert_parent_not_catchall(uuid)`
  is the single authority and raises `admin.categories.error.catchallParent`;
  `admin_create_category`, `admin_add_category_pointer` and
  `admin_move_category_pointer` delegate to it, and
  `admin_reorder_categories` drops catch-alls from an operator-supplied order
  and always pins them last. Every touched definer restates its REVOKE/GRANT
  pair in the same file.
- **Console.** Parent pickers (create + browse paths) offer active,
  non-catch-all nodes only; a catch-all row shows no Move verbs; a server
  refusal that names a key is rendered through `t`, never as a raw key (F4).
- **E2E.** CT-14 asserts the refusal read-back through the service client, the
  absent picker option and the absent Move verbs; CT-12 is unchanged and now
  passes against the live-row editor.

## C2h + CT-12-TRUTH — reorder is a plain update; the roster reads the tree's order (2026-09-04)

- **Census verdicts.** `admin_reorder_categories` writes
  `category_tree_pointers.display_order` (the POINTER EDGE) and already gated on
  `('categories','update')` — but it also called
  `require_step_up_if_needed('categories','update')`. `get_browse_tree` orders by
  that same pointer edge; `admin_list_categories` returned `c.display_order`, the
  ROW COLUMN. So the write target matched the TREE but not the ADMIN READ: a
  reorder landed in the database and never moved the console's roster.
- **C2h (mark 20260904050000).** The reorder gate is restated as
  `categories:update` with NO step-up call, and `admin_list_categories` now
  reports the `display_order` of the very parent edge it already resolves
  (falling back to the row column when a category has no pointer). The 17-column
  contract, its names and types, are byte-identical; catch-alls are still pinned
  last. Both definers restate their REVOKE/GRANT pair in the same file, and the
  in-file proofs reorder as a plain-update principal (aal1 claims, no step-up),
  read the flipped order back and assert the catch-all stayed last.
- **Retire dialog clarity.** The dialog reads the row's active listing count.
  At zero the reassign picker is hidden and the body reads "No listings to move
  — the category will simply be hidden from browse and posting."; the RPC
  already accepts a NULL target in exactly that case. With listings, the picker
  keeps its behaviour and its label carries the count ("Move N listings to").
- **E2E.** CT-12's closing check is corrected to the product's truth: the
  reactivated row IS on the roster, carries the Active badge and offers Retire
  while Reactivate is absent (dump machinery unchanged). CT-15 seeds two scratch
  siblings plus a scratch catch-all under a scratch parent, drives Move up on the
  second, and asserts the flip in DB truth, the ABSENCE of the step-up modal and
  the catch-all still last — twin helpers, viewport guard and failure dumps per
  standing law.

## C2-CLOSE — the console's four finals (2026-09-04)

- **Display order is live, never typed.** The editor's Display-order field is
  read-only and bound to the LIVE roster row (INC-142's lookup), so a Move
  up/down updates it the moment the roster query settles. It no longer enters
  the update payload; the caption reads "Managed by Move up/down."
- **The dialog return path (INC-150).** The state machine is
  `{ kind: 'edit', id, sub }`: Visibility, Countries, Browse paths, Retire and
  Delete are axes OF the open editor, not replacements for it. Closing a
  secondary dialog restores the editor; only closing the editor returns to the
  table. Step-up keeps its top-layer behaviour unchanged.
- **E2E.** CT-12's closing check is search-anchored (`findRow`) and asserts the
  Active badge plus Retire-present / Reactivate-absent. CT-6 seeds one active
  listing with every required column before navigating (J7) and asserts the
  reassign picker's count, the reassignment and the listing's new home. CT-16
  is the return-path law: editor → Countries → close → editor still open →
  close → table.
