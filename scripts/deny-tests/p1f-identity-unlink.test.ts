import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * INC-1165 (the tests and CI turn, Part D) — scripts/deny-tests/p1f-identity-unlink.ts reads the
 * operator's address from OPERATOR_EMAIL alone: unset, every mode that reads it stops with its
 * usage line (exit 2) before any network call; the source holds no default and no mailbox.
 */

const SCRIPT = "scripts/deny-tests/p1f-identity-unlink.ts";

/** A run with stand-in project values made at run time, a closed local port, and no OPERATOR_EMAIL. */
function run(args: string[], extra: Record<string, string> = {}) {
  const result = spawnSync("bun", [SCRIPT, ...args], {
    encoding: "utf8",
    env: {
      PATH: process.env["PATH"] ?? "",
      HOME: process.env["HOME"] ?? "",
      SUPABASE_URL: "http://127.0.0.1:9",
      SUPABASE_SERVICE_ROLE_KEY: randomBytes(32).toString("hex"),
      SUPABASE_PUBLISHABLE_KEY: randomBytes(32).toString("hex"),
      ...extra,
    },
    timeout: 30_000,
  });
  return { code: result.status, stdout: result.stdout, stderr: result.stderr };
}

describe("the identity script reads the operator's address from its environment only (INC-1165)", () => {
  it("P1F-1 without OPERATOR_EMAIL, --force stops with the usage line before any call", () => {
    const result = run(["--force"]);
    expect(result.code).toBe(2);
    expect(result.stderr).toContain("USAGE: OPERATOR_EMAIL=<the operator's address>");
    expect(result.stdout).toBe("");
  });

  it("P1F-2 without OPERATOR_EMAIL, --recheck --phase 2 stops with the usage line before any call", () => {
    const result = run(["--recheck", "--phase", "2"], {
      RECHECK_EMAIL: `e2e+p1f-${randomBytes(4).toString("hex")}@ethio-e2e.invalid`,
      RECHECK_PASSWORD: randomBytes(16).toString("hex"),
    });
    expect(result.code).toBe(2);
    expect(result.stderr).toContain("USAGE: OPERATOR_EMAIL=<the operator's address>");
    expect(result.stdout).toBe("");
  });

  it("P1F-3 the source holds no default for the variable and no mailbox at a public provider", () => {
    const source = readFileSync(SCRIPT, "utf8");
    expect(source).not.toMatch(/OPERATOR_EMAIL"\]\s*\?\?/);
    expect(source).not.toMatch(/@(?:gmail|yahoo|outlook|hotmail|icloud|proton)\./i);
    expect(source).not.toMatch(/console\.(?:log|error)\([^)]*\$\{OPERATOR_EMAIL\}/);
  });
});
