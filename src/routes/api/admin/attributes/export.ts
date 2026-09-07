/**
 * IE-1 — GET /api/admin/attributes/export?file=definitions|links
 *
 * A7 CENSUS (the installed Start server-route primitive): the shape is
 * `createFileRoute(path)({ server: { handlers: { GET } } })`, exactly as the
 * two existing routes under `src/routes/api/admin/categories/` declare it —
 * there is no exported `GET` function in this version. PRECEDENT for the gate
 * is `src/server/category-images/gate.ts` (bearer header → caller-context
 * publishable client → `auth.getUser()` → `has_permission`), conformed here to
 * `categories:view`; precedent for the CSV/UTF-8 side is the translations
 * transfer bar (`src/features/admin/translations/transfer-bar.tsx`), which
 * builds its CSV in the BROWSER — this export is a route instead because the
 * effective (inherited) link set is a server read, and because a route can
 * name the file and carry the BOM in its own response.
 *
 * The two files are two GETs, deliberately: a zip would be a new dependency
 * (G2). No streaming — the whole library is a few thousand short rows and the
 * gated RPC answers in one trip.
 */
import { createFileRoute } from "@tanstack/react-router";

const PATH = "/api/admin/attributes/export";

type FileKind = "definitions" | "links";

const HEADERS: Record<FileKind, readonly string[]> = {
  definitions: [
    "attribute_key",
    "label_en",
    "label_am",
    "type",
    "options",
    "is_per_variant",
    "direct_link_count",
  ],
  links: [
    "category_path",
    "category_slug",
    "attribute_key",
    "is_required",
    "is_filterable",
    "card_rank",
    "origin",
  ],
};

interface DefinitionRow {
  attribute_key: string;
  label_en: string;
  label_am: string | null;
  type: string;
  options: string;
  direct_link_count: number;
}

interface LinkRow {
  category_path: string;
  category_slug: string;
  attribute_key: string;
  is_required: boolean;
  is_filterable: boolean;
  card_rank: number | null;
  origin: string;
}

/**
 * FORMULA SAFETY. A cell opening with `= + - @` is executed by Excel/Sheets on
 * open, so an attacker-controlled label becomes a formula in the reviewer's
 * spreadsheet. Prefixing a single quote neutralises it; the escaping below is
 * then plain RFC-4180 (double the quotes, wrap when the cell carries a comma,
 * a quote or a newline — the leading quote of a neutralised cell is content,
 * not a delimiter).
 */
export function csvCell(value: unknown): string {
  let text = value === null || value === undefined ? "" : String(value);
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  if (/[",\r\n]/.test(text)) text = `"${text.replace(/"/g, '""')}"`;
  return text;
}

function csvDocument(header: readonly string[], rows: readonly (readonly unknown[])[]): string {
  const lines = [header.join(","), ...rows.map((row) => row.map(csvCell).join(","))];
  // BOM so Excel reads the Ge'ez labels as UTF-8 instead of mojibake.
  return `\ufeff${lines.join("\r\n")}\r\n`;
}

function filename(kind: FileKind): string {
  const day = new Date().toISOString().slice(0, 10);
  return `ethio-attributes-${kind}-${day}.csv`;
}

export const Route = createFileRoute("/api/admin/attributes/export")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { json, fail5xx } = await import("@/server/category-images/gate");

        const url = new URL(request.url);
        const requested = url.searchParams.get("file") ?? "definitions";
        if (requested !== "definitions" && requested !== "links") {
          return json({ error: "invalid file" }, 400);
        }
        const kind: FileKind = requested;

        const authorization = request.headers.get("Authorization") ?? "";
        if (!authorization.toLowerCase().startsWith("bearer ")) {
          console.error(`[ssr-error] ${PATH} missing bearer token`);
          return json({ error: "missing bearer token" }, 401);
        }

        const supabaseUrl = process.env["SUPABASE_URL"] ?? "";
        const publishable = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "";
        if (supabaseUrl === "" || publishable === "") {
          return fail5xx(PATH, "supabase server env missing");
        }

        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, publishable, {
          global: { headers: { Authorization: authorization } },
          auth: { persistSession: false, autoRefreshToken: false },
        });

        const { data: userData, error: userError } = await supabase.auth.getUser();
        const uid = userData?.user?.id;
        if (userError || !uid) {
          console.error(`[ssr-error] ${PATH} not signed in`);
          return json({ error: "not signed in" }, 401);
        }

        const { data: mayView, error: permError } = await supabase.rpc("has_permission", {
          p_user_id: uid,
          p_resource: "categories",
          p_action: "view",
        });
        // F4 — an ERRORED check is an error, never "no permission".
        if (permError) return fail5xx(PATH, `has_permission failed: ${permError.message}`);
        if (mayView !== true) {
          console.error(`[ssr-error] ${PATH} permission denied uid=${uid}`);
          return json({ error: "permission denied" }, 403);
        }

        const { data, error } = await supabase.rpc("admin_export_attributes");
        if (error) return fail5xx(PATH, `admin_export_attributes failed: ${error.message}`);

        const payload = (data ?? {}) as { definitions?: DefinitionRow[]; links?: LinkRow[] };
        const body =
          kind === "definitions"
            ? csvDocument(
                HEADERS.definitions,
                (payload.definitions ?? []).map((row) => [
                  row.attribute_key,
                  row.label_en,
                  row.label_am ?? "",
                  row.type,
                  row.options,
                  // CENSUS: the C3b `public.attributes` model carries no
                  // per-variant flag (no variants exist yet), so the column is
                  // emitted with its only truthful value rather than omitted —
                  // the header is part of this export's contract.
                  "false",
                  row.direct_link_count,
                ]),
              )
            : csvDocument(
                HEADERS.links,
                (payload.links ?? []).map((row) => [
                  row.category_path,
                  row.category_slug,
                  row.attribute_key,
                  row.is_required,
                  row.is_filterable,
                  row.card_rank ?? "",
                  row.origin,
                ]),
              );

        return new Response(body, {
          status: 200,
          headers: {
            "Content-Type": "text/csv;charset=utf-8",
            "Content-Disposition": `attachment; filename="${filename(kind)}"`,
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});
