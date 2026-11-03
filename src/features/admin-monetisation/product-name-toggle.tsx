import { ChevronDown } from "lucide-react";

import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * P-1c (D313) — a product's name cell is the toggle of its row: `aria-expanded`,
 * `${id}-open`, the open/close words for screen readers; the row's details
 * (product-details.tsx) answer to `${id}-details`.
 */
export function ProductNameToggle({
  id,
  name,
  open,
  onToggle,
}: {
  id: string;
  name: string;
  open: boolean;
  onToggle: () => void;
}) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      data-testid={`${id}-open`}
      aria-expanded={open}
      aria-controls={`${id}-details`}
      onClick={onToggle}
      className="inline-flex min-h-11 min-w-0 max-w-full items-center gap-1.5 text-start font-medium text-foreground md:pointer-fine:min-h-9"
    >
      <ChevronDown
        aria-hidden="true"
        className={cn("size-4 shrink-0 transition-transform", open && "rotate-180")}
      />
      <span className="min-w-0 break-words" data-testid={`${id}-name`}>
        {name}
      </span>
      <span className="sr-only">
        {t(open ? "admin.monetisation.product.close" : "admin.monetisation.product.open")}
      </span>
    </button>
  );
}

export default ProductNameToggle;
