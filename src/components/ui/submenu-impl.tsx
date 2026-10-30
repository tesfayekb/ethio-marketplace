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
  setSubmenuOpen,
  takeSubmenuSignals,
  type SubmenuSignal,
} from "@/components/shell/submenu/submenu-signal";
import { cn } from "@/lib/utils";

import {
  SUBMENU_CLOSE_MS,
  SUBMENU_OPEN_MS,
  inSafeTriangle,
  placePanel,
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

const ROW =
  "flex min-h-11 md:pointer-fine:min-h-9 w-full items-center gap-2 rounded-md px-3 py-1.5 text-start text-sm " +
  "break-words focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const IDLE = "text-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground";
const ACTIVE = "bg-nav-active font-semibold text-primary";

function Panel({
  opener,
  level,
  depth,
  showHeader,
  itemsOf,
  edgeOf,
  panelRef,
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
  onEnter: () => void;
  onLeave: (at: Point) => void;
  onClose: (focusOpener: boolean) => void;
}) {
  const own = useRef<HTMLDivElement | null>(null);
  const [place, setPlace] = useState<{ left: number; top: number; maxHeight: number } | null>(null);
  const child = useIntent();
  const childLevel = child.opened ? itemsOf(child.opened.key) : null;

  // Placed once per opening, from the rects of this moment (I3: nothing observed).
  useLayoutEffect(() => {
    const el = own.current;
    if (!el) return;
    const edgeEl = edgeOf(opener.el);
    const edge = boxOf(edgeEl);
    const placed = placePanel({
      anchor: boxOf(opener.el),
      edge,
      size: { width: el.offsetWidth, height: el.scrollHeight },
      viewport: { width: window.innerWidth, height: window.innerHeight },
      rtl: isRtl(opener.el),
      minTop: Math.max(0, depth === 0 ? edge.top : 0),
    });
    setPlace({ left: placed.left, top: placed.top, maxHeight: placed.maxHeight });
  }, [opener, depth, edgeOf]);

  useEffect(() => {
    if (!place || !opener.focus) return;
    const row = rowsOf(own.current)[0];
    row?.focus();
    console.info("[smn-dbg]", row?.getClientRects().length, getComputedStyle(own.current as Element).visibility, getComputedStyle(own.current as Element).opacity, document.activeElement === row);
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
        data-testid="submenu-panel"
        data-level={depth + 2}
        onPointerEnter={onEnter}
        onPointerLeave={(event) => onLeave({ x: event.clientX, y: event.clientY })}
        onKeyDown={keyDown}
        style={
          place
            ? { left: place.left, top: place.top, maxHeight: place.maxHeight }
            : { left: 0, top: 0, opacity: 0 }
        }
        className="fixed z-30 w-60 overflow-y-auto overscroll-contain rounded-md bg-sidebar p-1 shadow-lg motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-150"
      >
        {showHeader ? (
          <p
            data-testid="submenu-header"
            className="flex min-h-11 md:pointer-fine:min-h-9 items-center px-3 text-sm font-semibold"
          >
            {level.header}
          </p>
        ) : null}
        <ul className="flex flex-col gap-0.5">
          {level.items.map((item) => {
            const Icon = item.icon;
            const open = child.opened?.key === item.key;
            return (
              <li key={item.key}>
                <Link
                  to={item.to}
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
                  className={cn(ROW, item.active || item.ancestorActive ? ACTIVE : IDLE)}
                >
                  {Icon ? <Icon className="h-5 w-5 shrink-0" aria-hidden="true" /> : null}
                  <span className="min-w-0 flex-1">{item.label}</span>
                  {item.hasChildren ? (
                    <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 rtl:rotate-180" />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {child.opened && childLevel ? (
        <Panel
          key={child.opened.key}
          opener={child.opened}
          level={childLevel}
          depth={depth + 1}
          showHeader={false}
          itemsOf={itemsOf}
          edgeOf={() => own.current ?? document.body}
          panelRef={child.panel}
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
      ) : null}
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
}: {
  itemsOf: (key: string) => SubmenuLevel | null;
  edgeOf: (opener: HTMLElement) => Element;
  showHeader: boolean;
}) {
  const intent = useIntent(setSubmenuOpen);
  const coarse = useRef(false);
  const ref = useRef(intent);
  ref.current = intent;

  useEffect(() => {
    takeSubmenuSignals((signal: SubmenuSignal) => {
      const it = ref.current;
      const mouse = signal.pointer === "mouse";
      switch (signal.type) {
        case "enter":
          if (mouse) it.enter(signal.key, signal.el);
          break;
        case "leave":
          if (mouse) it.leave({ x: signal.x ?? 0, y: signal.y ?? 0 });
          break;
        case "down":
          coarse.current = signal.pointer === "touch" || signal.pointer === "pen";
          break;
        case "click":
          // A tap opens the page and the panel (DEC-288); a mouse click opens the page.
          if (coarse.current) it.now({ key: signal.key, el: signal.el });
          else it.now(null);
          coarse.current = false;
          break;
        case "key": {
          const into = isRtl(signal.el) ? "ArrowLeft" : "ArrowRight";
          if (signal.keyName !== into) break;
          it.now({ key: signal.key, el: signal.el, focus: true });
          break;
        }
      }
    });
    return () => {
      takeSubmenuSignals(null);
      setSubmenuOpen(null);
    };
  }, []);

  const opened = intent.opened;
  useEffect(() => {
    if (!opened) return;
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
      document.removeEventListener("pointerdown", outside, true);
      document.removeEventListener("keydown", escape);
    };
  }, [opened]);

  const level = opened ? itemsOf(opened.key) : null;
  if (!opened || !level) return null;
  return (
    <Panel
      key={opened.key}
      opener={opened}
      level={level}
      depth={0}
      showHeader={showHeader}
      itemsOf={itemsOf}
      edgeOf={edgeOf}
      panelRef={intent.panel}
      onEnter={intent.stay}
      onLeave={(at) => intent.leave(at)}
      onClose={(focus) => {
        intent.now(null);
        if (focus) opened.el.focus();
      }}
    />
  );
}
