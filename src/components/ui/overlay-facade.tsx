import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import {
  loadOverlays,
  useOverlays,
  warmOverlaysWhenIdle,
  type OverlaysImpl,
} from "./overlay-loader";

/**
 * DEC-259 (Foundations turn 31; D234 speed S8) — ONE WAY AN OVERLAY WAITS FOR ITS
 * CODE. The tooltip's and the dropdown menu's facades (tooltip.tsx,
 * dropdown-menu.tsx) are built from the three parts here:
 *
 * - OverlayRoot holds the root's state. Until the person shows intent it draws
 *   only its children; then it asks for the overlay module and, once it has
 *   arrived, draws the real Radix root BESIDE its children (a Radix root and a
 *   closed trigger add no element to the page). The real trigger renders a
 *   collector instead of an element, and the collector hands the trigger's
 *   props — handlers, aria, data-state and the ref the popper anchors to — to
 *   the facade trigger.
 * - OverlayTrigger draws the consumer's own element through a Slot, first with
 *   the closed state's attributes and the intent handlers, then with the real
 *   trigger's props. The element is never replaced, so focus, hover and a
 *   press in progress survive the switch; the intent that started it (a hover,
 *   a focus, a press, a key) is replayed once on the same element, so the real
 *   trigger answers it as if it had been there all along.
 * - OverlayContent keeps the content's props for the real tree and draws
 *   nothing where it stands.
 *
 * The server and the hydration render draw the closed trigger alone, so they
 * agree; a failed download leaves the closed trigger and the next intent asks
 * again (overlay-loader.ts logs the failure).
 */
export type OverlayKind = "tooltip" | "menu";

type Props = Record<string, unknown>;

/** What the person did on a trigger before the real primitive was there. */
type Intent =
  | { kind: "hover" }
  | { kind: "focus" }
  | { kind: "press"; pointerType: string }
  | { kind: "key"; key: string };

const useIsoLayoutEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

interface RootState {
  kind: OverlayKind;
  /** The real primitive is drawn: asked for and arrived. */
  active: boolean;
  activate(intent: Intent | null): void;
  /** Asks for the module without asking for the overlay (a menu trigger's hover or focus). */
  warm(): void;
  /** The intent that started the switch, replayed once the real trigger is in place. */
  intent: React.RefObject<Intent | null>;
  /** The content's props (children included), kept for the real tree. */
  setContent(props: Props | null): void;
  /** Where the real trigger's props go: the facade trigger's state setter. */
  sink: React.RefObject<((props: Props) => void) | null>;
}

/** One context per kind: a tooltip may stand between a menu's root and its trigger. */
const ROOTS: Record<OverlayKind, React.Context<RootState | null>> = {
  tooltip: React.createContext<RootState | null>(null),
  menu: React.createContext<RootState | null>(null),
};

function useRoot(kind: OverlayKind, part: string): RootState {
  const root = React.useContext(ROOTS[kind]);
  if (root === null) throw new Error(`${part} must be used within its root`);
  return root;
}

/** The real trigger's only child: draws nothing, hands every prop to the facade trigger. */
function Collector({ sink, ...props }: Props & { sink: RootState["sink"] }) {
  useIsoLayoutEffect(() => {
    sink.current?.(props);
  });
  return null;
}

/** What the real root draws inside: the real trigger around the collector, and the content. */
export interface RealSlots {
  /** Pass as the real trigger's only child (with asChild). */
  collector: React.ReactElement;
  /** The content's props as the consumer gave them, or null when none is drawn. */
  content: Props | null;
}

export function OverlayRoot({
  kind,
  openAtStart = false,
  children,
  real,
}: {
  kind: OverlayKind;
  /** Its owner opens it (`open` or `defaultOpen`): the real root is asked for with no intent. */
  openAtStart?: boolean;
  children?: React.ReactNode;
  real: (impl: OverlaysImpl, slots: RealSlots) => React.ReactNode;
}) {
  const impl = useOverlays();
  const [wanted, setWanted] = React.useState(false);
  const [content, setContentState] = React.useState<Props | null>(null);
  const intent = React.useRef<Intent | null>(null);
  const contentRef = React.useRef<Props | null>(null);
  const sink = React.useRef<((props: Props) => void) | null>(null);
  const activeRef = React.useRef(false);
  const active = wanted && impl !== null;

  React.useEffect(() => {
    warmOverlaysWhenIdle();
  }, []);

  useIsoLayoutEffect(() => {
    activeRef.current = active;
    if (active) setContentState(contentRef.current);
  }, [active]);

  const activate = React.useCallback((next: Intent | null) => {
    intent.current = next;
    setWanted(true);
    loadOverlays().catch(() => {
      intent.current = null;
      setWanted(false);
    });
  }, []);

  const warm = React.useCallback(() => {
    loadOverlays().catch(() => undefined);
  }, []);

  React.useEffect(() => {
    if (openAtStart) activate(null);
  }, [openAtStart, activate]);

  const setContent = React.useCallback((props: Props | null) => {
    contentRef.current = props;
    if (activeRef.current) setContentState(props);
  }, []);

  const root = React.useMemo<RootState>(
    () => ({ kind, active, activate, warm, intent, setContent, sink }),
    [kind, active, activate, warm, setContent],
  );

  const Context = ROOTS[kind];
  return (
    <Context.Provider value={root}>
      {children}
      {active && impl !== null
        ? real(impl, { collector: <Collector sink={sink} />, content })
        : null}
    </Context.Provider>
  );
}

/** The closed state's attributes, as the real trigger draws them. */
const CLOSED: Record<OverlayKind, Props> = {
  tooltip: { "data-state": "closed" },
  menu: {
    type: "button",
    "aria-haspopup": "menu",
    "aria-expanded": false,
    "data-state": "closed",
  },
};

type Handler = (event: React.SyntheticEvent) => void;

/** Our handler after the given one, as Radix composes a consumer's handler with its own. */
function after(first: unknown, second: Handler): Handler {
  return (event) => {
    if (typeof first === "function") (first as Handler)(event);
    second(event);
  };
}

function setRef<T>(ref: unknown, value: T): void {
  if (typeof ref === "function") ref(value);
  else if (ref !== null && typeof ref === "object" && "current" in ref)
    (ref as { current: T }).current = value;
}

/** Plays the intent again on the same element, now that the real trigger's handlers are on it. */
function replay(intent: Intent, node: HTMLElement, hovered: boolean): void {
  const Pointer = typeof PointerEvent === "function" ? PointerEvent : MouseEvent;
  switch (intent.kind) {
    case "hover":
      if (hovered)
        node.dispatchEvent(new Pointer("pointermove", { bubbles: true, pointerType: "mouse" }));
      return;
    case "focus":
      if (node.ownerDocument.activeElement === node)
        node.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
      return;
    case "press":
      node.dispatchEvent(
        new Pointer("pointerdown", {
          bubbles: true,
          cancelable: true,
          button: 0,
          pointerType: intent.pointerType,
        }),
      );
      return;
    case "key":
      node.dispatchEvent(
        new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: intent.key }),
      );
  }
}

/** The keys a closed menu trigger opens on (Radix's DropdownMenuTrigger). */
const MENU_KEYS = ["Enter", " ", "ArrowDown"];

export function OverlayTrigger({
  kind,
  part,
  children,
  ...incoming
}: Props & { kind: OverlayKind; part: string; children?: React.ReactNode }) {
  const root = useRoot(kind, part);
  const [real, setReal] = React.useState<Props | null>(null);
  const node = React.useRef<HTMLElement | null>(null);
  const hovered = React.useRef(false);
  const pressed = React.useRef(false);

  useIsoLayoutEffect(() => {
    const sink = root.sink;
    sink.current = setReal;
    return () => {
      if (sink.current === setReal) sink.current = null;
    };
  }, [root.sink]);

  const live = root.active && real !== null;

  React.useEffect(() => {
    if (!live) return;
    const intent = root.intent.current;
    root.intent.current = null;
    if (intent !== null && node.current !== null) replay(intent, node.current, hovered.current);
  }, [live, root.intent]);

  const track: Props = {
    onPointerEnter: (event: React.PointerEvent) => {
      if (event.pointerType !== "touch") hovered.current = true;
    },
    onPointerLeave: () => {
      hovered.current = false;
    },
  };

  let mine: Props;
  if (live) {
    mine = {
      ...real,
      onPointerEnter: after(real.onPointerEnter, track.onPointerEnter as Handler),
      onPointerLeave: after(real.onPointerLeave, track.onPointerLeave as Handler),
    };
  } else if (root.kind === "tooltip") {
    mine = {
      ...CLOSED.tooltip,
      onPointerEnter: (event: React.PointerEvent) => {
        if (event.pointerType === "touch") return;
        hovered.current = true;
        root.activate({ kind: "hover" });
      },
      onPointerLeave: track.onPointerLeave,
      onPointerDown: () => {
        pressed.current = true;
        document.addEventListener(
          "pointerup",
          () => {
            pressed.current = false;
          },
          { once: true },
        );
      },
      onFocus: () => {
        if (!pressed.current) root.activate({ kind: "focus" });
      },
    };
  } else {
    mine = {
      ...CLOSED.menu,
      ...track,
      onPointerEnter: (event: React.PointerEvent) => {
        (track.onPointerEnter as Handler)(event);
        root.warm();
      },
      onFocus: () => root.warm(),
      onPointerDown: (event: React.PointerEvent) => {
        if (event.button !== 0 || event.ctrlKey) return;
        event.preventDefault();
        root.activate({ kind: "press", pointerType: event.pointerType });
      },
      onKeyDown: (event: React.KeyboardEvent) => {
        if (!MENU_KEYS.includes(event.key)) return;
        event.preventDefault();
        root.activate({ kind: "key", key: event.key });
      },
    };
  }

  const theirs = mine.ref;
  const ref = React.useCallback(
    (value: HTMLElement | null) => {
      node.current = value;
      setRef(theirs, value);
    },
    [theirs],
  );

  return (
    <Slot {...mine} ref={ref}>
      <Slot {...incoming}>{children}</Slot>
    </Slot>
  );
}

/** Keeps the content's props for the real tree; draws nothing where it stands. */
export function OverlayContent({
  kind,
  part,
  ...props
}: Props & { kind: OverlayKind; part: string }) {
  const root = useRoot(kind, part);
  useIsoLayoutEffect(() => {
    root.setContent(props);
  });
  const { setContent } = root;
  useIsoLayoutEffect(() => () => setContent(null), [setContent]);
  return null;
}
