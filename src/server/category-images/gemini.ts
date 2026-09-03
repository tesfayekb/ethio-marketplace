/**
 * C5a — the Gemini boundary.
 *
 * F1: the key is read from the SERVER runtime env INSIDE the call, never a
 * `VITE_` name, never logged, never echoed into a response body.
 * F4: a provider failure is surfaced honestly with its own status (429/402 pass
 * straight through), never swallowed into a fake success.
 */
const BASE = "https://generativelanguage.googleapis.com/v1beta/models";

export function serverEnv(name: string, fallback = ""): string {
  return process.env[name] ?? fallback;
}

/**
 * PART A — MODE PRECEDENCE, decided in exactly one place:
 *   GEMINI_FAKE=1  ⇒ fake
 *   else key present ⇒ real
 *   else ⇒ fake (fail-safe; warned once on the [ssr-error] channel).
 * No caller may throw for a missing key.
 */
let keylessWarned = false;

export function isFakeMode(): boolean {
  if (serverEnv("GEMINI_FAKE") === "1") return true;
  if (serverEnv("GEMINI_API_KEY").trim() !== "") return false;
  if (!keylessWarned) {
    keylessWarned = true;
    console.error("[ssr-error] category-images: no GEMINI_API_KEY — fake mode");
  }
  return true;
}

export function imageModel(): string {
  const value = serverEnv("GEMINI_IMAGE_MODEL").trim();
  return value === "" ? "gemini-2.5-flash-image" : value;
}

export function textModel(): string {
  const value = serverEnv("GEMINI_TEXT_MODEL").trim();
  return value === "" ? "gemini-2.5-flash-lite" : value;
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

/** Returns the raw generated image bytes (base64-decoded inlineData). */
export async function generateImageBytes(prompt: string): Promise<Uint8Array> {
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
  return bytes;
}

/** JSON-mode icon suggestion, constrained to the allowlist by responseSchema. */
export async function suggestIconName(
  name: string,
  parentName: string | null,
  allowlist: readonly string[],
): Promise<unknown> {
  const parsed = await callGemini(textModel(), {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: [
              "Pick the single best lucide-react icon for an online marketplace category.",
              `Category name: ${name}.`,
              parentName ? `Parent section: ${parentName}.` : "",
              'Answer with JSON only: {"icon": "<one name from the allowed list>"}.',
            ]
              .filter(Boolean)
              .join(" "),
          },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: { icon: { type: "STRING", enum: [...allowlist] } },
        required: ["icon"],
      },
    },
  });
  const text = parsed.candidates?.[0]?.content?.parts?.find(
    (p) => typeof p.text === "string",
  )?.text;
  if (!text) return null;
  try {
    return (JSON.parse(text) as { icon?: unknown }).icon;
  } catch {
    return null;
  }
}
