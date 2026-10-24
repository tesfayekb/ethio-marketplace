import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { DIALS } from "../../src/lib/dials";
import { codeOf, report, walkFiles } from "./kit";

/**
 * Foundations turn 8 (DEC-237) — THE DIAL CENSUS (DIAL-1…5). A rate dial is a
 * line of src/lib/dials.ts and is spent only through src/server/dials.ts
 * (`spend`/`peek`), or declared on a defineRoute `rate`. No allowlist.
 *
 * DIAL-1 bans the counting primitives and an env-read rate limit outside the
 * one spend; envDial calls whose literal name is not a rate dial (the upload's
 * photo count, byte and edge settings — not rate dials) are not this census's.
 * DIAL-3 finds an action invented outside the registry where an action is
 * named (an `action:`/`p_action:` value, or a quoted first argument of a
 * spend); the same words used as a refusal field are a route's contract, not a dial.
 */

const SPEND_HOME = "src/server/dials.ts";
const PRIMITIVE_HOME = "src/server/supabase/user-client.ts";
const REGISTRY = "src/lib/dials.ts";

const entries = Object.values(DIALS) as Array<{
  action: string;
  limit: { fallback: number; env?: string };
  countedBy?: "door";
}>;
const ACTIONS = new Set(entries.map((dial) => dial.action));
const ENVS = new Set(entries.flatMap((dial) => (dial.limit.env ? [dial.limit.env] : [])));

type Finding = { file: string; line: number; what: string };

/** The census of one file's text: primitive calls, rate env reads, invented actions. */
export function dialBypasses(file: string, text: string): Finding[] {
  const findings: Finding[] = [];
  if (file === REGISTRY) return findings;
  const code = codeOf(text);
  const lines = code.split("\n");
  lines.forEach((line, index) => {
    const at = { file, line: index + 1 };
    if (file !== SPEND_HOME && file !== PRIMITIVE_HOME) {
      if (/\b(?:consumeRate|peekRate)\s*\(/.test(line))
        findings.push({ ...at, what: "calls a counting primitive outside src/server/dials.ts" });
      for (const match of line.matchAll(/\benvDial\s*\(\s*["'`]([A-Z0-9_]+)["'`]/g)) {
        if (ENVS.has(match[1]) || /RATE_LIMIT|_PER_(?:HOUR|DAY|WEEK)/.test(match[1]))
          findings.push({ ...at, what: `reads the rate env ${match[1]} outside the registry` });
      }
    }
    for (const match of line.matchAll(
      /\b(?:p_)?action\s*:\s*["'`]([^"'`]+)["'`]|\b(?:consumeRate|peekRate|spend|peek)\s*\(\s*["'`]([^"'`]+)["'`]/g,
    )) {
      const action = match[1] ?? match[2];
      if (ACTIONS.has(action) || match[2] !== undefined)
        findings.push({ ...at, what: `names the dial action "${action}" outside the registry` });
    }
  });
  return findings;
}

const SRC_FILES = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true });

describe("the dial census (Foundations turn 8)", () => {
  it("DIAL-1 no counting primitive or rate env read outside src/server/dials.ts", () => {
    const found = SRC_FILES.flatMap((file) =>
      dialBypasses(file, readFileSync(file, "utf8")).filter(
        (finding) => !finding.what.startsWith("names"),
      ),
    );
    console.log(`[dials] DIAL-1 files: ${SRC_FILES.length}, findings: ${found.length}`);
    expect(report(found)).toBe("");
  });

  it("DIAL-2 every action and env name is unique and well formed", () => {
    const actions = entries.map((dial) => dial.action);
    const envs = entries.flatMap((dial) => (dial.limit.env ? [dial.limit.env] : []));
    expect(new Set(actions).size).toBe(actions.length);
    expect(new Set(envs).size).toBe(envs.length);
    for (const dial of entries) {
      // A door-counted entry carries the door's own action (catalog_find, SQL).
      const shape =
        dial.countedBy === "door"
          ? /^[a-z][a-z0-9_]*$/
          : /^[a-z][a-z0-9-]*(?::[a-z][a-z0-9-]*)?$/;
      expect(dial.action, dial.action).toMatch(shape);
      expect(Number.isInteger(dial.limit.fallback) && dial.limit.fallback >= 1).toBe(true);
    }
    for (const env of envs) expect(env).toMatch(/^[A-Z][A-Z0-9_]*$/);
    console.log(`[dials] DIAL-2 entries: ${entries.length}, envs: ${envs.length}`);
  });

  it("DIAL-3 every action the code names is the registry's, named only there", () => {
    const found = SRC_FILES.flatMap((file) =>
      dialBypasses(file, readFileSync(file, "utf8")).filter((finding) =>
        finding.what.startsWith("names"),
      ),
    );
    expect(report(found)).toBe("");
  });

  it("DIAL-4 a planted primitive call and a planted action are reported", () => {
    const planted = [
      'const rate = await consumeRate("x", key, 5, "1 hour");',
      'const peeked = await peekRate("x", key, 5, "1 hour");',
      'const limit = envDial("RATE_LIMIT_X_PER_HOUR", 5);',
      'rate: [{ action: "geocode", key: "user" }],',
      'await spend("upload", key);',
      '// consumeRate("in a comment", key) is not code',
    ].join("\n");
    const found = dialBypasses("src/routes/api/planted.ts", planted);
    expect(found.map((finding) => finding.line)).toEqual([1, 2, 3, 4, 5]);
    expect(dialBypasses(SPEND_HOME, planted.split("\n")[0])).toEqual([]);
  });

  it("DIAL-5 src/lib/dials.ts imports nothing", () => {
    const code = codeOf(readFileSync(REGISTRY, "utf8"));
    expect(code).not.toMatch(/\bimport\b|\brequire\s*\(/);
  });
});
