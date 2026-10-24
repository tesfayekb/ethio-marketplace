/**
 * CAT-IE PART B / IMPORT-GATE — POST /api/admin/categories/import
 *
 * THREE DOORS, ONE ROUTE (`mode`): `preview` (writes nothing), `commit`
 * (step-up + digest + batch-tagged capture, then mutation THROUGH the
 * lifecycle RPCs) and `undo` (restores a batch through the same doors). The
 * route is the factory (Foundations turn 12): the boundary, the one gate, the
 * family's dial and the one relay; the gated RPCs remain the authority on
 * meaning — unknown parent, cycle, catch-all parent, blast radius, scope.
 */
import { createFileRoute } from "@tanstack/react-router";

import { defineImportRoute } from "@/server/imports/route";

export const Route = createFileRoute("/api/admin/categories/import")({
  server: {
    handlers: {
      POST: defineImportRoute("categories", {
        rpcs: {
          preview: "admin_preview_category_import",
          commit: "admin_commit_category_import",
          undo: "admin_undo_category_import",
        },
        args: (rows, scope) => ({ p_rows: rows["categories"] ?? [], p_scope: scope }),
        refresh: ["catalogFind", "nameFolds"],
        // Refusals whose file is `definitions` read the categories rows.
        withRowValuesMap: { definitions: "categories" },
      }),
    },
  },
});
