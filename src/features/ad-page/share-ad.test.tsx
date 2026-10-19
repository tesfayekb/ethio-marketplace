import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
const countShare = vi.hoisted(() => vi.fn());
vi.mock("./count-view", () => ({ countShare }));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => ownValue(en, key) ?? key }) }));
import { ShareAd } from "./share-ad";
const props = {
  publicId: "2345678923",
  canonicalPath: "/l/scratch-2345678923",
  title: "Scratch",
  priceText: "100 ETB",
};
const writeText = vi.fn();
beforeEach(() => {
  vi.clearAllMocks();
  writeText.mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
  Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
});
describe("SH-5 Share sheet", () => {
  it.each(["100 ETB", null])(
    "rows and encoded text for price %s, all five channels counted once",
    async (priceText) => {
      render(<ShareAd {...props} priceText={priceText} />);
      fireEvent.click(screen.getByTestId("listing-share-open"));
      const url = window.location.origin + props.canonicalPath;
      const text =
        priceText === null
          ? `Scratch on ethio.com: ${url}`
          : `Scratch — 100 ETB on ethio.com: ${url}`;
      expect(screen.getByTestId("listing-share-telegram").getAttribute("href")).toBe(
        `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text.replace(/: .*$/, ""))}`,
      );
      expect(screen.getByTestId("listing-share-whatsapp")).toHaveAttribute(
        "href",
        `https://wa.me/?text=${encodeURIComponent(text)}`,
      );
      expect(screen.getByTestId("listing-share-facebook")).toHaveAttribute(
        "href",
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      );
      expect(
        Array.from(
          screen.getByRole("dialog").querySelectorAll('[data-testid^="listing-share-"]'),
        ).map((n) => n.getAttribute("data-testid")),
      ).toEqual([
        "listing-share-telegram",
        "listing-share-whatsapp",
        "listing-share-facebook",
        "listing-share-copy",
        "listing-share-qr",
      ]);
      // Avoid navigation while retaining the channel tap.
      for (const channel of ["telegram", "whatsapp", "facebook"] as const) {
        const link = screen.getByTestId(`listing-share-${channel}`);
        link.addEventListener("click", (e) => e.preventDefault());
        fireEvent.click(link);
      }
      fireEvent.click(screen.getByTestId("listing-share-copy"));
      await waitFor(() =>
        expect(screen.getByTestId("listing-share-status")).toHaveAttribute("data-state", "copied"),
      );
      expect(writeText).toHaveBeenCalledExactlyOnceWith(url);
      fireEvent.click(screen.getByTestId("listing-share-qr"));
      expect(screen.getByTestId("listing-share-qr-image")).toHaveAttribute(
        "src",
        `/l/${props.publicId}/qr.svg`,
      );
      expect(screen.getByTestId("listing-share-qr-download")).toHaveAttribute(
        "download",
        `ethio-${props.publicId}-qr.svg`,
      );
      expect(countShare.mock.calls).toEqual(
        ["telegram", "whatsapp", "facebook", "copy", "qr"].map((c) => [props.publicId, c]),
      );
      expect(screen.queryByTestId("listing-share-more")).toBeNull();
    },
  );
  it("copy failure is visible; native sharing exists only when supported and is not counted", async () => {
    const share = vi.fn().mockRejectedValue(new Error("dismissed"));
    Object.defineProperty(navigator, "share", { configurable: true, value: share });
    writeText.mockRejectedValue(new Error("denied"));
    render(<ShareAd {...props} />);
    fireEvent.click(screen.getByTestId("listing-share-open"));
    fireEvent.click(screen.getByTestId("listing-share-copy"));
    await waitFor(() =>
      expect(screen.getByTestId("listing-share-status")).toHaveAttribute("data-state", "failed"),
    );
    fireEvent.click(screen.getByTestId("listing-share-more"));
    expect(share).toHaveBeenCalledExactlyOnceWith({
      title: "Scratch",
      text: "Scratch — 100 ETB on ethio.com",
      url: window.location.origin + props.canonicalPath,
    });
    expect(countShare).toHaveBeenCalledExactlyOnceWith(props.publicId, "copy");
  });
});

describe("D224 the caller-opened way", () => {
  it("renders no opener of its own and opens the sheet with the right address", () => {
    const onOpenChange = vi.fn();
    render(<ShareAd {...props} open onOpenChange={onOpenChange} />);
    expect(screen.queryByTestId("listing-share-open")).toBeNull();
    const url = window.location.origin + props.canonicalPath;
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("listing-share-telegram").getAttribute("href")).toContain(
      encodeURIComponent(url),
    );
    fireEvent.click(screen.getByTestId("listing-share-copy"));
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("closed stays closed and the close path reports to the caller", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(<ShareAd {...props} open={false} onOpenChange={onOpenChange} />);
    expect(screen.queryByTestId("listing-share-open")).toBeNull();
    expect(screen.queryByRole("dialog")).toBeNull();
    rerender(<ShareAd {...props} open onOpenChange={onOpenChange} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document.body, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("the default way is unchanged: its own opener opens the sheet", () => {
    render(<ShareAd {...props} />);
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(screen.getByTestId("listing-share-open"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
