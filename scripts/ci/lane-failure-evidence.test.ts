import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cliPin } from "./cli-pin";

/**
 * INC-984 (Foundations turn N1b-2, C3 i) — a lane's failing guard lines reach the ci-evidence
 * branch. The outbound-calls step appends each FAIL line to local-backend-failure.txt; "Write lane
 * evidence" carries that file as the fragment's "- Step failure:" section; "Write proof summary
 * and notice" publishes it under "## Lane <lane>" in docs/tracking/local-backend-proof.md. This
 * test runs the workflow's own merge program over a smoke fragment fixture.
 */

const WORKFLOW = readFileSync(".github/workflows/local-backend-proof.yml", "utf8");

function heredoc(step: string): string {
  const at = WORKFLOW.indexOf(`- name: ${step}`);
  const start = WORKFLOW.indexOf("<<'PY'\n", at) + "<<'PY'\n".length;
  const end = WORKFLOW.indexOf("\n          PY\n", start);
  return WORKFLOW.slice(start, end)
    .split("\n")
    .map((line) => line.slice(10))
    .join("\n");
}

describe("a lane's step failure is published (INC-984)", () => {
  it("LFE-1 the outbound-calls step writes its FAIL and S5 lines to local-backend-failure.txt", () => {
    const at = WORKFLOW.indexOf("- name: Outbound-calls guard (INC-981)");
    const step = WORKFLOW.slice(at, WORKFLOW.indexOf("- name: ", at + 10));
    expect(step).toContain("grep '^Outbound-calls guard FAIL:'");
    expect(step).toContain("S5 live FAIL: %s answered HTTP %s");
    expect(step.match(/>> local-backend-failure\.txt/g)?.length).toBe(3);
    expect(heredoc("Write lane evidence")).toContain(
      "'- Step failure:', *[redact(line) for line in failure_lines]",
    );
  });

  it("LFE-2 the merge publishes the smoke fragment's step failure, redacted, in local-backend-proof.md", () => {
    const dir = mkdtempSync(join(tmpdir(), "lfe-"));
    try {
      mkdirSync(join(dir, "local-proof-artifacts", "local-proof-smoke"), { recursive: true });
      copyFileSync(
        "scripts/fixtures/lane-smoke-step-failure.txt",
        join(dir, "local-proof-artifacts", "local-proof-smoke", "local-backend-proof-smoke.md"),
      );
      const result = spawnSync("python3", ["-c", heredoc("Write proof summary and notice")], {
        cwd: dir,
        encoding: "utf8",
        env: {
          PATH: process.env["PATH"] ?? "",
          // The step's PYTHONPATH (scripts/ci), absolute: the program runs in a scratch directory.
          PYTHONPATH: join(process.cwd(), "scripts/ci"),
          PYTHONDONTWRITEBYTECODE: "1",
          GITHUB_SHA: "f".repeat(40),
          GITHUB_REPOSITORY: "o/r",
          GITHUB_RUN_ID: "1",
        },
        timeout: 20_000,
      });
      expect(result.status, result.stderr).toBe(0);
      const proof = readFileSync(join(dir, "docs/tracking/local-backend-proof.md"), "utf8");
      const lane = proof.slice(proof.indexOf("## Lane smoke"));
      expect(lane).toContain(
        "Outbound-calls guard FAIL: supabase_functions.e2e_planted_caller(): calls net.* outside job_call",
      );
      expect(lane).toContain(
        "S5 live FAIL: Accept-Profile: net answered HTTP 200: [] apikey [masked JWT]",
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("LFE-3 the lane writes its step file, redacted, and its log artifact carries it to the merged reporter (INC-1101)", () => {
    const dir = mkdtempSync(join(tmpdir(), "lfe-"));
    try {
      const captured = readFileSync("scripts/fixtures/lane-step-failure.install.txt", "utf8");
      writeFileSync(
        join(dir, "local-backend-failure.txt"),
        `${captured}  owner user@example.invalid\n`,
      );
      const result = spawnSync("python3", ["-c", heredoc("Write lane evidence")], {
        cwd: dir,
        encoding: "utf8",
        env: {
          PATH: process.env["PATH"] ?? "",
          // The step's PYTHONPATH (scripts/ci), absolute: the program runs in a scratch directory.
          PYTHONPATH: join(process.cwd(), "scripts/ci"),
          PYTHONDONTWRITEBYTECODE: "1",
          GITHUB_SHA: "f".repeat(40),
          GITHUB_REPOSITORY: "o/r",
          GITHUB_RUN_ID: "1",
          PROOF_LANE: "1",
          // The workflow's top-level pin, which the step inherits.
          SUPABASE_CLI_VERSION: cliPin(WORKFLOW) ?? "",
        },
        timeout: 20_000,
      });
      expect(result.status, result.stderr).toBe(0);
      expect(readFileSync(join(dir, "local-backend-step-failure.txt"), "utf8")).toBe(
        `${captured}  owner [e-mail]\n`,
      );
      const at = WORKFLOW.indexOf("- name: Upload lane log");
      const upload = WORKFLOW.slice(at, WORKFLOW.indexOf("- name: ", at + 10));
      expect(upload).toContain("name: e2e-log-${{ matrix.lane }}");
      expect(upload).toContain("local-backend-step-failure.txt");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("LFE-4 the merge keeps the repeat lane's serial line, beside its parallel and WebKit lines (INC-1232)", () => {
    const dir = mkdtempSync(join(tmpdir(), "lfe-"));
    try {
      // The lane's own echo lines (the workflow's words, their variables filled), after the real
      // selection's summary line.
      const echo = (head: string) =>
        [
          ...WORKFLOW.matchAll(
            new RegExp(`echo "(${head}[^"]+)" >> local-backend-repeat\\.txt`, "g"),
          ),
        ]
          .map((match) => match[1] ?? "")
          .at(-1) ?? "";
      const values = new Map([
        ["webkit_used", "4"],
        ["serial_used", "3"],
        ["each", "2"],
      ]);
      const filled = (line: string) =>
        line.replace(/\$\{?(\w+)\}?/g, (all, name: string) => values.get(name) ?? all);
      const selection = readFileSync(
        "scripts/fixtures/local-backend-repeat.43144538685.txt",
        "utf8",
      );
      const serial = filled(echo("- Repeat serially"));
      expect(serial).toBe(
        "- Repeat serially (DEC-415): 3 of the repeated tests, @global-state, each 2 on mobile-360 and desktop-1280 at one worker after the parallel pass",
      );
      const fragment = [
        "- Lane: repeat",
        "# Local backend proof (non-gating)",
        "",
        "- Commit: `fixture`",
        "- Seconds — job: 119",
        "- Seconds — start (migrations included): 61",
        "- Migrations: applied 374/374",
        "- Smoke: 0 passed · 0 failed · 0 flaky · 0 skipped · total 0",
        "- Teardown: not found",
        ...selection.split("\n").filter((line) => line !== ""),
        filled(echo("- Repeat in WebKit")),
        serial,
        "- Job conclusion before evidence publication: success",
        "",
      ].join("\n");
      mkdirSync(join(dir, "local-proof-artifacts", "local-proof-repeat"), { recursive: true });
      writeFileSync(
        join(dir, "local-proof-artifacts", "local-proof-repeat", "local-backend-proof-repeat.md"),
        fragment,
      );
      const result = spawnSync("python3", ["-c", heredoc("Write proof summary and notice")], {
        cwd: dir,
        encoding: "utf8",
        env: {
          PATH: process.env["PATH"] ?? "",
          // The step's PYTHONPATH (scripts/ci), absolute: the program runs in a scratch directory.
          PYTHONPATH: join(process.cwd(), "scripts/ci"),
          PYTHONDONTWRITEBYTECODE: "1",
          GITHUB_SHA: "f".repeat(40),
          GITHUB_REPOSITORY: "o/r",
          GITHUB_RUN_ID: "1",
        },
        timeout: 20_000,
      });
      expect(result.status, result.stderr).toBe(0);
      const proof = readFileSync(join(dir, "docs/tracking/local-backend-proof.md"), "utf8");
      const line =
        proof.split("\n").find((text) => text.startsWith("- Repeat lane (DEC-283): ")) ?? "";
      expect(line).toContain("; Repeat in WebKit (DEC-371): 4 of the repeated tests");
      expect(line).toContain(`; ${serial.slice(2)}`);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
