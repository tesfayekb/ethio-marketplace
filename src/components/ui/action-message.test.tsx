import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ActionMessage } from "./action-message";

/**
 * Bundle 11 turn C8 (INC-570) — the outcome of an action is seen where the action
 * was taken. jsdom has no layout, so these pin the contract the browser runs:
 * the role by tone, nothing without text unless persistent, and one
 * `scrollIntoView({ block: "nearest" })` each time the text appears or changes.
 */
describe("ActionMessage", () => {
  const scroll = vi.fn();
  const original = Element.prototype.scrollIntoView;

  beforeEach(() => {
    scroll.mockReset();
    Element.prototype.scrollIntoView = scroll;
  });
  afterEach(() => {
    Element.prototype.scrollIntoView = original;
  });

  it("AMSG-1: a refusal is an alert and a confirmation a polite status, by tone", () => {
    const { rerender } = render(<ActionMessage text="Refused." tone="error" testid="msg" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Refused.");
    expect(screen.getByTestId("msg")).toHaveClass("text-destructive");
    rerender(<ActionMessage text="Saved." tone="done" testid="msg" />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Saved.");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(screen.queryByRole("alert")).toBeNull();
    rerender(<ActionMessage text="Refused." tone="error" role="status" testid="msg" />);
    expect(screen.getByRole("status")).toHaveClass("text-destructive");
  });

  it("AMSG-2: without text nothing renders, unless the region is persistent", () => {
    const { container, rerender } = render(<ActionMessage text={null} tone="error" />);
    expect(container).toBeEmptyDOMElement();
    rerender(<ActionMessage text="" tone="done" />);
    expect(container).toBeEmptyDOMElement();
    rerender(<ActionMessage text={null} tone="done" persistent testid="region" />);
    expect(screen.getByTestId("region")).toBeEmptyDOMElement();
    // INC-929 — the empty region is live but carries no role until its words come.
    expect(screen.getByTestId("region")).not.toHaveAttribute("role");
    expect(screen.getByTestId("region")).toHaveAttribute("aria-live", "polite");
    expect(scroll).not.toHaveBeenCalled();
    rerender(<ActionMessage text="Saved." tone="done" persistent testid="region" />);
    expect(screen.getByRole("status")).toHaveTextContent("Saved.");
  });

  it("AMSG-3: it brings itself into view each time its text appears or changes", () => {
    const { rerender } = render(<ActionMessage text={null} tone="done" persistent />);
    expect(scroll).not.toHaveBeenCalled();
    rerender(<ActionMessage text="One." tone="done" persistent />);
    expect(scroll).toHaveBeenCalledTimes(1);
    expect(scroll).toHaveBeenLastCalledWith({ block: "nearest", behavior: "smooth" });
    rerender(<ActionMessage text="One." tone="done" persistent />);
    expect(scroll).toHaveBeenCalledTimes(1);
    rerender(<ActionMessage text="Two." tone="error" persistent />);
    expect(scroll).toHaveBeenCalledTimes(2);
    rerender(<ActionMessage text={null} tone="error" persistent />);
    rerender(<ActionMessage text="Two." tone="error" persistent />);
    expect(scroll).toHaveBeenCalledTimes(3);
  });
});
