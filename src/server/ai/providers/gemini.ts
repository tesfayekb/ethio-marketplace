import { z } from "zod";
import { isDeadline, upstream } from "@/server/upstream";
import { UNTRUSTED_RULE } from "@/lib/untrusted-text";
import { IMAGE_ANSWER_MAX_BYTES, type AiImage } from "../tasks";

export type GeminiTextAnswer =
  | { kind: "text"; status: number; text: string }
  | { kind: "unusable"; status: number }
  | { kind: "status"; status: number }
  | { kind: "timeout" }
  | { kind: "network" }
  | { kind: "noKey" };

export type GeminiImageAnswer =
  | { kind: "image"; status: number; bytes: Uint8Array; mime: AiImage["mime"] }
  | Exclude<GeminiTextAnswer, { kind: "text" }>;

const imageEnvelope = z.object({
  candidates: z
    .array(
      z.object({
        content: z
          .object({
            parts: z.array(
              z.object({
                inlineData: z
                  .object({ data: z.string(), mimeType: z.string().optional() })
                  .optional(),
              }),
            ),
          })
          .optional(),
      }),
    )
    .optional(),
});

/** The bytes, never the provider's declared content type, identify an image. */
function imageMime(bytes: Uint8Array): AiImage["mime"] | null {
  if (
    bytes.length >= 8 &&
    [137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => bytes[index] === byte)
  )
    return "image/png";
  if (bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255)
    return "image/jpeg";
  if (
    bytes.length >= 12 &&
    String.fromCharCode(...bytes.subarray(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.subarray(8, 12)) === "WEBP"
  )
    return "image/webp";
  return null;
}

/** One image-model request and one decode, bounded across headers and body. */
export async function geminiImage(input: {
  model: string;
  prompt: string;
  timeoutMs: number;
  label: string;
}): Promise<GeminiImageAnswer> {
  const key = process.env["GEMINI_API_KEY"] ?? "";
  if (key.trim() === "") return { kind: "noKey" };
  try {
    const response = await upstream(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(input.model)}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: input.prompt }] }],
          generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
        }),
      },
      { timeoutMs: input.timeoutMs, label: input.label },
    );
    if (!response.ok) return { kind: "status", status: response.status };
    try {
      const parsed = imageEnvelope.safeParse(await response.json());
      if (!parsed.success) return { kind: "unusable", status: response.status };
      const data = parsed.data.candidates?.[0]?.content?.parts?.find(
        (part) => part.inlineData !== undefined,
      )?.inlineData?.data;
      if (data === undefined || data.length > Math.ceil(IMAGE_ANSWER_MAX_BYTES / 3) * 4)
        return { kind: "unusable", status: response.status };
      const binary = atob(data);
      if (binary.length === 0 || binary.length > IMAGE_ANSWER_MAX_BYTES)
        return { kind: "unusable", status: response.status };
      const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
      const mime = imageMime(bytes);
      return mime === null
        ? { kind: "unusable", status: response.status }
        : { kind: "image", status: response.status, bytes, mime };
    } catch (error) {
      if (isDeadline(error)) return { kind: "timeout" };
      return { kind: "unusable", status: response.status };
    }
  } catch (error) {
    return isDeadline(error) ? { kind: "timeout" } : { kind: "network" };
  }
}

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
      if (isDeadline(error)) return { kind: "timeout" };
      return { kind: "unusable", status: response.status };
    }
    return {
      kind: "text",
      status: response.status,
      text: parsed.success ? (parsed.data.candidates?.[0]?.content?.parts?.[0]?.text ?? "") : "",
    };
  } catch (error) {
    return isDeadline(error) ? { kind: "timeout" } : { kind: "network" };
  }
}
