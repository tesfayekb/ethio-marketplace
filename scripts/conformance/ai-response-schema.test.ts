import { readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { codeOf, report, walkFiles } from "./kit";
import { providerSchemaOf } from "../../src/server/ai/response-schema";
import { AI_TASKS } from "../../src/server/ai/tasks";

/**
 * INC-1002 (turn J-1) — EVERY JSON TEXT TASK ASKS THE PROVIDER FOR ITS OWN OUTPUT'S SHAPE.
 * The gateway sends `providerSchemaOf(task.output)` to every `gemini-text` call, so the schema
 * cannot drift from the parse. The census fails when:
 *   - a `gemini-text` task's output cannot be derived (it would reach the provider unschema'd);
 *   - the gateway's text call does not pass `responseSchema: providerSchemaOf(task.output)`;
 *   - any other source file writes a `responseSchema` by hand (only the gateway and the
 *     provider adapter, which forwards it, name it).
 * No allowlist: a hand schema is the drift this guard exists to refuse.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const GATEWAY = "src/server/ai/gateway.ts";
const ADAPTER = "src/server/ai/providers/gemini.ts";
const DERIVED = /responseSchema:\s*providerSchemaOf\(task\.output\)/;

type Finding = { file: string; line: number; what: string };
type TaskLike = { id: string; provider: string; output: z.ZodType };

export function taskFindings(tasks: readonly TaskLike[]): Finding[] {
  const findings: Finding[] = [];
  for (const task of tasks) {
    if (task.provider !== "gemini-text") continue;
    try {
      providerSchemaOf(task.output);
    } catch (error) {
      findings.push({
        file: "src/server/ai/tasks.ts",
        line: 0,
        what: `${task.id}: no response schema (${(error as Error).message})`,
      });
    }
  }
  return findings;
}

export function sourceFindings(files: ReadonlyMap<string, string>): Finding[] {
  const findings: Finding[] = [];
  const gateway = files.get(GATEWAY);
  if (gateway === undefined || !DERIVED.test(codeOf(gateway)))
    findings.push({ file: GATEWAY, line: 0, what: "text call does not derive its responseSchema" });
  for (const [file, text] of files) {
    if (file === GATEWAY || file === ADAPTER) continue;
    const code = codeOf(text);
    const lines = code.split("\n");
    lines.forEach((line, index) => {
      if (/\bresponseSchema\s*:/.test(line))
        findings.push({ file, line: index + 1, what: "a hand-written responseSchema" });
    });
  }
  return findings;
}

function sourceTree(): Map<string, string> {
  const files = new Map<string, string>();
  for (const file of walkFiles([join(ROOT, "src")], { ext: ["ts", "tsx"] })) {
    const rel = relative(ROOT, file).split("\\").join("/");
    if (rel.endsWith(".test.ts") || rel.endsWith(".test.tsx")) continue;
    files.set(rel, readFileSync(file, "utf8"));
  }
  return files;
}

describe("ai-response-schema census (INC-1002)", () => {
  it("ARS-1: every gemini-text task derives its schema, and nothing writes one by hand", () => {
    const findings = [...taskFindings(AI_TASKS), ...sourceFindings(sourceTree())];
    expect(findings, report(findings)).toEqual([]);
  });

  it("ARS-2: a planted underivable task and a planted hand schema are both found", () => {
    const planted: TaskLike[] = [
      { id: "planted_text", provider: "gemini-text", output: z.object({ when: z.date() }) },
      { id: "planted_image", provider: "gemini-image", output: z.object({ when: z.date() }) },
    ];
    expect(taskFindings(planted).map((finding) => finding.what.split(":")[0])).toEqual([
      "planted_text",
    ]);
    const tree = new Map([
      [GATEWAY, "const a = { responseSchema: task.responseSchema };"],
      ["src/server/ai/tasks.ts", "defineTask({\n  responseSchema: { type: 'OBJECT' },\n});"],
    ]);
    expect(sourceFindings(tree).map((finding) => `${finding.file}:${finding.line}`)).toEqual([
      `${GATEWAY}:0`,
      "src/server/ai/tasks.ts:2",
    ]);
  });
});
