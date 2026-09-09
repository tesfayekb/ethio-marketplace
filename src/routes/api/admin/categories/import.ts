/**
 * CAT-IE PART B / IMPORT-GATE — POST /api/admin/categories/import
 *
 * THREE DOORS, ONE ROUTE (`mode`): `preview` (writes nothing), `commit`
 * (step-up + digest + batch-tagged capture, then mutation THROUGH the
 * lifecycle RPCs) and `undo` (restores a batch through the same doors).
 *
 * The browser's parse is never trusted and this route owns no judgement of its
 * own: the ONE gate (`src/server/imports/gate.ts`) caps, decodes, parses,
 * header-checks, cleans and rate-limits; the gated RPCs remain the authority
 * on meaning — unknown parent, cycle, catch-all parent, blast radius, scope.
 */
import { createFileRoute } from "@tanstack/react-router";

import {
  json,
  openImportGate,
  requireBearer,
  releaseSlot,
  withRowValues,
  type Refusal,
} from "@/server/imports/gate";

const PATH = "/api/admin/categories/import";

interface Body {
  mode?: string;
  categories?: string;
  scope?: string | null;
  digest?: string | null;
  batchId?: string | null;
}

export const Route = createFileRoute("/api/admin/categories/import")({
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

        const mode = body.mode ?? "preview";
        const scopeRaw = body.scope ?? null;
        const scope = scopeRaw === null || scopeRaw.trim() === "" ? null : scopeRaw.trim();
        const categoriesText = body.categories ?? "";

        if (mode !== "undo" && mode !== "preview" && mode !== "commit") {
          return json({ error: "mode must be preview, commit or undo" }, 400);
        }
        if (mode !== "undo" && categoriesText === "") return json({ error: "no file" }, 400);

        const gate = await openImportGate({
          request,
          path: PATH,
          familyId: "categories",
          body: body as unknown as Record<string, unknown>,
          texts: mode === "undo" ? {} : { categories: categoriesText },
          mode,
          scope,
        });
        if (!gate.ok) return gate.response;

        const { supabase, userId, rows, refusals, digest, audit } = gate;
        const categories = rows["categories"] ?? [];

        const relay = (error: { message: string }, what: string): Response => {
          console.error(`[ssr-error] ${PATH} ${what} ${error.message}`);
          if (error.message.includes("permission denied")) {
            return json({ error: "permission denied" }, 403);
          }
          if (error.message.includes("step-up required")) {
            return json({ error: "step-up required", code: "P0009" }, 428);
          }
          if (error.message.includes("import already running")) {
            return json({ error: "import already running" }, 409);
          }
          if (error.message.includes("unknown category scope")) {
            return json({ error: "unknown category scope" }, 404);
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
            const { data, error } = await supabase.rpc("admin_undo_category_import", {
              p_batch: batchId,
            });
            if (error) return relay(error, "undo_failed");
            await audit("undo", batchId, data ?? {});
            return json(data, 200);
          }

          if (mode === "commit" && (body.digest ?? "") !== digest) {
            console.error(`[ssr-error] ${PATH} digest mismatch`);
            return json({ error: "fileChanged" }, 409);
          }

          const args = {
            p_rows: categories as unknown as never,
            p_scope: scope as unknown as string,
          };

          if (mode === "preview") {
            const { data, error } = await supabase.rpc("admin_preview_category_import", args);
            if (error) return relay(error, "preview_failed");
            const plan = (data ?? {}) as Record<string, unknown>;
            const serverRefusals = (plan["refusals"] as Refusal[] | undefined) ?? [];
            const all = withRowValues(
              [...refusals, ...serverRefusals].sort((a, b) => a.row - b.row),
              {
                categories,
                definitions: categories,
              },
            );
            const counts = (plan["counts"] as Record<string, number> | undefined) ?? {};
            await audit("preview", null, { ...counts, refusals: all.length });
            return json(
              { ...plan, refusals: all, counts: { ...counts, refusals: all.length }, digest },
              200,
            );
          }

          const { data, error } = await supabase.rpc("admin_commit_category_import", {
            ...args,
            p_digest: digest,
          });
          if (error) return relay(error, "commit_failed");
          const result = (data ?? {}) as Record<string, unknown>;
          const serverRefusals = (result["refusals"] as Refusal[] | undefined) ?? [];
          const all = withRowValues(
            [...refusals, ...serverRefusals].sort((a, b) => a.row - b.row),
            {
              categories,
              definitions: categories,
            },
          );
          await audit("commit", (result["batch_id"] as string | undefined) ?? null, {
            ...((result["counts"] as Record<string, number> | undefined) ?? {}),
            refusals: all.length,
          });
          return json({ ...result, refusals: all }, 200);
        } finally {
          releaseSlot(userId);
        }
      },
    },
  },
});
