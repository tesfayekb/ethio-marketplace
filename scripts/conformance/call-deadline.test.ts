import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * DEC-477 / INC-1285 (cursor bundle 7b) — EVERY CALL THE BROWSER MAKES ENDS WITHIN A DEADLINE.
 * The one mechanism is src/lib/call-deadline.ts. CF-DEADLINE-1 reads every `fetch(` call and every
 * `createClient(` call under src/ (the browser's code: not the server, the route handlers, the
 * tests): its file imports the deadline module, or carries an allowlist line
 * (`scripts/conformance/call-deadline-allowlist.txt`: key | reason | until). The generated client
 * (`src/integrations/supabase/client.ts`) is the one platform file this lane edits (DEC-477): it
 * passes its fetch through the module, and CF-DEADLINE-2 fails when a regeneration drops that.
 */

const MODULE = /from\s+["'](?:@\/lib\/call-deadline|(?:\.\.?\/)+(?:lib\/)?call-deadline)["']/;
const CLIENT = "src/integrations/supabase/client.ts";

type Finding = { file: string; line: number; what: "fetch" | "client" };

function findings(files: string[]): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    if (MODULE.test(text)) continue;
    visitTs(file, (node, source) => {
      if (!ts.isCallExpression(node)) return;
      const callee = node.expression;
      const at = () => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      if (
        (ts.isIdentifier(callee) && callee.text === "fetch") ||
        (ts.isPropertyAccessExpression(callee) &&
          callee.name.text === "fetch" &&
          ts.isIdentifier(callee.expression) &&
          /^(?:window|globalThis|self)$/.test(callee.expression.text))
      )
        found.push({ file, line: at(), what: "fetch" });
      if (ts.isIdentifier(callee) && callee.text === "createClient")
        found.push({ file, line: at(), what: "client" });
    });
  }
  return found;
}

const domain = walkFiles(["src"], {
  ext: ["ts", "tsx"],
  skipTests: true,
  skip: /^src\/(?:server\/|routes\/|integrations\/)|\.server\.tsx?$/,
});
const census = findings(domain);
const allowances = readAllowlist(
  "scripts/conformance/call-deadline-allowlist.txt",
  census.map((hit) => hit.file),
);

describe("every browser call ends within a deadline (DEC-477)", () => {
  it(
    "CF-DEADLINE-1 every fetch( and createClient( passes through the deadline module or has a live allowance",
    () => {
      console.log(
        `[CF-DEADLINE-1] sites outside the module: ${census.length}; allowlist: ${allowances.size}`,
      );
      expect(report(census.filter((hit) => !allowances.has(hit.file)))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-DEADLINE-2 the generated client passes its fetch through the module (the one exception, DEC-477)", () => {
    const text = readFileSync(CLIENT, "utf8");
    expect(text, "client.ts no longer imports the deadline module").toMatch(MODULE);
    expect(text, "client.ts no longer calls it").toMatch(/fetchWithDeadline\(\s*fetch\s*,/);
  });

  it("CF-DEADLINE-3 a planted bare fetch to the project's address, and a planted client, are reported", () => {
    const dir = mkdtempSync(join(tmpdir(), "call-deadline-"));
    const bare = join(dir, "bare.ts");
    const fine = join(dir, "fine.ts");
    try {
      writeFileSync(
        bare,
        'fetch("https://project.example.invalid/rest/v1/rpc/x");\ncreateClient(url, key);\n',
      );
      writeFileSync(
        fine,
        'import { fetchWithDeadline } from "@/lib/call-deadline";\nfetchWithDeadline(fetch, "/x");\nfetch("/y");\n',
      );
      expect(findings([bare, fine])).toEqual([
        { file: bare, line: 1, what: "fetch" },
        { file: bare, line: 2, what: "client" },
      ]);
      expect(allowances.has(bare)).toBe(false);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CF-DEADLINE-4 the module's classes: the request decides, a deadline reads as the network kind", async () => {
    const { classOfCall, CALL_DEADLINES_MS } = await import("../../src/lib/call-deadline");
    expect(classOfCall("POST", "https://p.example.invalid/auth/v1/token")).toBe("auth");
    expect(classOfCall("GET", "https://p.example.invalid/storage/v1/object/x")).toBe("download");
    expect(classOfCall("POST", "https://p.example.invalid/storage/v1/object/x")).toBe("upload");
    expect(classOfCall("GET", "https://p.example.invalid/rest/v1/t?select=*")).toBe("read");
    expect(classOfCall("POST", "https://p.example.invalid/rest/v1/rpc/f")).toBe("write");
    expect(Object.keys(CALL_DEADLINES_MS).sort()).toEqual([
      "auth",
      "download",
      "model",
      "read",
      "upload",
      "write",
    ]);
  });
});
