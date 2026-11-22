import ts from "typescript";
import { visitTs, walkFiles } from "./kit";

/**
 * INC-1239 — RULE 10'S BAN ON `as unknown as` IS JUDGED, NOT READ. A double cast tells the compiler
 * to look away: the value is asserted to be something nobody checked. The law (rule 10, TypeScript)
 * is for all code, so the census walks the tree it covers — `src/`, `e2e/` and `scripts/`, tests
 * included — and finds the cast in the syntax tree (a double cast written in a string, a comment or
 * a planted text is never a finding; one split over lines or wrapped in parentheses is).
 *
 * GENERATED FILES ARE LEFT OUT AS A CLASS: the platform writes `src/integrations/supabase/**` and
 * the router's `routeTree.gen.ts`; nobody edits them, so nobody can narrow in them.
 *
 * A finding is keyed `<file> (<count>)` in type-casts-allowlist.txt (`key | reason | until`), so a
 * file that sheds a cast lowers its line (the old line goes stale and fails) and a file that gains
 * one is named. A new file starts at zero.
 */

export const CAST_ROOTS = ["src", "e2e", "scripts"];
export const GENERATED =
  /(?:^|[\\/])(?:src[\\/]integrations[\\/]supabase[\\/]|routeTree\.gen\.ts$)/;

/** The files the law covers, as paths relative to the repository root. */
export function castFiles(roots: string[] = CAST_ROOTS): string[] {
  return walkFiles(roots, { ext: ["ts", "tsx", "mts"], skip: GENERATED });
}

function inner(node: ts.Expression): ts.Expression {
  let current = node;
  while (ts.isParenthesizedExpression(current)) current = current.expression;
  return current;
}

/** The lines of every `<x> as unknown as <T>` in `file` (read from disk, or `text` when planted). */
export function doubleCastLines(file: string, text?: string): number[] {
  const lines: number[] = [];
  visitTs(
    file,
    (node, source) => {
      if (!ts.isAsExpression(node)) return;
      const first = inner(node.expression);
      if (!ts.isAsExpression(first) || first.type.kind !== ts.SyntaxKind.UnknownKeyword) return;
      lines.push(source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1);
    },
    text,
  );
  return lines;
}

export function typeCastCensus(
  files: string[],
  textOf?: (file: string) => string | undefined,
): { keys: string[]; findings: Array<{ file: string; line: number; what: string }> } {
  const keys: string[] = [];
  const findings: Array<{ file: string; line: number; what: string }> = [];
  for (const file of files) {
    const lines = doubleCastLines(file, textOf?.(file));
    if (lines.length === 0) continue;
    const key = `${file} (${lines.length})`;
    keys.push(key);
    for (const line of lines)
      findings.push({
        file: key,
        line,
        what: "`as unknown as` — narrow the value with a shape guard (rule 10, TypeScript)",
      });
  }
  return { keys: keys.sort(), findings };
}
