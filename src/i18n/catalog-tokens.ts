import { catalogText } from "./entity";

/**
 * Bundle 4 steps 28–29 (DEC-094, DEC-095) — THE ONE RENDERER OF CATALOGUE TOKENS.
 *
 * Catalogue text (a definition's label and help text, an option's label) may
 * carry two tokens:
 *   {country}          — a country name in the screen's language;
 *   {category:<slug>}  — a pointer to another category, drawn as its full path.
 *
 * Stored text and stored answers keep the tokens; only the seller's and the
 * buyer's screens draw them, and they draw them HERE (law B2). The admin
 * screens keep calling `catalogText` and show a token exactly as stored. A token
 * this renderer cannot resolve never reaches a screen as raw braces: a category
 * that has gone (or no longer takes ads) renders as nothing.
 */
export interface CatalogTokens {
  /** The country name the screen has resolved, or its fallback words. */
  country: string;
  /** The path of an active category that accepts ads, levels joined by " › "; null when gone. */
  categoryPath: (slug: string) => string | null;
}

export type CatalogPiece =
  | { kind: "text"; text: string }
  | { kind: "category"; slug: string; path: string };

/** The door's own pattern for a category token (attr_cell_check, M6). */
const TOKEN_RE = /\{country\}|\{category:([^}]*)\}/g;

/** The text split into words and category pointers, every token resolved. */
export function catalogPieces(text: string, tokens: CatalogTokens): CatalogPiece[] {
  const pieces: CatalogPiece[] = [];
  let dropped = false;
  const pushText = (value: string) => {
    if (value === "") return;
    const last = pieces[pieces.length - 1];
    if (last !== undefined && last.kind === "text") last.text += value;
    else pieces.push({ kind: "text", text: value });
  };
  let cursor = 0;
  for (const match of text.matchAll(TOKEN_RE)) {
    const at = match.index;
    pushText(text.slice(cursor, at));
    cursor = at + match[0].length;
    if (match[1] === undefined) {
      pushText(tokens.country);
      continue;
    }
    const path = tokens.categoryPath(match[1]);
    if (path === null || path === "") dropped = true;
    else pieces.push({ kind: "category", slug: match[1], path });
  }
  pushText(text.slice(cursor));
  if (!dropped) return pieces;
  // A dropped pointer leaves no doubled space and no space before punctuation.
  const tidied = pieces.map((piece) =>
    piece.kind === "text"
      ? { kind: "text" as const, text: piece.text.replace(/ {2,}/g, " ").replace(/ +([.,;:!?።])/g, "$1") }
      : piece,
  );
  const first = tidied[0];
  if (first !== undefined && first.kind === "text") first.text = first.text.replace(/^ +/, "");
  const last = tidied[tidied.length - 1];
  if (last !== undefined && last.kind === "text") last.text = last.text.replace(/ +$/, "");
  return tidied.filter((piece) => piece.kind !== "text" || piece.text !== "");
}

/**
 * Labels, option labels and units as plain words: {country} is drawn; a
 * category pointer belongs to help text alone (the doors refuse one elsewhere),
 * so here it is never drawn and never leaks as braces.
 */
export function drawCatalog(text: string, tokens: CatalogTokens): string {
  return catalogPieces(text, { ...tokens, categoryPath: () => null })
    .map((piece) => (piece.kind === "text" ? piece.text : ""))
    .join("");
}

/** `catalogText` with its tokens drawn — the seller's and buyer's screens call this. */
export function catalogWords(
  en: string,
  am: string | null | undefined,
  lang: string,
  tokens: CatalogTokens,
): string {
  return drawCatalog(catalogText(en, am, lang), tokens);
}
