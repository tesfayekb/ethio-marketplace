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
