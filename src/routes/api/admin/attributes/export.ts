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
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

const PATH = "/api/admin/attributes/export";

type FileKind = "definitions" | "links";

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

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function fail5xx(message: string, status = 500): Response {
  console.error(`[ssr-error] ${PATH} ${message}`);
  return json({ error: "server error" }, status);
}

/**
 * FORMULA SAFETY. A cell that opens with `=`, `+`, `-` or `@` is executed by
 * Excel/Sheets on open; a single leading quote neutralises it and is stripped
 * back out by every spreadsheet on display. Applied BEFORE RFC-4180 quoting.
 */
function neutralize(value: string): string {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

/** RFC 4180: quote when the cell carries a quote, a comma or any newline. */
function csvCell(raw: unknown): string {
  const value = neutralize(
    raw === null || raw === undefined ? "" : typeof raw === "boolean" ? String(raw) : String(raw),
  );
  return /["\n\r,]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

function toCsv(columns: readonly string[], rows: Record<string, unknown>[]): string {
  const lines = [columns.join(",")];
  for (const row of rows) lines.push(columns.map((column) => csvCell(row[column])).join(","));
  // BOM: Excel reads UTF-8 (and therefore Ge'ez) correctly only with it.
  return `\ufeff${lines.join("\r\n")}\r\n`;
}

function datedFilename(kind: FileKind): string {
  const day = new Date().toISOString().slice(0, 10);
  return `ethio-attributes-${kind}-${day}.csv`;
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

        const authorization = request.headers.get("Authorization") ?? "";
        if (!authorization.toLowerCase().startsWith("bearer ")) {
          return json({ error: "missing bearer token" }, 401);
        }

        const supabaseUrl = process.env["SUPABASE_URL"] ?? "";
        const publishable = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "";
        if (supabaseUrl === "" || publishable === "") {
          return fail5xx("supabase server env missing");
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

        const { data, error } = await supabase.rpc("admin_export_attributes");
        if (error) {
          // The RPC is the authority: `categories:view` is refused inside it.
          console.error(`[ssr-error] ${PATH} export_failed ${error.message}`);
          if (error.message.includes("permission denied")) {
            return json({ error: "permission denied" }, 403);
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
            "Content-Disposition": `attachment; filename="${datedFilename(kind)}"`,
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});
