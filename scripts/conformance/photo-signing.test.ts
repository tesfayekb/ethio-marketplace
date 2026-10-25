import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * D234 speed turn S2 (DEC-195, G54 a) — A PHOTO'S LINK IS SIGNED BY THE ONE SIGNER,
 * FOR ROWS THE CALLER COULD READ. Links come from src/server/media/links.ts:
 * `readAndSignPhotoLinks` (the rows read as the caller first) or `signPublicPhotos`
 * (the public document's own photos, which the public policy already admitted). A
 * call of the lower-level `signPhotoRows` or `readLinks` anywhere else signs keys
 * the door itself must prove the caller may see, so it needs an allowlist line
 * naming that proof (key | reason | until).
 */
const LOW_LEVEL = new Set(["signPhotoRows", "readLinks"]);
const SIGNER = new Set(["src/server/media/links.ts", "src/server/media/storage.ts"]);

type Finding = { file: string; line: number; what: string };

export function directSigning(files: string[]): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    if (SIGNER.has(file)) continue;
    visitTs(file, (node, source) => {
      if (!ts.isCallExpression(node)) return;
      const callee = node.expression;
      const name = ts.isIdentifier(callee)
        ? callee.text
        : ts.isPropertyAccessExpression(callee)
          ? callee.name.text
          : null;
      if (name === null || !LOW_LEVEL.has(name)) return;
      found.push({
        file,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        what: `signs photo links directly (${name})`,
      });
    });
  }
  return found;
}

const domain = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true });
const census = directSigning(domain);
const ALLOWLIST = "scripts/conformance/photo-signing-allowlist.txt";
const allowances = readAllowlist(
  ALLOWLIST,
  census.map((hit) => hit.file),
);

describe("photo links come from the one signer (DEC-195, D234)", () => {
  it(
    "SIGN-1 every direct signing outside src/server/media/links.ts has a live allowance",
    () => {
      console.log(
        `[SIGN-1] direct signing outside the signer: ${census.length}; allowlist: ${allowances.size}`,
      );
      expect(report(census.filter((hit) => !allowances.has(hit.file)))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("SIGN-2 the census sees a planted direct signing and passes the signer's own entries", () => {
    const dir = "node_modules/.cache/photo-signing";
    mkdirSync(dir, { recursive: true });
    const bad = `${dir}/ps-bad.ts`;
    const good = `${dir}/ps-good.ts`;
    try {
      writeFileSync(
        bad,
        'import { signPhotoRows } from "@/server/media/links";\nawait signPhotoRows(admin, rows);\n',
      );
      writeFileSync(
        good,
        'import { signPublicPhotos } from "@/server/media/links";\nawait signPublicPhotos(doc.photos);\n',
      );
      expect(report(directSigning([bad, good]))).toBe(
        `${bad}:2 signs photo links directly (signPhotoRows)`,
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
