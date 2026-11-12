/**
 * INC-1102, housekeeping turn 2 Part D (ruling 3) — the ONE place a repository script builds a
 * RegExp from text. Every interpolated string is escaped, so a name, path or key read from a file
 * enters a pattern as itself and never shapes it; the pattern's own syntax is the author's literal
 * template text. scripts/conformance/pattern-sites.test.ts (CF-PATTERN-4) refuses a `new RegExp(`
 * anywhere else under scripts/ without its allowlist line.
 *
 * - `literal(text)`: `text` as a RegExp source matching exactly itself.
 * - `pattern\`…${part}…\``: a tagged template; the template text is RegExp source (written as in a
 *   string: `\\d`, `\\(`), each `${part}` a string (escaped) or a flagless RegExp (its source, as a
 *   group). `flaggedPattern("gi")\`…\`` is the same tag with flags.
 * - `exactWord(text)`: `text` with no word character, `$` or `-` touching either side.
 * - `authored(source, flags)`: a pattern its author wrote as RegExp text (a brief's ASSERT line,
 *   CF-BRIEF-9), compiled as written. The one helper that escapes nothing; the census allows it
 *   only in scripts/brief/go-laws.ts.
 */

export type PatternPart = string | RegExp;
export type PatternTag = (strings: readonly string[], ...parts: PatternPart[]) => RegExp;

const METACHARACTER = /[.*+?^${}()|[\]\\]/g;
const FLAGS = /^[dgimsuvy]*$/;

/** `text` as a RegExp source: every metacharacter, the backslash included, escaped. */
export function literal(text: string): string {
  return text.replace(METACHARACTER, "\\$&");
}

function partSource(part: PatternPart): string {
  if (typeof part === "string") return literal(part);
  if (part.flags !== "") throw new Error(`a pattern part carries flags (${part.flags})`);
  return `(?:${part.source})`;
}

function compile(source: string, flags: string): RegExp {
  if (!FLAGS.test(flags) || new Set(flags).size !== flags.length)
    throw new Error(`invalid RegExp flags ${flags}`);
  // Reviewed (DEC-153): every interpolated part is escaped by literal() above.
  // nosemgrep: detect-non-literal-regexp
  return new RegExp(source, flags);
}

/** The tag `pattern` is, with flags. */
export function flaggedPattern(flags: string): PatternTag {
  return (strings, ...parts) => {
    if (strings.length !== parts.length + 1)
      throw new Error("a pattern takes one more text than parts");
    const source = strings.reduce(
      (out, text, i) => out + text + (i < parts.length ? partSource(parts[i]) : ""),
      "",
    );
    return compile(source, flags);
  };
}

/** A RegExp whose template text is source and whose every `${part}` is escaped. */
export const pattern: PatternTag = flaggedPattern("");

/** `text` as a whole word: no word character, `$` or `-` beside it. */
export function exactWord(text: string, flags = ""): RegExp {
  return flaggedPattern(flags)`(?<![\\w$-])${text}(?![\\w$-])`;
}

/** A pattern its author wrote as RegExp text, compiled as written (it throws when it does not compile). */
export function authored(source: string, flags = ""): RegExp {
  return compile(source, flags);
}
