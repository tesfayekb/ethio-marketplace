import { z } from "zod";
import { ownValue } from "@/lib/own-key";
import { ICON_ALLOWLIST } from "@/server/category-images/icons";
import { AI_FEATURES, type AiFeature } from "./meter";

export type AiTask<O> = {
  id: string;
  version: number;
  feature: AiFeature;
  provider: "gemini-text";
  model: { env: string; fallback: string };
  timeoutMs: number;
  instruction: string;
  fields: readonly { key: string; label: string; max: number; lines?: boolean }[];
  output: z.ZodType<O>;
  responseSchema?: Record<string, unknown>;
  temperature?: number;
  fakeFlag: string;
  fake: (material: Record<string, string>) => unknown;
  onUnavailable?: "pass-unchecked";
};

export const AI_TASKS = [
  {
    id: "name_check",
    version: 1,
    feature: "name_check",
    provider: "gemini-text",
    model: { env: "GEMINI_TEXT_MODEL", fallback: "gemini-3.5-flash-lite" },
    timeoutMs: 15_000,
    instruction: [
      "Does this marketplace seller name imitate or impersonate a well-known company,",
      "brand, bank, government body or public figure?",
      'Answer JSON only: {"imitates": boolean, "of": string}.',
      "Answer false for ordinary personal names, generic words and small local shops.",
    ].join(" "),
    fields: [{ key: "alias", label: "Seller name", max: 120 }],
    output: z.object({ imitates: z.boolean(), of: z.string().trim().max(80).optional() }).strict(),
    temperature: 0,
    fakeFlag: "E2E_FAKE_ASSIST",
    fake: (material: Record<string, string>) => ({
      imitates: (ownValue(material, "alias") ?? "").includes("cocacola"),
      of: "Coca-Cola",
    }),
    onUnavailable: "pass-unchecked",
  },
  {
    id: "category_icon",
    version: 1,
    feature: "category_icons",
    provider: "gemini-text",
    model: { env: "GEMINI_TEXT_MODEL", fallback: "gemini-3.5-flash-lite" },
    timeoutMs: 15_000,
    instruction: [
      "Pick the single best lucide-react icon for an online marketplace category.",
      `Allowed names: ${ICON_ALLOWLIST.join(", ")}.`,
      'Answer with JSON only: {"icon": "<one name from the allowed list>"}.',
    ].join(" "),
    fields: [
      { key: "name", label: "Category name", max: 120 },
      { key: "parent", label: "Parent section", max: 120 },
    ],
    output: z.object({ icon: z.string().trim().max(60) }).strict(),
    responseSchema: {
      type: "OBJECT",
      properties: { icon: { type: "STRING" } },
      required: ["icon"],
    },
    fakeFlag: "GEMINI_FAKE",
    fake: () => ({ icon: "Store" }),
  },
] satisfies readonly AiTask<unknown>[];

const ids = new Set<string>();
for (const task of AI_TASKS) {
  if (ids.has(task.id) || !AI_FEATURES.includes(task.feature) || task.timeoutMs > 120_000 || task.timeoutMs <= 0)
    throw new Error(`Invalid AI task registration: ${task.id}`);
  ids.add(task.id);
}

export function taskOf(id: string): AiTask<unknown> | undefined {
  return AI_TASKS.find((task) => task.id === id);
}