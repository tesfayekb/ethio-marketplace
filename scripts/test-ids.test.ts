// INC-536 — unit tests for the test-id check (scripts/test-ids.ts).
import { describe, expect, it } from "vitest";
import { CASE_GROUPS, collisions, idsIn, repositoryIds } from "./test-ids";

describe("test ids (INC-536)", () => {
  it("TI-1 no test id is used twice in the repository", () => {
    const uses = repositoryIds(process.cwd());
    expect(uses.length).toBeGreaterThan(500);
    const found = [...collisions(uses)].map(
      ([id, places]) => `${id}: ${places.map((p) => `${p.file}:${p.line}`).join(", ")}`,
    );
    expect(found).toEqual([]);
  });

  it("TI-2 an id in two files is refused", () => {
    const uses = [
      ...idsIn("e2e/a.spec.ts", 'test("ZZ-1 one", async () => {});'),
      ...idsIn("src/b.test.ts", 'it("ZZ-1: two", () => {});'),
    ];
    expect([...collisions(uses).keys()]).toEqual(["ZZ-1"]);
  });

  it("TI-3 one id on two tests of one file is refused unless the file declares a case group", () => {
    const text = 'test("ZZ-2 first", () => {});\ntest("ZZ-2 second", () => {});';
    expect([...collisions(idsIn("e2e/a.spec.ts", text)).keys()]).toEqual(["ZZ-2"]);
    const [group, file] = Object.entries(CASE_GROUPS)[0]!;
    const cases = `it("${group} first", () => {});\nit("${group} second", () => {});`;
    expect(collisions(idsIn(file, cases)).size).toBe(0);
    expect([...collisions(idsIn("e2e/elsewhere.spec.ts", cases)).keys()]).toEqual([group]);
  });

  it("TI-4 a compound title counts each id; a record number is not a test id", () => {
    const uses = idsIn(
      "e2e/a.spec.ts",
      'test("ZZ-3+ZZ-4: both", () => {});\nit("DEC-080 (i) a decision", () => {});\ntest.skip("ZZ-5 skipped", () => {});',
    );
    expect(uses.map((u) => u.id)).toEqual(["ZZ-3", "ZZ-4", "ZZ-5"]);
    expect(uses.map((u) => u.line)).toEqual([1, 1, 3]);
  });

  it("TI-6 a census id of several parts (CF-BC-1) or a lettered number (LR-C1, ML-U12) is read whole, and refused in two files", () => {
    const uses = [
      ...idsIn("scripts/conformance/a.test.ts", 'it("ZZ-QQ-1 one", () => {});'),
      ...idsIn("src/b.test.ts", 'it("ZZ-QQ-1: two", () => {});\nit("ZZ-QQ-12 three", () => {});'),
      ...idsIn(
        "e2e/c.spec.ts",
        'test("CF-ZZ-QQ-2+ZZ-7 four", () => {});\ntest("ZZ-U9 five", () => {});',
      ),
      ...idsIn("src/d.test.ts", 'it("ZZ-U9 six", () => {});'),
    ];
    expect(uses.map((u) => u.id)).toEqual([
      "ZZ-QQ-1",
      "ZZ-QQ-1",
      "ZZ-QQ-12",
      "CF-ZZ-QQ-2",
      "ZZ-7",
      "ZZ-U9",
      "ZZ-U9",
    ]);
    expect([...collisions(uses).keys()]).toEqual(["ZZ-QQ-1", "ZZ-U9"]);
    const repository = repositoryIds(process.cwd()).filter((u) =>
      /^[A-Z][A-Za-z0-9]*-[A-Z]/.test(u.id),
    );
    console.log(`[TI-6] ids of several parts in the repository: ${repository.length}`);
    expect(repository.length).toBeGreaterThan(50);
  });

  it("TI-5 a title wrapped onto the line after `test(` is read, at its own line", () => {
    const text = [
      "test.describe('d', () => {",
      "  test(",
      '    "ZZ-6 a long title the formatter wrapped",',
      '    { tag: "@x" },',
      "    async () => {},",
      "  );",
      '  it("ZZ-6 again", () => {});',
      "});",
    ].join("\n");
    const uses = idsIn("e2e/a.spec.ts", text);
    expect(uses).toEqual([
      { id: "ZZ-6", file: "e2e/a.spec.ts", line: 3 },
      { id: "ZZ-6", file: "e2e/a.spec.ts", line: 7 },
    ]);
    expect([...collisions(uses).keys()]).toEqual(["ZZ-6"]);
  });
});
