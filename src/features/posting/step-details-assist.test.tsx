import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const seams = vi.hoisted(() => ({ reason: "featureOff" }));
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", entities: {} }),
}));
vi.mock("./catalog-scope", () => ({ useCatalogScope: () => null }));
vi.mock("./attribute-options", () => ({ loadAttributeOptions: () => Promise.resolve([]) }));
vi.mock("./posting-service", () => ({
  peekAssist: () => Promise.resolve(null),
  requestAssist: () =>
    Promise.resolve({ ok: false, payload: {}, refusals: [{ reason: seams.reason }] }),
}));

import { StepDetails } from "./step-details";

const draw = (onAssistOff = vi.fn()) =>
  render(
    <StepDetails
      listingId={null}
      categoryId="c-1"
      categoryPath=""
      attributes={{}}
      definitions={[]}
      photoIds={[]}
      title="A title"
      description=""
      onChange={vi.fn()}
      refusals={[]}
      onAssistOff={onAssistOff}
    />,
  );

const press = async () => {
  await act(async () => {
    fireEvent.click(screen.getByTestId("post-assist"));
  });
};

describe("D19 — an assist refusal is drawn with its words", () => {
  it("SDA-U1 featureOff: its words, the button hidden, the wizard told", async () => {
    seams.reason = "featureOff";
    const off = vi.fn();
    draw(off);
    await press();
    expect(screen.getByTestId("post-assist-refusal").textContent).toBe("post.refusal.featureOff");
    expect(screen.queryByTestId("post-assist")).toBeNull();
    expect(off).toHaveBeenCalledTimes(1);
  });

  it("SDA-U2 providerUnavailable: its words, the button stays", async () => {
    seams.reason = "providerUnavailable";
    draw();
    await press();
    expect(screen.getByTestId("post-assist-refusal").textContent).toBe(
      "post.refusal.providerUnavailable",
    );
    expect(screen.getByTestId("post-assist")).toBeTruthy();
  });

  it("SDA-U3 assistBudgetSpent: its words", async () => {
    seams.reason = "assistBudgetSpent";
    draw();
    await press();
    expect(screen.getByTestId("post-assist-refusal").textContent).toBe(
      "post.refusal.assistBudgetSpent",
    );
  });
});
