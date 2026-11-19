import { ChevronDown } from "lucide-react";

import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * P-1c (D313); L16 (ACT-024) — a product's name cell: the name as a plain label,
 * then a visible, named button that opens the row (`${id}-open`,
 * `aria-expanded`): "Prices" on a reach row, "Prices & perks" on a level row.
 * Its words do not change when open; the arrow and `aria-expanded` do. The
 * row's details (product-details.tsx) answer to `${id}-details`.
 */
export function ProductNameToggle({
  id,
  name,
  level,
  open,
  onToggle,
}: {
  id: string;
  name: string;
  /** A level opens to prices and perks; a reach to prices. */
  level: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  const { t } = useI18n();
  return (
    <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
      <span className="min-w-0 break-words font-medium text-foreground" data-testid={`${id}-name`}>
        {name}
      </span>
      <button
        type="button"
        data-testid={`${id}-open`}
        aria-expanded={open}
        aria-controls={`${id}-details`}
        onClick={onToggle}
        className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-md px-2 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 md:pointer-fine:min-h-9"
      >
        {t(
          level
            ? "admin.monetisation.product.openPricesPerks"
            : "admin.monetisation.product.openPrices",
        )}
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 shrink-0 transition-transform", open && "rotate-180")}
        />
      </button>
    </span>
  );
}

export default ProductNameToggle;
