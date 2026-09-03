import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { ROSTER_COLUMN_PRIORITIES } from "./categories-service";

/**
 * C2-UI-FIX-5 / INC-139 — CONFORMANCE IS MACHINE-CHECKED. The roster may not
 * re-introduce per-column widths, a `cardUntil` override or a pinned column:
 * the primitive owns width behaviour for every console table (law C7), so the
 * consumer declares priorities and nothing else.
 */
const PAGE = readFileSync(new URL("./categories-page.tsx", import.meta.url), "utf8");

describe("categories roster column contract", () => {
  it("declares priorities only — no minWidth anywhere in the roster", () => {
    expect(PAGE).not.toMatch(/minWidth/);
  });

  it("uses the primitive's default card breakpoint and no pinned column", () => {
    expect(PAGE).not.toMatch(/cardUntil/);
    expect(PAGE).not.toMatch(/stickyFirstColumn/);
  });

  it("keeps the audit-shaped priority split", () => {
    expect(ROSTER_COLUMN_PRIORITIES).toEqual({
      name: "primary",
      status: "primary",
      flags: "primary",
      parent: "secondary",
      order: "detail",
      listings: "detail",
      exclusions: "detail",
    });
  });
});
