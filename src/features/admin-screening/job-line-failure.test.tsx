import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";

/**
 * INC-1349 (cursor-bundle-8c-3a) — the screening job line's failed read draws the shared notice
 * with Retry on its own line: the line's `data-state` stays `error`, the old words stay as the
 * subject, and a healthy line draws no notice.
 */
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));
vi.mock("@/lib/error-report", () => ({ reportBrowserFailure: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: ReactNode }) => <a href="/x">{children}</a>,
  useRouterState: () => "/admin/screening",
}));
const state = vi.hoisted(() => ({ job: vi.fn(), refetch: vi.fn() }));
vi.mock("./use-name-checks", async (real) => ({
  ...(await real<typeof import("./use-name-checks")>()),
  useJobLine: state.job,
}));

import { JobHealthLine } from "./job-line";

const guard = vi.fn() as unknown as GuardFn;
const wrap = (node: ReactNode) =>
  render(<QueryClientProvider client={new QueryClient()}>{node}</QueryClientProvider>);

describe("INC-1349 — the screening job line's failed read", () => {
  beforeEach(() => {
    state.job.mockReset();
    state.refetch.mockReset();
  });

  it("JHL-U5 a failed read draws the shared notice on the line with a Retry that reads again", () => {
    state.job.mockReturnValue({
      data: undefined,
      error: Object.assign(new Error("boom"), { status: 500 }),
      isLoading: false,
      refetch: state.refetch,
    });
    wrap(<JobHealthLine mayView mayResume guard={guard} onNotice={vi.fn()} />);
    const line = screen.getByTestId("admin-job-line");
    const notice = screen.getByTestId("admin-job-line-error");
    expect(line.getAttribute("data-state")).toBe("error");
    expect(line.contains(notice)).toBe(true);
    expect(notice.getAttribute("data-failure-reason")).toBe("server");
    expect(notice.textContent).toContain("admin.screening.job.error");
    expect(screen.queryByTestId("admin-job-resume")).toBeNull();
    fireEvent.click(screen.getByTestId("admin-job-line-error-retry"));
    expect(state.refetch).toHaveBeenCalledTimes(1);
  });

  it("JHL-U6 a refused read draws the notice with no Retry; an answered line draws none", () => {
    state.job.mockReturnValue({
      data: undefined,
      error: Object.assign(new Error("permissionDenied"), { status: 403 }),
      isLoading: false,
      refetch: state.refetch,
    });
    const { unmount } = wrap(<JobHealthLine mayView mayResume guard={guard} onNotice={vi.fn()} />);
    expect(screen.getByTestId("admin-job-line-error").getAttribute("data-failure-reason")).toBe(
      "noAccess",
    );
    expect(screen.queryByTestId("admin-job-line-error-retry")).toBeNull();
    unmount();
    state.job.mockReturnValue({
      data: { kind: "notConfigured" },
      error: null,
      isLoading: false,
      refetch: state.refetch,
    });
    wrap(<JobHealthLine mayView mayResume guard={guard} onNotice={vi.fn()} />);
    expect(screen.queryByTestId("admin-job-line-error")).toBeNull();
    expect(screen.getByTestId("admin-job-line").getAttribute("data-state")).toBe("notConfigured");
  });
});
