import { useEffect, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RequiredMark } from "@/features/posting/field";
import { useI18n, type MessageKey } from "@/i18n";

export type AgreeLink = { label: string; href: string };

/**
 * Bundle 22 turn 32 (D230, DEC-236, D231) — THE ONE AGREEMENT TO A DOCUMENT. A person ticks that they have
 * read and agree to (or certify) the named documents; each document is one tap away under the sentence.
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
  links: AgreeLink[];
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
          {t(sentence)} {required ? <RequiredMark /> : null}
        </span>
      </label>
      {links.length > 0 ? (
        <ul className="flex flex-wrap gap-x-2 ps-7 text-sm">
          {links.map((link, index) => (
            <li key={link.href} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">·</span> : null}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="agree-link"
                className="inline-flex min-h-11 items-center text-primary underline underline-offset-2"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
