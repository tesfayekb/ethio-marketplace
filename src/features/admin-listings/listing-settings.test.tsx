import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

const calls = vi.hoisted(() => ({ write: vi.fn() }));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key }) }));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        maybeSingle: async () => ({ data: { renew_allowed: true, renew_days: 30 }, error: null }),
      }),
    }),
    rpc: calls.write,
  },
}));
vi.mock("@/components/ui/category-modal", () => ({
  CategoryModal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));
vi.mock("@/lib/refresh-after-write", () => ({ refreshAfterWrite: vi.fn() }));

import { ListingSettings } from "./listing-settings";

describe("settings field rules", () => {
  it("KFC2-5 refused days hold the write; corrected days reach the existing door", async () => {
    calls.write.mockResolvedValue({ error: null });
    const guard = vi.fn(async (run: () => Promise<void>) => run());
    const onSaved = vi.fn();
    render(
      <QueryClientProvider
        client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
      >
        <ListingSettings guard={guard} onSaved={onSaved} />
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByTestId("listings-settings"));
    const days = await screen.findByTestId("listings-settings-days");
    fireEvent.change(days, { target: { value: "0" } });
    fireEvent.click(screen.getByTestId("listings-settings-save"));
    expect(guard).not.toHaveBeenCalled();
    expect(calls.write).not.toHaveBeenCalled();
    expect(days.getAttribute("aria-invalid")).toBe("true");
    expect(days.getAttribute("aria-describedby")?.split(" ")).toContain(
      "listings-settings-problem",
    );
    fireEvent.change(days, { target: { value: "365" } });
    fireEvent.click(screen.getByTestId("listings-settings-save"));
    await waitFor(() => expect(onSaved).toHaveBeenCalledTimes(1));
    expect(calls.write).toHaveBeenCalledWith("admin_set_listing_policy", {
      p_renew_allowed: true,
      p_renew_days: 365,
    });
  });
});
