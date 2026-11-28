# The user-facing list (DEC-459 (c), DEC-482, DEC-493; INC-1278 — cursor bundle 8c-1)

**Concern.** Every control, event and list row a person meets is on one written list in the
repository, and a test answers it. A row with no test, or a page with no rows, fails a guard. Either
a browser test or a component test answers a row (DEC-493).

**Mechanism.** Two data files and a reader.

- `scripts/conformance/user-facing-manifest.txt` — the list: screens and rows.
- `scripts/conformance/user-facing-allowlist.txt` — the rows with no test yet and the pages no screen
  names, each `key | reason | until` (the kit's grammar, `scripts/conformance/kit.ts`: `until` is a
  date, an `INC-`/`DEC-` number or `permanent`; a stale or expired line fails).
- `scripts/conformance/user-facing.ts` — the reader; `scripts/conformance/user-facing.test.ts` — the
  census, CF-UF-1…5 (and CF-UF-5b, the reader's own grammar). It reads the files and the tests'
  titles and never runs a test.
- `docs/governance/census/user-facing-8d64790.md` — the census the rows come from (Lovable's
  `.lovable/plan.md` at `8d64790`), kept byte for byte. The manifest's header names its sha256; the
  census fails when the copy differs by one byte. (The header's own `copy:` note names an older path,
  `docs/features/user-facing-census.md`; the reader's constant `CENSUS` is the copy's place.)

## The grammar

```
screen <id> | <page paths, space-separated, or -> | <heading>
<row id> | <test ids, comma-separated, or -> | <the control or event>
```

- A screen id is `S1`…`S14`, with `S6a`…`S6e` for the public screens' parts, `S7` for the wizard's
  frame and `S7s1`…`S7s8` for its steps, and `A1`…`A29` for the staff screens.
- A row id is `<screen>.<n>`, `n` being the census row's own number.
- A page path is a route of `src/routeTree.gen.ts` as `pageRoutes` (`failure-crawl.ts`) returns it.
- An allowlist key is a row id or `page <path>`.

## What answers a row

A test answers a row when its id is in the row's second cell, or when its title carries
`uf:<row id>` as a whole token (set apart by spaces or marks: `uf:S2.5`, not `xuf:S2.5`).

A test's id is the leading token of its title that matches
`^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-[A-Z]?\d+[a-z]?`, followed by a character that is neither a word
character nor a hyphen, or by the end. The title is the first argument of a `test(` or `it(` call
(`.skip`, `.fixme`, `.fail` and `.only` too) in a `*.spec.ts`, `*.test.ts` or `*.test.tsx` file
under `e2e/` or `src/`; `describe` is not a test, and the argument may begin on the line after the
call (prettier wraps a long title).

## The five checks

| Id      | What fails                                                                                                                                                                                                                                                                                                     |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CF-UF-1 | the census copy's sha256 is not the manifest header's; a row id is twice listed, outside its grammar or under no declared screen; an allowlist key is neither a row nor a `page` line                                                                                                                          |
| CF-UF-2 | a test id a row names is held by no test; a `uf:` token names no row                                                                                                                                                                                                                                           |
| CF-UF-3 | a row no test answers has no allowlist line; a line for an answered row (stale); the kit's grammar; `permanent` for anything but a row whose census cell names nothing it must do, or a development page                                                                                                       |
| CF-UF-4 | a page route no screen names and no `page` line names; a screen path that is no page route                                                                                                                                                                                                                     |
| CF-UF-5 | planted: a row whose only test id is removed; a `uf:` title that answers an allowlisted row (its line goes stale); a new page route with no screen; a duplicate row id; a census copy one byte off; a reader that finds no test (INC-1308: a floor proves its reader); a `permanent` line that is not admitted |

## Who writes which rows (DEC-493)

- **Cursor** writes the tests for the rows that change data or cross pages (browser tests), and the
  list's own files: the manifest and the allowlist.
- **Lovable** writes the component tests for the rows that stay in one screen. A new test answers a
  row by `uf:<row id>` in its title, so Lovable needs no file under `scripts/`; the one edit it makes
  is the removal of the row's allowlist line, which DEC-396 admits.
- **A new page** fails CF-UF-4 until a screen names it (a manifest edit, Cursor's) or a `page` line
  holds it.

## How a line leaves

A line leaves when a test answers its row: add the test (its id in the manifest's row, or `uf:<row
id>` in its title) and delete the line in the same change. A line left behind fails as stale. A
`| INC-1278` line is the debt: the number never grows, only the lines go. A `permanent` line is for
a row whose census cell names nothing it must do (`S2.22`, `S7s1.1`, `S7s1.11`, `A20.2`) and for the
three development pages (`/dev/primitives`, `/dev/style`, `/dev/tall`).

## How a link row is tested

DEC-498 (the supervisor's, G17) — a link is tested on its own screen. A row whose control is a plain link is answered by a component test that checks its role, its name (taken from the catalogue) and where it points; the test never follows the link. A row is Cursor's only when its proof needs the browser past the screen: a server write, a navigation done by code, a sign-in that ends, a download, or a return to the page you came from.

## What it does not do

The reader proves a row's test exists and carries its id; it does not run it or judge that the test
asserts the row. The census rows' own words are the supervisor's. The sign-in pages and settings
(`page /auth`, `/auth/callback`, `/auth/reset`, `/settings`) are `| INC-1278` until their rows are
written.
