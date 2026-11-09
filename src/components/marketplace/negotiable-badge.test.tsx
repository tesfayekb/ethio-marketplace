import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { adPageLookOf } from "./card-tier";
import { NegotiableBadge } from "./negotiable-badge";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));

it("NGB-1 the chip keeps the site's colours; a gold-framed ad page's tone replaces them, nothing else (S5)", () => {
  const { unmount } = render(<NegotiableBadge />);
  const plain = screen.getByTestId("price-negotiable-badge");
  expect(plain).toHaveClass("bg-success-soft", "text-success-ink", "rounded-full", "text-[11px]");
  unmount();
  render(<NegotiableBadge tone={adPageLookOf({ placement: "top", badge: true }).negotiable} />);
  const premium = screen.getByTestId("price-negotiable-badge");
  expect(premium).toHaveClass("bg-tier-premium-chip", "text-tier-premium-ink", "rounded-full");
  expect(premium).not.toHaveClass("bg-success-soft");
  expect(premium).not.toHaveClass("text-success-ink");
  expect(premium).toHaveClass("text-[11px]", "font-semibold");
});
