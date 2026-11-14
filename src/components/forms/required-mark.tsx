import { useI18n } from "@/i18n";

/**
 * D72 — THE ONE REQUIRED MARK. A visible asterisk (hidden from screen readers)
 * and the word "Required" for them, so the mark reads the same on every form.
 */
export function RequiredMark({ testId = "required-mark" }: { testId?: string }) {
  const { t } = useI18n();
  return (
    <span data-testid={testId}>
      <span className="text-destructive" aria-hidden="true">
        *
      </span>
      <span className="sr-only">{t("post.field.required")}</span>
    </span>
  );
}
