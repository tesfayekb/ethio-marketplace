/**
 * IE-1 — GET /api/admin/attributes/export?file=definitions|links&scope=<slug>
 *
 * TWO FILES, one control: the operator downloads `definitions.csv` and
 * `links.csv` separately, so the export needs no archive dependency (G2). The
 * read runs through `admin_export_attributes()`, which re-checks
 * `categories:view` server-side (F3) and owns the subtree resolution.
 *
 * Foundations turn 11 (INC-860 part 1): on `defineRoute` with
 * `auth: { staff: categories:view }`; the columns are the registry's, without
 * `action` (imports/csv.ts — byte-equal to the literal lists they replace,
 * CSV-4); the one download answer (answer.ts).
 */
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { clientError, download, readFailure } from "@/server/answer";
import { exportFilename, exportColumns, exportRefusal, toCsv } from "@/server/imports/csv";
import { exportScope } from "@/server/imports/gate";
import { familyOf, fileOf } from "@/server/imports/registry";
import { defineRoute, type RouteContext } from "@/server/route";

const PATH = "/api/admin/attributes/export";
const ExportQuery = z.object({
  file: z.enum(["definitions", "links"]),
  scope: z.string().optional(),
});

async function handler(
  ctx: RouteContext<unknown, unknown, z.infer<typeof ExportQuery>>,
): Promise<Response> {
  const kind = ctx.query.file;
  const scoped = exportScope("attributes", ctx.query.scope);
  if (!scoped.ok) return scoped.response;
  const { scope } = scoped;
  const supabase = ctx.supabase!;

  const { data, error } =
    scope === null
      ? await supabase.rpc("admin_export_attributes")
      : await supabase.rpc("admin_export_attributes", { p_scope_slug: scope });
  if (error) {
    const refused = exportRefusal(error, "unknown category scope");
    if (refused !== null) return clientError(refused, refused === "forbidden" ? 403 : 404);
    return readFailure(PATH, "export_failed", error);
  }

  const family = familyOf("attributes");
  const spec = family === null ? null : fileOf(family, kind);
  if (spec === null) throw new Error(`registry missing file ${kind}`);
  const payload = (data ?? {}) as {
    definitions?: Record<string, unknown>[];
    links?: Record<string, unknown>[];
  };
  const rows = (kind === "definitions" ? payload.definitions : payload.links) ?? [];
  return download(toCsv(exportColumns(spec), rows), {
    filename: exportFilename(kind, scope),
    contentType: "text/csv; charset=utf-8",
  });
}

export const Route = createFileRoute("/api/admin/attributes/export")({
  server: {
    handlers: {
      GET: defineRoute({
        path: PATH,
        auth: { staff: { resource: "categories", action: "view" } },
        query: ExportQuery,
        badShape: (issue) =>
          issue.path === "file"
            ? clientError("file must be definitions or links", 400)
            : clientError("badScope", 400),
        handler,
      }),
    },
  },
});
