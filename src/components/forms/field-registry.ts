import type { MessageKey } from "@/i18n";
import { ownValue } from "@/lib/own-key";

/**
 * DEC-339 — A FORM'S FIELDS, BY THE DOOR'S NAMES. Each door's client keeps its
 * own registry beside it (posting's in `src/features/posting/field-refusals.ts`):
 * the field's words, and the step that draws it when the form has steps. A
 * refusal names its field by the same name, so it lands on its own control.
 */
export type FieldEntry = { readonly label?: MessageKey; readonly step?: number };

export type FieldRegistry = Readonly<Record<string, FieldEntry>>;

/** The registry's entry for a field the door named, or undefined. */
export function registeredField(registry: FieldRegistry, field: string): FieldEntry | undefined {
  return ownValue(registry, field);
}
