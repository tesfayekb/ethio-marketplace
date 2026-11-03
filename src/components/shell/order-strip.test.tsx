import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { OrderStrip, type OrderStep } from "./order-strip";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({
    hash,
    children,
    ...rest
  }: {
    hash?: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={`#${hash ?? ""}`} {...rest}>
      {children}
    </a>
  ),
}));

const STEPS: OrderStep[] = [
  { id: "markets", label: "Markets", state: "set", detail: "Paid levels on: ET", hash: "m" },
  { id: "products", label: "Products", state: "needsRow", hash: "p" },
  { id: "prices", label: "Prices", state: "needsRow", detail: "No price yet", hash: "p-prices" },
];

/** P-1c (D313) — the console's set-up order: numbered links to the page's blocks, each with its state. */
describe("OrderStrip (D313)", () => {
  it("OS-1 one named list, one numbered link per step, in order, each leading to its block's hash", () => {
    render(<OrderStrip testid="strip" steps={STEPS} />);
    const list = screen.getByTestId("strip");
    expect(list.tagName).toBe("OL");
    expect(list.getAttribute("aria-label")).toBe("prim.orderStrip.label");
    const links = list.querySelectorAll("a");
    expect(links.length).toBe(3);
    expect(links[0]?.getAttribute("href")).toBe("#m");
    expect(links[2]?.getAttribute("href")).toBe("#p-prices");
    expect(links[1]?.textContent).toContain("2");
  });

  it("OS-2 each step wears its state in the shell's words, and its data-state", () => {
    render(<OrderStrip testid="strip" steps={STEPS} />);
    expect(screen.getByTestId("strip-markets-state").textContent).toBe("prim.orderStrip.set");
    expect(screen.getByTestId("strip-products-state").textContent).toBe("prim.orderStrip.needsRow");
    expect(screen.getByTestId("strip-markets").getAttribute("data-state")).toBe("set");
    expect(screen.getByTestId("strip-products").getAttribute("data-state")).toBe("needsRow");
  });

  it("OS-3 a step's detail shows under its label; a step without one draws no detail line", () => {
    render(<OrderStrip testid="strip" steps={STEPS} />);
    expect(screen.getByTestId("strip-markets-detail").textContent).toBe("Paid levels on: ET");
    expect(screen.queryByTestId("strip-products-detail")).toBeNull();
    expect(screen.getByTestId("strip-prices-detail").textContent).toBe("No price yet");
  });
});
