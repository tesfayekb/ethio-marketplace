import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-1121 (the pictures turn, DEC-371) — A PICTURE FILLS ITS FRAME IN EVERY ENGINE. Every raster
 * image the app draws FROM AN ADDRESS goes through the one picture primitive,
 * `src/components/ui/picture.tsx` (`Picture`; `ListingPicture` builds on it): the frame takes the
 * caller's size, the image sits over it absolutely and is filled by `object-fit`. A hand-sized
 * image resolves differently by engine (WebKit drew My listings' photos at their natural height
 * inside a table cell), so a second local copy is a defect.
 *
 * The definition (ruling 1, answer 3): a JSX `img`, a JSX element named `<Something>.Image` (a
 * library's image part, such as Radix Avatar's), or a style `url(` in any string or template under
 * `src/` (an inline style, a Tailwind `bg-[url(…)]` class, a stylesheet). Outside it, by reason:
 *   - `url(#…)` — an SVG paint reference (the tier flag's gradient), not an image;
 *   - a `linear-gradient(…)` background (the colour option's two-ink swatch,
 *     `src/features/posting/step-specifications.tsx`) — no address;
 *   - the two `<canvas>` previews, `src/features/posting/photo-editor.tsx`
 *     (`post-photo-editor-preview`) and `src/features/posting/background-dialog.tsx`
 *     (`post-photo-background-preview`) — pixel editors that draw the photo they edit at their own
 *     pixel size, not a picture placed in a frame.
 *
 * Tests are outside the census (a test renders the primitive, it does not draw for a visitor).
 * An exception is a `file | reason | until` line in pictures-allowlist.txt, keyed by file; the list
 * is born empty. The lint rule beside it (`eslint.config.js` RESTRICTED_SYNTAX.picture,
 * CF-LINT-6) refuses a JSX `img` while the file is edited.
 */

type Finding = { file: string; line: number; what: string };

/** The primitive's own file: the one place an `img` is written. */
export const PICTURE_HOME = "src/components/ui/picture.tsx";

const ADDRESS = /\burl\(\s*(?!["']?\s*#)/;
const STYLE_EXT = /\.(?:css|scss)$/;

function textOf(node: ts.Node): string | undefined {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isTemplateExpression(node))
    return [node.head.text, ...node.templateSpans.map((span) => span.literal.text)].join("${}");
  return undefined;
}

function tagOf(node: ts.Node): string | undefined {
  if (!ts.isJsxOpeningElement(node) && !ts.isJsxSelfClosingElement(node)) return undefined;
  const tag = node.tagName;
  if (ts.isIdentifier(tag) && tag.text === "img") return "img";
  if (ts.isPropertyAccessExpression(tag) && tag.name.text === "Image") return tag.getText();
  return undefined;
}

export function picturesCensus(files: string[]): { keys: string[]; findings: Finding[] } {
  const findings: Finding[] = [];
  for (const file of files) {
    const path = file.split("\\").join("/");
    if (path.endsWith(PICTURE_HOME)) continue;
    if (STYLE_EXT.test(path)) {
      readFileSync(file, "utf8")
        .split(/\r?\n/)
        .forEach((text, index) => {
          if (ADDRESS.test(text))
            findings.push({
              file: path,
              line: index + 1,
              what: "draws an image from an address in a stylesheet; draw it through Picture",
            });
        });
      continue;
    }
    visitTs(file, (node, source) => {
      const line = () => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      const tag = tagOf(node);
      if (tag !== undefined) {
        findings.push({
          file: path,
          line: line(),
          what: `draws <${tag}> by hand; draw it through Picture (${PICTURE_HOME})`,
        });
        return;
      }
      const text = textOf(node);
      if (text !== undefined && ADDRESS.test(text))
        findings.push({
          file: path,
          line: line(),
          what: "draws an image from an address by a style url(; draw it through Picture",
        });
    });
  }
  return { keys: [...new Set(findings.map((hit) => hit.file))].sort(), findings };
}

const ALLOWLIST = "scripts/conformance/pictures-allowlist.txt";
const { keys, findings } = picturesCensus(
  walkFiles(["src"], { ext: ["ts", "tsx", "css", "scss"], skipTests: true }),
);
const allowances = readAllowlist(ALLOWLIST, keys);

describe("a picture fills its frame in every engine (INC-1121)", () => {
  it(
    "CF-PICTURE-1 no hand-drawn image under src/ outside the picture primitive",
    () => {
      console.log(
        `[CF-PICTURE-1] files drawing an image by hand: ${keys.length}; sites: ${findings.length}; allowlist: ${allowances.size}`,
      );
      expect(report(findings.filter((hit) => !allowances.has(hit.file)))).toBe("");
      expect(allowances.size).toBe(0);
    },
    TREE_SCAN_MS,
  );

  it("CF-PICTURE-2 the primitive draws the image absolutely over its frame, and ListingPicture builds on it", () => {
    const home = readFileSync(PICTURE_HOME, "utf8");
    expect(home).toMatch(
      /export const PICTURE_IMAGE_CLASS = "absolute inset-0 block h-full w-full"/,
    );
    expect(home).toMatch(/onError=\{/);
    expect(home).toMatch(/data-picture-frame=\{fit\}/);
    const listing = readFileSync("src/components/marketplace/listing-picture.tsx", "utf8");
    expect(listing).toMatch(/from "@\/components\/ui\/picture"/);
    expect(listing).toMatch(/<Picture\b/);
  });

  it("CF-PICTURE-3 the census sees a planted img, a library image part and a style url(, and passes the primitive and url(#…)", () => {
    const dir = "node_modules/.cache/pictures-census";
    mkdirSync(dir, { recursive: true });
    const bad = `${dir}/bad.tsx`;
    const good = `${dir}/good.tsx`;
    const sheet = `${dir}/sheet.css`;
    try {
      writeFileSync(
        bad,
        [
          'export const A = () => <img src={x} alt="" />;',
          "export const B = () => <AvatarPrimitive.Image src={x} />;",
          "export const C = () => <div style={{ backgroundImage: `url(${x})` }} />;",
          'export const D = () => <div className="bg-[url(/a.png)]" />;',
          "export const E = () => <img src={x}></img>;",
        ].join("\n"),
      );
      writeFileSync(
        good,
        [
          'import { Picture } from "@/components/ui/picture";',
          'export const A = () => <Picture src={x} fit="cover" className="h-12 w-16" />;',
          "export const B = () => <rect style={{ fill: `url(#${id})` }} />;",
          'export const C = () => <div style={{ backgroundImage: "linear-gradient(135deg, red, blue)" }} />;',
          "export const D = () => <canvas width={4} height={3} />;",
          "export const url = (s: string) => s;",
          'export const E = url("x");',
        ].join("\n"),
      );
      writeFileSync(sheet, ".a { fill: url(#g); }\n.b { background: url('/b.png'); }\n");
      const result = picturesCensus([bad, good, sheet]);
      expect(result.keys).toEqual([bad, sheet].sort());
      expect(result.findings.map((hit) => `${hit.file}:${hit.line}`).sort()).toEqual(
        [`${bad}:1`, `${bad}:2`, `${bad}:3`, `${bad}:4`, `${bad}:5`, `${sheet}:2`].sort(),
      );
      expect(picturesCensus([PICTURE_HOME]).findings).toEqual([]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
