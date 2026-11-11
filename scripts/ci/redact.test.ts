import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { report, walkFiles } from "../conformance/kit";

/**
 * Housekeeping turn 3 (concern 5a, ruling 1 Q14) — THE ONE REDACTION of the lanes' evidence:
 * scripts/ci/redact.py. CF-REDACT-1 runs the module on the INC-794 probe strings and on every
 * pattern it masks; CF-REDACT-2 holds the workflows to it: no `def redact` (or a second
 * account-id pass) of their own, and every heredoc program that calls `redact(` imports it.
 */

const COMMIT = "f".repeat(40);

function redactAll(inputs: string[], env: Record<string, string> = {}): string[] {
  const program = [
    "import json, sys",
    "from redact import redact",
    "print(json.dumps([redact(item) for item in json.loads(sys.stdin.read())]))",
  ].join("\n");
  const result = spawnSync("python3", ["-c", program], {
    input: JSON.stringify(inputs),
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

describe("the lanes' evidence has one redaction (housekeeping turn 3)", () => {
  it("CF-REDACT-1 the module masks every pattern and the INC-794 probes; the commit stays", () => {
    const hex = "ab".repeat(20);
    // Secret-shaped values are made at run time, never written as literals.
    const part = () => randomBytes(9).toString("base64url");
    const secret = randomBytes(16).toString("base64url");
    const jwt = `${"eyJ"}${part()}.${"eyJ"}${part()}.${part()}`;
    const keys = `sb_${"secret"}_${part()} sb_${"publishable"}_${part()}`;
    expect(
      redactAll(
        [
          "owner 0f1e2d3c-4b5a-6978-8a9b-0c1d2e3f4a5b",
          "line\nuser@example.invalid",
          "\u001b[2mtoken",
          `hex ${hex} commit ${COMMIT}`,
          `jwt ${jwt}`,
          `keys ${keys}`,
          "│ Secret Key │ abcdef │",
          `env ${secret}`,
        ],
        { E2E_SUPABASE_SERVICE_ROLE_KEY: secret },
      ),
    ).toEqual([
      "owner [account id]",
      "line\n[e-mail]",
      "\u001b[2mtoken",
      `hex [masked hex] commit ${COMMIT}`,
      "jwt [masked JWT]",
      "keys [masked key] [masked key]",
      "│ Secret Key │ [masked] │",
      "env [masked]",
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
});
