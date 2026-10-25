import { ownValue } from "@/lib/own-key";
import { untrustedLine, untrustedText, withUntrustedRule } from "@/lib/untrusted-text";
import type { AiField, AiMaterial, AiTask } from "./tasks";

/**
 * One material field, rendered by its kind (turn 16, CHANGE 4): a person's
 * words are always quoted material; only a `code` field (a value the field's
 * own `allow` accepts, else its fallback) is written unquoted.
 */
function renderField(field: AiField, material: AiMaterial): string[] {
  const value = ownValue(material, field.key);
  const kind = field.kind ?? "text";
  if (kind === "code") {
    const text = typeof value === "string" ? value.trim() : "";
    const allowed =
      text !== "" &&
      text.length <= field.max &&
      (field.allow instanceof RegExp
        ? field.allow.test(text)
        : field.allow !== undefined && field.allow.includes(text));
    return [`${field.label}: ${allowed ? text : (field.fallback ?? "")}`];
  }
  if (kind === "list") {
    const items = (
      Array.isArray(value) ? value : typeof value === "string" && value !== "" ? [value] : []
    ).slice(0, field.maxItems ?? 20);
    if (items.length === 0) return field.none === true ? [`${field.label}: (none)`] : [];
    return [`${field.label}:`, ...items.map((item) => `- ${untrustedLine(item, field.max)}`)];
  }
  if (value === undefined || value === "" || Array.isArray(value)) {
    return field.none === true ? [`${field.label}: (none)`] : [];
  }
  return [untrustedText(field.label, value, field.max, { lines: kind === "lines" })];
}

/** The task's instruction under the one rule, and its declared fields in order. */
export function render(
  task: Pick<AiTask<unknown>, "instruction" | "fields">,
  material: AiMaterial,
): { system: string; user: string } {
  return {
    system: withUntrustedRule(task.instruction),
    user: task.fields.flatMap((field) => renderField(field, material)).join("\n"),
  };
}
