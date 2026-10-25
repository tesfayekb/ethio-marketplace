/**
 * Stop — the gate. Claude Code runs it every time the executor finishes responding.
 *
 * A turn may end only when nothing of it is left behind in the session:
 *   · on `dev` (the work branch) — or on the branch the session started on with nothing of the turn
 *     on it (a STOP before Part A's `git switch dev`);
 *   · the tree clean — every change committed, nothing untracked (and nothing outside the scope:
 *     the landing script checks the committed diff, this gate names stray working files first);
 *   · nothing unlanded — every commit is on origin/dev, landed by bun .claude/hooks/land.ts, which
 *     ran THE CHECKS and required the report before pushing.
 * A reply that changed nothing (an answer, an acknowledgement) passes at once.
 *
 * Loop guard: after three refusals at the same commit the gate lets the turn end and says so, so a
 * broken tool can never trap the session; the supervisor reads it. (Claude Code itself stops
 * honouring a Stop hook after eight consecutive blocks.)
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  PROJECT_DIR,
  WORK_BRANCH,
  readEvent,
  block,
  git,
  currentBranch,
  scopeVerdict,
  lines,
  unlanded,
} from "./lib";

await readEvent();
const turnDir = join(PROJECT_DIR, ".claude", "turn");
mkdirSync(turnDir, { recursive: true });
const head = git(["rev-parse", "HEAD"]);
const attemptsFile = join(turnDir, "stop-attempts");
const attempts = existsSync(attemptsFile)
  ? readFileSync(attemptsFile, "utf8")
      .split("\n")
      .filter((l) => l === head).length
  : 0;

function refuse(reason: string): never {
  writeFileSync(
    attemptsFile,
    `${existsSync(attemptsFile) ? readFileSync(attemptsFile, "utf8") : ""}${head}\n`,
  );
  if (attempts >= 3) {
    process.stderr.write(
      `STOP GATE: three refusals at ${head.slice(0, 8)} — letting the turn end so the session is not trapped. The last refusal was:\n${reason}\nSay this in your last message; the supervisor reads the branch.\n`,
    );
    process.exit(0);
  }
  block(
    `STOP GATE (.claude/hooks/stop-gate.ts) refused — the turn may not end yet (${attempts + 1}/3 at this commit):\n${reason}`,
  );
}

const branch = currentBranch();
const status = lines(git(["status", "--porcelain"]));
const pending = unlanded();
// Off dev with nothing of the turn on it (a clean tree, no commit that origin/dev lacks — e.g. a STOP
// at Part A, before `git switch dev`): nothing is left behind, so the turn may end.
if (branch !== WORK_BRANCH && (status.length > 0 || pending.length > 0)) {
  if (!(status.length === 0 && existsSync(join(turnDir, `held-${head.slice(0, 12)}`))))
    refuse(
      `you are on "${branch}" with work of this turn on it; the executor works and lands on ${WORK_BRANCH}. Your commits stay on the branch you made them on — do not move them: STOP and say so in your last message.`,
    );
}

if (status.length > 0) {
  const stray = status
    .map((l) => l.slice(3).replace(/^.* -> /, ""))
    .filter((f) => !scopeVerdict(f).ok);
  refuse(
    `the working tree is not clean:\n${status.join("\n")}\n` +
      (stray.length > 0
        ? `Outside the brief's SCOPE (undo, never commit): ${stray.join(", ")}\n`
        : "") +
      "Commit what belongs to the turn (a title that claims only what happened), discard what does not, then land: bun .claude/hooks/land.ts",
  );
}

if (pending.length > 0 && existsSync(join(turnDir, `held-${head.slice(0, 12)}`))) process.exit(0); // parked by land.ts (hold/* or the session's branch)
if (pending.length > 0) {
  refuse(
    `${pending.length} commit(s) are not on origin/${WORK_BRANCH}:\n${git(["log", "--oneline", `origin/${WORK_BRANCH}..HEAD`])}\nA turn ends landed: write the report (a stop report for a STOP, a question or a migration; the final report at the end of the brief), commit it, then run bun .claude/hooks/land.ts and end the turn after it prints LANDED. If the landing script refused, fix what it named and land again; when it HELD the turn (dev moved, push refused), the gate lets you end.`,
  );
}

process.exit(0);
