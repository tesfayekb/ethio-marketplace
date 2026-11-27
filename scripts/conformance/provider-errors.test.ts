import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { DOOR_CODES } from "../../src/lib/door-codes";
import { PROVIDER_ERRORS } from "../../src/test/provider-errors";
import { readPlacedAllowlist, report, TREE_SCAN_MS, walkFiles } from "./kit";
import { familyWordKeys, inventedMessages, type RealWords } from "./provider-errors";

/**
 * INC-1278 (b), CF-PROVERR-1 — a mocked error object in a unit test carries a real message: one from
 * the provider fixture (src/test/provider-errors.ts), a code a reader knows, or a raised exception's
 * text quoted with its SQL file:line (scripts/conformance/provider-errors.ts says the rule). The
 * three findings of the census that wrote it (ACS-U2, the translator card's test, the ad share's
 * test) moved onto real messages; every other line below is an outage text no reader reads, named.
 * Allowlist grammar `<file>#<text> or <file>#<scope>::<text> | reason | until` (placeOf, kit.ts; INC-1293) (provider-errors-allowlist.txt); stale or expired
 * lines fail.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "provider-errors-allowlist.txt");

const rel = (path: string) =>
  path
    .slice(ROOT.length + 1)
    .split("\\")
    .join("/");

function realWords(): RealWords {
  const sources = walkFiles([join(ROOT, "src")], { ext: ["ts", "tsx"] })
    .filter((file) => !/\.test\.tsx?$/.test(file) && !file.includes("/integrations/"))
    .map((file) => ({ file, text: readFileSync(file, "utf8") }));
  return {
    fixture: new Set(Object.values(PROVIDER_ERRORS).map((entry) => entry.message)),
    codes: new Set<string>([...DOOR_CODES, ...familyWordKeys(sources)]),
  };
}

describe("CF-PROVERR-1 — a mocked error carries a real message (INC-1278 b)", () => {
  it(
    "PROVERR-1 every mocked error object in a unit test names a provider message, a known code or a quoted SQL text",
    () => {
      const real = realWords();
      const findings = walkFiles([join(ROOT, "src"), join(ROOT, "scripts")], {
        ext: ["ts", "tsx"],
      })
        .filter((file) => /\.test\.tsx?$/.test(file) && !file.endsWith("provider-errors.test.ts"))
        .flatMap((file) => inventedMessages(rel(file), readFileSync(file, "utf8"), real));
      const allowed = readPlacedAllowlist(
        ALLOWLIST,
        findings.map((finding) => `${finding.file}:${finding.line}`),
      );
      const unallowed = findings.filter(
        (finding) => !allowed.has(`${finding.file}:${finding.line}`),
      );
      expect(report(unallowed)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("PROVERR-2 planted: an invented refusal word fails; a fixture message, a known code and a quoted SQL text pass", () => {
    const real: RealWords = {
      fixture: new Set(["New password should be different from the old password."]),
      codes: new Set(["permissionDenied", "mfa_verification_failed"]),
    };
    const plant = (message: string, before = "") =>
      inventedMessages(
        "src/planted.test.ts",
        `${before}mock.mockResolvedValue({ data: null, error: { message: ${JSON.stringify(message)} } });\n`,
        real,
      );
    expect(plant("refused")).toEqual([
      {
        file: "src/planted.test.ts",
        line: 1,
        what: 'a mocked error carries the invented message "refused"',
      },
    ]);
    expect(plant("New password should be different from the old password.")).toEqual([]);
    expect(plant("permissionDenied")).toEqual([]);
    expect(plant("permissionDenied:listing-1")).toEqual([]);
    expect(plant("mfa_verification_failed")).toEqual([]);
    expect(
      plant(
        "rate key required",
        "// raised: supabase/migrations/20260101000000_00000000-0000-4000-8000-000000000000.sql:12\n",
      ),
    ).toEqual([]);
    expect(plant("rate key required")).toHaveLength(1);
  });
});
