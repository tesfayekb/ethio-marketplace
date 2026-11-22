import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { Button, type ButtonProps } from "./button";

import { LIST_ROW, LIST_ROW_WRAP } from "@/components/shell/menu-row";
import { cn } from "@/lib/utils";

import {
  BANDS_BODY,
  BANDS_END,
  BANDS_FILL,
  BANDS_FLOW,
  BANDS_FOOT,
  BANDS_GRABBER,
  BANDS_HEAD,
  BANDS_INSET_X,
  BANDS_INSET_Y,
  CLOSED_PRIMARY,
  CUE_ANCHOR,
  CUE_BUTTON,
  CUE_ROOM,
  CUE_SPAN,
  CUE_WRAP,
  DIALOG_CARD,
  DIALOG_TILE,
  DIALOG_TONE,
  STEP_MARK,
  STEP_TRACK,
} from "./dialog-parts-look";
import { DIALOG_GRABBER, type DialogTone } from "./dialog-look";

/**
 * Bundle 2 (INC-1146, DEC-418/419/420) — THE PARTS of a banded panel (`bands` on DialogContent,
 * AlertDialogContent and SheetContent; dialog-parts-look.ts holds their classes). A consumer passes its
 * own title and description parts (the primitive's, so the panel stays named and described).
 * Text a person typed reaches these parts as children and is drawn as text, never as markup.
 */

/** The header band: an optional icon tile with its tone, then the title and the description. */
export function PanelHeader({
  icon,
  tone = "plain",
  children,
  className,
}: {
  icon?: React.ReactNode;
  tone?: DialogTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-panel-head="" className={cn(BANDS_HEAD, className)}>
      <div
        aria-hidden="true"
        data-dialog-grabber=""
        className={cn(DIALOG_GRABBER, BANDS_GRABBER)}
      />
      <div className="flex min-w-0 items-start gap-3">
        {icon === undefined ? null : (
          <span aria-hidden="true" data-tone={tone} className={cn(DIALOG_TILE, DIALOG_TONE[tone])}>
            {icon}
          </span>
        )}
        <div className="flex min-w-0 flex-col gap-1.5 text-start">{children}</div>
      </div>
    </div>
  );
}

/** What the dialog acts on, on a white card: a picture and up to three lines the opener holds. */
export function PanelSubject({
  picture,
  title,
  lines = [],
  testId,
}: {
  picture?: React.ReactNode;
  title: string;
  lines?: readonly string[];
  testId?: string;
}) {
  return (
    <div
      data-panel-subject=""
      data-testid={testId}
      className={cn(DIALOG_CARD, "flex min-w-0 items-center gap-3")}
    >
      {picture === undefined ? null : (
        <div className="aspect-square w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
          {picture}
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate font-semibold text-foreground">{title}</p>
        {lines.slice(0, 3).map((line, index) => (
          <p key={index} className="truncate text-sm text-muted-foreground">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

const reducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The body: the panel's only scroller, with the scroll cue while more lies below (DEC-418). ONE
 * element, a direct child of the panel, so it scrolls in every engine; its content keeps its own
 * height. `fill`: the one child takes the panel's room instead (a photo, a map): no scroll, no
 * cue, no inset. `flush`: no inset (the content brings its own box). `end`: no footer follows, so
 * this band carries the bottom inset.
 */
export function PanelBody({
  children,
  className,
  testId,
  cueLabel,
  fill = false,
  flush = false,
  end = false,
}: {
  children: React.ReactNode;
  cueLabel: string;
  className?: string;
  testId?: string;
  fill?: boolean;
  flush?: boolean;
  end?: boolean;
}) {
  const empty = React.Children.toArray(children).length === 0;
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [more, setMore] = React.useState(false);
  React.useEffect(() => {
    const body = ref.current;
    if (body === null || fill) return;
    const judge = () => {
      const next = body.scrollTop + body.clientHeight < body.scrollHeight - 4;
      setMore((prev) => (prev === next ? prev : next));
    };
    judge();
    body.addEventListener("scroll", judge, { passive: true });
    const watch = typeof ResizeObserver === "function" ? new ResizeObserver(judge) : null;
    watch?.observe(body);
    const flow = body.firstElementChild;
    if (flow !== null) watch?.observe(flow);
    return () => {
      body.removeEventListener("scroll", judge);
      watch?.disconnect();
    };
  }, [empty, fill]);
  if (empty) return null;
  if (fill)
    return (
      <div
        ref={ref}
        data-panel-body=""
        data-testid={testId}
        className={cn(BANDS_FILL, end && BANDS_END, className)}
      >
        {children}
      </div>
    );
  return (
    <div
      ref={ref}
      data-panel-body=""
      data-testid={testId}
      style={more ? { scrollPaddingBottom: CUE_ROOM } : undefined}
      className={cn(BANDS_BODY, !flush && BANDS_INSET_X, className)}
    >
      <div className={cn(BANDS_FLOW, !flush && BANDS_INSET_Y, end && BANDS_END)}>{children}</div>
      {more ? (
        <div className={cn(CUE_ANCHOR, !flush && CUE_SPAN)}>
          <div data-scroll-cue="" className={CUE_WRAP}>
            <button
              type="button"
              className={CUE_BUTTON}
              onClick={() => {
                const body = ref.current;
                if (body === null) return;
                body.scrollBy({
                  top: Math.round(body.clientHeight * 0.85),
                  behavior: reducedMotion() ? "auto" : "smooth",
                });
              }}
            >
              <ChevronDown aria-hidden="true" className="size-4" />
              {cueLabel}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** The footer band: always in view; the buttons keep the footer's order and stacking. */
export function PanelFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-panel-foot="" className={cn(BANDS_FOOT, className)} {...props} />;
}

/** The step track: where the person is, and what is done. */
export function StepTrack({
  steps,
  current,
  label,
}: {
  steps: readonly string[];
  current: number;
  /** The track's name for a screen reader (the consumer's words). */
  label: string;
}) {
  return (
    <ol aria-label={label} className={STEP_TRACK}>
      {steps.map((step, index) => {
        const state = index < current ? "done" : index === current ? "current" : "next";
        return (
          <li
            key={index}
            data-state={state}
            aria-current={state === "current" ? "step" : undefined}
            className="flex min-w-0 items-center gap-1.5"
          >
            <span
              data-state={state}
              className={cn(
                STEP_MARK,
                state === "current"
                  ? DIALOG_TONE.confirm
                  : state === "done"
                    ? "bg-primary/10 text-primary"
                    : undefined,
              )}
            >
              {state === "done" ? <Check aria-hidden="true" /> : index + 1}
            </span>
            <span className={cn("truncate", state === "current" && "font-medium text-foreground")}>
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** One row of an action list or a choice list: the shared list row with its icon tile. */
export function ActionRow({
  icon,
  children,
  className,
  asChild = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon: React.ReactNode; asChild?: boolean }) {
  const content = (label: React.ReactNode) => (
    <>
      <span aria-hidden="true" className={cn(DIALOG_TILE, DIALOG_TONE.plain, "size-9")}>
        {icon}
      </span>
      <span className="min-w-0 grow text-start">{label}</span>
    </>
  );
  return (
    <Button
      asChild={asChild}
      type="button"
      variant="ghost"
      size="touch"
      className={cn(LIST_ROW, LIST_ROW_WRAP, "gap-3", className)}
      {...props}
    >
      {asChild && React.isValidElement<{ children?: React.ReactNode }>(children)
        ? React.cloneElement(children, { children: content(children.props.children) })
        : content(children)}
    </Button>
  );
}

/**
 * The closed primary (DEC-418): the posting wizard's closed Next as a shared part. Drawn closed
 * (`data-closed="1"`) while `closed`: a press calls `onClosedPress` (the consumer
 * marks the missing choice and scrolls to it) and nothing is sent; open, it calls `onClick`.
 */
export const ClosedPrimary = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "disabled"> & {
    closed: boolean;
    busy?: boolean;
    missing?: string;
    onClosedPress: () => void;
  }
>(({ closed, busy = false, missing, onClosedPress, onClick, className, ...props }, ref) => {
  const lineId = React.useId();
  return (
    <>
      <Button
        {...props}
        ref={ref}
        type="button"
        size="touch"
        disabled={busy}
        aria-busy={busy ? "true" : undefined}
        data-closed={closed ? "1" : undefined}
        className={cn(className, CLOSED_PRIMARY)}
        aria-describedby={closed && missing ? lineId : undefined}
        onClick={(event) => {
          if (closed) {
            onClosedPress();
            return;
          }
          onClick?.(event);
        }}
      />
      {closed && missing ? (
        <p id={lineId} className="order-2 w-full text-sm text-muted-foreground">
          {missing}
        </p>
      ) : null}
    </>
  );
});
ClosedPrimary.displayName = "ClosedPrimary";
