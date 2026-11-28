import { render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { am } from "@/i18n/locales/am";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";

/**
 * UF-2 (DEC-493) — the staff rail: the legal section's menu alert (A1.6) and the rail's words in
 * Amharic (A1.7). Seams: the shell, the router, the admin navigation layer's alerts hook; the
 * items are the layer's own (rail-items.ts), the words the real catalogue.
 */
const state = vi.hoisted(() => ({
  language: "en" as "en" | "am",
  alerts: new Set<string>(),
  permissions: [] as string[],
  items: [] as readonly unknown[],
}));

vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(state.language === "am" ? am : en, key) ?? key,
    language: state.language,
    has: () => true,
    entities: { map: {}, lang: state.language },
  }),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    search: _s,
    params: _p,
    hash: _h,
    activeProps: _a,
    ...rest
  }: { to?: string; children: ReactNode } & Record<string, unknown>) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
  useRouterState: ({ select }: { select?: (state: unknown) => unknown } = {}) =>
    select
      ? select({
          matches: [{ staticData: { adminNav: true } }],
          location: { pathname: "/admin", hash: "", href: "/admin", searchStr: "" },
          resolvedLocation: { pathname: "/admin", hash: "", href: "/admin" },
        })
      : {},
  useNavigate: () => vi.fn(),
  useRouter: () => ({
    subscribe: () => () => undefined,
    state: { location: { pathname: "/admin" } },
  }),
}));
vi.mock("@/components/shell-context", () => ({
  useShell: () => ({
    navOpen: false,
    setNavOpen: vi.fn(),
    user: { id: "u-1", displayName: "Staff" },
    auth: { isAuthenticated: true, permissions: state.permissions },
    authLoading: false,
    activePanel: "admin",
    selectedCategorySlug: null,
  }),
}));
vi.mock("@/components/shell/use-category-glyphs", () => ({
  useCategoryGlyphs: () => ({ settled: true, glyphOf: () => null }),
}));

vi.mock("@/components/shell/admin-nav-layer", async (original) => {
  const mod = await original<typeof import("@/components/shell/admin-nav-layer")>();
  return {
    ...mod,
    useAdminNav: () => ({
      items: state.items,
      sections: [],
      groups: [],
      useNavAlerts: () => state.alerts,
    }),
  };
});

const { AppRail } = await import("@/components/shell/app-rail");
const { ADMIN_NAV_ITEMS } = await import("./rail-items");
state.items = ADMIN_NAV_ITEMS;

const ALL = ADMIN_NAV_ITEMS.flatMap((item) => [item, ...(item.children ?? [])])
  .map((item) => item.requiredPermission)
  .filter((p): p is string => typeof p === "string");

const LEGAL = (() => {
  const found = ADMIN_NAV_ITEMS.flatMap((item) => [item, ...(item.children ?? [])]).find(
    (item) => item.alert === "legalReview",
  );
  if (found === undefined) throw new Error("no legal alert item");
  return found;
})();

describe("the staff rail (UF-2)", () => {
  beforeEach(() => {
    state.language = "en";
    state.alerts = new Set();
    state.permissions = ALL;
  });

  it("UFA-1 the legal entry carries the review alert in its name while the server raises it, never without uf:A1.6", () => {
    const rail = () => within(screen.getByTestId("app-rail"));
    const { unmount } = render(<AppRail />);
    const alertWords = en["admin.nav.alert.legalReview"];
    expect(rail().queryAllByRole("link", { name: new RegExp(alertWords) })).toHaveLength(0);
    unmount();
    state.alerts = new Set(["legalReview"]);
    render(<AppRail />);
    const marked = rail().getAllByRole("link", {
      name: `${ownValue(en, LEGAL.labelKey) ?? LEGAL.labelKey} — ${alertWords}`,
    });
    expect(marked.length).toBeGreaterThan(0);
  });

  it("UFA-2 the staff rail's words are the Amharic catalogue's, none English uf:A1.7", () => {
    state.language = "am";
    state.alerts = new Set(["legalReview"]);
    render(<AppRail />);
    const rail = screen.getByTestId("app-rail");
    const keys = ADMIN_NAV_ITEMS.map((item) => item.labelKey);
    expect(keys.length).toBeGreaterThan(3);
    for (const key of keys) {
      const word = ownValue(am, key);
      expect(word, key).toBeDefined();
      expect(rail.textContent).toContain(word);
      const english = ownValue(en, key);
      if (english !== word && english !== undefined)
        expect(rail.textContent).not.toContain(english);
    }
    expect(
      within(rail).getAllByRole("link", { name: new RegExp(am["admin.nav.alert.legalReview"]) })
        .length,
    ).toBeGreaterThan(0);
  });
});
