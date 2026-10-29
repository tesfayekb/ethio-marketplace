import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";

/** N1b-3c (INC-977) — the queue and the job line as staff read them. */
vi.mock("@/i18n", () => ({
  // The paused line keeps its placeholders, so the reason drawn into it can be read.
  useI18n: () => ({
    t: (key: string) => (key === "admin.screening.job.paused" ? `${key} {time}: {reason}` : key),
    language: "en",
  }),
}));
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children }: { children: ReactNode }) => <a href="/admin/users/x">{children}</a>,
}));
const state = vi.hoisted(() => ({ queue: vi.fn(), job: vi.fn() }));
vi.mock("./use-name-checks", async (real) => ({
  ...(await real<typeof import("./use-name-checks")>()),
  useNameQueue: state.queue,
  useJobLine: state.job,
}));

import { JobHealthLine } from "./job-line";
import { NameChecks } from "./name-checks";

const guard = vi.fn() as unknown as GuardFn;
const wrap = (node: ReactNode) =>
  render(<QueryClientProvider client={new QueryClient()}>{node}</QueryClientProvider>);
const answered = (data: unknown) => ({
  data,
  error: null,
  isLoading: false,
  isFetching: false,
  refetch: vi.fn(),
});
const row = {
  profileId: "p1",
  subject: "alias" as const,
  name: "CocaColaShop",
  checkedText: "cocacolashop",
  of: "<b>Coca-Cola</b>",
  nameHidden: false,
  since: "2026-10-29T10:00:00Z",
  attempts: 1,
};

describe("NCQ-U the queue section", () => {
  it("NCQ-U3 a failed read shows the error, never 'none'", () => {
    state.queue.mockReturnValue({
      ...answered(undefined),
      error: new Error("permission denied"),
    });
    wrap(<NameChecks mayList mayClear guard={guard} onNotice={vi.fn()} />);
    expect(screen.getByTestId("admin-name-checks-error").textContent).toBe(
      "admin.screening.names.error",
    );
    expect(screen.queryByTestId("admin-name-checks-empty")).toBeNull();
  });

  it("NCQ-U4 `of` is drawn as text; a hold without one says no reason; a hidden name shows no of line", () => {
    state.queue.mockReturnValue(
      answered({
        rows: [
          row,
          { ...row, profileId: "p2", of: null },
          { ...row, profileId: "p3", name: null, checkedText: null, of: null, nameHidden: true },
        ],
        next: null,
      }),
    );
    const { container } = wrap(<NameChecks mayList mayClear guard={guard} onNotice={vi.fn()} />);
    const lines = screen.getAllByTestId("admin-name-check-of").map((node) => node.textContent);
    expect(lines).toContain("admin.screening.names.of".replace("{of}", "<b>Coca-Cola</b>"));
    expect(lines).toContain("admin.screening.names.noReason");
    expect(container.querySelector("b")).toBeNull();
    expect(screen.getAllByText("admin.screening.names.nameHidden").length).toBeGreaterThan(0);
  });

  it("NCQ-U5 without listings:view nothing is read or drawn", () => {
    state.queue.mockClear();
    state.queue.mockReturnValue(answered(undefined));
    wrap(<NameChecks mayList={false} mayClear guard={guard} onNotice={vi.fn()} />);
    expect(state.queue).toHaveBeenLastCalledWith(null, false);
    expect(screen.queryByTestId("admin-name-checks")).toBeNull();
  });
});

describe("JHL-U the job line", () => {
  it("JHL-U3 a failed read says so, never healthy, and offers no Resume", () => {
    state.job.mockReturnValue({ ...answered(undefined), error: new Error("boom") });
    wrap(<JobHealthLine mayView mayResume guard={guard} onNotice={vi.fn()} />);
    const line = screen.getByTestId("admin-job-line");
    expect(line.getAttribute("data-state")).toBe("error");
    expect(line.textContent).toContain("admin.screening.job.error");
    expect(line.textContent).not.toContain("admin.screening.job.outcome.ok");
    expect(screen.queryByTestId("admin-job-resume")).toBeNull();
  });

  it("JHL-U4 a pause names its reason and offers Resume only with services:manage", () => {
    state.job.mockReturnValue(
      answered({ kind: "paused", reason: "rate_limit", since: "2026-10-29T09:00:00Z" }),
    );
    const { unmount } = wrap(<JobHealthLine mayView mayResume guard={guard} onNotice={vi.fn()} />);
    expect(screen.getByTestId("admin-job-line").textContent).toContain(
      "admin.screening.job.pause.rate_limit",
    );
    expect(screen.getByTestId("admin-job-resume")).toBeTruthy();
    unmount();
    wrap(<JobHealthLine mayView mayResume={false} guard={guard} onNotice={vi.fn()} />);
    expect(screen.queryByTestId("admin-job-resume")).toBeNull();
  });
});
