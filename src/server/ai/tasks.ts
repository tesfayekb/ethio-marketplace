import { z } from "zod";
import { ownValue } from "@/lib/own-key";
import { ICON_ALLOWLIST } from "@/server/category-images/icons";
import { AI_FEATURES, type AiFeature } from "./meter";

/** An image a task may send beside the text, type-allowlisted at the door. */
export type AiImage = { bytes: Uint8Array; mime: "image/jpeg" | "image/png" | "image/webp" };

/** The material a caller hands a task: text fields and lists of text. */
export type AiMaterial = Record<string, string | readonly string[]>;

/**
 * A declared material field (turn 16, CHANGE 4). `text` is one quoted string,
 * `lines` the same with single line breaks kept, `list` each item quoted on
 * its own `- ` line under the label (at most `maxItems`), `code` a value that
 * must match `allow` (a RegExp or a literal list) and is written unquoted,
 * otherwise the field's `fallback`. An empty optional field writes
 * `<label>: (none)` when `none` is set.
 */
export type AiField = {
  key: string;
  label: string;
  kind?: "text" | "lines" | "list" | "code";
  max: number;
  maxItems?: number;
  allow?: RegExp | readonly string[];
  fallback?: string;
  none?: boolean;
};

export type AiTask<O> = {
  id: string;
  version: number;
  feature: AiFeature;
  provider: "gemini-text";
  model: { env: string; fallback: string };
  timeoutMs: number;
  instruction: string;
  fields: readonly AiField[];
  images?: { max: number; maxBytes: number };
  output: z.ZodType<O>;
  responseSchema?: Record<string, unknown>;
  temperature?: number;
  fakeFlag: string;
  fake: (material: AiMaterial) => unknown;
  /** A second judgement on the parsed answer; false reads as an unusable answer. */
  validate?: (value: O) => boolean;
  onUnavailable?: "pass-unchecked";
};

/** Keeps each task's literal id and inferred output while checking the shape. */
function defineTask<I extends string, O>(task: AiTask<O> & { id: I }): AiTask<O> & { id: I } {
  return task;
}

const nameCheckOutput = z
  .object({ imitates: z.boolean(), of: z.string().trim().max(80).optional() })
  .strict();

const categoryIconOutput = z.object({ icon: z.string().trim().max(60) }).strict();

const ASSIST_TITLE_MAX = 120;
const ASSIST_DESCRIPTION_MAX = 1200;

/** Today's clamp: trim, fold whitespace runs to one space, cut to the field's ceiling. */
function clampAssist(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, max) : "";
}

/** The stored answer is today's bytes: the clamp first, then the bounds. */
function assistText(max: number) {
  return z
    .string()
    .transform((value) => value.trim().replace(/\s+/g, " ").slice(0, max))
    .pipe(z.string().min(1));
}

const writingHelperOutput = z
  .object({ title: assistText(ASSIST_TITLE_MAX), description: assistText(ASSIST_DESCRIPTION_MAX) })
  .strict();

/**
 * The instruction already forbids inventing contact details; this makes it
 * true: an e-mail address, a web address or a run of nine or more digits
 * (spaces, dots and dashes between them allowed) is an unusable answer.
 */
const CONTACT_DETAIL = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}|https?|www\.|(?:\d[ .-]?){9,}/i;

export const AI_TASKS = [
  defineTask({
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
    output: nameCheckOutput,
    temperature: 0,
    fakeFlag: "E2E_FAKE_ASSIST",
    fake: (material) => ({
      imitates: (ownValue(material, "alias") ?? "").toString().includes("cocacola"),
      of: "Coca-Cola",
    }),
    onUnavailable: "pass-unchecked",
  }),
  defineTask({
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
    output: categoryIconOutput,
    responseSchema: {
      type: "OBJECT",
      properties: { icon: { type: "STRING" } },
      required: ["icon"],
    },
    fakeFlag: "GEMINI_FAKE",
    fake: () => ({ icon: "Store" }),
  }),
  defineTask({
    id: "writing_helper",
    version: 1,
    feature: "writing_helper",
    provider: "gemini-text",
    model: { env: "GEMINI_TEXT_MODEL", fallback: "gemini-3.5-flash-lite" },
    timeoutMs: 20_000,
    // Today's SYSTEM_PROMPT (assist.ts), without its rule suffix — the template adds it.
    instruction: [
      "You write marketplace listing copy for a classifieds app.",
      "Write to sell: a natural, specific title and a persuasive but truthful description.",
      "You are given a category path, the facts the seller entered, the seller's own draft",
      "title and description, and up to three photos of the item.",
      "KEEP EVERY FACT AND PHRASE THE SELLER GAVE — their words win over your phrasing.",
      "Add nothing that is not visible in the photos or stated in the facts: never invent a",
      "condition, measurement, age, brand, history, price, delivery term, guarantee or contact detail.",
      "If a fact is missing, leave it out rather than guessing.",
      "Never state a price, an amount or a currency. You may say what the item is sold per, and that the price is negotiable, when the facts say so.",
      "If earlier suggestions are listed, take a clearly different angle from all of them.",
      `Return JSON only: {"title": string (max ${ASSIST_TITLE_MAX} characters), "description": string (max ${ASSIST_DESCRIPTION_MAX} characters)}.`,
      "Write both fields in the requested language.",
    ].join(" "),
    fields: [
      // A language code only (the page's own), else English: never a person's words.
      {
        key: "language",
        label: "Language",
        kind: "code",
        max: 8,
        allow: /^[a-z]{2}(-[A-Z]{2})?$/,
        fallback: "en",
      },
      { key: "category", label: "Category", kind: "text", max: 300 },
      { key: "facts", label: "Facts", kind: "list", max: 240, maxItems: 40, none: true },
      { key: "sellerTitle", label: "Seller's draft title", kind: "text", max: 200, none: true },
      {
        key: "sellerDescription",
        label: "Seller's draft description",
        kind: "lines",
        max: 5000,
        none: true,
      },
      {
        key: "photos",
        label: "Photos",
        kind: "code",
        max: 16,
        allow: /^(none|attached: [0-9]+)$/,
        fallback: "none",
      },
      {
        key: "previous",
        label: "Earlier suggestions to differ from",
        kind: "list",
        max: 1400,
        maxItems: 5,
      },
    ],
    images: { max: 3, maxBytes: 4_000_000 },
    output: writingHelperOutput,
    temperature: 0.7,
    fakeFlag: "E2E_FAKE_ASSIST",
    // Today's fakeAssist (assist.ts), moved here; its inputs arrive as material.
    fake: (material) => {
      const slug = ownValue(material, "slug");
      const facts = ownValue(material, "facts");
      const previous = ownValue(material, "previous");
      const sellerTitle = ownValue(material, "sellerTitle");
      const sellerDescription = ownValue(material, "sellerDescription");
      const factLines = Array.isArray(facts) ? facts : [];
      const attempt = (Array.isArray(previous) ? previous.length : 0) + 1;
      const ownTitle = typeof sellerTitle === "string" ? sellerTitle : "";
      const ownDescription = typeof sellerDescription === "string" ? sellerDescription : "";
      const slugText = typeof slug === "string" ? slug : "";
      const values = factLines
        .map((line) => line.split(": ").slice(1).join(": "))
        .filter((value) => value !== "");
      const own = [ownTitle, ownDescription].filter((entry) => entry !== "").join(" ");
      const title = clampAssist(
        `${slugText} ${ownTitle === "" ? values.slice(0, 2).join(" ") : ownTitle} (${attempt})`,
        ASSIST_TITLE_MAX,
      );
      const body =
        `Version ${attempt}. ${slugText}` +
        (own === "" ? "" : ` — ${own}`) +
        (values.length === 0 ? "" : ` · ${values.join(" · ")}`) +
        ". Nothing beyond these facts is claimed.";
      return { title, description: clampAssist(body, ASSIST_DESCRIPTION_MAX) };
    },
    validate: (value) => !CONTACT_DETAIL.test(value.title) && !CONTACT_DETAIL.test(value.description),
  }),
] as const;

const ids = new Set<string>();
for (const task of AI_TASKS) {
  if (
    ids.has(task.id) ||
    !AI_FEATURES.includes(task.feature) ||
    task.timeoutMs > 120_000 ||
    task.timeoutMs <= 0
  )
    throw new Error(`Invalid AI task registration: ${task.id}`);
  ids.add(task.id);
}

/** The registered task ids as a literal union: an unknown id is a compile error. */
export type TaskId = (typeof AI_TASKS)[number]["id"];

/** The output a task's schema infers, keyed by its id. */
export type OutputOf<T extends TaskId> = z.infer<
  Extract<(typeof AI_TASKS)[number], { id: T }>["output"]
>;

const BY_ID = new Map(AI_TASKS.map((task) => [task.id, task]));

/**
 * The registry's one cast, at the trust boundary: the map holds exactly the
 * tasks above, so the id a caller names is paired with that task's schema.
 */
export function taskOf<T extends TaskId>(id: T): AiTask<OutputOf<T>> & { id: T } {
  return BY_ID.get(id) as AiTask<OutputOf<T>> & { id: T };
}
