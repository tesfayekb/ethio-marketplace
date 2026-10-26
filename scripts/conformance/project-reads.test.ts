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
 */

type Finding = { file: string; line: number; what: string };

const READS: Array<{ pattern: RegExp; what: string }> = [
  {
    pattern: /\b(?:VITE_)?SUPABASE_URL\b/,
    what: "reads the project's address itself — through projectEnv() (src/lib/supabase-door.ts)",
  },
  {
    pattern: /\b(?:VITE_)?SUPABASE_PUBLISHABLE_KEY\b/,
    what: "reads the project's key itself — through projectEnv() (src/lib/supabase-door.ts)",
  },
  {
    pattern: /auth-token/,
    what: "names the session's storage itself — through storedSessionKey() or besideStoredSession() (src/lib/supabase-door.ts)",
  },
];

export function projectReadCensus(files: string[]): Finding[] {
  const findings: Finding[] = [];
  for (const file of files) {
    const lines = codeOf(readFileSync(file, "utf8")).split("\n");
    lines.forEach((text, index) => {
      for (const read of READS)
        if (read.pattern.test(text)) findings.push({ file, line: index + 1, what: read.what });
    });
  }
  return findings;
}

const domain = walkFiles(["src"], {
  ext: ["ts", "tsx"],
  skipTests: true,
  skip: /^src[\\/](?:integrations|server)(?:[\\/]|$)/,
}).filter((file) => file !== "src/lib/supabase-door.ts");

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
});
