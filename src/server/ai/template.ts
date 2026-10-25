import { ownValue } from "@/lib/own-key";
import { untrustedText, withUntrustedRule } from "@/lib/untrusted-text";
import type { AiTask } from "./tasks";

export function render(
  task: AiTask<unknown>,
  material: Record<string, string>,
): { system: string; user: string } {
  return {
    system: withUntrustedRule(task.instruction),
    user: task.fields
      .flatMap((field) => {
        const value = ownValue(material, field.key);
        return value === undefined || value === ""
          ? []
          : [untrustedText(field.label, value, field.max, { lines: field.lines })];
      })
      .join("\n"),
  };
}
