# Categories + attribute schema (P2-b)

Realizes REQ-017 (three-concept model) and REQ-020 (structured attributes).
Migration: `supabase/migrations/20260804152522_4390ce57-1901-4239-8e26-301f70df3ed5.sql`.

## The three concepts, and why they are three tables

| Concept          | Table                           | Answers                     |
| ---------------- | ------------------------------- | --------------------------- |
| Canonical node   | `public.categories`             | _What_ the category is      |
| Browse tree      | `public.category_tree_pointers` | _Where_ you browse it       |
| Structured field | `public.category_attributes`    | _What it asks_ of a listing |

**`categories` — the canonical node.** One row per real category. A listing (built
later) FKs `categories.id` and lives in **exactly one** category in v1. Because the
node is canonical, a category's inventory is one set of rows and cannot fork.

**`category_tree_pointers` — the browse tree as pointers, not copies.** A pointer row
says "category X appears under parent Y" (`parent_id IS NULL` = a top-level browse
root). `UNIQUE (parent_id, child_id)` prevents duplicate paths; a CHECK forbids a node
being its own browse-parent. Because a pointer is a reference rather than a copy, one
canonical category can appear under several parents — bike parts under both Auto and
Bicycles — while remaining **one inventory, many paths**. The split-inventory bug
(the same category duplicated per parent, each holding half the listings) is
impossible by construction.

Cycle prevention beyond self-reference is carried by admin discipline. A recursive
cycle-detection trigger is deferred: no role holds writes on this table today.

**`category_attributes` — the attribute builder's output.** Per-category structured
fields (`attr_key` as the stable machine key, `attr_type` one of
`text | number | single_select | multi_select | boolean`). `options` is a JSONB array
of `{value, label_en, label_am}`. A CHECK makes options presence exactly equivalent to
the type being a select — so a select with no choices, or a boolean carrying stray
options, is rejected at write time rather than surfacing as a broken posting form.
`UNIQUE (category_id, attr_key)` keeps keys stable per category.

## Per-category configuration

- **`price_enabled` (REQ-018).** A category may disable price entirely. Seeded `false`
  for Services; `true` elsewhere.
- **`expiry_days` (REQ-022).** The per-category auto-expiry default a listing inherits
  at posting time. Default 30; Real Estate seeded at 60. `CHECK (expiry_days > 0)`.
- **`is_restricted` (REQ-009/010).** The screening seam. The flag exists now and is
  `false` everywhere; the REQ-021 screening gateway that reads and enforces it lands
  at **P2-d**. Seam-first per the Phase 2 build-order ruling.

## RLS posture

Mirrors `public.locations` / `public.countries` exactly: shared reference data,
public read, **no INSERT/UPDATE/DELETE policy on any of the three** — admin writes go
through the service role, which bypasses RLS. Grants are `SELECT` only to `anon` and
`authenticated` (plus `ALL` to `service_role`).

- `categories_public_read` — `USING (is_active = true)`. Inactive categories are
  invisible to the Data API.
- `category_tree_pointers_public_read` / `category_attributes_public_read` —
  `USING (true)`. These rows inherit visibility from their category: a pointer or an
  attribute is meaningless without the category it names, and that category is itself
  gated by the active-only policy. Re-stating the predicate here would force a join on
  every read for no additional confidentiality.

Indexes: `categories(is_active) WHERE is_active`, `categories(slug)`,
`category_tree_pointers(parent_id)`, `category_tree_pointers(child_id)`,
`category_attributes(category_id)`. Both `categories` and `category_attributes` carry
an `updated_at` trigger reusing `public.update_updated_at_column()` (created by P2-a).

## Starter seed — PROVISIONAL

Twelve real top-level ethio.com categories, all active, each with a matching top-level
browse-root pointer: Vehicles, Real Estate, Electronics, Phones & Tablets, Home &
Furniture, Fashion & Clothing, Health & Beauty, Baby & Kids, Sports & Hobbies, Pets &
Animals, Business & Industrial, Services. `name_am` is filled only where the Amharic
term is known — `NULL` rather than a guess (Business & Industrial).

Not seeded, per REQ-017 rulings: prescription pharmaceuticals (excluded in v1); Jobs &
Vacancies and Tenders (deferred to v2). OTC/vitamins categories are permitted.

One illustrative attribute set exists, on **Vehicles**: `make` (text, required),
`model` (text, required), `year` (number), `transmission` (single_select
manual/automatic), `condition` (single_select new/used, required). It proves the
schema end to end and gives listings something to validate against. Every other
category's attributes arrive with the real import or the admin builder.

## Named later tasks

1. **Authoritative WooCommerce import.** The live ~400-leaf taxonomy, with dedupe /
   repair and empty-depth collapsing per REQ-017. It supersedes this starter seed and
   is a separate task, not a stretch goal of this one.
2. **Attribute-builder admin UI.** Lands with the admin console. This phase seeds
   attributes via migration only.
3. **Collections (REQ-017 concept 3).** Curated cross-category groupings. Not built
   this phase; a future `public.collections` (+ membership) table.
4. Posting flow, browse-tree UI, and the screening gateway consume these tables in
   later Phase 2 features.

## U0l — category selection is NAVIGATION (INC-073)

A category is an ADDRESS, not client state. `src/routes/c.$slug.tsx` renders the
feed for `/c/<slug>`; the rail rows (`src/components/shell/app-rail.tsx`) are
`<Link to="/c/$slug">` carrying `aria-current="page"` when active, and the
breadcrumb (`src/components/shell/breadcrumbs.tsx`) derives its category segment
from the same URL. `AppShell` no longer owns `selectedCategoryId` — it derives
`selectedCategorySlug` from the pathname, so rail highlight, breadcrumb and feed
can never disagree, and a category page is shareable, reloadable and
back-button correct.

### Page-card standard

`src/components/shell/page-card.tsx` exports `PAGE_MAIN_CLASS` (the `<main>`
wrapper) and `PageCard` (the content surface). Every page body uses it — the
auth page, admin section pages and the feed's empty state — so no route invents
its own container. `/auth` is a normal page inside the shell: breadcrumb
Home › Sign in / Create an account, no rail category selected.

E2E: `e2e/category-nav.spec.ts` (C-1..C-4).
