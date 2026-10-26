import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-911 / INC-918 (Foundations turn 34b-2) — A PIECE FETCHED ON DEMAND THAT FAILS TO DOWNLOAD
 * TELLS THE PERSON, AND OFFERS THE ONE CURE. The browser keeps a failed module download for the
 * page's life, so asking again cannot help; refreshing the page can. The mechanism is
 * src/lib/on-demand-failure.ts (reportOnDemandFailure → the shell's one notice,
 * src/components/shell/on-demand-notice.tsx; refreshPage) and, for a piece whose own place has
 * room, LoadFailedHere in the same file as the notice.
 *
 * The census reads every browser file (tests and test support excepted) for a call of an
 * on-demand loader: a definer's loader by name (LOADERS), or `.load()` on a `loadOnce(…)` bound
 * in the same file. Each such file uses the mechanism — it calls or renders an answer imported
 * from on-demand-failure or on-demand-notice (reportOnDemandFailure, refreshPage,
 * LoadFailedHere) — or carries an allowance (`file | reason | until`) in
 * on-demand-failure-allowlist.txt. The definers themselves (DEFINERS) are the mechanism's
 * plumbing and are read by ODC-3 instead: resilientLazy reports for every component it fetches,
 * and no file outside them exports a loader its callers could miss.
 */

type Finding = { file: string; line: number; what: string };

/** The files that define on-demand loaders, and the loaders their callers call by name. */
export const DEFINERS: Record<string, readonly string[]> = {
  "src/lib/load-once.ts": [],
  "src/lib/resilient-lazy.ts": [],
  "src/components/ui/overlay-loader.ts": ["loadOverlays"],
  "src/lib/supabase-door.ts": ["getSupabase"],
  "src/features/posting/map/leaflet.ts": ["loadLeaflet"],
  "src/features/posting/phone-parse.ts": ["loadPhoneLib"],
  "src/i18n/compiled-catalog.ts": ["compiledCatalogLoader", "compiledLayerLoader"],
};
const LOADERS = new Set(Object.values(DEFINERS).flat());

/** The mechanism's modules, and the names whose use answers a failure through it. */
const MECHANISM = /(?:^|\/)(?:on-demand-failure|on-demand-notice)$/;
const ANSWERS = new Set(["reportOnDemandFailure", "refreshPage", "LoadFailedHere"]);

function isLoadOnceCall(node: ts.Node | undefined): boolean {
  return (
    node !== undefined &&
    ts.isCallExpression(node) &&
    ts.isIdentifier(node.expression) &&
    node.expression.text === "loadOnce"
  );
}

/** Every loader call in `files` that is not answered through the mechanism. */
export function onDemandFailureCensus(files: string[]): {
  consumers: string[];
  findings: Finding[];
} {
  const consumers: string[] = [];
  const findings: Finding[] = [];
  for (const file of files) {
    const bound = new Set<string>();
    const calls: number[] = [];
    const imported = new Set<string>();
    let uses = false;
    let exportsLoader = 0;
    visitTs(file, (node, source) => {
      if (
        ts.isImportDeclaration(node) &&
        ts.isStringLiteral(node.moduleSpecifier) &&
        MECHANISM.test(node.moduleSpecifier.text)
      ) {
        const named = node.importClause?.namedBindings;
        if (named !== undefined && ts.isNamedImports(named))
          for (const element of named.elements)
            if (ANSWERS.has((element.propertyName ?? element.name).text))
              imported.add(element.name.text);
        return;
      }
      // A use is a reference to an answer imported from the mechanism (a call, a handler, a JSX
      // element) — importing the shell's notice to draw it answers nothing.
      if (ts.isIdentifier(node) && imported.has(node.text) && !ts.isImportSpecifier(node.parent))
        uses = true;
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
        if (isLoadOnceCall(node.initializer)) {
          bound.add(node.name.text);
          const statement = node.parent?.parent;
          if (
            statement !== undefined &&
            ts.isVariableStatement(statement) &&
            statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
          )
            exportsLoader = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
        }
      }
      if (!ts.isCallExpression(node)) return;
      const callee = node.expression;
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      if (ts.isIdentifier(callee) && LOADERS.has(callee.text)) calls.push(line);
      // A loadOnce is bound at the top of its module, before any call reads it.
      if (
        ts.isPropertyAccessExpression(callee) &&
        callee.name.text === "load" &&
        ts.isIdentifier(callee.expression) &&
        bound.has(callee.expression.text)
      )
        calls.push(line);
    });
    if (exportsLoader > 0)
      findings.push({
        file,
        line: exportsLoader,
        what: "exports a loadOnce loader outside DEFINERS (its callers would escape the census)",
      });
    if (calls.length === 0) continue;
    consumers.push(file);
    if (!uses)
      findings.push({
        file,
        line: Math.min(...calls),
        what: "calls an on-demand loader and answers its failure without the mechanism",
      });
  }
  return { consumers, findings };
}

const domain = walkFiles(["src"], {
  ext: ["ts", "tsx"],
  skipTests: true,
  skip: /^src\/(?:server\/|server\.ts$|routes\/api\/|test\/|.*\.server\.ts$)/,
}).filter((file) => !(file in DEFINERS));
const { consumers, findings } = onDemandFailureCensus(domain);
const ALLOWLIST = "scripts/conformance/on-demand-failure-allowlist.txt";
const allowances = readAllowlist(
  ALLOWLIST,
  findings.map((hit) => hit.file),
);

describe("a piece fetched on demand that fails to download tells the person (INC-911)", () => {
  it(
    "ODC-1 every caller of an on-demand loader answers a failure through the mechanism or has a live allowance",
    () => {
      console.log(
        `[ODC-1] loader callers: ${consumers.length}; outside the mechanism: ${findings.length}; allowlist: ${allowances.size}`,
      );
      expect(consumers.length).toBeGreaterThanOrEqual(15);
      expect(report(findings.filter((hit) => !allowances.has(hit.file)))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("ODC-2 the census sees a planted silent caller and an exported loader, and passes a planted user", () => {
    const dir = "node_modules/.cache/on-demand-failure";
    mkdirSync(dir, { recursive: true });
    const silent = `${dir}/odc-silent.tsx`;
    const exported = `${dir}/odc-exported.ts`;
    const own = `${dir}/odc-own.ts`;
    const user = `${dir}/odc-user.tsx`;
    const drawer = `${dir}/odc-drawer.tsx`;
    try {
      writeFileSync(
        silent,
        'import { loadLeaflet } from "@/features/posting/map/leaflet";\nvoid loadLeaflet().catch(() => undefined);\n',
      );
      writeFileSync(
        exported,
        'import { loadOnce } from "@/lib/load-once";\nexport const MAP = loadOnce(() => import("./map"));\n',
      );
      writeFileSync(
        own,
        'import { loadOnce } from "@/lib/load-once";\nconst MAP = loadOnce(() => import("./map"));\nconst other = { load: () => 1 };\nother.load();\nvoid MAP.load().catch(() => undefined);\n',
      );
      writeFileSync(
        user,
        'import { reportOnDemandFailure } from "@/lib/on-demand-failure";\nimport { getSupabase } from "@/lib/supabase-door";\nvoid getSupabase().catch((e) => reportOnDemandFailure("x", e));\n',
      );
      writeFileSync(
        drawer,
        'import { OnDemandNotice } from "@/components/shell/on-demand-notice";\nimport { getSupabase } from "@/lib/supabase-door";\nvoid getSupabase().catch(() => undefined);\nexport const Shell = () => <OnDemandNotice />;\n',
      );
      const result = onDemandFailureCensus([silent, exported, own, user, drawer]);
      expect(result.consumers).toEqual([silent, own, user, drawer]);
      expect(report(result.findings)).toBe(
        [
          `${drawer}:3 calls an on-demand loader and answers its failure without the mechanism`,
          `${drawer}:3 catches a failed download of getSupabase silently, and no call in the file handles it`,
          `${exported}:2 exports a loadOnce loader outside DEFINERS (its callers would escape the census)`,
          `${own}:5 calls an on-demand loader and answers its failure without the mechanism`,
          `${own}:5 catches a failed download of MAP silently, and no call in the file handles it`,
          `${silent}:2 calls an on-demand loader and answers its failure without the mechanism`,
          `${silent}:2 catches a failed download of loadLeaflet silently, and no call in the file handles it`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("ODC-4 each call handles its own failure: an aliased or namespaced loader is still a call, and a mention elsewhere answers nothing (34b-2's reviewer)", () => {
    const dir = "node_modules/.cache/on-demand-failure-4";
    mkdirSync(dir, { recursive: true });
    const files = {
      aliased: `${dir}/odc-aliased.ts`,
      namespaced: `${dir}/odc-namespaced.ts`,
      mention: `${dir}/odc-mention.ts`,
      warm: `${dir}/odc-warm.ts`,
      lazy: `${dir}/odc-lazy.ts`,
      factory: `${dir}/odc-factory.ts`,
    };
    const report4 = 'import { reportOnDemandFailure } from "@/lib/on-demand-failure";\n';
    try {
      writeFileSync(
        files.aliased,
        `${report4}import { getSupabase as client } from "@/lib/supabase-door";\nvoid client();\nexport const told = () => reportOnDemandFailure("x", 1);\n`,
      );
      writeFileSync(
        files.namespaced,
        'import * as door from "@/lib/supabase-door";\nvoid door.getSupabase().then(() => 1);\n',
      );
      writeFileSync(
        files.mention,
        'import { refreshPage } from "@/lib/on-demand-failure";\nimport { loadLeaflet } from "@/features/posting/map/leaflet";\nexport const go = refreshPage;\nvoid loadLeaflet().catch(() => undefined);\n',
      );
      writeFileSync(
        files.warm,
        `${report4}import { loadOverlays } from "@/components/ui/overlay-loader";\nloadOverlays().catch(() => undefined);\nloadOverlays().catch((error) => reportOnDemandFailure("x", error));\n`,
      );
      writeFileSync(
        files.lazy,
        'import { refreshPage } from "@/lib/on-demand-failure";\nimport { loadOnce } from "@/lib/load-once";\nimport { resilientLazy } from "@/lib/resilient-lazy";\nconst MAP = loadOnce(() => import("./map"));\nexport const Map = resilientLazy(() => MAP.load().then((m) => m.Map), "the map", () => null);\nexport const go = refreshPage;\n',
      );
      writeFileSync(
        files.factory,
        `${report4}import { compiledCatalogLoader } from "@/i18n/compiled-catalog";\nexport async function read() {\n  const loader = compiledCatalogLoader("xx");\n  try {\n    return await loader?.();\n  } catch (error) {\n    reportOnDemandFailure("x", error);\n  }\n}\n`,
      );
      const result = onDemandFailureCensus(Object.values(files));
      expect(result.consumers).toEqual(Object.values(files));
      expect(report(result.findings)).toBe(
        [
          `${files.aliased}:3 leaves a failed download of getSupabase unhandled`,
          `${files.mention}:4 catches a failed download of loadLeaflet silently, and no call in the file handles it`,
          `${files.namespaced}:2 calls an on-demand loader and answers its failure without the mechanism`,
          `${files.namespaced}:2 leaves a failed download of getSupabase unhandled`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("ODC-3 the definers: resilientLazy reports, and every named loader exists over a loadOnce", () => {
    expect(readFileSync("src/lib/resilient-lazy.ts", "utf8")).toMatch(
      /reportOnDemandFailure\(label, error\)/,
    );
    for (const [file, loaders] of Object.entries(DEFINERS)) {
      const text = readFileSync(file, "utf8");
      for (const loader of loaders)
        expect(text, `${file} defines ${loader}`).toMatch(
          new RegExp(`export\\s+(?:async\\s+)?function\\s+${loader}\\b`),
        );
    }
    // Every definer binds a loadOnce, so a renamed or moved loader is seen here.
    for (const file of Object.keys(DEFINERS).filter((file) => !file.endsWith("load-once.ts")))
      if (!file.endsWith("resilient-lazy.ts"))
        expect(readFileSync(file, "utf8"), `${file} binds a loadOnce`).toMatch(/\bloadOnce\(/);
  });
});
