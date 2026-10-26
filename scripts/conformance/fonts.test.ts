import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";
import { report, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * DEC-262 (Foundations turn 33; D234 speed S10) — NO PAGE DOWNLOADS A FONT. Every
 * page draws with the device's own fonts through the two tokens src/styles.css
 * defines (--font-sans; --font-display, the same stack). Nothing under src/ or
 * public/ names a web-font host, declares @font-face or ships a font file; a
 * font family is set only through the tokens (Tailwind's font-sans and
 * font-display, or `font-family: var(--font-…)`), never by name.
 */
type Finding = { file: string; line: number; what: string };

const FONT_HOST = /fonts\.googleapis\.com|fonts\.gstatic\.com|use\.typekit\.net|fonts\.bunny\.net/;
const FONT_FILE = /\.(?:woff2?|ttf|otf|eot)$/i;
const TOKENS = "src/styles.css";
const RULE = "(DEC-262: the device's own fonts; no page downloads a font)";

/** Every way a file under src/ or public/ could bring a web font back or set a family by name. */
export function fontFindings(files: string[], root: string): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    const name = relative(root, file).split(sep).join("/");
    if (FONT_FILE.test(name)) {
      found.push({ file: name, line: 1, what: `is a font file ${RULE}` });
      continue;
    }
    readFileSync(file, "utf8")
      .split("\n")
      .forEach((text, index) => {
        const line = index + 1;
        if (FONT_HOST.test(text))
          found.push({ file: name, line, what: `names a web-font host ${RULE}` });
        if (/@font-face/.test(text))
          found.push({ file: name, line, what: `declares @font-face ${RULE}` });
        if (/\bfontFamily\s*:|\bfont-\[/.test(text))
          found.push({
            file: name,
            line,
            what: `sets a font family by name; use font-sans or font-display ${RULE}`,
          });
        const family = /font-family\s*:\s*([^;]*)/.exec(text);
        if (family !== null && !/^var\(--font-(?:sans|display)\)$/.test(family[1].trim()))
          found.push({
            file: name,
            line,
            what: `sets a font family by name; use var(--font-sans) or var(--font-display) ${RULE}`,
          });
        if (/--font-(?:sans|display)\s*:/.test(text) && name !== TOKENS)
          found.push({ file: name, line, what: `defines a font token outside ${TOKENS} ${RULE}` });
      });
  }
  return found;
}

const ROOT = process.cwd();
const TEXT = ["ts", "tsx", "css", "html", "js", "mjs", "svg"];
const FONTS = ["woff", "woff2", "ttf", "otf", "eot"];

describe("no page downloads a font (DEC-262)", () => {
  it(
    "CF-FT-1 nothing under src/ or public/ names a web-font host, declares @font-face, ships a font file or sets a family by name",
    () => {
      const files = [
        ...walkFiles(["src", "public"], { ext: TEXT, skipTests: true }),
        ...walkFiles(["src", "public"], { ext: FONTS }),
      ].map((file) => join(ROOT, file));
      console.log(`[CF-FT-1] files read: ${files.length}`);
      expect(files.length).toBeGreaterThanOrEqual(500);
      expect(report(fontFindings(files, ROOT))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-FT-2 the two tokens are the device's stack and the base rules use them", () => {
    const css = readFileSync(TOKENS, "utf8");
    const sans = /--font-sans:\s*([^;]+);/.exec(css);
    expect(sans?.[1].replace(/\s+/g, " ").trim()).toBe(
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", "Helvetica Neue", Arial, "Noto Sans Ethiopic", Kefa, Nyala, Ebrima, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"',
    );
    expect(/--font-display:\s*([^;]+);/.exec(css)?.[1].trim()).toBe("var(--font-sans)");
    expect(css).toContain("font-family: var(--font-sans);");
    expect(css).toContain("font-family: var(--font-display);");
  });

  it("CF-FT-3 planted: a font host, @font-face, a font file, a family by name and a token outside styles.css each fail; the tokens pass", () => {
    const dir = join(ROOT, "node_modules/.cache/fonts-census");
    mkdirSync(join(dir, "src/features"), { recursive: true });
    mkdirSync(join(dir, "public/fonts"), { recursive: true });
    try {
      writeFileSync(
        join(dir, "src/features/bad.css"),
        '@font-face { font-family: "Inter"; src: url(/fonts/inter.woff2); }\n.title { font-family: "Inter", sans-serif; }\n:root { --font-sans: Inter; }\n',
      );
      writeFileSync(
        join(dir, "src/features/bad.tsx"),
        'export const link = { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter" };\nexport const style = { fontFamily: "Inter" };\nexport const cls = "font-[Inter]";\n',
      );
      writeFileSync(join(dir, "public/fonts/inter.woff2"), "");
      writeFileSync(
        join(dir, "src/features/good.css"),
        "body { font-family: var(--font-sans); }\nh1 { font-family: var(--font-display); }\n",
      );
      const files = [
        ...walkFiles([join(dir, "src"), join(dir, "public")], { ext: TEXT }),
        ...walkFiles([join(dir, "src"), join(dir, "public")], { ext: FONTS }),
      ];
      expect(report(fontFindings(files, dir))).toBe(
        [
          `public/fonts/inter.woff2:1 is a font file ${RULE}`,
          `src/features/bad.css:1 declares @font-face ${RULE}`,
          `src/features/bad.css:1 sets a font family by name; use var(--font-sans) or var(--font-display) ${RULE}`,
          `src/features/bad.css:2 sets a font family by name; use var(--font-sans) or var(--font-display) ${RULE}`,
          `src/features/bad.css:3 defines a font token outside ${TOKENS} ${RULE}`,
          `src/features/bad.tsx:1 names a web-font host ${RULE}`,
          `src/features/bad.tsx:2 sets a font family by name; use font-sans or font-display ${RULE}`,
          `src/features/bad.tsx:3 sets a font family by name; use font-sans or font-display ${RULE}`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
