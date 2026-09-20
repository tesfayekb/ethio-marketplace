import { optionLabel, type AttrOption } from "./attribute-options";
import type { AttrDef } from "./posting-service";

export function attributeDisplayValue(
  definition: AttrDef,
  value: unknown,
  options: AttrOption[],
  language: string,
  yes: string,
  no: string,
): string {
  if (definition.attrType === "boolean") return value === true ? yes : no;

  const labels = new Map(options.map((option) => [option.value, optionLabel(option, language)]));
  const renderOne = (entry: unknown): string => {
    if (entry !== null && typeof entry === "object" && !Array.isArray(entry)) {
      const other = entry as { value?: unknown; text?: unknown };
      if (other.value === "other" && typeof other.text === "string") return other.text;
    }
    const raw = String(entry);
    return labels.get(raw) ?? raw;
  };

  const rendered = Array.isArray(value) ? value.map(renderOne).join(", ") : renderOne(value);
  return definition.unit === null || definition.unit === ""
    ? rendered
    : `${rendered} ${definition.unit}`;
}