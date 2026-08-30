import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

/**
 * U4c — AI TRANSLATION ENDPOINT.
 *
 * TRANSPORT RULING (INC-096): the spec asked for a Supabase Edge Function; the
 * executor rejects NEW edge functions at the tool layer (existing ones stay
 * editable), so the endpoint lives on the app server instead. Every other line
 * of the U4c contract is verbatim.
 *
 * LAWS honoured:
 *  * F1 — GOOGLE_TRANSLATE_API_KEY is read from the SERVER runtime env INSIDE
 *    the handler (`process.env[...]`, never a `VITE_` name), so it is never
 *    bundled for the browser and never appears in a response body.
 *  * F3 — the caller's own bearer token builds a caller-context Supabase
 *    client, so `auth.uid()` flows into every RPC. There is NO service-role
 *    client here: this route cannot write past RLS or past the gates.
 *  * SINGLE-WRITER DISCIPLINE — the route never touches `ui_translations`.
 *    `admin_machine_translation` is the only writer: it re-gates
 *    (permission → step-up → scope), placeholder-validates, flags, stamps
 *    provenance, captures a revision and audits.
 *  * F4 — a per-item provider failure is REPORTED and TOUCHES NOTHING for that
 *    key; it is never swallowed and never written as an empty value.
 *
 * FAKE MODE (`E2E_FAKE_TRANSLATE === "1"`): Google is skipped and each item
 * becomes a deterministic `⟪<lang>⟫ <source>`. Gates, chunking, the writer RPC,
 * the validator, provenance and revision capture all still run, so CI proves
 * the whole pipeline with no external call, no spend and no Google key. A
 * source containing the literal `E2EBREAK` yields output with every `{token}`
 * removed, which drives the validator's flag path (TR-13).
 */

const GOOGLE_CHUNK = 100; // Google v2 accepts many `q` params; 100 is our budget.
const MAX_ITEMS = 600; // hard cap per request (413 beyond).

interface Item {
  key: string;
  source: string;
}

interface Failure {
  key: string;
  reason: string;
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

/** Cold-start cache of the provider's supported target codes. */
let supportedTargets: Set<string> | null = null;

async function loadSupportedTargets(apiKey: string): Promise<Set<string>> {
  if (supportedTargets) return supportedTargets;
  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2/languages?key=${encodeURIComponent(apiKey)}`,
  );
  if (!response.ok) throw new Error(`language list unavailable (${response.status})`);
  const payload = (await response.json()) as { data?: { languages?: { language: string }[] } };
  const codes = (payload.data?.languages ?? []).map((entry) => entry.language.toLowerCase());
  if (codes.length === 0) throw new Error("language list empty");
  supportedTargets = new Set(codes);
  return supportedTargets;
}

function fakeTranslate(target: string, source: string): string {
  const body = source.includes("E2EBREAK") ? source.replace(/\{[^}]*\}/g, "").trim() : source;
  return `⟪${target}⟫ ${body}`;
}

/** Google v2 returns HTML-escaped text even in `format=text` responses. */
function decodeEntities(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

async function googleTranslate(
  apiKey: string,
  target: string,
  chunk: Item[],
): Promise<Map<string, string>> {
  const body = new URLSearchParams();
  body.set("target", target);
  body.set("source", "en");
  body.set("format", "text");
  for (const item of chunk) body.append("q", item.source);

  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    },
  );
  if (!response.ok) {
    const detail = await response.text();
    // The key is never echoed: only the provider's status and its own message.
    throw new Error(`provider error ${response.status}: ${detail.slice(0, 200)}`);
  }
  const payload = (await response.json()) as {
    data?: { translations?: { translatedText: string }[] };
  };
  const translations = payload.data?.translations ?? [];
  const out = new Map<string, string>();
  chunk.forEach((item, index) => {
    const value = translations[index]?.translatedText;
    if (typeof value === "string" && value.length > 0) out.set(item.key, decodeEntities(value));
  });
  return out;
}

/**
 * SERVER-RUNTIME ENV ACCESS — one access pattern, both serves.
 *
 * `process.env` is the ONLY read used here, and it is read INSIDE the handler,
 * never at module scope:
 *  * node serve (`E2E_SERVE_BUILT=1`, Nitro node-server / DEC-019): the real
 *    Node `process.env`, populated from the job/shell environment.
 *  * cloudflare serve (workerd + `nodejs_compat`): the platform injects the
 *    Worker bindings into `process.env` per REQUEST — a module-scope read there
 *    returns `undefined`, which is exactly why every read sits in the handler.
 *
 * No `VITE_`-prefixed name is ever read on this path: `VITE_*` is compiled into
 * the CLIENT bundle, so a provider key behind such a name would ship to the
 * browser. `GOOGLE_TRANSLATE_API_KEY` is a Supabase/deploy secret only.
 */
function serverEnv(name: string): string {
  return process.env[name] ?? "";
}

export const Route = createFileRoute("/api/translate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authorization = request.headers.get("Authorization") ?? "";
        if (!authorization.toLowerCase().startsWith("bearer ")) {
          return json({ error: "missing bearer token" }, 401);
        }

        const url = serverEnv("SUPABASE_URL");
        const publishable = serverEnv("SUPABASE_PUBLISHABLE_KEY");

        if (url === "" || publishable === "") {
          return json({ error: "supabase server env missing" }, 500);
        }

        // CALLER-CONTEXT CLIENT: publishable key + the caller's own JWT.
        const supabase = createClient(url, publishable, {
          global: { headers: { Authorization: authorization } },
          auth: { persistSession: false, autoRefreshToken: false },
        });

        const { data: userData, error: userError } = await supabase.auth.getUser();
        const uid = userData?.user?.id;
        if (userError || !uid) return json({ error: "not signed in" }, 401);

        let payload: { target_lang?: string; items?: Item[] };
        try {
          payload = (await request.json()) as typeof payload;
        } catch {
          return json({ error: "invalid json body" }, 400);
        }

        const target = (payload.target_lang ?? "").trim().toLowerCase();
        const items = Array.isArray(payload.items) ? payload.items : [];
        if (!/^[a-z]{2,8}(-[a-z]{2,8})?$/.test(target)) {
          return json({ error: "invalid target_lang" }, 400);
        }
        if (items.length === 0) return json({ error: "no items" }, 400);
        if (items.length > MAX_ITEMS)
          return json({ error: `too many items (max ${MAX_ITEMS})` }, 413);
        for (const item of items) {
          if (typeof item?.key !== "string" || typeof item?.source !== "string") {
            return json({ error: "invalid item shape" }, 400);
          }
        }

        // ---- GATE (before any provider call) ---------------------------
        const { data: mayMachine, error: machineError } = await supabase.rpc("has_permission", {
          _user_id: uid,
          _resource: "translations",
          _action: "machine",
        });
        if (machineError) return json({ error: machineError.message }, 500);
        if (mayMachine !== true) return json({ error: "permission denied" }, 403);

        const { data: mayManage, error: manageError } = await supabase.rpc("has_permission", {
          _user_id: uid,
          _resource: "translations",
          _action: "manage",
        });
        if (manageError) return json({ error: manageError.message }, 500);

        if (mayManage !== true) {
          const { data: scope, error: scopeError } = await supabase.rpc(
            "get_my_translator_languages",
          );
          if (scopeError) return json({ error: scopeError.message }, 500);
          const codes = ((scope ?? []) as { lang_code: string }[]).map((row) => row.lang_code);
          if (!codes.includes(target)) {
            return json({ error: "not assigned to this language" }, 403);
          }
        }

        // ---- PROVIDER --------------------------------------------------
        const fake = serverEnv("E2E_FAKE_TRANSLATE") === "1";
        const apiKey = serverEnv("GOOGLE_TRANSLATE_API_KEY");
        if (!fake && apiKey === "") {
          return json({ error: "translation provider is not configured" }, 503);
        }

        const failed: Failure[] = [];
        const translated = new Map<string, string>();

        if (fake) {
          for (const item of items) translated.set(item.key, fakeTranslate(target, item.source));
        } else {
          try {
            const supported = await loadSupportedTargets(apiKey);
            if (!supported.has(target)) {
              return json(
                { error: `target language ${target} is not supported by the provider` },
                422,
              );
            }
          } catch (error) {
            return json({ error: (error as Error).message }, 502);
          }
          for (let index = 0; index < items.length; index += GOOGLE_CHUNK) {
            const chunk = items.slice(index, index + GOOGLE_CHUNK);
            try {
              const result = await googleTranslate(apiKey, target, chunk);
              for (const item of chunk) {
                const value = result.get(item.key);
                if (value === undefined) {
                  failed.push({ key: item.key, reason: "provider returned no text" });
                } else {
                  translated.set(item.key, value);
                }
              }
            } catch (error) {
              // Per-item honesty: the chunk failed, so every key in it is
              // reported and NOTHING is written for any of them.
              for (const item of chunk) {
                failed.push({ key: item.key, reason: (error as Error).message });
              }
            }
          }
        }

        // ---- WRITES (the RPC is the single writer) ---------------------
        let done = 0;
        for (const [key, value] of translated) {
          const { error } = await supabase.rpc("admin_machine_translation", {
            p_key: key,
            p_lang: target,
            p_value: value,
          });
          if (error) {
            failed.push({ key, reason: error.message });
            continue;
          }
          done += 1;
        }

        let flagged = 0;
        if (done > 0) {
          // Flag count read back from the rows the writer just validated.
          const { data: rows } = await supabase.rpc("admin_list_translations", {
            p_lang: target,
            p_status: "machine",
            p_flagged: true,
            p_search: "",
            p_limit: MAX_ITEMS,
            p_offset: 0,
          });
          const keys = new Set(translated.keys());
          flagged = ((rows ?? []) as { key: string }[]).filter((row) => keys.has(row.key)).length;
        }

        return json({ done, flagged, failed }, 200);
      },
    },
  },
});
