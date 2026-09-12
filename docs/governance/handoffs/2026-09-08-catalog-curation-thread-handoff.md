# HANDOFF — Catalog curation thread (categories + attributes), opened 2026-09-08

Predecessor: the S34 category/attribute era thread (C2–C5, C3a–C3g, IE-1…IE-4b, DEC-044/045). Everything below is verifiable in the repo; the §2 ritual (clone dev, read system-state → this handoff → ledger tail) comes FIRST in the new thread.

## 1. Mission (what this thread does, and only this)

Review and correct the ENTIRE catalog — every root category, its subcategory tree, and the attribute set each one carries — one major category at a time, and hand the operator **files he imports** through the console's preview → confirm → undo doors. The thread never writes code, never runs migrations, never edits the database, never issues Lovable prompts. Its output is three CSV files per major category plus a review note; its input is the operator's exports and the review workbook.

Why this exists: the taxonomy came from the apex import and a dedup pass that kept the first-seen key for identical option sets, so the data holds structural mistakes the console could not show until DEC-044 (inherited rows). The audit of the 2026-09-07 export found: 225 direct links producing 684 inherited rows; only 7 of 126 categories with the two card attributes the law requires; parent-level links that cannot fit every child (Vehicles pushes Make/Model/Mileage onto Parts & Accessories; Cars pushes the EV set onto all six children); definitions wearing another family's key (`brand-beauty-personal-care` on Electronics, `condition-audio-sound` on Pets & Animals, `condition-babies-kids` on Phones & Tablets); 26 stems with per-variant duplicates (condition ×15, equipment_type ×9, service_type ×6); `model-cars` a single-select with one option; `make-cars` apex's global list of 109 makes including motorcycle makers.

## 2. Laws the files must obey (the importer enforces every one of them)

- **DEC-044 inheritance:** an attribute linked at a category applies to that category and EVERY descendant. Anything linked at a parent must fit all its children; otherwise it belongs on the specific children (split per type). The console shows inherited rows read-only, marked "Inherited from <origin>"; the importer refuses edits to inherited rows ("edit at the origin").
- **Card attributes:** every listing category (allow_listings = true) ends with at least two card attributes (card_rank 1..3), own or inherited. Card attributes are the must-fill fields at posting (DEC-043); all other linked attributes are optional for the poster; the listing shows every filled attribute and hides unfilled ones.
- **DEC-045 dependent options:** a definition may `depends_on` one single_select definition; each of its options carries `parent` = one of the parent's option values; pickers and filters cascade; deleting/unlinking a parent is refused while dependents exist. Use it for make → model (cars, motorcycles, trucks, buses & vans) and brand → model where lists are known. Free text is never a substitute: "other" is an option value; an optional other-text capture is a later feature (C3-UX-4).
- **Slugs are identities.** Never rename a slug or an attribute_key; to rename, change name_en / label_en. A changed slug is refused with guidance.
- **Column classes.** Headers suffixed "(read-only)" are never applied (category_path, origin, is_catchall, listing_count, origin_scope, is_per_variant, direct_link_count). Editable: everything else. name_am / label_am ARE editable: a filled cell becomes a pending-review translation (never auto-approved; the operator approves in Translations); a blank cell changes nothing.
- **Explicit intent only.** Creates: a new slug with a parent_slug (roots need action=create-root); a new attribute_key; a new link row. Removals only via the `action` column: categories — retire · reactivate · delete (refused with children or listings); attributes — unlink · delete (refused while linked). Absence of a row never deletes.
- **Fuel type is an attribute, not a category.** Cars keep body-type subcategories (Sedans, SUVs, Hatchbacks, Pickups, Minivans & Vans, Coupés); electric / plug-in hybrid / hybrid / petrol / diesel is a card attribute on all of them; "Electric Vehicles" folds into it. Taxis are removed (nobody sells a "taxi"; it is a car type used as a taxi). Mileage links at Cars, Trucks, Buses & Vans, Motorcycles — never Bicycles.
- **Depth:** at most three levels (root › section › leaf). Prefer attributes over deeper trees.
- **Naming:** EN labels in Title Case, AM labels supplied for everything new or renamed (Ge'ez script, natural Amharic, not transliteration), keys snake_case with a family suffix only when a variant is genuinely different (`make-trucks`), never for a shared list (`condition` is one shared definition where option sets are identical).

## 3. The loop, per major category (repeat until the whole catalog is done)

1. Operator: Admin → Catalog → Categories → filter the root (e.g. Vehicles) → **Export categories** (subtree, with inherited rows and origin). Admin → Catalog → Attributes → filter the same root → **Export attributes** (definitions.csv + links.csv, subtree). He attaches all three files here.
2. Thread: read the files against the review workbook (`ethio-attribute-curation-2026-09-07.xlsx`: Categories, Links, Definitions, Proposals, MakeModel-Proposal sheets carry the flags computed from DB truth) and produce a written review BEFORE any file edits: tree problems, inheritance violations, duplicates to merge, missing card attributes, missing option lists, naming and Amharic gaps.
3. Thread: research the vertical — apex (the source, not the authority), Ethiopian sites for THAT vertical (vehicles: Mekina, Jiji Ethiopia, Qefira, Ethiocar; real estate: Ethiopia Property Centre, Qefira, Jiji; electronics/phones: Jiji, Qefira, local retailer catalogs; fashion/home/babies: Jiji, Qefira; jobs/services: Ethiojobs, Jiji), African peers (Jiji, Jumia Deals, Tonaton, Autochek/Cheki, Property24, BuyRentKenya, PigiaMe, OLX/Dubizzle), and Western references (AutoTrader, Cars.com, Rightmove/Zoopla, Craigslist, eBay categories, Facebook Marketplace, Vinted/Depop for fashion, Reverb for instruments). Record what each does for tree shape, filters, required fields and option lists; adopt the best fit for a low-bandwidth Ethiopian and diaspora audience.
4. Thread: produce the three edited files in the export format (headers unchanged), plus a change note listing every add / change / retire / unlink / delete with its reason and source. Keep read-only columns as exported. Fill name_am / label_am for everything new or renamed. Express make → model and brand → model with depends_on + parent. Set card_rank 1..3 on every listing category (own or inherited).
5. Operator: Import categories first (preview → counts and refusals → Confirm with step-up), then Import attributes (definitions before links land automatically; the plan orders creates parent-before-dependent). If the preview shows refusals, send the counts line and refusal lines back to the thread; refusals carry the values they judged and the fix.
6. Operator: walk the result in the console (tree, inherited rows, card flags cleared, cascade preview for dependent pairs) and approve the pending Amharic rows in Translations. Undo is available for the last batch of each import if anything is wrong.
7. Next root category.

Suggested order: Vehicles → Real Estate → Electronics → Phones & Tablets → Computers → Fashion → Home & Garden → Babies & Kids → Beauty & Personal Care → Services → Jobs (if present) → Agriculture & Farming → Construction Material → Commercial Equipment → Sports & Leisure → Pets & Animals → Travel & Accommodation → the remaining roots.

## 4. Deliverable quality bar (the operator checks these before importing)

- Round-trip discipline: the files are the export with edits, not a reconstruction; unchanged rows stay byte-identical so the preview's "unchanged" count proves the scope of change.
- No inherited-row edits; every structural change expressed at the origin or as new direct rows.
- Every listing category in scope has ≥2 card attributes after import.
- No duplicate definitions remain in scope (merge-into decisions listed; merges are done by the operator in the console via Merge, not by file).
- Option lists: complete for the Ethiopian market first, then common imports; "other" present; no empty select lists; Ethiopian-market makes/models per vehicle type (EV era: BYD Seagull/Dolphin/Atto 3/Yuan Plus/Yuan Up/Song Plus DM-i/Han/Tang; Chang'an; Dongfeng; Toyota/Honda/Citroën EVs via Hallel; legacy fleet: Toyota, Suzuki Dzire, Hyundai, Lifan, Nissan, Mitsubishi …). Import of non-electric vehicles has been banned since January 2024; the used fleet is the pre-ban market.
- AM quality: natural Amharic, reviewed, no machine leftovers.
- A change note the operator can read in five minutes.

## 5. What the thread must never do

Write code · propose prompts to Lovable · touch the database · rename slugs or keys · edit inherited rows · delete categories that hold listings · invent option values without a source or a market reason · change headers or read-only columns · exceed three levels · leave a listing category without two card attributes.

## 6. Where truth lives

docs/features/attributes.md and docs/features/categories.md (the column laws, refusal catalogue, inheritance and dependency laws, import security spine); docs/spec/spec-ledger.md (DEC-043 posting law, DEC-044 inheritance, DEC-045 dependent options); the review workbook (attached by the operator); the exports (always fresh — never work from an old file).

## 7. Addendum 2026-09-11 — standing file rules R1/R2 and the DEC-050 cells

R1 — global before vertical: search the library first; reuse `condition`, `color`, `brand`, `warranty`, `swap_exchange`, `rate_period` where the option set matches; add a `-<vertical>` suffix only when the option set is genuinely vertical-specific; never two definitions for one meaning.

R2 — fixed unit per definition; bounded sets (storage, RAM, screen sizes, bathrooms with halves) as single_select; open numerics as `number` with the unit in the label until DEC-050 lands, then backfilled by one definitions import per finished vertical.

DEC-050 cells (available after P1 lands; files produced before then simply omit them): number `unit`/`min`/`max`/`decimals`/`format` with relative year tokens (`year`, `year+1`…); option `bounds` naming a sibling number attribute with `{min,max}` (make → first production year, model → last year); option `active` (discontinued values) and `aliases` (search only); text `preset` from the code allowlist and `max_length`; `help_text_en`/`help_text_am`. Review notes may propose these now; the files carry them once the cells exist.

## 8. Addendum 2026-09-12 — the DEC-050 cells are live; how to author them; the backfill files

Files must be exported after 2026-09-12 (the definitions header now carries `unit, min, max, decimals, format, preset, max_length, help_text_en, help_text_am` after `depends_on`; an older header is refused whole — re-export, never guess).

Number definitions: `unit` (≤16 chars: GB, km, m², kg, cc, inches); `min`/`max` as a literal or a year token (`year`, `year+1`, `year-1`); `decimals` 0–3 (a `format` of `year` forces 0); `format` plain or year. Text definitions: `preset` from the allowlist only — `digits:N` (IMEI 15, chassis numbers), `vin`, `plate-et`, `alnum:A-B`, `free:N` — and `max_length` 1–1000; never a regex, never a contact-data field. Every definition: `help_text_en` and `help_text_am` (≤240 each) — the posting form's hint.

Option records may carry three optional keys, in jsonb's own key order and only when set: `"active": false` for values no longer offered to new posts (discontinued models; kept for existing listings and filters); `"aliases": ["…"]` (≤5 × 32 chars, search only — spellings, Amharic renderings, common misspellings); `"bounds": { "<number attribute_key>": { "min": …, "max": … } }` where the target is a number definition linked wherever this definition is linked — a make's first production year (`{"year":{"min":2008}}` on Tesla), a discontinued model's last year (`{"year":{"max":1999}}` on Tercel). Values with `"active": true` or empty aliases/bounds are written without those keys (a spelled-out default is a no-op).

Card ranks: a direct rank equal to a rank the category inherits is refused (`rankInherited`), naming the origin — children of a root that supplies rank 2 use 1 and 3.

Backfill files (Vehicles, Real Estate, Electronics — one definitions file each, links untouched): export fresh; fill units, bounds, decimals and formats on every number definition; presets and max lengths on text definitions; both help texts on every definition in scope; `active: false` on discontinued makes/models/series; `bounds` on every make and model where the production years are known (Ethiopian-market first; leave unknown years unbounded rather than guessed); aliases for the common spellings. Unchanged rows stay byte-identical. Deliver the file plus a change note with the counts you expect; the engineering thread runs the counts line before Confirm.
