import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * INC-1353 — A GATE REPORT IS MADE IN THE COMMIT THAT DRAWS ITS PART. Field reports in a layout
 * effect (field.tsx, INC-1227); every other part reporting missing answers to the form gate does the
 * same, so a submit can never arrive before the gate has heard. This census refuses a gate report
 * (`onMissing`, `onFields`, `reportMissing`, `.report(`) inside a passive `useEffect` anywhere under
 * src/ (tests excluded).
 */

const REPORT = /(?:\bonMissing\??\.?\(|\bonFields\??\.?\(|\breportMissing\(|\.report\()/;
const ROOT = join(process.cwd(), "src");

/** Each `useEffect(` call's callback body, by bracket matching from its first `{`. */
function passiveReports(text: string): number[] {
  const lines: number[] = [];
  const opener = /\buseEffect\(/g;
  let match: RegExpExecArray | null;
  while ((match = opener.exec(text)) !== null) {
    const open = text.indexOf("{", match.index);
    if (open === -1) continue;
    let depth = 0;
    let end = open;
    for (; end < text.length; end += 1) {
      const char = text[end];
      if (char === "{") depth += 1;
      else if (char === "}") {
        depth -= 1;
        if (depth === 0) break;
      }
    }
    if (REPORT.test(text.slice(open, end))) {
      lines.push(text.slice(0, match.index).split("\n").length);
    }
  }
  return lines;
}

function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sources(path);
    return /\.(ts|tsx)$/.test(name) && !/\.test\.|\.census\./.test(name) ? [path] : [];
  });
}

describe("gate reports are never made in a passive effect (INC-1353)", () => {
  it("UFP-0 the rule catches a passive report and passes the layout-effect form", () => {
    expect(passiveReports("useEffect(() => {\n  onMissing?.([]);\n}, []);")).toEqual([1]);
    expect(passiveReports("useEffect(() => {\n  gate.report('a', []);\n}, []);")).toEqual([1]);
    expect(passiveReports("useLayoutEffect(() => {\n  onMissing?.([]);\n}, []);")).toEqual([]);
    expect(passiveReports("useEffect(() => {\n  setOpen(true);\n}, []);")).toEqual([]);
  });

  it("UFP-5 no file under src/ reports to the form gate from a passive effect", () => {
    const found = sources(ROOT).flatMap((path) =>
      passiveReports(readFileSync(path, "utf8")).map(
        (line) => `${relative(process.cwd(), path)}:${line}`,
      ),
    );
    expect(found).toEqual([]);
  });
});
