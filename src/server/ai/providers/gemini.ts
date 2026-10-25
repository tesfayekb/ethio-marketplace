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
}): Promise<GeminiTextAnswer> {
  const key = process.env["GEMINI_API_KEY"] ?? "";
  if (key.trim() === "") return { kind: "noKey" };
  if (!input.system.endsWith(UNTRUSTED_RULE)) return { kind: "network" };
  try {
    const response = await upstream(
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
                { text: input.user },
                ...(input.images ?? []).map((image) => ({
                  inlineData: { mimeType: image.mime, data: base64Of(image.bytes) },
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
