import { useEffect, useState, type RefObject } from "react";
import { ChevronsDown, ChevronsLeft, ChevronsRight, ChevronsUp } from "lucide-react";

/**
 * INC-717's second half (bundle 19 turn 25) — a strip that hides its scrollbar
 * (`scrollbar-none`) and holds more than fits shows a double chevron at each
 * end where more lies: « » on a row, ▲ ▼ on a column. Rendered as a sibling of
 * the strip inside a `relative` wrapper that holds both; the buttons lie over
 * the strip's own ends and a tap scrolls the strip only — never the page
 * (`scrollBy`, never `scrollIntoView`).
 *
 * The strip's axis is read from its computed `flex-direction`; the arrows
 * appear and disappear on scroll, on resize (ResizeObserver) and when the
 * strip's children change.
 */
export function StripArrows({
  stripRef,
  backLabel,
  moreLabel,
  testIdPrefix,
}: {
  /** The strip itself (the element that scrolls). */
  stripRef: RefObject<HTMLElement | null>;
  /** The name of the arrow at the start / top (« / ▲). */
  backLabel: string;
  /** The name of the arrow at the end / bottom (» / ▼). */
  moreLabel: string;
  /** `${testIdPrefix}-back` / `${testIdPrefix}-more` name the buttons. */
  testIdPrefix: string;
}) {
  const [state, setState] = useState<{ vertical: boolean; before: boolean; after: boolean }>({
    vertical: false,
    before: false,
    after: false,
  });

  useEffect(() => {
    const strip = stripRef.current;
    if (strip === null) return;

    const measure = () => {
      const vertical = getComputedStyle(strip).flexDirection === "column";
      const before = vertical ? strip.scrollTop > 1 : strip.scrollLeft > 1;
      const after = vertical
        ? strip.scrollTop + strip.clientHeight < strip.scrollHeight - 1
        : strip.scrollLeft + strip.clientWidth < strip.scrollWidth - 1;
      setState((held) =>
        held.vertical === vertical && held.before === before && held.after === after
          ? held
          : { vertical, before, after },
      );
    };

    measure();
    strip.addEventListener("scroll", measure, { passive: true });
    const sizes = new ResizeObserver(measure);
    sizes.observe(strip);
    const children = new MutationObserver(measure);
    children.observe(strip, { childList: true, subtree: true });
    return () => {
      strip.removeEventListener("scroll", measure);
      sizes.disconnect();
      children.disconnect();
    };
  }, [stripRef]);

  const scrollByOnePage = (direction: 1 | -1) => {
    const strip = stripRef.current;
    if (strip === null) return;
    // One visible length less one item, so the first new item is already seen.
    const item = strip.firstElementChild;
    const behavior =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";
    if (state.vertical) {
      strip.scrollBy({
        top: direction * (strip.clientHeight - (item instanceof HTMLElement ? item.offsetHeight : 0)),
        behavior,
      });
    } else {
      strip.scrollBy({
        left: direction * (strip.clientWidth - (item instanceof HTMLElement ? item.offsetWidth : 0)),
        behavior,
      });
    }
  };

  const buttonClass = "absolute z-10 inline-flex items-center justify-center bg-card/90 shadow-sm rounded-sm";
  const iconClass = "size-5";

  return (
    <>
      {state.before ? (
        <button
          type="button"
          aria-label={backLabel}
          data-testid={`${testIdPrefix}-back`}
          className={`${buttonClass} ${
            state.vertical
              ? "inset-x-0 top-0 h-11 w-full"
              : "inset-y-0 start-0 h-full w-11"
          }`}
          onClick={() => scrollByOnePage(-1)}
        >
          {state.vertical ? (
            <ChevronsUp className={iconClass} aria-hidden="true" />
          ) : (
            <ChevronsLeft className={iconClass} aria-hidden="true" />
          )}
        </button>
      ) : null}
      {state.after ? (
        <button
          type="button"
          aria-label={moreLabel}
          data-testid={`${testIdPrefix}-more`}
          className={`${buttonClass} ${
            state.vertical
              ? "inset-x-0 bottom-0 h-11 w-full"
              : "inset-y-0 end-0 h-full w-11"
          }`}
          onClick={() => scrollByOnePage(1)}
        >
          {state.vertical ? (
            <ChevronsDown className={iconClass} aria-hidden="true" />
          ) : (
            <ChevronsRight className={iconClass} aria-hidden="true" />
          )}
        </button>
      ) : null}
    </>
  );
}

/**
 * The selected thumbnail is kept fully inside its strip when the photo
 * changes: the strip's own scrollLeft / scrollTop moves to the thumbnail's
 * offset — never `scrollIntoView`, which can move the page.
 */
export function keepInStrip(strip: HTMLElement, item: HTMLElement): void {
  const vertical = getComputedStyle(strip).flexDirection === "column";
  if (vertical) {
    if (item.offsetTop < strip.scrollTop) strip.scrollTop = item.offsetTop;
    else if (item.offsetTop + item.offsetHeight > strip.scrollTop + strip.clientHeight)
      strip.scrollTop = item.offsetTop + item.offsetHeight - strip.clientHeight;
  } else {
    if (item.offsetLeft < strip.scrollLeft) strip.scrollLeft = item.offsetLeft;
    else if (item.offsetLeft + item.offsetWidth > strip.scrollLeft + strip.clientWidth)
      strip.scrollLeft = item.offsetLeft + item.offsetWidth - strip.clientWidth;
  }
}
