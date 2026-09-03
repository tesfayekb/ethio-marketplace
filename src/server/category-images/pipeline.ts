/**
 * C5a PART B — the category-image pipeline.
 *
 * decode -> white-to-transparent -> content-bounds crop -> scale to 80-85% fill
 * -> watermark drawn BEHIND the icon on a 512 canvas -> 128 thumb -> 1200x630 OG
 * composed programmatically (brand canvas + centred icon; never a second AI
 * call). Every stage is timed with performance.now().
 */
import {
  canvas,
  decodeImage,
  compositeOver,
  contentBounds,
  crop,
  drawRotatedText,
  encodePng,
  resize,
  whiteToTransparent,
  type Raster,
  type Rgba,
} from "./raster";

export const CARD_SIZE = 512;
export const THUMB_SIZE = 128;
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
/** Target fill of the square canvas by the icon's longest side. */
export const FILL_RATIO = 0.85;

const WHITE: Rgba = [255, 255, 255, 255];
const PRIMARY: Rgba = [0x1e, 0x5a, 0x43, 255];
const WATERMARK_TEXT = "ethio.com";
const WATERMARK_OPACITY = 0.28;
const WATERMARK_ANGLE = -30;

/**
 * C5a-3 PART B — STAGE TAGS. Every failure carries the stage that produced it,
 * so no operator ever sees a bare 502 again. The stages, in order:
 *   model-call · decode · process · watermark · encode · upload · persist
 * (`model-call`, `upload` and `persist` are wrapped by the route, which owns
 * those calls; the rest are wrapped here.)
 */
export type PipelineStage =
  | "model-call"
  | "decode"
  | "process"
  | "watermark"
  | "encode"
  | "upload"
  | "persist";

export class StageError extends Error {
  readonly stage: PipelineStage;
  readonly status: number;
  constructor(stage: PipelineStage, message: string, status = 500) {
    super(message);
    this.name = "StageError";
    this.stage = stage;
    this.status = status;
  }
}

/** Runs `fn`, re-throwing anything it raises tagged with `stage`. */
export function atStage<T>(stage: PipelineStage, fn: () => T): T {
  try {
    return fn();
  } catch (error) {
    if (error instanceof StageError) throw error;
    const message = error instanceof Error ? error.message : "unknown error";
    const status = typeof (error as { status?: unknown })?.status === "number"
      ? (error as { status: number }).status
      : 500;
    throw new StageError(stage, message, status);
  }
}

export async function atStageAsync<T>(stage: PipelineStage, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof StageError) throw error;
    const message = error instanceof Error ? error.message : "unknown error";
    const status = typeof (error as { status?: unknown })?.status === "number"
      ? (error as { status: number }).status
      : 500;
    throw new StageError(stage, message, status);
  }
}

export interface Timings {
  genMs: number;
  processMs: number;
  totalMs: number;
}

export interface PipelineOutput {
  card: Uint8Array;
  thumb: Uint8Array;
  og: Uint8Array;
  timings: Timings;
}

/** Six diagonal "ethio.com" texts, evenly spread, drawn before the icon. */
function watermark(target: Raster, scale: number): void {
  const cols = 2;
  const rows = 3;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      drawRotatedText(target, {
        text: WATERMARK_TEXT,
        cx: ((c + 0.5) / cols) * target.width,
        cy: ((r + 0.5) / rows) * target.height,
        scale,
        angleDeg: WATERMARK_ANGLE,
        color: PRIMARY,
        opacity: WATERMARK_OPACITY,
      });
    }
  }
}

function fitInto(icon: Raster, box: number): Raster {
  const longest = Math.max(icon.width, icon.height);
  const factor = (box * FILL_RATIO) / longest;
  return resize(
    icon,
    Math.max(1, Math.round(icon.width * factor)),
    Math.max(1, Math.round(icon.height * factor)),
  );
}

/**
 * Runs every post-processing stage on a generated PNG.
 * `genMs` is measured by the caller (the model call) and passed through.
 */
export function processGeneratedPng(source: Uint8Array, genMs: number): PipelineOutput {
  const start = performance.now();

  // decode — sniffed by magic bytes (PART C), never by the declared mime.
  const decoded = atStage("decode", () => decodeImage(source));

  // process — alpha keying, content crop, scaling.
  const { cardIcon, ogIcon } = atStage("process", () => {
    const transparent = whiteToTransparent(decoded);
    const cropped = crop(transparent, contentBounds(transparent));
    return {
      cardIcon: fitInto(cropped, CARD_SIZE),
      ogIcon: fitInto(cropped, OG_HEIGHT),
    };
  });

  // watermark — brand canvases with the diagonal marks drawn BEHIND the icon.
  const { card, og } = atStage("watermark", () => {
    const card_ = canvas(CARD_SIZE, CARD_SIZE, WHITE);
    watermark(card_, 3);
    compositeOver(
      card_,
      cardIcon,
      Math.round((CARD_SIZE - cardIcon.width) / 2),
      Math.round((CARD_SIZE - cardIcon.height) / 2),
    );
    const og_ = canvas(OG_WIDTH, OG_HEIGHT, WHITE);
    watermark(og_, 5);
    compositeOver(
      og_,
      ogIcon,
      Math.round((OG_WIDTH - ogIcon.width) / 2),
      Math.round((OG_HEIGHT - ogIcon.height) / 2),
    );
    return { card: card_, og: og_ };
  });

  // encode — the 128 thumb is derived from the card so they can never disagree.
  const encoded = atStage("encode", () => ({
    card: encodePng(card),
    thumb: encodePng(resize(card, THUMB_SIZE, THUMB_SIZE)),
    og: encodePng(og),
  }));

  const processMs = performance.now() - start;

  return {
    ...encoded,
    timings: {
      genMs: Math.round(genMs),
      processMs: Math.round(processMs),
      totalMs: Math.round(genMs + processMs),
    },
  };
}
