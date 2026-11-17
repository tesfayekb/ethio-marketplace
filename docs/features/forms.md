# Forms — one Field, one gate, one refusal reader, one parser (DEC-339)

Foundations 2. Every typed answer a person gives is drawn by ONE Field, judged for
emptiness by ONE gate, refused in words read by ONE reader, and turned from text into a
value by ONE parser. Wave 1 (the forms-kit turn) built the kit and moved the posting
wizard onto it; waves 2 – 4 move the rest (sign-in and settings; the admin consoles and
their per-family mappers; the monetisation and import dialogs), each a line of the
guard's allowlist until it lands.

## The pieces

- **The Field** — `src/components/forms/field.tsx`. It owns the label, the
  required mark or "Optional", the hint, the refusal line and the aria pair: the
  control gets `id`, `aria-required`, `aria-invalid` and `aria-describedby`
  (`<id>-hint <id>-refusal`) through the props it spreads (`{...control}`), and
  the refusal line is `<id>-refusal`, `role="alert"`. Three layouts: `stack`
  (label above), `inline` (a switch beside its label) and `choice` (a checkbox
  or radio with its words; the refusal sits above the box). `field` names the
  door's field when it differs from the control's `id`; `marked` (default: the
  same as `required`) lets a required answer drop its mark once given without
  ever saying "Optional". A Field given `gate` and `blank` reports itself missing
  while it is blank and withdraws when given or unmounted. Tests: FKF-1 → FKF-8.
- **The look** — `control-class.ts`: `controlClass(refused, soft, density)`, the
  one control class at two densities (`form`, and `dialog` — `DIALOG_FIELD`),
  with the three border states (`stateBorder`). `required-mark.tsx` is the one
  asterisk with screen-reader "Required".
- **The gate** — `use-form-gate.ts`: `useFormGate(scope, reveal)` returns
  `missing` (what the reports say is still empty), `tried`, `marks` (the
  `required` refusals shown once a submit was tried), `report(source, fields)`,
  `register` and `try()`. `try()` answers whether the form may be sent; when it
  may not, it marks and calls `reveal` with the missing fields. A change of
  `scope` (the wizard's step) clears `tried`. The gate is "empty", never "valid":
  the door still judges. Tests: FKG-1 → FKG-4.
- **The registry** — `field-registry.ts`: a form's `FieldRegistry` maps a door
  field to its label key and place (posting's step); read through
  `registeredField` (`ownValue`). Each form keeps its own registry —
  posting's is `POSTING_FIELDS` in `src/features/posting/field-refusals.ts`.
- **Reveal** — `reveal-control.ts`: `revealControl` scrolls a control (or its
  Field's box, `[data-form-field]`) into view and focuses it; `revealFirst`
  does it for the first of a list.
- **The reader** — `src/lib/refusal.ts`: the one `Refusal` shape
  (`{ field, reason, detail?, retry? }`, also the server's), `refusalsOf` (the
  route envelopes), `readRefusal(input, family)` → a key and the branch that
  read it, and `refusalText(read, t, values)`, which fills the tail
  (`fillRefusal`: `{count}`, `{detail}`, `{attr}`, `{target}`) and then the
  caller's values (`fill`). A family (`RefusalFamily`: `words`, `generic`) is
  the form's code map; a code no family knows reads as `common.error`, never
  the provider's or Postgres' text. `src/lib/refusal-tail.ts` keeps only the
  console doors' dialect (its admin-layer words and `doorKeyText`, until wave 3;
  since F1-4a no screen calls `doorKeyText`: the categories and attributes
  consoles read a door key through `readRefusal`'s key branch)
  and re-exports the folded shapes. The door's worder (`src/lib/door-error.ts`) sits
  beside it, so the server no longer imports a posting module for its wording
  (INC-1050). Tests: RFR-1 → RFR-10.
- **The parser** — `src/lib/parse-input.ts`: `parseNumber(raw, rules)` and
  `parseText(raw, rules)` return a typed answer (`number` / `text`, `blank` or
  `invalid`), never a sentinel (`0`, `NaN`); `numberOf` reads it as
  `number | null`. An invalid number refuses with `post.refusal.badType`
  (`PARSE_INVALID_KEY`; no new string). Tests: PIP-1 → PIP-6.

## The guard

`scripts/conformance/forms.test.ts` (census in `forms.ts`, through `kit.ts`):

- CF-FORM-1 — a control tag outside a `<Field>` in the same file. Exempt by
  kind (DEC-338): file pickers, search boxes (`type="search"` or
  `role="searchbox"`), list filters and table chrome; and the control
  primitives themselves (`CONTROL_PRIMITIVES`, e.g. `phone-number-field.tsx`,
  whose own box is drawn inside a Field by its caller).
- CF-FORM-2 — a `<form>` without `noValidate`.
- CF-FORM-3 — a `*ErrorKey` / `*ErrorLine` / `use*Error` mapper defined outside
  the reader.
- CF-FORM-4 — a sentinel parse of a control's value (`Number(`, `parseInt(`,
  `numberOrZero`).
- CF-FORM-5 — a local `fieldClass` / `controlClass` definition.

Each law is proven on a planted bypass, removed inside its own test (PPF-1).
`forms-allowlist.txt` (`<law> <file> (<count>) | <wave> | <until>`) only falls: a
count that rises is a new finding, a count that falls leaves its line stale.

## Posting (wave 1)

`src/features/posting/field.tsx` re-exports the Field with posting's ids
(`post-field`, `post-field-refusal`, `post-required-mark`) and the draft door's
family, so its importers and the e2e ids do not move. The wizard's mirror of the
door's `required` rule is the gate, keyed by the step; step 1 reports a missing
leaf as `category_id` (its Next stays `disabled`, PW-1). Steps where, who,
category, photos, pricing and review draw their answers in the Field, and so does
the agreement tick (`agree-to-document.tsx`, a `choice` Field with its own family:
`/auth` and `/legal/accept` no longer carry posting's field code, so the 24 `post.*`
labels it named moved from the base strings layer to the member layer, byte for
byte). The precision radios of the map pin remain an allowlist line. The dead
`src/components/ui/form.tsx` was deleted.

## Markets console (wave 3)

`src/features/admin-countries/country-dialogs.tsx` draws the editor's four
answers in the one Field at the dialog density, ids and test ids unchanged: the
name is required and reports its blank to the editor's gate; the unit system is
required but always holds a value, so it carries no mark (`marked={false}`); the
currency is optional with its hint; the order is required and read by
`parseNumber(…, { integer: true })`, a blank or unreadable order refused under
its Field (`PARSE_INVALID_KEY`) before the step-up or the door. The console's
family `COUNTRY_REFUSALS` carries the kit's `required` and `badType` words; the
door's `nameRequired` keeps its line. The sentinel `numberOrZero` was deleted.
The next consoles of wave 3 follow this file.

## Places console (wave 3)

`src/features/admin-locations/location-form-fields.tsx` draws the create and
edit dialogs' seven answers in the one Field at the dialog density, ids and test
ids unchanged: the name is required and reports its blank to the dialog's gate;
the centre latitude and longitude are required at city and sub-city level (their
blanks reported to the gate) and optional elsewhere; the slug, ISO code and
aliases are optional with their hints; the order (country rows only) is
required. `readLocationNumbers` reads the typed numbers through the one parser:
latitude `{ min: -90, max: 90 }`, longitude `{ min: -180, max: 180 }`, order
`{ integer: true }`; an unreadable answer is refused under its Field
(`PARSE_INVALID_KEY`) before the step-up or the door, never sent as a guess. The
create and move dialogs' parent pickers sit in the Field with no mark
(`marked={false}`); the delete confirmation is required through the gate, its
mismatch still the dialog's own line. `LOCATION_REFUSALS` carries the kit's
`required` and `badType` words; the doors' `nameRequired` and
`missingCoordinates` keep their lines. The sentinel `numberOrNull` was deleted.

## Categories console (wave 3)

`src/features/admin-categories/category-form-fields.tsx` draws the create and
edit dialogs' answers in the one Field at the dialog density, ids and test ids
unchanged: the name is required and reports its blank to the editor's gate; the
icon, parent, position (its caption the Field's hint), expiry, visibility window
and countries are optional; the two ticks sit in the Field's `choice` layout.
`readCategoryNumbers` (category-form-values.ts) reads the expiry through the one
parser, `{ integer: true, min: 1 }` (the table's `expiry_days IS NULL OR
expiry_days > 0`); blank is no expiry (null); an unreadable answer is refused
under its Field (`PARSE_INVALID_KEY`) before the step-up or the door (INC-1180).
The edit dialog's order box is read-only (Move up/down owns the order) and is
drawn only where the loaded row is, showing its stored order. In
category-dialogs.tsx the window, exclusion ticks and each path's move picker sit
in the Field; the retire target (when listings must move), the pointer parent,
the add-path parent and the delete confirmation are required through each
dialog's gate (the pickers with no mark); a wrong delete confirmation stays the
dialog's own `admin.categories.delete.mismatch` line, and door refusals stay in
`category-dialog-error`. `CATEGORY_REFUSALS` carries the kit's `required` and
`badType` words; the door's `reassignRequired` keeps its line.

## Attributes console (wave 3)

Every control of `src/features/admin-attributes/` sits in the one Field at the
dialog density, ids and test ids unchanged: the definition editor, the delete,
merge, assign and remove dialogs, the option rows (value, labels, the offered
tick, aliases, bounds, the allowed-values ticks and both add pickers), the v2
number and text groups, the per-category link manager and its three link cells.
A control with no visible label of its own (a search box, an alias, a bound, an
add picker) carries the words it already showed as a screen-reader label in the
`inline` layout; ticks use the `choice` layout. The editor's key and name are
required through its gate (`post.refusal.required` under each Field; the old
dialog-level `keyRequired` / `nameRequired` lines are gone). `readAttributeNumbers`
(attribute-form-values.ts) reads the decimals and the longest length through the
one parser, `{ integer: true, min: 0 }`: blank is null to the door, an
unreadable answer is refused under its Field (`PARSE_INVALID_KEY`) before the
step-up or the door. `readLinkDefault` reads a number attribute's default through
`parseNumber`; an unreadable default is refused under the default's Field and
nothing is sent. The blank-option-rows count (`option-blank-message`) stays its
own row-level line. Door refusals stay in `attribute-dialog-error`.
`ATTRIBUTE_REFUSALS` carries the kit's `required` and `badType` words.

## AI, listings, name-checks and translations consoles (wave 3)

The thirteen L6 control files draw through the one Field, retaining their test
ids. AI's budget keeps the existing dollars-to-cents parser (including its dollar
sign and grouped commas); its unreadable-budget refusal is attached to the budget
Field through the refusal reader. The required unit price reports its blank to
the shared gate. Nonblank price-rule and door refusals keep `ai-editor-error`.

Listings' renewal days read `parseNumber` with `{ integer: true, min: 1, max: 365 }`;
tier days use `{ integer: true, min: 1, max: TIER_DAYS_MAX }`, with blank still
open-ended null and invalid undefined. Their existing cross-field problem lines
and words stay in their dialogs; affected controls name those lines and carry
`aria-invalid`. The reason/note block remains one shared piece across move, tier
and photo removal. Optional Undo and name-check notes remain optional.

Translations' code and both names report blanks to the shared gate; a nonblank
bad code and door failures retain `translations-add-error`. Typed deletion stays
disarmed until its confirmation matches and also checks the gate before sending.
The translations family's `required` word is now the kit's existing key, including
door required refusals. Search controls carry their existing words as hidden
labels; switches and per-country/per-language ticks use inline/choice Fields.
Translation values and context remain optional so existing clear/save behavior
is unchanged. No new catalog key or Amharic text is introduced. Tests: KFC2-1–8
and the four consoles' existing tests; all thirteen CF-FORM-1 allowances are removed.

## Legal console and dev specimens (wave 3)

The five legal control files draw through Field with their original test ids and
the door field names. The draft label reports its blank to the shared gate;
draft bodies and changelog remain optional until publication. Translation
language and body, and the material publication date, report blanks through
the gate while their existing disabled-submit behavior remains unchanged.
Legal review uses the gate but retains the blank-note and door refusal in
`legal-review-error`, linked to the note control: LGA-16 reads that line.

Facts retain `validateLegalFacts` as their sole check and keep each fact error
under its box with its original range/retention words and test id. The control
names that error via `aria-describedby`. Bounded facts use
`parseNumber(value, { integer: true, min, max })`; the account/claims comparison
and save payload read parsed integer numbers. No new refusal mapper or catalog
key is introduced. `LEGAL_REFUSALS` adds only the existing required kit word.

The primitives and style specimens draw answer controls through Field, including
choice radios; the primitives table search and style list filters stay bare
(DEC-338). Seven CF-FORM-1 allowances are removed. Tests: KFL-1 onward and the
legal unit tests, forms census, and admin-tables guard.

## Monetisation console (wave 3)

Every control of `src/features/admin-monetisation/`'s five dialogs (market,
override, price, product editor and their shared pieces in
`monetisation-dialogs.tsx`) sits in the one Field, ids and test ids unchanged,
the door's answer name as each Field's `field`. Required single answers report
their blanks to each dialog's gate (`useFormGate`): the price's product, amount
and credit cost; the product's key, English name, days and (a level's) photos;
the market's free ads. Pickers that always hold a value carry no mark
(`marked={false}`); the ticks sit in the `choice` layout. The judges
(`monetisation-forms.ts`, `price-forms.ts`) read every whole number through
`parseNumber(…, { integer: true, min, max })` with each check's own bounds and
words; a price's amount stays a money answer read by `AMOUNT_PATTERN`. A single
field's own bad answer is drawn under its Field (`monetisation-refusals.ts`,
family `MONETISATION_REFUSALS`: the kit's `required` and each judge key read as
itself); a rule across fields (`emptyOverride`, `launchRequired`) and every door
refusal stay in the dialog's `<prefix>-error` line. Tests: KMO-1…8.
