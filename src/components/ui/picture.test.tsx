import { fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PICTURE_FRAME_CLASS, PICTURE_IMAGE_CLASS, Picture } from "./picture";

const PHOTO = "https://staging.example/storage/v1/object/public/listing-photos/p1/card.webp";
const OTHER = "https://staging.example/storage/v1/object/public/listing-photos/p2/card.webp";

describe("Picture — the one frame-and-image rule (INC-1121)", () => {
  it("PIC-1 the image is placed over its frame (absolute, inset 0, 100 % × 100 %), never sized in flow", () => {
    render(
      <Picture
        src={PHOTO}
        fit="cover"
        className="h-12 w-16"
        frameTestId="pic-1-frame"
        imgTestId="pic-1-img"
      />,
    );
    const frame = screen.getByTestId("pic-1-frame");
    const image = screen.getByTestId("pic-1-img");
    expect(PICTURE_IMAGE_CLASS).toBe("absolute inset-0 block h-full w-full");
    expect(PICTURE_FRAME_CLASS).toBe("relative overflow-hidden");
    expect(image).toHaveClass("absolute", "inset-0", "block", "h-full", "w-full", "object-cover");
    expect(frame).toHaveClass("relative", "overflow-hidden", "h-12", "w-16");
    expect(frame).toHaveAttribute("data-picture-frame", "cover");
    expect(image.parentElement).toBe(frame);
  });

  it("PIC-2 contain keeps the whole picture; the caller's frame class may place the frame absolutely", () => {
    render(
      <Picture
        src={PHOTO}
        fit="contain"
        className="absolute inset-0"
        frameTestId="pic-2-frame"
        imgTestId="pic-2-img"
        imgClassName="opacity-60"
      />,
    );
    const frame = screen.getByTestId("pic-2-frame");
    expect(frame).toHaveClass("absolute", "inset-0", "overflow-hidden");
    expect(frame).not.toHaveClass("relative");
    expect(frame).toHaveAttribute("data-picture-frame", "contain");
    expect(screen.getByTestId("pic-2-img")).toHaveClass("object-contain", "opacity-60");
  });

  it("PIC-3 a load that fails draws the empty-photo state in the frame; a new address draws again", () => {
    const { rerender } = render(
      <Picture src={PHOTO} fit="cover" frameTestId="pic-3-frame" imgTestId="pic-3-img" />,
    );
    fireEvent.error(screen.getByTestId("pic-3-img"));
    const frame = screen.getByTestId("pic-3-frame");
    expect(screen.queryByTestId("pic-3-img")).toBeNull();
    expect(frame).toHaveAttribute("data-picture-failed", "");
    expect(frame.querySelector("svg")).not.toBeNull();

    rerender(<Picture src={OTHER} fit="cover" frameTestId="pic-3-frame" imgTestId="pic-3-img" />);
    expect(screen.getByTestId("pic-3-img")).toHaveAttribute("src", OTHER);
    expect(screen.getByTestId("pic-3-frame")).not.toHaveAttribute("data-picture-failed");
  });

  it("PIC-4 no address draws the empty-photo state; overlays sit inside the frame", () => {
    render(
      <Picture src={null} fit="contain" frameTestId="pic-4-frame" imgTestId="pic-4-img">
        <span data-testid="pic-4-badge" />
      </Picture>,
    );
    const frame = screen.getByTestId("pic-4-frame");
    expect(screen.queryByTestId("pic-4-img")).toBeNull();
    expect(frame.querySelector("svg")).not.toBeNull();
    expect(frame).not.toHaveAttribute("data-picture-failed");
    expect(screen.getByTestId("pic-4-badge").parentElement).toBe(frame);
  });

  it("PIC-5 the attributes pass through, and the server draws the same markup as the first client paint", () => {
    const element = (
      <Picture
        src={PHOTO}
        fit="contain"
        alt="the ad's photo"
        width={480}
        height={360}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        srcSet={`${PHOTO} 480w`}
        sizes="100vw"
        draggable={false}
        imgTestId="pic-5-img"
      />
    );
    const html = renderToString(element);
    expect(html).toContain("absolute inset-0 block h-full w-full object-contain");
    expect(html).not.toContain("data-picture-failed");
    render(element);
    const image = screen.getByTestId("pic-5-img");
    expect(image).toHaveAttribute("alt", "the ad's photo");
    expect(image).toHaveAttribute("width", "480");
    expect(image).toHaveAttribute("height", "360");
    expect(image).toHaveAttribute("loading", "eager");
    expect(image).toHaveAttribute("fetchpriority", "high");
    expect(image).toHaveAttribute("decoding", "async");
    expect(image).toHaveAttribute("srcset", `${PHOTO} 480w`);
    expect(image).toHaveAttribute("sizes", "100vw");
    expect(image).toHaveAttribute("draggable", "false");
  });
});

describe("Picture — a picture that cannot draw keeps its text (INC-1131)", () => {
  it("PIC-6 a failed load with an alt: the empty-photo state is the image, labelled by the alt", () => {
    render(<Picture src={PHOTO} fit="cover" alt="the ad's photo" frameTestId="pic-6-frame" />);
    const frame = screen.getByTestId("pic-6-frame");
    const image = frame.querySelector("img");
    expect(image).not.toBeNull();
    if (image !== null) fireEvent.error(image);
    expect(frame).toHaveAttribute("data-picture-failed", "");
    expect(screen.getByRole("img", { name: "the ad's photo" }).parentElement).toBe(frame);
  });

  it("PIC-7 a failed load with an empty alt stays decorative: nothing for a screen reader", () => {
    render(<Picture src={PHOTO} fit="cover" frameTestId="pic-7-frame" />);
    const frame = screen.getByTestId("pic-7-frame");
    const image = frame.querySelector("img");
    if (image !== null) fireEvent.error(image);
    expect(frame).toHaveAttribute("data-picture-failed", "");
    expect(screen.queryByRole("img")).toBeNull();
    expect(frame.querySelector("[aria-label]")).toBeNull();
  });

  it("PIC-8 no source with an alt: the empty-photo state is the image, labelled by the alt", () => {
    render(<Picture src={null} fit="contain" alt="the category's picture" />);
    expect(screen.getByRole("img", { name: "the category's picture" })).toBeInTheDocument();
  });
});
