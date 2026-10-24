/**
 * CAT-IE PART A — GET /api/admin/categories/export?scope=<slug>
 *
 * ONE file: `categories.csv`, the roster in export shape. `?scope=<slug>`
 * narrows it to that category and every descendant; the subtree is resolved
 * SERVER-side by `admin_export_categories(text)`, which re-checks
 * `categories:view` (E7/F3) — the client never sends a category set.
 *
 * Foundations turn 11 (INC-860 part 1): on `defineRoute` with
 * `auth: { staff: categories:view }` — the permission the RPC itself checks;
 * the scope's format via `exportScope`; the file via the one writer
 * (imports/csv.ts, the registry's columns without `action`) and the one
 * download answer (answer.ts).
 */
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { clientError, download, readFailure } from "@/server/answer";
import { exportFilename, exportColumns, exportRefusal, toCsv } from "@/server/imports/csv";
import { exportScope } from "@/server/imports/gate";
import { familyOf, fileOf } from "@/server/imports/registry";
import { defineRoute, type RouteContext } from "@/server/route";

const PATH = "/api/admin/categories/export";
const ExportQuery = z.object({ scope: z.string().optional() });

async function handler(
  ctx: RouteContext<unknown, unknown, z.infer<typeof ExportQuery>>,
): Promise<Response> {
  const scoped = exportScope("categories", ctx.query.scope);
  if (!scoped.ok) return scoped.response;
  const { scope } = scoped;
  const supabase = ctx.supabase!;

  const { data, error } = await supabase.rpc("admin_export_categories", {
    p_scope: scope as unknown as string,
  });
  if (error) {
    const refused = exportRefusal(error, "unknown category scope");
    if (refused !== null) return clientError(refused, refused === "forbidden" ? 403 : 404);
    return readFailure(PATH, "export_failed", error);
  }

  const family = familyOf("categories");
  const spec = family === null ? null : fileOf(family, "categories");
  if (spec === null) throw new Error("registry missing file categories");
  const payload = (data ?? {}) as { categories?: Record<string, unknown>[] };
  return download(toCsv(exportColumns(spec), payload.categories ?? []), {
    filename: exportFilename("categories", scope),
    contentType: "text/csv; charset=utf-8",
  });
}

export const Route = createFileRoute("/api/admin/categories/export")({
  server: {
    handlers: {
      GET: defineRoute({
        path: PATH,
        auth: { staff: { resource: "categories", action: "view" } },
        query: ExportQuery,
        badShape: () => clientError("badScope", 400),
        handler,
      }),
    },
  },
});
