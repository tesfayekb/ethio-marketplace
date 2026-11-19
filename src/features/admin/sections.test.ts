import { expect, it } from "vitest";
import { amBase } from "@/i18n/locales/am-base";
import { enBase } from "@/i18n/locales/en-base";
import { ADMIN_GROUPS, ADMIN_SECTIONS, type AdminGroupId } from "./sections";

// ANM-1 (ACT-025) — a menu group's name tells what it holds: the group that
// holds the AI section names it, in English and in Amharic alike, so a person
// sees AI is inside without opening it.
it("ANM-1 the group holding the AI section names it in English and Amharic", () => {
  const ai = ADMIN_SECTIONS.find((section) => section.id === "ai");
  expect(ai).toBeDefined();
  if (!ai || !ai.group) return;
  const group = ADMIN_GROUPS[ai.group as AdminGroupId];
  for (const catalog of [enBase, amBase]) {
    const groupName: string = catalog[group.titleKey as keyof typeof catalog];
    const sectionTitle: string = catalog[ai.titleKey as keyof typeof catalog];
    expect(groupName).toContain(sectionTitle);
  }
});
