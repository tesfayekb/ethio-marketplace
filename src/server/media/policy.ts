import type { ImageFormat } from "./strip";

/**
 * U6-B1 — THE UPLOAD-TIME POLICY PASS (spec §12 D15).
 *
 * NOTHING IS STORED UNSCREENED. The cover variant is shown to the provider once,
 * with a fixed code list and a JSON schema, and a PROVIDER FAILURE IS A REFUSAL
 * (F4): `providerUnavailable` with a retry hint, never a quiet accept. The card
 * and thumb variants are derived from the cover, so they are not screened twice.
 *
 * THE PROVIDER is the same Gemini endpoint and the same server-side key name the
 * category-images pipeline and the assist route already use (`GEMINI_API_KEY`),
 * read INSIDE the call, with the vision model from `GEMINI_VISION_MODEL`
 * (default: the images model the category route uses).
 *
 * FAKE MODE (`E2E_FAKE_PHOTO_POLICY=1`) is DETERMINISTIC and costs nothing: an
 * image exactly 13 px wide is the fixture marker and comes back refused
 * `not_a_photo`; everything else passes. No network, no spend, no flake.
 */

export const POLICY_CODES = [
  "nudity",
  "violence",
  "weapon",
  "drugs",
  "hate_symbol",
  "personal_document",
  "contact_in_image",
  "stock_watermark",
  "not_a_photo",
] as const;

export type PolicyCode = (typeof POLICY_CODES)[number] | "providerUnavailable";

export type PolicyVerdict = { ok: true } | { ok: false; code: PolicyCode; evidence: string };

/** The width a fixture uses to ask fake mode for a refusal. */
export const FAKE_REFUSAL_WIDTH = 13;

const BASE = "https://generativelanguage.googleapis.com/v1beta/models";

function serverEnv(name: string): string {
  return process.env[name] ?? "";
}

function visionModel(): string {
  const value = serverEnv("GEMINI_VISION_MODEL").trim();
  return value === "" ? "gemini-3.1-flash-image" : value;
}

const SYSTEM_PROMPT = [
  "You screen photographs uploaded to a public classifieds marketplace.",
  "Answer with one verdict for the image you are shown.",
  "Refuse the image only when you can see the reason in it.",
  `The only refusal codes are: ${POLICY_CODES.join(", ")}.`,
  "personal_document covers an ID card, passport, licence or bank card.",
  "contact_in_image covers a phone number, email address or messaging handle printed on the image.",
  "stock_watermark covers a stock-library or reseller watermark over the subject.",
  "not_a_photo covers a screenshot, a drawing, a blank frame or a test pattern.",
  'Return JSON only: {"allowed": boolean, "code": string, "evidence": string}.',
  'When the image is acceptable, return {"allowed": true, "code": "", "evidence": ""}.',
  "Keep evidence to one short phrase naming what you saw.",
].join(" ");

function mimeOf(format: ImageFormat): string {
  return format === "jpeg" ? "image/jpeg" : format === "png" ? "image/png" : "image/webp";
}

function base64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function isPolicyCode(value: string): value is (typeof POLICY_CODES)[number] {
  return (POLICY_CODES as readonly string[]).includes(value);
}

export async function screenPhotoPolicy(
  bytes: Uint8Array,
  format: ImageFormat,
  width: number,
  log: (message: string) => void,
): Promise<PolicyVerdict> {
  // FAKE MODE: `E2E_FAKE_PHOTO_POLICY=1`, or the harness's standing
  // `E2E_FAKE_TRANSLATE=1` — the flag every e2e job already exports, which the
  // assist route reads the same way, so a test run never reaches the provider.
  if (serverEnv("E2E_FAKE_PHOTO_POLICY") === "1" || serverEnv("E2E_FAKE_TRANSLATE") === "1") {
    return width === FAKE_REFUSAL_WIDTH
      ? { ok: false, code: "not_a_photo", evidence: "fake mode: fixture marker width" }
      : { ok: true };
  }

  const key = serverEnv("GEMINI_API_KEY");
  if (key.trim() === "") {
    log("photo policy: GEMINI_API_KEY is not configured");
    return { ok: false, code: "providerUnavailable", evidence: "screening is unavailable" };
  }

  let response: Response;
  try {
    response = await fetch(`${BASE}/${encodeURIComponent(visionModel())}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [
          {
            role: "user",
            parts: [{ inlineData: { mimeType: mimeOf(format), data: base64(bytes) } }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              allowed: { type: "BOOLEAN" },
              code: { type: "STRING" },
              evidence: { type: "STRING" },
            },
            required: ["allowed", "code", "evidence"],
          },
          temperature: 0,
        },
      }),
    });
  } catch (error) {
    log(`photo policy: provider unreachable — ${error instanceof Error ? error.message : ""}`);
    return { ok: false, code: "providerUnavailable", evidence: "screening is unavailable" };
  }

  const raw = await response.text();
  if (!response.ok) {
    log(`photo policy: provider ${response.status} — ${raw.slice(0, 200)}`);
    return { ok: false, code: "providerUnavailable", evidence: "screening is unavailable" };
  }

  try {
    const envelope = JSON.parse(raw) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = envelope.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const verdict = JSON.parse(text) as { allowed?: unknown; code?: unknown; evidence?: unknown };
    if (verdict.allowed === true) return { ok: true };
    const code = typeof verdict.code === "string" ? verdict.code : "";
    const evidence = typeof verdict.evidence === "string" ? verdict.evidence.slice(0, 200) : "";
    // An unusable code is not a pass: the answer is a refusal we cannot name, so
    // it becomes the provider's own failure rather than a silent accept.
    if (!isPolicyCode(code)) {
      log(`photo policy: unusable verdict code "${code}"`);
      return { ok: false, code: "providerUnavailable", evidence: "screening is unavailable" };
    }
    return { ok: false, code, evidence };
  } catch (error) {
    log(`photo policy: unusable answer — ${error instanceof Error ? error.message : ""}`);
    return { ok: false, code: "providerUnavailable", evidence: "screening is unavailable" };
  }
}
