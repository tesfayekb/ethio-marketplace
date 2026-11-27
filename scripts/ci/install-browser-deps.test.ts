import { spawnSync } from "node:child_process";
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
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
// INC-1323 — run 46000329861 attempt 1, Lane 10 (job 140510205274), the install step's output from
// "Installing dependencies..." to the exit line, cut by script from `gh run view --job --log`.
const THIRD_PARTY_403 = readFileSync("scripts/fixtures/install-deps-third-party-403.txt", "utf8");
const SOURCES_CONF = "apt.conf.d/99ci-browser-deps-sources";
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
  /** The script's arguments: the browsers (DEC-371). */
  args?: string[];
  /** Each host's download speed in bytes a second, the fake `curl`'s answer; a host not named is fast; 0 answers nothing (INC-1277). */
  speeds?: Record<string, number>;
  /** INC-1323 — the runner's third-party list (microsoft-prod.list) sits in sources.list.d. */
  thirdParty?: boolean;
  /** INC-1323 — an earlier attempt's apt file is left behind, naming a directory that is gone. */
  leftover?: boolean;
};

const THIRD_PARTY_LIST =
  "deb [arch=amd64,arm64,armhf] https://packages.microsoft.com/ubuntu/24.04/prod noble main\n";

const roots: string[] = [];
afterEach(() => {
  for (const dir of roots.splice(0)) rmSync(dir, { recursive: true, force: true });
});

function install(setup: Setup) {
  const dir = mkdtempSync(join(tmpdir(), "install-deps-"));
  roots.push(dir);
  const apt = join(dir, "root/etc/apt");
  mkdirSync(join(apt, "sources.list.d"), { recursive: true });
  mkdirSync(join(apt, "apt.conf.d"));
  writeFileSync(
    join(apt, "sources.list.d/ubuntu.sources"),
    setup.sources ??
      "Types: deb\nURIs: mirror+file:/etc/apt/apt-mirrors.txt\nSuites: noble noble-updates\n",
  );
  writeFileSync(join(apt, "apt-mirrors.txt"), MIRROR_LIST);
  if (setup.thirdParty === true)
    writeFileSync(join(apt, "sources.list.d/microsoft-prod.list"), THIRD_PARTY_LIST);
  if (setup.leftover === true)
    writeFileSync(join(apt, SOURCES_CONF), `Dir::Etc::sourceparts "${join(dir, "gone")}";\n`);
  const bin = join(dir, "bin");
  const fake = join(dir, "fake");
  const temp = join(dir, "tmp");
  mkdirSync(bin);
  mkdirSync(fake);
  mkdirSync(temp);
  writeFileSync(join(fake, "out.403"), THIRD_PARTY_403);
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
      `echo "$*" >> "${fake}/args"`,
      // apt's source lists: the sourceparts directory the script's own apt file names, else the
      // runner's; a third-party list there answers as run 46000329861's Lane 10 did (INC-1323).
      `conf="$INSTALL_DEPS_ROOT/etc/apt/${SOURCES_CONF}"`,
      'parts="$INSTALL_DEPS_ROOT/etc/apt/sources.list.d"',
      `if [ -f "$conf" ]; then parts=$(sed -n 's/^Dir::Etc::sourceparts "\\(.*\\)";$/\\1/p' "$conf"); fi`,
      `echo "$parts" > "${fake}/partsdir.$n"`,
      `ls "$parts" > "${fake}/parts.$n" 2>/dev/null`,
      `cat "$parts/ubuntu.sources" > "${fake}/seen.$n" 2>/dev/null`,
      `if [ -e "$parts/microsoft-prod.list" ]; then cat "${fake}/out.403"; exit 1; fi`,
      `cat "${fake}/out.$n"`,
      `exit "$(cat "${fake}/code.$n")"`,
      "",
    ].join("\n"),
  );
  // INC-1277 — the speed probe's `curl`: the last argument is the index file's URL, its host decides the answer.
  writeFileSync(
    join(fake, "speeds"),
    `${Object.entries(setup.speeds ?? {})
      .map(([host, bps]) => `${host} ${String(bps)}`)
      .join("\n")}\n`,
  );
  writeFileSync(
    join(bin, "curl"),
    [
      "#!/usr/bin/env bash",
      'url="${*: -1}"',
      `echo "$url" >> "${fake}/curl-urls"`,
      'host="${url#*://}"; host="${host%%/*}"',
      `bps=$(awk -v h="$host" '$1 == h { print $2 }' "${fake}/speeds")`,
      '[ "${bps:-5000000}" -gt 0 ] || exit 28',
      'printf "%s.000" "${bps:-5000000}"',
      "",
    ].join("\n"),
  );
  chmodSync(join(bin, "curl"), 0o755);
  chmodSync(join(bin, "getent"), 0o755);
  chmodSync(join(bin, "bunx"), 0o755);
  const result = spawnSync("bash", [SCRIPT, ...(setup.args ?? [])], {
    encoding: "utf8",
    env: {
      ...process.env,
      PATH: `${bin}:${process.env.PATH ?? ""}`,
      INSTALL_DEPS_ROOT: join(dir, "root"),
      INSTALL_DEPS_PAUSE: "0",
      TMPDIR: temp,
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
  let args: string[] = [];
  try {
    args = readFileSync(join(fake, "args"), "utf8").trim().split("\n");
  } catch {
    args = [];
  }
  return {
    code: result.status,
    out: `${result.stdout}${result.stderr}`,
    runs,
    args,
    mirrors: readFileSync(join(apt, "apt-mirrors.txt"), "utf8"),
    aptConf: (() => {
      try {
        return readFileSync(join(apt, "apt.conf.d/99ci-mirror-timeouts"), "utf8");
      } catch {
        return null;
      }
    })(),
    curlUrls: (() => {
      try {
        return readFileSync(join(fake, "curl-urls"), "utf8").trim().split("\n");
      } catch {
        return [];
      }
    })(),
    sources: readFileSync(join(apt, "sources.list.d/ubuntu.sources"), "utf8"),
    /** Per install run: the source lists apt read, and the ubuntu.sources it read. */
    parts: Array.from({ length: runs }, (_, i) =>
      readOr(join(fake, `parts.${String(i + 1)}`))
        .trim()
        .split("\n"),
    ),
    seen: Array.from({ length: runs }, (_, i) => readOr(join(fake, `seen.${String(i + 1)}`))),
    thirdParty: readOr(join(apt, "sources.list.d/microsoft-prod.list")),
    /** What the script leaves behind: its apt file, and each directory apt read its lists from. */
    confLeft: existsSync(join(apt, SOURCES_CONF)),
    scratchLeft: Array.from({ length: runs }, (_, i) =>
      readOr(join(fake, `partsdir.${String(i + 1)}`)).trim(),
    ).filter((path) => path !== "" && existsSync(path)),
  };
}

function readOr(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
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

  it("CF-INSTALL-7 the browsers are a list: none means chromium, chromium webkit installs both, an unknown name is refused before the probe (DEC-371)", () => {
    const hosts = [AZURE, ARCHIVE, SECURITY];
    const plain = install({ resolves: hosts, runs: [{ out: SUCCESS, code: 0 }] });
    expect(plain.code).toBe(0);
    expect(plain.args).toEqual(["playwright install-deps chromium"]);
    expect(plain.out).toContain("ci-mirror browsers: chromium");

    const both = install({
      resolves: hosts,
      args: ["chromium", "webkit"],
      runs: [{ out: SUCCESS, code: 0 }],
    });
    expect(both.code).toBe(0);
    expect(both.args).toEqual(["playwright install-deps chromium webkit"]);
    expect(both.out).toContain("ci-mirror browsers: chromium webkit");

    const again = install({
      resolves: hosts,
      args: ["webkit"],
      runs: [
        { out: FETCH_FAILURE, code: 1 },
        { out: SUCCESS, code: 0 },
      ],
    });
    expect(again.code).toBe(0);
    expect(again.args).toEqual([
      "playwright install-deps webkit",
      "playwright install-deps webkit",
    ]);

    const typo = install({
      resolves: hosts,
      args: ["chromium", "firefox"],
      runs: [{ out: SUCCESS, code: 0 }],
    });
    expect(typo.code).toBe(2);
    expect(typo.runs).toBe(0);
    expect(typo.out).toContain(
      '::error title=ci-mirror::unknown browser "firefox" (chromium or webkit)',
    );
    expect(typo.out).not.toContain("ci-mirror probe:");
  });

  it("IBD-1 a mirror that resolves but serves slowly is dropped for the next, never the last one; apt gets stall timeouts (INC-1277, DEC-462)", () => {
    const hosts = [AZURE, ARCHIVE, SECURITY];
    // The table names each host's speed and probes one index file of the first suite.
    const fast = install({ resolves: hosts, runs: [{ out: SUCCESS, code: 0 }] });
    expect(fast.code).toBe(0);
    expect(fast.mirrors).toBe(MIRROR_LIST);
    expect(fast.out).toContain(`ci-mirror throughput: ${AZURE} → 5000 kB/s ok`);
    expect(fast.out).not.toContain("::warning title=ci-mirror::");
    expect(fast.curlUrls).toEqual([
      `http://${AZURE}/ubuntu/dists/noble/InRelease`,
      `https://${ARCHIVE}/ubuntu/dists/noble/InRelease`,
      `https://${SECURITY}/ubuntu/dists/noble/InRelease`,
    ]);
    expect(fast.aptConf).toBe(
      'Acquire::http::Timeout "20";\nAcquire::https::Timeout "20";\nAcquire::Retries "2";\n',
    );

    // The region mirror at 60 kB/s, and one that answers nothing, are left; the install runs once.
    const slow = install({
      resolves: hosts,
      speeds: { [AZURE]: 60_000, [ARCHIVE]: 0 },
      runs: [{ out: SUCCESS, code: 0 }],
    });
    expect(slow.code).toBe(0);
    expect(slow.runs).toBe(1);
    expect(slow.out).toContain(`ci-mirror throughput: ${AZURE} → 60 kB/s slow or no answer`);
    expect(slow.out).toContain(`ci-mirror throughput: ${ARCHIVE} → 0 kB/s slow or no answer`);
    expect(slow.out).toContain(
      `::warning title=ci-mirror::${AZURE} is slow or does not answer — dropped for the next mirror`,
    );
    expect(slow.mirrors).toBe("https://security.ubuntu.com/ubuntu/\tpriority:3\n");
    expect(slow.aptConf).toContain('Acquire::Retries "2";');

    // None fast enough: all kept, named, and the install still runs.
    const none = install({
      resolves: hosts,
      speeds: { [AZURE]: 60_000, [ARCHIVE]: 70_000, [SECURITY]: 80_000 },
      runs: [{ out: SUCCESS, code: 0 }],
    });
    expect(none.code).toBe(0);
    expect(none.mirrors).toBe(MIRROR_LIST);
    expect(none.out).toContain(
      `::warning title=ci-mirror::no mirror is fast enough (${AZURE} ${ARCHIVE} ${SECURITY}) — all kept`,
    );

    // A host that did not resolve is dropped first and is never measured.
    const gone = install({
      resolves: [ARCHIVE, SECURITY],
      runs: [{ out: SUCCESS, code: 0 }],
    });
    expect(gone.curlUrls).toEqual([
      `https://${ARCHIVE}/ubuntu/dists/noble/InRelease`,
      `https://${SECURITY}/ubuntu/dists/noble/InRelease`,
    ]);
  });

  it("CF-INSTALL-8 a third-party source that answers 403 does not stop the install: apt reads the distribution's own sources only (INC-1323)", () => {
    const hosts = [AZURE, ARCHIVE, SECURITY];
    const got = install({ resolves: hosts, thirdParty: true, runs: [{ out: SUCCESS, code: 0 }] });
    expect(got.code).toBe(0);
    expect(got.runs).toBe(1);
    expect(got.parts).toEqual([["ubuntu.sources"]]);
    expect(got.seen).toEqual([got.sources]);
    expect(got.out).toContain(
      "ci-mirror sources: the install reads ubuntu.sources only; left out: microsoft-prod.list",
    );
    // No runner file is edited or deleted.
    expect(got.thirdParty).toBe(THIRD_PARTY_LIST);
    expect(got.sources).toBe(
      "Types: deb\nURIs: mirror+file:/etc/apt/apt-mirrors.txt\nSuites: noble noble-updates\n",
    );
    expect(got.mirrors).toBe(MIRROR_LIST);

    // The plain deb822 form: apt reads ubuntu.sources as the probe left it (its host swapped).
    const sources = `Types: deb\nURIs: http://${AZURE}/ubuntu/\nSuites: noble\n`;
    const swapped = install({
      resolves: [ARCHIVE],
      sources,
      thirdParty: true,
      runs: [{ out: SUCCESS, code: 0 }],
    });
    expect(swapped.code).toBe(0);
    expect(swapped.sources).toContain(`URIs: http://${ARCHIVE}/ubuntu/`);
    expect(swapped.seen).toEqual([swapped.sources]);

    // A fetch-stage retry reads the same scope.
    const twice = install({
      resolves: hosts,
      thirdParty: true,
      runs: [
        { out: FETCH_FAILURE, code: 1 },
        { out: SUCCESS, code: 0 },
      ],
    });
    expect(twice.code).toBe(0);
    expect(twice.parts).toEqual([["ubuntu.sources"], ["ubuntu.sources"]]);
  });

  it("CF-INSTALL-9 the script's apt file and scratch directory are gone after a success and after a failure; a leftover is overwritten", () => {
    const hosts = [AZURE, ARCHIVE, SECURITY];
    const success = install({
      resolves: hosts,
      thirdParty: true,
      runs: [{ out: SUCCESS, code: 0 }],
    });
    expect(success.code).toBe(0);
    expect([success.confLeft, success.scratchLeft]).toEqual([false, []]);

    const failure = install({
      resolves: hosts,
      thirdParty: true,
      runs: [{ out: `${FETCH_FAILURE}${SUCCESS}`, code: 100 }],
    });
    expect(failure.code).toBe(100);
    expect(failure.parts).toEqual([["ubuntu.sources"]]);
    expect([failure.confLeft, failure.scratchLeft]).toEqual([false, []]);

    const leftover = install({
      resolves: hosts,
      thirdParty: true,
      leftover: true,
      runs: [{ out: SUCCESS, code: 0 }],
    });
    expect(leftover.code).toBe(0);
    expect(leftover.parts).toEqual([["ubuntu.sources"]]);
    expect([leftover.confLeft, leftover.scratchLeft]).toEqual([false, []]);

    // Nothing resolves: the script stops before the install (no scratch directory was made) and
    // still leaves no apt file behind.
    const down = install({ resolves: [], downCalls: 99, leftover: true, runs: [] });
    expect(down.code).toBe(1);
    expect(down.runs).toBe(0);
    expect(down.confLeft).toBe(false);
  });
});
