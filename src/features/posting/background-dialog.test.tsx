import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { MessageKey } from "@/i18n";

import { BackgroundDialog } from "./background-dialog";
import type { BackgroundAnswer } from "./posting-service";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

/** What the dialog asked of createImageBitmap: the cut-out first, then the composed canvas. */
let bitmapSources: unknown[] = [];
/** What the dialog drew, in order. */
let drawn: unknown[][] = [];

beforeEach(() => {
  bitmapSources = [];
  drawn = [];
  vi.stubGlobal(
    "createImageBitmap",
    vi.fn(async (source: unknown) => {
      bitmapSources.push(
        source instanceof HTMLCanvasElement
          ? { width: source.width, height: source.height }
          : source,
      );
      return source instanceof HTMLCanvasElement
        ? { width: source.width, height: source.height, close: vi.fn() }
        : { width: 400, height: 300, close: vi.fn() };
    }),
  );
  // jsdom draws nothing: a context that records every call is enough.
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    () =>
      ({
        fillStyle: "",
        fillRect: (...args: unknown[]) => drawn.push(["fillRect", ...args]),
        drawImage: (...args: unknown[]) => drawn.push(["drawImage", ...args]),
        imageSmoothingEnabled: false,
        imageSmoothingQuality: "low",
      }) as unknown as CanvasRenderingContext2D,
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const TARGET = { listingId: "listing-1", photoId: "cover-1" };

function cut(triesLeft: number | null): BackgroundAnswer {
  return { ok: true, picture: new Blob([new Uint8Array([1])], { type: "image/png" }), triesLeft };
}

function open(
  remove: (listingId: string, photoId: string) => Promise<BackgroundAnswer>,
  onSave = vi.fn(async () => null as MessageKey | null),
) {
  const onCancel = vi.fn();
  render(<BackgroundDialog target={TARGET} onCancel={onCancel} onSave={onSave} remove={remove} />);
  return { onSave, onCancel };
}

describe("BackgroundDialog (D155b / D159)", () => {
  it("PBG-4 opens on a plain sentence and asks nothing; Start asks once for this ad's cover and shows the cut-out on the house background with the tries left", async () => {
    const remove = vi.fn(async () => cut(1));
    open(remove);
    expect(screen.getByText("post.photos.background.hint")).toBeInTheDocument();
    expect(remove).not.toHaveBeenCalled();
    expect(screen.queryByTestId("post-photo-background-preview")).toBeNull();

    fireEvent.click(screen.getByTestId("post-photo-background-start"));
    const preview = await screen.findByTestId("post-photo-background-preview");
    expect(remove).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledWith("listing-1", "cover-1");
    expect(preview).toHaveAttribute("data-width", "400");
    expect(preview).toHaveAttribute("data-height", "300");
    // The composed picture: the background first, then the cut-out.
    expect(drawn[0]).toEqual(["fillRect", 0, 0, 400, 300]);
    expect(drawn[1]![0]).toBe("drawImage");
    expect(screen.getByTestId("post-photo-background-tries")).toHaveTextContent(
      "post.photos.background.triesLeft",
    );
  });

  it("PBG-5 Keep hands the composed picture to the step; a refusal keeps the dialog open with the reason and says the photo was kept", async () => {
    const onSave = vi.fn(async () => "post.photo.refusal.not_a_photo" as MessageKey | null);
    open(async () => cut(1), onSave);
    fireEvent.click(screen.getByTestId("post-photo-background-start"));
    await screen.findByTestId("post-photo-background-preview");
    fireEvent.click(screen.getByTestId("post-photo-background-keep"));
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    expect(bitmapSources[bitmapSources.length - 1]).toEqual({ width: 400, height: 300 });
    const refusal = await screen.findByTestId("post-photo-background-refusal");
    expect(refusal).toHaveTextContent("post.photo.refusal.not_a_photo");
    expect(refusal).toHaveTextContent("post.photos.editor.kept");
    expect(screen.getByTestId("post-photo-background-keep")).toBeEnabled();
  });

  it("PBG-6 the server's refusals are said in words; a spent ad shows no tries and Start stays off; no network is the plain failure", async () => {
    const replies: BackgroundAnswer[] = [
      { ok: false, reason: "notCover", unreachable: false },
      { ok: false, reason: "", unreachable: true },
      { ok: false, reason: "backgroundSpent", unreachable: false },
    ];
    open(async () => replies.shift()!);
    const start = screen.getByTestId("post-photo-background-start");

    fireEvent.click(start);
    expect(await screen.findByTestId("post-photo-background-refusal")).toHaveTextContent(
      "post.photos.background.notCover",
    );
    fireEvent.click(start);
    await waitFor(() =>
      expect(screen.getByTestId("post-photo-background-refusal")).toHaveTextContent(
        "post.photos.background.failed",
      ),
    );
    fireEvent.click(start);
    await waitFor(() =>
      expect(screen.getByTestId("post-photo-background-refusal")).toHaveTextContent(
        "post.photos.background.spent",
      ),
    );
    expect(screen.getByTestId("post-photo-background-tries")).toBeInTheDocument();
    expect(start).toBeDisabled();
    expect(screen.queryByTestId("post-photo-background-preview")).toBeNull();
  });

  it("PBG-7 Retry asks once more while the ad has a try left; with none left it is off", async () => {
    const replies = [cut(1), cut(0)];
    const remove = vi.fn(async () => replies.shift()!);
    open(remove);
    fireEvent.click(screen.getByTestId("post-photo-background-start"));
    await screen.findByTestId("post-photo-background-preview");
    const retry = screen.getByTestId("post-photo-background-retry");
    expect(retry).toBeEnabled();
    fireEvent.click(retry);
    await waitFor(() => expect(remove).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(screen.getByTestId("post-photo-background-retry")).toBeDisabled());
    expect(screen.getByTestId("post-photo-background-keep")).toBeEnabled();
  });
});
