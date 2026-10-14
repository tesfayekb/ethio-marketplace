import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { MessageKey } from "@/i18n";

import { PhotoEditor } from "./photo-editor";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

/** What the editor asked of createImageBitmap: the fetched blob first, then the saved canvas. */
let bitmapSources: unknown[] = [];

beforeEach(() => {
  bitmapSources = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: true,
      status: 200,
      blob: async () => new Blob([new Uint8Array([1])], { type: "image/webp" }),
    })),
  );
  vi.stubGlobal(
    "createImageBitmap",
    vi.fn(async (source: unknown) => {
      // A canvas is recorded by its size at the call: the editor empties it after.
      bitmapSources.push(
        source instanceof HTMLCanvasElement
          ? { width: source.width, height: source.height }
          : source,
      );
      return source instanceof HTMLCanvasElement
        ? { width: source.width, height: source.height, close: vi.fn() }
        : { width: 320, height: 240, close: vi.fn() };
    }),
  );
  // jsdom draws nothing: a context that accepts every call is enough.
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    () =>
      ({
        translate: vi.fn(),
        rotate: vi.fn(),
        drawImage: vi.fn(),
        imageSmoothingEnabled: false,
        imageSmoothingQuality: "low",
      }) as unknown as CanvasRenderingContext2D,
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

/** The canvas the editor saved: the last source handed to createImageBitmap. */
function saved(): { width: number; height: number } {
  return bitmapSources[bitmapSources.length - 1] as { width: number; height: number };
}

async function open(onSave = vi.fn(async () => null as MessageKey | null)) {
  const onCancel = vi.fn();
  render(
    <PhotoEditor sourceUrl="https://x.example/p1-cover.webp" onCancel={onCancel} onSave={onSave} />,
  );
  await screen.findByTestId("post-photo-editor-preview");
  return { onSave, onCancel };
}

/**
 * D154 B2 — the editor: it opens on the photo's stored cover, Save waits for a
 * change, a turn and the keyboard's crop reach the saved picture, and a refusal
 * keeps the editor open with its reason.
 */
describe("PhotoEditor (D154 B2)", () => {
  it("PED-6 opens on the stored cover; Save waits for a change; a turn to the right saves the picture turned", async () => {
    const { onSave } = await open();
    expect(fetch).toHaveBeenCalledWith("https://x.example/p1-cover.webp");
    const save = screen.getByTestId("post-photo-editor-save");
    expect(save).toBeDisabled();
    fireEvent.click(screen.getByTestId("post-photo-editor-right"));
    expect(screen.getByTestId("post-photo-editor-frame")).toHaveAttribute("data-turns", "1");
    expect(save).toBeEnabled();
    fireEvent.click(save);
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    expect(saved()).toEqual({ width: 240, height: 320 });
  });

  it("PED-7 the box is a control: an arrow key moves it, Shift with an arrow key sizes it, and the crop is what is saved", async () => {
    const { onSave } = await open();
    const box = screen.getByTestId("post-photo-editor-box");
    expect(box).toHaveAttribute("data-box", "0.0000,0.0000,1.0000,1.0000");
    for (let i = 0; i < 5; i += 1) fireEvent.keyDown(box, { key: "ArrowLeft", shiftKey: true });
    expect(box).toHaveAttribute("data-box", "0.0000,0.0000,0.9000,1.0000");
    fireEvent.keyDown(box, { key: "ArrowRight" });
    expect(box).toHaveAttribute("data-box", "0.0200,0.0000,0.9000,1.0000");
    fireEvent.click(screen.getByTestId("post-photo-editor-save"));
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    expect(saved()).toEqual({ width: 288, height: 240 });
  });

  it("PED-8 a refusal keeps the editor open with the reason and says the photo was kept; an unopenable photo says so", async () => {
    const onSave = vi.fn(async () => "post.photo.refusal.not_a_photo" as MessageKey | null);
    await open(onSave);
    fireEvent.click(screen.getByTestId("post-photo-editor-left"));
    fireEvent.click(screen.getByTestId("post-photo-editor-save"));
    const refusal = await screen.findByTestId("post-photo-editor-refusal");
    expect(refusal).toHaveTextContent("post.photo.refusal.not_a_photo");
    expect(refusal).toHaveTextContent("post.photos.editor.kept");
    expect(screen.getByTestId("post-photo-editor")).toBeInTheDocument();
    expect(screen.getByTestId("post-photo-editor-save")).toBeEnabled();
  });

  it("PED-9 a photo that cannot be fetched opens no picture and says it could not be opened", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("", { status: 403 })),
    );
    render(
      <PhotoEditor sourceUrl="https://x.example/gone.webp" onCancel={vi.fn()} onSave={vi.fn()} />,
    );
    expect(await screen.findByTestId("post-photo-editor-failed")).toHaveTextContent(
      "post.photos.editor.failed",
    );
    expect(screen.queryByTestId("post-photo-editor-preview")).toBeNull();
    expect(screen.getByTestId("post-photo-editor-save")).toBeDisabled();
  });
});
