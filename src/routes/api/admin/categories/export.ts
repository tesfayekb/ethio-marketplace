/**
 * CAT-IE PART A — GET /api/admin/categories/export?scope=<slug>
 *
 * ONE file: `categories.csv`, the roster in export shape. `?scope=<slug>`
 * narrows it to that category and every descendant; the subtree is resolved
 * SERVER-side by `admin_export_categories(text)`, which re-checks
 * `categories:view` (E7/F3) — the client never sends a category set.
 *
 * A7 — the installed Start primitive, same gate as the attributes export:
 * bearer header → caller-context publishable client (never the service role)
 * → `auth.getUser()` → the gated RPC. Every failure logs
 * `[ssr-error] <path> <message>` before answering (I4, F4).
 */
import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

const PATH = "/api/admin/categories/export";

export const CATEGORY_COLUMNS = [
  "category_path",
  "category_slug",
  "parent_slug",
  "name_en",
  "name_am",
  "display_order",
  "is_active",
  "allow_listings",
  "is_catchall",
  "price_enabled",
  "expiry_days",
  "icon",
  "visible_from",
  "visible_until",
  "excluded_country_codes",
  "secondary_parents",
  "listing_count",
  "origin_scope",
] as const;

/** IE-3 — derived/foreign columns are labelled read-only in the header. */
export const READ_ONLY_COLUMNS = new Set<string>([
  "category_path",
  "name_am",
  "is_catchall",
  "listing_count",
  "origin_scope",
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

function fail5xx(message: string, status = 500): Response {
  console.error(`[ssr-error] ${PATH} ${message}`);
  return json({ error: "server error" }, status);
}

/** A cell opening with `=`, `+`, `-` or `@` is neutralised before quoting. */
function neutralize(value: string): string {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

/**
 * IE-3b — ONE SERIALIZER. `admin_export_categories` returns every cell as the
 * exact text the file carries; the route only neutralises and quotes.
 */
function csvCell(raw: unknown): string {
  const value = neutralize(raw === null || raw === undefined ? "" : String(raw));
  return /["\n\r,]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

function toCsv(rows: Record<string, unknown>[]): string {
  const lines = [CATEGORY_COLUMNS.map(headerCell).join(",")];
  for (const row of rows) {
    lines.push(CATEGORY_COLUMNS.map((column) => csvCell(row[column])).join(","));
  }
  // BOM: Excel reads UTF-8 (and therefore Ge'ez) correctly only with it.
  return `\ufeff${lines.join("\r\n")}\r\n`;
}

function datedFilename(scope: string | null): string {
  const day = new Date().toISOString().slice(0, 10);
  const middle = scope === null ? "categories" : `${scope}-categories`;
  return `ethio-${middle}-${day}.csv`;
}

export const Route = createFileRoute("/api/admin/categories/export")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const authorization = request.headers.get("Authorization") ?? "";
        if (!authorization.toLowerCase().startsWith("bearer ")) {
          return json({ error: "missing bearer token" }, 401);
        }

        const supabaseUrl = process.env["SUPABASE_URL"] ?? "";
        const publishable = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "";
        if (supabaseUrl === "" || publishable === "") return fail5xx("supabase server env missing");

        const supabase = createClient<Database>(supabaseUrl, publishable, {
          global: { headers: { Authorization: authorization } },
          auth: { persistSession: false, autoRefreshToken: false },
        });

        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user?.id) {
          console.error(`[ssr-error] ${PATH} not signed in ${userError?.message ?? ""}`.trim());
          return json({ error: "not signed in" }, 401);
        }

        const scopeParam = url.searchParams.get("scope");
        const scope = scopeParam === null || scopeParam.trim() === "" ? null : scopeParam.trim();

        const { data, error } = await supabase.rpc("admin_export_categories", {
          p_scope: scope as unknown as string,
        });
        if (error) {
          console.error(`[ssr-error] ${PATH} export_failed ${error.message}`);
          if (error.message.includes("permission denied")) {
            return json({ error: "permission denied" }, 403);
          }
          if (error.message.includes("unknown category scope")) {
            return json({ error: "unknown category scope" }, 404);
          }
          return json({ error: "server error" }, 500);
        }

        const payload = (data ?? {}) as { categories?: Record<string, unknown>[] };
        return new Response(toCsv(payload.categories ?? []), {
          status: 200,
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="${datedFilename(scope)}"`,
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});
