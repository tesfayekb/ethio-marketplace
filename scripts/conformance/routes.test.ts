import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { codeOf, readAllowlist, report, walkFiles } from "./kit";

/**
 * Foundations turn 2 (DEC-237) — THE ROUTE-BOUNDARY CENSUS (CF-RT).
 * Every server endpoint is a defineRoute (or a schema-validated server
 * function); a file that still parses, authenticates, answers or fetches by
 * its own code sits on routes-allowlist.txt until its wave's INC.
 */

const HELPER_SET = new Set([
  "src/server/route.ts",
  "src/server/answer.ts",
  "src/server/upstream.ts",
  "src/server/version-cache.ts",
  "src/server/supabase/user-client.ts",
  "src/server/door.ts",
  "src/server/listings/own-listing.ts",
]);

const ROUTE_FILES = walkFiles(["src/routes"], { ext: ["ts", "tsx"], skipTests: true });
const SERVER_FILES = walkFiles(["src/server"], { ext: ["ts", "tsx"], skipTests: true });
const SRC_FILES = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true });

const BYPASS_PATTERNS: Array<{ re: RegExp; what: string }> = [
  { re: /request\.json\(/, what: "reads a body" },
  { re: /request\.formData\(/, what: "reads a body" },
  { re: /request\.arrayBuffer\(/, what: "reads a body" },
  { re: /request\.text\(/, what: "reads a body" },
  { re: /new Response\(/, what: "builds a Response" },
  { re: /headers\.get\("Authorization"\)/, what: "reads the Authorization header" },
  { re: /createClient[<(]/, what: "constructs a Supabase client" },
  { re: /fetch\(/, what: "calls fetch" },
  { re: /typeof body\[/, what: "walks a body by hand" },
  { re: /instanceof ReaderError\s*&&\s*upstreamFailed/, what: "maps a read failure by hand" },
  { re: /function readFailed\(/, what: "declares its own read-failure factory" },
];

const UUID_LITERAL = /\[0-9a-f\]\{8\}-\[0-9a-f\]\{4\}-/;

/** CF-RT-1's census: handler files and server functions. */
function census(): string[] {
  return ROUTE_FILES.filter((file) => {
    const code = codeOf(readFileSync(file, "utf8"));
    return (
      (code.includes("server: {") && code.includes("handlers:")) || code.includes("createServerFn(")
    );
  });
}

function conforms(file: string): boolean {
  return conformsCode(codeOf(readFileSync(file, "utf8")));
}

function conformsCode(code: string): boolean {
  if (code.includes("createServerFn(")) {
    // A server function conforms when its validator is a schema.
    const functions = [...code.matchAll(/\bcreateServerFn\(/g)].length;
    const validators = [...code.matchAll(/\.validator\(\s*(?:z\.|[A-Za-z_$][\w$]*Schema\s*\))/g)]
      .length;
    return !code.includes(".inputValidator(") && validators === functions;
  }
  // Foundations turn 12 — a staff import route is the factory over defineRoute.
  if (code.includes('from "@/server/imports/route"') && /\bdefineImportRoute\s*\(/.test(code))
    return true;
  return code.includes('from "@/server/route"') && /\bdefineRoute\s*(?:<[^>]*>)?\s*\(/.test(code);
}

function bypasses(file: string): Array<{ file: string; line: number; what: string }> {
  if (HELPER_SET.has(file)) return [];
  const code = codeOf(readFileSync(file, "utf8"));
  const findings: Array<{ file: string; line: number; what: string }> = [];
  const lines = code.split("\n");
  lines.forEach((line, index) => {
    for (const { re, what } of BYPASS_PATTERNS) {
      if (re.test(line)) findings.push({ file, line: index + 1, what });
    }
  });
  return findings;
}

const CENSUS = census();
const RT1_BREACHES = CENSUS.filter((file) => !conforms(file));
const RT2_FINDINGS = [...ROUTE_FILES, ...SERVER_FILES].flatMap(bypasses);
const RT3_BREACHES = SRC_FILES.filter(
  (file) => file !== "src/lib/uuid.ts" && UUID_LITERAL.test(readFileSync(file, "utf8")),
);

const FOUND = new Set<string>([
  ...RT1_BREACHES,
  ...RT2_FINDINGS.map((finding) => finding.file),
  ...RT3_BREACHES,
]);
const ALLOWED = readAllowlist("scripts/conformance/routes-allowlist.txt", FOUND);

describe("the route boundary census (CF-RT)", () => {
  it("CF-RT-1 every handler file and server function uses defineRoute / a schema validator, or has its allowance", () => {
    expect(CENSUS.length).toBeGreaterThanOrEqual(40);
    const breaches = RT1_BREACHES.filter((file) => !ALLOWED.has(file));
    expect(report(breaches.map((file) => ({ file, line: 1, what: "not on defineRoute" })))).toBe(
      "",
    );
  });

  it("CF-RT-2 no file outside the helper set reads a body, builds a Response, reads Authorization, constructs a client or calls fetch", () => {
    const breaches = RT2_FINDINGS.filter((finding) => !ALLOWED.has(finding.file));
    expect(report(breaches)).toBe("");
  });

  it("CF-RT-3 the UUID regex literal lives only in src/lib/uuid.ts", () => {
    const breaches = RT3_BREACHES.filter((file) => !ALLOWED.has(file));
    expect(report(breaches.map((file) => ({ file, line: 1, what: "a UUID regex copy" })))).toBe("");
  });

  it("CF-RT-4 a planted hand-rolled route is reported twice", () => {
    const fixture = "scripts/fixtures/bad-route-example.ts.txt";
    const code = codeOf(readFileSync(fixture, "utf8"));
    const hits = BYPASS_PATTERNS.filter(({ re }) => re.test(code)).map(({ what }) => what);
    expect(hits).toEqual(["reads a body", "builds a Response"]);
    expect(UUID_LITERAL.test(readFileSync(fixture, "utf8"))).toBe(true);
  });

  it("CF-RT-5 the lint block's ignore list equals the allowlist's paths, both ways", () => {
    const eslint = readFileSync("eslint.config.js", "utf8");
    const block = eslint
      .split("// ROUTES-BOUNDARY-IGNORES-BEGIN")[1]
      ?.split("// ROUTES-BOUNDARY-IGNORES-END")[0];
    expect(block).toBeDefined();
    if (block === undefined) throw new Error("route ignore block missing");
    const entries = [...block.matchAll(/"(src\/[^"]+)"/g)].map((match) => match[1]);
    // The ignores are minimatch globs: a literal [ or ] in a filename is escaped [[] / []].
    const lintSet = new Set(
      entries
        .map((entry) => entry.replaceAll("[[]", "[").replaceAll("[]]", "]"))
        .filter((entry) => !HELPER_SET.has(entry)),
    );
    const allowSet = new Set(ALLOWED.keys());
    expect([...lintSet].filter((path) => !allowSet.has(path))).toEqual([]);
    expect([...allowSet].filter((path) => !lintSet.has(path))).toEqual([]);
  });

  it("CF-RT-6 generic calls conform only with the boundary import", () => {
    const imported = 'import { defineRoute } from "@/server/route";\ndefineRoute<Ctx>({';
    expect(conformsCode(imported)).toBe(true);
    expect(conformsCode("defineRoute<Ctx>({")).toBe(false);
  });

  it("CF-RT-7 the scanner reports both planted read-failure copies once", () => {
    for (const [code, expected] of [
      ["error instanceof ReaderError && upstreamFailed(", "maps a read failure by hand"],
      ["function readFailed(", "declares its own read-failure factory"],
    ]) {
      const hits = BYPASS_PATTERNS.filter(({ re }) => re.test(code)).map(({ what }) => what);
      expect(hits).toEqual([expected]);
    }
  });

  it("CF-RT-8 every server function requires its own schema validator", () => {
    const fixture = codeOf(readFileSync("scripts/fixtures/bad-server-fn-example.ts.txt", "utf8"));
    expect(conformsCode(fixture)).toBe(false);
    expect(conformsCode("createServerFn({}).validator((input) => input).handler(fn)")).toBe(false);
    expect(
      conformsCode(
        "createServerFn({}).validator(z.object({ a: z.string() }).strict()).handler(fn)",
      ),
    ).toBe(true);
    expect(conformsCode("createServerFn({}).validator(NoInputSchema).handler(fn)")).toBe(true);
  });

  it("prints the allowance count", () => {
    console.error(`[routes-allowlist] ${ALLOWED.size} allowances`);
    expect(ALLOWED.size).toBeGreaterThan(0);
  });
  /**
   * Foundations turn A1 (INC-886) — one worded refusal shape: a refusal is clientError, refused,
   * providerRefusal, verdict, serverError or readFailure (src/server/answer.ts), never `ok` with a
   * status. An `ok(...)` call naming any status other than a literal 2xx is reported.
   */
  it("RFL-1 no route or server file answers a refusal through ok(...) with a status; a planted one is reported", () => {
    const findings = [...ROUTE_FILES, ...SERVER_FILES]
      .filter((path) => path !== "src/server/answer.ts")
      .flatMap((path) => okWithStatus(path, readFileSync(path, "utf8")));
    expect(findings).toEqual([]);
    const planted = [
      'return ok({ error: "x" }, { status: 503 });',
      "return ok(\n  { error: code },\n  { status },\n);",
      'return ok({ ok: true }, { status: 200, cache: "no-store" });',
      'return ok({ done, flagged }, { cache: "no-store" });',
    ].join("\n");
    expect(okWithStatus("src/routes/planted.ts", planted)).toEqual([
      "src/routes/planted.ts:1",
      "src/routes/planted.ts:2",
    ]);
  });
});

/** Each `ok(` call (balanced parentheses, comments blanked) whose arguments name a non-2xx status. */
function okWithStatus(path: string, text: string): string[] {
  const code = codeOf(text);
  const found: string[] = [];
  for (const match of code.matchAll(/(?<![\w.])ok\(/g)) {
    let depth = 1;
    let index = (match.index ?? 0) + match[0].length;
    while (depth > 0 && index < code.length) {
      if (code[index] === "(") depth += 1;
      else if (code[index] === ")") depth -= 1;
      index += 1;
    }
    const call = code.slice(match.index, index);
    if (/\bstatus\b\s*[:,}]/.test(call) && !/\bstatus:\s*2\d\d\b/.test(call)) {
      found.push(`${path}:${code.slice(0, match.index).split("\n").length}`);
    }
  }
  return found;
}
