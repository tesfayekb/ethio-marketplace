/**
 * Bundle 7 ES4 — ONE reading of a door's refusal. A door raises a translation
 * key, optionally followed by a tail after the FIRST colon
 * (`admin.categories.error.delete_has_children:2`,
 * `admin.attributes.error.parentAfterChild:leaf: a → b`). The tail may itself
 * hold colons; only the first one separates it from the key.
 */
export interface RefusalParts {
  key: string;
  tail: string | undefined;
}

export function splitRefusal(raw: string): RefusalParts {
  const colon = raw.indexOf(":");
  if (colon === -1) return { key: raw, tail: undefined };
  return { key: raw.slice(0, colon), tail: raw.slice(colon + 1) };
}

/**
 * Fills a refusal sentence from its tail: `{count}` and `{detail}` take the
 * whole tail; `{attr}` / `{target}` take the first / last pipe-separated part
 * (DEC-050 L3b). A sentence without a placeholder is returned unchanged.
 */
export function fillRefusal(text: string, tail: string | undefined): string {
  if (tail === undefined) return text;
  const parts = tail.split("|");
  return text
    .split("{count}")
    .join(tail)
    .split("{attr}")
    .join(parts[0] ?? tail)
    .split("{target}")
    .join(parts[parts.length - 1] ?? tail)
    .split("{detail}")
    .join(tail);
}
