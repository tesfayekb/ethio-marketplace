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
 * SERVER-ROUTE PRIMITIVE (INC-096b census, @tanstack/react-start@1.168.26):
 * `createFileRoute(...)({ server: { handlers: { POST } } })` IS the server
 * route primitive — `start-client-core/serverRoute.d.ts` augments the file
 * route options with `server?: RouteServerOptions`; no separate factory
 * (`createServerFileRoute` et al.) exists in the installed version. Verified
 * empirically: POST answers from the handler in BOTH serves (dev AND the
 * NITRO_PRESET=node-server production build behind scripts/serve-e2e-node.ts).
 *
 * ERROR-LOGGING CONTRACT (INC-096b/c): server-route responses do NOT traverse
 * the SSR error catch, so a 500 issued here was previously invisible to the
 * reporter's [ssr-error] grep (run 33293988345: TR-scope expected 403, got 500
 * from a gate-section RPC error, with zero [ssr-error] lines). Every 5xx this
 * route returns — thrown OR deliberately issued — is logged into [ssr-error]
 * first. The 500 body stays structured: {error}.
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

// INC-096b/c — server-route failures bypass the SSR catch; every 5xx this
// endpoint issues (deliberate or thrown) logs into the reporter-grepped
// [ssr-error] channel BEFORE the structured body goes out.
function logRouteError(error: unknown): void {
  const message =
    error instanceof Error
      ? `${error.message} | ${(error.stack ?? "").split("\n")[1]?.trim() ?? "no stack"}`
      : String(error);
  console.error("[ssr-error]", "/api/translate", message);
}

function fail5xx(error: string, status: number): Response {
  logRouteError(error);
  return json({ error }, status);
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

/**
 * U4g-24 / INC-115 — PLACEHOLDER PROTECTION.
 *
 * SENTINEL CENSUS (stated honestly, per law A3): this executor has NO Google
 * Translate credential, so the "does v2 return `⟦0⟧` unchanged?" question could
 * NOT be answered empirically here. An unverified assumption is not a law, so
 * the endpoint takes the DOCUMENTED path instead of the guessed one: Google
 * Cloud Translation v2 documents `format=html` and honours the standard
 * `translate="no"` / `notranslate` markup, so every `{token}` travels as
 *   `<span translate="no">⟦i⟧</span>`
 * — a marked-untranslatable wrapper AROUND an index sentinel. Two independent
 * defences: if the provider honours the wrapper the sentinel is untouched, and
 * if it strips the wrapper the bare `⟦i⟧` is still restored by index.
 *
 * RESTORE IS TOTAL OR NOTHING: each sentinel must appear EXACTLY once in the
 * response. A missing or duplicated sentinel means the provider mangled the
 * structure, so the text is returned AS THE PROVIDER GAVE IT (sentinels and
 * all) — never guessed at — and the writer's placeholder validator then flags
 * the row. Silence is never an option (law F4).
 */
const TOKEN_RE = /\{[^{}]*\}/g;
const SENTINEL_RE = /⟦(\d+)⟧/g;

interface Masked {
  text: string;
  tokens: string[];
}

function maskTokens(source: string, html: boolean): Masked {
  const tokens: string[] = [];
  const text = source.replace(TOKEN_RE, (token) => {
    const index = tokens.push(token) - 1;
    return html ? `<span translate="no">⟦${index}⟧</span>` : `⟦${index}⟧`;
  });
  return { text, tokens };
}

/** Drop provider-preserved wrappers so only the bare sentinels remain. */
function stripWrappers(text: string): string {
  return text.replace(/<\/?span[^>]*>/g, "");
}

function restoreTokens(translated: string, tokens: string[]): string {
  if (tokens.length === 0) return translated;
  const bare = stripWrappers(translated);
  const seen = new Map<number, number>();
  for (const match of bare.matchAll(SENTINEL_RE)) {
    const index = Number(match[1]);
    seen.set(index, (seen.get(index) ?? 0) + 1);
  }
  const intact = tokens.every((_, index) => seen.get(index) === 1) && seen.size === tokens.length;
  // Mangled structure → hand back the provider's own text; the validator flags it.
  if (!intact) return translated;
  return bare.replace(SENTINEL_RE, (whole, digits: string) => tokens[Number(digits)] ?? whole);
}

function fakeTranslate(target: string, source: string): string {
  // FAKE MODE runs the SAME mask → translate → restore path as the provider
  // call, so CI proves the protection itself and not just the writer.
  const { text, tokens } = maskTokens(source, false);
  const restored = restoreTokens(`⟪${target}⟫ ${text}`, tokens);
  // E2EBREAK still drops every placeholder — on the RESTORED text (TR-13).
  return source.includes("E2EBREAK") ? restored.replace(TOKEN_RE, "").replace(/\s+/g, " ").trim() : restored;
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
  // format=html is what makes `translate="no"` meaningful to the provider.
  body.set("format", "html");
  const masked = chunk.map((item) => maskTokens(item.source, true));
  for (const entry of masked) body.append("q", entry.text);

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
    if (typeof value === "string" && value.length > 0) {
      const decoded = decodeEntities(value);
      out.set(item.key, restoreTokens(decoded, masked[index]?.tokens ?? []));
    }
  });
  return out;
}

/**
 * SERVER-RUNTIME ENV ACCESS — one access pattern, both serves.
 *
 * `process.env` is the ONLY read used here, and it is read INSIDE the handler,
 * never at module scope:
 *  * node serve (`E2E_SERVE_BUILT=1`, Nitro node-server / DEC-019): the real
 *    Node `process.env`, populated from the job/shell environment. Verified in
 *    the built bundle: the read survives compilation as `process.env[name]`,
 *    never a build-time inline.
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

async function handlePost(request: Request): Promise<Response> {
  const authorization = request.headers.get("Authorization") ?? "";
  if (!authorization.toLowerCase().startsWith("bearer ")) {
    return json({ error: "missing bearer token" }, 401);
  }

  const url = serverEnv("SUPABASE_URL");
  const publishable = serverEnv("SUPABASE_PUBLISHABLE_KEY");

  if (url === "" || publishable === "") {
    return fail5xx("supabase server env missing", 500);
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
  if (items.length > MAX_ITEMS) return json({ error: `too many items (max ${MAX_ITEMS})` }, 413);
  for (const item of items) {
    if (typeof item?.key !== "string" || typeof item?.source !== "string") {
      return json({ error: "invalid item shape" }, 400);
    }
  }

  // ---- GATE (before any provider call) ---------------------------
  const { data: mayMachine, error: machineError } = await supabase.rpc("has_permission", {
    p_user_id: uid,
    p_resource: "translations",
    p_action: "machine",
  });
  if (machineError) return fail5xx(machineError.message, 500);
  if (mayMachine !== true) return json({ error: "permission denied" }, 403);

  const { data: mayManage, error: manageError } = await supabase.rpc("has_permission", {
    p_user_id: uid,
    p_resource: "translations",
    p_action: "manage",
  });
  if (manageError) return fail5xx(manageError.message, 500);

  if (mayManage !== true) {
    const { data: scope, error: scopeError } = await supabase.rpc("get_my_translator_languages");
    if (scopeError) return fail5xx(scopeError.message, 500);
    const codes = ((scope ?? []) as { lang_code: string }[]).map((row) => row.lang_code);
    if (!codes.includes(target)) {
      return json({ error: "not assigned to this language" }, 403);
    }
  }

  // ---- PROVIDER --------------------------------------------------
  const fake = serverEnv("E2E_FAKE_TRANSLATE") === "1";
  const apiKey = serverEnv("GOOGLE_TRANSLATE_API_KEY");
  if (!fake && apiKey === "") {
    return fail5xx("translation provider is not configured", 503);
  }

  const failed: Failure[] = [];
  const translated = new Map<string, string>();

  if (fake) {
    for (const item of items) translated.set(item.key, fakeTranslate(target, item.source));
  } else {
    try {
      const supported = await loadSupportedTargets(apiKey);
      if (!supported.has(target)) {
        return json({ error: `target language ${target} is not supported by the provider` }, 422);
      }
    } catch (error) {
      return fail5xx((error as Error).message, 502);
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
}

export const Route = createFileRoute("/api/translate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          return await handlePost(request);
        } catch (error) {
          logRouteError(error);
          return json({ error: error instanceof Error ? error.message : "internal error" }, 500);
        }
      },
    },
  },
});
