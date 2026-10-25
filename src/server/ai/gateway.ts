import { logRouteError } from "@/server/supabase/user-client";
import { recordAiCall } from "./audit";
import { aiFakeMode, aiGate, recordAiSpend } from "./meter";
import { geminiText } from "./providers/gemini";
import { taskOf } from "./tasks";
import { render } from "./template";

export type AiAnswer<O> =
  | { ok: true; value: O; fake: boolean }
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

/** One paid-model orchestration, with a content-free audit awaited on every registered call. */
export async function aiCall(
  taskId: string,
  material: Record<string, string>,
  ctx: { actorId: string | null; path: string },
): Promise<AiAnswer<unknown>> {
  const task = taskOf(taskId);
  if (task === undefined) {
    logRouteError(ctx.path, "ai unknown task unavailable");
    return { ok: false, reason: "unavailable" };
  }
  const started = Date.now();
  const rendered = render(task, material);
  const model = (process.env[task.model.env] ?? "").trim() || task.model.fallback;
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${task.id}\n${task.version}\n${rendered.user}`),
  );
  const inputHash = Array.from(new Uint8Array(hash), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  const log = (message: string) => logRouteError(ctx.path, `ai ${task.id} ${message}`);
  let answer: AiAnswer<unknown> = { ok: false, reason: "unavailable" };
  let status: number | null = null;
  let fake = false;
  let billed = false;
  try {
    const gate = await aiGate(task.feature, log);
    if (!gate.on) {
      answer = { ok: false, reason: gate.reason === "staff" ? "featureOff" : gate.reason };
    } else {
      fake = aiFakeMode(task.fakeFlag);
      let raw: unknown;
      if (fake) {
        raw = task.fake(material);
        billed = true;
      } else {
        const provider = await geminiText({
          model,
          ...rendered,
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
        } else if (provider.kind === "status") {
          status = provider.status;
          answer = { ok: false, reason: "providerError", status };
        } else
          answer = { ok: false, reason: provider.kind === "timeout" ? "timeout" : "unavailable" };
      }
      if (billed) {
        const parsed = task.output.safeParse(raw);
        answer = parsed.success
          ? { ok: true, value: parsed.data, fake }
          : { ok: false, reason: "unusableAnswer" };
      }
    }
  } catch {
    answer = { ok: false, reason: "unavailable" };
  }
  if (billed) await recordAiSpend(task.feature, 1, log);
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
