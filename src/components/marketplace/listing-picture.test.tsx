import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ListingPicture, PhotoRibbon } from "./listing-picture";

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
  expect(frame.style.width).toBe("calc(37.5cqw)");
  expect(frame.style.height).toBe("");
  expect(screen.getByTestId("lp-11-img")).toHaveClass("object-contain");

  rerender(<ListingPicture photoUrl={null} categoryUrl={PHOTO} imgTestId="lp-11-img" crop />);
  loadTall(screen.getByTestId("lp-11-img"));
  expect(frame.style.aspectRatio).toBe("0.5 / 1");
  expect(frame.style.width).toBe("calc(37.5cqw)");
  expect(frame.style.height).toBe("");
  expect(screen.getByTestId("lp-11-img")).toHaveClass("object-contain");
  rerender(<ListingPicture photoUrl={null} categoryUrl={null} imgTestId="lp-11-img" crop />);
  expect(screen.queryByTestId("lp-11-img")).toBeNull();
  expect(frame.style.aspectRatio).toBe("");
  expect(frame.style.width).toBe("100%");
  expect(frame.style.height).toBe("100%");
});

it("LP-14 the image is placed over its frame (INC-1121), and a load that fails draws the placeholder in the frame", () => {
  render(
    <ListingPicture
      photoUrl={PHOTO}
      categoryUrl={null}
      imgTestId="lp-14-img"
      crop
      fill
      ribbon="Sold"
    />,
  );
  const image = screen.getByTestId("lp-14-img");
  const frame = screen.getByTestId("lp-14-img-frame");
  expect(image.parentElement).toBe(frame);
  expect(image).toHaveClass("absolute", "inset-0", "h-full", "w-full", "object-cover");
  expect(image).not.toHaveClass("relative");
  expect(frame).toHaveClass("@container", "relative", "overflow-hidden");

  fireEvent.error(image);
  expect(screen.queryByTestId("lp-14-img")).toBeNull();
  expect(frame).toHaveAttribute("data-picture-failed", "");
  expect(frame.querySelector("svg")).not.toBeNull();
  expect(screen.getByTestId("listing-ribbon").parentElement).toBe(frame);
});

it("LP-12 a corner mark sits on the box itself, outside the picture's clip layer (S5)", () => {
  render(
    <ListingPicture
      photoUrl={null}
      categoryUrl={null}
      boxTestId="lp-12-box"
      corner={<span data-testid="lp-12-corner" />}
    />,
  );
  const corner = screen.getByTestId("lp-12-corner");
  expect(corner.parentElement).toBe(screen.getByTestId("lp-12-box"));
});

it("LP-13 PhotoRibbon clips the band to the frame's corners and keeps its rolled caps outside the clip (S5)", () => {
  render(<PhotoRibbon text="SOLD" palette="gold" className="inset-0" rounded="rounded-row" />);
  const band = screen.getByTestId("listing-ribbon");
  expect(band).toHaveAttribute("data-ribbon", "gold");
  const clip = band.parentElement;
  expect(clip).toHaveClass("overflow-hidden", "rounded-row");
  const ends = screen.getByTestId("listing-ribbon-ends");
  expect(ends).toHaveAttribute("data-ribbon", "gold");
  expect(clip?.contains(ends)).toBe(false);
  const frame = clip?.parentElement;
  expect(frame).toBe(ends.parentElement);
  expect(frame).toHaveClass("@container", "absolute", "inset-0");
  expect(frame).not.toHaveClass("overflow-hidden");
  expect(frame).toHaveAttribute("aria-hidden", "true");
});
