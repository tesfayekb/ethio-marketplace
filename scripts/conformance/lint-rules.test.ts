import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { ESLint } from "eslint";
import { describe, expect, it } from "vitest";
import { RESTRICTED_SYNTAX } from "../../eslint.config.js";
import { TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * Foundations turn 21 (INC-891) — one list per lint concern. ESLint flat
 * config REPLACES a rule's options for a file, so a later block that sets
 * `no-restricted-syntax` silently drops every selector an earlier block gave
 * the same file. The owed table below says which RESTRICTED_SYNTAX lists each
 * file owes; CF-LINT-1/2 read every file's computed config, CF-LINT-3 lints a
 * planted breach. No allowlist: the two caughtError exemptions are INC-815's
 * own rule.
 */

type ListName = keyof typeof RESTRICTED_SYNTAX;

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

/** The owed table: which lists a root-relative path must carry. */
export function owedLists(file: string): ListName[] {
  if (file.startsWith("e2e/")) return ["specLint"];
  if (/\.test\.tsx?$/.test(file) || file === "src/lib/lovable-error-reporting.ts")
    return ["typedClient"];
  return ["typedClient", "caughtError"];
}

/** The owed lists any of whose selectors is absent from `selectors`. */
export function missingLists(owed: ListName[], selectors: string[]): ListName[] {
  const present = new Set(selectors);
  return owed.filter((name) =>
    RESTRICTED_SYNTAX[name].some((entry) => !present.has(entry.selector)),
  );
}

function selectorsOf(config: { rules?: Record<string, unknown> } | undefined): string[] {
  const rule = config?.rules?.["no-restricted-syntax"];
  if (!Array.isArray(rule)) return [];
  return rule
    .slice(1)
    .map((entry: unknown) =>
      typeof entry === "string"
        ? entry
        : typeof entry === "object" && entry !== null && "selector" in entry
          ? String((entry as { selector: unknown }).selector)
          : "",
    );
}

async function breaches(roots: string[]): Promise<string[]> {
  const eslint = new ESLint({ cwd: ROOT });
  const found: string[] = [];
  for (const full of walkFiles(
    roots.map((r) => join(ROOT, r)),
    { ext: ["ts", "tsx"] },
  )) {
    const rel = relative(ROOT, full).split("\\").join("/");
    if (await eslint.isPathIgnored(full)) continue;
    const missing = missingLists(owedLists(rel), selectorsOf(await eslint.calculateConfigForFile(full)));
    if (missing.length) found.push(`${rel}: ${missing.join(", ")}`);
  }
  return found;
}

const PLANTED = "export function planted(e: unknown): boolean {\n  return e instanceof Error;\n}\n";

async function inc815At(path: string): Promise<boolean> {
  const eslint = new ESLint({ cwd: ROOT });
  const [result] = await eslint.lintText(PLANTED, { filePath: join(ROOT, path) });
  return result.messages.some(
    (m) => m.ruleId === "no-restricted-syntax" && m.message.startsWith("INC-815:"),
  );
}

describe("lint rules reach every file they owe (INC-891)", () => {
  it(
    "CF-LINT-1 every src file carries every list the owed table gives it",
    async () => {
      expect(await breaches(["src"])).toEqual([]);
    },
    TREE_SCAN_MS,
  );

  it(
    "CF-LINT-2 every e2e file carries specLint",
    async () => {
      expect(await breaches(["e2e"])).toEqual([]);
    },
    TREE_SCAN_MS,
  );

  it(
    "CF-LINT-3 a planted instanceof Error is refused at a screen, a route and a server path",
    async () => {
      expect(await inc815At("src/features/planted-lint.ts")).toBe(true);
      expect(await inc815At("src/routes/planted-lint.tsx")).toBe(true);
      expect(await inc815At("src/server/planted-lint.ts")).toBe(true);
      expect(await inc815At("src/features/planted-lint.test.ts")).toBe(false);
      expect(missingLists(["caughtError"], [])).toEqual(["caughtError"]);
    },
    TREE_SCAN_MS,
  );
});
