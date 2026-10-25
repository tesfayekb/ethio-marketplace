/**
 * Bundle 13 turn 12 — D155b / D159: THE COVER PHOTO'S BACKGROUND, REMOVED BY PHOTOROOM.
 *
 * The operator's rules (D155, D159, D156): one fixed background in the house
 * colour, previewed before the seller keeps it; offered on the cover only, once
 * per ad plus one retry, in every category; the provider is Photoroom.
 *
 * Since Foundations turn 17 the provider call is the AI gateway's
 * `background_removal` task (src/server/ai/tasks.ts) through the Photoroom
 * adapter (src/server/ai/providers/photoroom.ts): the stored cover's bytes,
 * read by the server through a link it signed itself, and nothing else go out;
 * the answer is type- and size-allowlisted by the task's image output schema.
 * This module keeps the media work only: the source read. The house colour is
 * put under the cut-out by the seller's own device
 * (src/features/posting/photo-background.ts), so the colour never depends on
 * the provider and the server does no image work (DEC-082, INC-308: the Worker
 * does I/O only).
 *
 * WHAT COMES BACK: the provider's image, handed to the seller's device as it
 * is. Nothing is stored here: Keep sends the result through the upload route
 * like any edit (the four sizes on the device, the strip, the AI screen,
 * `replaces`).
 *
 * FAKE MODE (`E2E_FAKE_BACKGROUND=1`, or the harness-wide `E2E_FAKE_TRANSLATE=1`):
 * the task's stand-in answers a fixed 400 x 300 cut-out — a green block on a
 * transparent ground — and no network.
 */
import { errorText } from "@/lib/error-text";
import { upstream } from "@/server/upstream";

/** The stored cover is at most 1 MB (MAX_COVER_BYTES); anything larger is not ours. */
export const MAX_SOURCE_BYTES = 4 * 1024 * 1024;

/** Fake mode's cut-out size; the bytes themselves live beside the task (tasks.ts). */
export const FAKE_CUTOUT_SIZE = { width: 400, height: 300 } as const;

type Log = (message: string) => void;

function mediaType(response: Response): string {
  return (response.headers.get("content-type") ?? "").split(";")[0]!.trim().toLowerCase();
}

/** The stored cover, fetched through the link the server signed for this one request. */
export async function readSource(url: string, log: Log): Promise<Blob | null> {
  try {
    // Foundations turn 4 — a deadline; a timeout is the catch below (null).
    const response = await upstream(url, {}, { timeoutMs: 10_000, label: "photo source" });
    if (!response.ok) {
      log(`cover read ${response.status}`);
      return null;
    }
    const type = mediaType(response);
    if (!type.startsWith("image/")) {
      log(`cover read answered ${type === "" ? "no type" : type}`);
      return null;
    }
    const bytes = await response.arrayBuffer();
    if (bytes.byteLength === 0 || bytes.byteLength > MAX_SOURCE_BYTES) {
      log(`cover read: ${bytes.byteLength} bytes`);
      return null;
    }
    return new Blob([bytes], { type });
  } catch (error) {
    log(`cover read: ${errorText(error)}`);
    return null;
  }
}
