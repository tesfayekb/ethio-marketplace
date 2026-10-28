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
  expect(code.slice(0, text.indexOf("ok()"))).toBe("    \n    ");
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

/**
 * INC-950 (Foundations turn C2; G55) — AN ALLOWLIST READER IS HANDED ITS CENSUS'S FINDING KEYS, so
 * a line that names no finding is stale and fails (`readAllowlist`'s "stale allowance"). Handing it
 * every candidate instead (HB-1 handed every lazy part, INC-950) lets a line outlive its finding.
 * The census reads every call of the kit's readAllowlist in scripts/, src/ and e2e/ (the kit and
 * its own tests aside) and follows the second argument through the file's plain `const`
 * declarations; the text it reaches must name the census's findings — `findings`, `found`,
 * `census`, `keys`, `sites`, `breaches` or `hits`, the names every census in the tree gives them. A
 * destructured binding counts by its own name only (`consumers` from a census is not its findings).
 * A caller that hands its findings under another name holds a line in
 * allowlist-keys-allowlist.txt (`<file> | reason | until`), read through the kit itself.
 */
const FINDING_NAMES = /\b(?:findings?|found|FOUND|census|keys|sites|breaches|hits?)\b/;
const KIT_SPECIFIER = /(?:^|\/)kit$/;

export function allowlistReaders(
  files: string[],
): Array<{ file: string; line: number; keys: string }> {
  const calls: Array<{ file: string; line: number; keys: string }> = [];
  for (const file of files) {
    const local = new Set<string>();
    const consts = new Map<string, ts.Expression>();
    const found: Array<{ call: ts.CallExpression; source: ts.SourceFile }> = [];
    visitTs(file, (node, source) => {
      if (
        ts.isImportDeclaration(node) &&
        ts.isStringLiteral(node.moduleSpecifier) &&
        KIT_SPECIFIER.test(node.moduleSpecifier.text) &&
        node.importClause?.namedBindings !== undefined &&
        ts.isNamedImports(node.importClause.namedBindings)
      )
        for (const element of node.importClause.namedBindings.elements)
          if ((element.propertyName ?? element.name).text === "readAllowlist")
            local.add(element.name.text);
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer)
        consts.set(node.name.text, node.initializer);
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression))
        found.push({ call: node, source });
    });
    for (const { call, source } of found) {
      if (!local.has((call.expression as ts.Identifier).text)) continue;
      const parts: string[] = [];
      let next: ts.Expression | undefined = call.arguments[1];
      for (let hop = 0; next !== undefined && hop < 4; hop += 1) {
        parts.push(next.getText(source));
        next = ts.isIdentifier(next) ? consts.get(next.text) : undefined;
      }
      calls.push({
        file,
        line: source.getLineAndCharacterOfPosition(call.getStart(source)).line + 1,
        keys: parts.join(" <- "),
      });
    }
  }
  return calls;
}

it("CF-KIT-7 every readAllowlist caller hands its census's finding keys, or its file's line says why (INC-950)", () => {
  const files = walkFiles(["scripts", "src", "e2e"], { ext: ["ts", "tsx"] }).filter(
    (file) => !/^scripts\/conformance\/kit(?:\.test)?\.ts$/.test(file),
  );
  const readers = allowlistReaders(files);
  const odd = readers.filter(({ keys }) => !FINDING_NAMES.test(keys));
  const allowed = readAllowlist(
    "scripts/conformance/allowlist-keys-allowlist.txt",
    new Set(odd.map(({ file }) => file)),
  );
  console.log(
    `[allowlist-keys] readAllowlist callers: ${readers.length}; not named findings: ${odd.length}; allowed: ${allowed.size}`,
  );
  expect(readers.length).toBeGreaterThanOrEqual(18);
  expect(
    report(
      odd
        .filter(({ file }) => !allowed.has(file))
        .map(({ file, line, keys }) => ({ file, line, what: `hands readAllowlist ${keys}` })),
    ),
  ).toBe("");
});

it("CF-KIT-8 the census names a planted caller that hands every candidate, and passes the finding keys", () => {
  const dir = mkdtempSync(join(tmpdir(), "kit-8-"));
  const file = join(dir, "planted.test.ts");
  try {
    writeFileSync(
      file,
      [
        'import { readAllowlist as allow } from "./kit";',
        "declare function someCensus(files: string[]): { consumers: string[]; findings: { file: string }[] };",
        'const { consumers, findings } = someCensus(["a"]);',
        'export const a = allow("x.txt", consumers);',
        'export const b = allow("x.txt", findings.map((hit) => hit.file));',
        "const every = consumers.slice();",
        'export const c = allow("x.txt", every);',
        "const found = new Set(findings.map((hit) => hit.file));",
        'export const d = allow("x.txt", found);',
        "",
      ].join("\n"),
    );
    const readers = allowlistReaders([file]);
    expect(readers.map(({ line }) => line)).toEqual([4, 5, 7, 9]);
    expect(readers.filter(({ keys }) => !FINDING_NAMES.test(keys)).map(({ line }) => line)).toEqual(
      [4, 7],
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
