STOP — f2-forms phase 1: the plan is posted (PLAN ONLY — no code, no test run, no `bun run checks`)
DONE: STEP 0 (the brief saved, roadmap line 5, draft PR #21), phase 1 (the census and the plan below)
LEFT: phase 2 (the build) — waits for the supervisor's ruling and its place in the order (after P-2 and F1-1)
CI: not read — a plan lane; every commit carries `[skip ci]` and the task forbids `bun run checks`
FILES: docs/governance/briefs/f2-forms.md
docs/governance/reports/f2-forms.stop-1.md
roadmap.md

# Foundations 2 plan (lane C) — the form kit

Executor F-2. Base `origin/dev` = `7c89b1f60` (the merge of PR #18, p1c-fold-d). Every number below
comes from a read of this tree at that commit (the census scripts ran from `/tmp`, nothing in the
repository ran; the control counts are an AST walk of every non-test `.tsx` under `src/` with the
main checkout's `typescript`, the rest `rg`). Line numbers are of the base.

## 1. THE CENSUS

### 1.1 The mechanisms of today, as they really are

| Named by the brief | At the base | Note |
| --- | --- | --- |
| `Field` — `src/features/posting/field.tsx` :160 | ✓ `Field({ id, label, required, refusal, hint, refusalTestId, refusalAttr, children })` | renders label (`htmlFor={id}`), `RequiredMark`/Optional, children, hint, and a `<p role="alert">` with `t(draftRefusalKey(refusal.reason))`. It sets NO `aria-invalid` and NO `aria-describedby` on the control (the refusal `<p>` has no `id`), and it imports the posting feature's `./types` (STEPS, which pulls `@/lib/dials`) and `./refusal-text` (the three posting maps). Rule 12 §Forms describes it as already carrying the aria pair — it does not. |
| `reportMissing` | `src/features/posting/wizard.tsx` :263 (not field.tsx) | the mirror `{ step, by: Record<source, string[]> }`; six sources report — details :282, where :286, pricing :290, who :294, price :322, spec :336; a tap on the closed Next sets `tried` and calls `focusFirstRefusal` :1388 |
| `focusFirstRefusal` | field.tsx :281 ✓ | document order; `fieldTarget` :215 tries FIVE id shapes (`post-who-<alias>`, the bare field, `post-<kebab>`, `post-attr-<key>`, `[data-field]`) — the control's id is NOT the door's field name today |
| `FormField` — `src/components/shell/form-section.tsx` :26 | ✓ `{ label, htmlFor?, help?, error?, full?, children, testid }` | the SECOND shape: no required mark, no aria pair, `error` is a STRING (already-translated words), `<p role="alert">` without an id; 93 controls in 29 files sit in it |
| a THIRD shape the brief did not name | `src/components/ui/form.tsx` (shadcn react-hook-form `Form*`, `aria-invalid` :114) | zero importers — dead code; the only file in src with the aria pair done the WAI-ARIA way |
| a FOURTH, local, name-colliding `Field` | `src/features/admin/users/user-detail.tsx` :135–139 | a read-only label/value row called `Field`; renames or folds in wave 3 |
| `errorText` + `ActionMessage` (row 15) | ✓ `src/lib/error-text.ts`, `src/components/ui/action-message.tsx` | 7 `errorText(` calls in control files: categories-page, country-dialogs, location-dialogs, location-verb-dialogs, legal-version-view, data-scope, auth.tsx |
| `readerFailure` / `ReaderError` (row 27) | ✓ `src/lib/reader-failure.ts` | readers only; not a form concern |
| `splitRefusal` | `src/lib/refusal-tail.ts` :13 — with `fillRefusal` :24, `RATE_LIMITED_KEY` :42, `DOOR_KEY` :45 and `doorKeyText` :51 | the client reader of the ADMIN door dialect (`admin.<family>.error.<name>[:tail]`); consumers: category-dialogs.tsx :131, import-dialog.tsx |
| `doorRefusal` | `src/features/posting/door-error.ts` :24 (with `doorErrorDetail` :11) | NOT a client reader — the SERVER's worder of a door exception, called by `src/server/door.ts` :46, `src/routes/api/listings/identity.ts` :182, `draft.ts` :106 (a server module importing from `src/features/posting/` — a layering note for row 13, not this lane's to fix) |
| the route envelope's shape guard (row 13) | `src/lib/route-client.ts` `RouteAnswer` :5 (`error`, `detail`, `payload`); `refusalsOf` THREE times — `src/features/posting/posting-service.ts` :39, `src/features/my-listings/my-listing.ts` :576, `src/features/admin-listings/use-admin-listing.ts` :188 | three readers of `{ ok:false, refusals:[…] }` |
| the posting refusal maps | `src/features/posting/refusal-text.ts` — `draftRefusalKey` :152 (DRAFT_REASONS, 63 codes), `photoRefusalKey` :157 (PHOTO_REASONS, 23), `backgroundRefusalKey` :147 (4); `fieldAwareRefusal` :166, `refusalFor` :174, `fill` :183 | consumers: field.tsx, wizard, step-details/where/who/pricing/review/photos, background-dialog, admin-listings/listing-photos.tsx, admin-screening/photo-reviews.tsx (12 files) |
| `numberOrZero` | def `src/features/admin-countries/country-dialogs.tsx` :172; call `country-editor.tsx` :65 | ✓ 2 files as the brief says — 1 definition, 1 call |
| `*ErrorKey` mappers | 18 DEFINITIONS, not "≥ 12 under src/features/admin/**": 4 under `src/features/admin/**` (legal-service :132, roles-service :143, translations-service :402, admin-users-service :244), 12 under `src/features/admin-*/` (locations-service :401, use-photo-changes :96, use-photo-reviews :92, monetisation-service :373, countries-service :129, move-reasons :56, tier-reasons :54, ai-service :437, edit-listing :256, listing-policy :37, photo-remove :22, undo-edit :32), 1 auth (`toErrorKey`, auth-error-key.ts :35), 1 my-listings (`actionErrorKey`, my-listing.ts :245) | plus `stepUpAbortKey` (`src/features/auth/mfa/mfa-service.ts` :139), which 5 of them call first; plus 5 `*ErrorLine` components (location-dialogs :55, attribute-dialogs :103, country-dialogs :40, monetisation-dialogs :19, category-dialogs :95) and 5 `use*Error` hooks (location :39, attribute :73, monetisation `use-monetisation-error.ts` :14, country :25, category `useSubmitError` :107) |
| row 14's exceptions | needsLeaf `wizard.tsx` :520 (Next `disabled`, not drawn closed); photos `photosBlockNext` :523 (`photosHeld > 0`) and `photosSendingNow` :529; review `certifyClosed` :897 (AgreeToDocument, DEC-236) | all three present; verdicts in §1.4 |

NONE YET, confirmed: a Field for every form; a field registry (the only registry is posting's `FIELD_LABEL_KEYS` :31 / `FIELD_STEPS` :75 / `fieldTarget`'s who-map :217 — three posting-only tables); one reader over the dialects; one number/text parser (five local typed-absence parsers exist — §1.3); the coverage census (no form guard exists under `scripts/conformance/`; `live-regions.test.ts` is the only census that reads a refusal line's `role="alert"`).

### 1.2 The consumers, recounted (AST walk; control tags `input|Input|PasswordInput|select|NativeSelect|textarea|Textarea|Checkbox|Switch|RadioGroupItem|InputOTP|Slider`)

Totals at the base: **78 files, 249 controls — 16 inside `Field`, 93 inside `FormField`, 140 bare.** Outside the one Field: 233 in 78 files; leaving out the four primitive definitions (`ui/input.tsx`, `native-select.tsx`, `password-input.tsx`, `textarea.tsx` — 4) and the two `/dev` routes (5): **224 controls in 72 files**. The audit's 25 Oct figure (69 files, 210) was true then; the tree grew by the monetisation dialogs, the Guide controls, the languages page and P-1c (the earlier census note: handoffs/2026-10-27-foundations-running-record.md :445). Not counted as tags but counted as control KINDS: `DateField` (`src/components/shell/date-field.tsx`, a button-driven date — 9 uses in 6 files), `PhoneNumberField` (`src/features/posting/phone-number-field.tsx`, 1 use, `role="combobox"`), the currency picker in `step-pricing.tsx` (`role="combobox"`), `AgreeToDocument` (1 Checkbox; the first ARIA-complete control: `aria-invalid` :109, `aria-describedby` :110). Test files: 8 `.test.tsx` render 13 controls (their own fixtures; the guard excepts tests as the brief says).

`<form>` elements: **7 in 4 files** — `app-header.tsx` :49, :161 (the two search forms, `preventDefault`), `auth.tsx` :437, :616, `auth_.reset.tsx` :177, `settings.tsx` :808, :865. **`noValidate` appears nowhere in src/ or e2e/.** Every admin "form" is a dialog whose submit is a `<button onClick={onSubmit}>` (DialogActions in each family) — no `<form>` element at all, so "every form carries noValidate" has 7 consumers; the law for the dialogs is "submit through the gate", which the guard judges by the gate's registration, not by `noValidate`.

Native `required` attributes with no `noValidate`: auth.tsx (5), auth_.reset.tsx (2), settings.tsx (5) — the browser's own untranslated bubbles are these forms' blank-gate today.

Local `fieldClass` definitions (G54 c): `auth.tsx` :81, `auth_.reset.tsx` :44, `settings.tsx` :84, `step-where.tsx` :151, `step-who.tsx` :86 — 5; beside them field.tsx's `fieldControlClass` :119 / `controlClass` :133 (min-h-11, ring-2) and `ui/input.tsx`'s own look (h-9, ring-1, `DIALOG_FIELD`) — two control heights in the app.

`aria-invalid` on refusal (non-test): 13 sites in 7 files — step-who :776, :816, :843, :879, :1075, :1157; step-where :1997, :2097; step-specifications :1620, :1691; phone-number-field :240; agree-to-document :109; legal-facts-card :43; `ui/form.tsx` :114 (dead). `aria-describedby` naming a refusal: agree-to-document :110 only (phone-number-field :247 names a hint; settings :965, listing-settings :176, name-checks :308 name help text). The `Field` itself sets neither on the 16 controls inside it; step-specifications sets `aria-invalid` on two of them by hand.

Per file (controls = total / in Field / in FormField / bare; shape; gate; refusal path; number parse; aria on refusal). "—" = no write; "own" = the submit button's own disabled/blank check; "reader" = doorKeyText; "map" = a `*ErrorKey` mapper; "raw" = the door's message rendered as words.

| file | controls | shape | gate | refusal path | number parse | aria |
| --- | --- | --- | --- | --- | --- | --- |
| components/shell/app-header.tsx | 2/0/0/2 | bare (2 `<form>`, search) | — | — | — | — |
| components/shell/columns-button.tsx | 1/0/0/1 | bare Switch | — | — | — | — |
| components/shell/data-table.tsx | 4/0/0/4 | bare (row ticks, page size) | — | — | Number( :1 (page size) | — |
| components/ui/{input,native-select,password-input,textarea}.tsx | 4 | the primitives | — | — | — | no `aria-invalid:` look |
| features/ad-page/report-ad.tsx | 2/0/0/2 | bare radio + Textarea | own | — (stage 3 consumer) | — | describedby question only |
| features/admin-ai/ai-feature-form.tsx | 3/0/2/1 | FormField + bare | own | map `aiErrorKey` + raw reason line :131 | `typedDollars` (ai-service :302, typed) | — |
| features/admin-ai/ai-page.tsx, ai-spend-days.tsx | 1+1 bare | filters | — | — | — | — |
| features/admin-attributes/attribute-dialogs.tsx | 13/0/11/2 | FormField | own (5 blank checks) | `useAttributeError` → raw fallback :98 | inline regex→null :297 | — |
| features/admin-attributes/attributes-page.tsx | 2/0/0/2 | bare filters | — | — | — | — |
| features/admin-attributes/category-attributes-dialog.tsx | 7/0/0/7 | bare | own | family hook | — | — |
| features/admin-attributes/components/attribute-allowed-values.tsx | 2/0/0/2 | bare | own | family hook | — | — |
| features/admin-attributes/components/attribute-link-cells.tsx | 7/0/0/7 | bare (table cells) | — | family hook | `Number(raw)` :25 → NaN sentinel | — |
| features/admin-attributes/components/attribute-option-row.tsx | 8/0/3/5 | FormField + bare | own | family hook | — | — |
| features/admin-attributes/components/attribute-option-rows.tsx | 2/0/2/0 | FormField | own | family hook | — | — |
| features/admin-attributes/components/attribute-v2-fields.tsx | 11/0/11/0 | FormField | own | family hook | 4 `inputMode=numeric` strings parsed in attributes-service | — |
| features/admin-categories/categories-page.tsx | 2/0/0/2 | bare filters | — | `errorText` | — | — |
| features/admin-categories/category-dialogs.tsx | 9/0/7/2 | FormField | own (4 blank checks) | `useSubmitError` → `doorKeyText` → raw fallback :135 | null-or-Number :276, :315 | — |
| features/admin-categories/category-form-fields.tsx | 10/0/8/2 | FormField | own | (parent's) | — | — |
| features/admin-countries/countries-page.tsx | 1/0/0/1 | bare filter | — | — | — | — |
| features/admin-countries/country-dialogs.tsx | 4/0/4/0 | FormField | own | `useCountryError` → map `countryErrorKey` + raw reason line :59 | `numberOrZero` :172 (SENTINEL) | — |
| features/admin-listings/listing-settings.tsx | 2/0/0/2 | bare | own | map `settingsErrorKey` | `daysOf` (listing-policy :28, typed) | describedby help |
| features/admin-listings/listings-page.tsx | 2/0/0/2 | bare filters (+2 DateField) | — | map | — | — |
| features/admin-listings/reason-note.tsx, undo-dialog.tsx | 1+1 in FormField | FormField | own | map `moveErrorKey`/`tierErrorKey`/`undoErrorKey` | — | — |
| features/admin-locations/location-dialogs.tsx | 1/0/1/0 | FormField | own | `useLocationError` → map + raw reason line :69 | `numberOrNull` :118 (typed) | — |
| features/admin-locations/location-form-fields.tsx | 7/0/7/0 | FormField | own | family hook | 3 numeric strings | — |
| features/admin-locations/location-verb-dialogs.tsx | 2/0/2/0 | FormField | own | family hook | — | — |
| features/admin-locations/locations-page.tsx, locations-toolbar.tsx | 1+1 bare | filters | — | — | — | — |
| features/admin-monetisation/market-dialog.tsx | 2/0/2/0 | FormField | own | `useMonetisationError` → map + raw reason line (monetisation-dialogs :35) | — | — |
| features/admin-monetisation/monetisation-dialogs.tsx | 4/0/3/1 | FormField; a LOCAL kit (`NumberField` :86, `Toggle` :120, `PlacementSelect` :151, `BadgeSelect` :184) | own | as above | `wholeNumber` (monetisation-forms :35, typed) | — |
| features/admin-monetisation/override-dialog.tsx | 3/0/3/0 | FormField | own | as above | — | — |
| features/admin-monetisation/price-dialog.tsx (+2 DateField), price-end-dialog.tsx (1 DateField) | 5/0/5/0 | FormField | own (`price-forms.ts` validates) | as above | `Number(amount)` price-forms :133 after a regex | — |
| features/admin-monetisation/product-editor.tsx | 3/0/3/0 | FormField | own | as above | — | — |
| features/admin-monetisation/product-prices-table.tsx | 1/0/0/1 | bare filter | — | — | — | — |
| features/admin-screening/name-checks.tsx | 1/0/0/1 | bare Textarea | own | keys (screening service) | — | describedby help |
| features/admin-screening/screening-page.tsx | 1/0/0/1 | bare filter | — | map (photo hooks) | — | — |
| features/admin/audit/audit-page.tsx | 1/0/0/1 (+2 DateField) | bare filters | — | — | — | — |
| features/admin/impersonation/impersonation-starter.tsx | 1/0/1/0 | FormField | own | local key logic | — | — |
| features/admin/import-dialog.tsx | 1/0/0/1 | bare file input | own | `doorKeyText` + the gate's codes | — | — |
| features/admin/legal/legal-editor-form.tsx | 4/0/0/4 | bare | own | map `legalErrorKey` | — | — |
| features/admin/legal/legal-facts-card.tsx | 2/0/0/2 | bare | own (`facts-validation.ts`) | map | `Number(value)` :111; facts-validation :44–58 | `aria-invalid` :43 ✓ (no describedby) |
| features/admin/legal/legal-page.tsx, legal-version-view.tsx | 2+3 bare | bare | own | map | — | — |
| features/admin/legal/legal-publish-dialog.tsx | 3/0/0/3 | bare (2 radio) | own | map | — | — |
| features/admin/roles/role-detail.tsx, roles-list.tsx | 4/0/3/1 each | FormField + bare | own | map `roleErrorKey` (regex over English sentences) | — | — |
| features/admin/translations/data-scope.tsx | 1/0/0/1 | bare Textarea | own | map `translationErrorKey` / `errorText` | — | — |
| features/admin/translations/delete-language-dialog.tsx, language-picker.tsx, transfer-bar.tsx, translator-card.tsx | 1 each, bare | bare | own | map | — | — |
| features/admin/translations/languages-page.tsx | 7/0/5/2 | FormField + bare Switch ×2 | own | map + `setErrorDetail(raw)` :243 | — | — |
| features/admin/translations/strings-page.tsx | 4/0/0/4 | bare | own | map | — | — |
| features/admin/users/user-detail.tsx | 6/0/4/2 | FormField (+ a local read-only `Field` :135) | own (3 blank checks) | map `profileEditErrorKey` | — | — |
| features/admin/users/users-list.tsx | 1/0/0/1 | bare filter | — | — | — | — |
| features/auth/mfa/step-up-dialog.tsx | 1/0/0/1 | bare (OTP as Input) | own | `use-step-up` keys | — | — |
| features/legal/agree-to-document.tsx | 1/0/0/1 | its own (imports `RequiredMark` from posting/field) | own (`certifyClosed`) | keys | — | ✓ both :109–110 |
| features/my-listings/my-listings-page.tsx | 1/0/0/1 | bare filter | — | — | — | — |
| features/posting/map/map-pin-dropper.tsx | 3/0/0/3 | bare | — | — | — | — |
| features/posting/phone-number-field.tsx | 2/0/0/2 | its own (combobox) | via step-who | via step | — | `aria-invalid` :240; describedby = hint :247 |
| features/posting/step-category.tsx | 1/0/0/1 | bare search | needsLeaf (own) | `draftRefusalKey` | — | — |
| features/posting/step-details.tsx | 2/2/0/0 | Field | reportMissing | reader (Field) | — | none |
| features/posting/step-photos.tsx | 3/1/0/2 | Field + bare file inputs | photos rules (own) | `photoRefusalKey` ×8 | — | none |
| features/posting/step-pricing.tsx | 6/5/0/1 | Field + combobox | reportMissing | reader | `Number(text === "" ? "0" : text)` :93 inside the amount scaler; null-or-Number :655 | none |
| features/posting/step-review.tsx | 1/0/0/1 (+1 DateField) | Field around a Switch | certifyClosed (own) | reader | — | none |
| features/posting/step-specifications.tsx | 8/8/0/0 | Field | reportMissing | reader | null-or-Number :1407, :1439, :1445 | `aria-invalid` :1620, :1691 (the "other" text) |
| features/posting/step-where.tsx | 10/0/0/10 | bare + local fieldClass :151 | reportMissing | reader | `Number(payload[key])` :215 typed | `aria-invalid` :1997, :2097 |
| features/posting/step-who.tsx | 8/0/0/8 | bare + local fieldClass :86, `controlClass` ×6 | reportMissing | reader | — | `aria-invalid` ×6, no describedby |
| routes/auth.tsx | 4/0/0/4 | bare + fieldClass :81; 2 `<form>` no noValidate, `required` ×5 | browser bubbles | map `toErrorKey` → one `<p role="alert">` at the top :534 | — | — |
| routes/auth_.reset.tsx | 2/0/0/2 | bare + fieldClass :44; `<form>` no noValidate, `required` ×2 | browser bubbles | map | — | — |
| routes/settings.tsx | 9/0/0/9 | bare + fieldClass :84; 2 `<form>` no noValidate, `required` ×5 | browser bubbles + own | map → per-slot `refuse(slot, key)` :272 (INC-570) | — | describedby help :965 |
| routes/dev.primitives.tsx, dev.style.tsx | 2+3 | the catalogue | — | — | — | — |

### 1.3 The parsers of today (form-input parses only; the service-layer `Number(row.x)` reads are not form concerns)

Typed absence already, locally (fold onto the one parser): `wholeNumber` (monetisation-forms.ts :35), `numberOrNull` (location-dialogs.tsx :118), `daysOf` (listing-policy.ts :28, with bounds), `typedDollars` (ai-service.ts :298), the inline null-or-Number at category-dialogs :276/:315, attribute-dialogs :297, step-pricing :655, step-specifications :1407/:1439/:1445. Sentinels: `numberOrZero` (country-dialogs :172 → 0), `typedDefault` (attribute-link-cells :25, `Number(raw)` → NaN), step-pricing :93 (an empty amount text becomes `"0"` inside the scaler — the caller guards blank before it; mark, verify in wave 1). Text: no `parseText`/`normalizeText` exists anywhere in src (the SQL `import_norm_text` serves imports only); `.trim() === ""` blank checks: 28 in 13 admin files.

### 1.4 Row 14's exceptions — stay or fold

| exception | at the base | verdict |
| --- | --- | --- |
| step 1 `needsLeaf` (wizard :520) | Next `disabled` (not drawn closed) until a leaf category is chosen; Enter blocked :1477 | FOLDS: report `category_id` through the gate (`reportMissing("category", …)`) so Next is drawn closed like every other step and a tap focuses the finder. A behaviour change (disabled → drawn closed) — needs the ruling; D193's text says "disabled", bundle 17 made every other step drawn-closed. |
| step 2 photo rules (wizard :523 `photosHeld > 0`, :529 `photosSending > 0`) | held-by-screening and in-flight uploads | STAYS as a DEC: neither is a blank answer — the gate reports blanks, the step waits for its uploads (INC-605). The minimum-photos rule (if one applies) folds as `photos` required. |
| review's `certifyClosed` (wizard :897, AgreeToDocument) | the certification tick (DEC-236) | FOLDS HALF: `AgreeToDocument` becomes a Field control kind (checkbox with the aria pair it already has) that reports `certify` to the gate; the loading/error-state `disabled` stays (a door state, not a blank). |

## 2. THE KIT

### 2.1 Where it lives — `src/components/forms/` (move), not `src/features/posting/field.tsx` (grow)

Argument: (a) rule 10 Reuse — primitives in `src/components`, feature pieces in `src/features/<name>/`; a Field every admin console, `/auth` and `/settings` import from `features/posting/` inverts that (legal already does it: agree-to-document.tsx :3). (b) weight — field.tsx imports posting's `types.ts` (STEPS + `@/lib/dials`) and `refusal-text.ts` (90 codes); `/auth` and `/auth_/reset` are PUBLIC pages (route-budgets.mjs :59, :61 — ceilings 229 and 218 KiB, both in the NEAR band) and Report-this-ad (stage 3) sits on the public ad page: the Field they take must carry no posting table. (c) the posting-only parts (`FIELD_LABEL_KEYS`, `FIELD_STEPS`, `stepOfField`, `fieldTarget`'s who-map, `RefusalSummary`, `summaryLabel`) are posting's REGISTRY and stay in `src/features/posting/field-registry.ts`; `src/features/posting/field.tsx` becomes a re-export of the primitive plus those, so the ten importers and the 47 e2e uses of `post-field*` ids in 9 specs do not move in wave 1.

Files (new): `src/components/forms/field.tsx` (the primitive), `src/components/forms/field-gate.ts` (`useFormGate`), `src/components/forms/field-registry.ts` (the type and the lookup), `src/components/forms/controls.tsx` or one file per kind under `src/components/forms/` (rule 10: one component per file — `text-control.tsx`, `number-control.tsx`, `select-control.tsx`, `checkbox-control.tsx`, `radio-group-control.tsx`, `switch-control.tsx`, `combobox-control.tsx` wrapping `searchable-picker.tsx`, `date-control.tsx` wrapping `DateField`), `src/lib/refusal.ts` (the reader), `src/lib/parse-input.ts` (`parseNumber`, `parseText`).

### 2.2 The Field's API

```ts
<Field
  id={field}                 // the door's field name — the control's id, the refusal's anchor
  label={t(key)} required hint={…}
  refusal={refusal}          // Refusal | null — read by the reader, never by the Field
  kind="text" | "textarea" | "number" | "select" | "checkbox" | "radio" | "switch" | "combobox" | "date"
  gate={gate}                // from useFormGate(); the Field registers `id` when required && blank
  testId? refusalTestId?     // `post-field` / `post-field-refusal` kept for the 9 specs
>
```

Contract: label `htmlFor={id}`; required mark / Optional (today's `RequiredMark`); the control gets `id`, `aria-invalid={refused || undefined}`, `aria-describedby` = `${id}-hint` when a hint exists + `${id}-refusal` when refused (WAI-ARIA 1.2 `aria-errormessage` is not yet read by every reader; GOV.UK pattern: describedby, message before the control is acceptable, we keep it under); the refusal `<p id="${id}-refusal" role="alert">` renders `t(readRefusal(refusal).key, values)`; the control's look is ONE class (today's `controlClass`, min-h-11 — the dialogs' `DIALOG_FIELD` h-9 look is a parameter `density="dialog"`, never a second class); the refused and required-empty borders as `controlClass` draws them today (U6-C1-R2, INC-355). `fieldClass` locals and `ui/form.tsx` are deleted (declared in `docs/tracking/intentional-deletions.txt`).

Exists and only needs adopting: `Field`'s label/required/refusal/hint rendering, `RequiredMark`, `controlClass`, `focusFirstRefusal`/`focusElement` (reduced-motion scroll), `RefusalSummary`, the e2e ids. New: `kind`, the aria pair, the refusal `id`, `gate` registration, the density parameter, the control wrappers.

### 2.3 The gate — `useFormGate()` (one hook; the wizard's mirror becomes its first consumer)

`const gate = useFormGate(); gate.missing: string[]; gate.tried: boolean; gate.try(): boolean /* focuses first, returns open */; gate.register(id, blank)`. Semantics are today's wizard mirror (:259–:300): per-source lists replaced by per-field registration (equality-guarded writes, rule 10 Runtime stability), `tried` cleared on step change, `triedRefusals` = missing → `required`. The wizard keeps `reportMissing` as an adapter over `gate.register` in wave 1 and drops it when every step is on Field controls. A submit (`<form noValidate onSubmit>` or a dialog's verb) calls `gate.try()`; closed ⇒ `data-closed="1"`, marks, scroll + focus; open ⇒ the door judges (F3 — the gate blocks blanks only, never a format).

### 2.4 The registry — the door's field names as ids

Where: beside each door's client service, as a `const FIELDS = { title: "title", … } as const satisfies FieldRegistry` in `src/features/<name>/<name>-fields.ts` (posting's exists in spirit as `FIELD_LABEL_KEYS`/`FIELD_STEPS`; the kit's type `FieldRegistry = Record<string, { label: MessageKey; step?: number }>` lives in `src/components/forms/field-registry.ts`). How a refusal names a field: the posting dialect already carries `field` in each `Refusal`; the admin dialect's `code[:detail]` names a field when `detail` is a registered field name (`admin.locations.error.required:name`), otherwise the refusal is FORM-level and renders in the form's summary slot (today's `*ErrorLine` position). F1-1's `door_refuse(code, detail)` (not in this tree — §5) adopts the same rule: `detail` is the field when the registry knows it.

### 2.5 The reader — `src/lib/refusal.ts` (one module; `refusal-tail.ts` folds into it)

```ts
readRefusal(input: unknown, family?: Family): { key: MessageKey; values?: Record<string,string>; field: string | null; abort?: true }
```

Branches, in order: (1) step-up abort (`stepUpAbortKey` — returns `abort`); (2) the route envelope — `RouteAnswer.error`/`detail` (`{ error: code }`) and `{ ok:false, refusals:[{field, reason}] }` — through ONE `refusalsOf` (the three fold); (3) the posting code dialect `code[:detail]` → the family map (DRAFT/PHOTO/BACKGROUND become rows of one map keyed by family); (4) the admin key dialect `admin.<family>.error.<name>[:tail]` → the key itself when the catalogue has it, filled with `fillRefusal`; (5) the bare-code dialect (`rateLimited`, `has_children`, the import gate's `fileTooLarge|invalidEncoding|…`) → one shared map; (6) the English-sentence dialect the 7 regex mappers read (roles, tier, move, edit, translations, legal, users — `permission denied`, `role has members`, `duplicate key`, `listing not found`) → one sentence map, marked RETIRING: F1-1's codes replace it door by door; (7) the auth provider dialect → `toErrorKey` becomes branch 7 (its reasons logic kept). Fallback: ONE generic key — `common.error` ("Something went wrong") exists; never the raw text, never a `{reason}` line (the five raw-reason lines go). Family keys (`admin.categories.error.saveFailed`) stay as the family's generic through the `family` argument.

### 2.6 The parser — `src/lib/parse-input.ts`

`parseNumber(raw: string, opts?: { integer?: boolean; min?: number; max?: number; decimals?: number }): { kind: "number"; value: number } | { kind: "blank" } | { kind: "invalid" }` and `parseText(raw: string, opts?: { maxLength?: number }): { kind: "text"; value: string } | { kind: "blank" }` (trim, collapse inner whitespace, NFC). The gate reads `blank` as missing; `invalid` renders the Field's own `badValue` refusal; neither is ever 0, NaN or "". `numberOrZero`, `numberOrNull`, `wholeNumber`, `daysOf`, `typedDollars`, `typedDefault`'s number branch and the inline null-or-Number sites fold (12 sites).

## 3. THE WAVES (G37 — by the tests reached; no expected-red window in any wave)

**Wave 1 — the kit, CF-FORM-1, the wizard's remaining steps.** Files: the new `src/components/forms/*`, `src/lib/refusal.ts` (+ `refusal-tail.ts` folded, its 9 tests moved), `src/lib/parse-input.ts`; `src/features/posting/field.tsx` → re-export + `field-registry.ts`; `wizard.tsx` (reportMissing over the gate; needsLeaf per the ruling); `step-where.tsx`, `step-who.tsx` (10 + 8 bare controls onto Field; the two `fieldClass` locals go), `step-category.tsx` (the finder's search stays a search; `category_id` through the gate), `step-photos.tsx` (file inputs stay bare by DEC — a file picker is not a typed answer; `photos` required through the gate), `step-review.tsx`, `agree-to-document.tsx` (a Field kind). Guard: `scripts/conformance/forms.test.ts` (CF-FORM-1…5: F1 a control tag outside a Field; F2 a `<form>` without `noValidate`; F3 a `*ErrorKey`/`*ErrorLine`/`use*Error` definition outside `src/lib/refusal.ts`; F4 a sentinel parse — `numberOrZero`, `Number(` on a control's value, `parseInt(`; F5 a local `fieldClass`/`controlClass` definition), each with a planted bypass under `node_modules/.cache/` (PPF-1's pattern), `forms-allowlist.txt` seeded at the census (`key | reason | until`), named in `wired.test.ts`'s domain by being under `scripts/conformance/`. Unit: `field.test.tsx` (aria pair, describedby ids, gate registration), `field-gate.test.ts`, `refusal.test.ts` (every branch + the generic fallback + a planted raw sentence never rendered), `parse-input.test.ts`, the moved `refusal-tail` cases, `step-who.test.tsx`/`step-where*.test.tsx` updated. E2E (both projects, 0 retries): `post-wizard-where.spec.ts`, `post-wizard-place.spec.ts`, `post-wizard-pricing.spec.ts`, `post-wizard-specs.spec.ts`, `post-wizard-bundle2.spec.ts`, `post-wizard-resets.spec.ts`, `post-wizard-finder.spec.ts`, `legal-certify.spec.ts`, `a11y.spec.ts` (A11Y-1/2 on steps 1, 3, 5), by id every PW-* that names `post-field-refusal` or `post-refusal-summary`. Weight: `bun run build && node scripts/check-bundle-size.mjs` on base and tree; every page reported; `/post` and `/post_/$listingId` (408) expected level or down (two `fieldClass` strings gone).

**Wave 2 — auth, settings, reset.** Files: `src/routes/auth.tsx` (sign-in, sign-up's own fields, forgot), `src/routes/auth_.reset.tsx`, `src/routes/settings.tsx` (change password, change e-mail, the tap-tick switch), `src/features/auth/auth-error-key.ts` → the reader's branch 7, `src/features/auth/mfa/step-up-dialog.tsx` (the code input as a Field), `password-input.tsx` (takes the aria pair from Field). `noValidate` on the 5 forms, the native `required` replaced by the gate (translated), the refusal lands on its field (`email`, `password`) or the form slot. Unit: `auth-error-key.test.ts` folded into `refusal.test.ts`; `password-input.test.tsx`. E2E: `auth-signup.spec.ts` (A-, SU-), `auth-signin-errors.spec.ts` (B-), `auth-reset.spec.ts` (R-), `settings.spec.ts` (S-), `account-saved.spec.ts` (SAVED-), `mfa-stepup.spec.ts` (MF-), `smoke-auth-i18n.spec.ts`, `i18n-sign-in-language.spec.ts` (D239-E). Weight: `/auth` 229 and `/auth_/reset` 218 are PUBLIC and in the NEAR band — measured first; the Field primitive's own bytes must be under what the deleted `fieldClass` + bubbles logic frees, else the ceilings move by DEC-296's form with the cause on the line.

**Wave 3 — the 13 admin consoles' forms and the refusal-focus sweep.** The thirteen, by console (every file with a write control): (1) categories — `category-dialogs.tsx`, `category-form-fields.tsx`; (2) attributes — `attribute-dialogs.tsx`, `attribute-v2-fields.tsx`, `attribute-option-row(s).tsx`, `category-attributes-dialog.tsx`, `attribute-link-cells.tsx`, `attribute-allowed-values.tsx`; (3) countries — `country-dialogs.tsx`, `country-editor.tsx`, `country-verb-dialogs.tsx`; (4) locations — `location-dialogs.tsx`, `location-form-fields.tsx`, `location-editor.tsx`, `location-verb-dialogs.tsx`; (5) listings — `listing-settings.tsx`, `reason-note.tsx`, `undo-dialog.tsx` (the staff Edit is the wizard, wave 1); (6) roles — `roles-list.tsx`, `role-detail.tsx`; (7) users — `user-detail.tsx` (the local `Field` renamed `ReadRow`); (8) translations — `languages-page.tsx`, `strings-page.tsx`, `data-scope.tsx`, `delete-language-dialog.tsx`, `transfer-bar.tsx`, `translator-card.tsx`; (9) legal — `legal-editor-form.tsx`, `legal-facts-card.tsx`, `legal-publish-dialog.tsx`, `legal-version-view.tsx`, `legal-page.tsx`; (10) AI — `ai-feature-form.tsx`; (11) screening — `name-checks.tsx`; (12) impersonation — `impersonation-starter.tsx`; (13) the shared import dialog — `import-dialog.tsx` (file input by DEC). Monetisation is wave 4. `FormField` is deleted when its 93 controls are on Field (form-section.tsx keeps `FormSection`); the 5 `*ErrorLine` + 5 `use*Error` + 16 admin `*ErrorKey` mappers fold into `readRefusal` with a form-slot `<RefusalLine>` from the kit; every dialog's submit goes through `gate.try()`. The refusal-focus sweep: a refused dialog scrolls to and focuses its field (`focusFirstRefusal` over the registry). Unit: each `*-service.test.ts` mapper case moved to `refusal.test.ts`; `country-dialogs.test.tsx`, `locations-service.test.ts` updated. E2E by console: `admin-categories-console/lifecycle/home`, `admin-attributes-editor/links/library/safety/import`, `admin-countries`, `admin-locations`, `admin-listings`, `admin-roles`, `admin-users`, `admin-translations-console/data/governance`, `legal-admin`, `admin-ai-calls`, `admin-screening`, `name-check-queue`, `import-security` (IG — `withinPreviewBudget`), `one-line-slots-admin`, `dialogs.spec.ts` (DLG-E), `shell-table-law`. Three spec files a turn at most (INC-1049's rule) — wave 3 is 3–4 turns. Weight: each admin ceiling measured; the admin chunk may rise by the measured number with its cause (FormField's bytes leave, the kit's arrive).

**Wave 4 — the monetisation dialogs, the import dialogs, what the census adds.** `market-dialog.tsx`, `override-dialog.tsx`, `price-dialog.tsx`, `price-end-dialog.tsx`, `product-editor.tsx`, `caps-editor.tsx`, `monetisation-dialogs.tsx` (its local `NumberField`/`Toggle`/`PlacementSelect`/`BadgeSelect` become the kit's kinds), `monetisation-forms.ts`/`price-forms.ts` (parsers fold), `use-monetisation-error.ts` (folds); the forward-scan consumers as they land — P-2 (b)'s Promote sheet and Set tier's days field, P-3's bundle and grant dialogs, Report this ad (`report-ad.tsx`, 2 controls), the Your data page, the privacy-request inbox; `data-table.tsx`'s page-size select and row ticks (a DEC: table chrome, not a form — allowlisted with reason); the filters (`*-page.tsx` search inputs — a DEC: a filter is a query, not an answer to a door; allowlisted, or a `kind="search"` without gate). The allowlist empties. E2E: `admin-monetisation.spec.ts` (MON-), `sage-tiers.spec.ts`, `ad-page.spec.ts` for Report, plus whatever each consumer's own spec is.

Seam not taken: the a11y sweep widened to every route (DEC-084 — today A11Y-1/2 cover home, /auth and wizard steps 1, 3, 5) is Foundations 3's; the kit gives it the aria pair to find.

## 4. THE REFUSAL READER'S DIALECTS

| dialect | who speaks it | parser today | folds to |
| --- | --- | --- | --- |
| D1 posting codes — `Refusal{field, reason: "code[:detail]", detail?, retry?}` at 200 `ok:false` (answer.ts :97 `verdict`) | the posting routes, the photo routes, `src/server/door.ts` (+ `doorRefusal` wording an exception as `doorError`) | `refusalsOf` ×3; `draftRefusalKey`/`photoRefusalKey`/`backgroundRefusalKey` | branch 3 — one map keyed by family |
| D2 route envelope — `{ error: code, …extra }` at 4xx/422/502/503 (`clientError`, `refused`, `stepUpRequired` 428 `P0009`) | every `defineRoute` | `RouteAnswer.error`/`detail`; 19 `callRoute`/`uploadRoute` callers read it by hand | branch 2 |
| D3 admin key dialect — RAISE `admin.<family>.error.<name>[:tail]` | the console doors (categories, attributes, locations, countries, import gate) | `splitRefusal` + `doorKeyText` + `fillRefusal` (refusal-tail.ts) | branch 4 (the module becomes `src/lib/refusal.ts`) |
| D4 bare codes — `rateLimited`, `has_children`, `fileTooLarge`… | rate_gate, several doors, the import gate | inside the family mappers | branch 5 — one shared map |
| D5 English sentences — `permission denied`, `role has members`, `listing not found`, Postgres' `duplicate key` | roles, listings (move/tier/edit/undo/settings), translations, legal, users, photo doors | 7 regex/equality mappers | branch 6, RETIRING as F1-1's `door_refuse` codes land door by door; a sentence the map does not know → the generic key |
| D6 auth provider — Supabase auth error `code` + `weak_password` reasons | the auth client | `toErrorKey` (auth-error-key.ts :35) | branch 7 (its tests move) |
| D0 step-up abort | the step-up gate | `stepUpAbortKey` (mfa-service :139) | branch 1 |
| F1-1 `door_refuse(code[, detail])` (DEC-333) | every browser-callable door once F1 lands | — (not in this tree) | branch 4/5 take `door-codes.ts` as the map's source; `detail` = the field when registered |

One reader, one map (rows keyed `family.code`), one generic key (`common.error`; a family may name its own generic). The reader never renders a sentence it did not translate.

## 5. CONFLICTS AND WRONG PREMISES

1. **Rule 12 §Forms vs the tree.** Rule 12 says the one `Field` "carries `aria-invalid` and `aria-describedby` when refused" — field.tsx :160–:208 sets neither. The rule describes the kit to be built; until wave 1 lands it reads as already true. Report, not mine to edit (`.cursor/**` closed, rule 50).
2. **`reportMissing` is in `wizard.tsx` :263**, not `field.tsx`; the brief's ":160, :281" are `Field` and `focusFirstRefusal`. Register row 14 says so correctly.
3. **`doorRefusal` is a server worder, not a refusal reader** (`src/features/posting/door-error.ts` :24, called from `src/server/door.ts` :46 and `routes/api/listings/identity.ts` :182). The client readers are `splitRefusal`/`doorKeyText` (`src/lib/refusal-tail.ts`), the three posting maps, the 18 mappers and `stepUpAbortKey`. Side finding (row 13's): a `src/server/` module imports from `src/features/posting/` — K2, out of scope.
4. **The `*ErrorKey` count is 18 definitions**, 4 of them under `src/features/admin/**`, 12 under `src/features/admin-*/`, 1 auth, 1 my-listings — not "≥ 12 under src/features/admin/**".
5. **`numberOrZero`: 1 definition + 1 call**, the 2 files as the brief says (country-dialogs :172, country-editor :65) — correct.
6. **The census figure**: 78 files / 249 controls / 233 outside the one Field (224 in 72 files after the primitives and `/dev`), not 69 / 210 — the tree grew since 25 Oct.
7. **"Every form carries `noValidate`"** has 7 `<form>` consumers in 4 files (two are the header's search forms); 0 carry it. The admin dialogs have no `<form>`; the law for them is the gate, which CF-FORM-1 judges by registration.
8. **"13 admin forms"**: by console with a write control the count is 13 (§3 wave 3, monetisation counted in wave 4 as the brief orders); by file it is 36 admin files with controls. The register's phrase holds only by console.
9. **DEC-333 and `door-codes.ts` are not in this tree** (grep over docs/ and src/: only my brief names them; register row 20 still reads NONE YET for `door_refuse`). The reader is designed for them as §4 says; the fold waits for F1-1's merge.
10. **Two Refusal types** — `src/server/answer.ts` :97 and `src/features/posting/types.ts` :138 (and `src/server/imports/gate.ts` :50) — the client should import the server's shape through `src/lib/schemas/` or a shared type, not keep its own (K1).
11. **A dead third shape**: `src/components/ui/form.tsx` (shadcn `Form*`) has zero importers — deleted in wave 1 with its line in `intentional-deletions.txt`.
12. **Knowledge/AGENTS.md**: no conflict found — F4 (no phantom success, translated messages) and G54 (c) say what this kit builds; AGENTS.md's "CutText / useLabelRoom", "action labels two or three words" bind the Field's label slot; DEC-258's string layers mean the kit's own keys (`form.required`, `form.optional`, `form.badValue`, the generic) go in `en-base`/`am-base` — the posting keys `post.field.required`, `post.optional`, `post.refusal.required` move or are aliased (a renamed string is a NEW key; the AM text comes from the supervisor, never mine).
13. **Lenses**: security — the five raw-reason lines (country-dialogs :59, location-dialogs :69, monetisation-dialogs :35, ai-feature-form :131, languages-page :243) and the two raw fallbacks (category-dialogs :135, attribute-dialogs :98) render a door's own sentence to staff; they become the generic key in wave 3 (INC-447's class, G54 a/c). Performance — `/auth` and `/auth_/reset` are public and near their ceilings (§3 wave 2). Failure modes — `parseNumber`'s `invalid` is a Field refusal, never 0 (the `numberOrZero` and `typedDefault` sentinels go). Consistency — two control heights today (field.tsx min-h-11 vs input.tsx h-9); one class with a density parameter. Future growth — a new door dialect is one branch; a new control kind is one file under `src/components/forms/`.
14. **Not mine**: `.cursor/rules/12-ui.mdc`'s premise (item 1), `src/server/door.ts`'s import (item 3), the register rows (written in the build phase, rule 10 Documentation).
