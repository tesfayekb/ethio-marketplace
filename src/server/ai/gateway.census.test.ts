import { readFileSync } from "node:fs";
import { relative } from "node:path";
import { describe, expect, it } from "vitest";
import { codeOf, readAllowlist, walkFiles } from "../../../scripts/conformance/kit";
import { AI_FEATURES } from "./meter";
import { AI_TASKS } from "./tasks";
import { migrationAiFeatures } from "./features-census";
import { render } from "./template";
import { UNTRUSTED_RULE } from "@/lib/untrusted-text";

function findings(file: string, text: string): { host: boolean; env: boolean } {
  const source = codeOf(text);
  return {
    host: !file.startsWith("src/server/ai/providers/") && /generativelanguage\.googleapis\.com|aiplatform\.googleapis\.com|translation\.googleapis\.com|sdk\.photoroom\.com|api\.openai\.com|api\.anthropic\.com|openrouter\.ai|api\.deepl\.com|:generateContent/.test(source),
    env: !file.startsWith("src/server/ai/") && /(?:process\.env|(?:serverEnv|stubEnv)\()[^\n]*(?:GEMINI_|PHOTOROOM_|GOOGLE_TRANSLATE_|OPENAI_|ANTHROPIC_|E2E_FAKE_|GEMINI_FAKE|AI_FAKE)/.test(source),
  };
}

describe("AI gateway conformance", () => {
  const rows = walkFiles(["src", "e2e", "scripts"], { ext: ["ts", "tsx"], skipTests: true }).map((file) => ({ file: relative(process.cwd(), file) || file, ...findings(file, readFileSync(file, "utf8")) }));
  const allowed = readAllowlist("scripts/conformance/ai-gateway-allowlist.txt", rows.filter((row) => row.host || row.env).map((row) => row.file));
  it("GWC-1 provider hosts live in adapters or the expiring allowlist", () => {
    expect(rows.filter((row) => row.host && !allowed.has(row.file))).toEqual([]);
  });
  it("GWC-2 provider keys/models and stand-in reads live under ai", () => {
    expect(rows.filter((row) => row.env && !allowed.has(row.file))).toEqual([]);
  });
  it("GWC-3 registered feature names match the newest migration", () => {
    expect([...AI_FEATURES].sort()).toEqual(migrationAiFeatures());
  });
  it("GWC-4 tasks bound deadlines and every string output and close instructions", () => {
    for (const task of AI_TASKS) {
      expect(task.timeoutMs).toBeLessThanOrEqual(120_000);
      const valid = task.fake({ alias: "cocacola", name: "Sofas" });
      expect(task.output.safeParse(valid).success).toBe(true);
      expect(task.output.safeParse({ ...valid, extra: true }).success).toBe(false);
      for (const [key, value] of Object.entries(valid)) {
        if (typeof value === "string") expect(task.output.safeParse({ ...valid, [key]: "x".repeat(10_000) }).success).toBe(false);
      }
      const system = render(task, {}).system;
      expect(system.endsWith(UNTRUSTED_RULE)).toBe(true);
      expect(system.split(UNTRUSTED_RULE)).toHaveLength(2);
    }
  });
  it("GWC-5 planted provider call and secret read are both reported", () => {
    const planted = 'fetch("https://generativelanguage.googleapis.com/v1beta/models/x:generateContent", { headers: { key: process.env.GEMINI_API_KEY } });';
    expect(findings("src/server/planted.ts", planted)).toEqual({ host: true, env: true });
  });
});