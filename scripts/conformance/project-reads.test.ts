import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { codeOf, report, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * Turn 34c-2 — THE PROJECT'S ADDRESS, ITS KEY AND THE SESSION'S STORAGE NAMES ARE READ IN ONE
 * PLACE: src/lib/supabase-door.ts (`projectEnv()`, `storedSessionKey()`, `besideStoredSession()`).
 * A second reading drifts — the session clocks read the address with a pattern a local backend's
 * "localhost" defeated and fell back to any project's session in the browser; the password check
 * and the language list read the browser pair only; the root's loader kept a trailing slash. The
 * census reads the code (comments blanked) of every browser and route file: the generated client
 * (src/integrations/) and the server's own environment reader (src/server/) are not browser code.
 *
 * Turn 34c-4 — THE TESTS READ THE SESSION'S NAMES BY THE SAME RULE. The rule itself lives in
 * src/lib/session-key.ts (`authStorageKey`, `keyBeside`, `SUPABASE_PREFIX`), read by the door and
 * by e2e/helpers/session.ts; e2e/ looked for "any sb-…-auth-token" in ten places and built the
 * session clocks' names by hand, so a test could pass on a name the app does not use. CF-PROJECT-3
 * reads every e2e file but that helper for the session's names (the test's own project address,
 * E2E_SUPABASE_URL, is the harness's concern, not this one). scripts/e2e-failure-report.ts
 * redacts any project's session name from evidence on purpose and is outside both domains.
 */

type Finding = { file: string; line: number; what: string };

type Read = { pattern: RegExp; what: string };

const READS: Read[] = [
  {
    pattern: /\b(?:VITE_)?SUPABASE_URL\b/,
    what: "reads the project's address itself — through projectEnv() (src/lib/supabase-door.ts)",
  },
  {
    pattern: /\b(?:VITE_)?SUPABASE_PUBLISHABLE_KEY\b/,
    what: "reads the project's key itself — through projectEnv() (src/lib/supabase-door.ts)",
  },
  {
    pattern: /auth-token|["'`]sb-/,
    what: "names the session's storage itself — through storedSessionKey() or besideStoredSession() (src/lib/supabase-door.ts)",
  },
];

/** e2e/: the session's names only, read through the test helpers. */
const TEST_READS: Read[] = [
  {
    pattern: /auth-token|["'`]sb-/,
    what: "names the session's storage itself — through e2e/helpers/session.ts (storageKey(), besideSessionKey(), the stored-session helpers)",
  },
];

export function projectReadCensus(files: string[], reads: Read[] = READS): Finding[] {
  const findings: Finding[] = [];
  for (const file of files) {
    const lines = codeOf(readFileSync(file, "utf8")).split("\n");
    lines.forEach((text, index) => {
      for (const read of reads)
        if (read.pattern.test(text)) findings.push({ file, line: index + 1, what: read.what });
    });
  }
  return findings;
}

const domain = walkFiles(["src"], {
  ext: ["ts", "tsx"],
  skipTests: true,
  skip: /^src[\\/](?:integrations|server)(?:[\\/]|$)/,
}).filter((file) => file !== "src/lib/supabase-door.ts" && file !== "src/lib/session-key.ts");

const testDomain = walkFiles(["e2e"], { ext: ["ts"] }).filter(
  (file) => file !== "e2e/helpers/session.ts",
);

describe("the project's address, key and session names are read in one place (turn 34c-2)", () => {
  it(
    "CF-PROJECT-1 no browser or route file reads the project's address, its key or the session's storage name itself",
    () => {
      const findings = projectReadCensus(domain);
      console.log(`[project-reads] files read: ${domain.length}; findings: ${findings.length}`);
      expect(domain.length).toBeGreaterThan(0);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-PROJECT-2 the census names a planted address read, a key read and a storage name, and passes the door and a comment", () => {
    const dir = "node_modules/.cache/project-reads";
    mkdirSync(dir, { recursive: true });
    const files = {
      address: `${dir}/pr-address.ts`,
      key: `${dir}/pr-key.ts`,
      storage: `${dir}/pr-storage.ts`,
      good: `${dir}/pr-good.ts`,
    };
    try {
      writeFileSync(
        files.address,
        "export const url =\n  import.meta.env.VITE_SUPABASE_URL as string | undefined;\n",
      );
      writeFileSync(files.key, 'export const key = process.env["SUPABASE_PUBLISHABLE_KEY"];\n');
      writeFileSync(
        files.storage,
        "export const name = (ref: string) =>\n  `sb-${ref}-auth-token`;\n",
      );
      writeFileSync(
        files.good,
        'import { projectEnv } from "@/lib/supabase-door";\n// SUPABASE_URL is read by the door, as the client reads it.\nexport const url = projectEnv()?.url;\n',
      );
      expect(report(projectReadCensus(Object.values(files)))).toBe(
        [
          `${files.address}:2 reads the project's address itself — through projectEnv() (src/lib/supabase-door.ts)`,
          `${files.key}:1 reads the project's key itself — through projectEnv() (src/lib/supabase-door.ts)`,
          `${files.storage}:2 names the session's storage itself — through storedSessionKey() or besideStoredSession() (src/lib/supabase-door.ts)`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it(
    "CF-PROJECT-3 no e2e file but its session helper names the session's storage itself",
    () => {
      const findings = projectReadCensus(testDomain, TEST_READS);
      console.log(
        `[project-reads] e2e files read: ${testDomain.length}; findings: ${findings.length}`,
      );
      expect(testDomain.length).toBeGreaterThan(0);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-PROJECT-4 the e2e census names a planted key search and a hand-built clock name, and passes the helpers and a comment", () => {
    const dir = "node_modules/.cache/project-reads-e2e";
    mkdirSync(dir, { recursive: true });
    const files = {
      search: `${dir}/pt-search.ts`,
      clock: `${dir}/pt-clock.ts`,
      good: `${dir}/pt-good.ts`,
    };
    try {
      writeFileSync(
        files.search,
        'export const held = (keys: string[]) =>\n  keys.some((k) => k.startsWith("sb-") && k.endsWith("auth-token"));\n',
      );
      writeFileSync(
        files.clock,
        "export const clock = (ref: string) => `sb-${ref}-last-activity-at`;\n",
      );
      writeFileSync(
        files.good,
        'import { besideSessionKey } from "../../../e2e/helpers/session";\n// the clock lives beside sb-<ref>-auth-token\nexport const clock = besideSessionKey("last-activity-at");\n',
      );
      const what =
        "names the session's storage itself — through e2e/helpers/session.ts (storageKey(), besideSessionKey(), the stored-session helpers)";
      expect(report(projectReadCensus(Object.values(files), TEST_READS))).toBe(
        [`${files.clock}:1 ${what}`, `${files.search}:2 ${what}`].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
