import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

/**
 * DEC-321 (housekeeping turn 3) — CI evidence per ref: scripts/publish-evidence.sh maps each file to
 * the path its run's ref publishes it at, read through the script's own `--print-path` mode. The
 * end-to-end publication against a bare repository is scripts/publish-evidence.selftest.sh.
 */

function printPath(ref: string, file: string) {
  const result = spawnSync("bash", ["scripts/publish-evidence.sh", "--print-path", ref, file], {
    encoding: "utf8",
    timeout: 10_000,
  });
  return { code: result.status, out: result.stdout.trim(), err: result.stderr.trim() };
}

describe("CI evidence is read under the ref the run tested (DEC-321)", () => {
  it("CF-PUBLISH-1 dev keeps every path; a lane ref, slashes kept, publishes under branches/<ref>/", () => {
    expect(printPath("dev", "docs/tracking/ci-status.md")).toEqual({
      code: 0,
      out: "docs/tracking/ci-status.md",
      err: "",
    });
    expect(printPath("cursor/housekeeping", "docs/tracking/e2e-last-failure.md").out).toBe(
      "docs/tracking/branches/cursor/housekeeping/e2e-last-failure.md",
    );
    expect(printPath("lane-1.2_x", "docs/tracking/local-backend-proof.md").out).toBe(
      "docs/tracking/branches/lane-1.2_x/local-backend-proof.md",
    );
  });

  it("CF-PUBLISH-2 the flake ledger stays one file for every ref (DEC-030)", () => {
    expect(printPath("cursor/housekeeping", "docs/tracking/flake-ledger.md").out).toBe(
      "docs/tracking/flake-ledger.md",
    );
  });

  it("CF-PUBLISH-3 a ref is sanitised to [A-Za-z0-9._/-]; one that could leave branches/ is refused", () => {
    expect(printPath("feature/a b$c", "docs/tracking/ci-status.md").out).toBe(
      "docs/tracking/branches/feature/a-b-c/ci-status.md",
    );
    for (const ref of ["../dev", "a/../../dev", "a..b", "/abs", "trail/", "a//b", "a/./b", ""]) {
      const got = printPath(ref, "docs/tracking/ci-status.md");
      expect(got.code, ref).toBe(2);
      expect(got.out, ref).toBe("");
      expect(got.err, ref).toBe(`publish-evidence: refusing ref ${ref}`.trim());
    }
  });
});
