import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { readFailed } from "@/lib/reader-failure";

const mocks = vi.hoisted(() => ({
  stats: vi.fn(),
  groups: vi.fn(),
  navigate: vi.fn(),
}));
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", has: () => false }),
}));
vi.mock("@/lib/error-report", () => ({ reportBrowserFailure: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => mocks.navigate,
  useRouterState: ({ select }: { select: (s: { location: { href: string } }) => string }) =>
    select({ location: { href: "/admin/errors" } }),
  Link: ({
    to,
    params,
    children,
    search: _search,
    ...rest
  }: {
    to: string;
    params?: Record<string, string>;
    search?: unknown;
    children: ReactNode;
  }) => (
    <a href={to.replace("$group", params?.["group"] ?? "")} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("./errors-service", async (original) => ({
  ...(await original<typeof import("./errors-service")>()),
  readErrorStats: mocks.stats,
  listErrorGroups: mocks.groups,
}));

import { AdminErrorsPage } from "./errors-page";

const GROUP = "0123456789abcdef0123456789abcdef";
const AT = "2026-11-26T23:59:00.123Z";
const STATS = {
  days: [{ day: "2026-11-26", kind: "route", count: 2 }],
  pages: [{ path: "/", count: 2 }],
  browsers: [{ browser: null, version: null, count: 2 }],
  versions: [{ appVersion: null, count: 2 }],
};
const GROUPS = {
  rows: [
    {
      group: GROUP,
      kind: "notice",
      code: "500",
      shape: "Read failed",
      place: "src/a.ts:1",
      count: 3,
      firstSeen: AT,
      lastSeen: AT,
    },
  ],
  more: false,
};
const EMPTY_STATS = { days: [], pages: [], browsers: [], versions: [] };
const denied = readFailed(
  Object.assign(new Error("permissionDenied"), { code: "P0D01", status: 403 }),
);
const server = readFailed(Object.assign(new Error("boom"), { status: 500 }));

function draw(props: Partial<Parameters<typeof AdminErrorsPage>[0]> = {}) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const onDays = vi.fn();
  const onKind = vi.fn();
  render(
    <QueryClientProvider client={client}>
      <AdminErrorsPage days={7} kind={null} onDays={onDays} onKind={onKind} {...props} />
    </QueryClientProvider>,
  );
  return { onDays, onKind };
}
const tables = () => screen.getAllByTestId("data-table");

describe("the staff Errors page (DEC-474 Part F)", () => {
  beforeEach(() => {
    mocks.stats.mockReset();
    mocks.groups.mockReset();
    mocks.navigate.mockReset();
  });

  it("ERP-1 each read's loading state draws, per table", () => {
    mocks.stats.mockReturnValue(new Promise(() => {}));
    mocks.groups.mockReturnValue(new Promise(() => {}));
    draw();
    expect(screen.getAllByTestId("data-table-loading")).toHaveLength(5);
    for (const box of screen.getAllByTestId("data-table-loading"))
      expect(box).toHaveTextContent("common.loading");
  });

  it("ERP-2 each read's empty state draws its caption", async () => {
    mocks.stats.mockResolvedValue(EMPTY_STATS);
    mocks.groups.mockResolvedValue({ rows: [], more: false });
    draw();
    await waitFor(() => expect(screen.getAllByTestId("data-table-empty")).toHaveLength(5));
    for (const box of screen.getAllByTestId("data-table-empty"))
      expect(box).toHaveTextContent("admin.errors.empty");
  });

  it("ERP-3 one read failing draws the table's notice with the read's sentence while the other tables stay drawn", async () => {
    mocks.stats.mockRejectedValue(server);
    mocks.groups.mockResolvedValue(GROUPS);
    draw();
    await waitFor(() => expect(screen.getAllByTestId("data-table-error")).toHaveLength(4));
    for (const notice of screen.getAllByTestId("data-table-error"))
      expect(notice).toHaveTextContent("admin.errors.read.stats");
    expect(await screen.findByTestId(`errors-group-${GROUP}`)).toBeInTheDocument();
    expect(screen.queryByText("admin.errors.read.groups")).toBeNull();
  });

  it("ERP-4 a refused read (permissionDenied) draws failure.noAccess's words in that same notice", async () => {
    mocks.stats.mockResolvedValue(STATS);
    mocks.groups.mockRejectedValue(denied);
    draw();
    const notice = await screen.findByTestId("data-table-error");
    await waitFor(() => expect(notice).toHaveTextContent("failure.noAccess"));
    expect(screen.getAllByTestId("data-table-error")).toHaveLength(1);
  });

  it("ERP-5 the window and kind choices read with them; the default is 7 days and every kind, a chosen one the reads' own", async () => {
    mocks.stats.mockResolvedValue(STATS);
    mocks.groups.mockResolvedValue(GROUPS);
    const { onDays, onKind } = draw();
    await waitFor(() => expect(mocks.groups).toHaveBeenCalled());
    expect(mocks.stats).toHaveBeenCalledWith(7);
    expect(mocks.groups).toHaveBeenCalledWith({ days: 7, kind: null });
    fireEvent.change(screen.getByTestId("errors-window"), { target: { value: "30" } });
    expect(onDays).toHaveBeenCalledWith(30);
    fireEvent.change(screen.getByTestId("errors-kind"), { target: { value: "crash" } });
    expect(onKind).toHaveBeenCalledWith("crash");
    cleanup();
    mocks.stats.mockResolvedValue(STATS);
    mocks.groups.mockResolvedValue(GROUPS);
    draw({ days: 30, kind: "crash" });
    await waitFor(() => expect(mocks.groups).toHaveBeenCalled());
    expect(mocks.stats).toHaveBeenCalledWith(30);
    expect(mocks.groups).toHaveBeenCalledWith({ days: 30, kind: "crash" });
  });

  it("ERP-6 a null browser, version or app version draws Unknown", async () => {
    mocks.stats.mockResolvedValue(STATS);
    mocks.groups.mockResolvedValue(GROUPS);
    draw();
    const browser = (await screen.findAllByTestId("errors-browser-unknown-unknown"))[0];
    expect(browser).toHaveTextContent("admin.errors.unknown");
    const version = screen.getAllByTestId("errors-version-unknown")[0];
    expect(version).toHaveTextContent("admin.errors.unknown");
  });

  it("ERP-7 `more: true` draws the narrow-the-window caption, and none without it", async () => {
    mocks.stats.mockResolvedValue(STATS);
    mocks.groups.mockResolvedValue({ ...GROUPS, more: true });
    draw();
    expect(await screen.findByTestId("errors-groups-more")).toHaveTextContent(
      "admin.errors.groups.more",
    );
    cleanup();
    mocks.stats.mockResolvedValue(STATS);
    mocks.groups.mockResolvedValue(GROUPS);
    draw();
    await screen.findAllByTestId(`errors-group-${GROUP}`);
    expect(screen.queryByTestId("errors-groups-more")).toBeNull();
  });

  it("ERP-8 a group row opens /admin/errors/<group>", async () => {
    mocks.stats.mockResolvedValue(STATS);
    mocks.groups.mockResolvedValue(GROUPS);
    draw();
    const rows = await screen.findAllByTestId(`errors-group-${GROUP}`);
    const links = rows.flatMap((row) =>
      within(row)
        .queryAllByRole("link")
        .map((link) => link.getAttribute("href")),
    );
    expect(links).toContain(`/admin/errors/${GROUP}`);
    const tableRow = rows.find((row) => row.tagName === "TR");
    expect(tableRow).toBeDefined();
    if (tableRow) fireEvent.click(tableRow);
    expect(mocks.navigate).toHaveBeenCalledWith(
      expect.objectContaining({ to: "/admin/errors/$group", params: { group: GROUP } }),
    );
  });
});
