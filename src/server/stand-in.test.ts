import { readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { walkFiles } from "../../scripts/conformance/kit";

const build = vi.hoisted(() => ({ isE2E: false }));
vi.mock("@/lib/env-flags", () => build);

/**
 * Foundations turn 16 (DEC-249) — THE ONE STAND-IN SWITCH. The INC-828 and
 * INC-839 censuses moved here from src/server/ai/meter.test.ts with their ids
 * unchanged; the geocoder's E2E_FAKE_GEOCODE is not an AI call and is outside
 * the AI census by design.
 */

const { standInMode } = await import("./stand-in");

const FLAGS = [
  "E2E_FAKE_PHOTO_POLICY",
  "E2E_FAKE_ASSIST",
  "E2E_FAKE_BACKGROUND",
  "E2E_FAKE_TRANSLATE",
  "E2E_FAKE_GEOCODE",
  "GEMINI_FAKE",
];

afterEach(() => {
  vi.unstubAllEnvs();
  build.isE2E = false;
});

describe("the one stand-in switch (DEC-249)", () => {
  it("SIN-1 (INC-828) a stand-in is false in a normal build whatever the env", () => {
    for (const flag of FLAGS) vi.stubEnv(flag, "1");
    for (const flag of FLAGS) expect(standInMode(flag)).toBe(false);
  });

  it("SIN-2 (INC-828) the E2E build honours the flag and the umbrella flag", () => {
    build.isE2E = true;
    for (const flag of FLAGS) expect(standInMode(flag)).toBe(false);
    for (const flag of FLAGS) {
      vi.stubEnv(flag, "1");
      expect(standInMode(flag)).toBe(true);
      vi.stubEnv(flag, undefined);
    }
    vi.stubEnv("E2E_FAKE_TRANSLATE", "1");
    for (const flag of FLAGS) expect(standInMode(flag)).toBe(true);
  });

  it("SIN-3 (INC-839) no file but stand-in.ts reads a stand-in variable", () => {
    const matches = walkFiles([join(process.cwd(), "src")], {
      ext: ["ts", "tsx"],
      skipTests: true,
    })
      .filter((path) =>
        /process\.env\["(E2E_FAKE_[A-Z_]+|GEMINI_FAKE|AI_FAKE)"\]/.test(readFileSync(path, "utf8")),
      )
      .map((path) => relative(process.cwd(), path));
    expect(matches.sort()).toEqual(["src/server/stand-in.ts"]);
  });
});
