import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-955 (Foundations turn C1) — A NOTICE IS SHOWN WHERE THE PERSON IS LOOKING. A modal overlay
 * (a dialog, an alert, a sheet, a drawer, the shell's phone panels) keeps the keyboard inside it,
 * blocks the pointer outside it and paints over the page, so the shell's notices are drawn inside
 * the topmost open one's NoticeOutlet (src/components/ui/notice-outlet.tsx). The census reads
 * every browser file under src/ (tests excepted) for the content part of a modal primitive — the
 * `Content` of a namespace imported from dialog-primitive or alert-dialog-primitive (Radix's
 * dialog, ui/sheet.tsx and the shell's panels use the first) or of vaul's `Drawer` — and refuses
 * one that does not render `<NoticeOutlet />` inside it. A content whose Root says
 * `modal={false}` is not modal (the phone's rail menu: the page beside it stays reachable) and is
 * not read. Menus, popovers, tooltips and selects are not modal surfaces a notice must enter:
 * they close on the first tap outside. No allowlist.
 */

type Finding = { file: string; line: number; what: string };

const MODAL_MODULES = /(?:^|\/)(?:dialog-primitive|alert-dialog-primitive)$/;

/** The local names in a file that stand for a modal primitive's namespace. */
function modalNamespaces(source: ts.SourceFile): Set<string> {
  const names = new Set<string>();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier))
      continue;
    const from = statement.moduleSpecifier.text;
    const bindings = statement.importClause?.namedBindings;
    if (MODAL_MODULES.test(from) && bindings !== undefined && ts.isNamespaceImport(bindings))
      names.add(bindings.name.text);
    if (from === "vaul" && bindings !== undefined && ts.isNamedImports(bindings))
      for (const element of bindings.elements)
        if ((element.propertyName ?? element.name).text === "Drawer") names.add(element.name.text);
  }
  return names;
}

function tagOf(node: ts.JsxElement | ts.JsxSelfClosingElement): string {
  const tag = ts.isJsxElement(node) ? node.openingElement.tagName : node.tagName;
  return tag.getText();
}

/** True when an enclosing `*.Root` element says modal={false}. */
function underNonModalRoot(node: ts.Node): boolean {
  for (let up = node.parent; up !== undefined; up = up.parent) {
    if (!ts.isJsxElement(up) || !tagOf(up).endsWith(".Root")) continue;
    return up.openingElement.attributes.properties.some(
      (attribute) =>
        ts.isJsxAttribute(attribute) &&
        attribute.name.getText() === "modal" &&
        attribute.initializer !== undefined &&
        ts.isJsxExpression(attribute.initializer) &&
        attribute.initializer.expression?.kind === ts.SyntaxKind.FalseKeyword,
    );
  }
  return false;
}

function rendersOutlet(node: ts.Node): boolean {
  let found = false;
  const visit = (child: ts.Node) => {
    if (found) return;
    if (ts.isJsxSelfClosingElement(child) && child.tagName.getText() === "NoticeOutlet")
      found = true;
    else ts.forEachChild(child, visit);
  };
  ts.forEachChild(node, visit);
  return found;
}

/** Every modal content in the files, and the ones that draw no NoticeOutlet. */
export function outletFindings(files: string[]): { contents: number; findings: Finding[] } {
  const findings: Finding[] = [];
  let contents = 0;
  for (const file of files) {
    let namespaces: Set<string> | null = null;
    visitTs(file, (node, source) => {
      namespaces ??= modalNamespaces(source);
      if (!ts.isJsxElement(node) && !ts.isJsxSelfClosingElement(node)) return;
      const [space, part] = tagOf(node).split(".");
      if (part !== "Content" || space === undefined || !namespaces.has(space)) return;
      if (underNonModalRoot(node)) return;
      contents += 1;
      if (!ts.isJsxElement(node) || !rendersOutlet(node))
        findings.push({
          file,
          line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
          what: `<${tagOf(node)}> draws no <NoticeOutlet /> (the shell's notices cannot reach it)`,
        });
    });
  }
  return { contents, findings };
}

const files = walkFiles(["src"], { ext: ["tsx"], skipTests: true }).map((file) =>
  file.split("\\").join("/"),
);

describe("a notice is shown where the person is looking (INC-955)", () => {
  it(
    "CF-NO-1 every modal overlay's content draws a NoticeOutlet",
    () => {
      const { contents, findings } = outletFindings(files);
      console.log(`[notice-outlet] modal contents: ${contents}`);
      expect(contents).toBeGreaterThanOrEqual(5);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-NO-2 a planted file's two bare contents are named; its outlet and non-modal ones are not", () => {
    const dir = "node_modules/.cache/notice-outlet";
    mkdirSync(dir, { recursive: true });
    const file = `${dir}/planted.tsx`;
    try {
      writeFileSync(
        file,
        [
          'import * as Modal from "./dialog-primitive";',
          'import { Drawer as Pull } from "vaul";',
          "declare const NoticeOutlet: () => null;",
          "export const kept = (",
          "  <Modal.Root>",
          "    <Modal.Content>",
          "      <p>kept</p>",
          "      <NoticeOutlet />",
          "    </Modal.Content>",
          "  </Modal.Root>",
          ");",
          "export const side = (",
          "  <Modal.Root modal={false}>",
          "    <Modal.Content />",
          "  </Modal.Root>",
          ");",
          "export const bare = <Modal.Content><p>bare</p></Modal.Content>;",
          "export const pulled = <Pull.Content />;",
          "",
        ].join("\n"),
      );
      const { contents, findings } = outletFindings([file]);
      expect(contents).toBe(3);
      expect(report(findings)).toBe(
        [
          `${file}:17 <Modal.Content> draws no <NoticeOutlet /> (the shell's notices cannot reach it)`,
          `${file}:18 <Pull.Content> draws no <NoticeOutlet /> (the shell's notices cannot reach it)`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
