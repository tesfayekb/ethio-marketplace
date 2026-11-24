import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Cursor bundle 6, decision 7 (ADC-1) — the shell's admin crumbs show what the page's own read filled
 * and ask NOTHING themselves: a staff session that has not used its second factor (the page's body is
 * not mounted behind the gate) makes no staff read in the shell and draws no failure — only the dash.
 * Seams (DEC-026): the four readers (the doors behind them) are mocked.
 */
const reads = vi.hoisted(() => ({
  readAdminListing: vi.fn(),
  listLanguages: vi.fn(),
  getUser: vi.fn(),
  getRole: vi.fn(),
}));
vi.mock("@/features/admin-listings/use-admin-listing", async (original) => {
  const real = await original<typeof import("@/features/admin-listings/use-admin-listing")>();
  return { ...real, readAdminListing: reads.readAdminListing };
});
vi.mock("@/features/admin/translations/translations-service", async (original) => {
  const real =
    await original<typeof import("@/features/admin/translations/translations-service")>();
  return { ...real, listLanguages: reads.listLanguages };
});
vi.mock("@/features/admin/users/admin-users-service", async (original) => {
  const real = await original<typeof import("@/features/admin/users/admin-users-service")>();
  return { ...real, getUser: reads.getUser };
});
vi.mock("@/features/admin/roles/roles-service", async (original) => {
  const real = await original<typeof import("@/features/admin/roles/roles-service")>();
  return { ...real, getRole: reads.getRole };
});
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: ReactNode }) => <a>{children}</a>,
}));

const { ADMIN_USERS_KEY } = await import("@/features/admin/users/use-admin-users");
const { AdminListingCrumb, AdminLanguageCrumb, AdminUserCrumb, AdminRoleCrumb } =
  await import("./admin-detail-crumbs");

function draw(node: ReactNode, client = new QueryClient()) {
  return render(<QueryClientProvider client={client}>{node}</QueryClientProvider>);
}

beforeEach(() => {
  for (const fn of Object.values(reads)) fn.mockReset();
});

describe("the shell's admin crumbs (decision 7)", () => {
  it("ADC-1 with nothing the page filled, each crumb draws its dash or its code and asks no door", () => {
    draw(
      <>
        <AdminListingCrumb listingId="l-1" link={false} />
        <AdminLanguageCrumb code="am" />
        <AdminUserCrumb userId="u-1" />
        <AdminRoleCrumb roleId="r-1" />
      </>,
    );
    expect(screen.getByTestId("breadcrumb-admin-listing").textContent).toBe("—");
    expect(screen.getByTestId("breadcrumb-admin-language").textContent).toBe("am");
    expect(screen.getByTestId("breadcrumb-admin-user").textContent).toBe("—");
    expect(screen.getByTestId("breadcrumb-admin-role").textContent).toBe("—");
    for (const fn of Object.values(reads)) expect(fn).not.toHaveBeenCalled();
  });

  it("ADC-2 a read the page already made is shown by the crumb, still with no read of its own", () => {
    const client = new QueryClient();
    client.setQueryData([...ADMIN_USERS_KEY, "detail", "u-1"], { displayName: "Abebe" });
    draw(<AdminUserCrumb userId="u-1" />, client);
    expect(screen.getByTestId("breadcrumb-admin-user").textContent).toBe("Abebe");
    expect(reads.getUser).not.toHaveBeenCalled();
  });
});
