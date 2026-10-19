import { fireEvent, render, screen } from "@testing-library/react";
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

it("LP-11 crop fills the card with a tall seller photo; default and category pictures keep their whole shape", () => {
  const loadTall = (image: HTMLElement) => {
    Object.defineProperties(image, {
      naturalWidth: { configurable: true, value: 600 },
      naturalHeight: { configurable: true, value: 1200 },
    });
    fireEvent.load(image);
  };
  const { rerender } = render(
    <ListingPicture photoUrl={PHOTO} categoryUrl={null} imgTestId="lp-11-img" crop />,
  );
  loadTall(screen.getByTestId("lp-11-img"));
  const frame = screen.getByTestId("lp-11-img-frame");
  expect(frame.style.aspectRatio).toBe("");
  expect(frame.style.width).toBe("100%");
  expect(frame.style.height).toBe("100%");
  expect(screen.getByTestId("lp-11-img")).toHaveClass("object-cover");

  rerender(<ListingPicture photoUrl={PHOTO} categoryUrl={null} imgTestId="lp-11-img" />);
  loadTall(screen.getByTestId("lp-11-img"));
  expect(frame.style.aspectRatio).toBe("0.5 / 1");
  expect(frame.style.width).toBe("min(100cqw, 37.5cqw)");
  expect(frame.style.height).toBe("");
  expect(screen.getByTestId("lp-11-img")).toHaveClass("object-contain");

  rerender(<ListingPicture photoUrl={null} categoryUrl={PHOTO} imgTestId="lp-11-img" crop />);
  loadTall(screen.getByTestId("lp-11-img"));
  expect(frame.style.aspectRatio).toBe("0.5 / 1");
  expect(frame.style.width).toBe("min(100cqw, 37.5cqw)");
  expect(frame.style.height).toBe("");
  expect(screen.getByTestId("lp-11-img")).toHaveClass("object-contain");
  rerender(<ListingPicture photoUrl={null} categoryUrl={null} imgTestId="lp-11-img" crop />);
  expect(screen.queryByTestId("lp-11-img")).toBeNull();
  expect(frame.style.aspectRatio).toBe("");
  expect(frame.style.width).toBe("100%");
  expect(frame.style.height).toBe("100%");
});
