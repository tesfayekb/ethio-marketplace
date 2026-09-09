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

export type ColumnClass = "identity" | "editable" | "read-only" | "action";

export interface ColumnRule {
  name: string;
  klass: ColumnClass;
  /** `slug` also enforces SLUG_RE; empty is allowed unless `required`. */
  type?: "text" | "slug" | "bool" | "int" | "date" | "pipe" | "options" | "enum";
  required?: boolean;
  maxLength?: number;
  /** Allowed values for `enum`/`action` columns (lower-cased comparison). */
  values?: readonly string[];
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
}

export interface FamilySpec {
  id: string;
  /** Permission the gated RPC re-checks; the gate never authorises alone (F3). */
  permission: string;
  /** Commit and undo demand a fresh step-up; preview does not. */
  stepUp: "commit" | "never";
  /** `scope` is a category slug when the family supports subtree scoping. */
  scope: "category-slug" | "language" | "none";
  files: readonly FileSpec[];
}

const ACTION_ATTRIBUTE_DEFS = ["", "upsert", "delete"] as const;
const ACTION_ATTRIBUTE_LINKS = ["", "upsert", "unlink"] as const;
const ACTION_CATEGORIES = ["", "upsert", "create-root", "retire", "reactivate", "delete"] as const;

const ATTRIBUTE_TYPES = [
  "text",
  "number",
  "boolean",
  "single_select",
  "multi_select",
  "date",
] as const;

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
          { name: "is_per_variant", klass: "read-only", type: "bool" },
          { name: "direct_link_count", klass: "read-only", type: "int" },
          { name: "action", klass: "action", values: ACTION_ATTRIBUTE_DEFS },
        ],
      },
      {
        id: "links",
        identityHeader: "category_path",
        identityColumns: ["category_slug", "attribute_key"],
        // IE-6: nearest-wins is the planner's verdict, not the gate's.
        duplicateIdentity: "planner",
        columns: [
          { name: "category_path", klass: "read-only", type: "text" },
          { name: "category_slug", klass: "identity", type: "slug", required: true },
          { name: "attribute_key", klass: "identity", type: "slug", required: true },
          { name: "is_required", klass: "editable", type: "bool" },
          { name: "is_filterable", klass: "editable", type: "bool" },
          { name: "card_rank", klass: "editable", type: "int" },
          { name: "origin", klass: "read-only", type: "text" },
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
          { name: "display_order", klass: "editable", type: "int" },
          { name: "is_active", klass: "editable", type: "bool" },
          { name: "allow_listings", klass: "editable", type: "bool" },
          { name: "is_catchall", klass: "read-only", type: "bool" },
          { name: "price_enabled", klass: "editable", type: "bool" },
          { name: "expiry_days", klass: "editable", type: "int" },
          { name: "icon", klass: "editable", type: "text", maxLength: MAX_LABEL },
          { name: "visible_from", klass: "editable", type: "date" },
          { name: "visible_until", klass: "editable", type: "date" },
          { name: "excluded_country_codes", klass: "editable", type: "pipe" },
          { name: "secondary_parents", klass: "editable", type: "pipe" },
          { name: "listing_count", klass: "read-only", type: "int" },
          { name: "origin_scope", klass: "read-only", type: "text" },
          { name: "action", klass: "action", values: ACTION_CATEGORIES },
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
