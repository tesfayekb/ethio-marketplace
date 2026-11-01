/**
 * INC-957 — a one-line slot at 360. Latin is the runner's own font. Ge'ez is that
 * width times GEEZ_FACTOR, because the site ships no Ethiopic face (DEC-262) and
 * Kefa on Apple is wider than the Noto the runner draws.
 *
 * Measured on this machine (Core Text), recorded so the factor can be re-judged
 * when a new string arrives:
 * - "የኢትዮጵያ ማስታወቂያዎች" at 21px / 800 / −0.9px: Kefa ExtraBold 237.8, Noto 800 196.2, ratio 1.212.
 * - "ፎቶዎች በቅርቡ" at 17.2px / 700: ratio 1.184.
 * The factor is 1.22, which covers 1.212. The method is the runner's scrollWidth
 * (or a nowrap probe of the same font) multiplied by the factor, compared with the
 * slot's room. A font-size change is not the same number once tracking is set.
 */

export const GEEZ_FACTOR = 1.22;

/** Ethiopic, Ethiopic Supplement, Ethiopic Extended, Ethiopic Extended-A. */
const ETHIOPIC = /[\u1200-\u137F\u1380-\u139F\u2D80-\u2DDF\uAB00-\uAB2F]/;

export function hasEthiopic(text: string): boolean {
  return ETHIOPIC.test(text);
}

/** The width the widest platform font needs for this text. */
export function factoredWidth(text: string, textWidth: number): number {
  return hasEthiopic(text) ? textWidth * GEEZ_FACTOR : textWidth;
}

export type SlotReading = {
  name: string;
  text: string;
  /** Full text width in the runner's font, px. */
  textWidth: number;
  /** The slot's room, px. */
  room: number;
  oneLine: boolean;
  onScreen: boolean;
  /** The ellipsis is allowed. The line and the box are still judged. */
  cut: boolean;
};

/** A fault, or null when the slot holds. Tolerance 0.5px, as OLH uses. */
export function slotFault(reading: SlotReading): string | null {
  if (!reading.oneLine) return `${reading.name} wraps`;
  if (!reading.onScreen) return `${reading.name} leaves the screen`;
  if (reading.cut) return null;
  const width = factoredWidth(reading.text, reading.textWidth);
  if (width > reading.room + 0.5) {
    const over = (width - reading.room).toFixed(1);
    return `${reading.name} overflows by ${over}px`;
  }
  return null;
}

export function slotFaults(readings: SlotReading[]): string[] {
  return readings.flatMap((reading) => {
    const fault = slotFault(reading);
    return fault === null ? [] : [fault];
  });
}

/**
 * What the page can see. Text width is a nowrap probe in the element's font, so a
 * flex-stretched button is not measured as wider than its words. Room for a cut
 * label is its own box; room for a fit-whole label is that same box (the words
 * must show). The bottom bar is fit-whole even though it uses CutText.
 */
export function readSlots(fitBar: boolean): SlotReading[] {
  const view = window.innerWidth;

  function shown(el: Element): el is HTMLElement {
    if (!(el instanceof HTMLElement)) return false;
    if (el.closest(".cut-floor, .cut-full") !== null) return false;
    if (el.hasAttribute("data-floor") || el.hasAttribute("data-full")) return false;
    const style = getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") return false;
    if (el.getClientRects().length === 0) return false;
    return true;
  }

  function onScreen(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    if (rect.left >= -0.5 && rect.right <= view + 0.5) return true;
    let parent = el.parentElement;
    while (parent !== null && parent !== document.body) {
      const overflow = getComputedStyle(parent).overflowX;
      if (
        overflow === "auto" ||
        overflow === "scroll" ||
        overflow === "hidden" ||
        overflow === "clip"
      ) {
        const box = parent.getBoundingClientRect();
        if (box.left >= -0.5 && box.right <= view + 0.5) return true;
      }
      parent = parent.parentElement;
    }
    return false;
  }

  function probeWidth(el: HTMLElement): number {
    const style = getComputedStyle(el);
    const probe = document.createElement("span");
    probe.textContent = el.textContent ?? "";
    probe.style.position = "absolute";
    probe.style.visibility = "hidden";
    probe.style.whiteSpace = "nowrap";
    probe.style.font = style.font;
    probe.style.letterSpacing = style.letterSpacing;
    probe.style.textTransform = style.textTransform;
    document.body.append(probe);
    const width = probe.scrollWidth;
    probe.remove();
    return width;
  }

  function nowrap(el: HTMLElement): boolean {
    const whiteSpace = getComputedStyle(el).whiteSpace;
    return whiteSpace === "nowrap" || whiteSpace === "pre";
  }

  const out: SlotReading[] = [];

  const heading = document.querySelector("[data-testid='feed-heading']");
  if (heading instanceof HTMLElement && shown(heading)) {
    const fixed = [...heading.querySelectorAll("[data-one-line-fixed]")].filter(shown);
    const style = getComputedStyle(heading);
    const lineHeight = parseFloat(style.lineHeight);
    const height = heading.getBoundingClientRect().height;
    out.push({
      name: "feed-heading",
      text: fixed.map((el) => el.textContent ?? "").join(""),
      textWidth: fixed.reduce((sum, el) => sum + el.scrollWidth, 0),
      room: heading.clientWidth,
      oneLine: Number.isFinite(lineHeight) && height < lineHeight * 1.5,
      onScreen: onScreen(heading),
      cut: false,
    });
  }

  const bar = document.querySelector("[data-testid='bottom-bar']");
  if (bar instanceof HTMLElement) {
    for (const el of bar.querySelectorAll("[data-cut-text]")) {
      if (!shown(el)) continue;
      const text = el.textContent ?? "";
      out.push({
        name: `bottom-bar:${text}`,
        text,
        textWidth: el.scrollWidth,
        room: el.clientWidth,
        oneLine: nowrap(el),
        onScreen: onScreen(el),
        cut: !fitBar,
      });
    }
  }

  for (const el of document.querySelectorAll("[data-testid='listing-section-nav-item']")) {
    if (!shown(el)) continue;
    const style = getComputedStyle(el);
    const pad = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const text = (el.textContent ?? "").trim();
    out.push({
      name: `section-tab:${text}`,
      text,
      textWidth: probeWidth(el),
      room: Math.max(0, el.clientWidth - pad),
      oneLine: nowrap(el),
      onScreen: onScreen(el),
      cut: false,
    });
  }

  for (const el of document.querySelectorAll("[data-ribbon] span")) {
    if (!shown(el)) continue;
    const text = (el.textContent ?? "").trim();
    if (text === "") continue;
    out.push({
      name: `ribbon:${text}`,
      text,
      textWidth: probeWidth(el),
      room: el.clientWidth,
      oneLine: nowrap(el),
      onScreen: true,
      cut: false,
    });
  }

  const tier = document.querySelector("[data-testid='listing-detail-tier-tag']");
  if (tier instanceof HTMLElement && shown(tier)) {
    const text = (tier.textContent ?? "").trim();
    const parent = tier.parentElement;
    out.push({
      name: `tier-tag:${text}`,
      text,
      textWidth: probeWidth(tier),
      room: parent instanceof HTMLElement ? parent.clientWidth : tier.clientWidth,
      oneLine: true,
      onScreen: onScreen(tier),
      cut: false,
    });
  }

  return out;
}

/** Admin tables: one line, the ellipsis allowed, the box inside the screen or a scroller. */
export function readAdminSlots(): SlotReading[] {
  const view = window.innerWidth;
  const out: SlotReading[] = [];
  const seen = new Set<HTMLElement>();
  for (const el of document.querySelectorAll("[data-cut-text], .truncate, [data-one-line]")) {
    if (!(el instanceof HTMLElement) || seen.has(el)) continue;
    seen.add(el);
    if (el.closest(".cut-floor, .cut-full") !== null) continue;
    if (el.getAttribute("aria-hidden") === "true") continue;
    const style = getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") continue;
    if (el.getClientRects().length === 0) continue;
    const text = (el.textContent ?? "").trim();
    if (text === "") continue;
    const rect = el.getBoundingClientRect();
    let inside = rect.left >= -0.5 && rect.right <= view + 0.5;
    if (!inside) {
      let parent = el.parentElement;
      while (parent !== null && parent !== document.body) {
        const overflow = getComputedStyle(parent).overflowX;
        const clips =
          overflow === "auto" ||
          overflow === "scroll" ||
          overflow === "hidden" ||
          overflow === "clip";
        if (clips) {
          const box = parent.getBoundingClientRect();
          if (box.left >= -0.5 && box.right <= view + 0.5) {
            inside = true;
            break;
          }
        }
        parent = parent.parentElement;
      }
    }
    const whiteSpace = style.whiteSpace;
    const lineHeight = parseFloat(style.lineHeight);
    const oneLine =
      el.hasAttribute("data-one-line") && Number.isFinite(lineHeight)
        ? rect.height < lineHeight * 1.5
        : whiteSpace === "nowrap" || whiteSpace === "pre";
    const inBar = el.closest("[data-testid='bottom-bar']") !== null;
    out.push({
      name: `${el.getAttribute("data-testid") ?? el.className.slice(0, 40)}:${text.slice(0, 40)}`,
      text,
      textWidth: el.scrollWidth,
      room: el.clientWidth,
      oneLine,
      onScreen: inside,
      cut: !inBar,
    });
  }
  return out;
}
