/**
 * PreToolUse — Edit | Write | MultiEdit | NotebookEdit.
 *
 * Law A1, mechanised: a write-shaped tool call may touch only the brief's SCOPE
 * block, the standing allowance, or /tmp scratch. Everything else is refused with
 * the STOP wording, so the executor asks for a ruling instead of guessing.
 */
import { readEvent, block, scopeVerdict } from "./lib";

const event = await readEvent();
const input = event.tool_input ?? {};
const candidate =
  (typeof input["file_path"] === "string" && input["file_path"]) ||
  (typeof input["notebook_path"] === "string" && input["notebook_path"]) ||
  (typeof input["path"] === "string" && input["path"]) ||
  "";
if (candidate === "") process.exit(0); // not a file write we understand; let the permission rules decide

const verdict = scopeVerdict(candidate);
if (!verdict.ok) block(`SCOPE GUARD (.claude/hooks/scope-guard.ts): ${verdict.reason}`);
process.exit(0);
