# Curator record 2026-10-05 — the ethio.com catalogue (handover copy)

What this is: the record of what the catalogue curator delivered from the first curation programme (2026-09-08) through the C29 prompt (the catering rows — delivered, audited with 0 issues and imported on ethio-prod 2026-10-05 ~03:35Z after this record was compiled; see the handoff item [12.3]), what the supervisor found at each audit, what the operator imported, where the catalogue stands, and the open curator items and the next batch plan; the C30 redesign of the Cooked Food leaf, ruled 2026-10-05 after this record was compiled, is in the handoff `2026-10-05-open-items-master.md` (items [1.3], [7.1]) and in `docs/governance/specs-archive/2026-10-04-c30-cooked-food-to-order-curator-prompt-plan-first.md`.
Compiled: 2026-10-04 (evening, America/New_York) from the files listed in Part 5, with the C28/C29 state of 2026-10-05 00:12 UTC.
By whom: the supervisor thread's compile of 2026-10-05; sources are tagged per item (chat turns as [tNNNN], files by name, the ledger by line).

---

# CURATOR RECORD — ethio.com catalogue (handover copy)

Compiled 2026-10-04 (evening, America/New_York) from the files listed in Part 5. It records what the catalogue curator delivered, what the supervisor found, what the operator imported, and where the catalogue stands. Everything below is taken from a named source; counts are copied, not computed (file sizes and row counts come from `ls`, `wc -l` and a CSV reader run on the files themselves). Where two sources disagree, both are given. "ET" is the operator's local time (UTC−04:00).

Short glossary: **curator** = a separate AI session (Claude Project "ethio.com — Catalog curation") that researches and writes the catalogue files; **supervisor** = the Claude engineering thread that audits each delivery; **operator** = the person who imports the files through the admin console; **Lovable** = the coding executor; **definitions** = attribute definitions (questions and their answer lists); **links** = category↔attribute rows; **leaf** = a category that accepts listings; **root** = a top-level category; **card** = an attribute shown on the listing card (`card_rank` 1–3); **the door** = the server-side function that judges a posting step.


# PART 1 — HOW THE CURATOR WORKS

## 1.1 Who does what

- **The curator** is a separate Claude Project, "ethio.com — Catalog curation", opened 2026-09-08 from the handoff in the repo (`docs/governance/handoffs/2026-09-08-catalog-curation-thread-handoff.md`). It reviews the catalogue and hands back files the operator imports. "The thread never writes code, never runs migrations, never edits the database, never issues Lovable prompts." (handoff §1).
- **The supervisor** (the engineering thread) writes each curator prompt, audits every delivery before import, and rules on small questions itself. Two audit gates were decided on 2026-09-21: the curator runs its own pre-delivery audit (its instruction's §9) and the supervisor audits again before the operator imports (memory, ways-of-working).
- **The operator** carries messages between the two, exports the catalogue from the admin console, imports the files (preview → confirm), pastes the console's count line back, approves Amharic names in Admin › Translations, and walks the published form.
- A second thread in the same Project, the **"Locations curator"**, curates the place tree (decided 2026-09-16). Its five "evidence" notes of 2026-09-16 are in the uploads folder but are not catalogue deliveries (Part 5).

## 1.2 The files and their columns

Headers below are copied from the files in the uploads folder. A header suffixed "(read-only)" is never applied on import.

| File | Header (in order) | Rows mean |
|---|---|---|
| **definitions** (`*-definitions*.csv`) | `attribute_key, label_en, label_am, type, options, depends_on, unit, min, max, decimals, format, preset, max_length, help_text_en, help_text_am, is_per_variant (read-only), direct_link_count (read-only)` + optional trailing `action` | one attribute (question). `action` = `delete` removes a definition (refused while linked). |
| **links** (`*-links*.csv`) | `category_path (read-only), category_slug, attribute_key, is_required, is_filterable, card_rank, origin (read-only), allowed_options, default_value, visible_when, display_order` + optional trailing `action` | one category↔attribute row. `action` = `unlink` removes it. `allowed_options` is the per-link scope (pipe-separated subset of the definition's options); `visible_when` is the condition `key=value1\|value2`; `display_order` is the order on the form. |
| **categories** (`*-categories*.csv`) | `category_path (read-only), category_slug, parent_slug, name_en, name_am, display_order, is_active, allow_listings, is_catchall (read-only), price_enabled, capabilities, default_price_period, price_period_locked, expiry_days, icon, visible_from, visible_until, excluded_country_codes, secondary_parents, listing_count (read-only), origin_scope (read-only)` + optional trailing `action` | one category. `parent_slug` is the home; `secondary_parents` (pipe-separated) are the guests. `action` = `create-root`, `retire`, `reactivate`, `delete`. |
| **countries** | `country_code, name_en, is_active, unit_system, currency_code, display_order, root_order, action` | one country (locations family). |

- **The `options` cell** holds one JSON record per option; records are separated on the boundary `}|{`, never on a bare pipe (INC-265, `docs/_changelog.md` 2026-09-22). Keys seen and checked by the supervisor's scripts: `value, label_en, label_am, parent, active, bounds, aliases, allowed, facts, swatch` (`audit_c27b1.py`, `OK_KEYS`). `parent` needs `depends_on` on the definition (DEC-045). `active: false` keeps a value for old listings but stops offering it. `bounds` limits a sibling number (`{"year":{"min":2008}}`). `allowed` narrows a sibling select (DEC-057). `facts` prefills sibling answers ("a prefill, never a rule", D18). `swatch` is a colour (D28).
- **Other curator files (never imported):**
  - `*-inc296-amharic-*.csv` (2026-09-29 → 2026-10-01) and its successor `*-translations-key-names-*.csv` (from 2026-10-01): header `kind, attribute_key / category_slug, option value, label_en, label_am[, was (EN / AM)]` — the names to approve in Admin › Translations after the import.
  - `*-form-path-dispositions-*.csv`: header `[batch,] check, root, leaf, after_choosing, question, choices_offered, affected, [example,] visible_open, [example_visible,] disposition, reason` — the curator's answer to each row of the supervisor's form-path worklist (keep / hide / narrow / fill, with a reason).
  - `c27-help-census-*.csv`: header `roots, attribute_key, EN first sentence length, AM first sentence length, EN first sentence, AM first sentence` — helps whose first sentence is over 60 characters. The file "after-b13" has a header and no rows.
  - `*-settled-to-other-scan-*.csv` (from batch 12): header `leaf, answer, select, how, card, what_the_seller_meets, status` — every select an answer settles to "Other". From batch 13 on it holds the 9 Food exception rows only.
  - One-off census files: `c27-b1g-census-C1-brand-position`, `c27-b1g-census-C2-product-origin`, `c27-b1g-one-value-allowed-without-fact`, `c27-inc357-writein-pairs`, `c27-dec094-market-wording-census`, `c27-pointer-census`, `c27-walk-preset-census`, `c27-walk-number-census`, `c27-walk-pointer-lines`, `c27-market-census-data`, `c27-b17-maker-check`, `c27-reserved-seller-names*`, `c28-catering-sources`, `c28-catering-tally`.

## 1.3 Naming conventions

- Curator files: `c<cycle>-[b<batch>-]<root or topic>-<kind>[-pass2].csv` and `…-change-note-<date>.md` / `…-review-note-<date>.md`. Cycle 27 batch labels in order: `b1`, `b2`, `b1f`, `b1g`, `b1h`, `o`, `help-food`, `veh`, `inc358`, `food-c3`, `fashion`, `babies`, `sports`, `construction`, `writein`, `home-garden`, `walk`, `r1` + `beauty`, `b8` … `b19`. Before cycle 18 the files were named by root (`vehicles-definitions.csv`, `services-links-pass2.csv`).
- `-pass2` (and `-pass3`): a links or definitions file that must be imported after the first, because it names an option or key the first file creates, or because two rows would otherwise share a card rank mid-import. The convention is cited in the notes as INC-252 ("RESERVED, not a defect", `incidental-findings.md`).
- `-definitions-aliases.csv` (cycle 18–19): the rows that receive search aliases, in their final state, kept apart so "a refusal here never touches file 1".
- `-delete-definitions.csv`: `action=delete` rows, always imported LAST.
- `-HELD` in a name: built but not to be imported until ruled (`c20-pets-definitions-HELD.csv`, `c27-countries-currency-corrections-HELD-2026-10-03.csv`). Both were later accepted (Part 2).
- A **full-catalogue links file** carries every link row with the `action` column; a **partial file** carries changed rows only ("absence never deletes").
- `_1`, `_2`, `__1_` at the end of a name is added by the chat upload when the same name is attached again; it is not a curator version number.
- Operator exports are `definitions[_N].csv`, `links[_N].csv`, `categories[_N].csv`; the curator calls a set "exports_NN".
- The curator's instruction sections are cited by number in every note: §7 dependency pass, §8 completeness pass (§8.6 = the walk script), §9 pre-delivery audit (§9.1 = the structural audit, reported as "N findings · N notes"), §10 the seller-view review (§10.1 form tables). The texts of those sections live in the curator Project, not in the sources read here.
- The curator's mechanical counts, reported "before → after" per root from cycle 27 on (defined in the Batch 1 review note): (a) fixed spec left open; (b) option offered under the wrong product; (c) order violations; (d) required beyond the cards; (e) missing Amharic; (f) year with no floor. (g) was first the form-path counts g1–g3 [t949] and from 2026-10-01 "Unit of Sale before Quantity" and every size question [R1 note; t1063].

## 1.4 What the importer accepts and refuses

Each number is followed by where it is stated.

| Rule | Limit | Source |
|---|---|---|
| File size, rows | ≤ 1 MiB per file (`MAX_BYTES = 1_048_576`), ≤ 5,000 data rows (`MAX_ROWS = 5000`) | `src/server/imports/registry.ts:17–18`; `docs/features/imports.md:22` |
| Header | exactly the export's header plus an optional trailing `action`; an unknown column is refused by name; an older header is refused whole | `docs/features/attributes.md` (IE-2); `imports.md` "Unknown columns are refused BY NAME"; handoff §8 |
| Formula cells | a raw cell starting `=`, `+`, `-` or `@` is refused per row | `attributes.md` (IE-2) |
| Slug / key shape | `^[a-z0-9][a-z0-9_-]{1,63}$` (slugs); definition keys `^[a-z0-9_][a-z0-9_-]{1,63}$` | `registry.ts:15`; `imports.md` (facts, visible_when) |
| Label, option value, option label | 120 / 64 / 120 characters (`MAX_LABEL`, `MAX_OPTION_VALUE`, `MAX_OPTION_LABEL`) | `registry.ts:19–21`; `gate.ts:524–525` |
| Options per list | 1,500 (`MAX_OPTIONS`, refusal `tooManyOptions`); was 400 until DEC-103, 2026-10-02 | `registry.ts:28`; `gate.ts:522`; sweep-1151-1195 §3 |
| Help text | ≤ 240 characters each for `help_text_en` and `help_text_am` | handoff §8; Cycle 22 file refused at 244 (spec-ledger:1571) |
| First sentence of a help | ≤ 60 characters in EN and AM — a curator/supervisor rule for what the form shows, not an importer gate; DEC-095 pointer lines are exempt | sweep-0971-1015 (File 1 rulings, help file); curator notes "every first sentence is ≤ 60, apart from DEC-095 pointer lines" |
| Number cells | `unit` ≤ 16 characters; `decimals` 0–3; `min`/`max` literal or year token (`year`, `year+1`, `year-1`) | handoff §8 |
| Text cells | `preset` from the allowlist only (`digits:N`, `vin`, `plate-et`, `alnum:A-B`, `free:N`); `max_length` 1–1000 | handoff §8 |
| Aliases | ≤ 5 per option, each ≤ 32 characters; unique within the definition, case-insensitively (refusal `aliasDuplicate`) | handoff §8, §9; `attr_option_shape`, migration `20260922001023` lines 48–93 (sweep-0926-0970); first hit: Batch 1, option "nan" |
| `allowed` on an option | ≤ 5 target attributes; values per target ≤ 50 until 2026-10-03, then ≤ 150 ("attr_option_shape ceiling raised to 150", bundle 2 step 19). The target must be a select linked in at least one category where the owner is linked (DEC-057b). | handoff §9; migration `20260922001023` lines 134 and 147 (sweep-0926-0970); sweep-1196-1240 (t1200, t1211, t1224); refusal seen: batch 9, "too many allowed values — five attributes at most, fifty values each". The C29 prompt as sent on 2026-10-04 still says "five targets and fifty values each". |
| `facts` on an option | ≤ 20 entries; a scalar or a list of strings (the curator's audit also holds a list fact to 1–20 values) | `imports.md` "option `facts` cell"; batch 9 re-issue note; `importer_caps.py` |
| `bounds` on an option | `{min, max}` on a number target. `"settled": true` beside min and max is accepted by migration M6 (applied on prod 2026-10-04); the curator has been told not to use it until the supervisor says so | handoff §8; bundle-4 brief step 27; bundle3_draft "2026-10-04 23:06Z"; t1093 |
| `visible_when` | `key=value1\|value2`; cell capped at 480 characters; the supervisor's and the curator's audits hold it to ≤ 64 values. A BLANK cell changes nothing — clearing a condition is a console act ("Show when" → "Always visible"). A two-pair form `k1=a\|b&k2=c\|d` is in M6 (INC-381); not yet released to the curator | `imports.md:284–316`; `eff_checks.py`; INC-290; bundle-4 brief step 26 |
| `allowed_options` | pipe-separated subset of the definition's own values; an absent cell changes nothing, a present-and-empty cell clears the scope; refusal `badAllowedOption` | `imports.md` "allowed_options and default_value" |
| `default_value` | text judged against the type and the scope in force (120 characters); refusal `badDefault`. The walk-fix note warns a blank default may be read as "no change" | `imports.md`; walk-fix change note §1 |
| `display_order` | non-negative integer | `imports.md` "display_order (M-ORDER)" |
| Card ranks | 1..3; a direct rank equal to one the category inherits is refused (`rankInherited`); two rows on one rank collide, hence the pass-2 split. "At least two cards" is a console amber flag for an active listing category, not an import rule | handoff §8; spec-ledger:1572 (Cycle 23 ruling) |
| Price basis | one pricing-basis attribute per leaf (`priceBasisDuplicate`), and it is a card; keys are `pricing_type*` / `unit_of_sale-*`. The bundle-4 brief (step 7) lets a second basis be linked with a condition (rent and hire) | `docs/_changelog.md` 2026-09-27 D31-M; spec-ledger (DEC-079 convention); bundle-4 brief |
| Inherited rows | a row inherited from a parent is read-only: the console reports "Ignored (read-only) origin — N rows not applied", which is normal | `attributes.md` (IE-6); t964, t1042, t1173 |
| Deletes | a definition delete is refused while a link exists; a pass with unlinks imports definitions and links together | handoff §9; `attributes.md` IE-5 |
| File order inside one delivery | a condition's unhider must be live or earlier in the same file (`unknownSibling`); links go before definitions when an `allowed` target is first linked in the delivery (`allowedTargetNotColinked`); definitions and links that depend on each other go in the SAME attributes pass | spec-ledger "CLASS RULES FORGED" (S42); C25 first attempt (t866) |
| Categories | retire / reactivate / delete only through `action` (an `is_active` cell alone is refused `statusNeedsAction`); `secondary_parents` is the COMPLETE set for the row; on a CREATE row `secondary_parents` is not applied (INC-314) — a second file is needed; `capabilities` pipe-separated (`map_pin\|own_place`) | handoff §9; raw t801; C26 note; t1230 |
| Amharic | a filled `label_am` / `name_am` becomes a pending translation. Only NAMES (attribute labels, category names) need approval in Admin › Translations; option labels and help texts go live with the import | handoff §2; supervisor at t1059 |
| Unchanged rows | an option cell identical to the stored one is not re-validated; a round trip of the export plans zero changes | `imports.md` (M-SHAPE, INC-254) |

The console's preview line reads, for attributes, "N added · N changed · N unlinked · N deleted · N unchanged · N refused", and for categories, "N added · N changed · N retired · N reactivated · N deleted · N unchanged · N refused"; after Confirm it prints "Import applied — N changes written". Catalogue imports need no Publish [t1241].

## 1.5 What the supervisor's audit checks (from the scripts in the scratchpad)

The supervisor keeps its own model of the live catalogue as a saved state per batch (`merged_c27*.pkl`; `b18_audit.txt` is one of these, not a text file) and applies each delivery to it.

- **`state_now.py`** — rebuilds the catalogue state (categories, definitions, links) from the post-C24 exports plus the C25 and C26 files; helpers: split options on `}|{`, lineage, effective rows of a leaf (own + inherited).
- **`audit_c27b1.py`, `audit_c27b2.py`** (Batch 1 and 2) — per file: which rows are new or changed and which cells; option keys outside the allowed set; help over 240; missing Amharic label on a definition or option; `allowed` over 5 targets or over 50 values; in-file reference order (a `depends_on`, option `parent`, `allowed` or `facts` target must exist earlier in the file or in the base); link counts added / changed / unlinked / unchanged against the base; dangling references to removed option values (scopes, defaults, conditions, option rules).
- **`eff_checks.py`** — per leaf of the named roots: duplicate card rank; fewer than two unconditional cards; unknown key; scope value not in the definition; default not in the definition or outside the scope; condition over 480 characters, unparsed, over 64 values, key not linked, value outside the key's options or scope, unhider ordered after its dependent; dependent before its parent; INC-292 (a `facts`/`allowed` value that is not a value of the target or lies outside the target's link scope); DEC-057b (owner and target share no leaf).
- **`audit_generic.py`** (used from batch 10 on; `audit_c27*.py` for the earlier C27 batches are the same pattern) — prints every changed definition (cells, options added / removed / changed / reordered) and every link row added, changed (with the scope values added and removed) or unlinked; base rows absent from the file; writes the next merged state.
- **`check_direct.py`** — runs the whole-catalogue problem list (missing definition; condition key not linked or bad values; scope bad; default bad or outside scope; `allowed`/`facts` target not linked, bad value, outside link scope; fact outside its own `allowed`; duplicate display order) on the state before and after, and prints only NEW and RESOLVED entries. Its outputs are `b9issues.txt` … `b14iss.txt` ("base N new N").
- **`importer_caps.py`** — mirrors the importer's option gates on every definition: aliases 1–5 of 1–32 characters, no control characters, no duplicates; `allowed` ≤ 5 targets of 1–150 values, no duplicates; `facts` ≤ 20, list facts 1–20.
- **`alias_gate.py`** — the alias rules on a delivered file (count, length, duplicate within the definition, case-insensitive).
- **`b12sim.py`, `b13sim.py`** — a form simulator: for a leaf and chosen answers it prints each row as HIDDEN, CHOSEN, GONE (settled to one answer), WRITE-IN (settled to Other, text required) or ASKED (with prefill and the answers offered). Used to check every walk line. `b13sim.py` also leaves out inactive options.
- **`b13checks.py`** — references to inactive options (conditions, scopes, defaults, option rules, parents); duplicate card ranks; fewer than two unconditional cards; more than one price basis on a leaf; a basis that is not a card.
- **`audit_b16.py`, `audit_b16b.py`** (vehicle lists) — only the options cell changed; no value removed or duplicated; make lists alphabetical with Other last (Universal first in Compatible Make); each make's models contiguous, in make order, alphabetical with numbers in numeric order, exactly one own Other last; every model's parent is a make; the 400-option ceiling then in force; value and label lengths; Amharic present; alias rules; an alias equal to another option's label; `allowed`, `facts`, `bounds` shapes and targets.
- **`merge_b17.py`, `merge_b18.py`, `merge_b19.py`** — apply batches 17–19 to the model (a leaf's direct row wins over an inherited echo) and print what changed; `merge_b19.py` also proves that only `negotiable` left each changed scope.
- **`audit_c27c3.py`** — INC-358 and Food C3: option diffs, alias rules, dangling references, every `visible_when` value exists and its controller is linked.
- **`form_path_audit.py`** — builds the form-path worklist (Part 2, entry "Batch 2 review note"): class A, a question left open by an identity path (g1/g3); class B, a question asked for every type with no condition or narrowing from the type (g2).
- **`audit18*.py`** (cycle 18–21), **`audit_c23.py`, `verify_c23.py`, `audit_c25.py`, `audit_c25_links.py`, `c22_roots.py`, `c22_undo_check.py`** — the same kinds of checks for those cycles (alias ≤ 32, condition ≤ 64 values / 480 characters, per-root findings).

Limits the supervisor stated about its own audits: when the operator's fresh exports are not attached, the comparison runs against a rebuilt copy (Batch 1: "missing 7 inherited link rows"); checker entries at leaves that cannot reach an option (iPhone rows at Feature Phones, Smartwatches, Tablets) are noise, not defects.

## 1.6 The order of operations

1. **Prompt.** The supervisor writes the curator prompt (base to build on, what to build, rulings, limits, what to deliver); the operator pastes it into the curator chat, attaching fresh exports when the prompt asks for them.
2. **Review note first** for a new root or a new study ("no files"); the supervisor rules on its numbered questions; substantive product questions go to the operator.
3. **Delivery.** Files plus a change note that states the base, the import order, the expected preview per file, the names to approve in Translations, the curator's own audit result, and a short walk.
4. **Supervisor audit** before any import. PASS, or a named defect and a re-issue.
5. **Import by the operator** on the live admin console: categories first when there is a categories file, then the attributes import (definitions and links together unless the note orders otherwise). The preview's count line must equal the expected line before Confirm; any refusal → Discard and send the line to the supervisor. Undo is available for the last batch.
6. **Translations:** approve the new names (the "INC-296" step).
7. **Walk** on the published site, only for form behaviour not walked before (rule of 2026-10-01).
8. **Fresh exports** back to the curator as the next base; the supervisor's model is advanced to the same state.

The curator's 19 batches of cycle 27 "were loaded through the admin screen and are not in the repository" [t1258]. The only curator file in the repo is `docs/data/reserved-names-v3.csv`.

## 1.7 Standing rules for curator prompts

From the operator (memory, ways-of-working and product-decisions):
- Curation passes are research-backed; "data or classification is not added unless absolutely needed; every field must be sharp, relate to the item and make sense" (2026-09-26).
- Conditions (`visible_when`) and each leaf's display order come from the curator's files, never from manual console work by the operator (2026-09-20).
- The supervisor must find catalogue inconsistencies itself before the operator's walk; every delivery is audited before import (2026-09-21).
- When one defect is found, the whole class is reviewed everywhere and fixed together (2026-09-29).
- No new prompt for the curator while it is still working; wait, verify, then one prompt per agent with held items folded in (2026-10-02).
- Catalogue effort follows real trade (2026-10-01); "lets keep everything uniform rather than creating exception" (2026-10-02).

Rules the supervisor repeats to the curator (sweeps; quoted from the prompts):
- State the base ("build on the fresh exports", or the named merged state) and give an expected preview per file.
- "Only card rows are required, three at most"; at least two unconditional cards on every leaf.
- Order law E (2026-09-29): identity (type → brand → write-in) → specs → made-in → unit, weight, volume, pieces → condition band → seller statements. Unit of Sale comes before Quantity and before every size question that describes one unit.
- C1–C3 (2026-09-30): brand moves low unless it is the product's identity, a required filter, or the price-setting maker; "Made in" only where local vs imported is a real buyer divide; staples are their own options.
- R17 popularity order with Other last; R21 certain facts are locked (single-value `allowed`); R22 family adjacency; R23 brand right after identity; R24 per-identity brand narrowing through `allowed`. Since 2026-10-02 every brand list and the vehicle make/model lists are alphabetical ("Rule 15"); `series-phones`, `model-phones`, `series-computers`, `watch_series` keep their order.
- A fact settled by an earlier answer is not asked (D44). "Never settle a row to Other; add the real option instead" (2026-10-01) — the nine Food rows are the one recorded exception.
- A lock needs two independent sources (DEC-093 and the iPhone RAM rule); otherwise a prefill or left open. The curator's coverage bar is 95% per leaf.
- The 100-ad rule (2026-10-02): a missing type or maker goes in when a page read shows 100 or more ads for it.
- DEC-094: write no new text that names one country; DEC-095: a help that points to another category names the full path in its first line.
- Fixed-meaning keys must not be renamed and must be reused exactly: "every unit_of_sale key, every pricing_type key, net_weight_g, volume_ml, pack_quantity, quantity_available, lease_term, payment_frequency, payment_plan, min_hire_days" (2026-10-03); a new unit key must start `unit_of_sale-`; price-page term rows start `term_`.
- A details-page row must never carry a condition on a price-page row (C29 prompt, B1).
- Walk lines: at most about 6 steps, each with its preconditions, checked on the form simulator; "a settled row is said to disappear"; a data-only change gets no walk line.
- Attestation booleans are labelled "(seller's statement)", never a card, never at a root (handoff §9).
- No alcohol options; religious, dietary and licence rows are the seller's own statement (C28 prompt).
- Research rules for studies: counts only of what the pages print; link, date read and count per source; unreadable sources named; no phone numbers, names or handles.

## 1.8 Things the curator must never do

From the handoff (§5): "Write code · propose prompts to Lovable · touch the database · rename slugs or keys · edit inherited rows · delete categories that hold listings · invent option values without a source or a market reason · change headers or read-only columns · exceed three levels · leave a listing category without two card attributes."

Added by later rulings:
- Never build on `"settled"` ranges, two-pair conditions, or `{country}` / `{category:<slug>}` tokens until the supervisor says the engine accepts them (t1093, t1146, C29 prompt part C).
- Never rename a fixed-meaning key (2026-10-03).
- Never settle a select to Other (2026-10-01).
- Never write market-specific wording (DEC-094) or a pointer that does not name the exact place (2026-09-30).
- Never add a banned or kept-out line: alcohol, tobacco and smoking accessories (REQ-028, DEC-060), sexual wellness products (DEC-100), prescription medicines (REQ-028), wildlife and the Pets exclusions (DEC-061); no health guarantees ("vet-checked") anywhere.
- Never import: the operator imports, after the supervisor's audit.


# PART 2 — DELIVERY LOG

One entry per delivery, in date order (oldest first). "Uploaded" is the time the file reached the supervisor's uploads folder (ET). Files stamped 2026-09-24 21:12 were bulk-restored, so their own names date them. "Data rows" excludes the header; `wc -l` is the raw line count. Quoted preview lines are the curator's expected line or the operator's pasted console line, as marked. Turn numbers `[t…]` point into the supervisor chat (sweep files and raw turns, Part 5).

### 1. Before the uploads folder — the first curation programme (2026-09-08 → 2026-09-15), from the repo record only
- **Date:** 2026-09-08 (the curation thread opened from the handoff) to 2026-09-15 (the era closed). **No file of this programme is in the uploads folder**; what follows is from the repo (`docs/spec/spec-ledger.md` lines 1232–1395, `docs/_changelog.md` D-GATE-9 … D-GATE-17, `docs/governance/reviews/curation-era-closeout-2026-09-15.md`). It is one entry because the sources give no per-delivery files.
- **What ran:** Vehicles (2026-09-08/09, "imported through preview → confirm"); Real Estate ("IMPORTED 2026-09-11", "131 changes written"); Electronics (import, then on 2026-09-14 the Electronics backfill "changed 42 · unchanged 0 · refused 0" after a first preview "refused one row on an alias shared across two brands' series"); the Vehicles and Real Estate backfills ("THE THREE BACKFILLS ARE COMPLETE", 2026-09-14); then Fashion ("attributes 37 added · 14 changed · 9 unlinked · 7 deleted · 30 unchanged"), Home & Garden ("28 added · 17 changed · 3 unlinked · 2 deleted · 14 unchanged"), Services, Travel & Accommodation ("57 added · 2 changed · 12 unchanged"), Construction Material ("68 added from an empty vertical"), Beauty, Sports & Leisure ("26 added · 9 changed · 5 unlinked · 2 deleted · 15 unchanged"), Agriculture & Farming ("36 added · 17 changed · 8 unlinked · 3 deleted · 17 unchanged"), the new Food root, Babies & Kids ("19 added · 8 changed · 10 unlinked · 7 deleted · 24 unchanged"), Pets & Animals ("35 added · 9 changed · 17 unlinked · 13 deleted · 22 unchanged"), Commercial Equipment ("23 added · 11 changed · 7 unlinked · 7 deleted · 27 unchanged"); and the library sweep (2026-09-15): "Categories: 13 changed …, 31 deleted …, 137 unchanged — zero retired rows remain, 142 active listing categories. Attributes: 25 added · 15 changed · 19 unlinked · 12 deleted · 305 unchanged … 327 definitions, zero unlinked".
- **Close-out** (four-lens review, 2026-09-15): "eleven curation passes plus three backfills and the Food & Beverages root, the library sweep, and the import-planner defects fixed on the way (INC-187, 188, 196, 197, 198, 199, 200)". "Verdict: the curation era closes CLEAN."
- **Policies ratified in it:** DEC-060 ("RATIFIED 2026-09-14: no alcoholic-beverage or tobacco listings in v1 …; brewing ingredients (gesho, bikil) allowed as groceries") and DEC-061 ("RATIFIED 2026-09-15: only domestic companion animals may be listed …").

### 2. Cycle 1 — Vehicles — §7 dependency pass (review note, change note, two addenda)
- **Date:** 2026-09-20 (file names). First cycle of the attribute-dependency programme the operator ordered on 2026-09-20 [memory, product-decisions: "Attribute-dependency directive 2026-09-20"; spec-ledger:1489 "cycle 1 Vehicles (2026-09-20)"].
- **Files:**
  - `2042e4bb-vehicles-dependency-change-note-2026-09-20.md` — note, 137 lines; 12,045 bytes; uploaded 2026-09-24 21:12
  - `24efe6de-vehicles-addendum2-change-note-2026-09-20.md` — note, 77 lines; 8,109 bytes; uploaded 2026-09-24 21:12
  - `d3441df6-vehicles-links-addendum-change-note-2026-09-20.md` — note, 41 lines; 3,572 bytes; uploaded 2026-09-24 21:12
  - `fa1f53d5-vehicles-dependency-review-2026-09-20.md` — note, 117 lines; 11,345 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried:** review note (step 1) on "today's Vehicles exports — 11 categories (8 listing leaves + root + two surfacing rows), 32 definitions, 60 direct links". Change note (step 3), accompanying `vehicles-categories.csv` (untouched), `vehicles-definitions.csv`, `vehicles-links.csv`: categories "changed 0 · unchanged 11 · refused 0"; definitions "changed 4 · unchanged 28 · refused 0" (`model-cars`, `model-motorcycles`, `model-trucks`, `model-buses-vans`); links "added 2 · changed 11 · unlinked 2 · unchanged 47 · refused 0 — 62 rows". "Import waits for M-MAINT-3b". Cycle 1 addendum (links only, `vehicles-links-addendum.csv`): "changed 6 · refused 0 — six rows, one per condition" (`visible_when`). Cycle 1 addendum 2 (R8 floors · R9 dominant prefills · R10 display order): definitions "changed 9 · unchanged 23 · refused 0"; links "changed 60 · refused 0 — every direct link in the root, each with its `display_order`".
- **Later statement of the result:** the §8 Vehicles review note of 2026-09-21: "cycle 1 and both addenda landed exactly as delivered."
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept). The repo ledger records only that the cycle-1 … cycle-17 passes "ran through the curation Project" [docs/spec/spec-ledger.md:1489].

### 3. Cycle 1 (reopened) — Vehicles — §8 completeness pass: review note and addendum 3
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `512e82ff-vehicles-addendum3-change-note-2026-09-21.md` — note, 31 lines; 2,387 bytes; uploaded 2026-09-24 21:12
  - `96934e1b-vehicles-s8-review-2026-09-21__1_.md` — note, 79 lines; 9,218 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** review note (step 1) on the fresh exports ("32 definitions, 373 make/model options every one of which carries a year floor, 1,026 fact lines, 60 links … cycle 1 and both addenda landed exactly as delivered"). Addendum 3 (R13b range caps · R15 bed length · R16 plate), accompanying `vehicles-definitions-addendum3.csv`: "definitions: changed 4 · unchanged 31 · refused 0" (`model-cars`, `model-buses-vans`, `bed_length`, `plate_code`). No Vehicles §8 step-2 change note is in the folder.
- **Operator rulings 2026-09-21 (Vehicles walk)** [memory, product-decisions]: range is never prefilled — the maker's figure caps the seller's km entry; bed-length labels in metres; the "no plate yet" option is a relabel of the existing unplated value.
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 4. Cycle 2 — Electronics — §8 completeness pass, with the R18 · R19 · R20 addendum
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `05194713-electronics-s8-change-note-2026-09-21.md` — note, 136 lines; 14,482 bytes; uploaded 2026-09-24 21:12
  - `31386d0a-electronics-addendum-change-note-2026-09-21.md` — note, 42 lines; 3,385 bytes; uploaded 2026-09-24 21:12
  - `73a566cb-electronics-s8-review-2026-09-21.md` — note, 101 lines; 11,198 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** change note (step 2) accompanying `electronics-categories.csv` (untouched), `electronics-definitions.csv`, `electronics-links.csv`: categories "changed 0 · unchanged 17 · refused 0"; definitions "changed 4 · added 4 · unchanged 38 · refused 0 — 46 rows"; links "added 7 · changed 39 · unchanged 84 · refused 0 — 130 rows". Addendum (R18 locks · R19 processor removed · R20 reorder): definitions "changed 2 · deleted 1 · unchanged 43 · refused 0" (`model-phones` and `series-phones` gain the locks; `processor` is deleted); links "changed 33 · unlinked 1 · unchanged 96 · refused 0".
- **Operator rulings 2026-09-21 (Electronics cycle 2)** [memory, product-decisions]: phones get a model level under series for the six fleet brands, laptops stay at series; `release_year`, `screen_size-phones` and `cpu_family` created, no chipset select; every option list ordered by in-country popularity with "Other" last.
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 5. Electronics addendum — redelivery (row 47 fixed) and the R17 popularity addenda (Vehicles, Electronics)
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `932466e6-r17-change-note-2026-09-21.md` — note, 42 lines; 4,297 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** "Two deliveries in one note, imported in this order". (1) The corrected Electronics addendum: definitions "changed 2 · deleted 1 · unchanged 43 · refused 0 (as before)"; links "added 1 · changed 33 · unlinked 1 · unchanged 96 · refused 0". (2) R17 Vehicles: definitions "changed 10 · unchanged 25 · refused 0"; categories "changed 6 · unchanged 5 · refused 0". R17 Electronics: definitions "changed 12 · unchanged 33 · refused 0 — 45 rows (after the `processor` deletion)"; categories "changed 13 · unchanged 5 · refused 0".
- **Redelivery:** the note's title says row 47 of the Electronics addendum was fixed; what refused it is not stated in the lines read.
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 6. Cycle 3 — Real Estate — §8 completeness pass, with the R21 · R22 · R23 · R24 addendum
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `31adc062-real-estate-s8-change-note-2026-09-21.md` — note, 141 lines; 9,645 bytes; uploaded 2026-09-24 21:12
  - `50c7bb0e-real-estate-addendum-change-note-2026-09-21.md` — note, 43 lines; 4,112 bytes; uploaded 2026-09-24 21:12
  - `81149452-real-estate-s8-review-2026-09-21.md` — note, 65 lines; 8,882 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** change note (step 2): categories "changed 5 · unchanged 6 · refused 0"; definitions "changed 7 · added 1 · unchanged 21 · refused 0 — 29 rows"; links "added 4 · changed 85 · unchanged 3 · refused 0 — 92 rows; the 85 are the display-order rewrite plus the cells". Addendum (R21 rent terms · R22 room-scale leaves · R23 development conditionals · R24 commercial amenities): definitions "added 7 · changed 1 · deleted 2 · unchanged 26 · refused 0 — 36 rows"; links "added 18 · changed 15 · unlinked 9 · unchanged 68 · refused 0 — 110 rows".
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 7. "SUPERVISOR AUDIT 2026-09-21 — ADDENDA" — Electronics (E1–E7), Vehicles (V1–V6), Real Estate (R1–R5)
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `82ebe757-audit-addenda-change-note-2026-09-21.md` — note, 52 lines; 6,292 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** "Three deliveries, imported in this order. Each is built on that root's imported state (the R17 files and the accepted addenda)." Electronics: definitions "changed 2 · added 3 · unchanged 43 · refused 0 — 48 rows"; links "added 7 · changed 47 · unlinked 2 · unchanged 77 · refused 0 — 133 rows". Vehicles: definitions "changed 2 · added 3 · unchanged 33 · refused 0 — 38 rows"; links "added 5 · changed 15 · unchanged 54 · refused 0 — 74 rows". Real Estate: definitions "changed 4 · unchanged 30 · refused 0 — 34 rows"; links "added 2 · changed 15 · unchanged 86 · refused 0 — 103 rows".
- **Supervisor audit:** this delivery IS the curator's answer to a supervisor audit — "Supervisor audit: findings applied — every proposed ruling in `catalog-audit-2026-09-21.md` is in these files". That audit file is not in the uploads folder or the scratchpad. The operator's standing directive of 2026-09-21 — the supervisor reviews every category itself before he tests, and audits every delivery before import — is recorded in memory [ways-of-working].
- **Import result:** not in the sources read (chat before turn 836 not swept).

### 8. Cycle 4 — Construction Material — §8 completeness pass (review note; §9 pre-delivery audit, files re-issued)
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `91bdd3d9-construction-s9-audit-2026-09-21.md` — note, 63 lines; 5,318 bytes; uploaded 2026-09-24 21:12
  - `c6ce59e0-construction-s8-review-2026-09-21.md` — note, 75 lines; 10,360 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** review note (step 1) on "15 category rows (11 listing leaves + root + three surfacing rows …), 35 definitions, 60 links". The "§9 PRE-DELIVERY AUDIT (files re-issued)" note, for `construction-categories.csv`, `construction-definitions.csv`, `construction-links.csv` "as they will be imported": categories "changed 10 · unchanged 5 · refused 0"; definitions "changed 11 · unchanged 24 · refused 0"; links "added 10 · changed 39 · unchanged 11 · refused 0". No cycle-4 change note is in the folder.
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 9. Cycle 5 — Services — §8 completeness pass, and the re-issue (categories alignment · S1–S6)
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `8d3a7bd3-services-s8-review-2026-09-21.md` — note, 102 lines; 13,100 bytes; uploaded 2026-09-24 21:12
  - `b60a85f2-services-s8-change-note-2026-09-21.md` — note, 117 lines; 14,655 bytes; uploaded 2026-09-24 21:12
  - `f6383500-services-reissue-2026-09-21.md` — note, 46 lines; 5,122 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** change note (step 2): `services-categories.csv` "added 2 · changed 10 · unchanged 7 · refused 0" (Vehicle Services, `secondary_parents = vehicles`; Construction Contractors & Trades, `secondary_parents = construction`); `services-definitions.csv` "changed 15 · added 4 · deleted 1 · unchanged 5 · refused 0 — 25 rows"; `services-links.csv` (pass 1) "added 59 · changed 18 · unlinked 4 · unchanged 40 · refused 0 — 119 rows"; `services-links-pass2.csv` "added 2 · refused 0". RE-ISSUE ("One re-issue of the whole batch; the O1 delta is a separate file for after the batch lands"): categories "added 2 · changed 10 · unchanged 7 · refused 0" (the two create rows re-cut to the 21-column header); definitions "changed 15 · added 8 · deleted 1 · unchanged 5 · refused 0 — 29 rows"; links pass 1 "added 61 · changed 18 · unlinked 4 · unchanged 40 · refused 0 — 117 rows"; pass 2 "added 6 · refused 0".
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 10. Cycle 6 — Home & Garden — §8 completeness pass
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `17749107-home-garden-s8-review-2026-09-21.md` — note, 76 lines; 8,485 bytes; uploaded 2026-09-24 21:12
  - `3c705928-home-garden-s8-change-note-2026-09-21.md` — note, 92 lines; 9,855 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** categories "changed 4 · unchanged 5 · refused 0"; definitions "changed 10 · added 9 · unchanged 13 · refused 0 — 32 rows"; links "added 9 · changed 26 · unchanged 17 · refused 0 — 52 rows".
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 11. Cycle 7 — Fashion — §8 completeness pass
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `135b15c9-fashion-s8-review-2026-09-21.md` — note, 79 lines; 8,435 bytes; uploaded 2026-09-24 21:12
  - `88d5c013-fashion-s8-change-note-2026-09-21.md` — note, 109 lines; 12,504 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** categories "changed 6 · unchanged 5 · refused 0"; definitions "changed 13 · added 5 · unchanged 4 · refused 0 — 22 rows; `size` absent" (the review note: `size` is shape-locked and "stays out of every file until INC-254"); links "added 25 · changed 25 · unlinked 1 · unchanged 31 · refused 0 — 82 rows".
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 12. Cycle 8 — Babies & Kids — §8 completeness pass, with the addendum (B1 · B2 · O3) and the Fashion delta (O2)
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `03222976-babies-kids-addendum-note-2026-09-21.md` — note, 13 lines; 1,979 bytes; uploaded 2026-09-24 21:12
  - `2150869a-babies-kids-s8-change-note-2026-09-21.md` — note, 104 lines; 12,946 bytes; uploaded 2026-09-24 21:12
  - `f7e7309a-babies-kids-s8-review-2026-09-21.md` — note, 70 lines; 6,800 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** change note: categories "added 3 · changed 4 · unchanged 4 · refused 0" (Health, Safety & Sleep; School & Learning; Maternity & Nursing); definitions "changed 5 · added 10 · unchanged 9 · refused 0 — 24 rows"; links (pass 1) "added 27 · changed 20 · unlinked 1 · unchanged 7 · refused 0 — 55 rows"; links (pass 2) "added 4 · refused 0". Addendum: `babies-kids-definitions-addendum.csv` "added 2 · changed 1 · unchanged 31 · refused 0" (`stroller_type`, `pump_type`); `babies-kids-links-addendum.csv` "added 2 · changed 11 · unchanged 56 · refused 0"; `fashion-definitions-addendum.csv` "changed 1 · unchanged 25 · refused 0".
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 13. Cycle 9 — Beauty & Personal Care — §8 completeness pass
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `29ac0768-beauty-s8-change-note-2026-09-21.md` — note, 92 lines; 12,453 bytes; uploaded 2026-09-24 21:12
  - `f6a2900b-beauty-s8-review-2026-09-21.md` — note, 71 lines; 10,453 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** categories "changed 9 · unchanged 3 · refused 0"; definitions "changed 11 · added 13 · unchanged 18 · refused 0 — 42 rows"; links "added 30 · changed 58 · unlinked 5 · unchanged 1 · refused 0 — 94 rows". The review note: "§9.1 on the exports: 0 findings — the first root to arrive clean".
- **Operator rulings 2026-09-21 (Beauty cycle 9 and Agriculture cycle 10)** [memory, product-decisions]: only card attributes are required on any leaf and every other row is optional; expiry is optional everywhere and is never asked of fragrances; an original-or-not seller's statement sits on the counterfeit-prone beauty leaves.
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 14. Cycle 10 — Agriculture & Farming — §8 completeness pass
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `84559ac0-agriculture-s8-change-note-2026-09-21.md` — note, 98 lines; 13,319 bytes; uploaded 2026-09-24 21:12
  - `f59a45b4-agriculture-s8-review-2026-09-21.md` — note, 76 lines; 9,102 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** `home-garden-definitions-power-source-delta.csv` (import first) "changed 1 · refused 0"; categories "changed 4 · unchanged 6 · refused 0"; definitions "changed 14 · added 11 · unchanged 10 · refused 0 — 35 rows"; links "added 25 · changed 26 · unchanged 10 · refused 0 — 61 rows". "Import unfiltered (Heavy Machinery surfaces here)."
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 15. Cycle 11 — Commercial Equipment — §8 completeness pass (review note only)
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `d47e0222-commercial-s8-review-2026-09-21.md` — note, 96 lines; 14,159 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** review note (step 1) only. No cycle-11 change note is in the folder, so no expected previews are on record here.
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 16. Cycle 11b — Construction & machinery boundary (review note, then the batch of five deltas)
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `019a0689-11b-batch-and-sports-s8-change-note-2026-09-21.md` — note, 99 lines; 11,836 bytes; uploaded 2026-09-24 21:12
  - `01f6dbb8-construction-machinery-boundary-11b-2026-09-21.md` — note, 115 lines; 9,796 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** review note, then part A of the "11b batch and Sports" note — "THE BATCH (five deltas)", rulings B1–B5: `construction-definitions-11b-delta.csv` "changed 14 · refused 0"; `construction-links-11b-delta.csv` "changed 5 · refused 0"; `number-fields-help-delta.csv` "changed 8 · refused 0"; `commercial-links-11b-delta.csv` "changed 103 · refused 0"; `vehicles-definitions-11b-delta.csv` "changed 1 · refused 0". The note states "Supervisor audit: pending."
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 17. Cycle 12 — Sports & Leisure — §8 completeness pass
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `019a0689-11b-batch-and-sports-s8-change-note-2026-09-21.md` — note, 99 lines; 11,836 bytes; uploaded 2026-09-24 21:12
  - `e20def6d-sports-s8-review-2026-09-21.md` — note, 81 lines; 10,867 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** review note, then part B of the "11b batch and Sports" note: categories "changed 7 · unchanged 3"; definitions "changed 13 · added 8 · unchanged 10 — 31 rows"; links (pass 1) "added 12 · changed 17 · unchanged 15 — 44 rows"; links (pass 2) "added 8 · changed 1".
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 18. Cycle 13 — Pets & Animals — §8 completeness pass, and the Pets walk colour files
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `18124187-travel-s8-change-note-2026-09-21.md` — note, 97 lines; 9,533 bytes; uploaded 2026-09-24 21:12
  - `f8f8a4b7-pets-s8-change-note-2026-09-21.md` — note, 107 lines; 10,659 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** change note: categories "changed 2 · unchanged 6"; definitions "changed 9 · added 9 · unchanged 14 — 32 rows"; links (pass 1) "added 19 · changed 26 · unchanged 3 — 48 rows"; links (pass 2) "added 2" (`hand_tamed`, `talks`); `pricing-type-help-delta.csv` "changed 1"; plus `agriculture-livestock-type-boundary-delta.csv`. "Import unfiltered". Part A of the Travel note ("Pets walk"): `pets-color-definitions-pass1.csv` "added 1" (`pet_color-dogs-cats`); `pets-color-links-pass2.csv` "added 1". No cycle-13 review note is in the folder.
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 19. Cycle 14 — Travel & Accommodation — §8 completeness pass
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `18124187-travel-s8-change-note-2026-09-21.md` — note, 97 lines; 9,533 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** part B of the Travel note: categories "changed 6 · unchanged 4"; definitions "changed 14 · added 10 · unchanged 16 — 40 rows; the seven Vehicles definitions in this export untouched"; links "added 23 · changed 39 · unchanged 5 — 67 rows". No cycle-14 review note is in the folder.
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 20. Cycle 15 — Food & Beverages — §8 completeness pass
- **Date:** 2026-09-21 (file names).
- **Files:**
  - `41a6e7dd-food-s8-change-note-2026-09-21.md` — note, 61 lines; 11,208 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** categories "added 1 · changed 9 · unchanged 3" (`baby-food` created with `secondary_parents = babies-kids`; Packaged & Imported `parent_slug → food-drink`); definitions "changed 16 · added 7 · unchanged 9 — 32 rows"; links (pass 1) "added 62 · changed 38 · unlinked 1 · unchanged 33 — 134 rows"; links (pass 2) "added 13"; `agriculture-produce-type-boundary-delta.csv` "changed 1". "Import unfiltered". No cycle-15 review note is in the folder.
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 21. Cycle 16 — "Other" leaves and findability: the categories file, the cross-root adjacency batch (15 links files), two definitions deltas
- **Date:** 2026-09-22 (file names).
- **Files:**
  - `34c1bc1b-cycle-16-review-2026-09-22.md` — note, 144 lines; 12,848 bytes; uploaded 2026-09-24 21:12
  - `c82e48da-cycle-16-change-note-2026-09-22.md` — note, 72 lines; 6,303 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** review note ("Walk delta (three files) · §9.1 adjacency report · CYCLE 16 — OTHER + FINDABILITY"; basis "All-categories export `categories__1_.csv` (12:24, 163 rows, 15 roots)"). Change note ("Rulings D1–D5 and the executor's census applied"): `categories-cycle16.csv` "changed 48 · unchanged 115 · refused 0"; `color-silver-delta.csv` "changed 1"; files 3–17 `adjacency-<root>-links.csv` ×15 ("0 findings on all 15").
- **Operator rulings after the cycle-16 walk** [memory, product-decisions, "Form-economy rulings 2026-09-22"]: a field fully settled by the seller's choice is not asked at all (single-value allowed, R21); every root's Other leaf must be a clickable posting target (D34); colour lists must be realistic per product.
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 22. R21 — "lock certain facts": cross-root definitions deltas, colour gold and the phone/laptop colour scopes
- **Date:** 2026-09-22 (file names).
- **Files:**
  - `49d80f8a-r21-change-note-2026-09-22.md` — note, 24 lines; 4,923 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried (expected previews as the note states them):** one definitions file per root, each "the definition's current row with only the `allowed`/`bounds` cells added" — `r21-agriculture-farming-definitions.csv` "changed 5"; `r21-construction-definitions.csv` "changed 1"; `r21-commercial-equipment-definitions.csv` "changed 7"; `r21-sports-leisure-definitions.csv` "changed 3"; `r21-fashion-definitions.csv` "changed 1"; `r21-babies-kids-definitions.csv` "changed 2"; `r21-vehicles-definitions.csv` "changed 2"; `r21-electronics-definitions.csv` "changed 1"; `r21-real-estate-definitions.csv` "changed 1"; `r21-food-drink-definitions.csv` "changed 5"; `color-gold-pass1.csv` "changed 1"; `electronics-color-scope-pass2.csv` "added 2 · changed 1".
- **Later statement:** spec-ledger:1510 — cycle 20's files 8–9 "were built on an 'R21 display pass' that had never been imported — confirmed absent by the fresh export". Whether that pass is part of this delivery is not stated.
- **Supervisor audit / import result:** not in the sources read for this record (the supervisor chat before turn 836 was not swept); spec-ledger:1489 records the cycle-1 … cycle-17 passes as run.

### 23. Cycle 17 — re-check of Vehicles · Electronics · Real Estate under §8/§9/§10
- **Date:** 2026-09-24 (file names).
- **Files:**
  - `0c268bf3-cycle-17-change-note-2026-09-24.md` — note, 79 lines; 8,027 bytes; uploaded 2026-09-24 21:12
  - `ed1fd37f-cycle-17-review-2026-09-24.md` — note, 119 lines; 12,039 bytes; uploaded 2026-09-24 21:12
  (Notes only. The CSV files named in these notes are not in the uploads folder; the notes were bulk-restored on 2026-09-24 21:12, so the date is the one in each file name.)
- **What it carried:** three review notes (step 1) on the "exports of 00:47", then the change note (step 2), "Rulings V-D1–3, E-D1–3, R-D1–3 applied … Import waits on the executor". Vehicles: definitions "changed 4 · added 2 · unchanged 35", links "changed 15 · added 9 · unchanged 51" ("49 checks · 0 findings"). Electronics: definitions "changed 2 · added 9 · unchanged 46", links "changed 1 · added 15 · unchanged 125" ("71 checks · 0 findings"). Real Estate: definitions "changed 1 · unchanged 37", links "changed 23 · added 1 · unchanged 83" ("48 checks · 0 findings").
- **Supervisor audit / import result:** not in the sources read (chat before turn 836 not swept); spec-ledger:1489 lists cycle 17 as run.

### 24. Cycle 18 · batch 1 — §10 seller-view re-check: Fashion, Home & Garden, Services
- **Date:** 2026-09-24 (file names; the files were bulk-restored 2026-09-24 21:12). Cycle 18 is "the §10 seller-view re-check of the twelve pre-§10 roots", in batches [spec-ledger:1489; memory: "the twelve roots curated before §10 get a §10 seller-view re-check (cycle 18) in batches"].
- **Files:**
  - `045f38ab-c18-home-garden-definitions-aliases.csv` — 22 data rows (wc -l 23); 34,725 bytes; uploaded 2026-09-24 21:12; definitions format
  - `3a2285c0-c18-services-definitions-aliases.csv` — 22 data rows (wc -l 23); 39,814 bytes; uploaded 2026-09-24 21:12; definitions format
  - `3b3bd354-c18-fashion-definitions-aliases.csv` — 19 data rows (wc -l 20); 25,990 bytes; uploaded 2026-09-24 21:12; definitions format
  - `3cf59b14-c18-services-review-note-2026-09-24.md` — note, 308 lines; 48,824 bytes; uploaded 2026-09-24 21:12
  - `438b2e0e-c18-home-garden-change-note-2026-09-24.md` — note, 162 lines; 22,875 bytes; uploaded 2026-09-24 21:12
  - `60bd75a8-c18-fashion-review-note-2026-09-24.md` — note, 217 lines; 34,978 bytes; uploaded 2026-09-24 21:12
  - `60db0eba-c18-fashion-links-pass2.csv` — 2 data rows (wc -l 3); 426 bytes; uploaded 2026-09-24 21:12; links format, no action column
  - `659c3f78-c18-services-definitions.csv` — 30 data rows (wc -l 31); 34,831 bytes; uploaded 2026-09-24 21:12; definitions format
  - `6bb80a4c-c18-services-links-pass2.csv` — 3 data rows (wc -l 4); 624 bytes; uploaded 2026-09-24 21:12; links format, no action column
  - `77213aa8-c18-home-garden-links.csv` — 58 data rows (wc -l 59); 6,087 bytes; uploaded 2026-09-24 21:12; links format + action
  - `7806ac62-c18-services-links.csv` — 125 data rows (wc -l 126); 15,357 bytes; uploaded 2026-09-24 21:12; links format + action
  - `8327e157-c18-fashion-change-note-2026-09-24.md` — note, 222 lines; 32,593 bytes; uploaded 2026-09-24 21:12
  - `a78767fb-c18-fashion-definitions.csv` — 28 data rows (wc -l 29); 48,783 bytes; uploaded 2026-09-24 21:12; definitions format
  - `b268c586-c18-services-change-note-2026-09-24.md` — note, 295 lines; 47,192 bytes; uploaded 2026-09-24 21:12
  - `d1c777a9-c18-home-garden-review-note-2026-09-24.md` — note, 158 lines; 24,988 bytes; uploaded 2026-09-24 21:12
  - `d4eac4e4-c18-fashion-links.csv` — 88 data rows (wc -l 89); 8,967 bytes; uploaded 2026-09-24 21:12; links format + action
  - `f0b3011c-c18-home-garden-definitions.csv` — 36 data rows (wc -l 37); 34,008 bytes; uploaded 2026-09-24 21:12; definitions format
- **What it carried (change notes, step 2):** Fashion — `c18-fashion-definitions.csv` "added 2 · changed 13 · unchanged 13"; `-definitions-aliases.csv` "changed 19"; `-links.csv` "added 7 · changed 10 · unchanged 71"; `-links-pass2.csv` "changed 2" (INC-252). Home & Garden — definitions "added 4 · changed 9 · unchanged 23"; aliases "changed 22"; links "added 9 · changed 12 · unlinked 1 · unchanged 36". Services — definitions "added 3 · changed 7 · unchanged 20"; aliases "changed 22 (added 0)"; links "added 15 · changed 5 · unlinked 1 · unchanged 104"; pass 2 "changed 3". No categories file. Each root also has a step-1 review note.
- **Supervisor audit:** scratchpad scripts `audit18.py`, `audit18b.py`, `dump18.py` and outputs `fa.txt`, `hg.txt` (dated 2026-09-24 21:18–21:24) belong to this batch; the audit verdict itself is in the chat before turn 836, not swept.
- **Import result** [spec-ledger:1489]: "batch 1 (Services, Home & Garden, Clothing & Shoes) imported 2026-09-24 with seven follow-up files". INC-279 [incidental-findings.md]: "the cycle-18 batch-1 Home & Garden definitions file created `delivery_available` as a new key while a Travel definition of that key existed; the import overwrote it (preview 3 added / 10 changed vs the stated 4 / 9). Fix: the batch-1 follow-up file restated the row at final content. Class rule: every new key AND every restated shared row is checked against the UNFILTE[RED export]".
- **Walk rulings 2026-09-24 (after the batch-1 imports)** [memory, product-decisions]: D41 — every row open, no "More details" fold; R22 — similar items sit together in every option list; attributes ranked by importance to the item; service area (km) removed from Services (D42); the Fashion root relabelled "Clothing & Shoes" / ልብስና ጫማ (D43; slug `fashion` kept).

### 25. Cycle 18 · batch 1 follow-ups ("c18-b1-followups") and the batch-2 review notes
- **Date:** 2026-09-25 (uploaded 00:09 ET).
- **Files:**
  - `01936a49-c18-b1-followups-fashion-links-pass3.csv` — 1 data rows (wc -l 2); 319 bytes; uploaded 2026-09-25 00:09; links format, no action column
  - `29edb8ee-c18-b1-followups-services-links.csv` — 14 data rows (wc -l 15); 2,017 bytes; uploaded 2026-09-25 00:09; links format + action
  - `3e4a0985-c18-b1-followups-home-garden-definitions.csv` — 9 data rows (wc -l 10); 19,027 bytes; uploaded 2026-09-25 00:09; definitions format
  - `5087ff85-c18-beauty-review-note-2026-09-25.md` — note, 225 lines; 33,653 bytes; uploaded 2026-09-25 00:09
  - `7072b8ee-c18-b1-followups-categories.csv` — 1 data rows (wc -l 2); 443 bytes; uploaded 2026-09-25 00:09; categories format
  - `73fe0180-c18-agriculture-review-note-2026-09-25.md` — note, 185 lines; 29,660 bytes; uploaded 2026-09-25 00:09
  - `7dde8fe4-c18-babies-kids-review-note-2026-09-25.md` — note, 190 lines; 26,894 bytes; uploaded 2026-09-25 00:09
  - `b40ae215-c18-b1-followups-change-note-2026-09-25.md` — note, 43 lines; 8,455 bytes; uploaded 2026-09-25 00:09
  - `bce0e7f7-c18-b1-followups-services-definitions.csv` — 14 data rows (wc -l 15); 30,853 bytes; uploaded 2026-09-25 00:09; definitions format
  - `d730c208-c18-b1-followups-fashion-definitions.csv` — 7 data rows (wc -l 8); 16,563 bytes; uploaded 2026-09-25 00:09; definitions format
  - `f785b36c-c18-b1-followups-home-garden-links.csv` — 18 data rows (wc -l 19); 2,310 bytes; uploaded 2026-09-25 00:09; links format + action
- **Base (note):** "the batch-1 final state (the delivered files as imported; previews matched) — partial files, changed rows only; absence never deletes".
- **What it carried (change note):** seven files — categories "changed 1" (root `fashion` renamed "Clothing & Shoes" / "ልብስና ጫማ", D43); Home & Garden definitions "changed 8 · unchanged 1" (R22 order on 8 lists; `delivery_available` restated, INC-279); Home & Garden links "changed 11 · unchanged 6 · unlinked 1" (Home Appliances re-cut + `room` unlink); Services definitions "changed 14"; Services links "unlinked 14" (`service_area_km` at all 14 leaves, D42); Fashion definitions "changed 7" (`size` gains `one_size`); Fashion links pass 3 "changed 1". With it: the step-1 review notes for batch 2 (Babies & Kids, Agriculture & Farming, Beauty & Personal Care).
- **Supervisor audit:** scratchpad script `audit18f.py` (2026-09-25 00:12). Verdict in the chat before turn 836, not swept.
- **Import result:** counted in spec-ledger:1489 as the "seven follow-up files" of batch 1. Pasted console lines are not in the sources read.

### 26. Cycle 18 · batch 2 — Babies & Kids, Beauty & Personal Care, Agriculture & Farming, plus the batch-2 addenda (HG-17 · FA-20 · FA-21 · SV-15)
- **Date:** 2026-09-25 (uploaded 01:54 ET).
- **Files:**
  - `218165c6-c18-babies-kids-definitions.csv` — 30 data rows (wc -l 31); 33,573 bytes; uploaded 2026-09-25 01:54; definitions format
  - `224ec09f-c18-babies-kids-links.csv` — 65 data rows (wc -l 66); 7,778 bytes; uploaded 2026-09-25 01:54; links format + action
  - `3082d5a2-c18-beauty-links.csv` — 86 data rows (wc -l 87); 12,151 bytes; uploaded 2026-09-25 01:54; links format + action
  - `4aeb723a-c18-b2-addenda-home-garden-definitions.csv` — 2 data rows (wc -l 3); 16,775 bytes; uploaded 2026-09-25 01:54; definitions format
  - `4de2e61e-c18-b2-addenda-fashion-definitions.csv` — 1 data rows (wc -l 2); 11,149 bytes; uploaded 2026-09-25 01:54; definitions format
  - `58dde073-c18-beauty-change-note-2026-09-25.md` — note, 204 lines; 31,257 bytes; uploaded 2026-09-25 01:54
  - `5981d63d-c18-agriculture-links-pass2.csv` — 2 data rows (wc -l 3); 505 bytes; uploaded 2026-09-25 01:54; links format, no action column
  - `676e9d1b-c18-b2-addenda-change-note-2026-09-25.md` — note, 53 lines; 6,369 bytes; uploaded 2026-09-25 01:54
  - `70a6c39a-c18-babies-kids-links-pass2.csv` — 1 data rows (wc -l 2); 372 bytes; uploaded 2026-09-25 01:54; links format, no action column
  - `75130978-c18-b2-addenda-real-estate-links.csv` — 1 data rows (wc -l 2); 294 bytes; uploaded 2026-09-25 01:54; links format + action
  - `a8b88a26-c18-agriculture-definitions-aliases.csv` — 18 data rows (wc -l 19); 29,258 bytes; uploaded 2026-09-25 01:54; definitions format
  - `aa14d353-c18-beauty-definitions.csv` — 43 data rows (wc -l 44); 46,305 bytes; uploaded 2026-09-25 01:54; definitions format
  - `ab6ed67e-c18-agriculture-change-note-2026-09-25.md` — note, 168 lines; 25,755 bytes; uploaded 2026-09-25 01:54
  - `ae78ccfd-c18-babies-kids-definitions-aliases.csv` — 15 data rows (wc -l 16); 20,004 bytes; uploaded 2026-09-25 01:54; definitions format
  - `c5563a32-c18-b2-addenda-fashion-links.csv` — 1 data rows (wc -l 2); 322 bytes; uploaded 2026-09-25 01:54; links format, no action column
  - `cc3fb13f-c18-beauty-definitions-aliases.csv` — 25 data rows (wc -l 26); 30,131 bytes; uploaded 2026-09-25 01:54; definitions format
  - `dc0d8012-c18-babies-kids-change-note-2026-09-25.md` — note, 175 lines; 25,216 bytes; uploaded 2026-09-25 01:54
  - `e20eac58-c18-agriculture-definitions.csv` — 44 data rows (wc -l 45); 59,200 bytes; uploaded 2026-09-25 01:54; definitions format
  - `e3ff78c2-c18-beauty-links-pass2.csv` — 2 data rows (wc -l 3); 513 bytes; uploaded 2026-09-25 01:54; links format, no action column
  - `ee12fb2f-c18-agriculture-links.csv` — 63 data rows (wc -l 64); 8,886 bytes; uploaded 2026-09-25 01:54; links format + action
- **What it carried (change notes):** Agriculture — definitions "added 2 · changed 10 · unchanged 32" (`horsepower_hp`, `with_calf` new; `per_feresula`); aliases "changed 18"; links "added 1 · changed 13 · unlinked 2 · unchanged 47"; pass 2 "added 1 · changed 1". Babies & Kids — definitions "changed 9 · unchanged 21"; aliases "changed 15"; links "added 2 · changed 25 · unchanged 38"; pass 2 "changed 1". Beauty — definitions "added 1 · changed 9 · unchanged 33" (`hair_grade` new); aliases "changed 25"; links "added 2 · changed 27 · unchanged 57"; pass 2 "changed 2". Addenda (built on "the unfiltered definitions (475) and links (1,339) exports") — Home & Garden definitions "changed 2" (R24 per-identity brand narrowing); Fashion definitions "changed 1"; Fashion links "changed 1"; Real Estate links "unlinked 1" (`realtor-services / service_area_km`).
- **Supervisor audit:** scratchpad scripts `audit18c.py`, `audit18c_v2.py`, `audit18d.py` (2026-09-25 01:56–02:04). Verdict in the chat before turn 836, not swept.
- **Import result** [spec-ledger:1489]: "batch 2 (Babies & Kids, Beauty & Personal Care, Agriculture & Farming) plus a four-file addenda set imported 2026-09-25 (16 files, every preview as expected; Babies file 1 corrected by dropping two stale echo rows — INC-279 class)".
- **Walk rulings 2026-09-25 (cycle-18 batch 2)** [memory, product-decisions]: expiry-year pickers must offer roughly last year through five years ahead; sellers may need an Ethiopian-calendar expiry; a settled fact (dairy cow → female, ox → work) must not show on the form (D44).

### 27. Cycle 18 · batch 3 — §10 re-check: review notes (step 1) for Pets & Animals, Sports & Leisure, Commercial Equipment
- **Date:** 2026-09-25 (uploaded 10:34 ET).
- **Files:**
  - `00b52b5c-c18-commercial-review-note-2026-09-25.md` — note, 259 lines; 45,380 bytes; uploaded 2026-09-25 10:34
  - `04307608-c18-pets-review-note-2026-09-25.md` — note, 133 lines; 18,328 bytes; uploaded 2026-09-25 10:34
  - `360aefa5-c18-sports-review-note-2026-09-25.md` — note, 165 lines; 24,398 bytes; uploaded 2026-09-25 10:34
- **What they carried (opening line of each note):** Pets — inputs "pets-animals-definitions.csv (41 definitions), pets-animals-links.csv (50 rows, 6 listing leaves)"; "Pre-review §9.1 audit of the export: 1 finding — Fish & Aquariums has one unconditional card". Sports — "(43 definitions) … (52 rows, 8 listing leaves + root)"; "Pre-review §9.1 audit of the export: pass (0 findings, 0 notes)". Commercial — "(49 definitions) … (126 rows, 10 listing leaves + root), unfiltered definitions (478) and links (1,343) exports"; "Pre-review §9.1 audit of the export: pass with 7 notes". "No file edits in this step."
- **Supervisor rulings / import result:** review notes carry no import. The rulings on them are in the chat before turn 836, not swept; the change notes of 11:00 list the rulings applied (D-CE1 … CE-8; PT-1 … PT-7; D-SP1, D-SP2, SP-1 … SP-10; SV-15).

### 28. Cycle 18 · batch 3 — Commercial Equipment, Sports & Leisure, Pets & Animals, plus the batch-3 addenda (X-1, BE-15) and the delete pass
- **Date:** 2026-09-25 (files and change notes uploaded 11:00 ET; the review notes came at 10:34, previous entry).
- **Files:**
  - `317cb473-c18-pets-links.csv` — 50 data rows (wc -l 51); 5,805 bytes; uploaded 2026-09-25 11:00; links format + action
  - `38222107-c18-commercial-change-note-2026-09-25.md` — note, 246 lines; 43,095 bytes; uploaded 2026-09-25 11:00
  - `3b1e8fa8-c18-sports-definitions-aliases.csv` — 15 data rows (wc -l 16); 20,269 bytes; uploaded 2026-09-25 11:00; definitions format
  - `481c5f5a-c18-pets-definitions-aliases.csv` — 12 data rows (wc -l 13); 14,656 bytes; uploaded 2026-09-25 11:00; definitions format
  - `5cbbe06d-c18-sports-change-note-2026-09-25.md` — note, 149 lines; 22,228 bytes; uploaded 2026-09-25 11:00
  - `67913c73-c18-b3-addenda-definitions.csv` — 2 data rows (wc -l 3); 2,382 bytes; uploaded 2026-09-25 11:00; definitions format
  - `6fe688b7-c18-pets-definitions.csv` — 1 data rows (wc -l 2); 2,135 bytes; uploaded 2026-09-25 11:00; definitions format
  - `8182646a-c18-commercial-definitions-aliases.csv` — 11 data rows (wc -l 12); 10,224 bytes; uploaded 2026-09-25 11:00; definitions format
  - `9bdea1c0-c18-b3-addenda-and-delete-note-2026-09-25.md` — note, 27 lines; 2,777 bytes; uploaded 2026-09-25 11:00
  - `b5335930-c18-pets-change-note-2026-09-25.md` — note, 134 lines; 18,590 bytes; uploaded 2026-09-25 11:00
  - `c8c7972c-c18-sports-links.csv` — 51 data rows (wc -l 52); 7,222 bytes; uploaded 2026-09-25 11:00; links format + action
  - `ded6c53c-c18-sports-definitions.csv` — 8 data rows (wc -l 9); 16,444 bytes; uploaded 2026-09-25 11:00; definitions format
  - `e17149b0-c18-commercial-definitions.csv` — 11 data rows (wc -l 12); 32,445 bytes; uploaded 2026-09-25 11:00; definitions format
  - `e292f82e-c18-b3-delete-definitions.csv` — 2 data rows (wc -l 3); 1,125 bytes; uploaded 2026-09-25 11:00; definitions format + action
  - `f3bc6591-c18-commercial-links.csv` — 127 data rows (wc -l 128); 23,304 bytes; uploaded 2026-09-25 11:00; links format + action
- **What it carried (change notes):** Commercial — `c18-commercial-definitions.csv` (partial) "added 1 · changed 10" (`print_format` new); aliases "changed 11"; links "added 3 · changed 74 · unlinked 1 · unchanged 49". Pets — definitions (partial) "changed 1"; aliases "changed 12"; links "changed 5 · unlinked 1 · unchanged 44". Sports — definitions (partial) "changed 8"; aliases "changed 15"; links "added 7 · changed 23 · unlinked 2 · unchanged 19". Addenda: `c18-b3-addenda-definitions.csv` "changed 2" (`expiry_year` min `year-1`, max `year+5`; `hair_length_in` labels with both units); `c18-b3-delete-definitions.csv` — LAST — "deleted 2" (`service_area_km` and `horsepower` with `action=delete`).
- **Supervisor audit:** scratchpad script `audit18e.py` (2026-09-25 11:07). Verdict in the chat before turn 836, not swept.
- **Import result:** spec-ledger:1489 (written 2026-09-25) says only "batch 3 (Commercial Equipment, Sports & Leisure, Pets & Animals) chartered". A walk ruling dated 2026-09-26 is recorded as "(cycle-18 batch-3 walk)" [memory, product-decisions: D46 — when a listing's identity is changed all fields must refresh; refined as D47], and the batch-4 addenda cite "the batch-3 standing rule", so the batch was imported by 2026-09-26; the pasted console lines are not in the sources read.

### 29. Cycle 18 · batch 4 — §10 re-check: review notes (step 1) for Construction Material, Travel & Accommodation, Food & Beverages
- **Date:** 2026-09-26 (uploaded 05:38 ET).
- **Files:**
  - `17dbe8d2-c18-travel-review-note-2026-09-26.md` — note, 170 lines; 35,239 bytes; uploaded 2026-09-26 05:38
  - `b70605a2-c18-food-review-note-2026-09-26.md` — note, 281 lines; 59,180 bytes; uploaded 2026-09-26 05:38
  - `d79cc821-c18-construction-review-note-2026-09-26.md` — note, 217 lines; 34,564 bytes; uploaded 2026-09-26 05:38
- **What they carried (opening line of each note):** Construction — inputs "construction-definitions.csv (44 definitions), construction-links.csv (73 rows, 12 listing leaves + root), unfiltered definitions (477) and links (1,339)"; "Pre-review §9.1 audit of the export …: pass (0 findings, 0 notes)". Travel — "(42 definitions incl. the Vehicles-owned … ), travel-links.csv (67 rows, 9 listing leaves + root)"; "Pre-review §9.1 audit …: 212 findings, all one inert class". Food — "(34 definitions) … (160 rows, 12 listing leaves + root)"; "pass (0 findings, 0 notes; X-1 `expiry_year` bounds year-1 … year+5 landed ✓)". "No file edits in this step."
- **Supervisor rulings / import result:** review notes carry no import. The rulings are in the chat before turn 836, not swept; the change notes of 10:16 list the rulings applied (D-CM1 … D-CM3; D-FD1 … D-FD3; D-TR1 and the standing rules).

### 30. Cycle 18 · batch 4 — Construction Material, Food & Beverages, Travel & Accommodation, plus the batch-4 addenda (Vehicles · Agriculture · Pets)
- **Date:** 2026-09-26 (files and change notes uploaded 10:16 ET; the review notes came at 05:38, previous entry). (The operator's exports attached at 05:48 ET — `construction-*`, `food-drink-*`, `travel-*`, `definitions.csv`, `links.csv` — are in the folder too; see Part 5.)
- **Files:**
  - `32dd9f08-c18-construction-links.csv` — 80 data rows (wc -l 81); 11,257 bytes; uploaded 2026-09-26 10:16; links format + action
  - `33c8a710-c18-food-links.csv` — 161 data rows (wc -l 162); 19,426 bytes; uploaded 2026-09-26 10:16; links format + action
  - `485b82a6-c18-food-change-note-2026-09-26.md` — note, 299 lines; 54,744 bytes; uploaded 2026-09-26 10:16
  - `4c788abb-c18-construction-change-note-2026-09-26.md` — note, 224 lines; 33,656 bytes; uploaded 2026-09-26 10:16
  - `4fc41887-c18-b4-addenda-agriculture-definitions-aliases.csv` — 1 data rows (wc -l 2); 5,305 bytes; uploaded 2026-09-26 10:16; definitions format
  - `57811611-c18-food-links-pass2.csv` — 15 data rows (wc -l 16); 2,387 bytes; uploaded 2026-09-26 10:16; links format, no action column
  - `6b578a56-c18-b4-addenda-vehicles-definitions.csv` — 1 data rows (wc -l 2); 907 bytes; uploaded 2026-09-26 10:16; definitions format
  - `710708e0-c18-b4-addenda-vehicles-links.csv` — 9 data rows (wc -l 10); 1,208 bytes; uploaded 2026-09-26 10:16; links format + action
  - `745cbfd7-c18-travel-change-note-2026-09-26.md` — note, 188 lines; 28,764 bytes; uploaded 2026-09-26 10:16
  - `785d8ac8-c18-construction-definitions.csv` — 15 data rows (wc -l 16); 29,497 bytes; uploaded 2026-09-26 10:16; definitions format
  - `9848f9bb-c18-b4-addenda-pets-links.csv` — 1 data rows (wc -l 2); 335 bytes; uploaded 2026-09-26 10:16; links format, no action column
  - `9b74dd69-c18-travel-definitions.csv` — 12 data rows (wc -l 13); 21,525 bytes; uploaded 2026-09-26 10:16; definitions format
  - `ae1e9c7b-c18-construction-definitions-aliases.csv` — 20 data rows (wc -l 21); 44,899 bytes; uploaded 2026-09-26 10:16; definitions format
  - `b557cacd-c18-food-definitions-aliases.csv` — 12 data rows (wc -l 13); 16,105 bytes; uploaded 2026-09-26 10:16; definitions format
  - `bc7f0cd5-c18-travel-definitions-aliases.csv` — 16 data rows (wc -l 17); 18,817 bytes; uploaded 2026-09-26 10:16; definitions format
  - `d4a11a73-c18-travel-links.csv` — 67 data rows (wc -l 68); 8,957 bytes; uploaded 2026-09-26 10:16; links format + action
  - `dbdeec41-c18-b4-addenda-change-note-2026-09-26.md` — note, 18 lines; 4,276 bytes; uploaded 2026-09-26 10:16
  - `e2831b78-c18-food-definitions.csv` — 12 data rows (wc -l 13); 31,263 bytes; uploaded 2026-09-26 10:16; definitions format
- **What it carried (change notes):** Construction — definitions (partial) "added 3 · changed 12" (`aggregate_type`, `tile_grade`, `battery_ah` new); aliases "changed 20"; links "added 7 · changed 18 · unlinked 1 · unchanged 54". Food — definitions (partial) "changed 12" (`brand-food` +17 options; `instant`; `energy_drink`); aliases "changed 12 (or fewer if the importer sees no delta on rows already at final content)"; links "added 1 · changed 35 · unchanged 125"; pass 2 "added 1 · changed 14". Travel — definitions (partial) "changed 12"; aliases "changed 16"; links "changed 1 · unlinked 1 · unchanged 65". Addenda (built on "the unfiltered definitions (477) and links (1,339) exports"; import after the three root sets): Vehicles definitions "changed 1" (`drive_type` RWD Amharic label); Vehicles links "changed 9" (orders only); Agriculture `produce_item` aliases "changed 1"; Pets links "changed 1" (`brand-pet` condition).
- **Supervisor audit:** scratchpad script `audit18g.py` (2026-09-26 10:18). Verdict in the chat before turn 836, not swept.
- **Import result** [spec-ledger:1508]: "Cycle 18 batch 4 + addenda 2 (2026-09-26): Construction, Food, Travel, Babies & Kids, Commercial tidy, Vehicles, Services, Agriculture aliases, Pets. INC-292 found live (Beverages › Brewing empty unit list) and fixed by console tick … Travel definitions refused `allowedTargetNotColinked:make-buses-vans` until the links file went first (co-link overlay is same-file — class rule: links before definitions when the target is first linked in the delivery)."

### 31. Cycle 18 · batch 4 — addenda 2 ("b4b": Travel · Vehicles · Services · Commercial tidy)
- **Date:** 2026-09-26 (uploaded 10:54 ET).
- **Files:**
  - `1470f96c-c18-b4b-services-links.csv` — 2 data rows (wc -l 3); 503 bytes; uploaded 2026-09-26 10:54; links format + action
  - `43160e60-c18-b4b-commercial-links-tidy.csv` — 14 data rows (wc -l 15); 2,324 bytes; uploaded 2026-09-26 10:54; links format + action
  - `636738cb-c18-b4b-travel-links.csv` — 15 data rows (wc -l 16); 2,130 bytes; uploaded 2026-09-26 10:54; links format + action
  - `8a950208-c18-b4b-addenda-change-note-2026-09-26.md` — note, 30 lines; 6,038 bytes; uploaded 2026-09-26 10:54
  - `b44f89cd-c18-b4b-travel-definitions.csv` — 1 data rows (wc -l 2); 2,431 bytes; uploaded 2026-09-26 10:54; definitions format
  - `e5de81e1-c18-b4b-vehicles-links.csv` — 13 data rows (wc -l 14); 1,732 bytes; uploaded 2026-09-26 10:54; links format + action
- **Base (note):** "the Travel state as imported this morning (my final batch-4 files, which the import reproduced preview-for-preview) for the Travel rows; the unfiltered links export attached with the rulings (1,339) for Vehicles, Services and Commercial".
- **What it carried (change note):** `c18-b4b-travel-definitions.csv` "changed 1" (`hire_vehicle_type`: minibus and coaster `allowed` → `make-buses-vans`); `c18-b4b-travel-links.csv` "added 2 · changed 13 (12 ruled + 1 tidy)" (Vehicle Hire: second make/model pair for minibus and coaster); `c18-b4b-vehicles-links.csv` "added 3 · changed 10" (Buses & Vans `seats` scope, INC-292; Auto Services gains `pricing_type`, `availability`, `provider_type`); `c18-b4b-services-links.csv` "changed 2" (INC-292 siblings: `pricing_type` scope + `per_month` at Construction Trades and Financial & Legal); `c18-b4b-commercial-links-tidy.csv` — optional — "changed 14".
- **Supervisor audit:** scratchpad script `audit18h.py` (2026-09-26 10:56). Verdict in the chat before turn 836, not swept.
- **Import result:** covered by the same ledger line as batch 4 [spec-ledger:1508]; the Travel refusal `allowedTargetNotColinked:make-buses-vans` "until the links file went first" belongs to this set (its definitions file names `make-buses-vans`, first linked at Vehicle Hire by its links file).

### 32. Cycle 19 — Electronics: §10 review note (step 1)
- **Date:** 2026-09-26 (uploaded 11:22 ET).
- **Files:**
  - `3cd2bf42-c19-electronics-review-note-2026-09-26.md` — note, 288 lines; 60,046 bytes; uploaded 2026-09-26 11:22
- **What it carried (opening line):** inputs "the Electronics subtree of the unfiltered exports attached with the batch-4 rulings (57 definitions, 156 link rows; 14 listing leaves, two sections, the root)". "Pre-review §9.1 audit (INC-292 included): 4 findings — `battery_health_pct` conditional before its unhider `condition` (40) at Laptops (9), Smartphones (11), Tablets (10), Wearables (7) — 0 INC-292 findings, 48 notes".
- **Supervisor rulings / import result:** a review note carries no import. The rulings are in the chat before turn 836, not swept; the change note of 20:28 lists them (D-E1 … D-E7, with D-E5 "deferred to the next R21 pass").

### 33. Cycle 19 — Electronics: the files (step 2)
- **Date:** 2026-09-26 (uploaded 20:28 ET).
- **Files:**
  - `1fdbb224-c19-electronics-change-note-2026-09-26.md` — note, 302 lines; 54,600 bytes; uploaded 2026-09-26 20:28
  - `376a60d6-c19-electronics-definitions-aliases.csv` — 35 data rows (wc -l 36); 43,087 bytes; uploaded 2026-09-26 20:28; definitions format
  - `469173b4-c19-electronics-links.csv` — 164 data rows (wc -l 165); 20,567 bytes; uploaded 2026-09-26 20:28; links format + action
  - `7370d796-c19-electronics-definitions.csv` — 15 data rows (wc -l 16); 17,519 bytes; uploaded 2026-09-26 20:28; definitions format
- **Base (note):** "the fresh Electronics export attached with the rulings (57 definitions, 156 link rows) and the unfiltered pair (480 definitions, 1,362 links)".
- **What it carried (change note):** `c19-electronics-definitions.csv` (partial) "added 4 · changed 11" (`electronics_type-other`, `tv_type`, `megapixels`, `wifi_standard` new); `c19-electronics-definitions-aliases.csv` "changed 35"; `c19-electronics-links.csv` "added 8 · changed 15 · unlinked 1 · unchanged 140".
- **Supervisor audit:** scratchpad script `audit18i.py` (2026-09-26 20:29). Verdict in the chat before turn 836, not swept.
- **Import result** [spec-ledger:1509]: "definitions added 4 · changed 11; aliases changed 35; links added 8 · changed 15 · unlinked 1 · unchanged 140 after the planner refused 4 rows `unknownSibling:tv_type` (row-order rule: an unhider must be live or earlier in the same file; the reordered file `c19-electronics-links-fixed.csv` imported clean)." The file `c19-electronics-links-fixed.csv` is not in the uploads folder. The cycle-20b note says it "Supersedes cycle-19 files `c19r-*` (all three)" — no `c19r-*` file is in the folder either.

### 34. Cycle 20 — walk findings (D48 · D50 · D51 · D52 · D54 · D55 + helps + model order)
- **Date:** 2026-09-27 (uploaded 00:58 ET).
- **Files:**
  - `277c9ae8-c20-electronics-definitions-models.csv` — 1 data rows (wc -l 2); 194,037 bytes; uploaded 2026-09-27 00:58; definitions format
  - `3a69b02f-c20-electronics-links.csv` — 165 data rows (wc -l 166); 20,577 bytes; uploaded 2026-09-27 00:58; links format + action
  - `661471b8-c20-food-definitions.csv` — 1 data rows (wc -l 2); 944 bytes; uploaded 2026-09-27 00:58; definitions format
  - `69b8d469-c20-electronics-definitions.csv` — 4 data rows (wc -l 5); 4,181 bytes; uploaded 2026-09-27 00:58; definitions format
  - `6a9391ca-c20-construction-links.csv` — 92 data rows (wc -l 93); 12,676 bytes; uploaded 2026-09-27 00:58; links format + action
  - `6d3098fe-c20-change-note-2026-09-27.md` — note, 59 lines; 9,024 bytes; uploaded 2026-09-27 00:58
  - `9428c69f-c20-pets-definitions-HELD.csv` — 1 data rows (wc -l 2); 1,954 bytes; uploaded 2026-09-27 00:58; definitions format
  - `9784d4e5-c20-vehicles-definitions.csv` — 1 data rows (wc -l 2); 1,670 bytes; uploaded 2026-09-27 00:58; definitions format
  - `b1b02abb-c20-food-links.csv` — 160 data rows (wc -l 161); 19,598 bytes; uploaded 2026-09-27 00:58; links format + action
  - `f608c798-c20-pets-links.csv` — 49 data rows (wc -l 50); 5,678 bytes; uploaded 2026-09-27 00:58; links format + action
- **Base (note):** "the unfiltered pair attached with the R21 message (484 definitions, 1,368 links …) and, for Electronics, that export with the R21 display pass applied (my delivered state …) — if the R21 pass is not yet in, say so and I re-base".
- **What it carried (change note, nine files):** 1 `c20-food-definitions.csv` "changed 1" (`origin-food` relabels, D50); 2 `c20-food-links.csv` "changed 43 · unchanged 117" (D48 orders on eleven leaves); 3 `c20-vehicles-definitions.csv` "changed 1" (Roadside Assistance on `service_type-auto-services`); 4 `c20-pets-links.csv` "changed 3 · unchanged 46"; 5 `c20-pets-definitions-HELD.csv` — `pet_type` with `allowed.supply_type` — "import only if you accept the inert locks at Pet Services and Other Pets", "changed 1"; 6 `c20-construction-links.csv` "changed 1 · unchanged 91" (Tools power-source condition, D54); 7 `c20-electronics-definitions.csv` "added 1 · changed 3" (`decoder_service` new, D55); 8 `c20-electronics-links.csv` "added 1 · changed 4 · unchanged 160"; 9 `c20-electronics-definitions-models.csv` "changed 1" (`model-phones` reordered). "D51 is a console step (INC-290: a blank condition cell changes nothing)".
- **Supervisor audit:** scratchpad script `audit18j.py` (2026-09-27 01:11). Verdict in the chat before turn 836, not swept.
- **Import result** [spec-ledger:1510, 1537]: "Cycle 20 (2026-09-27): D48 Food orders (43 rows on 11 leaves), D50 origin labels, D52 pets narrowing (accepted under DEC-057b), D54 Tools power-source condition, D55 decoder_service (+ helps, MiFi relabel, roadside_assistance on auto-services). Files 8–9 (display pass) were built on an 'R21 display pass' that had never been imported — confirmed absent by the fresh export; the curator re-based them as Cycle 20b." D52: "the eight dormant locks at Pet Services / Other Pets are DEC-057b by design". So the file named HELD was accepted; the pasted console lines are not in the sources read.

### 35. Cycle 20b — Electronics re-base (display pass + decoder link + Gaming tidy)
- **Date:** 2026-09-27 (uploaded 01:49 ET).
- **Files:**
  - `00544b33-c20b-C-electronics-definitions-models.csv` — 1 data rows (wc -l 2); 194,037 bytes; uploaded 2026-09-27 01:49; definitions format
  - `133b4745-c20b-B-electronics-links.csv` — 165 data rows (wc -l 166); 20,577 bytes; uploaded 2026-09-27 01:49; links format + action
  - `546d74be-c20b-A-electronics-definitions.csv` — 1 data rows (wc -l 2); 1,243 bytes; uploaded 2026-09-27 01:49; definitions format
  - `5e37ac3e-c20b-electronics-change-note-2026-09-27.md` — note, 48 lines; 6,721 bytes; uploaded 2026-09-27 01:49
- **Base (note):** "the unfiltered pair attached with the cycle-20 results (485 definitions, 1,368 links), Electronics subset 62 definitions / 162 link rows". "Supersedes cycle-19 files `c19r-*` (all three) and cycle-20 files 8 and 9 — none of those five is to be imported".
- **What it carried (change note):** A `c20b-A-electronics-definitions.csv` — new `display_tech` "Display / ስክሪን ዓይነት"; B `c20b-B-electronics-links.csv` "added 3 · changed 8 · unchanged 154"; C `c20b-C-electronics-definitions-models.csv` "changed 1" (`model-phones`: `facts.display_tech` + `allowed.display_tech` on 237 options; options re-ordered within each series ascending by model number). File C must land after B (the co-link check sees only live links) — the pattern the walk-fix batch later cites "as in cycle 20b".
- **Supervisor audit:** scratchpad script `audit18k.py` (2026-09-27 01:51). Verdict in the chat before turn 836, not swept.
- **Import result** [spec-ledger:1511]: "display_tech (new) at Smartphones 11 / Tablets 7 with the tablet shifts; decoder_service linked at TV & Video 2 `visible_when tv_type=decoder` with the four TV shifts; model-phones 237 display locks (facts + single-value allowed) and the ascending model order; Gaming exchange_possible 41 → 50 (declared). Previews added 1 · added 3/changed 8/unchanged 154 · changed 1."

### 36. Cycle 21 — D57 · D60 · INC-293 (option 1)
- **Date:** 2026-09-27 (uploaded 06:20 ET).
- **Files:**
  - `6d8a678a-c21-agriculture-links.csv` — 63 data rows (wc -l 64); 8,892 bytes; uploaded 2026-09-27 06:20; links format + action
  - `9f1db3c0-c21-change-note-2026-09-27.md` — note, 41 lines; 6,300 bytes; uploaded 2026-09-27 06:20
  - `a731be9f-c21-services-definitions.csv` — 1 data rows (wc -l 2); 2,677 bytes; uploaded 2026-09-27 06:20; definitions format
  - `d21710cd-c21-electronics-definitions.csv` — 1 data rows (wc -l 2); 36,114 bytes; uploaded 2026-09-27 06:20; definitions format
- **Base (note):** "the post-import unfiltered pair attached at 03:00 (486 definitions, 1,371 links — the export the 0-finding audit ran on)".
- **What it carried (change note):** 1 `c21-electronics-definitions.csv` "changed 1" (`series-phones`: the sixteen Apple series re-ordered newest first, D57); 2 `c21-agriculture-links.csv` "unlinked 1 · unchanged 62" (`harvest_year` at Grains, Pulses & Produce, D60); 3 `c21-services-definitions.csv` "changed 1" (`service_type-vehicle-services` restated with the merged list; `roadside_assistance` and `driver_hire` new — INC-293).
- **Supervisor audit:** scratchpad script `audit18l.py` (2026-09-27 07:06). Verdict in the chat before turn 836, not swept.
- **Import result** [spec-ledger:1512–1514]: "Previews changed 1 · unlinked 1/unchanged 62 · changed 1." "Vehicles › Auto Services retired by console; browse path Vehicles → Vehicle Services added by console." "Live state after Cycle 21: 486 definitions · 1,370 link rows (1,153 direct) · 163 categories (15 roots, 1 retired: auto-services) · 21 secondary parents."

### 37. Study C22 — "Related categories together, reachable from each other" (read-only proposal)
- **Date:** 2026-09-27 (uploaded 06:55 ET) [raw t800–t801].
- **Files:**
  - `6abb8c6d-c22-adjacency-study-2026-09-27.md` — note, 79 lines; 18,516 bytes; uploaded 2026-09-27 06:55
- **What it carried (note and raw t800):** "No file is delivered." A — root rail order (the curator's A1: Vehicles · Real Estate · Electronics as leaders, then the house-then-trade run …; "Five root rows move against today"); B — fourteen surfacing candidates with a form-fit reading each (Grains, Pulses & Produce → Food; Honey, Butter & Oils and Meat, Dairy & Eggs → Agriculture; Farm Equipment → Commercial; Generators → Construction; Tools and Office Furniture → Home & Garden; Short-term Rentals → Travel; Contractors → Construction; Logistics → Vehicles; IT Services and Musical Instruments → Electronics; Tutoring → Babies & Kids; Maternity → Clothing & Shoes); C — sibling order per root. "Expected preview on the 09-22 file: changed 90 · unchanged 73 (5 roots, 81 leaf orders, 14 secondary parents)." Traffic evidence: Jiji Ethiopia result counts read 2026-09-27. Two follow-ups surfaced: the `produce_type` help reads oddly from Food; eggs have two posting homes (`per_tray` on the Livestock unit scope).
- **Supervisor review** (raw t801): "sound, grounded". Mechanics: "there is no per-host order cell. The import treats `secondary_parents` as the complete set for a category — pointers missing from the cell are removed"; guests always follow the host's own children (D30), so "beside X" placements are not placeable. Three rulings put to the operator (A1 or A2; B all or strike; C all or keep).
- **Operator ruling:** A2 · all B · all C [repo handoff 2026-09-27: "Study C22 approved (A2 · all B · all C), step-2 files pending audit"].
- **Import result:** none (a study). → Cycle 22.

### 38. Cycle 22 — adjacency step 2 (A2 · fourteen surfacings · sibling orders) + two follow-ups
- **Date:** 2026-09-27 — first delivery uploaded 07:13 ET; "re-delivery 2: files 1 and 2" uploaded 07:25 ET; the categories file was attached again at 21:31 ET, after DEC-080 [upload times; sweep-0836-0880 §3 recap t837]. Rulings applied (note): A = A2 (the operator's chain: Vehicles · Commercial Equipment · Construction Material · Real Estate · Electronics · Home & Garden · Clothing & Shoes · Beauty & Personal Care · Babies & Kids · Sports & Leisure · Agriculture & Farming · Food & Beverages · Pets & Animals · Services · Travel & Accommodation), B = all fourteen surfacings, C = every sibling order as proposed.
- **Files:**
  - `37b81b2b-c22-agriculture-links.csv` — 1 data rows (wc -l 2); 304 bytes; uploaded 2026-09-27 07:13; links format, no action column
  - `45af20b8-c22-categories.csv` — 163 data rows (wc -l 164); 27,437 bytes; uploaded 2026-09-27 07:13; categories format
  - `55a06080-c22-change-note-2026-09-27.md` — note, 103 lines; 14,582 bytes; uploaded 2026-09-27 07:13
  - `9d6cd60f-c22-agriculture-definitions.csv` — 1 data rows (wc -l 2); 4,060 bytes; uploaded 2026-09-27 07:13; definitions format
  - `2e8683c0-c22-agriculture-definitions_1.csv` — 1 data rows (wc -l 2); 4,052 bytes; uploaded 2026-09-27 07:25; definitions format
  - `6257ea25-c22-change-note-2026-09-27__1_.md` — note, 117 lines; 18,315 bytes; uploaded 2026-09-27 07:25
  - `b330f44c-c22-categories_1.csv` — 163 data rows (wc -l 164); 27,437 bytes; uploaded 2026-09-27 07:25; categories format
  - `0ac66e66-c22-categories.csv` — 163 data rows (wc -l 164); 27,437 bytes; uploaded 2026-09-27 21:31; categories format
  (`b330f44c-…categories_1.csv` and the 21:31 copy `0ac66e66-…` are byte-identical; both differ from the first `45af20b8-…`.)
- **Base (note):** "the fresh all-categories export attached with the rulings (163 rows, 15 roots …) and, for the two attribute deltas, the post-cycle-21 unfiltered pair (486 definitions, 1,370 links)".
- **What it carried:** first delivery — file 1 `c22-categories.csv`: `display_order` on 10 root rows and 81 leaf rows, `secondary_parents` on 14 leaf rows; "categories: changed 95 · unchanged 68". Re-delivery 2 — file 1 "re-seated under INC-303 (three rows)": `display_order` on 10 root rows and 87 leaf rows; "categories: changed 100 · unchanged 63 (163 rows; no creates, retires, renames)"; file 2 `c22-agriculture-definitions.csv`: `produce_type` help EN (236 chars) / AM (154), "definitions: changed 1"; file 3 `c22-agriculture-links.csv`: Livestock & Poultry › `unit_of_sale-agri` scope minus `per_tray`, "imported (links: changed 1) — not restated". `secondary_parents` is written as the complete set per row.
- **Curator's pre-delivery audit (re-delivery):** "0 findings · 929 notes"; "the audit now carries the 240-character help cap (EN and AM)"; "INC-303 rule run across all 35 pointers on 34 active surfaced rows … pass 33 · fail 0 · latent 2".
- **Import results** [recap t837]: file 3 — changed 1; file 2 — "v1 refused at 244 chars > the 240 cap; redelivered at 236" — changed 1; file 1 (root order, sibling orders, 14 adjacency pointers) — "changed 100; its ordering pass flipped four homes (INC-303) and interleaved 40 own rows' numbers; repaired by DEC-080, then re-imported → 0 added · 40 changed · 123 unchanged." The four flipped homes were repaired by slug: bicycles → vehicles, personal-care-services → services, industrial-equipment → commercial-equipment, nursery-furniture → babies-kids [docs/features/categories.md, C2-HOME].
- **Standing rule after it** [recap t837]: "`parent_slug` is the home, `secondary_parents` the guests; the curator's positional INC-303 check is retired; categories files are open."

### 39. Cycle 23 — definitions/links tracks while categories files were on hold (INC-303 hardening)
- **Date:** 2026-09-27 (uploaded 20:14 ET) [sweep-0836-0880 §3 recap t837].
- **Files:**
  - `aea94126-c23-vehicles-links.csv` — 87 data rows (wc -l 88); 8,601 bytes; uploaded 2026-09-27 20:14; links format + action
  - `c4056222-c23-change-note-2026-09-27.md` — note, 36 lines; 6,117 bytes; uploaded 2026-09-27 20:14
  - `dec29f90-c23-delete-definitions.csv` — 1 data rows (wc -l 2); 1,684 bytes; uploaded 2026-09-27 20:14; definitions format + action
  - `fa7e26db-c23-agriculture-definitions.csv` — 1 data rows (wc -l 2); 4,407 bytes; uploaded 2026-09-27 20:14; definitions format
- **Base (note):** "the post-cycle-21 unfiltered pair (486 definitions, 1,370 links) with the cycle-22 file 3 (Livestock scope) and file 2 (`produce_type` help) applied as imported"; "no categories file in this delivery".
- **What it carried (note):** A `c23-agriculture-definitions.csv` — `livestock_type` help EN (230 chars) / AM (150) gains the egg-milk-butter boundary sentence; "definitions: changed 1". B `c23-vehicles-links.csv` — unlink `service_type-auto-services` at the retired Auto Services leaf; "links: unlinked 1 · unchanged 86". C `c23-delete-definitions.csv` (last) — `service_type-auto-services` with `action = delete`; "definitions: deleted 1".
- **Curator's pre-delivery audit:** "1 finding, held for your ruling" — after B the retired leaf `Vehicles › Auto Services` keeps only one card ("only 1 unconditional card"); "1 finding · 929 notes".
- **Supervisor ruling** [recap t837]: "the two-must-display law is a console amber flag for an ACTIVE listing-accepting category, not an import rule (attributes.md:52–60); the curator's held finding was a false alarm." Scripts `audit_c23.py`, `verify_c23.py`.
- **Import result** [recap t837]: A — changed 1; "B+C in one pass: … unlinks 1 · deletes 1 · unchanged 86". The pasted console lines are not in the sources read.

### 40. Cycle 24 — delete the retired Auto Services leaf
- **Date:** 2026-09-27 (uploaded 21:39 ET) [raw t835; sweep-0836-0880 §3 recap t837].
- **Files:**
  - `5b635e57-c24-change-note-2026-09-27.md` — note, 13 lines; 1,673 bytes; uploaded 2026-09-27 21:39
  - `b40224c8-c24-categories-delete.csv` — 1 data rows (wc -l 2); 509 bytes; uploaded 2026-09-27 21:39; categories format + action
- **Base (note):** "`categories_4` (the verified post-DEC-080 export, 163 rows — the new base) and the post-cycle-23 pair (485 / 1,369)".
- **What it carried (note):** one file, `c24-categories-delete.csv` — `auto-services` → delete; expected "categories: deleted 1 · unchanged 0 (file rows only)". After import: "Links export: the three `auto-services` rows gone (1,369 → 1,366)"; "Full-catalog audit expected at 0 findings."
- **Supervisor verification** (raw t835, against the operator's post-import exports categories_5, definitions_2, links_1): "Cycle 24 — CLEAN. Categories 163 → 162 (only Auto Services gone, no other cell moved); links 1,369 → 1,366 (exactly its three rows); definitions 485 with `availability`, `pricing_type`, `provider_type` each one direct link fewer."
- **Import result:** "deleted 1" [sweep-0836-0880 §3 recap]. "Catalogue then 162 categories · 485 definitions · 1,366 links; live audit 0 findings. Base: categories_5, definitions_2, links_1 (2026-09-28)." The pasted console line is not in the sources read.
- **Message to the curator** (raw t835): "Cycle 24 landed clean — 162 / 485 / 1,366; these three exports are the base." "Nothing else for the curator until the D62 spec."

### 41. Study C25 — gaps in the catalogue: books · media · art & collectibles · religious & cultural · solar · tailoring · the rights frame
- **Date:** 2026-09-28 (uploaded 01:54 ET; chartered ~00:55 ET the same night) [sweep-0836-0880 §3, t855–t869]. The operator had approved the gap-review package on 2026-09-28 ("go. proceed with all fixes as stated") [memory, product-decisions-2].
- **Files:**
  - `0a950032-c25-change-note-2026-09-28.md` — note, 174 lines; 29,077 bytes; uploaded 2026-09-28 01:54
  - `14a516a3-c25-links_1.csv` — 1,413 data rows (wc -l 1,414); 179,212 bytes; uploaded 2026-09-28 01:54; links format + action
  - `1b0e981e-c25-definitions.csv` — 34 data rows (wc -l 35); 35,346 bytes; uploaded 2026-09-28 01:54; definitions format
  - `95f5f016-c25-definitions_1.csv` — 35 data rows (wc -l 36); 35,938 bytes; uploaded 2026-09-28 01:54; definitions format
  - `a19b1d67-c25-categories.csv` — 167 data rows (wc -l 168); 28,218 bytes; uploaded 2026-09-28 01:54; categories format
  - `c20186f4-c25-prohibited-restricted-items-policy-DRAFT.md` — note, 349 lines; 19,175 bytes; uploaded 2026-09-28 01:54
  - `ce6418ec-c25-links.csv` — 1,413 data rows (wc -l 1,414); 179,196 bytes; uploaded 2026-09-28 01:54; links format + action
  - `d2d55860-c25-change-note-2026-09-28__1_.md` — note, 177 lines; 30,373 bytes; uploaded 2026-09-28 01:54
  Two versions of the change note, definitions and links are in the folder: the first delivery (`0a950032-…`, `1b0e981e-…`, `ce6418ec-…`) and the re-delivery with the offer-type ruling of 01:42 folded in (`d2d55860-…__1_`, `95f5f016-…_1`, `14a516a3-…_1`). The supervisor audited and the operator imported the `_1` files.
- **Base (note):** "the post-cycle-24 state (162 categories / 485 definitions / 1,366 links). The three exports named in the study … did not arrive as attachments; the files are built on my staged copy of that state".
- **What it carried (re-delivered note):** `c25-categories.csv` — "added 5 · changed 10 · unchanged 152" (5 new leaves `music-film-media`, `art-collectibles`, `religious-cultural`, `solar-power`, `tailoring-services`; Books & Media → Books; Games, Art & Hobbies → Games & Hobbies; 8 sibling re-seats); `c25-definitions.csv` (partial: new + changed rows only) — "added 29 · changed 6" (first delivery: "added 29 · changed 5"); `c25-links.csv` (full catalogue) — "added 47 · changed 7 · unlinked 1 · unchanged 1358" (first delivery: "added 47 · changed 3 · unlinked 1 · unchanged 1362"); `c25-prohibited-restricted-items-policy-DRAFT.md` — "DRAFT, counsel review pending; not an import file". INC-296 list: 29 keys + the Ge'ez option + 7 category names. Pre-delivery audit on the merged state "514 definitions, 1,412 links, 162 leaves: 0 findings · 929 notes".
- **Supervisor audit — PASS, import approved** [t865]: `a19b1d67-c25-categories.csv` (167 rows: added 5 · changed 10 · unchanged 152), `95f5f016-c25-definitions_1.csv` (35 rows: added 29 · changed 6), `14a516a3-c25-links_1.csv` (1,413 rows: added 47 · changed 7 · unlinked 1 · unchanged 1358). Rulings: root hosts stand (a guest under a listing leaf would make it unpostable); `prayer_books` dropped; `hobby_type.collectibles` removed; Beauty & Personal Care as Religious & Cultural's second parent, Clothing struck; policy DRAFT → counsel, not an import. Scripts `audit_c25.py`, `audit_c25_links.py`.
- **Import, first attempt** (operator, t866): categories — "5 added · 10 changed · 0 retired · 0 reactivated · 0 deleted · 152 unchanged · 0 refused; Import applied — 15 changes written". Definitions-only pass — "29 added · 5 changed · 0 unlinked · 0 deleted · 0 unchanged · 1 refused" (Row 2: option "digital" points at "rights_basis", not used in any category this attribute is used in) → discarded. Links-only pass — "10 added · 6 changed · 1 unlinked · 0 deleted · 1359 unchanged · 37 refused" → discarded. Cause: supervisor slip S62 (the two files must go in the same pass).
- **Import, recovery** (t867–t868): both slots in the same pass → "76 added · 12 changed · 1 unlinked · 0 deleted · 1359 unchanged · 0 refused; Import applied — 89 changes written". Catalogue then 167 categories / 514 definitions / 1,412 links [t869]. INC-296 approvals: operator reported "2 done".
- **Console-only change** [t867–t870]: the links file could not clear the condition on `electronics-accessories` → `authentic_original` (a blank `visible_when` cell means no change); cleared in the console ("Show when" → "Always visible").
- **Open after C25:** the five new leaves landed with no guests → Cycle 26; the policy draft is with counsel; vehicles' one-option `offer_type` "an unlink candidate for a later cycle if the walk finds it noisy".

### 42. Cycle 26 — the five guest pointers C25's creates did not carry
- **Date:** 2026-09-28 (uploaded 02:59 ET) [sweep-0836-0880 §3, t870–t873].
- **Files:**
  - `5c6e4c87-c26-categories-guests.csv` — 5 data rows (wc -l 6); 1,303 bytes; uploaded 2026-09-28 02:59; categories format
  - `95f1d343-c26-change-note-2026-09-28.md` — note, 12 lines; 2,108 bytes; uploaded 2026-09-28 02:59
- **Base (note):** "categories_6 · definitions_3 · links_2 (the post-C25 exports)"; "Audit of the live state: 0 findings · 929 notes".
- **What it carried (note):** one file, `c26-categories-guests.csv` — "the five rows from categories_6 with `secondary_parents` filled as ruled — Media → `electronics` · Art & Collectibles → `home-garden` · Religious & Cultural → `beauty-personal-care` (Clothing struck) · Solar → `electronics|construction` · Tailoring → `fashion`; every other cell byte-identical"; expected "categories: changed 5 · unchanged 0 (file rows only)". Cause stated: "a create row's `secondary_parents` is not applied at create; an update row's is" (registered by the supervisor as INC-314).
- **Supervisor audit:** approved [t871].
- **Import result** (operator, t872): "0 added · 5 changed · 0 retired · 0 reactivated · 0 deleted · 0 unchanged · 0 refused; Import applied — 5 changes written"; browse-tree check "correct".
- **Closing message to the curator** [t873]: C26 applied; base = categories_7 · definitions_3 · links_2; C25 + C26 close CLEAN on the supervisor's side; importer facts INC-314 and the blank-`visible_when` rule; "Queue: hold. No new study is chartered".

### 43. C27 · Batch 1 — Food & Beverages and Books: review note (no files)
- **Date:** 2026-09-29 (uploaded 05:30 ET) [sweep-0926-0970 §3.1, t932–t941]. Study C27 was drafted by the supervisor at t921 ("Study C27 — identity facts, producer lists, origins and order (from the operator's walk, 2026-09-29)"); the operator objected that it was tied to the categories he named and wanted every other category reviewed for similar issues [t922]; the supervisor's reply at t923 (the widened prompt) is in no sweep or raw file. Turns 924–925 hold the operator's standing directive of 2026-09-29 02:15 ET ("… make sure not just fix one issue but reaserch wider issue and fix with detail review if similar problems exist other places") and the supervisor's statement of its effect: "Every curator brief reviews the whole catalogue against the problem types, as C27 now does." [sweep-supplement-gaps].
- **Files:**
  - `7d62bf73-c27-b1-review-note-2026-09-29.md` — note, 429 lines; 43,903 bytes; uploaded 2026-09-29 05:30
- **Base (note):** "categories_7 · definitions_3 · links_2 (167 / 514 / 1,419 — the post-C26 exports; §9.1 on the base: 0 findings · 929 notes)". Scope: the 12 Food & Beverages leaves (Other included) and Books.
- **What it carried (note table, totals):** (a) fixed spec left open 5 → 0; (b) cross-product 100 → 0; (c) order 46 → 0; (d) required beyond H 12 → 1; (e) missing Amharic 0 → 0; (f) year with no floor 1 → 0. Findings: wrong-product and unverifiable brands (Zelalem under honey, butter and spices; Kirkland under edible oil; Sheba and Mereb under berbere; Nido as infant formula; Other Food offers all 46 brands); `sheno_kibe` mislabelled "Vegetable Ghee"; unit and net weight asked before brand on 11 leaves; missing fields (book title, honey colour, butter origin, oil type, teff origin, sparkling water type); wrong units. 11 decisions requested.
- **Supervisor rulings (all 11)** [t933]: (1) order law E — identity (type → brand → write-in) → specs → made-in → unit, weight, volume, pieces → condition band → seller statements; (2) at least two must-fill cards; (3) brand lists: delete the 17, add the 28 sourced, write-in `brand_name` where no reliable list exists; (4) one home per product, six moves; (5) six new spec fields; (6) `organic_certified` off the Food root, linked on 7 leaves; (7) rename "Packaged & Imported" → "Pantry & Packaged" (slug kept); (8) `book_title` REQUIRED WITHOUT A CARD; (9) Books — publisher, exam, faith, age, grade KG–12 only; (10) `volume_ml` max 20,000 mL; (11) brand order by market presence. Delivery: build on fresh exports; import order categories first, then definitions and links TOGETHER in one attributes pass.
- **Curator dry run with the rulings** [t936]: counts a–f all 0; §9.1 0 findings · 941 notes.
- **Import result:** none (a note). Followed by the step-2 files (2026-09-29 17:07).

### 44. C27 · Batch 2 — Fashion + Babies & Kids (+ size and shoe rows of Sports Equipment): review note (no files)
- **Date:** 2026-09-29 (uploaded 09:45 ET) [sweep-0926-0970 §3.2, t948–t949]. Brief: "C27 — Batch 2 = Fashion + Babies & Kids (moved up) · supervisor brief · 2026-09-29" [t941] (ten inputs from the walk; the brief's "ENGINE CONSTRAINTS" section stated the strict co-link rule — wrong, supervisor slip S71).
- **Files:**
  - `f5097d9a-c27-b2-review-note-2026-09-29.md` — note, 595 lines; 52,807 bytes; uploaded 2026-09-29 09:45
- **What it carried (sweep):** counts (a) 2 → 0; (b) 469 → 0; (c) 47 → 0; (d), (e), (f) 0 → 0; §9.1 0 findings. Brands per leaf sourced from Jiji Ethiopia filters; four names removed (Sheba Leather, "Ethiopian Leather", Peacock, Kabana), 37 added. Shoes: new `shoe_for` key narrowing size scales; half sizes EU 34.5–46.5 and baby EU 16–19 added; Heels to women and girls only. Clothing sizes per group. Watches: no karat question; series list for Rolex, Casio, Seiko, Citizen. Babies & Kids: Refurbished / For Parts / Open Box no longer reach clothes, school items or cribs; five products get one home each. Eleven decisions requested.
- **Supervisor verdict** ("C27 — supervisor review of the Batch 2 note, plus the form-path worklist … 2026-09-29", t949): approved with one structural change (A) and one added count (B). A: the co-link rule is DEC-057b; drop `shoe_for`; keep shared `gender-fashion` at Shoes and link it at Sports Equipment for boots only; gate limits ≤ 5 targets per option and ≤ 50 values per target (migration `20260922001023`, lines 134 and 147). B: form-path counts (g1)–(g3) added to every batch. Eleven rulings (brands; `watch_series` required when shown; shoes; clothing sizes — no band-and-cup bra sizing; Babies & Kids condition; baby brands; one home per product — kids' bicycles → Vehicles › Bicycles; Abaya & Jilbab and Hijab & Headscarf; Other Fashion "Original": unlink; Batch 1's `brand_name` amendment; DEC-057b stands).
- **Import result:** none (a note). Followed by the addendum (2026-09-29 17:07) and the step-2 files (18:51).
- **The form-path worklist** (supervisor-generated `form-path-audit-2026-09-29.csv`, sent to the operator at t947 and t951): 493 flagged rows across all 15 sections (Electronics 79, Fashion + Babies & Kids 73, Food 25, Books 10); three checks — (g1) "identity leaves question open", (g2) "asked for every type", (g3) "model inherits series range". "A row is a flag, not a verdict." Dispositions: narrow (allowed), fill (facts), hide (visible_when) or keep with a one-line reason.

### 45. C27 · Batch 1 — Food & Beverages and Books: the files (step 2), with the Batch 2 addendum
- **Date:** 2026-09-29 (uploaded 17:07 ET) [sweep-0926-0970 §3.1–3.2, t962–t970].
- **Files:**
  - `20b09cc3-c27-b1-change-note-2026-09-29.md` — note, 114 lines; 7,532 bytes; uploaded 2026-09-29 17:07
  - `5f5b0e89-c27-b1-categories.csv` — 1 data rows (wc -l 2); 513 bytes; uploaded 2026-09-29 17:07; categories format
  - `6b00d772-c27-b1-definitions.csv` — 35 data rows (wc -l 36); 59,530 bytes; uploaded 2026-09-29 17:07; definitions format
  - `87160d57-c27-b1-inc296-amharic-2026-09-29.csv` — 104 data rows (wc -l 105); 6,216 bytes; uploaded 2026-09-29 17:07; Amharic approval list
  - `ae7d9648-c27-b2-addendum-2026-09-29.md` — note, 157 lines; 11,331 bytes; uploaded 2026-09-29 17:07
  - `bab603a5-c27-b1-links.csv` — 1,438 data rows (wc -l 1,439); 182,768 bytes; uploaded 2026-09-29 17:07; links format + action
  - `c02961fb-c27-b1-form-path-dispositions-2026-09-29.csv` — 48 data rows (wc -l 49); 9,660 bytes; uploaded 2026-09-29 17:07; form-path dispositions
  - `d75293eb-c27-b2-form-path-dispositions-2026-09-29.csv` — 93 data rows (wc -l 94); 19,720 bytes; uploaded 2026-09-29 17:07; form-path dispositions
- **Base (note):** "definitions_9 · links_9 · categories_4, the operator's fresh post-W4 exports (514 definitions · 1,419 links · 167 categories). They are byte-identical to the base the review note was drafted on (definitions_3 · links_2 · categories_7)".
- **What it carried (note §1):** `c27-b1-categories.csv` (1 row) "changed 1: `food-beverages` gets name_en and name_am only. The slug is kept (ruling 7)"; `c27-b1-definitions.csv` (35 rows) "added 10 · changed 25 · unchanged 0"; `c27-b1-links.csv` (1,438) "added 31 · changed 112 · unlinked 2 · unchanged 1,293" (the links preview "may also read 'added 24 · changed 119' (same total 143)" [sweep]). Form-path: reproduces the worklist exactly (Food 25, Books 10). The change note also carries the Amharic approval list, "the 12 yes/no facts to lock when W4b lands", "the 10 leaves waiting on two-key conditions", and an 8-step walk. With it: the Batch 2 addendum (`shoe_for` dropped; change A; recount with half sizes; 73 form-path rows on the base become 83 after).
- **Curator's pre-delivery audit:** "§9.1: 0 findings · 941 notes. That is the base's 929, plus 12 informational DEC-057b notes".
- **Supervisor audit** [t963]: approved. Limit stated: the operator's fresh exports were not attached to the supervisor, so the comparison was against a rebuilt copy missing 7 inherited link rows; (g) counts 42/4 against the curator's 44/4. Script `audit_c27b1.py`. Batch 2 addendum approved "as written".
- **Import, pass 1** (operator, t964): categories — "0 added · 1 changed · 0 retired · 0 reactivated · 0 deleted · 0 unchanged · 0 refused" (committed). Attributes — "41 added · 126 changed · 2 unlinked · 0 deleted · 1293 unchanged · 11 refused": Row 16 option "nan" ("the spelling 'Nan' is listed twice"); rows 18, 26, 28, 35, 36 ("lists a value that 'brand-food' does not offer"); link rows 729, 740, 750, 810, 830. Supervisor: **Discard**; single cause — `brand-food` option "nan" has aliases ["NAN", "Nan"], refused `aliasDuplicate` (`attr_option_shape`, migration `20260922001023`, lines 48–93, compares `lower(alias)` across every option of the definition). The curator re-issued `c27-b1-definitions.csv` only (the re-issued file is not a separate upload in the folder) and added the alias rules to its §9.1 audit.
- **Import, pass 2** (operator, t970): "41 added · 137 changed · 2 unlinked · 0 deleted · 1293 unchanged · 0 refused"; "Import applied — 180 changes written".
- **Walk findings (operator, t970):** Shola milk not locked; nitir kibe vs butter class; edible vs vegetable oil class; chicken unit; edible-oil container; Books genre before title; "Pantry & Packaged" name → the b1f follow-ups.

### 46. C27 · Batch 2 — Clothing & Shoes, Babies & Kids, Sports Equipment sizes: the files (step 2)
- **Date:** 2026-09-29 (uploaded 18:51 ET) [sweep-0971-1015 §3, t972–t975].
- **Files:**
  - `3b42ca31-c27-b2-change-note-2026-09-29.md` — note, 139 lines; 12,569 bytes; uploaded 2026-09-29 18:51
  - `9015f1c8-c27-b2-form-path-dispositions-2026-09-29_1.csv` — 93 data rows (wc -l 94); 19,720 bytes; uploaded 2026-09-29 18:51; form-path dispositions
  - `a529607e-c27-b2-links.csv` — 1,458 data rows (wc -l 1,459); 188,059 bytes; uploaded 2026-09-29 18:51; links format + action
  - `b422b11d-c27-b2-inc296-amharic-2026-09-29.csv` — 176 data rows (wc -l 177); 9,956 bytes; uploaded 2026-09-29 18:51; Amharic approval list
  - `c238de95-c27-b2-definitions.csv` — 34 data rows (wc -l 35); 101,824 bytes; uploaded 2026-09-29 18:51; definitions format
- **Base (note):** "definitions_10 · links_10 · categories_5, the post-Batch-1 exports (524 definitions · 1,436 links · 167 categories)."
- **What it carried (note §1):** `c27-b2-definitions.csv` (34 rows) "added 4 · changed 30 · unchanged 0"; `c27-b2-links.csv` (1,458) "added 40 · changed 80 · unlinked 6 · unchanged 1,332". No categories file. Amharic list: "the 4 new keys and 172 new options". Removed options no longer used anywhere (dropped brands, the Travel System duplicate, the Sports Kit type, the Children's Books type); shoe-size narrowing by "For" — Women 39 sizes, Men 38, Boys and Girls 46 each, Baby 15 (limit 50) [sweep].
- **Curator's pre-delivery audit:** "§9.1, with the gate's alias rules: 0 findings · 992 notes. That is the export's 946, plus 46 informational DEC-057b notes".
- **Supervisor audit** [t973]: PASS — 4 definitions added, 30 changed; expected preview "added 44 · changed 110 · unlinked 6 · unchanged 1,332 · refused 0"; form-path flags 75 + 11 (supervisor) against 72 + 11 (curator), "the gap being how brand and colour rows are counted". Script `audit_c27b2.py` (in-file reference order, option-key whitelist, help ≤ 240, Amharic labels present, `allowed` ≤ 5 targets / ≤ 50 values, dangling references to removed values) and `eff_checks.py` (per-leaf checks).
- **Import result:** "imported and walked 2026-09-29 (counts not restated by the operator)" [sweep-0971-1015 §3 table].
- **Follow-ups:** "C27 — two more walk items for the Fashion follow-up (2026-09-29)" [t975]: propose (no files) several sizes on one post, and "Electronic" watches — "no reply seen in this slice"; the watch item was later handled in the Sports batch (F2).

### 47. C27 · b1f — Batch 1 walk follow-ups (a–f): the files
- **Date:** note dated 2026-09-29; files uploaded 2026-09-30 13:19 ET [sweep-0971-1015 §3, t986–t989]. The proposals note (`c27-b1-walk-followups-2026-09-29.md`, "proposals (no files until approved)") came with the Batch 2 files on 2026-09-29 18:51 ET; the six follow-ups were approved in "C27 — supervisor review · 2026-09-29" [t973].
- **Files:**
  - `b3fc5f50-c27-b1-walk-followups-2026-09-29.md` — note, 140 lines; 10,551 bytes; uploaded 2026-09-29 18:51
  - `05d96d8c-c27-b1f-change-note-2026-09-29.md` — note, 128 lines; 10,858 bytes; uploaded 2026-09-30 13:19
  - `384e5a0f-c27-b1f-definitions.csv` — 7 data rows (wc -l 8); 13,912 bytes; uploaded 2026-09-30 13:19; definitions format
  - `a65496e0-c27-b1f-links.csv` — 1,452 data rows (wc -l 1,453); 187,221 bytes; uploaded 2026-09-30 13:19; links format + action
  - `d2b83ad5-c27-b1f-inc296-amharic-2026-09-29.csv` — 9 data rows (wc -l 10); 2,969 bytes; uploaded 2026-09-30 13:19; Amharic approval list
  - `e616169c-c27-b1f-categories.csv` — 2 data rows (wc -l 3); 699 bytes; uploaded 2026-09-30 13:19; categories format
- **Base (note):** "definitions_11 · links_11 · categories_6, the operator's post-Batch-2 exports (528 definitions · 1,452 links)."
- **What it carried (note §1):** `c27-b1f-categories.csv` (2 rows) "changed 2: `food-beverages` gets name_en and name_am; `livestock` gets secondary_parents"; `c27-b1f-definitions.csv` (7 rows) "added 0 · changed 7 · unchanged 0"; `c27-b1f-links.csv` (1,452, full catalogue) "added 0 · changed 4 · unlinked 0 · unchanged 1,448". Butter relabelled "Butter — Plain (Kibe)" / "Butter — Spiced, Clarified (Niter Kibbeh)" with Tilili as a Gojjam alias; "Cooking Oil — Liquid" / "Cooking Oil — Solid (Vegetable Ghee)"; `volume_ml` max raised to 25,000; "Chicken (Dressed) / የታረደ ዶሮ" and Livestock & Poultry as a guest under Food & Beverages; Books genre then title; rename "Sugar, Salt & Packaged Food / ስኳር፣ ጨውና የታሸጉ ምግቦች" (slug kept) [sweep]. "one addition beyond the proposal: a §10.1 help fix on `oil_type`". Amharic list: 9 rows.
- **Curator's pre-delivery audit:** "§9.1: 0 findings · 992 notes, the same as the base"; alias rules 0 violations.
- **Supervisor audit** [t987]: CLEAN — 2 categories, 7 definitions, 4 links. Two curator changes beyond the approved wording accepted (Oil Type help "The oil it is made from"; Butter help kept "Kibe is cow's butter"). Scripts `merge_c27b1f.py`, `audit_c27b1f.py`.
- **Import result** (operator, t988): categories "2 changed … 2 changes written"; attributes "0 added · 11 changed · 0 unlinked · 1448 unchanged · 0 refused … 11 changes written".
- **Open:** native-reader checks the operator owes on the new Amharic labels and aliases (የተነጠረ ቅቤ, ጥሊሊ, የጥሊሊ ቅቤ, ፈሳሽ ዘይት, የረጋ ዘይት, የዶሮ ሥጋ, ስፓጌቲ, ቲማቲም ፓኬት, ቱና, ዱቄት …) [t987] — "whether a separate native check happened is unclear."

### 48. C27 · b1g — Batch 1 walk follow-ups, round 2 (R1–R4, Food) and the C1–C3 census
- **Date:** 2026-09-30 (uploaded 14:00 ET) [sweep-0971-1015 §3, t989–t993]. Asked in the curator prompt "C27 · Batch 1 walk follow-ups, round 2 (b1g) … before Vehicles" (R1–R4 files; C1–C3 census; walk wording rules) [t989].
- **Files:**
  - `0364192a-c27-b1g-definitions.csv` — 4 data rows (wc -l 5); 8,462 bytes; uploaded 2026-09-30 14:00; definitions format
  - `0efd3e47-c27-b1g-census-C2-product-origin-2026-09-30.csv` — 22 data rows (wc -l 23); 3,374 bytes; uploaded 2026-09-30 14:00; header: root,leaf,leaf_name,position,card,proposed,reason
  - `71f5dbef-c27-b1g-census-C1-brand-position-2026-09-30.csv` — 75 data rows (wc -l 76); 15,742 bytes; uploaded 2026-09-30 14:00; header: root,leaf,leaf_name,key,position,order,card,required,condition,series_or_model_under_it,settles,narrowed_by,proposed,reason
  - `8fcfeaa8-c27-b1g-one-value-allowed-without-fact-2026-09-30.csv` — 65 data rows (wc -l 66); 4,249 bytes; uploaded 2026-09-30 14:00; header: roots,definition,option,target,allowed (one value),fact today
  - `a0e1b7cc-c27-b1g-change-note-2026-09-30.md` — note, 233 lines; 21,955 bytes; uploaded 2026-09-30 14:00
  - `a90badd5-c27-b1g-links.csv` — 1,449 data rows (wc -l 1,450); 187,533 bytes; uploaded 2026-09-30 14:00; links format + action
  - `de001594-c27-b1g-inc296-amharic-2026-09-30.csv` — 7 data rows (wc -l 8); 1,233 bytes; uploaded 2026-09-30 14:00; Amharic approval list
  - `e50af74b-c27-b1g-form-path-dispositions-2026-09-30.csv` — 33 data rows (wc -l 34); 7,760 bytes; uploaded 2026-09-30 14:00; form-path dispositions
- **Base (note):** "definitions_12 · links_12 · categories_7, the operator's exports taken after b1f (529 definitions · 1,452 links · 167 categories)." (The b1h note corrects this: definitions_12 held 528.)
- **What it carried (note §1):** `c27-b1g-definitions.csv` (4 rows) "added 1 (`food_kind`) · changed 3 (`baby_food_type`, `fat_sweet_type`, `packaged_type`) · unchanged 0"; `c27-b1g-links.csv` (1,449, full catalogue) "added 8 · changed 72 · unlinked 3 · unchanged 1,366". "Together: added 9 · changed 75 · unlinked 3 · unchanged 1,366 · refused 0." "three additions of my own, flagged where they occur". Amharic list: 7 rows. Census files: C1 brand position, C2 product origin, and "one-value allowed without fact".
- **Curator's pre-delivery audit:** "§9.1: 0 findings · 992 notes, the same as the base."
- **Supervisor audit** [t991–t993]: CLEAN — 1 new question (`food_kind`), 3 edited; links 79 changed, 1 added, 3 removed; expected preview "added 9 · changed 75 · unlinked 3 · unchanged 1,366 · refused 0". (The supervisor's own link diff reads 79 changed · 1 added; the curator's reads added 8 · changed 72 — both as written.) The curator's "65 one-choice lists missing a fact" list was ruled not a defect list (INC-244). Script `audit_c27b1g.py`.
- **Import result** (operator, t992/t993): "CORRECTLY APPLIED". The console count line is not in the sweep.
- **Rulings that followed** ("C27 — rulings (operator, 2026-09-30) + next files", t999): C1–C3 approved (operator: "approve both" — brand moves low wherever it is not the product's identity, a required filter buyers use, or the price-setting maker; "Locally made / Imported" kept only where local vs imported is a real buyer divide; staples split out). File order: Other leaves → Vehicles → C1–C3 one root per batch.

### 49. C27 · b1h — Food round 3 (F1–F5), with the Other-leaves and Vehicles review notes (no files)
- **Date:** 2026-09-30 (uploaded 17:38 ET) [sweep-0971-1015 §3, t993, t998–t1000]. Asked in the curator prompt "C27 · Food round 3 (b1h) + the "Other" leaves … before Vehicles" [t993].
- **Files:**
  - `2323e47c-c27-b1h-form-path-dispositions-2026-09-30.csv` — 34 data rows (wc -l 35); 8,030 bytes; uploaded 2026-09-30 17:38; form-path dispositions
  - `34ac1138-c27-b1h-inc296-amharic-2026-09-30.csv` — 28 data rows (wc -l 29); 6,333 bytes; uploaded 2026-09-30 17:38; Amharic approval list
  - `68f4231a-c27-b1h-definitions.csv` — 15 data rows (wc -l 16); 37,958 bytes; uploaded 2026-09-30 17:38; definitions format
  - `71e620ec-c27-b1h-links.csv` — 1,448 data rows (wc -l 1,449); 187,941 bytes; uploaded 2026-09-30 17:38; links format + action
  - `a4160bfc-c27-b1h-change-note-2026-09-30.md` — note, 223 lines; 18,681 bytes; uploaded 2026-09-30 17:38
  - `a63455f5-c27-vehicles-review-note-2026-09-30.md` — note, 222 lines; 17,877 bytes; uploaded 2026-09-30 17:38
  - `ab87f77e-c27-other-leaves-review-note-2026-09-30.md` — note, 240 lines; 17,528 bytes; uploaded 2026-09-30 17:38
  - `ae9062dc-c27-vehicles-form-path-dispositions-2026-09-30.csv` — 33 data rows (wc -l 34); 8,135 bytes; uploaded 2026-09-30 17:38; form-path dispositions
- **Base (note):** "definitions_13 · links_13 · categories_8 (529 definitions · 1,446 links · 167 categories), exported after b1g." "Correction to b1g: that note gave definitions_12 as 529. It held 528; the 529th is `food_kind`, which b1g created."
- **What it carried (note §1):** `c27-b1h-definitions.csv` (15 rows) "added 1 · changed 14 · unchanged 0"; `c27-b1h-links.csv` (1,448, full catalogue) "added 2 · changed 49 · unlinked 0 · unchanged 1,397". "Together: added 3 · changed 63 · unlinked 0 · unchanged 1,397 · refused 0." One new question (Pasta Type) [sweep]. Amharic list: 28 rows.
- **Review notes delivered with it (step 1, no files):** "C27 · The 'Other' leaves (O1–O3)" — every catch-all leaf, 15 in all; O1: every Other leaf asks first "What is it? (write it)" (`item_name`, 80 characters, required, not a card). "Study C27 · Batch 3 — Vehicles — review note" — the 8 Vehicles leaves; draft audit "§9.1: 0 findings · 992 notes". The note observes that Other Food & Beverages is not flagged catch-all in the export and sits at order 11.
- **Curator's pre-delivery audit (b1h note):** "§9.1: 0 findings · 990 notes. The base had 992".
- **Supervisor audit** [t999]: CLEAN — 1 new question, 14 changed; 2 links added, 49 changed. Script `audit_c27b1h.py`. Rulings on the two review notes [t999]: Other-leaves rulings 1–6 approved with one change (Other Food: Brand + write-in before "How it's sold"); Vehicles rulings 1–8 approved with ruling 7 = YES (split "Under 250 cc" into "Up to 125 cc" and "126–250 cc"; 16 locks re-pointed). Addendum: add "per gallon" (US diaspora sellers of milk and juice) — delivered inside File 1 as "Per Gallon (US)".
- **Import result** (operator, t1000): "3 added · 63 changed · 0 unlinked · 1397 unchanged · 0 refused … 66 changes written".
- **Coverage bar:** the curator's pre-committed 95% bar; Buses & Vans at 94.9% (74/78) — resolved by DEC-093 [t999, t1007].

### 50. C27 · File 1 (`c27-o`) — the "Other" leaves (O1–O3) + the US gallon
- **Date:** 2026-09-30 (uploaded 18:14 ET) [sweep-0971-1015 §3, t1006–t1009]. The Other-leaves review note (no files) came at 17:38 ET and was ruled at t999 (rulings 1–6 approved with one change: Other Food — Brand + write-in before "How it's sold").
- **Files:**
  - `ab87f77e-c27-other-leaves-review-note-2026-09-30.md` — note, 240 lines; 17,528 bytes; uploaded 2026-09-30 17:38
  - `524705ea-c27-o-links.csv` — 1,473 data rows (wc -l 1,474); 190,751 bytes; uploaded 2026-09-30 18:14; links format + action
  - `9db82737-c27-o-definitions.csv` — 7 data rows (wc -l 8); 12,973 bytes; uploaded 2026-09-30 18:14; definitions format
  - `afba246e-c27-o-change-note-2026-09-30.md` — note, 159 lines; 12,399 bytes; uploaded 2026-09-30 18:14
  - `baef4b1b-c27-o-inc296-amharic-2026-09-30.csv` — 11 data rows (wc -l 12); 2,199 bytes; uploaded 2026-09-30 18:14; Amharic approval list
  - `da832be8-c27-o-form-path-dispositions-2026-09-30.csv` — 17 data rows (wc -l 18); 3,953 bytes; uploaded 2026-09-30 18:14; form-path dispositions
- **Base (note):** "definitions_14 · links_14 · categories_9 (530 · 1,448 · 167), exported after b1h."
- **What it carried (note §1):** `c27-o-definitions.csv` (7 rows) "added 2 (`item_name`, `other_kind-agriculture`) · changed 5 (`food_kind`, `unit_of_sale-food`, `volume_ml`, `beverage_type`, `meat_dairy_type`)"; `c27-o-links.csv` (1,473, full catalogue) "added 26 · changed 29 · unlinked 0 · unchanged 1,418". "Together: added 28 · changed 34 · unlinked 0 · unchanged 1,418 · refused 0." Each of the 15 "Other" leaves opens with a required `item_name`; "Per Gallon (US)" added. Amharic list: 11 rows.
- **Curator's pre-delivery audit:** "§9.1: 0 findings · 994 notes. The base has 990; the 4 new notes are `gender-fashion`'s shoe-size narrowings, inert at Other Beauty".
- **Supervisor audit** [t1007]: CLEAN — each Other leaf opens with required `item_name`, two unconditional cards kept. Three placements differ from the approved tables and were accepted (Other Beauty asks Made in before Condition; Other Agriculture asks Made in before the unit; Other Construction asks Condition after the quantity, with Delivery as a leaf row at the end). Script `audit_c27o.py`.
- **Import result** (operator, t1008/t1009): "28 added · 34 changed · 0 unlinked · 1418 unchanged · 0 refused … 62 changes written".
- **Follow-ups sent** ("C27 — File 1 accepted + rulings (supervisor, 2026-09-30)", t1007): DEC-093; engine facts (INC-357 pairs census, "How it's sold" on the details step, help-length rule); order: Food help file → Vehicles step 2 → C1–C3. Open: Other Commercial — Warranty comes before Condition, inherited from the Commercial root → Commercial batch.

### 51. C27 · Help file 1 — Food first sentences, the help census and the INC-357 write-in census
- **Date:** 2026-09-30 (uploaded 21:08 ET) [sweep-0971-1015 §3, t1014–t1015; sweep-1016-1060 t1016].
- **Files:**
  - `32bd05d6-c27-help-food-change-note-2026-09-30.md` — note, 171 lines; 15,436 bytes; uploaded 2026-09-30 21:08
  - `3a12c2c1-c27-help-food-definitions.csv` — 23 data rows (wc -l 24); 42,845 bytes; uploaded 2026-09-30 21:08; definitions format
  - `75afb175-c27-inc357-writein-pairs-2026-09-30.csv` — 29 data rows (wc -l 30); 7,458 bytes; uploaded 2026-09-30 21:08; header: root,category_path,category_slug,brand list,list order,list allowed_options,write-in,visible_when,write-in order,card_rank,is_required,origin,proposal,reason
  - `a07f56e8-c27-help-food-inc296-amharic-2026-09-30.csv` — 23 data rows (wc -l 24); 12,247 bytes; uploaded 2026-09-30 21:08; Amharic approval list
  - `bd4c9fb6-c27-help-census-2026-09-30.csv` — 117 data rows (wc -l 118); 26,760 bytes; uploaded 2026-09-30 21:08; help census
- **Base (note):** "definitions_15, links_15 and categories_10 (532 · 1,473 · 167 rows), exported after File 1."
- **What it carried (note):** `c27-help-food-definitions.csv` (23 rows) "added 0 · changed 23 · unchanged 0 · refused 0" — only the two help columns; "Food goes from 12 helps over the limit to 0." The whole-catalogue help census `c27-help-census-2026-09-30.csv` ("117 rows: the 82 over the limit, plus 35 flagged for 'e.g.'"). The INC-357 write-in pairs census (`c27-inc357-writein-pairs-2026-09-30.csv`). Amharic list: 23 changed Amharic helps.
- **Curator's pre-delivery audit:** "§9.1: 0 findings · 994 notes, the same as the base."
- **Supervisor audit** [t1015]: CLEAN — 23 definitions, only the two help columns; every first sentence ≤ 60 in EN and AM; every help ≤ 240.
- **Import result** (operator, t1016): "0 added · 23 changed · 0 unlinked · 0 deleted · 0 unchanged · 0 refused … 23 changes written, there is nothing to translate".
- **Follow-ups sent** ("C27 — help file accepted + answers (supervisor, 2026-09-30)", t1015): "e.g." answer; `brand_name` answer; hold the 24 unlinks; ship Vehicles step 2; order: Vehicles step 2 → C1–C3 (each fixing its own root's helps) → the 24 write-in unlinks once cleared.

### 52. C27 · Vehicles step 2
- **Date:** 2026-09-30 (uploaded 21:21 ET) [sweep-1016-1060 §3, t1016–t1018]. The Vehicles review note (no files) came at 17:38 ET the same day and was ruled at t999 (rulings 1–8 approved; ruling 7 = YES, split "Under 250 cc" into "Up to 125 cc" and "126–250 cc").
- **Files:**
  - `a63455f5-c27-vehicles-review-note-2026-09-30.md` — note, 222 lines; 17,877 bytes; uploaded 2026-09-30 17:38
  - `ae9062dc-c27-vehicles-form-path-dispositions-2026-09-30.csv` — 33 data rows (wc -l 34); 8,135 bytes; uploaded 2026-09-30 17:38; form-path dispositions
  - `130c9400-c27-veh-links.csv` — 1,477 data rows (wc -l 1,478); 191,146 bytes; uploaded 2026-09-30 21:21; links format + action
  - `1c8206b0-c27-help-census-2026-09-30-after-vehicles.csv` — 76 data rows (wc -l 77); 19,180 bytes; uploaded 2026-09-30 21:21; help census
  - `9b90baf8-c27-veh-change-note-2026-09-30.md` — note, 236 lines; 19,504 bytes; uploaded 2026-09-30 21:21
  - `ab616b13-c27-veh-form-path-dispositions-2026-09-30.csv` — 33 data rows (wc -l 34); 8,102 bytes; uploaded 2026-09-30 21:21; form-path dispositions
  - `bcb4e92b-c27-veh-inc296-amharic-2026-09-30.csv` — 76 data rows (wc -l 77); 7,684 bytes; uploaded 2026-09-30 21:21; Amharic approval list
  - `e29bcb49-c27-veh-definitions.csv` — 16 data rows (wc -l 17); 54,239 bytes; uploaded 2026-09-30 21:21; definitions format
- **Base (note):** "definitions_17 · links_17 · categories_12 (532 · 1,473 · 167), exported after the Food help file."
- **What it carried (note §1):** `c27-veh-definitions.csv` (16 rows) "added 3 (`model_name`, `part_for`, `wheel_size-bicycles`) · changed 13"; `c27-veh-links.csv` (1,477, full catalogue) "added 4 · changed 18 · unlinked 4 · unchanged 1,451". "Together: added 7 · changed 31 · unlinked 4 · unchanged 1,451 · refused 0." "Help census: 82 → 76 over the limit. Vehicles: 6 → 0." Amharic list: 76 rows. Sweep: on the 8 Vehicles leaves certain facts left open 28 → 0; values outside the register 5 → 0; order problems 2 → 0; form path 28 → 33 rows; coverage Motorcycles 95.8 %, Buses & Vans 94.9 % (passes under DEC-093), Cars and Trucks 95.0 % each.
- **Curator's pre-delivery audit:** "§9.1: 0 findings · 994 notes, the same as the base."
- **Supervisor audit** [t1017]: expectation "added 7 · changed 31 · unlinked 4 · unchanged 1,451 · refused 0"; first sentences ≤ 60 characters (longest EN 54, AM 45); 76 translation rows = 3 new keys, 67 new options, 6 Amharic helps; the importer has no "value still in use" check. Script `audit_c27veh.py`.
- **Import result** (operator, t1018): "7 added · 31 changed · 4 unlinked · 0 deleted · 1451 unchanged · 0 refused … 42 changes written, 3 translated".
- **Follow-ups sent** [t1017]: INC-358; start C1–C3, one root per batch, fixing that root's over-limit helps (76 left); the 24 `brand_name` write-in unlinks wait until N1 is proven in CI.

### 53. C27 · INC-358 (Yadea and Dodai are electric) and C1–C3, batch 1 — Food & Beverages (C3)
- **Date:** 2026-09-30 (both uploaded 22:04 ET) [sweep-1016-1060 §3, t1022–t1024]. INC-358 was asked in the curator message after Vehicles [t1017]: add facts `{"fuel_type-vehicles":"electric"}` to the Yadea and Dodai make options ("a prefill; lock it only with two sources, per DEC-093").
- **Files:**
  - `13fc8717-c27-inc358-definitions.csv` — 1 data rows (wc -l 2); 3,936 bytes; uploaded 2026-09-30 22:04; definitions format
  - `4dce65f1-c27-food-c3-definitions.csv` — 3 data rows (wc -l 4); 9,975 bytes; uploaded 2026-09-30 22:04; definitions format
  - `7a478334-c27-inc358-change-note-2026-09-30.md` — note, 49 lines; 3,740 bytes; uploaded 2026-09-30 22:04
  - `906b4e41-c27-food-c3-links.csv` — 1,474 data rows (wc -l 1,475); 191,087 bytes; uploaded 2026-09-30 22:04; links format + action
  - `b1cd974c-c27-food-c3-inc296-amharic-2026-09-30.csv` — 13 data rows (wc -l 14); 891 bytes; uploaded 2026-09-30 22:04; Amharic approval list
  - `d3952a8e-c27-food-c3-change-note-2026-09-30.md` — note, 147 lines; 10,220 bytes; uploaded 2026-09-30 22:04
  - `f79f561a-c27-food-c3-form-path-dispositions-2026-09-30.csv` — 36 data rows (wc -l 37); 8,927 bytes; uploaded 2026-09-30 22:04; form-path dispositions
- **Base (both notes):** "definitions_18 · links_18 · categories_13 (535 · 1,473 · 167), exported after Vehicles step 2."
- **What they carried:** INC-358 — `c27-inc358-definitions.csv` (1 row) "added 0 · changed 1 (`make-motorcycles`) · refused 0"; locked (two sources per maker) [sweep]. Food C3 — `c27-food-c3-definitions.csv` (3 rows) "added 1 (`pulse_form`) · changed 2 (`grain_type`, `beverage_type`)"; `c27-food-c3-links.csv` (1,474, full catalogue) "added 1 · changed 5 · unlinked 0 · unchanged 1,468"; "Together: added 2 · changed 7 · unchanged 1,468 · refused 0." "Lentils & Pulses" becomes Lentils / ምስር, Field Peas / አተር, Chickpeas / ሽምብራ, Fava Beans / ባቄላ, with the old option kept as "Other Pulses"; new question "Whole or Split / ሙሉ ወይስ ክክ"; new grains Maize Flour, Sorghum, Finger Millet; gesho and bikil become two beverage options [sweep]. Amharic list: 13 rows.
- **Curator's pre-delivery audit:** "§9.1: 0 findings · 994 notes, the same as the base" (both notes).
- **Supervisor audit** [t1023]: INC-358 expectation "changed 1 · added 0 · refused 0"; Food C3 "added 2 · changed 7 · unlinked 0 · unchanged 1,468"; 7 new grain options, nothing deleted. Script `audit_c27c3.py` (also checks dangling references to removed option values and that every `visible_when` value exists).
- **Import result** (operator, t1024): INC-358 "0 added · 1 changed … 1 changes written"; Food C3 "2 added · 7 changed · 0 unlinked · 0 deleted · 1468 unchanged · 0 refused … 9 changes written"; 1 translation approved (13 were listed).

### 54. C27 · C1–C3, batch 2 — Clothing & Shoes
- **Date:** 2026-09-30 (uploaded 22:39 ET) [sweep-1016-1060 §3, t1026–t1028].
- **Files:**
  - `7a912a73-c27-fashion-form-path-dispositions-2026-09-30.csv` — 52 data rows (wc -l 53); 13,438 bytes; uploaded 2026-09-30 22:39; form-path dispositions
  - `9261bf11-c27-help-census-2026-09-30-after-fashion.csv` — 68 data rows (wc -l 69); 17,010 bytes; uploaded 2026-09-30 22:39; help census
  - `9bd0c934-c27-fashion-links.csv` — 1,474 data rows (wc -l 1,475); 191,099 bytes; uploaded 2026-09-30 22:39; links format + action
  - `da765b98-c27-fashion-change-note-2026-09-30.md` — note, 139 lines; 10,768 bytes; uploaded 2026-09-30 22:39
  - `dcf48694-c27-fashion-inc296-amharic-2026-09-30.csv` — 11 data rows (wc -l 12); 3,717 bytes; uploaded 2026-09-30 22:39; Amharic approval list
  - `fc59e353-c27-fashion-definitions.csv` — 8 data rows (wc -l 9); 8,600 bytes; uploaded 2026-09-30 22:39; definitions format
- **Base (note):** "definitions_19 · links_19 · categories_14 (536 · 1,474 · 167), exported after INC-358 and Food C3."
- **What it carried (note §1):** `c27-fashion-definitions.csv` (8 rows) "added 0 · changed 8"; `c27-fashion-links.csv` (1,474, full catalogue) "added 0 · changed 19 · unlinked 0 · unchanged 1,455". "Together: changed 27 · unchanged 1,455 · refused 0." C1: brand moves after the item's own questions, colour and condition on 7 leaves; Jewelry & Watches keeps brand first. C2: "Made in / የተመረተበት" stays on its 5 clothing leaves with three answers [sweep]. "Help census: 76 → 68 over the limit." Amharic list: 11 rows.
- **Curator's pre-delivery audit:** "§9.1: 0 findings · 994 notes, the same as the base"; order check 44 → 0 [sweep].
- **Supervisor audit:** expectation "added 0 · changed 27 · unchanged 1,455" [sweep table]. Script `audit_c27fash.py`.
- **Import result** (operator, t1028): "0 added · 27 changed … 1455 unchanged … 27 changes written"; one approved.

### 55. C27 · C1–C3, batch 3 — Babies & Kids
- **Date:** 2026-09-30 (uploaded 23:02 ET) [sweep-1016-1060 §3, t1030–t1032].
- **Files:**
  - `2d5a923c-c27-help-census-2026-09-30-after-babies.csv` — 64 data rows (wc -l 65); 15,900 bytes; uploaded 2026-09-30 23:02; help census
  - `44e7749e-c27-babies-inc296-amharic-2026-09-30.csv` — 4 data rows (wc -l 5); 1,990 bytes; uploaded 2026-09-30 23:02; Amharic approval list
  - `8b94ef76-c27-babies-change-note-2026-09-30.md` — note, 133 lines; 9,593 bytes; uploaded 2026-09-30 23:02
  - `8beded0f-c27-babies-links.csv` — 1,474 data rows (wc -l 1,475); 191,145 bytes; uploaded 2026-09-30 23:02; links format + action
  - `bf7a2a04-c27-babies-form-path-dispositions-2026-09-30.csv` — 26 data rows (wc -l 27); 6,681 bytes; uploaded 2026-09-30 23:02; form-path dispositions
  - `e858ea77-c27-babies-definitions.csv` — 4 data rows (wc -l 5); 2,655 bytes; uploaded 2026-09-30 23:02; definitions format
- **Base (note):** "definitions_20 · links_20 · categories_15 (536 · 1,474 · 167), exported after Clothing & Shoes."
- **What it carried (note §1):** `c27-babies-definitions.csv` (4 rows) "added 0 · changed 4"; `c27-babies-links.csv` (1,474, full catalogue) "added 0 · changed 16 · unlinked 6 · unchanged 1,452". "Together: changed 20 · unlinked 6 · unchanged 1,452 · refused 0." C1 on 6 leaves; C2: "Made in" unlinked at 6 leaves (Strollers, Feeding, Health, Maternity, Toys, School & Learning), kept at Kids & Baby Clothing and Nursery Furniture [sweep]. "Help census: 68 → 64 over the limit." Amharic list: 4 rows (the 4 changed Amharic helps).
- **Curator's pre-delivery audit:** "§9.1: 0 findings · 994 notes, the same as the base"; order check 27 → 0 [sweep].
- **Supervisor audit:** expectation "added 0 · changed 20 · unlinked 6 · unchanged 1,452" [sweep table]. Script `audit_c27babies.py`.
- **Import result** (operator, t1032): "0 added · 20 changed · 6 unlinked … 1452 unchanged … 26 changes written"; none to approve.
- **Curator message sent with the post-Babies exports** [t1029/t1031]: Sale or Rent / Hire only on types people actually rent; watches ("digital" is a Quartz alias; smartwatches belong in Electronics); DEC-094 standing rule and the census of rows to convert later.

### 56. C27 · C1–C3, batch 4 — Sports & Leisure, with the rent and watch follow-ups
- **Date:** 2026-09-30 (uploaded 23:22 ET) [sweep-1016-1060 §3, t1034–t1036].
- **Files:**
  - `0ba50921-c27-sports-inc296-amharic-2026-09-30.csv` — 15 data rows (wc -l 16); 7,042 bytes; uploaded 2026-09-30 23:22; Amharic approval list
  - `3d5c6588-c27-sports-form-path-dispositions-2026-09-30.csv` — 40 data rows (wc -l 41); 9,853 bytes; uploaded 2026-09-30 23:22; form-path dispositions
  - `6316e990-c27-dec094-market-wording-census-2026-09-30.csv` — 19 data rows (wc -l 20); 7,207 bytes; uploaded 2026-09-30 23:22; header: key,field,part,current text,class,proposal (applied only when the supervisor says {country} has landed),where linked
  - `795cd403-c27-sports-links.csv` — 1,468 data rows (wc -l 1,469); 191,189 bytes; uploaded 2026-09-30 23:22; links format + action
  - `aa0849da-c27-help-census-2026-09-30-after-sports.csv` — 50 data rows (wc -l 51); 12,411 bytes; uploaded 2026-09-30 23:22; help census
  - `b73e6b17-c27-sports-definitions.csv` — 19 data rows (wc -l 20); 20,127 bytes; uploaded 2026-09-30 23:22; definitions format
  - `e6d440bd-c27-sports-change-note-2026-09-30.md` — note, 177 lines; 15,374 bytes; uploaded 2026-09-30 23:22
- **Base (note):** "definitions_21 · links_21 · categories_16 (536 · 1,468 · 167), exported after Babies & Kids."
- **What it carried (note §1 and scope):** `c27-sports-definitions.csv` (19 rows) "added 0 · changed 19"; `c27-sports-links.csv` (1,468, full catalogue) "added 0 · changed 10 · unlinked 2 · unchanged 1,456". "Together: changed 29 · unlinked 2 · unchanged 1,456 · refused 0." The two unlinks: Made in at Musical Instruments, and Offer Type at Solar & Backup Power. C1: Sports Equipment's brand goes low; the root's 14 long helps. F1 — Sale or Rent only on the types people rent (Men's — Suits only; Women's — Dresses only, relabelled "Dresses & Gowns"; Traditional Wear — the occasion garments only; equipment rent kept on named types; printing machines a sale except "Other"). F2 — watches: "digital" means Quartz, smartwatches pointed to Electronics. DEC-094 census file: 10 rows name the market, 4 are Ethiopia-only systems; one exception converted now (Collectible Type's help) [sweep].
- **Curator's counts (sweep):** 14 helps fixed (over-limit 64 → 50); order check 15 → 5 (three notes held for the Sports root review).
- **Supervisor audit:** expectation "added 0 · changed 29 · unlinked 2 · unchanged 1,456" [sweep table]. Script `audit_c27sports.py`.
- **Import result** (operator, t1036): "0 added · 29 changed · 2 unlinked … 1456 unchanged … 31 changes written"; nothing pending in Translations.
- **Follow-ups sent** [t1035, t1037]: the three DEC-094 rulings; a help that sends sellers to another category must name the exact place in its visible first line, and census every other pointer help. Open: Gonfa, Dunguza, Ferikh and Tsimdi left as a sale ("Add any you know are rented").

### 57. C27 · C1–C3, batch 5 — Construction Material, with DEC-094 ruling 1 and the pointer rule
- **Date:** 2026-10-01 (uploaded 10:42 ET) [sweep-1016-1060 §3, t1040–t1042].
- **Files:**
  - `07d9274e-c27-construction-links.csv` — 1,466 data rows (wc -l 1,467); 191,073 bytes; uploaded 2026-10-01 10:42; links format + action
  - `0c982dd8-c27-construction-inc296-amharic-2026-10-01.csv` — 72 data rows (wc -l 73); 45,255 bytes; uploaded 2026-10-01 10:42; Amharic approval list
  - `4fb46e2b-c27-construction-definitions.csv` — 72 data rows (wc -l 73); 162,683 bytes; uploaded 2026-10-01 10:42; definitions format
  - `b0461f5d-c27-help-census-2026-10-01-after-construction.csv` — 39 data rows (wc -l 40); 9,694 bytes; uploaded 2026-10-01 10:42; help census
  - `b2cdbb0a-c27-pointer-census-2026-10-01.csv` — 62 data rows (wc -l 63); 46,460 bytes; uploaded 2026-10-01 10:42; header: attribute_key,linked at,destination named in the first line,disposition,first line before (EN),chars before,first line after (EN),chars after (EN),first line af
  - `ef4e9000-c27-construction-form-path-dispositions-2026-10-01.csv` — 18 data rows (wc -l 19); 4,276 bytes; uploaded 2026-10-01 10:42; form-path dispositions
  - `f8beff80-c27-construction-change-note-2026-10-01.md` — note, 303 lines; 26,151 bytes; uploaded 2026-10-01 10:42
- **Base (note):** "definitions_22 · links_22 · categories_17 (536 · 1,466 · 167), exported after Sports & Leisure."
- **What it carried (note §1 and scope):** `c27-construction-definitions.csv` (72 rows) "added 0 · changed 72"; `c27-construction-links.csv` (1,466, full catalogue) "added 3 · changed 12 · unlinked 0 · unchanged 1,451". "Together: added 3 · changed 84 · unchanged 1,451 · refused 0." ("A preview that keys on category + attribute would read added 0 · changed 15. The total is the same.") Steel & Metals and Tiles & Flooring: brand after Quantity, before Delivery; 3 new leaf Delivery rows; the root's 6 long helps; Power & Hand Tools, Site Machinery & Scaffolding and Roofing reordered (beyond the approved list). DEC-094 ruling 1: six neutral rewrites. Pointer rule: "All 62 helps that pointed elsewhere were censused. 57 rewritten … 3 pointers removed … 2 not pointers."
- **Curator's pre-delivery audit (note head):** "§9.1: 0 findings · 994 notes, identical to the base"; Construction Material (c) "15 → 0", (b) 74 → 74, (f) 1 → 1. Over-limit helps 50 → 39 [sweep].
- **Supervisor audit** [t1041]: expectation "added 3 · changed 84 (or added 0 · changed 87)"; reorders beyond the approved list accepted; pointer rewrites verified. Script `audit_c27constr.py`.
- **Import result** (operator, t1042): "3 added · 84 changed · 0 unlinked · 0 deleted · 1451 unchanged · 0 refused / Ignored (read-only) origin — 3 rows not applied / Import applied — 87 changes written"; none to approve.
- **Follow-ups sent** [t1041, addendum t1043]: do the 24 write-in unlinks now, then Home & Garden; DEC-095 full-path sentences for all 57 pointer lines; preset census (R9); standard sizes as choices; sand and gravel.

### 58. C27 · INC-357 — the 24 write-in unlinks
- **Date:** 2026-10-01 (uploaded 11:55 ET) [sweep-1016-1060 §3, t1046–t1054]. Released by the curator message after Construction: "N1 is now proven … Do the 24 write-in unlinks now" [t1041].
- **Files:**
  - `2b6f5f50-c27-writein-definitions.csv` — 3 data rows (wc -l 4); 18,949 bytes; uploaded 2026-10-01 11:55; definitions format
  - `415d9410-c27-writein-inc296-amharic-2026-10-01.csv` — 3 data rows (wc -l 4); 1,546 bytes; uploaded 2026-10-01 11:55; Amharic approval list
  - `74ce60a0-c27-writein-change-note-2026-10-01.md` — note, 85 lines; 5,989 bytes; uploaded 2026-10-01 11:55
  - `d009ea14-c27-writein-links.csv` — 1,466 data rows (wc -l 1,467); 191,217 bytes; uploaded 2026-10-01 11:55; links format + action
- **Base (note):** "definitions_23 · links_23 · categories_18 (536 · 1,466 · 167), exported after Construction."
- **What it carried (note §1 and scope):** `c27-writein-definitions.csv` (3 rows) "added 0 · changed 3"; `c27-writein-links.csv` (1,466, full catalogue; the 24 rows carry `action=unlink`) "added 0 · changed 0 · unlinked 24 · unchanged 1,442". "Together: changed 3 · unlinked 24 · unchanged 1,442 · refused 0." `brand_name` ("Brand / Maker (write it)", shown when brand-X = Other) is unlinked at the 24 leaves that carry the pair (sweep: 7 Clothing & Shoes, 5 Babies & Kids, 12 Food); it stays at 6 leaves where it is the only brand box (Bicycles, Nursery Furniture, Other Babies & Kids, Other Electronics, Other Fashion, Traditional Wear); three brand helps now read "as on the label; no phone numbers". "No values lost: every listing count is 0 (pre-launch)".
- **Curator's pre-delivery audit (note head):** "§9.1: 0 findings · 994 notes, identical to the base"; counts (a)–(f) unchanged on all 15 roots.
- **Supervisor audit:** expectation the same as the curator's [sweep-1016-1060 §3 table]. Script `audit_c27writein.py`.
- **Import result** (operator, t1054): "yes". The pasted console count line is not in the sources. "Import order mattered: write-in first."

### 59. C27 · C1–C3, batch 6 — Home & Garden
- **Date:** 2026-10-01 (uploaded 11:55 ET, with the write-in batch) [sweep-1016-1060 §3, t1046–t1054].
- **Files:**
  - `7b315b56-c27-home-garden-inc296-amharic-2026-10-01.csv` — 5 data rows (wc -l 6); 2,016 bytes; uploaded 2026-10-01 11:55; Amharic approval list
  - `7e682869-c27-home-garden-change-note-2026-10-01.md` — note, 112 lines; 8,845 bytes; uploaded 2026-10-01 11:55
  - `ac5d3c83-c27-home-garden-form-path-dispositions-2026-10-01.csv` — 22 data rows (wc -l 23); 4,849 bytes; uploaded 2026-10-01 11:55; form-path dispositions
  - `d3e04ad1-c27-home-garden-links.csv` — 1,442 data rows (wc -l 1,443); 188,412 bytes; uploaded 2026-10-01 11:55; links format + action
  - `e73254ee-c27-help-census-2026-10-01-after-home-garden.csv` — 34 data rows (wc -l 35); 8,488 bytes; uploaded 2026-10-01 11:55; help census
  - `f5527fbd-c27-home-garden-definitions.csv` — 5 data rows (wc -l 6); 1,664 bytes; uploaded 2026-10-01 11:55; definitions format
- **Base (note):** "definitions_23 · links_23 · categories_18 with the INC-357 write-in batch applied (536 · 1,442 · 167)." "Import the write-in batch first, then this one."
- **What it carried (note §1 and scope):** `c27-home-garden-definitions.csv` (5 rows) "added 0 · changed 5"; `c27-home-garden-links.csv` (1,442, full catalogue) "added 0 · changed 5 · unlinked 0 · unchanged 1,437". "Together: changed 10 · unchanged 1,437 · refused 0." C1: both brands are card 3 and stay; C2: Made in kept at Furniture, Home Décor, Kitchen & Dining and Religious & Cultural Items; the root's 5 long helps fixed; Warranty and Delivery move after Colour and Condition at Home Appliances, Furniture and Solar & Backup Power.
- **Curator's pre-delivery audit (note head):** "§9.1: 0 findings · 994 notes, identical to the base"; Home & Garden (c) "6 → 0"; over-limit helps 39 → 34 [sweep].
- **Supervisor audit:** expectation "changed 10 · unchanged 1,437" (same as the curator's) [sweep-1016-1060 §3 table]. Script `audit_c27hg.py`.
- **Import result** (operator, t1054): "yes"; none to approve. The pasted console count line is not in the sources.
- **Next named by the note (§6):** Beauty & Personal Care, then the roots with only help fixes: "Real Estate 9 · Electronics 7 · Services 5 · Agriculture 4 · Pets 4 · Commercial 3 · Travel 3."

### 60. C27 · Construction walk fixes — DEC-095 pointer lines, presets, standard sizes, sand and gravel ("walk-fix batch", files A, B, C)
- **Date:** 2026-10-01 (uploaded 12:35 ET) [sweep-1016-1060 §3, t1054–t1055]. Asked in the curator addendum of t1043 (four items: DEC-095 full-path sentences for all 57 pointer lines; census every preset, keep one only where a source shows it clearly dominates (R9); standard sizes as choices plus a census of every number question; sand and gravel as traded).
- **Files:**
  - `02131bb7-c27-walk-preset-census-2026-10-01.csv` — 221 data rows (wc -l 222); 50,167 bytes; uploaded 2026-10-01 12:35; header: kind,"where (leaf, or the definition whose options carry it)",question preset,preset value(s),count,disposition,class,evidence and source
  - `0c41dc53-c27-walk-inc296-amharic-2026-10-01.csv` — 109 data rows (wc -l 110); 48,515 bytes; uploaded 2026-10-01 12:35; Amharic approval list
  - `2409e4cc-c27-walk-number-census-2026-10-01.csv` — 60 data rows (wc -l 61); 15,244 bytes; uploaded 2026-10-01 12:35; header: attribute_key,label,unit,leaves,linked at,standard sizes?,values the market sells,unit the trade quotes,disposition,sources
  - `24baff34-c27-help-census-2026-10-01-after-walk.csv` — 34 data rows (wc -l 35); 8,488 bytes; uploaded 2026-10-01 12:35; help census
  - `34f0812b-c27-walk-links-B.csv` — 1,445 data rows (wc -l 1,446); 188,701 bytes; uploaded 2026-10-01 12:35; links format + action
  - `3f705a94-c27-walk-form-path-dispositions-2026-10-01.csv` — 24 data rows (wc -l 25); 6,137 bytes; uploaded 2026-10-01 12:35; form-path dispositions
  - `5f251bd5-c27-walk-change-note-2026-10-01.md` — note, 380 lines; 35,604 bytes; uploaded 2026-10-01 12:35
  - `62371dc5-c27-walk-pointer-lines-2026-10-01.csv` — 57 data rows (wc -l 58); 44,535 bytes; uploaded 2026-10-01 12:35; header: attribute_key,asked at,destination slug (for the {category:<slug>} token),line before (EN),line after (EN),chars,line after (AM),chars,help after (EN),help afte
  - `649c0840-c27-walk-definitions-C.csv` — 2 data rows (wc -l 3); 6,220 bytes; uploaded 2026-10-01 12:35; definitions format
  - `9c84eab1-c27-walk-definitions-A.csv` — 69 data rows (wc -l 70); 178,913 bytes; uploaded 2026-10-01 12:35; definitions format
- **Base (note):** "definitions_23 · links_23 · categories_18, with the write-in batch and the Home & Garden batch applied (536 · 1,442 · 167)." Import order: write-in batch → Home & Garden → this batch.
- **What it carried (note §1 and scope):** `c27-walk-definitions-A.csv` (69 rows) "added 3 · changed 66"; `c27-walk-links-B.csv` (1,445, full catalogue; 2 rows carry `action=unlink`) "added 3 · changed 38 · unlinked 2 · unchanged 1,402"; `c27-walk-definitions-C.csv` (2 rows) "changed 2". C must land after B (the co-link check only sees links already live). DEC-095: "all 57 rewrites"; slugs in `c27-walk-pointer-lines-2026-10-01.csv` for the `{category:<slug>}` swap. Presets: 221 rows censused; "35 link defaults cleared … and 42 option prefills cleared". Standard sizes: Site Machinery's Rated Power becomes Engine Power (HP) / Motor Power (kW); Roofing's Length becomes Sheet Length; "Every other number question (60) is censused. Five proposals wait for your ruling". Sand, gravel and stone: Type or Size per material; Red Soil added; units aligned. Sweep: result 539 definitions · 1,443 links.
- **Blank-cell warning (note §1):** "35 of the 38 changed link rows only clear a default. If the preview shows changed 3 · unchanged 1,437 instead, the importer read the blank cells as 'no change'" — then clear those 35 defaults in the console link editor. (Sweep-1016-1060 gives the supervisor's version of the fallback line as "changed 69 · unchanged 1,437" = A + B combined: "Apply anyway and tell me; don't edit anything by hand, I'll handle those 35.")
- **Curator's pre-delivery audit (note head):** "§9.1: 0 findings · 994 notes, identical to the base"; Construction counts (a)–(f) "0 · 74 · 0 · 0 · 0 · 1, the same as before"; Construction form path 18 → 22 rows.
- **Supervisor audit** [t1055]: counts match; of the 38 changed links, 35 only clear a default; no answer removed; the problem check across all 167 categories is unchanged (the same 6,743 entries); 109 Amharic rows match. Expected: A+B "added 6 · changed 104 · unlinked 2 · unchanged 1,402 · refused 0", then C "changed 2 · refused 0". Scripts `audit_c27walkfix.py`, `check_walkfix.py`, `check_walkfix2.py`.
- **Import result** (operator, 2026-10-01 13:08 ET, t1058, sweep-supplement-gaps): step 1 (A + B together, expected as above): "yes done this"; step 2 (C alone): "done yes". Supervisor [t1059]: "The walk passed and the batch is fully live." "Only 4 rows to approve, not 109 — … only attribute names go through Translations (the 3 new questions plus the renamed Type or Size); Amharic help text and option labels go live straight from the import … 'The curator's count was wrong.'" The pasted console count line is not in the sources.
- **Open rows left by the note (§6):** R1 number proposals 1–5; R2 market-dependent presets wait for {country}; R3 size systems at six leaves; open research rows (block machine, tower light and bench rebar machine ratings; gravel 00 and 03 mm ranges; the m³ of an ISUZU load; aluzinc lengths; polycarbonate as sold in Ethiopia). → R1/R3 + Beauty batch.

### 61. C27 · R1 / R3 batch and Beauty & Personal Care
- **Date:** 2026-10-01 (pasted and uploaded 13:33 ET) [sweep-1061-1105 §3.1, t1060–t1063; sweep-supplement-gaps t1059–t1060]. Asked in the curator prompt "C27 · Construction walk-fix batch: WALK PASSED (2026-10-01)…" [t1059]: R1 number proposals as ruled; R2 confirmed (nothing to build); R3 search pass for six size systems; open research rows; small fixes; then Beauty & Personal Care full root pass.
- **Files:**
  - `2b191269-c27-beauty-links.csv` — 1,455 data rows (wc -l 1,456); 189,998 bytes; uploaded 2026-10-01 13:33; links format + action
  - `54ef2e83-c27-r1-r3-beauty-change-note-2026-10-01.md` — note, 256 lines; 24,353 bytes; uploaded 2026-10-01 13:33
  - `5da61a97-c27-help-census-2026-10-01-after-beauty.csv` — 32 data rows (wc -l 33); 8,041 bytes; uploaded 2026-10-01 13:33; help census
  - `6601a873-c27-r1-beauty-form-path-dispositions-2026-10-01.csv` — 21 data rows (wc -l 22); 5,366 bytes; uploaded 2026-10-01 13:33; form-path dispositions
  - `7f1c89fa-c27-r1-links.csv` — 1,458 data rows (wc -l 1,459); 190,421 bytes; uploaded 2026-10-01 13:33; links format + action
  - `9243663a-c27-r1-definitions.csv` — 17 data rows (wc -l 18); 24,720 bytes; uploaded 2026-10-01 13:33; definitions format
  - `b626f097-c27-r1-translations-key-names-2026-10-01.csv` — 11 data rows (wc -l 12); 873 bytes; uploaded 2026-10-01 13:33; Amharic approval list
  - `f0495aed-c27-beauty-definitions.csv` — 2 data rows (wc -l 3); 1,260 bytes; uploaded 2026-10-01 13:33; definitions format
- **Base (note):** "definitions_24 · links_24 · categories_19 (539 · 1,443 · 167), exported after the walk-fix batch."
- **What it carried (note §1):** `c27-r1-definitions.csv` (17 rows) "added 11 · changed 6"; `c27-r1-links.csv` (1,458, full catalogue; 3 rows carry `action=unlink`) "added 15 · changed 23 · unlinked 3 · unchanged 1,417"; `c27-beauty-definitions.csv` (2 rows) "changed 2"; `c27-beauty-links.csv` (1,455, full catalogue) "changed 31 · unchanged 1,424". Translations: 11 key names for R1, 0 for Beauty. R1: new list keys replacing typed numbers (pump motor power reusing `motor_power_kw`, battery Ah / kWh lists, washing-machine load, water tanks, water heaters, board and gypsum thickness, gutter girth, pole grades, rebar length as a choice with no prefill). R2 (note §6): the per-market list — nothing built; waits for {country}. Beauty: "(c) 10 → 0".
- **Curator's pre-delivery audit (note §2):** "§9.1: 0 findings · 994 notes, identical to the base"; "(g) Unit of Sale before Quantity: this is now an explicit column of the audit … checked on all 32 leaves … 0 failures".
- **Supervisor audit** [t1061]: passes — "all four [previews] match what the curator stated. The result is 550 attributes and 1,455 links"; "All 167 categories have exactly the same problem list as before ... I first proved the checker catches planted errors." One wrong curator walk line (Traditional Wear's Size System). Expected: R1 "added 26 · changed 29 · unlinked 3 · unchanged 1,417 · refused 0"; Beauty "changed 33 · unchanged 1,424 · refused 0"; approve the 11 new names.
- **Import result** (operator, t1062): "26 added · 29 changed · 3 unlinked · 0 deleted · 1417 unchanged · 0 refused / Import applied — 58 changes written"; 11 names approved. Only the R1 numbers were pasted. The supervisor at t1063 declared both live; CORRECTED at t1071 — the Beauty import had never applied; batch 8 carried the Beauty changes.
- **Follow-ups sent** ("C27 · R1/R3 + Beauty: WALK PASSED (2026-10-01)", t1063): delete `battery_ah` (0 links); walk-line rule ("check `allowed` maps as well as `facts`; one admissible answer means the row disappears"); shorter walks ("At most about 8 steps"); Unit of Sale before size — Beauty gets `unit_of_sale-beauty`; hardwood check ("Convert to a list only if two independent sources agree"); then Real Estate.

### 62. C27 · batch 8 — `battery_ah` delete, Beauty Unit of Sale, hardwood check, Real Estate root pass
- **Date:** 2026-10-01 (uploaded 14:44 ET) [sweep-1061-1105 §3.3, t1069–t1071].
- **Files:**
  - `56e0b533-c27-help-census-2026-10-01-after-b8.csv` — 23 data rows (wc -l 24); 5,957 bytes; uploaded 2026-10-01 14:44; help census
  - `5a2b5a07-c27-b8-definitions.csv` — 13 data rows (wc -l 14); 8,407 bytes; uploaded 2026-10-01 14:44; definitions format
  - `634c2de6-c27-b8-translations-key-names-2026-10-01.csv` — 1 data rows (wc -l 2); 154 bytes; uploaded 2026-10-01 14:44; Amharic approval list
  - `755cb3ef-c27-b8-change-note-2026-10-01.md` — note, 199 lines; 17,390 bytes; uploaded 2026-10-01 14:44
  - `791ec170-c27-b8-delete-definitions.csv` — 1 data rows (wc -l 2); 413 bytes; uploaded 2026-10-01 14:44; definitions format + action
  - `91d8123a-c27-b8-links.csv` — 1,455 data rows (wc -l 1,456); 189,998 bytes; uploaded 2026-10-01 14:44; links format + action
  - `a9330c8a-c27-b8-links-pass2.csv` — 6 data rows (wc -l 7); 1,047 bytes; uploaded 2026-10-01 14:44; links format, no action column
  - `a9b1a326-c27-b8-form-path-dispositions-2026-10-01.csv` — 69 data rows (wc -l 70); 13,752 bytes; uploaded 2026-10-01 14:44; form-path dispositions
- **Base (note):** "R1 / R3 + Beauty, as you report both live (550 definitions · 1,455 links · 167 categories)." "exports_25 equal the R1 / R3 merged draft row for row. The Beauty batch … is not in them."
- **What it carried (note §1):** four files through the attributes import — `c27-b8-definitions.csv` (13 rows) "added 1 · changed 10 · unchanged 2" (if Beauty is not live: "added 1 · changed 12"); `c27-b8-links.csv` (1,455, full catalogue) "changed 35 · unchanged 1,420" (if not live: "changed 51 · unchanged 1,404"); `c27-b8-links-pass2.csv` (6 rows) "added 4 · changed 2"; `c27-b8-delete-definitions.csv` (1 row, `action=delete`) "deleted 1". Translations: 1 key name, Unit of Sale / «የሽያጭ መለኪያ» (`unit_of_sale-beauty`). `battery_ah` (0 links) deleted. Beauty gets "How it's sold"; Brand gives up card 3 at Nails, Hand & Foot Care and at Health & Wellness. Hardwood: "The two-source rule is not met" — thickness, board width and length stay typed. Real Estate root pass: C1 · C2 do not apply; the 9 first sentences over 60 fixed.
- **Supervisor audit** [t1069]: passes. "End result: 550 attributes and 1,459 links." Expected previews: files 1+2 "added 1 · changed 45 · unchanged 1,422 · refused 0" if Beauty was live, or "added 1 · changed 63 · unchanged 1,404" if the earlier Beauty import never applied; pass2 "added 4 · changed 2 · refused 0"; delete "deleted 1".
- **Import result** (operator, t1070): "1 added · 63 changed · 0 unlinked · 0 deleted · 1404 unchanged · 0 refused / Import applied — 64 changes written"; pass2 "4 added · 2 changed · 0 unlinked · 0 deleted · 0 unchanged · 0 refused / Import applied — 6 changes written"; delete "0 added · 0 changed · 0 unlinked · 1 deleted · 0 unchanged · 0 refused / Import applied — 1 changes written"; name approved; walk all yes. The 63-changed line showed "the earlier Beauty import had never applied"; batch 8's files carried the Beauty changes, so Beauty became complete with batch 8 [t1071].
- **Rulings sent** ("C27 · batch 8: WALK PASSED (2026-10-01)", t1071): card 3 at Nails and Health & Wellness kept; per-m² commercial rent deferred, logged; next = Electronics; DEC-094: `imei_registered` — say whether `{country}` token row or Class B. Note §10 waiting: DEC-094 token rows and the per-market list wait for {country}; Class B waits for a second market; "the DEC-088 two-key condition (Weight hidden for Per Kg) is engine work, still queued."

### 63. C27 · batch 9 — Electronics root pass (one row refused, re-issued the same day)
- **Date:** 2026-10-01 — first delivery uploaded 15:49 ET; re-issued definitions file and note uploaded 15:54 ET [sweep-1061-1105 §3.4, t1075–t1081].
- **Files:**
  - `20a4a852-c27-b9-electronics-change-note-2026-10-01.md` — note, 153 lines; 11,348 bytes; uploaded 2026-10-01 15:49
  - `230489b0-c27-b9-electronics-definitions.csv` — 10 data rows (wc -l 11); 207,626 bytes; uploaded 2026-10-01 15:49; definitions format
  - `6a17116b-c27-b9-electronics-links.csv` — 1,459 data rows (wc -l 1,460); 190,583 bytes; uploaded 2026-10-01 15:49; links format + action
  - `c430fe8f-c27-help-census-2026-10-01-after-b9.csv` — 16 data rows (wc -l 17); 4,246 bytes; uploaded 2026-10-01 15:49; help census
  - `c8bbd9fc-c27-b9-electronics-form-path-dispositions-2026-10-01.csv` — 28 data rows (wc -l 29); 6,945 bytes; uploaded 2026-10-01 15:49; form-path dispositions
  - `4c26969e-c27-b9-electronics-change-note-2026-10-01__1_.md` — note, 173 lines; 12,883 bytes; uploaded 2026-10-01 15:54
  - `e90de305-c27-b9-electronics-definitions_1.csv` — 10 data rows (wc -l 11); 206,306 bytes; uploaded 2026-10-01 15:54; definitions format
  (`e90de305-…definitions_1.csv` and `4c26969e-…change-note…__1_.md` are the re-issue; the re-issued note adds the section "Re-issue 2026-10-01 — row 7 refused (`model-phones`)".)
- **Base (note):** "exports_26 (550 definitions · 1,459 links · 167 categories)."
- **What it carried (note §1):** `c27-b9-electronics-definitions.csv` (10 rows) "changed 10"; `c27-b9-electronics-links.csv` (1,459, full catalogue) "changed 7 · unchanged 1,452"; translations 0 key names. Changes (supervisor's summary, t1075): each iPhone offers only the storage sizes Apple sold it in; RAM filled automatically for all 40 iPhone models; USB Flash Drive becomes its own accessory type; UPS boundary between accessories and power equipment spelled out; 7 orders and 9 help lines fixed. Note §3: `imei_registered` is a {country} token row, not Class B.
- **Curator's pre-delivery audit (note §2):** "§9.1: 0 findings · 994 notes, identical to the base"; Electronics "(c) 5 → 0".
- **Supervisor audit** [t1075]: passes (definitions changed 10; links changed 7 · unchanged 1,452); expected preview "changed 17 · unchanged 1,452 · refused 0". `b9issues.txt`: "base 6743 new 6983" — the new entries are iPhone models' `allowed`/`facts` targets (`ram-phones-tablets`, `storage-phones-tablets`) not linked at Feature Phones and Smartwatches; the supervisor called them false alarms (those leaves cannot offer any iPhone series).
- **IMPORT REFUSAL** (operator, t1076): "0 added · 16 changed · 0 unlinked · 0 deleted · 1452 unchanged · 1 refused — Row 7 — Option "apple_iphone_16_16e": too many allowed values — five attributes at most, fifty values each". Diagnosis [t1077]: "The importer allows at most 5 linked questions per option, and the curator gave all 40 iPhone models a sixth (RAM)." (six `allowed` keys: display_tech, network_technology, operating_system, ram-phones-tablets, screen_size-phones, storage-phones-tablets). Prompt "C27 · batch 9 — ROW REFUSED": drop `operating_system` from the 40 iPhone models' `allowed` maps; re-deliver the definitions file; links file stands; AUDIT ADDITION — mirror all of the importer's option gates.
- **Re-issue** [t1078]: `operating_system` removed from the 40 models; "on the refused file's merged state, exactly 40 findings … on the re-issued state, 0 findings · 994 notes"; expected "changed 10, if the refusal stopped the whole file; changed 1 · unchanged 9, if the other nine rows landed." Supervisor verification [t1079]: "the only change is what the curator described".
- **Import result** (operator, discard path, t1080): "0 added · 17 changed · 0 unlinked · 0 deleted · 1452 unchanged · 0 refused / Import applied — 17 changes written"; walk all yes. "Electronics is done, so 10 of the 15 top-level categories are finished." [t1081]
- **Follow-ups sent** ("C27 · batch 9 (Electronics): WALK PASSED (2026-10-01)", t1081): iPhone model refresh (17e, 18 Pro, 18 Pro Max; RAM locked only where two independent sources agree — GSMArena and Wikipedia); next = Services.

### 64. C27 · batch 10 — iPhone model refresh and Services root pass
- **Date:** 2026-10-01 (uploaded 16:16 ET; the same files were attached again at 16:45 with the batch-11 note) [sweep-1061-1105 §3.5, t1088–t1094].
- **Files:**
  - `1d8a235e-c27-b10-form-path-dispositions-2026-10-01.csv` — 88 data rows (wc -l 89); 21,113 bytes; uploaded 2026-10-01 16:16; form-path dispositions
  - `7c4d1694-c27-b10-definitions.csv` — 7 data rows (wc -l 8); 239,978 bytes; uploaded 2026-10-01 16:16; definitions format
  - `80a39d78-c27-b10-change-note-2026-10-01.md` — note, 125 lines; 9,926 bytes; uploaded 2026-10-01 16:16
  - `a03881ba-c27-b10-links.csv` — 1,459 data rows (wc -l 1,460); 190,617 bytes; uploaded 2026-10-01 16:16; links format + action
  - `ad43daac-c27-help-census-2026-10-01-after-b10.csv` — 11 data rows (wc -l 12); 3,034 bytes; uploaded 2026-10-01 16:16; help census
  - `3dc32722-c27-b10-links.csv` — 1,459 data rows (wc -l 1,460); 190,617 bytes; uploaded 2026-10-01 16:45; links format + action
  - `727c8758-c27-b10-change-note-2026-10-01.md` — note, 125 lines; 9,926 bytes; uploaded 2026-10-01 16:45
  - `7d015c8d-c27-b10-form-path-dispositions-2026-10-01.csv` — 88 data rows (wc -l 89); 21,113 bytes; uploaded 2026-10-01 16:45; form-path dispositions
  - `b877b009-c27-b10-definitions.csv` — 7 data rows (wc -l 8); 239,978 bytes; uploaded 2026-10-01 16:45; definitions format
  (The 16:45 copies are byte-identical to the 16:16 files.)
- **Base (note):** "exports_27 (550 definitions · 1,459 links · 167 categories)."
- **What it carried (note §1):** `c27-b10-definitions.csv` (7 rows) "changed 7"; `c27-b10-links.csv` (1,459, full catalogue) "changed 4 · unchanged 1,455"; translations 0 key names. Adds iPhone 18 Pro, 18 Pro Max and 17e (new series `apple_iphone_18`); Driver for Hire can be priced Per Day or Per Month; Languages Spoken moves up on two service forms; 5 help lines shortened.
- **Curator's pre-delivery audit (note §2):** "§9.1: 0 findings"; "Notes 994 → 1,002"; "Services (c) 12 → 0"; form path (Services and Electronics) 88 → 88 rows; "help census 16 → 11. Services goes 5 → 0."
- **Supervisor audit** [t1089]: passes (definitions changed 7; links changed 4 · unchanged 1,455); no importer limit broken. Three wrong curator walk lines (data right): Release Year "offers 2026 only" → it is fixed, the question disappears; iPhone 17e's Battery Capacity "is filled and cannot be changed" → fixed at 4,005, disappears; Driver for Hire's Pricing Basis "opens blank" → opens on Quote on Request. `b10issues.txt`: "base 6863 new 6950" — the new entries are the three new iPhone models' `allowed`/`facts` targets not linked (or outside link scope) at Feature Phones, Smartwatches and Tablets; the supervisor called these checker notes harmless.
- **Import result** (operator, t1092): "0 added · 11 changed · 0 unlinked · 0 deleted · 1455 unchanged · 0 refused / Import applied — 11 changes written, no translation to approve"; walk passed with two comments (→ INC-374, INC-375). "Services is done, so 11 of 15 top-level categories are finished." [t1093]
- **Follow-ups sent** ("C27 · batch 10 (iPhone refresh + Services): WALK PASSED (2026-10-01)", t1093): the four-check walk-line rule (facts, `allowed`, bounds min = max, link default_value); INC-374 heads-up — `"settled": true` in a bounds entry, "Do NOT use it yet; I will say when the importer accepts it"; prepare `settled` on the 18 Pro and 18 Pro Max battery ranges and battery bounds for iPhone Air, 17, 17 Pro and 17 Pro Max; next = Agriculture & Farming. Note §6 waiting: DEC-094 token rows (now including the Services exam and level wording) wait for {country}; Class B waits for a second market; per-m² rent waits for a DEC-079 change.

### 65. C27 · batch 11 — Agriculture & Farming root pass
- **Date:** 2026-10-01. The change note reached the supervisor at 16:45 and again at 16:51 ET, each time with the wrong data files (batch 10's again, byte-identical); the batch-11 CSVs arrived at 17:00 ET [sweep-1061-1105 §3.6, t1095–t1099].
- **Files:**
  - `93a63629-c27-b11-agriculture-change-note-2026-10-01.md` — note, 146 lines; 10,195 bytes; uploaded 2026-10-01 16:45
  - `e6a4c340-c27-b11-agriculture-change-note-2026-10-01__1_.md` — note, 146 lines; 10,195 bytes; uploaded 2026-10-01 16:51
  - `733cd373-c27-b11-agriculture-definitions_1.csv` — 8 data rows (wc -l 9); 8,113 bytes; uploaded 2026-10-01 17:00; definitions format
  - `988e590f-c27-b11-agriculture-links_1.csv` — 1,459 data rows (wc -l 1,460); 190,628 bytes; uploaded 2026-10-01 17:00; links format + action
  (The note was uploaded twice — `93a63629-…` and `e6a4c340-…__1_` are identical. The form-path dispositions and "after-b11" help census files the supervisor asked for are not in the uploads folder.)
- **Base (note):** "exports_28 (550 definitions · 1,459 links · 167 categories)."
- **What it carried (note §1):** `c27-b11-agriculture-definitions.csv` (8 rows) "changed 8"; `c27-b11-agriculture-links.csv` (1,459, full catalogue) "changed 15 · unchanged 1,444"; translations 0 key names. Changes (supervisor's summary, t1099): feed ingredients like Molasses no longer ask Feed Form a second time; duplicate Beehives option switched off; two misplaced search words fixed («ቆሎ» was on coffee, «ማረሻ» on hand tools); 15 order changes; 4 shortened help lines. The note's walk lines come from a form simulator applying four checks (facts; `allowed`; bounds min = max; the link's default).
- **Curator's pre-delivery audit (note §3):** "§9.1: 0 findings · 1,002 notes, identical to the base"; Agriculture (c) → 0, (f) 2 → 2; (g) "8 leaves, 10 unit-and-size pairs, 0 failures; catalogue-wide it stays 36 leaves, 73 pairs, 0 failures"; form path 50 → 50 rows; "help census 11 → 7".
- **Prepared for the INC-374 batch (note §9, "held; nothing ships now"):** `settled` on the two existing ranges — 18 Pro 4,056–4,288 mAh; 18 Pro Max 5,391–5,567 mAh; iPhone 17 pin 3,692 mAh; iPhone Air pin 3,149 mAh; iPhone 17 Pro Max settled range 4,823–5,088 mAh; iPhone 17 Pro settled range 3,988–4,252 (one figure in dispute: Wikipedia 3,988, GSMArena 3,998).
- **Supervisor audit** [t1099]: passes with one defect — Silage: "the curator set Silage's Feed Form to 'Other' and said the question disappears. It doesn't. A forced 'Other' still shows its write-in box, and the text is required". Imported anyway; fix in the next batch; Silage skipped in the walk. `b11issues.txt`: "base 6950 new 6950", no new issues. Rulings from the note [t1095]: the duplicate "Beehives & Beekeeping Supplies" option under Other Agriculture is switched off, Beehives stay under Farm Equipment; iPhone 17 Pro range 3,988–4,252 accepted.
- **Import result** (operator, t1100): "0 added · 23 changed · 0 unlinked · 0 deleted · 1444 unchanged · 0 refused / Import applied — 23 changes written"; walk all yes. "12 of 15 top-level categories are done." [t1101]
- **Follow-ups sent** ("C27 · batch 11 (Agriculture): WALK PASSED (2026-10-01)", t1101): add a Silage option to `feed_form`; simulator rule — "a select settled to `other` stays on the form as a required write-in box. Never settle a row to Other; add the real option instead."; scan the whole catalogue for such rows; next = Commercial Equipment.

### 66. C27 · batch 12 — Silage fix + Commercial Equipment root pass
- **Date:** 2026-10-01 (uploaded 18:14 ET) [sweep-1106-1150 §3, t1108].
- **Files:**
  - `44c8f8c6-c27-b12-settled-to-other-scan-2026-10-01.csv` — 36 data rows (wc -l 37); 8,326 bytes; uploaded 2026-10-01 18:14; settled-to-Other scan
  - `5a29d0bf-c27-b12-commercial-links.csv` — 1,459 data rows (wc -l 1,460); 191,778 bytes; uploaded 2026-10-01 18:14; links format + action
  - `61686e40-c27-b12-commercial-form-path-dispositions-2026-10-01.csv` — 30 data rows (wc -l 31); 9,154 bytes; uploaded 2026-10-01 18:14; form-path dispositions
  - `730f44a0-c27-help-census-2026-10-01-after-b12.csv` — 4 data rows (wc -l 5); 1,015 bytes; uploaded 2026-10-01 18:14; help census
  - `a72b201d-c27-b12-commercial-definitions.csv` — 14 data rows (wc -l 15); 37,610 bytes; uploaded 2026-10-01 18:14; definitions format
  - `b0391367-c27-b12-commercial-change-note-2026-10-01.md` — note, 200 lines; 21,512 bytes; uploaded 2026-10-01 18:14
- **Base (note):** "exports_29 (550 definitions · 1,459 links · 167 categories)."
- **What it carried (note §1–§2):** `c27-b12-commercial-definitions.csv` (14 rows) "changed 14"; `c27-b12-commercial-links.csv` (1,459, full catalogue) "changed 67 · unchanged 1,392". "Together: changed 81 · unchanged 1,392 · refused 0." Translations: 0 key names. One row is a root row: Warranty at Commercial Equipment moves 30 → 50. Feed Form gains Silage / «ሳይሌጅ» (aliases «ገፈራ», "silage"); Feed Type = Silage carries allowed Feed Form = [silage]. The catalogue scan (36 rows): "33 settled + 1 prefilled → 18 + 1 after this batch, plus 4 inert. The scan is part of the pre-delivery audit from now on." Commercial pass: Brand hidden for types with no maker on the list; Power Source hidden for unpowered types; order (c) → 0.
- **Curator's pre-delivery audit (note §3):** "§9.1: 0 findings · 1,002 notes, identical to the base"; Commercial (c) → 0, (f) 5 → 5; (g) catalogue-wide "36 leaves, 73 pairs, 0 failures"; "Catalogue (c) after: 20, all in roots still to pass (Pets 13 · Sports 5 · Travel 2)"; form path 29 → 30 rows; "help census 7 → 4 (Pets 2 · Travel 2)".
- **Supervisor audit** [t1109]: pass — counts match (14 definitions changed; links 67 changed · 1,392 unchanged), no importer limit broken, no new validation issue, all six walk steps hold in simulation. `b12audit.txt`: "defs {'changed': 14}", "links {'unchanged': 1392, 'changed': 67}", "final 550 1459". `b12issues.txt`: "base 6950 new 6952" (two "dup display_order" entries: industrial-equipment and printing-packaging-equipment, order 30); `b12issues_direct.txt` (direct rows only): "base 6950 new 6950", no new issues. Scripts `b12sim.py` (form simulator: a select settled to `other` reports "WRITE-IN (settled Other, text required)", any other single answer "GONE"), `check_direct.py`.
- **Import result** (operator, 2026-10-01 18:33 ET, t1110): "0 added · 81 changed · 0 unlinked · 0 deleted · 1392 unchanged · 0 refused"; "Import applied — 81 changes written". Walk 6 of 6 "yes". Supervisor [t1111]: "Twelve… now thirteen of fifteen roots are done; one more batch finishes the root pass."
- **Rulings sent** ("Batch 12 — result and rulings (2026-10-01)", t1109/t1111): Brand stays hidden on the 14 Commercial types; of the 19 rows still on Other — fix TV & Video (6), Power & Hand Tools (2), Home Appliances (1), Traditional Wear (1) and remove the 4 inert as the curator proposed; the nine Food rows stay as the one recorded exception (INC-357: the list cannot be bounded); Made in at Office Furniture & Fittings: yes (link existing key `product_origin`, optional, after Colour). "After this the scan must read: 9 exception rows, 0 others, 0 inert." → batch 13.

### 67. C27 · batch 13 — the rulings, Pets, Travel and Sports' order rows (closes the root pass)
- **Date:** 2026-10-01 (uploaded 19:40–19:41 ET) [sweep-1106-1150 §3, t1119].
- **Files:**
  - `390d4b0d-c27-b13-definitions-pass2.csv` — 2 data rows (wc -l 3); 16,043 bytes; uploaded 2026-10-01 19:40; definitions format
  - `8b303844-c27-b13-definitions.csv` — 25 data rows (wc -l 26); 56,595 bytes; uploaded 2026-10-01 19:40; definitions format
  - `b5eefa75-c27-b13-change-note-2026-10-01.md` — note, 191 lines; 17,539 bytes; uploaded 2026-10-01 19:40
  - `65a97460-c27-help-census-2026-10-01-after-b13.csv` — 0 data rows (wc -l 1); 110 bytes; uploaded 2026-10-01 19:41; help census
  - `65ca0f97-c27-b13-form-path-dispositions-2026-10-01.csv` — 103 data rows (wc -l 104); 23,277 bytes; uploaded 2026-10-01 19:41; form-path dispositions
  - `71395a82-c27-b13-links.csv` — 1,460 data rows (wc -l 1,461); 192,618 bytes; uploaded 2026-10-01 19:41; links format + action
  - `8b44f1bb-c27-b13-links-pass2.csv` — 1 data rows (wc -l 2); 318 bytes; uploaded 2026-10-01 19:41; links format, no action column
  - `f03600c0-c27-b13-settled-to-other-scan-2026-10-01.csv` — 9 data rows (wc -l 10); 1,947 bytes; uploaded 2026-10-01 19:41; settled-to-Other scan
- **Base (note):** "exports_30 (550 definitions · 1,459 links · 167 categories)."
- **What it carried (note §1):** four files through the attributes import, in order: `c27-b13-definitions.csv` (25 rows) "changed 25"; `c27-b13-links.csv` (1,460, full catalogue) "added 1 · changed 36 · unchanged 1,423"; `c27-b13-links-pass2.csv` (1 row) "added 1"; `c27-b13-definitions-pass2.csv` (2 rows) "changed 2". "Together: added 2 · changed 63 · unchanged 1,423 · refused 0. The catalogue ends at 550 definitions · 1,461 links." Translations: 0 key names. Content (sweep): all batch-12 rulings built (Decoder / Streaming Box / DVD player makers; Brand hidden for Ladder, Safety Gear, Injera Mitad; Beads / «ዶቃ» in Material; nine Food rows marked "exception"; four inert rows gone; Made in linked at Office Furniture & Fittings); Pet Supplies & Food gets a Unit of Sale (card 3); two options inactive for one-home (Aquarium Supplies at Pet Supplies; Day Trip at Attractions); Restaurants: Cuisine asked for restaurants and fast food only; Sports' 5 order rows fixed.
- **Curator's pre-delivery audit (note §3):** "§9.1: 0 findings · 1,002 notes, at the base and after each of the four files"; "(c) catalogue-wide 20 → 0"; "(f) 14 → 14"; "(g) Pet Supplies joins: 37 leaves, 75 pairs, 0 failures"; form path (Pets, Travel, Sports) 89 → 103 rows; "help census 4 → 0". Note §10: "Every root is now passed: order (c) is 0 catalogue-wide, the help census is 0, and the scan holds only the nine ruled exceptions."
- **For ruling, nothing built (note §9):** birds by the pair; Canal+ in the decoder's Service list; bird, small-animal and fish food (Brand list and Life stage — "Hiding a row for one pet and one product needs a two-key condition, which is engine work"); dog breed → Size.
- **Supervisor audit** [t1120]: pass at every import point; three imports, not four (files 1+2 together). `b13audit.txt` (file 1 + file 2 against the supervisor's merged state): "defs {'changed': 25}", "links {'added': 1, 'unchanged': 1413, 'changed': 46}", "final 550 1460" — the curator's links line is changed 36 · unchanged 1,423; both as written. `b13iss.txt`: "base 6950 new 6956" (six new "allowed target not linked" entries: `pet_type` → `brand-pet` at other-pets-animals and pet-services). Scripts `b13sim.py` (form simulator, inactive options honoured), `b13checks.py`, `b13pass2.py`.
- **Import result** (operator, 2026-10-01 19:59 ET, t1121): A (files 1+2) "1 added · 61 changed · 0 unlinked · 0 deleted · 1423 unchanged · 0 refused", "Import applied — 62 changes written"; B (file 3) "1 added · 0 changed · 0 unlinked · 0 deleted · 0 unchanged · 0 refused", "1 changes written"; C (file 4) "0 added · 2 changed … 0 refused", "2 changes written". Walk 7 of 7 with one finding (Life stage offered for fish and birds). Supervisor [t1122]: "The root pass is closed".
- **Rulings sent** ("Batch 13 — result and rulings (2026-10-01)", t1122): Star class stays third at Hotels and Resorts; Canal+ inactive and its alias off Decoder; birds by the pair — build it (a new key must start `unit_of_sale-`); dog size bands (Small up to 10 kg · Medium 11–25 kg · Large 26–44 kg · Giant 45 kg and over) in Size's help, a breed prefills and never locks; Life stage for dog/cat food and treats only, others settled to All stages as a stand-in until INC-381; Brand for bird and small-animal food left whole until INC-381. → batch 14.

### 68. C27 · batch 14 — follow-ups: Canal+, birds by the pair, dog sizes, Life stage
- **Date:** 2026-10-01 (uploaded 21:33 ET) [sweep-1106-1150 §3, t1125].
- **Files:**
  - `1baabf24-c27-b14-settled-to-other-scan-2026-10-01.csv` — 9 data rows (wc -l 10); 1,947 bytes; uploaded 2026-10-01 21:33; settled-to-Other scan
  - `294eed4d-c27-b14-translations-key-names-2026-10-01.csv` — 1 data rows (wc -l 2); 152 bytes; uploaded 2026-10-01 21:33; Amharic approval list
  - `82a0bccd-c27-b14-form-path-dispositions-2026-10-01.csv` — 26 data rows (wc -l 27); 6,643 bytes; uploaded 2026-10-01 21:33; form-path dispositions
  - `b09c9d67-c27-b14-change-note-2026-10-01.md` — note, 116 lines; 9,844 bytes; uploaded 2026-10-01 21:33
  - `ea2a87c2-c27-b14-links.csv` — 1,462 data rows (wc -l 1,463); 192,873 bytes; uploaded 2026-10-01 21:33; links format + action
  - `ffad2393-c27-b14-definitions.csv` — 7 data rows (wc -l 8); 12,717 bytes; uploaded 2026-10-01 21:33; definitions format
- **Base (note):** "exports_31 (550 definitions · 1,461 links · 167 categories)."
- **What it carried (note §1):** `c27-b14-definitions.csv` (7 rows) expected "added 1 · changed 6"; `c27-b14-links.csv` (1,462, full catalogue) expected "added 1 · unchanged 1,461". "Together: added 2 · changed 6 · unchanged 1,461 · refused 0. The catalogue ends at 551 definitions · 1,462 links." Translations: 1 key name, Unit of Sale / «የሽያጭ መለኪያ» (`unit_of_sale-pets`). Canal+ Service option inactive and Decoder no longer answers to "Canal+"; Birds & Small Pets gets Unit of Sale as card 3 before Quantity (Per Animal · Per Pair · Other; a new key); dog size limits in Size's help, 4 of 17 breeds prefill; Life stage: Puppy / Kitten inactive, Puppy and Kitten new, Dog and Cat own four stages, Fish / Bird / Small Animal / Universal / Other settled to All stages.
- **Life stage is a stand-in (note §5):** "The value All stages is stored on fish and bird food. When the two-key condition (INC-381) lands, the row becomes a true hide and the five settles come out."
- **Curator's pre-delivery audit (note §6):** "§9.1: 0 findings · 1,018 notes (base 1,002)"; "The 16 new notes are all the Life stage stand-in"; "(c) stays 0 catalogue-wide; (f) 14 → 14; (g) Birds & Small Pets joins: 38 leaves, 76 pairs, 0 failures"; scan "9 exception rows · 0 others · 0 inert"; form path (Pets) 27 → 26 rows.
- **Supervisor audit** [t1126]: pass. Import both files together, expect "2 added · 6 changed · 1,461 unchanged · 0 refused". Supervisor wrote "The 24 new notes are the Life stage stand-in at two leaves that never ask it" — the curator says 16; `b14iss.txt` lists 24 new entries (14 "allowed target not linked" + 10 "facts target not linked", at other-pets-animals and pet-services), "base 6956 new 6980". Both as written. `b14audit.txt`: "defs {'added': 1, 'changed': 6}", "links {'added': 1, 'unchanged': 1461}", "final 551 1462".
- **Import result** (operator, 2026-10-01 21:41 ET, t1127): "2 added · 6 changed · 0 unlinked · 0 deleted · 1461 unchanged · 0 refused", "Import applied — 8 changes written"; translation approved; walk 5 of 5. The operator on walk check 1: "did we not do this walk recently and why do we have to repeat these walks again?" → supervisor rule [t1128]: "From now on a walk line appears only when it exercises a form behaviour that has not been walked yet; a data-only change the audit proves gets no walk line."
- **Open follow-ups (note §8):** INC-374 (`settled`) and INC-381 (the two-key condition) wait for the engine; DEC-094 token rows and the per-market list wait for {country}; Class B waits for a second market.

### 69. C27 · batch 15 — dog sizes by the four-fifths test (one Breed row)
- **Date:** 2026-10-01 (uploaded 21:58 ET) [sweep-1106-1150 §3, t1131].
- **Files:**
  - `118607dd-c27-b15-definitions.csv` — 1 data rows (wc -l 2); 5,032 bytes; uploaded 2026-10-01 21:58; definitions format
  - `8083f617-c27-b15-change-note-2026-10-01.md` — note, 78 lines; 6,557 bytes; uploaded 2026-10-01 21:58
- **Base (note):** "exports_32 (551 definitions · 1,462 links · 167 categories). Definitions and links match my batch-14 merged state cell for cell."
- **What it carried (note §1–§2):** `c27-b15-definitions.csv`, 1 row (Breed, `breed-pets`), expected "changed 1". "seven dog options gain a Size prefill. Nothing else". Rule: a breed prefills Size when at least four fifths of its weight range lies in one band (Small up to 10 kg · Medium above 10 to 25 kg · Large above 25 to under 45 kg · Giant 45 kg and over); "A prefill only. No breed carries a lock". Sweep: 11 of 17 breeds now prefill Size, none locked.
- **Curator's pre-delivery audit (note §4):** "§9.1: 0 findings · 1,018 notes, the same as the base"; scan "9 exception rows · 0 others · 0 inert"; "No walk, as ruled."
- **Outside the file (note §5):** "Categories export: Other Food & Beverages now sorts at 1000999, where the earlier export had 11. I did not change it" (the supervisor: it is the app migration `a35e45fa`).
- **Supervisor audit** [t1132]: pass (only the Breed row's options change; seven breeds gain a prefill; none locked). Import instruction: alone, expect "0 added · 1 changed · 0 refused"; no Translations step, no walk.
- **Import result:** not reported on the day. On 2026-10-02 the supervisor found no batch 15 import result in the conversation [t1172]; the operator re-uploaded the file: "alreaded added, so none applied" [t1173]. Sweep-1151-1195 §3: "Status: IMPORTED (confirmed 2026-10-02)."
- **Operator direction given with this batch** (2026-10-01 21:58 ET, t1131): on German Shepherd — "MY ANSWER KEEP SAME"; and "SUCH DETAILNESS FOR A CATEGORY THAT DOESNT HAVE THAT MUCH TRADE MAY NOT BE IMPORTANT, WE NEED TO REALLY LOOK INTO WHICH ITEMS AND SERVICES ARE REALLY ADVERTIZED IN ETHIOPIA AND WHAT IS LEST THERE." → supervisor ruling to the curator: catalogue effort follows real trade; stop refining low-volume leaves; no further Pets work; next = the market census.

### 70. C27 — market census (read-only; nothing built)
- **Date:** note "Date read: 2026-10-01"; delivered to the supervisor 2026-10-02 07:31 ET [sweep-1106-1150 §2 item 16 and §3, t1145]. Commissioned in the curator message "Batch 15 — result, and a change of direction (2026-10-01)" [t1132] after the operator's ruling that catalogue effort follows real trade.
- **Files:**
  - `0d3771d7-c27-market-census-2026-10-01.md` — note, 607 lines; 59,589 bytes; uploaded 2026-10-02 07:31
  - `72768468-c27-market-census-data-2026-10-01.csv` — 365 data rows (wc -l 366); 57,120 bytes; uploaded 2026-10-02 07:31; header: source,date_read,category,subcategory,item,count,basis,url,our_home
- **What it carried (note §1):** "Counted: 812,942 listings on Jiji Ethiopia"; cross-checks Engocha (34,073 listings), Ethiopia Property Centre (7,039), four job boards, Telegram channel rankings and business directories. "Half of all ads are electronics, and one line is 42%. Laptops carry 342,982 ads". "Our catalogue has a home for at least 98.0% of counted listings, and at most 99.3%. 5,822 (0.7%) have none: CVs, sexual wellness, alcohol, software, businesses for sale and job vacancies." "Jobs is the one whole section we lack." "By your rule the priority tier is 18 leaves (80.6%)"; reading B (three bulk lines set aside: the laptop line 342,982, wheelchairs 43,696, crutches 10,983) gives 29 leaves. "25 leaves have no Jiji category landing on them and 37 more have little." Twelve proposals P1–P12 for the tier leaves (§2.5). Table 3 ranks "our 167 categories" by counted listings.
- **Not read (note §7):** Jiji's Cars page and 26 small subcategory pages (the † remainders, 32,523 listings or 4.0% in all; 10,858 without Cars); most Jobs and CV pages; Mekina refused the reader; Qefira is closed; Telegram posts and Facebook.
- **Supervisor check** [t1146]: recomputed from the data file — "the 812,942 total, the 17 category totals and the 29-leaf ranking all reproduce" (175 Jiji rows). "It is the trade record and it is closed. Do not read the §7 pages; no addresses are coming."
- **Operator ruling** (2026-10-02 07:31 ET, t1145): "keep sexual wellness as well as alcohol etc out."
- **Supervisor rulings sent to the curator** [t1146, "Supervisor rulings (2026-10-02) — census accepted; vehicles first, then the census rows."]: tier = reading B (29 leaves); Pets & Animals stays closed (the seven breeds wait); Vehicles joins by operator priority; Jobs and Tenders — no review note (deferred to v2 by the operator on 2026-07-19); kept-out list (DEC-100, REQ-028, DEC-060); "The 100-ad rule (replaces 'nothing outside the tier'): a missing type or maker goes in when a page you read shows 100 or more ads for it, whichever leaf it is in. Below 100 it stays with Other."; build nothing on INC-381 or DEC-094 `{country}` tokens; the held INC-374 batch stays held. The census rows became batch 17.
- **Import result:** none (read-only).
- **Open:** sweep-1106-1150 §3 records as unclear whether "the seven dog breeds … Not accepted" are the seven breeds proposed in the census note (seven breeds with 1,010 ads the list lacks, note §2.4) or the seven size-prefill breeds of batch 15.

### 71. C27 · batch 16 — vehicle make and model lists (definitions only)
- **Date:** 2026-10-02 (curator report and files uploaded 09:13 ET; the same three files were attached again at 12:15 ET) [sweep-1151-1195 §3, t1163]. Commissioned as PART 1 of the combined curator message of t1146 ("Supervisor rulings (2026-10-02) — census accepted; vehicles first, then the census rows."); first drafted at t1140 after the operator's request of 2026-10-01 22:56 ET (makes without models, Tesla Cybertruck missing, lists to be alphabetical).
- **Files:**
  - `234e5bd3-c27-b16-change-note-2026-10-02.md` — note, 307 lines; 28,579 bytes; uploaded 2026-10-02 09:13
  - `3a1f5d1c-c27-b16-settled-to-other-scan-2026-10-02.csv` — 9 data rows (wc -l 10); 1,947 bytes; uploaded 2026-10-02 09:13; settled-to-Other scan
  - `745c6d38-c27-b16-definitions.csv` — 12 data rows (wc -l 13); 236,841 bytes; uploaded 2026-10-02 09:13; definitions format
  - `0be4d24f-c27-b16-change-note-2026-10-02__1_.md` — note, 307 lines; 28,579 bytes; uploaded 2026-10-02 12:15
  - `15df7fd3-c27-b16-settled-to-other-scan-2026-10-02_1.csv` — 9 data rows (wc -l 10); 1,947 bytes; uploaded 2026-10-02 12:15; settled-to-Other scan
  - `a23e5441-c27-b16-definitions_1.csv` — 12 data rows (wc -l 13); 236,841 bytes; uploaded 2026-10-02 12:15; definitions format
  The `_1` / `__1_` copies uploaded at 12:15 are byte-identical to the 09:13 files (checked with `diff` for this record).
- **Base (note):** "the batch-15 merged state (551 definitions · 1,462 links · 167 categories)."
- **What it carried (note §1):** one file, `c27-b16-definitions.csv`, 12 rows, expected "changed 12". "No links file and no categories file." "Only the options column changes in each of the 12 rows. No option value is renamed or removed." Per key (options before → after, new): `make-cars` 44 → 67 (23); `model-cars` 209 → 618 (409); `make-trucks` 19 → 20 (1); `model-trucks` 43 → 95 (52); `make-buses-vans` 17 → 18 (1); `model-buses-vans` 35 → 55 (20); `make-motorcycles` 22 → 22 (0); `model-motorcycles` 40 → 57 (17); `make-heavy-machinery` 15 → 15 (0); `compatible_make` 95 → 116 (21); `part_brand` 9 → 9 (0); `part_for` 6 → 6 (0). **Total: 544 new, 31 existing options edited.** "Counts include each make's Other. Without them: Cars 165 → 551 models, Trucks 24 → 75, Buses & Vans 18 → 37, Motorcycles 18 → 35." Order: make lists alphabetical by English label, Other last, Universal first in Compatible Make; model lists follow their make, numbers in numeric order. Tesla Cybertruck added.
- **Six points for ruling (note §2):** (1) Part For › Car is at the importer's 50-value limit — five new car makes joined (Infiniti, Avatr, GMC, DFSK, Zotye), the other 18 are offered only when Part For is blank; (2) Sinotruk not on the Cars list; (3) ten makes still end with Other only (Golden Dragon and nine motorcycle makes); (4) Karry and DFSK on two lists; (5) makes Jiji prints that were not added (§4.3); (6) "`model-cars` now holds 618 options … I know of no importer ceiling on option count".
- **Curator's pre-delivery audit (note §6):** "§9.1: 0 findings · 1,160 notes (base 1,018)" — "All 142 new notes are one kind: a new car model's body-style prefill at Vehicle Hire"; scan "9 exception rows · 0 others · 0 inert"; importer gates pass on all 551 definitions; round trip "539 definition rows and all 1,462 links are untouched."
- **Supervisor audit** [t1164]: PASS on content — "12 definitions changed, 544 new options, no value renamed or removed"; "31 existing options edited"; Cars 66 makes · 551 models, Trucks 19 · 75, Buses & Vans 17 · 37, Motorcycles 21 · 35 (the note's table counts options, each list's Other included — `make-cars` 67; the curator's report and the supervisor count makes without it — 66). **Blocker:** the importer refuses any list over 400 options (`MAX_OPTIONS`, `registry.ts:27`, `gate.ts:522`) → DEC-103 (400 → 1,500). Rulings on the six points [t1164, t1170, t1174]: (1) leave as built; the 50-value ceiling rises to 150 with the next migration and the 18 remaining car makes join Part For › Car in batch 18; (2) Sinotruk stays off Cars; (3) the ten Other-only makes stay — the Model row is shown for them, optional, with Other as its only choice; (4) Karry and DFSK on both lists; (5) nothing more added from §4.3; (6) "Your file stands as delivered". Scripts `audit_b16.py`, `audit_b16b.py`.
- **Import result:** held from 09:13 until DEC-103 was live. After Publish of commit `5e09c8d3` the operator imported it: "done" against "expect 0 added · 12 changed · 0 refused" (2026-10-02, reported 15:24 ET, t1179). Batch 17 was imported before it (13:21 ET).
- **Open follow-ups:** note §8 — INC-374, INC-381 and DEC-094 wait for the engine; the held INC-374 batch stays held. Whether the operator pasted the short curator note "DEC-103 is live … Batch 16 is imported: 12 changed, 0 refused" is not confirmed [sweep-1151-1195 §3].

### 72. C27 · batch 17 — the census rows (new leaf Household & Cleaning; 49 makers; 32 brand lists alphabetical)
- **Date:** 2026-10-02 (curator report and files uploaded 12:15 ET) [sweep-1151-1195 raw notes t1169].
- **Files:**
  - `122dc20d-c27-b17-definitions.csv` — 51 data rows (wc -l 52); 402,706 bytes; uploaded 2026-10-02 12:15; definitions format
  - `178098cb-c27-b17-links.csv` — 1,469 data rows (wc -l 1,470); 195,226 bytes; uploaded 2026-10-02 12:15; links format + action
  - `2031aeea-c27-b17-categories.csv` — 1 data rows (wc -l 2); 513 bytes; uploaded 2026-10-02 12:15; categories format
  - `4b04f1b7-c27-b17-maker-check-2026-10-02.csv` — 67 data rows (wc -l 68); 14,642 bytes; uploaded 2026-10-02 12:15; header: maker,our leaf,list,in the file,ads in Jiji's Brand filter,titles naming the maker,products in the titles,page read 2026-10-02,note
  - `7c8bf440-c27-b17-settled-to-other-scan-2026-10-02.csv` — 9 data rows (wc -l 10); 1,947 bytes; uploaded 2026-10-02 12:15; settled-to-Other scan
  - `9daea624-c27-b17-translations-key-names-2026-10-02.csv` — 5 data rows (wc -l 6); 462 bytes; uploaded 2026-10-02 12:15; Amharic approval list
  - `c647441a-c27-b17-change-note-2026-10-02.md` — note, 225 lines; 21,561 bytes; uploaded 2026-10-02 12:15
- **Base (note):** "the batch-16 merged state (551 definitions · 1,462 links · 167 categories). Import batch 16 first."
- **What it carried (note §1, §3):** `c27-b17-categories.csv` (1 row) expected "added 1"; `c27-b17-definitions.csv` (51 rows) expected "added 4 · changed 47"; `c27-b17-links.csv` (1,469, full catalogue) expected "added 7 · changed 24 · unchanged 1,438". "The catalogue ends at 168 categories · 555 definitions · 1,468 link rows in the next export." Translations: approve 1 category name and 4 key names. New leaf **Home & Garden › Household & Cleaning** / «የቤትና የጽዳት ዕቃዎች» (order 7, icon SprayCan). New questions: Supplement Type, Mobility Aid Type (Health & Wellness), Item Type (new leaf), Brand at Plumbing & Sanitary (water pumps only). Home Appliances: 15 types; Power & Hand Tools: 8 types; Mejlis as a furniture type; Flats (shoes); Derma Roller; camera types Recorder (DVR / NVR), CCTV Kit, Access Control; Smartphones, Feature Phones and Tablets each get their own Brand row. "49 makers added; 18 rows not added." "32 lists reordered" (alphabetical by English label, Other last); "23 of the 32 rows change in order only." "122 options are new."
- **Held for ruling (note §2):** Kirkland (1,375 ads, every title read is minoxidil 5%); V380Pro (name of a viewing app, not of a maker); SRNE; Now Foods.
- **Curator's pre-delivery audit (note §7):** "§9.1: 0 findings · 1,160 notes"; scan "9 exception rows · 0 others · 0 inert"; "(f) 14 → 14"; form-path replica "555 → 562 rows"; importer gates pass on all 555 definitions.
- **Supervisor audit** [t1170]: PASS; importable at once and independent of batch 16 ("the two batches share no list, and nothing in 17 refers to anything 16 adds"). Counts: "122 new options, and 23 of the changed lists are reordered only"; "all 33 brand lists are alphabetical with Other last" (the curator says 32). Rulings: V380Pro out; SRNE and Now Foods in batch 18; Kirkland/minoxidil — operator decision pending. Audit output `b17_audit.txt`: "defs {'added': 4, 'changed': 47}"; "links {'added': 4, 'changed': 27, 'unchanged': 1438}"; "final 555 1466". (The curator's and operator's links line is added 7 · changed 24; the supervisor's own diff reads added 4 · changed 27 — both as written; the supervisor's merge keeps a leaf's direct row over an inherited echo, `merge_b17.py`.)
- **Import result** (operator, 2026-10-02 13:21 ET, t1173): categories "1 added · 0 changed · 0 retired · 0 reactivated · 0 deleted · 0 unchanged · 0 refused — Import applied — 1 changes written"; definitions "4 added · 47 changed · 0 unlinked · 0 deleted · 0 unchanged · 0 refused — Import applied — 51 changes written"; links "7 added · 24 changed · 0 unlinked · 0 deleted · 1438 unchanged · 0 refused; Ignored (read-only) origin — 3 rows not applied; Import applied — 31 changes written"; "five approved". Batch 17 was imported BEFORE batch 16 (which waited for the option-limit change).
- **Operator ruling on Kirkland** (t1173): "about kirkland lets keep everything uniform rather than creating exception." Supervisor reading [t1174]: no exception for a medicine → stays out for good.
- **Open follow-ups (note §2 "Seen, not changed"):** Health & Wellness grades every item as Sealed / New or Opened ("A second scale needs its own ruling"); Derma Roller is asked the leaf's Brand; Other Home & Garden has no line pointing to the new leaf.

### 73. C27 · batch 18 — Part For, two makers, one finder word, `own_place`
- **Date:** 2026-10-03 (curator report pasted and files uploaded 12:32 ET) [sweep-1196-1240 raw notes t1229]. Batch 18 was defined in the curator note of t1224 (build on the batch-17 merged state; limits live: an option's allowed list up to 150 values, options per list 1,500).
- **Files:**
  - `1348bbc7-c27-b18-definitions.csv` — 5 data rows (wc -l 6); 17,697 bytes; uploaded 2026-10-03 12:32; definitions format
  - `2af1045c-c27-b18-change-note-2026-10-03.md` — note, 63 lines; 4,649 bytes; uploaded 2026-10-03 12:32
  - `414202c1-c27-b18-links.csv` — 1,468 data rows (wc -l 1,469); 195,094 bytes; uploaded 2026-10-03 12:32; links format + action
  - `55d81e79-c27-b18-categories.csv` — 9 data rows (wc -l 10); 1,793 bytes; uploaded 2026-10-03 12:32; categories format
  - `c724ed00-c27-b18-settled-to-other-scan-2026-10-03.csv` — 9 data rows (wc -l 10); 1,947 bytes; uploaded 2026-10-03 12:32; settled-to-Other scan
- **Base (note):** "my batch-17 merged state, with batch 16 in (168 categories · 555 definitions · 1,468 links). No new export was used."
- **What it carried (note §1, §3):** `c27-b18-categories.csv` (9 rows) expected "changed 9"; `c27-b18-definitions.csv` (5 rows) expected "changed 5"; `c27-b18-links.csv` (1,468, full catalogue) expected "changed 1 · unchanged 1,467". Part For › Car gains 18 makes (Arcfox, Buick, Dacia, Daewoo, Deepal, Denza, Fiat, GAC, Genesis, Karry, Lincoln, Lynk & Co, Mini, Opel, Porsche, Radar, SsangYong, Xiaomi) — "The list goes from 50 to 68 values"; Now Foods / «ናው ፉድስ» (alias "Now") on the beauty Brand list, offered for Supplements & Vitamins only; SRNE / «ኤስአርኤንኢ» on the solar Brand list; "V380" replaces the finder word "Wi-Fi camera" on Security Camera; `capabilities` = `own_place` on nine leaves (apartments-condos, commercial-property, condominiums, houses, land-plots, new-developments, other-real-estate, roommates-shared, short-term-rentals); Kirkland stays out. Definition rows changed: `part_for`, `brand-beauty`, `product_type-health-wellness`, `brand-solar`, `camera_type`. Gates (note §4): one allowed list above 50 (Part For › Car › Compatible Make at 68; ceiling 150); only `model-cars` (618) above 400 options (ceiling 1,500).
- **Curator's concern (note §2):** in its last export (categories_27, 2026-10-01) all nine cells carry `map_pin`, as does `realtor-services`; the file sets each cell to `own_place` alone.
- **Curator's pre-delivery audit (note §5):** "§9.1: 0 findings · 1,160 notes"; scan "9 exception rows · 0 others · 0 inert"; "(f) 14 → 14"; form-path replica 562 rows, unchanged; "Two options are new."
- **Supervisor audit** [t1230]: passes; importable as is. Supervisor slip: it had told the curator the nine capabilities cells were empty (from an older catalogue copy); safe because nothing reads `map_pin` any more. Two capabilities in one cell are written with a pipe: `map_pin|own_place`. Scripts `merge_b18.py` and `importer_caps.py` (ceilings: aliases 1–5 of 1–32 characters, no duplicate; `allowed` ≤ 5 targets of 1–150 values; `facts` ≤ 20). The file named `b18_audit.txt` in the scratchpad is not text: it is a saved copy of the merged state (168 categories · 555 definitions · 1,468 links).
- **Import result** (operator, 2026-10-03 12:38 ET, t1231): categories "0 added · 9 changed · 0 retired · 0 reactivated · 0 deleted · 0 unchanged · 0 refused — Import applied — 9 changes written"; definitions "0 added · 5 changed · 0 unlinked · 0 deleted · 0 unchanged · 0 refused — 5 changes written"; links "0 added · 1 changed · 0 unlinked · 0 deleted · 1467 unchanged · 0 refused — 1 changes written". Supervisor [t1232]: "the catalogue stands at 168 categories, 555 definitions and 1,468 link rows."
- **Open follow-ups:** Real Estate › Houses no-pin check joins the next walk [t1230]. Note §7: INC-374, INC-381 and DEC-094 wait for the engine; "Pets & Animals stays closed; Jobs and Tenders wait for v2."

### 74. C27 · batch 19 — "Negotiable" leaves Pricing Basis
- **Date:** 2026-10-03 (uploaded 15:09 ET) [t1239]. Asked as TASK 1 of the curator prompt of t1232.
- **Files:**
  - `0944e219-c27-b19-settled-to-other-scan-2026-10-03.csv` — 9 data rows (wc -l 10); 1,947 bytes; uploaded 2026-10-03 15:09; settled-to-Other scan
  - `230aa726-c27-b19-links.csv` — 1,468 data rows (wc -l 1,469); 194,951 bytes; uploaded 2026-10-03 15:09; links format + action
  - `44d2421e-c27-b19-change-note-2026-10-03.md` — note, 67 lines; 4,920 bytes; uploaded 2026-10-03 15:09
  - `ebd84cb0-c27-b19-definitions.csv` — 1 data rows (wc -l 2); 1,585 bytes; uploaded 2026-10-03 15:09; definitions format
- **Base (note):** "my batch-18 merged state, which you confirmed live (168 categories · 555 definitions · 1,468 links). No new export was used."
- **What it carried (note §1–§3):** `c27-b19-links.csv` (1,468 rows, full catalogue) expected "changed 13 · unchanged 1,455"; `c27-b19-definitions.csv` (1 row) expected "changed 1". Definition `pricing_type`: the option `negotiable` is removed; eight options remain. Links: `negotiable` is taken out of 13 scopes (pet-services, realtor-services, construction-trades, education-training, events-services, financial-legal, home-services, logistics-cargo, personal-care-services, printing-photography, repair-maintenance, tailoring-services, vehicle-services). "Order: links first, then definitions. This is the reverse of the usual order." "Two separate confirms." No categories file; translations: nothing to approve. Left alone: three other lists keep a choice called Negotiable (Fuel Included, Insurance Included, Payment Frequency).
- **Curator's pre-delivery audit (note §5):** "§9.1: 0 findings · 1,160 notes"; scan "9 exception rows · 0 others · 0 inert"; "(f) 14 → 14"; form-path replica 562 rows.
- **Supervisor audit:** "audited and released for import t1240" [sweep-1196-1240 §1]. Script `merge_b19.py` (checks: only `negotiable` removed from each changed scope with order kept; no `pricing_type` link still names it; no scope value missing from the definition; no default outside scope; no condition or option fact/allowed names it).
- **Import result** (operator, 2026-10-03, t1241): `c27-b19-links.csv` → "0 added · 13 changed · 0 unlinked · 0 deleted · 1455 unchanged · 0 refused / Import applied — 13 changes written"; then `c27-b19-definitions.csv` → "0 added · 1 changed · 0 unlinked · 0 deleted · 0 unchanged · 0 refused / Import applied — 1 changes written". Result [t1242]: "The catalogue stays at 168 categories, 555 definitions and 1,468 link rows."
- **Open follow-ups (note §7):** "INC-374, INC-381 and DEC-094 wait for the engine; the held INC-374 batch stays held." "Pets & Animals stays closed; Jobs and Tenders wait for v2."

### 75. C27 — price periods in rent and hire ads (note, no rows)
- **Date:** 2026-10-03 (uploaded 15:09 ET) [t1239]. Asked as TASK 3 of the curator prompt of t1232 ("price periods sellers actually use on rent/hire categories (six real-estate leaves, eight equipment leaves, three clothing leaves, short-term-rentals, vehicle-hire)").
- **Files:**
  - `3a97246d-c27-price-periods-rent-hire-note-2026-10-03.md` — note, 103 lines; 9,199 bytes; uploaded 2026-10-03 15:09
- **What it carried (note §1):** "This is a note, not an import file. No rows were built." Per group — Real estate, six leaves with rent or lease: 537 ads, most common period **per month** (per year on land only; per m² per week, month or year on a few commercial ads). Short-term Rentals: 61 ads, **per night** on booking sites, **per month** on Ethiopian classifieds. Equipment, eight leaves with sale or hire: 90 ads + 29 rate lines, **per hour** for machines (per month for trucks; per day for event gear and generators). Clothing, three leaves with Sale or Rent: 27, **none printed**. Vehicle Hire & Rentals: 70 ads + 10 rate lines, **per day**. "Per week is never printed as a price in any group." "Per event is not printed either." "Today every category has the price period 'once', locked. That is what the categories export shows for all 168."
- **Three patterns (note §7):** (1) "The price period and the payment schedule are two statements."; (2) "The minimum has its own unit, which is not always the unit of the price: hours for machines, days for commercial space, months for homes and cars."; (3) "Many hire ads state no period: 42 of 70 machinery ads and 13 of 15 clothing ads."
- **Limits (note §8):** thin samples — clothing (27, of which 12 are one shop), generators (3), industrial machines (2 rate lines, no ads), land (19), cleaning and printing equipment (none); Jiji prints no period on commercial rent (the 77 "none" rows; monthly is the curator's inference); Airbnb, Booking.com, Mekina and Qefira would not open.
- **Supervisor use** [sweep-1196-1240 §2.B, t1240]: the rent/hire period decision is "Refined by the curator's price-period note: per week and per event are left out; minimum term asked as a number with a unit."
- **Import result:** none (a note). The rows it leads to are in the post-bundle-4 engine batch — see Part 3 §3.6 and Part 4.

### 76. C27 — reserved seller names, first list (research list, not an import file)
- **Date:** 2026-10-03 (uploaded 15:09 ET, with batch 19 and the price-periods note) [sweep-1196-1240 raw notes, t1239]. Asked as TASK 2 of the curator prompt of t1232 (columns `name_en, name_am, kind, country, handles, source`; kinds bank, insurer, telecom, mobile money, airline, utility, government body, delivery or ride service, money transfer, online platform, email provider; Ethiopia in full; leading few for Kenya, Eritrea, Djibouti, Somalia; international most impersonated; leave out catalogue brands; one source link per row).
- **Files:**
  - `066adf12-c27-reserved-seller-names-note-2026-10-03.md` — note, 95 lines; 9,206 bytes; uploaded 2026-10-03 15:09
  - `74ffbcea-c27-reserved-seller-names-2026-10-03.csv` — 435 data rows (wc -l 436); 99,659 bytes; uploaded 2026-10-03 15:09; header: name_en,name_am,kind,country,handles,source
- **What it carried (note §1–§2):** "435 names · 2,427 handles." Totals by country: Ethiopia 223 · Kenya 39 · Eritrea 11 · Djibouti 19 · Somalia 40 · International 103. Ethiopia rests on the National Bank's registers (all 32 licensed banks; all 18 licensed insurers plus the reinsurer; the 26 licensed payment issuers and operators; the remittance register dated 2026-08-07); the 22 ministries from Proclamation 1263/2021. "235 different links"; a second reader re-opened 56 of the 235 links, covering 172 name-and-link pairs; "155 names are printed on the page as listed. 17 are printed in another form"; "The other 179 links were opened once". Amharic: "About 80 names were read on a page"; "The other 350 or so are my own renderings"; "The whole column needs a native proofread before use."
- **For ruling (note §3):** whole-name versus "contains" matching (19 everyday words; 47 handles of two or three letters; place names `awash`, `dashen`, `wegagen`); 35 international rows beyond the four types named; rows that fit their kind only loosely; Somaliland and Puntland names filed under Somalia; the site's own names not in the list.
- **Supervisor rulings** [sweep-1196-1240 §2.A, t1240]: matching compares the whole seller name "after folding"; a second rule refuses a reserved handle standing as a whole part beside only a claim word ("cbe_official", "telebirr_agent"); the 19 everyday words and three place names are exempt from the second rule; handles under five letters serve only the second rule; keep all 35 extra international rows; kinds and countries columns are for reading only; "our own names are reserved elsewhere". Sweep-1241-1285 §3 calls this file "Accepted earlier (before slice)".
- **Import result:** not an import file. Superseded by v2 and v3 the same day.

### 77. C27 — reserved seller names v2 (two columns added)
- **Date:** 2026-10-03 (uploaded 15:24 ET) [sweep-1241-1285 §3, t1243–t1244].
- **Files:**
  - `3c8597a9-c27-reserved-seller-names-v2-2026-10-03.csv` — 435 data rows (wc -l 436); 104,627 bytes; uploaded 2026-10-03 15:24; header: name_en,name_am,kind,country,handles,source,exact_only,name_am_source
  - `c6cfadb0-c27-reserved-seller-names-v2-note-2026-10-03.md` — note, 78 lines; 5,312 bytes; uploaded 2026-10-03 15:24
- **What it carried (note §1–§3):** two columns added at the end, `exact_only` and `name_am_source`; "The first six columns are the accepted file, cell for cell: 435 names · 2,427 handles, same order." `exact_only`: "yes on 22 rows, no on 413" (the 19 everyday words and the three place names); the 22 rows carry 162 other handles. `name_am_source`: "page on 75 rows, rendered on 360" (the 75 read on: the body's own site 49 · Proclamation 1263/2021 16 · Wikipedia 10). "130 handles of fewer than five letters, on 117 rows." "Of the 287 rows whose main handle has more than one part, 110 also list it joined."
- **Supervisor check and rulings** [t1244]: first six columns identical, same order. Three rulings for a small v3: (1) the `exact_only` cell holds the exempt word, empty on the other 413 rows, so "Awash Bank Official" and "National ID Agent" are refused; (2) the fold drops separators on both sides and reads look-alike digits as letters — do not add joined forms; a handle under five letters counts in the second rule only as a whole part between underscores; (3) Amharic keeps the page's own form — restore four same-sound spellings. "Deliver v3 with those changes only. No new research."
- **Import result:** not an import file. Superseded by v3.

### 78. C27 — reserved seller names v3 (final)
- **Date:** 2026-10-03 (uploaded 15:27 ET) [sweep-1241-1285 §3, t1245–t1246].
- **Files:**
  - `5872bd72-c27-reserved-seller-names-v3-2026-10-03.csv` — 435 data rows (wc -l 436); 103,851 bytes; uploaded 2026-10-03 15:27; header: name_en,name_am,kind,country,handles,source,exact_only,name_am_source
  - `6bd1a273-c27-reserved-seller-names-v3-note-2026-10-03.md` — note, 47 lines; 3,604 bytes; uploaded 2026-10-03 15:27
- **What changed from v2 (note §1):** "Two things, and nothing else. No new research." (1) `exact_only` holds the exempt word on 22 rows and is empty on the other 413 (435 cells); (2) four Amharic names go back to what the page printed (Goh Betoch Bank, Addis Ababa Water and Sewerage Authority, Ethiopian Food and Drug Authority, Authority for Civil Society Organizations). "435 names · 2,427 handles, same order, same eight columns." `name_am_source` unchanged: page 75 · rendered 360. Finding: the folded form `coopbank` sits on two rows (`coopbank`/`coop_bank` on Cooperative Bank of Oromia; `co_op_bank` on Co-operative Bank of Kenya). "264 handles fold onto another handle of their own row … The list holds 2,162 different names after folding."
- **Supervisor verdict** [t1246]: "The final list is accepted … v3 is final; the coopbank overlap stays as it is"; at load the first row wins (the Ethiopian one). sha256 of v3: `891a3886cd641909d5249a56681ab3202ff80307ee5ad85cdc245bebeda2b1cb`.
- **Where it went:** saved by Lovable unchanged as `docs/data/reserved-names-v3.csv` and seeded in migration M2 [sweep-1241-1285 §3, t1263, t1272]. Not an attributes/categories import. (Checked for this record: the upload and the repo file have the same sha256.)
- **Open follow-ups:** the operator's Amharic proofread of the `name_am` column ("still wanted; corrections can be loaded later"; the list was seeded as is) [t1258, t1260, t1282].

### 79. C27 — countries check (result note, no new rows) and the four currency corrections
- **Date:** note dated 2026-10-03; pasted by the operator and files uploaded Sun 2026-10-04 02:16 ET [raw t1299]. Prompt "CURATOR: countries file (small task)" drafted at t1284 (2026-10-03 evening) [sweep-1241-1285 §3].
- **Files:**
  - `52d78d79-c27-countries-currency-corrections-HELD-2026-10-03.csv` — 4 data rows (wc -l 5); 276 bytes; uploaded 2026-10-04 02:16; countries format
  - `7d97c641-countries_1.csv` — 249 data rows (wc -l 250); 8,998 bytes; uploaded 2026-10-04 02:16; countries format
  - `cf2789fc-c27-countries-note-2026-10-03.md` — note, 62 lines; 4,459 bytes; uploaded 2026-10-04 02:16
- **What it carried (note §1, §3):** "Row count of the import file: 0. There is no import file to deliver." "The export already holds all 249 ISO 3166-1 entries: 17 open markets and 232 closed ones." Currency: "245 agree, 4 do not" — CW Curaçao ANG→XCG, SX Sint Maarten ANG→XCG, SH Saint Helena GBP→SHP, GS South Georgia SHP→GBP ("The last two look swapped"). The file `c27-countries-currency-corrections-HELD-2026-10-03.csv` "holds these four rows, in the export's format, with only `currency_code` changed. It is held: nothing changes unless you import it. Expected preview: changed 4." Unit system: "237 agree, 12 do not" (all 12 metric in the export; the curator had them imperial "on a judgement"; no file cut): AS, GU, MP, VI, UM, PR, FM, MH, PW, BS, BZ, KY.
- **Supervisor audit** (bundle3_draft "2026-10-04 06:20Z"; raw t1300): export `countries_1.csv` = 249 rows, 17 open (AE AU CA CH DE ET FR GB IL KE LB NO SA SD SE US ZA), imperial LR MM US, AQ no currency; "No file needed: seed 405bc914 (15 Sep) already held every country." Held file: 4 rows, only `currency_code` differs; currencies seed `9add760c` holds XCG, SHP, GBP. Supervisor slip recorded: "INC-413's 'curator supplies missing countries' was an assumption; I did not grep the seed." Ruling: import the held file on prod with the country scope empty, expect "changed 4, refused 0"; units — none of the 12 change (standing rule: imperial for the United States, Liberia and Myanmar only).
- **Import result** (operator, 2026-10-04 02:23 ET, raw t1301): "0 added · 4 changed · 0 retired · 0 reactivated · 0 deleted · 0 unchanged · 0 refused / Import applied — 4 changes written". Message to the curator sent the same turn.
- **Open follow-ups:** none stated. The file keeps "HELD" in its name although it was imported; sweep-1286-1330 §3: "Held file is no longer held."

### 80. C28 — occasion food and catering: research and plan (no import rows)
- **Date:** note dated 2026-10-04; pasted and uploaded to the supervisor 2026-10-04 19:51 ET (= 23:51Z) [t1374]. Prompt "C28 — OCCASION FOOD AND CATERING: RESEARCH AND PLAN (no import rows in this delivery)" issued 2026-10-04 ~16:40 ET [sweep-1331-1369 §3, t1337; bundle3_draft "2026-10-04 20:40Z"].
- **Files:**
  - `971af159-c28-catering-research-2026-10-04.md` — note, 1,104 lines; 92,995 bytes; uploaded 2026-10-04 19:51
  - `afc6dd04-c28-catering-sources-2026-10-04.csv` — 670 data rows (wc -l 671); 122,497 bytes; uploaded 2026-10-04 19:51; header: source_id,link,source_kind,date_read,posts_counted,readable,remark
  - `f164a6a7-c28-catering-tally-2026-10-04.csv` — 231 data rows (wc -l 232); 158,598 bytes; uploaded 2026-10-04 19:51; header: post_id,source_id,post_ref,source_kind,post_date,market,country,city,eritrean,language,seller_kind,sold,occasion,fasting,religious_statement,dishes,quantity_bas
- **Base stated by the curator:** "my batch-19 merged state (168 categories · 555 definitions · 1,468 links). I hold no fresh export."
- **What it carried (as the note states):** 231 posts in the tally, from about 163 sellers, every page read on 2026-10-04; Telegram 95 posts from 34 channels (target 50); diaspora 87 posts (target 30); Ethiopia 144; Eritrean sellers 20, all abroad. Source log: 670 lines = 621 different links; 153 lines with a post; 163 lines not read. "251 rows were tallied and 20 were taken out." Facebook, Instagram and TikTok: nothing could be read ("the largest hole").
- **The plan (Part 2 of the note):** a split with one new leaf. Events & Catering (Services) stays; new leaf "Cooked Food to Order" / «በትዕዛዝ የሚዘጋጅ ምግብ», slug `cooked-food-to-order`, under Food & Beverages, surfaced under Services; six changes on Injera & Bakery; changes on Meat, Dairy & Eggs. "Events & Catering holds 84 (40 · 44) posts and Cooked Food to Order 93 (40 · 53)." "Only 38 (12 · 26) of the cooked-food posts print a price with its unit." New price answers proposed: `pricing_type` gains Per Person; `unit_of_sale-food` gains Per Package, Per Pot, Per Party Tray. New price-page rows proposed: `term_min_guests` (number, guests, 1 to 5,000) and `term_order_ahead_days` (number, days, 1 to 60). A details row `serves_people` (card 3). Several prices: "42 of the 69 posts that print a price with its unit print several prices" → a form request (price table, up to six lines), one ad per size until it lands. Five questions for the operator (placement; several prices; new price answers; kitfo; halal and gluten-free). Decided in the plan unless overruled: thin answers stay; no "Included in the Price" row; no deposit row and no minimum in pieces or kilos; "A food offer that includes tella or tej runs without the drink."
- **Supervisor review** [t1375; bundle3_draft "2026-10-05 00:02Z — C28 catering note received and reviewed"]: checks run — 2.1 sums OK; every proposed help text ≤ 240 (longest `cooked_food_type` EN 227); no answer has > 5 aliases; no garbled Ethiopic; catalogue claims match `merged_c27b19`. Two corrections from the code: (1) a goods ad may be "Contact for price" (step-pricing.tsx:165-167), so the note's assumption "a Food & Beverages ad needs a price" is wrong, Leaf B serves all 93 cooked-food posts and "price on request on Cooked Food" is not a gap; (2) the unit of sale is asked on the price page after the details page, so `serves_people` (a details row conditioned on a price-page answer) is asked too late — key it in the size family (`pack_quantity-serves`, unit "people"). Note on titles: the built title = card rows, answered, visible, not deal rows, ≤ 70 characters, so unit and Serves are not in the title. Supervisor's calls: Q3 yes; Q4 kitfo yes; Q5 halal link yes; curator's three own calls accepted; Tigrinya aliases held out until a speaker checks; the two "Other" leaves keep unscoped links; alcohol word list recorded for the moderation spec (DEC-060). Three decisions put to the operator.
- **Operator rulings** (bundle3_draft "2026-10-05 00:12Z"): "AGREE ON ALL THREE" — new leaf yes; price table as a later form feature yes; gluten-free NO tick, search alias on Teff Injera only. "Asked for curator work now."
- **Import result:** none — the delivery has no rows.
- **Follow-up:** prompt **C29 — "OCCASION FOOD AND CATERING: THE ROWS"** written and delivered inline 2026-10-04 evening (text in `c29-curator-prompt.txt`); in progress with the curator; no C29 file is in the uploads folder. See Part 3 §3.9 and Part 4.


# PART 3 — STATE OF THE CATALOGUE AT 2026-10-04

## 3.1 The catalogue in numbers

- **Live at 2026-10-04: 168 categories · 555 definitions · 1,468 link rows.** Stated after batch 18 [t1232], unchanged by batch 19 ("The catalogue stays at 168 categories, 555 definitions and 1,468 link rows" [t1242]) and by nothing since ("the catalogue has not changed since" the batch 19 exports [t1337]; the C28 note's base is "my batch-19 merged state (168 categories · 555 definitions · 1,468 links)"). 15 roots. The supervisor's own copy of this state is `merged_c27b19.pkl` in the scratchpad.
- **How the counts moved** (each line is the base a curator note states, or the supervisor's statement after an import):

| After | categories · definitions · links | Source |
|---|---|---|
| Curation era close (2026-09-15) | "Fifteen roots, 142 listing categories … 327 definitions" | `docs/governance/reviews/curation-era-closeout-2026-09-15.md` |
| Cycle 21 (2026-09-27) | 163 · 486 · 1,370 | spec-ledger:1514 |
| Cycle 24 | 162 · 485 · 1,366 | raw t835; spec-ledger:1573 |
| C25 + C26 | 167 · 514 · 1,412 (supervisor) — the exports hold "514 definitions · 1,419 links · 167 categories" (curator, Batch 1 note) | t869; Batch 1 change note; sweep-0926-0970 §3.3 ("1,412 links against the curator's 1,419") |
| C27 Batch 1 | 167 · 524 · 1,436 | Batch 2 change note |
| Batch 2 | 528 definitions · 1,452 links | b1f change note |
| b1f | 529 (corrected to 528) · 1,452 · 167 | b1g and b1h change notes |
| b1g | 529 · 1,446 · 167 | b1h change note |
| b1h | 530 · 1,448 · 167 | File 1 change note |
| File 1 (Other leaves) and the Food help file | 532 · 1,473 · 167 | help-food and Vehicles notes |
| Vehicles step 2 | 535 · 1,473 · 167 | INC-358 / Food C3 notes |
| INC-358 + Food C3, then Clothing & Shoes | 536 · 1,474 · 167 | Clothing and Babies notes |
| Babies & Kids | 536 · 1,468 · 167 | Sports note |
| Sports, then Construction | 536 · 1,466 · 167 | Construction and write-in notes |
| Write-in unlinks + Home & Garden | 536 · 1,442 · 167 | walk-fix note |
| Walk-fix batch | 539 · 1,443 · 167 | R1/R3 + Beauty note |
| R1/R3 + Beauty | 550 · 1,455 · 167 | batch 8 note; t1061 |
| batch 8 through batch 12 | 550 · 1,459 · 167 | batch 9–13 notes; `b12audit.txt` "final 550 1459" |
| batch 13 | 550 · 1,461 · 167 | batch 14 note |
| batch 14, 15, 16 | 551 · 1,462 · 167 | batch 15, 16, 17 notes |
| batch 17, 18, 19 | 168 · 555 · 1,468 | batch 18 and 19 notes; t1232; t1242 |

  (The supervisor's audit outputs give "final 550 1460" after batch 13's first two files and "final 555 1466" for batch 17, counting link keys in its own model; the export counts above are the curator's and the operator's.)

## 3.2 Cycle C27 — which roots are done

C27 began as "Study C27 — identity facts, producer lists, origins and order (from the operator's walk, 2026-09-29)" [t921]. The operator asked for the same review of every other category [t922]; the supervisor's reply at t923 (the widened prompt) is in no sweep or raw file; by t925 "Every curator brief reviews the whole catalogue against the problem types, as C27 now does." From 2026-09-30 it ran as a **root pass**: for each root, C1–C3, its long help first sentences, the unit-of-sale test, the order audit with (g), DEC-094 checks, the importer-gate audit and (from batch 11) the form simulator for every walk line.

| Root | Batch(es) | Status as the sources state it |
|---|---|---|
| Food & Beverages (and Books) | Batch 1, b1f, b1g, b1h, help file, Food C3 | done — in the "8 of the 15" list [t1067] |
| Clothing & Shoes | Batch 2, C1–C3 batch 2 | done [t1067] |
| Babies & Kids | Batch 2, C1–C3 batch 3 | done [t1067] |
| Vehicles | Vehicles step 2, INC-358; later batch 16 (make and model lists) | done [t1067] |
| Sports & Leisure | C1–C3 batch 4; 5 order rows closed in batch 13 | done [t1067] |
| Construction Material | C1–C3 batch 5, walk-fix batch, R1/R3 | done [t1067] |
| Home & Garden | C1–C3 batch 6; new leaf in batch 17 | done [t1067] |
| Beauty & Personal Care | Beauty files (landed with batch 8), batch 8 Unit of Sale | done [t1067] |
| Real Estate | batch 8 | not said in so many words; "10 of the 15" after Electronics implies it [sweep-1061-1105 §3.3] |
| Electronics | batch 9, iPhone refresh in batch 10 | "Electronics is done, so 10 of the 15 top-level categories are finished." [t1081] |
| Services | batch 10 | "Services is done, so 11 of 15" [t1093] |
| Agriculture & Farming | batch 11 (Silage fixed in batch 12) | "12 of 15 top-level categories are done." [t1101] |
| Commercial Equipment | batch 12 | "Twelve… now thirteen of fifteen roots are done" [t1111] |
| Pets & Animals | batch 13, 14, 15 | root pass closed [t1122]; then closed to further work by operator ruling (2026-10-01) |
| Travel & Accommodation | batch 13 | root pass closed [t1122] |

- **"The root pass is closed"** with batch 13 (2026-10-01) [t1122]. The curator's batch 13 note: "Every root is now passed: order (c) is 0 catalogue-wide, the help census is 0, and the scan holds only the nine ruled exceptions."
- The 15 "Other" leaves were done across roots in File 1 (2026-09-30).
- After the root pass the work followed trade: the market census (2026-10-01/02), batch 16 (vehicles lists), batch 17 (census rows), batch 18 and 19 (small rulings).
- **Not done / not to be done:** "No further Pets work" (operator ruling 2026-10-01; "Pets & Animals stays closed" in every later note). Leaves outside the census tier get work only under the 100-ad rule or when a walk or a user reports a real defect.

## 3.3 Live, versus delivered and not imported

- **Live:** every C27 import file through batch 19 (last import 2026-10-03, t1241); the four country currency corrections (2026-10-04 02:23 ET, t1301); the reserved seller names v3 (seeded by migration M2 in bundle 3, from `docs/data/reserved-names-v3.csv`).
- **Delivered and not imported:** nothing. No delivery after batch 19 carries import rows except the four country rows, which are imported; C28 (2026-10-04) is a research note.
- **In progress with the curator:** C29 (the catering rows). "Import of C29 only after my audit AND after bundle 4 is published" (bundle3_draft, 2026-10-05 00:12Z).
- **Batch 15's import** was never pasted as a console line; the operator's re-upload on 2026-10-02 showed it already applied ("alreaded added, so none applied") [t1173].
- **Walk-fix batch, write-in and Home & Garden batches:** imported per the operator's "yes" answers; no console count line is in the sources.

## 3.4 Held files and held items

| Item | What it is | State |
|---|---|---|
| `c27-countries-currency-corrections-HELD-2026-10-03.csv` | four rows: CW and SX ANG→XCG, SH GBP→SHP, GS SHP→GBP | **Imported** on prod 2026-10-04 02:23 ET: "0 added · 4 changed … 0 refused / Import applied — 4 changes written" [t1301]. The name still says HELD. The 12 unit-system differences were ruled "none change". |
| `c20-pets-definitions-HELD.csv` (cycle 20) | `pet_type` with `allowed.supply_type` | Accepted: "D52 pets narrowing (accepted under DEC-057b)" [spec-ledger:1510, 1537]. |
| The "held INC-374 batch" (iPhone battery) | values prepared in the batch 11 note §9; **no file was built or delivered** ("I will build these when you say the importer accepts `settled`") | Waiting for the supervisor's word. See 3.8. |
| `c25-prohibited-restricted-items-policy-DRAFT.md` | "Prohibited & Restricted Items" policy text EN/AM with a screening-term list | "DRAFT, counsel review pending; not an import file" (C25 note). The supervisor's later age/legal work of 2026-10-04 is outside this record. |
| Makers held in batch 17 | Kirkland, V380Pro, SRNE, Now Foods | Ruled: Kirkland out for good (operator: "lets keep everything uniform rather than creating exception"); V380Pro out, "V380" a finder word; SRNE and Now Foods in (batch 18). |
| The 24 `brand_name` write-in unlinks | held from 2026-09-30 until the engine fix N1 (INC-357) was proven | Released and imported 2026-10-01. |

## 3.5 The reserved seller names list

- Purpose: names a seller must not take as a seller name (asked 2026-10-03 as a research list). The supervisor's position [t1234]: the list reserves a name for its real owner and is not a ban — the real organisation can request it and an admin assigns it.
- **Versions, all 2026-10-03:** first list (six columns: `name_en, name_am, kind, country, handles, source`) — "435 names · 2,427 handles"; v2 adds `exact_only` (yes on 22 rows) and `name_am_source` (page 75 · rendered 360); **v3 is final** — `exact_only` holds the exempt word on 22 rows and is empty on 413; four Amharic names restored to the page's spelling; "435 names · 2,427 handles, same order, same eight columns"; "2,162 different names after folding".
- **Final count:** 435 names, 2,427 handles (Ethiopia 223 · Kenya 39 · Eritrea 11 · Djibouti 19 · Somalia 40 · International 103).
- **Where it lives:** `docs/data/reserved-names-v3.csv` in the repo (436 lines with the header), "Saved by Lovable unchanged" and seeded in bundle 3's migration M2; sha256 `891a3886cd641909d5249a56681ab3202ff80307ee5ad85cdc245bebeda2b1cb` (the upload `5872bd72-…-v3-…csv` has the same checksum).
- **Matching rules ruled by the supervisor:** the whole seller name is compared after folding (separators dropped on both sides, look-alike digits read as letters); a second rule refuses a reserved handle standing as a whole part beside only a claim word; the 22 exempt words (19 everyday words and `awash`, `dashen`, `wegagen`) are exempt from the second rule only; a handle under five letters counts in the second rule only as a whole part between underscores; `coopbank` folds onto two rows and the first (Ethiopian) row wins at load.
- **Open:** the operator's native proofread of the Amharic column (the 223 Ethiopian rows first); "corrections can be loaded later".

## 3.6 The price-periods note (rent and hire)

- File `c27-price-periods-rent-hire-note-2026-10-03.md` — a note, no rows. Most common period per group: real estate rent "per month" (537 ads); short-term rentals "per night" on booking sites and "per month" on Ethiopian classifieds (61); equipment "per hour" for machines (90 ads + 29 rate lines); clothing "none printed" (27); vehicle hire "per day" (70 ads + 10 rate lines). "Per week is never printed as a price in any group"; "Per event is not printed either."
- "Today every category has the price period 'once', locked. That is what the categories export shows for all 168."
- **What the supervisor took from it** [t1240]: homes, land and commercial rent per month, per year offered for land; short-term rentals per night and per month; equipment per hour (machines), per day (event gear, generators), per month (trucks); vehicle hire per day; clothing rental no period; per week and per event left out; the minimum term asked "as a number with a unit"; advance payment is a separate statement.
- **Rows are not built yet.** The form change is bundle 4 (DEC-122 in the supervisor's notes: "rent/hire period = a conditional pricing basis"). The supervisor's note of what the curator must then build: "`pricing_type-rent` (per_hour/day/month/year + flat) linked to the 17 offer-type leaves with visible_when offer = rent|lease|hire, allowed_options + default per group (note 3a97246d); short-term rentals: `pricing_type-travel` per_night|per_month, `rental_duration` unlinked; `term_` rows (minimum term with own unit, advance, deposit)" (bundle3_draft, 2026-10-04 04:30Z). The operator-facing message of t1288 says "the 18 rent and hire categories"; the note says 17 — both as written.

## 3.7 The market census

- Files `c27-market-census-2026-10-01.md` and `c27-market-census-data-2026-10-01.csv` (365 data rows), delivered 2026-10-02. Read-only: "Nothing is built; every proposal waits for your ruling."
- Headline counts: "812,942 listings on Jiji Ethiopia"; laptops 342,982; "a home for at least 98.0% of counted listings, and at most 99.3%"; 5,822 with no home.
- **Rulings:** the priority tier is the curator's reading B, 29 leaves; the 100-ad rule replaces "nothing outside the tier"; Jobs and Tenders get no review note; sexual wellness and alcohol stay out; "It is the trade record and it is closed. Do not read the §7 pages" [t1146].
- Its proposals P1–P12 were built as batch 17. Its remaining unread pages (32,523 listings in remainders) stay unread by ruling.

## 3.8 Items waiting on the engine, and the catalogue rows that wait for each

Engine status at the end of 2026-10-04 (bundle3_draft): migration **M6** ("the catalogue engine the curator waits on") is applied on prod and staging (23:06Z). Bundle 4 turn 9 built the screens for steps 26 and 27 on dev `2b55ed15` ("CLEAN pending CI"); steps 28 and 29 (the two tokens) are the next turn (9b), then turn 10 (docs, final report), then Publish and one short walk. **The curator has not been told that any of the four is ready.** "The engine batch (rent/hire periods, short-term rentals, settled ranges INC-374, two-answer rows INC-381, tokens DEC-094/095) is the NEXT curator prompt, after bundle 4 is published."

| Engine item | What it is | Catalogue rows waiting |
|---|---|---|
| **INC-374** — settled ranges (2026-10-01) | an option's bounds entry may carry `"settled": true` beside min and max; the row is then not asked and Review shows the range (bundle-4 brief step 27) | The held battery batch (batch 11 note §9): `settled` on iPhone 18 Pro 4,056–4,288 mAh and 18 Pro Max 5,391–5,567 mAh; iPhone 17 pin 3,692 mAh; iPhone Air pin 3,149 mAh; iPhone 17 Pro Max settled range 4,823–5,088 mAh; iPhone 17 Pro settled range 3,988–4,252 (accepted by the supervisor, t1095). |
| **INC-381** — two-answer conditions (2026-10-01) | a row shown only when two answers both match; links cell `k1=a\|b&k2=c\|d` (bundle-4 brief step 26) | Pets: the Life stage stand-in (Fish, Bird, Small Animal, Universal, Other settled to "All stages" through For Pet Type; "the five settles come out" and the row becomes a true hide; the 16 — or 24 — informational notes go); Brand for bird, small-animal and fish food (list left whole until then). |
| **DEC-088** — the earlier name for a two-key condition (2026-09-29) | hide Net Weight when the unit is a weight, Volume when the unit is a volume | "net weight should hide when the unit is per kg, at 10 leaves: Grains, Spices, Honey, Meat, Coffee & Tea, Beverages, Snacks, Frozen, Pantry and Other Food; also volume when the unit is per litre, at Honey (oil), Meat (milk) and Beverages" (Batch 1 change note). Batch 8 note: "still queued". The sources do not say whether INC-381 closes this. |
| **DEC-094** — `{country}` token (2026-09-30) | no catalogue text names one country where the statement depends on the market; a `{country}` token shows the listing's market country (bundle-4 brief step 28) | The census file `c27-dec094-market-wording-census-2026-09-30.csv` (19 rows, four classes). Class A, token rows: `product_origin` + `origin-food` ("Made in {country}" / "Imported"; the third answer «እዚሁ የተሰራ» and the duplicate value leave; the merge of the two definitions is a console step), `condition-vehicles` ("Used in {country}"), `imei_registered` ("IMEI Registered (works on {country} networks)"). Neutral rewrites in class A were already done (DEC-094 ruling 1, Construction batch). Later additions the notes name: the Services exam and level wording (batch 10). **The per-market list** (R1/R3 note §6, "nothing built"): defaults 220 V (14 leaves), 380 V three-phase, EU shoe sizes, Wi-Fi-only tablets, electric cookers, locally made (Traditional & Natural), rebar 12 m; units kg ↔ lb, litres ↔ US gallons, m³ ↔ cu ft, cm/mm/m ↔ inches/feet; dog size bands in kg (batch 14). The bundle-4 brief says "Per-market presets and lists are not part of this bundle." |
| **Class B** (needs a second market, not a token) | market-specific systems that name no country | `plate_code`, `title_status`, `condo_scheme`, "libre" in `engine_cc`'s help; later candidates named: ECX, MoA and Meher / Belg (batch 11), the Travel candidates (batch 13). "Class B waits for a second market." |
| **DEC-095** — `{category:<slug>}` token (2026-10-01) | a pointer help becomes a tappable link to the destination category (bundle-4 brief step 29); the importer will refuse an unknown slug (`unknownCategoryToken:<slug>`) | The 57 pointer lines in `c27-walk-pointer-lines-2026-10-01.csv` (57 data rows; column "destination slug (for the {category:<slug>} token)"), now written as full-path sentences; "the conversion will be mechanical". Pointer helps written since then also follow the full-path form (Other Agriculture; Household & Cleaning and its neighbours in batch 17). |
| **W4b** — yes/no locks | the catalogue format for a locked yes/no fact | "12 yes/no facts are filled today and should be locked when W4b lands": fasting-friendly = yes — injera (teff), injera (mixed), dirkosh, sugar, salt, kolo, roasted chickpeas, fandisha, nuts; fasting-friendly = no — frozen kitfo, frozen tibs, chiko (Batch 1 change note). W4b's status after 2026-09-30 is not in the sources read. |
| "not in" condition | hide a row for one value (Shemma fabric's size) | "queued at low priority"; One Size prefill stands meanwhile [t949]. |
| Per-m² rent | a per-m²-per-month basis for commercial rent | "waits for a DEC-079 change (logged)" (batch 9, 10 notes) [t1071]. |
| Wood & Timber shared card slot | needs an app change | "logged for later" [t1061]. |
| A second condition scale at Health & Wellness | Sealed / New or Opened does not fit a used wheelchair | "No second condition scale for Health & Wellness now" [t1174]. |

## 3.9 C28 (catering research) and C29 (the rows)

- **C28** — prompt 2026-10-04 ~16:40 ET; note and two CSVs received 2026-10-04 19:51 ET; reviewed by the supervisor (bundle3_draft, 2026-10-05 00:02Z). 231 posts tallied. Plan: Events & Catering stays a service; one new leaf Food & Beverages › **Cooked Food to Order** / «በትዕዛዝ የሚዘጋጅ ምግብ» (slug `cooked-food-to-order`), surfaced under Services; changes on Injera & Bakery and Meat, Dairy & Eggs.
- **Supervisor's two corrections:** a goods ad may be posted as "Contact for price", so a cooked-food seller with no printed price belongs on the new leaf; the unit is asked on the price page after the details page, so `serves_people` must be a size row keyed `pack_quantity-serves`.
- **Operator rulings** (2026-10-04 evening; notes stamped 2026-10-05 00:12Z): "AGREE ON ALL THREE" — the new leaf, yes; a price table (several prices in one ad) as a later form feature, yes, one ad per size until then; gluten-free — no tick, the words "gluten free" and "gluten-free" as search aliases on Teff Injera only.
- **Supervisor's own calls:** `pricing_type` gains `per_person`; `unit_of_sale-food` gains `per_package`, `per_pot`, `per_party_tray` (no form work needed; each label must start with "Per " / "በ"); kitfo yes as a type and a dish on the new leaf; halal linked as proposed (Catering on Events & Catering; the non-fasting types on the new leaf); the curator's three own calls stand (no "Included in the Price" row; no deposit row and no minimum-in-units row; an offer that includes tella or tej runs without the drink); the six Tigrinya aliases from the curator's own knowledge stay out of the files until a speaker checks; the alcohol word list is set apart for the moderation spec.
- **C29 prompt** — "C29 — OCCASION FOOD AND CATERING: THE ROWS" (`c29-curator-prompt.txt`, sent 2026-10-04 evening). Base: the three fresh exports attached to the message. Delivery asked: categories, definitions, links (and a links pass 2 if needed), the translations key-names file, the form-path dispositions, the help census, the settled-to-other scan, the change note (what changed against the C28 plan; every row moved under B1; the five sample ads as the form will show them; the alcohol word list; at most three questions). Not in this batch: two-pair conditions, `settled` ranges, `{country}` or `{category:…}` tokens. Limits restated: "help 240 characters; five aliases an answer; an option's allowed list five targets and fifty values each".
- **Status:** in progress; no C29 file had reached the uploads folder when this record was written.
- **Queued by the same ruling:** the PRICE TABLE feature (up to six lines, "from" the lowest), "after the legal pages (L1) and My ads. Needs its own DEC number at the records turn (next free DEC-131) and a spec."

## 3.10 Scope rulings: what is out, and what waits for v2

**Banned or kept out of the catalogue (no home, no search aliases):**
- alcohol, tobacco and smoking accessories (REQ-028, DEC-060 — "no alcoholic-beverage or tobacco listings in v1 …; brewing ingredients (gesho, bikil) allowed as groceries", spec-ledger:1387); prescription medicines (REQ-028);
- sexual wellness products (DEC-100, operator 2026-10-02: "keep sexual wellness as well as alcohol etc out");
- "Also out: software and digital goods, social-media accounts, businesses for sale, work-abroad agents, an 'on order' answer" (curator message of t1146);
- Kirkland (its ads are minoxidil, a hair-regrowth medicine) — out for good; V380Pro (an app name, not a maker);
- wildlife, protected species and wildlife products; animals under eight weeks; fighting dogs; no health guarantees ("vet-checked") — DEC-061 (2026-09-15);
- khat "prohibited outright on the platform" [sweep-0836-0880 §6];
- `prayer_books` dropped from Religious & Cultural; `hobby_type.collectibles` removed (C25);
- in the C28/C29 work: no alcohol options; no gluten-free tick; no deposit row; no "Included in the Price" row.
- The supervisor's caveat [t1146]: keeping a line out of the catalogue does not stop someone posting it under an "Other" leaf; blocking at posting is the screening step's job, "which is not built yet; the list is recorded for it."

**Deferred to v2 or later:**
- Jobs and Tenders — "deferred to v2 (operator, 2026-07-19)"; the census counts are "filed for that decision".
- Several prices in one ad (the price table) — a later form feature.
- Per-market presets, per-market units and Class B rows — after `{country}` and after a second market opens.
- A map radius for service area ("how far from my pin") — a later wizard idea (D42).

**Closed to further work:** Pets & Animals (operator, 2026-10-01); the market census record.


# PART 4 — OPEN CURATOR ITEMS AND THE NEXT BATCH PLAN

## 4.1 The plan, in order (as the sources state it at the end of 2026-10-04)

1. **C29 — the catering rows** (in progress with the curator; prompt sent 2026-10-04 evening with fresh exports to attach). When the files arrive: supervisor audit first; "Import of C29 only after my audit AND after bundle 4 is published" (bundle3_draft, 2026-10-05 00:12Z). As the prompt reads, the rows asked for are those of the C28 plan with the rulings: the leaf `cooked-food-to-order` (secondary parent Services), `per_person` on `pricing_type`, `per_package` / `per_pot` / `per_party_tray` on `unit_of_sale-food`, the size row `pack_quantity-serves`, the halal links, and the aliases "gluten free" and "gluten-free" on `bakery_type`'s `injera_teff`; the plan's price-page rows `term_min_guests` and `term_order_ahead_days` are not struck by any ruling.
2. **Bundle 4 must be published first.** At the end of 2026-10-04: M6 on prod and staging; turn 9 (steps 26, 27) built on dev `2b55ed15`, CI pending; turn 9b (steps 28, 29 — the two tokens) written, to be sent when that CI finishes; then turn 10 (docs, records, final report); then Publish and one short walk.
3. **The engine batch — the NEXT curator prompt after bundle 4 is published.** Contents as listed in the supervisor's notes: "rent/hire periods, short-term rentals, settled ranges INC-374, two-answer rows INC-381, tokens DEC-094/095" (2026-10-05 00:12Z); in more detail (2026-10-04 04:30Z):
   - `pricing_type-rent` (per_hour / day / month / year + flat) linked to the rent, lease and hire leaves with `visible_when` offer = rent|lease|hire, with `allowed_options` and a default per group, following the price-periods note (17 leaves in the notes; 18 in the message to the operator);
   - short-term rentals: `pricing_type-travel` per_night | per_month; `rental_duration` unlinked;
   - `term_` rows: minimum term with its own unit, advance, deposit;
   - the INC-374 battery batch (the six iPhone values in Part 3 §3.8);
   - the INC-381 rows (the Pets Life stage stand-in becomes a true hide; Brand for bird, small-animal and fish food);
   - the `{country}` token rows (`product_origin` + `origin-food`, `condition-vehicles`, `imei_registered`, and the later additions);
   - the 57 `{category:<slug>}` pointer lines.
   The supervisor must first tell the curator that each mechanism is live; until then the standing instruction is not to use them.
4. **Later form feature with catalogue impact:** the price table (several prices in one ad), "after the legal pages (L1) and My ads"; it needs a DEC number and a spec.

The supervisor's earlier wording of the same plan [t1337, t1368]: one post-bundle-4 curator batch = "rent and hire price rows, short-term rentals, settled ranges, two-answer rows, tokens, catering rows". The catering rows were then split out as C29 by the operator's request for curator work now.

## 4.2 Open items, by owner

**Waiting on the supervisor (to release or to rule):**
- The word to the curator that `settled`, two-pair conditions, `{country}` and `{category:<slug>}` are accepted by the importer and drawn by the form.
- Whether the two-pair condition (INC-381) also closes DEC-088 (Net Weight hidden for Per Kg at 10 Food leaves; Volume for Per Litre at 3) — not stated in the sources.
- The W4b yes/no locks (12 fasting-friendly facts held by the curator since Batch 1) — status after 2026-09-30 not in the sources read.
- Per-market presets and units, and Class B rows — "not part of this bundle"; wait for a later decision or a second market.
- The rent/hire leaf count (17 or 18) to be settled when the engine-batch prompt is written.
- The C29 prompt restates the `allowed` limit as fifty values while 150 is live since 2026-10-03; both are on record.

**Waiting on the operator:**
- Native proofread of the Amharic names in the reserved-names list (the 223 Ethiopian rows first).
- Native-reader checks owed since 2026-09-29/30 on the Food labels and aliases (`የረጋ የምግብ ዘይት (የአትክልት ቅቤ)`, የተነጠረ ቅቤ, ጥሊሊ, የጥሊሊ ቅቤ, ፈሳሽ ዘይት, የረጋ ዘይት, የዶሮ ሥጋ, ስፓጌቲ, ቲማቲም ፓኬት, ቱና, ዱቄት; በጃር (ብልቃጥ), በሳሼ (ፌስታል), በካርቶን, ፔኔ, ላዛኛ) — "whether a separate native check happened is unclear".
- A Tigrinya speaker's check of the C28 Tigrinya alias column (six aliases held out of the files: ጸብሒ ደርሆ, ቅልዋ, ሓምሊ, ጣይታ, ሕምባሻ, taita).
- Any rental evidence for Gonfa, Dunguza, Ferikh and Tsimdi (left as a sale).
- The "Prohibited & Restricted Items" policy draft — with counsel since C25.

**Waiting on the curator (asked, no answer in the sources):**
- C29 delivery.
- The proposal for several sizes on one post (asked 2026-09-29, t975) — "no reply seen".

**Recorded, not scheduled:**
- Per-m²-per-month commercial rent (needs a DEC-079 change).
- Wood & Timber shared card slot (needs an app change).
- A second condition scale at Health & Wellness; Derma Roller asked the leaf's Brand; Other Home & Garden has no pointer line to Household & Cleaning (batch 17 "Seen, not changed").
- Vehicles' one-option `offer_type` — "an unlink candidate for a later cycle if the walk finds it noisy" (C25).
- Open research rows of the R1/R3 note ("Still open"): block machines (power quoted 4.8 to 27 kW for the same model names), tower lights (trade quotes generator output), gravel 00 and 03 (no mm range found), the ISUZU dump-truck load (no Ethiopian figure), polycarbonate (no Ethiopian sizes found). Size systems left blank for lack of evidence: Traditional Wear, Uniforms & Workwear, Maternity & Nursing.
- "Census C1 = 64 locked categories with a basis (left as-is, curator item)" (`docs/_changelog.md`, 2026-09-27, D31-M) — superseded in part by the price-periods work; not re-stated since.
- D63 guest-order cells and the icon allowlist for the curator (named as future on 2026-09-28) — not mentioned again in the sweeps.
- Dealer bulk-upload and other visibility ideas the census prompted are engineering candidates, not curator items.
- The curator's site-approval friction on jiji.com.et (2026-10-02): two fixes offered, outcome unknown.

**Closed, so not to be reopened without a ruling:** Pets & Animals; Kirkland; the market census pages not read; Jobs and Tenders (v2).


# PART 5 — PROVENANCE AND GAPS

## 5.1 Sources used

1. **Uploads folder** `/root/.claude/uploads/816e001c-c6e2-5d14-8c96-8806c1962fa4/` — 137 `.md` files and 280 `.csv` files. Every curator note is listed in a Part 2 entry (132 notes). Every CSV was listed with `ls` dates, size, `wc -l` and its header row; none was read in full. For every CSV in the folder the line count is the data-row count plus one.
   - Not curator catalogue deliveries: five Locations-curator notes of 2026-09-16 (`184ebe9e-evidence.md`, `59b791fd-evidence-c2.md`, `76faaa44-evidence-c3.md`, `28abead5-evidence-c3-addendum.md`, `26042708-evidence-c4.md`).
   - Operator exports in the folder (not deliveries; data rows in brackets): `c130c9d5-definitions_1.csv` (475) and `c7b794da-links_1.csv` (1,339), 2026-09-25; `aaaef93c-definitions.csv` (477), `483b54b6-links.csv` (1,339) and the root exports `construction-*`, `food-drink-*`, `travel-*`, 2026-09-26; `287522e8-definitions_2.csv` (485) and `1b0125ae-links_2.csv` (1,368), `5389319f-definitions_4.csv` (486) and `82d57fcd-links_4.csv` (1,371), `43ad81fb-definitions_6.csv` (486), `a15f5e25-links_6.csv` (1,370) and `da8df8c5-categories.csv` (163), `f5f789ab-categories_1.csv` (163), `e89091e5-definitions_1.csv` (485) and `611f32a2-links.csv` (1,369), `93bf32a4-categories_3.csv` (163), `1010df3b-categories_4.csv` (163), `00d47336-categories_5.csv` (162), `512a7ba3-definitions_2.csv` (485) and `c4cc6c19-links_1.csv` (1,366), all 2026-09-27; `4acbec63-definitions_13.csv` (529), `8fc35aa5-links_13.csv` (1,446) and `4ff12e09-categories_8.csv` (167), 2026-09-30; `7d97c641-countries_1.csv` (249), 2026-10-04. Exports after 2026-09-30 were sent to the curator but, except the countries file, are not in this folder.
2. **Supervisor audit outputs and scripts** in the scratchpad: `b9issues.txt`, `b10issues.txt`, `b11issues.txt`, `b12audit.txt`, `b12issues.txt`, `b12issues_direct.txt`, `b13audit.txt`, `b13iss.txt`, `b14audit.txt`, `b14iss.txt`, `b17_audit.txt`; `b18_audit.txt` (a saved model state, not text); the scripts named in Part 1 §1.5.
3. **Transcript sweeps** `handover/sweep-*.md` (section 3 of each, for turns 836–1369) and `handover/sweep-supplement-gaps.md` (turns 1309–1330, 1056–1060, 924–925, 1369–1375); **raw turns** `handover/raw/turns-*.txt` (turns 800–801, 835–922, 926–1055, 1061–1105, 1241–1308, 1331–1368). The sweeps for turns 1106–1240 were rewritten into their final form while this record was being compiled; section 3 of each was read after the rewrite.
4. **Supervisor notes** `bundle3_draft.md` (entries of 2026-10-04 and 2026-10-05 00:02Z / 00:12Z), `c29-curator-prompt.txt`, `bundle-4-brief.txt` (Part B step 6 and Part G), `turn9b-prompt.txt`.
5. **Memory dump** (`mcp-memory-memory_read-1791155814063.txt`): the project files product-decisions, product-decisions-2 and ways-of-working, for dated operator rulings.
6. **Repo clone** `/tmp/ethio` at `2b55ed15`: `docs/governance/handoffs/2026-09-08-catalog-curation-thread-handoff.md`, the handoffs of 2026-09-27 and 2026-09-28, `docs/features/attributes.md`, `imports.md`, `categories.md`, `docs/data/reserved-names-v3.csv`, `docs/governance/reviews/curation-era-closeout-2026-09-15.md`, `AGENTS.md:18`, `docs/_changelog.md`, `docs/spec/spec-ledger.md` (lines 1232–1395, 1485–1574), `docs/tracking/incidental-findings.md` (INC-252, INC-279, INC-290, INC-293 lines), `src/server/imports/registry.ts`, `gate.ts`.

## 5.2 Per delivery — files and sources

"Uploads listed" counts the files shown under **Files** in the entry. Entry numbers are those of Part 2.

| # | Delivery | Uploads listed (notes · CSVs) | How the curator note was read | Other sources cited in the entry |
|---|---|---|---|---|
| 1 | Before the uploads folder — the first curation programme (2026-09-08 → 2026-09-15), from t | 0 · 0 | no curator file; repo record only | spec-ledger |
| 2 | Cycle 1 — Vehicles — §7 dependency pass (review note, change note, two addenda) | 4 · 0 | notes: title and expected-preview lines only | memory, spec-ledger, spec-ledger:1489 |
| 3 | Cycle 1 (reopened) — Vehicles — §8 completeness pass: review note and addendum 3 | 2 · 0 | notes: title and expected-preview lines only | memory, spec-ledger:1489 |
| 4 | Cycle 2 — Electronics — §8 completeness pass, with the R18 · R19 · R20 addendum | 3 · 0 | notes: title and expected-preview lines only | memory, spec-ledger:1489 |
| 5 | Electronics addendum — redelivery (row 47 fixed) and the R17 popularity addenda (Vehicles, | 1 · 0 | notes: title and expected-preview lines only | spec-ledger:1489 |
| 6 | Cycle 3 — Real Estate — §8 completeness pass, with the R21 · R22 · R23 · R24 addendum | 3 · 0 | notes: title and expected-preview lines only | spec-ledger:1489 |
| 7 | "SUPERVISOR AUDIT 2026-09-21 — ADDENDA" — Electronics (E1–E7), Vehicles (V1–V6), Real Esta | 1 · 0 | notes: title and expected-preview lines only | memory |
| 8 | Cycle 4 — Construction Material — §8 completeness pass (review note; §9 pre-delivery audit | 2 · 0 | notes: title and expected-preview lines only | spec-ledger:1489 |
| 9 | Cycle 5 — Services — §8 completeness pass, and the re-issue (categories alignment · S1–S6) | 3 · 0 | notes: title and expected-preview lines only | spec-ledger:1489 |
| 10 | Cycle 6 — Home & Garden — §8 completeness pass | 2 · 0 | notes: title and expected-preview lines only | spec-ledger:1489 |
| 11 | Cycle 7 — Fashion — §8 completeness pass | 2 · 0 | notes: title and expected-preview lines only | spec-ledger:1489 |
| 12 | Cycle 8 — Babies & Kids — §8 completeness pass, with the addendum (B1 · B2 · O3) and the F | 3 · 0 | notes: title and expected-preview lines only | spec-ledger:1489 |
| 13 | Cycle 9 — Beauty & Personal Care — §8 completeness pass | 2 · 0 | notes: title and expected-preview lines only | memory, spec-ledger:1489 |
| 14 | Cycle 10 — Agriculture & Farming — §8 completeness pass | 2 · 0 | notes: title and expected-preview lines only | spec-ledger:1489 |
| 15 | Cycle 11 — Commercial Equipment — §8 completeness pass (review note only) | 1 · 0 | notes: title and expected-preview lines only | spec-ledger:1489 |
| 16 | Cycle 11b — Construction & machinery boundary (review note, then the batch of five deltas) | 2 · 0 | notes: title and expected-preview lines only | spec-ledger:1489 |
| 17 | Cycle 12 — Sports & Leisure — §8 completeness pass | 2 · 0 | notes: title and expected-preview lines only | spec-ledger:1489 |
| 18 | Cycle 13 — Pets & Animals — §8 completeness pass, and the Pets walk colour files | 2 · 0 | notes: title and expected-preview lines only | spec-ledger:1489 |
| 19 | Cycle 14 — Travel & Accommodation — §8 completeness pass | 1 · 0 | notes: title and expected-preview lines only | spec-ledger:1489 |
| 20 | Cycle 15 — Food & Beverages — §8 completeness pass | 1 · 0 | notes: title and expected-preview lines only | spec-ledger:1489 |
| 21 | Cycle 16 — "Other" leaves and findability: the categories file, the cross-root adjacency b | 2 · 0 | notes: title and expected-preview lines only | memory, spec-ledger:1489 |
| 22 | R21 — "lock certain facts": cross-root definitions deltas, colour gold and the phone/lapto | 1 · 0 | notes: title and expected-preview lines only | spec-ledger:1489, spec-ledger:1510 |
| 23 | Cycle 17 — re-check of Vehicles · Electronics · Real Estate under §8/§9/§10 | 2 · 0 | notes: title and expected-preview lines only | spec-ledger:1489 |
| 24 | Cycle 18 · batch 1 — §10 seller-view re-check: Fashion, Home & Garden, Services | 6 · 11 | change notes: title line and file table; review notes: title line only | audit18.py, audit18b.py, dump18.py, incidental-findings.md, memory, spec-ledger:1489 |
| 25 | Cycle 18 · batch 1 follow-ups ("c18-b1-followups") and the batch-2 review notes | 4 · 7 | change notes: title line and file table; review notes: title line only | audit18f.py, spec-ledger:1489 |
| 26 | Cycle 18 · batch 2 — Babies & Kids, Beauty & Personal Care, Agriculture & Farming, plus th | 4 · 16 | change notes: title line and file table; review notes: title line only | audit18c.py, audit18c_v2.py, audit18d.py, memory, spec-ledger:1489 |
| 27 | Cycle 18 · batch 3 — §10 re-check: review notes (step 1) for Pets & Animals, Sports & Leis | 3 · 0 | review notes: opening line only |  |
| 28 | Cycle 18 · batch 3 — Commercial Equipment, Sports & Leisure, Pets & Animals, plus the batc | 4 · 11 | change notes: title line and file table; review notes: title line only | audit18e.py, memory, spec-ledger:1489 |
| 29 | Cycle 18 · batch 4 — §10 re-check: review notes (step 1) for Construction Material, Travel | 3 · 0 | review notes: opening line only |  |
| 30 | Cycle 18 · batch 4 — Construction Material, Food & Beverages, Travel & Accommodation, plus | 4 · 14 | change notes: title line and file table; review notes: title line only | audit18g.py, spec-ledger:1508 |
| 31 | Cycle 18 · batch 4 — addenda 2 ("b4b": Travel · Vehicles · Services · Commercial tidy) | 1 · 5 | change notes: title line and file table; review notes: title line only | audit18h.py, spec-ledger:1508 |
| 32 | Cycle 19 — Electronics: §10 review note (step 1) | 1 · 0 | review notes: opening line only |  |
| 33 | Cycle 19 — Electronics: the files (step 2) | 1 · 3 | change notes: title line and file table; review notes: title line only | audit18i.py, spec-ledger:1509 |
| 34 | Cycle 20 — walk findings (D48 · D50 · D51 · D52 · D54 · D55 + helps + model order) | 1 · 9 | change notes: title line and file table; review notes: title line only | audit18j.py, spec-ledger:1510 |
| 35 | Cycle 20b — Electronics re-base (display pass + decoder link + Gaming tidy) | 1 · 3 | change notes: title line and file table; review notes: title line only | audit18k.py, spec-ledger:1511 |
| 36 | Cycle 21 — D57 · D60 · INC-293 (option 1) | 1 · 3 | change notes: title line and file table; review notes: title line only | audit18l.py, spec-ledger:1512–1514 |
| 37 | Study C22 — "Related categories together, reachable from each other" (read-only proposal) | 1 · 0 | note: opening and file table read | raw t800, raw t801, repo handoff 2026-09-27 |
| 38 | Cycle 22 — adjacency step 2 (A2 · fourteen surfacings · sibling orders) + two follow-ups | 2 · 6 | note: opening and file table read | docs/features/categories.md, sweep-0836-0880 |
| 39 | Cycle 23 — definitions/links tracks while categories files were on hold (INC-303 hardening | 1 · 3 | note: opening and file table read | audit_c23.py, sweep-0836-0880, verify_c23.py |
| 40 | Cycle 24 — delete the retired Auto Services leaf | 1 · 1 | note(s) read in full | raw t835, sweep-0836-0880 |
| 41 | Study C25 — gaps in the catalogue: books · media · art & collectibles · religious & cultur | 3 · 5 | note: opening and file table read | audit_c25.py, audit_c25_links.py, memory, sweep-0836-0880 |
| 42 | Cycle 26 — the five guest pointers C25's creates did not carry | 1 · 1 | note(s) read in full | sweep-0836-0880 |
| 43 | C27 · Batch 1 — Food & Beverages and Books: review note (no files) | 1 · 0 | note: opening and counts table read; rest from the sweep | sweep-0926-0970, sweep-supplement-gaps |
| 44 | C27 · Batch 2 — Fashion + Babies & Kids (+ size and shoe rows of Sports Equipment): review | 1 · 0 | note: opening and counts table read; rest from the sweep | sweep-0926-0970 |
| 45 | C27 · Batch 1 — Food & Beverages and Books: the files (step 2), with the Batch 2 addendum | 2 · 6 | change note: base, file table, audit and waiting sections read; rest from the sweep | audit_c27b1.py, sweep-0926-0970 |
| 46 | C27 · Batch 2 — Clothing & Shoes, Babies & Kids, Sports Equipment sizes: the files (step 2 | 1 · 4 | change note: base, file table, audit and waiting sections read; rest from the sweep | audit_c27b2.py, eff_checks.py, sweep-0971-1015 |
| 47 | C27 · b1f — Batch 1 walk follow-ups (a–f): the files | 2 · 4 | change note: base, file table, audit and waiting sections read; rest from the sweep | audit_c27b1f.py, merge_c27b1f.py, sweep-0971-1015 |
| 48 | C27 · b1g — Batch 1 walk follow-ups, round 2 (R1–R4, Food) and the C1–C3 census | 1 · 7 | change note: base, file table, audit and waiting sections read; rest from the sweep | audit_c27b1g.py, sweep-0971-1015 |
| 49 | C27 · b1h — Food round 3 (F1–F5), with the Other-leaves and Vehicles review notes (no file | 3 · 5 | change note: base, file table, audit and waiting sections read; rest from the sweep | audit_c27b1h.py, sweep-0971-1015 |
| 50 | C27 · File 1 (`c27-o`) — the "Other" leaves (O1–O3) + the US gallon | 2 · 4 | change note: base, file table, audit and waiting sections read; rest from the sweep | audit_c27o.py, sweep-0971-1015 |
| 51 | C27 · Help file 1 — Food first sentences, the help census and the INC-357 write-in census | 1 · 4 | change note: base, file table, audit and waiting sections read; rest from the sweep | sweep-0971-1015, sweep-1016-1060 |
| 52 | C27 · Vehicles step 2 | 2 · 6 | change note: base, file table, audit and waiting sections read; rest from the sweep | audit_c27veh.py, sweep-1016-1060 |
| 53 | C27 · INC-358 (Yadea and Dodai are electric) and C1–C3, batch 1 — Food & Beverages (C3) | 2 · 5 | change note: base, file table, audit and waiting sections read; rest from the sweep | audit_c27c3.py, sweep-1016-1060 |
| 54 | C27 · C1–C3, batch 2 — Clothing & Shoes | 1 · 5 | change note: base, file table, audit and waiting sections read; rest from the sweep | audit_c27fash.py, sweep-1016-1060 |
| 55 | C27 · C1–C3, batch 3 — Babies & Kids | 1 · 5 | change note: base, file table, audit and waiting sections read; rest from the sweep | audit_c27babies.py, sweep-1016-1060 |
| 56 | C27 · C1–C3, batch 4 — Sports & Leisure, with the rent and watch follow-ups | 1 · 6 | change note: base, file table, audit and waiting sections read; rest from the sweep | audit_c27sports.py, sweep-1016-1060 |
| 57 | C27 · C1–C3, batch 5 — Construction Material, with DEC-094 ruling 1 and the pointer rule | 1 · 6 | change note: base, file table, audit and waiting sections read; rest from the sweep | audit_c27constr.py, sweep-1016-1060 |
| 58 | C27 · INC-357 — the 24 write-in unlinks | 1 · 3 | change note: base, file table, audit and waiting sections read; rest from the sweep | audit_c27writein.py, sweep-1016-1060 |
| 59 | C27 · C1–C3, batch 6 — Home & Garden | 1 · 5 | change note: base, file table, audit and waiting sections read; rest from the sweep | audit_c27hg.py, sweep-1016-1060 |
| 60 | C27 · Construction walk fixes — DEC-095 pointer lines, presets, standard sizes, sand and g | 1 · 9 | change note: base, file table, audit and waiting sections read; rest from the sweep | audit_c27walkfix.py, check_walkfix.py, check_walkfix2.py, sweep-1016-1060, sweep-supplement-gaps |
| 61 | C27 · R1 / R3 batch and Beauty & Personal Care | 1 · 7 | change note: base, file table, audit and waiting sections read; rest from the sweep | sweep-1061-1105, sweep-supplement-gaps |
| 62 | C27 · batch 8 — `battery_ah` delete, Beauty Unit of Sale, hardwood check, Real Estate root | 1 · 7 | change note: base, file table, audit and waiting sections read; rest from the sweep | sweep-1061-1105 |
| 63 | C27 · batch 9 — Electronics root pass (one row refused, re-issued the same day) | 2 · 5 | change note: base, file table, audit and waiting sections read; rest from the sweep | b9issues.txt, sweep-1061-1105 |
| 64 | C27 · batch 10 — iPhone model refresh and Services root pass | 2 · 7 | change note: base, file table, audit and waiting sections read; rest from the sweep | b10issues.txt, sweep-1061-1105 |
| 65 | C27 · batch 11 — Agriculture & Farming root pass | 2 · 2 | change note: base, file table, audit and waiting sections read; rest from the sweep | b11issues.txt, sweep-1061-1105 |
| 66 | C27 · batch 12 — Silage fix + Commercial Equipment root pass | 1 · 5 | change note: base, file table, audit and waiting sections read; rest from the sweep | b12audit.txt, b12issues.txt, b12issues_direct.txt, b12sim.py, check_direct.py, sweep-1106-1150 |
| 67 | C27 · batch 13 — the rulings, Pets, Travel and Sports' order rows (closes the root pass) | 1 · 7 | change note: base, file table, audit and waiting sections read; rest from the sweep | b13audit.txt, b13checks.py, b13iss.txt, b13pass2.py, b13sim.py, sweep-1106-1150 |
| 68 | C27 · batch 14 — follow-ups: Canal+, birds by the pair, dog sizes, Life stage | 1 · 5 | change note: base, file table, audit and waiting sections read; rest from the sweep | b14audit.txt, b14iss.txt, sweep-1106-1150 |
| 69 | C27 · batch 15 — dog sizes by the four-fifths test (one Breed row) | 1 · 1 | change note: base, file table, audit and waiting sections read; rest from the sweep | sweep-1106-1150 |
| 70 | C27 — market census (read-only; nothing built) | 1 · 1 | note: §1, §2, §5.1 and §7 read; data CSV: header and row count only | sweep-1106-1150 |
| 71 | C27 · batch 16 — vehicle make and model lists (definitions only) | 2 · 4 | change note: base, file table, audit and waiting sections read; rest from the sweep | audit_b16.py, audit_b16b.py, sweep-1151-1195 |
| 72 | C27 · batch 17 — the census rows (new leaf Household & Cleaning; 49 makers; 32 brand lists | 1 · 6 | note(s) read in full | b17_audit.txt, merge_b17.py, sweep-1151-1195 |
| 73 | C27 · batch 18 — Part For, two makers, one finder word, `own_place` | 1 · 4 | note(s) read in full | b18_audit.txt, importer_caps.py, merge_b18.py, sweep-1196-1240 |
| 74 | C27 · batch 19 — "Negotiable" leaves Pricing Basis | 1 · 3 | note(s) read in full | merge_b19.py, sweep-1196-1240 |
| 75 | C27 — price periods in rent and hire ads (note, no rows) | 1 · 0 | note(s) read in full | sweep-1196-1240 |
| 76 | C27 — reserved seller names, first list (research list, not an import file) | 1 · 1 | note(s) read in full | sweep-1196-1240 |
| 77 | C27 — reserved seller names v2 (two columns added) | 1 · 1 | note(s) read in full | sweep-1241-1285 |
| 78 | C27 — reserved seller names v3 (final) | 1 · 1 | note(s) read in full | sweep-1241-1285 |
| 79 | C27 — countries check (result note, no new rows) and the four currency corrections | 1 · 2 | note(s) read in full | bundle3_draft, raw t1299, raw t1300, raw t1301, sweep-1241-1285, sweep-1286-1330 |
| 80 | C28 — occasion food and catering: research and plan (no import rows) | 1 · 2 | note: opening, §2.1, §2.3–2.5, assumptions and §2.9 read; tally and sources CSVs: header and row count only | bundle3_draft, c29-curator-prompt.txt, sweep-1331-1369 |

## 5.3 Gaps — what could not be settled

1. **Cycles 1–21 (2026-09-20 → 2026-09-27 morning): no audit verdicts or pasted import lines.** The supervisor chat before turn 836 was not swept. For those cycles the record has the curator's notes and expected previews, and the repo ledger's summary lines; the CSV files of cycles 1–17 are not in the uploads folder at all.
2. **The first programme (2026-09-08 → 2026-09-15)** has no files in the folder; it is recorded from the repo only, as one entry.
3. **Cycle numbering "C1 … C29":** the curator's numbers restart. "Cycle 1 … cycle 17" are the dependency passes of 2026-09-20 → 24; the earlier programme's passes were not numbered in the sources read; C18 … C28 follow; C29 is a prompt. A few notes cite cycles the folder does not hold as such (a Vehicles §8 step-2 change note; a cycle-11 Commercial change note; the `c19r-*` files and `c19-electronics-links-fixed.csv`; `catalog-audit-2026-09-21.md`).
4. **Turn 923** (the supervisor's widened Study C27 prompt) is in no sweep or raw file, and neither is turn 1376; the prompt text that launched the root pass is therefore not quoted.
5. **Console count lines not in the sources:** C27 Batch 2; b1g ("CORRECTLY APPLIED" only); the write-in batch and Home & Garden ("yes"); the walk-fix batch ("yes done this" / "done yes"); batch 15 (found already applied on re-upload); batch 16 ("done"); Cycle 23 and 24 (ledger wording only).
6. **Beauty import of 2026-10-01:** the supervisor first declared it live, then corrected itself — the batch 8 preview (63 changed) showed it had not applied; batch 8 carried the same changes. No separate console line for the Beauty files exists.
7. **Counts that disagree between curator and supervisor, both given in the entries:** batch 14 new notes (16 vs 24); batch 13 links file (changed 36 · unchanged 1,423 vs the supervisor's diff changed 46 · unchanged 1,413); batch 17 links (added 7 · changed 24 vs added 4 · changed 27) and brand lists (32 vs 33); b1g links (added 8 · changed 72 vs 79 changed · 1 added); Batch 2 form-path flags (72 + 11 vs 75 + 11); post-C26 links (1,419 vs 1,412); vehicle make counts in batch 16 (with or without each list's Other).
8. **Rent and hire leaves:** 17 in the supervisor's notes, 18 in its message to the operator.
9. **"The seven dog breeds … Not accepted"** in the census rulings: whether these are the census note's seven missing breeds or batch 15's seven size-prefill breeds is unclear in the sweep.
10. **Engine items:** whether INC-381 also closes DEC-088; the status of W4b (yes/no locks) after 2026-09-30; whether the curator was told that DEC-103 (1,500 options) and the 150-value ceiling are live in every later prompt (the C29 prompt says fifty).
11. **Not confirmed sent or done:** the short curator note after batch 16's import; the native proofread of any Amharic list; the fate of the multi-size proposal; whether the operator used either fix for the curator's jiji.com.et approval prompts.
12. **The curator's own instruction text** (§7–§10 of the curation Project's instruction, its "Knowledge") is not in any source read; Part 1 describes it only through the notes that cite it.
13. **The rows inside the CSV files were not read.** Row counts and headers are from the files; what each file changes is taken from its change note and the supervisor's audit prose.
14. **C29** had no delivery when this record was written (2026-10-04 evening ET); its outcome is not recorded here.
