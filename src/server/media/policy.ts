import type { ImageFormat } from "./strip";

/**
 * U6-B1 — THE UPLOAD-TIME POLICY PASS (spec §12 D15).
 *
 * NOTHING IS STORED UNSCREENED. EVERY variant that will be stored — the cover,
 * the middle size when it is sent (D162), the card and the thumb — is shown to
 * the provider in ONE call (INC-601), with a
 * fixed code list and a JSON schema, and a PROVIDER FAILURE IS A REFUSAL (F4):
 * `providerUnavailable` with a retry hint, never a quiet accept. Every smaller
 * copy must show the same photo as the cover; a smaller copy that does not is
 * refused `variant_mismatch`, so no stored size escapes the screen.
 *
 * THE PROVIDER is the same Gemini endpoint and the same server-side key name the
 * category-images pipeline and the assist route already use (`GEMINI_API_KEY`),
 * read INSIDE the call, with the vision model from `GEMINI_VISION_MODEL`
 * (default: the images model the category route uses).
 *
 * D165 (the operator, 2026-10-14: "Phone sizes, cheap check") — THE PHOTO IN
 * FULL, ITS SMALLER COPIES AT LOW DETAIL. The phone keeps making the sizes (no
 * image work on our server: DEC-082, INC-308), and the one call still shows the
 * provider every stored size; the first image, the photo, at the default detail
 * (1,120 tokens for Gemini 3), and every smaller copy at low detail (280 tokens,
 * `mediaResolution` MEDIA_RESOLUTION_LOW on its part), which is enough to see that
 * it is the same picture and nothing it must refuse. Should the model refuse the
 * per-image setting (it is marked experimental), the call is made once more
 * without it — every image at the default detail, as before D165 — and the log
 * says so; the photo is never let through unscreened.
 *
 * D165 (the operator, 2026-10-14: "Phone sizes, cheap check") — THE PHOTO IN
 * FULL, ITS SMALLER COPIES AT LOW DETAIL. The phone keeps making the sizes (no
 * image work on our server: DEC-082, INC-308), and the one call still shows the
 * provider every stored size; the first image, the photo, at the default detail
 * (1,120 tokens for Gemini 3), and every smaller copy at low detail (280 tokens,
 * `mediaResolution` MEDIA_RESOLUTION_LOW on its part), which is enough to see that
 * it is the same picture and nothing it must refuse. Should the model refuse the
 * per-image setting (it is marked experimental), the call is made once more
 * without it — every image at the default detail, as before D165 — and the log
 * says so; the photo is never let through unscreened.
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
  "variant_mismatch",
] as const;

export type PolicyCode = (typeof POLICY_CODES)[number] | "providerUnavailable";

export type PolicyVerdict = { ok: true } | { ok: false; code: PolicyCode; evidence: string };

/** One stored size of an upload, as the strip produced it. */
export interface PolicyImage {
  bytes: Uint8Array;
  format: ImageFormat;
  width: number;
}

/** INC-601 — the sizes one upload stores, screened together (D162: the middle size when sent). */
export interface PolicyVariants {
  cover: PolicyImage;
  mid?: PolicyImage;
  card: PolicyImage;
  thumb: PolicyImage;
}

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

/**
 * INC-584 — a photograph of a business card was refused `not_a_photo`, a code
 * this instruction keeps for screenshots, drawings, blank frames and test
 * patterns. D148 (the operator, 2026-10-12): everything on a business card is
 * allowed, its phone numbers and e-mail addresses included, and the photo step
 * says that everything in a photo is public. Any other printed item
 * photographed is a photograph; what is printed on it is judged by the codes.
 * D153 (the operator, 2026-10-13): a logo, or another graphic a business
 * designed for itself, passes like a business card. No logo is recognised and
 * no list of banned logos exists; a mark used without right is removed on report.
 */
export const PHOTO_POLICY_INSTRUCTION = [
  "You screen photographs uploaded to a public classifieds marketplace.",
  "You are shown the images of one upload: first the photo, then smaller copies of it, each smaller than the one before.",
  "Answer with one verdict for the upload: judge every one of the images by the codes below, and refuse the upload if any of them must be refused.",
  "Refuse only when you can see the reason in an image.",
  `The only refusal codes are: ${POLICY_CODES.join(", ")}.`,
  "personal_document covers an ID card, passport, licence or bank card.",
  "contact_in_image covers a phone number, email address or messaging handle printed on the image.",
  "stock_watermark covers a stock-library or reseller watermark over the subject.",
  "not_a_photo covers a screenshot, a drawing, a blank frame or a test pattern.",
  "variant_mismatch covers a smaller copy that shows a different picture from the first image; a smaller copy is less sharp, and that alone is never a reason to refuse.",
  "A business card is allowed with everything printed on it, its phone numbers, email addresses and handles included: never refuse a business card as contact_in_image or not_a_photo.",
  "A logo, or another graphic a business designed for itself, is allowed with everything on it, like a business card: never refuse one as not_a_photo or contact_in_image.",
  "A photograph of another printed item, such as a flyer, a label, a menu or a price list, is a photograph and is never not_a_photo; judge what is printed on it by the other codes.",
  'Return JSON only: {"allowed": boolean, "code": string, "evidence": string}.',
  'When the image is acceptable, return {"allowed": true, "code": "", "evidence": ""}.',
  "Keep evidence to one short phrase naming what you saw and in which image (first, second, third or fourth).",
].join(" ");

/** The stored sizes in the order the instruction names them: largest first. */
export function imagesOf(variants: PolicyVariants): PolicyImage[] {
  return [
    variants.cover,
    ...(variants.mid === undefined ? [] : [variants.mid]),
    variants.card,
    variants.thumb,
  ];
}

function mimeOf(format: ImageFormat): string {
  return format === "jpeg" ? "image/jpeg" : format === "png" ? "image/png" : "image/webp";
/** D165 — the detail every smaller copy is shown at. */
export const SMALL_COPY_DETAIL = { level: "MEDIA_RESOLUTION_LOW" } as const;

/**
 * The request's image parts, largest first: the photo at the default detail and,
 * when `lowDetail`, every smaller copy at low detail (D165).
 */
export function policyParts(variants: PolicyVariants, lowDetail: boolean) {
  return imagesOf(variants).map((image, index) => ({
    inlineData: { mimeType: mimeOf(image.format), data: base64(image.bytes) },
    ...(lowDetail && index > 0 ? { mediaResolution: SMALL_COPY_DETAIL } : {}),
  }));
}

/** A 400 that names the per-image detail: the model does not take it (D165). */
function refusesDetail(status: number, raw: string): boolean {
  return status === 400 && /media_?resolution/i.test(raw);
}

}

function base64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

/** D165 — the detail every smaller copy is shown at. */
export const SMALL_COPY_DETAIL = { level: "MEDIA_RESOLUTION_LOW" } as const;

/**
 * The request's image parts, largest first: the photo at the default detail and,
 * when `lowDetail`, every smaller copy at low detail (D165).
 */
export function policyParts(variants: PolicyVariants, lowDetail: boolean) {
  return imagesOf(variants).map((image, index) => ({
    inlineData: { mimeType: mimeOf(image.format), data: base64(image.bytes) },
    ...(lowDetail && index > 0 ? { mediaResolution: SMALL_COPY_DETAIL } : {}),
  }));
  const call = (lowDetail: boolean) =>
    fetch(`${BASE}/${encodeURIComponent(visionModel())}:generateContent`, {
function refusesDetail(status: number, raw: string): boolean {
  return status === 400 && /media_?resolution/i.test(raw);
}
function isPolicyCode(value: string): value is (typeof POLICY_CODES)[number] {
        // INC-601 — every stored size, largest first, in ONE call (D162: the middle
        // size when sent); D165 — the smaller copies at low detail.
        contents: [{ role: "user", parts: policyParts(variants, lowDetail) }],
  // assist route reads the same way, so a test run never reaches the provider.
  if (serverEnv("E2E_FAKE_PHOTO_POLICY") === "1" || serverEnv("E2E_FAKE_TRANSLATE") === "1") {
    return variants.cover.width === FAKE_REFUSAL_WIDTH
      ? { ok: false, code: "not_a_photo", evidence: "fake mode: fixture marker width" }
      : { ok: true };
  }

  const key = serverEnv("GEMINI_API_KEY");
  if (key.trim() === "") {
    log("photo policy: GEMINI_API_KEY is not configured");
    return { ok: false, code: "providerUnavailable", evidence: "screening is unavailable" };
  }

  const call = (lowDetail: boolean) =>
    fetch(`${BASE}/${encodeURIComponent(visionModel())}:generateContent`, {

  let response: Response;
  let raw: string;
  try {
    response = await call(true);
    raw = await response.text();
    if (refusesDetail(response.status, raw)) {
      log(
        "photo policy: the model refused the low detail for smaller copies; every image sent at the default detail",
      );
      response = await call(false);
      raw = await response.text();
    }
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: PHOTO_POLICY_INSTRUCTION }] },
        // INC-601 — every stored size, largest first, in ONE call (D162: the middle
  if (!response.ok) {
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

  let response: Response;
  let raw: string;
  try {
    response = await call(true);
    raw = await response.text();
    if (refusesDetail(response.status, raw)) {
      log(
        "photo policy: the model refused the low detail for smaller copies; every image sent at the default detail",
      );
      response = await call(false);
      raw = await response.text();
    }
  } catch (error) {
    log(`photo policy: provider unreachable — ${error instanceof Error ? error.message : ""}`);
    return { ok: false, code: "providerUnavailable", evidence: "screening is unavailable" };
  }

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
