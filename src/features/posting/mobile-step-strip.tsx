import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";

import { fill } from "./refusal-text";
import { STEPS } from "./types";

export function MobileStepStrip({
  step,
  draftStep,
  onGoTo,
}: {
  step: number;
  draftStep: number;
  onGoTo: (step: number) => void;
}) {
  const { t } = useI18n();
  const currentRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    currentRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [step]);

  return (
    <ol
      aria-label={t("post.progress.stripLabel")}
      data-testid="post-step-strip"
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden"
    >
      {STEPS.map((entry) => {
        const done = entry.step < step;
        const current = entry.step === step;
        const completed = entry.step <= draftStep;
        const content = (
          <>
            <span aria-hidden="true">{done ? "✓" : entry.step}</span>
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
            {completed && !current ? (
              <Button
                type="button"
                variant="ghost"
                size="touch"
                data-testid={`post-step-strip-go-${entry.step}`}
                className="gap-1.5 rounded-full border border-border px-3 text-xs"
                aria-label={fill(t("post.progress.stepNumber"), { step: entry.step })}
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
