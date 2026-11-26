import { onlineManager, QueryClient, QueryClientContext } from "@tanstack/react-query";
import { act, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/i18n/i18n-context", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));

const { OfflineLine } = await import("./offline-line");
const { OnDemandNotice } = await import("./on-demand-notice");

const never = () => new Promise<never>(() => undefined);

afterEach(() => onlineManager.setOnline(true));

/** A client with one read in flight, so that it pauses the moment the device goes offline. */
function withRead(): { client: QueryClient; wrap: (node: ReactNode) => ReactNode } {
  const client = new QueryClient();
  return {
    client,
    wrap: (node) => (
      <QueryClientContext.Provider value={client}>{node}</QueryClientContext.Provider>
    ),
  };
}

describe("the shell says offline once (INC-1286)", () => {
  it("OFL-1 nothing while online or while no read waits; the words while offline with a paused read; gone when back", async () => {
    const { client, wrap } = withRead();
    render(wrap(<OfflineLine />));
    expect(screen.queryByTestId("shell-offline")).toBeNull();
    onlineManager.setOnline(false);
    await act(async () => undefined);
    expect(screen.queryByTestId("shell-offline")).toBeNull();
    void client.prefetchQuery({ queryKey: ["waiting"], queryFn: never });
    await vi.waitFor(() =>
      expect(screen.getByTestId("shell-offline").textContent).toBe("shell.offline"),
    );
    act(() => onlineManager.setOnline(true));
    await vi.waitFor(() => expect(screen.queryByTestId("shell-offline")).toBeNull());
    client.clear();
  });

  it("OFL-2 the dock carries it above the download notice and adds no role", async () => {
    const { client, wrap } = withRead();
    render(wrap(<OnDemandNotice />));
    onlineManager.setOnline(false);
    void client.prefetchQuery({ queryKey: ["waiting"], queryFn: never });
    await vi.waitFor(() => expect(screen.getByTestId("shell-offline")).toBeTruthy());
    expect(screen.queryAllByRole("status")).toHaveLength(0);
    client.clear();
  });
});
