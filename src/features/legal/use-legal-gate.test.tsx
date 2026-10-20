import { focusManager, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const status = vi.fn();
vi.mock("./legal-reader", () => ({ myLegalStatus: (kinds: string[]) => status(kinds) }));
import { useLegalGate } from "./use-legal-gate";

const ROW = {
  kind: "terms",
  country_code: null,
  version_id: "v1",
  version: 1,
  label: "one",
  material: false,
  effective_at: "2026-10-01T00:00:00Z",
};
function setup(props: Partial<Parameters<typeof useLegalGate>[0]>) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const navigate = vi.fn();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  const view = renderHook(
    (p: Partial<Parameters<typeof useLegalGate>[0]>) =>
      useLegalGate({
        userId: "u1",
        pathname: "/account",
        search: "?tab=1",
        navigate,
        ...p,
      }),
    { wrapper, initialProps: props },
  );
  return { navigate, view, client };
}
beforeEach(() => {
  status.mockClear();
});
afterEach(() => {
  focusManager.setFocused(undefined);
  vi.restoreAllMocks();
});

describe("useLegalGate", () => {
  it("reads again on the window's return once its answer is five minutes old (turn 12)", async () => {
    status.mockResolvedValue([]);
    const start = Date.now();
    const clock = vi.spyOn(Date, "now").mockReturnValue(start);
    setup({});
    await waitFor(() => expect(status).toHaveBeenCalledTimes(1));
    focusManager.setFocused(false);
    focusManager.setFocused(true);
    await new Promise((r) => setTimeout(r, 20));
    expect(status, "a fresh answer is not read again").toHaveBeenCalledTimes(1);
    clock.mockReturnValue(start + 5 * 60 * 1000 + 1);
    focusManager.setFocused(false);
    focusManager.setFocused(true);
    await waitFor(() => expect(status).toHaveBeenCalledTimes(2));
  });
  it("keeps no entry once its last observer unmounts (INC-769)", async () => {
    status.mockResolvedValue([]);
    const { view, client } = setup({});
    await waitFor(() => expect(status).toHaveBeenCalled());
    view.unmount();
    await waitFor(() => expect(client.getQueryCache().getAll()).toHaveLength(0));
  });
  it("at /account with nothing in its search, navigates once with next /account (INC-770)", async () => {
    status.mockResolvedValue([ROW]);
    const { navigate } = setup({ search: "" });
    await waitFor(() => expect(navigate).toHaveBeenCalledTimes(1));
    expect(navigate).toHaveBeenCalledWith({
      to: "/legal/accept",
      search: { next: "/account" },
      replace: true,
    });
  });
  it("at /legal/accept?next=%2Faccount does not navigate, and a change of search alone never does", async () => {
    status.mockResolvedValue([ROW]);
    const { navigate, view } = setup({ pathname: "/legal/accept", search: "?next=%2Faccount" });
    await waitFor(() => expect(status).toHaveBeenCalled());
    await new Promise((r) => setTimeout(r, 20));
    view.rerender({ pathname: "/legal/accept", search: "?next=%2Faccount%3Fnext%3D%252Faccount" });
    await new Promise((r) => setTimeout(r, 20));
    expect(navigate).not.toHaveBeenCalled();
  });
  it("asks for terms and privacy and sends a non-exempt page to the screen with next", async () => {
    status.mockResolvedValue([ROW]);
    const { navigate } = setup({});
    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith({
        to: "/legal/accept",
        search: { next: "/account?tab=1" },
        replace: true,
      }),
    );
    expect(status).toHaveBeenCalledWith(["terms", "privacy"]);
  });
  it("leaves an exempt page where it is", async () => {
    status.mockResolvedValue([ROW]);
    const { navigate } = setup({ pathname: "/terms", search: "" });
    await waitFor(() => expect(status).toHaveBeenCalled());
    await new Promise((r) => setTimeout(r, 20));
    expect(navigate).not.toHaveBeenCalled();
  });
  it("redirects nobody on an empty answer", async () => {
    status.mockResolvedValue([]);
    const { navigate } = setup({});
    await waitFor(() => expect(status).toHaveBeenCalled());
    await new Promise((r) => setTimeout(r, 20));
    expect(navigate).not.toHaveBeenCalled();
  });
  it("redirects nobody on a failed read, and logs it", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    status.mockRejectedValue(new Error("boom"));
    const { navigate } = setup({});
    await waitFor(() => expect(log).toHaveBeenCalledWith("[client-error] legal gate read failed"));
    expect(navigate).not.toHaveBeenCalled();
  });
});
