import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { am } from "@/i18n/locales/am";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { readFailed } from "@/lib/reader-failure";

import type { AdminUserPage } from "./admin-users-service";

/** UF-2 (DEC-493) — the Users list's loading, failed and empty states (A3.5) and its Amharic (A3.7). */
const mocks = vi.hoisted(() => ({
  users: vi.fn(),
  roles: vi.fn(),
  language: "en" as "en" | "am",
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(mocks.language === "am" ? am : en, key) ?? key,
    language: mocks.language,
    has: () => true,
  }),
}));
vi.mock("@/lib/error-report", () => ({ reportBrowserFailure: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
  useSearch: () => ({ role: undefined }),
  useRouterState: ({ select }: { select: (s: { location: { href: string } }) => string }) =>
    select({ location: { href: "/admin/users" } }),
  Link: ({
    to,
    children,
    params: _p,
    search: _s,
    ...rest
  }: { to: string; children: ReactNode } & Record<string, unknown>) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("./admin-users-service", async (original) => ({
  ...(await original<typeof import("./admin-users-service")>()),
  listUsers: mocks.users,
  listRoles: mocks.roles,
}));

import { AdminUsersList } from "./users-list";

const EMPTY: AdminUserPage = { users: [], totalCount: 0 };

function draw() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={client}>
      <AdminUsersList />
    </QueryClientProvider>,
  );
}

describe("the Users list (UF-2)", () => {
  beforeEach(() => {
    mocks.users.mockReset();
    mocks.roles.mockReset().mockResolvedValue([]);
    mocks.language = "en";
    localStorage.clear();
  });
  afterEach(cleanup);

  it("UFA-5 loading, then empty, and a failed read with its words and a Retry that reads again uf:A3.5", async () => {
    let answer: (page: AdminUserPage) => void = () => undefined;
    mocks.users.mockReturnValueOnce(new Promise<AdminUserPage>((r) => (answer = r)));
    draw();
    expect((await screen.findByRole("status")).textContent).toBe(en["admin.users.loading"]);
    answer(EMPTY);
    expect(await screen.findByText(en["admin.users.empty"])).toBeTruthy();
    cleanup();
    mocks.users.mockRejectedValueOnce(readFailed(new Error("down"), 503));
    mocks.users.mockResolvedValue(EMPTY);
    draw();
    const notice = await screen.findByTestId("data-table-error");
    expect(notice.textContent).toContain(en["admin.users.error"]);
    expect(notice.textContent).toContain(en["failure.server"]);
    const calls = mocks.users.mock.calls.length;
    fireEvent.click(screen.getByRole("button", { name: en["common.retry"] }));
    expect(await screen.findByText(en["admin.users.empty"])).toBeTruthy();
    expect(mocks.users.mock.calls.length).toBeGreaterThan(calls);
  });

  it("UFA-6 the Users list's words are the Amharic catalogue's, none English uf:A3.7", async () => {
    mocks.language = "am";
    mocks.users.mockResolvedValue(EMPTY);
    draw();
    expect(await screen.findByText(am["admin.users.empty"])).toBeTruthy();
    const text = document.body.textContent ?? "";
    for (const key of ["admin.users.title", "admin.users.empty"] as const) {
      expect(text).toContain(am[key]);
      if (am[key] !== en[key]) expect(text).not.toContain(en[key]);
    }
    expect(screen.getByRole("textbox", { name: am["admin.users.searchLabel"] })).toBeTruthy();
  });
});
