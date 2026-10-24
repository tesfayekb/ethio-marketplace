/**
 * IMPORT-GATE PART C — POST /api/admin/translations/import
 *
 * THE UI-STRING DOOR, through the import route factory (Foundations turn 12).
 * CSV and XLIFF 1.2 arrive as raw text; the gate judges the file and only a
 * TYPED item list reaches `admin_import_translations`, which remains the sole
 * authority on meaning (E7, F3). One step: `commit` and `undo` are metered.
 */
import { createFileRoute } from "@tanstack/react-router";

import { defineImportRoute } from "@/server/imports/route";

export const Route = createFileRoute("/api/admin/translations/import")({
  server: {
    handlers: {
      POST: defineImportRoute("translations", {
        rpcs: { commit: "admin_import_translations", undo: "admin_undo_import" },
        args: (rows, scope) => ({
          p_lang: scope ?? "",
          p_items: (rows["strings"] ?? []).map((row) => ({
            key: row["key"] ?? "",
            value: row["translation"] ?? "",
          })),
        }),
        refresh: [],
      }),
    },
  },
});
