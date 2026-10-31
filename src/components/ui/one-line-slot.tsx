import { CutText } from "@/components/ui/cut-text";
import { cn } from "@/lib/utils";

/**
 * D262/§5 (turn B2, DEC-314) — ONE LINE WITH ONE SLOT. A line built from a sentence with one
 * `{slot}` (the feed heading's "Listings in {location}") stays on one line: the sentence's
 * fixed words never wrap or cut, and only the slot's text (a place name) cuts, through CutText.
 * The line never breaks anywhere (`wrap-anywhere` is refused here; CF-ONE-LINE-1).
 */
export const ONE_LINE_SLOT = "flex min-w-0 max-w-full items-baseline whitespace-nowrap";

/** The sentence's two fixed parts around its one slot; a sentence without the slot is all fixed. */
export function splitAtSlot(sentence: string, slot: string): [string, string] | null {
  const at = sentence.indexOf(slot);
  if (at < 0) return null;
  return [sentence.slice(0, at), sentence.slice(at + slot.length)];
}

export function OneLineSlot({
  sentence,
  slot,
  text,
  slotClassName,
  keep = 5,
}: {
  /** The translated sentence holding `slot` once. */
  sentence: string;
  /** The slot's marker, e.g. "{location}". */
  slot: string;
  /** The slot's text: the only part that may cut. */
  text: string;
  slotClassName?: string;
  keep?: number;
}) {
  const parts = splitAtSlot(sentence, slot);
  if (parts === null) {
    return (
      <span data-one-line="" className={ONE_LINE_SLOT}>
        <span className="shrink-0">{sentence}</span>
      </span>
    );
  }
  const [before, after] = parts;
  return (
    <span data-one-line="" className={ONE_LINE_SLOT}>
      {before === "" ? null : (
        <span data-one-line-fixed="" className="shrink-0 whitespace-pre">
          {before}
        </span>
      )}
      <span data-one-line-slot="" className={cn("flex min-w-0", slotClassName)}>
        <CutText text={text} keep={keep} />
      </span>
      {after === "" ? null : (
        <span data-one-line-fixed="" className="shrink-0 whitespace-pre">
          {after}
        </span>
      )}
    </span>
  );
}
