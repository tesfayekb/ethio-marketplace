/**
 * C5a — the Gemini boundary.
 *
 * F1: the key is read from the SERVER runtime env INSIDE the call, never a
 * `VITE_` name, never logged, never echoed into a response body.
 * F4: a provider failure is surfaced honestly with its own status (429/402 pass
 * straight through), never swallowed into a fake success.
 */
import { UNTRUSTED_RULE } from "@/lib/untrusted-text";
import { aiFakeMode } from "@/server/ai/meter";

const BASE = "https://generativelanguage.googleapis.com/v1beta/models";

export function serverEnv(name: string, fallback = ""): string {
  return process.env[name] ?? fallback;
}

/**
 * INC-828 — stand-ins require the test build and an explicit harness flag.
 * Without that permission the provider path reports a missing key normally.
 */
export function isFakeMode(): boolean {
  return aiFakeMode("GEMINI_FAKE");
}

export function imageModel(): string {
  const value = serverEnv("GEMINI_IMAGE_MODEL").trim();
  return value === "" ? "gemini-3.1-flash-image" : value;
}

export function textModel(): string {
  const value = serverEnv("GEMINI_TEXT_MODEL").trim();
  return value === "" ? "gemini-3.5-flash-lite" : value;
}

export class GeminiError extends Error {
  readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "GeminiError";
    this.status = status;
  }
}

interface GeminiPart {
  text?: string;
  inlineData?: { mimeType?: string; data?: string };
}

interface GeminiResponse {
  candidates?: { content?: { parts?: GeminiPart[] } }[];
  error?: { message?: string };
}

async function callGemini(model: string, body: unknown): Promise<GeminiResponse> {
  const key = serverEnv("GEMINI_API_KEY");
  if (key === "") throw new GeminiError("GEMINI_API_KEY is not configured", 500);

  const response = await fetch(`${BASE}/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  let parsed: GeminiResponse = {};
  try {
    parsed = JSON.parse(text) as GeminiResponse;
  } catch {
    /* non-JSON error body — the status still carries the truth */
  }
  if (!response.ok) {
    // 429 (rate limit) and 402 (billing) are surfaced with their own status.
    throw new GeminiError(
      parsed.error?.message ?? `provider error ${response.status}`,
      response.status,
    );
  }
  return parsed;
}

/**
 * Returns the raw generated image bytes together with the mime the provider
 * DECLARED (advisory only — the pipeline sniffs the magic bytes).
 *
 * REQUEST SHAPE CENSUS (v1beta :generateContent): the image-capable models take
 * `generationConfig.responseModalities: ["TEXT","IMAGE"]`. There is NO
 * output-image-mime hint on this endpoint — `responseMimeType` governs the TEXT
 * part only, and sending an image mime there is rejected — so the output format
 * cannot be pinned to PNG at request time. PART C's sniff-and-decode is the
 * supported path; `imageConfig` is not accepted by v1beta generateContent.
 */
export interface GeneratedImage {
  bytes: Uint8Array;
  declaredMimeType: string;
}

export async function generateImageBytes(prompt: string): Promise<GeneratedImage> {
  const parsed = await callGemini(imageModel(), {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
  });
  const parts = parsed.candidates?.[0]?.content?.parts ?? [];
  const inline = parts.find((part) => typeof part.inlineData?.data === "string");
  const data = inline?.inlineData?.data;
  if (!data) throw new GeminiError("provider returned no image data", 502);
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return { bytes, declaredMimeType: inline?.inlineData?.mimeType ?? "unknown" };
}
