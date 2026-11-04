import { dirname, relative, resolve, sep } from "node:path";
import ts from "typescript";
import { visitTs } from "./kit";

/**
 * CF-LOC-1 (P-1c turn (d); roadmap line 7's debt, the third carry of which was turn (c)) — A SCREEN
 * NEVER IMPORTS A LOCALE MODULE. A screen that needs the catalogue's SHAPE — whether a key exists,
 * or the whole shipped text for one action — asks the i18n mechanism: `has(key)` of `useI18n`
 * (src/i18n/provider.tsx) and `shippedCatalogues()` (src/i18n/compiled-catalog.ts, on demand).
 * A locale module imported by value (`src/i18n/locales/en.ts`, `am.ts`, or any layer file) pulls
 * every layer — the guide layer included — into that page's first download: +5.5 / +5.5 / +12.5 KiB
 * on three pages after turn (c).
 *
 * The census reads every file under src/ outside src/i18n/ (tests excepted): an `import … from`,
 * an `export … from` or a dynamic `import("…")` whose module resolves into src/i18n/locales/ is a
 * finding. Type-only imports are erased by the build and are not read.
 *
 * THE ONE EXEMPTION, by name: `en-base` — the English first paint. The provider itself imports it
 * (`enFirstPaint`), so the entry carries it on every page already, and `pageHead`
 * (src/lib/page-head.ts, INC-990) reads it on the server where no provider exists. It adds no
 * weight to any page; a line in the allowlist would need an expiry this exception has none of, so
 * it lives here (ruling 1 of turn (d), item 2) and the register row names it.
 */
export type Finding = { file: string; line: number; what: string };

/** The locale modules' folder, as a path from the root; a specifier resolving into it is a finding. */
const LOCALES = "src/i18n/locales";
/** The first-paint catalogue — the provider's own import, exempt by name (see above). */
const EXEMPT_STEMS = new Set(["en-base"]);
const RULE =
  "(CF-LOC-1: a screen asks useI18n's has() or shippedCatalogues(), never a locale module)";

/** Where a specifier lands, as a root-relative path without its extension — or null when it is not local. */
function resolveSpecifier(spec: string, file: string, root: string): string | null {
  let target: string;
  if (spec.startsWith("@/")) target = resolve(root, "src", spec.slice(2));
  else if (spec.startsWith(".")) target = resolve(root, dirname(file), spec);
  else return null;
  return relative(root, target)
    .split(sep)
    .join("/")
    .replace(/\.(?:tsx?|m?js)$/, "");
}

/** The import specifiers a file's code names by value: static, re-exported and dynamic forms. */
function specifiersOf(file: string, root: string): Array<{ spec: string; line: number }> {
  const out: Array<{ spec: string; line: number }> = [];
  visitTs(resolve(root, file), (node, source) => {
    const at = (n: ts.Node) => source.getLineAndCharacterOfPosition(n.getStart(source)).line + 1;
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      if (node.importClause?.isTypeOnly) return;
      out.push({ spec: node.moduleSpecifier.text, line: at(node) });
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined) {
      if (node.isTypeOnly || !ts.isStringLiteral(node.moduleSpecifier)) return;
      out.push({ spec: node.moduleSpecifier.text, line: at(node) });
    } else if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments[0] !== undefined &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      out.push({ spec: node.arguments[0].text, line: at(node) });
    }
  });
  return out;
}

/** Every value import of a locale module from a file outside src/i18n/ (files are root-relative). */
export function localeImportFindings(files: string[], root: string): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    const name = file.split(sep).join("/");
    if (name.startsWith("src/i18n/")) continue;
    for (const { spec, line } of specifiersOf(name, root)) {
      const landed = resolveSpecifier(spec, name, root);
      if (landed === null || !landed.startsWith(`${LOCALES}/`)) continue;
      const stem = landed.slice(LOCALES.length + 1);
      if (EXEMPT_STEMS.has(stem)) continue;
      found.push({ file: name, line, what: `imports ${landed} ${RULE}` });
    }
  }
  return found;
}
