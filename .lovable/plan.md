# L4 forms-categories — plan (A0, nothing changed)

Branch `lovable/forms-categories` (sandbox `edit/edt-d8e26a9a-f6f1-4d9f-b9c8-5a75d0dc00c8`) · HEAD `84e5f45fb1cf085b95fbdf8aa54fee2e61e7c6b9` = base. CI: no PR yet for this lane, so there is no lane CI to read.

## (a) Files
- `src/features/admin-categories/category-form-fields.tsx`: 10 controls go onto Field; takes `gate` and `refusals`, as the places console's fields do.
- `src/features/admin-categories/category-form-values.ts`: gains `readCategoryNumbers` (the expiry parser), `CategoryFormRefusals` and `categoryRefusals(gate, parsed)`. This follows the L3 split, which keeps lint quiet.
- `src/features/admin-categories/category-dialogs.tsx`: 9 controls go onto Field. Each dialog uses `useFormGate`, with `gate.try()` first. The name, reassign and parent pre-checks are removed.
- Tests:
  - Existing: `category-dialogs.test.tsx` and `category-refusals.test.tsx`, updated only where a moved message is read.
  - New: `category-editor.test.tsx` with KFC-1…6:
    - KFC-1: blank name is refused at the field, the gate stays closed, nothing is saved.
    - KFC-2: once a name is given, the gate opens and the refusal is gone.
    - KFC-3: an expiry of `0`, `1.5` or `abc` is refused at the field (badType) and no mutation runs. A blank expiry saves null.
    - KFC-4: the order box shows the stored value and is read-only.
    - KFC-5: a blank delete confirmation is refused at the field. A wrong slug stays `category-dialog-error` with `delete.mismatch`.
    - KFC-6: a blank retire target, pointer parent or paths-add is refused at the field.
- `scripts/conformance/forms-allowlist.txt`: remove lines 15 and 16 only (DEC-396).
- `docs/features/forms.md`: new §"Categories console (wave 3)".
- `docs/generated/i18n-usage.json` and `public/i18n-usage.json`: regenerated.
- No deletion, no new module beyond these, no spec edit expected (see the census below).

## (b) Controls (old pair → Field layout; parse rule)
Form fields (`category-form-fields.tsx`):
- :115 name: FormField+Input → Field stack, `field="nameEn"`, required, gate blank = `nameEn.trim()===""`.
- :147 icon: FormField+Input → Field stack, `field="icon"`, optional. Hint, fallback and change button stay as children.
- :174 parent (create): FormField+NativeSelect → Field stack, `field="parentId"`. Required only where the dialog needs a parent today (the current `parentRequired` paths); otherwise optional.
- :196 position: FormField+NativeSelect → Field stack, `field="positionBefore"`, optional. The caption stays as the Field's hint, same testid.
- :222 expiry: FormField+Input → Field stack, `field="expiryDays"`, optional. Parse rule: `parseNumber(raw, { integer: true, min: 1 })`.
  - A blank answer becomes null; an unreadable one is refused as `badType` under the field.
  - This mirrors the door's own rule: `cat_int` reads a whole number, and `categories_expiry_days_check` holds `expiry_days IS NULL OR expiry_days > 0` (migration 20260903052438:22). A valid typed value IS a whole number ≥ 1.
- :234 allow listings and :242 price: tick → Field choice layout, optional.
- :256 and :268 visible from/until: FormField+Input → Field stack, optional (`visibleFrom`, `visibleUntil`).
- :286 country exclusions: FormField group → Field stack around the existing tick group, `field="excludedCodes"`, optional.

Dialogs (`category-dialogs.tsx`):
- :236 and :275: `Number(form.expiryDays)` is replaced by the parsed value. On create and on edit, the parser runs after `gate.try()` and before `guard`; refusals are drawn under the field (INC-1180).
- :287 `nameRequired` pre-check is removed; the gate's mark under the name replaces it. Nothing reads it; the key is kept unless the usage census shows it unread (reported, not deleted, in this turn).
- :367 order (read-only, edit only): Field stack, `field="displayOrder"`, `required={false}`, `readOnly`, `value={String(row.displayOrder)}`.
  - The Field renders only inside the branch that already holds the loaded row, so there is no `?? 0`.
  - `CategoryRow.displayOrder` is `number` (categories-service.ts:29). The service's own `row.display_order ?? 0` (:78, :223) is outside scope and reported under K2.
- :497 and :506 window from/until: Field stack, optional.
- ~:578 exclusion ticks: Field stack around the group, optional.
- :662 retire target: Field stack, `field="reassignTo"`, required when listings exist. The gate replaces `reassignRequired` (:630).
- :741 pointer parent: Field stack, `field="parentId"`, required. The gate replaces `parentRequired` (:719).
- ~:917 paths add: Field stack, `field="parentId"`, required. The gate replaces `parentRequired` (:938).
- :1003 delete slug: Field stack, `field="slug"`, required, gate blank.
  - A non-blank wrong slug keeps its dialog-level `admin.categories.delete.mismatch` in `category-dialog-error` (:981), unchanged.
  - Door refusals stay in `category-dialog-error`.
- The exact census line count (9/10) is re-checked by the forms guard in the build; any control I have missed above is brought under the same rule.

## (c) Mechanisms read
- Shared pieces: `Field` (field.tsx), `useFormGate`, `parseNumber` / `PARSE_INVALID_KEY` (parse-input.ts), and the refusal reader (`readRefusal` / `refusalText`).
- The console's family `CATEGORY_REFUSALS` via `useCategoryRefusal` (category-refusals.ts). No new mapper. Field refusals read with `family={CATEGORY_REFUSALS}`.
- Gap in the family: like L2/L3, it has no `required` or `badType` entry. The plan adds `required: "post.refusal.required"` and `badType: PARSE_INVALID_KEY` to it. These are existing keys, not new strings. (Same move the L2 ruling approved.)
- L3 precedent: `location-form-values.ts` / `location-form-fields.tsx`.

## (d) data-testids, all kept
category-create-*/category-edit-* name, icon, icon-hint, icon-change, icon-fallback, expiry, allow, price; category-create-slug-preview, -parent, -position, -position-caption, -visible-from, -visible-until, -countries, -exclusion-{code}; category-edit-order; category-window-from/until; category-exclusions-current, category-exclusion-{code}; category-retire-target, -no-listings; category-pointer-parent; category-paths-add, category-path-make-primary-{id}; category-delete-slug, -delete-dialog; category-dialog-error, -cancel, editor-image, editor-close, submit ids. New: the Field's own `form-field` / `form-field-refusal` with `data-field`.

## Spec census (`rg` over e2e/)
- `category-dialog-error` is read at home :94, :206, :217 (door refusals of a delete) and at lifecycle :199 (wrong slug). All stay drawn in the dialog, so no edit is needed.
- `nameRequired`, `reassignRequired` and `parentRequired` are read by no spec.
- No other spec line reads a moved message.

## (e) New strings
None.

## (f) First download, before and after
`/admin/categories`, plus every staff page whose graph includes `category-dialogs.js` / `category-form-fields.js`. The build turn lists those pages from the build manifest and measures each chunk by chunk. A page over its ceiling is a STOP.

## (g) Conflicts
1. Adding `required` and `badType` to `CATEGORY_REFUSALS` touches category-refusals.ts, which is not in the brief's file list. I ask for it to be ruled into scope, as in L2.
2. category-form-values.ts is not named in the brief either. It is needed for the L3 helper split (ESLint react-refresh).
3. Possibly unread retired keys (`nameRequired`, `parentRequired`): reported, not deleted, unless ruled.

## (h) Cannot run
Browser tests (CI judges), the whole `bun run checks`, and the database.

## K2 (report only)
categories-service.ts:78 and :223 `Number(row.display_order ?? 0)` (server row mapping); step-specifications.tsx:1388 (the supervisor's ruling: not typed).

## After the ruling
Build; A6 list with last lines; report (files, K2, first-download table); last step `git diff --name-only 84e5f45fb` with write-back of `.lovable/**`, `bun.lock`, `package.json`, `src/integrations/supabase/**`, listed. No PR.
