import { createFileRoute } from "@tanstack/react-router";

import {
  TRANSLATE_MAX_ITEMS,
  TranslateBody,
  issueWord,
  type TranslateReason,
} from "@/lib/schemas/translate";
import { aiCall, translationLanguages, type TranslationLanguages } from "@/server/ai/gateway";
import { TRANSLATION_CHUNK } from "@/server/ai/tasks";
import { ok, readFailure } from "@/server/answer";
import { defineRoute } from "@/server/route";
import { logRouteError } from "@/server/supabase/user-client";

/**
 * U4c — AI TRANSLATION ENDPOINT, on the one route boundary since Foundations
 * turn 19 (INC-861) and on the one audited AI call (INC-876).
 *
 * TRANSPORT RULING (INC-096): the spec asked for a Supabase Edge Function; the
 * endpoint lives on the app server instead. U4j PATH RULING: the provider's
 * language list is served by `GET /api/translate` (one route file), not
 * `/api/translate/languages`.
 *
 * POST — the order:
 *   defineRoute     the byte ceiling, the caller with translations:machine,
 *                   JSON, strict UTF-8, the body schema (today's words)
 *   the scope door  translation_scope_ok(target) as the caller — it already
 *                   ORs translations:manage; before any provider call or spend
 *   the targets     translationLanguages() unless the stand-in: an unsupported
 *                   target is 422 with nothing spent
 *   the chunks      100 texts per aiCall("translation") — gate, key, audit row,
 *                   meter (characters sent) and the stand-in inside the gateway.
 *                   The FIRST chunk's gate answer (gate: true) is today's
 *                   409/503 before anything is written; any other failure marks
 *                   its chunk's keys `providerUnavailable` and writes nothing
 *                   for them (F4)
 *   the writes      the single writer RPC per item, as the caller — it re-gates
 *                   (permission → step-up → scope), validates placeholders,
 *                   flags, stamps provenance, captures a revision and audits
 *   the flags       read back from the rows the writer just validated (UI only)
 *
 * Every per-item reason is a fixed code (CHANGE 4, INC-447); the writer's own
 * text is logged with its key, never sent. There is no service-role client
 * here: nothing is written past RLS or past the gates.
 *
 * The translator note (`context`) is accepted, validated and carried to this
 * boundary, and there it stops: Cloud Translation v2 has no context field —
 * the field a future v3 adapter reads with no client change.
 */

const PATH = "/api/translate";

/** Ruling R3 (e): 600 items with 500-character notes fit; defineRoute's 413 beyond. */
const MAX_BODY_BYTES = 1_048_576;

/**
 * CHANGE (4) — the writer's refusal by its message (admin_machine_translation,
 * admin_machine_entity_translation and require_step_up_if_needed's RAISEs).
 */
const WRITER_REASONS = new Map<string, TranslateReason>([
  ["permission denied", "permission"],
  ["not assigned to this language", "scope"],
  ["base language rows are sync-owned", "baseLocked"],
  ["unknown translation key", "unknownTarget"],
  ["unknown entity", "unknownTarget"],
  ["unknown entity field", "unknownTarget"],
  ["empty machine value", "emptyValue"],
]);

function writerReason(message: string): TranslateReason {
  if (message.startsWith("step-up required")) return "stepUp";
  return WRITER_REASONS.get(message) ?? "writerFailed";
}

/** A language list that could not be read: today's 503 without a key, 502 otherwise. */
function languagesFailure(reason: Extract<TranslationLanguages, { ok: false }>["reason"]) {
  if (reason === "noKey") {
    logRouteError(PATH, "translation provider is not configured");
    return ok({ error: "internal error" }, { status: 503 });
  }
  return ok({ error: "internal error" }, { status: 502 });
}

export const Route = createFileRoute("/api/translate")({
  server: {
    handlers: {
      POST: defineRoute({
        path: PATH,
        auth: { staff: { resource: "translations", action: "machine" } },
        body: TranslateBody,
        limits: { bodyBytes: MAX_BODY_BYTES },
        badShape: ({ path, code }) => {
          const word = issueWord({ path, code });
          return ok({ error: word.error }, { status: word.status });
        },
        handler: async ({ body, supabase, userId }) => {
          if (supabase === null) throw new Error("staff client missing");
          const { scope, target, items } = body;

          // ---- THE SCOPE (before any provider call or spend) ----------
          const { data: inScope, error: scopeError } = await supabase.rpc("translation_scope_ok", {
            p_lang: target,
          });
          if (scopeError) return readFailure(PATH, "translation scope", scopeError);
          if (inScope !== true) {
            return ok({ error: "not assigned to this language" }, { status: 403 });
          }

          // ---- THE TARGETS (the stand-in translates any code, as today) --
          const languages = await translationLanguages({ path: PATH });
          if (!languages.ok) return languagesFailure(languages.reason);
          if (!languages.fake && !languages.languages.some((entry) => entry.code === target)) {
            return ok(
              { error: `target language ${target} is not supported by the provider` },
              { status: 422 },
            );
          }

          // ---- THE CHUNKS (one audited, metered call each) ------------
          const failed: { key: string; reason: TranslateReason }[] = [];
          const translated = new Map<string, string>();
          for (let index = 0; index < items.length; index += TRANSLATION_CHUNK) {
            const chunk = items.slice(index, index + TRANSLATION_CHUNK);
            const answer = await aiCall(
              "translation",
              { target, texts: chunk.map((item) => item.source) },
              { actorId: userId, path: PATH },
            );
            if (!answer.ok) {
              if (index === 0 && "gate" in answer && answer.gate === true) {
                const reason = answer.reason === "featureOff" ? "staff" : answer.reason;
                return ok(
                  { error: `machine translation is switched off (${reason})` },
                  { status: answer.reason === "unavailable" ? 503 : 409 },
                );
              }
              const status =
                "status" in answer && answer.status !== undefined ? ` ${answer.status}` : "";
              logRouteError(
                PATH,
                `translation chunk ${index / TRANSLATION_CHUNK + 1}: ${answer.reason}${status}`,
              );
              // Per-item honesty: every key in the chunk is reported, none written.
              for (const item of chunk)
                failed.push({ key: item.key, reason: "providerUnavailable" });
              continue;
            }
            chunk.forEach((item, position) => {
              const value = answer.value[position];
              if (typeof value === "string") translated.set(item.key, value);
              else failed.push({ key: item.key, reason: "providerNoText" });
            });
          }

          // ---- THE WRITES (the RPC is the single writer) --------------
          const byKey = new Map(items.map((item) => [item.key, item]));
          let done = 0;
          for (const [key, value] of translated) {
            const entity = scope === "entity" ? (byKey.get(key)?.entity ?? null) : null;
            const { error } =
              scope === "entity" && entity !== null
                ? await supabase.rpc("admin_machine_entity_translation", {
                    p_type: entity.type,
                    p_id: entity.id,
                    p_field: entity.field,
                    p_lang: target,
                    p_value: value,
                  })
                : await supabase.rpc("admin_machine_translation", {
                    p_key: key,
                    p_lang: target,
                    p_value: value,
                  });
            if (error) {
              // The writer's own words stay in the log, beside the key.
              logRouteError(PATH, `writer ${key}: ${error.message}`);
              failed.push({ key, reason: writerReason(error.message) });
              continue;
            }
            done += 1;
          }

          let flagged = 0;
          // Entity names carry no {placeholders}, so the validator has nothing to flag;
          // the flag read-back is a UI-scope concern only.
          if (done > 0 && scope === "ui") {
            // Flag count read back from the rows the writer just validated.
            const { data: rows } = await supabase.rpc("admin_list_translations", {
              p_lang: target,
              p_status: "machine",
              p_flagged: true,
              p_search: "",
              p_limit: TRANSLATE_MAX_ITEMS,
              p_offset: 0,
            });
            const keys = new Set(translated.keys());
            flagged = (rows ?? []).filter((row) => keys.has(row.key)).length;
          }

          return ok({ done, flagged, failed });
        },
      }),
      GET: defineRoute({
        path: PATH,
        auth: { staff: { resource: "translations", action: "manage" } },
        handler: async () => {
          // U4j — the guided "add a language" picker's list; the stand-in's list in fake mode.
          const languages = await translationLanguages({ path: PATH });
          if (!languages.ok) return languagesFailure(languages.reason);
          return ok({ languages: languages.languages });
        },
      }),
    },
  },
});
