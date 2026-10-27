/**
 * Register row 58 (Foundations records turn R1, 2026-10-27; hardened in records turn R3; INC-907's class) —
 * A BRIEF'S EXACT TEXT REACHES THE TREE EXACTLY. A brief carries every new or rewritten file as a FILE block
 * and every change as an EDIT block (its OLD text, found exactly once in the file, and its NEW text). The
 * executor applies them with this one script, never by retyping them:
 *
 *   bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]
 *
 * — every block of the brief in the order it is written, or only the blocks of the paths named. Every
 * block is checked before anything is written: a block marker outside a whole block (a block that runs on
 * or never ends), a path's EDIT numbers out of order, a path outside the repository or outside the
 * brief's scope (the kit's own `scopeVerdict`), an OLD text found zero times or more than once, a brief
 * with no block for a named path. One refusal writes nothing: every file is staged beside its target
 * first and renamed into place only when all are staged. Each block prints one line; `--dry` writes
 * nothing. docs/features/brief-applier.md describes it; BA-6 names any second parser of the markers.
 */
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { PROJECT_DIR, scopeVerdict } from "../../.claude/hooks/lib";
import { errorText } from "../../src/lib/error-text";

export type Block =
  | { kind: "file"; path: string; text: string }
  | { kind: "edit"; path: string; n: number; old: string; next: string };

/** The answer of a scope check: the kit's `Verdict` shape. */
export type Allow = (path: string) => { ok: true } | { ok: false; reason: string };

export type Io = {
  read: (path: string) => string | null;
  /** Writes every file or none (it throws ApplyRefused when it cannot). */
  writeAll: (texts: ReadonlyMap<string, string>) => void;
  allow: Allow;
};

export class ApplyRefused extends Error {}

const BLOCK_RX =
  /^FILE-BEGIN (\S+)\n([\s\S]*?)\nFILE-END \1$|^EDIT (\S+) #(\d+)\nOLD-BEGIN\n([\s\S]*?)\nOLD-END\nNEW-BEGIN\n([\s\S]*?)\nNEW-END$/gm;

const MARKER_SOURCE =
  "^(OLD-BEGIN|OLD-END|NEW-BEGIN|NEW-END|FILE-BEGIN \\S+|FILE-END \\S+|EDIT \\S+ #\\d+)$";
const MARKER_RX = new RegExp(MARKER_SOURCE, "m");

function lineOf(text: string, at: number): number {
  return text.slice(0, at).split("\n").length;
}

/**
 * Every FILE and EDIT block of a brief, in the order written (a block inside a FILE block is that file's
 * text). A marker line no whole block holds, or a path's EDIT numbers that do not run 1, 2, 3 … in order,
 * is a refusal: a block that runs on, never ends or is missing is never skipped.
 */
export function parseBlocks(brief: string): Block[] {
  const blocks: Block[] = [];
  const spans: Array<[number, number]> = [];
  const nextNumber = new Map<string, number>();
  for (const m of brief.matchAll(BLOCK_RX)) {
    const [whole, filePath, fileText, editPath, n, old, next] = m;
    spans.push([m.index, m.index + whole.length]);
    if (filePath !== undefined && fileText !== undefined) {
      blocks.push({ kind: "file", path: filePath, text: `${fileText}\n` });
    } else if (
      editPath !== undefined &&
      n !== undefined &&
      old !== undefined &&
      next !== undefined
    ) {
      // A marker line inside an EDIT's text means a block ran into the next one (an empty NEW is one blank line).
      if (MARKER_RX.test(old) || MARKER_RX.test(next)) {
        throw new ApplyRefused(
          `EDIT ${editPath} #${n}: malformed — a block marker inside its OLD or NEW text`,
        );
      }
      const expected = nextNumber.get(editPath) ?? 1;
      if (Number(n) !== expected) {
        throw new ApplyRefused(
          `EDIT ${editPath} #${n}: out of order — the path's next EDIT is #${String(expected)}`,
        );
      }
      nextNumber.set(editPath, expected + 1);
      blocks.push({ kind: "edit", path: editPath, n: Number(n), old, next });
    }
  }
  for (const marker of brief.matchAll(new RegExp(MARKER_SOURCE, "gm"))) {
    const at = marker.index;
    if (!spans.some(([from, to]) => at >= from && at < to)) {
      throw new ApplyRefused(
        `malformed — the marker "${marker[0]}" on line ${String(lineOf(brief, at))} belongs to no whole block`,
      );
    }
  }
  return blocks;
}

function occurrences(text: string, part: string): number {
  if (part === "") return 0;
  let count = 0;
  for (let at = text.indexOf(part); at !== -1; at = text.indexOf(part, at + 1)) count += 1;
  return count;
}

function label(block: Block): string {
  return block.kind === "file" ? `FILE ${block.path}` : `EDIT ${block.path} #${String(block.n)}`;
}

/**
 * Applies the blocks (all, or those of `only`) in order. Nothing is written unless every block applies:
 * the files' new texts are built in memory first and handed to `io.writeAll` together. Returns one line per
 * block.
 */
export function applyBlocks(blocks: Block[], io: Io, only: string[] = []): string[] {
  for (const path of only) {
    if (!blocks.some((b) => b.path === path))
      throw new ApplyRefused(`the brief has no block for ${path}`);
  }
  const chosen = only.length === 0 ? blocks : blocks.filter((b) => only.includes(b.path));
  if (chosen.length === 0) throw new ApplyRefused("the brief has no FILE or EDIT block");
  const texts = new Map<string, string>();
  const lines: string[] = [];
  for (const block of chosen) {
    const { path } = block;
    if (path.startsWith("/") || path.split("/").includes("..")) {
      throw new ApplyRefused(`${label(block)}: the path is not inside the repository`);
    }
    const verdict = io.allow(path);
    if (!verdict.ok) throw new ApplyRefused(`${label(block)}: ${verdict.reason}`);
    if (block.kind === "file") {
      texts.set(path, block.text);
      lines.push(`${label(block)} (${String(Buffer.byteLength(block.text))} bytes)`);
      continue;
    }
    const current = texts.has(path) ? texts.get(path) : io.read(path);
    if (current === undefined || current === null) {
      throw new ApplyRefused(`${label(block)}: the file does not exist`);
    }
    const found = occurrences(current, block.old);
    if (found !== 1) {
      throw new ApplyRefused(
        `${label(block)}: its OLD text is found ${String(found)} times in the file (exactly once is required)`,
      );
    }
    const at = current.indexOf(block.old);
    texts.set(path, current.slice(0, at) + block.next + current.slice(at + block.old.length));
    lines.push(label(block));
  }
  io.writeAll(texts);
  lines.push(`applied ${String(chosen.length)} block(s) to ${String(texts.size)} file(s)`);
  return lines;
}

const STAGED = ".apply-blocks-staged";

/** Writes every file or none: each text is staged beside its target, then all are renamed into place. */
export function writeAllUnder(root: string, texts: ReadonlyMap<string, string>): void {
  const staged: Array<[string, string]> = [];
  try {
    for (const [path, text] of texts) {
      const abs = join(root, path);
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(`${abs}${STAGED}`, text);
      staged.push([`${abs}${STAGED}`, abs]);
    }
  } catch (error) {
    for (const [temp] of staged) rmSync(temp, { force: true });
    throw new ApplyRefused(`staging the files failed, nothing written: ${errorText(error)}`);
  }
  for (const [temp, abs] of staged) renameSync(temp, abs);
}

/** The command line: the saved brief, then `--dry` and the paths to apply (none: every block). */
export function main(argv: string[], root = PROJECT_DIR, allow: Allow = scopeVerdict): number {
  const [briefPath, ...rest] = argv;
  if (briefPath === undefined) {
    process.stderr.write(
      "usage: bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]\n",
    );
    return 2;
  }
  const dry = rest.includes("--dry");
  const only = rest.filter((a) => a !== "--dry");
  const io: Io = {
    read: (path) => {
      const abs = join(root, path);
      return existsSync(abs) ? readFileSync(abs, "utf8") : null;
    },
    writeAll: (texts) => {
      if (!dry) writeAllUnder(root, texts);
    },
    allow,
  };
  try {
    const brief = readFileSync(join(root, briefPath), "utf8");
    const lines = applyBlocks(parseBlocks(brief), io, only);
    process.stdout.write(`${lines.join("\n")}${dry ? "\n(dry run: nothing written)" : ""}\n`);
    return 0;
  } catch (error) {
    if (error instanceof ApplyRefused) {
      process.stderr.write(`APPLY REFUSED (nothing written): ${errorText(error)}\n`);
      return 1;
    }
    throw error;
  }
}

if (import.meta.main) process.exit(main(process.argv.slice(2)));
