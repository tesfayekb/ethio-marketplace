// INC-1295 — the strings' usage maps are built, never committed: the generator's map of a planted
// tree, the build plugin (client only, emits the served copy, writes the docs copy, refuses an
// empty map), the dev server's answer, and the guard that judges a build's copies.
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { staleCopies } from "./i18n-map-guard";
import {
  DOCS_COPY,
  USAGE_MAP_FILE,
  nonEmptyUsageMap,
  usageMap,
  usageMapPlugin,
} from "./i18n-usage-map";

const roots: string[] = [];
afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

function plantedTree(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "usage-map-"));
  roots.push(root);
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
  return root;
}

const TREE = {
  "src/routes/index.tsx": 'import { Thing } from "@/components/thing";\nt("home.title");\n',
  "src/components/thing.tsx": 'export const Thing = () => t("thing.label") + t(dynamicKey);\n',
  "src/lib/orphan.ts": 't("orphan.key");\n',
  "src/lib/orphan.test.ts": 't("test.only");\n',
};

function hookOf(plugin: unknown, name: string): (...args: unknown[]) => unknown {
  const hook: unknown =
    typeof plugin === "object" && plugin !== null ? Reflect.get(plugin, name) : undefined;
  if (typeof hook !== "function") throw new Error(`the plugin has no ${name} function`);
  return (...args: unknown[]) => Reflect.apply(hook, plugin, args);
}

describe("the strings' usage map is built, never committed (INC-1295)", () => {
  it("UMAP-1 a planted tree's map names each key's pages, counts dynamic calls, and is a pure function of src/", () => {
    const root = plantedTree(TREE);
    const map = usageMap(root);
    expect(JSON.parse(map.json)).toEqual({
      generator: "scripts/i18n-usage-map.ts",
      scanned: 3,
      dynamicCallSites: 1,
      keys: {
        "home.title": ["/"],
        "orphan.key": ["component: orphan"],
        "thing.label": ["/"],
      },
    });
    expect(map.keyCount).toBe(3);
    expect(usageMap(root).json).toBe(map.json);
  });

  it('UMAP-2 a tree with no t("key") call site is refused, never served as an empty map', () => {
    const root = plantedTree({ "src/routes/index.tsx": "export const x = 1;\n" });
    expect(usageMap(root).keyCount).toBe(0);
    expect(() => nonEmptyUsageMap(root)).toThrow(/no t\("key"\) call site/);
  });

  it("UMAP-3 the build half runs in the client environment only, emits the served copy and writes the docs copy", () => {
    const root = plantedTree(TREE);
    const [build, serve] = usageMapPlugin(root);
    expect(build?.apply).toBe("build");
    expect(serve?.apply).toBe("serve");
    const applies = hookOf(build, "applyToEnvironment");
    expect(["client", "ssr", "nitro"].map((name) => applies({ name }))).toEqual([
      true,
      false,
      false,
    ]);
    const emitted: unknown[] = [];
    const generateBundle = Reflect.get(build ?? {}, "generateBundle");
    if (typeof generateBundle !== "function") throw new Error("no generateBundle");
    Reflect.apply(generateBundle, { emitFile: (file: unknown) => emitted.push(file) }, []);
    const fresh = usageMap(root).json;
    expect(emitted).toEqual([{ type: "asset", fileName: USAGE_MAP_FILE, source: fresh }]);
    expect(readFileSync(join(root, DOCS_COPY), "utf8")).toBe(fresh);

    const empty = plantedTree({ "src/routes/index.tsx": "export const x = 1;\n" });
    const emptyBuild = Reflect.get(usageMapPlugin(empty)[0] ?? {}, "generateBundle");
    if (typeof emptyBuild !== "function") throw new Error("no generateBundle");
    expect(() => Reflect.apply(emptyBuild, { emitFile: () => "" }, [])).toThrow(/no t\("key"\)/);
  });

  it("UMAP-4 the dev server answers /i18n-usage.json from the tree and passes every other path on", () => {
    const root = plantedTree(TREE);
    const handlers: unknown[] = [];
    hookOf(
      usageMapPlugin(root)[1],
      "configureServer",
    )({
      middlewares: { use: (handler: unknown) => handlers.push(handler) },
    });
    const handler = handlers[0];
    if (typeof handler !== "function") throw new Error("no middleware registered");
    const answer = (url: string) => {
      const headers: Record<string, string> = {};
      let body: unknown = null;
      let passed = false;
      const res = {
        setHeader: (name: string, value: string) => {
          headers[name] = value;
        },
        end: (text: unknown) => {
          body = text;
        },
      };
      Reflect.apply(handler, undefined, [{ url }, res, () => (passed = true)]);
      return { headers, body, passed };
    };
    const served = answer("/i18n-usage.json?v=1");
    expect(served.passed).toBe(false);
    expect(served.body).toBe(usageMap(root).json);
    expect(served.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(answer("/").passed).toBe(true);
    expect(answer("/admin/i18n-usage.json").passed).toBe(true);
  });

  it("UMAP-5 the guard refuses a build's copy that is missing or differs from a fresh generation", () => {
    const root = plantedTree(TREE);
    const fresh = usageMap(root).json;
    writeFileSync(join(root, "same.json"), fresh);
    writeFileSync(join(root, "stale.json"), fresh.replace("home.title", "home.old"));
    expect(staleCopies(["same.json"], fresh, root)).toEqual([]);
    expect(staleCopies(["stale.json", "gone.json", "same.json"], fresh, root)).toEqual([
      "stale.json: differs from a fresh generation",
      "gone.json: missing (the build writes it)",
    ]);
  });

  it("UMAP-6 the maps are wired into the build, git-ignored, and no longer in the tree", () => {
    const config = readFileSync("vite.config.ts", "utf8");
    expect(config).toContain('import { usageMapPlugin } from "./scripts/i18n-usage-map";');
    expect(config).toContain("...usageMapPlugin(PROJECT_ROOT)");
    const ignore = readFileSync(".gitignore", "utf8").split("\n");
    expect(ignore).toEqual(
      expect.arrayContaining(["/docs/generated/i18n-usage.json", "/public/i18n-usage.json"]),
    );
    const tracked = execFileSync("git", ["ls-files", "--", "docs/generated", "public"], {
      encoding: "utf8",
    });
    expect(tracked).not.toContain("i18n-usage.json");
  });
});
