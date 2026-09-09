/**
 * IMPORT-GATE PART A — ONE SECURITY GATE FOR EVERY IMPORT.
 *
 * Every import route calls `openImportGate`. Nothing about a file is trusted
 * before it returns: the browser's parse is irrelevant, the bytes are read
 * here, capped here, decoded here, parsed here, header-checked here and every
 * cell is cleaned here. Only then does a TYPED JSONB payload reach the gated
 * planner RPC, which remains the only authority on meaning (E7, F3).
 *
 * Order of judgement — a file never gets past a step it failed:
 *   1 bearer  → caller-context client (never the service role)
 *   2 family  → registry lookup (permission, step-up, identity, columns, caps)
 *   3 ingress → ≤ 1 MB · valid UTF-8 (BOM stripped) · RFC-4180 · exact headers
 *   4 hygiene → NFC · trim · strip control/bidi/zero-width · refuse NUL ·
 *               refuse formula-leading · lengths · duplicate identities
 *   5 payload → typed rows, never raw CSV text
 *   6 limit   → one preview/commit in flight per user, 30 previews / minute
 *   7 audit   → one event per preview/commit/undo; [ssr-error] on every failure
 * A rejected file is never stored anywhere.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import {
  FAMILIES,
  familyOf,
  fileOf,
  MAX_BYTES,
  MAX_OPTIONS,
  MAX_OPTION_LABEL,
  MAX_OPTION_VALUE,
  MAX_ROWS,
  SLUG_RE,
  type ColumnRule,
  type FamilySpec,
  type FileSpec,
} from "./registry";

export interface Refusal {
  file: string;
  row: number;
  key: string;
  reason: string;
  detail?: string;
  values?: Record<string, string>;
}

export type GateRow = Record<string, string>;

export interface GateOk {
  ok: true;
  family: FamilySpec;
  supabase: SupabaseClient<Database>;
  userId: string;
  /** Cleaned, typed rows per file id — hand these straight to the planner. */
  rows: Record<string, GateRow[]>;
  refusals: Refusal[];
  digest: string;
  scope: string | null;
  audit: (
    event: "preview" | "commit" | "undo",
    batch: string | null,
    counts: unknown,
  ) => Promise<void>;
}

export interface GateRefused {
  ok: false;
  response: Response;
}

export type GateResult = GateOk | GateRefused;

/* ------------------------------ plumbing -------------------------------- */

export function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

function refuse(path: string, message: string, status: number, body: unknown): GateRefused {
  console.error(`[ssr-error] ${path} ${message}`);
  return { ok: false, response: json(body, status) };
}

/* --------------------------------- CSV ---------------------------------- */

/** RFC 4180 grid reader; strips a BOM. */
export function parseCsvGrid(text: string): string[][] {
  const grid: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  const input = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    if (quoted) {
      if (char === '"') {
        if (input[index + 1] === '"') {
          cell += '"';
          index += 1;
        } else {
          quoted = false;
        }
      } else {
        cell += char;
      }
      continue;
    }
    if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      grid.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") cell += char;
  }
  if (cell !== "" || row.length > 0) {
    row.push(cell);
    grid.push(row);
  }
  return grid;
}

/**
 * FORMULA LAW, both directions. The export NEUTRALISES a dangerous cell with a
 * leading apostrophe, so `'=Wide` is legitimate export output and round-trips;
 * a RAW `=…`, `+…`, `-…`, `@…` cell was hand-authored and is refused.
 */
export function isFormulaCell(raw: string): boolean {
  return /^[=+\-@]/.test(raw);
}

export function unneutralize(raw: string): string {
  return /^'[=+\-@]/.test(raw) ? raw.slice(1) : raw;
}

/** The export labels derived columns " (read-only)"; both spellings import. */
export function canonicalHeader(name: string): string {
  return name
    .trim()
    .replace(/\s*\(read-only\)$/i, "")
    .trim();
}

/* ------------------------------- hygiene -------------------------------- */

// C0/C1 controls, bidi overrides, zero-width marks and a stray BOM. Built from
// a string so the class is readable and the linter is not fought.
const BIDI_AND_INVISIBLE = new RegExp(
  "[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F-\\u009F\\u202A-\\u202E" +
    "\\u2066-\\u2069\\u200B-\\u200F\\uFEFF]",
  "g",
);

/** NFC · strip control, bidi-override and zero-width characters · trim. */
export function cleanCell(raw: string): string {
  return raw.normalize("NFC").replace(BIDI_AND_INVISIBLE, "").trim();
}

export function hasNul(text: string): boolean {
  return text.includes("\u0000");
}

/**
 * OPTION CELLS ARE THE PLATFORM'S OWN (DEC-045). The export writes either a
 * whole JSON array, or pipe segments that are each a JSON object or a plain
 * `value=label`. The gate only measures SIZE here — meaning (a bad parent, a
 * malformed array, an unknown depends_on) belongs to the planner (E7/F3), so a
 * cell it cannot read is passed through rather than refused by shape.
 */
interface OptionCell {
  value: string;
  label: string;
}

function optionsOf(raw: string): OptionCell[] | null {
  const text = raw.trim();
  if (text === "") return [];
  const read = (piece: unknown): OptionCell | null => {
    if (piece === null || typeof piece !== "object") return null;
    const record = piece as Record<string, unknown>;
    // A `{ depends_on: … }` marker declares lineage, not an option.
    if (record["value"] === undefined) return { value: "", label: "" };
    return {
      value: String(record["value"] ?? ""),
      label: String(record["label"] ?? record["label_en"] ?? ""),
    };
  };
  if (text.startsWith("[")) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return null;
    }
    if (!Array.isArray(parsed)) return null;
    const cells: OptionCell[] = [];
    for (const piece of parsed) {
      const cell = read(piece);
      if (cell === null) return null;
      cells.push(cell);
    }
    return cells;
  }
  const cells: OptionCell[] = [];
  for (const part of text.split("|")) {
    const segment = part.trim();
    if (segment === "") continue;
    if (segment.startsWith("{")) {
      let parsed: unknown;
      try {
        parsed = JSON.parse(segment);
      } catch {
        return null;
      }
      const cell = read(parsed);
      if (cell === null) return null;
      cells.push(cell);
      continue;
    }
    const [head = "", ...tail] = segment.split("=");
    cells.push({ value: head, label: tail.join("=") });
  }
  return cells;
}

/** Per-column type/format/length law. Returns a refusal reason, or null. */
export function checkCell(rule: ColumnRule, value: string): string | null {
  if (value === "") return rule.required === true ? "required" : null;
  if (rule.maxLength !== undefined && value.length > rule.maxLength) return "tooLong";
  switch (rule.type) {
    case "slug":
      return SLUG_RE.test(value) ? null : "badSlug";
    case "bool":
      return /^(true|false|t|f|yes|no|y|n|1|0)$/i.test(value) ? null : "badBoolean";
    case "int":
      return /^-?\d{1,9}$/.test(value) ? null : "badNumber";
    case "date":
      // A date column may be a timestamptz in the export (`…T00:00:00+00:00`).
      return /^\d{4}-\d{2}-\d{2}([T ][0-9:.]+(Z|[+-]\d{2}:?\d{2})?)?$/.test(value)
        ? null
        : "badDate";
    case "enum":
      return (rule.values ?? []).includes(value.toLowerCase()) ? null : "badValue";
    case "options": {
      const cells = optionsOf(value);
      // Unreadable here is not refused here: the planner names it (badOptions).
      if (cells === null) return null;
      if (cells.length > MAX_OPTIONS) return "tooManyOptions";
      for (const cell of cells) {
        if (cell.value.length > MAX_OPTION_VALUE) return "optionValueTooLong";
        if (cell.label.length > MAX_OPTION_LABEL) return "optionLabelTooLong";
      }
      return null;
    }
    default:
      return null;
  }
}

/* ------------------------------- parsing -------------------------------- */

interface ParsedFile {
  rows: GateRow[];
  refusals: Refusal[];
  error: string | null;
  detail?: string;
}

/**
 * Which registered file does this header look like? Three declared columns is
 * the recognition threshold — below it the header is nobody's.
 */
export function bestMatch(header: readonly string[]): string | null {
  const names = new Set(header.map(canonicalHeader));
  let best: { id: string; score: number } | null = null;
  for (const family of Object.values(FAMILIES)) {
    for (const file of family.files) {
      const score = file.columns.filter((column) => names.has(column.name)).length;
      if (score >= 3 && (best === null || score > best.score)) best = { id: file.id, score };
    }
  }
  return best?.id ?? null;
}

export function parseFamilyFile(spec: FileSpec, text: string): ParsedFile {
  const refusals: Refusal[] = [];
  if (hasNul(text)) return { rows: [], refusals, error: "nulByte" };

  const grid = parseCsvGrid(text).filter((line) => line.some((cell) => cell.trim() !== ""));
  if (grid.length === 0) return { rows: [], refusals, error: "emptyFile" };

  const header = (grid[0] ?? []).map((name) => canonicalHeader(name));
  const declared = spec.columns.filter((column) => column.klass !== "action").map((c) => c.name);
  const actionColumn = spec.columns.find((column) => column.klass === "action");

  /**
   * FILE IDENTITY, before any row is parsed. A header that BELONGS to another
   * registered family is `wrongFile` (the operator dropped the categories file
   * into the attributes door); a header that belongs to nothing is `badHeader`.
   */
  if (canonicalHeader(header[0] ?? "") !== spec.identityHeader || bestMatch(header) !== spec.id) {
    if (bestMatch(header) !== null && bestMatch(header) !== spec.id) {
      return { rows: [], refusals, error: "wrongFile", detail: header[0] ?? "" };
    }
    if (canonicalHeader(header[0] ?? "") !== spec.identityHeader) {
      return { rows: [], refusals, error: "badHeader", detail: header[0] ?? "" };
    }
  }

  const seenHeaders = new Set<string>();
  for (const name of header) {
    if (seenHeaders.has(name))
      return { rows: [], refusals, error: "duplicateColumn", detail: name };
    seenHeaders.add(name);
  }
  const known = new Set<string>([...declared, ...(actionColumn ? [actionColumn.name] : [])]);
  const unknown = header.find((name) => !known.has(name));
  if (unknown !== undefined) return { rows: [], refusals, error: "unknownColumn", detail: unknown };
  const missing = declared.find((name, index) => header[index] !== name);
  if (missing !== undefined) return { rows: [], refusals, error: "badHeader", detail: missing };
  const hasAction =
    actionColumn !== undefined &&
    header.length === declared.length + 1 &&
    header[declared.length] === actionColumn.name;
  if (header.length !== declared.length && !hasAction) {
    return { rows: [], refusals, error: "badHeader", detail: String(header.length) };
  }

  const body = grid.slice(1);
  if (body.length > (spec.maxRows ?? MAX_ROWS)) return { rows: [], refusals, error: "tooManyRows" };

  const rules = new Map(spec.columns.map((column) => [column.name, column]));
  const identities = new Set<string>();
  const rows: GateRow[] = [];

  for (let index = 0; index < body.length; index += 1) {
    const line = body[index] ?? [];
    // Row numbers are the operator's: 1 is the header line in their editor.
    const rowNumber = index + 2;
    const record: GateRow = { row: String(rowNumber) };
    let refusal: Refusal | null = null;

    header.forEach((name, column) => {
      const raw = line[column] ?? "";
      if (refusal === null && isFormulaCell(raw)) {
        refusal = { file: spec.id, row: rowNumber, key: "", reason: "formula" };
      }
      record[name] = cleanCell(unneutralize(raw));
    });

    const key = spec.identityColumns.map((name) => record[name] ?? "").join("/");
    if (refusal !== null) {
      refusals.push({ ...(refusal as Refusal), key });
      continue;
    }

    let cellRefusal: Refusal | null = null;
    for (const name of header) {
      const rule = rules.get(name);
      if (rule === undefined) continue;
      const reason = checkCell(rule, record[name] ?? "");
      if (reason !== null) {
        cellRefusal = { file: spec.id, row: rowNumber, key, reason, detail: name };
        break;
      }
    }
    if (cellRefusal !== null) {
      refusals.push(cellRefusal);
      continue;
    }

    if (spec.duplicateIdentity === "gate") {
      if (identities.has(key)) {
        refusals.push({ file: spec.id, row: rowNumber, key, reason: "duplicateIdentity" });
        continue;
      }
      identities.add(key);
    }

    rows.push(record);
  }

  return { rows, refusals, error: null };
}

/**
 * Join every refusal to the row it judged so the message layer can name the
 * values the door actually read (IE-3c part B).
 */
export function withRowValues(
  refusals: Refusal[],
  rowsByFile: Record<string, GateRow[]>,
): Refusal[] {
  const index = new Map<string, GateRow>();
  for (const [file, rows] of Object.entries(rowsByFile)) {
    for (const row of rows) index.set(`${file}:${row["row"] ?? ""}`, row);
  }
  return refusals.map((refusal) => {
    const row =
      index.get(`${refusal.file}:${refusal.row}`) ??
      [...index.values()].find((candidate) => candidate["row"] === String(refusal.row));
    if (row === undefined) return refusal;
    const values: Record<string, string> = {};
    for (const [name, cell] of Object.entries(row)) {
      if (name === "row") continue;
      values[name] = (cell ?? "").trim();
    }
    if (refusal.detail !== undefined) values["detail"] = refusal.detail;
    return { ...refusal, values };
  });
}

/* ----------------------------- rate limiting ---------------------------- */

interface Bucket {
  inFlight: boolean;
  /** Preview timestamps per family: one family's budget is not another's. */
  previews: Record<string, number[]>;
}

const buckets = new Map<string, Bucket>();

function bucketFor(userId: string): Bucket {
  const existing = buckets.get(userId);
  if (existing !== undefined) return existing;
  const created: Bucket = { inFlight: false, previews: {} };
  buckets.set(userId, created);
  return created;
}

export function releaseSlot(userId: string): void {
  bucketFor(userId).inFlight = false;
}

/**
 * One preview/commit in flight per user; PREVIEW_BUDGET previews a minute. The
 * budget is a DoS ceiling, not a workflow opinion: a console session (and the
 * suite that drives it) previews far more than ten files in a minute.
 */
export const PREVIEW_BUDGET = 30;

export function takeSlot(
  userId: string,
  mode: string,
  familyId: string,
): "ok" | "busy" | "tooFast" {
  const bucket = bucketFor(userId);
  if (bucket.inFlight) return "busy";
  if (mode === "preview") {
    const now = Date.now();
    const seen = (bucket.previews[familyId] ?? []).filter((at) => now - at < 60_000);
    if (seen.length >= PREVIEW_BUDGET) {
      bucket.previews[familyId] = seen;
      return "tooFast";
    }
    seen.push(now);
    bucket.previews[familyId] = seen;
  }
  bucket.inFlight = true;
  return "ok";
}

/* --------------------------------- digest -------------------------------- */

export async function digestOf(parts: string[]): Promise<string> {
  const bytes = new TextEncoder().encode(parts.join("\u0000"));
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/* ---------------------------------- gate --------------------------------- */

export interface GateInput {
  request: Request;
  path: string;
  familyId: string;
  /** The already-read JSON body (routes read it once, the gate judges it). */
  body: Record<string, unknown>;
  /** file id → the raw text the operator uploaded. */
  texts: Record<string, string>;
  mode: string;
  scope: string | null;
}

export async function openImportGate(input: GateInput): Promise<GateResult> {
  const { request, path, familyId, texts, mode, scope } = input;

  const family = familyOf(familyId);
  if (family === null)
    return refuse(path, `unknown family ${familyId}`, 400, { error: "unknownFamily" });

  const authorization = request.headers.get("Authorization") ?? "";
  if (!authorization.toLowerCase().startsWith("bearer ")) {
    return { ok: false, response: json({ error: "missing bearer token" }, 401) };
  }

  const supabaseUrl = process.env["SUPABASE_URL"] ?? "";
  const publishable = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "";
  if (supabaseUrl === "" || publishable === "") {
    return refuse(path, "supabase server env missing", 500, { error: "server error" });
  }

  const supabase = createClient<Database>(supabaseUrl, publishable, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user?.id) {
    console.error(`[ssr-error] ${path} not signed in ${userError?.message ?? ""}`.trim());
    return { ok: false, response: json({ error: "not signed in" }, 401) };
  }
  const userId = userData.user.id;

  const audit = async (
    event: "preview" | "commit" | "undo",
    batch: string | null,
    counts: unknown,
  ): Promise<void> => {
    const { error } = await supabase.rpc("import_gate_audit", {
      p_family: family.id,
      p_event: event,
      p_batch: batch as unknown as string,
      p_counts: (counts ?? {}) as never,
    });
    // F4 — an audit that could not be written is never silent.
    if (error) console.error(`[ssr-error] ${path} audit_failed ${error.message}`);
  };

  // `scope` must look like a slug; existence is the RPC's verdict (404).
  if (scope !== null && family.scope === "category-slug" && !SLUG_RE.test(scope)) {
    return refuse(path, `bad scope ${scope}`, 400, { error: "badScope" });
  }

  const rows: Record<string, GateRow[]> = {};
  const refusals: Refusal[] = [];
  const encoder = new TextEncoder();

  for (const [fileId, text] of Object.entries(texts)) {
    if (text === "") continue;
    const spec = fileOf(family, fileId);
    if (spec === null) return refuse(path, `unknown file ${fileId}`, 400, { error: "unknownFile" });
    if (encoder.encode(text).length > (spec.maxBytes ?? MAX_BYTES)) {
      return refuse(path, `${fileId} file too large`, 413, { error: "fileTooLarge" });
    }
    const parsed = parseFamilyFile(spec, text);
    if (parsed.error !== null) {
      return refuse(path, `${fileId} ${parsed.error}`, 400, {
        error: parsed.error,
        ...(parsed.detail === undefined ? {} : { detail: parsed.detail }),
      });
    }
    rows[fileId] = parsed.rows;
    refusals.push(...parsed.refusals);
  }

  const slot = takeSlot(userId, mode, family.id);
  if (slot === "busy") {
    return refuse(path, "import already running", 409, { error: "import already running" });
  }
  if (slot === "tooFast") {
    return refuse(path, "too many previews", 429, { error: "tooManyRequests" });
  }

  return {
    ok: true,
    family,
    supabase,
    userId,
    rows,
    refusals,
    digest: await digestOf(family.files.map((file) => texts[file.id] ?? "")),
    scope,
    audit,
  };
}

/* --------------------------------- export -------------------------------- */

export interface ExportGateOk {
  ok: true;
  supabase: SupabaseClient<Database>;
  userId: string;
  scope: string | null;
}

/**
 * THE SAME DOOR FOR THE OTHER DIRECTION. An export hands the operator the exact
 * file the importer reads back, so it is gated identically: bearer →
 * caller-context client → `auth.getUser()` → `scope` must look like a slug
 * (its existence is the RPC's verdict). The RPC re-checks the permission.
 */
export async function openExportGate(
  request: Request,
  path: string,
  familyId: string,
  scopeParam: string | null,
): Promise<ExportGateOk | GateRefused> {
  const family = familyOf(familyId);
  if (family === null)
    return refuse(path, `unknown family ${familyId}`, 400, { error: "unknownFamily" });

  const authorization = request.headers.get("Authorization") ?? "";
  if (!authorization.toLowerCase().startsWith("bearer ")) {
    return { ok: false, response: json({ error: "missing bearer token" }, 401) };
  }

  const supabaseUrl = process.env["SUPABASE_URL"] ?? "";
  const publishable = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "";
  if (supabaseUrl === "" || publishable === "") {
    return refuse(path, "supabase server env missing", 500, { error: "server error" });
  }

  const supabase = createClient<Database>(supabaseUrl, publishable, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user?.id) {
    console.error(`[ssr-error] ${path} not signed in ${userError?.message ?? ""}`.trim());
    return { ok: false, response: json({ error: "not signed in" }, 401) };
  }

  const scope = scopeParam === null || scopeParam.trim() === "" ? null : scopeParam.trim();
  if (scope !== null && family.scope === "category-slug" && !SLUG_RE.test(scope)) {
    return refuse(path, `bad scope ${scope}`, 400, { error: "badScope" });
  }

  return { ok: true, supabase, userId: userData.user.id, scope };
}
