/**
 * IMPORT-GATE PART C — POST /api/admin/translations/import
 *
 * THE UI-STRING DOOR, ON THE ONE GATE. CSV and XLIFF 1.2 arrive here as raw
 * text; the browser parses nothing. The gate (`src/server/imports/gate.ts`)
 * caps the bytes, decodes UTF-8, refuses NUL, reads the dialect, checks the
 * header against the registered family, cleans every cell (NFC, controls, bidi
 * overrides, zero-width), enforces key/length law, refuses duplicate keys and
 * meters the caller. Only then does a TYPED item list reach
 * `admin_import_translations`, which remains the sole authority on meaning:
 * permission, step-up, unknown keys skipped, placeholders validated, status
 * `edited`, revision captured with the run's batch id, audited (E7, F3).
 *
 * `undo` takes the same door, so a taken-back run is metered and audited like
 * the run it undoes.
 */
import { createFileRoute } from "@tanstack/react-router";

import {
  json,
  openImportGate,
  releaseSlot,
  requireBearer,
  withRowValues,
} from "@/server/imports/gate";

const PATH = "/api/admin/translations/import";

interface Body {
  mode?: string;
  lang?: string;
  strings?: string;
  batchId?: string | null;
}

export const Route = createFileRoute("/api/admin/translations/import")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const anonymous = requireBearer(request);
        if (anonymous !== null) return anonymous;

        const raw = await request.arrayBuffer();
        if (raw.byteLength > 4 * 1_048_576) {
          console.error(`[ssr-error] ${PATH} body too large`);
          return json({ error: "fileTooLarge" }, 413);
        }
        let text: string;
        try {
          text = new TextDecoder("utf-8", { fatal: true }).decode(raw);
        } catch {
          console.error(`[ssr-error] ${PATH} invalid utf-8`);
          return json({ error: "invalidEncoding" }, 400);
        }
        let body: Body;
        try {
          body = JSON.parse(text) as Body;
        } catch {
          console.error(`[ssr-error] ${PATH} malformed body`);
          return json({ error: "malformed body" }, 400);
        }

        const mode = body.mode ?? "commit";
        if (mode !== "commit" && mode !== "undo") {
          return json({ error: "mode must be commit or undo" }, 400);
        }
        const lang = (body.lang ?? "").trim();
        const fileText = body.strings ?? "";
        if (mode === "commit" && fileText === "") return json({ error: "no file" }, 400);

        const gate = await openImportGate({
          request,
          path: PATH,
          familyId: "translations",
          body: body as unknown as Record<string, unknown>,
          texts: mode === "undo" ? {} : { strings: fileText },
          mode,
          scope: lang === "" ? null : lang,
        });
        if (!gate.ok) return gate.response;

        const { supabase, userId, rows, refusals, audit } = gate;
        const strings = rows["strings"] ?? [];

        const relay = (error: { message: string }, what: string): Response => {
          console.error(`[ssr-error] ${PATH} ${what} ${error.message}`);
          if (error.message.includes("permission denied")) {
            return json({ error: "permission denied" }, 403);
          }
          if (error.message.includes("step-up required")) {
            return json({ error: "step-up required", code: "P0009" }, 428);
          }
          if (error.message.includes("unknown import batch")) {
            return json({ error: "unknown import batch" }, 404);
          }
          return json({ error: "server error" }, 500);
        };

        try {
          if (mode === "undo") {
            const batchId = body.batchId ?? "";
            if (batchId === "") return json({ error: "batch id required" }, 400);
            const { data, error } = await supabase.rpc("admin_undo_import", { p_batch: batchId });
            if (error) return relay(error, "undo_failed");
            await audit("undo", batchId, data ?? {});
            return json(data, 200);
          }

          const named = withRowValues(refusals, { strings });

          /**
           * EVERY ROW REFUSED IS AN ANSWER, NOT A WRITE (F4/F5). The file had
           * rows, the door judged them all, and nothing reaches the writer —
           * so the operator is told what was refused instead of a phantom
           * success or an invented empty run.
           */
          if (strings.length === 0) {
            if (named.length === 0) return json({ error: "emptyFile" }, 400);
            await audit("commit", null, { skipped: named.length, refusals: named.length });
            return json(
              {
                imported: 0,
                flagged: 0,
                unchanged: 0,
                skipped: named.length,
                batch_id: null,
                refusals: named,
              },
              200,
            );
          }

          const items = strings.map((row) => ({
            key: row["key"] ?? "",
            value: row["translation"] ?? "",
          }));

          const { data, error } = await supabase.rpc("admin_import_translations", {
            p_lang: lang,
            p_items: items as unknown as never,
          });
          if (error) return relay(error, "import_failed");
          const result = (data ?? {}) as Record<string, unknown>;
          // The server's counts, plus the rows this door refused before it.
          const skipped = Number(result["skipped"] ?? 0) + named.length;
          await audit("commit", (result["batch_id"] as string | undefined) ?? null, {
            ...result,
            skipped,
          });
          return json({ ...result, skipped, refusals: named }, 200);
        } finally {
          releaseSlot(userId);
        }
      },
    },
  },
});
