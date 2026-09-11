# Attribute System — Deep Dive and Forward Design

Supervisor review · 2026-09-11 · for operator ratification (G11: a supervisor draft; lands in /docs only via prompt after ratification).
Read against: REQ-017/018/020/022/025, DEC-043, DEC-045, DEC-033, roadmap §Next (U6 A–E, U7, U8), the C1 target taxonomy (14 roots), the import registry and gate, the definitions/links schema, the Vehicles and Real Estate curation passes. Every claim about the code below was read in the clone at dev `7cf4208`; numbers not computed from data are stamped ESTIMATE.

## 0. The question and the answer in one paragraph

Can the attribute system, as built, carry every remaining vertical to posting, search and — later — bookings, without failure and without a rewrite? Yes for curation: the six types, inline Amharic on options, one-parent dependent options, per-link cards, and inheritance are enough to describe every root in the taxonomy, using two conventions the last two passes already established (bounded numeric sets become selects; a boolean that needs a third state becomes a select). No for posting and search as they stand: numbers carry no unit or bounds, options cannot say when they are valid, text has no validation, help text has no Amharic, and nothing exists yet to express a listing that is booked rather than sold. All of those are **additive** changes to definitions and options — data, not code paths — and every one of them is cheaper before the listings table exists (U6-A) than after. Bookings are not an attribute problem at all; they are a category **capability** plus a module of their own, sequenced after messaging.

## 1. What exists today (grounded)

| Surface | State at `7cf4208` |
|---|---|
| Definition types | `text`, `number`, `boolean`, `single_select`, `multi_select`, `date` accepted by the importer and the console; the DB CHECK also allows `range`, which nothing implements (a dead type). |
| Definition columns | `attr_key`, `name_en`, `name_am`, `attr_type`, `options` (JSON), `help_text_en` (exists, never exported, no Amharic twin), `depends_on`, `is_per_variant` (read-only in export; anticipates variants). No unit, no min/max, no decimals, no pattern, no group. |
| Option record | `{ value, label_en, label_am, parent }` — pipe-separated JSON in the file; `parent` validated against the parent list (DEC-045). No `active`, no validity window, no bounds, no sort field (list order is display order). |
| Links | per (category, attribute): `is_required`, `is_filterable`, `display_order`, `card_rank` (≤3 ranked; ≥2 required per listing category — DEC-043); inheritance by primary lineage only (DEC-044). |
| Dependents | one parent per definition; the parent must be `single_select`; cascading pickers and filters; delete/unlink/merge refused while dependents exist. |
| Caps | 400 options per definition, value ≤64 chars, label ≤120. Vehicles fitted; a phone `model` list across every brand may not. |
| Category behaviour flags | `allow_listings`, `is_catchall`, `price_enabled`, `expiry_days`, visibility window, country exclusions — the existing home for "how listings in this category behave". |
| Listing side | no listings table yet (U6-A). Attribute values, storage, validation and filters are unbuilt. This is the moment to fix the definition model. |
| Open items posting depends on | C3-UX-3 (option-value translation coverage), C3-UX-4 (capturing the text behind `other`). |

## 2. What the remaining verticals need (survey by root)

Grounded in the C1 target taxonomy; the attribute semantics are the ones peers use and the two finished passes proved.

- **Vehicles** (done, but the bounds problem lives here): make → model cascade; `year` must respect the make's first production year, a discontinued model's last year, and never exceed next year; mileage with unit; condition; body style, fuel, transmission as selects. Vehicle Hire (bookable behaviour).
- **Electronics** (next): brand → model; storage/RAM/screen as bounded selects; open numerics (weight, capacity) with units; condition tri-state; warranty; IMEI/serial as validated text; swap/exchange flag.
- **Fashion**: size systems (size depends on a size-system select — DEC-045 covers it); gender/age group; material; brand; condition.
- **Home & Garden / Construction Material / Commercial Equipment**: dimensions and quantities with units (cm, m², kg, quintal, litres, bags); power ratings; capacity; brand; condition; "sold per" unit (piece, m², quintal) — a rate-period pattern like `rent_period`.
- **Agriculture & Farming**: quantity with unit (quintal, kg, litre), land size in local units (timad, hectare, m²), breed/variety selects, age of livestock, harvest date (date type).
- **Pets & Animals**: breed cascade (species → breed), age, sex, vaccination (boolean), quantity.
- **Babies & Kids**: age ranges as selects (done in Vehicles-era passes), sizes, condition.
- **Beauty & Personal Care**: brand, volume/size with unit, expiry date (date), skin/hair type selects.
- **Sports & Leisure**: brand, size, condition, capacity; Attractions/recreation (bookable).
- **Services**: service type selects, experience (number, years), availability (days/hours → bookable behaviour), price basis (per hour/job) — a rate-period pattern; Events & Catering: event date and time (datetime), capacity, venue is a **location** (DEC-033 territory, not an attribute).
- **Travel & Accommodation**: room type, capacity, amenities (multi), check-in/out times, rate per night — and the whole **bookable** behaviour (availability, min/max stay, reservation requests). Restaurants/cafés: cuisine, capacity, opening hours.
- **Real Estate** (done): the `offer_type` → `rent_period`/`payment_plan` cascades proved DEC-045 beyond make/model; Short-term Rentals are bookable.

Two conclusions from the survey. Every descriptive facet fits the six types plus units, bounds and validity windows. Every "when can this be had" behaviour (hotels, short lets, hire, appointments, events) is the same feature under different names, and it is not a facet — it is a capability of the category and a module of its own.

## 3. Gap analysis and proposals

Each proposal states the model (additive), the import/export shape, validation authority (F3: the server), the posting and filter behaviour, i18n, tests, performance, security, and when it lands. "Lightweight" is a design constraint here: constraints are **data on definitions and options**, evaluated by **one** server function; no rule engine, no per-vertical code, no free-form regex.

### 3.1 Number semantics — unit, bounds, decimals, format, relative bounds
- **Problem.** Units live in labels and keys (`size_sqm`, "Screen size (inches)"); there are no min/max/decimals; a year has no ceiling; the only escape today is "make it a select".
- **Model.** New nullable columns on definitions, exported and importable as five cells appended to the definitions file: `unit` (text ≤16, e.g. `GB`, `m²`, `km`), `min` (numeric), `max` (numeric), `decimals` (0–3, default 0), `format` (`plain` | `year`). `min`/`max` accept either a number or one relative token from an allowlist: `year`, `year+1`, `year+2`, `year-1`, … (resolved server-side against the current UTC year at validation time). No other expressions.
- **Validation.** Import refuses `min > max`, decimals outside 0–3, unknown tokens, unit too long; the listing validator (3.9) enforces min/max/decimals per value.
- **Posting form.** Unit rendered as a suffix; `format: year` renders a year picker bounded by min/max; decimals set the input step. Messages name the values ("Year must be between 1990 and 2027").
- **Filters (U7).** Numeric range facets take their bounds and unit from the definition; no parsing of labels.
- **i18n.** Units are symbols, not translated; the unit column is never a user-visible sentence.
- **Rule for curation now (R2).** Fixed unit per definition (create `weight_kg`, not a unit picker); bounded sets stay selects; open numerics use `number` with the unit in the label until the column exists, then backfilled from a mapping in one import.
- **When.** Posting prerequisite P1 (before U6-C).

### 3.2 Option-conditioned bounds — the Tesla-1999 problem
- **Problem.** "Tesla cannot be 1999", "a model discontinued in 1999 cannot be 2018", "year cannot be more than one year in the future". The first two are properties of an **option** (a make, a model) that constrain a **sibling attribute** (`year`); the third is a property of the attribute itself (3.1's relative token).
- **Model.** An optional `bounds` object on an option record: `{"value":"tesla","label_en":"Tesla","label_am":"…","bounds":{"year":{"min":2008}}}`; on a model option `{"bounds":{"year":{"max":1999}}}`. Keys must be attribute keys; values are `{min?, max?}` with numbers or the relative tokens of 3.1. Nothing else is expressible — no arbitrary predicates.
- **Import validation.** A `bounds` key must name a definition **linked in every category where the owning definition is linked** (effective links), of type `number`; `min ≤ max`; tokens from the allowlist. Refusals name the option, the key and the reason (F5).
- **Evaluation.** The listing validator (3.9) folds every selected option's `bounds` into the sibling's effective range: `effective_min = max(definition.min, all option mins)`, `effective_max = min(...)`. Dependents chain naturally: make bounds + model bounds both apply. The client mirrors the same fold for the year picker so the range narrows the moment a make or model is chosen; the server is the authority.
- **Why not a rules table.** A generic rule engine would be more expressive and would be the first thing to fail silently, be mis-imported, or need a UI nobody has time to build. Option-level bounds cover every validity-window example the operator gave with one JSON key that rides the existing option format, the existing importer, the existing Merge/undo machinery and the existing hostile-file spec.
- **When.** P1, with 3.1.

### 3.3 Option lifecycle — `active`, sort stability, aliases
- **Problem.** Options can only be deleted; once listings reference an option, deletion would orphan values. Discontinued models must stop being offered to new posts but remain valid on existing listings and in filters.
- **Model.** `active` (boolean, default true) on the option record; inactive options are hidden from the posting picker, kept in filters when at least one live listing carries them (U7 rule), and still validate for existing values. List order remains display order (no `sort` field — one less thing to import wrong). `aliases` (array of strings, ≤5, ≤32 chars) for search only — "Corolla" / "ኮሮላ" / "corola" — feeding REQ-025's fuzzy index, never displayed.
- **Guard.** Once a listings table exists, option **delete** is refused while a listing references the value (the same "refused while linked" pattern as today); `active=false` is the path.
- **When.** `active` and `aliases` in P1 (cheap, import-shaped); the delete guard in U6-A.

### 3.4 Conditional requiredness and visibility
- DEC-043 (cards required) plus DEC-045 (a dependent is visible only when its parent has a value) already give "required if visible" for free: a dependent card is required once its parent is chosen. No new mechanism. Rule to write: a dependent may be a card; it counts toward the ≥2 only in categories where its parent is also linked (the co-presence rule the Real Estate pass applied by hand becomes an import check).
- **Not built:** cross-attribute predicates ("if condition = new then mileage ≤ 1000"). Deferred with a note: if a second vertical needs one, revisit as an option-bounds extension, never as a rule language.

### 3.5 Text validation — presets, not regex
- **Problem.** IMEI, VIN, plate numbers, serials, model codes need shape validation; free regex is a footgun (ReDoS, unreadable refusals, untranslatable messages).
- **Model.** `preset` (nullable) on definitions from an allowlist implemented in code: `digits:15` (IMEI), `vin`, `plate-et` (Ethiopian plate shapes), `alnum:3-32`, `free:120` (default when null: free text ≤120). `max_length` (≤1000) for descriptions-like text. Presets carry translated refusal messages by key; the allowlist is the only thing the importer accepts.
- **Security.** Text attributes are user content: rendered as data (F2), screened by REQ-021 with every other text field, and a preset can never capture contact data (phone/email/URL presets are deliberately absent — contact lives on the seller and the listing's contact preference).
- **When.** P1.

### 3.6 Help text in both languages
- `help_text_en` exists on the table but is dead: not exported, no Amharic. Add `help_text_am`; export/import both as two cells; render as the field hint on the posting form. D1/D2 make this non-optional: a hint is user-visible text. The curation threads can then supply hints ("IMEI: 15 digits, dial *#06#").
- **When.** P1.

### 3.7 The `range` type
- Allowed by the DB CHECK, unknown to importer and console. Nothing in the v1 taxonomy needs a min–max pair as one attribute (Jobs — salary range — is deferred to v2 by REQ-017). Remove it from the CHECK with the P1 migration so no half-present type survives (F4's spirit: nothing half-working). If Jobs returns, implement it then as `{min, max}` with 3.1's unit and decimals.

### 3.8 Caps and delivery
- 400 options per definition is a gate constant with a hostile-file test; raise it only on evidence — the Electronics note is asked to report the size it needs. Independently of the cap, the posting form must not download every option list of every attribute of a category up front: **per-definition lazy delivery**, version-cached (REQ-029, G1's version-cache pattern), with dependents fetched per parent value. ESTIMATE: a 400-option list with Amharic labels is ≈40 KB uncompressed, ≈8 KB gzipped — acceptable per fetch, unacceptable ×20 attributes on first paint.

### 3.9 Listing-side storage and the one validator (U6-A)
- **Storage.** `listings.attrs jsonb` — `{ key: value }` with typed values (`number`, `string`, `boolean`, `string[]` for multi, ISO date, and for `other`: `{ "value": "other", "text": "…" }` — this is C3-UX-4 solved in the storage shape). A GIN index on `attrs`; generated columns for the hot facets per vertical (year, make, price is already a column) added when U7's measurements say so, not before.
- **Validator.** One `SECURITY DEFINER` function `validate_listing_attributes(category_id, attrs)` returning refusals (key, reason, values) — the only authority (F3). It resolves effective links (inheritance), cards (DEC-043), types, options (+`active`), dependents (parent present and matching), 3.1 bounds with 3.2 folds and relative tokens, presets, multi-select membership, and the `other` shape. The posting form mirrors the same checks for UX; nothing on the client is trusted. Writer order per F5; refusals name values.
- **Type-change guard.** Today a definition's type can be changed by file because nothing references it (we used that twice). Once any listing carries a value for the key, the update door refuses a type change and option deletion; the import reports it as a refusal naming the count.
- **Tests.** DO-block proofs per rule in the migration; a hostile-payload E2E family for the validator (wrong type, inactive option, dependent without parent, out-of-bounds year vs make, IMEI of 14 digits, multi with a foreign value, `other` without text); J-law fixtures.

### 3.10 Groups (posting-form sections)
- Electronics and Vehicles forms will carry 10–15 attributes; a flat list ordered by `display_order` is usable but not friendly. Model: `group_key` (nullable) on **links** (per category), with translated group labels as UI keys (`attr.group.specs`, `attr.group.condition`, `attr.group.booking`). Cheap, optional, additive; the posting form renders groups in first-appearance order. **When:** U6-C, only if the walk of the first posting form asks for it — not before.

### 3.11 Translation coverage of options (C3-UX-3)
- Inline `label_am` per option stays (simple, importable, byte-checked). The gap is visibility: nothing reports which options lack Amharic. Add a coverage read (`attributes_option_coverage`: per definition, options total / with `label_am`) and a column in the library; refuse publishing a category to a language whose option coverage is incomplete? No — over-gating; report only, and let the curation bar ("label_am for every definition in scope") do the work. **When:** with P1's export changes (one RPC, one column).

### 3.12 Bookables and reservations — a capability and a module, not a type
- **What "bookable" means here.** Hotels & guesthouses, resorts, short-term rentals, vehicle hire, attractions, appointments (services), events with capacity. Common shape: availability over time, a unit of sale (night/day/hour/seat), capacity, min/max quantity or stay, lead time, a request-to-book conversation, and a reservation with a lifecycle. Payments are deferred (DEC-001), so v1 bookings are **requests and confirmations**, with deposits arranged off-platform — still valuable, and the honest scope.
- **Where it belongs.** Not in attributes. Descriptive facets of a bookable listing (room type, capacity, amenities, check-in time, rate period) are ordinary attributes and are being curated already. The behaviour hangs off the **category**, next to `price_enabled` and `expiry_days`: `capabilities text[]` with a CHECK against an allowlist (`bookable`, later `has_variants`, `event`), exported/imported as one cell, inherited like every other category behaviour. A category with `bookable` makes the posting form show a booking section and the listing page a request-to-book action.
- **The module (its own era, candidate U9, after U8 messaging).** Tables: `listing_availability` (listing, range, capacity, blackout) with a range index; `reservations` (listing, requester, unit count, period, status: requested → confirmed / declined → cancelled / completed / no-show, plus timestamps) under one state machine (the REQ-022 pattern); notifications on every transition (REQ-031); conversations attached (REQ-026); RLS: a requester sees only their reservations, a seller only theirs; audit rows; screening on free-text notes (REQ-021). Time zones: stored UTC, displayed in the listing's location zone (DEC-033 gives every location a zone). Performance: availability read by range query on the index, cached per listing version; no calendar UI heavier than a month grid on 360 px.
- **Why now, then.** Only the capability column and its allowlist need to exist at U6-A so the listings schema is not reworked later; the module waits for messaging and notifications, which it cannot function without.

### 3.13 Global-before-vertical definitions (curation rule R1)
- `condition`, `color`, `brand`, `warranty`, `swap_exchange`, `rate_period` will recur in most passes. Rule for the curation handoff: search the library first; reuse a global key when the option set is the same; suffix `-<vertical>` only when the option set is vertical-specific; never two definitions for one meaning (the Merge door exists to undo it, and each merge is a step-up action the operator pays for).

### 3.14 Variants (`is_per_variant`)
- The column anticipates per-variant stock (size × colour). Classifieds are single-item; storefront inventory is a later product. Keep the column, build nothing, revisit with storefront commerce (DEC-001's payments return).

### 3.15 Screening hooks (REQ-021)
- The validator's structured facts (year, make, price, condition) are exactly what the AI gateway needs for plausibility signals ("2024 Corolla at 40,000 ETB"). No design now; note that the validator returns the normalised attrs so screening consumes one shape.

## 4. Cross-cutting: lightweight, secure, tested, performant, user-friendly

- **Lightweight.** Every addition is a nullable column or a JSON key on records that already round-trip through export/import; one validator function; presets instead of regex; fixed units instead of unit pickers; option bounds instead of a rule engine; capabilities instead of a listing-type hierarchy. No new dependency anywhere.
- **Secure.** The server validator is the only authority (F3); constraints are validated **at import** so bad data cannot reach the validator (F5 gates → capture → mutate); presets are an allowlist; text attributes are screened and rendered as data; option lists are public catalog data delivered through the gated read RPCs (E7) and version-cached; no attribute can carry contact data by construction.
- **Tested.** Hostile-file spec rows for every new cell; DO-block proofs per rule in each migration; a validator E2E family driven by the API; console E2E for editing units/bounds/presets; import round-trips byte-identical for unchanged rows (the new cells are appended at the end of the definitions header, so files exported before P1 still import — missing cells mean unchanged).
- **Performant.** Nothing runs on read except the version-cached catalog fetch; validation runs on write only; option lists are lazy per definition; facets and generated columns are added on U7's measurements (REQ-003, REQ-029).
- **User-friendly.** Units as suffixes, year pickers that narrow after make and model, hints in the poster's language, refusals that name the values and the rule, `other` that captures what the poster typed, sections when a form grows, and — for bookables — a request-to-book that reaches the seller's inbox instead of a phone call.

## 5. Decisions for the operator (DEC candidates)

| # | Decision | Recommendation | When |
|---|---|---|---|
| DEC-050 | **Definition v2 fields**: `unit`, `min`, `max`, `decimals`, `format`, relative year tokens; text `preset` + `max_length`; `help_text_am` (+ export of both hints); option `active`, `bounds`, `aliases`; `range` removed from the CHECK; option-coverage read. | Adopt as one spec + 3–4 landings (migration whole-declared per INC-183; gate + hostile-file rows; console fields; export/import cells; docs/Knowledge amendment). ESTIMATE 3–4 Lovable turns. | P1 — after the Locations era, before U6-C; curation continues meanwhile under rules R1/R2 |
| DEC-051 | **Validation authority**: `validate_listing_attributes` as the single server validator; `listings.attrs` shape incl. `other`; type-change and option-delete guards once referenced; client mirror for UX only. | Adopt; spec inside U6-A. | U6-A |
| DEC-052 | **Category capabilities**: `capabilities text[]` on categories with an allowlist (`bookable` first), exported/imported; the Bookings module as its own era after U8, request-only (no payments, DEC-001). | Adopt the column at U6-A; charter the module (candidate U9) in the roadmap now so nothing in U6–U8 forecloses it. | column U6-A; module post-U8 |
| DEC-053 | **Option delivery and caps**: per-definition lazy, version-cached option lists; the 400 cap raised only on the Electronics note's evidence. | Adopt the delivery rule; hold the cap. | U6-C design; cap on evidence |
| R1 | Global-before-vertical definitions. | Write into the curation handoff and Knowledge. | now |
| R2 | Fixed unit per definition; bounded sets → select; open numerics → number with the unit in the label until 3.1 lands, then backfilled. | Write into the curation handoff. | now |
| Deferred | Rule language for cross-attribute predicates; unit pickers; groups (3.10) until a form walk asks; variants; `range` (Jobs v2). | Explicit "not built" lines in the ledger so nobody re-derives them. | — |

## 6. Sequencing (proposed)

1. Now: R1/R2 into the curation handoff; Electronics and remaining passes continue unchanged (the files need none of P1).
2. Locations era (DEC-033) spec and build — already next.
3. **P1 = DEC-050** spec session (this document is its Pass-1) → landings → curation threads backfill units/bounds/help text for finished verticals in one import each.
4. U6-A with DEC-051 and DEC-052's column → U6-B images → U6-C posting form (uses 3.1/3.2/3.5/3.6 directly) → U6-D screening → U6-E.
5. U7 filters from definitions (3.1 bounds, 3.3 active rule) → U8 messaging → Bookings era (DEC-052 module).

## 7. What this review did not do

- It did not design the Bookings module's screens or state machine in full — that is its own spec session with its own forward-scan.
- It did not measure option-list sizes or facet query costs — those numbers come from the Electronics note and from U7's measurements; every size above is an ESTIMATE.
- It did not change any rule already ratified (DEC-043/044/045 stand as written); everything here is additive to them.
