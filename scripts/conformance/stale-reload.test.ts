import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

import { codeOf, readAllowlist, report, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * INC-1128 (the app-fixes turn, part B) — ONE RELOADER FOR A FAILED DOWNLOAD. A failed download of
 * the app's own code reloads the page at most once, and never while the page is leaving: that is
 * `reloadOnStaleChunk` with `hearLeaving` (src/lib/stale-chunk.ts), installed once by the root
 * route. A second reloader in the app's code does not know the page is leaving, nor that the page
 * already reloaded once.
 *
 * The census reads every browser file under src/ (tests aside), comments blanked and strings kept
 * (the root error page's button is HTML in a string), for `location.reload` — a call or a
 * reference. Each hit is the mechanism's own file, or its file carries a line in
 * stale-reload-allowlist.txt (`<file> | reason | until`). What the census does not judge: the
 * router library's own reload on a module-load error (node_modules; INC-1128 stays open for a
 * package turn), and a reload spelt another way (`history.go(0)`, `location.assign(location.href)`)
 * — a review question.
 */

const MECHANISM = "src/lib/stale-chunk.ts";
const ALLOWLIST = "scripts/conformance/stale-reload-allowlist.txt";
const RELOAD = /\blocation\s*\.\s*reload\b/g;

type Finding = { file: string; line: number; what: string };

export function reloadFindings(root: string): Finding[] {
  const findings: Finding[] = [];
  const files = walkFiles([join(root, "src")], {
    ext: ["ts", "tsx"],
    skip: /\.test\.tsx?$|[\\/]test[\\/]|setupTests/,
  });
  for (const path of files) {
    const file = relative(root, path).split("\\").join("/");
    if (file === MECHANISM) continue;
    const code = codeOf(readFileSync(path, "utf8"));
    for (const match of code.matchAll(RELOAD)) {
      const line = code.slice(0, match.index).split("\n").length;
      findings.push({
        file,
        line,
        what: "reloads the page outside the one reloader (src/lib/stale-chunk.ts, INC-1128)",
      });
    }
  }
  return findings;
}

function unexcused(findings: Finding[], allowlist: string): Finding[] {
  const allowed = readAllowlist(
    allowlist,
    findings.map(({ file }) => file),
  );
  return findings.filter(({ file }) => !allowed.has(file));
}

describe("one reloader for a failed download (INC-1128)", () => {
  it(
    "CF-STALE-1 every location.reload under src/ is the one reloader's or an allowlisted file's",
    () => {
      const findings = reloadFindings(process.cwd());
      expect(findings.map(({ file }) => file).sort()).toEqual([
        "src/components/marketplace/feed.tsx",
        "src/lib/error-page.ts",
        "src/lib/on-demand-failure.ts",
      ]);
      expect(report(unexcused(findings, ALLOWLIST))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-STALE-2 planted: a new reload in a feature file fails by its line; the mechanism's own is read as its own", () => {
    const root = mkdtempSync(join(tmpdir(), "cf-stale-"));
    try {
      mkdirSync(join(root, "src/lib"), { recursive: true });
      mkdirSync(join(root, "src/features/x"), { recursive: true });
      writeFileSync(
        join(root, MECHANISM),
        "export const go = (w: Window) => w.location.reload();\n",
      );
      writeFileSync(
        join(root, "src/features/x/retry.tsx"),
        "// location.reload() in a comment is not a reload\nexport const retry = () =>\n  window.location.reload();\n",
      );
      writeFileSync(join(root, "src/features/x/retry.test.tsx"), "window.location.reload();\n");
      const allowlist = join(root, "allowlist.txt");
      writeFileSync(allowlist, "# planted\n");
      expect(report(unexcused(reloadFindings(root), allowlist))).toBe(
        "src/features/x/retry.tsx:3 reloads the page outside the one reloader (src/lib/stale-chunk.ts, INC-1128)",
      );
      writeFileSync(allowlist, "src/features/x/retry.tsx | planted | INC-1128\n");
      expect(report(unexcused(reloadFindings(root), allowlist))).toBe("");
      // a line whose file no longer reloads fails as stale
      writeFileSync(join(root, "src/features/x/retry.tsx"), "export const retry = () => 0;\n");
      expect(() => unexcused(reloadFindings(root), allowlist)).toThrow("stale allowance");
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
