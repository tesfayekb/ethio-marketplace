import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-934 (Foundations turn 34d) — A TEST'S INTERCEPTION ENDS WITH ITS PAGE. A route handler in
 * e2e/ that fetches the real answer (`route.fetch()`) can outlive its page — a reload, a
 * navigation, the test's end — and then throws from inside Playwright, failing the test in its
 * helper. Every such handler goes through `whilePageLives` (e2e/helpers/route-guard.ts); a file
 * whose handlers do not yet is held at its count by its allowlist line, which only falls.
 */

type Finding = { file: string; line: number; what: string };

/** The handler's own name for its route (its first parameter), when it has one. */
function routeName(handler: ts.ArrowFunction | ts.FunctionExpression): string | null {
  const first = handler.parameters[0];
  return first !== undefined && ts.isIdentifier(first.name) ? first.name.text : null;
}

/** Whether a handler's body calls `<its route>.fetch(…)`. */
function fetchesTheAnswer(handler: ts.ArrowFunction | ts.FunctionExpression): boolean {
  const name = routeName(handler);
  if (name === null) return false;
  let found = false;
  const look = (node: ts.Node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === "fetch" &&
      ts.isIdentifier(node.expression.expression) &&
      node.expression.expression.text === name
    )
      found = true;
    if (!found) ts.forEachChild(node, look);
  };
  look(handler.body);
  return found;
}

/** Each file's route handlers that fetch the real answer outside `whilePageLives`, by line. */
export function unguardedHandlers(files: string[]): Map<string, number[]> {
  const sites = new Map<string, number[]>();
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (
        !ts.isCallExpression(node) ||
        !ts.isPropertyAccessExpression(node.expression) ||
        node.expression.name.text !== "route"
      )
        return;
      const handler = node.arguments[1];
      if (handler === undefined) return;
      if (!ts.isArrowFunction(handler) && !ts.isFunctionExpression(handler)) return;
      if (!fetchesTheAnswer(handler)) return;
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      sites.set(file, [...(sites.get(file) ?? []), line]);
    });
  }
  return sites;
}

const ALLOWLIST = "scripts/conformance/route-guard-allowlist.txt";

const domain = walkFiles(["e2e"], { ext: ["ts"] });

describe("a test's interception ends with its page (INC-934)", () => {
  it(
    "CF-RG-1 every e2e route handler that fetches the real answer goes through whilePageLives, or its file's line holds it",
    () => {
      const sites = unguardedHandlers(domain);
      const keys = [...sites].map(([file, lines]) => `${file} (${lines.length})`);
      const allowed = readAllowlist(ALLOWLIST, keys);
      const findings: Finding[] = [];
      for (const [file, lines] of sites) {
        if (allowed.has(`${file} (${lines.length})`)) continue;
        for (const line of lines)
          findings.push({
            file,
            line,
            what: "a route handler fetches the real answer outside whilePageLives (e2e/helpers/route-guard.ts)",
          });
      }
      console.log(`[route-guard] files read: ${domain.length}; unguarded handlers: ${keys.length}`);
      expect(domain.length).toBeGreaterThan(0);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-RG-2 the census names a planted unguarded handler and passes a guarded one and one that never fetches", () => {
    const dir = "node_modules/.cache/route-guard";
    mkdirSync(dir, { recursive: true });
    const file = `${dir}/rg-planted.ts`;
    try {
      writeFileSync(
        file,
        [
          'import type { Page } from "@playwright/test";',
          'import { whilePageLives } from "../../../e2e/helpers/route-guard";',
          "export async function a(page: Page) {",
          '  await page.route("**/*.js", async (route) => {',
          "    const response = await route.fetch();",
          "    await route.fulfill({ response });",
          "  });",
          "  await page.route(",
          '    "**/*.css",',
          "    whilePageLives(async (route) => {",
          "      const response = await route.fetch();",
          "      await route.fulfill({ response });",
          "    }),",
          "  );",
          '  await page.route("**/*.png", (route) => route.abort("failed"));',
          "}",
          "",
        ].join("\n"),
      );
      expect([...unguardedHandlers([file])]).toEqual([[file, [4]]]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
