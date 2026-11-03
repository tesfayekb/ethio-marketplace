import { CARD_SURFACE } from "@/components/layout/surface";
import { Link } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * P-1c (D313) — THE ORDER STRIP: a console's set-up order as a numbered row of
 * steps, each a link to its block on the page (the block's frame id as the
 * hash), each wearing its state — Set, or Needs a row — and, when it has one, a
 * line of detail (which markets are on; which product lacks a price where). The
 * states are COMPUTED from the page's one read by the page's own rule
 * (admin-monetisation/monetisation-order.ts), never a second read: the strip
 * only places them. One `<ol>` named by `prim.orderStrip.label`.
 */
export type OrderStepState = "set" | "needsRow";

export type OrderStep = {
  /** The step's id (its testid suffix). */
  readonly id: string;
  readonly label: string;
  readonly state: OrderStepState;
  /** One line under the label, when the state has something to say. */
  readonly detail?: string;
  /** The frame the step leads to (DataTable's guide anchor), on this page. */
  readonly hash: string;
};

const STATE_KEY = {
  set: "prim.orderStrip.set",
  needsRow: "prim.orderStrip.needsRow",
} as const;

export function OrderStrip({ testid, steps }: { testid: string; steps: readonly OrderStep[] }) {
  const { t } = useI18n();
  return (
    <ol
      data-testid={testid}
      aria-label={t("prim.orderStrip.label")}
      className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"
    >
      {steps.map((step, index) => (
        <li key={step.id} className="min-w-0">
          <Link
            to="."
            hash={step.hash}
            data-testid={`${testid}-${step.id}`}
            data-state={step.state}
            className={cn(
              CARD_SURFACE,
              "flex min-h-11 min-w-0 items-start gap-3 px-3 py-2.5 text-start no-underline",
            )}
          >
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold tabular-nums text-foreground"
            >
              {index + 1}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                <span className="min-w-0 break-words text-sm font-semibold text-foreground">
                  {step.label}
                </span>
                <Badge
                  variant={step.state === "set" ? "success" : "warning"}
                  data-testid={`${testid}-${step.id}-state`}
                >
                  {t(STATE_KEY[step.state])}
                </Badge>
              </span>
              {step.detail ? (
                <span
                  data-testid={`${testid}-${step.id}-detail`}
                  className="min-w-0 break-words text-xs text-muted-foreground"
                >
                  {step.detail}
                </span>
              ) : null}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export default OrderStrip;
