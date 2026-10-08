import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DataTablePagination, pageWindow } from "./data-table";

/** BUNDLE 9 B3 — the page run and the pager's two optional controls. */
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children }: { children?: React.ReactNode }) => <span>{children}</span>,
}));

describe("pageWindow", () => {
  it("count 1 is one page", () => {
    expect(pageWindow(0, 1)).toEqual([1]);
  });
  it("count 7 is all seven", () => {
    expect(pageWindow(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
  it("count 12 at the first page", () => {
    expect(pageWindow(0, 12)).toEqual([1, 2, "gap", 12]);
  });
  it("count 12 in the middle", () => {
    expect(pageWindow(4, 12)).toEqual([1, "gap", 4, 5, 6, "gap", 12]);
  });
  it("count 12 at the last page", () => {
    expect(pageWindow(11, 12)).toEqual([1, "gap", 11, 12]);
  });
});

function pager(props: Partial<React.ComponentProps<typeof DataTablePagination>> = {}) {
  return render(
    <DataTablePagination
      offset={0}
      pageSize={25}
      total={300}
      onPrevious={() => {}}
      onNext={() => {}}
      {...props}
    />,
  );
}

describe("DataTablePagination", () => {
  it("draws no page button and no size control without the new props", () => {
    pager();
    expect(screen.queryByTestId("data-table-pagination-page-1")).toBeNull();
    expect(screen.queryByTestId("data-table-pagination-size")).toBeNull();
  });

  it("draws the run with aria-current and calls onPage zero-based", () => {
    const onPage = vi.fn();
    pager({ offset: 25, onPage });
    expect(screen.getByTestId("data-table-pagination-page-2")).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByTestId("data-table-pagination-page-1")).not.toHaveAttribute("aria-current");
    fireEvent.click(screen.getByTestId("data-table-pagination-page-12"));
    expect(onPage).toHaveBeenCalledWith(11);
  });

  it("the size control calls onPageSize with a number", () => {
    const onPageSize = vi.fn();
    pager({ pageSizeOptions: [10, 25, 50], onPageSize });
    fireEvent.change(screen.getByTestId("data-table-pagination-size"), {
      target: { value: "50" },
    });
    expect(onPageSize).toHaveBeenCalledWith(50);
  });
});
