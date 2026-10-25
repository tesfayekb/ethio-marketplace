import { readFileSync } from "node:fs";
import { relative } from "node:path";
import { describe, expect, it } from "vitest";
import { readAllowlist, walkFiles } from "./kit";
import { seamExempt, vendorTies } from "./vendor-seams-scan";

/**
 * VS-1…3 (turn 16, DEC-250) — the vendor-seams freeze: no file outside the
 * four seams reaches Supabase directly, and no file names Lovable, without a
 * reviewed allowlist line (stale and expired lines fail in readAllowlist).
 */
describe("vendor seams conformance", () => {
  const files = [
    ...walkFiles(["src", "scripts"], { ext: ["ts", "tsx"], skipTests: true, skip: /fixtures/ }),
    "vite.config.ts",
  ];
  const rows = files.map((file) => {
    const rel = relative(process.cwd(), file) || file;
    return { file: rel, ...vendorTies(readFileSync(file, "utf8")) };
  });
  const found = rows
    .filter((row) => (row.supabase && !seamExempt(row.file)) || row.lovable)
    .map((row) => row.file);
  const allowed = readAllowlist("scripts/conformance/vendor-seams-allowlist.txt", found);
  it("VS-1 no file outside the four seams reaches Supabase directly without an allowlist line", () => {
    expect(rows.filter((row) => row.supabase && !seamExempt(row.file) && !allowed.has(row.file)))
      .toEqual([]);
  });
  it("VS-2 no file names a Lovable package, identifier or host without an allowlist line", () => {
    expect(rows.filter((row) => row.lovable && !allowed.has(row.file))).toEqual([]);
  });
  it("VS-3 a planted file with a supabase.auth.getSession() and an @lovable.dev/ import is reported by both", () => {
    const planted = vendorTies(
      'import { thing } from "@lovable.dev/thing";\nexport const session = await supabase.auth.getSession();',
    );
    expect(planted).toEqual({ supabase: true, lovable: true });
  });
});
