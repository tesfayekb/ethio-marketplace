import { readFileSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";

import { refusalStatus } from "../../src/lib/reader-failure";
import { parseManifest } from "../doors/manifest";

/**
 * INC-1280 (cursor bundle 7c, ruling 1) — THE DOOR WORDS' CENSUS. It reads the program of
 * tsconfig.json with the type checker:
 * - every family written `… satisfies DoorFamily<{ doors; also?; generic?; unreachable?; owed? }>`
 *   (src/lib/door-family.ts), with its doors, its declared codes and the words it really holds —
 *   read from the checker, so a word that arrives by a spread is read too;
 * - every door the manifest names (scripts/doors/manifest.txt) that a string literal under src/
 *   names (outside a type), where it is first named;
 * - every family no `DoorFamily` types: a declaration typed `RefusalFamily`, or an object literal
 *   holding `words` that satisfies nothing.
 * The codes each door answers are the program's own `DoorCodeMap` (src/lib/door-codes.generated.ts).
 * A door whose every code is a gate code needs no family: the shared words carry the gate codes.
 *
 * It MISSES: a door named only through a computed string; a family built inside a function and
 * returned (it is read where it is declared, when it is); words set after the declaration.
 */

export const GATE_CODES: ReadonlySet<string> = new Set([
  "notSignedIn",
  "accountDeactivated",
  "permissionDenied",
  "stepUpRequired",
  "rateLimited",
]);

export type DoorWordsFamily = {
  file: string;
  line: number;
  name: string;
  doors: string[];
  also: Map<string, string>;
  generic: Map<string, string>;
  unreachable: Map<string, string>;
  owed: Map<string, string>;
  words: string[];
};

export type DoorWordsFinding = { file: string; line: number; what: string; key: string };

export type DoorWordsTree = {
  families: DoorWordsFamily[];
  codes: Map<string, Set<string>>;
  named: Map<string, { file: string; line: number }>;
  untyped: DoorWordsFinding[];
};

function relPath(root: string, file: string): string {
  return relative(root, file).split("\\").join("/");
}

function inScope(rel: string): boolean {
  return (
    rel.startsWith("src/") &&
    !rel.startsWith("src/integrations/") &&
    !/\.test\.tsx?$/.test(rel) &&
    !rel.endsWith(".generated.ts")
  );
}

function lineOf(node: ts.Node): number {
  const source = node.getSourceFile();
  return source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
}

/** The string literal values of a type (a union of them, a single one, or none for `never`). */
function literals(type: ts.Type): string[] {
  if (type.isUnion()) return type.types.flatMap(literals);
  if (type.isStringLiteral()) return [type.value];
  return [];
}

function propertyType(checker: ts.TypeChecker, type: ts.Type, name: string, at: ts.Node) {
  const symbol = checker.getPropertyOfType(type, name);
  return symbol === undefined ? undefined : checker.getTypeOfSymbolAtLocation(symbol, at);
}

/** A declared part's entries: each code with its stated source or reason. */
function entries(checker: ts.TypeChecker, type: ts.Type, name: string, at: ts.Node) {
  const out = new Map<string, string>();
  const part = propertyType(checker, type, name, at);
  if (part === undefined) return out;
  for (const symbol of checker.getPropertiesOfType(part)) {
    const value = literals(checker.getTypeOfSymbolAtLocation(symbol, at));
    out.set(symbol.getName(), value.join(" | "));
  }
  return out;
}

function doorFamilyReference(node: ts.TypeNode): ts.TypeReferenceNode | undefined {
  if (ts.isTypeReferenceNode(node) && node.typeName.getText() === "DoorFamily") return node;
  if (ts.isIntersectionTypeNode(node)) {
    for (const member of node.types) {
      const found = doorFamilyReference(member);
      if (found !== undefined) return found;
    }
  }
  return undefined;
}

function declaredName(node: ts.Node): string {
  let current: ts.Node | undefined = node.parent;
  while (current !== undefined && !ts.isSourceFile(current)) {
    if (ts.isVariableDeclaration(current) && ts.isIdentifier(current.name))
      return current.name.text;
    current = current.parent;
  }
  return `line ${lineOf(node)}`;
}

/** The value under `as const` and parentheses. */
function bare(node: ts.Expression): ts.Expression {
  let current = node;
  while (
    ts.isParenthesizedExpression(current) ||
    (ts.isAsExpression(current) && current.type.getText() === "const")
  )
    current = current.expression;
  return current;
}

function holdsWords(node: ts.Expression): boolean {
  const value = bare(node);
  return (
    ts.isObjectLiteralExpression(value) &&
    value.properties.some((p) => ts.isPropertyAssignment(p) && p.name.getText() === "words")
  );
}

function doorCodes(program: ts.Program, checker: ts.TypeChecker): Map<string, Set<string>> {
  const codes = new Map<string, Set<string>>();
  for (const source of program.getSourceFiles()) {
    if (!source.fileName.endsWith("src/lib/door-codes.generated.ts")) continue;
    for (const statement of source.statements) {
      if (!ts.isTypeAliasDeclaration(statement) || statement.name.text !== "DoorCodeMap") continue;
      const type = checker.getTypeAtLocation(statement.name);
      for (const symbol of checker.getPropertiesOfType(type)) {
        const answered = literals(checker.getTypeOfSymbolAtLocation(symbol, statement));
        codes.set(symbol.getName(), new Set(answered));
      }
    }
  }
  return codes;
}

/** The census's reading of a program: the typed families, the codes, the named doors, the untyped families. */
export function readDoorWords(program: ts.Program, root: string): DoorWordsTree {
  const checker = program.getTypeChecker();
  const manifest = parseManifest(readFileSync(join(root, "scripts/doors/manifest.txt"), "utf8"));
  const doorNames = new Set([...manifest.lines.values()].map((line) => line.name));
  const families: DoorWordsFamily[] = [];
  const named = new Map<string, { file: string; line: number }>();
  const untyped: DoorWordsFinding[] = [];

  for (const source of program.getSourceFiles()) {
    const file = relPath(root, source.fileName);
    if (!inScope(file)) continue;
    const visit = (node: ts.Node): void => {
      if (
        (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) &&
        doorNames.has(node.text) &&
        !ts.isLiteralTypeNode(node.parent) &&
        !named.has(node.text)
      )
        named.set(node.text, { file, line: lineOf(node) });

      if (ts.isSatisfiesExpression(node)) {
        const reference = doorFamilyReference(node.type);
        const argument = reference?.typeArguments?.[0];
        if (argument !== undefined) {
          const declared = checker.getTypeFromTypeNode(argument);
          const doors = propertyType(checker, declared, "doors", argument);
          const words = propertyType(
            checker,
            checker.getTypeAtLocation(node.expression),
            "words",
            node,
          );
          families.push({
            file,
            line: lineOf(node),
            name: declaredName(node),
            doors: doors === undefined ? [] : literals(doors),
            also: entries(checker, declared, "also", argument),
            generic: entries(checker, declared, "generic", argument),
            unreachable: entries(checker, declared, "unreachable", argument),
            owed: entries(checker, declared, "owed", argument),
            words:
              words === undefined
                ? []
                : checker.getPropertiesOfType(words).map((symbol) => symbol.getName()),
          });
        } else if (holdsWords(node.expression)) {
          const name = declaredName(node);
          untyped.push({
            file,
            line: lineOf(node),
            what: "a family no DoorFamily types",
            key: `family ${file}#${name}`,
          });
        }
      }

      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
        const annotated = node.type?.getText() === "RefusalFamily";
        const plain =
          node.initializer !== undefined &&
          !ts.isSatisfiesExpression(node.initializer) &&
          holdsWords(node.initializer);
        if (annotated || plain)
          untyped.push({
            file,
            line: lineOf(node),
            what: "a family no DoorFamily types",
            key: `family ${file}#${node.name.text}`,
          });
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return { families, codes: doorCodes(program, checker), named, untyped };
}

/** The doors a family's codes are read from: every code each listed door answers. */
function answered(tree: DoorWordsTree, family: DoorWordsFamily): Set<string> {
  const out = new Set<string>();
  for (const door of family.doors) for (const code of tree.codes.get(door) ?? []) out.add(code);
  return out;
}

/** A door named under src/ that no family lists, and that answers a code beyond the gate codes. */
export function uncoveredDoors(tree: DoorWordsTree): DoorWordsFinding[] {
  const listed = new Set(tree.families.flatMap((family) => family.doors));
  const out: DoorWordsFinding[] = [];
  for (const [door, where] of tree.named) {
    if (listed.has(door)) continue;
    const own = [...(tree.codes.get(door) ?? [])].filter((code) => !GATE_CODES.has(code));
    if (own.length === 0) continue;
    out.push({
      ...where,
      what: `no family lists ${door} (${own.join(", ")})`,
      key: `door ${door}`,
    });
  }
  return out;
}

/**
 * A family's words beyond its doors' codes, the gate codes and its `also`; an `also` code a door
 * answers; an excused code no door answers. The type refuses each in a literal; this reads the
 * words the checker sees, so a spread is judged too.
 */
export function familyFaults(tree: DoorWordsTree): DoorWordsFinding[] {
  const out: DoorWordsFinding[] = [];
  for (const family of tree.families) {
    const codes = answered(tree, family);
    const at = { file: family.file, line: family.line };
    for (const word of family.words)
      if (!codes.has(word) && !GATE_CODES.has(word) && !family.also.has(word))
        out.push({
          ...at,
          what: `${family.name} words ${word}, which no door, gate or also names`,
          key: `word ${family.name} ${word}`,
        });
    for (const code of family.also.keys())
      if (codes.has(code))
        out.push({
          ...at,
          what: `${family.name} declares also ${code}, which a listed door answers`,
          key: `also ${family.name} ${code}`,
        });
    for (const part of [family.generic, family.unreachable, family.owed])
      for (const code of part.keys())
        if (!codes.has(code))
          out.push({
            ...at,
            what: `${family.name} excuses ${code}, which no listed door answers`,
            key: `excused ${family.name} ${code}`,
          });
  }
  return out;
}

/** Each owed code, by every listed door that answers it: one allowlist line each. */
export function owedWords(tree: DoorWordsTree): DoorWordsFinding[] {
  const out: DoorWordsFinding[] = [];
  for (const family of tree.families)
    for (const code of family.owed.keys())
      for (const door of family.doors)
        if (tree.codes.get(door)?.has(code) === true)
          out.push({
            file: family.file,
            line: family.line,
            what: `${family.name}: ${code} from ${door} draws the generic; its words are owed`,
            key: `owed ${code} ${door}`,
          });
  return out;
}

/**
 * INC-1339 (cursor-bundle-8c-2b; the second occurrence of INC-1279's "gone shown as temporary") —
 * A GONE CODE IS WORDED, NEVER LEFT TO THE GENERIC. A code whose status is 404 in the client's one
 * table (`refusalStatus`, src/lib/reader-failure.ts: the row the caller named is not there, or not
 * theirs to see) means "go back", and a family's generic line ("could not be saved — try again")
 * says the opposite. A family that excuses such a code as `generic` or `owed` is a finding; its
 * words are `failure.gone` (the notice's own), as Save's family says for `listingNotAvailable`.
 */
export function goneLeftToGeneric(tree: DoorWordsTree): DoorWordsFinding[] {
  const out: DoorWordsFinding[] = [];
  for (const family of tree.families)
    for (const [part, codes] of [
      ["generic", family.generic],
      ["owed", family.owed],
    ] as const)
      for (const code of codes.keys())
        if (refusalStatus(code) === 404)
          out.push({
            file: family.file,
            line: family.line,
            what: `${family.name} leaves the gone code ${code} to its generic words (${part}); word it as failure.gone`,
            key: `gone ${family.name} ${code}`,
          });
  return out;
}
