import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AssetsPreview } from "./category-image-dialog";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

const ASSETS = {
  imageUrl: "https://x.example/card.webp",
  thumbUrl: "https://x.example/thumb.webp",
  ogUrl: "https://x.example/og.png",
};

/**
 * The pictures turn (INC-1121) — a category's three pictures are drawn through Picture, each whole
 * (`contain`) in a frame of its asset's ratio: the card and the thumb 4:3 (640 × 480, 160 × 120),
 * the share picture 1200 × 630; a failed load shows the empty-photo state in its frame.
 */
describe("AssetsPreview pictures (INC-1121)", () => {
  it("CIG-1 each asset is a contain Picture in a frame of its ratio; a failed load shows the empty-photo state", () => {
    render(<AssetsPreview assets={ASSETS} testid="assets" />);
    const frames = {
      card: "aspect-[4/3] w-40",
      thumb: "aspect-[4/3] w-16",
      og: "aspect-[40/21] w-full max-w-xs",
    };
    for (const [name, size] of Object.entries(frames)) {
      const img = screen.getByTestId(`assets-${name}`);
      expect(img).toHaveAttribute("alt", `admin.categories.image.${name}`);
      expect(img).toHaveAttribute("loading", "lazy");
      expect(img).toHaveClass("absolute", "inset-0", "h-full", "w-full", "object-contain");
      const frame = img.parentElement;
      expect(frame).toHaveAttribute("data-picture-frame", "contain");
      expect(frame).toHaveClass("relative", "overflow-hidden", ...size.split(" "));
    }
    expect(screen.getByTestId("assets-card")).toHaveAttribute("src", ASSETS.imageUrl);
    expect(screen.getByTestId("assets-thumb")).toHaveAttribute("src", ASSETS.thumbUrl);
    expect(screen.getByTestId("assets-og")).toHaveAttribute("src", ASSETS.ogUrl);

    const og = screen.getByTestId("assets-og");
    const frame = og.parentElement;
    fireEvent.error(og);
    expect(screen.queryByTestId("assets-og")).toBeNull();
    expect(frame).toHaveAttribute("data-picture-failed", "");
    expect(frame?.querySelector("svg")).not.toBeNull();
    expect(screen.getByTestId("assets-card")).toBeVisible();
  });
});
