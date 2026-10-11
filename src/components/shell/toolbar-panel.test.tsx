import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ToolbarPanel } from "./toolbar-panel";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

const WIDTH = window.innerWidth;

function renderPanel() {
  return render(
    <ToolbarPanel
      testid="f"
      title="Filters"
      trigger={<button type="button" data-testid="f" />}
      footer={(close) => (
        <button type="button" data-testid="f-done" onClick={close}>
          done
        </button>
      )}
    >
      <p data-testid="f-body">body</p>
    </ToolbarPanel>,
  );
}

/** Bundle 11 V2 (D132, INC-543) — a bottom sheet on a phone, a popover from md. */
describe("ToolbarPanel", () => {
  afterEach(() => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: WIDTH });
  });

  it("HS-16 a narrow screen opens a modal bottom sheet with a named close; a wide one a popover; Escape and the footer close both", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 360 });
    const narrow = renderPanel();
    fireEvent.click(await screen.findByTestId("f"));
    const sheet = await screen.findByTestId("f-panel");
    expect(sheet).toHaveAttribute("role", "dialog");
    expect(screen.getByRole("heading", { name: "Filters" })).toBeTruthy();
    expect(screen.getByTestId("f-close")).toHaveAccessibleName("common.close");
    fireEvent.click(screen.getByTestId("f-done"));
    expect(screen.queryByTestId("f-panel")).toBeNull();
    narrow.unmount();

    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1280 });
    renderPanel();
    fireEvent.click(screen.getByTestId("f"));
    expect(await screen.findByTestId("f-body")).toBeTruthy();
    expect(screen.queryByTestId("f-close")).toBeNull();
    fireEvent.keyDown(screen.getByTestId("f-panel"), { key: "Escape" });
    expect(screen.queryByTestId("f-panel")).toBeNull();
  });
});
