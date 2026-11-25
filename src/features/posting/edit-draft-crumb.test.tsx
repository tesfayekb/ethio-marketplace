import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { expect, it, vi } from "vitest";

/** A planted answer of `admin_listing_detail` (no real row), read by the console's own parser. */
const ANSWER = {
  listing: { id: "l-1", title: "Planted fridge", status: "active", category_id: "leaf-1" },
  channels: { phone: true },
};
const rpc = vi.hoisted(() => vi.fn());
vi.mock("@/integrations/supabase/client", () => ({ supabase: { rpc } }));
vi.mock("./posting-service", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./posting-service")>();
  return { ...actual, readStaffPhotos: vi.fn(async () => []) };
});

const { adminListingKey, useAdminListing } =
  await import("@/features/admin-listings/use-admin-listing");
const { useEditDraft } = await import("./use-edit-draft");

it("EDR-1 INC-1292 the staff Edit reads the ad once, and the crumb's cache holds exactly what useAdminListing caches for the same answer", async () => {
  rpc.mockImplementation(async () => ({ data: ANSWER, error: null }));
  const page = new QueryClient();
  const draft = renderHook(() =>
    useEditDraft("l-1", {
      actor: "admin",
      onStaffRead: (detail) => page.setQueryData(adminListingKey("l-1"), detail),
    }),
  );
  await waitFor(() => expect(draft.result.current.loading).toBe(false));
  const reads = rpc.mock.calls.filter(([door]) => door === "admin_listing_detail");
  expect(reads).toHaveLength(1);

  const consoleCache = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={consoleCache}>{children}</QueryClientProvider>
  );
  const own = renderHook(() => useAdminListing("l-1"), { wrapper });
  await waitFor(() => expect(own.result.current.data).toBeDefined());
  expect(page.getQueryData(adminListingKey("l-1"))).toEqual(own.result.current.data);
});
