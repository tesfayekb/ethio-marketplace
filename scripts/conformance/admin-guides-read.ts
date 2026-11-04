import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import ts from "typescript";

import { ADMIN_SECTIONS } from "../../src/features/admin/sections";
import { visitTs } from "./kit";

/**
 * P-1c (D313, D315) — CF-GUIDE-1's readers: the small TypeScript-AST readers admin-guides.ts
 * builds its census from — a Guide spec (a table's `guide=`, a page's `spec=`) in its three
 * forms, a page's `parts`, a JSX attribute, the files a route reaches. No judgement of the tree
 * lives here; admin-guides.ts holds the census and its findings.
 */
const EXTENSIONS = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"];
const SECTION_IDS = new Set<string>(ADMIN_SECTIONS.map((section) => section.id));

export function sourceOf(file: string): ts.SourceFile {
  return ts.createSourceFile(
    file,
    readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
}

export function resolveRelative(spec: string, fromFile: string): string | null {
  if (!spec.startsWith(".")) return null;
  const base = resolve(dirname(fromFile), spec);
  for (const ext of EXTENSIONS) {
    const candidate = `${base}${ext}`;
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

export function propertyNamed(
  object: ts.ObjectLiteralExpression,
  name: string,
): ts.Expression | null {
  for (const property of object.properties) {
    if (ts.isPropertyAssignment(property) && property.name.getText() === name)
      return property.initializer;
    if (ts.isShorthandPropertyAssignment(property) && property.name.text === name)
      return property.name;
  }
  return null;
}

export function hasProperty(object: ts.ObjectLiteralExpression, name: string): boolean {
  return object.properties.some(
    (property) =>
      (ts.isPropertyAssignment(property) ||
        ts.isShorthandPropertyAssignment(property) ||
        ts.isMethodDeclaration(property)) &&
      property.name !== undefined &&
      property.name.getText() === name,
  );
}

/** The string literals an expression can be: a literal, or a conditional of such. */
export function literalsOf(expression: ts.Expression): string[] | null {
  const bare = ts.isParenthesizedExpression(expression) ? expression.expression : expression;
  if (ts.isStringLiteral(bare) || ts.isNoSubstitutionTemplateLiteral(bare)) return [bare.text];
  if (ts.isConditionalExpression(bare)) {
    const yes = literalsOf(bare.whenTrue);
    const no = literalsOf(bare.whenFalse);
    return yes !== null && no !== null ? [...yes, ...no] : null;
  }
  return null;
}

/** The relatively imported module that names `name` among its imports, resolved. */
export function importedFrom(source: ts.SourceFile, name: string): string | null {
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier))
      continue;
    const bindings = statement.importClause?.namedBindings;
    if (bindings === undefined || !ts.isNamedImports(bindings)) continue;
    if (bindings.elements.some((element) => element.name.text === name))
      return resolveRelative(statement.moduleSpecifier.text, source.fileName);
  }
  return null;
}

/** A file's column keys: its own, plus those of every spread callee it declares or imports relatively. */
export type GuideSpecRead = { prefix: string; partsPrefix: string | null };
export type GuideProp = { specs: GuideSpecRead[]; shapeErrors: string[] };

/** The expression under `as const` / `satisfies` / parentheses. */
function unwrap(expression: ts.Expression): ts.Expression {
  let bare = expression;
  for (;;) {
    if (ts.isParenthesizedExpression(bare) || ts.isAsExpression(bare)) bare = bare.expression;
    else if (ts.isSatisfiesExpression(bare)) bare = bare.expression;
    else return bare;
  }
}

/** The initializer of `const <name>` in `source`, or in a relatively imported file that names it. */
function constantNamed(source: ts.SourceFile, name: string): ts.Expression | null {
  let found: ts.Expression | null = null;
  const walk = (node: ts.Node) => {
    if (found !== null) return;
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === name &&
      node.initializer !== undefined
    )
      found = node.initializer;
    ts.forEachChild(node, walk);
  };
  walk(source);
  if (found !== null) return found;
  const home = importedFrom(source, name);
  return home === null || home === source.fileName ? null : constantNamed(sourceOf(home), name);
}

/**
 * An expression as object literals: itself, the constant it names, or a conditional of such
 * (`edit === null ? POST_GUIDE : EDIT_GUIDE`); null when any branch is something else.
 */
function objectsOf(
  source: ts.SourceFile,
  value: ts.Expression,
): ts.ObjectLiteralExpression[] | null {
  const bare = unwrap(value);
  if (ts.isObjectLiteralExpression(bare)) return [bare];
  if (ts.isConditionalExpression(bare)) {
    const yes = objectsOf(source, bare.whenTrue);
    const no = objectsOf(source, bare.whenFalse);
    return yes !== null && no !== null ? [...yes, ...no] : null;
  }
  if (ts.isIdentifier(bare)) {
    const constant = constantNamed(source, bare.text);
    const inner = constant === null ? null : unwrap(constant);
    return inner !== null && ts.isObjectLiteralExpression(inner) ? [inner] : null;
  }
  return null;
}

/** One spec object's prefix(es), partsPrefix and next, judged. */
function readSpecObject(
  object: ts.ObjectLiteralExpression,
  routePaths: ReadonlySet<string>,
  errors: string[],
): GuideSpecRead[] {
  const prefix = propertyNamed(object, "prefix");
  const prefixes = prefix === null ? null : literalsOf(prefix);
  if (prefixes === null) errors.push("guide.prefix is not a string literal");
  const partsPrefixValue = propertyNamed(object, "partsPrefix");
  const partsPrefixes = partsPrefixValue === null ? null : literalsOf(partsPrefixValue);
  if (partsPrefixValue !== null && (partsPrefixes === null || partsPrefixes.length !== 1))
    errors.push("guide.partsPrefix is not one string literal");
  const next = propertyNamed(object, "next");
  if (next === null || !ts.isObjectLiteralExpression(next)) {
    errors.push("guide.next is not an object literal { section, block? } or { to, hash? }");
  } else if (hasProperty(next, "to")) {
    const to = propertyNamed(next, "to");
    const paths = to === null ? null : literalsOf(to);
    if (paths === null) errors.push("guide.next.to is not a string literal");
    else {
      for (const path of paths) {
        if (!routePaths.has(path))
          errors.push(`guide.next.to "${path}" is not a route of this tree`);
      }
    }
  } else {
    const section = propertyNamed(next, "section");
    const sections = section === null ? null : literalsOf(section);
    if (sections === null) errors.push("guide.next.section is not a string literal");
    else {
      for (const id of sections) {
        if (!SECTION_IDS.has(id)) errors.push(`guide.next.section "${id}" is not an admin section`);
      }
    }
    // `block` is a frame id the page composes (a constant, a helper's answer): the
    // type holds it to a string; the census judges the section only.
  }
  return (prefixes ?? []).map((one) => ({ prefix: one, partsPrefix: partsPrefixes?.[0] ?? null }));
}

/**
 * The `guide` prop's (or a PageGuide `spec`'s) shape: literal prefix(es), a literal partsPrefix
 * when given, and a next that is `{ section: "<an admin section>", block? }` or
 * `{ to: "<a route path>", hash? }`; an object literal, a constant, or a conditional of such.
 */
export function readGuide(
  source: ts.SourceFile,
  value: ts.Expression,
  routePaths: ReadonlySet<string>,
): GuideProp {
  const errors: string[] = [];
  const objects = objectsOf(source, value);
  if (objects === null) {
    return {
      specs: [],
      shapeErrors: [
        "guide is not an object literal (a literal, a constant, or a conditional of such)",
      ],
    };
  }
  const specs = objects.flatMap((object) => readSpecObject(object, routePaths, errors));
  return { specs, shapeErrors: errors };
}

/** A PageGuide's `parts`: an array literal of `{ key: "<literal>" }`, inline or a constant. */
export function readParts(source: ts.SourceFile, value: ts.Expression): string[] | null {
  let bare = unwrap(value);
  if (ts.isIdentifier(bare)) {
    const constant = constantNamed(source, bare.text);
    if (constant === null) return null;
    bare = unwrap(constant);
  }
  if (!ts.isArrayLiteralExpression(bare)) return null;
  const keys: string[] = [];
  for (const element of bare.elements) {
    const part = unwrap(element);
    if (!ts.isObjectLiteralExpression(part)) return null;
    const key = propertyNamed(part, "key");
    const literals = key === null ? null : literalsOf(key);
    if (literals === null || literals.length !== 1) return null;
    keys.push(literals[0] as string);
  }
  return keys;
}

/** The JSX attribute `name` of an element, as the expression it holds. */
export function attributeOf(
  element: ts.JsxOpeningElement | ts.JsxSelfClosingElement,
  name: string,
  source: ts.SourceFile,
): ts.Expression | undefined {
  const attribute = element.attributes.properties.find(
    (property): property is ts.JsxAttribute =>
      ts.isJsxAttribute(property) && property.name.getText(source) === name,
  );
  return attribute?.initializer !== undefined && ts.isJsxExpression(attribute.initializer)
    ? attribute.initializer.expression
    : undefined;
}

/** The files a route reaches through value imports (`@/` and relative), the route first. */
export function reachableFrom(root: string, routeFile: string): string[] {
  const srcRoot = join(root, "src");
  const generated = join(srcRoot, "routes", "routeTree.gen.ts");
  const resolveAny = (spec: string, fromFile: string): string | null => {
    if (spec.startsWith("@/")) {
      const base = join(srcRoot, spec.slice(2));
      for (const ext of EXTENSIONS) {
        const candidate = `${base}${ext}`;
        if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
      }
      return null;
    }
    return resolveRelative(spec, fromFile);
  };
  const seen = new Set<string>();
  const queue = [routeFile];
  while (queue.length > 0) {
    const file = queue.pop() as string;
    if (seen.has(file) || file === generated) continue;
    seen.add(file);
    visitTs(file, (node) => {
      let spec: string | null = null;
      if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
        const clause = node.importClause;
        const typeOnly =
          clause !== undefined &&
          (clause.isTypeOnly ||
            (clause.name === undefined &&
              clause.namedBindings !== undefined &&
              ts.isNamedImports(clause.namedBindings) &&
              clause.namedBindings.elements.length > 0 &&
              clause.namedBindings.elements.every((element) => element.isTypeOnly)));
        if (!typeOnly) spec = node.moduleSpecifier.text;
      } else if (
        ts.isExportDeclaration(node) &&
        !node.isTypeOnly &&
        node.moduleSpecifier !== undefined &&
        ts.isStringLiteral(node.moduleSpecifier)
      )
        spec = node.moduleSpecifier.text;
      else if (
        ts.isCallExpression(node) &&
        node.expression.kind === ts.SyntaxKind.ImportKeyword &&
        node.arguments[0] !== undefined &&
        ts.isStringLiteral(node.arguments[0])
      )
        spec = node.arguments[0].text;
      if (spec !== null) {
        const next = resolveAny(spec, file);
        if (next !== null && !seen.has(next)) queue.push(next);
      }
    });
  }
  return [...seen];
}

/** The JSX elements named `tag` in a source. */
export function elementsNamed(
  source: ts.SourceFile,
  tag: string,
): (ts.JsxOpeningElement | ts.JsxSelfClosingElement)[] {
  const out: (ts.JsxOpeningElement | ts.JsxSelfClosingElement)[] = [];
  const walk = (node: ts.Node) => {
    if (
      (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
      node.tagName.getText(source) === tag
    )
      out.push(node);
    ts.forEachChild(node, walk);
  };
  walk(source);
  return out;
}
