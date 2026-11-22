import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, posix, relative, sep } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { ownValue } from "../../src/lib/own-key";
import { report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * DEC-259 (Foundations turn 31; D234 speed S8) and DEC-260 (turn 32; S9) — THE
 * OVERLAY PRIMITIVES ARRIVE ON DEMAND. The Radix tooltip, dropdown menu, popover
 * (turn S6-3), dialog and alert dialog (with floating-ui and their focus and scroll layers) are
 * reached by value only through their impl files, the impl files only through
 * src/components/ui/overlays-impl.ts, and that module only through the loader's
 * loadOnce (src/components/ui/overlay-loader.ts). Everything else uses the
 * facades (tooltip.tsx, dropdown-menu.tsx, popover.tsx, dialog-primitive.tsx,
 * alert-dialog-primitive.tsx), which draw the trigger at once and the real
 * primitive on the person's first intent. A type-only import is erased by the
 * compiler and passes.
 *
 * Cursor-bundle-3 (Part 1) adds two laws about the dialog anatomy's on-demand module:
 * CF-OV-7 (nothing it reaches by value imports the language provider, a door or a query
 * module: its words arrive as props) and CF-OV-8 (the real parts are reached by value only by
 * overlays-impl.ts and the parts' own unit test, PARTS_READERS; a page takes the thin parts).
 */
type Finding = { file: string; line: number; what: string };

/** The specifiers the census watches. */
const WATCHED =
  /^(?:@radix-ui\/react-(?:tooltip|dropdown-menu|popover|dialog|alert-dialog)|(?:@\/components\/ui\/|\.{1,2}\/(?:[\w.-]+\/)*)(?:tooltip-impl|dropdown-menu-impl|popover-impl|dialog-impl|alert-dialog-impl|submenu-impl|submenu-levels|overlays-impl))$/;

/** The one file allowed to reach each watched module (an impl file by its base name). */
export const MAY_REACH: Record<string, string> = {
  "@radix-ui/react-tooltip": "src/components/ui/tooltip-impl.tsx",
  "@radix-ui/react-dropdown-menu": "src/components/ui/dropdown-menu-impl.tsx",
  // Turn S6-3: the popover joins the facade (row 48).
  "@radix-ui/react-popover": "src/components/ui/popover-impl.tsx",
  "@radix-ui/react-dialog": "src/components/ui/dialog-impl.ts",
  "@radix-ui/react-alert-dialog": "src/components/ui/alert-dialog-impl.ts",
  "./tooltip-impl": "src/components/ui/overlays-impl.ts",
  "./dropdown-menu-impl": "src/components/ui/overlays-impl.ts",
  "./popover-impl": "src/components/ui/overlays-impl.ts",
  "./dialog-impl": "src/components/ui/overlays-impl.ts",
  "./alert-dialog-impl": "src/components/ui/overlays-impl.ts",
  "./submenu-impl": "src/components/ui/overlays-impl.ts",
  "./submenu-levels": "src/components/ui/overlays-impl.ts",
  "./overlays-impl": "src/components/ui/overlay-loader.ts",
};

function typeOnlyImport(node: ts.ImportDeclaration): boolean {
  const clause = node.importClause;
  if (clause === undefined) return false;
  if (clause.isTypeOnly) return true;
  const named = clause.namedBindings;
  return (
    clause.name === undefined &&
    named !== undefined &&
    ts.isNamedImports(named) &&
    named.elements.length > 0 &&
    named.elements.every((element) => element.isTypeOnly)
  );
}

/** The string a node reaches by value: an import, an re-export, or an `import()`. */
function valueSpecifier(node: ts.Node): ts.StringLiteral | undefined {
  let specifier: ts.Expression | undefined;
  if (ts.isImportDeclaration(node) && !typeOnlyImport(node)) specifier = node.moduleSpecifier;
  else if (ts.isExportDeclaration(node) && !node.isTypeOnly) specifier = node.moduleSpecifier;
  else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword)
    specifier = node.arguments[0];
  return specifier !== undefined && ts.isStringLiteral(specifier) ? specifier : undefined;
}

/** Every value reach of a watched specifier from a file it is not allowed from. */
export function overlayReaches(files: string[], root: string): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    const name = relative(root, file).split(sep).join("/");
    visitTs(file, (node, source) => {
      const specifier = valueSpecifier(node);
      if (specifier === undefined) return;
      const text = specifier.text;
      if (!WATCHED.test(text)) return;
      const key = text.startsWith("@radix-ui/") ? text : `./${text.split("/").pop()}`;
      const allowed = ownValue(MAY_REACH, key);
      if (allowed === name) return;
      found.push({
        file: name,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        what: `reaches ${text} by value; only ${allowed ?? "no file"} may (DEC-259)`,
      });
    });
  }
  return found;
}

/** Turn S6-1 (ruling 7): the overlay packages whose primitives were retired. The packages stay
 *  in package.json until a package turn; no file reaches them, by value or by type. */
export const RETIRED =
  /^(?:@radix-ui\/react-(?:select|hover-card|context-menu|menubar|navigation-menu)|vaul|cmdk)$/;

/** The retired primitive files, which stay retired. */
export const RETIRED_FILES = [
  "command",
  "context-menu",
  "drawer",
  "hover-card",
  "menubar",
  "navigation-menu",
  "select",
  "sidebar",
].map((name) => `src/components/ui/${name}.tsx`);

/** Every reach of a retired package, type-only included. */
export function retiredReaches(files: string[], root: string): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    const name = relative(root, file).split(sep).join("/");
    visitTs(file, (node, source) => {
      let specifier: ts.Expression | undefined;
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node))
        specifier = node.moduleSpecifier;
      else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword)
        specifier = node.arguments[0];
      else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument))
        specifier = node.argument.literal;
      if (specifier === undefined || !ts.isStringLiteral(specifier)) return;
      if (!RETIRED.test(specifier.text)) return;
      found.push({
        file: name,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        what: `reaches ${specifier.text}, a retired overlay package (turn S6-1, ruling 7)`,
      });
    });
  }
  return found;
}

/** The names a module exports through `export { … }` lists. */
export function exportedNames(file: string): string[] {
  const names: string[] = [];
  visitTs(file, (node) => {
    if (
      ts.isExportDeclaration(node) &&
      node.moduleSpecifier === undefined &&
      node.exportClause !== undefined &&
      ts.isNamedExports(node.exportClause)
    )
      for (const element of node.exportClause.elements) names.push(element.name.text);
  });
  return names.sort();
}

const ALIAS = "@/";
const EXTENSIONS = [".ts", ".tsx"];

/** A module's repo path without its extension, from an alias or a relative specifier; null for a
 *  package. */
function moduleTarget(from: string, specifier: string): string | null {
  const target = specifier.startsWith(ALIAS)
    ? posix.join("src", specifier.slice(ALIAS.length))
    : specifier.startsWith(".")
      ? posix.join(posix.dirname(from), specifier)
      : null;
  if (target === null) return null;
  const extension = EXTENSIONS.find((suffix) => target.endsWith(suffix));
  return extension === undefined ? target : target.slice(0, target.length - extension.length);
}

/** The source file a target names under `root`, or null when none is there. */
function sourceOf(root: string, target: string): string | null {
  for (const candidate of [
    `${target}.ts`,
    `${target}.tsx`,
    `${target}/index.ts`,
    `${target}/index.tsx`,
  ])
    if (existsSync(join(root, candidate))) return candidate;
  return null;
}

/** The module `src/components/ui/overlay-loader.ts` loads on demand, and the one every unit test
 *  loads before its file (`src/test/setup.ts` `loadOverlays`). */
export const OVERLAYS_ENTRY = "src/components/ui/overlays-impl.ts";

/** What the on-demand modules may not reach: their words arrive as props (CF-OV-7). */
const QUERY_PACKAGES = ["@tanstack/react-query", "@tanstack/query-core"];
const DOOR_MODULES = new Set(["src/lib/supabase-door", "src/lib/route-client"]);
function forbiddenReach(specifier: string, target: string | null): string | null {
  if (QUERY_PACKAGES.some((name) => specifier === name || specifier.startsWith(`${name}/`)))
    return "a query module";
  if (target === null) return null;
  if (target === "src/i18n" || target.startsWith("src/i18n/")) return "the language provider";
  if (
    DOOR_MODULES.has(target) ||
    target.startsWith("src/integrations/supabase/") ||
    target.startsWith("src/server/") ||
    target.endsWith("-service")
  )
    return "a door";
  return null;
}

/**
 * CF-OV-7 (cursor-bundle-3, Part 1): the value-import closure of the module loaded on demand
 * (`import`, a re-export and `import()`, never a type-only reach; aliased and relative paths
 * resolved, packages left outside), and every reach inside it of the language provider
 * (`@/i18n`), a door (the Supabase door, the route client, the integrations folder, the server
 * folder, a `-service` module) or a query module. A module that reaches one of them is itself
 * in the closure, so the chain is read at its own import. The closure stops at a forbidden
 * reach. Reason: `src/test/setup.ts` loads this module before every test file, so one import
 * of the provider reddened six files that never touched it.
 */
export function overlayClosure(
  root: string,
  entry: string = OVERLAYS_ENTRY,
): { modules: string[]; findings: Finding[] } {
  const findings: Finding[] = [];
  const queue = [entry];
  const seen = new Set(queue);
  for (let at = 0; at < queue.length; at += 1) {
    const name = queue[at];
    if (name === undefined) continue;
    visitTs(join(root, name), (node, source) => {
      const specifier = valueSpecifier(node);
      if (specifier === undefined) return;
      const target = moduleTarget(name, specifier.text);
      const forbidden = forbiddenReach(specifier.text, target);
      if (forbidden !== null) {
        findings.push({
          file: name,
          line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
          what: `reaches ${forbidden} (${specifier.text}) from the module loaded on demand; its words arrive as props (CF-OV-7)`,
        });
        return;
      }
      const next = target === null ? null : sourceOf(root, target);
      if (next === null || seen.has(next)) return;
      seen.add(next);
      queue.push(next);
    });
  }
  return { modules: [...seen].sort(), findings };
}

/** The real dialog parts (`PanelBody` and the rest), without their extension. */
export const PARTS_MODULE = "src/components/ui/dialog-parts";

/**
 * CF-OV-8's table (DEC-426): the readers of the real parts by value, each with its reason. A
 * permanent reach is written here; an allowlist line is only for a finding that must go away.
 */
export const PARTS_READERS: readonly { file: string; reason: string }[] = [
  {
    file: "src/components/ui/overlays-impl.ts",
    reason: "the one module loaded on demand hands the parts to the thin facade (`dialogParts`)",
  },
  {
    file: "src/components/ui/dialog-parts.test.tsx",
    reason:
      "the parts' own unit test draws the real parts, not the facade that waits on the loader",
  },
];

/**
 * CF-OV-8 (cursor-bundle-3, Part 1): the real dialog parts are reached by value only by the
 * readers of PARTS_READERS; a page or a primitive takes the thin parts
 * (`src/components/ui/dialog-parts-facade.tsx`). A type-only reach passes.
 */
export function partsReaches(files: string[], root: string): Finding[] {
  const found: Finding[] = [];
  const allowed = PARTS_READERS.map((reader) => reader.file);
  for (const file of files) {
    const name = relative(root, file).split(sep).join("/");
    if (allowed.includes(name)) continue;
    visitTs(file, (node, source) => {
      const specifier = valueSpecifier(node);
      if (specifier === undefined || moduleTarget(name, specifier.text) !== PARTS_MODULE) return;
      found.push({
        file: name,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        what: `reaches the real dialog parts (${specifier.text}) by value; take the thin parts from dialog-parts-facade (CF-OV-8)`,
      });
    });
  }
  return found;
}

const ROOT = process.cwd();

describe("the overlay primitives on demand (DEC-259)", () => {
  it(
    "CF-OV-1 only the impl files reach Radix's tooltip, menu, popover, dialog and alert dialog, only overlays-impl reaches the impl files, only the loader reaches overlays-impl",
    () => {
      const files = walkFiles(["src", "e2e", "scripts"], { ext: ["ts", "tsx", "mts", "mjs"] }).map(
        (file) => join(ROOT, file),
      );
      console.log(`[CF-OV-1] files read: ${files.length}`);
      expect(files.length).toBeGreaterThanOrEqual(500);
      expect(report(overlayReaches(files, ROOT))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-OV-2 planted: a direct Radix import and a static import of an impl file fail; type-only reaches pass", () => {
    const dir = join(ROOT, "node_modules/.cache/overlays-census");
    mkdirSync(join(dir, "src/components/ui"), { recursive: true });
    mkdirSync(join(dir, "src/features"), { recursive: true });
    try {
      writeFileSync(
        join(dir, "src/features/bad.tsx"),
        'import * as T from "@radix-ui/react-tooltip";\nimport { DropdownMenuItem } from "@/components/ui/dropdown-menu-impl";\nexport * from "../components/ui/overlays-impl";\n',
      );
      writeFileSync(
        join(dir, "src/features/good.tsx"),
        'import type * as Impl from "@/components/ui/tooltip-impl";\nimport { type DropdownMenuProps } from "@radix-ui/react-dropdown-menu";\nexport type I = typeof import("../components/ui/overlays-impl");\n',
      );
      writeFileSync(
        join(dir, "src/components/ui/overlay-loader.ts"),
        'const m = loadOnce(() => import("./overlays-impl"));\n',
      );
      const files = walkFiles([join(dir, "src")], { ext: ["ts", "tsx"] });
      expect(report(overlayReaches(files, dir))).toBe(
        [
          "src/features/bad.tsx:1 reaches @radix-ui/react-tooltip by value; only src/components/ui/tooltip-impl.tsx may (DEC-259)",
          "src/features/bad.tsx:2 reaches @/components/ui/dropdown-menu-impl by value; only src/components/ui/overlays-impl.ts may (DEC-259)",
          "src/features/bad.tsx:3 reaches ../components/ui/overlays-impl by value; only src/components/ui/overlay-loader.ts may (DEC-259)",
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CF-OV-6 planted: the popover's package and its impl file are reached only by their one reader (turn S6-3)", () => {
    const dir = join(ROOT, "node_modules/.cache/overlays-popover");
    mkdirSync(join(dir, "src/components/ui"), { recursive: true });
    mkdirSync(join(dir, "src/components/shell"), { recursive: true });
    try {
      writeFileSync(
        join(dir, "src/components/shell/panel.tsx"),
        'import * as P from "@radix-ui/react-popover";\nimport { PopoverContent } from "@/components/ui/popover-impl";\nimport type * as Impl from "@/components/ui/popover-impl";\n',
      );
      writeFileSync(
        join(dir, "src/components/ui/popover-impl.tsx"),
        'import * as PopoverPrimitive from "@radix-ui/react-popover";\n',
      );
      writeFileSync(
        join(dir, "src/components/ui/overlays-impl.ts"),
        'export * as popover from "./popover-impl";\n',
      );
      const files = walkFiles([join(dir, "src")], { ext: ["ts", "tsx"] });
      expect(report(overlayReaches(files, dir))).toBe(
        [
          "src/components/shell/panel.tsx:1 reaches @radix-ui/react-popover by value; only src/components/ui/popover-impl.tsx may (DEC-259)",
          "src/components/shell/panel.tsx:2 reaches @/components/ui/popover-impl by value; only src/components/ui/overlays-impl.ts may (DEC-259)",
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it(
    "CF-OV-4 no file reaches a retired overlay package, and the retired primitive files stay gone",
    () => {
      const files = walkFiles(["src", "e2e", "scripts"], { ext: ["ts", "tsx", "mts", "mjs"] }).map(
        (file) => join(ROOT, file),
      );
      expect(files.length).toBeGreaterThanOrEqual(500);
      expect(report(retiredReaches(files, ROOT))).toBe("");
      expect(RETIRED_FILES.filter((file) => existsSync(join(ROOT, file)))).toEqual([]);
    },
    TREE_SCAN_MS,
  );

  it("CF-OV-5 planted: a value, a type-only and a dynamic reach of a retired package fail", () => {
    const dir = join(ROOT, "node_modules/.cache/overlays-retired");
    mkdirSync(join(dir, "src/features"), { recursive: true });
    try {
      writeFileSync(
        join(dir, "src/features/bad.tsx"),
        'import { Drawer } from "vaul";\nimport type * as S from "@radix-ui/react-select";\nconst c = import("cmdk");\nexport * from "@radix-ui/react-hover-card";\n',
      );
      writeFileSync(
        join(dir, "src/features/good.tsx"),
        'import * as D from "@/components/ui/dialog-primitive";\nimport { Popover } from "@radix-ui/react-popover";\n',
      );
      const files = walkFiles([join(dir, "src")], { ext: ["ts", "tsx"] });
      expect(report(retiredReaches(files, dir))).toBe(
        [
          "src/features/bad.tsx:1 reaches vaul, a retired overlay package (turn S6-1, ruling 7)",
          "src/features/bad.tsx:2 reaches @radix-ui/react-select, a retired overlay package (turn S6-1, ruling 7)",
          "src/features/bad.tsx:3 reaches cmdk, a retired overlay package (turn S6-1, ruling 7)",
          "src/features/bad.tsx:4 reaches @radix-ui/react-hover-card, a retired overlay package (turn S6-1, ruling 7)",
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CF-OV-3 each facade exports exactly the names its impl file exports, the modal facades Radix's parts", () => {
    expect(exportedNames("src/components/ui/tooltip.tsx")).toEqual(
      exportedNames("src/components/ui/tooltip-impl.tsx"),
    );
    expect(exportedNames("src/components/ui/dropdown-menu.tsx")).toEqual(
      exportedNames("src/components/ui/dropdown-menu-impl.tsx"),
    );
    expect(exportedNames("src/components/ui/popover.tsx")).toEqual(
      exportedNames("src/components/ui/popover-impl.tsx"),
    );
    expect(exportedNames("src/components/ui/popover.tsx")).toEqual([
      "Popover",
      "PopoverContent",
      "PopoverTrigger",
    ]);
    expect(exportedNames("src/components/ui/tooltip.tsx")).toHaveLength(4);
    expect(exportedNames("src/components/ui/dropdown-menu.tsx")).toHaveLength(16); // F4b (D268): DropdownMenuIcon joins the parts
    expect(exportedNames("src/components/ui/dialog-primitive.tsx")).toEqual([
      "Close",
      "Content",
      "Description",
      "Overlay",
      "Portal",
      "Root",
      "Title",
      "Trigger",
    ]);
    expect(exportedNames("src/components/ui/alert-dialog-primitive.tsx")).toEqual([
      "Action",
      "Cancel",
      "Content",
      "Description",
      "Overlay",
      "Portal",
      "Root",
      "Title",
      "Trigger",
    ]);
  });

  it(
    "CF-OV-7 no module the on-demand overlay module reaches by value imports the language provider, a door or a query module",
    () => {
      const { modules, findings } = overlayClosure(ROOT);
      console.log(`[CF-OV-7] modules in the closure: ${modules.length}`);
      expect(modules).toContain(OVERLAYS_ENTRY);
      expect(modules).toContain("src/components/ui/dialog-parts.tsx");
      expect(modules.length).toBeGreaterThanOrEqual(10);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("planted: CF-OV-7 a provider, a door, a service and a query import inside the closure fail, deep ones too; type-only reaches and modules outside the closure pass", () => {
    const dir = join(ROOT, "node_modules/.cache/overlays-closure");
    mkdirSync(join(dir, "src/components/ui"), { recursive: true });
    mkdirSync(join(dir, "src/features"), { recursive: true });
    const put = (name: string, text: string) => writeFileSync(join(dir, name), text);
    try {
      put(
        "src/components/ui/overlays-impl.ts",
        'export * as dialogParts from "./dialog-parts";\nexport * as rules from "./rules";\nexport type { Words } from "@/i18n";\n',
      );
      put(
        "src/components/ui/dialog-parts.tsx",
        'import { useI18n } from "@/i18n";\nimport type { Language } from "@/i18n/types";\nimport { deep } from "./deep";\nexport const a = [useI18n, deep];\n',
      );
      put(
        "src/components/ui/deep.ts",
        'import { getSupabase } from "@/lib/supabase-door";\nimport { useQuery } from "@tanstack/react-query";\nexport const deep = [getSupabase, useQuery];\nexport const later = () => import("../../features/posting-service");\n',
      );
      put(
        "src/components/ui/rules.ts",
        'import { cn } from "@/lib/utils";\nexport const b = cn;\n',
      );
      put(
        "src/features/posting-service.ts",
        'import { rpc } from "@/lib/route-client";\nexport const c = rpc;\n',
      );
      put(
        "src/features/outside.ts",
        'import { useI18n } from "@/i18n";\nexport const d = useI18n;\n',
      );
      const { modules, findings } = overlayClosure(dir);
      expect(report(findings)).toBe(
        [
          "src/components/ui/deep.ts:1 reaches a door (@/lib/supabase-door) from the module loaded on demand; its words arrive as props (CF-OV-7)",
          "src/components/ui/deep.ts:2 reaches a query module (@tanstack/react-query) from the module loaded on demand; its words arrive as props (CF-OV-7)",
          "src/components/ui/deep.ts:4 reaches a door (../../features/posting-service) from the module loaded on demand; its words arrive as props (CF-OV-7)",
          "src/components/ui/dialog-parts.tsx:1 reaches the language provider (@/i18n) from the module loaded on demand; its words arrive as props (CF-OV-7)",
        ].join("\n"),
      );
      expect(modules).toEqual([
        "src/components/ui/deep.ts",
        "src/components/ui/dialog-parts.tsx",
        "src/components/ui/overlays-impl.ts",
        "src/components/ui/rules.ts",
      ]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it(
    "CF-OV-8 the real dialog parts are reached by value only by the on-demand module and the parts' own test",
    () => {
      const files = walkFiles(["src", "e2e", "scripts"], { ext: ["ts", "tsx", "mts", "mjs"] }).map(
        (file) => join(ROOT, file),
      );
      expect(files.length).toBeGreaterThanOrEqual(500);
      for (const reader of PARTS_READERS) {
        expect(existsSync(join(ROOT, reader.file)), reader.file).toBe(true);
        expect(readFileSync(join(ROOT, reader.file), "utf8")).toContain("dialog-parts");
      }
      expect(report(partsReaches(files, ROOT))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("planted: CF-OV-8 a page, a primitive and a dynamic import of the real parts fail; type-only reaches, the thin parts and the two readers pass", () => {
    const dir = join(ROOT, "node_modules/.cache/overlays-parts");
    mkdirSync(join(dir, "src/components/ui"), { recursive: true });
    mkdirSync(join(dir, "src/features"), { recursive: true });
    try {
      writeFileSync(
        join(dir, "src/features/page.tsx"),
        'import { PanelBody } from "@/components/ui/dialog-parts";\nexport const a = PanelBody;\n',
      );
      writeFileSync(
        join(dir, "src/components/ui/primitive.tsx"),
        'export { PanelHeader } from "./dialog-parts";\nexport const later = () => import("./dialog-parts.tsx");\n',
      );
      writeFileSync(
        join(dir, "src/features/good.tsx"),
        'import type * as Parts from "@/components/ui/dialog-parts";\nimport { type PanelBodyProps } from "../components/ui/dialog-parts";\nimport { PanelBody } from "@/components/ui/dialog-parts-facade";\nimport { BANDS_BODY } from "@/components/ui/dialog-parts-look";\nexport const b = [PanelBody, BANDS_BODY];\n',
      );
      for (const reader of PARTS_READERS)
        writeFileSync(join(dir, reader.file), 'import * as Parts from "./dialog-parts";\n');
      const files = walkFiles([join(dir, "src")], { ext: ["ts", "tsx"] });
      expect(report(partsReaches(files, dir))).toBe(
        [
          "src/components/ui/primitive.tsx:1 reaches the real dialog parts (./dialog-parts) by value; take the thin parts from dialog-parts-facade (CF-OV-8)",
          "src/components/ui/primitive.tsx:2 reaches the real dialog parts (./dialog-parts.tsx) by value; take the thin parts from dialog-parts-facade (CF-OV-8)",
          "src/features/page.tsx:1 reaches the real dialog parts (@/components/ui/dialog-parts) by value; take the thin parts from dialog-parts-facade (CF-OV-8)",
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
