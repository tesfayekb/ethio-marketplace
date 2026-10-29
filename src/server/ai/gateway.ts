import { logRouteError } from "@/server/supabase/user-client";
import { standInMode } from "@/server/stand-in";
import { recordAiCall } from "./audit";
import { errorText } from "@/lib/error-text";
import { ownValue } from "@/lib/own-key";
import { aiGate, recordAiSpend, type AiGate } from "./meter";
import { geminiImage, geminiText } from "./providers/gemini";
import { photoroomSegment } from "./providers/photoroom";
import {
  providerLanguages,
  translateBatch,
  type ProviderLanguage,
} from "./providers/google-translate";
import {
  FAKE_LANGUAGES,
  TRANSLATION_CHUNK,
  TRANSLATION_TARGET,
  taskOf,
  translationTexts,
  type AiImage,
  type AiMaterial,
  type OutputOf,
  type TaskId,
} from "./tasks";
import { render } from "./template";

export type AiAnswer<O> =
  | { ok: true; value: O; fake: boolean; latencyMs: number }
  | { ok: false; reason: "reserved"; refusal: unknown }
  | {
      ok: false;
      reason:
        | "featureOff"
        | "budget"
        | "unavailable"
        | "timeout"
        | "providerError"
        | "unusableAnswer";
      status?: number;
      /**
       * Turn 19 (ruling R2 on stop 1) — set only on the answers built from the
       * gate: featureOff, budget, and unavailable when the switch could not be
       * read. A caller that must tell "switched off" from a failed call keys on it.
       */
      gate?: true;
    };

/** Image material: the bytes themselves, or a supplier the gateway calls only when a real call will happen. */
export type AiImages = readonly AiImage[] | (() => Promise<readonly AiImage[]>);

/**
 * Material may be a supplier (turn 17, CHANGE 2): resolved once, after the
 * reservation and after the images, so a caller defers a read it needs only
 * for a real call and material derived from the images reads true.
 */
export type AiMaterialInput = AiMaterial | (() => Promise<AiMaterial>);

/** The key each provider reads, checked by the gateway before any reservation (turn 17, CHANGE 1). */
const PROVIDER_KEY_ENV = {
  "gemini-text": "GEMINI_API_KEY",
  "gemini-image": "GEMINI_API_KEY",
  "photoroom-segment": "PHOTOROOM_API_KEY",
  "google-translate": "GOOGLE_TRANSLATE_API_KEY",
} as const;

/**
 * A translation's material (turn 19): a target code and at most one chunk of
 * texts, every one a string; null for anything else — never a default.
 */
function translationMaterial(
  material: AiMaterial,
): { target: string; texts: readonly string[] } | null {
  const target = ownValue(material, "target");
  const texts: readonly unknown[] = translationTexts(material);
  if (typeof target !== "string" || !TRANSLATION_TARGET.test(target)) return null;
  if (texts.length > TRANSLATION_CHUNK) return null;
  const strings = texts.filter((text): text is string => typeof text === "string");
  return strings.length === texts.length ? { target, texts: strings } : null;
}

/** The exact rendered user text used by the registered task's provider call. */
export function renderTask<T extends TaskId>(taskId: T, material: AiMaterial): string {
  return render(taskOf(taskId), material).user;
}

function hexOf(hash: ArrayBuffer): string {
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/** Key-sorted JSON, so one material hashes the same whatever order its keys were built in. */
function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, item]) => item !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    return `{${entries.map(([key, item]) => `${JSON.stringify(key)}:${canonicalJson(item)}`).join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}

/**
 * The audit hash covers the rendered text, the task's material itself (Foundations turn A1,
 * INC-887: a field-less task such as translation renders no user text, so it hashes what it was
 * asked) and each sent image's byte length and SHA-256.
 */
async function hashMaterial(
  task: { id: string; version: number },
  renderedUser: string,
  material: unknown,
  images: readonly AiImage[],
): Promise<string> {
  const parts = [`${task.id}\n${task.version}\n${renderedUser}\n${canonicalJson(material)}`];
  for (const image of images) {
    const digest = await crypto.subtle.digest("SHA-256", image.bytes as BufferSource);
    parts.push(`${image.bytes.byteLength}:${hexOf(digest)}`);
  }
  return hexOf(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(parts.join("\n"))));
}

const IMAGE_MIME = ["image/jpeg", "image/png", "image/webp"] as const;

/**
 * The images the task accepts: type-allowlisted, size- and count-bounded
 * before the call. With `all` (turn 17, CHANGE 3), one image that would be
 * dropped fails the call BEFORE the provider is asked — a task that must see
 * every image is never asked with fewer; `min` likewise.
 */
function selectImages(
  task: { images?: { max: number; maxBytes: number; min?: number; all?: true } },
  images: readonly AiImage[] | undefined,
  log: (message: string) => void,
): { ok: true; sent: AiImage[] } | { ok: false } {
  const limit = task.images;
  if (limit === undefined) return { ok: true, sent: [] };
  const sent: AiImage[] = [];
  for (const [index, image] of (images ?? []).entries()) {
    const why = !(IMAGE_MIME as readonly string[]).includes(image.mime)
      ? `type ${String(image.mime)}`
      : image.bytes.byteLength > limit.maxBytes
        ? `${image.bytes.byteLength} bytes`
        : sent.length >= limit.max
          ? `beyond the task's ${limit.max}`
          : null;
    if (why !== null) {
      if (limit.all === true) {
        log(`image ${index + 1} dropped: ${why}`);
        return { ok: false };
      }
      continue;
    }
    sent.push(image);
  }
  if (limit.min !== undefined && sent.length < limit.min) {
    log(`images: ${sent.length} sent, ${limit.min} required`);
    return { ok: false };
  }
  return { ok: true, sent };
}

/**
 * One paid-model orchestration, with a content-free audit awaited on every
 * call (turn 16, CHANGE 1): everything after the task lookup — rendering, the
 * model name, the hash, the gate, the key check, the reservation, the stand-in
 * or provider, the parse, the spend — runs inside one try whose every exit
 * writes the audit row; a rejection anywhere is `unavailable` with its row. A
 * refused reservation is the one exit with no row and no spend: no model was
 * asked. Image material is resolved only once a real call will happen, so a
 * stand-in never touches the network.
 *
 * Turn 17's order (CHANGE 1): the gate answers on, then the stand-in flag and
 * the provider's key — a keyless tool answers its declared `noKey` with its
 * audit row and no reservation, so it never spends a seller's try — then the
 * caller's reservation (`reserve({ fake })`), then the images, then the
 * material supplier.
 */
export async function aiCall<T extends TaskId>(
  taskId: T,
  material: AiMaterialInput,
  ctx: {
    actorId: string | null;
    path: string;
    reserve?: (info: { fake: boolean }) => Promise<{ ok: true } | { ok: false; refusal: unknown }>;
  },
  images?: AiImages,
): Promise<AiAnswer<OutputOf<T>>> {
  const task = taskOf(taskId);
  const started = Date.now();
  const log = (message: string) => logRouteError(ctx.path, `ai ${task.id} ${message}`);
  let answer: AiAnswer<OutputOf<T>> = { ok: false, reason: "unavailable" };
  let status: number | null = null;
  let fake = false;
  let billed = false;
  let model = task.model.fallback;
  let rendered: { system: string; user: string } | null = null;
  let sent: readonly AiImage[] = [];
  let inputHash: string | null = null;
  let units = 1;
  let resolvedMaterial: unknown = null;
  try {
    model = (process.env[task.model.env] ?? "").trim() || task.model.fallback;
    // A gate read that throws is a switch that could not be read: off, with
    // the gate's mark (ruling R2), never a call.
    let gate: AiGate;
    try {
      gate = await aiGate(task.feature, log);
    } catch (error) {
      log(`gate unreadable: ${errorText(error)}`);
      gate = { on: false, reason: "unavailable" };
    }
    if (!gate.on) {
      answer = {
        ok: false,
        reason: gate.reason === "staff" ? "featureOff" : gate.reason,
        gate: true,
      };
    } else {
      fake = standInMode(task.fakeFlag);
      const keyEnv = PROVIDER_KEY_ENV[task.provider];
      if (!fake && (process.env[keyEnv] ?? "").trim() === "") {
        answer = { ok: false, reason: task.noKey ?? "unavailable" };
        log(`no ${keyEnv}: the tool answers ${task.noKey ?? "unavailable"}, spending nothing`);
      } else {
        // The reservation runs after the gate and the key, before the stand-in
        // or the provider: a refused reservation asked no model — no spend, no
        // audit row.
        if (ctx.reserve !== undefined) {
          const held = await ctx.reserve({ fake });
          if (!held.ok) return { ok: false, reason: "reserved", refusal: held.refusal };
        }
        let imagesFailed = false;
        if (!fake) {
          const picked = selectImages(
            task,
            typeof images === "function" ? await images() : images,
            log,
          );
          if (!picked.ok) {
            imagesFailed = true;
            answer = { ok: false, reason: "unavailable" };
          } else {
            sent = picked.sent;
          }
        }
        if (!imagesFailed) {
          // Resolved after the images, so material derived from them (the photo
          // count, the cover's width) reads true; in fake mode the render only
          // feeds the hash and the stand-in.
          const resolved = typeof material === "function" ? await material() : material;
          resolvedMaterial = resolved;
          rendered = render(task, resolved);
          inputHash = await hashMaterial(task, rendered.user, resolved, sent);
          // Turn 19, CHANGE (2) — a task's own units, a pure function of its
          // material (GWC-9); a task without it is metered as 1.
          units = task.units !== undefined ? task.units(resolved) : 1;
          let raw: unknown;
          const translation =
            task.provider === "google-translate" ? translationMaterial(resolved) : null;
          if (task.provider === "google-translate" && translation === null) {
            log("material refused: a target code and at most one chunk of texts");
            answer = { ok: false, reason: "unavailable" };
          } else if (fake) {
            raw = task.fake(resolved);
            billed = true;
          } else if (task.provider === "photoroom-segment") {
            const image = sent[0];
            if (image === undefined) {
              answer = { ok: false, reason: "unavailable" };
            } else {
              const provider = await photoroomSegment({
                image,
                timeoutMs: task.timeoutMs,
                label: `photoroom ${task.id}`,
              });
              if (provider.kind === "image") {
                status = provider.status;
                billed = true;
                raw = { bytes: provider.bytes, mime: provider.mime };
              } else if (provider.kind === "unusable") {
                // Turn 17, CHANGE (4) — an unusable answer is metered: the
                // provider charged for it.
                status = provider.status;
                billed = true;
                answer = { ok: false, reason: "unusableAnswer" };
              } else if (provider.kind === "status") {
                status = provider.status;
                answer = { ok: false, reason: "providerError", status };
              } else {
                answer = {
                  ok: false,
                  reason: provider.kind === "timeout" ? "timeout" : "unavailable",
                };
              }
            }
          } else if (translation !== null) {
            const provider = await translateBatch({
              target: translation.target,
              texts: translation.texts,
              timeoutMs: task.timeoutMs,
              label: `google-translate ${task.id}`,
            });
            if (provider.kind === "texts") {
              status = provider.status;
              billed = true;
              raw = provider.texts;
            } else if (provider.kind === "unusable") {
              status = provider.status;
              billed = true;
              answer = { ok: false, reason: "unusableAnswer" };
            } else if (provider.kind === "status") {
              status = provider.status;
              answer = { ok: false, reason: "providerError", status };
            } else {
              answer = {
                ok: false,
                reason: provider.kind === "timeout" ? "timeout" : "unavailable",
              };
            }
          } else if (task.provider === "gemini-image") {
            const provider = await geminiImage({
              model,
              prompt: rendered.user,
              timeoutMs: task.timeoutMs,
              label: `gemini ${task.id}`,
            });
            if (provider.kind === "image") {
              status = provider.status;
              billed = true;
              raw = { bytes: provider.bytes, mime: provider.mime };
            } else if (provider.kind === "unusable") {
              status = provider.status;
              billed = true;
              answer = { ok: false, reason: "unusableAnswer" };
            } else if (provider.kind === "status") {
              status = provider.status;
              answer = { ok: false, reason: "providerError", status };
            } else {
              answer = {
                ok: false,
                reason: provider.kind === "timeout" ? "timeout" : "unavailable",
              };
            }
          } else {
            const provider = await geminiText({
              model,
              ...rendered,
              images: sent,
              responseSchema: task.responseSchema,
              temperature: task.temperature,
              timeoutMs: task.timeoutMs,
              label: `gemini ${task.id}`,
              lowDetailAfterFirst: task.images?.lowDetailAfterFirst === true,
              log,
            });
            if (provider.kind === "text") {
              status = provider.status;
              billed = true;
              try {
                raw = JSON.parse(provider.text);
              } catch {
                answer = { ok: false, reason: "unusableAnswer" };
              }
            } else if (provider.kind === "unusable") {
              status = provider.status;
              billed = true;
              answer = { ok: false, reason: "unusableAnswer" };
            } else if (provider.kind === "status") {
              status = provider.status;
              answer = { ok: false, reason: "providerError", status };
            } else {
              answer = {
                ok: false,
                reason: provider.kind === "timeout" ? "timeout" : "unavailable",
              };
            }
          }
          if (billed && raw !== undefined) {
            const parsed = task.output.safeParse(raw);
            if (parsed.success) {
              answer =
                task.validate !== undefined && !task.validate(parsed.data, resolved)
                  ? { ok: false, reason: "unusableAnswer" }
                  : {
                      ok: true,
                      value: parsed.data,
                      fake,
                      latencyMs: Math.max(0, Date.now() - started),
                    };
            } else {
              answer = { ok: false, reason: "unusableAnswer" };
            }
          }
        }
      }
    }
  } catch {
    answer = { ok: false, reason: "unavailable" };
  }
  if (billed) await recordAiSpend(task.feature, units, log);
  if (inputHash === null) {
    // A gate-off or keyless answer or a throw before the hash still writes its
    // row (the door wants 64 hex); the hash then covers the rendered text alone.
    try {
      inputHash = await hashMaterial(
        task,
        rendered?.user ?? "<unavailable>",
        resolvedMaterial ?? (typeof material === "function" ? null : material),
        sent,
      );
    } catch {
      inputHash = "0".repeat(64);
    }
  }
  const written = await recordAiCall(
    {
      feature: task.feature,
      task: task.id,
      taskVersion: task.version,
      model,
      actorId: ctx.actorId,
      inputHash,
      outcome: answer.ok ? "ok" : answer.reason,
      providerStatus: status,
      latencyMs: Math.max(0, Date.now() - started),
      fake,
    },
    log,
  );
  // Foundations turn A1 (INC-952, DEC-280) — a verdict about a person is acted on only once its
  // row is written: a marked task whose row failed answers `unavailable`, never the verdict. The
  // spend already recorded stands (the gateway's order: the provider was asked and billed).
  if (!written && task.judgesPerson && answer.ok) {
    log("audit row not written: a verdict about a person answers unavailable");
    return { ok: false, reason: "unavailable" };
  }
  return answer;
}

export type TranslationLanguages =
  | { ok: true; languages: ProviderLanguage[]; fake: boolean }
  | { ok: false; reason: "noKey" | "unavailable" };

/**
 * Turn 19, CHANGE (2) — the provider's supported targets for the language
 * picker and the route's target check: a free metadata call, so no gate, no
 * meter and no audit row (as today). The stand-in answers today's
 * FAKE_LANGUAGES with no provider call; a real list is read once per process
 * (the adapter's cache), with the translation task's deadline.
 */
export async function translationLanguages(ctx: { path: string }): Promise<TranslationLanguages> {
  const task = taskOf("translation");
  if (standInMode(task.fakeFlag)) return { ok: true, languages: FAKE_LANGUAGES, fake: true };
  const answer = await providerLanguages({ timeoutMs: task.timeoutMs });
  if (answer.kind === "languages") return { ok: true, languages: answer.languages, fake: false };
  if (answer.kind === "noKey") return { ok: false, reason: "noKey" };
  const status = "status" in answer ? ` ${answer.status}` : "";
  logRouteError(ctx.path, `ai translation languages ${answer.kind}${status}`);
  return { ok: false, reason: "unavailable" };
}
