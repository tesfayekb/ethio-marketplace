/**
 * LOCATIONS ERA — POST /api/admin/locations/import
 *
 * Two files (countries, locations), three doors (`preview`, `commit`,
 * `undo`), through the import route factory (Foundations turn 12). A null
 * country scope is every country; the gated RPCs judge meaning.
 */
import { createFileRoute } from "@tanstack/react-router";

import { defineImportRoute } from "@/server/imports/route";

export const Route = createFileRoute("/api/admin/locations/import")({
  server: {
    handlers: {
      POST: defineImportRoute("locations", {
        rpcs: {
          preview: "admin_preview_location_import",
          commit: "admin_commit_location_import",
          undo: "admin_undo_location_import",
        },
        args: (rows, scope) => ({
          p_countries: rows["countries"] ?? [],
          p_locations: rows["locations"] ?? [],
          p_scope: scope,
        }),
        refresh: ["nameFolds"],
      }),
    },
  },
});
