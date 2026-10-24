import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

type Finding = { file: string; line: number; what: "fetch" | "credential" };
function findings(files: string[]): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      const add = (what: Finding["what"]) =>
        found.push({
          file,
          line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
          what,
        });
      if (ts.isCallExpression(node)) {
        const callee = node.expression;
        if (
          (ts.isIdentifier(callee) && callee.text === "fetch") ||
          (ts.isPropertyAccessExpression(callee) && callee.name.text === "fetch" && ts.isIdentifier(callee.expression) && /^(?:window|globalThis|self)$/.test(callee.expression.text))
        )
          add("fetch");
        if (
          ts.isPropertyAccessExpression(callee) &&
          /^(?:set|append)$/.test(callee.name.text) &&
          node.arguments[0] &&
          ts.isStringLiteral(node.arguments[0]) &&
          node.arguments[0].text.toLowerCase() === "authorization"
        )
          add("credential");
      }
      if (
        ts.isPropertyAssignment(node) &&
        (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) &&
        node.name.text.toLowerCase() === "authorization"
      )
        add("credential");
      if (ts.isIdentifier(node) && node.text === "access_token") add("credential");
      if (ts.isStringLiteral(node) && node.text === "access_token") add("credential");
    });
  }
  return found;
}

const domain = walkFiles(["src"], {
  ext: ["ts", "tsx"],
  skipTests: true,
  skip: /^src\/(?:server\/|routes\/|integrations\/|lib\/route-client\.ts$)/,
});
const census = findings(domain);
const allowances = readAllowlist(
  "scripts/conformance/route-client-allowlist.txt",
  census.map((hit) => hit.file),
);

describe("browser route-client conformance", () => {
  it(
    "RCG-1 every browser fetch uses the client or a live allowance",
    () => {
      const hits = census.filter((hit) => hit.what === "fetch");
      console.log(`[RCG-1] fetch sites: ${hits.length}; allowlist: ${allowances.size}`);
      expect(report(hits.filter((hit) => !allowances.has(hit.file)))).toBe("");
    },
    TREE_SCAN_MS,
  );
  it("RCG-2 bearer builders and token readers use the client or a live allowance", () => {
    const hits = census.filter((hit) => hit.what === "credential");
    console.log(`[RCG-2] credential sites: ${hits.length}; allowlist: ${allowances.size}`);
    expect(report(hits.filter((hit) => !allowances.has(hit.file)))).toBe("");
  });
  it("RCG-3 both censuses report a planted browser bearer fetch", () => {
    const dir = mkdtempSync(join(tmpdir(), "route-client-"));
    const file = join(dir, "planted.ts");
    try {
      writeFileSync(
        file,
        'fetch("/api/x", { headers: { Authorization: `Bearer ${session.access_token}` } });\n',
      );
      const hits = findings([file]);
      expect(hits.filter((hit) => hit.what === "fetch")).toEqual([
        { file, line: 1, what: "fetch" },
      ]);
      expect(hits.filter((hit) => hit.what === "credential")).toEqual([
        { file, line: 1, what: "credential" },
        { file, line: 1, what: "credential" },
      ]);
      expect(allowances.has(file)).toBe(false);
      expect(readFileSync(file, "utf8")).toContain("/api/x");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
