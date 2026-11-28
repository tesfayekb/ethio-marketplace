import { render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";

/**
 * UF-1 Part 1 (DEC-493) — the breadcrumbs (S6c.2): a landmark named Breadcrumb whose first crumb
 * is a Home link to "/", and the current page as the trail's last, current crumb. Seams as
 * breadcrumbs.test.tsx's (router, shown path, shell, category tree); the words are the catalogue.
 */
const state = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    ...rest
  }: { children: ReactNode; to?: string } & Record<string, unknown>) => (
    <a href={to} data-testid={rest["data-testid"] as string}>
      {children}
    </a>
  ),
  useRouterState: ({ select }: { select?: (s: unknown) => unknown } = {}) => {
    const routerState = {
      matches: state.pathname.startsWith("/admin")
        ? [{ routeId: "/admin", staticData: { adminNav: true } }]
        : [],
      location: { pathname: state.pathname, search: {}, hash: "" },
    };
    return select ? select(routerState) : routerState;
  },
}));
vi.mock("@/components/shell/use-shown-pathname", () => ({
  useShownPathname: () => state.pathname,
}));
vi.mock("@/components/shell-context", () => ({
  useShell: () => ({
    activePanel: state.pathname.startsWith("/admin") ? "admin" : "marketplace",
    selectedCategorySlug: null,
  }),
}));
vi.mock("@/features/categories/category-tree", () => ({
  useCategoryTree: () => ({ tree: { nodes: [] } }),
  pathOf: () => [],
}));
vi.mock("@/i18n", async (original) => {
  const { en: EN } = await import("@/i18n/locales/en");
  const { ownValue: own } = await import("@/lib/own-key");
  return {
    ...(await original<Record<string, unknown>>()),
    useI18n: () => ({
      t: (key: string) => own(EN, key) ?? key,
      entities: { map: {}, lang: "en" },
      lang: "en",
    }),
  };
});

const { Breadcrumbs } = await import("./breadcrumbs");

describe("UF-1 the breadcrumbs", () => {
  it("UFP-32 on an ad, sign-in, account and admin page the trail is named Breadcrumb, starts with Home and ends at the current page uf:S6c.2", () => {
    const pages = [
      ["/l/scratch-abcdefghjk", null],
      ["/auth", en["auth.signIn"]],
      ["/account", en["panel.account"]],
      ["/admin", en["panel.admin"]],
    ] as const;
    for (const [pathname, current] of pages) {
      state.pathname = pathname;
      const { unmount } = render(<Breadcrumbs />);
      const trail = screen.getByRole("navigation", { name: en["shell.breadcrumbLabel"] });
      expect(within(trail).getByRole("link", { name: en["nav.home"] })).toHaveAttribute(
        "href",
        "/",
      );
      if (current !== null) {
        expect(trail.querySelector('[aria-current="page"]')).toHaveTextContent(current);
      }
      unmount();
    }
  });
});
