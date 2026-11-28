import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { tableViewTestShell } from "@/components/shell/table-view-test-shell";
import { forgetTableViewsForTests } from "@/components/shell/table-view-store";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import type { ImpersonatedListing, ImpersonatedProfile } from "./impersonation-service";
const state = vi.hoisted(() => ({
  profile: vi.fn(),
  list: vi.fn(),
  active: vi.fn(),
  end: vi.fn(),
  navigate: vi.fn(),
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({ t: (key: string) => ownValue(en, key) ?? key, language: "en" }),
}));
vi.mock("@tanstack/react-router", async (original) => ({
  ...(await original<typeof import("@tanstack/react-router")>()),
  useNavigate: () => state.navigate,
  useRouterState: () => "/admin/impersonation/session-1",
  Link: ({
    to,
    children,
    ...rest
  }: {
    to: string;
    children: ReactNode;
    "data-testid"?: string;
    className?: string;
  }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("./impersonation-service", async (original) => ({
  ...(await original<typeof import("./impersonation-service")>()),
  getImpersonatedProfile: state.profile,
  listImpersonatedListings: state.list,
  getActiveImpersonation: state.active,
  endImpersonation: state.end,
}));
import { ImpersonationView } from "./impersonation-view";
const profile: ImpersonatedProfile = {
  targetId: "person-1",
  displayName: "Seller",
  sellerAlias: "seller",
  homeCountryCode: null,
  accountStatus: "active",
  createdAt: "2026-11-01T10:00:00Z",
};
const row: ImpersonatedListing = {
  id: "ad-1",
  title: "Camera",
  status: "published",
  priceAmount: 100,
  priceCurrency: null,
  priceMode: "fixed",
  priceBp: null,
  priceNegotiable: false,
  createdAt: "2026-11-01T10:00:00Z",
};
function draw() {
  const Shell = tableViewTestShell("uf2-view-as");
  return render(
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        })
      }
    >
      <Shell>
        <ImpersonationView sessionId="session-1" />
      </Shell>
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  forgetTableViewsForTests();
  state.profile.mockResolvedValue(profile);
  state.list.mockResolvedValue({ rows: [], totalCount: 0 });
  state.active.mockResolvedValue({
    id: "session-1",
    targetId: "person-1",
    targetName: "Seller",
    expiresAt: "2099-11-01T10:00:00Z",
  });
});
afterEach(() => {
  cleanup();
  localStorage.clear();
  forgetTableViewsForTests();
});
it("UFA-32 End now sends the session, disables while pending, displays refusal and retries a network failure uf:A12.2", async () => {
  state.end.mockReturnValueOnce(new Promise(() => {}));
  draw();
  const end = screen.getByRole("button", { name: en["impersonation.endNow"] });
  end.focus();
  fireEvent.keyDown(end, { key: "Enter" });
  fireEvent.click(end, { detail: 0 });
  await waitFor(() => expect(state.end).toHaveBeenCalledWith("session-1"));
  expect(end).toBeDisabled();
  expect(state.navigate).not.toHaveBeenCalled();
  cleanup();
  state.end.mockRejectedValueOnce({ code: "P0001", message: "noSuchCode" });
  draw();
  fireEvent.click(screen.getByRole("button", { name: en["impersonation.endNow"] }));
  expect(await screen.findByTestId("impersonation-end-error")).toHaveTextContent(
    en["impersonation.error.endFailed"],
  );
  expect(screen.getByTestId("impersonation-end-error")).not.toHaveTextContent("noSuchCode");
  expect(state.navigate).not.toHaveBeenCalled();
  cleanup();
  state.end.mockRejectedValue(new TypeError("Failed to fetch"));
  draw();
  fireEvent.click(screen.getByRole("button", { name: en["impersonation.endNow"] }));
  const failure = await screen.findByTestId("impersonation-end-error");
  expect(failure).toHaveTextContent(en["failure.network"]);
  const calls = state.end.mock.calls.length;
  fireEvent.click(within(failure).getByRole("button", { name: en["common.retry"] }));
  await waitFor(() => expect(state.end).toHaveBeenCalledTimes(calls + 1));
  expect(state.end.mock.calls.at(-1)?.[0]).toBe("session-1");
  expect(state.navigate).not.toHaveBeenCalled();
});
it("UFA-33 profile shows loading, empty, failure with Retry and the returned profile facts uf:A12.3", async () => {
  state.profile.mockReturnValueOnce(new Promise(() => {}));
  draw();
  expect(screen.getByTestId("impersonation-profile-loading")).toHaveTextContent(
    en["prim.state.loading"],
  );
  cleanup();
  state.profile.mockResolvedValueOnce(null);
  draw();
  expect(await screen.findByTestId("impersonation-profile-empty")).toHaveTextContent(
    en["prim.state.empty"],
  );
  cleanup();
  state.profile.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  draw();
  const alert = await screen.findByTestId("impersonation-profile-error");
  expect(alert).toHaveTextContent(en["failure.network"]);
  const calls = state.profile.mock.calls.length;
  fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
  const panel = await screen.findByTestId("impersonation-profile");
  expect(state.profile).toHaveBeenCalledTimes(calls + 1);
  expect(
    within(panel).getByRole("heading", { name: en["impersonation.profileTitle"] }),
  ).toBeVisible();
  for (const value of ["Seller", "seller", "active"]) expect(panel).toHaveTextContent(value);
  for (const key of [
    "impersonation.profile.name",
    "impersonation.profile.alias",
    "impersonation.profile.country",
    "impersonation.profile.status",
    "impersonation.profile.joined",
  ] as const)
    expect(panel).toHaveTextContent(en[key]);
});
it("UFA-34 ad list shows its empty caption, row facts, Columns choices and pages the service uf:A12.4", async () => {
  draw();
  expect(await screen.findByTestId("data-table-empty")).toHaveTextContent(
    en["impersonation.listings.empty"],
  );
  cleanup();
  state.list.mockResolvedValue({ rows: [row], totalCount: 60 });
  draw();
  const table = await screen.findByRole("table");
  expect(table).toHaveTextContent("Camera");
  expect(table).toHaveTextContent("published");
  expect(table).toHaveTextContent("100");
  fireEvent.click(screen.getByTestId("impersonation-listings-columns"));
  const panel = await screen.findByRole("dialog");
  const titleChoice = within(panel)
    .getAllByRole("listitem")
    .find((item) => within(item).queryByText(en["impersonation.listings.title"]));
  if (!titleChoice) throw new Error("The locked title choice is missing");
  expect(within(titleChoice).getByRole("switch")).toBeDisabled();
  for (const key of [
    "impersonation.listings.status",
    "impersonation.listings.price",
    "impersonation.listings.created",
  ] as const)
    expect(within(panel).getByRole("switch", { name: en[key] })).toBeVisible();
  fireEvent.keyDown(panel, { key: "Escape" });
  fireEvent.click(screen.getByTestId("impersonation-listings-pagination-next"));
  await waitFor(() => expect(state.list).toHaveBeenLastCalledWith("session-1", 25, 25));
});
it("UFA-35 ad read shows loading words, network failure and Retry to the empty answer uf:A12.5", async () => {
  state.list.mockReturnValueOnce(new Promise(() => {}));
  draw();
  expect(await screen.findByTestId("data-table-loading")).toHaveTextContent(
    en["prim.state.loading"],
  );
  cleanup();
  state.list.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  draw();
  const alert = await screen.findByTestId("data-table-error");
  expect(alert).toHaveTextContent(en["failure.network"]);
  const calls = state.list.mock.calls.length;
  fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
  expect(await screen.findByTestId("data-table-empty")).toHaveTextContent(
    en["impersonation.listings.empty"],
  );
  expect(state.list).toHaveBeenCalledTimes(calls + 1);
});
it("UFA-36 ended session shows the expiry words and catalogue-named back link without following it uf:A12.6", async () => {
  state.active.mockResolvedValue(null);
  draw();
  expect(await screen.findByRole("alert")).toHaveTextContent(en["impersonation.expired"]);
  expect(screen.getByRole("link", { name: en["impersonation.backToUser"] })).toHaveAttribute(
    "href",
    "/admin/users",
  );
  expect(screen.queryByTestId("impersonation-view")).toBeNull();
  expect(state.navigate).not.toHaveBeenCalled();
});
