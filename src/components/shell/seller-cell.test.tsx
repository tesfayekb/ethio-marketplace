import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { SellerCell } from "./seller-cell";
import { FilterPanelBody } from "./filter-panel-body";
import { useSellerFilter } from "./use-seller-filter";

vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key }) }));

it("SLR-U1 the shared seller cell uses business name before alias and only the answered email", () => {
  const { rerender } = render(
    <SellerCell sellerAlias="alias" sellerBusinessName="Business" sellerEmail={null} />,
  );
  expect(screen.getByText("Business")).toBeInTheDocument();
  expect(screen.queryByText("alias")).toBeNull();
  rerender(
    <SellerCell sellerAlias="alias" sellerBusinessName={null} sellerEmail="seller@example.test" />,
  );
  expect(screen.getByText("alias")).toBeInTheDocument();
  expect(screen.getByText("seller@example.test")).toBeInTheDocument();
});
it.each([true, false])(
  "SLR-U2 the shared Seller row uses the held email permission %s and never keeps typed text",
  (mayReadEmail) => {
    const change = vi.fn();
    const { result } = renderHook(() => useSellerFilter("seller", "", change, mayReadEmail));
    expect(result.current.kept).toBe(false);
    expect(result.current.placeholder).toBe(
      mayReadEmail
        ? "admin.listings.filter.sellerPlaceholderEmail"
        : "admin.listings.filter.sellerPlaceholder",
    );
    render(
      <FilterPanelBody
        filters={[{ ...result.current, clear: vi.fn(), changed: vi.fn() }]}
        words={{ all: "All", search: "Search", none: "None", max: "Max" }}
      />,
    );
    fireEvent.change(screen.getByTestId("seller"), { target: { value: "seller" } });
    expect(change).toHaveBeenCalledWith("seller");
  },
);
