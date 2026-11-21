import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { LIST_ROW, LIST_ROW_WRAP } from "@/components/shell/menu-row";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

import {
  BANDS_BODY,
  BANDS_FOOT,
  BANDS_GRABBER,
  BANDS_HEAD,
  CLOSED_PRIMARY,
  CUE_BUTTON,
  CUE_WRAP,
  DIALOG_CARD,
  DIALOG_GRABBER,
  DIALOG_TILE,
  DIALOG_TONE,
  STEP_MARK,
  STEP_TRACK,
  type DialogTone,
} from "./dialog-look";

/**
 * Bundle 2 (INC-1146, DEC-418/419/420) — THE PARTS of a banded panel (`bands` on DialogContent,
 * AlertDialogContent and SheetContent; dialog-look.ts holds their classes). A consumer passes its
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

/** What the dialog acts on, on a white card: a picture and one or two lines the opener holds. */
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
        <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-muted">{picture}</div>
      )}
      <div className="min-w-0">
        <p className="truncate font-semibold text-foreground">{title}</p>
        {lines.slice(0, 2).map((line, index) => (
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

/** The body: the panel's only scroller, with the scroll cue while more lies below (DEC-418). */
export function PanelBody({
  children,
  className,
  testId,
}: {
  children: React.ReactNode;
  className?: string;
  testId?: string;
}) {
  const { t } = useI18n();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [more, setMore] = React.useState(false);
  React.useEffect(() => {
    const body = ref.current;
    if (body === null) return;
    const judge = () => {
      const next = body.scrollTop + body.clientHeight < body.scrollHeight - 4;
      setMore((prev) => (prev === next ? prev : next));
    };
    judge();
    body.addEventListener("scroll", judge, { passive: true });
    const watch = typeof ResizeObserver === "function" ? new ResizeObserver(judge) : null;
    watch?.observe(body);
    for (const child of Array.from(body.children)) watch?.observe(child);
    return () => {
      body.removeEventListener("scroll", judge);
      watch?.disconnect();
    };
  }, []);
  return (
    <div ref={ref} data-panel-body="" data-testid={testId} className={cn(BANDS_BODY, className)}>
      {children}
      {more ? (
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
            {t("dialog.moreBelow")}
          </button>
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
            <span data-state={state} className={STEP_MARK}>
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
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon: React.ReactNode }) {
  return (
    <button type="button" className={cn(LIST_ROW, LIST_ROW_WRAP, "gap-3", className)} {...props}>
      <span aria-hidden="true" className={cn(DIALOG_TILE, DIALOG_TONE.plain, "size-9")}>
        {icon}
      </span>
      <span className="min-w-0 grow text-start">{children}</span>
    </button>
  );
}

/**
 * The closed primary (DEC-418): the posting wizard's closed Next as a shared part. Drawn closed
 * (`data-closed="1"`) while `closed`, never disabled: a press calls `onClosedPress` (the consumer
 * marks the missing choice and scrolls to it) and nothing is sent; open, it calls `onClick`.
 */
export const ClosedPrimary = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { closed: boolean; onClosedPress: () => void }
>(({ closed, onClosedPress, onClick, className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    data-closed={closed ? "1" : undefined}
    className={cn(className, CLOSED_PRIMARY)}
    onClick={(event) => {
      if (closed) {
        onClosedPress();
        return;
      }
      onClick?.(event);
    }}
    {...props}
  />
));
ClosedPrimary.displayName = "ClosedPrimary";

/** A red primary (the destructive tone's own fill). */
const isRed = (element: Element) => element.classList.contains("bg-destructive");
const FOCUSABLE =
  'input:not([type=hidden]):not([disabled]), textarea:not([disabled]), select:not([disabled]), button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

/**
 * The focus law of bundle 2: a red primary never takes the focus when its panel opens. The
 * first field takes it; else the first control that is not red. Called from the primitives'
 * open handler; it moves the focus only when the default would land on a red button.
 */
export function focusAwayFromRed(event: Event): void {
  const panel = event.currentTarget ?? event.target;
  if (!(panel instanceof HTMLElement)) return;
  const all = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
  const first = all[0];
  if (first === undefined || !isRed(first)) return;
  const field = all.find((element) => element.matches("input, textarea, select"));
  const target = field ?? all.find((element) => !isRed(element));
  if (target === undefined) return;
  event.preventDefault();
  target.focus({ preventScroll: true });
}
