import { spawnSync } from "node:child_process";
import { randomBytes, randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Cursor bundle 7b (INC-1303, ruling 1 decision 15) — the auth server's failures on a lane,
 * as counts: scripts/ci/auth-log-capture.py. CF-AUTHLOG-1 runs it on a planted log (counts by
 * method, path and status; each 500's code and its message cut at 120 characters); CF-AUTHLOG-2
 * plants a token, an address and a body in the lines and requires none of them in the output;
 * CF-AUTHLOG-3 holds the workflow to the step: it runs the script on every lane (a retried pass is green), before the
 * evidence is written, and keeps its file in the lane's log artifact. CF-AUTHLOG-5 (cursor bundle
 * 7c, ruling 2) keeps a 500 request line's `error` field, where the server writes the cause.
 */

const WORKFLOW = join(process.cwd(), ".github/workflows/local-backend-proof.yml");

function capture(lines: unknown[]): string[] {
  const result = spawnSync("python3", [join(process.cwd(), "scripts/ci/auth-log-capture.py")], {
    input: lines.map((line) => (typeof line === "string" ? line : JSON.stringify(line))).join("\n"),
    encoding: "utf8",
    env: {
      PATH: process.env["PATH"] ?? "",
      PYTHONPATH: join(process.cwd(), "scripts/ci"),
      PYTHONDONTWRITEBYTECODE: "1",
    },
    timeout: 20_000,
  });
  if (result.status !== 0) throw new Error(result.stderr);
  return result.stdout.split("\n").filter((line) => line !== "");
}

describe("the auth server's failures on a lane (INC-1303)", () => {
  it("CF-AUTHLOG-1 counts by method, path and status; each 500's code and cut message", () => {
    const factor = randomUUID();
    const other = randomUUID();
    const long = "x".repeat(300);
    const out = capture([
      { method: "POST", path: `/factors/${factor}/challenge`, status: 200 },
      { method: "POST", path: `/factors/${other}/challenge`, status: 200 },
      { method: "POST", path: `/factors/${factor}/verify`, status: 200 },
      {
        method: "POST",
        path: `/factors/${other}/challenge`,
        status: 500,
        error_code: "unexpected_failure",
        msg: long,
      },
      "not json at all",
      { msg: "a line with no status or path" },
    ]);
    expect(out[0]).toBe("auth log: 6 lines read, 4 request lines");
    expect(out).toContain("2 x POST /factors/:id/challenge -> 200");
    expect(out).toContain("1 x POST /factors/:id/verify -> 200");
    expect(out).toContain("1 x POST /factors/:id/challenge -> 500");
    expect(out).toContain(
      `error 500 POST /factors/:id/challenge: unexpected_failure: ${"x".repeat(120)}`,
    );
    expect(out.join("\n")).not.toContain("x".repeat(121));
  });

  it("CF-AUTHLOG-2 a header, a token, an address and a body never reach the output", () => {
    const token = `eyJ${randomBytes(9).toString("base64url")}.${randomBytes(9).toString("base64url")}.${randomBytes(9).toString("base64url")}`;
    const bearer = randomBytes(12).toString("hex");
    const address = `${randomBytes(4).toString("hex")}@example.invalid`;
    const out = capture([
      {
        method: "POST",
        path: `/factors/${randomUUID()}/challenge?token=${bearer}`,
        status: 500,
        error_code: "unexpected_failure",
        msg: `failed for ${address} with ${token}`,
        authorization: `Bearer ${bearer}`,
        referer: `https://example.invalid/?access_token=${bearer}`,
        body: { password: bearer },
      },
    ]).join("\n");
    expect(out).toContain("POST /factors/:id/challenge -> 500");
    expect(out).not.toContain(bearer);
    expect(out).not.toContain(token);
    expect(out).not.toContain(address);
    expect(out).not.toContain("Bearer");
    expect(out).not.toContain("referer");
  });

  it("CF-AUTHLOG-4 the server's own error entries are counted with their message and cut error, beside the request lines", () => {
    const factor = randomUUID();
    const reason = "y".repeat(200);
    const entry = {
      level: "error",
      method: "POST",
      path: `/factors/${factor}/challenge`,
      msg: "500: Unexpected failure, please check server logs for more information",
      error: reason,
    };
    const out = capture([
      {
        method: "POST",
        path: `/factors/${factor}/challenge`,
        status: 500,
        msg: "request completed",
      },
      entry,
      { ...entry, path: `/factors/${randomUUID()}/challenge` },
      { level: "info", method: "GET", path: "/health", msg: "not an error entry" },
    ]);
    expect(out[0]).toBe("auth log: 4 lines read, 1 request lines");
    expect(out).toContain(
      `cause 2 x POST /factors/:id/challenge: ${entry.msg}: ${"y".repeat(120)}`,
    );
    expect(out.join("\n")).not.toContain("y".repeat(121));
    expect(out.join("\n")).not.toContain("not an error entry");
  });

  it("CF-AUTHLOG-5 a 500 request line's error field, where the server writes its cause, is kept, its ids masked, redacted and cut at 200", () => {
    const factor = randomUUID();
    const address = `${randomBytes(4).toString("hex")}@example.invalid`;
    const token = `eyJ${randomBytes(9).toString("base64url")}.${randomBytes(9).toString("base64url")}.${randomBytes(9).toString("base64url")}`;
    const out = capture([
      {
        method: "POST",
        path: `/factors/${factor}/challenge`,
        status: 500,
        error_code: "unexpected_failure",
        msg: "request completed",
        error: `Unhandled server error: ERROR: deadlock detected on factor ${factor} for ${address} with ${token} ${"z".repeat(400)}`,
      },
    ]);
    const head = "error 500 POST /factors/:id/challenge: unexpected_failure: request completed: ";
    const line = out.find((entry) => entry.startsWith(head)) ?? "";
    const cause = line.slice(head.length);
    expect(
      cause.startsWith("Unhandled server error: ERROR: deadlock detected on factor :id for "),
    ).toBe(true);
    expect(cause).toHaveLength(200);
    expect(cause.endsWith("z")).toBe(true);
    const text = out.join("\n");
    expect(text).not.toContain(factor);
    expect(text).not.toContain(address);
    expect(text).not.toContain(token);
  });

  it("CF-AUTHLOG-3 the workflow runs it on every lane, a green one too, and keeps its file in the log artifact", () => {
    const text = readFileSync(WORKFLOW, "utf8");
    const step = text.split("- name: Capture the auth server's failures (INC-1303)")[1] ?? "";
    const body = step.split("\n      - name: ")[0] ?? "";
    expect(body).toContain("if: always()");
    expect(body).not.toContain("failure()");
    expect(body).toContain("scripts/ci/auth-log-capture.py");
    expect(body).toContain("local-backend-auth-capture.txt");
    expect(text.indexOf("Capture the auth server's failures")).toBeLessThan(
      text.indexOf("- name: Write lane evidence"),
    );
    const upload = text.split("name: e2e-log-${{ matrix.lane }}")[1] ?? "";
    expect(upload.split("overwrite")[0]).toContain("local-backend-auth-capture.txt");
  });
});
