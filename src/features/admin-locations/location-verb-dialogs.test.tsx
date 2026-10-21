import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";

import type { LocationNode } from "./locations-service";
import { listLocations, reorderLocations } from "./locations-service";
import { LocationReorderDialog } from "./location-verb-dialogs";
import { useAdminLocations } from "./use-locations";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

vi.mock("@/features/admin-categories/category-dialogs", () => ({
  CategoryModal: ({ children, testid }: { children: ReactNode; testid: string }) => (
    <div data-testid={testid}>{children}</div>
  ),
}));

vi.mock("./locations-service", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./locations-service")>()),
  listLocations: vi.fn(),
  reorderLocations: vi.fn(),
}));

const guard: GuardFn = (action) => Promise.resolve(action());

function place(id: string, slug: string, displayOrder: number): LocationNode {
  return {
    id,
    parentId: "parent-1",
    level: "city",
    countryCode: "ET",
    regionId: null,
    cityId: null,
    slug,
    nameEn: slug,
    iso: null,
    aliases: [],
    displayOrder,
    centerLat: null,
    centerLng: null,
    isActive: true,
    source: "test",
    path: `Ethiopia › ${slug}`,
    childCount: 0,
    depth: 1,
    key: `ethiopia/${slug}`,
  };
}

/** The console page's own read, so the test can count the re-reads. */
function RosterProbe() {
  useAdminLocations("ET");
  return null;
}

describe("LocationReorderDialog (INC-814)", () => {
  it("a save refused notAChild re-reads the roster and drops the unsaved order", async () => {
    const peers = [place("loc-a", "adama", 1), place("loc-b", "bishoftu", 2)];
    vi.mocked(listLocations).mockResolvedValue(peers);
    vi.mocked(reorderLocations).mockRejectedValue({
      message: "notAChild",
      code: "P0001",
      details: null,
      hint: null,
    });

    render(
      <QueryClientProvider
        client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
      >
        <RosterProbe />
        <LocationReorderDialog row={peers[0]!} roster={peers} guard={guard} onClose={() => {}} />
      </QueryClientProvider>,
    );

    // The dialog's open re-read the roster (the probe's first read + the
    // dialog's refresh), then a swap gave the draft order [bishoftu, adama].
    await waitFor(() => expect(vi.mocked(listLocations)).toHaveBeenCalledTimes(2));
    fireEvent.click(screen.getByTestId("location-reorder-up-1"));
    expect(screen.getByTestId("location-reorder-item-0")).toHaveTextContent("bishoftu");

    fireEvent.click(screen.getByTestId("location-reorder-submit"));

    // The refusal is a plain object, not an Error: the branch must still run.
    // (Probe's first read, the dialog's open refresh, the mutation's own
    // settled refresh, then the refusal's re-read.)
    await waitFor(() => expect(vi.mocked(listLocations)).toHaveBeenCalledTimes(4));
    // The unsaved order is dropped: the list shows the read's own order again.
    await waitFor(() =>
      expect(screen.getByTestId("location-reorder-item-0")).toHaveTextContent("adama"),
    );
    expect(screen.getByTestId("location-reorder-item-1")).toHaveTextContent("bishoftu");
  });
});
