/**
 * Foundations 1 (DEC-333) — THE IDENTITY of a function as the live catalogue
 * prints it (`regprocedure::text`: `name(type,type)`): the declared types
 * normalised to the catalogue's spelling and the argument list split at its
 * top level. Shared by the static catalogue (catalogue.ts) and the judge.
 */

const TYPE_ALIASES: Record<string, string> = {
  int: "integer",
  int4: "integer",
  integer: "integer",
  int2: "smallint",
  smallint: "smallint",
  int8: "bigint",
  bigint: "bigint",
  bool: "boolean",
  boolean: "boolean",
  timestamptz: "timestamp with time zone",
  "timestamp with time zone": "timestamp with time zone",
  timestamp: "timestamp without time zone",
  "timestamp without time zone": "timestamp without time zone",
  char: "character",
  character: "character",
  bpchar: "character",
  varchar: "character varying",
  "character varying": "character varying",
  float8: "double precision",
  "double precision": "double precision",
  float4: "real",
  real: "real",
  decimal: "numeric",
  numeric: "numeric",
  time: "time without time zone",
  timetz: "time with time zone",
};

/** The catalogue's spelling of a declared type (`char(2)` → `character`, `int[]` → `integer[]`). */
export function normaliseType(raw: string): string {
  let text = raw.trim().replace(/\s+/g, " ").toLowerCase();
  text = text.replace(/^public\./, "");
  let dims = "";
  for (;;) {
    const array = /\s*(?:\[\s*\d*\s*\]|array)$/.exec(text);
    if (array === null) break;
    dims += "[]";
    text = text.slice(0, array.index);
  }
  text = text.replace(/\s*\([^)]*\)\s*$/, "").trim();
  const base = TYPE_ALIASES[text] ?? text;
  return base + dims;
}

/** The top-level comma split of an argument or object list (parentheses and quotes respected). */
export function splitTopLevel(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let quote: string | null = null;
  let from = 0;
  for (let at = 0; at < text.length; at += 1) {
    const ch = text[at];
    if (quote !== null) {
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === "'" || ch === '"') quote = ch;
    else if (ch === "(" || ch === "[") depth += 1;
    else if (ch === ")" || ch === "]") depth -= 1;
    else if (ch === "," && depth === 0) {
      parts.push(text.slice(from, at));
      from = at + 1;
    }
  }
  parts.push(text.slice(from));
  return parts.map((part) => part.trim()).filter((part) => part.length > 0);
}

const MULTIWORD_TYPE_START = /^(?:timestamp|time|double|character|bit)$/i;

/** One declared argument: its mode, name and normalised type (OUT arguments are not identity). */
export function parseArgument(text: string): { mode: string; name: string; type: string } | null {
  let rest = text.trim().replace(/\s+/g, " ");
  if (rest === "") return null;
  rest = rest.replace(/\s+(?:DEFAULT|=)\s+[\s\S]*$/i, "").replace(/\s*=\s*[\s\S]*$/, "");
  let mode = "in";
  const modeMatch = /^(IN|OUT|INOUT|VARIADIC)\s+/i.exec(rest);
  if (modeMatch !== null) {
    mode = (modeMatch[1] ?? "in").toLowerCase();
    rest = rest.slice(modeMatch[0].length);
  }
  const tokens = rest.split(" ");
  if (tokens.length === 1) return { mode, name: "", type: normaliseType(rest) };
  const first = tokens[0] ?? "";
  if (
    MULTIWORD_TYPE_START.test(first) &&
    /^(?:with|without|precision|varying|\(|varying)/i.test(tokens[1] ?? "")
  )
    return { mode, name: "", type: normaliseType(rest) };
  return {
    mode,
    name: first.replace(/^"|"$/g, ""),
    type: normaliseType(tokens.slice(1).join(" ")),
  };
}

/** `name(type,type)` from a function name and its declared argument list text. */
export function identityKey(name: string, argList: string): string {
  const types = splitTopLevel(argList)
    .map(parseArgument)
    .filter((arg): arg is NonNullable<typeof arg> => arg !== null && arg.mode !== "out")
    .map((arg) => arg.type);
  return `${name}(${types.join(",")})`;
}
