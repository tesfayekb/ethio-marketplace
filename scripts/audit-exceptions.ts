import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

/**
 * DEC-405 — THE AUDIT EXCEPTION LIST. An advisory the dependency gate does not fail on is a
 * recorded, expiring decision, never a silent ignore. scripts/audit-gate.sh asks this module for
 * the advisories it may pass to `bun audit --ignore`; a line that is expired, malformed,
 * undecided or too far in the future fails the gate by naming itself.
 *
 * A line is four cells, `GHSA id | reason | until YYYY-MM-DD | DEC-n` (G55's allowlist form with
 * the decision named). The expiry is at most EXCEPTION_CEILING_DAYS after the day the gate runs:
 * a line is written the day it is decided, so a longer date is a line that outlives its decision.
 */

export const AUDIT_EXCEPTIONS_FILE = "scripts/audit-exceptions.txt";
export const EXCEPTION_CEILING_DAYS = 14;

export type AuditException = {
  id: string;
  reason: string;
  until: string;
  decision: string;
  line: number;
};

const ADVISORY = /^GHSA-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/;
const UNTIL = /^until (\d{4}-\d{2}-\d{2})$/;
const DECISION = /^DEC-\d+$/;

function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** True for a real calendar day written as YYYY-MM-DD. */
function isCalendarDay(text: string): boolean {
  const date = new Date(`${text}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && isoDay(date) === text;
}

/**
 * Reads the list's text against `today` (an ISO day, UTC): the valid lines, and one problem per
 * line that fails — each names the file, the line and the reason.
 */
export function parseExceptions(
  text: string,
  today: string,
  file = AUDIT_EXCEPTIONS_FILE,
): { exceptions: AuditException[]; problems: string[] } {
  const exceptions: AuditException[] = [];
  const problems: string[] = [];
  const ceiling = isoDay(
    new Date(new Date(`${today}T00:00:00Z`).getTime() + EXCEPTION_CEILING_DAYS * 86_400_000),
  );
  const seen = new Set<string>();
  text.split(/\r?\n/).forEach((raw, index) => {
    if (!raw.trim() || raw.trim().startsWith("#")) return;
    const line = index + 1;
    const refuse = (why: string): void => {
      problems.push(`${file}:${line} ${why}: ${raw.trim()}`);
    };
    const cells = raw.split("|").map((cell) => cell.trim());
    if (cells.length !== 4 || cells.some((cell) => cell === "")) {
      refuse("malformed (expected four non-empty cells: id | reason | until YYYY-MM-DD | DEC-n)");
      return;
    }
    const [id, reason, untilCell, decision] = cells;
    if (!ADVISORY.test(id)) {
      refuse("malformed (the id is not shaped GHSA-xxxx-xxxx-xxxx)");
      return;
    }
    const untilMatch = UNTIL.exec(untilCell);
    const until = untilMatch?.[1];
    if (until === undefined || !isCalendarDay(until)) {
      refuse("malformed (the third cell is not `until YYYY-MM-DD`)");
      return;
    }
    if (!DECISION.test(decision)) {
      refuse("undecided (the fourth cell is not a DEC-n)");
      return;
    }
    if (until < today) {
      refuse(`expired (until ${until}, today ${today})`);
      return;
    }
    if (until > ceiling) {
      refuse(`expiry beyond ${EXCEPTION_CEILING_DAYS} days (until ${until}, newest ${ceiling})`);
      return;
    }
    if (seen.has(id)) {
      refuse("duplicate advisory");
      return;
    }
    seen.add(id);
    exceptions.push({ id, reason, until, decision, line });
  });
  return { exceptions, problems };
}

/**
 * The gate's call: ids on stdout, one per line, for `--ignore=`; a `::warning::` on stderr naming
 * each advisory, its expiry and its DEC; a `::error::` per failing line and exit 1.
 */
export function main(argv: string[], today = isoDay(new Date())): number {
  const file = argv[0] ?? AUDIT_EXCEPTIONS_FILE;
  if (!existsSync(file)) {
    console.error(`::error::${file} is missing; the audit gate reads its exception list there.`);
    return 1;
  }
  const { exceptions, problems } = parseExceptions(readFileSync(file, "utf8"), today, file);
  if (problems.length > 0) {
    for (const problem of problems) console.error(`::error::${problem}`);
    return 1;
  }
  for (const exception of exceptions) {
    console.error(
      `::warning::${exception.id} is held out of the audit until ${exception.until} (${exception.decision}): ${exception.reason}`,
    );
    console.log(exception.id);
  }
  return 0;
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = main(process.argv.slice(2));
}
