import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { ownValue } from "../../src/lib/own-key";
import { report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * DEC-259 (Foundations turn 31; D234 speed S8) and DEC-260 (turn 32; S9) — THE
 * OVERLAY PRIMITIVES ARRIVE ON DEMAND. The Radix tooltip, dropdown menu, dialog
 * and alert dialog (with floating-ui and their focus and scroll layers) are
 * reached by value only through their impl files, the impl files only through
 * src/components/ui/overlays-impl.ts, and that module only through the loader's
 * loadOnce (src/components/ui/overlay-loader.ts). Everything else uses the
 * facades (tooltip.tsx, dropdown-menu.tsx, dialog-primitive.tsx,
 * alert-dialog-primitive.tsx), which draw the trigger at once and the real
 * primitive on the person's first intent. A type-only import is erased by the
 * compiler and passes.
 */
type Finding = { file: string; line: number; what: string };

/** The specifiers the census watches. */
const WATCHED =
  /^(?:@radix-ui\/react-(?:tooltip|dropdown-menu|dialog|alert-dialog)|(?:@\/components\/ui\/|\.{1,2}\/(?:[\w.-]+\/)*)(?:tooltip-impl|dropdown-menu-impl|dialog-impl|alert-dialog-impl|submenu-impl|overlays-impl))$/;

/** The one file allowed to reach each watched module (an impl file by its base name). */
export const MAY_REACH: Record<string, string> = {
  "@radix-ui/react-tooltip": "src/components/ui/tooltip-impl.tsx",
  "@radix-ui/react-dropdown-menu": "src/components/ui/dropdown-menu-impl.tsx",
  "@radix-ui/react-dialog": "src/components/ui/dialog-impl.ts",
  "@radix-ui/react-alert-dialog": "src/components/ui/alert-dialog-impl.ts",
  "./tooltip-impl": "src/components/ui/overlays-impl.ts",
  "./dropdown-menu-impl": "src/components/ui/overlays-impl.ts",
  "./dialog-impl": "src/components/ui/overlays-impl.ts",
  "./alert-dialog-impl": "src/components/ui/overlays-impl.ts",
  "./submenu-impl": "src/components/ui/overlays-impl.ts",
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

/** Every value reach of a watched specifier from a file it is not allowed from. */
export function overlayReaches(files: string[], root: string): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    const name = relative(root, file).split(sep).join("/");
    visitTs(file, (node, source) => {
      let specifier: ts.Expression | undefined;
      if (ts.isImportDeclaration(node) && !typeOnlyImport(node)) specifier = node.moduleSpecifier;
      else if (ts.isExportDeclaration(node) && !node.isTypeOnly) specifier = node.moduleSpecifier;
      else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword)
        specifier = node.arguments[0];
      if (specifier === undefined || !ts.isStringLiteral(specifier)) return;
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

const ROOT = process.cwd();

describe("the overlay primitives on demand (DEC-259)", () => {
  it(
    "CF-OV-1 only the impl files reach Radix's tooltip, menu, dialog and alert dialog, only overlays-impl reaches the impl files, only the loader reaches overlays-impl",
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

  it("CF-OV-3 each facade exports exactly the names its impl file exports, the modal facades Radix's parts", () => {
    expect(exportedNames("src/components/ui/tooltip.tsx")).toEqual(
      exportedNames("src/components/ui/tooltip-impl.tsx"),
    );
    expect(exportedNames("src/components/ui/dropdown-menu.tsx")).toEqual(
      exportedNames("src/components/ui/dropdown-menu-impl.tsx"),
    );
    expect(exportedNames("src/components/ui/tooltip.tsx")).toHaveLength(4);
    expect(exportedNames("src/components/ui/dropdown-menu.tsx")).toHaveLength(15);
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
});
