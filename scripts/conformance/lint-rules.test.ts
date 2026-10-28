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

/** Every file under the roots that lacks a list it owes, and how many files were read (a census
 * that reads nothing passes nothing — the floor below each test). */
async function breaches(roots: string[]): Promise<{ read: number; found: string[] }> {
  const eslint = new ESLint({ cwd: ROOT });
  const found: string[] = [];
  let read = 0;
  for (const full of walkFiles(
    roots.map((r) => join(ROOT, r)),
    { ext: ["ts", "tsx"] },
  )) {
    const rel = relative(ROOT, full).split("\\").join("/");
    if (await eslint.isPathIgnored(full)) continue;
    read += 1;
    const missing = missingLists(
      owedLists(rel),
      selectorsOf(await eslint.calculateConfigForFile(full)),
    );
    if (missing.length) found.push(`${rel}: ${missing.join(", ")}`);
  }
  return { read, found };
}

/** About half of each tree's files at Foundations turn K3 (src 890, e2e 118): far below any honest
 * count, far above zero — the census fails when its walk reads (almost) nothing. */
const SRC_FLOOR = 400;
const E2E_FLOOR = 50;

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
      const { read, found } = await breaches(["src"]);
      // the floor: a list that matches no file must not pass (records owed, roadmap — CF-LINT floor)
      expect(read).toBeGreaterThan(SRC_FLOOR);
      expect(found).toEqual([]);
    },
    TREE_SCAN_MS,
  );

  it(
    "CF-LINT-2 every e2e file carries specLint",
    async () => {
      const { read, found } = await breaches(["e2e"]);
      expect(read).toBeGreaterThan(E2E_FLOOR);
      expect(found).toEqual([]);
    },
    TREE_SCAN_MS,
  );

  it(
    "CF-LINT-4 a census that reads no file stays under its floor (the floor is what fails it)",
    async () => {
      const empty = await breaches(["docs"]);
      expect(empty).toEqual({ read: 0, found: [] });
      expect(empty.read).toBeLessThanOrEqual(E2E_FLOOR);
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
