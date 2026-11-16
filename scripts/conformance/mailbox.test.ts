import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { extname } from "node:path";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS } from "./kit";

/**
 * INC-1165 (the tests and CI turn, Part D; CF-MAIL) — NO REAL PERSON'S MAILBOX IN A TRACKED FILE.
 * The repository is public until launch (DEC-116), so every file `git ls-files` names is read for
 * a mailbox at a public provider's domain: a local part of two or more characters, not preceded
 * by `/` (an alias example such as `ethio.com/@…` has none) or another local-part character (a
 * one-letter test literal is left out by shape). The e2e sink's domain is no public provider. A
 * hit outside the allowlist (`<file>:<line> | reason | until`) fails, named by file and line —
 * never by the address. A file the scan cannot decode is named by path unless its extension is a
 * declared binary one.
 */

type Finding = { file: string; line: number; what: string };

const PROVIDERS = ["gmail", "yahoo", "outlook", "hotmail", "icloud", "proton"];
const MAILBOX = new RegExp(
  `(?<![/A-Za-z0-9._%+-])[A-Za-z0-9._%+-]{2,}@(${PROVIDERS.join("|")})\\.[a-z]{2,}`,
  "gi",
);
/** The tracked binaries, by extension (the census of the tests and CI turn: images only). */
const BINARY = new Set([".ico", ".jpg", ".png", ".webp"]);
const ALLOWLIST = "scripts/conformance/mailbox-allowlist.txt";
const decoder = new TextDecoder("utf-8", { fatal: true });

/** The text of a file, or null when it holds a NUL byte or is not UTF-8. */
function textOf(bytes: Buffer): string | null {
  if (bytes.includes(0)) return null;
  try {
    return decoder.decode(bytes);
  } catch {
    return null;
  }
}

/** Every mailbox at a public provider, and every undecodable file outside the binary set. */
export function mailboxes(files: string[]): Finding[] {
  const findings: Finding[] = [];
  for (const file of files) {
    if (!existsSync(file)) continue;
    const text = textOf(readFileSync(file));
    if (text === null) {
      if (!BINARY.has(extname(file).toLowerCase()))
        findings.push({ file, line: 0, what: "a file the mailbox scan cannot decode (INC-1165)" });
      continue;
    }
    text.split("\n").forEach((content, index) => {
      for (const match of content.matchAll(MAILBOX)) {
        findings.push({
          file,
          line: index + 1,
          what: `a mailbox at a public provider (${(match[1] ?? "").toLowerCase()}) — INC-1165`,
        });
      }
    });
  }
  return findings;
}

const tracked = spawnSync("git", ["ls-files", "-z"], { encoding: "utf8" })
  .stdout.split("\0")
  .filter(Boolean);

/** A planted mailbox, built from parts so this file never holds one. */
const planted = (local: string, provider: string) => `${local}${"@"}${provider}.com`;

describe("no real person's mailbox in a tracked file (INC-1165, CF-MAIL)", () => {
  it(
    "CF-MAIL-1 every tracked file is read; a mailbox at a public provider is held by its allowlist line or fails",
    () => {
      const found = mailboxes(tracked);
      const keys = found.map((f) => `${f.file}:${f.line}`);
      const allowed = readAllowlist(ALLOWLIST, keys);
      const findings = found.filter((f) => !allowed.has(`${f.file}:${f.line}`));
      console.log(
        `[mailbox] tracked files read: ${tracked.length}; mailboxes: ${found.length}, held: ${allowed.size}`,
      );
      expect(tracked.length).toBeGreaterThan(1000);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-MAIL-2 a planted mailbox fails by file and line; a one-letter literal, an alias example and the sink do not", () => {
    const dir = "node_modules/.cache/mailbox";
    mkdirSync(dir, { recursive: true });
    const file = `${dir}/planted.md`;
    try {
      writeFileSync(
        file,
        [
          "# planted",
          `write to ${planted("someone.real", "gmail")} today`,
          `the hook test's ${planted("a", "gmail")} literal`,
          `the alias example ethio.com/${planted("", "gmail")}`,
          "the sink e2e+x@ethio-e2e.invalid",
          `a path /${planted("ab", "yahoo")} after a slash`,
          `upper case ${planted("Op", "ICLOUD")} too`,
          "",
        ].join("\n"),
      );
      const found = mailboxes([file]);
      expect(found.map((f) => f.line)).toEqual([2, 7]);
      expect(found[0]?.what).toBe("a mailbox at a public provider (gmail) — INC-1165");
      expect(report(found)).not.toContain("someone.real");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CF-MAIL-3 an allowlisted line passes; a stale line, whose mailbox is gone, fails", () => {
    const dir = "node_modules/.cache/mailbox-allow";
    mkdirSync(dir, { recursive: true });
    const list = `${dir}/allow.txt`;
    try {
      writeFileSync(list, "docs/x.md:3 | a landed record | DEC-116\n");
      expect(readAllowlist(list, ["docs/x.md:3"]).has("docs/x.md:3")).toBe(true);
      expect(() => readAllowlist(list, [])).toThrow(/stale allowance/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CF-MAIL-4 a file the scan cannot decode is named by path unless it is a declared binary", () => {
    const dir = "node_modules/.cache/mailbox-binary";
    mkdirSync(dir, { recursive: true });
    try {
      writeFileSync(`${dir}/notes.md`, Buffer.from([0x61, 0xff, 0xfe, 0x62]));
      writeFileSync(`${dir}/image.png`, Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x00, 0x01]));
      expect(mailboxes([`${dir}/notes.md`, `${dir}/image.png`])).toEqual([
        {
          file: `${dir}/notes.md`,
          line: 0,
          what: "a file the mailbox scan cannot decode (INC-1165)",
        },
      ]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CF-MAIL-5 this file holds no mailbox of its own", () => {
    expect(mailboxes(["scripts/conformance/mailbox.test.ts"])).toEqual([]);
  });
});
