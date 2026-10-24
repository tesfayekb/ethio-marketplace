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
  "src/server/supabase/user-client.ts",
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
  const code = codeOf(readFileSync(file, "utf8"));
  if (code.includes("createServerFn(")) {
    // A server function conforms when its validator is a schema.
    return /\.inputValidator\(\s*(?:z\.|[A-Za-z_$][\w$]*Schema\b)/.test(code);
  }
  return code.includes('from "@/server/route"') && code.includes("defineRoute(");
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
  (file) =>
    file !== "src/lib/schemas/primitives.ts" && UUID_LITERAL.test(readFileSync(file, "utf8")),
);

const FOUND = new Set<string>([
  ...RT1_BREACHES,
  ...RT2_FINDINGS.map((finding) => finding.file),
  ...RT3_BREACHES,
]);
const ALLOWED = readAllowlist("scripts/conformance/routes-allowlist.txt", FOUND);

describe("the route boundary census (CF-RT)", () => {
  it("CF-RT-1 every handler file and server function uses defineRoute / a schema inputValidator, or has its allowance", () => {
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

  it("CF-RT-3 the UUID regex literal lives only in src/lib/schemas/primitives.ts", () => {
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
    const entries = [...block!.matchAll(/"(src\/[^"]+)"/g)].map((match) => match[1]);
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

  it("prints the allowance count", () => {
    console.error(`[routes-allowlist] ${ALLOWED.size} allowances`);
    expect(ALLOWED.size).toBeGreaterThan(0);
  });
});
