import { describe, expect, it } from "vitest";

import { planAttributeReap, type ReapRow } from "../../e2e/helpers/attribute-reap-plan";

const OLD = "2026-09-01T00:00:00Z";
const YOUNG = "2026-10-06T06:00:00Z";
const CUTOFF = "2026-10-06T03:00:00Z";
const row = (
  id: string,
  key: string,
  created: string,
  dependsOn: string | null = null,
): ReapRow => ({
  id,
  attr_key: key,
  created_at: created,
  depends_on: dependsOn,
});

describe("INC-458 — planAttributeReap", () => {
  it("never returns a key without a scratch prefix, whatever its age", () => {
    const plan = planAttributeReap(
      [row("a", "brand", OLD), row("b", "pricing_type-e2e_x", OLD), row("c", "e2e_attr_x", OLD)],
      CUTOFF,
    );
    expect(plan.ids).toEqual(["c"]);
  });

  it("keeps a young scratch row", () => {
    expect(planAttributeReap([row("a", "e2e-young", YOUNG)], CUTOFF).ids).toEqual([]);
  });

  it("puts an old dependant before the old definition it depends on", () => {
    const plan = planAttributeReap([row("p", "e2e_p", OLD), row("c", "e2e_c", OLD, "p")], CUTOFF);
    expect(plan.ids).toEqual(["c", "p"]);
  });

  it("keeps an old definition that a young dependant still needs", () => {
    const plan = planAttributeReap([row("p", "e2e_p", OLD), row("c", "e2e_c", YOUNG, "p")], CUTOFF);
    expect(plan).toEqual({ ids: [], kept: 1 });
  });

  it("orders a three-level chain leaf first", () => {
    const plan = planAttributeReap(
      [row("a", "e2e_a", OLD), row("b", "e2e_b", OLD, "a"), row("c", "e2e_c", OLD, "b")],
      CUTOFF,
    );
    expect(plan.ids).toEqual(["c", "b", "a"]);
  });
});
