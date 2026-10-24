/**
 * ATTR-IE / IMPORT-GATE — POST /api/admin/attributes/import
 *
 * Two files (definitions, links), three doors (`preview`, `commit`, `undo`),
 * through the import route factory (Foundations turn 12): the boundary, the
 * one gate, the family's dial and the one relay. The gated RPCs judge meaning.
 */
import { createFileRoute } from "@tanstack/react-router";

import { defineImportRoute } from "@/server/imports/route";

export const Route = createFileRoute("/api/admin/attributes/import")({
  server: {
    handlers: {
      POST: defineImportRoute("attributes", {
        rpcs: {
          preview: "admin_preview_attribute_import",
          commit: "admin_commit_attribute_import",
          undo: "admin_undo_attribute_import",
        },
        args: (rows, scope) => ({
          p_definitions: rows["definitions"] ?? [],
          p_links: rows["links"] ?? [],
          p_scope: scope,
        }),
        refresh: ["catalogFind", "nameFolds"],
      }),
    },
  },
});
