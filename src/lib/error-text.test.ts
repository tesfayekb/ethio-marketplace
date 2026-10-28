import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { readAllowlist, walkFiles } from "../../scripts/conformance/kit";

import { errorText, errorWithStack } from "./error-text";

const PAGE =
  "<html>\r\n<head><title>502 Bad Gateway</title></head>\r\n<body>cloudflare</body>\r\n</html>\r\n";

describe("errorText — one rule for what a caught error says in a log line (INC-625)", () => {
  it("ERRT-1 a plain message comes back unchanged, whatever carries it", () => {
    expect(errorText("listing not found")).toBe("listing not found");
    expect(errorText(new Error("canceling statement due to statement timeout"))).toBe(
      "canceling statement due to statement timeout",
    );
    expect(errorText({ code: "P0001", message: "rateLimited" })).toBe("rateLimited");
    expect(errorText(404)).toBe("404");
  });

  it("ERRT-2 an error with no message names what it has: its name, its code, its status", () => {
    expect(errorText(new TypeError(""))).toBe("TypeError");
    expect(errorText({ code: "PGRST301" })).toBe("code PGRST301");
    expect(errorText({ message: "", status: 503 })).toBe("status 503");
  });

  it("ERRT-3 nothing at all is said in words, never as the word 'undefined' (the run 38590378235 line)", () => {
    expect(errorText(undefined)).toBe("no message (undefined)");
    expect(errorText(null)).toBe("no message (null)");
    expect(errorText("")).toBe("no message (string)");
    expect(errorText({})).toBe("no message (object)");
    expect(errorText({ message: undefined })).toBe("no message (object)");
  });

  it("ERRT-4 an HTML error page is named with its status; what came before it is kept (INC-328, INC-574)", () => {
    expect(errorText(PAGE)).toBe("upstream returned an HTML error page (502)");
    expect(errorText(new Error(`remove: ${PAGE}`))).toBe(
      "remove: upstream returned an HTML error page (502)",
    );
    expect(errorText({ message: `<!DOCTYPE html><title>Error</title>` })).toBe(
      "upstream returned an HTML error page",
    );
    // Another tag in a message is not a page.
    expect(errorText("the value <b> is not allowed")).toBe("the value <b> is not allowed");
  });

  it("ERRT-5 errorWithStack adds the first stack line to an Error and nothing to anything else", () => {
    const error = new Error("boom");
    const line = errorWithStack(error);
    expect(line.startsWith("boom | ")).toBe(true);
    expect(line).not.toContain("\n");
    expect(errorWithStack("boom")).toBe("boom");
    expect(errorWithStack(undefined)).toBe("no message (undefined)");
  });
});

/** Every server source file: the server entry, the root route, the API routes and src/server/. */
function serverSources(): string[] {
  const root = process.cwd();
  return [
    join(root, "src/server.ts"),
    join(root, "src/routes/__root.tsx"),
    ...walkFiles([resolve(root, "src/routes/api"), resolve(root, "src/server")], {
      ext: ["ts", "tsx"],
      skipTests: true,
    }),
  ];
}

/** The text with every errorText(…) and errorWithStack(…) call removed, nested brackets included. */
function withoutRuleCalls(text: string): string {
  let out = "";
  let index = 0;
  const call = /\b(?:errorText|errorWithStack)\(/g;
  for (let match = call.exec(text); match !== null; match = call.exec(text)) {
    out += text.slice(index, match.index);
    let depth = 1;
    let at = match.index + match[0].length;
    while (at < text.length && depth > 0) {
      if (text[at] === "(") depth += 1;
      else if (text[at] === ")") depth -= 1;
      at += 1;
    }
    // The call's own lines stay (as empty lines), so a finding's line is the file's.
    out += text.slice(match.index, at).replace(/[^\n]/g, "");
    index = at;
    call.lastIndex = at;
  }
  return out + text.slice(index);
}

/** Every console.error(…) call that writes to the [ssr-error] channel, whole. */
function ssrErrorCalls(text: string): string[] {
  const calls: string[] = [];
  const start = /console\.error\(/g;
  for (let match = start.exec(text); match !== null; match = start.exec(text)) {
    let depth = 1;
    let at = match.index + match[0].length;
    while (at < text.length && depth > 0) {
      if (text[at] === "(") depth += 1;
      else if (text[at] === ")") depth -= 1;
      at += 1;
    }
    const whole = text.slice(match.index, at);
    if (whole.includes("[ssr-error]")) calls.push(whole);
  }
  return calls;
}

/** The four hand reads of a caught error's text the rule replaces (rule 10, F4). */
const HAND_READS: [RegExp, string][] = [
  [/instanceof Error\s*\?\s*\w+\.message/, "instanceof Error ? x.message"],
  [/(?<!new Error\()\bString\(\s*(?:error|err|e|caught|reason)\s*\)/, "String(error)"],
  [/as Error\)\.message/, "(error as Error).message"],
  [/as \{ message: unknown \}\)\.message/, "(error as { message }).message"],
];

/**
 * Every hand read in `paths`, as `<file>:<line> <form>` (an errorText(…) call's own text is not
 * read). Each form is matched against the whole text, so a read split across lines (`x instanceof
 * Error` / `? x.message`) is found as at BASE; its line is the line its match starts on.
 */
export function handReads(paths: string[]): { file: string; line: string }[] {
  const found: { file: string; line: string }[] = [];
  for (const path of paths) {
    const file = relative(process.cwd(), path).split("\\").join("/");
    const text = withoutRuleCalls(readFileSync(path, "utf8"));
    const lines = new Set<string>();
    for (const [pattern, name] of HAND_READS) {
      const every = new RegExp(pattern.source, "g");
      for (let match = every.exec(text); match !== null; match = every.exec(text)) {
        const line = `${file}:${text.slice(0, match.index).split("\n").length} ${name}`;
        if (!lines.has(line)) found.push({ file, line });
        lines.add(line);
      }
    }
  }
  return found;
}

/**
 * INC-937 (Foundations turn C2; G55) — the whole tree: src/, e2e/ and scripts/, tests included (a
 * test's failure message is a log line too). Two files are the rule itself and are not read: the
 * rule (error-text.ts, whose `String(value)` names a number or a flag) and this census (its patterns).
 */
const THE_RULE = new Set(["src/lib/error-text.ts", "src/lib/error-text.test.ts"]);
function treeSources(): string[] {
  const root = process.cwd();
  return walkFiles(
    ["src", "e2e", "scripts"].map((dir) => resolve(root, dir)),
    {
      ext: ["ts", "tsx", "mjs"],
    },
  ).filter((path) => !THE_RULE.has(relative(root, path).split("\\").join("/")));
}

const ALLOWLIST = "scripts/conformance/error-text-allowlist.txt";

describe("the caught-error census (INC-625, G29; INC-937, G55)", () => {
  it("ERRT-6 src/, e2e/ and scripts/ take a caught error's text only through errorText or errorWithStack, but the allowlist's files", () => {
    const sources = treeSources();
    const found = handReads(sources);
    const allowed = readAllowlist(ALLOWLIST, new Set(found.map(({ file }) => file)));
    const outside = found.filter(({ file }) => !allowed.has(file)).map(({ line }) => line);
    console.log(
      `[error-text] files read: ${sources.length}; hand reads: ${found.length}; allowed files: ${allowed.size}`,
    );
    expect(sources.length).toBeGreaterThan(0);
    expect(outside).toEqual([]);
  });

  it("ERRT-8 the census reads each folder and names a planted hand read of each form in each, and passes errorText", () => {
    const sources = treeSources().map((path) =>
      relative(process.cwd(), path).split("\\").join("/"),
    );
    for (const folder of ["src/", "e2e/", "scripts/"])
      expect(
        sources.some((file) => file.startsWith(folder)),
        `the census reads ${folder}`,
      ).toBe(true);
    const dirs = ["src", "e2e", "scripts"].map((dir) => `node_modules/.cache/errt-8/${dir}`);
    const files = dirs.map((dir) => `${dir}/errt-planted.ts`);
    const body = [
      'import { errorText } from "../src/lib/error-text";',
      "export const a = (error: unknown) => (error instanceof Error ? error.message : 1);",
      "export const b = (error: unknown) => String(error);",
      "export const c = (error: unknown) => (error as Error).message;",
      "export const d = (body: unknown) => String((body as { message: unknown }).message);",
      "export const e = (error: unknown) => errorText(error instanceof Error ? error.message : 1);",
      "",
    ].join("\n");
    try {
      dirs.forEach((dir, index) => {
        mkdirSync(dir, { recursive: true });
        writeFileSync(files[index] ?? "", body);
      });
      expect(handReads(files).map(({ line }) => line)).toEqual(
        files.flatMap((file) => [
          `${file}:2 instanceof Error ? x.message`,
          `${file}:3 String(error)`,
          `${file}:4 (error as Error).message`,
          `${file}:5 (error as { message }).message`,
        ]),
      );
    } finally {
      for (const dir of dirs) rmSync(dir, { recursive: true, force: true });
    }
  });

  it("ERRT-7 no [ssr-error] line prints an error's raw .message or String(…), and every route's own log helper uses the rule", () => {
    const raw: string[] = [];
    const helpers: string[] = [];
    for (const path of serverSources()) {
      const text = readFileSync(path, "utf8");
      const name = relative(process.cwd(), path);
      for (const call of ssrErrorCalls(text)) {
        const rest = withoutRuleCalls(call);
        if (/\.message\b(?!\s*[!=]==)|\bString\(/.test(rest))
          raw.push(`${name}: ${call.replace(/\s+/g, " ")}`);
      }
      const helper = /function (logRouteError|fail5xx|refuse)\([^)]*\)[^{]*\{([\s\S]*?)\n\}/g;
      for (let match = helper.exec(text); match !== null; match = helper.exec(text)) {
        if (/\b(?:errorText|errorWithStack|logRouteError)\(/.test(match[2] ?? "")) {
          helpers.push(`${name}: ${match[1]}`);
        } else {
          raw.push(`${name}: ${match[1]} does not use the rule`);
        }
      }
    }
    expect(raw).toEqual([]);
    expect(helpers.sort()).toEqual([
      "src/server/imports/gate.ts: refuse",
      "src/server/supabase/user-client.ts: logRouteError",
    ]);
  });
});
