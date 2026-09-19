# Coverage console (Admin → Locations → Coverage)

How far a seller may reach on each plan: the most cities, regions and countries
a listing's coverage may name, and whether the plan may reach everywhere at
once. Landed by LOCATIONS ERA L2b-C2.

Route `/admin/coverage` · section id `coverage` · gate `coverage:view`
(the `/admin` layout owns it) · root testid `admin-section-coverage`.

## What it renders

ONE `DataTable` (`cardUntil="lg"`, row testid `coverage-<plan>`) over
`public.coverage_plans`, read with a plain SELECT: the table's own
`coverage_plans_public_read` policy publishes the plans to everyone, because
posting reads the same limits — there is nothing private in a limit.

| Column     | Priority  | Content                            |
| ---------- | --------- | ---------------------------------- |
| Plan       | primary   | The plan's name, its identity      |
| Cities     | primary   | `coverage-<plan>-cities`           |
| Regions    | primary   | `coverage-<plan>-regions`          |
| Countries  | primary   | `coverage-<plan>-countries`        |
| Everywhere | secondary | `TipBadge` (`outline`) — yes or no |
| Updated    | detail    | The row's own `updated_at` day     |

A translated line above the roster (`coverage-note`) says plainly that posting
enforces these limits from U6 — the console records them, U6 applies them.

## Verbs

`coverage-create-open` adds a plan (name, the three limits, everywhere) and one
44px pencil per row (`coverage-edit-<plan>`) opens the EDITOR
(`coverage-editor`) — the row's one surface (CT-8) — with the four fields and
`coverage-editor-save`. Both go through the same door:

| Verb              | Door                      | Permission        |
| ----------------- | ------------------------- | ----------------- |
| add a plan        | `admin_set_coverage_plan` | `coverage:update` |
| the editor's save | `admin_set_coverage_plan` | `coverage:update` |

The door re-checks the permission AND step-up server-side (F3); the gates in the
console are convenience only. The plan name is the row's identity: it is shown in
the editor, never re-typed.

THERE IS NO DELETE DOOR. A plan can be edited, never removed, until a DEC says
otherwise — so the console offers no removal either, and the editor says so.

## Refusals (F4)

Rendered by name in `coverage-editor-error`, never as a tooltip or a toast
alone: `badPlan` (a plan name is 2–32 lower-case letters or underscores),
`belowMinimum` (every limit is at least 1), permission denied, step-up required.
The surface checks the door's own shape first, and the door checks it again.

## Tests

`e2e/admin-coverage.spec.ts` — CV-1 gating · CV-2 the `free` plan's three limits
and its everywhere state, against DB truth · CV-3 an edit through step-up, read
back from the database and restored in `finally` · CV-4 `belowMinimum` rendered
by name with nothing saved · CV-5 a scratch plan created and seen in the roster,
deleted in `finally` · CV-6 geometry in both twins.

`free` is a REAL reference row, so CV-3 restores it (J3). A scratch plan carries
the `e_probe_` prefix (J1) and its axes are spelled in letters, because the
door's shape refuses a digit; the `finally` is its only cleanup — the reaper is
untouched.

## Related

- `docs/features/countries-console.md` — the markets register in the same rail group.
- `docs/features/locations-console.md` — the Places roster in the same rail group.

## The photo cap (D22) — the door takes it since M-MAINT-3

`coverage_plans.max_photos` landed with M-MAINT-2 Part A (the photo door
enforces it, the posting read returns it with the plan document) and since
M-MAINT-3 the console's own write door carries it:

`admin_set_coverage_plan(p_plan, p_max_cities, p_max_regions, p_max_countries,
p_allow_everywhere, p_max_photos smallint DEFAULT NULL)`

- the cap is bounded 0..30; anything else refuses `badMaxPhotos`, rendered by
  name in `coverage-editor-error` like every other refusal above;
- an ABSENT cap means NO CHANGE — the plan's stored cap when it exists, the
  column's own default for a new plan. So a save that does not mention photos
  can never silently reset them;
- the audit row carries `max_photos` in both `old` and `new`.

The editor's `max_photos` cell and CV-7 ride the consumers landing (R3b-2); the
door no longer blocks them. Proof P3 of the M-MAINT-3 migration set a SCRATCH
plan's cap to 3 through the door and read it back through `plan_caps`, refused
31 by name without changing the stored 3, and asserted the real `free` row
untouched. The scratch plan's name is spelled in letters (`e_probe_…`) because
the door's plan shape refuses a digit.
