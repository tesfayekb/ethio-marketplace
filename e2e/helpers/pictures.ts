import type { Locator, Page } from "@playwright/test";

/**
 * The pictures turn (INC-1121, DEC-371) — EVERY DRAWN PICTURE HAS LOADED AND FITS ITS FRAME, IN
 * EVERY ENGINE. The behavioural proof of the one picture rule (`Picture`,
 * src/components/ui/picture.tsx): for every visible `img` under the scope, `expectPicturesFit`
 * waits until it has loaded (scrolling a lazy one into view), then reads, in one frame, its natural
 * size, its content box (the box minus border and padding), its computed `object-fit` and
 * `object-position`, and its frame (`closest("[data-picture-frame]")`, the frame's padding box).
 * The judge (`pictureFitProblems`, pure, unit-tested in scripts/conformance/e2e-helpers.test.ts):
 *   - the image is drawn through Picture (it has a frame) and has loaded;
 *   - its content box lies within its frame (±PX);
 *   - its computed fit is the frame's declared fit;
 *   - `cover` fills the frame, both sides (±PX);
 *   - `contain` draws the picture at its natural ratio (±RATIO) inside the content box, touching two
 *     opposite edges (±PX);
 *   - no failed-load state is visible under the scope;
 *   - at least `atLeast` pictures were measured (a screen that drew none never passes).
 * WebKit's INC-1121 is the first case: an 80 × 480 drawn box in an 80 × 60 frame fails, the message
 * naming the picture's test id and its natural, drawn and frame sizes. A layout still settling (a
 * whole picture's frame takes its ratio on load) is read again until the deadline.
 * scripts/conformance/e2e-helpers.test.ts CF-HELPERS-8 holds every spec naming a screen of
 * PICTURE_SCREENS to calling it.
 */

/** The picture test ids of the screens that draw pictures (CF-HELPERS-8; `${}` stands for an id). */
export const PICTURE_SCREENS = [
  // the feed's and the seller's cards
  "listing-card-picture",
  // My listings' rows
  "my-listing-${}-picture",
  // the ad page: the gallery, its viewer, a no-photo ad's picture, the share QR
  "gallery-main",
  "gallery-thumb",
  "gallery-viewer-image",
  "listing-detail-illustration",
  "listing-detail-nophoto",
  "listing-share-qr-image",
  // the post wizard: the category picture and the photo tiles
  "post-photos-illustration",
  "post-photo-tile",
  "post-photo-stored",
  // staff: photo changes, photo reviews, an ad's photos and the Remove dialog, category pictures
  "admin-photo-change",
  "admin-photo-review",
  "photos-item",
  "listing-photo-remove-dialog",
  "category-image-assets",
  // Settings: the two-step sign-in QR
  "mfa-qr",
] as const;

export const PICTURE_PX = 1;
export const PICTURE_RATIO = 0.01;
const LOAD_WAIT_MS = 15_000;
const SETTLE_MS = 5_000;

export interface PictureRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface PictureMeasure {
  testId: string;
  src: string;
  loaded: boolean;
  natural: { width: number; height: number };
  content: PictureRect;
  fit: string;
  position: string;
  frame: { fit: string; box: PictureRect } | null;
}

export interface PictureReading {
  pictures: PictureMeasure[];
  failed: string[];
}

const size = (rect: { width: number; height: number }) =>
  `${Math.round(rect.width * 10) / 10}×${Math.round(rect.height * 10) / 10}`;

function within(inner: PictureRect, outer: PictureRect): boolean {
  return (
    inner.left >= outer.left - PICTURE_PX &&
    inner.top >= outer.top - PICTURE_PX &&
    inner.left + inner.width <= outer.left + outer.width + PICTURE_PX &&
    inner.top + inner.height <= outer.top + outer.height + PICTURE_PX
  );
}

function offset(token: string | undefined, room: number): number {
  if (token === undefined) return room / 2;
  if (token.endsWith("%")) return (Number.parseFloat(token) / 100) * room;
  if (token.endsWith("px")) return Number.parseFloat(token);
  return room / 2;
}

/** The rectangle `object-fit` and `object-position` draw the natural picture into, in the content box. */
export function drawnRect(m: Pick<PictureMeasure, "natural" | "content" | "fit" | "position">) {
  const { natural, content } = m;
  const contain = Math.min(content.width / natural.width, content.height / natural.height);
  const cover = Math.max(content.width / natural.width, content.height / natural.height);
  const scale =
    m.fit === "contain"
      ? contain
      : m.fit === "cover"
        ? cover
        : m.fit === "none"
          ? 1
          : m.fit === "scale-down"
            ? Math.min(1, contain)
            : null;
  const width = scale === null ? content.width : natural.width * scale;
  const height = scale === null ? content.height : natural.height * scale;
  const [x, y] = m.position.split(/\s+/);
  return {
    left: content.left + offset(x, content.width - width),
    top: content.top + offset(y, content.height - height),
    width,
    height,
  };
}

/** Every way the measured pictures fail the rule, one line each (empty: every picture fits). */
export function pictureFitProblems(reading: PictureReading, atLeast = 1): string[] {
  const problems: string[] = [];
  if (reading.pictures.length < atLeast)
    problems.push(`${reading.pictures.length} picture(s) measured, at least ${atLeast} expected`);
  for (const id of reading.failed) problems.push(`${id}: the failed-load state is showing`);
  for (const m of reading.pictures) {
    const say = (what: string, drawn?: PictureRect) =>
      problems.push(
        `${m.testId}: ${what} — natural ${m.natural.width}×${m.natural.height}, drawn ${size(drawn ?? m.content)}, frame ${m.frame === null ? "none" : size(m.frame.box)} (${m.src})`,
      );
    if (!m.loaded || m.natural.width === 0 || m.natural.height === 0) {
      say("never loaded");
      continue;
    }
    if (m.frame === null) {
      say("drawn outside Picture (no [data-picture-frame])");
      continue;
    }
    const frame = m.frame.box;
    if (!within(m.content, frame)) say("the image's box overflows its frame");
    if (m.fit !== m.frame.fit) say(`drawn with object-fit ${m.fit}, its frame says ${m.frame.fit}`);
    const drawn = drawnRect(m);
    if (m.frame.fit === "cover") {
      if (
        Math.abs(m.content.width - frame.width) > PICTURE_PX ||
        Math.abs(m.content.height - frame.height) > PICTURE_PX
      )
        say("a cropped picture does not fill its frame");
      continue;
    }
    const ratio = drawn.width / drawn.height;
    const naturalRatio = m.natural.width / m.natural.height;
    if (Math.abs(ratio / naturalRatio - 1) > PICTURE_RATIO)
      say("a whole picture is drawn out of its ratio", drawn);
    if (!within(drawn, m.content)) say("a whole picture overflows its box", drawn);
    if (
      Math.abs(drawn.width - m.content.width) > PICTURE_PX &&
      Math.abs(drawn.height - m.content.height) > PICTURE_PX
    )
      say("a whole picture touches no two opposite edges of its box", drawn);
  }
  return problems;
}

/** In the page: wait for every visible picture to load, then read each in one frame. */
async function readPictures(root: Element, waitMs: number): Promise<PictureReading> {
  const shown = (element: Element) =>
    element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden";
  const images = [...root.querySelectorAll("img")].filter(shown);
  for (const img of images) {
    if (img.complete) continue;
    img.scrollIntoView({ block: "center" });
    await new Promise<void>((resolve) => {
      img.addEventListener("load", () => resolve(), { once: true });
      img.addEventListener("error", () => resolve(), { once: true });
      setTimeout(resolve, waitMs);
    });
  }
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const testIdOf = (element: Element) => {
    for (let up: Element | null = element; up !== null; up = up.parentElement) {
      const id = up.getAttribute("data-testid");
      if (id !== null) return id;
    }
    return "(no test id)";
  };
  const inner = (element: Element, padding: boolean) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    const px = (value: string) => Number.parseFloat(value) || 0;
    const left = px(style.borderLeftWidth) + (padding ? px(style.paddingLeft) : 0);
    const right = px(style.borderRightWidth) + (padding ? px(style.paddingRight) : 0);
    const top = px(style.borderTopWidth) + (padding ? px(style.paddingTop) : 0);
    const bottom = px(style.borderBottomWidth) + (padding ? px(style.paddingBottom) : 0);
    return {
      left: rect.left + left,
      top: rect.top + top,
      width: rect.width - left - right,
      height: rect.height - top - bottom,
    };
  };
  const pictures = images.map((img) => {
    const frame = img.closest("[data-picture-frame]");
    const style = getComputedStyle(img);
    return {
      testId: testIdOf(img),
      src: img.currentSrc === "" ? img.src : img.currentSrc,
      loaded: img.isConnected && img.complete && img.naturalWidth > 0,
      natural: { width: img.naturalWidth, height: img.naturalHeight },
      content: inner(img, true),
      fit: style.objectFit,
      position: style.objectPosition,
      frame:
        frame === null
          ? null
          : { fit: frame.getAttribute("data-picture-frame") ?? "", box: inner(frame, false) },
    };
  });
  const failed = [...root.querySelectorAll("[data-picture-failed]")].filter(shown).map(testIdOf);
  return { pictures, failed };
}

/**
 * Every visible picture under `scope` (the page's body when absent) has loaded and fits its frame;
 * at least `atLeast` were drawn. Answers the reading it judged.
 */
export async function expectPicturesFit(
  page: Page,
  scope?: Locator,
  options: { atLeast?: number } = {},
): Promise<PictureReading> {
  const root = scope ?? page.locator("body");
  const deadline = Date.now() + SETTLE_MS;
  for (;;) {
    const reading = await root.evaluate(readPictures, LOAD_WAIT_MS);
    const problems = pictureFitProblems(reading, options.atLeast ?? 1);
    if (problems.length === 0) return reading;
    if (Date.now() > deadline)
      throw new Error(
        `[e2e:pictures] ${problems.length} problem(s) with the drawn pictures at ${page.url()}:\n  ${problems.join("\n  ")}`,
      );
    await root.evaluate(() => new Promise((resolve) => setTimeout(resolve, 200)));
  }
}
