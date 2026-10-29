import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, it } from "vitest";
import { headFindings } from "./page-head";
import { readAllowlist, TREE_SCAN_MS, walkFiles } from "./kit";

it(
  "CF-HEAD-1 all route heads and the seller builder use pageHead",
  () => {
    const found = headFindings(
      [...walkFiles(["src/routes"], { ext: ["tsx"] }), "src/features/seller/seller-head.ts"],
      process.cwd(),
    );
    const allowed = readAllowlist(
      "scripts/conformance/page-head-allowlist.txt",
      found.map((f) => f.file),
    );
    expect(found.filter((f) => !allowed.has(f.file))).toEqual([]);
  },
  TREE_SCAN_MS,
);

it("CF-HEAD-2 planted literal fails, builder and unrelated title are negative controls", () => {
  const root = mkdtempSync(join(tmpdir(), "page-head-"));
  try {
    mkdirSync(join(root, "src"));
    const file = join(root, "src", "page.tsx");
    writeFileSync(file, 'const route = { head: () => ({ meta: [{ title: "Literal" }] }) };');
    expect(headFindings([file], root)).toHaveLength(1);
    writeFileSync(
      file,
      'const route = { head: () => pageHead("app.name", null, { meta: [{ title: "ethio.com" }] }) }; const item = { title: "Unrelated" };',
    );
    expect(headFindings([file], root)).toEqual([]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
