import { spawnSync } from "node:child_process";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

/**
 * INC-1101 (housekeeping turn 3, DEC-366) — scripts/ci/install-browser-deps.sh: the browser's system
 * libraries survive one apt mirror. A fake `getent` and `bunx` stand on PATH; the apt files live
 * under a temporary root (INSTALL_DEPS_ROOT), never the real /etc/apt. The mirror list is the
 * runner image's own (actions/runner-images configure-apt-sources.sh — three tab-separated lines,
 * the 144 B "Mirrorlist" of the green run below). The install's output is captured, not written:
 * install-deps-success.txt is lane 1's step in run 43074440038 (a real install that unpacked);
 * install-deps-fetch-failure.txt is lane 1's step tail on ci-evidence 612e89e9c (run 43033934604).
 */

const SCRIPT = "scripts/ci/install-browser-deps.sh";
const SUCCESS = readFileSync("scripts/fixtures/install-deps-success.txt", "utf8");
const FETCH_FAILURE = readFileSync("scripts/fixtures/install-deps-fetch-failure.txt", "utf8");
const MIRROR_LIST = [
  "http://azure.archive.ubuntu.com/ubuntu/\tpriority:1",
  "https://archive.ubuntu.com/ubuntu/\tpriority:2",
  "https://security.ubuntu.com/ubuntu/\tpriority:3",
  "",
].join("\n");
const AZURE = "azure.archive.ubuntu.com";
const ARCHIVE = "archive.ubuntu.com";
const SECURITY = "security.ubuntu.com";

type Run = { out: string; code: number };
type Setup = {
  /** The hosts the fake resolver answers. */
  resolves: string[];
  /** The first this-many `getent` calls answer nothing (the resolver down). */
  downCalls?: number;
  /** Each install run's output and exit code, in order. */
  runs: Run[];
  /** ubuntu.sources; the runner's mirror form when absent. */
  sources?: string;
};

const roots: string[] = [];
afterEach(() => {
  for (const dir of roots.splice(0)) rmSync(dir, { recursive: true, force: true });
});

function install(setup: Setup) {
  const dir = mkdtempSync(join(tmpdir(), "install-deps-"));
  roots.push(dir);
  const apt = join(dir, "root/etc/apt");
  mkdirSync(join(apt, "sources.list.d"), { recursive: true });
  writeFileSync(
    join(apt, "sources.list.d/ubuntu.sources"),
    setup.sources ??
      "Types: deb\nURIs: mirror+file:/etc/apt/apt-mirrors.txt\nSuites: noble noble-updates\n",
  );
  writeFileSync(join(apt, "apt-mirrors.txt"), MIRROR_LIST);
  const bin = join(dir, "bin");
  const fake = join(dir, "fake");
  mkdirSync(bin);
  mkdirSync(fake);
  writeFileSync(join(fake, "resolves"), `${setup.resolves.join("\n")}\n`);
  setup.runs.forEach((run, i) => {
    writeFileSync(join(fake, `out.${i + 1}`), run.out);
    writeFileSync(join(fake, `code.${i + 1}`), String(run.code));
  });
  writeFileSync(
    join(bin, "getent"),
    [
      "#!/usr/bin/env bash",
      `n=$(( $(cat "${fake}/getent-calls" 2>/dev/null || echo 0) + 1 ))`,
      `echo "$n" > "${fake}/getent-calls"`,
      `[ "$n" -gt ${String(setup.downCalls ?? 0)} ] || exit 2`,
      `grep -qx "$2" "${fake}/resolves" && echo "10.0.0.1 $2"`,
      "",
    ].join("\n"),
  );
  writeFileSync(
    join(bin, "bunx"),
    [
      "#!/usr/bin/env bash",
      `n=$(( $(cat "${fake}/runs" 2>/dev/null || echo 0) + 1 ))`,
      `echo "$n" > "${fake}/runs"`,
      `cat "${fake}/out.$n"`,
      `exit "$(cat "${fake}/code.$n")"`,
      "",
    ].join("\n"),
  );
  chmodSync(join(bin, "getent"), 0o755);
  chmodSync(join(bin, "bunx"), 0o755);
  const result = spawnSync("bash", [SCRIPT], {
    encoding: "utf8",
    env: {
      ...process.env,
      PATH: `${bin}:${process.env.PATH ?? ""}`,
      INSTALL_DEPS_ROOT: join(dir, "root"),
      INSTALL_DEPS_PAUSE: "0",
    },
    timeout: 20_000,
  });
  const runsFile = join(fake, "runs");
  let runs = 0;
  try {
    runs = Number(readFileSync(runsFile, "utf8").trim());
  } catch {
    runs = 0;
  }
  return {
    code: result.status,
    out: `${result.stdout}${result.stderr}`,
    runs,
    mirrors: readFileSync(join(apt, "apt-mirrors.txt"), "utf8"),
    sources: readFileSync(join(apt, "sources.list.d/ubuntu.sources"), "utf8"),
  };
}

describe("the browser's system libraries survive one apt mirror (INC-1101, DEC-366)", () => {
  it("CF-INSTALL-1 every host resolves: the table is printed, nothing is edited, the install runs once", () => {
    const got = install({
      resolves: [AZURE, ARCHIVE, SECURITY],
      runs: [{ out: SUCCESS, code: 0 }],
    });
    expect(got.code).toBe(0);
    expect(got.runs).toBe(1);
    expect(got.mirrors).toBe(MIRROR_LIST);
    expect(got.out).toContain(`ci-mirror probe: ${AZURE} → ok`);
    expect(got.out).toContain(`ci-mirror probe: ${SECURITY} → ok`);
    expect(got.out).not.toContain("::warning title=ci-mirror::");
  });

  it("CF-INSTALL-2 a host that does not resolve is dropped from the mirror list, announced, and the install runs once", () => {
    const got = install({ resolves: [ARCHIVE, SECURITY], runs: [{ out: SUCCESS, code: 0 }] });
    expect(got.code).toBe(0);
    expect(got.runs).toBe(1);
    expect(got.out).toContain(`ci-mirror probe: ${AZURE} → no address`);
    expect(got.out).toContain(`::warning title=ci-mirror::${AZURE} does not resolve — dropped`);
    expect(got.mirrors).toBe(MIRROR_LIST.split("\n").slice(1).join("\n"));
  });

  it("CF-INSTALL-3 the resolver down: the probe waits and repeats, at most five times, then fails naming every host", () => {
    const back = install({
      resolves: [AZURE, ARCHIVE, SECURITY],
      downCalls: 6,
      runs: [{ out: SUCCESS, code: 0 }],
    });
    expect(back.code).toBe(0);
    expect(back.runs).toBe(1);
    expect(back.out).toContain("probing again in 0s (2 of 5)");
    expect(back.out).not.toContain("(3 of 5)");
    expect(back.mirrors).toBe(MIRROR_LIST);

    const down = install({ resolves: [], runs: [{ out: SUCCESS, code: 0 }] });
    expect(down.code).toBe(1);
    expect(down.runs).toBe(0);
    expect(down.out).toContain("(5 of 5)");
    expect(down.out).toContain(
      `::error title=ci-mirror::no apt mirror resolves (${AZURE} ${ARCHIVE} ${SECURITY})`,
    );
    expect(down.mirrors).toBe(MIRROR_LIST);
  });

  it("CF-INSTALL-4 a failure after apt began unpacking is final: no second run (DEC-276)", () => {
    const got = install({
      resolves: [AZURE, ARCHIVE, SECURITY],
      runs: [
        { out: `${FETCH_FAILURE}${SUCCESS}`, code: 100 },
        { out: SUCCESS, code: 0 },
      ],
    });
    expect(got.code).toBe(100);
    expect(got.runs).toBe(1);
    expect(got.out).toContain("after apt's fetch stage — final, never run twice (DEC-276)");
  });

  it("CF-INSTALL-5 a failure at apt's fetch stage is probed again and run ONCE more; a second one is final", () => {
    const rescued = install({
      resolves: [AZURE, ARCHIVE, SECURITY],
      runs: [
        { out: FETCH_FAILURE, code: 1 },
        { out: SUCCESS, code: 0 },
      ],
    });
    expect(rescued.code).toBe(0);
    expect(rescued.runs).toBe(2);
    expect(rescued.out).toContain(
      "failed at apt's fetch stage (exit 1) — probing again, one more run",
    );

    const lost = install({
      resolves: [AZURE, ARCHIVE, SECURITY],
      runs: [
        { out: FETCH_FAILURE, code: 1 },
        { out: FETCH_FAILURE, code: 1 },
        { out: SUCCESS, code: 0 },
      ],
    });
    expect(lost.code).toBe(1);
    expect(lost.runs).toBe(2);
    expect(lost.out).toContain(
      `::error title=ci-mirror::the install failed at apt's fetch stage twice (exit 1; hosts: ${AZURE} ${ARCHIVE} ${SECURITY}) — final`,
    );
  });

  it("CF-INSTALL-6 plain deb822 URIs: a host that does not resolve is swapped for the public archive host that does", () => {
    const sources = [
      "Types: deb",
      `URIs: http://${AZURE}/ubuntu/`,
      "Suites: noble noble-updates",
      "",
      "Types: deb",
      `URIs: http://${AZURE}/ubuntu/`,
      "Suites: noble-security",
      "",
    ].join("\n");
    const got = install({ resolves: [ARCHIVE], sources, runs: [{ out: SUCCESS, code: 0 }] });
    expect(got.code).toBe(0);
    expect(got.runs).toBe(1);
    expect(got.out).toContain(`ci-mirror probe: ${SECURITY} → no address`);
    expect(got.out).toContain(
      `::warning title=ci-mirror::${AZURE} does not resolve — swapped for ${ARCHIVE}`,
    );
    expect(got.sources).toBe(sources.replaceAll(`http://${AZURE}/`, `http://${ARCHIVE}/`));
    expect(got.out).not.toContain(`${SECURITY} does not resolve`);

    const good = install({ resolves: [AZURE], sources, runs: [{ out: SUCCESS, code: 0 }] });
    expect(good.sources).toBe(sources);
    expect(good.out).not.toContain("::warning title=ci-mirror::");
  });
});
