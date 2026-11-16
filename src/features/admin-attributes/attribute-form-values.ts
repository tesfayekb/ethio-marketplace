import type { FormGate } from "@/components/forms/use-form-gate";
import { parseNumber } from "@/lib/parse-input";
import type { Refusal } from "@/lib/refusal";

/**
 * DEC-339 (wave 3) — THE ATTRIBUTE EDITOR'S TYPED ANSWERS, read by the one parser
 * (src/lib/parse-input.ts). Each answer is blank (null to the door, as before),
 * a number, or refused under its own Field (`badType`) — never a silent null, a
 * NaN or a guessed value. The door still judges every value it receives (F3).
 */

/** The editor's answers a refusal can sit under, by the door's field name. */
export type AttributeFormField = "attrKey" | "nameEn" | "decimals" | "maxLength";

export type AttributeFormRefusals = Partial<Record<AttributeFormField, Refusal>>;

const FORM_FIELDS: Record<AttributeFormField, true> = {
  attrKey: true,
  nameEn: true,
  decimals: true,
  maxLength: true,
};

/** A number's decimals and a text's longest length: whole numbers of at least 0, or blank. */
export function readAttributeNumbers(raw: {
  decimals: string;
  maxLength: string;
}):
  | { ok: true; decimals: number | null; maxLength: number | null }
  | { ok: false; refusals: AttributeFormRefusals } {
  const decimals = parseNumber(raw.decimals, { integer: true, min: 0 });
  const maxLength = parseNumber(raw.maxLength, { integer: true, min: 0 });
  const refusals: AttributeFormRefusals = {};
  if (decimals.kind === "invalid") refusals.decimals = { field: "decimals", reason: "badType" };
  if (maxLength.kind === "invalid") refusals.maxLength = { field: "maxLength", reason: "badType" };
  if (decimals.kind === "invalid" || maxLength.kind === "invalid") return { ok: false, refusals };
  return {
    ok: true,
    decimals: decimals.kind === "number" ? decimals.value : null,
    maxLength: maxLength.kind === "number" ? maxLength.value : null,
  };
}

/** The gate's marks and the parser's refusals, one per field (the parser's wins once tried). */
export function attributeRefusals(
  gate: FormGate,
  parsed: AttributeFormRefusals,
): AttributeFormRefusals {
  const marked: AttributeFormRefusals = {};
  for (const mark of gate.marks) {
    if (mark.field in FORM_FIELDS) marked[mark.field as AttributeFormField] = mark;
  }
  return { ...marked, ...parsed };
}

/**
 * A link's default value, typed for its attribute: a number through the one parser
 * (an unreadable one is refused under the default's Field, never `Number(raw)`'s NaN),
 * a boolean, a multi-select's values, or the text itself. Only called for a non-blank
 * answer: a blank default clears the cell.
 */
export function readLinkDefault(
  type: string,
  raw: string,
): { ok: true; value: unknown } | { ok: false; refusal: Refusal } {
  if (type === "number") {
    const parsed = parseNumber(raw);
    if (parsed.kind !== "number") {
      return { ok: false, refusal: { field: "defaultValue", reason: "badType" } };
    }
    return { ok: true, value: parsed.value };
  }
  if (type === "boolean") return { ok: true, value: raw === "true" };
  if (type === "multi_select") return { ok: true, value: raw.split("|").filter(Boolean) };
  return { ok: true, value: raw };
}
