import { MENU_LINK_ACTIVE } from "@/components/shell/menu-current";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { createPortal } from "react-dom";

import {
  ITEM_ACTIVE,
  ITEM_CORE,
  ITEM_IDLE,
  ITEM_TILE,
  ITEM_TILE_ICON,
} from "@/components/shell/menu-row";
import type { NavItem } from "@/config/panels.types";
import type { SubmenuSignal } from "@/components/shell/submenu/submenu-signal";
import { CutText } from "@/components/ui/cut-text";
import { cn } from "@/lib/utils";

import {
  PANEL_FADE_MS,
  SUBMENU_CLOSE_MS,
  SUBMENU_OPEN_MS,
  inSafeTriangle,
  placePanel,
  snapToGrid,
  type Box,
  type Point,
} from "./submenu-geometry";

/**
 * DEC-288 (turn R1b) — THE SUB-MENU MECHANISM'S ON-DEMAND HALF, fetched with the other
 * overlay primitives through overlay-loader.ts (re-exported by overlays-impl.ts). One
 * side panel per level, beside its opener, never in place (D240): hover opens after
 * 150 ms and closes 300 ms after the pointer leaves row and panel (D98), the safe
 * triangle keeps a row open on the way to its panel, a touch press opens the page and
 * the panel at once, and the keys follow WAI-ARIA disclosure navigation (Arrow to the
 * inline end enters, to the inline start or Escape returns focus to the opener). The
 * panel locks nothing, so it opens without moving the page (INC-1005).
 */
export type SubmenuItem = {
  key: string;
  label: string;
  testid: string;
  to: string;
  params?: Record<string, string>;
  active?: boolean;
  ancestorActive?: boolean;
  icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" }>;
  hasChildren: boolean;
};
export type SubmenuLevel = { header: string; items: SubmenuItem[] };

/**
 * DEC-302 (R1d-c b) — MenuNav's side-panel rows are built here, in the on-demand sub-menu
 * layer, never on the first download. The rows are the items MenuNav already reads (DEC-288,
 * K1); MenuNav hands over its own current-item rule and page rule, so nothing is copied.
 */
export type NavLevelRules = {
  label: (item: NavItem) => string;
  isCurrent: (item: NavItem) => boolean;
  holdsCurrent: (item: NavItem) => boolean;
  opensPanel: (item: NavItem) => boolean;
  pageOf: (item: NavItem) => NavItem | undefined;
};
export function navLevelOf(
  items: NavItem[],
  id: string,
  rules: NavLevelRules,
): SubmenuLevel | null {
  const find = (list: NavItem[]): NavItem | undefined => {
    for (const item of list) {
      if (item.id === id) return item;
      const inner = item.children ? find(item.children) : undefined;
      if (inner) return inner;
    }
    return undefined;
  };
  const opened = find(items);
  if (!opened?.children?.length) return null;
  return {
    header: rules.label(opened),
    items: opened.children.map((child) => ({
      key: child.id,
      label: rules.label(child),
      testid: child.testid ?? `rail-item-${child.id}`,
      icon: child.icon,
      to: rules.pageOf(child)?.path ?? "/",
      active: rules.isCurrent(child),
      ancestorActive: !rules.isCurrent(child) && rules.holdsCurrent(child),
      hasChildren: rules.opensPanel(child),
    })),
  };
}

/** `focus`: opened by the keys, so the panel takes focus on its first row once placed. */
type Opened = { key: string; el: HTMLElement; focus?: boolean };

const rowsOf = (el: Element | null) =>
  Array.from(el?.querySelectorAll<HTMLElement>("[data-submenu-row]") ?? []);

function boxOf(el: Element): Box {
  const r = el.getBoundingClientRect();
  return { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
}
const isRtl = (el: Element) => getComputedStyle(el).direction === "rtl";

/** One level's hover intent: timers, the safe triangle, and who is open. */
function useIntent(onChange?: (key: string | null) => void) {
  const [opened, setOpened] = useState<Opened | null>(null);
  const openTimer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);
  const point = useRef<Point>({ x: 0, y: 0 });
  const apex = useRef<Point | null>(null);
  const panel = useRef<HTMLElement | null>(null);
  const openedRef = useRef<Opened | null>(null);

  const set = useCallback(
    (next: Opened | null) => {
      openedRef.current = next;
      setOpened(next);
      onChange?.(next?.key ?? null);
    },
    [onChange],
  );
  const clear = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  };
  const safe = () => {
    const el = panel.current;
    if (!apex.current || !el) return false;
    // A pointer that has not moved since it left makes no progress toward the panel.
    if (point.current.x === apex.current.x && point.current.y === apex.current.y) return false;
    return inSafeTriangle(point.current, apex.current, boxOf(el), isRtl(el));
  };

  useEffect(() => {
    if (!opened) return;
    const move = (event: PointerEvent) => {
      point.current = { x: event.clientX, y: event.clientY };
    };
    document.addEventListener("pointermove", move, { passive: true });
    return () => document.removeEventListener("pointermove", move);
  }, [opened]);
  useEffect(() => clear, []);

  const enter = (key: string, el: HTMLElement) => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    if (openedRef.current?.key === key) return;
    const tryOpen = () => {
      if (openedRef.current && safe()) {
        openTimer.current = window.setTimeout(tryOpen, SUBMENU_OPEN_MS / 3);
        return;
      }
      apex.current = null;
      set({ key, el });
    };
    openTimer.current = window.setTimeout(tryOpen, SUBMENU_OPEN_MS);
  };
  const leave = (at?: Point) => {
    window.clearTimeout(openTimer.current);
    if (at) {
      apex.current = at;
      point.current = at;
    }
    window.clearTimeout(closeTimer.current);
    const tryClose = () => {
      if (safe()) {
        closeTimer.current = window.setTimeout(tryClose, SUBMENU_OPEN_MS / 3);
        return;
      }
      set(null);
    };
    closeTimer.current = window.setTimeout(tryClose, SUBMENU_CLOSE_MS);
  };
  const stay = () => {
    window.clearTimeout(closeTimer.current);
    apex.current = null;
  };
  const now = (next: Opened | null) => {
    clear();
    apex.current = null;
    set(next);
  };
  return { opened, enter, leave, stay, now, panel };
}

/**
 * D245 (R1c) — the panel that just closed stays mounted PANEL_FADE_MS, fading out,
 * non-interactive and aria-hidden; under prefers-reduced-motion it goes at once.
 */
function useClosing<T extends { key: string }>(opened: T | null): T | null {
  const [closing, setClosing] = useState<T | null>(null);
  const previous = useRef<T | null>(opened);
  useEffect(() => {
    const was = previous.current;
    previous.current = opened;
    if (!was || was.key === opened?.key) return;
    const still =
      typeof window.matchMedia !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) return;
    setClosing(was);
    window.setTimeout(() => setClosing((now) => (now === was ? null : now)), PANEL_FADE_MS);
  }, [opened]);
  return closing && closing.key !== opened?.key ? closing : null;
}

/** D248 — the panel's rows are the main menu's (src/components/shell/menu-row.ts). */
const PAD = { "--rail-pad": "0.75rem" } as React.CSSProperties;

function Panel({
  opener,
  level,
  depth,
  showHeader,
  itemsOf,
  edgeOf,
  panelRef,
  floor,
  tick,
  fitMax,
  closing,
  onEnter,
  onLeave,
  onClose,
}: {
  opener: Opened;
  level: SubmenuLevel;
  depth: number;
  showHeader: boolean;
  itemsOf: (key: string) => SubmenuLevel | null;
  edgeOf: (opener: HTMLElement) => Element;
  panelRef: React.MutableRefObject<HTMLElement | null>;
  /** D244 — never above this (the top bar's bottom), at every level. */
  floor: number;
  /** D244 — bumped on a window resize: the panel is placed again. */
  tick: number;
  /** D247 — more items than this and the list keeps full-size rows and scrolls. */
  fitMax: number;
  /** D245 — fading out: non-interactive and aria-hidden. */
  closing: boolean;
  onEnter: () => void;
  onLeave: (at: Point) => void;
  onClose: (focusOpener: boolean) => void;
}) {
  const own = useRef<HTMLDivElement | null>(null);
  /** The top bar's bottom: the first panel reads it from the rail; deeper ones inherit it. */
  const [ownFloor, setFloor] = useState(0);
  const [place, setPlace] = useState<{
    left: number;
    top: number;
    height: number;
    rowHeight: number;
  } | null>(null);
  const child = useIntent();
  const childClosing = useClosing(child.opened);
  /** A fading panel's element is never the live panel the safe triangle aims at. */
  const stray = useRef<HTMLElement | null>(null);

  // The first panel listens; its children follow through `tick`.
  const [ownTick, setOwnTick] = useState(0);
  useEffect(() => {
    if (depth !== 0) return;
    let frame = 0;
    const resized = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => setOwnTick((value) => value + 1));
    };
    window.addEventListener("resize", resized);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resized);
    };
  }, [depth]);
  const childTick = depth === 0 ? ownTick : tick;

  // D244 (INC-1008) — placed when it opens, and again on every window resize (`tick`, from
  // the first panel's one listener, so a child follows its parent's new place). Rects are
  // read on these events only (I3: nothing observed). D248 — the rows snap to the opener's
  // menu: its row height, its row grid, never below its last row (snapToGrid).
  const count = level.items.length + (showHeader ? 1 : 0);
  useLayoutEffect(() => {
    const el = own.current;
    if (!el) return;
    const edge = boxOf(edgeOf(opener.el));
    const top = depth === 0 ? Math.max(0, edge.top) : floor;
    const row = opener.el.closest("li") ?? opener.el;
    const listed = Array.from(row.parentElement?.children ?? []).filter(
      (item) => item.tagName === "LI" && !item.hasAttribute("aria-hidden"),
    );
    const region = boxOf(opener.el.closest("[data-menu-region]") ?? edgeOf(opener.el));
    const own0 = boxOf(row);
    const first = listed[0] ? boxOf(listed[0]) : own0;
    const last = listed[listed.length - 1] ? boxOf(listed[listed.length - 1] as Element) : own0;
    // D254 — the menu's row grid, measured from a rail row's box: when the main menu itself
    // scrolls, its shown rows are the whole rows inside its region, never a part-hidden one.
    const rowHeight = own0.bottom - own0.top;
    const lo = Math.max(top, region.top, first.top);
    const hi = Math.min(window.innerHeight, region.bottom, last.bottom);
    const gridTop =
      rowHeight > 0 ? first.top + Math.ceil((lo - first.top) / rowHeight - 0.01) * rowHeight : lo;
    const gridBottom =
      rowHeight > 0
        ? gridTop + Math.max(0, Math.floor((hi - gridTop) / rowHeight + 0.01)) * rowHeight
        : hi;
    const snap = snapToGrid({
      openerTop: own0.top,
      rowHeight,
      menuTop: gridTop,
      menuBottom: gridBottom,
      count,
    });
    const placed = placePanel({
      anchor: boxOf(opener.el),
      edge,
      size: { width: el.offsetWidth, height: snap.height },
      viewport: { width: window.innerWidth, height: window.innerHeight },
      rtl: isRtl(opener.el),
      minTop: top,
    });
    setFloor(top);
    setPlace({ left: placed.left, top: snap.top, height: snap.height, rowHeight: snap.rowHeight });
  }, [opener, depth, edgeOf, floor, childTick, count]);

  useEffect(() => {
    if (!place || !opener.focus) return;
    // Before placement the panel is transparent, never hidden: a hidden row cannot take focus.
    rowsOf(own.current)[0]?.focus();
  }, [place, opener]);

  const rows = () =>
    Array.from(own.current?.querySelectorAll<HTMLElement>("[data-submenu-row]") ?? []);
  const keyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const list = rows();
    const at = list.indexOf(event.target as HTMLElement);
    const rtl = isRtl(opener.el);
    const back = rtl ? "ArrowRight" : "ArrowLeft";
    const into = rtl ? "ArrowLeft" : "ArrowRight";
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      list[(at + step + list.length) % list.length]?.focus();
    } else if (event.key === "Escape" || event.key === back) {
      if (at < 0) return;
      event.preventDefault();
      event.stopPropagation();
      onClose(true);
    } else if (event.key === into && at >= 0) {
      const item = level.items[at];
      if (item?.hasChildren) {
        event.preventDefault();
        child.now({ key: item.key, el: list[at] as HTMLElement, focus: true });
      }
    }
  };

  const setRefs = useCallback(
    (el: HTMLDivElement | null) => {
      own.current = el;
      panelRef.current = el;
    },
    [panelRef],
  );

  return createPortal(
    <>
      <div
        ref={setRefs}
        id={`submenu-${opener.key}`}
        role="region"
        aria-label={level.header}
        data-testid={closing ? "submenu-panel-closing" : "submenu-panel"}
        data-state={closing ? "closed" : "open"}
        aria-hidden={closing ? true : undefined}
        inert={closing ? true : undefined}
        data-level={depth + 2}
        data-menu-region=""
        onPointerEnter={onEnter}
        onPointerLeave={(event) => onLeave({ x: event.clientX, y: event.clientY })}
        onKeyDown={keyDown}
        style={
          place
            ? {
                left: place.left,
                top: place.top,
                height: place.height,
                opacity: closing ? 0 : 1,
                ["--menu-row-h" as string]: `${place.rowHeight}px`,
              }
            : { left: 0, top: 0, opacity: 0 }
        }
        // D248 — the rail's surface (bg-sidebar, its shadow, rounded, no border); D245's
        // 300 ms opacity fade, in and out, at every level.
        className={cn(
          "fixed z-30 flex w-64 flex-col overflow-y-auto overflow-x-hidden overscroll-contain rounded-lg bg-sidebar px-2 text-foreground shadow-rail",
          "transition-opacity duration-300 ease-[ease] motion-reduce:transition-none",
          closing && "pointer-events-none",
        )}
      >
        {showHeader ? (
          <p
            data-testid="submenu-header"
            title={level.header}
            className="flex h-[var(--menu-row-h)] shrink-0 items-center px-3 text-sm font-semibold"
          >
            <CutText text={level.header} />
          </p>
        ) : null}
        <ul
          className="menu-fit menu-snap min-h-0 shrink-0"
          style={PAD}
          data-many={level.items.length > fitMax ? "" : undefined}
        >
          {level.items.map((item) => {
            const Icon = item.icon;
            const open = child.opened?.key === item.key;
            return (
              <li key={item.key}>
                <Link
                  to={item.to}
                  activeOptions={MENU_LINK_ACTIVE}
                  params={item.params}
                  preload="intent"
                  data-submenu-row=""
                  data-testid={item.testid}
                  aria-current={item.active ? "page" : item.ancestorActive ? "true" : undefined}
                  aria-expanded={item.hasChildren ? open : undefined}
                  aria-controls={open ? `submenu-${item.key}` : undefined}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "mouse") return;
                    if (item.hasChildren) child.enter(item.key, event.currentTarget);
                    else child.leave();
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === "mouse" && item.hasChildren)
                      child.leave({ x: event.clientX, y: event.clientY });
                  }}
                  onClick={() => onClose(false)}
                  aria-label={item.label}
                  title={item.label}
                  className={cn(
                    ITEM_CORE,
                    item.active || item.ancestorActive ? ITEM_ACTIVE : ITEM_IDLE,
                  )}
                >
                  {Icon ? (
                    <span aria-hidden="true" className={ITEM_TILE}>
                      <Icon className={ITEM_TILE_ICON} aria-hidden="true" />
                    </span>
                  ) : null}
                  <CutText text={item.label} />
                  {item.hasChildren ? (
                    <ChevronRight
                      aria-hidden="true"
                      className="ms-auto h-4 w-4 shrink-0 rtl:rotate-180"
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {[childClosing, child.opened].map((shown) => {
        const shownLevel = shown ? itemsOf(shown.key) : null;
        if (!shown || !shownLevel) return null;
        const fading = closing || shown === childClosing;
        return (
          <Panel
            key={shown.key}
            opener={shown}
            level={shownLevel}
            depth={depth + 1}
            floor={ownFloor}
            tick={childTick}
            fitMax={fitMax}
            closing={fading}
            showHeader={false}
            itemsOf={itemsOf}
            edgeOf={() => own.current ?? document.body}
            panelRef={fading ? stray : child.panel}
            onEnter={() => {
              child.stay();
              onEnter();
            }}
            onLeave={(at) => {
              child.leave(at);
              onLeave(at);
            }}
            onClose={(focus) => {
              const el = child.opened?.el;
              child.now(null);
              if (focus) el?.focus();
              else onClose(false);
            }}
          />
        );
      })}
    </>,
    document.body,
  );
}

/**
 * The layer: takes the triggers' signals and draws the open level. `itemsOf` reads the
 * seeded tree (no request); `edgeOf` names the box the first level opens beside.
 */
export function SubmenuLayer({
  itemsOf,
  edgeOf,
  showHeader,
  signals,
}: {
  itemsOf: (key: string) => SubmenuLevel | null;
  edgeOf: (opener: HTMLElement) => Element;
  showHeader: boolean;
  /** The first-paint half (submenu-signal.ts), handed in so this chunk imports none of it. */
  signals: {
    take: (handler: ((signal: SubmenuSignal) => void) | null) => void;
    /** D247 — MENU_FIT_MAX (submenu-signal.ts). */
    fitMax: number;
  };
}) {
  const intent = useIntent();
  const ref = useRef(intent);
  ref.current = intent;

  useEffect(() => {
    const { take } = signals;
    take((signal: SubmenuSignal) => {
      const it = ref.current;
      const mouse = signal.pointer === "mouse";
      switch (signal.type) {
        case "enter":
          if (mouse) it.enter(signal.key, signal.el);
          break;
        case "leave":
          if (mouse) it.leave({ x: signal.x ?? 0, y: signal.y ?? 0 });
          break;
        case "click":
          // A tap opens the page and the panel (DEC-288); a mouse click opens the page.
          if (signal.pointer === "touch" || signal.pointer === "pen")
            it.now({ key: signal.key, el: signal.el });
          else it.now(null);
          break;
        case "key": {
          const into = isRtl(signal.el) ? "ArrowLeft" : "ArrowRight";
          if (signal.keyName !== into) break;
          it.now({ key: signal.key, el: signal.el, focus: true });
          break;
        }
      }
    });
    return () => take(null);
  }, [signals]);

  const opened = intent.opened;
  useEffect(() => {
    if (!opened) return;
    // The opener is drawn closed (submenu-signal.ts); the open state is written here.
    opened.el.setAttribute("aria-expanded", "true");
    opened.el.setAttribute("aria-controls", `submenu-${opened.key}`);
    const outside = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (opened.el.contains(target)) return;
      if ((target as Element).closest?.("[data-testid='submenu-panel']")) return;
      ref.current.now(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      ref.current.now(null);
      opened.el.focus();
    };
    document.addEventListener("pointerdown", outside, true);
    document.addEventListener("keydown", escape);
    return () => {
      opened.el.setAttribute("aria-expanded", "false");
      opened.el.removeAttribute("aria-controls");
      document.removeEventListener("pointerdown", outside, true);
      document.removeEventListener("keydown", escape);
    };
  }, [opened]);

  const closing = useClosing(opened);
  const stray = useRef<HTMLElement | null>(null);
  return (
    <>
      {[closing, opened].map((shown) => {
        const level = shown ? itemsOf(shown.key) : null;
        if (!shown || !level) return null;
        const fading = shown === closing;
        return (
          <Panel
            key={shown.key}
            opener={shown}
            level={level}
            depth={0}
            floor={0}
            tick={0}
            fitMax={signals.fitMax}
            closing={fading}
            showHeader={showHeader}
            itemsOf={itemsOf}
            edgeOf={edgeOf}
            panelRef={fading ? stray : intent.panel}
            onEnter={intent.stay}
            onLeave={(at) => intent.leave(at)}
            onClose={(focus) => {
              intent.now(null);
              if (focus) shown.el.focus();
            }}
          />
        );
      })}
    </>
  );
}
