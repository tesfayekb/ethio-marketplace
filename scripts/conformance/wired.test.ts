import { readFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { codeOf, walkFiles } from "./kit";

/**
 * INC-563's class (Foundations turn 1, C3): a guard nothing runs is not a
 * guard. The domain — every scripts/check-*.{sh,ts,mjs}, every scripts/*.sh,
 * every scripts/*.ts exporting check(/inspect( and every
 * scripts/conformance/*.ts census (not a test, not the kit) — is each NAMED,
 * by basename, in a workflow step, a package.json script or a test under
 * scripts/ or src/. No allowlist: a script nothing runs is retired or wired,
 * never excused.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

/** The scripts that must have a caller, as root-relative paths. */
export function wiredDomain(root = ROOT): string[] {
  const scripts = join(root, "scripts");
  const domain: string[] = [];
  for (const file of walkFiles([scripts], { ext: ["sh", "ts", "mjs"] })) {
    const name = basename(file);
    const rel = relative(root, file).split("\\").join("/");
    if (name.startsWith("check-") || name.endsWith(".sh")) {
      domain.push(rel);
      continue;
    }
    if (rel.startsWith("scripts/conformance/")) {
      if (!name.endsWith(".test.ts") && name !== "kit.ts") domain.push(rel);
      continue;
    }
    if (
      name.endsWith(".ts") &&
      !name.endsWith(".test.ts") &&
      rel.split("/").length === 2 &&
      /export\s+(?:async\s+)?function\s+(?:check|inspect)\s*\(/.test(
        codeOf(readFileSync(file, "utf8")),
      )
    )
      domain.push(rel);
  }
  return domain.sort();
}

/** Every text a caller can name a script in: workflows, package.json scripts, tests. */
export function callerText(root = ROOT): string {
  const parts: string[] = [];
  for (const file of walkFiles([join(root, ".github", "workflows")], { ext: ["yml"] }))
    parts.push(readFileSync(file, "utf8"));
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
    scripts?: Record<string, string>;
  };
  parts.push(Object.values(pkg.scripts ?? {}).join("\n"));
  for (const rootDir of ["scripts", "src"]) {
    for (const file of walkFiles([join(root, rootDir)], { ext: ["ts", "tsx"] })) {
      if (/\.test\.tsx?$/.test(file)) parts.push(readFileSync(file, "utf8"));
    }
  }
  return parts.join("\n");
}

/** The domain scripts no caller names (matched by basename without extension). */
export function missingCallers(domain: string[], callers: string): string[] {
  return domain.filter((path) => {
    const stem = basename(path).replace(/\.(?:sh|ts|mjs)$/, "");
    return !callers.includes(stem);
  });
}

describe("every guard script is wired to a caller (INC-563)", () => {
  it("CF-WIRED-1 the domain is each named by a workflow, a package.json script or a test", () => {
    const domain = wiredDomain();
    const missing = missingCallers(domain, callerText());
    console.log(`[wired] domain: ${domain.length} scripts, missing: ${missing.length}`);
    expect(domain.length).toBeGreaterThanOrEqual(20);
    expect(missing).toEqual([]);
    // route-client.test.ts RCG-1…3 is discovered by test:unit's scripts/**/*.test.ts.
    expect(readFileSync(join(ROOT, "vitest.config.ts"), "utf8")).toContain("scripts/**/*.test.ts");
    expect(readFileSync(join(ROOT, "scripts/conformance/route-client.test.ts"), "utf8")).toContain(
      "RCG-3",
    );
    expect(readFileSync(join(ROOT, "src/server/ai/gateway.census.test.ts"), "utf8")).toContain("GWC-5");
  });

  it("CF-WIRED-2 a basename no caller names is reported", () => {
    expect(missingCallers(["scripts/check-planted-thing.sh"], "some other text")).toEqual([
      "scripts/check-planted-thing.sh",
    ]);
    expect(
      missingCallers(["scripts/check-planted-thing.sh"], "bash scripts/check-planted-thing.sh"),
    ).toEqual([]);
  });
});
