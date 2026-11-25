import { readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { report, TREE_SCAN_MS, walkFiles } from "./kit";
import { readNumberFindings } from "./read-numbers";

/**
 * CF-NUM-1 (LAW-NUM-1) — no `?? 0` of a read reaches a result count, a pager's total, a stat tile's
 * value or a service's `total`. No allowlist: a hit is fixed, never excused (ruling 1 of cursor
 * bundle 6, decision 6).
 */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

describe("a read's number is never invented (LAW-NUM-1)", () => {
  it(
    "CFN-1 no file in src/ gives a result count, a pager's total, a tile's value or a service's total a zero of its own",
    () => {
      const files = walkFiles([join(ROOT, "src")], { ext: ["ts", "tsx"], skipTests: true })
        .filter((path) => !path.includes("/src/integrations/"))
        .map((path) => ({
          file: relative(ROOT, path).split("\\").join("/"),
          text: readFileSync(path, "utf8"),
        }));
      expect(files.length).toBeGreaterThan(500);
      expect(report(readNumberFindings(files))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CFN-2 planted: each form is named; a real zero, a typed absence and another prop pass", () => {
    const planted = [
      "export function A({ q, s }: { q: Q; s: S }) {",
      "  return (",
      "    <div>",
      "      <Pager total={q.data?.totalCount ?? 0} />",
      "      <Pager total={(q.data?.totalCount ?? 0)} />",
      "      <Filters resultCount={q.data?.n ?? 0} />",
      "      <StatCard label={l} value={s.data?.count ?? 0} />",
      "      <StatCard label={l} value={s.data?.count} />",
      "      <Pager total={q.data?.totalCount} />",
      "      <Pager total={0} />",
      "      <Other value={s.data?.count ?? 0} />",
      "      <Pager offset={q.data?.offset ?? 0} />",
      "    </div>",
      "  );",
      "}",
      "export const b = (row: Row) => ({",
      "  total: Number(row.options_total ?? 0),",
      "  totalCount: row.n ?? 0,",
      "  moved: Number(row.moved ?? 0),",
      "  total: row.n,",
      "});",
    ].join("\n");
    const found = (file: string) =>
      readNumberFindings([{ file, text: planted }]).map(({ line }) => line);
    expect(found("src/features/x/planted.tsx")).toEqual([4, 5, 6, 7, 17, 18]);
  });
});
