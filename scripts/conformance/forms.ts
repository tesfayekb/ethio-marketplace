import { readFileSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";
import { visitTs, walkFiles } from "./kit";

/**
 * THE FIELD-COVERAGE CENSUS (Foundations 2 wave 1, DEC-339) — the five laws of the form kit, read
 * from every non-test .ts/.tsx file under src/:
 *
 * - CF-FORM-1 a control a person types into or chooses from renders inside the one `Field`
 *   (`src/components/forms/field.tsx`). DEC-338: controls that are not answers are exempt BY KIND,
 *   never by an allowlist line — a file input, a search box (`type="search"`), a list filter (the
 *   `search` slot of `TableToolbar`, anything inside `TableToolbar` or `ToolbarPanel`, a `toolbar`
 *   prop), and the table's own chrome (the files of the `DataTable` primitive). The primitives
 *   that define a control, and the kit itself, are the mechanism, not its consumers.
 * - CF-FORM-2 every `<form>` carries `noValidate` (the gate speaks, never the browser's bubble).
 * - CF-FORM-3 a refusal reaches a screen only through the one reader (`src/lib/refusal.ts`): a
 *   function named as an error mapper (`*ErrorKey`, `*ErrorLine`, `use*Error`, `*RefusalKey`, `use*Failure`), or a
 *   local equivalent (a function from an `error` / `message` / `err` / `failure` to a `MessageKey`),
 *   that does not read through `readRefusal`, is a mapper outside the reader.
 * - CF-FORM-4 typed text and numbers pass the one parser (`src/lib/parse-input.ts`): a sentinel
 *   (`numberOrZero`, a `"0"` or `0` standing in for a blank inside `Number(…)`, `Number(…) || 0`,
 *   `Number(…) ?? 0`) or a `Number` / `parseInt` / `parseFloat` of a typed control's own value.
 * - CF-FORM-5 one control class: a local field or control class (`fieldClass`, `controlClass`,
 *   `*FieldClass`, `*ControlClass`) outside the kit.
 */

export type FormLaw = "CF-FORM-1" | "CF-FORM-2" | "CF-FORM-3" | "CF-FORM-4" | "CF-FORM-5";
export type FormFinding = { law: FormLaw; file: string; line: number; what: string };

/** The control tags a person types into or chooses from (the plan's walk, §1.2). */
export const CONTROL_TAGS = new Set([
  "input",
  "Input",
  "PasswordInput",
  "select",
  "NativeSelect",
  "textarea",
  "Textarea",
  "Checkbox",
  "Switch",
  "RadioGroupItem",
  "InputOTP",
  "Slider",
  "PhoneNumberField",
]);

/** The kit: the one Field and its control kinds. */
export const KIT_DIR = "src/components/forms/";
export const READER = "src/lib/refusal.ts";
export const PARSER = "src/lib/parse-input.ts";

/** The primitives that define a control (the mechanism's parts, not consumers of it). */
export const CONTROL_PRIMITIVES = new Set([
  "src/components/ui/input.tsx",
  "src/components/ui/native-select.tsx",
  "src/components/ui/password-input.tsx",
  "src/components/ui/textarea.tsx",
  "src/components/ui/checkbox.tsx",
  "src/components/ui/switch.tsx",
  "src/components/ui/radio-group.tsx",
  "src/components/ui/input-otp.tsx",
  "src/components/ui/slider.tsx",
  // The phone control (a calling-code picker and the number): a kind whose use sits in a Field.
  "src/features/posting/phone-number-field.tsx",
]);

/** DEC-338 — the table's own chrome: the `DataTable` primitive's files (ticks, page size, columns). */
export const TABLE_CHROME = new Set([
  "src/components/shell/data-table.tsx",
  "src/components/shell/columns-button.tsx",
]);

/** DEC-338 — a list filter: a control drawn inside one of these, or handed to one of these props. */
const FILTER_HOSTS = new Set(["TableToolbar", "ToolbarPanel"]);
const FILTER_PROPS = new Set(["toolbar", "search", "filters"]);

const MAPPER_NAME = /(?:ErrorKey|ErrorLine|RefusalKey)$|^use[A-Z]\w*(?:Error|Failure)$|^ErrorLine$/;
const MAPPER_PARAM = new Set(["error", "message", "err", "failure"]);
const CLASS_NAME = /^(?:field|control|fieldControl)Class$|(?:FieldClass|ControlClass)$/;
const TYPED_TAGS = new Set(["input", "Input", "textarea", "Textarea"]);

type Kind = "field" | "formField" | "file" | "search" | "filter" | "chrome" | "bare";
export type Control = { file: string; line: number; tag: string; kind: Kind };

function tagOf(node: ts.JsxOpeningLikeElement): string {
  return node.tagName.getText();
}

function attribute(node: ts.JsxOpeningLikeElement, name: string): ts.JsxAttribute | undefined {
  return node.attributes.properties.find(
    (property): property is ts.JsxAttribute =>
      ts.isJsxAttribute(property) && property.name.getText() === name,
  );
}

function literalAttribute(node: ts.JsxOpeningLikeElement, name: string): string | null {
  const found = attribute(node, name);
  const value = found?.initializer;
  if (value === undefined) return null;
  if (ts.isStringLiteral(value)) return value.text;
  if (ts.isJsxExpression(value) && value.expression && ts.isStringLiteral(value.expression))
    return value.expression.text;
  return null;
}

function openingOf(node: ts.Node): ts.JsxOpeningLikeElement | null {
  if (ts.isJsxElement(node)) return node.openingElement;
  if (ts.isJsxSelfClosingElement(node)) return node;
  return null;
}

/** Where a control sits: inside a Field, inside FormField, inside a filter host or prop, or bare. */
function placeOf(node: ts.JsxOpeningLikeElement): Kind {
  const element = ts.isJsxOpeningElement(node) ? node.parent : node;
  for (let up: ts.Node | undefined = element.parent; up !== undefined; up = up.parent) {
    if (ts.isJsxAttribute(up) && FILTER_PROPS.has(up.name.getText())) return "filter";
    const opening = openingOf(up);
    if (opening === null) continue;
    const tag = tagOf(opening);
    if (tag === "Field") return "field";
    if (tag === "FormField") return "formField";
    if (FILTER_HOSTS.has(tag)) return "filter";
  }
  return "bare";
}

function inSrc(file: string): string {
  return file.replace(/\\/g, "/");
}

export function controlsOf(file: string, text?: string): Control[] {
  const path = inSrc(file);
  const controls: Control[] = [];
  visitTs(
    file,
    (node, source) => {
      if (!ts.isJsxOpeningElement(node) && !ts.isJsxSelfClosingElement(node)) return;
      const tag = tagOf(node);
      if (!CONTROL_TAGS.has(tag)) return;
      const type = literalAttribute(node, "type");
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      let kind: Kind;
      if (type === "file") kind = "file";
      else if (type === "search" || literalAttribute(node, "role") === "searchbox") kind = "search";
      else if (TABLE_CHROME.has(path)) kind = "chrome";
      else kind = placeOf(node);
      controls.push({ file: path, line, tag, kind });
    },
    text,
  );
  return controls;
}

function nameOfFunction(node: ts.Node): string | null {
  if (ts.isFunctionDeclaration(node) && node.name) return node.name.text;
  if (
    (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) &&
    ts.isVariableDeclaration(node.parent) &&
    ts.isIdentifier(node.parent.name)
  )
    return node.parent.name.text;
  return null;
}

function readsThroughReader(node: ts.Node): boolean {
  let reads = false;
  const visit = (child: ts.Node) => {
    if (
      ts.isCallExpression(child) &&
      ts.isIdentifier(child.expression) &&
      child.expression.text === "readRefusal"
    )
      reads = true;
    if (!reads) ts.forEachChild(child, visit);
  };
  ts.forEachChild(node, visit);
  return reads;
}

function isMapper(node: ts.SignatureDeclaration & { body?: ts.Node }, name: string): boolean {
  if (MAPPER_NAME.test(name)) return true;
  const first = node.parameters[0];
  if (first === undefined || !ts.isIdentifier(first.name)) return false;
  if (!MAPPER_PARAM.has(first.name.text)) return false;
  return node.type !== undefined && /\bMessageKey\b/.test(node.type.getText());
}

/** True when `node` is inside the `onChange` / `onBlur` / `onInput` of a typed control. */
function inTypedControlHandler(node: ts.Node): boolean {
  for (let up: ts.Node | undefined = node.parent; up !== undefined; up = up.parent) {
    if (ts.isJsxAttribute(up)) {
      const element = up.parent.parent;
      return (
        /^on(?:Change|Blur|Input)$/.test(up.name.getText()) &&
        (ts.isJsxOpeningElement(element) || ts.isJsxSelfClosingElement(element)) &&
        TYPED_TAGS.has(tagOf(element))
      );
    }
  }
  return false;
}

/** `name` is declared, in a block around `from`, from an expression that reads a `.value`. */
function boundToValue(name: ts.Identifier, from: ts.Node): boolean {
  for (let up: ts.Node | undefined = from.parent; up !== undefined; up = up.parent) {
    if (!ts.isBlock(up)) continue;
    for (const statement of up.statements) {
      if (!ts.isVariableStatement(statement)) continue;
      for (const declaration of statement.declarationList.declarations) {
        if (
          ts.isIdentifier(declaration.name) &&
          declaration.name.text === name.text &&
          declaration.initializer !== undefined &&
          /\.value\b/.test(declaration.initializer.getText())
        )
          return true;
      }
    }
  }
  return false;
}

function isZero(node: ts.Expression): boolean {
  return (
    (ts.isStringLiteral(node) && node.text === "0") ||
    (ts.isNumericLiteral(node) && node.text === "0")
  );
}

const PARSE_CALLS = new Set(["Number", "parseInt", "parseFloat"]);

function parseCallName(node: ts.CallExpression): string | null {
  const callee = node.expression;
  if (ts.isIdentifier(callee) && PARSE_CALLS.has(callee.text)) return callee.text;
  if (
    ts.isPropertyAccessExpression(callee) &&
    callee.expression.getText() === "Number" &&
    PARSE_CALLS.has(callee.name.text)
  )
    return callee.name.text;
  return null;
}

/** Every finding of the five laws in one file (`text` when a census serves a planted file). */
export function formFindings(file: string, text?: string): FormFinding[] {
  const path = inSrc(file);
  const findings: FormFinding[] = [];
  const kit = path.startsWith(KIT_DIR);
  if (!kit && !CONTROL_PRIMITIVES.has(path))
    for (const control of controlsOf(file, text))
      if (control.kind === "bare" || control.kind === "formField")
        findings.push({
          law: "CF-FORM-1",
          file: path,
          line: control.line,
          what: `<${control.tag}> outside the one Field${control.kind === "formField" ? " (inside FormField)" : ""}`,
        });
  visitTs(
    file,
    (node, source) => {
      const line = () => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      if (
        (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
        tagOf(node) === "form" &&
        attribute(node, "noValidate") === undefined
      )
        findings.push({
          law: "CF-FORM-2",
          file: path,
          line: line(),
          what: "<form> without noValidate",
        });
      const name = nameOfFunction(node);
      if (
        name !== null &&
        path !== READER &&
        (ts.isFunctionDeclaration(node) ||
          ts.isArrowFunction(node) ||
          ts.isFunctionExpression(node)) &&
        isMapper(node, name) &&
        !readsThroughReader(node)
      )
        findings.push({
          law: "CF-FORM-3",
          file: path,
          line: line(),
          what: `${name} maps a refusal outside the one reader`,
        });
      if (path !== PARSER) {
        if (name === "numberOrZero")
          findings.push({
            law: "CF-FORM-4",
            file: path,
            line: line(),
            what: "numberOrZero (a sentinel parse)",
          });
        if (ts.isCallExpression(node)) {
          const call = parseCallName(node);
          const argument = node.arguments[0];
          if (call !== null && argument !== undefined) {
            const inner = ts.isParenthesizedExpression(argument) ? argument.expression : argument;
            if (
              ts.isConditionalExpression(inner) &&
              (isZero(inner.whenTrue) || isZero(inner.whenFalse))
            )
              findings.push({
                law: "CF-FORM-4",
                file: path,
                line: line(),
                what: `${call}(… ? "0" : …) (a blank read as zero)`,
              });
            else if (
              (/\.value\b/.test(argument.getText()) ||
                (ts.isIdentifier(inner) && boundToValue(inner, node))) &&
              inTypedControlHandler(node)
            )
              findings.push({
                law: "CF-FORM-4",
                file: path,
                line: line(),
                what: `${call}(<a typed control's value>) outside the one parser`,
              });
          }
        }
        if (
          ts.isBinaryExpression(node) &&
          [ts.SyntaxKind.BarBarToken, ts.SyntaxKind.QuestionQuestionToken].includes(
            node.operatorToken.kind,
          ) &&
          isZero(node.right) &&
          ts.isCallExpression(node.left) &&
          parseCallName(node.left) !== null
        )
          findings.push({
            law: "CF-FORM-4",
            file: path,
            line: line(),
            what: "a parse defaulted to 0 (a sentinel)",
          });
      }
      const declared =
        (ts.isVariableDeclaration(node) || ts.isFunctionDeclaration(node)) &&
        node.name !== undefined &&
        ts.isIdentifier(node.name)
          ? node.name.text
          : null;
      if (!kit && declared !== null && CLASS_NAME.test(declared))
        findings.push({
          law: "CF-FORM-5",
          file: path,
          line: line(),
          what: `${declared} (a local field or control class)`,
        });
    },
    text,
  );
  return findings;
}

/** Every finding under `root`/src (tests aside), by root-relative path. */
export function formsCensus(root: string): FormFinding[] {
  return walkFiles([join(root, "src")], { ext: ["ts", "tsx"], skipTests: true }).flatMap((file) =>
    formFindings(relative(root, file).split("\\").join("/"), readFileSync(file, "utf8")),
  );
}

/** The allowlist key: one line per law and file, carrying its count, so a count can only fall. */
export function allowlistKeys(findings: FormFinding[]): Map<string, FormFinding[]> {
  const byKey = new Map<string, FormFinding[]>();
  const grouped = new Map<string, FormFinding[]>();
  for (const finding of findings) {
    const group = `${finding.law} ${finding.file}`;
    grouped.set(group, [...(grouped.get(group) ?? []), finding]);
  }
  for (const [group, list] of grouped) byKey.set(`${group} (${list.length})`, list);
  return byKey;
}
