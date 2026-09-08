/**
 * IE-2 — POST /api/admin/attributes/import
 *
 * THREE DOORS, ONE ROUTE (`mode`): `preview` (writes nothing), `commit`
 * (step-up, batch-tagged capture then mutate) and `undo` (restores a batch).
 *
 * THE CLIENT'S PARSE IS NEVER TRUSTED. The browser uploads the two files as
 * TEXT; every byte is parsed, capped, header-checked and formula-checked HERE,
 * server-side, and the semantic verdict (unknown category, inherited row,
 * blast radius, DEC-045 `parent`) belongs to the gated RPCs (E7, F3).
 *
 * A7 — same Start primitive and same caller-context gate as
 * `src/routes/api/admin/attributes/export.ts`: bearer header → publishable
 * client (never the service role) → `auth.getUser()` → RPC. Every failure
 * answer is preceded by `[ssr-error] <path> <message>` (I4, F4).
 */
import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

const PATH = "/api/admin/attributes/import";

/** 1 MB per file, 5 000 data rows per file — the caps the spec names. */
export const MAX_BYTES = 1_048_576;
export const MAX_ROWS = 5000;

/** Strict headers: exactly IE-1's export, plus the optional `action` column. */
const DEFINITION_COLUMNS = [
  "attribute_key",
  "label_en",
  "label_am",
  "type",
  "options",
  "is_per_variant",
  "direct_link_count",
] as const;

const LINK_COLUMNS = [
  "category_path",
  "category_slug",
  "attribute_key",
  "is_required",
  "is_filterable",
  "card_rank",
  "origin",
] as const;

export interface Refusal {
  file: string;
  row: number;
  key: string;
  reason: string;
  detail?: string;
  /**
   * IE-3c PART B — the values the door judged, taken from the operator's own
   * row (never re-derived), so the rendered sentence can name them.
   */
  values?: Record<string, string>;
}

/**
 * IE-3c PART B — join every refusal to the row it judged (by the row number
 * the operator sees) and hand its cells to the message layer. A refusal whose
 * row is not in the parsed set (a whole-file verdict) keeps what it had.
 */
export function withRowValues(
  refusals: Refusal[],
  rowsByFile: Record<string, Record<string, string>[]>,
): Refusal[] {
  const index = new Map<string, Record<string, string>>();
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


function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

function fail(message: string, status: number, body: unknown): Response {
  console.error(`[ssr-error] ${PATH} ${message}`);
  return json(body, status);
}

/* --------------------------------- CSV ---------------------------------- */

/** RFC 4180 grid reader; strips a BOM. Mirrors the translations precedent. */
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
 * leading apostrophe, so `'=Wide` is legitimate export output and must round
 * trip unchanged; a RAW `=…`, `+…`, `-…`, `@…` cell was hand-authored and is
 * refused. Order matters: inspect the raw cell first, then un-neutralise.
 */
export function isFormulaCell(raw: string): boolean {
  return /^[=+\-@]/.test(raw);
}

export function unneutralize(raw: string): string {
  return /^'[=+\-@]/.test(raw) ? raw.slice(1) : raw;
}

/**
 * IE-3 — COLUMN CLASSES AT THE DOOR. The export labels derived columns
 * " (read-only)"; the importer accepts a header with OR without the suffix,
 * so a round-trip is unchanged in meaning. The read-only cells themselves are
 * never applied — the server reports them under `ignored`.
 */
export function canonicalHeader(name: string): string {
  return name
    .trim()
    .replace(/\s*\(read-only\)$/i, "")
    .trim();
}

export type ImportFamily = "attributes" | "categories";

/**
 * FILE IDENTITY, read from the headers BEFORE any row is parsed: a categories
 * file dropped into the attributes import (or the reverse) is refused by
 * identity, never half-planned.
 */
export function identifyFamily(header: readonly string[]): ImportFamily | null {
  const names = header.map(canonicalHeader);
  if (names.includes("attribute_key")) return "attributes";
  if (names.includes("parent_slug") || names.includes("allow_listings")) return "categories";
  return null;
}

interface ParsedFile {
  rows: Record<string, string>[];
  refusals: Refusal[];
  error: string | null;
}

function parseFile(
  file: "definitions" | "links",
  text: string,
  columns: readonly string[],
): ParsedFile {
  const refusals: Refusal[] = [];
  const grid = parseCsvGrid(text).filter(
    (line) => !(line.length === 1 && (line[0] ?? "").trim() === ""),
  );
  if (grid.length === 0) return { rows: [], refusals, error: "emptyFile" };

  const header = (grid[0] ?? []).map((name) => canonicalHeader(name));
  if (identifyFamily(header) === "categories") return { rows: [], refusals, error: "wrongFile" };
  const optionalTail = header.length === columns.length + 1 && header[columns.length] === "action";
  if (
    (header.length !== columns.length && !optionalTail) ||
    columns.some((name, index) => header[index] !== name)
  ) {
    return { rows: [], refusals, error: "badHeader" };
  }

  const body = grid.slice(1);
  if (body.length > MAX_ROWS) return { rows: [], refusals, error: "tooManyRows" };

  const rows: Record<string, string>[] = [];
  for (let index = 0; index < body.length; index += 1) {
    const line = body[index] ?? [];
    // Row numbers are the operator's: 1 is the header line in their editor.
    const rowNumber = index + 2;
    const formula = line.find((cell) => isFormulaCell(cell));
    const record: Record<string, string> = { row: String(rowNumber) };
    header.forEach((name, column) => {
      record[name] = unneutralize(line[column] ?? "");
    });
    if (formula !== undefined) {
      refusals.push({
        file,
        row: rowNumber,
        key: record["attribute_key"] ?? "",
        reason: "formula",
      });
      continue;
    }
    rows.push(record);
  }
  return { rows, refusals, error: null };
}

async function digestOf(definitions: string, links: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${definitions}\u0000${links}`);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/* ------------------------------- handler -------------------------------- */

interface Body {
  mode?: string;
  definitions?: string;
  links?: string;
  scope?: string | null;
  digest?: string | null;
  batchId?: string | null;
}

export const Route = createFileRoute("/api/admin/attributes/import")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authorization = request.headers.get("Authorization") ?? "";
        if (!authorization.toLowerCase().startsWith("bearer ")) {
          return json({ error: "missing bearer token" }, 401);
        }

        const supabaseUrl = process.env["SUPABASE_URL"] ?? "";
        const publishable = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "";
        if (supabaseUrl === "" || publishable === "") {
          return fail("supabase server env missing", 500, { error: "server error" });
        }

        let body: Body;
        try {
          body = (await request.json()) as Body;
        } catch {
          return fail("malformed body", 400, { error: "malformed body" });
        }

        const supabase = createClient<Database>(supabaseUrl, publishable, {
          global: { headers: { Authorization: authorization } },
          auth: { persistSession: false, autoRefreshToken: false },
        });

        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user?.id) {
          console.error(`[ssr-error] ${PATH} not signed in ${userError?.message ?? ""}`.trim());
          return json({ error: "not signed in" }, 401);
        }

        const mode = body.mode ?? "preview";
        const scopeRaw = body.scope ?? null;
        const scope = scopeRaw === null || scopeRaw.trim() === "" ? null : scopeRaw.trim();

        const relay = (error: { message: string }, what: string): Response => {
          console.error(`[ssr-error] ${PATH} ${what} ${error.message}`);
          if (error.message.includes("permission denied")) {
            return json({ error: "permission denied" }, 403);
          }
          if (error.message.includes("step-up required")) {
            return json({ error: "step-up required", code: "P0009" }, 428);
          }
          if (error.message.includes("import already running")) {
            return json({ error: "import already running" }, 409);
          }
          if (error.message.includes("unknown category scope")) {
            return json({ error: "unknown category scope" }, 404);
          }
          if (error.message.includes("unknown import batch")) {
            return json({ error: "unknown import batch" }, 404);
          }
          return json({ error: "server error" }, 500);
        };

        if (mode === "undo") {
          const batchId = body.batchId ?? "";
          if (batchId === "") return json({ error: "batch id required" }, 400);
          const { data, error } = await supabase.rpc("admin_undo_attribute_import", {
            p_batch: batchId,
          });
          if (error) return relay(error, "undo_failed");
          return json(data, 200);
        }

        if (mode !== "preview" && mode !== "commit") {
          return json({ error: "mode must be preview, commit or undo" }, 400);
        }

        const definitionsText = body.definitions ?? "";
        const linksText = body.links ?? "";
        if (definitionsText === "" && linksText === "") {
          return json({ error: "no file" }, 400);
        }

        const encoder = new TextEncoder();
        if (
          encoder.encode(definitionsText).length > MAX_BYTES ||
          encoder.encode(linksText).length > MAX_BYTES
        ) {
          return fail("file too large", 413, { error: "fileTooLarge" });
        }

        const digest = await digestOf(definitionsText, linksText);
        // COMMIT takes the same bytes the preview verdict was computed from.
        if (mode === "commit" && (body.digest ?? "") !== digest) {
          return fail("digest mismatch", 409, { error: "fileChanged" });
        }

        const refusals: Refusal[] = [];
        let definitions: Record<string, string>[] = [];
        let links: Record<string, string>[] = [];

        if (definitionsText !== "") {
          const parsed = parseFile("definitions", definitionsText, DEFINITION_COLUMNS);
          if (parsed.error !== null) {
            return fail(`definitions ${parsed.error}`, 400, { error: parsed.error });
          }
          definitions = parsed.rows;
          refusals.push(...parsed.refusals);
        }
        if (linksText !== "") {
          const parsed = parseFile("links", linksText, LINK_COLUMNS);
          if (parsed.error !== null) {
            return fail(`links ${parsed.error}`, 400, { error: parsed.error });
          }
          links = parsed.rows;
          refusals.push(...parsed.refusals);
        }

        const args = {
          p_definitions: definitions as unknown as never,
          p_links: links as unknown as never,
          p_scope: scope as unknown as string,
        };

        if (mode === "preview") {
          const { data, error } = await supabase.rpc("admin_preview_attribute_import", args);
          if (error) return relay(error, "preview_failed");
          const plan = (data ?? {}) as Record<string, unknown>;
          const serverRefusals = (plan["refusals"] as Refusal[] | undefined) ?? [];
          const all = [...refusals, ...serverRefusals].sort((a, b) => a.row - b.row);
          const counts = (plan["counts"] as Record<string, number> | undefined) ?? {};
          return json(
            { ...plan, refusals: all, counts: { ...counts, refusals: all.length }, digest },
            200,
          );
        }

        const { data, error } = await supabase.rpc("admin_commit_attribute_import", {
          ...args,
          p_digest: digest,
        });
        if (error) return relay(error, "commit_failed");
        const result = (data ?? {}) as Record<string, unknown>;
        const serverRefusals = (result["refusals"] as Refusal[] | undefined) ?? [];
        return json(
          { ...result, refusals: [...refusals, ...serverRefusals].sort((a, b) => a.row - b.row) },
          200,
        );
      },
    },
  },
});
