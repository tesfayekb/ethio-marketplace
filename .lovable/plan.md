# L3 forms-locations — plan (A0, nothing changed)

Branch: `lovable/forms-locations` (sandbox `edit/edt-1c880d1d-4339-4a6c-b6b9-560033f2fbf8`), HEAD `dde51203bae0669601ef5ebb033b1e22abb69b86` = base.

## (a) Files
- `src/features/admin-locations/location-form-fields.tsx` — 7 controls onto Field; takes `gate` + `refusals` props (L2's `CountryFormFields` shape).
- `location-dialogs.tsx` — create dialog: parent onto Field; `useFormGate` + `gate.try()` first; parser for lat/lng/order.
- `location-editor.tsx` — same submit order as `country-editor.tsx` (it shares the form fields, so it must pass the gate; not in the census but needed — listed for the ruling).
- `location-verb-dialogs.tsx` — move parent + delete confirm onto Field.
- `location-dialog-state.ts` — DELETED (`numberOrNull` replaced by `parseNumber`/`numberOf`); its line + comment appended to `docs/tracking/intentional-deletions.txt` (text as the supervisor supplies, as in L2).
- `location-refusals.ts` — family gains `required: "post.refusal.required"`, `badType: PARSE_INVALID_KEY` (L2's conflict-2 ruling); `location-refusals.test.tsx` keys list updated.
- Tests: `location-verb-dialogs.test.tsx` (extended: move/delete Field ids, aria), new `location-form-fields.test.tsx` and `location-editor.test.tsx` (KFL-1…n); `locations-service.test.ts` unchanged (no service change, E2).
- `scripts/conformance/forms-allowlist.txt` — lines 21, 22, 23 leave (DEC-396); line 24 stays.
- `docs/features/forms.md` — "Places console (wave 3)" paragraph.
- i18n-usage maps regenerated (a key-using file is deleted? no — `location-dialog-state.ts` uses no keys; maps regenerated only if the diff shows it).

## (b) Controls (all `layout="stack"`, `controlClass(refused,false,"dialog")`)
| file:line | old | Field | parse |
|---|---|---|---|
| form-fields:62 name | FormField+Input | required, gate, blank | text, trimmed |
| form-fields:82 slug | FormField+Input, help | optional, hint=slugHint | — |
| form-fields:98 iso (region only) | FormField+Input | optional | — |
| form-fields:108 centre lat | FormField+Input, help | required at city/sub_city (`coordinatesRequired`), else optional; hint kept | `parseNumber(raw,{min:-90,max:90})`; blank → null (or gate when required); invalid → badType |
| form-fields:125 centre lng | FormField+Input | same rule as lat | `parseNumber(raw,{min:-180,max:180})` |
| form-fields:135 aliases (typed alias Input + add/chips) | FormField+Input | optional, hint=aliasesHint; Field wraps the row | — |
| form-fields:184 order (country only) | FormField+Input | required, prefilled | `parseNumber(raw,{integer:true})`; null → badType, never `?? 0` |
| dialogs:163 create parent | FormField+NativeSelect / read-only p | required, `marked={false}` (always holds a value) | — |
| verb-dialogs:158 move parent | FormField+NativeSelect | required, `marked={false}` | — |
| verb-dialogs:356 delete confirm | FormField+Input | required, gate, blank; slugMismatch stays the door/client check via the family | — |

Question for the ruling: the lat/lng min/max bounds are new client mirrors; if unwanted I use no bounds (parser only decides blank/invalid/value).
Field ids = the door's field names via `field=` (`nameEn`, `slug`, `iso`, `centerLat`, `centerLng`, `aliases`, `displayOrder`, `parentId`, `confirm`); DOM `id` stays `${p}-name` etc.

## (c) Mechanisms read (K1)
`Field` (field.tsx: required/marked/hint/refusal/gate/blank/layout), `useFormGate` (report/register/try/marks), `parse-input.ts` (`parseNumber`, `numberOf`, `PARSE_INVALID_KEY`), `control-class.ts` (`controlClass`, dialog density), `location-refusals.ts` (`useLocationRefusal`, `LOCATION_REFUSALS`), the required mark inside Field. Local checks `nameRequired` and `missingCoordinates` leave as client pre-checks (gate replaces them); their keys stay in the family for the door's codes.

## (d) data-testid kept (all, unchanged)
location-create-{name,slug,iso,lat,lng,alias,order,parent,level,slug-preview,dialog,submit,close,retired}, location-edit-{name,slug,iso,lat,lng,alias,order}, location-alias-{add,list,chip-N,remove-N}, location-move-{parent,path,empty,dialog,submit}, location-delete-{confirm,path,dialog,submit}, location-dialog-{error,cancel}, location-editor-save. Field's own `form-field`/`form-field-refusal` ids are added by the kit.

## (e) New English strings
None.

## (f) First download today
Not measured: plan mode forbids running the build. Ceiling line today: `/admin/places` 329 (route-budgets.mjs:51). Before/after measured in the build turn; expected growth small (field.tsx, use-form-gate.ts, parse-input.ts, control-class.ts may already be in the admin chunk set — confirmed by the measurement).

## (g) Conflicts with Knowledge
1. `location-editor.tsx` is outside the three census files but shares the form; needs a ruling to include it.
2. Deletion line in `docs/tracking/intentional-deletions.txt` needs the supervisor's exact text.
3. Family additions `required`/`badType` (precedent L2) — confirm.
4. `CategoryModal` borrowed from the categories console — K2 only.

## (h) Cannot run in sandbox
`bun run checks` whole; the first-download measurement if the build cannot finish; browser tests (CI only). Will run A6's list: string scan, i18n:usage + diff, check-deletions, prettier, eslint, vitest on touched tests + forms.test.ts.

## K2 siblings
`locations-toolbar.tsx` filter (DEC-338, stays); other wave-3 consoles still on their allowlist lines.

## Last step
`git diff --name-only dde51203b`; write back every non-task path from base; list it.
