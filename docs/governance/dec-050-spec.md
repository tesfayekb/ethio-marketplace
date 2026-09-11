# DEC-050 — Attribute Definition v2 (P1) — Pass-2 spec

Supervisor draft · 2026-09-11 · for operator approval before any execution prompt (§3). Pass-1 is `docs/governance/reviews/attribute-system-deep-dive-2026-09-11.md`. Every door, column and test named below was read in the clone at dev `f2405b2`.

## 0. Scope

**In:** additive fields on attribute definitions (number semantics, text presets, Amharic help text), three optional keys on option records (`active`, `bounds`, `aliases`), retirement of the dead `range` type, an Amharic option-coverage read, the import/export cells and console fields for all of it, the validation rules at import and at the door, tests, docs.

**Out (own DECs):** the listing-side validator and `attrs` storage (DEC-051, U6-A); category `capabilities` and bookings (DEC-052); lazy option delivery (DEC-053, U6-C); posting-form groups; a rule language; unit pickers; variants.

## 1. Data model (additive; one migration, INC-183 law throughout)

### 1.1 `public.attributes` — new nullable columns
| column | type | rule (table CHECK) |
|---|---|---|
| `unit` | text | 1–16 chars; only when `attr_type = 'number'` |
| `min_bound`, `max_bound` | text | each either a numeric literal (`-?[0-9]+(\.[0-9]+)?`) or a year token `year`, `year+N`, `year-N` (N 1–99); only when `attr_type = 'number'`; when both numeric, `min ≤ max` |
| `decimals` | smallint | 0–3; only when number; `format = 'year'` forces 0 |
| `format` | text | `plain` \| `year`; only when number |
| `preset` | text | allowlist below; only when `attr_type = 'text'` |
| `max_length` | integer | 1–1000; only when text |
| `help_text_am` | text | ≤240 chars (and `help_text_en` gets the same cap) |

Year tokens resolve server-side against `extract(year from now() at time zone 'UTC')`; a function `public.attr_bound_value(text) returns numeric` is the single resolver (used by the planner's checks, the DEC-051 validator later, and exposed to the client only as a resolved number).

### 1.2 Option record — optional keys (JSON, strict)
`{ "value", "label_en", "label_am", "parent"?, "active"?: bool, "bounds"?: { "<attribute_key>": { "min"?: number|token, "max"?: number|token } }, "aliases"?: string[] }`
- Unknown keys are refused, naming the key (no silent tolerance).
- `active` defaults to true when absent; the exporter writes it only when false, so unchanged rows stay byte-identical.
- `bounds` keys must name an attribute of type `number` that is linked, directly or by inheritance, in **every** category where the owning definition is linked (checked against the post-plan link set at import and against live links at the door). Each `{min, max}` obeys 1.1's literal/token rule and `min ≤ max` when both numeric.
- `aliases`: ≤5 entries, each 1–32 chars, no control characters, unique within the definition case-insensitively; search-only, never displayed.

### 1.3 `range` retired
`ALTER TABLE public.attributes DROP CONSTRAINT … ; ADD CONSTRAINT … CHECK (attr_type IN ('text','number','single_select','multi_select','boolean','date'))`, preceded by a proof that no row carries `range`.

### 1.4 Option coverage
`public.admin_attribute_option_coverage()` — gated read (`has_permission` on the attributes resource), returns per attribute `options_total`, `options_with_am`; the library shows it as a `detail`-tier column (C7). No new index (it reads `options` in memory per row; ESTIMATE <50 ms for the current 200 definitions; re-measure at 1,000).

### 1.5 Presets (code allowlist, mirrored in SQL as a CHECK list)
`digits:N` (N 1–64) · `vin` (17 chars, no I/O/Q) · `plate-et` (Ethiopian plate shapes, spec'd in the landing from the executor's census of formats) · `alnum:A-B` (A ≤ B ≤ 64) · `free:N` (N 1–1000). No contact-data presets by construction; each preset carries a refusal message key with EN+AM.

## 2. Doors (whole re-declarations; closers in-file; definition + ACL read-backs)
- `admin_upsert_attribute` — new signature (DROP + full declaration): the seven existing parameters plus `p_unit`, `p_min_bound`, `p_max_bound`, `p_decimals`, `p_format`, `p_preset`, `p_max_length`, `p_help_text_en`, `p_help_text_am`. Validates 1.1 against `attr_type`, the option keys of 1.2 (including the `bounds` linkage rule against live links), presets against the allowlist; refusals name the value and the rule. Writer order F5 (gate → capture → mutate); revisions capture old → new for every new column and for options.
- `attr_import_plan(jsonb, jsonb, text)` — diffs the nine new cells and the three option keys; refuses per §3 naming row, cell and value; a catch-all-style silent drop is not permitted for any editable cell (INC-187's lesson: every editable cell is diffed **and** committed **and** undone).
- `admin_commit_attribute_import` / `admin_undo_attribute_import` — apply and restore all new cells through the upsert door; undo restores options byte-for-byte from the captured prev.
- `admin_merge_attributes` — unchanged (merge moves links; the survivor keeps its own options and config). Read-back proof that its body is byte-identical.
- The DEC-051 validator is **not** part of P1, but 1.1's resolver and 1.2's shapes are designed for it.

## 3. Rules and refusals (each has an i18n key EN+AM and a hostile-file row)
| id | rule | refusal names |
|---|---|---|
| R-unit | unit only on number; 1–16 chars | key, unit |
| R-bound | literal or year token; min ≤ max; year format ⇒ integer literals | key, min, max |
| R-decimals | 0–3; year ⇒ 0 | key, decimals |
| R-format | plain \| year | key, format |
| R-preset | allowlist; only on text | key, preset |
| R-maxlen | 1–1000; only on text | key, max_length |
| R-help | ≤240 each | key, which |
| R-opt-key | unknown option key | key, option value, unknown key |
| R-opt-active | boolean | key, option value |
| R-opt-bounds | target is a number attribute linked wherever the owner is linked; min ≤ max; tokens | key, option value, target key, reason |
| R-opt-alias | ≤5, 1–32 chars, unique, no control chars | key, option value, alias |
| R-header | stale header (a file exported before P1) | the missing column names |

## 4. Export / import
- Definitions header becomes: `attribute_key, label_en, label_am, type, options, depends_on, unit, min, max, decimals, format, preset, max_length, help_text_en, help_text_am, is_per_variant (read-only), direct_link_count (read-only), action`. New cells are `editable`; empty cell = null. **Files exported before P1 must be re-exported** — the gate already refuses a header that differs, and this spec keeps that rule (R-header) rather than guessing at missing columns. (This corrects the Pass-1/ledger sentence "files exported before P1 still import as unchanged".)
- Options cell: records gain the optional keys; exporter emits `active` only when false, `bounds`/`aliases` only when present, key order fixed (`value, label_en, label_am, parent, active, bounds, aliases`) so unchanged rows round-trip byte-identically.
- Links file: unchanged.
- Curation handoff §8 (landing L4): cell semantics and authoring guidance — where bounds go (make: first production year; model: last year), how to write tokens, when to use presets, and the backfill template for Vehicles, Real Estate, Electronics.

## 5. Console (C-rules; DataTable primitive; tokens only; every string a key)
- Definition editor: a **Number** group (unit, min, max, decimals, format) shown only for number; a **Text** group (preset, max_length) only for text; help text EN and AM as two fields with the 240 cap shown. Live inline validation mirrors §3; the door remains the authority.
- Option editor rows: `active` toggle (inactive rows render with the muted token and a translated "inactive" tag); `aliases` chip input (≤5); `bounds` mini-editor: pick a sibling number attribute from the definition's co-linked set, then min/max with a "year token" helper (`year`, `year±N`). Unknown-key JSON never reaches the door (the editor emits the fixed shape).
- Library: option coverage column (`n/N AM`), amber when incomplete — report-only, no gating.
- 360 px first; ≥44 px targets; logical properties; loading/empty/error states translated.

## 6. Tests (J-laws; fixtures via service client; twin helpers; dumps on mismatch)
- **Hostile-file spec** (`e2e/import-security.spec.ts`): one row per §3 rule, each proven to refuse with the named values, plus one "everything valid" definitions file that previews with the expected counts and commits, and an undo that restores every new cell and option key byte-for-byte.
- **Round-trip** (`AT-20`/`AT-21` family): an unedited post-P1 export imports as all-unchanged; a file with the new cells set on one definition imports as exactly one change.
- **Door proofs** (migration DO blocks): resolver values (`year+1` = next year), CHECK refusals per column, `range` absent, ACL read-backs, merge body unchanged.
- **Console** (`AT-3x` new): number group hidden for a select definition and shown for a number one; a bounds row targeting a non-co-linked attribute refused with the named reason; an inactive option carries `data-inactive="true"`; coverage column reads `n/N`.
- Local runs on both projects for every e2e-touching landing (DEC-023); "report only on green".

## 7. Landings (serial; one in flight; apply-pairing for the migration)
| # | Content | Tier | Proof |
|---|---|---|---|
| L1 | Migration: columns + CHECKs, `range` retired, resolver, coverage RPC, whole re-declarations of `admin_upsert_attribute` (new signature), `attr_import_plan`, `admin_commit_attribute_import`, `admin_undo_attribute_import`; in-file proofs; `docs/features/attributes.md` data-model section; ledger line. No e2e. | A (SECURITY DEFINER doors; import gate) | read-backs; staging apply → preflight green |
| L2 | Gate + registry + export: header, cell classes, option key allowlist and shape check, refusal keys EN+AM; hostile-file rows; AT round-trip updates. | A | local run green; every hostile row refuses |
| L3 | Console: editor groups, option row controls, coverage column; AT-3x; render walk. | B | local run green; operator walk |
| L4 | Docs: attributes.md complete (semantics, examples), curation handoff §8 + backfill template, changelog, ledger (DEC-050 LANDED), Knowledge v3.9 candidate line ("text validation by preset allowlist, never free regex" — installed only if the box's 10,000-character budget is paid for). | C | byte-diff |

ESTIMATE 4 Lovable turns; +1 if L3's option editor needs its own landing. Each landing carries its verification plan and revert recipe (forward-only: a corrective migration for L1, `git revert` for L2–L4).

## 8. Forward-scan (every later REQ and DEC read; result stated)
- REQ-017 attributes per category, REQ-020 brand as attribute — consistent; `bounds` reference attribute keys, never entities.
- REQ-018 pricing — price stays a listing field; no price attribute; `unit` never carries currency.
- REQ-021 screening — text attributes remain screened user content; presets cannot capture contact data.
- REQ-022 listing lifecycle — untouched.
- REQ-025 search — `aliases` feed the fuzzy index later; filters take unit and bounds from definitions.
- REQ-029 performance — no hot-path change; coverage RPC is admin-only; option lists unchanged in size until DEC-053.
- REQ-002/004 i18n — every new user-visible string is a key with EN+AM; help text has both languages; refusal messages are keys.
- REQ-003 launch performance — no public path touched.
- DEC-033 locations — no geography in attributes.
- DEC-043/044/045 — unchanged; a dependent's option may carry `bounds` (chained folds are DEC-051's job).
- DEC-051/052/053 — consume this model; nothing here forecloses them.
- Rider from the Electronics pass: **effective card-rank uniqueness** (an inherited rank may collide with an own rank; the DB enforces uniqueness per direct link only) — added to L2 as an import check (R-rank: a direct rank equal to an inherited rank in the same category is refused, naming both origins) and to the link manager as a refusal; hostile row included.
- Result: no conflicts found; two dependencies noted (DEC-051 consumes; C3-UX-3 partially served by the coverage read).

## 9. Open points for the operator (decide with the approval)
1. Preset allowlist as in 1.5 — approve or amend.
2. Year tokens limited to `year`, `year±N` (N ≤ 99) — approve.
3. `MAX_OPTIONS` stays 400 (Electronics chose series; the cap held) — approve.
4. R-header: files exported before P1 are re-exported, never guessed — approve.
5. Knowledge v3.9 line on presets: install only if paid for by a trim, else it lives in the curation handoff and AGENTS.md — approve.
