import { ImageOff } from "lucide-react";
import { useState, type CSSProperties, type ReactNode, type SyntheticEvent } from "react";

import { cn } from "@/lib/utils";

/**
 * INC-1121 (the pictures turn, DEC-371) — ONE PICTURE RULE. Every raster image the app draws
 * from an address is drawn here: a FRAME whose size the caller gives (a class or a style — a
 * fixed box, a 4:3 box, a slide, the picture's own ratio), and the image placed over it
 * absolutely, `inset: 0` at 100 % × 100 %, filled by `object-fit`. An image sized by a
 * percentage height IN FLOW resolves differently by engine: inside a table cell WebKit gives it
 * its natural height (My listings' table form drew 360 × 480 photos at 80 × 480 in an 80 × 60
 * frame); an absolutely placed box's percentage resolves against its containing block in every
 * engine. A load that fails draws the empty-photo state in the frame, never an empty frame.
 * scripts/conformance/pictures.test.ts (CF-PICTURE-1…3) refuses an `img` or a style `url(`
 * anywhere else; e2e/helpers/pictures.ts measures the drawn picture against this frame.
 */
export const PICTURE_FRAME_CLASS = "relative overflow-hidden";
export const PICTURE_IMAGE_CLASS = "absolute inset-0 block h-full w-full";

export type PictureFit = "cover" | "contain";

export function Picture({
  src,
  fit,
  alt = "",
  className,
  style,
  frameTestId,
  imgTestId,
  imgClassName,
  width,
  height,
  loading,
  fetchPriority,
  decoding,
  srcSet,
  sizes,
  draggable,
  onLoad,
  onDoubleClick,
  children,
}: {
  /** null draws the empty-photo state, as a failed load does. */
  src: string | null;
  /** `cover` crops to fill the frame; `contain` shows the whole picture at its ratio, centred. */
  fit: PictureFit;
  alt?: string;
  /** The frame's size and look; it may replace `relative` (an absolutely placed frame). */
  className?: string;
  style?: CSSProperties;
  frameTestId?: string;
  imgTestId?: string;
  /** Beside the fit: an object position, an opacity, a zoom. Never a size. */
  imgClassName?: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
  srcSet?: string;
  sizes?: string;
  draggable?: boolean;
  onLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;
  onDoubleClick?: () => void;
  /** Drawn over the picture inside the frame (a ribbon, a badge). */
  children?: ReactNode;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = src !== null && failedSrc === src;
  return (
    <div
      className={cn(PICTURE_FRAME_CLASS, className)}
      style={style}
      data-testid={frameTestId}
      data-picture-frame={fit}
      data-picture-failed={failed ? "" : undefined}
    >
      {src !== null && !failed ? (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding={decoding}
          draggable={draggable}
          data-testid={imgTestId}
          onLoad={onLoad}
          onError={() => setFailedSrc(src)}
          onDoubleClick={onDoubleClick}
          className={cn(
            PICTURE_IMAGE_CLASS,
            fit === "cover" ? "object-cover" : "object-contain",
            imgClassName,
          )}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageOff className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
        </div>
      )}
      {children}
    </div>
  );
}
