/**
 * IMPORT-GATE PART A — THE FAMILY REGISTRY.
 *
 * One declaration per import family. Nothing about a family's file shape lives
 * anywhere else: the gate reads permission, step-up, file identity, the exact
 * column set with its classes, per-column rules and the caps from HERE, so a
 * new family is added by declaring it (docs/features/imports.md) and never by
 * hand-rolling a second door.
 *
 * COLUMN CLASSES (IE-3): `identity` names the row, `editable` is applied,
 * `read-only` is reported and never applied, `action` carries the verb.
 */

/** Slug/key law shared by every family. */
export const SLUG_RE = /^[a-z0-9][a-z0-9_-]{1,63}$/;

export const MAX_BYTES = 1_048_576;
export const MAX_ROWS = 5000;
export const MAX_LABEL = 120;
export const MAX_OPTION_VALUE = 64;
export const MAX_OPTION_LABEL = 120;
/**
 * The ratified library already carries a 211-option vocabulary (`brand`), so a
 * cap of 200 would refuse the platform's own export on the way back in. 400 is
 * the DoS ceiling, not a taxonomy opinion.
 */
export const MAX_OPTIONS = 400;

/** A translation key's ceiling; the catalog's longest is far under it. */
export const MAX_KEY = 200;
/** A translated string's ceiling — long-form copy, still not a payload. */
export const MAX_VALUE = 4000;

/** Language scope law: `am`, `en`, `zxx-mo`, `tig-ET`. */
export const LANG_RE = /^[a-z]{2,3}(-[a-z0-9]{2,8})?$/i;

/** Translation keys are dotted paths, never slugs. */
export const KEY_RE = /^[A-Za-z0-9][A-Za-z0-9._:-]*$/;

/** DEC-050 L2b — a unit cell's ceiling, mirroring `attr_cell_check`. */
export const MAX_UNIT = 16;
/** A help sentence's ceiling, mirroring `attr_cell_check`. */
export const MAX_HELP = 240;

/**
 * DEC-050 L2b — a bound cell is a numeric literal or a year token (`year`,
 * `year+N`, `year-N`, N 1–99). The SHAPE of `attr_bound_ok`; resolution and
 * every semantic rule remain the SQL's.
 */
export const BOUND_RE = /^(-?\d+(\.\d+)?|year([+-][1-9][0-9]?)?)$/;

/**
 * DEC-050 L2b — the preset ALLOWLIST's shape (never a free regex): `vin`,
 * `plate-et`, `digits:N` (1–64), `free:N` (1–1000), `alnum:A-B` (1–64, A ≤ B).
 */
export function presetShapeOk(value: string): boolean {
  if (value === "vin" || value === "plate-et") return true;
  const digits = /^digits:(\d{1,2})$/.exec(value);
  if (digits !== null) {
    const n = Number(digits[1]);
    return n >= 1 && n <= 64;
  }
  const free = /^free:(\d{1,4})$/.exec(value);
  if (free !== null) {
    const n = Number(free[1]);
    return n >= 1 && n <= 1000;
  }
  const alnum = /^alnum:(\d{1,2})-(\d{1,2})$/.exec(value);
  if (alnum !== null) {
    const low = Number(alnum[1]);
    const high = Number(alnum[2]);
    return low >= 1 && low <= 64 && high >= 1 && high <= 64 && low <= high;
  }
  return false;
}

export type ColumnClass = "identity" | "editable" | "read-only" | "action";

export interface ColumnRule {
  name: string;
  klass: ColumnClass;
  /** `slug` also enforces SLUG_RE; empty is allowed unless `required`. */
  type?:
    | "text"
    | "slug"
    | "key"
    | "bool"
    | "int"
    | "date"
    | "pipe"
    | "options"
    | "enum"
    | "bound"
    | "preset"
    /** A signed decimal degree — shape only; range is the planner's verdict. */
    | "decimal";
  required?: boolean;
  maxLength?: number;
  /** Allowed values for `enum`/`action` columns (lower-cased comparison). */
  values?: readonly string[];
  /**
   * FORMULA LAW, per column. A leading `=`/`+`/`-`/`@` is refused everywhere by
   * default. `allow` is declared ONLY for free-text columns whose export
   * neutralises them, where `+ Add` is legitimate content and not an attack.
   *
   * INC-208 — every NUMERIC column (`int`, `decimal`) is exempt as well: a
   * plain negative (`-33.9`, a southern latitude) is a number, not a formula,
   * and the column's own shape check proves it. The export still neutralises
   * with a leading apostrophe and `unneutralize` still strips it, so both
   * spellings round-trip.
   */
  formula?: "allow";
}

export interface FileSpec {
  id: string;
  /** The first header cell — the file's identity, read before any row. */
  identityHeader: string;
  columns: readonly ColumnRule[];
  /** The columns that together name a row. */
  identityColumns: readonly string[];
  /**
   * Where the duplicate-identity verdict is made. `planner` is declared where
   * the family's law is inheritance-aware (IE-6: a direct row legitimately
   * shadows an inherited echo for the same category + key).
   */
  duplicateIdentity: "gate" | "planner";
  maxRows?: number;
  maxBytes?: number;
  /**
   * The header may stop at any declared column from this index on (an export
   * carries the trailing note column; a translator's editor often drops it).
   * Undeclared: the header must carry every declared column, in order.
   */
  optionalFrom?: number;
  /** Dialects this file accepts. Undeclared means CSV only. */
  readers?: readonly ("csv" | "xliff")[];
}

export interface FamilySpec {
  id: string;
  /** Permission the gated RPC re-checks; the gate never authorises alone (F3). */
  permission: string;
  /** Commit and undo demand a fresh step-up; preview does not. */
  stepUp: "commit" | "never";
  /**
   * `scope` is a category slug when the family supports subtree scoping; a
   * `country-code` scope is a two-letter country code, upper-cased by the RPC,
   * and `null` means every country.
   */
  scope: "category-slug" | "language" | "country-code" | "none";
  /**
   * Which modes spend the per-minute budget. A family with a preview door
   * meters the preview; a family that imports in ONE step meters that step, so
   * no door is left without a ceiling.
   */
  budgetModes?: readonly string[];
  files: readonly FileSpec[];
}

const ACTION_ATTRIBUTE_DEFS = ["", "upsert", "delete"] as const;
const ACTION_ATTRIBUTE_LINKS = ["", "upsert", "unlink"] as const;
const ACTION_CATEGORIES = ["", "upsert", "create-root", "retire", "reactivate", "delete"] as const;
const ACTION_LOCATIONS = ["", "upsert", "activate", "retire", "delete"] as const;
const ACTION_COUNTRIES = ["", "upsert", "open", "close"] as const;

/** A country's measurement profile, mirroring the `countries` constraint. */
const UNIT_SYSTEMS = ["metric", "imperial"] as const;

/** `ethiopia/oromia/adama/kebele-04` — four slugs and their separators. */
export const MAX_LOCATION_KEY = 260;

const ATTRIBUTE_TYPES = [
  "text",
  "number",
  "boolean",
  "single_select",
  "multi_select",
  "date",
] as const;

/** DEC-050 L2b — the number `format` allowlist, mirroring the SQL constraint. */
const NUMBER_FORMATS = ["plain", "year"] as const;

export const FAMILIES: Record<string, FamilySpec> = {
  attributes: {
    id: "attributes",
    permission: "categories:import",
    stepUp: "commit",
    scope: "category-slug",
    files: [
      {
        id: "definitions",
        identityHeader: "attribute_key",
        identityColumns: ["attribute_key"],
        duplicateIdentity: "gate",
        columns: [
          { name: "attribute_key", klass: "identity", type: "slug", required: true },
          { name: "label_en", klass: "editable", type: "text", maxLength: MAX_LABEL },
          { name: "label_am", klass: "editable", type: "text", maxLength: MAX_LABEL },
          { name: "type", klass: "editable", type: "enum", values: ATTRIBUTE_TYPES },
          { name: "options", klass: "editable", type: "options" },
          { name: "depends_on", klass: "editable", type: "slug" },
          /**
           * DEC-050 L2b — THE NINE v2 CELLS. Shape only: the planner
           * (`attr_cell_check`) stays the authority on every semantic rule —
           * which type may carry which cell, ranges, and `year` arithmetic.
           */
          { name: "unit", klass: "editable", type: "text", maxLength: MAX_UNIT },
          { name: "min", klass: "editable", type: "bound" },
          { name: "max", klass: "editable", type: "bound" },
          { name: "decimals", klass: "editable", type: "int", formula: "allow" },
          { name: "format", klass: "editable", type: "enum", values: NUMBER_FORMATS },
          { name: "preset", klass: "editable", type: "preset" },
          { name: "max_length", klass: "editable", type: "int", formula: "allow" },
          { name: "help_text_en", klass: "editable", type: "text", maxLength: MAX_HELP },
          { name: "help_text_am", klass: "editable", type: "text", maxLength: MAX_HELP },
          { name: "is_per_variant", klass: "read-only", type: "bool" },
          { name: "direct_link_count", klass: "read-only", type: "int", formula: "allow" },
          { name: "action", klass: "action", values: ACTION_ATTRIBUTE_DEFS },
        ],
      },
      {
        id: "links",
        identityHeader: "category_path",
        // A file may stop after `origin`: the two per-link cells are trailing.
        optionalFrom: 7,
        identityColumns: ["category_slug", "attribute_key"],
        // IE-6: nearest-wins is the planner's verdict, not the gate's.
        duplicateIdentity: "planner",
        columns: [
          { name: "category_path", klass: "read-only", type: "text" },
          { name: "category_slug", klass: "identity", type: "slug", required: true },
          { name: "attribute_key", klass: "identity", type: "slug", required: true },
          { name: "is_required", klass: "editable", type: "bool" },
          { name: "is_filterable", klass: "editable", type: "bool" },
          { name: "card_rank", klass: "editable", type: "int", formula: "allow" },
          { name: "origin", klass: "read-only", type: "text" },
          /**
           * M-MAINT-2 B / U6-C1-R3b-1 STEP 7 — THE TWO PER-LINK CELLS (D-spec
           * §12). `allowed_options` narrows the definition's own option list for
           * THIS category; `default_value` prefills it. `attr_import_plan` and
           * `admin_commit_attribute_import` have judged and written both since
           * 20260920000002, and `attr_export_payload` echoes them — leaving them
           * out of the FILE meant an operator could set them one link at a time
           * and never in bulk, and a round trip dropped what was stored
           * (INC-188). They sit LAST, behind `optionalFrom`, so a file an
           * operator exported before this change is still a valid file: a cell
           * a file never carries is a cell the planner never touches. Shape only
           * here; every semantic rule (is the value one the definition offers,
           * is the default inside the narrowing) stays the planner's verdict
           * (`badAllowedOption:` / `badDefault:`).
           */
          { name: "allowed_options", klass: "editable", type: "pipe" },
          {
            name: "default_value",
            klass: "editable",
            type: "text",
            maxLength: MAX_LABEL,
            // INC-208's rule: a numeric default (`-3`) is a number, not a formula.
            formula: "allow",
          },
          { name: "action", klass: "action", values: ACTION_ATTRIBUTE_LINKS },
        ],
      },
    ],
  },
  categories: {
    id: "categories",
    permission: "categories:import",
    stepUp: "commit",
    scope: "category-slug",
    files: [
      {
        id: "categories",
        identityHeader: "category_path",
        identityColumns: ["category_slug"],
        // A slug named twice is the CATEGORY planner's verdict (`duplicateSlug`),
        // because the second row may be a lifecycle verb on the first.
        duplicateIdentity: "planner",
        columns: [
          { name: "category_path", klass: "read-only", type: "text" },
          { name: "category_slug", klass: "identity", type: "slug", required: true },
          { name: "parent_slug", klass: "editable", type: "slug" },
          { name: "name_en", klass: "editable", type: "text", maxLength: MAX_LABEL },
          { name: "name_am", klass: "editable", type: "text", maxLength: MAX_LABEL },
          { name: "display_order", klass: "editable", type: "int", formula: "allow" },
          { name: "is_active", klass: "editable", type: "bool" },
          { name: "allow_listings", klass: "editable", type: "bool" },
          { name: "is_catchall", klass: "read-only", type: "bool" },
          { name: "price_enabled", klass: "editable", type: "bool" },
          /**
           * U6-C2b (CT-x) — WHAT THE POSTING DOOR READS, EDITABLE IN THE FILE.
           *
           * `admin_import_categories` already plans these three (M-MAINT proof
           * P3a–P3e), and step 5 of the wizard now obeys them: a period the
           * category locks is shown as a fact, not a control. Leaving them out of
           * the file meant an operator could set them one row at a time in the
           * console and never in bulk — the cell is the same authority, so it is
           * the same door (INC-188: nothing stored is dropped by a round trip).
           */
          { name: "capabilities", klass: "editable", type: "pipe" },
          { name: "default_price_period", klass: "editable", type: "text", maxLength: MAX_LABEL },
          { name: "price_period_locked", klass: "editable", type: "bool" },
          { name: "expiry_days", klass: "editable", type: "int", formula: "allow" },
          { name: "icon", klass: "editable", type: "text", maxLength: MAX_LABEL },
          { name: "visible_from", klass: "editable", type: "date" },
          { name: "visible_until", klass: "editable", type: "date" },
          { name: "excluded_country_codes", klass: "editable", type: "pipe" },
          { name: "secondary_parents", klass: "editable", type: "pipe" },
          { name: "listing_count", klass: "read-only", type: "int", formula: "allow" },
          { name: "origin_scope", klass: "read-only", type: "text" },
          { name: "action", klass: "action", values: ACTION_CATEGORIES },
        ],
      },
    ],
  },
  /**
   * IMPORT-GATE PART C — UI STRINGS (CSV or XLIFF 1.2, one door).
   *
   * The file names KEYS, never invents them: an unknown key is skipped by
   * `admin_import_translations`, which stays the only authority on meaning —
   * placeholder validation, `edited` status, revision capture, audit, and the
   * no-op law that keeps an approved row approved through a round trip.
   */
  translations: {
    id: "translations",
    permission: "translations:manage",
    stepUp: "commit",
    scope: "language",
    // There is no preview door here: the import IS the write, so it is metered
    // — and so is the take-back, which is a write of its own.
    budgetModes: ["commit", "undo"],
    files: [
      {
        id: "strings",
        identityHeader: "key",
        identityColumns: ["key"],
        duplicateIdentity: "gate",
        // `context` is the export's trailing column; a 3-column file is valid.
        optionalFrom: 3,
        readers: ["csv", "xliff"],
        columns: [
          { name: "key", klass: "identity", type: "key", required: true, maxLength: MAX_KEY },
          {
            name: "source",
            klass: "read-only",
            type: "text",
            maxLength: MAX_VALUE,
            formula: "allow",
          },
          {
            name: "translation",
            klass: "editable",
            type: "text",
            maxLength: MAX_VALUE,
            formula: "allow",
          },
          {
            name: "context",
            klass: "read-only",
            type: "text",
            maxLength: MAX_VALUE,
            formula: "allow",
          },
        ],
      },
    ],
  },
  /**
   * LOCATIONS ERA L1b — GEOGRAPHY (two files, one door).
   *
   * The column ORDER of each file is the export contract of
   * `country_export_row` / `loc_export_row` (migration 20260915170752), copied
   * by name (E7). A row is named by its SLASH KEY of slugs
   * (`ethiopia/oromia/adama`); the key's shape, the level derived from its
   * depth, and every other meaning stay `loc_import_plan`'s verdict — the
   * registry declares classes and formats only.
   */
  locations: {
    id: "locations",
    permission: "locations:import",
    stepUp: "commit",
    scope: "country-code",
    files: [
      {
        id: "countries",
        identityHeader: "country_code",
        identityColumns: ["country_code"],
        duplicateIdentity: "gate",
        columns: [
          { name: "country_code", klass: "identity", type: "text", required: true, maxLength: 2 },
          { name: "name_en", klass: "editable", type: "text", maxLength: MAX_LABEL },
          { name: "is_active", klass: "editable", type: "bool" },
          { name: "unit_system", klass: "editable", type: "enum", values: UNIT_SYSTEMS },
          { name: "currency_code", klass: "editable", type: "text", maxLength: 3 },
          { name: "display_order", klass: "editable", type: "int", formula: "allow" },
          { name: "root_order", klass: "editable", type: "pipe" },
          { name: "action", klass: "action", values: ACTION_COUNTRIES },
        ],
      },
      {
        id: "locations",
        identityHeader: "location_path",
        identityColumns: ["location_key"],
        duplicateIdentity: "gate",
        columns: [
          { name: "location_path", klass: "read-only", type: "text" },
          {
            name: "location_key",
            klass: "identity",
            type: "text",
            required: true,
            maxLength: MAX_LOCATION_KEY,
          },
          { name: "name_en", klass: "editable", type: "text", maxLength: MAX_LABEL },
          { name: "name_am", klass: "editable", type: "text", maxLength: MAX_LABEL },
          { name: "iso_3166_2", klass: "editable", type: "text", maxLength: 8 },
          { name: "aliases", klass: "editable", type: "pipe" },
          { name: "display_order", klass: "editable", type: "int", formula: "allow" },
          { name: "center_lat", klass: "editable", type: "decimal", formula: "allow" },
          { name: "center_lng", klass: "editable", type: "decimal", formula: "allow" },
          { name: "is_active", klass: "editable", type: "bool" },
          { name: "level", klass: "read-only", type: "text" },
          { name: "country_code", klass: "read-only", type: "text" },
          { name: "source", klass: "read-only", type: "text" },
          { name: "listing_count", klass: "read-only", type: "int", formula: "allow" },
          { name: "action", klass: "action", values: ACTION_LOCATIONS },
        ],
      },
    ],
  },
};

export function familyOf(id: string): FamilySpec | null {
  return FAMILIES[id] ?? null;
}

export function fileOf(family: FamilySpec, fileId: string): FileSpec | null {
  return family.files.find((file) => file.id === fileId) ?? null;
}

/** Every registered family must declare a class for every column (PART E). */
export function familiesMissingColumnClasses(): string[] {
  const bad: string[] = [];
  for (const family of Object.values(FAMILIES)) {
    for (const file of family.files) {
      if (file.columns.length === 0) bad.push(`${family.id}/${file.id}`);
      for (const column of file.columns) {
        if (column.klass === undefined) bad.push(`${family.id}/${file.id}:${column.name}`);
      }
      if (file.identityColumns.length === 0) bad.push(`${family.id}/${file.id}:identity`);
    }
  }
  return bad;
}
