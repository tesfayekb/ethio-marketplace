import { render, screen } from "@testing-library/react";
import { createElement, type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { am } from "@/i18n/locales/am";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";

/** UF-2 (DEC-493) — the staff landing with no permitted section (A2.4), and in Amharic (A2.5). */
const site = vi.hoisted(() => ({ language: "en" as "en" | "am" }));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(site.language === "am" ? am : en, key) ?? key,
    language: site.language,
    has: () => true,
  }),
}));
vi.mock("@tanstack/react-router", async (original) => ({
  ...(await original<typeof import("@tanstack/react-router")>()),
  Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a>,
}));

const { Route } = await import("@/routes/admin.index");
const { AdminShellProvider } = await import("./admin-shell-provider");

function draw(permissions: string[]) {
  const view = Route.options.component;
  if (typeof view !== "function") throw new Error("the landing has no component");
  render(
    <AdminShellProvider permissions={permissions} accessDenied={false}>
      {createElement(view)}
    </AdminShellProvider>,
  );
}

const WORDS = ["admin.landing.title", "admin.noSections.title", "admin.noSections.body"] as const;

describe("the staff landing (UF-2)", () => {
  beforeEach(() => {
    site.language = "en";
  });

  it("UFA-3 with no permitted section the landing says so with its title and body uf:A2.4", () => {
    draw([]);
    const box = screen.getByTestId("admin-no-sections");
    expect(screen.getByRole("heading", { name: en["admin.noSections.title"] })).toBeTruthy();
    expect(box.textContent).toContain(en["admin.noSections.body"]);
    expect(screen.queryByTestId("admin-nav-cards")).toBeNull();
  });

  it("UFA-4 the landing's words are the Amharic catalogue's, none English uf:A2.5", () => {
    site.language = "am";
    draw([]);
    const text = screen.getByTestId("admin-landing").textContent ?? "";
    for (const key of WORDS) {
      expect(text).toContain(am[key]);
      if (am[key] !== en[key]) expect(text).not.toContain(en[key]);
    }
  });
});
