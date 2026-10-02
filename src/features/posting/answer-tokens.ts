/**
 * Part O — THE ONE CLIENT READER OF A CHOICE ANSWER, mirroring
 * `public.attr_answer_tokens` / `public.attr_answer_other_text` (migration
 * a35e45fa). An answer is a token, `{ value, text? }`, or an array of either;
 * a multi-choice "Other" is stored as `{ value: "other", text }` inside the
 * array (bare `"other"` while its text is still empty). The door decides.
 */
export function answerTokens(raw: unknown): string[] {
  const one = (entry: unknown): string | null => {
    if (typeof entry === "string") return entry;
    if (entry !== null && typeof entry === "object" && !Array.isArray(entry)) {
      const value = (entry as Record<string, unknown>)["value"];
      return typeof value === "string" ? value : null;
    }
    return null;
  };
  if (Array.isArray(raw)) return raw.map(one).filter((v): v is string => v !== null);
  const single = one(raw);
  return single === null ? [] : [single];
}

/** The first Other write-in text an answer carries; "" when none. */
export function answerOtherText(raw: unknown): string {
  const entries = Array.isArray(raw) ? raw : [raw];
  for (const entry of entries) {
    if (entry !== null && typeof entry === "object" && !Array.isArray(entry)) {
      const text = (entry as Record<string, unknown>)["text"];
      if (typeof text === "string") return text;
    }
  }
  return "";
}

/** A multi-choice answer rebuilt from its tokens, the Other entry carrying `text`. */
export function multiAnswer(tokens: readonly string[], text: string): unknown[] {
  return tokens.map((token) =>
    token === "other" && text !== "" ? { value: "other", text } : token,
  );
}
