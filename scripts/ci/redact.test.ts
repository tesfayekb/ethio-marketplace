import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { report, walkFiles } from "../conformance/kit";
import { redact, redactionRules } from "../e2e-failure-report";

/**
 * Housekeeping turn 3 (concern 5a, ruling 1 Q14) — THE ONE REDACTION of the lanes' evidence:
 * scripts/ci/redact.py. CF-REDACT-1 runs the module on the INC-794 probe strings and on every
 * pattern it masks; CF-REDACT-2 holds the workflows to it: no `def redact` (or a second
 * account-id pass) of their own, and every heredoc program that calls `redact(` imports it.
 * CF-REDACT-3 (housekeeping turn 3b, DEC-368): redact.py and the E2E reporter's `redact` read one
 * rule set, scripts/ci/redaction-rules.json, and write the same bytes for every probe; each
 * loader refuses a rule the other engine reads differently.
 */

const COMMIT = "f".repeat(40);

function python(program: string, input: string, env: Record<string, string>) {
  return spawnSync("python3", ["-c", program], {
    input,
    encoding: "utf8",
    env: {
      PATH: process.env["PATH"] ?? "",
      PYTHONPATH: join(process.cwd(), "scripts/ci"),
      PYTHONDONTWRITEBYTECODE: "1",
      GITHUB_SHA: COMMIT,
      ...env,
    },
    timeout: 20_000,
  });
}

function redactAll(inputs: string[], env: Record<string, string> = {}): string[] {
  const program = [
    "import json, sys",
    "from redact import redact",
    "print(json.dumps([redact(item) for item in json.loads(sys.stdin.read())]))",
  ].join("\n");
  const result = python(program, JSON.stringify(inputs), env);
  if (result.status !== 0) throw new Error(result.stderr);
  const parsed: unknown = JSON.parse(result.stdout);
  if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === "string"))
    throw new Error(`not a list of strings: ${result.stdout}`);
  return parsed;
}

type Finding = { file: string; line: number; what: string };

/** A workflow's own redaction: a `def redact`/`def safe`, a second account-id pass, or a missing import. */
export function redactionFindings(files: Array<{ file: string; text: string }>): Finding[] {
  const findings: Finding[] = [];
  for (const { file, text } of files) {
    const lines = text.split("\n");
    lines.forEach((line, index) => {
      if (/^\s*def (?:redact|safe)\(/.test(line))
        findings.push({ file, line: index + 1, what: "defines its own redaction" });
      if (line.includes("'[account id]'"))
        findings.push({ file, line: index + 1, what: "masks account ids outside redact.py" });
    });
    for (const program of text.split("<<'PY'").slice(1)) {
      const body = program.slice(0, program.indexOf("\n          PY"));
      if (/\bredact\(/.test(body) && !body.includes("from redact import redact"))
        findings.push({
          file,
          line: 0,
          what: "a program calls redact( without importing redact.py",
        });
    }
  }
  return findings;
}

/** The INC-794 probe strings, with the environment they are redacted under. */
function probes(): { inputs: string[]; env: Record<string, string> } {
  const hex = "ab".repeat(20);
  // Secret-shaped values are made at run time, never written as literals.
  const part = () => randomBytes(9).toString("base64url");
  const secret = randomBytes(16).toString("base64url");
  const jwt = `${"eyJ"}${part()}.${"eyJ"}${part()}.${part()}`;
  // INC-1138: a JWT's last character may be "-" or "_"; fixed here, not left to chance.
  const dashJwt = `${"eyJ"}${part()}.${"eyJ"}${part()}.${part()}-`;
  const underscoreJwt = `${"eyJ"}${part()}.${"eyJ"}${part()}.${part()}_`;
  const keys = `sb_${"secret"}_${part()} sb_${"publishable"}_${part()}`;
  // INC-1114: a key's last character may be "-" or "_"; fixed here, not left to chance.
  const dashKey = `sb_${"secret"}_${part()}-`;
  const underscoreKey = `sb_${"publishable"}_${part()}_`;
  return {
    inputs: [
      "owner 0f1e2d3c-4b5a-6978-8a9b-0c1d2e3f4a5b",
      "line\nuser@example.invalid",
      "\u001b[2mtoken",
      `hex ${hex} commit ${COMMIT}`,
      `jwt ${jwt}`,
      `dash jwt ${dashJwt} then`,
      `underscore jwt ${underscoreJwt}.`,
      `keys ${keys}`,
      "│ Secret Key │ abcdef │",
      `env ${secret}`,
      `dash ${dashKey}`,
      `underscore ${underscoreKey}, then`,
    ],
    env: { E2E_SUPABASE_SERVICE_ROLE_KEY: secret },
  };
}

/** One string per rule of redaction-rules.json, keyed by the rule's name. */
function ruleProbes(): Record<string, string> {
  const part = () => randomBytes(9).toString("base64url");
  return {
    ANSI: "\u001b[31mred\u001b[0m and \u001b[1;2mbold",
    ACCOUNT_ID: "ids A0F1E2D3-4B5A-6978-8A9B-0C1D2E3F4A5B, x0f1e2d3c-4b5a-6978-8a9b-0c1d2e3f4a5b",
    SECRET_VALUES: "keys in a line",
    JWT: `t=${"eyJ"}${part()}.${part()}.${part()}; and eyJ.x.y`,
    SUPABASE_KEY: `k sb_${"secret"}_${part()}, sb_other_${part()}`,
    STORAGE_KEY: "localStorage sb-abcdefghij-auth-token and sb--auth-token",
    EMAIL: "mail e2e+one@ethio-e2e.invalid, not@x",
    STORAGE_KEY_ROW: "│ Access Key │  abc def  │\n│\tSecret Key\t│ x │\n│ Other │ y │",
    LONG_HEX: `${"cd".repeat(16)} ${COMMIT} ${"e".repeat(31)}`,
  };
}

const RULES_PATH = "scripts/ci/redaction-rules.json";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("the lanes' evidence has one redaction (housekeeping turn 3)", () => {
  it("CF-REDACT-1 the module masks every pattern and the INC-794 probes; the commit stays", () => {
    const { inputs, env } = probes();
    expect(redactAll(inputs, env)).toEqual([
      "owner [account id]",
      "line\n[e-mail]",
      // DEC-368: one rule set for both writers, so the lanes strip ANSI colour codes as the reporter does.
      "token",
      `hex [masked hex] commit ${COMMIT}`,
      "jwt [masked JWT]",
      "dash jwt [masked JWT] then",
      "underscore jwt [masked JWT].",
      "keys [masked key] [masked key]",
      "│ Secret Key │ [masked] │",
      "env [masked]",
      "dash [masked key]",
      "underscore [masked key], then",
    ]);
  });

  it("CF-REDACT-2 no workflow redacts on its own; a planted second redaction is named", () => {
    const workflows = walkFiles([".github/workflows"], { ext: ["yml"] }).map((file) => ({
      file,
      text: readFileSync(file, "utf8"),
    }));
    expect(report(redactionFindings(workflows))).toBe("");
    const imports = readFileSync(".github/workflows/local-backend-proof.yml", "utf8").match(
      /from redact import redact/g,
    );
    expect(imports?.length).toBe(3);
    const planted = [
      "        run: |",
      "          python3 - <<'PY'",
      "          def redact(text):",
      "              return re.sub(r'x', '[account id]', text)",
      "          print(redact('a'))",
      "          PY",
    ].join("\n");
    expect(report(redactionFindings([{ file: "p.yml", text: planted }]))).toBe(
      [
        "p.yml:0 a program calls redact( without importing redact.py",
        "p.yml:3 defines its own redaction",
        "p.yml:4 masks account ids outside redact.py",
      ].join("\n"),
    );
  });
  it("CF-REDACT-3 redact.py and the reporter read one rule set and write the same bytes; a rule one engine reads differently is refused by the other's loader", () => {
    const rules = redactionRules(readFileSync(RULES_PATH, "utf8"));
    const byRule = ruleProbes();
    expect(Object.keys(byRule)).toEqual(rules.map((rule) => rule.name));
    expect(rules[0]?.name).toBe("ANSI");
    const { inputs, env } = probes();
    const secret = env["E2E_SUPABASE_SERVICE_ROLE_KEY"] ?? "";
    const publishable = randomBytes(12).toString("base64url");
    const all = [...inputs, ...Object.values(byRule), `both ${secret} ${publishable}`];
    const lanesEnv = {
      E2E_SUPABASE_SERVICE_ROLE_KEY: secret,
      E2E_SUPABASE_PUBLISHABLE_KEY: publishable,
    };
    vi.stubEnv("GITHUB_SHA", COMMIT);
    vi.stubEnv("E2E_SUPABASE_SERVICE_ROLE_KEY", secret);
    vi.stubEnv("E2E_SUPABASE_PUBLISHABLE_KEY", publishable);
    const fromReporter = all.map((text) => redact(text, rules));
    expect(redactAll(all, lanesEnv)).toEqual(fromReporter);
    expect(fromReporter.at(-1)).toBe("both [masked] [masked]");
    // INC-1114: a key ending in "-" or "_" is masked whole, the same bytes in both engines.
    expect(fromReporter.slice(inputs.length - 2, inputs.length)).toEqual([
      "dash [masked key]",
      "underscore [masked key], then",
    ]);
    expect(fromReporter.some((text, i) => text !== all[i])).toBe(true);
    // A head block line through the rules would lose its commit (DEC-368): the reporter writes it from ReportMeta.
    expect(redact(`- Commit: \`${"12".repeat(20)}\``, rules)).toBe("- Commit: `[masked hex]`");

    const withRule = (rule: Record<string, unknown>) => {
      const file: unknown = JSON.parse(readFileSync(RULES_PATH, "utf8"));
      if (
        typeof file !== "object" ||
        file === null ||
        !("rules" in file) ||
        !Array.isArray(file.rules)
      )
        throw new Error(`${RULES_PATH} is not { about, rules }`);
      return JSON.stringify({ ...file, rules: [...file.rules, rule] });
    };
    const pythonLoads = (text: string) =>
      python("import sys\nfrom redact import load_rules\nload_rules(sys.stdin.read())", text, {});
    expect(pythonLoads(withRule({ name: "OK", pattern: "x(y)", replacement: "$1" })).status).toBe(
      0,
    );
    const pythonOnly = withRule({ name: "PY_ONLY", pattern: "(?P<k>x)", replacement: "" });
    expect(() => redactionRules(pythonOnly)).toThrow(/rule PY_ONLY/);
    const jsOnly = withRule({ name: "JS_ONLY", pattern: "(?<k>x)", replacement: "" });
    expect(pythonLoads(jsOnly).status).not.toBe(0);
    for (const planted of [
      { name: "SPACE", pattern: "a\\sb", replacement: "" },
      { name: "DOLLAR", pattern: "x", replacement: "$&" },
      { name: "EXTRA", pattern: "x", replacement: "", flags: "i" },
      { name: "NO_REPLACEMENT", pattern: "x" },
    ]) {
      const text = withRule(planted);
      expect(() => redactionRules(text), planted.name).toThrow(/redaction-rules\.json/);
      expect(pythonLoads(text).status, planted.name).not.toBe(0);
    }
    expect(() => redactionRules("{}")).toThrow(/the file is/);
    expect(pythonLoads("{}").status).not.toBe(0);
  });
});
