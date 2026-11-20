import type { MessageKey } from "@/i18n";
import { DOOR_REFUSED_KEY, doorCode } from "@/lib/door-codes";
import { ownValue } from "@/lib/own-key";

/**
 * DEC-339 (Foundations 2, wave 1) — THE ONE REFUSAL READER.
 *
 * Every server dialect reaches a screen through `readRefusal`, as a translation
 * key, never as the server's own text (INC-447): a refusal the reader does not
 * know is the one generic key (`common.error`), or the generic its family names.
 * The reader's core carries no family's table: a family hands its own words in
 * (`RefusalFamily`), so each family's map travels in that family's chunk.
 *
 * The dialects, in the order they are read:
 *  1 a step-up the person cancelled or cannot give (the step-up gate's errors);
 *  2 the route envelope — a `callRoute` answer (`error` / `detail`), or the
 *    posting contract's `{ ok: false, refusals: [...] }` (read by `refusalsOf`);
 *  3 a door's machine code `code[:detail]`, by the family's words (a bare code
 *    such as a rate gate's `rateLimited` included: the consoles' shared words
 *    for it are `ADMIN_REFUSALS`, in `src/lib/refusal-tail.ts`, beside their
 *    layer's key);
 *  4 the console doors' key `admin.<family>.error.<name>[:tail]`, when the
 *    catalogue holds it;
 *  5 the DEC-333 door codes (`src/lib/door-codes.ts`) a family has no words for
 *    (its generic, else `door.refused`);
 *  6 an English sentence a family still matches (retiring as its doors move to
 *    codes);
 *  7 an auth provider's own error `code`, by the family's words.
 */

/**
 * One refusal, exactly as a door or route worded it (the one shape: the server
 * answers it, the client reads it). `retry`: the upload screen's provider
 * refusals carry it.
 */
export type Refusal = { field: string; reason: string; detail?: string; retry?: boolean };

/** A family's own words for its codes; the reader's core holds none. */
export interface RefusalFamily {
  readonly words?: Readonly<Record<string, MessageKey>>;
  /** Retiring: a door that still answers a sentence, matched to its key. */
  readonly sentences?: ReadonlyArray<readonly [RegExp, MessageKey]>;
  /** The family's own generic; the reader's is `common.error`. */
  readonly generic?: MessageKey;
}

export type RefusalBranch =
  | "stepUp"
  | "family"
  | "doorKey"
  | "doorCode"
  | "sentence"
  | "provider"
  | "generic";

export type RefusalRead = {
  key: MessageKey;
  /** The text after a code's first colon, for `{count}` / `{detail}` / `{attr}` / `{target}`. */
  tail: string | undefined;
  /** The field the refusal names, or null for a refusal of the whole form. */
  field: string | null;
  /** A step-up the person cancelled: nothing ran, so nothing is said. */
  silent: boolean;
  branch: RefusalBranch;
};

export const GENERIC_REFUSAL_KEY = "common.error" satisfies MessageKey;

/** A door's refusal key: `admin.<family>.error.<name>`. */
export const DOOR_KEY = /^admin\.[a-z_-]+\.error\.[A-Za-z0-9_.-]+$/;

const STEP_UP_UNAVAILABLE_KEY = "mfa.stepUpUnavailableHint" satisfies MessageKey;

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
 * `{name}`-style interpolation, the same shape every other surface uses
 * (`t(key).replace("{x}", v)`), gathered into one call so a message with three
 * placeholders does not become three chained replaces at the call site.
 */
export function fill(template: string, values: Record<string, string | number>): string {
  let out = template;
  for (const [name, value] of Object.entries(values)) {
    out = out.replace(`{${name}}`, String(value));
  }
  return out;
}

function recordOf(input: unknown): Record<string, unknown> | null {
  return typeof input === "object" && input !== null ? (input as Record<string, unknown>) : null;
}

function textOf(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

/**
 * The posting contract's refusals (`{ ok: false, refusals: [...] }`), each as
 * the one shape. The attribute authority names the offending definition in
 * `attr_key` rather than `field` (A1's own vocabulary), and the form's controls
 * are keyed by exactly that — so both spellings resolve to one `field` here and
 * a refused detail can never end up without a message under it.
 */
export function refusalsOf(payload: Record<string, unknown>): Refusal[] {
  const list = Array.isArray(payload["refusals"]) ? payload["refusals"] : [];
  return list.map((entry) => {
    const row = recordOf(entry) ?? {};
    return {
      field: String(row["field"] ?? row["attr_key"] ?? ""),
      reason: String(row["reason"] ?? ""),
      ...(typeof row["detail"] === "string" ? { detail: row["detail"] } : {}),
    };
  });
}

type Heard = {
  code: string | null;
  detail: string | undefined;
  field: string | null;
  provider: string | null;
  name: string | null;
};

const NOTHING_HEARD: Heard = {
  code: null,
  detail: undefined,
  field: null,
  provider: null,
  name: null,
};

function heardRefusal(refusal: Refusal): Heard {
  return {
    ...NOTHING_HEARD,
    code: refusal.reason,
    detail: refusal.detail,
    field: refusal.field === "" ? null : refusal.field,
  };
}

/** Branch 2 — every shape a refusal arrives in, read to one. */
function hear(input: unknown): Heard {
  if (typeof input === "string") return { ...NOTHING_HEARD, code: input };
  const record = recordOf(input);
  if (record === null) return NOTHING_HEARD;
  const kind = record["kind"];
  if (kind === "signedOut") return { ...NOTHING_HEARD, code: "notSignedIn" };
  if (kind === "unreachable") return NOTHING_HEARD;
  if (kind === "answered") {
    const payload = recordOf(record["payload"]);
    const first = payload === null ? undefined : refusalsOf(payload)[0];
    if (first !== undefined && first.reason !== "") return heardRefusal(first);
    const detail = textOf(record["detail"]);
    return { ...NOTHING_HEARD, code: textOf(record["error"]), detail: detail ?? undefined };
  }
  if (Array.isArray(record["refusals"]) && textOf(record["reason"]) === null) {
    const first = refusalsOf(record)[0];
    if (first !== undefined && first.reason !== "") return heardRefusal(first);
  }
  const reason = textOf(record["reason"]);
  if (reason !== null) {
    const detail = textOf(record["detail"]);
    return heardRefusal({
      field: textOf(record["field"]) ?? "",
      reason,
      ...(detail === null ? {} : { detail }),
    });
  }
  return {
    ...NOTHING_HEARD,
    code: textOf(record["message"]),
    provider: textOf(record["code"]),
    name: textOf(record["name"]),
  };
}

function isKnownKey(key: string, known: (key: string) => boolean): key is MessageKey {
  return known(key);
}

/**
 * The one reading of a refusal, in any dialect. `known` is the screen's
 * catalogue check (`useI18n().has`): a console door's own key is used only when
 * the catalogue holds it, so a key nobody translated is never drawn raw.
 */
export function readRefusal(
  input: unknown,
  family: RefusalFamily = {},
  known?: (key: string) => boolean,
): RefusalRead {
  const heard = hear(input);
  const generic = family.generic ?? GENERIC_REFUSAL_KEY;
  const read = (key: MessageKey, branch: RefusalBranch, tail?: string): RefusalRead => ({
    key,
    tail,
    field: heard.field,
    silent: false,
    branch,
  });
  if (heard.name === "StepUpCancelled") return { ...read(generic, "stepUp"), silent: true };
  if (heard.name === "StepUpUnavailable") return read(STEP_UP_UNAVAILABLE_KEY, "stepUp");
  const raw = heard.code?.trim() ?? "";
  if (raw !== "") {
    const { key: head, tail: ownTail } = splitRefusal(raw);
    const tail = ownTail ?? heard.detail;
    const words = family.words === undefined ? undefined : ownValue(family.words, head);
    if (words !== undefined) return read(words, "family", tail);
    if (known !== undefined && DOOR_KEY.test(head) && isKnownKey(head, known)) {
      return read(head, "doorKey", tail);
    }
    if (doorCode(raw).code !== null) {
      return read(family.generic ?? DOOR_REFUSED_KEY, "doorCode", tail);
    }
    const sentence = family.sentences?.find(([pattern]) => pattern.test(raw));
    if (sentence !== undefined) return read(sentence[1], "sentence");
  }
  if (heard.provider !== null && family.words !== undefined) {
    const words = ownValue(family.words, heard.provider);
    if (words !== undefined) return read(words, "provider");
  }
  return read(generic, "generic");
}

/** The words a screen draws for a refusal it read: translated, then filled. */
export function refusalText(
  read: RefusalRead,
  t: (key: MessageKey) => string,
  values?: Record<string, string | number>,
): string {
  if (read.silent) return "";
  const text = fillRefusal(t(read.key), read.tail);
  return values === undefined ? text : fill(text, values);
}
