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
  console doors' dialect (its admin-layer words and `doorKeyText`, until wave 3)
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
category, photos, pricing and review draw their answers in the Field; the
precision radios of the map pin and the agreement tick (`agree-to-document.tsx`,
wave 2 with `/auth`) remain allowlist lines. The dead `src/components/ui/form.tsx`
was deleted.
