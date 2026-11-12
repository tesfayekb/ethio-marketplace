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
