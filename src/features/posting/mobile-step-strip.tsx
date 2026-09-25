import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";

import { fill } from "./refusal-text";
import { SEQUENCE, STEPS, isStepFinished, positionOf } from "./types";

/** D39 — the strip walks the seller's order; `data-step` keeps the door number. */
const WALK = SEQUENCE.map((step) => STEPS[step - 1]);

export function MobileStepStrip({
  step,
  draftStep,
  photosCount,
  onGoTo,
}: {
  step: number;
  draftStep: number;
  photosCount: number;
  onGoTo: (step: number) => void;
}) {
  const { t } = useI18n();
  const currentRef = useRef<HTMLLIElement | null>(null);
  const [furthestVisited, setFurthestVisited] = useState(positionOf(step));

  useEffect(() => {
    setFurthestVisited((held) => Math.max(held, positionOf(step)));
    currentRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [step]);

  return (
    <ol
      aria-label={t("post.progress.stripLabel")}
      data-testid="post-step-strip"
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden"
    >
      {WALK.map((entry) => {
        const position = positionOf(entry.step);
        const current = entry.step === step;
        const completed = isStepFinished(entry.step, { draftStep, photosCount });
        const visited = position <= furthestVisited;
        const content = (
          <>
            <span aria-hidden="true">{completed ? "✓" : position}</span>
            <span>{t(entry.nameKey)}</span>
          </>
        );
        return (
          <li
            ref={current ? currentRef : undefined}
            key={entry.step}
            aria-current={current ? "step" : undefined}
            data-testid="post-step-strip-item"
            data-step={entry.step}
            data-state={current ? "current" : completed ? "completed" : "later"}
            className="shrink-0"
          >
            {visited && !current ? (
              <Button
                type="button"
                variant="ghost"
                size="touch"
                data-testid={`post-step-strip-go-${entry.step}`}
                className="gap-1.5 rounded-full border border-border px-3 text-xs"
                aria-label={fill(t("post.progress.stepNumber"), { step: position })}
                onClick={() => onGoTo(entry.step)}
              >
                {content}
              </Button>
            ) : (
              <span
                className={`flex min-h-11 items-center gap-1.5 rounded-full border px-3 text-xs font-medium ${
                  current
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                {content}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
