/**
 * IE-1 — GET /api/admin/attributes/export?file=definitions|links
 *
 * TWO FILES, one control: the operator downloads `definitions.csv` and
 * `links.csv` separately, so the export needs no archive dependency (G2).
 *
 * A7 — the installed Start server-route primitive is
 * `createFileRoute(path)({ server: { handlers: { GET } } })`; the precedent in
 * this repo is `src/routes/api/admin/categories/generate-image.ts`.
 *
 * GATE — censused from `src/server/category-images/gate.ts` (itself conformed
 * to `src/routes/api/translate.ts`): bearer header → caller-context Supabase
 * client (SUPABASE_URL + SUPABASE_PUBLISHABLE_KEY, never the service role) →
 * `auth.getUser()` → the read runs through `admin_export_attributes()`, which
 * re-checks `categories:view` server-side (F3). Every failure path logs
 * `[ssr-error] <path> <message>` before answering (I4) — nothing falls back
 * silently (F4).
 */
import { createFileRoute } from "@tanstack/react-router";

import { openExportGate } from "@/server/imports/gate";

const PATH = "/api/admin/attributes/export";

type FileKind = "definitions" | "links";

const DEFINITION_COLUMNS = [
  "attribute_key",
  "label_en",
  "label_am",
  "type",
  "options",
  // DEC-045b — the dependency is EDITABLE now: the header drops the read-only
  // suffix, because the importer applies exactly what this cell says.
  "depends_on",
  // DEC-050 L2b — the nine v2 cells; the payload already emits them and this
  // route formats nothing (IE-3b).
  "unit",
  "min",
  "max",
  "decimals",
  "format",
  "preset",
  "max_length",
  "help_text_en",
  "help_text_am",
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

/**
 * IE-3 — COLUMN CLASSES. Identity and editable columns are written bare;
 * every DERIVED or FOREIGN column carries the " (read-only)" suffix in the
 * header, so the file itself states what the importer will never apply.
 */
export const READ_ONLY_COLUMNS = new Set<string>([
  "category_path",
  "origin",
  // IE-4b — `label_am` has LEFT this list: a filled cell is written through the
  // translation door as a pending-review row; an empty cell is silence.
  "is_per_variant",
  "direct_link_count",
]);

export function headerCell(name: string): string {
  return READ_ONLY_COLUMNS.has(name) ? `${name} (read-only)` : name;
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * FORMULA SAFETY. A cell that opens with `=`, `+`, `-` or `@` is executed by
 * Excel/Sheets on open; a single leading quote neutralises it and is stripped
 * back out by every spreadsheet on display. Applied BEFORE RFC-4180 quoting.
 */
function neutralize(value: string): string {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

/**
 * RFC 4180: quote when the cell carries a quote, a comma or any newline.
 *
 * IE-3b — ONE SERIALIZER. `admin_export_attributes` returns every cell as the
 * exact text the file carries (booleans "true"/"false", nulls "", pipes,
 * dates ISO). The route formats NOTHING: it neutralises and quotes, no more.
 */
function csvCell(raw: unknown): string {
  const value = neutralize(raw === null || raw === undefined ? "" : String(raw));
  return /["\n\r,]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

function toCsv(columns: readonly string[], rows: Record<string, unknown>[]): string {
  const lines = [columns.map(headerCell).join(",")];
  for (const row of rows) lines.push(columns.map((column) => csvCell(row[column])).join(","));
  // BOM: Excel reads UTF-8 (and therefore Ge'ez) correctly only with it.
  return `\ufeff${lines.join("\r\n")}\r\n`;
}

/**
 * C3-INH PART B — the SCOPED filename carries the slug, so two downloads taken
 * minutes apart are never confused for one another on disk.
 */
function datedFilename(kind: FileKind, scope: string | null): string {
  const day = new Date().toISOString().slice(0, 10);
  const middle = scope === null ? kind : `${scope}-${kind}`;
  return `ethio-attributes-${middle}-${day}.csv`;
}

export const Route = createFileRoute("/api/admin/attributes/export")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const kind = url.searchParams.get("file");
        if (kind !== "definitions" && kind !== "links") {
          return json({ error: "file must be definitions or links" }, 400);
        }

        /**
         * IMPORT-GATE — the ONE door: bearer → caller-context client →
         * `auth.getUser()` → `scope` format law. The RPC re-checks
         * `categories:view` (F3) and owns the subtree resolution.
         */
        const gate = await openExportGate(
          request,
          PATH,
          "attributes",
          url.searchParams.get("scope"),
        );
        if (!gate.ok) return gate.response;
        const { supabase, scope } = gate;

        const { data, error } =
          scope === null
            ? await supabase.rpc("admin_export_attributes")
            : await supabase.rpc("admin_export_attributes", { p_scope_slug: scope });
        if (error) {
          // The RPC is the authority: `categories:view` is refused inside it.
          console.error(`[ssr-error] ${PATH} export_failed ${error.message}`);
          if (error.message.includes("permission denied")) {
            return json({ error: "permission denied" }, 403);
          }
          if (error.message.includes("unknown category scope")) {
            return json({ error: "unknown category scope" }, 404);
          }
          return json({ error: "server error" }, 500);
        }

        const payload = (data ?? {}) as {
          definitions?: Record<string, unknown>[];
          links?: Record<string, unknown>[];
        };
        const columns = kind === "definitions" ? DEFINITION_COLUMNS : LINK_COLUMNS;
        const rows = (kind === "definitions" ? payload.definitions : payload.links) ?? [];

        return new Response(toCsv(columns, rows), {
          status: 200,
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="${datedFilename(kind, scope)}"`,
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});
