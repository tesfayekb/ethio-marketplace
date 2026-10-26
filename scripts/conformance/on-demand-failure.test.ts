import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { posix } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { ownValue } from "../../src/lib/own-key";
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
 * on-demand loader: a definer's loader IMPORTED from its definer — under any local name, or
 * through a namespace import (Foundations turn 34b-3; 34b-2's reviewer, MAJOR 1) — or `.load()`
 * on a `loadOnce(…)` bound in the same file. Each such file uses the mechanism — it calls or
 * renders an answer imported from on-demand-failure or on-demand-notice (reportOnDemandFailure,
 * refreshPage, LoadFailedHere) — or carries an allowance (`file | reason | until`) in
 * on-demand-failure-allowlist.txt. And each CALL handles its own failure (MAJOR 2): its promise
 * chain carries a rejection handler (`.catch(h)`, `.then(ok, h)`, through Promise.all), or it is
 * awaited inside a try with a catch; a handler that does nothing is a warm-up, allowed only when
 * another call of the same loader in the file handles its failure; a call inside the function a
 * resilientLazy is given is answered by resilientLazy. A loader factory's call
 * (compiledCatalogLoader) is judged by the calls of the loader it returns. The definers themselves
 * (DEFINERS) are the mechanism's plumbing and are read by ODC-3 instead. What the census does not
 * judge: whether a handler that does something answers the person — a review question.
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
/** Loaders that return the loader to call rather than a promise. */
const FACTORIES = new Set(["compiledCatalogLoader", "compiledLayerLoader"]);

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

/** The definer a module specifier names, from `file`: "@/…" is src/…, "./…" is beside it. */
function definerOf(specifier: string, file: string): string | undefined {
  const base = specifier.startsWith("@/")
    ? `src/${specifier.slice(2)}`
    : specifier.startsWith(".")
      ? posix.normalize(posix.join(posix.dirname(file), specifier))
      : undefined;
  if (base === undefined) return undefined;
  return Object.keys(DEFINERS).find((definer) => definer.replace(/\.tsx?$/, "") === base);
}

const PROMISE_COMBINERS = new Set(["all", "allSettled", "race", "any"]);

/** The rejection handler of a loader call's promise, "lazy" inside resilientLazy, or null. */
function rejectionHandler(call: ts.Node): ts.Node | "lazy" | null {
  for (let up: ts.Node = call; up.parent !== undefined; up = up.parent) {
    if (ts.isFunctionLike(up)) {
      const host = up.parent;
      if (
        ts.isCallExpression(host) &&
        ts.isIdentifier(host.expression) &&
        host.expression.text === "resilientLazy"
      )
        return "lazy";
      break;
    }
  }
  let node: ts.Node = call;
  for (;;) {
    const parent = node.parent;
    if (parent === undefined) return null;
    if (ts.isParenthesizedExpression(parent) || ts.isAsExpression(parent)) {
      node = parent;
      continue;
    }
    if (
      ts.isArrayLiteralExpression(parent) &&
      ts.isCallExpression(parent.parent) &&
      ts.isPropertyAccessExpression(parent.parent.expression) &&
      ts.isIdentifier(parent.parent.expression.expression) &&
      parent.parent.expression.expression.text === "Promise" &&
      PROMISE_COMBINERS.has(parent.parent.expression.name.text)
    ) {
      node = parent.parent;
      continue;
    }
    if (
      ts.isPropertyAccessExpression(parent) &&
      parent.expression === node &&
      ts.isCallExpression(parent.parent) &&
      parent.parent.expression === parent
    ) {
      const step = parent.name.text;
      const chained = parent.parent;
      if (step === "catch") return handlerIn(chained.arguments[0]);
      if (step === "then" && chained.arguments.length >= 2) return handlerIn(chained.arguments[1]);
      if (step === "then" || step === "finally") {
        node = chained;
        continue;
      }
      return null;
    }
    if (ts.isAwaitExpression(parent)) {
      for (let up: ts.Node = parent; up.parent !== undefined; up = up.parent) {
        if (ts.isFunctionLike(up)) return null;
        const host = up.parent;
        if (ts.isTryStatement(host) && host.tryBlock === up && host.catchClause !== undefined)
          return host.catchClause.block;
      }
      return null;
    }
    return null;
  }
}

/** No handler at all: `undefined`, `null` or `void 0` where a handler goes (turn 34b-3's reviewer). */
function isNothing(node: ts.Node): boolean {
  return (
    (ts.isIdentifier(node) && node.text === "undefined") ||
    node.kind === ts.SyntaxKind.NullKeyword ||
    ts.isVoidExpression(node)
  );
}

/** The handler an argument gives, or null when it gives none. */
function handlerIn(node: ts.Node | undefined): ts.Node | null {
  return node === undefined || isNothing(node) ? null : node;
}

/** A body that does nothing: no statement, or only `return;`, `return undefined;`, `return void 0;`. */
function doesNothing(block: ts.Block): boolean {
  return block.statements.every(
    (statement) =>
      ts.isEmptyStatement(statement) ||
      (ts.isReturnStatement(statement) &&
        (statement.expression === undefined || isNothing(statement.expression))),
  );
}

/**
 * A handler that does nothing: `() => undefined`, `() => {}`, `() => void 0`, `() => { return undefined; }`,
 * or an empty `catch {}` around an awaited call (turn 34b-3's reviewer, MAJOR 1).
 */
function isSilent(handler: ts.Node): boolean {
  if (ts.isBlock(handler)) return doesNothing(handler);
  if (!ts.isArrowFunction(handler) && !ts.isFunctionExpression(handler)) return false;
  const body = handler.body;
  if (ts.isBlock(body)) return doesNothing(body);
  return isNothing(body);
}

/** The calls of the loader a factory call returned (`const loader = compiledCatalogLoader(…)`). */
function factoryLoads(call: ts.CallExpression): ts.Node[] {
  const declaration = call.parent;
  if (!ts.isVariableDeclaration(declaration) || !ts.isIdentifier(declaration.name)) return [call];
  const name = declaration.name.text;
  let scope: ts.Node = declaration;
  while (scope.parent !== undefined && !ts.isFunctionLike(scope) && !ts.isSourceFile(scope))
    scope = scope.parent;
  const loads: ts.Node[] = [];
  const look = (node: ts.Node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === name
    )
      loads.push(node);
    ts.forEachChild(node, look);
  };
  look(scope);
  return loads.length > 0 ? loads : [call];
}

type LoaderCall = { loader: string; node: ts.Node; line: number };

/** Every loader call in `files` that is not answered through the mechanism. */
export function onDemandFailureCensus(files: string[]): {
  consumers: string[];
  findings: Finding[];
} {
  const consumers: string[] = [];
  const findings: Finding[] = [];
  for (const file of files) {
    const bound = new Set<string>();
    const named = new Map<string, string>();
    const namespaces = new Map<string, readonly string[]>();
    const calls: LoaderCall[] = [];
    const imported = new Set<string>();
    let uses = false;
    let exportsLoader = 0;
    visitTs(file, (node, source) => {
      if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
        const specifier = node.moduleSpecifier.text;
        const bindings = node.importClause?.namedBindings;
        if (MECHANISM.test(specifier)) {
          if (bindings !== undefined && ts.isNamedImports(bindings))
            for (const element of bindings.elements)
              if (ANSWERS.has((element.propertyName ?? element.name).text))
                imported.add(element.name.text);
          return;
        }
        const definer = definerOf(specifier, file);
        if (definer === undefined) return;
        const loaders = ownValue(DEFINERS, definer) ?? [];
        if (bindings !== undefined && ts.isNamedImports(bindings))
          for (const element of bindings.elements) {
            const name = (element.propertyName ?? element.name).text;
            if (loaders.includes(name)) named.set(element.name.text, name);
          }
        if (bindings !== undefined && ts.isNamespaceImport(bindings))
          namespaces.set(bindings.name.text, loaders);
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
      const viaName = ts.isIdentifier(callee) ? named.get(callee.text) : undefined;
      if (viaName !== undefined) calls.push({ loader: viaName, node, line });
      if (
        ts.isPropertyAccessExpression(callee) &&
        ts.isIdentifier(callee.expression) &&
        namespaces.get(callee.expression.text)?.includes(callee.name.text) === true
      )
        calls.push({ loader: callee.name.text, node, line });
      // A loadOnce is bound at the top of its module, before any call reads it.
      if (
        ts.isPropertyAccessExpression(callee) &&
        callee.name.text === "load" &&
        ts.isIdentifier(callee.expression) &&
        bound.has(callee.expression.text)
      )
        calls.push({ loader: callee.expression.text, node, line });
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
        line: Math.min(...calls.map((call) => call.line)),
        what: "calls an on-demand loader and answers its failure without the mechanism",
      });
    const judged = calls.map((call) => {
      const loads =
        FACTORIES.has(call.loader) && ts.isCallExpression(call.node)
          ? factoryLoads(call.node)
          : [call.node];
      const handlers = loads.map(rejectionHandler);
      const verdict = handlers.some((handler) => handler === null)
        ? ("unhandled" as const)
        : handlers.some((handler) => handler !== "lazy" && isSilent(handler))
          ? ("silent" as const)
          : ("handled" as const);
      return { ...call, verdict };
    });
    for (const call of judged) {
      if (call.verdict === "unhandled")
        findings.push({
          file,
          line: call.line,
          what: `leaves a failed download of ${call.loader} unhandled`,
        });
      if (
        call.verdict === "silent" &&
        !judged.some((other) => other.loader === call.loader && other.verdict === "handled")
      )
        findings.push({
          file,
          line: call.line,
          what: `catches a failed download of ${call.loader} silently, and no call in the file handles it`,
        });
    }
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

  it("ODC-5 a handler that does nothing is silent, and no handler is none: an empty catch, a bare return, then(ok, undefined), catch(undefined) (34b-3's reviewer)", () => {
    const dir = "node_modules/.cache/on-demand-failure-5";
    mkdirSync(dir, { recursive: true });
    const files = {
      emptyCatch: `${dir}/odc-empty-catch.ts`,
      bareReturn: `${dir}/odc-bare-return.ts`,
      thenUndefined: `${dir}/odc-then-undefined.ts`,
      catchUndefined: `${dir}/odc-catch-undefined.ts`,
      handled: `${dir}/odc-handled.ts`,
    };
    const head =
      'import { reportOnDemandFailure } from "@/lib/on-demand-failure";\nimport { loadLeaflet } from "@/features/posting/map/leaflet";\n';
    try {
      writeFileSync(
        files.emptyCatch,
        `${head}export async function go() {\n  try {\n    await loadLeaflet();\n  } catch {}\n}\nexport const told = () => reportOnDemandFailure("x", 1);\n`,
      );
      writeFileSync(
        files.bareReturn,
        `${head}void loadLeaflet().catch(() => {\n  return undefined;\n});\nexport const told = () => reportOnDemandFailure("x", 1);\n`,
      );
      writeFileSync(
        files.thenUndefined,
        `${head}void loadLeaflet().then(() => 1, undefined);\nexport const told = () => reportOnDemandFailure("x", 1);\n`,
      );
      writeFileSync(
        files.catchUndefined,
        `${head}void loadLeaflet().catch(undefined);\nexport const told = () => reportOnDemandFailure("x", 1);\n`,
      );
      writeFileSync(
        files.handled,
        `${head}void loadLeaflet().catch((error: unknown) => reportOnDemandFailure("the map", error));\n`,
      );
      const result = onDemandFailureCensus(Object.values(files));
      expect(result.consumers).toEqual(Object.values(files));
      expect(report(result.findings)).toBe(
        [
          `${files.bareReturn}:3 catches a failed download of loadLeaflet silently, and no call in the file handles it`,
          `${files.catchUndefined}:3 leaves a failed download of loadLeaflet unhandled`,
          `${files.emptyCatch}:5 catches a failed download of loadLeaflet silently, and no call in the file handles it`,
          `${files.thenUndefined}:3 leaves a failed download of loadLeaflet unhandled`,
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
