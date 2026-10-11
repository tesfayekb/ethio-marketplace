import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";

import { useSettling } from "./use-settling";

/** Bundle 11, turn G3c (INC-558's class) — a read that is settling. */
describe("useSettling", () => {
  const harness = () => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
    return { client, wrapper };
  };

  it("US-1 true while a read under the key is fetching, false once it settles; another key does not count", async () => {
    const { wrapper } = harness();
    let release: (value: string) => void = () => undefined;
    const hook = renderHook(
      () => {
        useQuery({
          queryKey: ["root", "admin", "things", "list"],
          queryFn: () => new Promise<string>((resolve) => (release = resolve)),
        });
        return {
          mine: useSettling(["root", "admin", "things"]),
          other: useSettling(["root", "admin", "others"]),
        };
      },
      { wrapper },
    );
    await waitFor(() => expect(hook.result.current.mine).toBe(true));
    expect(hook.result.current.other).toBe(false);
    act(() => release("done"));
    await waitFor(() => expect(hook.result.current.mine).toBe(false));
  });

  it("US-2 true while a write keyed to the read is in flight", async () => {
    const { wrapper } = harness();
    let release: () => void = () => undefined;
    const hook = renderHook(
      () => {
        const write = useMutation({
          mutationKey: ["root", "admin", "things"],
          mutationFn: () => new Promise<void>((resolve) => (release = resolve)),
        });
        return { write, settling: useSettling(["root", "admin", "things"]) };
      },
      { wrapper },
    );
    expect(hook.result.current.settling).toBe(false);
    act(() => hook.result.current.write.mutate());
    await waitFor(() => expect(hook.result.current.settling).toBe(true));
    act(() => release());
    await waitFor(() => expect(hook.result.current.settling).toBe(false));
  });
});
