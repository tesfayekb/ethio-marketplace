/**
 * LOCATIONS ERA L1b-C — GET /api/admin/locations/export?file=countries|locations&scope=<cc>
 *
 * TWO FILES, one control: the operator downloads `countries.csv` and
 * `locations.csv` separately, so the export needs no archive dependency (G2).
 * The read runs through `admin_export_locations`, which re-checks
 * `locations:view` server-side and owns the country resolution (F3, E7).
 *
 * Foundations turn 11 (INC-860 part 1): on `defineRoute` with
 * `auth: { staff: locations:view }`; the columns are the registry's WITHOUT
 * `action` (CHANGE 6 — the importer treats a trailing `action` as optional, so
 * a round trip still reads); the one download answer (answer.ts), whose name
 * follows the one rule (CHANGE 7).
 */
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { clientError, download, readFailure } from "@/server/answer";
import { exportFilename, exportColumns, exportRefusal, toCsv } from "@/server/imports/csv";
import { exportScope } from "@/server/imports/gate";
import { familyOf, fileOf } from "@/server/imports/registry";
import { defineRoute, type RouteContext } from "@/server/route";

const PATH = "/api/admin/locations/export";
const ExportQuery = z.object({
  file: z.enum(["countries", "locations"]),
  scope: z.string().optional(),
});

async function handler(
  ctx: RouteContext<unknown, unknown, z.infer<typeof ExportQuery>>,
): Promise<Response> {
  const kind = ctx.query.file;
  const scoped = exportScope("locations", ctx.query.scope);
  if (!scoped.ok) return scoped.response;
  const { scope } = scoped;
  const supabase = ctx.supabase!;

  const { data, error } =
    scope === null
      ? await supabase.rpc("admin_export_locations")
      : await supabase.rpc("admin_export_locations", { p_scope: scope });
  if (error) {
    const refused = exportRefusal(error, "unknown country scope");
    if (refused !== null) return clientError(refused, refused === "forbidden" ? 403 : 404);
    return readFailure(PATH, "export_failed", error);
  }

  const family = familyOf("locations");
  const spec = family === null ? null : fileOf(family, kind);
  if (spec === null) throw new Error(`registry missing file ${kind}`);
  const payload = (data ?? {}) as Record<string, Record<string, unknown>[] | undefined>;
  return download(toCsv(exportColumns(spec), payload[kind] ?? []), {
    filename: exportFilename(kind, scope),
    contentType: "text/csv; charset=utf-8",
  });
}

export const Route = createFileRoute("/api/admin/locations/export")({
  server: {
    handlers: {
      GET: defineRoute({
        path: PATH,
        auth: { staff: { resource: "locations", action: "view" } },
        query: ExportQuery,
        badShape: (issue) =>
          issue.path === "file"
            ? clientError("file must be countries or locations", 400)
            : clientError("badScope", 400),
        handler,
      }),
    },
  },
});
