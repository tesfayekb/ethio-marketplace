import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const seams = vi.hoisted(() => ({ reason: "featureOff" }));
const words = vi.hoisted(() => ({ real: false, amharic: false }));
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => (words.real ? (ownValue(words.amharic ? am : en, key) ?? key) : key),
    language: words.amharic ? "am" : "en",
    entities: {},
  }),
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
      title={"A title"}
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

it("UFW-23 a phone typed into either text field warns beside that field uf:S7s5.3", () => {
  words.real = true;
  draw();
  for (const name of [en["post.details.titleLabel"], en["post.details.descriptionLabel"]]) {
    fireEvent.change(screen.getByRole("textbox", { name: (label) => label.startsWith(name) }), {
      target: { value: "Call +251911234567" },
    });
  }
  expect(screen.getAllByText(en["post.refusal.contactInText"])).toHaveLength(2);
  words.real = false;
});
it("UFW-24 each assist refusal shows its catalogue words uf:S7s5.7", async () => {
  words.real = true;
  for (const [reason, key] of [
    ["featureOff", "post.refusal.featureOff"],
    ["providerUnavailable", "post.refusal.providerUnavailable"],
    ["assistBudgetSpent", "post.refusal.assistBudgetSpent"],
    ["rateLimited", "post.refusal.rateLimited"],
  ] as const) {
    seams.reason = reason;
    draw();
    await press();
    expect(screen.getByTestId("post-assist-refusal")).toHaveTextContent(en[key]);
    cleanup();
  }
  words.real = false;
});
it("UFW-25 featureOff hides the assist button after refusal and after remount uf:S7s5.8", async () => {
  words.real = true;
  seams.reason = "featureOff";
  const view = draw();
  await press();
  expect(screen.queryByRole("button", { name: en["post.assist.action"] })).not.toBeInTheDocument();
  view.unmount();
  render(
    <StepDetails
      listingId={null}
      categoryId="c-1"
      categoryPath=""
      attributes={{}}
      definitions={[]}
      photoIds={[]}
      title={"A title"}
      description=""
      onChange={vi.fn()}
      refusals={[]}
      assistOff
    />,
  );
  expect(screen.queryByRole("button", { name: en["post.assist.action"] })).not.toBeInTheDocument();
  words.real = false;
});
it("UFW-26 the details screen uses the Amharic catalogue uf:S7s5.9", () => {
  words.real = true;
  words.amharic = true;
  draw();
  expect(
    screen.getByRole("textbox", {
      name: (label) => label.startsWith(am["post.details.titleLabel"]),
    }),
  ).toBeVisible();
  expect(
    screen.getByRole("textbox", {
      name: (label) => label.startsWith(am["post.details.descriptionLabel"]),
    }),
  ).toBeVisible();
  if (am["post.assist.action"] !== en["post.assist.action"])
    expect(
      screen.queryByRole("button", { name: en["post.assist.action"] }),
    ).not.toBeInTheDocument();
  words.real = false;
  words.amharic = false;
});
