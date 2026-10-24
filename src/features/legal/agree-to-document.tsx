import { useEffect, useRef, type ReactNode } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RequiredMark } from "@/features/posting/field";
import { useI18n, type MessageKey } from "@/i18n";

type DocumentRole = "terms" | "privacy" | "publishing";

/**
 * Bundle 22 turn 32 (D230, DEC-236, D231) — THE ONE AGREEMENT TO A DOCUMENT. A person ticks that they have
 * read and agree to (or certify) the named documents; each document is one inline link away in the sentence.
 * The tick is a required answer with the field kit's three-state border: a soft destructive border while
 * required and empty, the full border with the ring once the surrounding action was tapped without it, and
 * the normal border once ticked — nothing turns green (DEC-236). When refused, the message shows above the
 * control's row is named by aria-describedby, the control is marked invalid, and the row is scrolled into
 * view and focused (WCAG 2.2 3.3.1, 3.3.2, 4.1.2; the GOV.UK checkboxes pattern). The component holds no
 * state and reads no door: its screen owns the tick and the door records it.
 */
export function AgreeToDocument({
  id,
  testId,
  sentence,
  links,
  checked,
  onCheckedChange,
  refused,
  message,
  required = true,
}: {
  id: string;
  testId: string;
  sentence: MessageKey;
  links: Partial<Record<DocumentRole, string>>;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  refused: boolean;
  message: MessageKey;
  required?: boolean;
}) {
  const { t } = useI18n();
  const row = useRef<HTMLDivElement>(null);
  const control = useRef<HTMLButtonElement>(null);
  const shown = refused && !checked;
  useEffect(() => {
    if (!shown) return;
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.current?.scrollIntoView?.({ block: "start", behavior: reduced ? "auto" : "smooth" });
    control.current?.focus({ preventScroll: true });
  }, [shown]);
  const text = t(sentence);
  const parts: ReactNode[] = [];
  const token = /\[([^\]\n]{1,120})\]\((terms|privacy|publishing)\)/g;
  let end = 0;
  for (const match of text.matchAll(token)) {
    parts.push(text.slice(end, match.index));
    const role = match[2] as DocumentRole;
    const href = links[role];
    parts.push(href ? (
      <a key={match.index} href={href} target="_blank" rel="noopener noreferrer"
        data-testid="agree-link" data-role={role}
        className="text-primary underline underline-offset-2">{match[1]}</a>
    ) : match[1]);
    end = match.index + match[0].length;
  }
  parts.push(text.slice(end));
  const messageId = `${id}-message`;
  const border = shown
    ? "border-destructive ring-1 ring-destructive"
    : required && !checked
      ? "border-destructive"
      : "";
  return (
    <div
      ref={row}
      data-testid="agree-to-document"
      data-refused={shown ? "1" : undefined}
      className="scroll-mt-20 space-y-2"
    >
      {shown ? (
        <p
          id={messageId}
          role="alert"
          data-testid="agree-message"
          className="text-sm text-destructive"
        >
          {t(message)}
        </p>
      ) : null}
      <label htmlFor={id} className="flex min-h-11 items-start gap-3 text-sm text-foreground">
        <Checkbox
          ref={control}
          id={id}
          data-testid={testId}
          checked={checked}
          aria-required={required || undefined}
          aria-invalid={shown || undefined}
          aria-describedby={shown ? messageId : undefined}
          onCheckedChange={(value) => onCheckedChange(value === true)}
          className={`mt-1 ${border}`.trim()}
        />
        <span>
          {parts} {required ? <RequiredMark /> : null}
        </span>
      </label>

    </div>
  );
}
