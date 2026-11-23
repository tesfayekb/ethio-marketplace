import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { CUE_MIN_BODY_REM, CUE_ROOM, CUE_WRAP } from "./dialog-parts-look";
it("DP-U34 the two-rem hint keeps words in its solid lower strip", () => {
  const css = readFileSync("src/styles.css", "utf8");
  expect(css).toContain("var(--background) 1.5rem");
  expect(css).toContain("transparent 2rem");
  expect(CUE_WRAP).toContain("h-8 items-end justify-center gap-1 pb-0.5 cue-fade");
  expect(CUE_ROOM).toBe("clamp(0px, 100% - 3rem, 2rem)");
  expect(CUE_MIN_BODY_REM).toBe(5);
});
