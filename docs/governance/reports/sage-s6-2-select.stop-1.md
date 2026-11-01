# STOP — sage-s6-2-select, before part A: the census disproves two of the brief's premises and needs two files outside the scope

```
STOP — sage-s6-2-select part A: the census (refusal states, the form kit's look, the cast's files, the consumers' tests)
DONE: the task saved (d22b2b2ba); the census
LEFT: every part (no code changed)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `a0461df3fc677ecb0b92233360fa4b7ca5add3db` (short `a0461df`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-01T02:43:29Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41264908090
FILES:
docs/governance/briefs/sage-s6-2-select.md
docs/governance/reports/sage-s6-2-select.stop-1.md
roadmap.md
```

The base is a0461df3, and `origin/dev` is the same commit. CI on a0461df3 is SUCCESS (run 41264908090).

## What the census confirmed

- **The selects.** `rg '<select\b' src` finds 42 elements in the 20 consumer files the allowlist names, as the plan
  said. Two other hits are not elements: `columns-button.test.tsx:94` sits in a test, which CF-LIST-1 skips, and
  `attributes-service.ts:58` is a comment.
- **SELECT_CLASS.** Its definition is at `category-form-fields.tsx:33`, and 11 files read it, not the plan's 9. All
  11 are among the 20 consumers, so nothing falls outside the scope.
- **The other guards.** `scripts/admin-tables.ts:78` (T2b) reads `NativeSelect` and `select` alike, and DG-3 reads
  `DIALOG_FIELD` in `native-select.tsx`. Neither changes meaning after the move.
- **The G38 list.** 26 spec files name a moved select's test id:
  - admin: `admin-attributes-editor`, `-import`, `-library`, `-links` and `-safety`; `admin-categories-console` and
    `-lifecycle`; `admin-countries`, `admin-listings`, `admin-locations`, `admin-services` and `admin-users`;
  - posting: `post-wizard-bundle2`, `-category`, `-details`, `-finder`, `-place`, `-pricing`, `-resets`, `-specs`,
    `-units` and `-where`;
  - others: `choice-lists`, `import-security`, `legal-admin` and `my-listings-ad`.

  `e2e/helpers/posting.ts:2884` (`pickCity`) drives `post-where-region` and `post-where-city`. Its four callers are
  already in the list.
- **Measured looks.** No spec reads a moved select's colour or shadow.
  - `post-wizard-where.spec.ts:738` reads the city select's box for its position only.
  - The house style pins 36 px on a fine pointer from md and 44 px on a phone (HS-3). That is NativeSelect's size rule.

## 1. The refusal states: the brief's premise does not hold (field.tsx clause)

The brief says the posting wizard's selects "carry the form kit's refusal states (aria-invalid, aria-describedby,
the shared gate)" and that every one keeps them. Here is what each of the 11 selects carries at a0461df3:

| Step | Select (test id) | Refused look | `aria-invalid` | `aria-describedby` | Refusal message |
|---|---|---|---|---|---|
| who | `post-who-country` (`step-who.tsx:1148`) | `controlClass(refused or required-empty, soft)` | yes (`:1155`) | no | its own paragraph (`:1236`) |
| pricing | `post-price-period` (`step-pricing.tsx:682`) | `controlClass(periodRefusal)` | no | no | `Field` (`:676`) |
| pricing | `post-price-scale` (`:611`) | none; its own class, `aria-label` | no | no | none (not a door field) |
| specifications | year select (`:1396`) | `ctrl = controlClass(refusal, required && empty)` | no | no | `Field` (`:1372`) |
| specifications | single-select (`:1506`) | `ctrl` | no | no | `Field` |
| where | `post-where-region`, `-city`, `-subcity` (two), `-row-market`, `-market` (`:421`, `:500`, `:533`, `:584`, `:685`, `:1516`) | none; the local `fieldClass` (`:150`) | no | no | none on the control. The box around it turns red (`boxClass`, `data-red`), the label takes `RequiredMark`, and the gate counts it (`reportMissing("where")`). |

- One select of the 11 carries `aria-invalid`, and none carries `aria-describedby`.
- `Field` (`field.tsx:195`) gives its refusal paragraph no `id`, so no control in the form kit can point
  `aria-describedby` at it today.
- Rule 12 (Forms) asks for both attributes on a refused control, so this gap was already there at the base.
- Adding either attribute changes behaviour beyond the task, and `aria-describedby` also needs `field.tsx`. The brief
  says to STOP when the census says `field.tsx` must change.

Two readings are possible:

- **(a) Recommended: keep exactly what each select carries today.** NativeSelect passes every attribute through, so
  the move adds nothing and removes nothing. One unit test per step proves the refusal still reaches the control:
  - who: `aria-invalid` and the destructive border on `post-who-country`;
  - pricing: the destructive border on `post-price-period`, with `Field`'s message (a new file,
    `step-pricing.test.tsx`, because the step has no test today);
  - specifications: the destructive border and `post-attr-refusal` on a select;
  - where: the red box (`data-red="1"`) and `RequiredMark` around a still-empty select.

  The missing `aria-invalid` and `aria-describedby` would be filed for the form-kit turn, beside the five local
  `fieldClass` constants.
- **(b) Every refused posting select gains `aria-invalid` and `aria-describedby`.** `field.tsx` gives the refusal an
  id (for example `${id}-refusal`), and the where step's box refusal gets an element to point at. `field.tsx` then
  joins the scope, and the new behaviour is named in the report.

## 2. The form kit's look needs one NativeSelect parameter (my plan; say if you object)

NativeSelect today draws `cn(<its closed-control look>, DIALOG_FIELD, className)`. If a posting select passed
`controlClass(...)` as its `className`, tailwind-merge would keep four of NativeSelect's own classes:

- `shadow-xs`, a new shadow;
- `disabled:opacity-50`, which dims `post-who-country` while it is locked and the specification select while it waits;
- `min-w-0`;
- `md:pointer-fine:h-9`, which `min-h-11` happens to override.

The posting selects would then not "keep the form kit's look" (ruling 2). K1 says to extend the mechanism by a
parameter, so I plan `look?: "control" | "form"` on NativeSelect:

- `"control"` is the default: today's closed-control look, pressed in inside a panel.
- `"form"`: the caller's form-kit class whole (`controlClass`, the where step's `fieldClass`, the scale select's
  class), with `DIALOG_FIELD` still read, so DG-3 holds.

`native-select.tsx` stays the only file that draws a `<select>`. The admin consumers take the `"control"` look and
pass only their layout (`w-full`, `grow`, `mt-1`). Their selects then move from `SELECT_CLASS`'s `bg-background` and
44 px to NativeSelect's `bg-card`, 36 px on a fine pointer from md, and the pressed-in field inside a dialog. That
change is the intended unification.

## 3. The cast at category-dialogs.tsx:681: the option with no migration needs two files outside the scope

`admin_retire_category`'s generated arguments are `{ p_id: string; p_reassign_to: string }`
(`src/integrations/supabase/types.ts:4549`). Three places pass that type through:

- `categories-service.ts:174` (`retireCategory(input: { id: string; reassignTo: string })`);
- `use-categories.ts:85`;
- the dialog, which passes `null as unknown as string` when the category has no listings.

The option with no migration:

- widens `reassignTo` to `string | null` in `use-categories.ts:85` and `categories-service.ts:174`;
- hands the service's arguments to the generated call `as never`, with the reason on its line. This is the house
  form already used at `src/features/ad-page/report.ts:30`, `contact.ts:39` and `src/routes/api/seller.ts:53`: "The
  generated … type omits SQL NULL; the door accepts it";
- passes a plain `null` from the dialog.

`src/features/admin-categories/categories-service.ts` and `src/features/admin-categories/use-categories.ts` are not in
the SCOPE. May they join for these two lines?

## 4. "The unit tests per consumer": 13 of the 20 consumers have no test file

- These 7 have a test file: `ai-spend-days`, `category-dialogs`, `country-dialogs`, `location-verb-dialogs`,
  `step-specifications`, `step-where` (three files) and `step-who`.
- These 13 do not: `attribute-dialogs`, `category-attributes-dialog`, the five `admin-attributes/components/*` files,
  `category-form-fields`, `location-dialogs`, `legal-page`, `legal-version-view`, `user-detail` and `step-pricing`.

My reading:

- CF-LIST-1's new select rule (planted) proves the structure for all 20.
- The 7 existing test files run again, and each one that renders a select gains a case: the select is NativeSelect's,
  and inside a dialog panel it reads `DIALOG_FIELD`.
- `step-pricing.test.tsx` is new, for point 1.
- The other 12 get no new file unless you rule one per consumer. Each would mount an admin dialog with its query hooks
  stubbed.

Which reading do you want?

## Waiting on

The supervisor's ruling on points 1, 3 and 4, and an objection to point 2 if there is one. No code has changed; the
tree is the base plus the saved task.
