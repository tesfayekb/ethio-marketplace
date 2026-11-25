import ts from "typescript";

import { visitTs } from "./kit";

/**
 * INC-1278 (b), CF-PROVERR-1 — a mocked error object in a unit test carries a REAL message.
 *
 * An error object (the value of an `error:` property) whose `message` is a string literal must be one
 * of: a provider message from the one fixture (src/test/provider-errors.ts, exact); a code a reader
 * knows (the head of `code[:detail]` is one of `DOOR_CODES` or a key of some refusal family's
 * `words`); or a raised exception's text quoted with its SQL file:line in a comment on the same line
 * or the line above (`// raised: supabase/migrations/<file>.sql:<line>`). Anything else is an invented
 * sentence (ACS-U2's `message: "refused"`) and a finding, `file:line`, or an allowlist line.
 */

export type ProviderErrorFinding = { file: string; line: number; what: string };

const QUOTED_SQL = /supabase\/migrations\/[0-9]{14}_[0-9a-f-]{36}\.sql:[1-9][0-9]*/;

/** A door code as the app writes one: camelCase (`listingNotAvailable`), never a bare word. */
const CAMEL_CODE = /^[a-z]+(?:[A-Z][a-z0-9]*)+$/;

/**
 * The codes the app's own source names: the keys of every `words: { … }` object literal and every
 * camelCase string literal in the given non-test sources (a door's code a screen's reader knows).
 */
export function familyWordKeys(sources: Array<{ file: string; text: string }>): Set<string> {
  const keys = new Set<string>();
  for (const { file, text } of sources) {
    visitTs(
      file,
      (node) => {
        if (
          !ts.isPropertyAssignment(node) ||
          node.name.getText() !== "words" ||
          !ts.isObjectLiteralExpression(node.initializer)
        )
          return;
        for (const member of node.initializer.properties) {
          if (!ts.isPropertyAssignment(member) && !ts.isShorthandPropertyAssignment(member))
            continue;
          const name = member.name;
          if (ts.isIdentifier(name) || ts.isStringLiteral(name)) keys.add(name.text);
        }
      },
      text,
    );
    visitTs(
      file,
      (node) => {
        if (ts.isStringLiteral(node) && CAMEL_CODE.test(node.text)) keys.add(node.text);
      },
      text,
    );
  }
  return keys;
}

export type RealWords = {
  /** The messages of src/test/provider-errors.ts. */
  fixture: ReadonlySet<string>;
  /** DOOR_CODES and the keys of every family's words. */
  codes: ReadonlySet<string>;
};

/** True when `message` is a real one by the three rules above (`context`: its line and the one above). */
export function isRealMessage(message: string, real: RealWords, context: string): boolean {
  if (real.fixture.has(message)) return true;
  const [head = "", ...rest] = message.split(":").map((part) => part.trim());
  if (head !== "" && real.codes.has(head)) return true;
  // A door's own raise names its function before the code (`seller_feed_page: unknownSeller`).
  if (rest.length > 0 && real.codes.has(rest.join(":"))) return true;
  return QUOTED_SQL.test(context);
}

/** The invented messages of the mocked error objects in one unit test file. */
export function inventedMessages(
  file: string,
  text: string,
  real: RealWords,
): ProviderErrorFinding[] {
  const lines = text.split("\n");
  const found: ProviderErrorFinding[] = [];
  visitTs(
    file,
    (node, source) => {
      if (
        !ts.isPropertyAssignment(node) ||
        node.name.getText() !== "error" ||
        !ts.isObjectLiteralExpression(node.initializer)
      )
        return;
      for (const member of node.initializer.properties) {
        if (!ts.isPropertyAssignment(member) || member.name.getText() !== "message") continue;
        const value = member.initializer;
        if (!ts.isStringLiteral(value) && !ts.isNoSubstitutionTemplateLiteral(value)) continue;
        const line = source.getLineAndCharacterOfPosition(member.getStart()).line;
        const context = `${lines[line - 1] ?? ""}\n${lines[line] ?? ""}`;
        if (isRealMessage(value.text, real, context)) continue;
        found.push({
          file,
          line: line + 1,
          what: `a mocked error carries the invented message ${JSON.stringify(value.text)}`,
        });
      }
    },
    text,
  );
  return found;
}
