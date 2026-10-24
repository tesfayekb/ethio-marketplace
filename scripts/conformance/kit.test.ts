import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";
import { afterEach, expect, it } from "vitest";
import { walkFiles, codeOf, readAllowlist, report, visitTs } from "./kit";
const roots: string[] = [];
function root() {
  const path = mkdtempSync(join(tmpdir(), "cf-kit-"));
  roots.push(path);
  return path;
}
afterEach(() => {
  roots.splice(0).forEach((path) => rmSync(path, { recursive: true, force: true }));
});
it("CF-KIT-1 walk skips excluded directories and tests and sorts", () => {
  const path = root();
  for (const dir of ["node_modules", "dist", ".git", ".output", "skip"]) {
    mkdirSync(join(path, dir));
    writeFileSync(join(path, dir, "x.ts"), "");
  }
  for (const name of ["z.ts", "a.ts", "a.test.tsx", "a.spec.ts", "x.js"])
    writeFileSync(join(path, name), "");
  expect(walkFiles([path], { ext: ["ts", "tsx"], skipTests: true, skip: /\/skip$/ })).toEqual([
    join(path, "a.ts"),
    join(path, "z.ts"),
  ]);
});
it("CF-KIT-2 comments blank without moving code", () => {
  const text = "/* x\ny */ok(); // comment\nnext();";
  const code = codeOf(text);
  expect(code.split("\n").length).toBe(text.split("\n").length);
  expect(code.indexOf("ok()")).toBe(text.indexOf("ok()"));
  expect(code).not.toContain("comment");
  expect(code).not.toContain("x");
});
it("CF-KIT-3 well formed allowances preserve fields", () => {
  const path = join(root(), "allow.txt");
  writeFileSync(path, "# header\n\nx | a reason | INC-856\n");
  expect(readAllowlist(path, ["x"]).get("x")).toEqual({
    key: "x",
    reason: "a reason",
    until: "INC-856",
    line: 3,
  });
});
it.each([
  ["x | reason", "three non-empty"],
  ["x | | INC-1", "three non-empty"],
  ["x | reason | 2000-01-01", "expired"],
  ["x | reason | soon", "invalid until"],
  ["x | reason | 2026-02-30", "invalid until"],
  ["x | reason | INC-1\nx | reason | INC-2", "duplicate"],
  ["missing | reason | DEC-244", "stale allowance"],
])("CF-KIT-4 refuses %s", (text, message) => {
  const path = join(root(), "allow.txt");
  writeFileSync(path, text);
  expect(() => readAllowlist(path, ["x"])).toThrow(message);
});
it("CF-KIT-5 report sorts and formats", () =>
  expect(
    report([
      { file: "z", line: 2, what: "bad" },
      { file: "a", line: 1, what: "wrong" },
    ]),
  ).toBe("a:1 wrong\nz:2 bad"));
it("CF-KIT-6 visits calls", () => {
  const path = join(root(), "x.ts");
  writeFileSync(path, "one(); two(3);");
  const calls: string[] = [];
  visitTs(path, (node, source) => {
    if (ts.isCallExpression(node)) calls.push(node.expression.getText(source));
  });
  expect(calls).toEqual(["one", "two"]);
});
