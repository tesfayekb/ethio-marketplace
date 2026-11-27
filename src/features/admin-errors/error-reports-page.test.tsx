import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { readFailed } from "@/lib/reader-failure";

const mocks = vi.hoisted(() => ({ occurrences: vi.fn() }));
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", has: () => false }),
}));
vi.mock("@/lib/error-report", () => ({ reportBrowserFailure: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
  useRouterState: ({ select }: { select: (s: { location: { href: string } }) => string }) =>
    select({ location: { href: "/admin/errors" } }),
  Link: ({
    to,
    children,
    search: _search,
    params: _params,
    ...rest
  }: {
    to: string;
    search?: unknown;
    params?: unknown;
    children: ReactNode;
  }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("./errors-service", async (original) => ({
  ...(await original<typeof import("./errors-service")>()),
  listErrorOccurrences: mocks.occurrences,
}));

import { ErrorReportsPage } from "./error-reports-page";

const GROUP = "0123456789abcdef0123456789abcdef";
const AT = "2026-11-26T23:59:00.123Z";
const NEXT = { seenAt: AT, id: "22222222-2222-4222-8222-222222222222" };
const report = (id: string, over: Record<string, unknown> = {}) => ({
  id,
  seenAt: AT,
  kind: "crash",
  code: null,
  message: "TypeError: x is undefined",
  place: null,
  path: "/l/abc",
  browser: "Chrome",
  engine: "Blink",
  browserVersion: "145",
  device: "phone",
  language: "am",
  appVersion: null,
  signedIn: false,
  ...over,
});
const ONE = "11111111-1111-4111-8111-111111111111";
const TWO = "33333333-3333-4333-8333-333333333333";

function draw(group = GROUP) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={client}>
      <ErrorReportsPage group={group} back={{ days: 7, kind: null }} />
    </QueryClientProvider>,
  );
}
const nextButton = () => screen.getByRole("button", { name: "prim.table.next" });

describe("one error group's reports (DEC-474 Part F)", () => {
  beforeEach(() => {
    mocks.occurrences.mockReset();
  });

  it("ERR-1 page one reads after null with 50, Next reads with `next`, and Next is disabled when `next` is null", async () => {
    mocks.occurrences.mockImplementation((input: unknown) => {
      const after = (input as { after: unknown } | undefined)?.after;
      return Promise.resolve(
        after === null ? { rows: [report(ONE)], next: NEXT } : { rows: [report(TWO)], next: null },
      );
    });
    draw();
    await screen.findAllByTestId(`errors-report-${ONE}`);
    expect(mocks.occurrences).toHaveBeenCalledWith({ group: GROUP, after: null, limit: 50 });
    await waitFor(() => expect(nextButton()).not.toBeDisabled());
    fireEvent.click(nextButton());
    await screen.findAllByTestId(`errors-report-${TWO}`);
    expect(mocks.occurrences).toHaveBeenLastCalledWith({ group: GROUP, after: NEXT, limit: 50 });
    await waitFor(() => expect(nextButton()).toBeDisabled());
  });

  it("ERR-2 a bad group key draws not-found and makes no read", () => {
    draw("0123456789ABCDEF0123456789ABCDEF");
    expect(screen.getByTestId("errors-group-not-found")).toHaveTextContent(
      "admin.errors.group.notFound",
    );
    expect(mocks.occurrences).not.toHaveBeenCalled();
  });

  it("ERR-3 a message and path holding markup are drawn as text, no element created", async () => {
    const markup = '<img src=x onerror="alert(1)">';
    mocks.occurrences.mockResolvedValue({
      rows: [report(ONE, { message: markup, path: `/l/${markup}` })],
      next: null,
    });
    draw();
    const rows = await screen.findAllByTestId(`errors-report-${ONE}`);
    expect(document.querySelector("img")).toBeNull();
    expect(rows.map((row) => row.textContent ?? "").join(" ")).toContain("<img");
  });

  it("ERR-4 the reports read's loading, empty and failed states (the table's notice with the read's sentence)", async () => {
    mocks.occurrences.mockReturnValue(new Promise(() => {}));
    draw();
    expect(screen.getByTestId("data-table-loading")).toHaveTextContent("common.loading");
    cleanup();
    mocks.occurrences.mockResolvedValue({ rows: [], next: null });
    draw();
    expect(await screen.findByTestId("data-table-empty")).toHaveTextContent(
      "admin.errors.reports.empty",
    );
    cleanup();
    mocks.occurrences.mockRejectedValue(
      readFailed(Object.assign(new Error("boom"), { status: 500 })),
    );
    draw();
    expect(await screen.findByTestId("data-table-error")).toHaveTextContent(
      "admin.errors.read.reports",
    );
  });
});
