/**
 * PostToolUse — Edit | Write | MultiEdit.
 *
 * After a file changes: prettier --check and eslint on that one file, and for an
 * e2e/** file the pointer to the authoring laws. Findings reach Claude as
 * `hookSpecificOutput.additionalContext` (plain stdout is not delivered for tool
 * events) so the executor fixes them now rather than at the gate; nothing here
 * blocks, because a half-finished edit is allowed to be red for a moment.
 */
import { readEvent, repoPath, run } from "./lib";

const event = await readEvent();
const input = event.tool_input ?? {};
const file = typeof input["file_path"] === "string" ? input["file_path"] : "";
if (file === "") process.exit(0);
const rel = repoPath(file);
const notes: string[] = [];

if (/^e2e\//.test(rel)) {
  notes.push(
    "e2e/** touched: docs/features/e2e-harness.md §Authoring laws (J1–J9) bind this file; the report ends with the J-audit line.",
  );
}
if (/^supabase\/migrations\//.test(rel)) {
  notes.push(
    "A migration file changed: run `bash scripts/check-migrations.sh` and paste its guard lines before committing; the turn STOPs after the migration report (30-migrations.md).",
  );
}
if (/^src\/i18n\/locales\//.test(rel)) {
  notes.push(
    "A locale file changed: every new key ships EN + AM in the same change (D2); a changed wording is a NEW key (D5); run `bun run i18n:usage` and commit both maps.",
  );
}

const lintable = /\.(ts|tsx|js|jsx|mjs|cjs)$/.test(rel) && !/\.gen\.ts$/.test(rel);
const formattable =
  /^(src|e2e|docs|scripts)\/.*\.(ts|tsx|js|jsx|mjs|cjs|json|md|css)$/.test(rel) ||
  /^[^/]+\.(json|js|ts|md)$/.test(rel);
if (formattable && !/^docs\/(spec|governance)\//.test(rel)) {
  const p = await run(["bunx", "prettier", "--check", rel], { timeoutMs: 30_000 });
  if (p.code !== 0)
    notes.push(`prettier --check ${rel}: not formatted (run \`bunx prettier --write ${rel}\`).`);
}
if (lintable && /^(src|e2e|scripts)\//.test(rel)) {
  const l = await run(["bunx", "eslint", rel], { timeoutMs: 60_000 });
  if (l.code !== 0) notes.push(`eslint ${rel}:\n${l.tail}`);
}
if (notes.length > 0) {
  process.stdout.write(
    `${JSON.stringify({ hookSpecificOutput: { hookEventName: "PostToolUse", additionalContext: `POST-EDIT (${rel}):\n${notes.join("\n")}` } })}\n`,
  );
}
process.exit(0);
