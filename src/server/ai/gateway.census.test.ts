import { readFileSync } from "node:fs";
import { relative } from "node:path";
import { describe, expect, it } from "vitest";
import { codeOf, readAllowlist, walkFiles } from "../../../scripts/conformance/kit";
import { AI_FEATURES } from "./meter";
import { AI_TASKS } from "./tasks";
import { migrationAiFeatures } from "./features-census";
import { render } from "./template";
import { UNTRUSTED_RULE } from "@/lib/untrusted-text";

/**
 * The provider and stand-in names the census watches for, in every spelling a
 * reader can use (turn 16, B5): `process.env.X`, `process.env["X"]` and
 * `process.env['X']`, a destructured `const { X } = process.env`,
 * `import.meta.env.X`, `serverEnv("X")`, `vi.stubEnv("X"` and
 * `standInMode("X")` — across line breaks.
 */
const NAMES =
  "(?:GEMINI_|PHOTOROOM_|GOOGLE_TRANSLATE_|OPENAI_|ANTHROPIC_|E2E_FAKE_|GEMINI_FAKE|AI_FAKE)[A-Z_0-9]*";
const NAME_ONLY = new RegExp(`^${NAMES}$`);

const AI_STAND_IN_FLAGS = [
  "E2E_FAKE_ASSIST",
  "E2E_FAKE_PHOTO_POLICY",
  "E2E_FAKE_BACKGROUND",
  "GEMINI_FAKE",
  "AI_FAKE",
];

function envNames(source: string): string[] {
  const found = new Set<string>();
  const forms: RegExp[] = [
    new RegExp(`process\\.env\\s*\\.\\s*(${NAMES})`, "g"),
    new RegExp(`process\\.env\\s*\\[\\s*["'](${NAMES})["']\\s*\\]`, "g"),
    new RegExp(`import\\.meta\\.env\\s*\\.\\s*(${NAMES})`, "g"),
    new RegExp(`(?:serverEnv|stubEnv|standInMode)\\(\\s*["'](${NAMES})["']`, "g"),
  ];
  for (const form of forms) {
    for (const match of source.matchAll(form)) found.add(match[1] ?? "");
  }
  for (const match of source.matchAll(/\{([\s\S]*?)\}\s*=\s*process\.env/g)) {
    for (const name of (match[1] ?? "").split(",")) {
      const clean = name.trim().split(/[:\s]/)[0] ?? "";
      if (NAME_ONLY.test(clean)) found.add(clean);
    }
  }
  found.delete("");
  // DEC-249 — the geocoder's flag is not an AI call and stays outside this census.
  found.delete("E2E_FAKE_GEOCODE");
  return [...found];
}

function findings(file: string, text: string): { host: boolean; env: string[]; standIn: boolean } {
  const source = codeOf(text);
  return {
    host:
      !file.startsWith("src/server/ai/providers/") &&
      /generativelanguage\.googleapis\.com|aiplatform\.googleapis\.com|translation\.googleapis\.com|sdk\.photoroom\.com|api\.openai\.com|api\.anthropic\.com|openrouter\.ai|api\.deepl\.com|:generateContent/.test(
        source,
      ),
    env:
      file.startsWith("src/server/ai/") || file === "src/server/stand-in.ts"
        ? []
        : envNames(source),
    standIn:
      !file.startsWith("src/server/ai/") &&
      new RegExp(`standInMode\\(\\s*["'](?:${AI_STAND_IN_FLAGS.join("|")})["']`).test(source),
  };
}

describe("AI gateway conformance", () => {
  const rows = walkFiles(["src", "e2e", "scripts"], { ext: ["ts", "tsx"], skipTests: true }).map(
    (file) => ({
      file: relative(process.cwd(), file) || file,
      ...findings(file, readFileSync(file, "utf8")),
    }),
  );
  const allowed = readAllowlist(
    "scripts/conformance/ai-gateway-allowlist.txt",
    rows.filter((row) => row.host || row.env.length > 0 || row.standIn).map((row) => row.file),
  );
  it("GWC-1 provider hosts live in adapters or the expiring allowlist", () => {
    expect(rows.filter((row) => row.host && !allowed.has(row.file))).toEqual([]);
  });
  it("GWC-2 provider keys/models and stand-in reads live under ai", () => {
    expect(rows.filter((row) => row.env.length > 0 && !allowed.has(row.file))).toEqual([]);
  });
  it("GWC-3 registered feature names match the newest migration", () => {
    expect([...AI_FEATURES].sort()).toEqual(migrationAiFeatures());
  });
  it("GWC-4 tasks bound deadlines and every string output and close instructions", () => {
    for (const task of AI_TASKS) {
      expect(task.timeoutMs).toBeLessThanOrEqual(120_000);
      const valid = task.fake({ alias: "cocacola", name: "Sofas" }) as Record<string, unknown>;
      expect(task.output.safeParse(valid).success).toBe(true);
      // An unknown key never survives the schema: refused outright (strict) or
      // stripped (the photo screen's object, whose responseSchema already names
      // every key).
      const withExtra = task.output.safeParse({ ...valid, extra: true });
      if (withExtra.success) {
        expect(withExtra.data).not.toHaveProperty("extra");
      }
      for (const [key, value] of Object.entries(valid)) {
        if (typeof value === "string") {
          // Bounded either by refusal or by the task's own clamp (the writing
          // helper's transform cuts to the field's ceiling before the bounds).
          const oversized = task.output.safeParse({ ...valid, [key]: "x".repeat(10_000) });
          if (oversized.success) {
            const stored = (oversized.data as Record<string, unknown>)[key];
            expect(typeof stored === "string" && stored.length < 10_000).toBe(true);
          }
        }
      }
      const system = render(task, {}).system;
      expect(system.endsWith(UNTRUSTED_RULE)).toBe(true);
      expect(system.split(UNTRUSTED_RULE)).toHaveLength(2);
    }
  });
  it("GWC-8 a non-Gemini provider declares images.all and an image output; every task with images declares max and maxBytes", () => {
    const problems = (task: (typeof AI_TASKS)[number]): string[] => {
      const found: string[] = [];
      if (task.provider !== "gemini-text") {
        if (task.images?.all !== true) found.push(`${task.id}: no images.all`);
        const image = task.output.safeParse({ bytes: new Uint8Array([1]), mime: "image/png" });
        if (!image.success) found.push(`${task.id}: no image output schema`);
        const text = task.output.safeParse({ text: "rendered as text" });
        if (text.success) found.push(`${task.id}: an image answer parses as text`);
      }
      if (task.images !== undefined) {
        if (!(task.images.max > 0)) found.push(`${task.id}: no images.max`);
        if (!(task.images.maxBytes > 0)) found.push(`${task.id}: no images.maxBytes`);
      }
      return found;
    };
    expect(AI_TASKS.flatMap((task) => problems(task))).toEqual([]);
    // The planted task: a Photoroom task without images.all and with a text
    // output is flagged on both counts.
    const planted = {
      ...AI_TASKS.find((task) => task.id === "background_removal")!,
      id: "planted_removal",
      images: { max: 1, maxBytes: 4_000_000 },
      output: AI_TASKS.find((task) => task.id === "name_check")!.output,
    };
    expect(problems(planted)).toEqual([
      "planted_removal: no images.all",
      "planted_removal: no image output schema",
    ]);
  });
  it("GWC-5 planted provider call and secret read are both reported", () => {
    const planted =
      'fetch("https://generativelanguage.googleapis.com/v1beta/models/x:generateContent", { headers: { key: process.env.GEMINI_API_KEY } });';
    const found = findings("src/server/planted.ts", planted);
    expect(found.host).toBe(true);
    expect(found.env).toEqual(["GEMINI_API_KEY"]);
  });
  it("GWC-6 every stand-in call with an AI flag outside the gateway is allowlisted", () => {
    expect(rows.filter((row) => row.standIn && !allowed.has(row.file))).toEqual([]);
  });
  it("GWC-7 a planted file holding each env-read form once is reported once per form", () => {
    const planted = [
      "const a = process.env.GEMINI_API_KEY;",
      'const b = process.env["PHOTOROOM_API_KEY"];',
      "const c = process.env['GOOGLE_TRANSLATE_API_KEY'];",
      "const { OPENAI_KEY } = process.env;",
      "const d = import.meta.env.GEMINI_FAKE;",
      'serverEnv("ANTHROPIC_API_KEY");',
      'vi.stubEnv("E2E_FAKE_ASSIST", "1");',
      'standInMode("AI_FAKE");',
    ].join("\n");
    expect(findings("src/server/planted.ts", planted).env.sort()).toEqual(
      [
        "GEMINI_API_KEY",
        "PHOTOROOM_API_KEY",
        "GOOGLE_TRANSLATE_API_KEY",
        "OPENAI_KEY",
        "GEMINI_FAKE",
        "ANTHROPIC_API_KEY",
        "E2E_FAKE_ASSIST",
        "AI_FAKE",
      ].sort(),
    );
  });
});
