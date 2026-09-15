/**
 * LOCATIONS ERA L1b-C — GET /api/admin/locations/export?file=countries|locations
 *
 * TWO FILES, one control: the operator downloads `countries.csv` and
 * `locations.csv` separately, so the export needs no archive dependency (G2).
 *
 * GATE — the ONE door (`openExportGate`): bearer → caller-context Supabase
 * client (never the service role) → `auth.getUser()` → `scope` format law. The
 * read runs through `admin_export_locations`, which re-checks `locations:view`
 * server-side and owns the country resolution (F3, E7).
 *
 * NO SECOND COLUMN LIST — the header and the cell order are read from the ONE
 * registry (`src/server/imports/registry.ts`), whose column order is itself the
 * export contract of `country_export_row` / `loc_export_row` (20260915170752).
 * The read-only suffix is likewise derived from each column's declared class,
 * so no third literal set can drift from the family it describes.
 *
 * Every failure path logs `[ssr-error] <path> <message>` before answering (I4);
 * nothing falls back silently (F4).
 */
import { createFileRoute } from "@tanstack/react-router";

import { openExportGate } from "@/server/imports/gate";
import { familyOf, fileOf, type ColumnRule } from "@/server/imports/registry";

const PATH = "/api/admin/locations/export";

type FileKind = "countries" | "locations";

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * IE-3 — COLUMN CLASSES. Identity, editable and action columns are written
 * bare; every DERIVED or FOREIGN column carries the " (read-only)" suffix, so
 * the file itself states what the importer will never apply.
 */
function headerCell(rule: ColumnRule): string {
  return rule.klass === "read-only" ? `${rule.name} (read-only)` : rule.name;
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
 * ONE SERIALIZER. `admin_export_locations` returns every cell as the exact text
 * the file carries (booleans "true"/"false", nulls "", pipes, coordinates). The
 * route formats NOTHING: it neutralises and quotes, no more.
 */
function csvCell(raw: unknown): string {
  const value = neutralize(raw === null || raw === undefined ? "" : String(raw));
  return /["\n\r,]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

function toCsv(columns: readonly ColumnRule[], rows: Record<string, unknown>[]): string {
  const lines = [columns.map(headerCell).join(",")];
  for (const row of rows) lines.push(columns.map((rule) => csvCell(row[rule.name])).join(","));
  // BOM: Excel reads UTF-8 (and therefore Ge'ez) correctly only with it.
  return `\ufeff${lines.join("\r\n")}\r\n`;
}

export const Route = createFileRoute("/api/admin/locations/export")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const kind = url.searchParams.get("file");
        if (kind !== "countries" && kind !== "locations") {
          return json({ error: "file must be countries or locations" }, 400);
        }

        const gate = await openExportGate(
          request,
          PATH,
          "locations",
          url.searchParams.get("scope"),
        );
        if (!gate.ok) return gate.response;
        const { supabase, scope } = gate;

        const { data, error } =
          scope === null
            ? await supabase.rpc("admin_export_locations")
            : await supabase.rpc("admin_export_locations", { p_scope: scope });
        if (error) {
          // The RPC is the authority: `locations:view` is refused inside it.
          console.error(`[ssr-error] ${PATH} export_failed ${error.message}`);
          if (error.message.includes("permission denied")) {
            return json({ error: "permission denied" }, 403);
          }
          if (error.message.includes("unknown country scope")) {
            return json({ error: "unknown country scope" }, 404);
          }
          return json({ error: "server error" }, 500);
        }

        const family = familyOf("locations");
        const spec = family === null ? null : fileOf(family, kind satisfies FileKind);
        if (spec === null) {
          console.error(`[ssr-error] ${PATH} registry missing file ${kind}`);
          return json({ error: "server error" }, 500);
        }

        const payload = (data ?? {}) as Record<string, Record<string, unknown>[] | undefined>;
        const rows = payload[kind] ?? [];

        return new Response(toCsv(spec.columns, rows), {
          status: 200,
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="locations-${scope ?? "all"}-${kind}.csv"`,
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});
