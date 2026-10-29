import { relative } from "node:path";
import ts from "typescript";
import { visitTs } from "./kit";

/** CF-HEAD-1: every page head is built by pageHead (sellerHead delegates to it). */
export function headFindings(files: string[], root: string) {
  const found: Array<{ file: string; line: number; what: string }> = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      const isHead = ts.isPropertyAssignment(node) && node.name.getText(source) === "head";
      const isSeller = ts.isFunctionDeclaration(node) && node.name?.text === "sellerHead";
      if (!isHead && !isSeller) return;
      let builder = false;
      const walk = (child: ts.Node) => {
        if (ts.isCallExpression(child) && ["pageHead", "sellerHead"].includes(child.expression.getText(source))) builder = true;
        ts.forEachChild(child, walk);
      };
      ts.forEachChild(node, walk);
      if (!builder) found.push({ file: relative(root, file), line: source.getLineAndCharacterOfPosition(node.getStart()).line + 1, what: "head bypasses pageHead" });
    });
  }
  return found;
}