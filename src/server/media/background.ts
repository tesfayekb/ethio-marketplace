/**
 * Bundle 13 turn 12 — D155b / D159: THE COVER PHOTO'S BACKGROUND, REMOVED BY PHOTOROOM.
 *
 * The operator's rules (D155, D159, D156): one fixed background in the house
 * colour, previewed before the seller keeps it; offered on the cover only, once
 * per ad plus one retry, in every category; the provider is Photoroom.
 *
 * WHAT GOES OUT: the stored cover's bytes, read by the server through a link it
 * signed itself, and nothing else — no name, no id, no contact detail, no text.
 * The provider is asked for the cut-out on a transparent background (`channels`
 * rgba, `format` webp: transparency kept, a smaller file than PNG for the phone),
 * at most 4 megapixels (`size` hd; a stored cover is at most 1,600 px long, so
 * the cut-out keeps its size). The house colour is put under the cut-out by the
 * seller's own device (src/features/posting/photo-background.ts), so the colour
 * never depends on the provider and the server does no image work (DEC-082,
 * INC-308: the Worker does I/O only).
 *
 * WHAT COMES BACK: the provider's image, handed to the seller's device as it
 * is. Nothing is stored here: Keep sends the result through the upload route
 * like any edit (the four sizes on the device, the strip, the AI screen,
 * `replaces`).
 *
 * Photoroom's terms, read 2026-10-14 (photoroom.com/platform/security): images
 * sent to its synchronous endpoint are "discarded immediately after the
 * response"; self-serve API plans may train on them unless the account's
 * opt-out is set (the operator sets it); its infrastructure runs in the United
 * States.
 *
 * FAKE MODE (`E2E_FAKE_BACKGROUND=1`, or the harness-wide `E2E_FAKE_TRANSLATE=1`):
 * a fixed 400 x 300 cut-out — a green block on a transparent ground — and no
 * network.
 */
import { upstream } from "@/server/upstream";
import { errorText } from "@/lib/error-text";
import { aiFakeMode } from "@/server/ai/meter";

export const PHOTOROOM_SEGMENT_URL = "https://sdk.photoroom.com/v1/segment";

/** The stored cover is at most 1 MB (MAX_COVER_BYTES); anything larger is not ours. */
export const MAX_SOURCE_BYTES = 4 * 1024 * 1024;
/** A cut-out of a 1,600-px cover is far smaller; a larger answer is refused. */
export const MAX_CUTOUT_BYTES = 8 * 1024 * 1024;

export interface Cutout {
  bytes: Uint8Array;
  /** The image's media type, as the provider (or fake mode) gave it. */
  type: string;
}

type Log = (message: string) => void;

export function isBackgroundFake(): boolean {
  return aiFakeMode("E2E_FAKE_BACKGROUND");
}

/** The provider's key, read inside the handler and never echoed (F1). */
export function backgroundKey(): string {
  return (process.env["PHOTOROOM_API_KEY"] ?? "").trim();
}

/** Fake mode's cut-out: 400 x 300, a green block (#1E5A43) in a transparent frame. */
export const FAKE_CUTOUT_SIZE = { width: 400, height: 300 } as const;

const FAKE_CUTOUT_BASE64 = [
  "iVBORw0KGgoAAAANSUhEUgAAAZAAAAEsCAYAAADtt+XCAAADvElEQVR42u3VAQ0AQAgDMZRgBhfv38djAAEktMlZ",
  "2CIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOCmfPUlzVkIcCCSAwEH",
  "IjkQcCCSAwEHIjkQcCCSHAg4EMmBgAORHAg4EMmBgAORHAg4EEkOBByI5EDAgUgOBByI5EDAgUgOBByIJAcCDkRy",
  "IOBAJAcCDkRyIOBAJAcCOBDJgYADkRwIOBDJgYADkRwIOBDJgQAORHIg4EAkBwIORHIg4EAkBwIORHIggAORHAg4",
  "EMmBgAORHAg4EMmBgAORHAjgQCQHAg5EciDgQCQHAg5EciDgQCQ5EHAgkgMBByI5EHAgkgMBByI5EHAgkhwIOBDJ",
  "gYADkRwIOBDJgYADkRwIOBBJDgQciORAwIFIDgQciORAwIFIDgQciJGQHAg4EMmBgAORHAg4EMmBgAORHAjgQCQH",
  "Ag5EciDgQCQHAg5EciDgQCQHAjgQyYGAA5EcCDgQyYGAA5EcCDgQyYEADkRyIOBAJAcCDkRyIOBAJAcCDkRyIIAD",
  "kRwIOBDJgYADkRwIOBDJgYADkeRAwIFIDgQciORAwIFIDgQciORAwIFIciDgQCQHAg5EciDgQCQHAg5EciDgQCQ5",
  "EHAgkgMBByI5EHAgkgMBByI5EMCBSA4EHIjkQMCBSA4EHIjkQMCBSA4EcCCSAwEHIjkQcCCSAwEHIjkQcCCSAwEc",
  "iORAwIFIDgQciORAwIFIDgQciORAAAciORBwIJIDAQciORBwIJIDAQciyYGAA5EcCDgQyYGAA5EcCDgQyYGAA5Hk",
  "QMCBSA4EHIjkQMCBSA4EHIjkQMCBSHIg4EAkBwIORHIg4EAkBwIORHIg4EAMheRAwIFIDgQciORAwIFIDgQciORA",
  "AAciORBwIJIDAQciORBwIJIDAQciORDAgUgOBByI5EDAgUgOBByI5EDAgUgOBHAgkgMBByI5EHAgkgMBByI5EHAg",
  "kgMBHIjkQMCBSA4EHIjkQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "YJ8GAWZgt3nyXz8AAAAASUVORK5CYII=",
].join("");

export function fakeCutout(): Cutout {
  const binary = atob(FAKE_CUTOUT_BASE64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return { bytes, type: "image/png" };
}

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

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/** Photoroom's cut-out of the image: the image only, and the answer checked before it is used. */
export async function cutOut(source: Blob, key: string, log: Log): Promise<Cutout | null> {
  const form = new FormData();
  form.set("image_file", source, `photo.${EXTENSIONS[source.type] ?? "jpg"}`);
  form.set("format", "webp");
  form.set("channels", "rgba");
  form.set("size", "hd");
  let response: Response;
  try {
    // Foundations turn 4 — a deadline; a timeout is the unreachable branch below.
    response = await upstream(
      PHOTOROOM_SEGMENT_URL,
      { method: "POST", headers: { "x-api-key": key }, body: form },
      { timeoutMs: 30_000, label: "photoroom segment" },
    );
  } catch (error) {
    log(`photoroom unreachable: ${errorText(error)}`);
    return null;
  }
  if (!response.ok) {
    log(`photoroom ${response.status}: ${errorText((await response.text()).slice(0, 200))}`);
    return null;
  }
  const type = mediaType(response);
  if (!type.startsWith("image/")) {
    log(`photoroom answered ${type === "" ? "no type" : type}`);
    return null;
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength === 0 || bytes.byteLength > MAX_CUTOUT_BYTES) {
    log(`photoroom answered ${bytes.byteLength} bytes`);
    return null;
  }
  return { bytes, type };
}
