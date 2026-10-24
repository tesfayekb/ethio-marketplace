import { readFileSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { codeOf, report, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * D237 / INC-851 (Foundations turn 1, E4) — the language records
 * (`ethio.lang`, `ethio.lang.star`, `ethio_lang_star`) have ONE writer:
 * src/i18n/provider.tsx. A second writer is how the menu and the star drifted
 * apart. The predicate is per-statement: a statement naming a record AND
 * writing (`setItem(` / `document.cookie =`) is a breach; readers, and seeds
 * that pass the record's name as a value (shell.spec.ts's seedStar), are
 * allowed by the predicate itself — there is no allowlist.
 */

const ROOT = join(__dirname, "..", "..");
const RECORDS = /ethio\.lang(?:\.star)?|ethio_lang_star/;
const WRITES = /setItem\(|document\.cookie\s*=/;
const EXCEPTED = "src/i18n/provider.tsx";

function statements(code: string): Array<{ text: string; line: number }> {
  const out: Array<{ text: string; line: number }> = [];
  let start = 0;
  for (let i = 0; i < code.length; i++) {
    if (code[i] === ";" || code[i] === "\n") {
      out.push({ text: code.slice(start, i + 1), line: code.slice(0, start).split("\n").length });
      start = i + 1;
    }
  }
  return out;
}

export function writerCensus(roots: string[]): Array<{ file: string; line: number; what: string }> {
  const findings: Array<{ file: string; line: number; what: string }> = [];
  for (const file of walkFiles(roots, { ext: ["ts", "tsx"] })) {
    const rel = relative(ROOT, file).split("\\").join("/");
    if (rel === EXCEPTED) continue;
    const code = codeOf(readFileSync(file, "utf8"));
    for (const statement of statements(code)) {
      if (RECORDS.test(statement.text) && WRITES.test(statement.text))
        findings.push({ file: rel, line: statement.line, what: "writes a language record" });
    }
  }
  return findings;
}

describe("the language records have one writer (D237, INC-851)", () => {
  it(
    "CF-LANG-1 no file under src/ (provider.tsx excepted) or e2e/ writes a language record",
    () => {
      const findings = writerCensus([join(ROOT, "src"), join(ROOT, "e2e")]);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-LANG-2 a planted writer is caught", () => {
    const dir = join(ROOT, "scripts/conformance/.lang-planted");
    mkdirSync(dir, { recursive: true });
    const planted = join(dir, "planted.ts");
    writeFileSync(
      planted,
      'export function plant() {\n  window.localStorage.setItem("ethio.lang.star", "am");\n}\n',
    );
    try {
      const findings = writerCensus([dir]);
      expect(findings).toEqual([
        {
          file: relative(ROOT, planted).split("\\").join("/"),
          line: 2,
          what: "writes a language record",
        },
      ]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
