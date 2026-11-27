import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

const reads = vi.hoisted(() => ({ countries: vi.fn(), places: vi.fn() }));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("@tanstack/react-router", () => ({ Link: () => null }));
vi.mock("@/features/admin/admin-context", () => ({
  useAdminShell: () => ({ permissions: ["locations:view", "countries:view"] }),
}));
// INC-1281 — the screens ask useMayCall, which reads the permissions read: the same list as the shell's.
vi.mock("@/features/permissions/usePermissions", async () => {
  const { useAdminShell } = await import("@/features/admin/admin-context");
  return {
    usePermissions: () => ({
      permissions: useAdminShell().permissions,
      loading: false,
      error: null,
    }),
  };
});
vi.mock("@/features/admin-countries/use-countries", () => ({
  useAdminCountries: reads.countries,
}));
vi.mock("@/features/admin-locations/use-locations", () => ({ useAdminLocations: reads.places }));
import { LocationsOverview } from "./locations-overview";

const failed = {
  data: undefined,
  isLoading: false,
  isError: true,
  error: new Error("x"),
  refetch: vi.fn(),
};

it("CNT-U2 the overview's two tiles draw no number for a failed read, and draw it once answered", () => {
  reads.countries.mockReturnValue(failed);
  reads.places.mockReturnValue(failed);
  const { rerender } = render(<LocationsOverview />);
  for (const id of ["overview-stat-markets", "overview-stat-places"]) {
    expect(screen.getByTestId(`${id}-failed`).textContent ?? "").not.toMatch(/\d/);
    expect(screen.queryByTestId(id)).toBeNull();
  }
  reads.countries.mockReturnValue({
    data: [{ isActive: true }, { isActive: false }],
    isLoading: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
  });
  reads.places.mockReturnValue({
    data: [{ level: "city", isActive: true }],
    isLoading: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
  });
  rerender(<LocationsOverview />);
  expect(screen.getByTestId("overview-stat-markets")).toHaveTextContent("1 · 1");
  expect(screen.getByTestId("overview-stat-places")).toHaveTextContent("1 · 1");
});
