/**
 * CAT-IE PART B — POST /api/admin/categories/import
 *
 * THREE DOORS, ONE ROUTE (`mode`): `preview` (writes nothing), `commit`
 * (step-up + digest + batch-tagged capture, then mutation THROUGH the
 * lifecycle RPCs) and `undo` (restores a batch through the same doors).
 *
 * The browser's parse is never trusted: every byte is parsed, capped,
 * header-checked and formula-checked HERE; the semantic verdict (unknown
 * parent, cycle, catch-all parent, blast radius, scope) belongs to the gated
 * RPCs (E7, F3). The CSV reader, caps and formula law are IE-2's — reused,
 * never copied (B1/B3).
 */
import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import {
  canonicalHeader,
  identifyFamily,
  MAX_BYTES,
  MAX_ROWS,
  isFormulaCell,
  parseCsvGrid,
  unneutralize,
  type Refusal,
} from "../attributes/import";
import { CATEGORY_COLUMNS } from "./export";

const PATH = "/api/admin/categories/import";

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

function fail(message: string, status: number, body: unknown): Response {
  console.error(`[ssr-error] ${PATH} ${message}`);
  return json(body, status);
}

interface Parsed {
  rows: Record<string, string>[];
  refusals: Refusal[];
  error: string | null;
}

function parseCategories(text: string): Parsed {
  const refusals: Refusal[] = [];
  const grid = parseCsvGrid(text).filter((line) => line.some((cell) => cell.trim() !== ""));
  if (grid.length === 0) return { rows: [], refusals, error: "emptyFile" };

  const header = (grid[0] ?? []).map((name) => canonicalHeader(name));
  if (identifyFamily(header) === "attributes") return { rows: [], refusals, error: "wrongFile" };
  const optionalTail =
    header.length === CATEGORY_COLUMNS.length + 1 && header[CATEGORY_COLUMNS.length] === "action";
  if (
    (header.length !== CATEGORY_COLUMNS.length && !optionalTail) ||
    CATEGORY_COLUMNS.some((name, index) => header[index] !== name)
  ) {
    return { rows: [], refusals, error: "badHeader" };
  }

  const body = grid.slice(1);
  if (body.length > MAX_ROWS) return { rows: [], refusals, error: "tooManyRows" };

  const rows: Record<string, string>[] = [];
  for (let index = 0; index < body.length; index += 1) {
    const line = body[index] ?? [];
    // Row numbers are the operator's: 1 is the header line in their editor.
    const rowNumber = index + 2;
    const formula = line.find((cell) => isFormulaCell(cell));
    const record: Record<string, string> = { row: String(rowNumber) };
    header.forEach((name, column) => {
      record[name] = unneutralize(line[column] ?? "");
    });
    if (formula !== undefined) {
      refusals.push({
        file: "definitions",
        row: rowNumber,
        key: record["category_slug"] ?? "",
        reason: "formula",
      });
      continue;
    }
    rows.push(record);
  }
  return { rows, refusals, error: null };
}

async function digestOf(categories: string): Promise<string> {
  const bytes = new TextEncoder().encode(categories);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

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
        const authorization = request.headers.get("Authorization") ?? "";
        if (!authorization.toLowerCase().startsWith("bearer ")) {
          return json({ error: "missing bearer token" }, 401);
        }

        const supabaseUrl = process.env["SUPABASE_URL"] ?? "";
        const publishable = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "";
        if (supabaseUrl === "" || publishable === "") {
          return fail("supabase server env missing", 500, { error: "server error" });
        }

        let body: Body;
        try {
          body = (await request.json()) as Body;
        } catch {
          return fail("malformed body", 400, { error: "malformed body" });
        }

        const supabase = createClient<Database>(supabaseUrl, publishable, {
          global: { headers: { Authorization: authorization } },
          auth: { persistSession: false, autoRefreshToken: false },
        });

        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user?.id) {
          console.error(`[ssr-error] ${PATH} not signed in ${userError?.message ?? ""}`.trim());
          return json({ error: "not signed in" }, 401);
        }

        const mode = body.mode ?? "preview";
        const scopeRaw = body.scope ?? null;
        const scope = scopeRaw === null || scopeRaw.trim() === "" ? null : scopeRaw.trim();

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

        if (mode === "undo") {
          const batchId = body.batchId ?? "";
          if (batchId === "") return json({ error: "batch id required" }, 400);
          const { data, error } = await supabase.rpc("admin_undo_category_import", {
            p_batch: batchId,
          });
          if (error) return relay(error, "undo_failed");
          return json(data, 200);
        }

        if (mode !== "preview" && mode !== "commit") {
          return json({ error: "mode must be preview, commit or undo" }, 400);
        }

        const categoriesText = body.categories ?? "";
        if (categoriesText === "") return json({ error: "no file" }, 400);

        if (new TextEncoder().encode(categoriesText).length > MAX_BYTES) {
          return fail("file too large", 413, { error: "fileTooLarge" });
        }

        const digest = await digestOf(categoriesText);
        if (mode === "commit" && (body.digest ?? "") !== digest) {
          return fail("digest mismatch", 409, { error: "fileChanged" });
        }

        const parsed = parseCategories(categoriesText);
        if (parsed.error !== null) {
          return fail(`categories ${parsed.error}`, 400, { error: parsed.error });
        }

        const args = {
          p_rows: parsed.rows as unknown as never,
          p_scope: scope as unknown as string,
        };

        if (mode === "preview") {
          const { data, error } = await supabase.rpc("admin_preview_category_import", args);
          if (error) return relay(error, "preview_failed");
          const plan = (data ?? {}) as Record<string, unknown>;
          const serverRefusals = (plan["refusals"] as Refusal[] | undefined) ?? [];
          const all = withRowValues(
            [...parsed.refusals, ...serverRefusals].sort((a, b) => a.row - b.row),
            { categories: parsed.rows, definitions: parsed.rows },
          );

          const counts = (plan["counts"] as Record<string, number> | undefined) ?? {};
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
        return json(
          {
            ...result,
            refusals: withRowValues(
              [...parsed.refusals, ...serverRefusals].sort((a, b) => a.row - b.row),
              { categories: parsed.rows, definitions: parsed.rows },
            ),

          },
          200,
        );
      },
    },
  },
});
