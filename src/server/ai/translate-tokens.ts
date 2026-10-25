/**
 * Foundations turn 19 — THE TRANSLATION TOKEN RULES, moved byte for byte from
 * src/routes/api/translate.ts (pure, no I/O). The Google Translate adapter
 * masks with html and restores; the stand-in masks without html.
 */
/**
 * U4g-24 / INC-115 — PLACEHOLDER PROTECTION.
 *
 * SENTINEL CENSUS (stated honestly, per law A3): this executor has NO Google
 * Translate credential, so the "does v2 return `⟦0⟧` unchanged?" question could
 * NOT be answered empirically here. An unverified assumption is not a law, so
 * the endpoint takes the DOCUMENTED path instead of the guessed one: Google
 * Cloud Translation v2 documents `format=html` and honours the standard
 * `translate="no"` / `notranslate` markup, so every `{token}` travels as
 *   `<span translate="no">⟦i⟧</span>`
 * — a marked-untranslatable wrapper AROUND an index sentinel. Two independent
 * defences: if the provider honours the wrapper the sentinel is untouched, and
 * if it strips the wrapper the bare `⟦i⟧` is still restored by index.
 *
 * RESTORE IS TOTAL OR NOTHING: each sentinel must appear EXACTLY once in the
 * response. A missing or duplicated sentinel means the provider mangled the
 * structure, so the text is returned AS THE PROVIDER GAVE IT (sentinels and
 * all) — never guessed at — and the writer's placeholder validator then flags
 * the row. Silence is never an option (law F4).
 */
const TOKEN_RE = /\{[^{}]*\}/g;
const SENTINEL_RE = /⟦(\d+)⟧/g;

interface Masked {
  text: string;
  tokens: string[];
}

function maskTokens(source: string, html: boolean): Masked {
  const tokens: string[] = [];
  const text = source.replace(TOKEN_RE, (token) => {
    const index = tokens.push(token) - 1;
    // Reviewed (DEC-153): only a number goes into the masking span sent to the provider.
    // nosemgrep: html-in-template-string
    return html ? `<span translate="no">⟦${index}⟧</span>` : `⟦${index}⟧`;
  });
  return { text, tokens };
}

/** Drop provider-preserved wrappers so only the bare sentinels remain. */
function stripWrappers(text: string): string {
  return text.replace(/<\/?span[^>]*>/g, "");
}

function restoreTokens(translated: string, tokens: string[]): string {
  if (tokens.length === 0) return translated;
  const bare = stripWrappers(translated);
  const seen = new Map<number, number>();
  for (const match of bare.matchAll(SENTINEL_RE)) {
    const index = Number(match[1]);
    seen.set(index, (seen.get(index) ?? 0) + 1);
  }
  const intact = tokens.every((_, index) => seen.get(index) === 1) && seen.size === tokens.length;
  // Mangled structure → hand back the provider's own text; the validator flags it.
  if (!intact) return translated;
  return bare.replace(SENTINEL_RE, (whole, digits: string) => tokens[Number(digits)] ?? whole);
}

function fakeTranslate(target: string, source: string): string {
  // FAKE MODE runs the SAME mask → translate → restore path as the provider
  // call, so CI proves the protection itself and not just the writer.
  const { text, tokens } = maskTokens(source, false);
  const restored = restoreTokens(`⟪${target}⟫ ${text}`, tokens);
  // E2EBREAK still drops every placeholder — on the RESTORED text (TR-13).
  return source.includes("E2EBREAK")
    ? restored.replace(TOKEN_RE, "").replace(/\s+/g, " ").trim()
    : restored;
}

/** Google v2 returns HTML-escaped text even in `format=text` responses. */
function decodeEntities(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

export { TOKEN_RE, decodeEntities, fakeTranslate, maskTokens, restoreTokens };
