import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-1296 (cursor bundle 7b) — A ROUTE ANSWERS A CODE AT THE STATUS THE TABLE GIVES IT. The client
 * reads a refusal's class from the status that arrived (reader-failure.ts: a marked refusal below 500
 * is a refusal; 500 and above is the server's), and `REFUSAL_STATUS` (the table in reader-failure.ts)
 * is where a code's status is written once. CF-ROUTE-STATUS-1 reads every call under src/routes/api
 * and src/server that hands an answer a numeric status AND names a code the table holds, and fails
 * when the two disagree (a `notYourListing` at 403, a `photoGone` at 409). A code the table does not
 * hold is not judged here (the table is the one list, Q7); an exception is an allowlist line
 * `file | reason | until`.
 */

const TABLE_FILE = "src/lib/reader-failure.ts";
const ALLOWLIST = "scripts/conformance/route-status-allowlist.txt";

/** The table's own text, read from its source so the guard and the client cannot drift apart. */
function tableOf(file: string): Map<string, number> {
  const table = new Map<string, number>();
  visitTs(file, (node) => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === "REFUSAL_STATUS" &&
      node.initializer !== undefined
    ) {
      const literal = ts.isSatisfiesExpression(node.initializer)
        ? node.initializer.expression
        : node.initializer;
      if (!ts.isObjectLiteralExpression(literal)) return;
      for (const property of literal.properties) {
        if (
          ts.isPropertyAssignment(property) &&
          (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) &&
          ts.isNumericLiteral(property.initializer)
        )
          table.set(property.name.text, Number(property.initializer.text));
      }
    }
  });
  return table;
}

type Finding = { file: string; line: number; code: string; asked: number; table: number };

function stringsIn(node: ts.Node, into: string[]) {
  if (ts.isStringLiteralLike(node)) into.push(node.text);
  ts.forEachChild(node, (child) => {
    // A nested call is its own answer: it is judged on its own arguments.
    if (!ts.isCallExpression(child)) stringsIn(child, into);
  });
}

function findings(files: string[], table: Map<string, number>): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (!ts.isCallExpression(node)) return;
      const statuses = node.arguments.flatMap((argument) =>
        ts.isNumericLiteral(argument) && Number(argument.text) >= 400 && Number(argument.text) < 600
          ? [Number(argument.text)]
          : [],
      );
      if (statuses.length !== 1) return;
      const asked = statuses[0];
      if (asked === undefined) return;
      const words: string[] = [];
      for (const argument of node.arguments) stringsIn(argument, words);
      for (const word of words) {
        const row = table.get(word);
        if (row !== undefined && row !== asked) {
          found.push({
            file,
            line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
            code: word,
            asked,
            table: row,
          });
        }
      }
    });
  }
  return found;
}

const table = tableOf(TABLE_FILE);
const domain = walkFiles(["src/routes/api", "src/server"], { ext: ["ts", "tsx"], skipTests: true });
const census = findings(domain, table);
const allowances = readAllowlist(
  ALLOWLIST,
  census.map((hit) => hit.file),
);

describe("a route answers a code at the table's status (INC-1296)", () => {
  it("CF-ROUTE-STATUS-0 the table is read from its source", () => {
    expect(table.get("notYourListing")).toBe(404);
    expect(table.get("rateLimited")).toBe(429);
    expect(table.size).toBeGreaterThan(30);
  });

  it(
    "CF-ROUTE-STATUS-1 no call hands a table code a status the table does not give it",
    () => {
      console.log(
        `[CF-ROUTE-STATUS-1] codes in the table: ${table.size}; disagreements: ${census.length}; allowlist: ${allowances.size}`,
      );
      expect(
        report(
          census
            .filter((hit) => !allowances.has(hit.file))
            .map((hit) => ({
              file: hit.file,
              line: hit.line,
              what: `${hit.code} answered ${hit.asked}, the table says ${hit.table}`,
            })),
        ),
      ).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-ROUTE-STATUS-2 a planted photoGone at 409 and a planted notYourListing at 403 are reported; a table status is not", () => {
    const dir = mkdtempSync(join(tmpdir(), "route-status-"));
    const bad = join(dir, "bad.ts");
    const fine = join(dir, "fine.ts");
    try {
      writeFileSync(
        bad,
        'refusedWith(409, "photoId", "photoGone");\nverdict([{ field: "id", reason: "notYourListing" }], 403);\n',
      );
      writeFileSync(
        fine,
        'refusedWith(404, "photoId", "photoGone");\nclientError("rateLimited", 429);\nclientError("unlisted", 409);\n',
      );
      expect(
        findings([bad, fine], table).map(({ line, code, asked }) => ({ line, code, asked })),
      ).toEqual([
        { line: 1, code: "photoGone", asked: 409 },
        { line: 2, code: "notYourListing", asked: 403 },
      ]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
