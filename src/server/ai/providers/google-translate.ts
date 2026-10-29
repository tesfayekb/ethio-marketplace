import { z } from "zod";
import { isDeadline, upstream } from "@/server/upstream";
import { decodeEntities, maskTokens, restoreTokens } from "../translate-tokens";

/**
 * Foundations turn 19 — THE GOOGLE TRANSLATE ADAPTER (DEC-249: the project's
 * own code over `upstream`; no vendor SDK). Cloud Translation v2: one form body
 * per chunk, `source=en` (the catalogue's base language — K4's recorded
 * exception), `format=html` so the `translate="no"` spans around each masked
 * `{token}` are honoured, one `q` per text, and the key in the
 * `x-goog-api-key` header only — never in the URL (INC-829). One deadline
 * covers headers and body.
 *
 * A 2xx whose body does not parse, or whose count differs from the texts
 * sent, is `unusable` (and metered — the provider charged for it). An empty
 * or missing translation for one text is that text's `null`.
 */

const TRANSLATE_URL = "https://translation.googleapis.com/language/translate/v2";
const LANGUAGES_URL =
  "https://translation.googleapis.com/language/translate/v2/languages?target=en";

export type GoogleTranslateAnswer =
  | { kind: "texts"; status: number; texts: (string | null)[] }
  | { kind: "unusable"; status: number }
  | { kind: "status"; status: number }
  | { kind: "timeout" }
  | { kind: "network" }
  | { kind: "noKey" };

/** A supported target: its code and English name. */
export interface ProviderLanguage {
  code: string;
  name: string;
}

export type ProviderLanguagesAnswer =
  | { kind: "languages"; languages: ProviderLanguage[] }
  | Exclude<GoogleTranslateAnswer, { kind: "texts" }>;

const translationsEnvelope = z.object({
  data: z.object({
    translations: z.array(z.object({ translatedText: z.unknown().optional() })),
  }),
});

const languagesEnvelope = z.object({
  data: z.object({
    languages: z.array(z.object({ language: z.string(), name: z.string().optional() })),
  }),
});

function apiKey(): string {
  // The provider's key, read inside the call and never echoed (F1).
  return (process.env["GOOGLE_TRANSLATE_API_KEY"] ?? "").trim();
}

/** One chunk of texts into one target language, masked, sent and restored. */
export async function translateBatch(input: {
  target: string;
  texts: readonly string[];
  timeoutMs: number;
  label: string;
}): Promise<GoogleTranslateAnswer> {
  const key = apiKey();
  if (key === "") return { kind: "noKey" };
  const body = new URLSearchParams();
  body.set("target", input.target);
  body.set("source", "en");
  // format=html is what makes `translate="no"` meaningful to the provider.
  body.set("format", "html");
  const masked = input.texts.map((text) => maskTokens(text, true));
  for (const entry of masked) body.append("q", entry.text);
  try {
    const response = await upstream(
      TRANSLATE_URL,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "x-goog-api-key": key },
        body,
      },
      { timeoutMs: input.timeoutMs, label: input.label },
    );
    if (!response.ok) return { kind: "status", status: response.status };
    let payload: unknown;
    try {
      payload = await response.json();
    } catch (error) {
      if (isDeadline(error)) return { kind: "timeout" };
      return { kind: "unusable", status: response.status };
    }
    const parsed = translationsEnvelope.safeParse(payload);
    if (!parsed.success || parsed.data.data.translations.length !== input.texts.length) {
      return { kind: "unusable", status: response.status };
    }
    const texts = parsed.data.data.translations.map((entry, index) => {
      const value = entry.translatedText;
      if (typeof value !== "string" || value.length === 0) return null;
      return restoreTokens(decodeEntities(value), masked[index]?.tokens ?? []);
    });
    return { kind: "texts", status: response.status, texts };
  } catch (error) {
    return isDeadline(error) ? { kind: "timeout" } : { kind: "network" };
  }
}

/** The process's copy of the supported targets: read once, as today. */
let supportedLanguages: ProviderLanguage[] | null = null;

/** The provider's supported targets (code, English name), cached for the process. */
export async function providerLanguages(input: {
  timeoutMs: number;
}): Promise<ProviderLanguagesAnswer> {
  if (supportedLanguages !== null) return { kind: "languages", languages: supportedLanguages };
  const key = apiKey();
  if (key === "") return { kind: "noKey" };
  try {
    const response = await upstream(
      LANGUAGES_URL,
      { headers: { "x-goog-api-key": key } },
      { timeoutMs: input.timeoutMs, label: "google-translate languages" },
    );
    if (!response.ok) return { kind: "status", status: response.status };
    let payload: unknown;
    try {
      payload = await response.json();
    } catch (error) {
      if (isDeadline(error)) return { kind: "timeout" };
      return { kind: "unusable", status: response.status };
    }
    const parsed = languagesEnvelope.safeParse(payload);
    if (!parsed.success || parsed.data.data.languages.length === 0) {
      return { kind: "unusable", status: response.status };
    }
    supportedLanguages = parsed.data.data.languages.map((entry) => ({
      code: entry.language.toLowerCase(),
      name: entry.name ?? entry.language,
    }));
    return { kind: "languages", languages: supportedLanguages };
  } catch (error) {
    return isDeadline(error) ? { kind: "timeout" } : { kind: "network" };
  }
}
