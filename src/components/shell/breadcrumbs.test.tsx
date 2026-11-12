import { cleanup, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * INC-1042 (housekeeping turn 4, rulings 1 Q5 and 2) — BRC-1…3. The breadcrumbs read the admin
 * sections from the admin navigation layer (admin-nav-layer.ts), never from the sections
 * module: without the layer a public page's trail is unchanged and an admin page's is
 * Home › Admin; with it the admin trail is drawn, in the server's HTML as in the client's.
 * The router, the shell and the category tree are controlled stubs.
 */
const state = vi.hoisted(() => ({
  pathname: "/",
  adminRoute: false,
  activePanel: "marketplace" as string,
}));

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
  useRouterState: ({ select }: { select?: (state: unknown) => unknown } = {}) => {
    const routerState = {
      matches: state.adminRoute ? [{ routeId: "/admin", staticData: { adminNav: true } }] : [],
      location: { pathname: state.pathname, search: {}, hash: "" },
    };
    return select ? select(routerState) : routerState;
  },
}));
vi.mock("@/components/shell/use-shown-pathname", () => ({
  useShownPathname: () => state.pathname,
}));
vi.mock("@/components/shell-context", () => ({
  useShell: () => ({ activePanel: state.activePanel, selectedCategorySlug: null }),
}));
vi.mock("@/features/categories/category-tree", () => ({
  useCategoryTree: () => ({ tree: { nodes: [] } }),
  pathOf: () => [],
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  useI18n: () => ({ t: (key: string) => key, entities: { map: {}, lang: "en" }, lang: "en" }),
}));

const { Breadcrumbs } = await import("./breadcrumbs");

function at(pathname: string) {
  state.pathname = pathname;
  state.adminRoute = pathname.startsWith("/admin");
  state.activePanel = state.adminRoute ? "admin" : "marketplace";
}

beforeEach(() => at("/"));
afterEach(() => cleanup());

describe("the breadcrumbs and the admin navigation layer (INC-1042)", () => {
  it("BRC-1 the layer absent: the home trail on a public page, Home › Admin on an admin page", () => {
    render(<Breadcrumbs />);
    expect(screen.getByTestId("breadcrumb-home").textContent).toBe("nav.home");
    expect(screen.queryByTestId("breadcrumb-admin")).toBeNull();
    cleanup();
    at("/admin/audit");
    render(<Breadcrumbs />);
    expect(screen.getByTestId("breadcrumb-admin").textContent).toBe("panel.admin");
    expect(screen.queryByTestId("breadcrumb-admin-section")).toBeNull();
    expect(screen.queryByTestId("breadcrumb-admin-group")).toBeNull();
  });

  it("BRC-2 the layer present: the admin trail — section, group page, group without a page", async () => {
    await import("@/features/admin/nav-layer");
    at("/admin/audit");
    render(<Breadcrumbs />);
    expect(screen.getByTestId("breadcrumb-admin").getAttribute("href")).toBe("/admin");
    expect(screen.getByTestId("breadcrumb-admin-section").textContent).toBe(
      "admin.section.audit.title",
    );
    cleanup();
    // a section under a group that owns a page: the group links to it
    at("/admin/places");
    render(<Breadcrumbs />);
    expect(screen.getByTestId("breadcrumb-admin-group").getAttribute("href")).toBe(
      "/admin/locations",
    );
    expect(screen.getByTestId("breadcrumb-admin-section").textContent).toBe(
      "admin.section.places.title",
    );
    cleanup();
    // the group's own page: the group is the current crumb, no section
    at("/admin/locations");
    render(<Breadcrumbs />);
    expect(screen.getByTestId("breadcrumb-admin-group").getAttribute("aria-current")).toBe("page");
    expect(screen.queryByTestId("breadcrumb-admin-section")).toBeNull();
    cleanup();
    // a page below a section: the section links back to it
    at("/admin/users/abc");
    render(<Breadcrumbs />);
    expect(screen.getByTestId("breadcrumb-admin-section").getAttribute("href")).toBe(
      "/admin/users",
    );
  });

  it("BRC-3 the layer present: a public page shows no admin crumb, and the server's HTML carries the admin trail", () => {
    at("/");
    render(<Breadcrumbs />);
    expect(screen.queryByTestId("breadcrumb-admin")).toBeNull();
    at("/admin/audit");
    const html = renderToString(<Breadcrumbs />);
    expect(html).toContain('data-testid="breadcrumb-admin-section"');
    expect(html).toContain("admin.section.audit.title");
  });
});
