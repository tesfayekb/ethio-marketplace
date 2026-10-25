import { upstream, UpstreamTimeout } from "@/server/upstream";
import { IMAGE_ANSWER_MAX_BYTES, type AiImage } from "../tasks";

/**
 * Turn 17, CHANGE (4) — THE PHOTOROOM ADAPTER (DEC-249: the project's own code
 * over `upstream`; no vendor SDK). The image only goes out — no name, no id,
 * no contact detail, no text — and the answer is type- and size-allowlisted
 * before the gateway parses it: an image/png, image/webp or image/jpeg body of
 * 1 byte to 8 MiB (today's MAX_CUTOUT_BYTES) is an image answer; any other 2xx
 * is `unusable` (and metered — the provider charged for it).
 *
 * Photoroom's terms, read 2026-10-14 (photoroom.com/platform/security): images
 * sent to its synchronous endpoint are "discarded immediately after the
 * response"; self-serve API plans may train on them unless the account's
 * opt-out is set (the operator sets it); its infrastructure runs in the United
 * States.
 */

export const MAX_CUTOUT_BYTES = IMAGE_ANSWER_MAX_BYTES;

const SEGMENT_URL = "https://sdk.photoroom.com/v1/segment";

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const ANSWER_MIME = ["image/png", "image/webp", "image/jpeg"] as const;

export type PhotoroomAnswer =
  | { kind: "image"; status: number; bytes: Uint8Array; mime: (typeof ANSWER_MIME)[number] }
  | { kind: "unusable"; status: number }
  | { kind: "status"; status: number }
  | { kind: "timeout" }
  | { kind: "network" }
  | { kind: "noKey" };

/** Photoroom's cut-out of the image, with one deadline across headers and body. */
export async function photoroomSegment(input: {
  image: AiImage;
  timeoutMs: number;
  label: string;
}): Promise<PhotoroomAnswer> {
  // The provider's key, read inside the call and never echoed (F1).
  const key = (process.env["PHOTOROOM_API_KEY"] ?? "").trim();
  if (key === "") return { kind: "noKey" };
  const form = new FormData();
  form.set(
    "image_file",
    new Blob([input.image.bytes], { type: input.image.mime }),
    `photo.${EXTENSIONS[input.image.mime] ?? "jpg"}`,
  );
  form.set("format", "webp");
  form.set("channels", "rgba");
  form.set("size", "hd");
  try {
    const response = await upstream(
      SEGMENT_URL,
      { method: "POST", headers: { "x-api-key": key }, body: form },
      { timeoutMs: input.timeoutMs, label: input.label },
    );
    if (!response.ok) return { kind: "status", status: response.status };
    const type = (response.headers.get("content-type") ?? "").split(";")[0]?.trim().toLowerCase();
    const mime = ANSWER_MIME.find((known) => known === type);
    if (mime === undefined) return { kind: "unusable", status: response.status };
    let bytes: Uint8Array;
    try {
      bytes = new Uint8Array(await response.arrayBuffer());
    } catch (error) {
      const name =
        typeof error === "object" && error !== null ? (error as { name?: unknown }).name : null;
      if (name === "TimeoutError" || name === "AbortError") return { kind: "timeout" };
      return { kind: "unusable", status: response.status };
    }
    if (bytes.byteLength === 0 || bytes.byteLength > MAX_CUTOUT_BYTES) {
      return { kind: "unusable", status: response.status };
    }
    return { kind: "image", status: response.status, bytes, mime };
  } catch (error) {
    return error instanceof UpstreamTimeout ? { kind: "timeout" } : { kind: "network" };
  }
}
