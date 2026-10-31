import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

/**
 * DEC-309 (Foundations turn CI-3a) — scripts/ci/pull-images.sh: a missing image is pulled at most
 * 4 times with a jittered backoff (5, 15, 45 s × [0.7, 1.3]); the 4th failure gives up with
 * "registry refusal — infrastructure" and exit 3, before any start. docker is a stub here.
 */

const SCRIPT = "scripts/ci/pull-images.sh";
let dir = "";

/** A stub docker: `image inspect` fails (absent) unless PRESENT=1; `pull` fails FAILS times, then succeeds. */
function stub(fails: number, present = false) {
  dir = mkdtempSync(join(tmpdir(), "pull-images-"));
  const count = join(dir, "count");
  writeFileSync(count, "0");
  const docker = join(dir, "docker");
  writeFileSync(
    docker,
    `#!/usr/bin/env bash
if [ "$1" = image ]; then ${present ? "exit 0" : "exit 1"}; fi
n=$(cat "${count}"); n=$((n + 1)); echo "$n" > "${count}"
if [ "$n" -le ${fails} ]; then echo "toomanyrequests: Rate exceeded" >&2; exit 1; fi
exit 0
`,
  );
  chmodSync(docker, 0o755);
  const list = join(dir, "images.txt");
  writeFileSync(list, "public.ecr.aws/supabase/postgres:17\n");
  const result = spawnSync("bash", [SCRIPT, list], {
    encoding: "utf8",
    env: { ...process.env, PULL_IMAGES_DOCKER: docker, PULL_IMAGES_SLEEP: "0", WITH_DEADLINE_PAUSE: "0" },
    timeout: 30_000,
  });
  return {
    code: result.status,
    out: `${result.stdout}${result.stderr}`,
    pulls: Number(readFileSync(count, "utf8").trim()),
  };
}

function waits(out: string): number[] {
  return [...out.matchAll(/waiting (\d+)s/g)].map((m) => Number(m[1]));
}

afterEach(() => {
  if (dir) rmSync(dir, { recursive: true, force: true });
  dir = "";
});

describe("the backend images survive the registry's limit (DEC-309)", () => {
  it("PIM-1 an image already present is not pulled", () => {
    const r = stub(0, true);
    expect(r.code).toBe(0);
    expect(r.pulls).toBe(0);
  });

  it("PIM-2 the backoff schedule is 5, 15, 45 s, each jittered within [0.7, 1.3]", () => {
    const r = stub(3);
    expect(r.code).toBe(0);
    expect(r.pulls).toBe(4);
    const w = waits(r.out);
    expect(w).toHaveLength(3);
    [5, 15, 45].forEach((base, i) => {
      expect(w[i]).toBeGreaterThanOrEqual(Math.floor(base * 0.7));
      expect(w[i]).toBeLessThanOrEqual(Math.ceil(base * 1.3));
    });
  });

  it("PIM-3 the 4th failure gives up: exit 3, 'registry refusal — infrastructure', no 5th try", () => {
    const r = stub(99);
    expect(r.code).toBe(3);
    expect(r.pulls).toBe(4);
    expect(r.out).toContain("registry refusal — infrastructure");
    expect(waits(r.out)).toHaveLength(3);
  });

  it("PIM-4 a missing list is a usage error, not a pass", () => {
    const result = spawnSync("bash", [SCRIPT, "/nonexistent/images.txt"], { encoding: "utf8" });
    expect(result.status).toBe(2);
  });
});
