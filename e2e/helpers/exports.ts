/**
 * R-TR34 — ONE SCRATCH STRIP FOR WHOLE-EXPORT COMPARISONS (the G28 law).
 *
 * Three specs learned the same lesson independently (AT-20, CT-18, TR-34): a
 * before/after comparison of a WHOLE export reddens on rows it does not own,
 * because a sibling worker (or the other viewport project) mints and destroys
 * its own `e2e_`/`e2e-` fixtures between the two captures (J6 — another
 * test's rows are never this test's invariant). The strip now lives here
 * once: every same-run scratch row — any row whose key/slug/code stem is
 * `e2e_`/`e2e-` — leaves the comparison, and the STABLE roster remains the
 * whole invariant.
 *
 * The CSV form matches the stem ANYWHERE in the record (a superset of
 * "identity cell starts with"): real rows never carry the reserved stem (J1),
 * and a parent_slug/secondary pointer mentioning a scratch slug is the same
 * transient row's business. An optional live-identity set (INC-214) drops
 * rows keyed by a scratch id whose own cells mention nothing of the sort —
 * the census is taken by the CALLER at each capture's own time, so each
 * capture prunes exactly the fixtures that were live when it read.
 *
 * The parsed-row form is the same rule for rows already out of the file:
 * a row whose serialization mentions the stem, or that carries a live
 * scratch identity in any of its cells, is not part of the comparison.
 */

/** The reserved scratch stem (J1): `e2e_` or `e2e-`. */
export const SCRATCH_STEM = /e2e[_-]/;

export interface StrippedCsv {
  /** The file with every scratch record removed; BOM and header preserved. */
  text: string;
  /** The number of data rows that remain — the expected `unchanged` count. */
  rows: number;
}

/** CSV text in, scratch-free CSV text + the surviving row count out. */
export function stripScratchRows(text: string, ids?: Set<string>): StrippedCsv;
/** Parsed rows in, the rows that are not same-run scratch out. */
export function stripScratchRows<T extends Record<string, unknown>>(
  rows: T[],
  ids?: Set<string>,
): T[];
export function stripScratchRows(
  input: string | Record<string, unknown>[],
  ids: Set<string> = new Set<string>(),
): StrippedCsv | Record<string, unknown>[] {
  if (Array.isArray(input)) {
    return input.filter((row) => !mentionsScratch(JSON.stringify(row) ?? "", ids));
  }
  const body = input.charCodeAt(0) === 0xfeff ? input.slice(1) : input;
  // RFC 4180: a record ends at a newline OUTSIDE quotes (a quoted cell may
  // itself carry newlines, so a naive split("\r\n") would saw a row in two).
  const records: string[] = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < body.length; index += 1) {
    const char = body[index] as string;
    if (char === '"') {
      quoted = !quoted;
      current += char;
      continue;
    }
    if (char === "\n" && !quoted) {
      records.push(current.replace(/\r$/, ""));
      current = "";
      continue;
    }
    current += char;
  }
  if (current.length > 0) records.push(current.replace(/\r$/, ""));

  const header = records.shift() ?? "";
  const kept = records.filter(
    (record) => record.trim().length > 0 && !mentionsScratch(record, ids),
  );
  return {
    text: `\uFEFF${[header, ...kept].join("\r\n")}\r\n`,
    rows: kept.length,
  };
}

function mentionsScratch(text: string, ids: Set<string>): boolean {
  if (SCRATCH_STEM.test(text)) return true;
  for (const id of ids) {
    if (id !== "" && text.includes(id)) return true;
  }
  return false;
}
