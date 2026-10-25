import { z } from "zod";

import { UUID_RE } from "./primitives";

/**
 * Foundations turn 19 — POST /api/translate, the body shape (CHANGE 3).
 * Today's checks, in today's order, as one strict schema: the scope, the
 * target language, the item list, then each item — its note, its key and
 * source, and for the entity scope its address. The route's badShape speaks
 * the first issue in today's words; `issueWord` is that table.
 */

export const TRANSLATE_MAX_ITEMS = 600;
export const TRANSLATE_CONTEXT_MAX = 500;
export const TRANSLATE_TARGET = /^[a-z]{2,8}(-[a-z]{2,8})?$/;
export const TRANSLATE_ENTITY_TYPES = ["category", "location", "attribute"] as const;

export type TranslateEntityType = (typeof TRANSLATE_ENTITY_TYPES)[number];

const item = z
  .object({
    /** U4i ① — the key's translator note: carried to the provider boundary, never sent by v2. */
    context: z.string().max(TRANSLATE_CONTEXT_MAX).optional(),
    key: z.string(),
    source: z.string(),
    /** The entity scope's address; a UI item's are ignored, as today. */
    type: z.unknown().optional(),
    id: z.unknown().optional(),
    field: z.unknown().optional(),
  })
  .strict();

type RawItem = z.infer<typeof item>;

function entityOf(raw: RawItem): { type: TranslateEntityType; id: string; field: string } | null {
  const type = TRANSLATE_ENTITY_TYPES.find((known) => known === raw.type);
  if (type === undefined) return null;
  if (typeof raw.id !== "string" || !UUID_RE.test(raw.id)) return null;
  if (typeof raw.field !== "string" || raw.field === "") return null;
  return { type, id: raw.id, field: raw.field };
}

export const TranslateBody = z
  .object({
    scope: z.enum(["ui", "entity"]).optional(),
    // Today's normalisation: trimmed and lower-cased before the code check.
    target_lang: z.string().trim().toLowerCase().pipe(z.string().regex(TRANSLATE_TARGET)),
    items: z.array(item).min(1).max(TRANSLATE_MAX_ITEMS),
  })
  .strict()
  .superRefine((body, ctx) => {
    if (body.scope !== "entity") return;
    body.items.forEach((raw, index) => {
      if (entityOf(raw) === null) {
        ctx.addIssue({ code: "custom", path: ["items", index, "type"], message: "entity" });
      }
    });
  })
  .transform((body) => ({
    scope: body.scope ?? "ui",
    target: body.target_lang,
    items: body.items.map((raw) => ({
      key: raw.key,
      source: raw.source,
      ...(raw.context === undefined ? {} : { context: raw.context }),
      entity: body.scope === "entity" ? entityOf(raw) : null,
    })),
  }));

export type TranslateRequest = z.output<typeof TranslateBody>;

/**
 * CHANGE (4) — a per-item failure's reason: a fixed code, never a provider's
 * or Postgres's text (INC-447). The route writes them; the console maps them.
 */
export type TranslateReason =
  | "providerUnavailable"
  | "providerNoText"
  | "permission"
  | "stepUp"
  | "scope"
  | "baseLocked"
  | "unknownTarget"
  | "emptyValue"
  | "writerFailed";

/**
 * Today's refusal words for the first issue (path as `a.b.c`, zod's code),
 * with today's status: 413 for too many items, else 400.
 */
export function issueWord(issue: { path: string; code: string }): {
  error: string;
  status: 400 | 413;
} {
  const [head, index, field] = issue.path.split(".");
  if (issue.code === "invalid_json" || head === "" || head === undefined) {
    return { error: "invalid json body", status: 400 };
  }
  if (head === "scope") return { error: "invalid scope", status: 400 };
  if (head === "target_lang") return { error: "invalid target_lang", status: 400 };
  if (index === undefined) {
    return issue.code === "too_big"
      ? { error: `too many items (max ${TRANSLATE_MAX_ITEMS})`, status: 413 }
      : { error: "no items", status: 400 };
  }
  if (field === "context") {
    return issue.code === "too_big"
      ? { error: `context too long (max ${TRANSLATE_CONTEXT_MAX})`, status: 400 }
      : { error: "context must be a string", status: 400 };
  }
  if (field === "type" && issue.code === "custom") {
    return { error: "invalid entity item shape", status: 400 };
  }
  return { error: "invalid item shape", status: 400 };
}
