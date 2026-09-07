# Attributes (C3)

The shared attribute model: one definition per fact a listing can carry, linked
to the categories that ask for it.

## The model

| Table                             | Holds                                                                                           |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| `public.attributes`               | the definition: `attr_key`, `name_en`, `attr_type`, `options`, help text                        |
| `public.category_attribute_links` | one row per (category, attribute): `is_required`, `is_filterable`, `display_order`, `card_rank` |

`public.category_attributes` (the C3a denormalized import) stays in place as the
C3c fallback and is not read by this console.

Both tables refuse direct client access; every read and write below is a gated
`SECURITY DEFINER` RPC (law E7).

## Doors

| RPC                                   | Gate                                          |
| ------------------------------------- | --------------------------------------------- |
| `admin_list_attributes`               | `categories:view`                             |
| `admin_list_category_attribute_links` | `categories:view`                             |
| `admin_upsert_attribute`              | `categories:update` + step-up                 |
| `admin_link_attribute`                | `categories:update` + step-up                 |
| `admin_unlink_attribute`              | `categories:update` + step-up                 |
| `admin_set_card_attributes`           | `categories:update` + step-up                 |
| `admin_set_attribute_link_order`      | `categories:update` + step-up                 |
| `admin_delete_attribute`              | `categories:restructure` + step-up, typed key |
| `admin_merge_attributes`              | `categories:restructure` + step-up            |

Every write is audited old → new; a refused attempt writes nothing (F5).

## The console

`/admin/attributes` — the LIBRARY. The C7 DataTable primitive with its defaults
(cards below md): attribute · type · option count · used-by count, searchable
by name or key.

- **Create / Edit** a definition. Option lists are authored one per line and
  only exist for the choice types.
- **Delete** refuses while the definition is linked and the copy names how many
  categories still hold it; the operator types the key to confirm.
- **Merge** is the curation door: tick the duplicates, pick the survivor, and
  the confirmation states how many links move and how many definitions go, in
  advance. Sibling links inside one category fold together, keeping the
  stricter `is_required` / `is_filterable`.

Category editor → **Attributes** — the per-category LINK MANAGER. Linked list
with required / filterable toggles, Move up / Move down, Unlink, and a
searchable picker over the library.

## The two-must-display law

A listing card shows at most three attributes (`card_rank` 1..3). An **active**
category that **accepts listings** with fewer than two ranked attributes renders
bare cards, so both the link manager and the roster flag it in amber
("Needs card attributes"). The manager's caption always states what a card will
actually show.

## The parent cell

The roster's Parent column reads the primary parent with a "Primary" chip and,
below it, "Also in: …" for every other active branch the category hangs under —
the flipped service nodes (auto services, realtor services, fitness centres) sit
under Services first and keep their second home visible.

## The library surface (C3-UX-1)

The library renders ONLY through the C7 DataTable primitive at `cardUntil="lg"`
(cards through the tablet band, table from 1024) with primitive-owned column
min-widths — no per-page width hacks. Columns: Name · Type · Options (count;
the full list expands under the row) · Used by (link count) · Actions.

A **category filter** sits in the toolbar and lives in the URL as
`?category=<slug>`, so a filtered library is shareable and reloadable; it reads
`admin_list_category_attribute_links` for that category and narrows the rows to
the attributes linked to it. One control clears it, and an empty result is a
caption beside the controls (C4), never a replacement for them.

**Assign to category** is a row action: the link manager pre-scoped to that one
attribute. It writes through the same gated `admin_link_attribute` door (a
duplicate link is refused server-side with its own translated line), and the
row's Used by count re-reads from the mutation's invalidation.

## Tests

`e2e/admin-attributes.spec.ts` — AT-1 gating · AT-2 definitions · AT-3
link/unlink · AT-4 card picker clears the amber flag · AT-5 delete refused then
accepted · AT-6 merge · AT-7 category filter (DB truth) · AT-8 assign from the
library · AT-9 twin rendering with no sideways scroll. `e2e/admin-categories-console.spec.ts` CT-9a/9b assert the
parent cell in both twins against pointer truth.
