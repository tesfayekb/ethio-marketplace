import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import ts from "typescript";
import { expect, it } from "vitest";
import { readAllowlist, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/** CF-HEAD-1: every reader-facing head uses the one builder; literals only at ruled seams. */
export function headFindings(files: string[], root: string): string[] {
  const found: string[] = [];
  for (const file of files) {
    let hasHead = false;
    visitTs(file, (node) => {
      if (ts.isPropertyAssignment(node) && node.name.getText() === "head") hasHead = true;
    });
    if (!hasHead && !file.endsWith("seller-head.ts")) continue;
    const source = readFileSync(file, "utf8");
    if (!/\b(?:pageHead|sellerHead)\(/.test(source)) found.push(relative(root, file));
    // Literal metadata mixed into a builder is also a bypass, not an escape.
    else if (
      /\{\s*title:\s*["`]|(?:name:\s*"description"|property:\s*"og:(?:title|description)")[\s,]*content:\s*["`]/.test(
        source,
      )
    )
      found.push(relative(root, file));
  }
  return found;
}
it(
  "CF-HEAD-1 route heads and seller head use pageHead",
  () => {
    const root = process.cwd();
    const files = walkFiles([join(root, "src/routes")], { ext: ["tsx"], skipTests: true });
    files.push(join(root, "src/features/seller/seller-head.ts"));
    const found = headFindings(files, root);
    const allowed = readAllowlist(join(root, "scripts/conformance/page-head-allowlist.txt"), found);
    expect(found.filter((key) => !allowed.has(key))).toEqual([]);
  },
  TREE_SCAN_MS,
);
it("CF-HEAD-2 planted literal and mixed literal fail, keyed and delegated heads pass", () => {
  const root = mkdtempSync(join(tmpdir(), "page-head-"));
  try {
    const files = [
      'const route = { head: () => ({ meta: [{ title: "Planted" }] }) };',
      'const route = { head: () => ({ meta: [...pageHead("key").meta, { title: "Planted" }] }) };',
      'const route = { head: () => pageHead("key") };',
      "const route = { head: ({ loaderData }) => sellerHead(loaderData) };",
    ].map((text, i) => {
      const file = join(root, `${i}.tsx`);
      writeFileSync(file, text);
      return file;
    });
    expect(headFindings(files, root)).toEqual(["0.tsx", "1.tsx"]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
