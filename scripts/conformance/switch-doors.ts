import { readFileSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";

import { parseManifest } from "../doors/manifest";

/**
 * INC-1310 (cursor-bundle-8c-3b, DEC-507) — EACH SWITCH NAMES THE DOOR ITS CONTROL CALLS. A staff
 * control shows what its door allows (`useMayCall`, src/features/permissions/use-may-call.ts): the
 * switch is `mayCall({ door })` or `mayCall({ route, method })`. A switch that names one door while
 * the control it draws calls another shows the control to someone its own door would refuse, or
 * hides it from someone it would allow. This reads, with the type checker:
 *
 *   - every `mayCall({ … })` switch in browser code (tests, the platform client and the hook aside);
 *   - each REGION a switch gates: the branch of `s ? A : B` (`B` for `!s`), the right side of
 *     `s && <A/>` (a JSX element, a call or a conditional), the rest of a function after
 *     `if (!s) return`, the call that takes `s` (`enabled: s`, an argument), and for `<Child
 *     prop={s}>` the child's own uses of that prop (followed into the child, negation kept). An
 *     alias (`const editable = s && …`) is followed as the switch;
 *   - the doors and routes each region REACHES: its calls followed through the repository's
 *     functions, hooks (a hook's returned property: `const { revoke } = useX()` reaches only
 *     `revoke`'s door) and components, to `<client>.rpc("<door>")` and `callRoute`,
 *     `downloadRoute` or `uploadRoute`.
 *
 * THE RULE: a region that reaches a WRITING call (a door of class `staff` in
 * scripts/doors/manifest.txt, a route method other than GET) must reach the switch's own door or
 * route (a route is compared without its query). A region that reaches no write — a button that
 * only opens a dialog by state, a word — is quiet.
 *
 * What it cannot see (named here and in docs/features/ci-guards.md): a control that only sets
 * state, and a dialog drawn elsewhere that makes the call; a call whose door or path is not a
 * literal the checker can read.
 *
 * A finding's place is the use of the switch (its file and line); an allowlist key names that line
 * by its text (`<file>#<text>`, kit.ts `readPlacedAllowlist`).
 */

export type SwitchFinding = { file: string; line: number; what: string };
export type SwitchReading = {
  /** `mayCall({ … })` switches found. */
  switches: number;
  /** Regions the switches gate. */
  regions: number;
  findings: SwitchFinding[];
};

type Region = { kind: string; node: ts.Node; site: ts.Node };

/** The doors the manifest classes as writes (`staff`), by name. */
export function writingDoors(root: string): Set<string> {
  const manifest = parseManifest(readFileSync(join(root, "scripts/doors/manifest.txt"), "utf8"));
  const out = new Set<string>();
  for (const [key, line] of manifest.lines)
    if (line.class === "staff") out.add(key.split("(")[0] ?? key);
  return out;
}

const routeOnly = (target: string): string => {
  const [path = "", method = ""] = target.slice("route:".length).split(" ");
  return `route:${path.split("?")[0] ?? path} ${method}`;
};

/** Reads every switch of `program`'s browser code, or only `onlyFile`'s (a planted file). */
export function readSwitches(program: ts.Program, root: string, onlyFile?: string): SwitchReading {
  const checker = program.getTypeChecker();
  const writes = writingDoors(root);
  const srcRoot = join(root, "src");
  const inRepo = (node: ts.Node): boolean => {
    const file = node.getSourceFile().fileName;
    return file.startsWith(srcRoot) && !file.includes("/integrations/");
  };
  const isWrite = (target: string): boolean =>
    target.startsWith("door:")
      ? writes.has(target.slice("door:".length))
      : !target.endsWith(" GET");
  const place = (node: ts.Node) => {
    const source = node.getSourceFile();
    return {
      file: relative(root, source.fileName).split("\\").join("/"),
      line: source.getLineAndCharacterOfPosition(node.getStart()).line + 1,
    };
  };

  function resolve(id: ts.Node): ts.Declaration[] {
    let symbol = checker.getSymbolAtLocation(id);
    if (symbol === undefined) return [];
    if (symbol.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol);
    return (symbol.declarations ?? []).filter(inRepo);
  }

  function stringOf(expression: ts.Expression | undefined): string | null {
    if (expression === undefined) return null;
    if (ts.isStringLiteralLike(expression)) return expression.text;
    if (ts.isTemplateExpression(expression)) return `${expression.head.text}*`;
    if (ts.isAsExpression(expression)) return stringOf(expression.expression);
    if (ts.isIdentifier(expression)) {
      for (const declaration of resolve(expression))
        if (ts.isVariableDeclaration(declaration) && declaration.initializer !== undefined)
          return stringOf(declaration.initializer);
    }
    return null;
  }

  function routeMethod(call: ts.CallExpression, fn: string): string {
    if (fn === "downloadRoute") return "GET";
    if (fn === "uploadRoute") return "POST";
    const init = call.arguments[1];
    if (init === undefined || !ts.isObjectLiteralExpression(init)) return "GET";
    let json = false;
    for (const property of init.properties) {
      if (!ts.isPropertyAssignment(property) && !ts.isShorthandPropertyAssignment(property))
        continue;
      const name = property.name.getText();
      if (name === "method" && ts.isPropertyAssignment(property)) {
        const method = stringOf(property.initializer);
        if (method !== null) return method;
      }
      if (name === "json") json = true;
    }
    return json ? "POST" : "GET";
  }

  const memo = new Map<ts.Node, Set<string>>();

  function reach(node: ts.Node, stack: Set<ts.Node> = new Set()): Set<string> {
    const known = memo.get(node);
    if (known !== undefined) return known;
    if (stack.has(node)) return new Set();
    stack.add(node);
    const out = new Set<string>();
    const add = (more: Set<string>) => more.forEach((item) => out.add(item));
    const follow = (id: ts.Node) => {
      for (const declaration of resolve(id)) {
        if (ts.isFunctionDeclaration(declaration) || ts.isMethodDeclaration(declaration)) {
          if (declaration.body !== undefined) add(reach(declaration.body, stack));
        } else if (ts.isVariableDeclaration(declaration) && declaration.initializer) {
          add(reach(declaration.initializer, stack));
        } else if (ts.isBindingElement(declaration)) {
          add(bindingReach(declaration, stack));
        } else if (ts.isPropertyAssignment(declaration)) {
          add(reach(declaration.initializer, stack));
        }
      }
    };
    const visit = (child: ts.Node): void => {
      if (ts.isCallExpression(child)) {
        const callee = child.expression;
        const name = ts.isPropertyAccessExpression(callee)
          ? callee.name.text
          : ts.isIdentifier(callee)
            ? callee.text
            : "";
        if (name === "rpc") {
          const door = stringOf(child.arguments[0]);
          if (door !== null) out.add(`door:${door}`);
        } else if (name === "callRoute" || name === "downloadRoute" || name === "uploadRoute") {
          const path = stringOf(child.arguments[0]);
          if (path !== null) out.add(routeOnly(`route:${path} ${routeMethod(child, name)}`));
        }
      }
      if (ts.isIdentifier(child) && !ts.isPropertyAccessExpression(child.parent)) {
        const parent = child.parent;
        const isDeclarationName =
          (ts.isVariableDeclaration(parent) ||
            ts.isFunctionDeclaration(parent) ||
            ts.isParameter(parent) ||
            ts.isBindingElement(parent) ||
            ts.isPropertyAssignment(parent) ||
            ts.isJsxAttribute(parent)) &&
          parent.name === child;
        if (!isDeclarationName) follow(child);
      }
      if (ts.isPropertyAccessExpression(child) && ts.isIdentifier(child.expression))
        follow(child.expression);
      ts.forEachChild(child, visit);
    };
    visit(node);
    stack.delete(node);
    memo.set(node, out);
    return out;
  }

  /** `const { a } = useX()` reaches `a` in useX's returned object, else the whole call. */
  function bindingReach(element: ts.BindingElement, stack: Set<ts.Node>): Set<string> {
    const declaration = element.parent.parent;
    if (!ts.isVariableDeclaration(declaration) || declaration.initializer === undefined)
      return new Set();
    const key = (element.propertyName ?? element.name).getText();
    const initializer = declaration.initializer;
    if (ts.isCallExpression(initializer) && ts.isIdentifier(initializer.expression)) {
      for (const callee of resolve(initializer.expression)) {
        const body = functionBody(callee);
        if (body === undefined) continue;
        const found = new Set<string>();
        let matched = false;
        const visit = (child: ts.Node): void => {
          if (
            ts.isReturnStatement(child) &&
            child.expression !== undefined &&
            ts.isObjectLiteralExpression(child.expression)
          ) {
            for (const property of child.expression.properties) {
              if (property.name?.getText() !== key) continue;
              matched = true;
              if (ts.isPropertyAssignment(property))
                reach(property.initializer, stack).forEach((item) => found.add(item));
              if (ts.isShorthandPropertyAssignment(property)) {
                const symbol = checker.getShorthandAssignmentValueSymbol(property);
                for (const valueDeclaration of symbol?.declarations ?? [])
                  if (
                    ts.isVariableDeclaration(valueDeclaration) &&
                    valueDeclaration.initializer !== undefined
                  )
                    reach(valueDeclaration.initializer, stack).forEach((item) => found.add(item));
              }
            }
          }
          if (!ts.isFunctionLike(child)) ts.forEachChild(child, visit);
        };
        ts.forEachChild(body, visit);
        if (matched) return found;
      }
    }
    return reach(initializer, stack);
  }

  function functionBody(declaration: ts.Declaration): ts.Node | undefined {
    if (ts.isFunctionDeclaration(declaration)) return declaration.body;
    if (
      ts.isVariableDeclaration(declaration) &&
      declaration.initializer !== undefined &&
      (ts.isArrowFunction(declaration.initializer) ||
        ts.isFunctionExpression(declaration.initializer))
    )
      return declaration.initializer.body;
    return undefined;
  }

  /** The target a `mayCall({ door | route, method })` call names. */
  function targetOf(call: ts.CallExpression): string | null {
    const argument = call.arguments[0];
    if (argument === undefined || !ts.isObjectLiteralExpression(argument)) return null;
    let door: string | null = null;
    let route: string | null = null;
    let method: string | null = null;
    for (const property of argument.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      const key = property.name.getText();
      const value = stringOf(property.initializer);
      if (key === "door") door = value;
      if (key === "route") route = value;
      if (key === "method") method = value;
    }
    if (door !== null) return `door:${door}`;
    if (route !== null && method !== null) return routeOnly(`route:${route} ${method}`);
    return null;
  }

  function usesOf(name: ts.Identifier, within: ts.Node): ts.Node[] {
    const symbol = checker.getSymbolAtLocation(name);
    const uses: ts.Node[] = [];
    const visit = (node: ts.Node): void => {
      if (ts.isIdentifier(node) && node !== name && checker.getSymbolAtLocation(node) === symbol)
        uses.push(node);
      ts.forEachChild(node, visit);
    };
    visit(within);
    return uses;
  }

  /** A switch handed to a component as `attr`: the component's own uses of that prop. */
  function propRegions(
    component: ts.Declaration,
    attribute: string,
    negated: boolean,
    depth: number,
    site: ts.Node,
  ): Region[] | null {
    const fn = ts.isFunctionDeclaration(component)
      ? component
      : ts.isVariableDeclaration(component) &&
          component.initializer !== undefined &&
          (ts.isArrowFunction(component.initializer) ||
            ts.isFunctionExpression(component.initializer))
        ? component.initializer
        : null;
    if (fn === null || fn.body === undefined || depth > 5) return null;
    const parameter = fn.parameters[0];
    if (parameter === undefined) return null;
    let uses: ts.Node[] = [];
    if (ts.isObjectBindingPattern(parameter.name)) {
      const element = parameter.name.elements.find(
        (candidate) => (candidate.propertyName ?? candidate.name).getText() === attribute,
      );
      if (element === undefined || !ts.isIdentifier(element.name)) return null;
      uses = usesOf(element.name, fn.body);
    } else if (ts.isIdentifier(parameter.name)) {
      const symbol = checker.getSymbolAtLocation(parameter.name);
      const visit = (node: ts.Node): void => {
        if (
          ts.isPropertyAccessExpression(node) &&
          node.name.text === attribute &&
          ts.isIdentifier(node.expression) &&
          checker.getSymbolAtLocation(node.expression) === symbol
        )
          uses.push(node);
        ts.forEachChild(node, visit);
      };
      visit(fn.body);
    } else return null;
    return uses.flatMap((use) => regionsOfUse(use, negated, depth + 1, site));
  }

  const JSX_DRAWN = (node: ts.Node): boolean =>
    ts.isJsxElement(node) ||
    ts.isJsxSelfClosingElement(node) ||
    ts.isJsxFragment(node) ||
    ts.isCallExpression(node) ||
    ts.isConditionalExpression(node);

  function regionsOfUse(
    use: ts.Node,
    startNegated: boolean,
    depth: number,
    site: ts.Node,
  ): Region[] {
    let current: ts.Node = use;
    let negated = startNegated;
    for (;;) {
      const parent = current.parent;
      if (
        ts.isPrefixUnaryExpression(parent) &&
        parent.operator === ts.SyntaxKind.ExclamationToken
      ) {
        negated = !negated;
        current = parent;
        continue;
      }
      if (ts.isParenthesizedExpression(parent)) {
        current = parent;
        continue;
      }
      if (
        ts.isBinaryExpression(parent) &&
        parent.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
      ) {
        let right: ts.Node = parent.right;
        while (ts.isParenthesizedExpression(right)) right = right.expression;
        if (parent.left === current && !negated && JSX_DRAWN(right))
          return [{ kind: "&&", node: parent.right, site }];
        current = parent;
        continue;
      }
      if (
        ts.isBinaryExpression(parent) &&
        parent.operatorToken.kind === ts.SyntaxKind.BarBarToken
      ) {
        current = parent;
        continue;
      }
      if (ts.isConditionalExpression(parent) && parent.condition === current) {
        const branch = negated ? parent.whenFalse : parent.whenTrue;
        return [{ kind: "?:", node: branch, site }];
      }
      if (
        ts.isVariableDeclaration(parent) &&
        parent.initializer === current &&
        ts.isIdentifier(parent.name) &&
        depth < 6
      ) {
        const name = parent.name;
        const here = negated;
        return usesOf(name, parent.getSourceFile()).flatMap((alias) =>
          regionsOfUse(alias, here, depth + 1, site).map((region) => ({
            ...region,
            kind: `alias ${name.text} ${region.kind}`,
          })),
        );
      }
      if (ts.isJsxExpression(parent) && ts.isJsxAttribute(parent.parent)) {
        const attribute = parent.parent;
        const element = attribute.parent.parent;
        const tag =
          ts.isJsxSelfClosingElement(element) || ts.isJsxOpeningElement(element)
            ? element.tagName
            : null;
        const declarations =
          tag !== null && ts.isIdentifier(tag) && /^[A-Z]/.test(tag.text) ? resolve(tag) : [];
        const owner = ts.isJsxOpeningElement(element) ? element.parent : element;
        const first = declarations[0];
        if (first !== undefined) {
          const inner = propRegions(first, attribute.name.getText(), negated, depth, site);
          if (inner !== null)
            return inner.map((region) => ({
              ...region,
              kind: `prop ${attribute.name.getText()} → <${tag?.getText() ?? ""}> ${region.kind}`,
            }));
          return [{ kind: `prop ${attribute.name.getText()} (whole)`, node: first, site }];
        }
        return [{ kind: `attribute ${attribute.name.getText()}`, node: owner, site }];
      }
      if (ts.isPropertyAssignment(parent) || ts.isShorthandPropertyAssignment(parent)) {
        let call: ts.Node | undefined = parent;
        while (call !== undefined && !ts.isCallExpression(call) && !ts.isSourceFile(call))
          call = call.parent;
        return call !== undefined && ts.isCallExpression(call)
          ? [{ kind: `option ${parent.name.getText()}`, node: call, site }]
          : [];
      }
      if (ts.isCallExpression(parent) && parent.arguments.some((argument) => argument === current))
        return [{ kind: "argument", node: parent, site }];
      if (ts.isIfStatement(parent) && parent.expression === current) {
        const branch = negated ? (parent.elseStatement ?? parent.parent) : parent.thenStatement;
        return [
          { kind: negated && !parent.elseStatement ? "if-not (rest)" : "if", node: branch, site },
        ];
      }
      return [{ kind: `unclassified ${ts.SyntaxKind[parent.kind]}`, node: parent, site }];
    }
  }

  const files = program
    .getSourceFiles()
    .filter(
      (source) =>
        (onlyFile === undefined
          ? source.fileName.startsWith(srcRoot)
          : source.fileName === join(root, onlyFile)) &&
        !/\.test\.tsx?$/.test(source.fileName) &&
        !source.fileName.includes("/integrations/") &&
        !source.fileName.endsWith("/use-may-call.ts"),
    );

  type Switch = { name: string; target: string; node: ts.CallExpression };
  const switches: Switch[] = [];
  for (const source of files) {
    const visit = (node: ts.Node): void => {
      if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "mayCall" &&
        node.arguments.length === 1
      ) {
        const target = targetOf(node);
        if (target !== null) {
          const parent = node.parent;
          const name = ts.isVariableDeclaration(parent) ? parent.name.getText() : "(inline)";
          switches.push({ name, target, node });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }

  let regionCount = 0;
  const findings: SwitchFinding[] = [];
  const seen = new Set<string>();
  for (const switchRead of switches) {
    const parent = switchRead.node.parent;
    const uses =
      ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)
        ? usesOf(parent.name, parent.getSourceFile())
        : [switchRead.node];
    for (const region of uses.flatMap((use) => regionsOfUse(use, false, 0, use))) {
      regionCount += 1;
      const reached = reach(region.node);
      const own = reached.has(switchRead.target);
      const written = [...reached].filter(isWrite);
      if (own || written.length === 0) continue;
      const at = place(region.site);
      const id = `${at.file}:${String(at.line)} ${switchRead.name} ${written.join(",")}`;
      if (seen.has(id)) continue;
      seen.add(id);
      findings.push({
        ...at,
        what: `${switchRead.name} names ${switchRead.target} and gates ${region.kind}, which calls ${written.join(", ")}`,
      });
    }
  }
  return { switches: switches.length, regions: regionCount, findings };
}
