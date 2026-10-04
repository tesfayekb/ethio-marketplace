import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

/**
 * Bundle 3 step 20 — the shared seller line draws exactly the facts it is given:
 * business name over the public name, "previously" only when the door returns
 * one, and member since as month and year in the reader's language.
 */

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) =>
      key === "post.seller.previously"
        ? "Previously {name}"
        : key === "post.seller.memberSince"
          ? "Member since {date}"
          : key,
    language: "en",
  }),
}));

const { SellerLine } = await import("./seller-line");

describe("SellerLine", () => {
  it("draws a person's name, the previous name and member since", () => {
    render(
      <SellerLine
        alias="abebephones"
        businessName={null}
        previousAlias="abebe_old"
        memberSince="2026-03-15T10:00:00Z"
        testId="s"
      />,
    );
    expect(screen.getByTestId("s-name").textContent).toBe("abebephones");
    expect(screen.queryByTestId("s-alias")).toBeNull();
    expect(screen.getByTestId("s-previous").textContent).toBe("Previously abebe_old");
    expect(screen.getByTestId("s-since").textContent).toBe("Member since March 2026");
  });

  it("puts a business name first and shows no previous line when there is none", () => {
    render(
      <SellerLine
        alias="hanastore"
        businessName="Hana Boutique"
        previousAlias={null}
        memberSince={null}
        testId="b"
      />,
    );
    expect(screen.getByTestId("b-name").textContent).toBe("Hana Boutique");
    expect(screen.getByTestId("b-alias").textContent).toBe("hanastore");
    expect(screen.queryByTestId("b-previous")).toBeNull();
    expect(screen.queryByTestId("b-since")).toBeNull();
  });
});
