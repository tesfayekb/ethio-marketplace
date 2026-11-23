import type { ReactNode } from "react";
import { fireEvent, render as renderView, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CategoryModal } from "./category-modal";
import { PanelSubject } from "./dialog-parts-facade";
import { PanelTestContext } from "./dialog-parts-test-context";

const render = (ui: ReactNode) => renderView(ui, { wrapper: PanelTestContext });

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

describe("CategoryModal's panel anatomy (bundle 2)", () => {
  it("CMD-1 without the new props it draws as before: no bands, no description", async () => {
    render(
      <CategoryModal testid="m" title="T" openedBy="o" onClose={() => {}}>
        body
      </CategoryModal>,
    );
    const panel = await waitFor(() => screen.getByTestId("m"));
    expect(panel).not.toHaveAttribute("data-bands");
    expect(panel).toHaveAttribute("data-opened-by", "o");
    expect(panel.className).toContain("max-w-lg");
  });

  it("CMD-2 size, description, tone, subject and footer draw the anatomy", async () => {
    render(
      <CategoryModal
        testid="m"
        title="Delete"
        openedBy="o"
        onClose={() => {}}
        size="narrow"
        description="It goes for good."
        icon={<span>i</span>}
        tone="danger"
        subject={<PanelSubject testId="subject" title="Cars" />}
        footer={<button type="button">Delete</button>}
      >
        body
      </CategoryModal>,
    );
    const panel = await waitFor(() => screen.getByTestId("m"));
    expect(panel).toHaveAttribute("data-bands");
    expect(panel.className).toContain("max-w-sm");
    expect(screen.getByRole("dialog")).toHaveAccessibleDescription("It goes for good.");
    expect(panel.querySelector("[data-panel-head] [data-tone=danger]")).not.toBeNull();
    expect(panel.querySelector("[data-panel-body] [data-panel-subject]")).not.toBeNull();
    expect(panel.querySelector("[data-panel-foot]")).toHaveTextContent("Delete");
  });
});

it("CMD-8 a described question without subject or children has no body band", async () => {
  render(
    <CategoryModal
      testid="empty"
      title="Question"
      openedBy="test"
      onClose={() => {}}
      description="Question details"
      footer={<button type="button">Cancel</button>}
    >
      {null}
    </CategoryModal>,
  );
  const panel = await screen.findByTestId("empty");
  expect(panel.querySelector("[data-panel-body]")).toBeNull();
  expect(panel.querySelector("[data-panel-head]")).toBeInTheDocument();
  expect(panel.querySelector("[data-panel-foot]")).toBeInTheDocument();
});

it("CMD-9 the thin body supplies the page's translated cue to the arriving implementation", async () => {
  render(
    <CategoryModal
      testid="scrolling"
      title="Question"
      openedBy="test"
      onClose={() => {}}
      description="Details"
    >
      Content
    </CategoryModal>,
  );
  const panel = await screen.findByTestId("scrolling");
  const body = panel.querySelector("[data-panel-body]");
  if (!(body instanceof HTMLElement)) throw new Error("Body did not arrive");
  Object.defineProperty(body, "scrollHeight", { configurable: true, value: 1000 });
  Object.defineProperty(body, "clientHeight", { configurable: true, value: 400 });
  fireEvent.scroll(body);
  expect(screen.getByText("dialog.moreBelow")).toBeInTheDocument();
});
