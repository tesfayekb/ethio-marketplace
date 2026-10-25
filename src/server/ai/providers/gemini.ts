import { z } from "zod";
import { upstream, UpstreamTimeout } from "@/server/upstream";
import { UNTRUSTED_RULE } from "@/lib/untrusted-text";
import type { AiImage } from "../tasks";

export type GeminiTextAnswer =
  | { kind: "text"; status: number; text: string }
  | { kind: "unusable"; status: number }
  | { kind: "status"; status: number }
  | { kind: "timeout" }
  | { kind: "network" }
  | { kind: "noKey" };

const envelope = z.object({
  candidates: z
    .array(
      z.object({
        content: z.object({ parts: z.array(z.object({ text: z.string().optional() })) }).optional(),
      }),
    )
    .optional(),
});

/** One base64 pass per image, in chunks — never per-byte string growth. */
function base64Of(bytes: Uint8Array): string {
  let binary = "";
  for (let at = 0; at < bytes.length; at += 32_768) {
    binary += String.fromCharCode(...bytes.subarray(at, at + 32_768));
  }
  return btoa(binary);
}

/** D165 — the detail every smaller copy is shown at. */
const LOW_DETAIL = { level: "MEDIA_RESOLUTION_LOW" } as const;

/** A 400 that names the per-image detail: the model does not take it (D165). */
function refusesDetail(status: number, raw: string): boolean {
  return status === 400 && /media_?resolution/i.test(raw);
}

/** DEC-248: relocated own-key Gemini integration, not the Lovable AI Gateway SDK. */
export async function geminiText(input: {
  model: string;
  system: string;
  user: string;
  images?: readonly AiImage[];
  responseSchema?: Record<string, unknown>;
  temperature?: number;
  timeoutMs: number;
  label: string;
  /**
   * Turn 17, CHANGE (3) — D165 as an adapter capability: every image after
   * the first carries the low detail, and a model that refuses the setting is
   * asked ONCE more without it (its own deadline), the log line as today's.
   */
  lowDetailAfterFirst?: boolean;
  log?: (message: string) => void;
}): Promise<GeminiTextAnswer> {
  const key = process.env["GEMINI_API_KEY"] ?? "";
  if (key.trim() === "") return { kind: "noKey" };
  if (!input.system.endsWith(UNTRUSTED_RULE)) return { kind: "network" };
  const call = (lowDetail: boolean) =>
    upstream(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(input.model)}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: input.system }] },
          contents: [
            {
              role: "user",
              parts: [
                // Turn 17, CHANGE (3) — an empty user text sends the images alone.
                ...(input.user === "" ? [] : [{ text: input.user }]),
                ...(input.images ?? []).map((image, index) => ({
                  inlineData: { mimeType: image.mime, data: base64Of(image.bytes) },
                  ...(lowDetail && index > 0 ? { mediaResolution: LOW_DETAIL } : {}),
                })),
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            ...(input.temperature === undefined ? {} : { temperature: input.temperature }),
            ...(input.responseSchema === undefined ? {} : { responseSchema: input.responseSchema }),
          },
        }),
      },
      { timeoutMs: input.timeoutMs, label: input.label },
    );
  try {
    let response = await call(input.lowDetailAfterFirst === true);
    if (!response.ok && input.lowDetailAfterFirst === true) {
      let raw = "";
      try {
        raw = await response.text();
      } catch {
        raw = "";
      }
      if (refusesDetail(response.status, raw)) {
        input.log?.(
          "the model refused the low detail for smaller copies; every image sent at the default detail",
        );
        response = await call(false);
      }
    }
    if (!response.ok) return { kind: "status", status: response.status };
    // Turn 16, CHANGE (2) — ONE deadline across the headers AND the body read:
    // the fetch signal stays armed while the body streams, so a deadline passed
    // here is a timeout; any other thrown read is an answered-but-unusable
    // provider (billed — the provider answered).
    let parsed;
    try {
      parsed = envelope.safeParse(await response.json());
    } catch (error) {
      const name =
        typeof error === "object" && error !== null ? (error as { name?: unknown }).name : null;
      if (name === "TimeoutError" || name === "AbortError") return { kind: "timeout" };
      return { kind: "unusable", status: response.status };
    }
    return {
      kind: "text",
      status: response.status,
      text: parsed.success ? (parsed.data.candidates?.[0]?.content?.parts?.[0]?.text ?? "") : "",
    };
  } catch (error) {
    return error instanceof UpstreamTimeout ? { kind: "timeout" } : { kind: "network" };
  }
}
