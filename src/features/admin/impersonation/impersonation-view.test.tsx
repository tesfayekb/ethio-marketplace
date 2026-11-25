import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { expect, it, vi } from "vitest";

const seen = vi.hoisted(() => ({
  table: vi.fn<(props: Record<string, unknown>) => null>(() => null),
  panel: vi.fn<(props: Record<string, unknown>) => null>(() => null),
  profileRefetch: vi.fn(),
  listingsRefetch: vi.fn(),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: ReactNode }) => <a href="/">{children}</a>,
  useNavigate: () => vi.fn(),
}));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("@/components/shell/data-table", () => ({
  DataTable: seen.table,
  DataTablePagination: () => null,
}));
vi.mock("@/components/shell/detail-panel", () => ({ DetailPanel: seen.panel }));
vi.mock("@/components/shell/use-kept-page", () => ({
  useKeptPage: () => ({
    page: 0,
    pageSize: 25,
    ready: true,
    setPage: vi.fn(),
    setPageSize: vi.fn(),
    pageSizeOptions: [25],
  }),
}));
vi.mock("./use-impersonation", () => ({
  useActiveImpersonation: () => ({ data: null, isLoading: false }),
  useCountdown: () => null,
  useEndImpersonation: () => ({
    isError: true,
    isPending: false,
    error: { code: "P0001", message: "noActiveSession" },
    mutate: vi.fn(),
  }),
  useImpersonatedProfile: () => ({
    data: undefined,
    isLoading: false,
    error: new Error("down"),
    refetch: seen.profileRefetch,
  }),
  useImpersonatedListings: () => ({
    data: undefined,
    isLoading: false,
    isFetching: false,
    isPlaceholderData: false,
    error: new Error("down"),
    refetch: seen.listingsRefetch,
  }),
}));

import { ImpersonationView } from "./impersonation-view";

it("IMVW-1 a failed End now on the view-as page says why in the door's words", async () => {
  render(<ImpersonationView sessionId="s1" />);
  expect(await screen.findByText("impersonation.noneActive")).toHaveAttribute(
    "data-testid",
    "impersonation-end-error",
  );
});

it("IMVW-2 a failed profile read hands the panel its own refetch as Retry", () => {
  render(<ImpersonationView sessionId="s1" />);
  const props = seen.panel.mock.calls.at(-1)?.[0];
  (props?.["onRetry"] as () => void)();
  expect(seen.profileRefetch).toHaveBeenCalledTimes(1);
});

it("IMVW-3 the ad list has loading words and a failed read's Retry is its own refetch", () => {
  render(<ImpersonationView sessionId="s1" />);
  const props = seen.table.mock.calls.at(-1)?.[0];
  render(<>{props?.["loadingState"] as ReactNode}</>);
  expect(screen.getByText("prim.state.loading")).toBeInTheDocument();
  (props?.["retry"] as () => void)();
  expect(seen.listingsRefetch).toHaveBeenCalledTimes(1);
});
