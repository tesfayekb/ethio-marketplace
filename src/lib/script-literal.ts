/**
 * Housekeeping turn 4 (concern 2; OWASP ASVS V5.3.3) — THE ONE BUILDER of a value embedded in
 * inline script text: a pre-paint script's constant, a page's structured data. The value's JSON
 * with `<`, `>`, `&`, U+2028 and U+2029 written as `\uXXXX` escapes, so no value — whatever its
 * source — can close the script element, open a comment or end a line inside a string. `undefined`
 * answers `null` (JSON.stringify's own `undefined` would print nothing); a value with no JSON form
 * (a function, a symbol) throws where it is built, never at a visitor's paint.
 * scripts/conformance/script-text.test.ts holds every script and style text to it.
 */
export function scriptLiteral(value: unknown): string {
  if (value === undefined) return "null";
  const json: string | undefined = JSON.stringify(value);
  if (json === undefined) throw new Error("scriptLiteral: the value has no JSON form");
  return json.replace(
    /[<>&\u2028\u2029]/g,
    (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`,
  );
}
