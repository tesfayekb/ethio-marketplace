import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * D234 speed turn S1 (INC-897) — every module the browser fetches on demand is
 * fetched through `loadOnce` (src/lib/load-once.ts): once per visit, a failed
 * download retried by the next ask and answered on screen, never a crashed page
 * (a failed React.lazy chunk throws to the route's error boundary). The census
 * reads every dynamic `import(` in the browser's code; one inside a `loadOnce(`
 * call passes, and so does a component's inside `resilientLazy(`
 * (src/lib/resilient-lazy.ts, D234 S3: React.lazy whose failure renders the
 * piece's own fallback); any other needs its allowlist line (key | reason | until).
 * Server-only imports (src/server/, server routes, *.server.ts and the server
 * modules a server function loads) never run in the browser and are not read.
 */
const SERVER_SPECIFIER =
  /^(?:@\/server\/|\.\.?\/(?:\.\.\/)*server\/|@\/integrations\/supabase\/client\.server$)/;

type Finding = { file: string; line: number; what: string };

/** The two ways a browser module is fetched on demand (D234 S1, S3). */
const ON_DEMAND = new Set(["loadOnce", "resilientLazy"]);

function insideLoadOnce(node: ts.Node): boolean {
  for (let parent = node.parent; parent !== undefined; parent = parent.parent) {
    if (
      ts.isCallExpression(parent) &&
      ts.isIdentifier(parent.expression) &&
      ON_DEMAND.has(parent.expression.text)
    )
      return true;
  }
  return false;
}

export function onDemandImports(files: string[]): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (!ts.isCallExpression(node) || node.expression.kind !== ts.SyntaxKind.ImportKeyword)
        return;
      const specifier = node.arguments[0];
      if (specifier && ts.isStringLiteral(specifier) && SERVER_SPECIFIER.test(specifier.text))
        return;
      if (insideLoadOnce(node)) return;
      found.push({
        file,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        what: "fetches a module on demand outside loadOnce",
      });
    });
  }
  return found;
}

const domain = walkFiles(["src"], {
  ext: ["ts", "tsx"],
  skipTests: true,
  skip: /^src\/(?:server\/|server\.ts$|routes\/api\/|.*\.server\.ts$)/,
});
const census = onDemandImports(domain);
const ALLOWLIST = "scripts/conformance/on-demand-imports-allowlist.txt";
const allowances = readAllowlist(
  ALLOWLIST,
  census.map((hit) => hit.file),
);

describe("on-demand module loading (D234, INC-897)", () => {
  it(
    "OD-1 every browser on-demand import goes through loadOnce or has a live allowance",
    () => {
      console.log(
        `[OD-1] on-demand imports outside loadOnce: ${census.length}; allowlist: ${allowances.size}`,
      );
      expect(report(census.filter((hit) => !allowances.has(hit.file)))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("OD-2 the census sees a planted bypass and passes a planted loadOnce", () => {
    const dir = "node_modules/.cache/on-demand-imports";
    mkdirSync(dir, { recursive: true });
    const bad = `${dir}/od-bad.tsx`;
    const good = `${dir}/od-good.ts`;
    try {
      writeFileSync(
        bad,
        'import { lazy } from "react";\nconst Map = lazy(() => import("./map"));\n',
      );
      writeFileSync(
        good,
        'import { loadOnce } from "@/lib/load-once";\nconst MAP = loadOnce(() => import("./map"));\nconst Pin = resilientLazy(() => import("./pin").then((m) => m.Pin), "the pin", NoPin);\nconst s = () => import("@/server/x");\n',
      );
      expect(report(onDemandImports([bad, good]))).toBe(
        `${bad}:2 fetches a module on demand outside loadOnce`,
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("OD-3 INC-897 is closed: no allowance waits on it, and no React.lazy site is left in the browser's code", () => {
    const waiting = [...allowances.values()].filter((allowance) => allowance.until === "INC-897");
    expect(waiting).toEqual([]);
    const lazySites = domain.filter((file) =>
      /\blazy\(\s*\(\)\s*=>\s*import\(/.test(readFileSync(file, "utf8")),
    );
    expect(lazySites).toEqual([]);
  });
});
