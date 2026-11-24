import { loadSelectList } from "@/components/select-list-loader";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { fireEvent, screen } from "@testing-library/react";
import { useState } from "react";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

import { FilterSelect } from "./filter-select";
import { ToolbarPanel } from "./toolbar-panel";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

const WIDTH = window.innerWidth;

function drawPanel() {
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
    const narrow = drawPanel();
    fireEvent.click(await screen.findByTestId("f"));
    const sheet = await screen.findByTestId("f-panel");
    expect(sheet).toHaveAttribute("role", "dialog");
    expect(sheet).toHaveAttribute("data-dialog-panel", "");
    expect(sheet.querySelector("[data-dialog-grabber]")).not.toBeNull();
    expect(document.querySelector("[data-dialog-scrim]")).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Filters" })).toBeTruthy();
    expect(screen.getByTestId("f-close")).toHaveAccessibleName("common.close");
    fireEvent.click(screen.getByTestId("f-done"));
    expect(screen.queryByTestId("f-panel")).toBeNull();
    narrow.unmount();

    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1280 });
    drawPanel();
    expect(screen.getByTestId("f")).toHaveAttribute("aria-haspopup", "dialog");
    fireEvent.click(screen.getByTestId("f"));
    expect(await screen.findByTestId("f-body")).toBeTruthy();
    const panel = screen.getByTestId("f-panel");
    expect(panel).toHaveAttribute("data-dialog-panel", "");
    expect(document.querySelector("[data-dialog-scrim]")).toBeNull();
    expect(screen.queryByTestId("f-close")).toBeNull();
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

it("FP-U17 a toolbar panel with no answers opens and closes without a body band", async () => {
  render(
    <ToolbarPanel
      testid="empty-filter"
      title="Filters"
      description="Details"
      state="all"
      trigger={<button type="button" data-testid="empty-filter" />}
      footer={(close) => (
        <button type="button" onClick={close}>
          Done
        </button>
      )}
    >
      {null}
    </ToolbarPanel>,
  );
  fireEvent.click(screen.getByTestId("empty-filter"));
  const panel = await screen.findByTestId("empty-filter-panel");
  expect(panel.querySelector("[data-panel-body]")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Done" }));
  expect(screen.queryByTestId("empty-filter-panel")).toBeNull();
});

it("FP-U24 a wide panel's first Escape closes its list, the second closes the panel", async () => {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: 1280 });
  render(
    <ToolbarPanel
      testid="escape-filter"
      title="Filters"
      description="Choices"
      state="all"
      trigger={<button data-testid="escape-filter" />}
    >
      <FilterSelect
        id="escape-choice"
        testId="escape-choice"
        options={[{ value: "one", label: "One" }]}
        value={[]}
        onChange={vi.fn()}
        placeholder="All"
        searchLabel="Search"
        noneLabel="None"
      />
    </ToolbarPanel>,
  );
  fireEvent.click(screen.getByTestId("escape-filter"));
  const control = await screen.findByTestId("escape-choice");
  fireEvent.click(control);
  expect(screen.getByTestId("escape-choice-list")).toBeInTheDocument();
  fireEvent.keyDown(control, { key: "Escape" });
  expect(screen.queryByTestId("escape-choice-list")).toBeNull();
  expect(screen.getByTestId("escape-filter-panel")).toBeInTheDocument();
  fireEvent.keyDown(control, { key: "Escape" });
  expect(screen.queryByTestId("escape-filter-panel")).toBeNull();
});

it("FP-U26 the wide panel names its description paragraph", async () => {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: 1280 });
  render(
    <ToolbarPanel
      testid="described-filter"
      title="Filters"
      description="Choices"
      state="all"
      trigger={<button data-testid="described-filter" />}
    >
      <span />
    </ToolbarPanel>,
  );
  fireEvent.click(screen.getByTestId("described-filter"));
  const panel = await screen.findByTestId("described-filter-panel");
  const id = panel.getAttribute("aria-describedby");
  expect(id).toBe("described-filter-description");
  expect(id === null ? null : document.getElementById(id)?.tagName).toBe("P");
});

it.each([360, 1280])(
  "FP-U38 the panel is named by its heading in the %i-wide form",
  async (width) => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: width });
    render(
      <ToolbarPanel
        testid="named"
        title="Filters"
        description="Choose what the list shows."
        state="all"
        trigger={<button data-testid="named" />}
      >
        <span />
      </ToolbarPanel>,
    );
    fireEvent.click(screen.getByTestId("named"));
    expect(await screen.findByRole("dialog", { name: "Filters" })).toHaveAccessibleDescription(
      "Choose what the list shows.",
    );
  },
);

// The existing choice assertions run after the intent-fetched module has arrived.
beforeEach(async () => {
  await loadSelectList();
});

/**
 * Lovable bundle 8 (INC-1271, ruling 2) — the wide panel is placed by its room. jsdom draws no
 * chrome, so the visible area is the 900-pixel window 8 px inside each edge (8 to 892); the
 * floor is 532 px.
 */
describe("the wide panel's place", () => {
  const HEIGHT = window.innerHeight;
  afterEach(() => {
    Object.defineProperty(window, "innerHeight", { configurable: true, value: HEIGHT });
    vi.restoreAllMocks();
  });

  async function placeAt(top: number) {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1280 });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 900 });
    // The window's box as Radix's placement reads it (jsdom's is 0 × 0, which flips every side).
    vi.spyOn(document.documentElement, "clientHeight", "get").mockReturnValue(900);
    vi.spyOn(document.documentElement, "clientWidth", "get").mockReturnValue(1280);
    render(
      <ToolbarPanel
        testid="placed"
        title="Filters"
        state="all"
        trigger={<button data-testid="placed" />}
      >
        <span />
      </ToolbarPanel>,
    );
    const button = screen.getByTestId("placed");
    vi.spyOn(button, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ x: 40, y: top, width: 80, height: 40 }),
    );
    fireEvent.click(button);
    const panel = await screen.findByTestId("placed-panel");
    // Radix places its wrapper by a translate: its vertical part is the panel's top.
    await new Promise((done) => setTimeout(done, 0));
    const wrapper = panel.closest<HTMLElement>("[data-radix-popper-content-wrapper]");
    const placedTop = /translate\([^,]+,\s*([-\d.]+)px\)/.exec(wrapper?.style.transform ?? "")?.[1];
    return {
      side: panel.getAttribute("data-side"),
      maxHeight: panel.style.maxHeight,
      top: placedTop,
    };
  }

  it("TBP-U1 the room below holds the floor: the panel opens below, as tall as that room", async () => {
    // 892 - 140 = 752 px below.
    expect(await placeAt(100)).toEqual({ side: "bottom", maxHeight: "752px", top: "140" });
  });

  it("TBP-U2 only the room above holds the floor: the panel opens above, as tall as that room", async () => {
    // 152 px below, 700 - 8 = 692 px above (jsdom's panel has no height, so its top is the button's).
    expect(await placeAt(700)).toEqual({ side: "top", maxHeight: "692px", top: "700" });
  });

  it("TBP-U3 neither side holds the floor: the panel covers its button from the visible area's top", async () => {
    // 422 px on each side; the whole visible area, 892 - 8 = 884 px, from its top edge (8 px).
    expect(await placeAt(430)).toEqual({ side: "bottom", maxHeight: "884px", top: "8" });
  });
});
