import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

type Finding = { file: string; line: number; what: "fetch" | "credential" | "failure" };

/** A file that reads a route's answer: it imports the route client. */
const READS_ROUTES = /from\s+["'](?:@\/lib\/route-client|(?:\.\.?\/)+(?:lib\/)?route-client)["']/;

/** `.status` read anywhere under a node: the answer's status built into a hand-made failure. */
function readsStatus(node: ts.Node): boolean {
  if (ts.isPropertyAccessExpression(node) && node.name.text === "status") return true;
  return ts.forEachChild(node, readsStatus) === true;
}
function findings(files: string[]): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    const readsRoutes = READS_ROUTES.test(readFileSync(file, "utf8"));
    visitTs(file, (node, source) => {
      const add = (what: Finding["what"]) =>
        found.push({
          file,
          line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
          what,
        });
      // INC-1296 / cursor bundle 7b — a route's answer that is not ok becomes the typed failure
      // (`routeFailure`, src/lib/route-client.ts), never a hand-made Error built from its status.
      if (readsRoutes) {
        if (
          ts.isNewExpression(node) &&
          ts.isIdentifier(node.expression) &&
          /^(?:Type)?Error$/.test(node.expression.text) &&
          (node.arguments ?? []).some(readsStatus)
        )
          add("failure");
        if (
          ts.isCallExpression(node) &&
          ts.isPropertyAccessExpression(node.expression) &&
          node.expression.name.text === "assign" &&
          node.arguments[0] !== undefined &&
          ts.isNewExpression(node.arguments[0]) &&
          node.arguments.slice(1).some(readsStatus)
        )
          add("failure");
      }
      if (ts.isCallExpression(node)) {
        const callee = node.expression;
        if (
          (ts.isIdentifier(callee) && callee.text === "fetch") ||
          (ts.isPropertyAccessExpression(callee) &&
            callee.name.text === "fetch" &&
            ts.isIdentifier(callee.expression) &&
            /^(?:window|globalThis|self)$/.test(callee.expression.text))
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

type MockFinding = { file: string; line: number; what: "mock" };

/**
 * INC-1313 (cursor-bundle-8c-2b) — A TEST'S MOCK OF THE ROUTE CLIENT KEEPS THE MODULE'S OWN
 * EXPORTS. A factory that returns only `{ callRoute }` leaves `routeFailure` absent, so a failure
 * is built by no real path (the test's stderr: `No "routeFailure" export is defined on the
 * "@/lib/route-client" mock`). A MOCK SITE is `vi.mock` / `vi.doMock` of the route client's module
 * (`@/lib/route-client`, or a relative path ending in `route-client`); it passes when its factory
 * spreads the module's own exports (`...(await importOriginal())`, `...(await original())`,
 * `...(await vi.importActual())`). No factory (an automock) or a factory that does not spread is
 * a finding.
 */
const ROUTE_CLIENT_SPECIFIER = /^(?:@\/lib\/|(?:\.\.?\/)+(?:lib\/)?)route-client$/;

/** The factory's own spreads: `...(await <importOriginal>())`, `...(await vi.importActual(...))`. */
function spreadsOwnExports(factory: ts.Node, parameter: string | null): boolean {
  const calls = parameter === null ? null : new RegExp(`\\b${parameter}\\s*[<(]`);
  let found = false;
  const walk = (node: ts.Node) => {
    if (ts.isSpreadAssignment(node)) {
      const text = node.expression.getText();
      if (/\bimportActual\b/.test(text) || calls?.test(text) === true) found = true;
    }
    ts.forEachChild(node, walk);
  };
  walk(factory);
  return found;
}

function mockFindings(files: string[], texts: Map<string, string> = new Map()): MockFinding[] {
  const found: MockFinding[] = [];
  for (const file of files) {
    visitTs(
      file,
      (node, source) => {
        if (!ts.isCallExpression(node) || !ts.isPropertyAccessExpression(node.expression)) return;
        const { expression: callee } = node;
        if (!ts.isIdentifier(callee.expression) || callee.expression.text !== "vi") return;
        if (callee.name.text !== "mock" && callee.name.text !== "doMock") return;
        const [specifier, factory] = node.arguments;
        if (
          specifier === undefined ||
          !ts.isStringLiteralLike(specifier) ||
          !ROUTE_CLIENT_SPECIFIER.test(specifier.text)
        )
          return;
        const first =
          factory !== undefined && (ts.isArrowFunction(factory) || ts.isFunctionExpression(factory))
            ? factory.parameters[0]?.name
            : undefined;
        const parameter = first !== undefined && ts.isIdentifier(first) ? first.text : null;
        if (factory !== undefined && spreadsOwnExports(factory, parameter)) return;
        found.push({
          file,
          line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
          what: "mock",
        });
      },
      texts.get(file),
    );
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
  it("RCG-5 no Error is built by hand from a route answer's status, or a live allowance names it", () => {
    const hits = census.filter((hit) => hit.what === "failure");
    console.log(`[RCG-5] hand-built failures: ${hits.length}; allowlist: ${allowances.size}`);
    expect(report(hits.filter((hit) => !allowances.has(hit.file)))).toBe("");
  });
  it("CF-MOCK-1 no test mocks the route client without its own exports, or a live allowance names the file; planted: the base text of use-feed.test.ts is reported, spreading factories are not", () => {
    const tests = walkFiles(["src", "scripts"], { ext: ["ts", "tsx"] }).filter((file) =>
      /\.test\.tsx?$/.test(file),
    );
    const hits = mockFindings(tests);
    console.log(`[CF-MOCK-1] test files: ${tests.length}; unspread mocks: ${hits.length}`);
    expect(report(hits.filter((hit) => !allowances.has(hit.file)))).toBe("");

    const planted = new Map([
      [
        "planted-base.test.ts",
        // use-feed.test.ts at b355cbe00 (its line 17 is the mock), byte for byte.
        'const { callRoute } = vi.hoisted(() => ({ callRoute: vi.fn() }));\nvi.mock("@/lib/route-client", () => ({ callRoute }));\n',
      ],
      [
        "planted-relative.test.ts",
        'vi.doMock("../route-client", () => ({ callRoute: vi.fn(), uploadRoute: vi.fn() }));\n',
      ],
      ["planted-automock.test.ts", 'vi.mock("@/lib/route-client");\n'],
      [
        "quiet-original.test.ts",
        'vi.mock("@/lib/route-client", async (importOriginal) => ({\n  ...(await importOriginal<typeof import("@/lib/route-client")>()),\n  callRoute,\n}));\n',
      ],
      [
        "quiet-actual.test.ts",
        'vi.mock("@/lib/route-client", async () => ({\n  ...(await vi.importActual("@/lib/route-client")),\n  callRoute,\n}));\n',
      ],
      [
        "quiet-other.test.ts",
        'vi.mock("@/lib/reader-failure", () => ({ readFailed: vi.fn() }));\n',
      ],
    ]);
    expect(
      mockFindings([...planted.keys()], planted).map((hit) => [hit.file, hit.line, hit.what]),
    ).toEqual([
      ["planted-base.test.ts", 2, "mock"],
      ["planted-relative.test.ts", 1, "mock"],
      ["planted-automock.test.ts", 1, "mock"],
    ]);
  });
  it("RCG-4 an undated allowance names a live INC, and the INC set is exactly the known one", () => {
    const lines = readFileSync("scripts/conformance/route-client-allowlist.txt", "utf8")
      .split("\n")
      .filter((line) => line.trim() !== "");
    const incs = new Set<string>();
    for (const [index, line] of lines.entries()) {
      const cells = line.split("|").map((cell) => cell.trim());
      const until = cells[2] ?? "";
      if (/^\d{4}-\d{2}-\d{2}$/.test(until)) continue;
      expect(
        /^INC-\d+$/.test(until),
        `allowlist:${index + 1} an undated allowance must name an INC, got "${until}"`,
      ).toBe(true);
      incs.add(until);
    }
    // INC-875: the outside tile-host probe (INC-861's AI-gateway clients moved
    // onto callRoute in Foundations turn 19). INC-1304's translations service moved onto
    // `routeFailure` in cursor-bundle-8a.
    // A new undated allowance fails here until its INC is named in this test.
    expect([...incs].sort()).toEqual(["INC-875"]);
  });
  it("RCG-6 a planted Error built from an answer's status is reported; a code-only Error and a non-route file are not", () => {
    const dir = mkdtempSync(join(tmpdir(), "route-client-"));
    const planted = join(dir, "planted.ts");
    const quiet = join(dir, "quiet.ts");
    try {
      writeFileSync(
        planted,
        [
          'import { callRoute } from "@/lib/route-client";',
          "async function tree() {",
          '  const answer = await callRoute("/api/x");',
          '  if (answer.kind === "answered" && !answer.ok) throw new Error(`tree ${answer.status}`);',
          "  throw Object.assign(new Error(code), { status: answer.status, code });",
          "}",
          "",
        ].join("\n"),
      );
      writeFileSync(
        quiet,
        "throw new Error(`photo ${response.status}`);\nthrow new Error(code);\n",
      );
      expect(findings([planted, quiet]).map((hit) => [hit.file, hit.line, hit.what])).toEqual([
        [planted, 4, "failure"],
        [planted, 5, "failure"],
      ]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
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
