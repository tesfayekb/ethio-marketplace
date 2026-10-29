import { describe, expect, it } from "vitest";
import { z } from "zod";
import { providerSchemaOf, ResponseSchemaUnderivable } from "./response-schema";
import { AI_TASKS, taskOf } from "./tasks";

/** Today's hand-written schemas at 9a262ea3 (tasks.ts), copied by script. */
const CATEGORY_ICON_9A262EA3 = {
  type: "OBJECT",
  properties: { icon: { type: "STRING" } },
  required: ["icon"],
};
const PHOTO_SCREEN_9A262EA3 = {
  type: "OBJECT",
  properties: {
    allowed: { type: "BOOLEAN" },
    code: { type: "STRING" },
    evidence: { type: "STRING" },
    warnings: { type: "ARRAY", items: { type: "STRING" } },
  },
  required: ["allowed", "code", "evidence"],
};

describe("providerSchemaOf (INC-1002)", () => {
  it("AIRS-1: every gemini-text task's output derives a schema", () => {
    const text = AI_TASKS.filter((task) => task.provider === "gemini-text");
    expect(text.map((task) => task.id).sort()).toEqual(
      ["category_icon", "name_check", "photo_screen", "writing_helper"].sort(),
    );
    for (const task of text) expect(providerSchemaOf(task.output).type).toBe("OBJECT");
  });

  it("AIRS-2: the derived category_icon and photo_screen equal today's literals byte for byte", () => {
    expect(JSON.stringify(providerSchemaOf(taskOf("category_icon").output))).toBe(
      JSON.stringify(CATEGORY_ICON_9A262EA3),
    );
    expect(JSON.stringify(providerSchemaOf(taskOf("photo_screen").output))).toBe(
      JSON.stringify(PHOTO_SCREEN_9A262EA3),
    );
  });

  it("AIRS-3: name_check asks for imitates, with of optional; writing_helper from its input side", () => {
    expect(providerSchemaOf(taskOf("name_check").output)).toEqual({
      type: "OBJECT",
      properties: { imitates: { type: "BOOLEAN" }, of: { type: "STRING" } },
      required: ["imitates"],
    });
    expect(providerSchemaOf(taskOf("writing_helper").output)).toEqual({
      type: "OBJECT",
      properties: { title: { type: "STRING" }, description: { type: "STRING" } },
      required: ["title", "description"],
    });
  });

  it("AIRS-4: name_check reads of: null as absent, and still refuses an extra key", () => {
    const output = taskOf("name_check").output;
    const parsed = output.safeParse({ imitates: false, of: null });
    expect(parsed.success).toBe(true);
    expect(parsed.success && "of" in parsed.data && parsed.data.of !== undefined).toBe(false);
    expect(output.safeParse({ imitates: false, of: "", reason: "x" }).success).toBe(false);
    expect(output.safeParse({ imitates: true, of: "Coca-Cola" }).success).toBe(true);
  });

  it("AIRS-5: an underivable shape throws, never a silent no-schema", () => {
    expect(() => providerSchemaOf(z.object({ when: z.date() }))).toThrow(ResponseSchemaUnderivable);
    expect(() => providerSchemaOf(z.string())).toThrow(ResponseSchemaUnderivable);
  });
});
