import { logRouteError } from "@/server/supabase/user-client";
import { standInMode } from "@/server/stand-in";
import { recordAiCall } from "./audit";
import { aiGate, recordAiSpend } from "./meter";
import { geminiText } from "./providers/gemini";
import { taskOf, type AiImage, type AiMaterial, type OutputOf, type TaskId } from "./tasks";
import { render } from "./template";

export type AiAnswer<O> =
  | { ok: true; value: O; fake: boolean }
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
    };

/** Image material: the bytes themselves, or a supplier the gateway calls only when a real call will happen. */
export type AiImages = readonly AiImage[] | (() => Promise<readonly AiImage[]>);

function hexOf(hash: ArrayBuffer): string {
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/** The audit hash covers the rendered text and each sent image's byte length and SHA-256. */
async function hashMaterial(
  task: { id: string; version: number },
  renderedUser: string,
  images: readonly AiImage[],
): Promise<string> {
  const parts = [`${task.id}\n${task.version}\n${renderedUser}`];
  for (const image of images) {
    const digest = await crypto.subtle.digest("SHA-256", image.bytes as BufferSource);
    parts.push(`${image.bytes.byteLength}:${hexOf(digest)}`);
  }
  return hexOf(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(parts.join("\n"))));
}

/** The images the task accepts: type-allowlisted, size- and count-bounded before the call. */
function sentImages(
  task: { images?: { max: number; maxBytes: number } },
  images: readonly AiImage[] | undefined,
): AiImage[] {
  const limit = task.images;
  if (limit === undefined || images === undefined) return [];
  return images
    .filter(
      (image) =>
        image.bytes.byteLength <= limit.maxBytes &&
        (image.mime === "image/jpeg" || image.mime === "image/png" || image.mime === "image/webp"),
    )
    .slice(0, limit.max);
}

/**
 * One paid-model orchestration, with a content-free audit awaited on every
 * call (turn 16, CHANGE 1): everything after the task lookup — rendering, the
 * model name, the hash, the gate, the reservation, the stand-in or provider,
 * the parse, the spend — runs inside one try whose every exit writes the
 * audit row; a rejection anywhere is `unavailable` with its row. A refused
 * reservation is the one exit with no row and no spend: no model was asked.
 * Image material is resolved only once a real call will happen, so a
 * stand-in never touches the network.
 */
export async function aiCall<T extends TaskId>(
  taskId: T,
  material: AiMaterial,
  ctx: {
    actorId: string | null;
    path: string;
    reserve?: () => Promise<{ ok: true } | { ok: false; refusal: unknown }>;
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
  try {
    model = (process.env[task.model.env] ?? "").trim() || task.model.fallback;
    const gate = await aiGate(task.feature, log);
    if (!gate.on) {
      answer = { ok: false, reason: gate.reason === "staff" ? "featureOff" : gate.reason };
    } else {
      // The reservation runs after the gate answers on and before the stand-in
      // or the provider: a switched-off feature spends nothing, and a refused
      // reservation asked no model — no spend, no audit row.
      if (ctx.reserve !== undefined) {
        const held = await ctx.reserve();
        if (!held.ok) return { ok: false, reason: "reserved", refusal: held.refusal };
      }
      fake = standInMode(task.fakeFlag);
      if (!fake) {
        sent = sentImages(task, typeof images === "function" ? await images() : images);
      }
      // Rendered after the images resolve, so material derived from them (the
      // photo count) reads true; in fake mode the render only feeds the hash.
      rendered = render(task, material);
      inputHash = await hashMaterial(task, rendered.user, sent);
      let raw: unknown;
      if (fake) {
        raw = task.fake(material);
        billed = true;
      } else {
        const provider = await geminiText({
          model,
          ...rendered,
          images: sent,
          responseSchema: task.responseSchema,
          temperature: task.temperature,
          timeoutMs: task.timeoutMs,
          label: `gemini ${task.id}`,
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
          answer = { ok: false, reason: provider.kind === "timeout" ? "timeout" : "unavailable" };
        }
      }
      if (billed && raw !== undefined) {
        const parsed = task.output.safeParse(raw);
        if (parsed.success) {
          answer =
            task.validate !== undefined && !task.validate(parsed.data)
              ? { ok: false, reason: "unusableAnswer" }
              : { ok: true, value: parsed.data, fake };
        } else {
          answer = { ok: false, reason: "unusableAnswer" };
        }
      }
    }
  } catch {
    answer = { ok: false, reason: "unavailable" };
  }
  if (billed) await recordAiSpend(task.feature, 1, log);
  if (inputHash === null) {
    // A gate-off answer or a throw before the hash still writes its row (the
    // door wants 64 hex); the hash then covers the rendered text alone.
    try {
      inputHash = await hashMaterial(task, rendered?.user ?? "<unavailable>", sent);
    } catch {
      inputHash = "0".repeat(64);
    }
  }
  await recordAiCall(
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
  return answer;
}
