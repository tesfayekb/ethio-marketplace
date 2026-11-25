import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import { describe, expect, it, vi } from "vitest";

/**
 * DEC-451 — the gate arrives on demand, and a download that fails draws no staff screen: the
 * fallback says so in its own place and never renders the children the gate guards. Seams
 * (DEC-026): the gate's module fails to load; i18n answers the key.
 */
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));
vi.mock("./staff-factor-gate", () => {
  throw new Error("chunk download failed");
});

const { LazyStaffFactorGate } = await import("./staff-factor-gate-lazy");

describe("the staff gate's on-demand download (DEC-451)", () => {
  it("AG-U5 a failed download draws the load failure in place and no staff screen", async () => {
    render(
      <Suspense fallback={<p data-testid="loading" />}>
        <LazyStaffFactorGate>
          <p data-testid="staff-screen" />
        </LazyStaffFactorGate>
      </Suspense>,
    );
    expect(await screen.findByTestId("admin-factor-load-failed")).toBeTruthy();
    expect(screen.getByTestId("admin-factor-refresh")).toBeTruthy();
    expect(screen.queryByTestId("staff-screen")).toBeNull();
  });
});
