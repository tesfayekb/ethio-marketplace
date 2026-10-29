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

/**
 * Turn D1 stop 11 (G0.2) — a database rate gate raises the bare code
 * `rateLimited` (rate_gate, INC-951). Every staff screen reads it as ONE shared
 * sentence; a screen with its own specific rateLimited key maps it before here.
 */
export const RATE_LIMITED_KEY = "admin.error.rateLimited";

/** A door's refusal key: `admin.<family>.error.<name>`. */
export const DOOR_KEY = /^admin\.[a-z_-]+\.error\.[A-Za-z0-9_.-]+$/;

/**
 * T7 (INC-578's class, G29) — ONE reading of a door's words. A refusal that IS
 * a known translation key, with or without a tail, comes back as its sentence,
 * filled; anything else is null, so the caller decides its fallback. The
 * categories console used to translate only `admin.categories.error.*`, so the
 * parent-first refusal a move can now raise
 * (`admin.attributes.error.parentAfterChild:…`) would have been printed raw.
 */
export function doorKeyText(
  raw: string,
  translate: (key: string) => string | undefined,
): string | null {
  const { key: code, tail } = splitRefusal(raw.trim());
  const key = code === "rateLimited" ? RATE_LIMITED_KEY : code;
  if (key !== RATE_LIMITED_KEY && !DOOR_KEY.test(key)) return null;
  const text = translate(key);
  if (text === undefined || text === "" || text === key) return null;
  return fillRefusal(text, tail);
}
