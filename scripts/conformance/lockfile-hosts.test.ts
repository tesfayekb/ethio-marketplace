import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { readAllowlist, report } from "./kit";

/**
 * DEC-363 (the lockfile turn) — one install everywhere: every tarball address in bun.lock is the
 * public registry's, so every `bun install --frozen-lockfile` (the executor's, CI's, the
 * supervisor's) fetches from the same place and bun's `sha512-` check proves the same bytes. A
 * private cache's address (a platform's own install writes one) is refused outside its sandbox.
 * - CF-LOCK-1: every URL in bun.lock is on registry.npmjs.org; another host joins only by a line in
 *   lockfile-hosts-allowlist.txt, keyed by the host (`host | reason | until`). Empty at birth.
 * - CF-LOCK-2: the self-test — a planted lockfile text with one private-cache URL fails by that
 *   line; a registry URL passes.
 */

type Finding = { file: string; line: number; what: string; host: string };

const LOCKFILE = "bun.lock";
const ALLOWLIST = "scripts/conformance/lockfile-hosts-allowlist.txt";
const REGISTRY = "registry.npmjs.org";
const URL_HOST = /\b[a-z][a-z0-9+.-]*:\/\/([^/"\s]+)/gi;

/** CF-LOCK-1 — each URL of the lockfile whose host is not the public registry, by line. */
export function hostFindings(text: string, file: string): Finding[] {
  const findings: Finding[] = [];
  text.split("\n").forEach((content, index) => {
    for (const match of content.matchAll(URL_HOST)) {
      const host = match[1].toLowerCase();
      if (host === REGISTRY && match[0].toLowerCase().startsWith("https://")) continue;
      findings.push({
        file,
        line: index + 1,
        host,
        what: `${match[0]} is not ${REGISTRY}`,
      });
    }
  });
  return findings;
}

describe("one install everywhere: the lockfile's addresses are the public registry's (DEC-363)", () => {
  it("CF-LOCK-1 every URL in bun.lock is on registry.npmjs.org or an allowlisted host", () => {
    const text = readFileSync(LOCKFILE, "utf8");
    const findings = hostFindings(text, LOCKFILE);
    const allowances = readAllowlist(
      ALLOWLIST,
      findings.map((f) => f.host),
    );
    const urls = [...text.matchAll(URL_HOST)].length;
    console.log(`[lockfile-hosts] urls: ${urls}, findings: ${findings.length}`);
    expect(urls).toBeGreaterThan(0);
    expect(report(findings.filter((f) => !allowances.has(f.host)))).toBe("");
  });

  it("CF-LOCK-2 a planted private-cache URL fails by its line; a registry URL passes", () => {
    const planted = [
      "{",
      '  "lockfileVersion": 1,',
      '  "packages": {',
      '    "a": ["a@1.0.0", "https://registry.npmjs.org/a/-/a-1.0.0.tgz", {}, "sha512-AA=="],',
      '    "b": ["b@2.0.0", "https://europe-west1-npm.pkg.dev/lovable-core-prod/sandbox-npm-cache/b/-/b-2.0.0.tgz", {}, "sha512-BB=="],',
      '    "c": ["c@3.0.0", "http://registry.npmjs.org/c/-/c-3.0.0.tgz", {}, "sha512-CC=="],',
      "  }",
      "}",
    ].join("\n");
    const findings = hostFindings(planted, "planted.lock");
    expect(findings.map((f) => [f.line, f.host])).toEqual([
      [5, "europe-west1-npm.pkg.dev"],
      [6, "registry.npmjs.org"],
    ]);
    expect(report(findings)).toContain("planted.lock:5 https://europe-west1-npm.pkg.dev");
    expect(hostFindings('"https://registry.npmjs.org/a/-/a-1.0.0.tgz"', "ok.lock")).toEqual([]);
  });
});
