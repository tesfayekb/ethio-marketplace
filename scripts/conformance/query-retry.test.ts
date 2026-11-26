import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-1288 (cursor bundle 7b) — A RETRY ONLY WHEN IT CAN SUCCEED. The one rule lives in the query
 * client (src/features/auth/session-query-client.ts): a failure is retried only when its kind is
 * retryable, and a query's own count only bounds it. CF-RETRY-1 fails a query option `retry` set to
 * a function or to `true` anywhere in browser code (a function is a second rule, `true` retries
 * without end); a count, `false` or a named value passes. CF-RETRY-2 fails a second
 * `new QueryClient(` — a client without the rule. No allowlist.
 */

const CLIENT = "src/features/auth/session-query-client.ts";

type Finding = { file: string; line: number; what: "retry" | "client" };

function findings(files: string[]): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      const at = () => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      if (
        ts.isPropertyAssignment(node) &&
        (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) &&
        node.name.text === "retry" &&
        (ts.isArrowFunction(node.initializer) ||
          ts.isFunctionExpression(node.initializer) ||
          node.initializer.kind === ts.SyntaxKind.TrueKeyword)
      )
        found.push({ file, line: at(), what: "retry" });
      if (
        ts.isNewExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "QueryClient"
      )
        found.push({ file, line: at(), what: "client" });
    });
  }
  return found;
}

// The route handlers answer JSON (`{ retry: true }` is a body, not a query option) and the server
// render keeps no query cache of its own.
const domain = walkFiles(["src"], {
  ext: ["ts", "tsx"],
  skipTests: true,
  skip: /^src\/(?:server\/|routes\/api\/)|\.server\.tsx?$/,
});
const census = findings(domain);
// The rule's own wrapper sets `retry` to the function that applies it.
const OWN = (hit: Finding) => hit.file === CLIENT;

describe("a retry only when it can succeed (INC-1288)", () => {
  it(
    "CF-RETRY-1 no query option retry is a function or true",
    () => {
      const hits = census.filter((hit) => hit.what === "retry" && !OWN(hit));
      console.log(`[CF-RETRY-1] retry sites outside the client: ${hits.length}`);
      expect(report(hits)).toBe("");
    },
    TREE_SCAN_MS,
  );
  it("CF-RETRY-2 no second QueryClient is constructed outside the query client (it would carry no rule)", () => {
    const hits = census.filter((hit) => hit.what === "client");
    expect(
      report(hits.filter((hit) => hit.file !== "src/features/auth/session-query-client.ts")),
    ).toBe("");
  });
  it("CF-RETRY-3 a planted retry function, retry true and a second client are reported; a count passes", () => {
    const dir = mkdtempSync(join(tmpdir(), "query-retry-"));
    const file = join(dir, "planted.ts");
    try {
      writeFileSync(
        file,
        [
          "useQuery({ queryKey: [1], retry: () => true });",
          "useQuery({ queryKey: [2], retry: true });",
          "useQuery({ queryKey: [3], retry: 2 });",
          "useQuery({ queryKey: [4], retry: false });",
          "new QueryClient();",
          "",
        ].join("\n"),
      );
      expect(findings([file])).toEqual([
        { file, line: 1, what: "retry" },
        { file, line: 2, what: "retry" },
        { file, line: 5, what: "client" },
      ]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
