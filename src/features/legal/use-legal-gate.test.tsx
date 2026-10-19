import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
  renderHook(
    () =>
      useLegalGate({
        user: { id: "u1" },
        signingOut: false,
        pathname: "/account",
        search: "?tab=1",
        navigate,
        ...props,
      }),
    { wrapper },
  );
  return { navigate };
}
beforeEach(() => {
  status.mockClear();
});
afterEach(() => vi.restoreAllMocks());

describe("useLegalGate", () => {
  it("reads nothing while signed out or signing out", async () => {
    setup({ user: null });
    setup({ signingOut: true });
    await new Promise((r) => setTimeout(r, 20));
    expect(status).not.toHaveBeenCalled();
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
