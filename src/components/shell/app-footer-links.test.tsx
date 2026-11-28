import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";

/**
 * UF-1 Part 1 (DEC-493, DEC-498) — the footer (S6e.4): Terms and Privacy are links to their
 * pages (role, catalogue name, address; never followed); About, Contact and Safety are text,
 * not links; the copyright line carries the rights words.
 */
vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...rest }: { to: string; children: ReactNode }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("@/i18n", async () => {
  const { en: EN } = await import("@/i18n/locales/en");
  const { ownValue: own } = await import("@/lib/own-key");
  return { useI18n: () => ({ t: (key: string) => own(EN, key) ?? key, language: "en" }) };
});

const { AppFooter } = await import("./app-footer");

describe("UF-1 the footer", () => {
  it("UFP-35 Terms and Privacy link to their pages, the other items are text, and the copyright says the rights uf:S6e.4", () => {
    render(<AppFooter />);
    expect(screen.getByRole("link", { name: en["footer.terms"] })).toHaveAttribute(
      "href",
      "/terms",
    );
    expect(screen.getByRole("link", { name: en["footer.privacy"] })).toHaveAttribute(
      "href",
      "/privacy",
    );
    for (const key of ["footer.about", "footer.contact", "footer.safety"] as const) {
      expect(screen.getByText(en[key])).toBeInTheDocument();
      expect(screen.queryByRole("link", { name: en[key] })).toBeNull();
    }
    expect(screen.getByTestId("footer-copyright")).toHaveTextContent(en["footer.rights"]);
  });
});
