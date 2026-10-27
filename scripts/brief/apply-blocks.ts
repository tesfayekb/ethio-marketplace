/**
 * Register row 58 (Foundations records turn R1, 2026-10-27; INC-907's class) — A BRIEF'S EXACT TEXT
 * REACHES THE TREE EXACTLY. A brief carries every new or rewritten file as a FILE block and every change
 * as an EDIT block (its OLD text, found exactly once in the file, and its NEW text). The executor applies
 * them with this one script, never by retyping them:
 *
 *   bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]
 *
 * — every block of the brief in the order it is written, or only the blocks of the paths named. Every
 * block is checked before anything is written: a path outside the repository or outside the brief's
 * scope (the kit's own `scopeVerdict`), an OLD text found zero times or more than once, a brief with no
 * block for a named path. One refusal writes nothing. Each block prints one line; `--dry` writes nothing.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
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
  write: (path: string, text: string) => void;
  allow: Allow;
};

export class ApplyRefused extends Error {}

const BLOCK_RX =
  /^FILE-BEGIN (\S+)\n([\s\S]*?)\nFILE-END \1$|^EDIT (\S+) #(\d+)\nOLD-BEGIN\n([\s\S]*?)\nOLD-END\nNEW-BEGIN\n([\s\S]*?)\nNEW-END$/gm;

const MARKER_RX =
  /^(OLD-BEGIN|OLD-END|NEW-BEGIN|NEW-END|FILE-BEGIN \S+|FILE-END \S+|EDIT \S+ #\d+)$/m;

/** Every FILE and EDIT block of a brief, in the order written (a block inside a FILE block is that file's text). */
export function parseBlocks(brief: string): Block[] {
  const blocks: Block[] = [];
  for (const m of brief.matchAll(BLOCK_RX)) {
    const [, filePath, fileText, editPath, n, old, next] = m;
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
      blocks.push({ kind: "edit", path: editPath, n: Number(n), old, next });
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
 * the files' new texts are built in memory first. Returns one line per block.
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
  for (const [path, text] of texts) io.write(path, text);
  lines.push(`applied ${String(chosen.length)} block(s) to ${String(texts.size)} file(s)`);
  return lines;
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
    write: (path, text) => {
      if (dry) return;
      const abs = join(root, path);
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, text);
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
