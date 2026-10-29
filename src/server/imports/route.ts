import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { DIALS, type Dial } from "@/lib/dials";
import { errorText } from "@/lib/error-text";
import { ownValue } from "@/lib/own-key";
import { DOOR_KEY, splitRefusal } from "@/lib/refusal-tail";
import { importBody, type ImportBody } from "@/lib/schemas/imports";
import { clientError, ok, serverError, stepUpRequired, upstreamUnavailable } from "@/server/answer";
import {
  refreshCatalogFindAfterCommit,
  refreshNameFoldsAfterCommit,
} from "@/server/catalog-find.server";
import { spend } from "@/server/dials";
import { defineRoute, type RouteContext } from "@/server/route";

import {
  IMPORT_BODY_BYTES,
  openImportGate,
  withRowValues,
  type GateRow,
  type Refusal,
} from "./gate";
import { familyOf } from "./registry";

/**
 * Foundations turn 12 (DEC-237, INC-860) — THE IMPORT ROUTE FACTORY. Every
 * staff import route is `defineImportRoute(familyId, config)` and nothing
 * else: the boundary (`defineRoute`) answers the ceiling, the caller, the
 * family's permission, the strict UTF-8 decode and the body's shape before
 * the handler runs; the gate (gate.ts) judges the file; the family's registry
 * dial meters its `budgetModes`; ONE relay turns a door's RAISE into a
 * declared code (`IMPORT_REFUSALS`) — anything else is `serverError`, never
 * the database's text (OWASP ASVS V7.4).
 */

type DoorError = { message: string; details?: string | null; hint?: string | null };

/**
 * THE DOOR TABLE (CHANGE 4). `exact`: the whole message; `key`: the message is
 * `<match>: <tail>` and answers the key as `error`, the tail as `detail`;
 * `stepUp`: the message is `step-up required` or begins `step-up required:`.
 * A fixed sentence answers ITSELF (a server literal) unless `error` renames it.
 */
export type ImportRefusal = {
  match: string;
  kind: "exact" | "key" | "stepUp";
  status: 400 | 403 | 404 | 409 | 428;
  error?: string;
  detail?: string;
};

export const IMPORT_REFUSALS: readonly ImportRefusal[] = [
  { match: "permission denied", kind: "exact", status: 403, error: "forbidden" },
  { match: "step-up required", kind: "stepUp", status: 428 },
  { match: "import already running", kind: "exact", status: 409 },
  { match: "unknown category scope", kind: "exact", status: 404 },
  { match: "unknown country scope", kind: "exact", status: 404 },
  { match: "unknown import batch", kind: "exact", status: 404 },
  { match: "batchAlreadyUndone", kind: "exact", status: 409 },
  { match: "planHasRefusals", kind: "exact", status: 409 },
  { match: "undoBlocked", kind: "exact", status: 409, detail: "hasRows" },
  { match: "unknownParent", kind: "key", status: 409 },
  { match: "batch id required", kind: "exact", status: 400 },
  { match: "not assigned to this language", kind: "exact", status: 403 },
  { match: "p_items must be a json array", kind: "exact", status: 400 },
  { match: "too many rows (max 5000)", kind: "exact", status: 400, error: "tooManyRows" },
  { match: "base language rows are sync-owned", kind: "exact", status: 403 },
];

/** The factory's own words and the gate's file-law words — with the table, every word answered. */
export const IMPORT_WORDS = [
  "malformed body",
  "mode must be preview, commit or undo",
  "mode must be commit or undo",
  "no file",
  "batch id required",
  "rateLimited",
  "fileChanged",
  "badHeader",
  "wrongFile",
  "duplicateColumn",
  "unknownColumn",
  "tooManyRows",
  "emptyFile",
  "nulByte",
  "fileTooLarge",
  "unknownFamily",
  "badScope",
  "unknownFile",
  "invalidEncoding",
] as const;

const IMPORT_DIALS: Readonly<Record<string, Dial>> = {
  categories: DIALS.importCategories,
  attributes: DIALS.importAttributes,
  locations: DIALS.importLocations,
  translations: DIALS.importTranslations,
};

/**
 * ONE RELAY. A declared message answers its code; a nested door's own
 * translation key (`admin.<family>.error.<name>[:tail]`, DOOR_KEY — e.g. the
 * attribute commit's `parentAfterChild`) answers that key and its tail at 409;
 * anything else is a 500 with an incident and no text.
 */
export function relay(path: string, what: string, error: DoorError): Response {
  const message = String(error.message ?? "").trim();
  for (const entry of IMPORT_REFUSALS) {
    if (entry.kind === "stepUp") {
      if (message === entry.match || message.startsWith(`${entry.match}:`)) return stepUpRequired();
      continue;
    }
    if (entry.kind === "key") {
      if (!message.startsWith(`${entry.match}:`)) continue;
      const tail = message.slice(entry.match.length + 1).trim();
      return clientError(
        entry.error ?? entry.match,
        409,
        tail === "" ? undefined : { detail: tail },
      );
    }
    if (message !== entry.match) continue;
    const status = entry.status === 428 ? 409 : entry.status;
    return clientError(
      entry.error ?? entry.match,
      status,
      entry.detail === undefined ? undefined : { detail: entry.detail },
    );
  }
  const { key, tail } = splitRefusal(message);
  if (DOOR_KEY.test(key)) {
    const detail = (tail ?? "").trim();
    return clientError(key, 409, detail === "" ? undefined : { detail });
  }
  return serverError(path, new Error(`${what} ${errorText(error)}`));
}

export type ImportRouteConfig = {
  rpcs: { preview?: string; commit: string; undo: string };
  /** The commit/preview RPC's arguments from the gate's typed rows and the scope. */
  args: (rows: Record<string, GateRow[]>, scope: string | null) => Record<string, unknown>;
  refresh: Array<"catalogFind" | "nameFolds">;
  /** Refusal file id → the file whose rows it reads (categories' `definitions`). */
  withRowValuesMap?: Record<string, string>;
};

type Rpc = (
  fn: string,
  args: Record<string, unknown>,
) => Promise<{ data: unknown; error: DoorError | null }>;

export function defineImportRoute(
  familyId: string,
  config: ImportRouteConfig,
): ReturnType<typeof defineRoute> {
  const family = familyOf(familyId);
  const dial = ownValue(IMPORT_DIALS, familyId);
  if (family === null || dial === undefined) throw new Error(`unknown import family ${familyId}`);
  const meter: Dial = dial;
  const path = `/api/admin/${familyId}/import`;
  const [resource = "", action = ""] = family.permission.split(":");
  const hasPreview = config.rpcs.preview !== undefined;
  const modes: readonly [string, ...string[]] = hasPreview
    ? ["preview", "commit", "undo"]
    : ["commit", "undo"];
  const modeSentence = hasPreview
    ? "mode must be preview, commit or undo"
    : "mode must be commit or undo";
  const scopeKey = family.scope === "language" ? "lang" : "scope";
  const fileKeys = family.files.map((file) => file.id);
  const budgetModes = family.budgetModes ?? ["preview"];

  const refresh = async () => {
    if (config.refresh.includes("catalogFind")) await refreshCatalogFindAfterCommit(path);
    if (config.refresh.includes("nameFolds")) await refreshNameFoldsAfterCommit(path);
  };

  const byFile = (rows: Record<string, GateRow[]>): Record<string, GateRow[]> => {
    const out: Record<string, GateRow[]> = {};
    for (const id of fileKeys) out[id] = ownValue(rows, id) ?? [];
    for (const [alias, source] of Object.entries(config.withRowValuesMap ?? {}))
      out[alias] = ownValue(rows, source) ?? [];
    return out;
  };

  async function handler(ctx: RouteContext<ImportBody>): Promise<Response> {
    const body = ctx.body;
    const supabase = ctx.supabase as SupabaseClient<Database>;
    const userId = ctx.userId as string;
    const call: Rpc = (fn, args) => (supabase as unknown as { rpc: Rpc }).rpc(fn, args);
    const mode = body.mode;

    const rawScope = scopeKey === "lang" ? (body.lang ?? "") : (body.scope ?? null);
    const scope = rawScope === null || rawScope.trim() === "" ? null : rawScope.trim();
    const texts: Record<string, string> = {};
    for (const id of fileKeys) {
      const value = ownValue(body, id);
      texts[id] = typeof value === "string" ? value : "";
    }

    const batchId = body.batchId ?? "";
    if (mode === "undo") {
      if (batchId === "") return clientError("batch id required", 400);
    } else if (fileKeys.every((id) => texts[id] === "")) {
      return clientError("no file", 400);
    }

    const gate = await openImportGate({
      caller: { supabase, userId },
      path,
      familyId,
      texts: mode === "undo" ? {} : texts,
      scope,
    });
    if (!gate.ok)
      return clientError(
        gate.error,
        gate.status,
        gate.detail === undefined ? undefined : { detail: gate.detail },
      );

    // INC-951 3c (D1 M6, ruling 3 of stop 6) — every family's commit spends the shared
    // import_commit dial and every undo the shared import_undo dial, after the family's own
    // budgetModes meter and before any door is called (G54a).
    const shared =
      mode === "commit" ? DIALS.importCommit : mode === "undo" ? DIALS.importUndo : null;
    const meters: Dial[] = [
      ...(budgetModes.includes(mode) ? [meter] : []),
      ...(shared === null ? [] : [shared]),
    ];
    for (const dialToSpend of meters) {
      let spent;
      try {
        spent = await spend(dialToSpend, userId);
      } catch {
        return upstreamUnavailable(path, `rate limit ${dialToSpend.action}`, 0);
      }
      if (!spent.allowed)
        return clientError(
          "rateLimited",
          429,
          spent.resetsAt !== null ? { resetsAt: spent.resetsAt } : undefined,
        );
    }

    const { rows, refusals, digest, audit } = gate;

    if (mode === "undo") {
      const { data, error } = await call(config.rpcs.undo, { p_batch: batchId });
      if (error) return relay(path, "undo_failed", error);
      await refresh();
      await audit("undo", batchId, data ?? {});
      return ok(data);
    }

    if (!hasPreview) return oneStep(rows, refusals, scope, audit, call);

    if (mode === "commit" && (body.digest ?? "") !== digest) {
      return clientError("fileChanged", 409);
    }
    const args = config.args(rows, scope);
    const named = (server: Refusal[]) =>
      withRowValues(
        [...refusals, ...server].sort((a, b) => a.row - b.row),
        byFile(rows),
      );

    if (mode === "preview") {
      const { data, error } = await call(config.rpcs.preview as string, args);
      if (error) return relay(path, "preview_failed", error);
      const plan = (data ?? {}) as Record<string, unknown>;
      const all = named((plan["refusals"] as Refusal[] | undefined) ?? []);
      const counts = (plan["counts"] as Record<string, number> | undefined) ?? {};
      await audit("preview", null, { ...counts, refusals: all.length });
      return ok({ ...plan, refusals: all, counts: { ...counts, refusals: all.length }, digest });
    }

    const { data, error } = await call(config.rpcs.commit, { ...args, p_digest: digest });
    if (error) return relay(path, "commit_failed", error);
    await refresh();
    const result = (data ?? {}) as Record<string, unknown>;
    const all = named((result["refusals"] as Refusal[] | undefined) ?? []);
    await audit("commit", (result["batch_id"] as string | undefined) ?? null, {
      ...((result["counts"] as Record<string, number> | undefined) ?? {}),
      refusals: all.length,
    });
    return ok({ ...result, refusals: all });
  }

  /**
   * A ONE-STEP family (UI strings): every row refused is an answer, not a
   * write (F4/F5) — `emptyFile` when the file held nothing, a 200 with
   * `skipped` when the door refused every row; otherwise the commit RPC.
   */
  async function oneStep(
    rows: Record<string, GateRow[]>,
    refusals: Refusal[],
    scope: string | null,
    audit: (event: "commit", batch: string | null, counts: unknown) => Promise<void>,
    call: Rpc,
  ): Promise<Response> {
    const named = withRowValues(refusals, byFile(rows));
    const nothing = Object.values(byFile(rows)).every((list) => list.length === 0);
    if (nothing) {
      if (named.length === 0) return clientError("emptyFile", 400);
      await audit("commit", null, { skipped: named.length, refusals: named.length });
      return ok({
        imported: 0,
        flagged: 0,
        unchanged: 0,
        skipped: named.length,
        batch_id: null,
        refusals: named,
      });
    }
    const { data, error } = await call(config.rpcs.commit, config.args(rows, scope));
    if (error) return relay(path, "import_failed", error);
    await refresh();
    const result = (data ?? {}) as Record<string, unknown>;
    const skipped = Number(result["skipped"] ?? 0) + named.length;
    await audit("commit", (result["batch_id"] as string | undefined) ?? null, {
      ...result,
      skipped,
    });
    return ok({ ...result, skipped, refusals: named });
  }

  return defineRoute<ImportBody>({
    path,
    auth: { staff: { resource, action } },
    limits: { bodyBytes: IMPORT_BODY_BYTES, tooLarge: "fileTooLarge" },
    body: importBody({ modes, defaultMode: modes[0], scopeKey, fileKeys }),
    badShape: (issue) =>
      issue.part === "body" && issue.path === "mode"
        ? clientError(modeSentence, 400)
        : clientError("malformed body", 400),
    handler,
  });
}
