import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ListingPicture } from "./listing-picture";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    entities: {},
  }),
}));

const PHOTO =
  "https://staging.example/storage/v1/object/sign/listing-photos/default/u/l/p1/card.webp?token=a";

/** DEC-195 — LP-10: the grid's first cards load at once, the rest lazily. */
describe("ListingPicture — the loading priority (DEC-195)", () => {
  it("LP-10 priority gives loading eager and a high fetch priority; without it the picture loads lazily; both decode async", () => {
    const { unmount } = render(
      <ListingPicture photoUrl={PHOTO} categoryUrl={null} imgTestId="lp-1-img" priority />,
    );
    const eager = screen.getByTestId("lp-1-img");
    expect(eager).toHaveAttribute("loading", "eager");
    expect(eager).toHaveAttribute("fetchpriority", "high");
    expect(eager).toHaveAttribute("decoding", "async");
    unmount();

    render(<ListingPicture photoUrl={PHOTO} categoryUrl={null} imgTestId="lp-1-img" />);
    const lazy = screen.getByTestId("lp-1-img");
    expect(lazy).toHaveAttribute("loading", "lazy");
    expect(lazy).not.toHaveAttribute("fetchpriority", "high");
    expect(lazy).toHaveAttribute("decoding", "async");
  });
});
