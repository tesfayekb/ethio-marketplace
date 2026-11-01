import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
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
      state="a"
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

  it("HS-16 a narrow screen opens the sheet's bottom side (grabber, named close, the shared footer); a wide one the popover's panel; Escape and the footer close both", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 360 });
    const narrow = renderPanel();
    fireEvent.click(await screen.findByTestId("f"));
    const sheet = await screen.findByTestId("f-panel");
    expect(sheet).toHaveAttribute("role", "dialog");
    expect(sheet).toHaveAttribute("data-dialog-panel", "");
    expect(sheet.querySelector("[data-dialog-grabber]")).not.toBeNull();
    expect(document.querySelector("[data-dialog-scrim]")).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Filters" })).toBeTruthy();
    expect(screen.getByTestId("f-close")).toHaveAccessibleName("common.close");
    expect(screen.getByTestId("f-done").parentElement).toHaveClass("flex-row", "shadow-rule-top");
    fireEvent.click(screen.getByTestId("f-done"));
    expect(screen.queryByTestId("f-panel")).toBeNull();
    narrow.unmount();

    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1280 });
    renderPanel();
    expect(screen.getByTestId("f")).toHaveAttribute("aria-haspopup", "dialog");
    fireEvent.click(screen.getByTestId("f"));
    expect(await screen.findByTestId("f-body")).toBeTruthy();
    const panel = screen.getByTestId("f-panel");
    expect(panel).toHaveAttribute("data-dialog-panel", "");
    expect(panel.querySelector("[data-dialog-grabber]")).toBeNull();
    expect(document.querySelector("[data-dialog-scrim]")).toBeNull();
    expect(screen.queryByTestId("f-close")).toBeNull();
    expect(screen.getByTestId("f-done").parentElement).toHaveClass("flex-row", "shadow-rule-top");
    fireEvent.keyDown(panel, { key: "Escape" });
    expect(screen.queryByTestId("f-panel")).toBeNull();
  });

  it("HS-24 the footer's `changed` is true only while the choices differ from those the panel opened with (V2c)", () => {
    function Harness() {
      const [choice, setChoice] = useState("all");
      return (
        <ToolbarPanel
          testid="g"
          title="Filters"
          state={choice}
          trigger={<button type="button" data-testid="g" />}
          footer={(close, changed) => (
            <button type="button" data-testid="g-done" disabled={!changed} onClick={close}>
              done
            </button>
          )}
        >
          <button type="button" data-testid="g-city" onClick={() => setChoice("city")} />
          <button type="button" data-testid="g-all" onClick={() => setChoice("all")} />
        </ToolbarPanel>
      );
    }
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 360 });
    render(<Harness />);
    fireEvent.click(screen.getByTestId("g"));
    expect(screen.getByTestId("g-done")).toBeDisabled();
    fireEvent.click(screen.getByTestId("g-city"));
    expect(screen.getByTestId("g-done")).toBeEnabled();
    // A choice set back is no change.
    fireEvent.click(screen.getByTestId("g-all"));
    expect(screen.getByTestId("g-done")).toBeDisabled();
    fireEvent.click(screen.getByTestId("g-city"));
    fireEvent.click(screen.getByTestId("g-done"));
    expect(screen.queryByTestId("g-panel")).toBeNull();
    // Opened again, the panel starts from the choices it now has.
    fireEvent.click(screen.getByTestId("g"));
    expect(screen.getByTestId("g-done")).toBeDisabled();
    // The close always closes.
    fireEvent.click(screen.getByTestId("g-close"));
    expect(screen.queryByTestId("g-panel")).toBeNull();
  });
});
