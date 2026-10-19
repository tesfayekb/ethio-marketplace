import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { legalHeadings, legalInline, parseLegal, unknownTokens } from "./legal-markdown";

describe("legal Markdown subset", () => {
  it("assigns section ids only to ## headings", () => {
    expect(parseLegal("# Title\n## Section\n### Sub\n## Next")).toEqual([
      { type: "heading", level: 1, text: "Title" },
      { type: "heading", level: 2, text: "Section", id: "s-1" },
      { type: "heading", level: 3, text: "Sub" },
      { type: "heading", level: 2, text: "Next", id: "s-2" },
    ]);
  });
  it("joins consecutive paragraph lines and separates blanks", () => {
    expect(parseLegal("one\ntwo\n\nthree")).toEqual([
      { type: "paragraph", text: "one two" },
      { type: "paragraph", text: "three" },
    ]);
  });
  it("parses one-level bullet lists with indented continuations", () => {
    expect(parseLegal("- one\n  continued\n- two")).toEqual([
      { type: "list", ordered: false, items: ["one continued", "two"] },
    ]);
  });
  it("parses numbered lists with arbitrary numbers", () => {
    expect(parseLegal("7. one\n   continued\n12. two")).toEqual([
      { type: "list", ordered: true, items: ["one continued", "two"] },
    ]);
  });
  it("keeps trimmed table cells and rows", () => {
    expect(parseLegal("| A | B |\n| --- | --- |\n| one | two |\n| three | four |")).toEqual([
      {
        type: "table",
        headers: ["A", "B"],
        rows: [
          ["one", "two"],
          ["three", "four"],
        ],
      },
    ]);
  });
  it("parses bold and code without treating code as Markdown", () => {
    expect(legalInline("**bold** `code`")).toEqual([
      { type: "bold", children: [{ type: "text", text: "bold" }] },
      { type: "text", text: " " },
      { type: "code", text: "code" },
    ]);
  });
  it.each([
    "https://example.invalid",
    "http://example.invalid",
    "mailto:one@example.invalid",
    "/terms",
  ])("allows explicit link %s", (href) => {
    expect(legalInline(`[label](${href})`)).toEqual([
      { type: "link", href, children: [{ type: "text", text: "label" }] },
    ]);
  });
  it.each(["javascript:alert", "data:text/html,x", "//example.invalid", "terms"])(
    "refuses link %s",
    (href) => {
      expect(legalInline(`[label](${href})`)).toEqual([{ type: "text", text: `[label](${href})` }]);
    },
  );
  it("links bare email addresses", () => {
    expect(legalInline("one@example.invalid")[0]).toEqual({
      type: "link",
      href: "mailto:one@example.invalid",
      children: [{ type: "text", text: "one@example.invalid" }],
    });
  });
  it("links bare https addresses", () => {
    expect(legalInline("https://example.invalid")[0]).toEqual({
      type: "link",
      href: "https://example.invalid",
      children: [{ type: "text", text: "https://example.invalid" }],
    });
  });
  it("fills known facts and keeps unknown facts once in first-use order", () => {
    const facts = { legal_email: "legal@example.invalid", providers: "First\nSecond" };
    expect(legalInline("{{legal_email}} {{providers}} {{nope}}", facts)).toEqual([
      { type: "text", text: "legal@example.invalid" },
      { type: "text", text: " " },
      { type: "text", text: "First, Second" },
      { type: "text", text: " " },
      { type: "unknown", text: "{{nope}}" },
    ]);
    expect(unknownTokens("{{nope}} {{legal_email}} {{next}} {{nope}}", facts)).toEqual([
      "nope",
      "next",
    ]);
  });
  it("does not fill inherited fact keys", () => {
    expect(unknownTokens("{{constructor}}", {})).toEqual(["constructor"]);
  });
  it.each(["<script>alert(1)</script>", "<b>x</b>", "#### not a heading"])(
    "keeps other syntax as text: %s",
    (text) => {
      expect(parseLegal(text)).toEqual([{ type: "paragraph", text }]);
    },
  );
  it.each([
    ["terms-of-service", 17],
    ["privacy-policy", 15],
  ] as const)("parses real %s drafts in both languages", (name, count) => {
    const en = readFileSync(`docs/spec/legal/${name}-v1.en.md`, "utf8");
    const am = readFileSync(`docs/spec/legal/${name}-v1.am.md`, "utf8");
    const ids = Array.from({ length: count }, (_, i) => `s-${i + 1}`);
    expect(legalHeadings(en).map((h) => h.id)).toEqual(ids);
    expect(legalHeadings(am).map((h) => h.id)).toEqual(ids);
    if (name === "privacy-policy") {
      const sourceRows = en
        .split("\n")
        .filter((line) => /^\|/.test(line) && !/^\|[ -]+\|/.test(line));
      const tables = parseLegal(en).filter((b) => b.type === "table");
      expect(tables.flatMap((b) => [b.headers, ...b.rows]).length).toBe(sourceRows.length);
    }
  });
});
