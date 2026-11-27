import { relative } from "node:path";
import ts from "typescript";

/**
 * DEC-474 Part F (cursor-bundle-8b) — THE REPORTER CENSUS. Every failure in the field that is ours is
 * reported once, by the one trigger (`reportBrowserFailure`, src/lib/error-report.ts) or the
 * server's one error answer (`serverError`, src/server/answer.ts); never a refusal, never an
 * offline reading. Four rules:
 *   reading  — a module that builds a failure reading of kind `server` by hand (an object with
 *              `kind: "server"` and a `diagnostic`) reaches the reporter;
 *   boundary — a module that holds a crash boundary (`errorComponent`, `componentDidCatch`)
 *              reaches the reporter;
 *   notice   — a notice report is made only by the notice's one reading
 *              (src/components/shell/failure-reason.ts), in a function that compares the kind with
 *              "server" and with no refusal kind;
 *   500      — no answer of status 500 is built under src/server/, src/routes/api/ or src/server.ts
 *              but in the answer module (the type checker says what a call returns);
 *   unseen   — (INC-1319) a notice drawn without its failure is a place the reporter never sees:
 *              an element given `error={null}` or `error={undefined}` (a notice, or a wrapper
 *              that hands it to one), and a given `reading={…}` that is neither a refusal by
 *              construction (`goneReading()`, `rateReading()`) nor an object this file builds
 *              (the reading rule judges those).
 * Keys survive a move: `<rule> <file>#<the enclosing declaration's name>`, and for unseen
 * `::<the element's testid>` when it has one. Allowances `key | reason | until` in
 * error-reports-allowlist.txt.
 * It MISSES: a reading built through a helper elsewhere, a boundary a library defines, a 500
 * whose status arrives as a variable, and a notice whose error is a variable that holds null.
 */

export type ReportFinding = { file: string; line: number; what: string; key: string };

const REPORTER = "reportBrowserFailure";
export const NOTICE_HOME = "src/components/shell/failure-reason.ts";
export const ANSWER_HOME = "src/server/answer.ts";
const REFUSAL_KINDS = new Set([
  "network",
  "gone",
  "changed",
  "noAccess",
  "signedOut",
  "stepUp",
  "rateLimited",
  "refused",
]);
/** Given readings that are refusals by construction: the notice never reports them. */
const REFUSAL_READINGS = new Set(["goneReading", "rateReading"]);
const COMPARISONS = new Set([
  ts.SyntaxKind.EqualsEqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsEqualsToken,
  ts.SyntaxKind.EqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsToken,
]);

function nameText(name: ts.Node | undefined): string | null {
  if (name === undefined) return null;
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isPrivateIdentifier(name))
    return name.text;
  return null;
}

/** The nearest named declaration around `node`: a function, a method, a variable or a class. */
function enclosingName(node: ts.Node): string {
  for (let up: ts.Node | undefined = node.parent; up !== undefined; up = up.parent) {
    if (
      ts.isFunctionDeclaration(up) ||
      ts.isMethodDeclaration(up) ||
      ts.isClassDeclaration(up) ||
      ts.isVariableDeclaration(up)
    ) {
      const name = nameText(up.name);
      if (name !== null) return name;
    }
  }
  return "<module>";
}

function enclosingFunction(node: ts.Node): ts.Node | null {
  for (let up: ts.Node | undefined = node.parent; up !== undefined; up = up.parent)
    if (ts.isFunctionLike(up)) return up;
  return null;
}

/** A property's string literal value in an object literal, or undefined. */
function literalOf(object: ts.ObjectLiteralExpression, property: string): string | undefined {
  for (const entry of object.properties) {
    if (!ts.isPropertyAssignment(entry) || nameText(entry.name) !== property) continue;
    const value = entry.initializer;
    if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) return value.text;
  }
  return undefined;
}

function hasProperty(object: ts.ObjectLiteralExpression, property: string): boolean {
  return object.properties.some(
    (entry) =>
      (ts.isPropertyAssignment(entry) || ts.isShorthandPropertyAssignment(entry)) &&
      nameText(entry.name) === property,
  );
}

function calleeName(call: ts.CallExpression): string | null {
  const callee = call.expression;
  if (ts.isIdentifier(callee)) return callee.text;
  if (ts.isPropertyAccessExpression(callee)) return callee.name.text;
  return null;
}

/** The string literals a function compares anything with (`x === "server"`). */
function comparedLiterals(scope: ts.Node): Set<string> {
  const found = new Set<string>();
  const walk = (node: ts.Node) => {
    if (ts.isBinaryExpression(node) && COMPARISONS.has(node.operatorToken.kind)) {
      for (const side of [node.left, node.right])
        if (ts.isStringLiteral(side) || ts.isNoSubstitutionTemplateLiteral(side))
          found.add(side.text);
    }
    ts.forEachChild(node, walk);
  };
  walk(scope);
  return found;
}

function lineOf(source: ts.SourceFile, node: ts.Node): number {
  return source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
}

/** A JSX attribute's expression (`name={…}`), or undefined. */
function attributeExpression(attribute: ts.JsxAttribute): ts.Expression | undefined {
  const value = attribute.initializer;
  return value !== undefined && ts.isJsxExpression(value) ? value.expression : undefined;
}

/** The element's literal `testid`, for the unseen rule's key. */
function testidOf(attribute: ts.JsxAttribute): string | null {
  for (const sibling of attribute.parent.properties) {
    if (!ts.isJsxAttribute(sibling) || nameText(sibling.name) !== "testid") continue;
    const value = sibling.initializer;
    if (value !== undefined && ts.isStringLiteral(value)) return value.text;
  }
  return null;
}

/** Whether a given reading is one the unseen rule leaves alone (see the rule above). */
function judgedElsewhere(expression: ts.Expression, built: ReadonlySet<string>): boolean {
  if (ts.isCallExpression(expression)) {
    const name = calleeName(expression);
    return name !== null && REFUSAL_READINGS.has(name);
  }
  return ts.isIdentifier(expression) && built.has(expression.text);
}

/** Whether a notice drawn with this attribute never shows the reporter its failure. */
function unseenAttribute(attribute: ts.JsxAttribute, built: ReadonlySet<string>): boolean {
  const expression = attributeExpression(attribute);
  if (expression === undefined) return false;
  const name = nameText(attribute.name);
  if (name === "error")
    return (
      expression.kind === ts.SyntaxKind.NullKeyword ||
      (ts.isIdentifier(expression) && expression.text === "undefined")
    );
  return name === "reading" && !judgedElsewhere(expression, built);
}

/** Rules reading, boundary and notice, over one source file. */
export function readingFindings(file: string, source: ts.SourceFile): ReportFinding[] {
  let reports = false;
  const readings: ts.Node[] = [];
  const boundaries: ts.Node[] = [];
  const notices: ts.CallExpression[] = [];
  const attributes: ts.JsxAttribute[] = [];
  const built = new Set<string>();
  const walk = (node: ts.Node) => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer !== undefined &&
      ts.isObjectLiteralExpression(node.initializer)
    )
      built.add(node.name.text);
    if (ts.isJsxAttribute(node) && ["error", "reading"].includes(nameText(node.name) ?? ""))
      attributes.push(node);
    if (ts.isCallExpression(node) && calleeName(node) === REPORTER) {
      reports = true;
      const [argument] = node.arguments;
      if (
        argument !== undefined &&
        ts.isObjectLiteralExpression(argument) &&
        literalOf(argument, "kind") === "notice"
      )
        notices.push(node);
    }
    if (
      ts.isObjectLiteralExpression(node) &&
      literalOf(node, "kind") === "server" &&
      hasProperty(node, "diagnostic")
    )
      readings.push(node);
    if (ts.isPropertyAssignment(node) && nameText(node.name) === "errorComponent")
      boundaries.push(node);
    if (ts.isMethodDeclaration(node) && nameText(node.name) === "componentDidCatch")
      boundaries.push(node);
    ts.forEachChild(node, walk);
  };
  walk(source);
  const findings: ReportFinding[] = [];
  const add = (rule: string, node: ts.Node, what: string) =>
    findings.push({
      file,
      line: lineOf(source, node),
      what,
      key: `${rule} ${file}#${enclosingName(node)}`,
    });
  if (!reports) {
    for (const node of readings)
      add("reading", node, "builds a failure reading of kind server and never reports it");
    for (const node of boundaries) add("boundary", node, "a crash boundary that never reports");
  }
  for (const call of notices) {
    if (file !== NOTICE_HOME) {
      add("notice", call, "reports a notice outside the notice's one reading");
      continue;
    }
    const scope = enclosingFunction(call);
    const compared = scope === null ? new Set<string>() : comparedLiterals(scope);
    const refusal = [...compared].some((literal) => REFUSAL_KINDS.has(literal));
    if (!compared.has("server") || refusal)
      add("notice", call, "reports a notice its server kind did not decide");
  }
  for (const attribute of attributes) {
    if (!unseenAttribute(attribute, built)) continue;
    const testid = testidOf(attribute);
    findings.push({
      file,
      line: lineOf(source, attribute),
      what: "draws a notice without its failure, which the reporter never sees",
      key: `unseen ${file}#${enclosingName(attribute)}${testid === null ? "" : `::${testid}`}`,
    });
  }
  return findings;
}

/** True for a type that is a Response, or a promise of one. */
function isResponse(type: ts.Type, checker: ts.TypeChecker): boolean {
  if (type.isUnion()) return type.types.some((member) => isResponse(member, checker));
  const text = checker.typeToString(type);
  return text === "Response" || text === "Promise<Response>";
}

function answers(call: ts.CallLikeExpression, checker: ts.TypeChecker): boolean {
  if (ts.isNewExpression(call)) return call.expression.getText() === "Response";
  const signature = checker.getResolvedSignature(call);
  return (
    signature !== undefined && isResponse(checker.getReturnTypeOfSignature(signature), checker)
  );
}

/** Rule 500, over the files of a typed program the answer rule judges. */
export function answerFindings(
  program: ts.Program,
  root: string,
  judged: (file: string) => boolean,
): ReportFinding[] {
  const checker = program.getTypeChecker();
  const findings: ReportFinding[] = [];
  for (const source of program.getSourceFiles()) {
    const file = relative(root, source.fileName).split("\\").join("/");
    if (!judged(file) || file === ANSWER_HOME) continue;
    const walk = (node: ts.Node) => {
      if (ts.isNumericLiteral(node) && node.text === "500") {
        const parent = node.parent;
        let call: ts.CallLikeExpression | null = null;
        if (
          (ts.isCallExpression(parent) || ts.isNewExpression(parent)) &&
          parent.arguments?.includes(node)
        )
          call = parent;
        else if (
          ts.isPropertyAssignment(parent) &&
          nameText(parent.name) === "status" &&
          ts.isObjectLiteralExpression(parent.parent)
        ) {
          const holder = parent.parent.parent;
          if (ts.isCallExpression(holder) || ts.isNewExpression(holder)) call = holder;
        }
        if (call !== null && answers(call, checker))
          findings.push({
            file,
            line: lineOf(source, node),
            what: "an answer of status 500 built outside serverError",
            key: `500 ${file}#${enclosingName(node)}`,
          });
      }
      ts.forEachChild(node, walk);
    };
    walk(source);
  }
  return findings;
}

/** The files rule 500 judges: the server's code, the API routes and the server entry. */
export function answersHere(file: string): boolean {
  if (/\.test\.tsx?$/.test(file)) return false;
  return (
    file === "src/server.ts" || file.startsWith("src/server/") || file.startsWith("src/routes/api/")
  );
}
