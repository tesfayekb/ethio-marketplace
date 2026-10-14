import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

import { describe, expect, it } from "vitest";

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
  const out = [join(root, "src/server.ts"), join(root, "src/routes/__root.tsx")];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (/\.(ts|tsx)$/.test(name) && !/\.test\.tsx?$/.test(name)) out.push(path);
    }
  };
  walk(resolve(root, "src/routes/api"));
  walk(resolve(root, "src/server"));
  return out;
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

describe("the server's caught-error census (INC-625, G29)", () => {
  it("ERRT-6 server code takes a caught error's text only through errorText or errorWithStack", () => {
    const banned: [RegExp, string][] = [
      [/instanceof Error\s*\?\s*\w+\.message/, "instanceof Error ? x.message"],
      [/(?<!new Error\()\bString\(\s*(?:error|err|e|caught|reason)\s*\)/, "String(error)"],
      [/as Error\)\.message/, "(error as Error).message"],
      [/as \{ message: unknown \}\)\.message/, "(error as { message }).message"],
    ];
    const found: string[] = [];
    for (const path of serverSources()) {
      const text = withoutRuleCalls(readFileSync(path, "utf8"));
      for (const [pattern, name] of banned) {
        if (pattern.test(text)) found.push(`${relative(process.cwd(), path)}: ${name}`);
      }
    }
    expect(found).toEqual([]);
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
      "src/routes/api/attributes.$id.options.ts: logRouteError",
      "src/routes/api/categories.tree.ts: logRouteError",
      "src/routes/api/feed.ts: logRouteError",
      "src/routes/api/i18n.$lang.ts: logRouteError",
      "src/routes/api/locations.$country.ts: logRouteError",
      "src/routes/api/locations.ts: logRouteError",
      "src/routes/api/translate.ts: fail5xx",
      "src/routes/api/translate.ts: logRouteError",
      "src/server/category-images/gate.ts: fail5xx",
      "src/server/imports/gate.ts: refuse",
      "src/server/supabase/user-client.ts: logRouteError",
    ]);
  });
});
