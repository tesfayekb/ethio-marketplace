# L2 forms-countries — the markets editor onto the one Field, gate and parser

## HEAD
`git rev-parse HEAD` → `7c0f1013083e53885c7085ffdd34dd79f4317dd5` (dev `7c0f10130`).

## FILES (each with its test)
| File | Change | Test |
|---|---|---|
| `src/features/admin-countries/country-dialogs.tsx` | `CountryFormFields` draws its four controls through `Field` (`@/components/forms/field`) instead of `FormField`; takes `gate` and `refusals` props | `country-dialogs.test.tsx` (extended) |
| `src/features/admin-countries/country-editor.tsx` | opens `useFormGate()`; local name check leaves; order read by `parseNumber`/`numberOf` | `country-editor.test.tsx` (new) |
| `src/features/admin-countries/country-refusals.ts` | `COUNTRY_REFUSALS.words` gains `required: "post.refusal.required"` and `badType: PARSE_INVALID_KEY` | `country-refusals.test.tsx` (extended) |
| `src/features/admin-countries/country-dialog-state.ts` | removed (path added to `docs/tracking/intentional-deletions.txt` only if the ruling allows that ledger — see CONFLICTS) | — |
| `scripts/conformance/forms-allowlist.txt` | lines 17 (`CF-FORM-1 … country-dialogs.tsx (4)`) and 75 (`CF-FORM-4 … country-dialog-state.ts (1)`) leave | `scripts/conformance/forms.test.ts` |
| `docs/features/forms.md` | short "Markets console (wave 3)" paragraph | — |

## MECHANISM FOUND
`Field` (field.tsx): `id, field, label, required, marked, hint, refusal, family, gate, blank`, children as `(control) => …`. Every control gets `{...control}` and `className={controlClass(refused, false, "dialog")}` (control-class.ts; the `dialog` density already carries `DIALOG_FIELD`). Ids and test ids are unchanged.

| Control | id / testid | Field props |
|---|---|---|
| Name `Input` | `country-editor-name` | `field="nameEn"`, `required`, `gate`, `blank={values.nameEn.trim() === ""}`, `refusal` = the gate's mark for `nameEn`, `family={COUNTRY_REFUSALS}` |
| Unit `NativeSelect` (still the native select) | `country-editor-unit` | `field="unitSystem"`, `required`, `marked={false}` (it always holds a value, so it shows no mark and no "Optional"), `refusal={null}` |
| Currency `Input` | `country-editor-currency` | `field="currencyCode"`, `required={false}` (the Field writes "Optional" with `post.optional`), `hint={t("admin.countries.field.currencyHint")}`, `refusal={null}` |
| Order `Input` (`inputMode="numeric"`) | `country-editor-order` | `field="displayOrder"`, `required` (the mark shows), no `gate`/`blank`, `refusal` = the editor's parse refusal, `family={COUNTRY_REFUSALS}` |

**Gate.** `const gate = useFormGate()`. The name Field registers itself as blank through `register`. `submit`: `clear()`, then `if (!gate.try()) return`. The name's refusal is `gate.marks.find(m => m.field === "nameEn") ?? null`, read as `required` → "This is needed.". The block `render("admin.countries.error.nameRequired")` leaves. The `nameRequired` word stays in the family for the door's answer when the name is only spaces.

**Parser.** `const order = parseNumber(form.displayOrder, { integer: true })`. If it is `blank` or `invalid`, set the order's refusal `{ field: "displayOrder", reason: "badType" }` (words `PARSE_INVALID_KEY` = `post.refusal.badType`) and return before `guard`. Otherwise send `displayOrder: numberOf(order)`, which is a number once the check above passes. The refusal clears on the next submit. `NumberRules` offers `integer/min/max/decimals`; only `integer` is used, because the door judges the range (F3). The editor still sends `code`, trimmed `nameEn`, `unitSystem`, trimmed currency or `null`, and the parsed order (INC-188 round-trip unchanged).

Unchanged: the step-up `guard`, `useCountryRefusal` on `CountryDialogAlert`, Cancel/Save, `TipBadge` and the translations link.

## CONTROLS CENSUS — `src/features/admin-countries/`
| Place | Control | Verdict (DEC-338) |
|---|---|---|
| `country-dialogs.tsx:95,103,122,130` | name, unit, currency, order | **counted** (allowlist line 17, count 4) → moves into Field |
| `country-dialog-state.ts:1` | `numberOrZero` | **counted** CF-FORM-4 (line 75) → removed |
| `countries-page.tsx:343` | `country-search` Input | exempt: a list filter (`search` slot of `TableToolbar`) |
| `countries-page.tsx` FiltersButton / `countries-toolbar.tsx` | filter chrome | exempt: list filter (inside the toolbar) |
| `country-verb-dialogs.tsx:83,202,214,232,242` | Buttons only | not a control (no answer typed or chosen) |
| `country-import-dialog.tsx` | shared import dialog (file input) | exempt: file input |
| `country-verb-bar.tsx` | buttons | not a control |
There is no create dialog. `CountryFormFields` has one consumer, the editor (search: `rg CountryFormFields src e2e`).

## WORDS (all existing, no new key, no Amharic)
`admin.countries.field.name`, `.field.unit`, `.field.currency`, `.field.currencyHint`, `.field.order`, `admin.countries.unit.<name>`, `post.optional` ("Optional"), `post.refusal.required` ("This is needed."), `post.refusal.badType` (`PARSE_INVALID_KEY`), `admin.countries.error.nameRequired` (kept), `common.cancel`, `common.save`, `admin.countries.edit.title`, `.edit.translationsLink`, badge/tip keys (unchanged).

## TESTS (prefix `KFM-`, free: `rg -c "KFM-" src scripts e2e docs` returns nothing)
- **KFM-1** each of the four controls sits inside a `[data-form-field]` with its id, test id and label. The name and order show the mark, the unit shows no mark and no "Optional", and the currency shows "Optional" and its hint (aria-describedby).
- **KFM-2** a blank name: Save keeps the gate closed, the name Field's refusal line reads "This is needed." with `aria-invalid`, and the upsert is never called.
- **KFM-3** an invalid order ("1.5", "abc") and a blank order: the order Field shows `post.refusal.badType`, and neither the upsert nor the guard is called.
- **KFM-4** a valid form: the upsert gets the trimmed name, the trimmed upper-case currency (or `null` when blank) and the parsed integer order.
- **KFM-5** (refusals test) `COUNTRY_REFUSALS` reads `required` → `post.refusal.required` and `badType` → `post.refusal.badType`, and `nameRequired` still reads its own key.
- Guard: `bunx vitest run scripts/conformance/forms.test.ts` passes with both lines gone. Existing `country-dialogs.test.tsx` (S6-2) is updated for the new props.

Build-turn checks: `bash scripts/check-hardcoded-strings.sh`; `bunx prettier --check` and `bunx eslint --max-warnings 0` on the touched files; the three test files run whole; the forms guard. Last step: `git diff --name-only 7c0f10130`, writing back or deleting anything outside the task, then paste the list.

## FIRST DOWNLOAD
No public page changes. `/admin/countries` loads the editor on demand. Its chunk gains `field.tsx`, `use-form-gate.ts`, `parse-input.ts` and `control-class.ts`, and loses `form-section`'s `FormField` if nothing else in the chunk uses it. These are already shared admin chunks (the posting wizard). The build report lists them chunk by chunk.

## CONFLICTS
1. **Deletion ledger.** The project rule says every deletion adds its path to `docs/tracking/intentional-deletions.txt`, but Knowledge ROLE forbids `docs/tracking/**`. I need a ruling: either that one line is allowed, or the supervisor adds it.
2. **Family words.** Item 3 names only `required`. The parser's refusal needs a word in the family, or the reader falls to the generic line, so I add `badType: PARSE_INVALID_KEY` too. This is an existing key, not a new string.
3. No other conflict. No kit, lib, e2e, SQL or package file is touched. AGENTS.md is untouched.

## SIBLINGS (K2, report only)
- `country-dialogs.tsx` header comment says the fields are "shared by create and the editor", but no create dialog exists. This is a stale comment and will be corrected in the touched file.
- `country-editor.tsx:77` `CategoryModal` is imported from `admin-categories`, so the dialog shell crosses features. Not a form concern; reported only.
- The other wave-3 consoles are still in `forms-allowlist.txt` under CF-FORM-1/CF-FORM-4. They are untouched and follow this file as the model.
