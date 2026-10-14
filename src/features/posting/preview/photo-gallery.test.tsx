import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { GalleryPhoto } from "../photo-links";

import { PhotoGallery } from "./photo-gallery";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    entities: {},
  }),
}));

const link = (id: string, size: string) =>
  `https://staging.example/storage/v1/object/sign/listing-photos/default/u/l/${id}/${size}.webp?token=t`;

const photo = (id: string): GalleryPhoto => ({
  id,
  main: link(id, "card"),
  large: link(id, "cover"),
  thumb: link(id, "thumb"),
});

const THREE = [photo("p1"), photo("p2"), photo("p3")];

function mainImage() {
  const image = screen.getByTestId("gallery-main").querySelector("img");
  expect(image).not.toBeNull();
  return image!;
}

/** A finger (or a mouse) pressed at one x and lifted at another, as the page sees it. */
function drag(element: HTMLElement, fromX: number, toX: number) {
  fireEvent.pointerDown(element, { clientX: fromX, clientY: 100, pointerType: "touch" });
  fireEvent.pointerUp(element, { clientX: toX, clientY: 100, pointerType: "touch" });
}

/**
 * D161 (the operator, 2026-10-13) — the listing's photos as a gallery: the photo
 * shown large, the thumbnails beside or under it, a swipe and the arrows to
 * move, and a full-screen viewer on a tap.
 */
describe("PhotoGallery (D161)", () => {
  it("GAL-1 one photo: no arrows, no counter, no thumbnails; a tap opens the viewer at the cover size, and Close returns", () => {
    render(<PhotoGallery photos={[photo("p1")]} />);
    expect(mainImage()).toHaveAttribute("src", link("p1", "card"));
    expect(mainImage()).toHaveAttribute(
      "srcset",
      `${link("p1", "card")} 480w, ${link("p1", "cover")} 1600w`,
    );
    expect(screen.queryByTestId("gallery-previous")).toBeNull();
    expect(screen.queryByTestId("gallery-count")).toBeNull();
    expect(screen.queryByTestId("gallery-thumbs")).toBeNull();

    fireEvent.click(screen.getByTestId("gallery-main"));
    const viewer = screen.getByTestId("gallery-viewer");
    expect(within(viewer).getByTestId("gallery-viewer-image")).toHaveAttribute(
      "src",
      link("p1", "cover"),
    );
    expect(within(viewer).queryByTestId("gallery-viewer-thumbs")).toBeNull();
    fireEvent.click(within(viewer).getByTestId("gallery-viewer-close"));
    expect(screen.queryByTestId("gallery-viewer")).toBeNull();
    expect(screen.getByTestId("gallery-main")).toHaveFocus();
  });

  it("GAL-2 several photos: a counter, a thumbnail each at its thumb size; a thumbnail shows its photo; the arrows stop at the ends", () => {
    render(<PhotoGallery photos={THREE} />);
    expect(screen.getByTestId("gallery-count")).toHaveTextContent("1 / 3");
    const thumbs = screen.getAllByTestId("gallery-thumb");
    expect(thumbs).toHaveLength(3);
    expect(thumbs[1]!.querySelector("img")).toHaveAttribute("src", link("p2", "thumb"));
    expect(thumbs[0]).toHaveAttribute("aria-current", "true");
    expect(screen.getByTestId("gallery-previous")).toBeDisabled();
    // The button is named by what it does and described by the photo's place.
    expect(screen.getByTestId("gallery-main")).toHaveAccessibleName("post.gallery.enlarge");
    expect(screen.getByTestId("gallery-main")).toHaveAccessibleDescription(
      "post.preview.photoCount",
    );

    fireEvent.click(thumbs[2]!);
    expect(screen.getByTestId("gallery-count")).toHaveTextContent("3 / 3");
    expect(mainImage()).toHaveAttribute("src", link("p3", "card"));
    expect(screen.getAllByTestId("gallery-thumb")[2]).toHaveAttribute("aria-current", "true");
    expect(screen.getAllByTestId("gallery-thumb")[0]).not.toHaveAttribute("aria-current");
    expect(screen.getByTestId("gallery-next")).toBeDisabled();

    fireEvent.click(screen.getByTestId("gallery-previous"));
    expect(screen.getByTestId("gallery-count")).toHaveTextContent("2 / 3");
    expect(screen.getByTestId("gallery-next")).toBeEnabled();
  });

  it("GAL-3 a swipe moves one photo and opens nothing; a short tap opens the viewer; a swipe past the end stays", () => {
    render(<PhotoGallery photos={THREE} />);
    const main = screen.getByTestId("gallery-main");

    drag(main, 300, 200);
    fireEvent.click(main);
    expect(screen.getByTestId("gallery-count")).toHaveTextContent("2 / 3");
    expect(screen.queryByTestId("gallery-viewer")).toBeNull();

    drag(main, 200, 300);
    fireEvent.click(main);
    expect(screen.getByTestId("gallery-count")).toHaveTextContent("1 / 3");
    drag(main, 200, 300);
    expect(screen.getByTestId("gallery-count")).toHaveTextContent("1 / 3");

    // An up-and-down move is the page scrolling, not a swipe, and not a tap.
    fireEvent.pointerDown(main, { clientX: 200, clientY: 100, pointerType: "touch" });
    fireEvent.pointerUp(main, { clientX: 230, clientY: 260, pointerType: "touch" });
    fireEvent.click(main);
    expect(screen.getByTestId("gallery-count")).toHaveTextContent("1 / 3");
    expect(screen.queryByTestId("gallery-viewer")).toBeNull();

    drag(main, 200, 203);
    fireEvent.click(main);
    expect(screen.getByTestId("gallery-viewer")).toBeInTheDocument();
  });

  it("GAL-4 the viewer: arrow keys and its arrows move, a double click zooms, Escape closes the viewer only", () => {
    const sheetEscape = vi.fn();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") sheetEscape();
    };
    // The preview sheet closes on a document keydown listener of its own.
    document.addEventListener("keydown", onKey);
    try {
      render(<PhotoGallery photos={THREE} />);
      fireEvent.click(screen.getByTestId("gallery-main"));
      const viewer = screen.getByTestId("gallery-viewer");
      expect(within(viewer).getByTestId("gallery-viewer-close")).toHaveFocus();
      expect(within(viewer).getAllByTestId("gallery-thumb")).toHaveLength(3);

      fireEvent.keyDown(document.activeElement ?? document.body, { key: "ArrowRight" });
      expect(within(viewer).getByTestId("gallery-viewer-count")).toHaveTextContent("2 / 3");
      fireEvent.click(within(viewer).getByTestId("gallery-viewer-next"));
      expect(within(viewer).getByTestId("gallery-viewer-count")).toHaveTextContent("3 / 3");
      expect(within(viewer).getByTestId("gallery-viewer-image")).toHaveAttribute(
        "src",
        link("p3", "cover"),
      );
      fireEvent.keyDown(document.activeElement ?? document.body, { key: "ArrowLeft" });
      expect(within(viewer).getByTestId("gallery-viewer-count")).toHaveTextContent("2 / 3");

      const image = within(viewer).getByTestId("gallery-viewer-image");
      expect(image).not.toHaveClass("scale-200");
      fireEvent.doubleClick(image);
      expect(image).toHaveClass("scale-200");
      // A zoomed photo is panned, not swiped away.
      drag(image, 300, 100);
      expect(within(viewer).getByTestId("gallery-viewer-count")).toHaveTextContent("2 / 3");

      fireEvent.keyDown(document.activeElement ?? document.body, { key: "Escape" });
      expect(screen.queryByTestId("gallery-viewer")).toBeNull();
      expect(sheetEscape).not.toHaveBeenCalled();
      expect(screen.getByTestId("gallery-count")).toHaveTextContent("2 / 3");
    } finally {
      document.removeEventListener("keydown", onKey);
    }
  });
});

/**
 * D158 (bundle 13 turn 6) — a photo held while photo screening was off is marked
 * in staff's preview only; a buyer's or the seller's gallery shows no mark.
 */
describe("PhotoGallery — a held photo (D158)", () => {
  it("GAL-5 staff's preview marks the held photo it shows, and only when asked", () => {
    const held: GalleryPhoto = { ...photo("p2"), unscreened: true };
    const { unmount } = render(<PhotoGallery photos={[photo("p1"), held]} markUnscreened />);
    expect(screen.queryByTestId("gallery-unscreened")).toBeNull();
    fireEvent.click(screen.getByTestId("gallery-next"));
    expect(screen.getByTestId("gallery-unscreened").textContent).toBe("post.gallery.unscreened");
    unmount();

    render(<PhotoGallery photos={[held]} />);
    expect(screen.queryByTestId("gallery-unscreened")).toBeNull();
  });
});
