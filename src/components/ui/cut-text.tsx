import { cn } from "@/lib/utils";

/**
 * D104 — a cut name keeps its first `keep` graphemes. One visible element holds
 * the whole name (accessible name and textContent stay whole); two unpainted,
 * aria-hidden size-setters fix the grid column's smallest width (the floor plus
 * "…") and widest width (the whole name, breakable anywhere) via CSS content.
 */
export function CutText({
  text,
  keep = 5,
  className,
}: {
  text: string;
  keep?: number;
  className?: string;
}) {
  const graphemes =
    typeof Intl.Segmenter === "function"
      ? Array.from(
          new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text),
          ({ segment }) => segment,
        )
      : Array.from(text);
  const floor = graphemes.length > keep ? `${graphemes.slice(0, keep).join("")}\u2026` : text;
  return (
    <span data-cut="" className={cn("inline-grid min-w-0 max-w-full", className)}>
      <span
        data-cut-text=""
        className="col-start-1 row-start-1 w-0 min-w-full overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        data-floor={floor}
        className="cut-floor invisible col-start-1 row-start-1 whitespace-pre"
      />
      <span
        aria-hidden="true"
        data-full={text}
        className="cut-full invisible col-start-1 row-start-1 h-0 overflow-hidden break-all"
      />
    </span>
  );
}
