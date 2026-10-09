import { cn } from "@/lib/utils";

/** D104: retain the name's first graphemes while only the remainder can ellipsize. */
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
  const head = graphemes.slice(0, keep).join("");
  const tail = graphemes.slice(keep).join("");
  return (
    <span className={cn("inline-flex min-w-0 max-w-full", className)}>
      <span className="shrink-0 whitespace-pre">{head}</span>
      {tail !== "" && (
        <span className="min-w-0 overflow-hidden text-ellipsis whitespace-pre">{tail}</span>
      )}
    </span>
  );
}
